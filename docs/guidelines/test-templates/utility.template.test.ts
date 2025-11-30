/**
 * Test Template: Utility Functions
 *
 * Target functions:
 * - min, max, now, clamp
 *
 * Usage:
 * 1. Copy this file and save as tests/{functionName}.test.ts
 * 2. Replace `min` with the actual function name
 * 3. Add function-specific test cases (logic)
 * 4. Remove unnecessary test cases
 *
 * Test Design:
 * - min/max: Test empty array, single element, multiple elements, mixed with Invalid Date
 * - now: Test comparison with mock time
 * - clamp: Test within range, out of range (below min, above max)
 * - Invalid inputs: Invalid Date, NaN, Infinity, -Infinity
 * - Type variations: Test all types when function accepts multiple types
 */

import { describe, it, expect } from "vitest";
import { min } from "../src/min";

describe("min", () => {
  describe("valid cases", () => {
    it.each([
      {
        dates: [new Date(2024, 0, 1), new Date(2024, 0, 2), new Date(2024, 0, 3)],
        expected: new Date(2024, 0, 1),
        desc: "Return minimum from multiple dates",
      },
      {
        dates: [new Date(2024, 0, 3), new Date(2024, 0, 1), new Date(2024, 0, 2)],
        expected: new Date(2024, 0, 1),
        desc: "Return minimum from dates in different order",
      },
      {
        dates: [new Date(2024, 0, 1)],
        expected: new Date(2024, 0, 1),
        desc: "Return single date as-is",
      },
      {
        dates: [
          new Date(2024, 0, 1),
          new Date(2024, 0, 1),
          new Date(2024, 0, 1),
        ],
        expected: new Date(2024, 0, 1),
        desc: "Return date when all dates are identical",
      },
    ])("$desc", ({ dates, expected }) => {
      const result = min(...dates);
      expect(result.getTime()).toBe(expected.getTime());
    });

    it("Accept timestamp input", () => {
      const timestamps = [
        new Date(2024, 0, 1).getTime(),
        new Date(2024, 0, 2).getTime(),
        new Date(2024, 0, 3).getTime(),
      ];
      const result = min(...timestamps);
      expect(result.getTime()).toBe(new Date(2024, 0, 1).getTime());
    });

    it("Accept mixed Date and timestamp input", () => {
      const mixed: (Date | number)[] = [
        new Date(2024, 0, 2),
        new Date(2024, 0, 1).getTime(),
        new Date(2024, 0, 3),
      ];
      const result = min(...mixed);
      expect(result.getTime()).toBe(new Date(2024, 0, 1).getTime());
    });
  });

  describe("edge cases", () => {
    it("Return Invalid Date for empty array", () => {
      const result = min();
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("Consider only valid dates when Invalid Dates are mixed", () => {
      const result = min(
        new Date(2024, 0, 2),
        new Date("invalid"),
        new Date(2024, 0, 1),
        new Date(2024, 0, 3)
      );
      expect(result.getTime()).toBe(new Date(2024, 0, 1).getTime());
    });

    it("Return Invalid Date when all dates are Invalid", () => {
      const result = min(new Date("invalid"), new Date(NaN), new Date(""));
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("Consider only valid dates when NaN timestamps are mixed", () => {
      const result = min(
        new Date(2024, 0, 2).getTime(),
        NaN,
        new Date(2024, 0, 1).getTime()
      );
      expect(result.getTime()).toBe(new Date(2024, 0, 1).getTime());
    });

    it("Handle Infinity/-Infinity", () => {
      const result = min(
        Infinity,
        new Date(2024, 0, 1).getTime(),
        -Infinity
      );
      // -Infinity is the minimum value
      expect(result.getTime()).toBe(-Infinity);
    });
  });

  describe("boundary dates", () => {
    it("Handle leap year boundary", () => {
      const result = min(
        new Date(2024, 1, 29), // Leap year Feb 29
        new Date(2024, 2, 1),  // Mar 1
        new Date(2024, 1, 28)  // Feb 28
      );
      expect(result.getTime()).toBe(new Date(2024, 1, 28).getTime());
    });

    it("Handle year boundary", () => {
      const result = min(
        new Date(2024, 11, 31, 23, 59, 59, 999),
        new Date(2025, 0, 1, 0, 0, 0, 0),
        new Date(2024, 11, 31, 0, 0, 0, 0)
      );
      expect(result.getTime()).toBe(
        new Date(2024, 11, 31, 0, 0, 0, 0).getTime()
      );
    });
  });
});
