/**
 * Test Template: Getter Functions
 *
 * Target functions:
 * - getYear, getMonth, getDay, getHours, getMinutes, getSeconds, getMilliseconds
 * - getTime, getDayOfWeek, getDayOfYear, getWeekOfYear
 *
 * Usage:
 * 1. Copy this file and save as tests/{functionName}.test.ts
 * 2. Replace `getMonth` with the actual function name
 * 3. Add function-specific test cases (return value ranges)
 * 4. Remove unnecessary test cases
 *
 * Test Design:
 * - Equivalence partitioning: Valid dates, invalid dates
 * - Category values: All months (0-11), all weekdays (0-6)
 * - Boundary values: Minimum value, maximum value
 * - Invalid inputs: Invalid Date, NaN
 * - Type variations: Test all types when function accepts multiple types
 */

import { describe, it, expect } from "vitest";
import { getMonth } from "../src";

describe("getMonth", () => {
  describe("normal cases", () => {
    it.each([
      { dateStr: "2024-01-01", expected: 0, desc: "January (year start)" },
      { dateStr: "2024-06-15", expected: 5, desc: "June (mid-year)" },
      { dateStr: "2024-12-31", expected: 11, desc: "December (year end)" },
      { dateStr: "2023-02-15", expected: 1, desc: "February" },
      { dateStr: "2025-11-30", expected: 10, desc: "November" },
    ])("$desc -> $expected", ({ dateStr, expected }) => {
      const date = new Date(dateStr);
      expect(getMonth(date)).toBe(expected);
    });

    it("Return month in local timezone", () => {
      // getMonth() returns the month in local timezone
      const date = new Date("2024-06-15T12:00:00.000Z");
      const expected = date.getMonth();
      expect(getMonth(date)).toBe(expected);
    });
  });

  // Category value test: Comprehensive testing of all months (0-11)
  describe("all months coverage", () => {
    it("Handle all months (Jan-Dec)", () => {
      // Coverage checklist: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
      for (let month = 0; month < 12; month++) {
        const date = new Date(2024, month, 15);
        expect(getMonth(date)).toBe(month);
      }
    });
  });

  describe("edge cases", () => {
    it("Handle leap years", () => {
      expect(getMonth(new Date("2024-02-29"))).toBe(1); // Leap year
      expect(getMonth(new Date("2000-02-29"))).toBe(1); // Divisible by 400
      expect(getMonth(new Date("2023-02-28"))).toBe(1); // Non-leap year
      expect(getMonth(new Date("1900-02-28"))).toBe(1); // Divisible by 100 but not 400
    });
  });

  describe("historic dates", () => {
    it.each([
      { dateStr: "1970-01-01", expected: 0, desc: "Unix epoch" },
      { dateStr: "1776-07-04", expected: 6, desc: "US Independence Day" },
      { dateStr: "0001-01-01", expected: 0, desc: "Year 1 AD January" },
      { dateStr: "0001-12-31", expected: 11, desc: "Year 1 AD December" },
    ])("Historic date $desc -> $expected", ({ dateStr, expected }) => {
      const date = new Date(dateStr);
      expect(getMonth(date)).toBe(expected);
    });
  });

  describe("future dates", () => {
    it.each([
      { dateStr: "2030-01-01", expected: 0 },
      { dateStr: "2050-06-15", expected: 5 },
      { dateStr: "2999-12-31", expected: 11 },
    ])("Future date $dateStr -> $expected", ({ dateStr, expected }) => {
      const date = new Date(dateStr);
      expect(getMonth(date)).toBe(expected);
    });
  });

  describe("invalid dates", () => {
    it("Return NaN for invalid dates", () => {
      expect(getMonth(new Date("invalid"))).toBeNaN();
      expect(getMonth(new Date(""))).toBeNaN();
    });
  });

  describe("number input (timestamp)", () => {
    it("Accept timestamp input", () => {
      const timestamp = new Date("2024-08-15").getTime();
      expect(getMonth(timestamp)).toBe(7);
    });

    it("Handle boundary timestamps", () => {
      expect(getMonth(0)).toBe(0); // Unix epoch (Jan 1970)
      expect(getMonth(-86400000)).toBe(11); // Day before epoch (Dec 1969)
      expect(getMonth(86400000)).toBe(0); // Day after epoch
    });

    it("Handle all months via timestamp", () => {
      for (let month = 0; month < 12; month++) {
        const date = new Date(2024, month, 15);
        const timestamp = date.getTime();
        expect(getMonth(timestamp)).toBe(month);
      }
    });
  });

  describe("negative years (BC dates)", () => {
    it("Handle BC dates", () => {
      // Note: JavaScript Date can handle negative years (BC)
      const bcDate = new Date();
      bcDate.setFullYear(-100, 5, 15); // 100 BC June
      expect(getMonth(bcDate)).toBe(5);

      const bcDate2 = new Date();
      bcDate2.setFullYear(-1, 11, 25); // 1 BC December
      expect(getMonth(bcDate2)).toBe(11);
    });
  });
});
