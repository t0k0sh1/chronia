/**
 * Test Template: Arithmetic Functions
 *
 * Target functions:
 * - addYears, addMonths, addDays, addHours, addMinutes, addSeconds, addMilliseconds
 * - subYears, subMonths, subDays, subHours, subMinutes, subSeconds, subMilliseconds
 * - diffYears, diffMonths, diffDays, diffHours, diffMinutes, diffSeconds, diffMilliseconds
 *
 * Usage:
 * 1. Copy this file and save as tests/{functionName}.test.ts
 * 2. Replace `addDays` with the actual function name
 * 3. Add function-specific test cases (leap years, month boundaries, etc.)
 * 4. Remove unnecessary test cases
 *
 * Test Design:
 * - Equivalence partitioning: Positive numbers, negative numbers, zero, decimals
 * - Boundary values: Month boundaries, year boundaries, February in leap years, out-of-range values
 * - Invalid inputs: NaN, Infinity, -Infinity, Invalid Date
 * - Paired functions: addDays/subDays use the same test dataset (only expected values reversed)
 * - Type variations: Test all types when function accepts multiple types
 */

import { describe, it, expect } from "vitest";
import { addDays } from "../src/addDays";

describe("addDays", () => {
  it.each([
    // --- Valid cases ---

    // Equivalence partitioning: Positive numbers
    {
      date: new Date(2025, 0, 1),
      amount: 5,
      expected: new Date(2025, 0, 6),
      desc: "Add positive days",
    },

    // Equivalence partitioning: Negative numbers
    {
      date: new Date(2025, 0, 10),
      amount: -3,
      expected: new Date(2025, 0, 7),
      desc: "Add negative days (functions as subtraction)",
    },

    // Equivalence partitioning: Zero
    {
      date: new Date(2025, 0, 15),
      amount: 0,
      expected: new Date(2025, 0, 15),
      desc: "Add zero (date unchanged)",
    },

    // Equivalence partitioning: Positive decimal (truncation behavior)
    {
      date: new Date(2025, 0, 1),
      amount: 1.9,
      expected: new Date(2025, 0, 2),
      desc: "Truncate positive decimal (1.9 → 1)",
    },

    // Equivalence partitioning: Negative decimal (truncation behavior)
    {
      date: new Date(2025, 0, 5),
      amount: -1.9,
      expected: new Date(2025, 0, 4),
      desc: "Truncate negative decimal (-1.9 → -1)",
    },

    // Boundary value: Month boundary (Jan 31 → Feb 1)
    {
      date: new Date(2025, 0, 31),
      amount: 1,
      expected: new Date(2025, 1, 1),
      desc: "Cross month boundary (Jan → Feb)",
    },

    // Boundary value: Leap year Feb 28 → Feb 29
    {
      date: new Date(2024, 1, 28),
      amount: 1,
      expected: new Date(2024, 1, 29),
      desc: "Handle leap year Feb 29",
    },

    // Boundary value: Non-leap year Feb 28 → Mar 1
    {
      date: new Date(2023, 1, 28),
      amount: 1,
      expected: new Date(2023, 2, 1),
      desc: "Non-leap year Feb 28 to Mar 1",
    },

    // Boundary value: Year boundary (Dec 31 → Jan 1)
    {
      date: new Date(2025, 11, 31),
      amount: 1,
      expected: new Date(2026, 0, 1),
      desc: "Cross year boundary (2025 → 2026)",
    },

    // Date | number: Timestamp input
    {
      date: new Date(2025, 0, 1).getTime(),
      amount: 10,
      expected: new Date(2025, 0, 11),
      desc: "Accept timestamp input",
    },

    // Large positive number
    {
      date: new Date(2025, 0, 1),
      amount: 365,
      expected: new Date(2026, 0, 1),
      desc: "Large positive days (365 days)",
    },

    // Large negative number
    {
      date: new Date(2025, 0, 1),
      amount: -365,
      expected: new Date(2024, 0, 2),
      desc: "Large negative days (-365 days)",
    },

    // --- Invalid cases ---

    // Invalid Date input
    {
      date: new Date("invalid"),
      amount: 5,
      expected: new Date(NaN),
      desc: "Return Invalid Date when input is Invalid Date",
    },

    // NaN amount
    {
      date: new Date(2025, 0, 1),
      amount: NaN,
      expected: new Date(NaN),
      desc: "Return Invalid Date when amount is NaN",
    },

    // Infinity amount
    {
      date: new Date(2025, 0, 1),
      amount: Infinity,
      expected: new Date(NaN),
      desc: "Return Invalid Date when amount is Infinity",
    },

    // -Infinity amount
    {
      date: new Date(2025, 0, 1),
      amount: -Infinity,
      expected: new Date(NaN),
      desc: "Return Invalid Date when amount is -Infinity",
    },

    // NaN timestamp
    {
      date: NaN,
      amount: 1,
      expected: new Date(NaN),
      desc: "Return Invalid Date when timestamp is NaN",
    },
  ])("$desc", ({ date, amount, expected }) => {
    const result = addDays(date as Date | number, amount);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });
});
