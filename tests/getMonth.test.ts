import { describe, it, expect } from "vitest";
import { getMonth } from "../src";

/**
 * Test Design for getMonth
 *
 * Function signature: getMonth(date: Date | number): number
 *
 * Equivalence Partitioning:
 * - Class 1: Valid Date object → Returns month number (0-11)
 * - Class 2: Valid number timestamp → Returns month number (0-11)
 * - Class 3: Invalid Date object → Returns NaN
 * - Class 4: Invalid number (NaN, Infinity, -Infinity) → Returns NaN
 *
 * Boundary Value Analysis:
 * - Month boundaries: 0 (January), 11 (December)
 * - Month transitions: Last day of month to first day of next month
 * - Year boundaries: December 31 to January 1
 * - Leap year February: Feb 28 vs Feb 29
 */

describe("getMonth", () => {
  describe("Equivalence Class 1: Valid Date object", () => {
    it("should return month for typical date (mid-month)", () => {
      // Arrange
      const date = new Date(2024, 5, 15); // June 15, 2024

      // Act
      const result = getMonth(date);

      // Assert
      expect(result).toBe(5); // 0-indexed: June is 5
    });

    it("should return month for first day of month", () => {
      // Arrange
      const date = new Date(2024, 3, 1); // April 1, 2024

      // Act
      const result = getMonth(date);

      // Assert
      expect(result).toBe(3);
    });

    it("should return month for last day of month", () => {
      // Arrange
      const date = new Date(2024, 3, 30); // April 30, 2024

      // Act
      const result = getMonth(date);

      // Assert
      expect(result).toBe(3);
    });

    it("should return month in local timezone", () => {
      // Arrange: Test getMonth respects local timezone (not UTC)
      const date = new Date("2024-06-15T12:00:00.000Z");
      const expected = date.getMonth(); // Local month

      // Act
      const result = getMonth(date);

      // Assert
      expect(result).toBe(expected);
    });
  });

  describe("Equivalence Class 2: Valid number timestamp", () => {
    it("should accept timestamp for typical date", () => {
      // Arrange
      const date = new Date(2024, 7, 15); // August 15, 2024
      const timestamp = date.getTime();

      // Act
      const result = getMonth(timestamp);

      // Assert
      expect(result).toBe(7);
    });

    it("should accept timestamp 0 (Unix epoch)", () => {
      // Arrange
      const timestamp = 0; // Jan 1, 1970

      // Act
      const result = getMonth(timestamp);

      // Assert
      expect(result).toBe(0); // January
    });

    it("should accept positive timestamp", () => {
      // Arrange: Day after Unix epoch start
      const timestamp = 86400000; // Jan 2, 1970 (86400000ms = 1 day)

      // Act
      const result = getMonth(timestamp);

      // Assert
      expect(result).toBe(0); // Still January
    });

    it("should accept negative timestamp (before Unix epoch)", () => {
      // Arrange: Day before Unix epoch
      const timestamp = -86400000; // Dec 31, 1969

      // Act
      const result = getMonth(timestamp);

      // Assert
      expect(result).toBe(11); // December
    });
  });

  describe("Equivalence Class 3: Invalid Date object", () => {
    it("should return NaN for Invalid Date from invalid string", () => {
      // Arrange
      const invalidDate = new Date("invalid");

      // Act
      const result = getMonth(invalidDate);

      // Assert
      expect(result).toBeNaN();
    });

    it("should return NaN for Invalid Date from empty string", () => {
      // Arrange
      const invalidDate = new Date("");

      // Act
      const result = getMonth(invalidDate);

      // Assert
      expect(result).toBeNaN();
    });

    it("should return NaN for Invalid Date from NaN", () => {
      // Arrange
      const invalidDate = new Date(NaN);

      // Act
      const result = getMonth(invalidDate);

      // Assert
      expect(result).toBeNaN();
    });
  });

  describe("Equivalence Class 4: Invalid number (NaN, Infinity, -Infinity)", () => {
    it("should return NaN when timestamp is NaN", () => {
      // Arrange
      const timestamp = NaN;

      // Act
      const result = getMonth(timestamp);

      // Assert
      expect(result).toBeNaN();
    });

    it("should return NaN when timestamp is Infinity", () => {
      // Arrange
      const timestamp = Infinity;

      // Act
      const result = getMonth(timestamp);

      // Assert
      expect(result).toBeNaN();
    });

    it("should return NaN when timestamp is -Infinity", () => {
      // Arrange
      const timestamp = -Infinity;

      // Act
      const result = getMonth(timestamp);

      // Assert
      expect(result).toBeNaN();
    });
  });

  describe("Boundary Value Analysis: Month Boundaries", () => {
    it("should handle January (first month, boundary: 0)", () => {
      // Arrange
      const date = new Date(2024, 0, 15); // January 15

      // Act
      const result = getMonth(date);

      // Assert
      expect(result).toBe(0);
    });

    it("should handle December (last month, boundary: 11)", () => {
      // Arrange
      const date = new Date(2024, 11, 15); // December 15

      // Act
      const result = getMonth(date);

      // Assert
      expect(result).toBe(11);
    });

    it("should handle all twelve months (systematic coverage)", () => {
      // Arrange & Act & Assert: Test all months 0-11
      for (let month = 0; month < 12; month++) {
        const date = new Date(2024, month, 15);
        expect(getMonth(date)).toBe(month);
      }
    });
  });

  describe("Boundary Value Analysis: Year Boundary Transitions", () => {
    it("should handle December 31 (last day of year)", () => {
      // Arrange
      const date = new Date(2024, 11, 31); // Dec 31, 2024

      // Act
      const result = getMonth(date);

      // Assert
      expect(result).toBe(11); // December
    });

    it("should handle January 1 (first day of year)", () => {
      // Arrange
      const date = new Date(2025, 0, 1); // Jan 1, 2025

      // Act
      const result = getMonth(date);

      // Assert
      expect(result).toBe(0); // January
    });
  });

  describe("Boundary Value Analysis: Month Transitions", () => {
    it("should handle January 31 to February 1 transition", () => {
      // Arrange
      const jan31 = new Date(2024, 0, 31);
      const feb1 = new Date(2024, 1, 1);

      // Act
      const resultJan = getMonth(jan31);
      const resultFeb = getMonth(feb1);

      // Assert
      expect(resultJan).toBe(0); // January
      expect(resultFeb).toBe(1); // February
    });

    it("should handle February 28 (non-leap year) to March 1 transition", () => {
      // Arrange
      const feb28 = new Date(2023, 1, 28);
      const mar1 = new Date(2023, 2, 1);

      // Act
      const resultFeb = getMonth(feb28);
      const resultMar = getMonth(mar1);

      // Assert
      expect(resultFeb).toBe(1); // February
      expect(resultMar).toBe(2); // March
    });

    it("should handle February 29 (leap year) to March 1 transition", () => {
      // Arrange
      const feb29 = new Date(2024, 1, 29); // 2024 is a leap year
      const mar1 = new Date(2024, 2, 1);

      // Act
      const resultFeb = getMonth(feb29);
      const resultMar = getMonth(mar1);

      // Assert
      expect(resultFeb).toBe(1); // February
      expect(resultMar).toBe(2); // March
    });
  });

  describe("Boundary Value Analysis: Leap Years", () => {
    it("should handle leap year February 29 (divisible by 4)", () => {
      // Arrange
      const leapYearDate = new Date(2024, 1, 29); // Feb 29, 2024

      // Act
      const result = getMonth(leapYearDate);

      // Assert
      expect(result).toBe(1); // February
    });

    it("should handle leap year February 29 (divisible by 400)", () => {
      // Arrange
      const centuryLeapYear = new Date(2000, 1, 29); // Feb 29, 2000

      // Act
      const result = getMonth(centuryLeapYear);

      // Assert
      expect(result).toBe(1); // February
    });

    it("should handle non-leap year February 28 (divisible by 100 but not 400)", () => {
      // Arrange
      const nonLeapYear = new Date(1900, 1, 28); // Feb 28, 1900 (no Feb 29)

      // Act
      const result = getMonth(nonLeapYear);

      // Assert
      expect(result).toBe(1); // February
    });

    it("should handle non-leap year February 28 (not divisible by 4)", () => {
      // Arrange
      const nonLeapYear = new Date(2023, 1, 28); // Feb 28, 2023

      // Act
      const result = getMonth(nonLeapYear);

      // Assert
      expect(result).toBe(1); // February
    });
  });

  describe("Boundary Value Analysis: Historic Dates", () => {
    it("should handle Unix epoch (January 1970)", () => {
      // Arrange
      const date = new Date("1970-01-01");

      // Act
      const result = getMonth(date);

      // Assert
      expect(result).toBe(0); // January
    });

    it("should handle year 1 January", () => {
      // Arrange
      const date = new Date("0001-01-01");

      // Act
      const result = getMonth(date);

      // Assert
      expect(result).toBe(0); // January
    });

    it("should handle year 1 December", () => {
      // Arrange
      const date = new Date("0001-12-31");

      // Act
      const result = getMonth(date);

      // Assert
      expect(result).toBe(11); // December
    });

    it("should handle year 1776 July (historic significance)", () => {
      // Arrange
      const date = new Date("1776-07-04");

      // Act
      const result = getMonth(date);

      // Assert
      expect(result).toBe(6); // July
    });
  });

  describe("Boundary Value Analysis: Future Dates", () => {
    it("should handle year 2030 January", () => {
      // Arrange
      const date = new Date(2030, 0, 1);

      // Act
      const result = getMonth(date);

      // Assert
      expect(result).toBe(0); // January
    });

    it("should handle year 2050 June", () => {
      // Arrange
      const date = new Date(2050, 5, 15);

      // Act
      const result = getMonth(date);

      // Assert
      expect(result).toBe(5); // June
    });

    it("should handle year 2999 December", () => {
      // Arrange
      const date = new Date(2999, 11, 31);

      // Act
      const result = getMonth(date);

      // Assert
      expect(result).toBe(11); // December
    });
  });

  describe("Boundary Value Analysis: Negative Years (BC Dates)", () => {
    it("should handle 100 BC June", () => {
      // Arrange
      const bcDate = new Date();
      bcDate.setFullYear(-100, 5, 15); // 100 BC, June

      // Act
      const result = getMonth(bcDate);

      // Assert
      expect(result).toBe(5); // June
    });

    it("should handle 1 BC December", () => {
      // Arrange
      const bcDate = new Date();
      bcDate.setFullYear(-1, 11, 25); // 1 BC, December

      // Act
      const result = getMonth(bcDate);

      // Assert
      expect(result).toBe(11); // December
    });
  });

  describe("Boundary Value Analysis: Timestamp Ranges", () => {
    it("should handle various months via timestamp (systematic sampling)", () => {
      // Arrange & Act & Assert: Test all months via timestamp
      for (let month = 0; month < 12; month++) {
        const date = new Date(2024, month, 15);
        const timestamp = date.getTime();

        expect(getMonth(timestamp)).toBe(month);
      }
    });
  });
});
