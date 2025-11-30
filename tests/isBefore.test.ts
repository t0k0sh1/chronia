import { describe, it, expect } from "vitest";
import { isBefore } from "../src/isBefore";

/**
 * Test Design for isBefore
 *
 * Function signature: isBefore(dateLeft: Date | number, dateRight: Date | number, options?: { unit?: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' }): boolean
 *
 * Equivalence Partitioning:
 * - Class 1: Both valid Date objects → Returns boolean based on comparison
 * - Class 2: Both valid timestamps → Returns boolean based on comparison
 * - Class 3: Mixed Date and timestamp → Returns boolean based on comparison
 * - Class 4: Invalid first date + valid second date → Returns false
 * - Class 5: Valid first date + invalid second date → Returns false
 * - Class 6: Both dates invalid → Returns false
 * - Class 7: Unit-based comparison (year, month, day, hour, minute, second) → Returns boolean based on unit
 *
 * Boundary Value Analysis:
 * - Millisecond precision: dateLeft < dateRight by 1ms
 * - Unit boundaries: Year, month, day, hour, minute, second transitions
 * - Equality boundary: dateLeft === dateRight (should return false)
 * - Edge cases: Leap years, DST transitions, negative years, year boundaries
 *
 * Return Value Pattern:
 * - Returns true if dateLeft is before dateRight
 * - Returns false if dateLeft is after or equal to dateRight
 * - Returns false if either date is invalid
 */

