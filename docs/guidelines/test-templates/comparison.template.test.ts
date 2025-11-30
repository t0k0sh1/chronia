/**
 * Test Template: Comparison Functions
 *
 * Target functions:
 * - isEqual, isBefore, isAfter, isBeforeOrEqual, isAfterOrEqual
 * - isBetween
 * - compare
 *
 * Usage:
 * 1. Copy this file and save as tests/{functionName}.test.ts
 * 2. Replace `isBefore` with the actual function name
 * 3. Add function-specific test cases (time units, options)
 * 4. Remove unnecessary test cases
 *
 * Test Design:
 * - Equivalence partitioning: Before (a < b), after (a > b), equal (a === b)
 * - Category values: All time units (year, month, day, hour, minute, second, millisecond)
 * - Boundary values: Boundary dates (leap years, end of month, year boundaries)
 * - Invalid inputs: Invalid Date, NaN, Infinity, -Infinity
 * - Paired functions: isBefore/isAfter use the same test dataset (only expected values reversed)
 * - Type variations: Test all types when function accepts multiple types
 *
 * Hierarchical test strategy:
 * - Basic comparison: isEqual, isBefore, isAfter (these are the foundation)
 * - Inclusive comparison: isBeforeOrEqual, isAfterOrEqual (use basic functions)
 * - Range comparison: isBetween (uses isBeforeOrEqual, isAfterOrEqual)
 * - Generic comparison: compare (uses is* functions)
 */

import { describe, it, expect } from "vitest";
import { isBefore } from "../src/isBefore";

