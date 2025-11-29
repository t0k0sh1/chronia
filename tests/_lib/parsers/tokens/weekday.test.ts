import { describe, it, expect } from "vitest";
import { parseWeekday } from "../../../../src/_lib/parsers/tokens/weekday";
import { DateComponents, Locale } from "../../../../src/types";

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

  const mockLocale: Locale = {
    era: {
      narrow: ["B", "A"],
      abbr: ["BC", "AD"],
      wide: ["Before Christ", "Anno Domini"],
    },
    month: {
      narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
      abbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    },
    weekday: {
      narrow: ["S", "M", "T", "W", "T", "F", "S"],
      abbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    },
    dayPeriod: {
      narrow: ["a", "p"],
      abbr: ["AM", "PM"],
      wide: ["AM (morning)", "PM (afternoon)"],
    },
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
        const result = parseWeekday(input, 0, token, mockLocale, dateComponents);

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
        const result = parseWeekday(input, 0, "EEEE", mockLocale, dateComponents);

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
        const result = parseWeekday(input, 0, "EEEEE", mockLocale, dateComponents);

        expect(result).not.toBeNull();
        expect(result!.position).toBe(1);
      });

      it("handles ambiguous narrow weekdays", () => {
        // Both Tuesday and Thursday are "T" in narrow format
        const dateComponents1 = createDateComponents();
        const dateComponents2 = createDateComponents();

        const result1 = parseWeekday("T", 0, "EEEEE", mockLocale, dateComponents1);
        expect(result1).not.toBeNull();
        expect(result1!.position).toBe(1);

        // Should match the first occurrence (Tuesday = index 2)
        const result2 = parseWeekday("T", 0, "EEEEE", mockLocale, dateComponents2);
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
      const result = parseWeekday("InvalidDay", 0, "EEEE", mockLocale, dateComponents);

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

    it("handles unknown token with locale (default case)", () => {
      const jaLocale: Locale = {
        era: {
          narrow: ["紀", "西"],
          abbr: ["BC", "AD"],
          wide: ["紀元前", "西暦"],
        },
        month: {
          narrow: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
          abbr: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
          wide: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        },
        weekday: {
          narrow: ["日", "月", "火", "水", "木", "金", "土"],
          abbr: ["日", "月", "火", "水", "木", "金", "土"],
          wide: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
        },
        dayPeriod: {
          narrow: ["午前", "午後"],
          abbr: ["午前", "午後"],
          wide: ["午前", "午後"],
        },
      };
      const dateComponents = createDateComponents();
      const result = parseWeekday("月", 0, "EEEEEE", jaLocale, dateComponents);
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
    });
  });
});