import { describe, it, expect } from "vitest";
import { parseWeekday } from "../../../../src/_lib/parsers/tokens/weekday";
import { DateComponents, Localize } from "../../../../src/types";

describe("parseWeekday", () => {
  const createDateComponents = (): DateComponents => ({
    year: 2000,
    month: 0,
    day: 1,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
    isPM: false,
    hours12: null,
  });

  const mockLocalize: Localize = {
    era: () => "",
    month: () => "",
    weekday: (weekday, options) => {
      const narrow = ["S", "M", "T", "W", "T", "F", "S"];
      const abbreviated = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const wide = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      if (options?.width === "narrow") return narrow[weekday];
      if (options?.width === "wide") return wide[weekday];
      return abbreviated[weekday]; // abbreviated default
    },
    dayPeriod: () => "",
  };

  describe("with localization", () => {
    describe("E/EE/EEE patterns (abbreviated)", () => {
      it.each([
        ["Sun", "E"],
        ["Mon", "EE"],
        ["Tue", "EEE"],
        ["Wed", "E"],
        ["Thu", "EE"],
        ["Fri", "EEE"],
        ["Sat", "E"],
      ])("parses localized %s with pattern %s", (input, token) => {
        const dateComponents = createDateComponents();
        const result = parseWeekday(input, 0, token, mockLocalize, dateComponents);

        expect(result).not.toBeNull();
        expect(result!.position).toBe(input.length);
        // Note: weekday parsing doesn't modify dateComponents, it's mainly for validation
      });
    });

    describe("EEEE pattern (wide)", () => {
      it.each([
        ["Sunday"],
        ["Monday"],
        ["Tuesday"],
        ["Wednesday"],
        ["Thursday"],
        ["Friday"],
        ["Saturday"],
      ])("parses localized %s", (input) => {
        const dateComponents = createDateComponents();
        const result = parseWeekday(input, 0, "EEEE", mockLocalize, dateComponents);

        expect(result).not.toBeNull();
        expect(result!.position).toBe(input.length);
      });
    });

    describe("EEEEE pattern (narrow)", () => {
      it.each([
        ["S"],
        ["M"],
        ["T"],
        ["W"],
        ["F"],
      ])("parses localized narrow %s", (input) => {
        const dateComponents = createDateComponents();
        const result = parseWeekday(input, 0, "EEEEE", mockLocalize, dateComponents);

        expect(result).not.toBeNull();
        expect(result!.position).toBe(1);
      });

      it("handles ambiguous narrow weekdays", () => {
        // Both Tuesday and Thursday are "T" in narrow format
        const dateComponents1 = createDateComponents();
        const dateComponents2 = createDateComponents();

        const result1 = parseWeekday("T", 0, "EEEEE", mockLocalize, dateComponents1);
        expect(result1).not.toBeNull();
        expect(result1!.position).toBe(1);

        // Should match the first occurrence (Tuesday = index 2)
        const result2 = parseWeekday("T", 0, "EEEEE", mockLocalize, dateComponents2);
        expect(result2).not.toBeNull();
        expect(result2!.position).toBe(1);
      });
    });
  });

  describe("without localization (English fallback)", () => {
    describe("E/EE/EEE patterns (abbreviated)", () => {
      it.each([
        ["Sun"],
        ["Mon"],
        ["Tue"],
        ["Wed"],
        ["Thu"],
        ["Fri"],
        ["Sat"],
      ])("parses English abbreviated %s", (input) => {
        const dateComponents = createDateComponents();
        const result = parseWeekday(input, 0, "EEE", undefined, dateComponents);

        expect(result).not.toBeNull();
        expect(result!.position).toBe(input.length);
      });
    });

    describe("EEEE pattern (wide)", () => {
      it.each([
        ["Sunday"],
        ["Monday"],
        ["Tuesday"],
        ["Wednesday"],
        ["Thursday"],
        ["Friday"],
        ["Saturday"],
      ])("parses English wide %s", (input) => {
        const dateComponents = createDateComponents();
        const result = parseWeekday(input, 0, "EEEE", undefined, dateComponents);

        expect(result).not.toBeNull();
        expect(result!.position).toBe(input.length);
      });
    });

    describe("EEEEE pattern (narrow)", () => {
      it.each([
        ["S"],
        ["M"],
        ["T"],
        ["W"],
        ["F"],
      ])("parses English narrow %s", (input) => {
        const dateComponents = createDateComponents();
        const result = parseWeekday(input, 0, "EEEEE", undefined, dateComponents);

        expect(result).not.toBeNull();
        expect(result!.position).toBe(1);
      });
    });
  });

  describe("position handling", () => {
    it("parses at different positions", () => {
      const dateComponents = createDateComponents();
      const result = parseWeekday("abcMondef", 3, "EEE", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(6);
    });

    it("handles end of string", () => {
      const dateComponents = createDateComponents();
      const result = parseWeekday("Friday", 0, "EEEE", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(6);
    });

    it("handles position at end of string", () => {
      const dateComponents = createDateComponents();
      const result = parseWeekday("Mon", 3, "EEE", undefined, dateComponents);

      expect(result).toBeNull(); // No characters left to parse
    });
  });

  describe("invalid input", () => {
    it("returns null for unrecognized weekdays", () => {
      const dateComponents = createDateComponents();

      expect(parseWeekday("Xyz", 0, "EEE", undefined, dateComponents)).toBeNull();
      expect(parseWeekday("123", 0, "EEE", undefined, dateComponents)).toBeNull();
      expect(parseWeekday("", 0, "EEE", undefined, dateComponents)).toBeNull();
    });

    it("returns null when no match found with localization", () => {
      const dateComponents = createDateComponents();
      const result = parseWeekday("InvalidDay", 0, "EEEE", mockLocalize, dateComponents);

      expect(result).toBeNull();
    });

    it("returns null for unsupported token patterns", () => {
      const dateComponents = createDateComponents();
      const result = parseWeekday("Mon", 0, "EEEEEE", undefined, dateComponents);

      expect(result).toBeNull();
    });
  });

  describe("edge cases", () => {
    it("prefers longer matches when possible", () => {
      // "Sunday" should match completely rather than just "S"
      const dateComponents = createDateComponents();
      const result = parseWeekday("Sunday", 0, "EEEE", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(6); // Should consume entire word
    });

    it("handles case sensitivity correctly", () => {
      const dateComponents = createDateComponents();

      // Should not match different case without localization handling it
      const result = parseWeekday("monday", 0, "EEEE", undefined, dateComponents);
      expect(result).toBeNull();
    });

    it("does not modify date components", () => {
      const dateComponents = createDateComponents();
      const originalYear = dateComponents.year;
      const originalMonth = dateComponents.month;
      const originalDay = dateComponents.day;

      parseWeekday("Monday", 0, "EEEE", undefined, dateComponents);

      // Weekday parsing should not change the actual date
      expect(dateComponents.year).toBe(originalYear);
      expect(dateComponents.month).toBe(originalMonth);
      expect(dateComponents.day).toBe(originalDay);
    });

    it("handles different token lengths correctly", () => {
      const dateComponents1 = createDateComponents();
      const dateComponents2 = createDateComponents();
      const dateComponents3 = createDateComponents();

      // All should parse the same weekday but use appropriate format
      const result1 = parseWeekday("Mon", 0, "E", undefined, dateComponents1);
      const result2 = parseWeekday("Monday", 0, "EEEE", undefined, dateComponents2);
      const result3 = parseWeekday("M", 0, "EEEEE", undefined, dateComponents3);

      expect(result1).not.toBeNull();
      expect(result1!.position).toBe(3);

      expect(result2).not.toBeNull();
      expect(result2!.position).toBe(6);

      expect(result3).not.toBeNull();
      expect(result3!.position).toBe(1);
    });
  });
});