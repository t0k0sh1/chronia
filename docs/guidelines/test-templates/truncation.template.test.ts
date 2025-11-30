/**
 * Test Template: Truncation Functions
 *
 * Target functions:
 * - truncYear, truncMonth, truncDay, truncHour, truncMinute, truncSecond, truncMillisecond
 *
 * Usage:
 * 1. Copy this file and save as tests/{functionName}.test.ts
 * 2. Replace `truncDay` with the actual function name
 * 3. Add function-specific test cases (truncation units)
 * 4. Remove unnecessary test cases
 *
 * Test Design:
 * - Equivalence partitioning: Valid dates, invalid dates
 * - Category values: All time units (year, month, day, hour, minute, second, millisecond)
 * - Idempotency: truncDay(truncDay(date)) === truncDay(date)
 * - Invalid inputs: Invalid Date, NaN
 * - Type variations: Test all types when function accepts multiple types
 */

import { describe, it, expect } from "vitest";
import { truncDay } from "../src/truncDay";

describe("truncDay", () => {
  it.each([
    // --- Valid cases ---

    {
      date: new Date(2024, 5, 15, 14, 30, 45, 123),
      expected: new Date(2024, 5, 15, 0, 0, 0, 0),
      desc: "Truncate to day (zero out time components)",
    },
    {
      date: new Date(2024, 0, 1, 23, 59, 59, 999),
      expected: new Date(2024, 0, 1, 0, 0, 0, 0),
      desc: "Truncate last timestamp of the day",
    },
    {
      date: new Date(2024, 0, 1, 0, 0, 0, 0),
      expected: new Date(2024, 0, 1, 0, 0, 0, 0),
      desc: "Already truncated date (no change)",
    },

    // Boundary value: Leap year Feb 29
    {
      date: new Date(2024, 1, 29, 14, 30, 45),
      expected: new Date(2024, 1, 29, 0, 0, 0, 0),
      desc: "Truncate leap year Feb 29",
    },

    // Boundary value: Year boundary
    {
      date: new Date(2024, 11, 31, 23, 59, 59, 999),
      expected: new Date(2024, 11, 31, 0, 0, 0, 0),
      desc: "Truncate year-end day",
    },
    {
      date: new Date(2025, 0, 1, 0, 0, 0, 1),
      expected: new Date(2025, 0, 1, 0, 0, 0, 0),
      desc: "Truncate year-start day",
    },

    // Date | number: Timestamp input
    {
      date: new Date(2024, 5, 15, 14, 30, 45).getTime(),
      expected: new Date(2024, 5, 15, 0, 0, 0, 0),
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
    const result = truncDay(date as Date | number);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });

  // Idempotence test: truncDay(truncDay(date)) === truncDay(date)
  describe("idempotence", () => {
    it("Truncation operation is idempotent", () => {
      const date = new Date(2024, 5, 15, 14, 30, 45, 123);
      const truncated1 = truncDay(date);
      const truncated2 = truncDay(truncated1);
      expect(truncated2.getTime()).toBe(truncated1.getTime());
    });
  });
});
