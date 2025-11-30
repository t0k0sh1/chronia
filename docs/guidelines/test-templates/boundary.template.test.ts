/**
 * Test Template: Boundary Functions
 *
 * Target functions:
 * - startOfYear, startOfMonth, startOfDay
 * - endOfYear, endOfMonth, endOfDay
 *
 * Usage:
 * 1. Copy this file and save as tests/{functionName}.test.ts
 * 2. Replace `startOfMonth` with the actual function name
 * 3. Add function-specific test cases (boundary dates)
 * 4. Remove unnecessary test cases
 *
 * Test Design:
 * - Equivalence partitioning: Valid dates, invalid dates
 * - Category values: All months (1-12), leap years/non-leap years
 * - Boundary values: Month-end day variations (28/29/30/31)
 * - Invalid inputs: Invalid Date, NaN
 * - Paired functions: startOfYear/endOfYear use related test data
 * - Type variations: Test all types when function accepts multiple types
 */

import { describe, it, expect } from "vitest";
import { startOfMonth } from "../src/startOfMonth";

describe("startOfMonth", () => {
  it.each([
    // --- Valid cases ---

    {
      date: new Date(2024, 5, 15, 14, 30, 45, 123),
      expected: new Date(2024, 5, 1, 0, 0, 0, 0),
      desc: "Set to first day of month (Jun 15 → Jun 1 00:00:00.000)",
    },
    {
      date: new Date(2024, 0, 31, 23, 59, 59, 999),
      expected: new Date(2024, 0, 1, 0, 0, 0, 0),
      desc: "Set from end of month to start of month (Jan 31 → Jan 1 00:00:00.000)",
    },
    {
      date: new Date(2024, 0, 1, 0, 0, 0, 0),
      expected: new Date(2024, 0, 1, 0, 0, 0, 0),
      desc: "Already at start of month (no change)",
    },

    // Boundary value: February in leap years
    {
      date: new Date(2024, 1, 29, 14, 30, 45),
      expected: new Date(2024, 1, 1, 0, 0, 0, 0),
      desc: "Leap year Feb 29 → Feb 1",
    },
    {
      date: new Date(2023, 1, 28, 14, 30, 45),
      expected: new Date(2023, 1, 1, 0, 0, 0, 0),
      desc: "Non-leap year Feb 28 → Feb 1",
    },

    // Boundary value: Year boundary
    {
      date: new Date(2024, 11, 31, 23, 59, 59, 999),
      expected: new Date(2024, 11, 1, 0, 0, 0, 0),
      desc: "Year-end Dec 31 → Dec 1",
    },
    {
      date: new Date(2025, 0, 1, 0, 0, 0, 1),
      expected: new Date(2025, 0, 1, 0, 0, 0, 0),
      desc: "Year-start Jan 1 → Jan 1",
    },

    // Date | number: Timestamp input
    {
      date: new Date(2024, 5, 15, 14, 30, 45).getTime(),
      expected: new Date(2024, 5, 1, 0, 0, 0, 0),
      desc: "Accept timestamp input",
    },

    // --- Invalid cases ---

    // Invalid Date input
    {
      date: new Date("invalid"),
      expected: new Date(NaN),
      desc: "Return Invalid Date when input is Invalid Date",
    },

    // NaN timestamp
    {
      date: NaN,
      expected: new Date(NaN),
      desc: "Return Invalid Date when timestamp is NaN",
    },
  ])("$desc", ({ date, expected }) => {
    const result = startOfMonth(date as Date | number);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });

  // Category value test: Comprehensive testing of all months (1-12)
  describe("all months coverage", () => {
    it("Can get the start of all months", () => {
      // Coverage checklist: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
      for (let month = 0; month < 12; month++) {
        const date = new Date(2024, month, 15, 14, 30, 45);
        const result = startOfMonth(date);
        expect(result.getMonth()).toBe(month);
        expect(result.getDate()).toBe(1);
        expect(result.getHours()).toBe(0);
        expect(result.getMinutes()).toBe(0);
        expect(result.getSeconds()).toBe(0);
        expect(result.getMilliseconds()).toBe(0);
      }
    });
  });

  // Boundary value test: Month-end day variations
  describe("month-end day variations", () => {
    it("Handle all month-end day patterns", () => {
      // 28 days: February (non-leap year)
      const feb28 = startOfMonth(new Date(2023, 1, 28));
      expect(feb28.getTime()).toBe(new Date(2023, 1, 1, 0, 0, 0, 0).getTime());

      // 29 days: February (leap year)
      const feb29 = startOfMonth(new Date(2024, 1, 29));
      expect(feb29.getTime()).toBe(new Date(2024, 1, 1, 0, 0, 0, 0).getTime());

      // 30 days: April, June, September, November
      const apr30 = startOfMonth(new Date(2024, 3, 30));
      expect(apr30.getTime()).toBe(new Date(2024, 3, 1, 0, 0, 0, 0).getTime());

      // 31 days: January, March, May, July, August, October, December
      const jan31 = startOfMonth(new Date(2024, 0, 31));
      expect(jan31.getTime()).toBe(new Date(2024, 0, 1, 0, 0, 0, 0).getTime());
    });
  });
});
