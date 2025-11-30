import { describe, it, expect } from "vitest";
import { isBetween } from "../src/isBetween";
import { MIN_DATE, MAX_DATE } from "../src/constants";
import type { Interval, BetweenOption } from "../src/types";

/**
 * Test Design for isBetween
 *
 * Function signature: isBetween(date: Date | number, interval: Interval, options?: BetweenOption): boolean
 *
 * Equivalence Partitioning:
 * - Class 1: date strictly between start and end (within range) → Returns true
 * - Class 2: date equals start or end boundary → Depends on bounds option
 * - Class 3: date outside range (before start or after end) → Returns false
 * - Class 4: Null boundaries (using MIN_DATE/MAX_DATE) → Range extended to infinity
 * - Class 5: Valid timestamp inputs → Same logic as Date inputs
 * - Class 6: Invalid date or interval inputs (Invalid Date, NaN, Infinity, -Infinity) → Returns false
 * - Class 7: Bounds options ("()", "[]", "[)", "(]") → Different inclusion/exclusion rules
 *
 * Boundary Value Analysis:
 * - Boundary inclusion/exclusion: Four bounds types ("()", "[]", "[)", "(]")
 * - Null boundaries: start=null uses MIN_DATE, end=null uses MAX_DATE
 * - Same start and end: Edge case where interval has zero width
 * - Inverted boundaries: start > end (invalid interval)
 * - Millisecond precision: Exact timestamp comparisons
 * - Extreme dates: MIN_DATE and MAX_DATE boundaries
 * - Default behavior: bounds="()" when no options provided
 */

