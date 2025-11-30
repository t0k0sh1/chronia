import { describe, it, expect } from "vitest";
import { isEqual } from "../src/isEqual";

/**
 * Test Design for isEqual
 *
 * Function signature: isEqual(dateLeft: Date | number, dateRight: Date | number, options?: { unit?: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' }): boolean
 *
 * Equivalence Partitioning:
 * - Class 1: Both valid Date objects → Returns boolean based on equality
 * - Class 2: Both valid timestamps → Returns boolean based on equality
 * - Class 3: Mixed Date and timestamp → Returns boolean based on equality
 * - Class 4: Invalid first date + valid second date → Returns false
 * - Class 5: Valid first date + invalid second date → Returns false
 * - Class 6: Both dates invalid → Returns false
 * - Class 7: Unit-based comparison (year, month, day, hour, minute, second) → Returns boolean based on unit
 *
 * Boundary Value Analysis:
 * - Exact equality: dateLeft === dateRight (millisecond precision)
 * - 1ms difference: dateLeft and dateRight differ by 1ms (should return false for millisecond, true for larger units if same)
 * - Unit boundaries: Year, month, day, hour, minute, second equality
 * - Edge cases: Leap years, DST transitions, negative years, year boundaries
 *
 * Return Value Pattern:
 * - Returns true if dateLeft equals dateRight (at specified precision)
 * - Returns false if dateLeft does not equal dateRight
 * - Returns false if either date is invalid
 */