describe("isBefore", () => {
  describe("Equivalence Class 1: Both valid Date objects (millisecond precision)", () => {
    it("should return true when first date is 1ms before second date", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 12, 0, 0, 0);
      const dateRight = new Date(2024, 0, 1, 12, 0, 0, 1);

      // Act
      const result = isBefore(dateLeft, dateRight);

      // Assert
      expect(result).toBe(true);
    });

    it("should return false when first date is 1ms after second date", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 12, 0, 0, 1);
      const dateRight = new Date(2024, 0, 1, 12, 0, 0, 0);

      // Act
      const result = isBefore(dateLeft, dateRight);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when both dates are exactly equal (boundary)", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 12, 0, 0, 0);
      const dateRight = new Date(2024, 0, 1, 12, 0, 0, 0);

      // Act
      const result = isBefore(dateLeft, dateRight);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when comparing same Date object", () => {
      // Arrange
      const date = new Date(2024, 0, 1, 12, 0, 0, 0);

      // Act
      const result = isBefore(date, date);

      // Assert
      expect(result).toBe(false);
    });
  });

  describe("Equivalence Class 2: Both valid timestamps", () => {
    it("should accept timestamp inputs and compare correctly", () => {
      // Arrange
      const timestamp1 = new Date(2024, 0, 1, 12, 0, 0, 0).getTime();
      const timestamp2 = new Date(2024, 0, 1, 12, 0, 0, 1).getTime();

      // Act
      const result = isBefore(timestamp1, timestamp2);

      // Assert
      expect(result).toBe(true);
    });

    it("should return false when first timestamp is later", () => {
      // Arrange
      const timestamp1 = new Date(2024, 0, 1, 12, 0, 0, 1).getTime();
      const timestamp2 = new Date(2024, 0, 1, 12, 0, 0, 0).getTime();

      // Act
      const result = isBefore(timestamp1, timestamp2);

      // Assert
      expect(result).toBe(false);
    });
  });

  describe("Equivalence Class 3: Mixed Date and timestamp", () => {
    it("should handle Date object vs timestamp", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 12, 0, 0, 0);
      const timestampRight = new Date(2024, 0, 1, 12, 0, 0, 1).getTime();

      // Act
      const result = isBefore(dateLeft, timestampRight);

      // Assert
      expect(result).toBe(true);
    });

    it("should handle timestamp vs Date object", () => {
      // Arrange
      const timestampLeft = new Date(2024, 0, 1, 12, 0, 0, 0).getTime();
      const dateRight = new Date(2024, 0, 1, 12, 0, 0, 1);

      // Act
      const result = isBefore(timestampLeft, dateRight);

      // Assert
      expect(result).toBe(true);
    });
  });

  describe("Equivalence Class 7: Unit-based comparison - year", () => {
    it("should return true when first year is before second year", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1);
      const dateRight = new Date(2025, 0, 1);

      // Act
      const result = isBefore(dateLeft, dateRight, { unit: "year" });

      // Assert
      expect(result).toBe(true);
    });

    it("should return false when first year is after second year", () => {
      // Arrange
      const dateLeft = new Date(2025, 0, 1);
      const dateRight = new Date(2024, 0, 1);

      // Act
      const result = isBefore(dateLeft, dateRight, { unit: "year" });

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when years are the same (regardless of month)", () => {
      // Arrange
      const dateLeft = new Date(2024, 11, 31);
      const dateRight = new Date(2024, 0, 1);

      // Act
      const result = isBefore(dateLeft, dateRight, { unit: "year" });

      // Assert
      expect(result).toBe(false);
    });

    it("should ignore month/day/time when comparing years", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1);
      const dateRight = new Date(2025, 0, 1);

      // Act
      const result = isBefore(dateLeft, dateRight, { unit: "year" });

      // Assert
      expect(result).toBe(true);
    });
  });

  describe("Equivalence Class 7: Unit-based comparison - month", () => {
    it("should return true when first month is before second month", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1);
      const dateRight = new Date(2024, 1, 1);

      // Act
      const result = isBefore(dateLeft, dateRight, { unit: "month" });

      // Assert
      expect(result).toBe(true);
    });

    it("should return false when first month is after second month", () => {
      // Arrange
      const dateLeft = new Date(2024, 1, 1);
      const dateRight = new Date(2024, 0, 1);

      // Act
      const result = isBefore(dateLeft, dateRight, { unit: "month" });

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when months are the same (regardless of day)", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 31);
      const dateRight = new Date(2024, 0, 1);

      // Act
      const result = isBefore(dateLeft, dateRight, { unit: "month" });

      // Assert
      expect(result).toBe(false);
    });

    it("should handle year boundary (cross-year month comparison)", () => {
      // Arrange
      const dateLeft = new Date(2024, 11, 31);
      const dateRight = new Date(2025, 0, 1);

      // Act
      const result = isBefore(dateLeft, dateRight, { unit: "month" });

      // Assert
      expect(result).toBe(true);
    });
  });

  describe("Equivalence Class 7: Unit-based comparison - day", () => {
    it("should return true when first day is before second day", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 23, 59, 59);
      const dateRight = new Date(2024, 0, 2, 0, 0, 0);

      // Act
      const result = isBefore(dateLeft, dateRight, { unit: "day" });

      // Assert
      expect(result).toBe(true);
    });

    it("should return false when first day is after second day", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 2, 0, 0, 0);
      const dateRight = new Date(2024, 0, 1, 23, 59, 59);

      // Act
      const result = isBefore(dateLeft, dateRight, { unit: "day" });

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when days are the same (regardless of time)", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 0, 0, 0);
      const dateRight = new Date(2024, 0, 1, 12, 0, 0);

      // Act
      const result = isBefore(dateLeft, dateRight, { unit: "day" });

      // Assert
      expect(result).toBe(false);
    });

    it("should ignore time when comparing days", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1);
      const dateRight = new Date(2024, 0, 2);

      // Act
      const result = isBefore(dateLeft, dateRight, { unit: "day" });

      // Assert
      expect(result).toBe(true);
    });
  });

  describe("Equivalence Class 7: Unit-based comparison - hour", () => {
    it("should return true when first hour is before second hour", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 12, 59, 59);
      const dateRight = new Date(2024, 0, 1, 13, 0, 0);

      // Act
      const result = isBefore(dateLeft, dateRight, { unit: "hour" });

      // Assert
      expect(result).toBe(true);
    });

    it("should return false when first hour is after second hour", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 13, 0, 0);
      const dateRight = new Date(2024, 0, 1, 12, 59, 59);

      // Act
      const result = isBefore(dateLeft, dateRight, { unit: "hour" });

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when hours are the same (regardless of minutes)", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 12, 0, 0);
      const dateRight = new Date(2024, 0, 1, 12, 30, 0);

      // Act
      const result = isBefore(dateLeft, dateRight, { unit: "hour" });

      // Assert
      expect(result).toBe(false);
    });

    it("should handle day boundary (cross-day hour comparison)", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 23, 59, 59);
      const dateRight = new Date(2024, 0, 2, 0, 0, 0);

      // Act
      const result = isBefore(dateLeft, dateRight, { unit: "hour" });

      // Assert
      expect(result).toBe(true);
    });
  });

  describe("Equivalence Class 7: Unit-based comparison - minute", () => {
    it("should return true when first minute is before second minute", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 12, 0, 59);
      const dateRight = new Date(2024, 0, 1, 12, 1, 0);

      // Act
      const result = isBefore(dateLeft, dateRight, { unit: "minute" });

      // Assert
      expect(result).toBe(true);
    });

    it("should return false when first minute is after second minute", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 12, 1, 0);
      const dateRight = new Date(2024, 0, 1, 12, 0, 59);

      // Act
      const result = isBefore(dateLeft, dateRight, { unit: "minute" });

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when minutes are the same (regardless of seconds)", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 12, 0, 0);
      const dateRight = new Date(2024, 0, 1, 12, 0, 30);

      // Act
      const result = isBefore(dateLeft, dateRight, { unit: "minute" });

      // Assert
      expect(result).toBe(false);
    });

    it("should handle hour boundary (cross-hour minute comparison)", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 12, 59, 59);
      const dateRight = new Date(2024, 0, 1, 13, 0, 0);

      // Act
      const result = isBefore(dateLeft, dateRight, { unit: "minute" });

      // Assert
      expect(result).toBe(true);
    });
  });

  describe("Equivalence Class 7: Unit-based comparison - second", () => {
    it("should return true when first second is before second second", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 12, 0, 0, 999);
      const dateRight = new Date(2024, 0, 1, 12, 0, 1, 0);

      // Act
      const result = isBefore(dateLeft, dateRight, { unit: "second" });

      // Assert
      expect(result).toBe(true);
    });

    it("should return false when first second is after second second", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 12, 0, 1, 0);
      const dateRight = new Date(2024, 0, 1, 12, 0, 0, 999);

      // Act
      const result = isBefore(dateLeft, dateRight, { unit: "second" });

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when seconds are the same (regardless of milliseconds)", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 12, 0, 0, 0);
      const dateRight = new Date(2024, 0, 1, 12, 0, 0, 500);

      // Act
      const result = isBefore(dateLeft, dateRight, { unit: "second" });

      // Assert
      expect(result).toBe(false);
    });

    it("should ignore milliseconds when comparing seconds", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 12, 0, 1);
      const dateRight = new Date(2024, 0, 1, 12, 0, 2);

      // Act
      const result = isBefore(dateLeft, dateRight, { unit: "second" });

      // Assert
      expect(result).toBe(true);
    });
  });

  describe("Boundary Value Analysis: Edge Cases", () => {
    it("should handle leap year boundaries", () => {
      // Arrange
      const dateLeft = new Date(2024, 1, 29); // Feb 29, 2024 (leap year)
      const dateRight = new Date(2024, 2, 1); // Mar 1, 2024

      // Act
      const result1 = isBefore(dateLeft, dateRight, { unit: "day" });
      const result2 = isBefore(dateRight, dateLeft, { unit: "day" });

      // Assert
      expect(result1).toBe(true);
      expect(result2).toBe(false);
    });

    it("should handle year boundaries (millisecond precision)", () => {
      // Arrange
      const dateLeft = new Date(2024, 11, 31, 23, 59, 59); // Dec 31, 2024 23:59:59
      const dateRight = new Date(2025, 0, 1, 0, 0, 0); // Jan 1, 2025 00:00:00

      // Act
      const result1 = isBefore(dateLeft, dateRight);
      const result2 = isBefore(dateRight, dateLeft);

      // Assert
      expect(result1).toBe(true);
      expect(result2).toBe(false);
    });

    it("should handle DST transitions", () => {
      // Arrange
      const beforeDST = new Date(2024, 2, 10, 1, 59, 59);
      const afterDST = new Date(2024, 2, 10, 3, 0, 0);

      // Act
      const result1 = isBefore(beforeDST, afterDST);
      const result2 = isBefore(afterDST, beforeDST);

      // Assert
      expect(result1).toBe(true);
      expect(result2).toBe(false);
    });

    it("should handle negative years (BC dates)", () => {
      // Arrange
      const date1 = new Date(-200, 0, 1); // 200 BC
      const date2 = new Date(-100, 0, 1); // 100 BC

      // Act
      const result1 = isBefore(date1, date2);
      const result2 = isBefore(date2, date1);

      // Assert
      expect(result1).toBe(true); // -200 is before -100
      expect(result2).toBe(false);
    });

    it("should return false for all unit comparisons when dates are identical", () => {
      // Arrange
      const date = new Date(2024, 0, 1, 12, 0, 0, 0);

      // Act & Assert
      expect(isBefore(date, date)).toBe(false);
      expect(isBefore(date, date, { unit: "year" })).toBe(false);
      expect(isBefore(date, date, { unit: "month" })).toBe(false);
      expect(isBefore(date, date, { unit: "day" })).toBe(false);
      expect(isBefore(date, date, { unit: "hour" })).toBe(false);
      expect(isBefore(date, date, { unit: "minute" })).toBe(false);
      expect(isBefore(date, date, { unit: "second" })).toBe(false);
    });
  });

  describe("Equivalence Class 4: Invalid first date + valid second date", () => {
    it("should return false when first date is Invalid Date", () => {
      // Arrange
      const invalidDate = new Date(NaN);
      const validDate = new Date(2024, 0, 1);

      // Act
      const result = isBefore(invalidDate, validDate);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when first date is NaN timestamp", () => {
      // Arrange
      const invalidTimestamp = NaN;
      const validDate = new Date(2024, 0, 1);

      // Act
      const result = isBefore(invalidTimestamp, validDate);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when first date is Infinity", () => {
      // Arrange
      const validDate = new Date(2024, 0, 1);

      // Act
      const result = isBefore(Infinity, validDate);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when first date is -Infinity", () => {
      // Arrange
      const validDate = new Date(2024, 0, 1);

      // Act
      const result = isBefore(-Infinity, validDate);

      // Assert
      expect(result).toBe(false);
    });
  });

  describe("Equivalence Class 5: Valid first date + invalid second date", () => {
    it("should return false when second date is Invalid Date", () => {
      // Arrange
      const validDate = new Date(2024, 0, 1);
      const invalidDate = new Date(NaN);

      // Act
      const result = isBefore(validDate, invalidDate);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when second date is NaN timestamp", () => {
      // Arrange
      const validDate = new Date(2024, 0, 1);
      const invalidTimestamp = NaN;

      // Act
      const result = isBefore(validDate, invalidTimestamp);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when second date is Infinity", () => {
      // Arrange
      const validDate = new Date(2024, 0, 1);

      // Act
      const result = isBefore(validDate, Infinity);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when second date is -Infinity", () => {
      // Arrange
      const validDate = new Date(2024, 0, 1);

      // Act
      const result = isBefore(validDate, -Infinity);

      // Assert
      expect(result).toBe(false);
    });
  });

  describe("Equivalence Class 6: Both dates invalid", () => {
    it("should return false when both dates are Invalid Date", () => {
      // Arrange
      const invalidDate1 = new Date(NaN);
      const invalidDate2 = new Date(NaN);

      // Act
      const result = isBefore(invalidDate1, invalidDate2);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when both dates are NaN timestamps", () => {
      // Arrange & Act
      const result = isBefore(NaN, NaN);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when both dates are Infinity/-Infinity", () => {
      // Arrange & Act
      const result = isBefore(Infinity, -Infinity);

      // Assert
      expect(result).toBe(false);
    });
  });
});
