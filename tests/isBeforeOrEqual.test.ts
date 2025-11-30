import { describe, it, expect } from "vitest";
import { isBeforeOrEqual } from "../src/isBeforeOrEqual";

/**
 * Test Design for isBeforeOrEqual
 *
 * Function signature: isBeforeOrEqual(date: Date | number, dateToCompare: Date | number, options?: { unit?: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond' }): boolean
 *
 * Equivalence Partitioning:
 * - Class 1: date < dateToCompare → Returns true (at specified unit)
 * - Class 2: date === dateToCompare → Returns true (at specified unit)
 * - Class 3: date > dateToCompare → Returns false (at specified unit)
 * - Class 4: Valid timestamp inputs → Same logic as Date inputs
 * - Class 5: Invalid date inputs (Invalid Date, NaN, Infinity, -Infinity) → Returns false
 *
 * Boundary Value Analysis:
 * - Unit boundaries: Year, month, day, hour, minute, second, millisecond precision
 * - Time component handling: Each unit ignores finer-grained components
 * - Leap years: February 29th edge cases
 * - DST transitions: Daylight saving time effects
 * - Negative years: BC dates (dates before year 0)
 * - Same timestamp: Dates created from identical timestamps
 */

describe("isBeforeOrEqual", () => {
  describe("Equivalence Class 1: date < dateToCompare (default millisecond precision)", () => {
    it("should return true when date is before dateToCompare by milliseconds", () => {
      // Arrange
      const date = new Date(2024, 0, 1, 12, 0, 0, 0);
      const dateToCompare = new Date(2024, 0, 1, 12, 0, 0, 1);

      // Act & Assert
      expect(isBeforeOrEqual(date, dateToCompare)).toBe(true);
    });

    it("should return true when date is before dateToCompare by seconds", () => {
      // Arrange
      const date = new Date(2024, 0, 1, 12, 0, 0, 0);
      const dateToCompare = new Date(2024, 0, 1, 12, 0, 1, 0);

      // Act & Assert
      expect(isBeforeOrEqual(date, dateToCompare)).toBe(true);
    });

    it("should return true when date is before dateToCompare by days", () => {
      // Arrange
      const date = new Date(2024, 0, 1);
      const dateToCompare = new Date(2024, 0, 2);

      // Act & Assert
      expect(isBeforeOrEqual(date, dateToCompare)).toBe(true);
    });
  });

  describe("Equivalence Class 2: date === dateToCompare (default millisecond precision)", () => {
    it("should return true when dates are exactly equal", () => {
      // Arrange
      const date = new Date(2024, 0, 1, 12, 0, 0, 0);
      const dateToCompare = new Date(2024, 0, 1, 12, 0, 0, 0);

      // Act & Assert
      expect(isBeforeOrEqual(date, dateToCompare)).toBe(true);
    });

    it("should return true when comparing same date object", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 14, 30, 45);

      // Act & Assert
      expect(isBeforeOrEqual(date, date)).toBe(true);
    });
  });

  describe("Equivalence Class 3: date > dateToCompare (default millisecond precision)", () => {
    it("should return false when date is after dateToCompare by milliseconds", () => {
      // Arrange
      const date = new Date(2024, 0, 1, 12, 0, 0, 1);
      const dateToCompare = new Date(2024, 0, 1, 12, 0, 0, 0);

      // Act & Assert
      expect(isBeforeOrEqual(date, dateToCompare)).toBe(false);
    });

    it("should return false when date is after dateToCompare by days", () => {
      // Arrange
      const date = new Date(2024, 0, 2);
      const dateToCompare = new Date(2024, 0, 1);

      // Act & Assert
      expect(isBeforeOrEqual(date, dateToCompare)).toBe(false);
    });
  });

  describe("Unit: year - Year comparison", () => {
    it("should return true when date year < dateToCompare year", () => {
      // Arrange
      const date = new Date(2024, 0, 1);
      const dateToCompare = new Date(2025, 0, 1);

      // Act & Assert
      expect(isBeforeOrEqual(date, dateToCompare, { unit: "year" })).toBe(
        true,
      );
    });

    it("should return true when years are equal (different months/days)", () => {
      // Arrange
      const dec2024 = new Date(2024, 11, 31);
      const jan2024 = new Date(2024, 0, 1);

      // Act & Assert
      expect(isBeforeOrEqual(dec2024, jan2024, { unit: "year" })).toBe(true);
      expect(isBeforeOrEqual(jan2024, dec2024, { unit: "year" })).toBe(true);
    });

    it("should return false when date year > dateToCompare year", () => {
      // Arrange
      const date = new Date(2025, 0, 1);
      const dateToCompare = new Date(2024, 0, 1);

      // Act & Assert
      expect(isBeforeOrEqual(date, dateToCompare, { unit: "year" })).toBe(
        false,
      );
    });

    it("should ignore month/day/time when comparing by year", () => {
      // Arrange
      const endOfYear = new Date(2024, 11, 31, 23, 59, 59, 999);
      const startOfYear = new Date(2024, 0, 1, 0, 0, 0, 0);

      // Act & Assert
      expect(isBeforeOrEqual(endOfYear, startOfYear, { unit: "year" })).toBe(
        true,
      );
    });

    it("should handle year boundaries", () => {
      // Arrange
      const endOf2023 = new Date(2023, 11, 31);
      const startOf2024 = new Date(2024, 0, 1);

      // Act & Assert
      expect(isBeforeOrEqual(endOf2023, startOf2024, { unit: "year" })).toBe(
        true,
      );
    });
  });

  describe("Unit: month - Month comparison", () => {
    it("should return true when date month < dateToCompare month", () => {
      // Arrange
      const date = new Date(2024, 0, 1);
      const dateToCompare = new Date(2024, 1, 1);

      // Act & Assert
      expect(isBeforeOrEqual(date, dateToCompare, { unit: "month" })).toBe(
        true,
      );
    });

    it("should return true when year/month are equal (different days)", () => {
      // Arrange
      const endOfMonth = new Date(2024, 0, 31);
      const startOfMonth = new Date(2024, 0, 1);

      // Act & Assert
      expect(
        isBeforeOrEqual(endOfMonth, startOfMonth, { unit: "month" }),
      ).toBe(true);
      expect(
        isBeforeOrEqual(startOfMonth, endOfMonth, { unit: "month" }),
      ).toBe(true);
    });

    it("should return false when date month > dateToCompare month", () => {
      // Arrange
      const date = new Date(2024, 1, 1);
      const dateToCompare = new Date(2024, 0, 1);

      // Act & Assert
      expect(isBeforeOrEqual(date, dateToCompare, { unit: "month" })).toBe(
        false,
      );
    });

    it("should ignore day/time when comparing by month", () => {
      // Arrange
      const endOfJan = new Date(2024, 0, 31, 23, 59, 59, 999);
      const startOfJan = new Date(2024, 0, 1, 0, 0, 0, 0);

      // Act & Assert
      expect(isBeforeOrEqual(endOfJan, startOfJan, { unit: "month" })).toBe(
        true,
      );
    });

    it("should handle month boundaries across years", () => {
      // Arrange
      const dec2023 = new Date(2023, 11, 31);
      const jan2024 = new Date(2024, 0, 1);

      // Act & Assert
      expect(isBeforeOrEqual(dec2023, jan2024, { unit: "month" })).toBe(true);
    });

    it("should handle same month in different days", () => {
      // Arrange
      const date1 = new Date(2024, 0, 15);
      const date2 = new Date(2024, 0, 16);

      // Act & Assert
      expect(isBeforeOrEqual(date1, date2, { unit: "month" })).toBe(true);
    });
  });

  describe("Unit: day - Day comparison", () => {
    it("should return true when date day < dateToCompare day", () => {
      // Arrange
      const date = new Date(2024, 0, 1, 0, 0, 0);
      const dateToCompare = new Date(2024, 0, 2, 0, 0, 0);

      // Act & Assert
      expect(isBeforeOrEqual(date, dateToCompare, { unit: "day" })).toBe(true);
    });

    it("should return true when year/month/day are equal (different times)", () => {
      // Arrange
      const morning = new Date(2024, 0, 1, 12, 0, 0);
      const midnight = new Date(2024, 0, 1, 0, 0, 0);

      // Act & Assert
      expect(isBeforeOrEqual(morning, midnight, { unit: "day" })).toBe(true);
      expect(isBeforeOrEqual(midnight, morning, { unit: "day" })).toBe(true);
    });

    it("should return false when date day > dateToCompare day", () => {
      // Arrange
      const date = new Date(2024, 0, 2, 0, 0, 0);
      const dateToCompare = new Date(2024, 0, 1, 23, 59, 59);

      // Act & Assert
      expect(isBeforeOrEqual(date, dateToCompare, { unit: "day" })).toBe(
        false,
      );
    });

    it("should ignore time when comparing by day", () => {
      // Arrange
      const endOfDay = new Date(2024, 0, 1, 23, 59, 59);
      const startOfDay = new Date(2024, 0, 1, 0, 0, 0);

      // Act & Assert
      expect(isBeforeOrEqual(endOfDay, startOfDay, { unit: "day" })).toBe(
        true,
      );
    });

    it("should handle day boundaries", () => {
      // Arrange
      const date1 = new Date(2024, 0, 1);
      const date2 = new Date(2024, 0, 2);

      // Act & Assert
      expect(isBeforeOrEqual(date1, date2, { unit: "day" })).toBe(true);
    });
  });

  describe("Unit: hour - Hour comparison", () => {
    it("should return true when date hour < dateToCompare hour", () => {
      // Arrange
      const date = new Date(2024, 0, 1, 12, 0, 0);
      const dateToCompare = new Date(2024, 0, 1, 13, 0, 0);

      // Act & Assert
      expect(isBeforeOrEqual(date, dateToCompare, { unit: "hour" })).toBe(
        true,
      );
    });

    it("should return true when date/hour are equal (different minutes)", () => {
      // Arrange
      const startOfHour = new Date(2024, 0, 1, 12, 30, 0);
      const endOfHour = new Date(2024, 0, 1, 12, 0, 0);

      // Act & Assert
      expect(isBeforeOrEqual(startOfHour, endOfHour, { unit: "hour" })).toBe(
        true,
      );
      expect(isBeforeOrEqual(endOfHour, startOfHour, { unit: "hour" })).toBe(
        true,
      );
    });

    it("should return false when date hour > dateToCompare hour", () => {
      // Arrange
      const date = new Date(2024, 0, 1, 13, 0, 0);
      const dateToCompare = new Date(2024, 0, 1, 12, 59, 59);

      // Act & Assert
      expect(isBeforeOrEqual(date, dateToCompare, { unit: "hour" })).toBe(
        false,
      );
    });

    it("should ignore minutes/seconds when comparing by hour", () => {
      // Arrange
      const endOfHour = new Date(2024, 0, 1, 12, 59, 59);
      const startOfHour = new Date(2024, 0, 1, 12, 0, 0);

      // Act & Assert
      expect(isBeforeOrEqual(endOfHour, startOfHour, { unit: "hour" })).toBe(
        true,
      );
    });

    it("should handle hour boundaries", () => {
      // Arrange
      const elevenAM = new Date(2024, 0, 1, 11, 59, 59);
      const noon = new Date(2024, 0, 1, 12, 0, 0);

      // Act & Assert
      expect(isBeforeOrEqual(elevenAM, noon, { unit: "hour" })).toBe(true);
    });
  });

  describe("Unit: minute - Minute comparison", () => {
    it("should return true when date minute < dateToCompare minute", () => {
      // Arrange
      const date = new Date(2024, 0, 1, 12, 0, 0);
      const dateToCompare = new Date(2024, 0, 1, 12, 1, 0);

      // Act & Assert
      expect(isBeforeOrEqual(date, dateToCompare, { unit: "minute" })).toBe(
        true,
      );
    });

    it("should return true when date/hour/minute are equal (different seconds)", () => {
      // Arrange
      const startOfMinute = new Date(2024, 0, 1, 12, 0, 30);
      const endOfMinute = new Date(2024, 0, 1, 12, 0, 0);

      // Act & Assert
      expect(
        isBeforeOrEqual(startOfMinute, endOfMinute, { unit: "minute" }),
      ).toBe(true);
      expect(
        isBeforeOrEqual(endOfMinute, startOfMinute, { unit: "minute" }),
      ).toBe(true);
    });

    it("should return false when date minute > dateToCompare minute", () => {
      // Arrange
      const date = new Date(2024, 0, 1, 12, 1, 0);
      const dateToCompare = new Date(2024, 0, 1, 12, 0, 59);

      // Act & Assert
      expect(isBeforeOrEqual(date, dateToCompare, { unit: "minute" })).toBe(
        false,
      );
    });

    it("should ignore seconds when comparing by minute", () => {
      // Arrange
      const endOfMinute = new Date(2024, 0, 1, 12, 0, 59);
      const startOfMinute = new Date(2024, 0, 1, 12, 0, 0);

      // Act & Assert
      expect(
        isBeforeOrEqual(endOfMinute, startOfMinute, { unit: "minute" }),
      ).toBe(true);
    });

    it("should handle minute boundaries", () => {
      // Arrange
      const minute59 = new Date(2024, 0, 1, 11, 59, 59);
      const nextHour = new Date(2024, 0, 1, 12, 0, 0);

      // Act & Assert
      expect(isBeforeOrEqual(minute59, nextHour, { unit: "minute" })).toBe(
        true,
      );
    });
  });

  describe("Unit: second - Second comparison", () => {
    it("should return true when date second < dateToCompare second", () => {
      // Arrange
      const date = new Date(2024, 0, 1, 12, 0, 0, 0);
      const dateToCompare = new Date(2024, 0, 1, 12, 0, 1, 0);

      // Act & Assert
      expect(isBeforeOrEqual(date, dateToCompare, { unit: "second" })).toBe(
        true,
      );
    });

    it("should return true when date/hour/minute/second are equal (different milliseconds)", () => {
      // Arrange
      const startOfSecond = new Date(2024, 0, 1, 12, 0, 0, 500);
      const endOfSecond = new Date(2024, 0, 1, 12, 0, 0, 0);

      // Act & Assert
      expect(
        isBeforeOrEqual(startOfSecond, endOfSecond, { unit: "second" }),
      ).toBe(true);
      expect(
        isBeforeOrEqual(endOfSecond, startOfSecond, { unit: "second" }),
      ).toBe(true);
    });

    it("should return false when date second > dateToCompare second", () => {
      // Arrange
      const date = new Date(2024, 0, 1, 12, 0, 1, 0);
      const dateToCompare = new Date(2024, 0, 1, 12, 0, 0, 999);

      // Act & Assert
      expect(isBeforeOrEqual(date, dateToCompare, { unit: "second" })).toBe(
        false,
      );
    });

    it("should ignore milliseconds when comparing by second", () => {
      // Arrange
      const endOfSecond = new Date(2024, 0, 1, 12, 0, 0, 999);
      const startOfSecond = new Date(2024, 0, 1, 12, 0, 0, 0);

      // Act & Assert
      expect(
        isBeforeOrEqual(endOfSecond, startOfSecond, { unit: "second" }),
      ).toBe(true);
    });

    it("should handle second boundaries", () => {
      // Arrange
      const second59 = new Date(2024, 0, 1, 11, 59, 59);
      const nextMinute = new Date(2024, 0, 1, 12, 0, 0);

      // Act & Assert
      expect(isBeforeOrEqual(second59, nextMinute, { unit: "second" })).toBe(
        true,
      );
    });
  });

  describe("Equivalence Class 4: Valid timestamp inputs", () => {
    it("should accept timestamp inputs with default millisecond precision", () => {
      // Arrange
      const timestamp1 = new Date(2024, 0, 1, 12, 0, 0).getTime();
      const timestamp2 = new Date(2024, 0, 1, 12, 0, 1).getTime();

      // Act & Assert
      expect(isBeforeOrEqual(timestamp1, timestamp2)).toBe(true);
      expect(isBeforeOrEqual(timestamp2, timestamp1)).toBe(false);
    });

    it("should accept mixed Date and timestamp inputs", () => {
      // Arrange
      const date = new Date(2024, 0, 1, 12, 0, 0);
      const timestamp = new Date(2024, 0, 1, 12, 0, 1).getTime();

      // Act & Assert
      expect(isBeforeOrEqual(date, timestamp)).toBe(true);
      expect(isBeforeOrEqual(timestamp, date)).toBe(false);
    });

    it("should accept timestamp inputs with unit option", () => {
      // Arrange
      const timestamp1 = new Date(2024, 0, 1).getTime();
      const timestamp2 = new Date(2024, 0, 2).getTime();

      // Act & Assert
      expect(isBeforeOrEqual(timestamp1, timestamp2, { unit: "day" })).toBe(
        true,
      );
      expect(isBeforeOrEqual(timestamp2, timestamp1, { unit: "day" })).toBe(
        false,
      );
    });
  });

  describe("Equivalence Class 5: Invalid date inputs", () => {
    it("should return false when first date is Invalid Date", () => {
      // Arrange
      const invalidDate = new Date("invalid");
      const validDate = new Date(2024, 0, 1);

      // Act & Assert
      expect(isBeforeOrEqual(invalidDate, validDate)).toBe(false);
    });

    it("should return false when second date is Invalid Date", () => {
      // Arrange
      const validDate = new Date(2024, 0, 1);
      const invalidDate = new Date("invalid");

      // Act & Assert
      expect(isBeforeOrEqual(validDate, invalidDate)).toBe(false);
    });

    it("should return false when both dates are Invalid Date", () => {
      // Arrange
      const invalidDate1 = new Date("invalid");
      const invalidDate2 = new Date(NaN);

      // Act & Assert
      expect(isBeforeOrEqual(invalidDate1, invalidDate2)).toBe(false);
    });

    it("should return false when timestamp is NaN", () => {
      // Arrange
      const validDate = new Date(2024, 0, 1);

      // Act & Assert
      expect(isBeforeOrEqual(NaN, validDate)).toBe(false);
      expect(isBeforeOrEqual(validDate, NaN)).toBe(false);
      expect(isBeforeOrEqual(NaN, NaN)).toBe(false);
    });

    it("should return false when timestamp is Infinity", () => {
      // Arrange
      const validDate = new Date(2024, 0, 1);

      // Act & Assert
      expect(isBeforeOrEqual(Infinity, validDate)).toBe(false);
      expect(isBeforeOrEqual(validDate, Infinity)).toBe(false);
    });

    it("should return false when timestamp is -Infinity", () => {
      // Arrange
      const validDate = new Date(2024, 0, 1);

      // Act & Assert
      expect(isBeforeOrEqual(-Infinity, validDate)).toBe(false);
      expect(isBeforeOrEqual(validDate, -Infinity)).toBe(false);
    });
  });

  describe("Boundary Value Analysis: Leap year", () => {
    it("should handle leap year February 29th", () => {
      // Arrange
      const feb28 = new Date(2024, 1, 28);
      const feb29 = new Date(2024, 1, 29);
      const mar1 = new Date(2024, 2, 1);

      // Act & Assert
      expect(isBeforeOrEqual(feb28, feb29, { unit: "day" })).toBe(true);
      expect(isBeforeOrEqual(feb29, mar1, { unit: "day" })).toBe(true);
      expect(isBeforeOrEqual(mar1, feb29, { unit: "day" })).toBe(false);
    });
  });

  describe("Boundary Value Analysis: Year boundaries", () => {
    it("should handle year boundaries", () => {
      // Arrange
      const endOf2024 = new Date(2024, 11, 31, 23, 59, 59);
      const startOf2025 = new Date(2025, 0, 1, 0, 0, 0);

      // Act & Assert
      expect(isBeforeOrEqual(endOf2024, startOf2025)).toBe(true);
      expect(isBeforeOrEqual(startOf2025, endOf2024)).toBe(false);
    });

    it("should handle same day at year boundary with day unit", () => {
      // Arrange
      const dec31 = new Date(2024, 11, 31);

      // Act & Assert
      expect(isBeforeOrEqual(dec31, dec31, { unit: "day" })).toBe(true);
    });
  });

  describe("Boundary Value Analysis: DST transitions", () => {
    it("should handle DST transitions with millisecond precision", () => {
      // Arrange
      const beforeDST = new Date(2024, 2, 10, 1, 59, 59);
      const afterDST = new Date(2024, 2, 10, 3, 0, 0);

      // Act & Assert
      expect(isBeforeOrEqual(beforeDST, afterDST)).toBe(true);
      expect(isBeforeOrEqual(afterDST, beforeDST)).toBe(false);
    });

    it("should handle DST transitions with day unit", () => {
      // Arrange
      const beforeDST = new Date(2024, 2, 10, 1, 59, 59);
      const afterDST = new Date(2024, 2, 10, 3, 0, 0);

      // Act & Assert
      expect(isBeforeOrEqual(beforeDST, afterDST, { unit: "day" })).toBe(true);
      expect(isBeforeOrEqual(afterDST, beforeDST, { unit: "day" })).toBe(true);
    });
  });

  describe("Boundary Value Analysis: Negative years (BC dates)", () => {
    it("should handle negative years correctly", () => {
      // Arrange
      const date1 = new Date(-100, 0, 1);
      const date2 = new Date(-200, 0, 1);

      // Act & Assert
      expect(isBeforeOrEqual(date2, date1)).toBe(true);
      expect(isBeforeOrEqual(date1, date2)).toBe(false);
      expect(isBeforeOrEqual(date1, date1)).toBe(true);
    });
  });

  describe("Boundary Value Analysis: Same timestamp", () => {
    it("should handle dates created from same timestamp", () => {
      // Arrange
      const timestamp = 1704067200000; // 2024-01-01 00:00:00 UTC
      const date1 = new Date(timestamp);
      const date2 = new Date(timestamp);

      // Act & Assert
      expect(isBeforeOrEqual(date1, date2)).toBe(true);
      expect(isBeforeOrEqual(date2, date1)).toBe(true);
    });
  });

  describe("Boundary Value Analysis: Millisecond boundaries", () => {
    it("should handle millisecond boundaries correctly", () => {
      // Arrange
      const date1 = new Date(2024, 0, 1, 0, 0, 0, 0);
      const date2 = new Date(2024, 0, 1, 0, 0, 0, 1);

      // Act & Assert
      expect(isBeforeOrEqual(date1, date2)).toBe(true);
      expect(isBeforeOrEqual(date2, date1)).toBe(false);
    });

    it("should treat same second as equal when using second unit", () => {
      // Arrange
      const date1 = new Date(2024, 0, 1, 0, 0, 0, 0);
      const date2 = new Date(2024, 0, 1, 0, 0, 0, 1);

      // Act & Assert
      expect(isBeforeOrEqual(date1, date2, { unit: "second" })).toBe(true);
      expect(isBeforeOrEqual(date2, date1, { unit: "second" })).toBe(true);
    });
  });

  describe("Argument order independence for equality", () => {
    it("should return true for both argument orders when dates are equal at specified unit", () => {
      // Arrange
      const date1 = new Date(2024, 0, 1, 12, 0, 0);
      const date2 = new Date(2024, 0, 1, 12, 30, 0);

      // Act & Assert
      expect(isBeforeOrEqual(date1, date2, { unit: "hour" })).toBe(true);
      expect(isBeforeOrEqual(date2, date1, { unit: "hour" })).toBe(true);
    });
  });

  describe("Same Date object reference", () => {
    it("should return true when comparing same date object across all units", () => {
      // Arrange
      const date = new Date(2024, 0, 1, 12, 0, 0, 0);

      // Act & Assert
      expect(isBeforeOrEqual(date, date)).toBe(true);
      expect(isBeforeOrEqual(date, date, { unit: "year" })).toBe(true);
      expect(isBeforeOrEqual(date, date, { unit: "month" })).toBe(true);
      expect(isBeforeOrEqual(date, date, { unit: "day" })).toBe(true);
      expect(isBeforeOrEqual(date, date, { unit: "hour" })).toBe(true);
      expect(isBeforeOrEqual(date, date, { unit: "minute" })).toBe(true);
      expect(isBeforeOrEqual(date, date, { unit: "second" })).toBe(true);
    });
  });
});
