import { describe, it, expect } from "vitest";
import { isSameDay } from "../src/isSameDay";

/**
 * Test Design for isSameDay
 *
 * Function signature: isSameDay(dateLeft: Date | number, dateRight: Date | number): boolean
 *
 * Equivalence Partitioning:
 * - Class 1: Both dates on same calendar day → Returns true
 * - Class 2: Dates on different days of same month → Returns false
 * - Class 3: Dates on same day but different months/years → Returns false
 * - Class 4: Valid timestamp inputs on same day → Returns true
 * - Class 5: Valid timestamp inputs on different days → Returns false
 * - Class 6: Invalid date inputs (Invalid Date, NaN, Infinity, -Infinity) → Returns false
 *
 * Boundary Value Analysis:
 * - Same day boundary: Start (00:00:00.000) and end (23:59:59.999) of same day
 * - Day boundary crossing: Last moment and first moment across days
 * - Month boundary crossing: Same day number in different months
 * - Year boundary crossing: Same day in different years
 * - Leap year February 29
 * - DST transitions: Hours skipped/repeated during daylight saving time
 * - Ignores: Hour, minute, second, and millisecond components
 */

describe("isSameDay", () => {
  describe("Equivalence Class 1: Both dates on same calendar day", () => {
    it("should return true for dates at start and end of same day", () => {
      // Arrange
      const date1 = new Date(2024, 5, 15, 0, 0, 0, 0); // June 15, 2024 00:00:00.000
      const date2 = new Date(2024, 5, 15, 23, 59, 59, 999); // June 15, 2024 23:59:59.999

      // Act & Assert
      expect(isSameDay(date1, date2)).toBe(true);
    });

    it("should return true for dates at different times of same day", () => {
      // Arrange
      const date1 = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
      const date2 = new Date(2024, 5, 15, 9, 15, 20, 456); // June 15, 2024 09:15:20.456

      // Act & Assert
      expect(isSameDay(date1, date2)).toBe(true);
    });

    it("should ignore time components when comparing days", () => {
      // Arrange
      const morning = new Date(2024, 5, 15, 6, 0, 0, 0); // June 15, 2024 06:00:00.000
      const afternoon = new Date(2024, 5, 15, 18, 0, 0, 0); // June 15, 2024 18:00:00.000

      // Act & Assert
      expect(isSameDay(morning, afternoon)).toBe(true);
    });
  });

  describe("Equivalence Class 2: Dates on different days of same month", () => {
    it("should return false for dates on consecutive days", () => {
      // Arrange
      const date1 = new Date(2024, 5, 15, 23, 59, 59, 999); // June 15, 2024 23:59:59.999
      const date2 = new Date(2024, 5, 16, 0, 0, 0, 0); // June 16, 2024 00:00:00.000

      // Act & Assert
      expect(isSameDay(date1, date2)).toBe(false);
    });

    it("should return false for different days in same month", () => {
      // Arrange
      const day1 = new Date(2024, 5, 15); // June 15, 2024
      const day2 = new Date(2024, 5, 16); // June 16, 2024
      const day3 = new Date(2024, 5, 14); // June 14, 2024

      // Act & Assert
      expect(isSameDay(day1, day2)).toBe(false);
      expect(isSameDay(day1, day3)).toBe(false);
      expect(isSameDay(day2, day3)).toBe(false);
    });
  });

  describe("Equivalence Class 3: Dates on same day but different months/years", () => {
    it("should return false for same day number in different months", () => {
      // Arrange
      const june15 = new Date(2024, 5, 15); // June 15, 2024
      const july15 = new Date(2024, 6, 15); // July 15, 2024

      // Act & Assert
      expect(isSameDay(june15, july15)).toBe(false);
    });

    it("should return false for same day in different years", () => {
      // Arrange
      const date2024 = new Date(2024, 5, 15); // June 15, 2024
      const date2023 = new Date(2023, 5, 15); // June 15, 2023
      const date2025 = new Date(2025, 5, 15); // June 15, 2025

      // Act & Assert
      expect(isSameDay(date2024, date2023)).toBe(false);
      expect(isSameDay(date2024, date2025)).toBe(false);
      expect(isSameDay(date2023, date2025)).toBe(false);
    });
  });

  describe("Equivalence Class 4: Valid timestamp inputs on same day", () => {
    it("should accept timestamp inputs on same day", () => {
      // Arrange
      const timestamp1 = new Date(2024, 5, 15, 10, 0).getTime();
      const timestamp2 = new Date(2024, 5, 15, 20, 0).getTime();

      // Act & Assert
      expect(isSameDay(timestamp1, timestamp2)).toBe(true);
    });

    it("should accept mixed Date and timestamp on same day", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 14, 30);
      const timestamp = new Date(2024, 5, 15, 9, 15).getTime();

      // Act & Assert
      expect(isSameDay(date, timestamp)).toBe(true);
      expect(isSameDay(timestamp, date)).toBe(true);
    });
  });

  describe("Equivalence Class 5: Valid timestamp inputs on different days", () => {
    it("should return false for timestamps on different days", () => {
      // Arrange
      const timestamp1 = new Date(2024, 5, 15, 23, 59).getTime();
      const timestamp2 = new Date(2024, 5, 16, 0, 0).getTime();

      // Act & Assert
      expect(isSameDay(timestamp1, timestamp2)).toBe(false);
    });
  });

  describe("Equivalence Class 6: Invalid date inputs", () => {
    it("should return false when first date is Invalid Date", () => {
      // Arrange
      const invalidDate = new Date("invalid");
      const validDate = new Date(2024, 5, 15);

      // Act & Assert
      expect(isSameDay(invalidDate, validDate)).toBe(false);
    });

    it("should return false when second date is Invalid Date", () => {
      // Arrange
      const validDate = new Date(2024, 5, 15);
      const invalidDate = new Date("invalid");

      // Act & Assert
      expect(isSameDay(validDate, invalidDate)).toBe(false);
    });

    it("should return false when both dates are Invalid Date", () => {
      // Arrange
      const invalidDate1 = new Date("invalid");
      const invalidDate2 = new Date(NaN);

      // Act & Assert
      expect(isSameDay(invalidDate1, invalidDate2)).toBe(false);
    });

    it("should return false when timestamp is NaN", () => {
      // Arrange
      const validDate = new Date(2024, 5, 15);

      // Act & Assert
      expect(isSameDay(NaN, validDate)).toBe(false);
      expect(isSameDay(validDate, NaN)).toBe(false);
      expect(isSameDay(NaN, NaN)).toBe(false);
    });

    it("should return false when timestamp is Infinity", () => {
      // Arrange
      const validDate = new Date(2024, 5, 15);

      // Act & Assert
      expect(isSameDay(Infinity, validDate)).toBe(false);
      expect(isSameDay(validDate, Infinity)).toBe(false);
    });

    it("should return false when timestamp is -Infinity", () => {
      // Arrange
      const validDate = new Date(2024, 5, 15);

      // Act & Assert
      expect(isSameDay(-Infinity, validDate)).toBe(false);
      expect(isSameDay(validDate, -Infinity)).toBe(false);
    });
  });

  describe("Boundary Value Analysis: Month boundaries", () => {
    it("should handle month boundaries", () => {
      // Arrange
      const endOfMonth = new Date(2024, 5, 30, 23, 59); // June 30, 2024 23:59
      const startOfNextMonth = new Date(2024, 6, 1, 0, 0); // July 1, 2024 00:00
      const sameDay = new Date(2024, 5, 30, 12, 0); // June 30, 2024 12:00

      // Act & Assert
      expect(isSameDay(endOfMonth, startOfNextMonth)).toBe(false);
      expect(isSameDay(endOfMonth, sameDay)).toBe(true);
    });
  });

  describe("Boundary Value Analysis: Year boundaries", () => {
    it("should handle year boundaries", () => {
      // Arrange
      const endOfYear = new Date(2024, 11, 31, 23, 59); // December 31, 2024 23:59
      const startOfNextYear = new Date(2025, 0, 1, 0, 0); // January 1, 2025 00:00
      const sameDay = new Date(2024, 11, 31, 12, 0); // December 31, 2024 12:00

      // Act & Assert
      expect(isSameDay(endOfYear, startOfNextYear)).toBe(false);
      expect(isSameDay(endOfYear, sameDay)).toBe(true);
    });
  });

  describe("Boundary Value Analysis: Leap year February 29", () => {
    it("should handle leap year February 29th", () => {
      // Arrange
      const leapDay1 = new Date(2024, 1, 29, 10, 0); // February 29, 2024 10:00
      const leapDay2 = new Date(2024, 1, 29, 22, 30); // February 29, 2024 22:30
      const nonLeapDay = new Date(2023, 1, 28, 15, 0); // February 28, 2023 15:00

      // Act & Assert
      expect(isSameDay(leapDay1, leapDay2)).toBe(true);
      expect(isSameDay(leapDay1, nonLeapDay)).toBe(false);
    });
  });

  describe("Boundary Value Analysis: DST transitions", () => {
    it("should handle DST transitions on same day", () => {
      // Arrange
      // DST typically occurs in March and November in many regions
      const beforeDST = new Date(2024, 2, 10, 1, 0); // March 10, 2024 01:00
      const afterDST = new Date(2024, 2, 10, 3, 0); // March 10, 2024 03:00 (after spring forward)
      const differentDay = new Date(2024, 2, 11, 2, 0); // March 11, 2024 02:00

      // Act & Assert
      expect(isSameDay(beforeDST, afterDST)).toBe(true);
      expect(isSameDay(beforeDST, differentDay)).toBe(false);
    });
  });

  describe("Same Date object reference", () => {
    it("should return true when comparing same date object", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 14, 30, 45);

      // Act & Assert
      expect(isSameDay(date, date)).toBe(true);
    });
  });

  describe("Argument order independence", () => {
    it("should return same result regardless of argument order", () => {
      // Arrange
      const date1 = new Date(2024, 5, 15, 10, 0);
      const date2 = new Date(2024, 5, 15, 20, 0);
      const date3 = new Date(2024, 5, 16, 10, 0);

      // Act & Assert
      expect(isSameDay(date1, date2)).toBe(isSameDay(date2, date1));
      expect(isSameDay(date1, date3)).toBe(isSameDay(date3, date1));
    });
  });
});
