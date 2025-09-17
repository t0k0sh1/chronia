import { describe, it, expect } from "vitest";
import { parseDayPeriod } from "../../../../src/_lib/parsers/tokens/dayPeriod";
import { DateComponents, Locale } from "../../../../src/types";

describe("parseDayPeriod", () => {
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

  const mockLocale: Locale = {
    era: () => "",
    month: () => "",
    weekday: () => "",
    dayPeriod: (period, options) => {
      if (options?.width === "narrow") return period === "am" ? "a" : "p";
      if (options?.width === "wide") return period === "am" ? "Morning" : "Evening";
      return period === "am" ? "AM" : "PM"; // abbreviated
    },
  };

  describe("with localization", () => {
    it("parses AM variants", () => {
      const dateComponents1 = createDateComponents();
      const dateComponents2 = createDateComponents();
      const dateComponents3 = createDateComponents();

      // Narrow
      const result1 = parseDayPeriod("a", 0, "a", mockLocale, dateComponents1);
      expect(result1).not.toBeNull();
      expect(result1!.position).toBe(1);
      expect(dateComponents1.isPM).toBe(false);

      // Abbreviated
      const result2 = parseDayPeriod("AM", 0, "a", mockLocale, dateComponents2);
      expect(result2).not.toBeNull();
      expect(result2!.position).toBe(2);
      expect(dateComponents2.isPM).toBe(false);

      // Wide
      const result3 = parseDayPeriod("Morning", 0, "a", mockLocale, dateComponents3);
      expect(result3).not.toBeNull();
      expect(result3!.position).toBe(7);
      expect(dateComponents3.isPM).toBe(false);
    });

    it("parses PM variants", () => {
      const dateComponents1 = createDateComponents();
      const dateComponents2 = createDateComponents();
      const dateComponents3 = createDateComponents();

      // Narrow
      const result1 = parseDayPeriod("p", 0, "a", mockLocale, dateComponents1);
      expect(result1).not.toBeNull();
      expect(result1!.position).toBe(1);
      expect(dateComponents1.isPM).toBe(true);

      // Abbreviated
      const result2 = parseDayPeriod("PM", 0, "a", mockLocale, dateComponents2);
      expect(result2).not.toBeNull();
      expect(result2!.position).toBe(2);
      expect(dateComponents2.isPM).toBe(true);

      // Wide
      const result3 = parseDayPeriod("Evening", 0, "a", mockLocale, dateComponents3);
      expect(result3).not.toBeNull();
      expect(result3!.position).toBe(7);
      expect(dateComponents3.isPM).toBe(true);
    });
  });

  describe("without localization (English fallback)", () => {
    it("parses standard AM/PM", () => {
      const dateComponents1 = createDateComponents();
      const dateComponents2 = createDateComponents();

      const result1 = parseDayPeriod("AM", 0, "a", undefined, dateComponents1);
      expect(result1).not.toBeNull();
      expect(result1!.position).toBe(2);
      expect(dateComponents1.isPM).toBe(false);

      const result2 = parseDayPeriod("PM", 0, "a", undefined, dateComponents2);
      expect(result2).not.toBeNull();
      expect(result2!.position).toBe(2);
      expect(dateComponents2.isPM).toBe(true);
    });

    it("parses case-insensitive AM/PM", () => {
      const dateComponents1 = createDateComponents();
      const dateComponents2 = createDateComponents();
      const dateComponents3 = createDateComponents();
      const dateComponents4 = createDateComponents();

      const result1 = parseDayPeriod("am", 0, "a", undefined, dateComponents1);
      expect(result1).not.toBeNull();
      expect(dateComponents1.isPM).toBe(false);

      const result2 = parseDayPeriod("pm", 0, "a", undefined, dateComponents2);
      expect(result2).not.toBeNull();
      expect(dateComponents2.isPM).toBe(true);

      const result3 = parseDayPeriod("Am", 0, "a", undefined, dateComponents3);
      expect(result3).not.toBeNull();
      expect(dateComponents3.isPM).toBe(false);

      const result4 = parseDayPeriod("Pm", 0, "a", undefined, dateComponents4);
      expect(result4).not.toBeNull();
      expect(dateComponents4.isPM).toBe(true);
    });

    it("parses single letter A/P", () => {
      const dateComponents1 = createDateComponents();
      const dateComponents2 = createDateComponents();

      const result1 = parseDayPeriod("A", 0, "a", undefined, dateComponents1);
      expect(result1).not.toBeNull();
      expect(result1!.position).toBe(1);
      expect(dateComponents1.isPM).toBe(false);

      const result2 = parseDayPeriod("P", 0, "a", undefined, dateComponents2);
      expect(result2).not.toBeNull();
      expect(result2!.position).toBe(1);
      expect(dateComponents2.isPM).toBe(true);
    });

    it("parses lowercase single letter a/p", () => {
      const dateComponents1 = createDateComponents();
      const dateComponents2 = createDateComponents();

      const result1 = parseDayPeriod("a", 0, "a", undefined, dateComponents1);
      expect(result1).not.toBeNull();
      expect(result1!.position).toBe(1);
      expect(dateComponents1.isPM).toBe(false);

      const result2 = parseDayPeriod("p", 0, "a", undefined, dateComponents2);
      expect(result2).not.toBeNull();
      expect(result2!.position).toBe(1);
      expect(dateComponents2.isPM).toBe(true);
    });
  });

  describe("position handling", () => {
    it("parses at different positions", () => {
      const dateComponents = createDateComponents();
      const result = parseDayPeriod("abcAMdef", 3, "a", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(5);
      expect(dateComponents.isPM).toBe(false);
    });

    it("handles end of string", () => {
      const dateComponents = createDateComponents();
      const result = parseDayPeriod("PM", 0, "a", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.isPM).toBe(true);
    });

    it("handles position at end of string", () => {
      const dateComponents = createDateComponents();
      const result = parseDayPeriod("AM", 2, "a", undefined, dateComponents);

      expect(result).toBeNull(); // No characters left to parse
    });
  });

  describe("invalid input", () => {
    it("returns null for unrecognized input", () => {
      const dateComponents = createDateComponents();

      expect(parseDayPeriod("XM", 0, "a", undefined, dateComponents)).toBeNull();
      expect(parseDayPeriod("123", 0, "a", undefined, dateComponents)).toBeNull();
      expect(parseDayPeriod("", 0, "a", undefined, dateComponents)).toBeNull();
      expect(parseDayPeriod("Z", 0, "a", undefined, dateComponents)).toBeNull();
    });

    it("returns null when no match found with localization", () => {
      const dateComponents = createDateComponents();
      const result = parseDayPeriod("XYZ", 0, "a", mockLocale, dateComponents);

      expect(result).toBeNull();
    });
  });

  describe("edge cases", () => {
    it("prefers longer matches", () => {
      // When both "AM" and "A" could match, should prefer "AM"
      const dateComponents = createDateComponents();
      const result = parseDayPeriod("AM", 0, "a", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(2); // Should consume both characters
      expect(dateComponents.isPM).toBe(false);
    });

    it("handles localized strings that might conflict", () => {
      const conflictLocale: Locale = {
        era: () => "",
        month: () => "",
        weekday: () => "",
        dayPeriod: (period, options) => {
          // Intentionally create potential conflicts
          if (options?.width === "narrow") return period === "am" ? "A" : "P";
          return period === "am" ? "ANTE" : "POST";
        },
      };

      const dateComponents1 = createDateComponents();
      const dateComponents2 = createDateComponents();

      const result1 = parseDayPeriod("ANTE", 0, "a", conflictLocale, dateComponents1);
      expect(result1).not.toBeNull();
      expect(result1!.position).toBe(4);
      expect(dateComponents1.isPM).toBe(false);

      const result2 = parseDayPeriod("POST", 0, "a", conflictLocale, dateComponents2);
      expect(result2).not.toBeNull();
      expect(result2!.position).toBe(4);
      expect(dateComponents2.isPM).toBe(true);
    });
  });
});