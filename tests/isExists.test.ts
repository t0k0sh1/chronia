import { describe, it, expect } from "vitest";
import { isExists } from "../src/isExists";

describe("isExists", () => {
  // Test Category 1: Edge Cases - Leap Year Detection (Highest Priority)
  describe("leap year edge cases", () => {
    it.each([
      {
        year: 2024,
        month: 2,
        day: 29,
        expected: true,
        desc: "2024/2/29 - 4-year rule (leap year)",
      },
      {
        year: 2000,
        month: 2,
        day: 29,
        expected: true,
        desc: "2000/2/29 - 400-year rule (leap year)",
      },
      {
        year: 1900,
        month: 2,
        day: 29,
        expected: false,
        desc: "1900/2/29 - 100-year rule (common year)",
      },
      {
        year: 2100,
        month: 2,
        day: 29,
        expected: false,
        desc: "2100/2/29 - 100-year rule (common year)",
      },
      {
        year: 2023,
        month: 2,
        day: 29,
        expected: false,
        desc: "2023/2/29 - February 29 in common year",
      },
      {
        year: 2024,
        month: 2,
        day: 28,
        expected: true,
        desc: "2024/2/28 - February 28 in leap year",
      },
      {
        year: 2023,
        month: 2,
        day: 28,
        expected: true,
        desc: "2023/2/28 - February 28 in common year",
      },
    ])("$desc", ({ year, month, day, expected }) => {
      expect(isExists(year, month, day)).toBe(expected);
    });
  });

  // Test Category 2: Edge Cases - Month Boundary Values (Highest Priority)
  describe("month boundary values", () => {
    it.each([
      // January (31 days)
      { year: 2024, month: 1, day: 1, expected: true, desc: "January 1 (boundary)" },
      { year: 2024, month: 1, day: 31, expected: true, desc: "January 31 (boundary)" },
      {
        year: 2024,
        month: 1,
        day: 32,
        expected: false,
        desc: "January 32 (out of range)",
      },
      // February (28/29 days) - covered in leap year tests
      { year: 2023, month: 2, day: 1, expected: true, desc: "February 1 (boundary)" },
      {
        year: 2023,
        month: 2,
        day: 28,
        expected: true,
        desc: "February 28 in common year (boundary)",
      },
      {
        year: 2023,
        month: 2,
        day: 29,
        expected: false,
        desc: "February 29 in common year (out of range)",
      },
      {
        year: 2023,
        month: 2,
        day: 30,
        expected: false,
        desc: "February 30 (out of range)",
      },
      // March (31 days)
      { year: 2024, month: 3, day: 1, expected: true, desc: "March 1 (boundary)" },
      { year: 2024, month: 3, day: 31, expected: true, desc: "March 31 (boundary)" },
      {
        year: 2024,
        month: 3,
        day: 32,
        expected: false,
        desc: "March 32 (out of range)",
      },
      // April (30 days)
      { year: 2024, month: 4, day: 1, expected: true, desc: "April 1 (boundary)" },
      { year: 2024, month: 4, day: 30, expected: true, desc: "April 30 (boundary)" },
      {
        year: 2024,
        month: 4,
        day: 31,
        expected: false,
        desc: "April 31 (out of range)",
      },
      // May (31 days)
      { year: 2024, month: 5, day: 1, expected: true, desc: "May 1 (boundary)" },
      { year: 2024, month: 5, day: 31, expected: true, desc: "May 31 (boundary)" },
      {
        year: 2024,
        month: 5,
        day: 32,
        expected: false,
        desc: "May 32 (out of range)",
      },
      // June (30 days)
      { year: 2024, month: 6, day: 1, expected: true, desc: "June 1 (boundary)" },
      { year: 2024, month: 6, day: 30, expected: true, desc: "June 30 (boundary)" },
      {
        year: 2024,
        month: 6,
        day: 31,
        expected: false,
        desc: "June 31 (out of range)",
      },
      // July (31 days)
      { year: 2024, month: 7, day: 1, expected: true, desc: "July 1 (boundary)" },
      { year: 2024, month: 7, day: 31, expected: true, desc: "July 31 (boundary)" },
      {
        year: 2024,
        month: 7,
        day: 32,
        expected: false,
        desc: "July 32 (out of range)",
      },
      // August (31 days)
      { year: 2024, month: 8, day: 1, expected: true, desc: "August 1 (boundary)" },
      { year: 2024, month: 8, day: 31, expected: true, desc: "August 31 (boundary)" },
      {
        year: 2024,
        month: 8,
        day: 32,
        expected: false,
        desc: "August 32 (out of range)",
      },
      // September (30 days)
      { year: 2024, month: 9, day: 1, expected: true, desc: "September 1 (boundary)" },
      { year: 2024, month: 9, day: 30, expected: true, desc: "September 30 (boundary)" },
      {
        year: 2024,
        month: 9,
        day: 31,
        expected: false,
        desc: "September 31 (out of range)",
      },
      // October (31 days)
      { year: 2024, month: 10, day: 1, expected: true, desc: "October 1 (boundary)" },
      {
        year: 2024,
        month: 10,
        day: 31,
        expected: true,
        desc: "October 31 (boundary)",
      },
      {
        year: 2024,
        month: 10,
        day: 32,
        expected: false,
        desc: "October 32 (out of range)",
      },
      // November (30 days)
      { year: 2024, month: 11, day: 1, expected: true, desc: "November 1 (boundary)" },
      {
        year: 2024,
        month: 11,
        day: 30,
        expected: true,
        desc: "November 30 (boundary)",
      },
      {
        year: 2024,
        month: 11,
        day: 31,
        expected: false,
        desc: "November 31 (out of range)",
      },
      // December (31 days)
      { year: 2024, month: 12, day: 1, expected: true, desc: "December 1 (boundary)" },
      {
        year: 2024,
        month: 12,
        day: 31,
        expected: true,
        desc: "December 31 (boundary)",
      },
      {
        year: 2024,
        month: 12,
        day: 32,
        expected: false,
        desc: "December 32 (out of range)",
      },
    ])("$desc", ({ year, month, day, expected }) => {
      expect(isExists(year, month, day)).toBe(expected);
    });
  });

  // Test Category 3: Edge Cases - Day Boundary Values (Highest Priority)
  describe("day boundary values", () => {
    it.each([
      { year: 2024, month: 1, day: 0, expected: false, desc: "day 0 (out of range)" },
      { year: 2024, month: 1, day: 1, expected: true, desc: "day 1 (minimum boundary)" },
      {
        year: 2024,
        month: 1,
        day: 31,
        expected: true,
        desc: "day 31 (maximum boundary for January)",
      },
      {
        year: 2024,
        month: 1,
        day: 32,
        expected: false,
        desc: "day 32 (out of range)",
      },
      {
        year: 2024,
        month: 4,
        day: 30,
        expected: true,
        desc: "day 30 (maximum boundary for April)",
      },
      {
        year: 2024,
        month: 4,
        day: 31,
        expected: false,
        desc: "day 31 (out of range for April)",
      },
    ])("$desc", ({ year, month, day, expected }) => {
      expect(isExists(year, month, day)).toBe(expected);
    });
  });

  // Test Category 4: Edge Cases - Month Range Validation (Highest Priority)
  describe("month range validation (0, 1, 12, 13, -1)", () => {
    it.each([
      { year: 2024, month: 0, day: 1, expected: false, desc: "month 0 (out of range)" },
      { year: 2024, month: 1, day: 1, expected: true, desc: "month 1 (minimum boundary)" },
      {
        year: 2024,
        month: 12,
        day: 1,
        expected: true,
        desc: "month 12 (maximum boundary)",
      },
      { year: 2024, month: 13, day: 1, expected: false, desc: "month 13 (out of range)" },
      {
        year: 2024,
        month: -1,
        day: 1,
        expected: false,
        desc: "month -1 (out of range)",
      },
    ])("$desc", ({ year, month, day, expected }) => {
      expect(isExists(year, month, day)).toBe(expected);
    });
  });

  // Test Category 5: Invalid Inputs - NaN (High Priority)
  describe("invalid inputs - NaN", () => {
    it.each([
      { year: NaN, month: 1, day: 1, expected: false, desc: "NaN year" },
      { year: 2024, month: NaN, day: 1, expected: false, desc: "NaN month" },
      { year: 2024, month: 1, day: NaN, expected: false, desc: "NaN day" },
      {
        year: NaN,
        month: NaN,
        day: NaN,
        expected: false,
        desc: "all NaN",
      },
    ])("$desc", ({ year, month, day, expected }) => {
      expect(isExists(year, month, day)).toBe(expected);
    });
  });

  // Test Category 6: Invalid Inputs - Infinity (High Priority)
  describe("invalid inputs - Infinity", () => {
    it.each([
      {
        year: Infinity,
        month: 1,
        day: 1,
        expected: false,
        desc: "Infinity year",
      },
      {
        year: 2024,
        month: Infinity,
        day: 1,
        expected: false,
        desc: "Infinity month",
      },
      {
        year: 2024,
        month: 1,
        day: Infinity,
        expected: false,
        desc: "Infinity day",
      },
      {
        year: -Infinity,
        month: 1,
        day: 1,
        expected: false,
        desc: "-Infinity year",
      },
      {
        year: 2024,
        month: -Infinity,
        day: 1,
        expected: false,
        desc: "-Infinity month",
      },
      {
        year: 2024,
        month: 1,
        day: -Infinity,
        expected: false,
        desc: "-Infinity day",
      },
      {
        year: Infinity,
        month: Infinity,
        day: Infinity,
        expected: false,
        desc: "all Infinity",
      },
      {
        year: -Infinity,
        month: -Infinity,
        day: -Infinity,
        expected: false,
        desc: "all -Infinity",
      },
    ])("$desc", ({ year, month, day, expected }) => {
      expect(isExists(year, month, day)).toBe(expected);
    });
  });

  // Test Category 7: Edge Cases - Fractional Values (High Priority)
  describe("fractional inputs", () => {
    it.each([
      {
        year: 2024.9,
        month: 1,
        day: 15,
        expected: true,
        desc: "fractional year (integer part 2024 used)",
      },
      {
        year: 2024,
        month: 1.7,
        day: 15,
        expected: true,
        desc: "fractional month (integer part 1 used)",
      },
      {
        year: 2024,
        month: 1,
        day: 15.3,
        expected: true,
        desc: "fractional day (integer part 15 used)",
      },
      {
        year: 2024.5,
        month: 2.9,
        day: 29.1,
        expected: true,
        desc: "all fractional (treated as 2024/2/29)",
      },
      {
        year: 2023.9,
        month: 2.9,
        day: 29.1,
        expected: false,
        desc: "all fractional (2023/2/29 does not exist)",
      },
      {
        year: 2024,
        month: 4.9,
        day: 31.1,
        expected: false,
        desc: "fractional April 31 (does not exist)",
      },
      {
        year: 2024,
        month: 1.9,
        day: 31.9,
        expected: true,
        desc: "fractional January 31 (exists)",
      },
    ])("$desc", ({ year, month, day, expected }) => {
      expect(isExists(year, month, day)).toBe(expected);
    });
  });

  // Test Category 8: Happy Path - Valid Dates (Minimum Necessary)
  describe("valid dates", () => {
    it.each([
      {
        year: 2024,
        month: 1,
        day: 15,
        expected: true,
        desc: "typical valid date (2024/1/15)",
      },
      {
        year: 2024,
        month: 6,
        day: 15,
        expected: true,
        desc: "mid-year valid date (2024/6/15)",
      },
      {
        year: 2024,
        month: 12,
        day: 31,
        expected: true,
        desc: "end-of-year valid date (2024/12/31)",
      },
    ])("$desc", ({ year, month, day, expected }) => {
      expect(isExists(year, month, day)).toBe(expected);
    });
  });

  // Test Category 9: Invalid Dates - Non-existent Dates (High Priority)
  describe("non-existent dates", () => {
    it.each([
      {
        year: 2024,
        month: 2,
        day: 30,
        expected: false,
        desc: "February 30 (does not exist)",
      },
      {
        year: 2024,
        month: 2,
        day: 31,
        expected: false,
        desc: "February 31 (does not exist)",
      },
      {
        year: 2024,
        month: 4,
        day: 31,
        expected: false,
        desc: "April 31 (does not exist)",
      },
      {
        year: 2024,
        month: 6,
        day: 31,
        expected: false,
        desc: "June 31 (does not exist)",
      },
      {
        year: 2024,
        month: 9,
        day: 31,
        expected: false,
        desc: "September 31 (does not exist)",
      },
      {
        year: 2024,
        month: 11,
        day: 31,
        expected: false,
        desc: "November 31 (does not exist)",
      },
      {
        year: 2024,
        month: 13,
        day: 1,
        expected: false,
        desc: "month 13 day 1 (month 13 does not exist)",
      },
    ])("$desc", ({ year, month, day, expected }) => {
      expect(isExists(year, month, day)).toBe(expected);
    });
  });

  // Test Category 10: Edge Cases - Special Years (High Priority)
  describe("special years", () => {
    it.each([
      {
        year: 0,
        month: 1,
        day: 1,
        expected: true,
        desc: "year 0, January 1 (JavaScript Date compatible)",
      },
      {
        year: -1,
        month: 1,
        day: 1,
        expected: true,
        desc: "negative year (year -1, January 1)",
      },
      {
        year: 9999,
        month: 12,
        day: 31,
        expected: true,
        desc: "distant future (year 9999, December 31)",
      },
    ])("$desc", ({ year, month, day, expected }) => {
      expect(isExists(year, month, day)).toBe(expected);
    });
  });

  // Test Category 11: Edge Cases - Negative Values (High Priority)
  describe("negative values", () => {
    it.each([
      {
        year: 2024,
        month: -1,
        day: 1,
        expected: false,
        desc: "negative month (month -1)",
      },
      {
        year: 2024,
        month: 1,
        day: -1,
        expected: false,
        desc: "negative day (day -1)",
      },
      {
        year: -2024,
        month: 1,
        day: 1,
        expected: true,
        desc: "negative year (year -2024, BCE date)",
      },
    ])("$desc", ({ year, month, day, expected }) => {
      expect(isExists(year, month, day)).toBe(expected);
    });
  });
});
