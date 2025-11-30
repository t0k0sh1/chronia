import { describe, it, expect } from "vitest";
import { getYear } from "../src";

/**
 * Test Design for getYear
 *
 * Function signature: getYear(date: Date | number): number
 *
 * Equivalence Partitioning:
 * - Class 1: Valid Date object → Returns year number
 * - Class 2: Valid number timestamp → Returns year number
 * - Class 3: Invalid Date object → Returns NaN
 * - Class 4: Invalid number (NaN, Infinity, -Infinity) → Returns NaN
 *
 * Boundary Value Analysis:
 * - Unix epoch (0): 1970-01-01
 * - Year boundaries: 1900, 2000, 2100 (century boundaries)
 * - Leap year boundaries: 2000 (divisible by 400), 1900 (divisible by 100 but not 400), 2024 (divisible by 4)
 * - Negative years (BC dates): -1, -100
 */

describe("getYear", () => {
  describe("Equivalence Class 1: Valid Date object", () => {
    it("should return year for typical date (mid-year, mid-month)", () => {
      // Arrange
      const date = new Date(2024, 5, 15); // June 15, 2024

      // Act
      const result = getYear(date);

      // Assert
      expect(result).toBe(2024);
    });

    it("should return year for first day of year", () => {
      // Arrange
      const date = new Date(2025, 0, 1); // January 1, 2025

      // Act
      const result = getYear(date);

      // Assert
      expect(result).toBe(2025);
    });

    it("should return year for last day of year", () => {
      // Arrange
      const date = new Date(2024, 11, 31); // December 31, 2024

      // Act
      const result = getYear(date);

      // Assert
      expect(result).toBe(2024);
    });

    it("should return year in local timezone", () => {
      // Arrange: Test getYear respects local timezone (not UTC)
      const date = new Date("2024-01-01T12:00:00.000Z");
      const expected = date.getFullYear(); // Local year

      // Act
      const result = getYear(date);

      // Assert
      expect(result).toBe(expected);
    });
  });

  describe("Equivalence Class 2: Valid number timestamp", () => {
    it("should accept timestamp for typical date", () => {
      // Arrange
      const date = new Date(2024, 5, 15); // June 15, 2024
      const timestamp = date.getTime();

      // Act
      const result = getYear(timestamp);

      // Assert
      expect(result).toBe(2024);
    });

    it("should accept timestamp 0 (Unix epoch)", () => {
      // Arrange
      const timestamp = 0; // Jan 1, 1970

      // Act
      const result = getYear(timestamp);

      // Assert
      expect(result).toBe(1970);
    });

    it("should accept positive timestamp", () => {
      // Arrange: Day after Unix epoch start
      const timestamp = 86400000; // Jan 2, 1970 (86400000ms = 1 day)

      // Act
      const result = getYear(timestamp);

      // Assert
      expect(result).toBe(1970);
    });

    it("should accept negative timestamp (before Unix epoch)", () => {
      // Arrange: Day before Unix epoch
      const timestamp = -86400000; // Dec 31, 1969

      // Act
      const result = getYear(timestamp);

      // Assert
      expect(result).toBe(1969);
    });
  });

  describe("Equivalence Class 3: Invalid Date object", () => {
    it("should return NaN for Invalid Date from invalid string", () => {
      // Arrange
      const invalidDate = new Date("invalid");

      // Act
      const result = getYear(invalidDate);

      // Assert
      expect(result).toBeNaN();
    });

    it("should return NaN for Invalid Date from empty string", () => {
      // Arrange
      const invalidDate = new Date("");

      // Act
      const result = getYear(invalidDate);

      // Assert
      expect(result).toBeNaN();
    });

    it("should return NaN for Invalid Date from NaN", () => {
      // Arrange
      const invalidDate = new Date(NaN);

      // Act
      const result = getYear(invalidDate);

      // Assert
      expect(result).toBeNaN();
    });
  });

  describe("Equivalence Class 4: Invalid number (NaN, Infinity, -Infinity)", () => {
    it("should return NaN when timestamp is NaN", () => {
      // Arrange
      const timestamp = NaN;

      // Act
      const result = getYear(timestamp);

      // Assert
      expect(result).toBeNaN();
    });

    it("should return NaN when timestamp is Infinity", () => {
      // Arrange
      const timestamp = Infinity;

      // Act
      const result = getYear(timestamp);

      // Assert
      expect(result).toBeNaN();
    });

    it("should return NaN when timestamp is -Infinity", () => {
      // Arrange
      const timestamp = -Infinity;

      // Act
      const result = getYear(timestamp);

      // Assert
      expect(result).toBeNaN();
    });
  });

  describe("Boundary Value Analysis: Leap Years", () => {
    it("should handle leap year divisible by 4 (Feb 29 exists)", () => {
      // Arrange
      const leapYearDate = new Date(2024, 1, 29); // Feb 29, 2024

      // Act
      const result = getYear(leapYearDate);

      // Assert
      expect(result).toBe(2024);
    });

    it("should handle leap year divisible by 400 (century leap year)", () => {
      // Arrange
      const centuryLeapYear = new Date(2000, 1, 29); // Feb 29, 2000

      // Act
      const result = getYear(centuryLeapYear);

      // Assert
      expect(result).toBe(2000);
    });

    it("should handle non-leap year divisible by 100 but not 400", () => {
      // Arrange
      const nonLeapYear = new Date(1900, 1, 28); // Feb 28, 1900 (Feb 29 doesn't exist)

      // Act
      const result = getYear(nonLeapYear);

      // Assert
      expect(result).toBe(1900);
    });

    it("should handle non-leap year not divisible by 4", () => {
      // Arrange
      const nonLeapYear = new Date(2023, 1, 28); // Feb 28, 2023

      // Act
      const result = getYear(nonLeapYear);

      // Assert
      expect(result).toBe(2023);
    });
  });

  describe("Boundary Value Analysis: Century and Millennium Boundaries", () => {
    it("should handle year 1000 (millennium boundary)", () => {
      // Arrange
      const date = new Date(1000, 0, 1);

      // Act
      const result = getYear(date);

      // Assert
      expect(result).toBe(1000);
    });

    it("should handle year 1900 (century boundary)", () => {
      // Arrange
      const date = new Date(1900, 0, 1);

      // Act
      const result = getYear(date);

      // Assert
      expect(result).toBe(1900);
    });

    it("should handle year 2000 (millennium and century boundary)", () => {
      // Arrange
      const date = new Date(2000, 0, 1);

      // Act
      const result = getYear(date);

      // Assert
      expect(result).toBe(2000);
    });

    it("should handle year 2100 (century boundary)", () => {
      // Arrange
      const date = new Date(2100, 0, 1);

      // Act
      const result = getYear(date);

      // Assert
      expect(result).toBe(2100);
    });

    it("should handle year 3000 (millennium boundary)", () => {
      // Arrange
      const date = new Date(3000, 0, 1);

      // Act
      const result = getYear(date);

      // Assert
      expect(result).toBe(3000);
    });
  });

  describe("Boundary Value Analysis: Historic Dates", () => {
    it("should handle year 1 (boundary: first positive year)", () => {
      // Arrange
      const date = new Date("0001-01-01");

      // Act
      const result = getYear(date);

      // Assert
      expect(result).toBe(1);
    });

    it("should handle year 100", () => {
      // Arrange
      const date = new Date("0100-01-01");

      // Act
      const result = getYear(date);

      // Assert
      expect(result).toBe(100);
    });

    it("should handle year 500", () => {
      // Arrange
      const date = new Date("0500-01-01");

      // Act
      const result = getYear(date);

      // Assert
      expect(result).toBe(500);
    });

    it("should handle year 1492 (historic significance)", () => {
      // Arrange
      const date = new Date("1492-10-12");

      // Act
      const result = getYear(date);

      // Assert
      expect(result).toBe(1492);
    });

    it("should handle year 1776 (historic significance)", () => {
      // Arrange
      const date = new Date("1776-07-04");

      // Act
      const result = getYear(date);

      // Assert
      expect(result).toBe(1776);
    });
  });

  describe("Boundary Value Analysis: Future Dates", () => {
    it("should handle year 2030 (near future)", () => {
      // Arrange
      const date = new Date(2030, 0, 1);

      // Act
      const result = getYear(date);

      // Assert
      expect(result).toBe(2030);
    });

    it("should handle year 2050 (mid-century future)", () => {
      // Arrange
      const date = new Date(2050, 11, 31);

      // Act
      const result = getYear(date);

      // Assert
      expect(result).toBe(2050);
    });

    it("should handle year 2999 (far future, millennium boundary - 1)", () => {
      // Arrange
      const date = new Date(2999, 11, 31);

      // Act
      const result = getYear(date);

      // Assert
      expect(result).toBe(2999);
    });
  });

  describe("Boundary Value Analysis: Negative Years (BC Dates)", () => {
    it("should handle year -1 (1 BC, boundary: last negative year)", () => {
      // Arrange
      const bcDate = new Date();
      bcDate.setFullYear(-1); // 1 BC

      // Act
      const result = getYear(bcDate);

      // Assert
      expect(result).toBe(-1);
    });

    it("should handle year -100 (100 BC)", () => {
      // Arrange
      const bcDate = new Date();
      bcDate.setFullYear(-100); // 100 BC

      // Act
      const result = getYear(bcDate);

      // Assert
      expect(result).toBe(-100);
    });
  });

  describe("Boundary Value Analysis: Timestamp Ranges", () => {
    it("should handle various years via timestamp (systematic sampling)", () => {
      // Arrange & Act & Assert: Test years from 1900 to 2100 in 10-year increments
      for (let year = 1900; year <= 2100; year += 10) {
        const date = new Date(year, 5, 15); // June 15th of each year
        const timestamp = date.getTime();

        expect(getYear(timestamp)).toBe(year);
      }
    });
  });
});