describe("isEqual", () => {
  describe("Equivalence Class 1: Both valid Date objects (millisecond precision)", () => {
    it("should return true when both dates are exactly equal", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 12, 0, 0, 0);
      const dateRight = new Date(2024, 0, 1, 12, 0, 0, 0);

      // Act
      const result = isEqual(dateLeft, dateRight);

      // Assert
      expect(result).toBe(true);
    });

    it("should return false when first date is 1ms after second date", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 12, 0, 0, 1);
      const dateRight = new Date(2024, 0, 1, 12, 0, 0, 0);

      // Act
      const result = isEqual(dateLeft, dateRight);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when first date is 1ms before second date", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 12, 0, 0, 0);
      const dateRight = new Date(2024, 0, 1, 12, 0, 0, 1);

      // Act
      const result = isEqual(dateLeft, dateRight);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when dates differ by one day", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1);
      const dateRight = new Date(2024, 0, 2);

      // Act
      const result = isEqual(dateLeft, dateRight);

      // Assert
      expect(result).toBe(false);
    });

    it("should return true when comparing same Date object", () => {
      // Arrange
      const date = new Date(2024, 0, 1, 12, 0, 0, 0);

      // Act
      const result = isEqual(date, date);

      // Assert
      expect(result).toBe(true);
    });
  });

  describe("Equivalence Class 2: Both valid timestamps", () => {
    it("should accept timestamp inputs and compare correctly", () => {
      // Arrange
      const timestamp1 = new Date(2024, 0, 1, 12, 0, 0, 0).getTime();
      const timestamp2 = new Date(2024, 0, 1, 12, 0, 0, 0).getTime();

      // Act
      const result = isEqual(timestamp1, timestamp2);

      // Assert
      expect(result).toBe(true);
    });

    it("should return false when timestamps differ by 1ms", () => {
      // Arrange
      const timestamp1 = new Date(2024, 0, 1, 12, 0, 0, 0).getTime();
      const timestamp2 = new Date(2024, 0, 1, 12, 0, 0, 1).getTime();

      // Act
      const result = isEqual(timestamp1, timestamp2);

      // Assert
      expect(result).toBe(false);
    });

    it("should return true when timestamps are created from same value", () => {
      // Arrange
      const baseTimestamp = 1704067200000; // 2024-01-01 00:00:00 UTC
      const timestamp1 = baseTimestamp;
      const timestamp2 = baseTimestamp;

      // Act
      const result = isEqual(timestamp1, timestamp2);

      // Assert
      expect(result).toBe(true);
    });
  });

  describe("Equivalence Class 3: Mixed Date and timestamp", () => {
    it("should handle Date object vs timestamp", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 12, 0, 0, 0);
      const timestampRight = new Date(2024, 0, 1, 12, 0, 0, 0).getTime();

      // Act
      const result = isEqual(dateLeft, timestampRight);

      // Assert
      expect(result).toBe(true);
    });

    it("should handle timestamp vs Date object", () => {
      // Arrange
      const timestampLeft = new Date(2024, 0, 1, 12, 0, 0, 0).getTime();
      const dateRight = new Date(2024, 0, 1, 12, 0, 0, 0);

      // Act
      const result = isEqual(timestampLeft, dateRight);

      // Assert
      expect(result).toBe(true);
    });
  });

  describe("Equivalence Class 7: Unit-based comparison - year", () => {
    it("should return true when years are the same (different months)", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1);
      const dateRight = new Date(2024, 11, 31);

      // Act
      const result = isEqual(dateLeft, dateRight, { unit: "year" });

      // Assert
      expect(result).toBe(true);
    });

    it("should return true when years are the same (different times)", () => {
      // Arrange
      const dateLeft = new Date(2024, 5, 15);
      const dateRight = new Date(2024, 0, 1);

      // Act
      const result = isEqual(dateLeft, dateRight, { unit: "year" });

      // Assert
      expect(result).toBe(true);
    });

    it("should return false when years are different", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1);
      const dateRight = new Date(2025, 0, 1);

      // Act
      const result = isEqual(dateLeft, dateRight, { unit: "year" });

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when first year is after second year", () => {
      // Arrange
      const dateLeft = new Date(2025, 0, 1);
      const dateRight = new Date(2024, 0, 1);

      // Act
      const result = isEqual(dateLeft, dateRight, { unit: "year" });

      // Assert
      expect(result).toBe(false);
    });

    it("should ignore month/day/time when comparing years", () => {
      // Arrange
      const dateLeft = new Date(2024, 11, 31, 23, 59, 59);
      const dateRight = new Date(2024, 0, 1, 0, 0, 0);

      // Act
      const result = isEqual(dateLeft, dateRight, { unit: "year" });

      // Assert
      expect(result).toBe(true);
    });
  });

  describe("Equivalence Class 7: Unit-based comparison - month", () => {
    it("should return true when year-months are the same (different days)", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1);
      const dateRight = new Date(2024, 0, 31);

      // Act
      const result = isEqual(dateLeft, dateRight, { unit: "month" });

      // Assert
      expect(result).toBe(true);
    });

    it("should return true when year-months are the same (different times)", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 15);
      const dateRight = new Date(2024, 0, 1);

      // Act
      const result = isEqual(dateLeft, dateRight, { unit: "month" });

      // Assert
      expect(result).toBe(true);
    });

    it("should return false when months are different (same year)", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1);
      const dateRight = new Date(2024, 1, 1);

      // Act
      const result = isEqual(dateLeft, dateRight, { unit: "month" });

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when months are different (opposite direction)", () => {
      // Arrange
      const dateLeft = new Date(2024, 1, 1);
      const dateRight = new Date(2024, 0, 1);

      // Act
      const result = isEqual(dateLeft, dateRight, { unit: "month" });

      // Assert
      expect(result).toBe(false);
    });

    it("should ignore day/time when comparing months", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 31, 23, 59, 59);
      const dateRight = new Date(2024, 0, 1, 0, 0, 0);

      // Act
      const result = isEqual(dateLeft, dateRight, { unit: "month" });

      // Assert
      expect(result).toBe(true);
    });

    it("should return false when years are different (same month number)", () => {
      // Arrange
      const dateLeft = new Date(2025, 0, 1);
      const dateRight = new Date(2024, 0, 1);

      // Act
      const result = isEqual(dateLeft, dateRight, { unit: "month" });

      // Assert
      expect(result).toBe(false);
    });
  });

  describe("Equivalence Class 7: Unit-based comparison - day", () => {
    it("should return true when year-month-days are the same (different times)", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 0, 0, 0);
      const dateRight = new Date(2024, 0, 1, 23, 59, 59);

      // Act
      const result = isEqual(dateLeft, dateRight, { unit: "day" });

      // Assert
      expect(result).toBe(true);
    });

    it("should return true when days are same (different hours)", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 12, 0, 0);
      const dateRight = new Date(2024, 0, 1, 6, 0, 0);

      // Act
      const result = isEqual(dateLeft, dateRight, { unit: "day" });

      // Assert
      expect(result).toBe(true);
    });

    it("should return false when days are different", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1);
      const dateRight = new Date(2024, 0, 2);

      // Act
      const result = isEqual(dateLeft, dateRight, { unit: "day" });

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when days are different (opposite direction)", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 2);
      const dateRight = new Date(2024, 0, 1);

      // Act
      const result = isEqual(dateLeft, dateRight, { unit: "day" });

      // Assert
      expect(result).toBe(false);
    });

    it("should ignore time when comparing days", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 23, 59, 59, 999);
      const dateRight = new Date(2024, 0, 1, 0, 0, 0, 0);

      // Act
      const result = isEqual(dateLeft, dateRight, { unit: "day" });

      // Assert
      expect(result).toBe(true);
    });
  });

  describe("Equivalence Class 7: Unit-based comparison - hour", () => {
    it("should return true when year-month-day-hours are the same (different minutes)", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 12, 0, 0);
      const dateRight = new Date(2024, 0, 1, 12, 59, 59);

      // Act
      const result = isEqual(dateLeft, dateRight, { unit: "hour" });

      // Assert
      expect(result).toBe(true);
    });

    it("should return true when hours are same (different seconds)", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 12, 30, 0);
      const dateRight = new Date(2024, 0, 1, 12, 0, 0);

      // Act
      const result = isEqual(dateLeft, dateRight, { unit: "hour" });

      // Assert
      expect(result).toBe(true);
    });

    it("should return false when hours are different", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 12, 0, 0);
      const dateRight = new Date(2024, 0, 1, 13, 0, 0);

      // Act
      const result = isEqual(dateLeft, dateRight, { unit: "hour" });

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when hours are different (opposite direction)", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 13, 0, 0);
      const dateRight = new Date(2024, 0, 1, 12, 0, 0);

      // Act
      const result = isEqual(dateLeft, dateRight, { unit: "hour" });

      // Assert
      expect(result).toBe(false);
    });

    it("should ignore minutes/seconds/milliseconds when comparing hours", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 12, 59, 59, 999);
      const dateRight = new Date(2024, 0, 1, 12, 0, 0, 0);

      // Act
      const result = isEqual(dateLeft, dateRight, { unit: "hour" });

      // Assert
      expect(result).toBe(true);
    });
  });

  describe("Equivalence Class 7: Unit-based comparison - minute", () => {
    it("should return true when year-month-day-hour-minutes are the same (different seconds)", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 12, 0, 0);
      const dateRight = new Date(2024, 0, 1, 12, 0, 59);

      // Act
      const result = isEqual(dateLeft, dateRight, { unit: "minute" });

      // Assert
      expect(result).toBe(true);
    });

    it("should return true when minutes are same (different milliseconds)", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 12, 0, 30);
      const dateRight = new Date(2024, 0, 1, 12, 0, 0);

      // Act
      const result = isEqual(dateLeft, dateRight, { unit: "minute" });

      // Assert
      expect(result).toBe(true);
    });

    it("should return false when minutes are different", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 12, 0, 0);
      const dateRight = new Date(2024, 0, 1, 12, 1, 0);

      // Act
      const result = isEqual(dateLeft, dateRight, { unit: "minute" });

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when minutes are different (opposite direction)", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 12, 1, 0);
      const dateRight = new Date(2024, 0, 1, 12, 0, 0);

      // Act
      const result = isEqual(dateLeft, dateRight, { unit: "minute" });

      // Assert
      expect(result).toBe(false);
    });

    it("should ignore seconds/milliseconds when comparing minutes", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 12, 0, 59, 999);
      const dateRight = new Date(2024, 0, 1, 12, 0, 0, 0);

      // Act
      const result = isEqual(dateLeft, dateRight, { unit: "minute" });

      // Assert
      expect(result).toBe(true);
    });
  });

  describe("Equivalence Class 7: Unit-based comparison - second", () => {
    it("should return true when year-month-day-hour-minute-seconds are the same (different milliseconds)", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 12, 0, 0, 0);
      const dateRight = new Date(2024, 0, 1, 12, 0, 0, 999);

      // Act
      const result = isEqual(dateLeft, dateRight, { unit: "second" });

      // Assert
      expect(result).toBe(true);
    });

    it("should return true when seconds are same (different milliseconds)", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 12, 0, 0, 500);
      const dateRight = new Date(2024, 0, 1, 12, 0, 0, 0);

      // Act
      const result = isEqual(dateLeft, dateRight, { unit: "second" });

      // Assert
      expect(result).toBe(true);
    });

    it("should return false when seconds are different", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 12, 0, 0, 0);
      const dateRight = new Date(2024, 0, 1, 12, 0, 1, 0);

      // Act
      const result = isEqual(dateLeft, dateRight, { unit: "second" });

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when seconds are different (opposite direction)", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 12, 0, 1, 0);
      const dateRight = new Date(2024, 0, 1, 12, 0, 0, 0);

      // Act
      const result = isEqual(dateLeft, dateRight, { unit: "second" });

      // Assert
      expect(result).toBe(false);
    });

    it("should ignore milliseconds when comparing seconds", () => {
      // Arrange
      const dateLeft = new Date(2024, 0, 1, 12, 0, 0, 999);
      const dateRight = new Date(2024, 0, 1, 12, 0, 0, 0);

      // Act
      const result = isEqual(dateLeft, dateRight, { unit: "second" });

      // Assert
      expect(result).toBe(true);
    });
  });

  describe("Boundary Value Analysis: Edge Cases", () => {
    it("should return true for all unit comparisons when dates are identical", () => {
      // Arrange
      const date = new Date(2024, 0, 1, 12, 0, 0, 0);

      // Act & Assert
      expect(isEqual(date, date)).toBe(true);
      expect(isEqual(date, date, { unit: "year" })).toBe(true);
      expect(isEqual(date, date, { unit: "month" })).toBe(true);
      expect(isEqual(date, date, { unit: "day" })).toBe(true);
      expect(isEqual(date, date, { unit: "hour" })).toBe(true);
      expect(isEqual(date, date, { unit: "minute" })).toBe(true);
      expect(isEqual(date, date, { unit: "second" })).toBe(true);
    });

    it("should handle leap year boundaries", () => {
      // Arrange
      const date1 = new Date(2024, 1, 29); // Feb 29, 2024 (leap year)
      const date2 = new Date(2024, 1, 29); // Feb 29, 2024

      // Act
      const result1 = isEqual(date1, date2, { unit: "day" });
      const result2 = isEqual(date1, new Date(2024, 2, 1), { unit: "day" });
      const result3 = isEqual(date1, new Date(2023, 1, 28), { unit: "day" });

      // Assert
      expect(result1).toBe(true);
      expect(result2).toBe(false);
      expect(result3).toBe(false);
    });

    it("should handle year boundaries (millisecond precision)", () => {
      // Arrange
      const date1 = new Date(2024, 11, 31, 23, 59, 59);
      const date2 = new Date(2025, 0, 1, 0, 0, 0);

      // Act
      const result1 = isEqual(date1, date2);
      const result2 = isEqual(date1, date2, { unit: "year" });
      const result3 = isEqual(new Date(2024, 11, 31), new Date(2024, 0, 1), { unit: "year" });

      // Assert
      expect(result1).toBe(false);
      expect(result2).toBe(false);
      expect(result3).toBe(true);
    });

    it("should handle DST transitions", () => {
      // Arrange
      const beforeDST = new Date(2024, 2, 10, 1, 59, 59);
      const afterDST = new Date(2024, 2, 10, 3, 0, 0);

      // Act
      const result1 = isEqual(beforeDST, afterDST);
      const result2 = isEqual(beforeDST, afterDST, { unit: "day" });

      // Assert
      expect(result1).toBe(false);
      expect(result2).toBe(true);
    });

    it("should handle negative years (BC dates)", () => {
      // Arrange
      const date1 = new Date(-100, 0, 1);
      const date2 = new Date(-100, 0, 1);
      const date3 = new Date(-200, 0, 1);

      // Act
      const result1 = isEqual(date1, date2);
      const result2 = isEqual(date1, date3);
      const result3 = isEqual(date1, date3, { unit: "year" });

      // Assert
      expect(result1).toBe(true);
      expect(result2).toBe(false);
      expect(result3).toBe(false);
    });

    it("should handle dates created from same timestamp", () => {
      // Arrange
      const timestamp = 1704067200000; // 2024-01-01 00:00:00 UTC
      const date1 = new Date(timestamp);
      const date2 = new Date(timestamp);

      // Act & Assert
      expect(isEqual(date1, date2)).toBe(true);
      expect(isEqual(date1, date2, { unit: "year" })).toBe(true);
      expect(isEqual(date1, date2, { unit: "month" })).toBe(true);
      expect(isEqual(date1, date2, { unit: "day" })).toBe(true);
      expect(isEqual(date1, date2, { unit: "hour" })).toBe(true);
      expect(isEqual(date1, date2, { unit: "minute" })).toBe(true);
      expect(isEqual(date1, date2, { unit: "second" })).toBe(true);
    });
  });

  describe("Equivalence Class 4: Invalid first date + valid second date", () => {
    it("should return false when first date is Invalid Date", () => {
      // Arrange
      const invalidDate = new Date(NaN);
      const validDate = new Date(2024, 0, 1);

      // Act
      const result = isEqual(invalidDate, validDate);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when first date is NaN timestamp", () => {
      // Arrange
      const invalidTimestamp = NaN;
      const validDate = new Date(2024, 0, 1);

      // Act
      const result = isEqual(invalidTimestamp, validDate);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when first date is Infinity", () => {
      // Arrange
      const validDate = new Date(2024, 0, 1);

      // Act
      const result = isEqual(Infinity, validDate);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when first date is -Infinity", () => {
      // Arrange
      const validDate = new Date(2024, 0, 1);

      // Act
      const result = isEqual(-Infinity, validDate);

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
      const result = isEqual(validDate, invalidDate);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when second date is NaN timestamp", () => {
      // Arrange
      const validDate = new Date(2024, 0, 1);
      const invalidTimestamp = NaN;

      // Act
      const result = isEqual(validDate, invalidTimestamp);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when second date is Infinity", () => {
      // Arrange
      const validDate = new Date(2024, 0, 1);

      // Act
      const result = isEqual(validDate, Infinity);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when second date is -Infinity", () => {
      // Arrange
      const validDate = new Date(2024, 0, 1);

      // Act
      const result = isEqual(validDate, -Infinity);

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
      const result = isEqual(invalidDate1, invalidDate2);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when both dates are NaN timestamps", () => {
      // Arrange & Act
      const result = isEqual(NaN, NaN);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when both dates are Infinity/-Infinity", () => {
      // Arrange & Act
      const result = isEqual(Infinity, -Infinity);

      // Assert
      expect(result).toBe(false);
    });
  });
});
