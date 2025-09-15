import { describe, it, expect } from "vitest";
import { parseDayOfYear } from "../../../../src/_lib/parsers/tokens/dayOfYear";
import { DateComponents } from "../../../../src/types";

describe("parseDayOfYear", () => {
  const createDateComponents = (year = 2024): DateComponents => ({
    year,
    month: 0,
    day: 1,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
    isPM: false,
    hours12: null,
  });

  describe("D pattern (variable length day of year)", () => {
    it.each([
      ["1", 0, 1, 0, 1],     // Jan 1
      ["15", 0, 2, 0, 15],   // Jan 15
      ["32", 0, 2, 1, 1],    // Feb 1 (day 32 of year)
      ["60", 0, 2, 1, 29],   // Feb 29 in leap year 2024
      ["365", 0, 3, 11, 30], // Dec 30 in leap year
      ["366", 0, 3, 11, 31], // Dec 31 in leap year
    ])("parses %s at position %d, consumes %d chars, sets month=%d day=%d", (input, position, expectedLength, expectedMonth, expectedDay) => {
      const dateComponents = createDateComponents(2024); // Leap year
      const result = parseDayOfYear(input, position, "D", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(position + expectedLength);
      expect(dateComponents.month).toBe(expectedMonth);
      expect(dateComponents.day).toBe(expectedDay);
    });

    it("handles non-leap year correctly", () => {
      const dateComponents = createDateComponents(2023); // Non-leap year
      const result = parseDayOfYear("60", 0, "D", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(dateComponents.month).toBe(2); // March in non-leap year
      expect(dateComponents.day).toBe(1);   // March 1
    });

    it("returns null for invalid day of year values", () => {
      const dateComponents = createDateComponents();

      expect(parseDayOfYear("0", 0, "D", undefined, dateComponents)).toBeNull();
      expect(parseDayOfYear("367", 0, "D", undefined, dateComponents)).toBeNull();
      expect(parseDayOfYear("999", 0, "D", undefined, dateComponents)).toBeNull();
    });

    it("stops at non-digit for variable length", () => {
      const dateComponents = createDateComponents();
      const result = parseDayOfYear("15x", 0, "D", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.month).toBe(0);
      expect(dateComponents.day).toBe(15);
    });
  });

  describe("DD pattern (two-digit day of year)", () => {
    it.each([
      ["01", 0, 0, 1],   // Jan 1
      ["15", 0, 0, 15],  // Jan 15
      ["32", 0, 1, 1],   // Feb 1
      ["99", 0, 3, 8],   // April 8 (day 99 of year)
    ])("parses %s as month %d day %d", (input, position, expectedMonth, expectedDay) => {
      const dateComponents = createDateComponents();
      const result = parseDayOfYear(input, position, "DD", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(position + 2);
      expect(dateComponents.month).toBe(expectedMonth);
      expect(dateComponents.day).toBe(expectedDay);
    });

    it("returns null for invalid formats", () => {
      const dateComponents = createDateComponents();

      expect(parseDayOfYear("1", 0, "DD", undefined, dateComponents)).toBeNull(); // Not 2 digits
      expect(parseDayOfYear("123", 0, "DD", undefined, dateComponents)).toBeNull(); // Not 2 digits
      expect(parseDayOfYear("a1", 0, "DD", undefined, dateComponents)).toBeNull(); // Not digits
    });
  });

  describe("DDD pattern (three-digit day of year)", () => {
    it.each([
      ["001", 0, 0, 1],   // Jan 1
      ["032", 0, 1, 1],   // Feb 1
      ["365", 0, 11, 30], // Dec 30 in leap year
      ["366", 0, 11, 31], // Dec 31 in leap year
    ])("parses %s as month %d day %d", (input, position, expectedMonth, expectedDay) => {
      const dateComponents = createDateComponents(2024); // Leap year
      const result = parseDayOfYear(input, position, "DDD", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(position + 3);
      expect(dateComponents.month).toBe(expectedMonth);
      expect(dateComponents.day).toBe(expectedDay);
    });

    it("returns null for invalid formats", () => {
      const dateComponents = createDateComponents();

      expect(parseDayOfYear("12", 0, "DDD", undefined, dateComponents)).toBeNull(); // Not 3 digits
      expect(parseDayOfYear("a12", 0, "DDD", undefined, dateComponents)).toBeNull(); // Not digits
    });

    it("parses first three digits for longer input", () => {
      const dateComponents = createDateComponents();
      const result = parseDayOfYear("1234", 0, "DDD", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(3); // Should consume first 3 digits
      expect(dateComponents.month).toBe(4); // May (day 123 of year)
      expect(dateComponents.day).toBe(2); // May 2
    });
  });

  describe("month and day calculation", () => {
    describe("leap year (2024)", () => {
      it("calculates correct month/day for various day of year values", () => {
        const testCases = [
          [1, 0, 1],      // Jan 1
          [31, 0, 31],    // Jan 31
          [32, 1, 1],     // Feb 1
          [60, 1, 29],    // Feb 29 (leap day)
          [61, 2, 1],     // Mar 1
          [91, 2, 31],    // Mar 31
          [121, 3, 30],   // Apr 30
          [152, 4, 31],   // May 31
          [182, 5, 30],   // Jun 30
          [213, 6, 31],   // Jul 31
          [244, 7, 31],   // Aug 31
          [274, 8, 30],   // Sep 30
          [305, 9, 31],   // Oct 31 (day 305 of 2024)
          [335, 10, 30],  // Nov 30
          [366, 11, 31],  // Dec 31
        ];

        testCases.forEach(([dayOfYear, expectedMonth, expectedDay]) => {
          const dateComponents = createDateComponents(2024);
          const result = parseDayOfYear(String(dayOfYear).padStart(3, "0"), 0, "DDD", undefined, dateComponents);

          expect(result).not.toBeNull();
          expect(dateComponents.month).toBe(expectedMonth);
          expect(dateComponents.day).toBe(expectedDay);
        });
      });
    });

    describe("non-leap year (2023)", () => {
      it("calculates correct month/day for various day of year values", () => {
        const testCases = [
          [1, 0, 1],      // Jan 1
          [31, 0, 31],    // Jan 31
          [32, 1, 1],     // Feb 1
          [59, 1, 28],    // Feb 28 (no leap day)
          [60, 2, 1],     // Mar 1
          [365, 11, 31],  // Dec 31
        ];

        testCases.forEach(([dayOfYear, expectedMonth, expectedDay]) => {
          const dateComponents = createDateComponents(2023);
          const result = parseDayOfYear(String(dayOfYear).padStart(3, "0"), 0, "DDD", undefined, dateComponents);

          expect(result).not.toBeNull();
          expect(dateComponents.month).toBe(expectedMonth);
          expect(dateComponents.day).toBe(expectedDay);
        });
      });

      it("rejects day 366 in non-leap year", () => {
        const dateComponents = createDateComponents(2023);
        const result = parseDayOfYear("366", 0, "DDD", undefined, dateComponents);

        expect(result).toBeNull();
      });
    });
  });

  describe("boundary values", () => {
    it("accepts valid day of year range", () => {
      const dateComponents1 = createDateComponents(2024); // Leap year
      const dateComponents2 = createDateComponents(2023); // Non-leap year

      expect(parseDayOfYear("1", 0, "D", undefined, dateComponents1)).not.toBeNull();
      expect(parseDayOfYear("366", 0, "D", undefined, dateComponents1)).not.toBeNull(); // Valid in leap year

      expect(parseDayOfYear("1", 0, "D", undefined, dateComponents2)).not.toBeNull();
      expect(parseDayOfYear("365", 0, "D", undefined, dateComponents2)).not.toBeNull(); // Valid in non-leap year
    });

    it("rejects invalid day of year values", () => {
      const dateComponents = createDateComponents();

      expect(parseDayOfYear("0", 0, "D", undefined, dateComponents)).toBeNull();
      expect(parseDayOfYear("367", 0, "D", undefined, dateComponents)).toBeNull();
    });
  });

  describe("position handling", () => {
    it("parses at different positions", () => {
      const dateComponents = createDateComponents();
      const result = parseDayOfYear("abc100def", 3, "DDD", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(6);
      expect(dateComponents.month).toBe(3); // April
      expect(dateComponents.day).toBe(9);   // April 9
    });

    it("handles end of string", () => {
      const dateComponents = createDateComponents();
      const result = parseDayOfYear("365", 0, "DDD", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
    });
  });

  describe("edge cases", () => {
    it("handles year with different month lengths", () => {
      // Test February in different years
      const leapYear = createDateComponents(2024);
      const nonLeapYear = createDateComponents(2023);

      // Day 60 should be Feb 29 in leap year, Mar 1 in non-leap year
      const result1 = parseDayOfYear("060", 0, "DDD", undefined, leapYear);
      expect(result1).not.toBeNull();
      expect(leapYear.month).toBe(1); // February
      expect(leapYear.day).toBe(29);  // 29th

      const result2 = parseDayOfYear("060", 0, "DDD", undefined, nonLeapYear);
      expect(result2).not.toBeNull();
      expect(nonLeapYear.month).toBe(2); // March
      expect(nonLeapYear.day).toBe(1);   // 1st
    });

    it("uses the year from dateComponents for leap year calculation", () => {
      const dateComponents1900 = createDateComponents(1900); // Not a leap year (divisible by 100 but not 400)
      const dateComponents2000 = createDateComponents(2000); // Leap year (divisible by 400)

      // Day 60 behavior differs based on leap year
      const result1900 = parseDayOfYear("060", 0, "DDD", undefined, dateComponents1900);
      expect(result1900).not.toBeNull();
      expect(dateComponents1900.month).toBe(2); // March in non-leap year

      const result2000 = parseDayOfYear("060", 0, "DDD", undefined, dateComponents2000);
      expect(result2000).not.toBeNull();
      expect(dateComponents2000.month).toBe(1); // February in leap year
      expect(dateComponents2000.day).toBe(29);  // Feb 29
    });
  });
});