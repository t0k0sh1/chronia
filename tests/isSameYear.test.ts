import { describe, it, expect } from "vitest";
import { isSameYear } from "../src/isSameYear";

/**
 * Test Design for isSameYear
 *
 * Function signature: isSameYear(dateLeft: Date | number, dateRight: Date | number): boolean
 *
 * Equivalence Partitioning:
 * - Class 1: Both dates in same year → Returns true
 * - Class 2: Dates in different years → Returns false
 * - Class 3: Same Date object reference → Returns true
 * - Class 4: Valid timestamp inputs in same year → Returns true
 * - Class 5: Valid timestamp inputs in different years → Returns false
 * - Class 6: Invalid date inputs (Invalid Date, NaN, Infinity, -Infinity) → Returns false
 * - Class 7: Type mismatches (string, object, null, undefined) → Returns false
 *
 * Boundary Value Analysis:
 * - Same year boundary: Jan 1 and Dec 31 of same year
 * - Year boundary crossing: Dec 31 and Jan 1 across years
 * - Century boundaries: 1999/2000, 2099/2100
 * - Leap years: Feb 29 in leap year
 * - BC dates: Negative year values
 * - Ignores: Month, day, and time components
 */

describe("isSameYear", () => {
  describe("Equivalence Class 1: Both dates in same year", () => {
    it("should return true for dates at start and end of same year", () => {
      // Arrange
      const date1 = new Date(2024, 0, 1); // January 1, 2024
      const date2 = new Date(2024, 11, 31); // December 31, 2024

      // Act & Assert
      expect(isSameYear(date1, date2)).toBe(true);
    });

    it("should return true for dates in different months of same year", () => {
      // Arrange
      const date1 = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
      const date2 = new Date(2024, 8, 20, 9, 15, 30, 456); // September 20, 2024 09:15:30.456

      // Act & Assert
      expect(isSameYear(date1, date2)).toBe(true);
    });

    it("should ignore time components when comparing years", () => {
      // Arrange
      const date1 = new Date(2024, 0, 1, 0, 0, 0, 0); // January 1, 2024 00:00:00.000
      const date2 = new Date(2024, 11, 31, 23, 59, 59, 999); // December 31, 2024 23:59:59.999

      // Act & Assert
      expect(isSameYear(date1, date2)).toBe(true);
    });
  });

  describe("Equivalence Class 2: Dates in different years", () => {
    it("should return false for dates in consecutive years", () => {
      // Arrange
      const date1 = new Date(2024, 11, 31); // December 31, 2024
      const date2 = new Date(2025, 0, 1); // January 1, 2025

      // Act & Assert
      expect(isSameYear(date1, date2)).toBe(false);
    });

    it("should return false for same month and day in different years", () => {
      // Arrange
      const date1 = new Date(2024, 5, 15);
      const date2 = new Date(2023, 5, 15);

      // Act & Assert
      expect(isSameYear(date1, date2)).toBe(false);
    });

    it("should return false for dates multiple years apart", () => {
      // Arrange
      const date1 = new Date(2024, 5, 15);
      const date2 = new Date(2025, 5, 15);
      const date3 = new Date(2020, 5, 15);

      // Act & Assert
      expect(isSameYear(date1, date2)).toBe(false);
      expect(isSameYear(date1, date3)).toBe(false);
    });
  });

  describe("Equivalence Class 3: Same Date object reference", () => {
    it("should return true when comparing same date object", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 14, 30, 45);

      // Act & Assert
      expect(isSameYear(date, date)).toBe(true);
    });
  });

  describe("Equivalence Class 4: Valid timestamp inputs in same year", () => {
    it("should accept timestamp inputs in same year", () => {
      // Arrange
      const timestamp1 = new Date(2024, 0, 1).getTime();
      const timestamp2 = new Date(2024, 11, 31).getTime();

      // Act & Assert
      expect(isSameYear(timestamp1, timestamp2)).toBe(true);
    });

    it("should accept mixed Date and timestamp in same year", () => {
      // Arrange
      const date = new Date(2024, 5, 15);
      const timestamp = new Date(2024, 8, 20).getTime();

      // Act & Assert
      expect(isSameYear(date, timestamp)).toBe(true);
      expect(isSameYear(timestamp, date)).toBe(true);
    });
  });

  describe("Equivalence Class 5: Valid timestamp inputs in different years", () => {
    it("should return false for timestamps in different years", () => {
      // Arrange
      const timestamp1 = new Date(2024, 11, 31).getTime();
      const timestamp2 = new Date(2025, 0, 1).getTime();

      // Act & Assert
      expect(isSameYear(timestamp1, timestamp2)).toBe(false);
    });
  });

  describe("Equivalence Class 6: Invalid date inputs", () => {
    it("should return false when first date is Invalid Date", () => {
      // Arrange
      const invalidDate = new Date("invalid");
      const validDate = new Date(2024, 5, 15);

      // Act & Assert
      expect(isSameYear(invalidDate, validDate)).toBe(false);
    });

    it("should return false when second date is Invalid Date", () => {
      // Arrange
      const validDate = new Date(2024, 5, 15);
      const invalidDate = new Date("invalid");

      // Act & Assert
      expect(isSameYear(validDate, invalidDate)).toBe(false);
    });

    it("should return false when both dates are Invalid Date", () => {
      // Arrange
      const invalidDate1 = new Date("invalid");
      const invalidDate2 = new Date(NaN);

      // Act & Assert
      expect(isSameYear(invalidDate1, invalidDate2)).toBe(false);
    });

    it("should return false when timestamp is NaN", () => {
      // Arrange
      const validDate = new Date(2024, 5, 15);

      // Act & Assert
      expect(isSameYear(NaN, validDate)).toBe(false);
      expect(isSameYear(validDate, NaN)).toBe(false);
      expect(isSameYear(NaN, NaN)).toBe(false);
    });

    it("should return false when timestamp is Infinity", () => {
      // Arrange
      const validDate = new Date(2024, 5, 15);

      // Act & Assert
      expect(isSameYear(Infinity, validDate)).toBe(false);
      expect(isSameYear(validDate, Infinity)).toBe(false);
    });

    it("should return false when timestamp is -Infinity", () => {
      // Arrange
      const validDate = new Date(2024, 5, 15);

      // Act & Assert
      expect(isSameYear(-Infinity, validDate)).toBe(false);
      expect(isSameYear(validDate, -Infinity)).toBe(false);
    });
  });

  describe("Boundary Value Analysis: Year boundaries", () => {
    it("should handle century boundaries (1999/2000)", () => {
      // Arrange
      const endOf20th = new Date(1999, 11, 31);
      const startOf21st = new Date(2000, 0, 1);

      // Act & Assert
      expect(isSameYear(endOf20th, startOf21st)).toBe(false);
    });

    it("should handle century boundaries (2099/2100)", () => {
      // Arrange
      const endOf21st = new Date(2099, 11, 31);
      const startOf22nd = new Date(2100, 0, 1);

      // Act & Assert
      expect(isSameYear(endOf21st, startOf22nd)).toBe(false);
    });

    it("should handle century boundaries within same century", () => {
      // Arrange
      const startOf21st = new Date(2000, 0, 1);
      const endOf21st = new Date(2099, 11, 31);

      // Act & Assert
      expect(isSameYear(startOf21st, endOf21st)).toBe(false);
    });
  });

  describe("Boundary Value Analysis: Leap years", () => {
    it("should handle leap year dates correctly", () => {
      // Arrange
      const leapYear1 = new Date(2024, 1, 29); // February 29, 2024 (leap year)
      const leapYear2 = new Date(2024, 2, 1); // March 1, 2024
      const nonLeapYear = new Date(2023, 1, 28); // February 28, 2023 (non-leap year)

      // Act & Assert
      expect(isSameYear(leapYear1, leapYear2)).toBe(true);
      expect(isSameYear(leapYear1, nonLeapYear)).toBe(false);
    });
  });

  describe("Boundary Value Analysis: BC dates", () => {
    it("should handle BC dates (negative years) correctly", () => {
      // Arrange
      const bcDate1 = new Date(-1, 5, 15); // Year 0 (1 BC)
      const bcDate2 = new Date(-1, 8, 20); // Year 0 (1 BC)
      const adDate = new Date(1, 5, 15); // Year 1 AD

      // Act & Assert
      expect(isSameYear(bcDate1, bcDate2)).toBe(true);
      expect(isSameYear(bcDate1, adDate)).toBe(false);
    });
  });

  describe("Argument order independence", () => {
    it("should return same result regardless of argument order", () => {
      // Arrange
      const date1 = new Date(2024, 5, 15);
      const date2 = new Date(2024, 8, 20);
      const date3 = new Date(2023, 5, 15);

      // Act & Assert
      expect(isSameYear(date1, date2)).toBe(isSameYear(date2, date1));
      expect(isSameYear(date1, date3)).toBe(isSameYear(date3, date1));
    });
  });

  describe("Various year combinations", () => {
    it("should handle various years correctly", () => {
      // Arrange & Act & Assert
      expect(isSameYear(new Date(2000, 6, 15), new Date(2000, 6, 15))).toBe(true);
      expect(isSameYear(new Date(2000, 6, 15), new Date(2001, 6, 15))).toBe(false);
      expect(isSameYear(new Date(1900, 6, 15), new Date(1900, 6, 15))).toBe(true);
      expect(isSameYear(new Date(2024, 6, 15), new Date(2025, 6, 15))).toBe(false);
      expect(isSameYear(new Date(1999, 6, 15), new Date(2000, 6, 15))).toBe(false);
    });
  });
});
