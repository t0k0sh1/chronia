/**
 * Test Template: Setter Functions
 *
 * Target functions:
 * - setYear, setMonth, setDay, setHours, setMinutes, setSeconds, setMilliseconds
 * - setTime
 *
 * Usage:
 * 1. Copy this file and save as tests/{functionName}.test.ts
 * 2. Replace `setMonth` with the actual function name
 * 3. Add function-specific test cases (date adjustment, overflow)
 * 4. Remove unnecessary test cases
 *
 * Test Design:
 * - Equivalence partitioning: Valid values (0-11), out-of-range values (-1, 12)
 * - Category values: All months (0-11), boundary values (0, 1, 11, 12)
 * - Boundary values: February 29th in leap years, end-of-month dates (28/29/30/31), out-of-range values
 * - Invalid inputs: Invalid Date, NaN, Infinity, -Infinity
 * - Type variations: Test all types when function accepts multiple types
 */

import { describe, it, expect } from "vitest";
import { setMonth } from "../src/setMonth";

describe("setMonth", () => {
  it.each([
    // --- Valid cases ---

    // Equivalence partitioning: Valid months (0-11)
    {
      date: new Date(2025, 0, 15),
      month: 5,
      expected: new Date(2025, 5, 15),
      desc: "Set to June (5)",
    },
    {
      date: new Date(2025, 5, 15),
      month: 0,
      expected: new Date(2025, 0, 15),
      desc: "Set to January (0)",
    },
    {
      date: new Date(2025, 5, 15),
      month: 11,
      expected: new Date(2025, 11, 15),
      desc: "Set to December (11)",
    },
    {
      date: new Date(2025, 5, 15),
      month: 5,
      expected: new Date(2025, 5, 15),
      desc: "Set to same month (no change)",
    },

    // Boundary value: Month-end day adjustment (Jan 31 → Feb 28)
    {
      date: new Date(2025, 0, 31),
      month: 1,
      expected: new Date(2025, 1, 28),
      desc: "Adjust when day exceeds month end (Jan 31 → Feb 28)",
    },

    // Boundary value: Leap year Feb 29 (Jan 31 → Feb 29)
    {
      date: new Date(2024, 0, 31),
      month: 1,
      expected: new Date(2024, 1, 29),
      desc: "Adjust to Feb 29 in leap year (Jan 31 → Feb 29)",
    },

    // Boundary value: Last day of April (Mar 31 → Apr 30)
    {
      date: new Date(2025, 2, 31),
      month: 3,
      expected: new Date(2025, 3, 30),
      desc: "Adjust to last day of April (Mar 31 → Apr 30)",
    },

    // Preserve time and milliseconds
    {
      date: new Date(2025, 0, 15, 14, 30, 45, 123),
      month: 6,
      expected: new Date(2025, 6, 15, 14, 30, 45, 123),
      desc: "Preserve day, time, and milliseconds",
    },

    // Truncate decimal (positive decimal)
    {
      date: new Date(2025, 0, 15),
      month: 5.9,
      expected: new Date(2025, 5, 15),
      desc: "Truncate positive decimal (5.9 → 5)",
    },

    // Truncate decimal (negative decimal)
    {
      date: new Date(2025, 0, 15),
      month: -1.9,
      expected: new Date(2025, -1, 15),
      desc: "Truncate negative decimal (-1.9 → -1)",
    },

    // Out-of-range value: Negative month (roll back to previous year)
    {
      date: new Date(2025, 0, 15),
      month: -1,
      expected: new Date(2024, 11, 15),
      desc: "Negative month rolls back to previous year (-1 → previous Dec)",
    },

    // Out-of-range value: Overflow (roll forward to next year)
    {
      date: new Date(2025, 0, 15),
      month: 12,
      expected: new Date(2026, 0, 15),
      desc: "Month overflow rolls forward to next year (12 → next Jan)",
    },

    // Date | number: Timestamp input
    {
      date: new Date(2025, 0, 15).getTime(),
      month: 8,
      expected: new Date(2025, 8, 15),
      desc: "Accept timestamp input",
    },

    // --- Invalid cases ---

    // Invalid Date input
    {
      date: new Date("invalid"),
      month: 5,
      expected: new Date(NaN),
      desc: "Return Invalid Date when input is Invalid Date",
    },

    // NaN month
    {
      date: new Date(2025, 0, 15),
      month: NaN,
      expected: new Date(NaN),
      desc: "Return Invalid Date when month is NaN",
    },

    // Infinity month
    {
      date: new Date(2025, 0, 15),
      month: Infinity,
      expected: new Date(NaN),
      desc: "Return Invalid Date when month is Infinity",
    },

    // -Infinity month
    {
      date: new Date(2025, 0, 15),
      month: -Infinity,
      expected: new Date(NaN),
      desc: "Return Invalid Date when month is -Infinity",
    },

    // NaN timestamp
    {
      date: NaN,
      month: 5,
      expected: new Date(NaN),
      desc: "Return Invalid Date when timestamp is NaN",
    },
  ])("$desc", ({ date, month, expected }) => {
    const result = setMonth(date as Date | number, month);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });

  // Category value test: Comprehensive testing of all months (0-11)
  describe("all months coverage", () => {
    it("Can set all months (0-11)", () => {
      // Coverage checklist: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
      const baseDate = new Date(2025, 6, 15); // July 15
      for (let month = 0; month < 12; month++) {
        const result = setMonth(baseDate, month);
        expect(result.getMonth()).toBe(month);
        expect(result.getDate()).toBe(15); // Day is preserved
      }
    });
  });

  // Boundary value test: Month-end day variations
  describe("month-end day adjustments", () => {
    it("Handle all month-end day patterns", () => {
      // 28 days: February (non-leap year)
      const jan31_to_feb = setMonth(new Date(2023, 0, 31), 1);
      expect(jan31_to_feb.getMonth()).toBe(1);
      expect(jan31_to_feb.getDate()).toBe(28);

      // 29 days: February (leap year)
      const jan31_to_feb_leap = setMonth(new Date(2024, 0, 31), 1);
      expect(jan31_to_feb_leap.getMonth()).toBe(1);
      expect(jan31_to_feb_leap.getDate()).toBe(29);

      // 30 days: April, June, September, November
      const mar31_to_apr = setMonth(new Date(2025, 2, 31), 3);
      expect(mar31_to_apr.getMonth()).toBe(3);
      expect(mar31_to_apr.getDate()).toBe(30);

      // 31 days: January, March, May, July, August, October, December
      const apr30_to_may = setMonth(new Date(2025, 3, 30), 4);
      expect(apr30_to_may.getMonth()).toBe(4);
      expect(apr30_to_may.getDate()).toBe(30); // May has 31 days, so 30 is preserved
    });
  });
});