describe("isBetween", () => {
  const baseDate = new Date(2024, 5, 15, 12, 30, 45); // June 15, 2024 12:30:45
  const startDate = new Date(2024, 5, 10, 10, 0, 0); // June 10, 2024 10:00:00
  const endDate = new Date(2024, 5, 20, 14, 0, 0); // June 20, 2024 14:00:00

  describe("Equivalence Class 1: date strictly between start and end", () => {
    it("should return true when date is strictly between start and end", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 12, 0, 0);
      const interval: Interval = { start: startDate, end: endDate };

      // Act & Assert
      expect(isBetween(date, interval)).toBe(true);
    });

    it("should return true for date in the middle of interval", () => {
      // Arrange
      const date = new Date(2024, 5, 12);
      const interval: Interval = { start: startDate, end: endDate };

      // Act & Assert
      expect(isBetween(date, interval)).toBe(true);
    });

    it("should return true for date between boundaries with millisecond precision", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 12, 30, 45, 500);
      const interval: Interval = {
        start: new Date(2024, 5, 15, 12, 30, 45, 400),
        end: new Date(2024, 5, 15, 12, 30, 45, 600),
      };

      // Act & Assert
      expect(isBetween(date, interval)).toBe(true);
    });
  });

  describe("Equivalence Class 2: date equals start or end boundary (default bounds)", () => {
    it("should return false when date equals start boundary (excluded by default)", () => {
      // Arrange
      const interval: Interval = { start: startDate, end: endDate };

      // Act & Assert
      expect(isBetween(startDate, interval)).toBe(false);
    });

    it("should return false when date equals end boundary (excluded by default)", () => {
      // Arrange
      const interval: Interval = { start: startDate, end: endDate };

      // Act & Assert
      expect(isBetween(endDate, interval)).toBe(false);
    });

    it("should return false when date equals start with millisecond precision", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 12, 30, 45, 400);
      const interval: Interval = {
        start: new Date(2024, 5, 15, 12, 30, 45, 400),
        end: new Date(2024, 5, 15, 12, 30, 45, 600),
      };

      // Act & Assert
      expect(isBetween(date, interval)).toBe(false);
    });

    it("should return false when date equals end with millisecond precision", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 12, 30, 45, 600);
      const interval: Interval = {
        start: new Date(2024, 5, 15, 12, 30, 45, 400),
        end: new Date(2024, 5, 15, 12, 30, 45, 600),
      };

      // Act & Assert
      expect(isBetween(date, interval)).toBe(false);
    });
  });

  describe("Equivalence Class 3: date outside range", () => {
    it("should return false when date is before start", () => {
      // Arrange
      const date = new Date(2024, 5, 5);
      const interval: Interval = { start: startDate, end: endDate };

      // Act & Assert
      expect(isBetween(date, interval)).toBe(false);
    });

    it("should return false when date is after end", () => {
      // Arrange
      const date = new Date(2024, 5, 25);
      const interval: Interval = { start: startDate, end: endDate };

      // Act & Assert
      expect(isBetween(date, interval)).toBe(false);
    });

    it("should return false when date is significantly before start", () => {
      // Arrange
      const date = new Date(2024, 0, 1);
      const interval: Interval = { start: startDate, end: endDate };

      // Act & Assert
      expect(isBetween(date, interval)).toBe(false);
    });

    it("should return false when date is significantly after end", () => {
      // Arrange
      const date = new Date(2024, 11, 31);
      const interval: Interval = { start: startDate, end: endDate };

      // Act & Assert
      expect(isBetween(date, interval)).toBe(false);
    });
  });

  describe("Equivalence Class 4: Null boundaries", () => {
    it("should return true when end is null (uses MAX_DATE) and date is after start", () => {
      // Arrange
      const date = baseDate;
      const interval: Interval = { start: startDate, end: null };

      // Act & Assert
      expect(isBetween(date, interval)).toBe(true);
    });

    it("should return false when end is null and date is before start", () => {
      // Arrange
      const date = new Date(2024, 5, 5);
      const interval: Interval = { start: startDate, end: null };

      // Act & Assert
      expect(isBetween(date, interval)).toBe(false);
    });

    it("should return false when end is null and date equals start", () => {
      // Arrange
      const interval: Interval = { start: startDate, end: null };

      // Act & Assert
      expect(isBetween(startDate, interval)).toBe(false);
    });

    it("should return true when start is null (uses MIN_DATE) and date is before end", () => {
      // Arrange
      const date = baseDate;
      const interval: Interval = { start: null, end: endDate };

      // Act & Assert
      expect(isBetween(date, interval)).toBe(true);
    });

    it("should return false when start is null and date is after end", () => {
      // Arrange
      const date = new Date(2024, 5, 25);
      const interval: Interval = { start: null, end: endDate };

      // Act & Assert
      expect(isBetween(date, interval)).toBe(false);
    });

    it("should return false when start is null and date equals end", () => {
      // Arrange
      const interval: Interval = { start: null, end: endDate };

      // Act & Assert
      expect(isBetween(endDate, interval)).toBe(false);
    });

    it("should return true when both boundaries are null (MIN_DATE < date < MAX_DATE)", () => {
      // Arrange
      const date = baseDate;
      const interval: Interval = { start: null, end: null };

      // Act & Assert
      expect(isBetween(date, interval)).toBe(true);
    });

    it("should return false when both boundaries are null and date equals MIN_DATE", () => {
      // Arrange
      const interval: Interval = { start: null, end: null };

      // Act & Assert
      expect(isBetween(MIN_DATE, interval)).toBe(false);
    });

    it("should return false when both boundaries are null and date equals MAX_DATE", () => {
      // Arrange
      const interval: Interval = { start: null, end: null };

      // Act & Assert
      expect(isBetween(MAX_DATE, interval)).toBe(false);
    });
  });

  describe("Equivalence Class 5: Valid timestamp inputs", () => {
    it("should accept timestamp inputs", () => {
      // Arrange
      const timestamp = baseDate.getTime();
      const interval: Interval = {
        start: startDate.getTime(),
        end: endDate.getTime(),
      };

      // Act & Assert
      expect(isBetween(timestamp, interval)).toBe(true);
    });

    it("should accept mixed Date and timestamp inputs", () => {
      // Arrange
      const timestamp = baseDate.getTime();
      const interval: Interval = { start: startDate, end: endDate.getTime() };

      // Act & Assert
      expect(isBetween(timestamp, interval)).toBe(true);
    });

    it("should accept Date for date parameter and timestamps for interval", () => {
      // Arrange
      const date = baseDate;
      const interval: Interval = {
        start: startDate.getTime(),
        end: endDate.getTime(),
      };

      // Act & Assert
      expect(isBetween(date, interval)).toBe(true);
    });
  });

  describe("Equivalence Class 6: Invalid date or interval inputs", () => {
    it("should return false when date is Invalid Date", () => {
      // Arrange
      const invalidDate = new Date("invalid");
      const interval: Interval = { start: startDate, end: endDate };

      // Act & Assert
      expect(isBetween(invalidDate, interval)).toBe(false);
    });

    it("should return false when date is NaN", () => {
      // Arrange
      const interval: Interval = { start: startDate, end: endDate };

      // Act & Assert
      expect(isBetween(NaN, interval)).toBe(false);
    });

    it("should return false when date is Infinity", () => {
      // Arrange
      const interval: Interval = { start: startDate, end: endDate };

      // Act & Assert
      expect(isBetween(Infinity, interval)).toBe(false);
    });

    it("should return false when date is -Infinity", () => {
      // Arrange
      const interval: Interval = { start: startDate, end: endDate };

      // Act & Assert
      expect(isBetween(-Infinity, interval)).toBe(false);
    });

    it("should return false when date is non-date string", () => {
      // Arrange
      const interval: Interval = { start: startDate, end: endDate };

      // Act & Assert
      expect(isBetween("invalid" as any, interval)).toBe(false);
    });

    it("should return false when date is boolean", () => {
      // Arrange
      const interval: Interval = { start: startDate, end: endDate };

      // Act & Assert
      expect(isBetween(true as any, interval)).toBe(false);
    });

    it("should return false when date is object", () => {
      // Arrange
      const interval: Interval = { start: startDate, end: endDate };

      // Act & Assert
      expect(isBetween({} as any, interval)).toBe(false);
    });

    it("should return false when date is array", () => {
      // Arrange
      const interval: Interval = { start: startDate, end: endDate };

      // Act & Assert
      expect(isBetween([] as any, interval)).toBe(false);
    });

    it("should return false when interval is null", () => {
      // Arrange
      const date = baseDate;

      // Act & Assert
      expect(isBetween(date, null as any)).toBe(false);
    });

    it("should return false when interval is undefined", () => {
      // Arrange
      const date = baseDate;

      // Act & Assert
      expect(isBetween(date, undefined as any)).toBe(false);
    });

    it("should return false when interval is string", () => {
      // Arrange
      const date = baseDate;

      // Act & Assert
      expect(isBetween(date, "invalid" as any)).toBe(false);
    });

    it("should return false when interval is number", () => {
      // Arrange
      const date = baseDate;

      // Act & Assert
      expect(isBetween(date, 123 as any)).toBe(false);
    });

    it("should return false when interval is boolean", () => {
      // Arrange
      const date = baseDate;

      // Act & Assert
      expect(isBetween(date, true as any)).toBe(false);
    });

    it("should return false when interval.start is Invalid Date", () => {
      // Arrange
      const date = baseDate;
      const interval: Interval = { start: new Date(NaN), end: endDate };

      // Act & Assert
      expect(isBetween(date, interval)).toBe(false);
    });

    it("should return false when interval.end is Invalid Date", () => {
      // Arrange
      const date = baseDate;
      const interval: Interval = { start: startDate, end: new Date(NaN) };

      // Act & Assert
      expect(isBetween(date, interval)).toBe(false);
    });

    it("should return false when interval.start is non-date string", () => {
      // Arrange
      const date = baseDate;
      const interval: Interval = { start: "invalid" as any, end: endDate };

      // Act & Assert
      expect(isBetween(date, interval)).toBe(false);
    });

    it("should return false when interval.end is non-date string", () => {
      // Arrange
      const date = baseDate;
      const interval: Interval = { start: startDate, end: "invalid" as any };

      // Act & Assert
      expect(isBetween(date, interval)).toBe(false);
    });

    it("should return false when interval.start is boolean", () => {
      // Arrange
      const date = baseDate;
      const interval: Interval = { start: true as any, end: endDate };

      // Act & Assert
      expect(isBetween(date, interval)).toBe(false);
    });

    it("should return false when interval.end is boolean", () => {
      // Arrange
      const date = baseDate;
      const interval: Interval = { start: startDate, end: false as any };

      // Act & Assert
      expect(isBetween(date, interval)).toBe(false);
    });

    it("should return false when interval.start is object", () => {
      // Arrange
      const date = baseDate;
      const interval: Interval = { start: {} as any, end: endDate };

      // Act & Assert
      expect(isBetween(date, interval)).toBe(false);
    });

    it("should return false when interval.end is array", () => {
      // Arrange
      const date = baseDate;
      const interval: Interval = { start: startDate, end: [] as any };

      // Act & Assert
      expect(isBetween(date, interval)).toBe(false);
    });
  });

  describe('Equivalence Class 7: Bounds option "()" - both boundaries excluded (default)', () => {
    const testDate = new Date(2024, 5, 15, 12, 0, 0);
    const testStart = new Date(2024, 5, 10, 10, 0, 0);
    const testEnd = new Date(2024, 5, 20, 14, 0, 0);
    const interval: Interval = { start: testStart, end: testEnd };
    const opts: BetweenOption = { bounds: "()" };

    it("should return true when date is strictly within range", () => {
      // Arrange & Act & Assert
      expect(isBetween(testDate, interval, opts)).toBe(true);
    });

    it("should return false when date equals start boundary (excluded)", () => {
      // Arrange & Act & Assert
      expect(isBetween(testStart, interval, opts)).toBe(false);
    });

    it("should return false when date equals end boundary (excluded)", () => {
      // Arrange & Act & Assert
      expect(isBetween(testEnd, interval, opts)).toBe(false);
    });

    it("should return false when date is before start", () => {
      // Arrange
      const date = new Date(2024, 5, 9);

      // Act & Assert
      expect(isBetween(date, interval, opts)).toBe(false);
    });

    it("should return false when date is after end", () => {
      // Arrange
      const date = new Date(2024, 5, 21);

      // Act & Assert
      expect(isBetween(date, interval, opts)).toBe(false);
    });

    it("should use '()' as default when no options provided", () => {
      // Arrange & Act & Assert
      expect(isBetween(testDate, interval)).toBe(true);
      expect(isBetween(testStart, interval)).toBe(false);
      expect(isBetween(testEnd, interval)).toBe(false);
    });
  });

  describe('Equivalence Class 7: Bounds option "[]" - both boundaries included', () => {
    const testDate = new Date(2024, 5, 15, 12, 0, 0);
    const testStart = new Date(2024, 5, 10, 10, 0, 0);
    const testEnd = new Date(2024, 5, 20, 14, 0, 0);
    const interval: Interval = { start: testStart, end: testEnd };
    const opts: BetweenOption = { bounds: "[]" };

    it("should return true when date is within range", () => {
      // Arrange & Act & Assert
      expect(isBetween(testDate, interval, opts)).toBe(true);
    });

    it("should return true when date equals start boundary (included)", () => {
      // Arrange & Act & Assert
      expect(isBetween(testStart, interval, opts)).toBe(true);
    });

    it("should return true when date equals end boundary (included)", () => {
      // Arrange & Act & Assert
      expect(isBetween(testEnd, interval, opts)).toBe(true);
    });

    it("should return false when date is before start", () => {
      // Arrange
      const date = new Date(2024, 5, 9);

      // Act & Assert
      expect(isBetween(date, interval, opts)).toBe(false);
    });

    it("should return false when date is after end", () => {
      // Arrange
      const date = new Date(2024, 5, 21);

      // Act & Assert
      expect(isBetween(date, interval, opts)).toBe(false);
    });
  });

  describe('Equivalence Class 7: Bounds option "[)" - start included, end excluded', () => {
    const testDate = new Date(2024, 5, 15, 12, 0, 0);
    const testStart = new Date(2024, 5, 10, 10, 0, 0);
    const testEnd = new Date(2024, 5, 20, 14, 0, 0);
    const interval: Interval = { start: testStart, end: testEnd };
    const opts: BetweenOption = { bounds: "[)" };

    it("should return true when date is within range", () => {
      // Arrange & Act & Assert
      expect(isBetween(testDate, interval, opts)).toBe(true);
    });

    it("should return true when date equals start boundary (included)", () => {
      // Arrange & Act & Assert
      expect(isBetween(testStart, interval, opts)).toBe(true);
    });

    it("should return false when date equals end boundary (excluded)", () => {
      // Arrange & Act & Assert
      expect(isBetween(testEnd, interval, opts)).toBe(false);
    });

    it("should return false when date is before start", () => {
      // Arrange
      const date = new Date(2024, 5, 9);

      // Act & Assert
      expect(isBetween(date, interval, opts)).toBe(false);
    });

    it("should return false when date is after end", () => {
      // Arrange
      const date = new Date(2024, 5, 21);

      // Act & Assert
      expect(isBetween(date, interval, opts)).toBe(false);
    });
  });

  describe('Equivalence Class 7: Bounds option "(]" - start excluded, end included', () => {
    const testDate = new Date(2024, 5, 15, 12, 0, 0);
    const testStart = new Date(2024, 5, 10, 10, 0, 0);
    const testEnd = new Date(2024, 5, 20, 14, 0, 0);
    const interval: Interval = { start: testStart, end: testEnd };
    const opts: BetweenOption = { bounds: "(]" };

    it("should return true when date is within range", () => {
      // Arrange & Act & Assert
      expect(isBetween(testDate, interval, opts)).toBe(true);
    });

    it("should return false when date equals start boundary (excluded)", () => {
      // Arrange & Act & Assert
      expect(isBetween(testStart, interval, opts)).toBe(false);
    });

    it("should return true when date equals end boundary (included)", () => {
      // Arrange & Act & Assert
      expect(isBetween(testEnd, interval, opts)).toBe(true);
    });

    it("should return false when date is before start", () => {
      // Arrange
      const date = new Date(2024, 5, 9);

      // Act & Assert
      expect(isBetween(date, interval, opts)).toBe(false);
    });

    it("should return false when date is after end", () => {
      // Arrange
      const date = new Date(2024, 5, 21);

      // Act & Assert
      expect(isBetween(date, interval, opts)).toBe(false);
    });
  });

  describe("Boundary Value Analysis: Extreme dates", () => {
    it("should handle date between MIN_DATE and MAX_DATE with null boundaries", () => {
      // Arrange
      const date = new Date(2024, 5, 15);
      const interval: Interval = { start: MIN_DATE, end: null };

      // Act & Assert
      expect(isBetween(date, interval)).toBe(true);
    });

    it("should handle date with null start and MAX_DATE end", () => {
      // Arrange
      const date = new Date(2024, 5, 15);
      const interval: Interval = { start: null, end: MAX_DATE };

      // Act & Assert
      expect(isBetween(date, interval)).toBe(true);
    });

    it("should return false when date is MIN_DATE and start is MIN_DATE", () => {
      // Arrange
      const interval: Interval = { start: MIN_DATE, end: endDate };

      // Act & Assert
      expect(isBetween(MIN_DATE, interval)).toBe(false);
    });

    it("should return false when date is MAX_DATE and end is MAX_DATE", () => {
      // Arrange
      const interval: Interval = { start: startDate, end: MAX_DATE };

      // Act & Assert
      expect(isBetween(MAX_DATE, interval)).toBe(false);
    });
  });

  describe("Boundary Value Analysis: Inverted boundaries", () => {
    it("should return false when start is after end (inverted interval)", () => {
      // Arrange
      const date = baseDate;
      const interval: Interval = { start: endDate, end: startDate };

      // Act & Assert
      expect(isBetween(date, interval)).toBe(false);
    });
  });

  describe("Boundary Value Analysis: Same start and end", () => {
    it("should return false when start equals end (default bounds)", () => {
      // Arrange
      const date = baseDate;
      const interval: Interval = { start: startDate, end: startDate };

      // Act & Assert
      expect(isBetween(date, interval)).toBe(false);
    });

    it("should return true when date equals both boundaries with '[]' bounds", () => {
      // Arrange
      const sameDate = new Date(2024, 5, 15, 12, 0, 0);
      const interval: Interval = { start: sameDate, end: sameDate };

      // Act & Assert
      expect(isBetween(sameDate, interval, { bounds: "[]" })).toBe(true);
    });

    it("should return false when date equals both boundaries with '[)' bounds", () => {
      // Arrange
      const sameDate = new Date(2024, 5, 15, 12, 0, 0);
      const interval: Interval = { start: sameDate, end: sameDate };

      // Act & Assert
      expect(isBetween(sameDate, interval, { bounds: "[)" })).toBe(false);
    });

    it("should return false when date equals both boundaries with '(]' bounds", () => {
      // Arrange
      const sameDate = new Date(2024, 5, 15, 12, 0, 0);
      const interval: Interval = { start: sameDate, end: sameDate };

      // Act & Assert
      expect(isBetween(sameDate, interval, { bounds: "(]" })).toBe(false);
    });

    it("should return false when date equals both boundaries with '()' bounds", () => {
      // Arrange
      const sameDate = new Date(2024, 5, 15, 12, 0, 0);
      const interval: Interval = { start: sameDate, end: sameDate };

      // Act & Assert
      expect(isBetween(sameDate, interval, { bounds: "()" })).toBe(false);
    });
  });

  describe("Boundary Value Analysis: Null boundaries with bounds options", () => {
    it("should handle null start with inclusive bounds", () => {
      // Arrange
      const testDate = new Date(2024, 5, 15, 12, 0, 0);
      const testEnd = new Date(2024, 5, 20, 14, 0, 0);
      const nullStartInterval: Interval = { start: null, end: testEnd };
      const inclusiveOpts: BetweenOption = { bounds: "[]" };

      // Act & Assert
      expect(isBetween(testDate, nullStartInterval, inclusiveOpts)).toBe(true);
      expect(isBetween(testEnd, nullStartInterval, inclusiveOpts)).toBe(true);
    });

    it("should handle null end with inclusive bounds", () => {
      // Arrange
      const testDate = new Date(2024, 5, 15, 12, 0, 0);
      const testStart = new Date(2024, 5, 10, 10, 0, 0);
      const nullEndInterval: Interval = { start: testStart, end: null };
      const inclusiveOpts: BetweenOption = { bounds: "[]" };

      // Act & Assert
      expect(isBetween(testDate, nullEndInterval, inclusiveOpts)).toBe(true);
      expect(isBetween(testStart, nullEndInterval, inclusiveOpts)).toBe(true);
    });

    it("should handle null start with exclusive bounds", () => {
      // Arrange
      const testEnd = new Date(2024, 5, 20, 14, 0, 0);
      const nullStartInterval: Interval = { start: null, end: testEnd };
      const exclusiveOpts: BetweenOption = { bounds: "()" };

      // Act & Assert
      expect(isBetween(testEnd, nullStartInterval, exclusiveOpts)).toBe(false);
    });

    it("should handle null end with exclusive bounds", () => {
      // Arrange
      const testStart = new Date(2024, 5, 10, 10, 0, 0);
      const nullEndInterval: Interval = { start: testStart, end: null };
      const exclusiveOpts: BetweenOption = { bounds: "()" };

      // Act & Assert
      expect(isBetween(testStart, nullEndInterval, exclusiveOpts)).toBe(false);
    });
  });

  describe("Boundary Value Analysis: Invalid bounds value", () => {
    it("should default to '()' when bounds value is invalid", () => {
      // Arrange
      const testDate = new Date(2024, 5, 15, 12, 0, 0);
      const testStart = new Date(2024, 5, 10, 10, 0, 0);
      const testEnd = new Date(2024, 5, 20, 14, 0, 0);
      const interval: Interval = { start: testStart, end: testEnd };
      const invalidOpts = { bounds: "invalid" as any };

      // Act & Assert
      expect(isBetween(testDate, interval, invalidOpts)).toBe(true);
      expect(isBetween(testStart, interval, invalidOpts)).toBe(false);
      expect(isBetween(testEnd, interval, invalidOpts)).toBe(false);
    });
  });

  describe("Type safety with Interval type", () => {
    it("should work with explicitly typed Interval objects", () => {
      // Arrange
      const interval1: Interval = { start: startDate, end: endDate };
      const interval2: Interval = { start: null, end: endDate };
      const interval3: Interval = { start: startDate, end: null };
      const interval4: Interval = { start: null, end: null };

      // Act & Assert
      expect(isBetween(baseDate, interval1)).toBe(true);
      expect(isBetween(baseDate, interval2)).toBe(true);
      expect(isBetween(baseDate, interval3)).toBe(true);
      expect(isBetween(baseDate, interval4)).toBe(true);
    });

    it("should maintain type safety with valid Interval structure", () => {
      // Arrange
      const validInterval: Interval = { start: startDate, end: endDate };

      // Act & Assert
      expect(isBetween(baseDate, validInterval)).toBe(true);
    });
  });

  describe("Backward compatibility", () => {
    it("should maintain existing behavior when no options provided", () => {
      // Arrange
      const date1 = new Date(2024, 5, 15);
      const date2 = new Date(2024, 5, 10, 10, 0, 0); // start
      const date3 = new Date(2024, 5, 20, 14, 0, 0); // end
      const testInterval: Interval = { start: date2, end: date3 };

      // Act & Assert - should use strict comparison (boundaries excluded)
      expect(isBetween(date1, testInterval)).toBe(true);
      expect(isBetween(date2, testInterval)).toBe(false);
      expect(isBetween(date3, testInterval)).toBe(false);
    });

    it("should be equivalent to explicit '()' bounds", () => {
      // Arrange
      const date1 = new Date(2024, 5, 15);
      const date2 = new Date(2024, 5, 10, 10, 0, 0);
      const date3 = new Date(2024, 5, 20, 14, 0, 0);
      const testInterval: Interval = { start: date2, end: date3 };

      // Act & Assert
      expect(isBetween(date1, testInterval)).toBe(
        isBetween(date1, testInterval, { bounds: "()" }),
      );
      expect(isBetween(date2, testInterval)).toBe(
        isBetween(date2, testInterval, { bounds: "()" }),
      );
      expect(isBetween(date3, testInterval)).toBe(
        isBetween(date3, testInterval, { bounds: "()" }),
      );
    });
  });
});
