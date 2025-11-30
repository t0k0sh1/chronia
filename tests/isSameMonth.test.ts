import { describe, it, expect } from "vitest";
import { isSameMonth } from "../src/isSameMonth";

/**
 * Test Design for isSameMonth
 *
 * Function signature: isSameMonth(dateLeft: Date | number, dateRight: Date | number): boolean
 *
 * Equivalence Partitioning:
 * - Class 1: Both dates in same month and year → Returns true
 * - Class 2: Dates in different months of same year → Returns false
 * - Class 3: Dates in same month but different years → Returns false
 * - Class 4: Valid timestamp inputs in same month → Returns true
 * - Class 5: Valid timestamp inputs in different months → Returns false
 * - Class 6: Invalid date inputs (Invalid Date, NaN, Infinity, -Infinity) → Returns false
 *
 * Boundary Value Analysis:
 * - Same month boundary: 1st and last day of same month
 * - Month boundary crossing: Last day and first day across months
 * - Year boundary crossing: Same month in different years
 * - Leap year February: Feb 29 in leap year
 * - All 12 months: January through December
 * - Ignores: Day and time components
 */

describe("isSameMonth", () => {
  describe("Equivalence Class 1: Both dates in same month and year", () => {
    it("should return true for dates at start and end of same month", () => {
      // Arrange
      const date1 = new Date(2024, 5, 1); // June 1, 2024
      const date2 = new Date(2024, 5, 30); // June 30, 2024

      // Act & Assert
      expect(isSameMonth(date1, date2)).toBe(true);
    });

    it("should return true for dates in different days of same month", () => {
      // Arrange
      const date1 = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
      const date2 = new Date(2024, 5, 20, 9, 15, 30, 456); // June 20, 2024 09:15:30.456

      // Act & Assert
      expect(isSameMonth(date1, date2)).toBe(true);
    });

    it("should ignore time components when comparing months", () => {
      // Arrange
      const date1 = new Date(2024, 5, 1, 0, 0, 0, 0); // June 1, 2024 00:00:00.000
      const date2 = new Date(2024, 5, 30, 23, 59, 59, 999); // June 30, 2024 23:59:59.999

      // Act & Assert
      expect(isSameMonth(date1, date2)).toBe(true);
    });
  });

  describe("Equivalence Class 2: Dates in different months of same year", () => {
    it("should return false for dates in consecutive months", () => {
      // Arrange
      const date1 = new Date(2024, 5, 30); // June 30, 2024
      const date2 = new Date(2024, 6, 1); // July 1, 2024

      // Act & Assert
      expect(isSameMonth(date1, date2)).toBe(false);
    });

    it("should return false for dates in different months", () => {
      // Arrange
      const date1 = new Date(2024, 0, 15); // January 15, 2024
      const date2 = new Date(2024, 11, 15); // December 15, 2024

      // Act & Assert
      expect(isSameMonth(date1, date2)).toBe(false);
    });
  });

  describe("Equivalence Class 3: Dates in same month but different years", () => {
    it("should return false for same month in different years", () => {
      // Arrange
      const date1 = new Date(2024, 5, 15); // June 15, 2024
      const date2 = new Date(2023, 5, 15); // June 15, 2023

      // Act & Assert
      expect(isSameMonth(date1, date2)).toBe(false);
    });
  });

  describe("Equivalence Class 4: Valid timestamp inputs in same month", () => {
    it("should accept timestamp inputs in same month", () => {
      // Arrange
      const timestamp1 = new Date(2024, 5, 1).getTime();
      const timestamp2 = new Date(2024, 5, 30).getTime();

      // Act & Assert
      expect(isSameMonth(timestamp1, timestamp2)).toBe(true);
    });

    it("should accept mixed Date and timestamp in same month", () => {
      // Arrange
      const date = new Date(2024, 5, 15);
      const timestamp = new Date(2024, 5, 20).getTime();

      // Act & Assert
      expect(isSameMonth(date, timestamp)).toBe(true);
      expect(isSameMonth(timestamp, date)).toBe(true);
    });
  });

  describe("Equivalence Class 5: Valid timestamp inputs in different months", () => {
    it("should return false for timestamps in different months", () => {
      // Arrange
      const timestamp1 = new Date(2024, 5, 30).getTime();
      const timestamp2 = new Date(2024, 6, 1).getTime();

      // Act & Assert
      expect(isSameMonth(timestamp1, timestamp2)).toBe(false);
    });
  });

  describe("Equivalence Class 6: Invalid date inputs", () => {
    it("should return false when first date is Invalid Date", () => {
      // Arrange
      const invalidDate = new Date("invalid");
      const validDate = new Date(2024, 5, 15);

      // Act & Assert
      expect(isSameMonth(invalidDate, validDate)).toBe(false);
    });

    it("should return false when second date is Invalid Date", () => {
      // Arrange
      const validDate = new Date(2024, 5, 15);
      const invalidDate = new Date("invalid");

      // Act & Assert
      expect(isSameMonth(validDate, invalidDate)).toBe(false);
    });

    it("should return false when both dates are Invalid Date", () => {
      // Arrange
      const invalidDate1 = new Date("invalid");
      const invalidDate2 = new Date(NaN);

      // Act & Assert
      expect(isSameMonth(invalidDate1, invalidDate2)).toBe(false);
    });

    it("should return false when timestamp is NaN", () => {
      // Arrange
      const validDate = new Date(2024, 5, 15);

      // Act & Assert
      expect(isSameMonth(NaN, validDate)).toBe(false);
      expect(isSameMonth(validDate, NaN)).toBe(false);
      expect(isSameMonth(NaN, NaN)).toBe(false);
    });

    it("should return false when timestamp is Infinity", () => {
      // Arrange
      const validDate = new Date(2024, 5, 15);

      // Act & Assert
      expect(isSameMonth(Infinity, validDate)).toBe(false);
      expect(isSameMonth(validDate, Infinity)).toBe(false);
    });

    it("should return false when timestamp is -Infinity", () => {
      // Arrange
      const validDate = new Date(2024, 5, 15);

      // Act & Assert
      expect(isSameMonth(-Infinity, validDate)).toBe(false);
      expect(isSameMonth(validDate, -Infinity)).toBe(false);
    });
  });

  describe("Boundary Value Analysis: All months", () => {
    it("should handle all 12 months correctly", () => {
      // Arrange
      const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

      // Act & Assert
      months.forEach((month) => {
        const date1 = new Date(2024, month, 1);
        const date2 = new Date(2024, month, 15);
        expect(isSameMonth(date1, date2)).toBe(true);

        if (month < 11) {
          const nextMonth = new Date(2024, month + 1, 1);
          expect(isSameMonth(date1, nextMonth)).toBe(false);
        }
      });
    });
  });

  describe("Boundary Value Analysis: Leap year February", () => {
    it("should handle leap year February correctly", () => {
      // Arrange
      const leapFeb1 = new Date(2024, 1, 1); // February 1, 2024 (leap year)
      const leapFeb29 = new Date(2024, 1, 29); // February 29, 2024
      const nonLeapFeb = new Date(2023, 1, 28); // February 28, 2023 (non-leap year)

      // Act & Assert
      expect(isSameMonth(leapFeb1, leapFeb29)).toBe(true);
      expect(isSameMonth(leapFeb1, nonLeapFeb)).toBe(false);
    });
  });

  describe("Boundary Value Analysis: Year boundaries", () => {
    it("should handle year boundaries", () => {
      // Arrange
      const endOfYear = new Date(2024, 11, 31); // December 31, 2024
      const startOfNextYear = new Date(2025, 0, 1); // January 1, 2025
      const sameMonth = new Date(2024, 11, 1); // December 1, 2024

      // Act & Assert
      expect(isSameMonth(endOfYear, startOfNextYear)).toBe(false);
      expect(isSameMonth(endOfYear, sameMonth)).toBe(true);
    });
  });

  describe("Boundary Value Analysis: Cross-year same month", () => {
    it("should return false for same month in different years", () => {
      // Arrange
      const dec2024 = new Date(2024, 11, 15); // December 2024
      const jan2025 = new Date(2025, 0, 15); // January 2025
      const dec2023 = new Date(2023, 11, 15); // December 2023

      // Act & Assert
      expect(isSameMonth(dec2024, jan2025)).toBe(false);
      expect(isSameMonth(dec2024, dec2023)).toBe(false);
    });
  });

  describe("Same Date object reference", () => {
    it("should return true when comparing same date object", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 14, 30, 45);

      // Act & Assert
      expect(isSameMonth(date, date)).toBe(true);
    });
  });

  describe("Argument order independence", () => {
    it("should return same result regardless of argument order", () => {
      // Arrange
      const date1 = new Date(2024, 5, 15);
      const date2 = new Date(2024, 5, 20);
      const date3 = new Date(2024, 6, 15);

      // Act & Assert
      expect(isSameMonth(date1, date2)).toBe(isSameMonth(date2, date1));
      expect(isSameMonth(date1, date3)).toBe(isSameMonth(date3, date1));
    });
  });

  describe("Different months with same day", () => {
    it("should return false for different months with same day", () => {
      // Arrange & Act & Assert
      expect(isSameMonth(new Date(2024, 0, 15), new Date(2024, 1, 15))).toBe(false); // January vs February
      expect(isSameMonth(new Date(2024, 1, 15), new Date(2024, 2, 15))).toBe(false); // February vs March
      expect(isSameMonth(new Date(2024, 11, 15), new Date(2024, 0, 15))).toBe(false); // December vs January
    });
  });
});
