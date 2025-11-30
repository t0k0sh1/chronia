import { describe, it, expect } from "vitest";
import { isAfterOrEqual } from "../src/isAfterOrEqual";

/**
 * Test Design for isAfterOrEqual
 *
 * Function signature: isAfterOrEqual(date: Date | number, dateToCompare: Date | number, options?: { unit?: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond' }): boolean
 *
 * Equivalence Partitioning:
 * - Class 1: date > dateToCompare → Returns true (at specified unit)
 * - Class 2: date === dateToCompare → Returns true (at specified unit)
 * - Class 3: date < dateToCompare → Returns false (at specified unit)
 * - Class 4: Valid timestamp inputs → Same logic as Date inputs
 * - Class 5: Invalid date inputs (Invalid Date, NaN, Infinity, -Infinity) → Returns false
 *
 * Boundary Value Analysis:
 * - Unit boundaries: Test transitions at each unit level (year, month, day, hour, minute, second, millisecond)
 * - Same dates: Returns true for all units
 * - Edge dates: Year boundaries, leap years, DST transitions, BC dates
 * - Precision: Each unit ignores lower units (e.g., day ignores hours)
 */

describe("isAfterOrEqual", () => {
  describe("Equivalence Class 1 & 2: Millisecond comparison (default) - After or Equal", () => {
    it("should return true when first date is after second (millisecond precision)", () => {
      // Arrange
      const later = new Date(2024, 0, 1, 12, 0, 0, 1);
      const earlier = new Date(2024, 0, 1, 12, 0, 0, 0);

      // Act & Assert
      expect(isAfterOrEqual(later, earlier)).toBe(true);
    });

    it("should return true when dates are equal (millisecond precision)", () => {
      // Arrange
      const date1 = new Date(2024, 0, 1, 12, 0, 0, 0);
      const date2 = new Date(2024, 0, 1, 12, 0, 0, 0);

      // Act & Assert
      expect(isAfterOrEqual(date1, date2)).toBe(true);
    });

    it("should return true when first date is after second (day level)", () => {
      // Arrange
      const later = new Date(2024, 0, 2);
      const earlier = new Date(2024, 0, 1);

      // Act & Assert
      expect(isAfterOrEqual(later, earlier)).toBe(true);
    });
  });

  describe("Equivalence Class 3: Millisecond comparison (default) - Before", () => {
    it("should return false when first date is before second (millisecond precision)", () => {
      // Arrange
      const earlier = new Date(2024, 0, 1, 12, 0, 0, 0);
      const later = new Date(2024, 0, 1, 12, 0, 0, 1);

      // Act & Assert
      expect(isAfterOrEqual(earlier, later)).toBe(false);
    });

    it("should return false when first date is before second (day level)", () => {
      // Arrange
      const earlier = new Date(2024, 0, 1);
      const later = new Date(2024, 0, 2);

      // Act & Assert
      expect(isAfterOrEqual(earlier, later)).toBe(false);
    });
  });

  describe("Unit: year - Year comparison", () => {
    it("should return true when first year is after second", () => {
      // Arrange
      const year2025 = new Date(2025, 0, 1);
      const year2024 = new Date(2024, 0, 1);

      // Act & Assert
      expect(isAfterOrEqual(year2025, year2024, { unit: "year" })).toBe(true);
    });

    it("should return true when years are equal (different months/days)", () => {
      // Arrange
      const dec2024 = new Date(2024, 11, 31);
      const jan2024 = new Date(2024, 0, 1);

      // Act & Assert
      expect(isAfterOrEqual(dec2024, jan2024, { unit: "year" })).toBe(true);
      expect(isAfterOrEqual(jan2024, dec2024, { unit: "year" })).toBe(true);
    });

    it("should return false when first year is before second", () => {
      // Arrange
      const year2024 = new Date(2024, 0, 1);
      const year2025 = new Date(2025, 0, 1);

      // Act & Assert
      expect(isAfterOrEqual(year2024, year2025, { unit: "year" })).toBe(false);
    });

    it("should handle year boundary correctly", () => {
      // Arrange
      const endOfYear = new Date(2024, 11, 31);
      const startOfNextYear = new Date(2025, 0, 1);

      // Act & Assert
      expect(isAfterOrEqual(startOfNextYear, endOfYear, { unit: "year" })).toBe(true);
      expect(isAfterOrEqual(endOfYear, startOfNextYear, { unit: "year" })).toBe(false);
    });
  });

  describe("Unit: month - Month comparison", () => {
    it("should return true when first month is after second", () => {
      // Arrange
      const feb = new Date(2024, 1, 1);
      const jan = new Date(2024, 0, 1);

      // Act & Assert
      expect(isAfterOrEqual(feb, jan, { unit: "month" })).toBe(true);
    });

    it("should return true when months are equal (different days)", () => {
      // Arrange
      const endOfMonth = new Date(2024, 0, 31);
      const startOfMonth = new Date(2024, 0, 1);

      // Act & Assert
      expect(isAfterOrEqual(endOfMonth, startOfMonth, { unit: "month" })).toBe(true);
      expect(isAfterOrEqual(startOfMonth, endOfMonth, { unit: "month" })).toBe(true);
    });

    it("should return false when first month is before second", () => {
      // Arrange
      const jan = new Date(2024, 0, 1);
      const feb = new Date(2024, 1, 1);

      // Act & Assert
      expect(isAfterOrEqual(jan, feb, { unit: "month" })).toBe(false);
    });

    it("should handle month boundary across years", () => {
      // Arrange
      const jan2025 = new Date(2025, 0, 1);
      const dec2024 = new Date(2024, 11, 31);

      // Act & Assert
      expect(isAfterOrEqual(jan2025, dec2024, { unit: "month" })).toBe(true);
      expect(isAfterOrEqual(dec2024, jan2025, { unit: "month" })).toBe(false);
    });

    it("should return true when same month but different days within month", () => {
      // Arrange
      const day16 = new Date(2024, 0, 16);
      const day15 = new Date(2024, 0, 15);

      // Act & Assert
      expect(isAfterOrEqual(day16, day15, { unit: "month" })).toBe(true);
    });
  });

  describe("Unit: day - Day comparison", () => {
    it("should return true when first day is after second", () => {
      // Arrange
      const day2 = new Date(2024, 0, 2, 0, 0, 0);
      const day1 = new Date(2024, 0, 1, 0, 0, 0);

      // Act & Assert
      expect(isAfterOrEqual(day2, day1, { unit: "day" })).toBe(true);
    });

    it("should return true when days are equal (different times)", () => {
      // Arrange
      const morning = new Date(2024, 0, 1, 0, 0, 0);
      const evening = new Date(2024, 0, 1, 23, 59, 59);

      // Act & Assert
      expect(isAfterOrEqual(morning, evening, { unit: "day" })).toBe(true);
      expect(isAfterOrEqual(evening, morning, { unit: "day" })).toBe(true);
    });

    it("should return false when first day is before second", () => {
      // Arrange
      const day1 = new Date(2024, 0, 1, 23, 59, 59);
      const day2 = new Date(2024, 0, 2, 0, 0, 0);

      // Act & Assert
      expect(isAfterOrEqual(day1, day2, { unit: "day" })).toBe(false);
    });

    it("should handle day comparison within same day", () => {
      // Arrange
      const noon = new Date(2024, 0, 1, 12, 0, 0);
      const midnight = new Date(2024, 0, 1, 0, 0, 0);

      // Act & Assert
      expect(isAfterOrEqual(noon, midnight, { unit: "day" })).toBe(true);
    });

    it("should handle day boundary correctly", () => {
      // Arrange
      const day2 = new Date(2024, 0, 2);
      const day1 = new Date(2024, 0, 1);

      // Act & Assert
      expect(isAfterOrEqual(day2, day1, { unit: "day" })).toBe(true);
    });
  });

  describe("Unit: hour - Hour comparison", () => {
    it("should return true when first hour is after second", () => {
      // Arrange
      const hour13 = new Date(2024, 0, 1, 13, 0, 0);
      const hour12 = new Date(2024, 0, 1, 12, 0, 0);

      // Act & Assert
      expect(isAfterOrEqual(hour13, hour12, { unit: "hour" })).toBe(true);
    });

    it("should return true when hours are equal (different minutes)", () => {
      // Arrange
      const start = new Date(2024, 0, 1, 12, 0, 0);
      const end = new Date(2024, 0, 1, 12, 59, 59);

      // Act & Assert
      expect(isAfterOrEqual(start, end, { unit: "hour" })).toBe(true);
      expect(isAfterOrEqual(end, start, { unit: "hour" })).toBe(true);
    });

    it("should return false when first hour is before second", () => {
      // Arrange
      const hour12 = new Date(2024, 0, 1, 12, 59, 59);
      const hour13 = new Date(2024, 0, 1, 13, 0, 0);

      // Act & Assert
      expect(isAfterOrEqual(hour12, hour13, { unit: "hour" })).toBe(false);
    });

    it("should handle hour comparison within same hour", () => {
      // Arrange
      const halfPast = new Date(2024, 0, 1, 12, 30, 0);
      const hourStart = new Date(2024, 0, 1, 12, 0, 0);

      // Act & Assert
      expect(isAfterOrEqual(halfPast, hourStart, { unit: "hour" })).toBe(true);
    });

    it("should handle hour boundary correctly", () => {
      // Arrange
      const hour13 = new Date(2024, 0, 1, 13, 0, 0);
      const hour12End = new Date(2024, 0, 1, 12, 59, 59);

      // Act & Assert
      expect(isAfterOrEqual(hour13, hour12End, { unit: "hour" })).toBe(true);
    });
  });

  describe("Unit: minute - Minute comparison", () => {
    it("should return true when first minute is after second", () => {
      // Arrange
      const minute1 = new Date(2024, 0, 1, 12, 1, 0);
      const minute0 = new Date(2024, 0, 1, 12, 0, 0);

      // Act & Assert
      expect(isAfterOrEqual(minute1, minute0, { unit: "minute" })).toBe(true);
    });

    it("should return true when minutes are equal (different seconds)", () => {
      // Arrange
      const start = new Date(2024, 0, 1, 12, 0, 0);
      const end = new Date(2024, 0, 1, 12, 0, 59);

      // Act & Assert
      expect(isAfterOrEqual(start, end, { unit: "minute" })).toBe(true);
      expect(isAfterOrEqual(end, start, { unit: "minute" })).toBe(true);
    });

    it("should return false when first minute is before second", () => {
      // Arrange
      const minute0 = new Date(2024, 0, 1, 12, 0, 59);
      const minute1 = new Date(2024, 0, 1, 12, 1, 0);

      // Act & Assert
      expect(isAfterOrEqual(minute0, minute1, { unit: "minute" })).toBe(false);
    });

    it("should handle minute comparison within same minute", () => {
      // Arrange
      const halfMinute = new Date(2024, 0, 1, 12, 0, 30);
      const minuteStart = new Date(2024, 0, 1, 12, 0, 0);

      // Act & Assert
      expect(isAfterOrEqual(halfMinute, minuteStart, { unit: "minute" })).toBe(true);
    });

    it("should handle minute boundary correctly", () => {
      // Arrange
      const minute1 = new Date(2024, 0, 1, 12, 1, 0);
      const minute0End = new Date(2024, 0, 1, 12, 0, 59);

      // Act & Assert
      expect(isAfterOrEqual(minute1, minute0End, { unit: "minute" })).toBe(true);
    });
  });

  describe("Unit: second - Second comparison", () => {
    it("should return true when first second is after second", () => {
      // Arrange
      const second1 = new Date(2024, 0, 1, 12, 0, 1, 0);
      const second0 = new Date(2024, 0, 1, 12, 0, 0, 0);

      // Act & Assert
      expect(isAfterOrEqual(second1, second0, { unit: "second" })).toBe(true);
    });

    it("should return true when seconds are equal (different milliseconds)", () => {
      // Arrange
      const start = new Date(2024, 0, 1, 12, 0, 0, 0);
      const end = new Date(2024, 0, 1, 12, 0, 0, 999);

      // Act & Assert
      expect(isAfterOrEqual(start, end, { unit: "second" })).toBe(true);
      expect(isAfterOrEqual(end, start, { unit: "second" })).toBe(true);
    });

    it("should return false when first second is before second", () => {
      // Arrange
      const second0 = new Date(2024, 0, 1, 12, 0, 0, 999);
      const second1 = new Date(2024, 0, 1, 12, 0, 1, 0);

      // Act & Assert
      expect(isAfterOrEqual(second0, second1, { unit: "second" })).toBe(false);
    });

    it("should handle second comparison within same second", () => {
      // Arrange
      const halfSecond = new Date(2024, 0, 1, 12, 0, 0, 500);
      const secondStart = new Date(2024, 0, 1, 12, 0, 0, 0);

      // Act & Assert
      expect(isAfterOrEqual(halfSecond, secondStart, { unit: "second" })).toBe(true);
    });

    it("should handle second boundary correctly", () => {
      // Arrange
      const second1 = new Date(2024, 0, 1, 12, 0, 1, 0);
      const second0End = new Date(2024, 0, 1, 12, 0, 0, 999);

      // Act & Assert
      expect(isAfterOrEqual(second1, second0End, { unit: "second" })).toBe(true);
    });
  });

  describe("Equivalence Class 4: Timestamp inputs", () => {
    it("should accept timestamp inputs", () => {
      // Arrange
      const timestamp1 = new Date(2024, 0, 2).getTime();
      const timestamp2 = new Date(2024, 0, 1).getTime();

      // Act & Assert
      expect(isAfterOrEqual(timestamp1, timestamp2)).toBe(true);
      expect(isAfterOrEqual(timestamp2, timestamp1)).toBe(false);
    });

    it("should accept mixed Date and timestamp", () => {
      // Arrange
      const date = new Date(2024, 0, 2);
      const timestamp = new Date(2024, 0, 1).getTime();

      // Act & Assert
      expect(isAfterOrEqual(date, timestamp)).toBe(true);
      expect(isAfterOrEqual(timestamp, date)).toBe(false);
    });

    it("should handle equal timestamps", () => {
      // Arrange
      const timestamp = 1704067200000; // 2024-01-01 00:00:00 UTC
      const date1 = new Date(timestamp);
      const date2 = new Date(timestamp);

      // Act & Assert
      expect(isAfterOrEqual(date1, date2)).toBe(true);
      expect(isAfterOrEqual(date2, date1)).toBe(true);
    });
  });

  describe("Equivalence Class 5: Invalid date inputs", () => {
    it("should return false when first date is Invalid Date", () => {
      // Arrange
      const invalidDate = new Date("invalid");
      const validDate = new Date(2024, 0, 1);

      // Act & Assert
      expect(isAfterOrEqual(invalidDate, validDate)).toBe(false);
    });

    it("should return false when second date is Invalid Date", () => {
      // Arrange
      const validDate = new Date(2024, 0, 1);
      const invalidDate = new Date("invalid");

      // Act & Assert
      expect(isAfterOrEqual(validDate, invalidDate)).toBe(false);
    });

    it("should return false when both dates are Invalid Date", () => {
      // Arrange
      const invalidDate1 = new Date("invalid");
      const invalidDate2 = new Date(NaN);

      // Act & Assert
      expect(isAfterOrEqual(invalidDate1, invalidDate2)).toBe(false);
    });

    it("should return false when timestamp is NaN", () => {
      // Arrange
      const validDate = new Date(2024, 0, 1);

      // Act & Assert
      expect(isAfterOrEqual(NaN, validDate)).toBe(false);
      expect(isAfterOrEqual(validDate, NaN)).toBe(false);
      expect(isAfterOrEqual(NaN, NaN)).toBe(false);
    });

    it("should return false when timestamp is Infinity", () => {
      // Arrange
      const validDate = new Date(2024, 0, 1);

      // Act & Assert
      expect(isAfterOrEqual(Infinity, validDate)).toBe(false);
      expect(isAfterOrEqual(validDate, Infinity)).toBe(false);
    });

    it("should return false when timestamp is -Infinity", () => {
      // Arrange
      const validDate = new Date(2024, 0, 1);

      // Act & Assert
      expect(isAfterOrEqual(-Infinity, validDate)).toBe(false);
      expect(isAfterOrEqual(validDate, -Infinity)).toBe(false);
      expect(isAfterOrEqual(Infinity, -Infinity)).toBe(false);
    });
  });

  describe("Boundary Value Analysis: Same dates", () => {
    it("should return true for same date reference across all units", () => {
      // Arrange
      const date = new Date(2024, 0, 1, 12, 0, 0, 0);

      // Act & Assert
      expect(isAfterOrEqual(date, date)).toBe(true);
      expect(isAfterOrEqual(date, date, { unit: "year" })).toBe(true);
      expect(isAfterOrEqual(date, date, { unit: "month" })).toBe(true);
      expect(isAfterOrEqual(date, date, { unit: "day" })).toBe(true);
      expect(isAfterOrEqual(date, date, { unit: "hour" })).toBe(true);
      expect(isAfterOrEqual(date, date, { unit: "minute" })).toBe(true);
      expect(isAfterOrEqual(date, date, { unit: "second" })).toBe(true);
    });
  });

  describe("Boundary Value Analysis: Leap year boundaries", () => {
    it("should handle leap year February 29th correctly", () => {
      // Arrange
      const march1 = new Date(2024, 2, 1);
      const feb29 = new Date(2024, 1, 29);
      const feb28 = new Date(2024, 1, 28);

      // Act & Assert
      expect(isAfterOrEqual(march1, feb29, { unit: "day" })).toBe(true);
      expect(isAfterOrEqual(feb29, march1, { unit: "day" })).toBe(false);
      expect(isAfterOrEqual(feb29, feb28, { unit: "day" })).toBe(true);
    });
  });

  describe("Boundary Value Analysis: Year boundaries", () => {
    it("should handle year boundaries correctly", () => {
      // Arrange
      const newYear = new Date(2025, 0, 1, 0, 0, 0);
      const oldYear = new Date(2024, 11, 31, 23, 59, 59);

      // Act & Assert
      expect(isAfterOrEqual(newYear, oldYear)).toBe(true);
      expect(isAfterOrEqual(oldYear, newYear)).toBe(false);
    });

    it("should handle same day at year boundary", () => {
      // Arrange
      const dec31 = new Date(2024, 11, 31);

      // Act & Assert
      expect(isAfterOrEqual(dec31, dec31, { unit: "day" })).toBe(true);
    });
  });

  describe("Boundary Value Analysis: DST transitions", () => {
    it("should handle DST transitions correctly", () => {
      // Arrange
      const beforeDST = new Date(2024, 2, 10, 1, 59, 59);
      const afterDST = new Date(2024, 2, 10, 3, 0, 0);

      // Act & Assert
      expect(isAfterOrEqual(afterDST, beforeDST)).toBe(true);
      expect(isAfterOrEqual(beforeDST, afterDST)).toBe(false);
      expect(isAfterOrEqual(beforeDST, afterDST, { unit: "day" })).toBe(true);
      expect(isAfterOrEqual(afterDST, beforeDST, { unit: "day" })).toBe(true);
    });
  });

  describe("Boundary Value Analysis: BC dates", () => {
    it("should handle negative years (BC dates) correctly", () => {
      // Arrange
      const date1 = new Date(-100, 0, 1); // 100 BC
      const date2 = new Date(-200, 0, 1); // 200 BC

      // Act & Assert
      expect(isAfterOrEqual(date1, date2)).toBe(true);
      expect(isAfterOrEqual(date2, date1)).toBe(false);
      expect(isAfterOrEqual(date1, date1)).toBe(true);
    });
  });

  describe("Boundary Value Analysis: Millisecond precision", () => {
    it("should handle millisecond precision boundaries", () => {
      // Arrange
      const date1 = new Date(2024, 0, 1, 0, 0, 0, 0);
      const date2 = new Date(2024, 0, 1, 0, 0, 0, 1);

      // Act & Assert
      expect(isAfterOrEqual(date2, date1)).toBe(true);
      expect(isAfterOrEqual(date1, date2)).toBe(false);
      expect(isAfterOrEqual(date1, date2, { unit: "second" })).toBe(true);
      expect(isAfterOrEqual(date2, date1, { unit: "second" })).toBe(true);
    });
  });
});