describe("isBefore", () => {
  describe("millisecond comparison (default)", () => {
    it.each([
      // Equivalence partitioning: a < b (before)
      {
        a: new Date(2024, 0, 1, 12, 0, 0, 0),
        b: new Date(2024, 0, 1, 12, 0, 0, 1),
        expected: true,
        desc: "a is 1 millisecond before b",
      },
      // Equivalence partitioning: a > b (after)
      {
        a: new Date(2024, 0, 1, 12, 0, 0, 1),
        b: new Date(2024, 0, 1, 12, 0, 0, 0),
        expected: false,
        desc: "a is 1 millisecond after b",
      },
      // Equivalence partitioning: a === b (equal)
      {
        a: new Date(2024, 0, 1, 12, 0, 0, 0),
        b: new Date(2024, 0, 1, 12, 0, 0, 0),
        expected: false,
        desc: "a and b are equal",
      },
    ])("$desc", ({ a, b, expected }) => {
      expect(isBefore(a, b)).toBe(expected);
    });
  });

  // Category value test: All time units (year, month, day, hour, minute, second)
  describe("year comparison", () => {
    it.each([
      {
        a: new Date(2024, 0, 1),
        b: new Date(2025, 0, 1),
        expected: true,
        desc: "2024 < 2025",
      },
      {
        a: new Date(2025, 0, 1),
        b: new Date(2024, 0, 1),
        expected: false,
        desc: "2025 > 2024",
      },
      {
        a: new Date(2024, 11, 31),
        b: new Date(2024, 0, 1),
        expected: false,
        desc: "Within same year returns false",
      },
    ])("$desc", ({ a, b, expected }) => {
      expect(isBefore(a, b, { unit: "year" })).toBe(expected);
    });
  });

  describe("month comparison", () => {
    it.each([
      {
        a: new Date(2024, 0, 1),
        b: new Date(2024, 1, 1),
        expected: true,
        desc: "Jan < Feb",
      },
      {
        a: new Date(2024, 1, 1),
        b: new Date(2024, 0, 1),
        expected: false,
        desc: "Feb > Jan",
      },
      {
        a: new Date(2024, 0, 31),
        b: new Date(2024, 0, 1),
        expected: false,
        desc: "Within same month returns false",
      },
      {
        a: new Date(2024, 11, 31),
        b: new Date(2025, 0, 1),
        expected: true,
        desc: "Month comparison across year boundary (Dec < Jan)",
      },
    ])("$desc", ({ a, b, expected }) => {
      expect(isBefore(a, b, { unit: "month" })).toBe(expected);
    });
  });

  describe("day comparison", () => {
    it.each([
      {
        a: new Date(2024, 0, 1, 23, 59, 59),
        b: new Date(2024, 0, 2, 0, 0, 0),
        expected: true,
        desc: "Day 1 < Day 2",
      },
      {
        a: new Date(2024, 0, 2, 0, 0, 0),
        b: new Date(2024, 0, 1, 23, 59, 59),
        expected: false,
        desc: "Day 2 > Day 1",
      },
      {
        a: new Date(2024, 0, 1, 0, 0, 0),
        b: new Date(2024, 0, 1, 12, 0, 0),
        expected: false,
        desc: "Within same day returns false",
      },
    ])("$desc", ({ a, b, expected }) => {
      expect(isBefore(a, b, { unit: "day" })).toBe(expected);
    });
  });

  describe("hour comparison", () => {
    it.each([
      {
        a: new Date(2024, 0, 1, 12, 59, 59),
        b: new Date(2024, 0, 1, 13, 0, 0),
        expected: true,
        desc: "12:xx < 13:xx",
      },
      {
        a: new Date(2024, 0, 1, 13, 0, 0),
        b: new Date(2024, 0, 1, 12, 59, 59),
        expected: false,
        desc: "13:xx > 12:xx",
      },
      {
        a: new Date(2024, 0, 1, 12, 0, 0),
        b: new Date(2024, 0, 1, 12, 30, 0),
        expected: false,
        desc: "Within same hour returns false",
      },
      {
        a: new Date(2024, 0, 1, 23, 59, 59),
        b: new Date(2024, 0, 2, 0, 0, 0),
        expected: true,
        desc: "Hour comparison across day boundary (23:xx < 00:xx)",
      },
    ])("$desc", ({ a, b, expected }) => {
      expect(isBefore(a, b, { unit: "hour" })).toBe(expected);
    });
  });

  describe("minute comparison", () => {
    it.each([
      {
        a: new Date(2024, 0, 1, 12, 0, 59),
        b: new Date(2024, 0, 1, 12, 1, 0),
        expected: true,
        desc: "xx:00 < xx:01",
      },
      {
        a: new Date(2024, 0, 1, 12, 1, 0),
        b: new Date(2024, 0, 1, 12, 0, 59),
        expected: false,
        desc: "xx:01 > xx:00",
      },
      {
        a: new Date(2024, 0, 1, 12, 0, 0),
        b: new Date(2024, 0, 1, 12, 0, 30),
        expected: false,
        desc: "Within same minute returns false",
      },
      {
        a: new Date(2024, 0, 1, 12, 59, 59),
        b: new Date(2024, 0, 1, 13, 0, 0),
        expected: true,
        desc: "Minute comparison across hour boundary (xx:59 < xx:00)",
      },
    ])("$desc", ({ a, b, expected }) => {
      expect(isBefore(a, b, { unit: "minute" })).toBe(expected);
    });
  });

  describe("second comparison", () => {
    it.each([
      {
        a: new Date(2024, 0, 1, 12, 0, 0, 999),
        b: new Date(2024, 0, 1, 12, 0, 1, 0),
        expected: true,
        desc: "xx:xx:00 < xx:xx:01",
      },
      {
        a: new Date(2024, 0, 1, 12, 0, 1, 0),
        b: new Date(2024, 0, 1, 12, 0, 0, 999),
        expected: false,
        desc: "xx:xx:01 > xx:xx:00",
      },
      {
        a: new Date(2024, 0, 1, 12, 0, 0, 0),
        b: new Date(2024, 0, 1, 12, 0, 0, 500),
        expected: false,
        desc: "Within same second returns false",
      },
      {
        a: new Date(2024, 0, 1, 12, 0, 1),
        b: new Date(2024, 0, 1, 12, 0, 2),
        expected: true,
        desc: "1 second < 2 seconds",
      },
    ])("$desc", ({ a, b, expected }) => {
      expect(isBefore(a, b, { unit: "second" })).toBe(expected);
    });
  });

  describe("edge cases", () => {
    it("Handle leap year Feb 29", () => {
      expect(
        isBefore(new Date(2024, 1, 29), new Date(2024, 2, 1), { unit: "day" })
      ).toBe(true);
      expect(
        isBefore(new Date(2024, 2, 1), new Date(2024, 1, 29), { unit: "day" })
      ).toBe(false);
    });

    it("Handle year boundary", () => {
      expect(
        isBefore(
          new Date(2024, 11, 31, 23, 59, 59),
          new Date(2025, 0, 1, 0, 0, 0)
        )
      ).toBe(true);
      expect(
        isBefore(
          new Date(2025, 0, 1, 0, 0, 0),
          new Date(2024, 11, 31, 23, 59, 59)
        )
      ).toBe(false);
    });

    it("Handle DST transition", () => {
      const beforeDST = new Date(2024, 2, 10, 1, 59, 59);
      const afterDST = new Date(2024, 2, 10, 3, 0, 0);
      expect(isBefore(beforeDST, afterDST)).toBe(true);
      expect(isBefore(afterDST, beforeDST)).toBe(false);
    });

    it("Handle negative years (BC dates)", () => {
      const date1 = new Date(-200, 0, 1);
      const date2 = new Date(-100, 0, 1);
      expect(isBefore(date1, date2)).toBe(true);
      expect(isBefore(date2, date1)).toBe(false);
    });

    it("Handle same dates", () => {
      const date = new Date(2024, 0, 1, 12, 0, 0, 0);
      expect(isBefore(date, date)).toBe(false);
      expect(isBefore(date, date, { unit: "year" })).toBe(false);
      expect(isBefore(date, date, { unit: "month" })).toBe(false);
      expect(isBefore(date, date, { unit: "day" })).toBe(false);
      expect(isBefore(date, date, { unit: "hour" })).toBe(false);
      expect(isBefore(date, date, { unit: "minute" })).toBe(false);
      expect(isBefore(date, date, { unit: "second" })).toBe(false);
    });
  });

  describe("invalid input handling", () => {
    it("Return false when first argument is invalid", () => {
      expect(isBefore(new Date(NaN), new Date(2024, 0, 1))).toBe(false);
      expect(isBefore(NaN, new Date(2024, 0, 1))).toBe(false);
      expect(isBefore(Infinity, new Date(2024, 0, 1))).toBe(false);
      expect(isBefore(-Infinity, new Date(2024, 0, 1))).toBe(false);
    });

    it("Return false when second argument is invalid", () => {
      expect(isBefore(new Date(2024, 0, 1), new Date(NaN))).toBe(false);
      expect(isBefore(new Date(2024, 0, 1), NaN)).toBe(false);
      expect(isBefore(new Date(2024, 0, 1), Infinity)).toBe(false);
      expect(isBefore(new Date(2024, 0, 1), -Infinity)).toBe(false);
    });

    it("Return false when both arguments are invalid", () => {
      expect(isBefore(new Date(NaN), new Date(NaN))).toBe(false);
      expect(isBefore(NaN, NaN)).toBe(false);
      expect(isBefore(Infinity, -Infinity)).toBe(false);
    });
  });
});
