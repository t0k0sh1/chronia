import { describe, it, expect } from "vitest";
import { setYear } from "../src/setYear";

/**
 * Test Design for setYear
 *
 * Function signature: setYear(date: Date | number, year: number): Date
 *
 * Equivalence Partitioning:
 * - Class 1: Valid Date object + valid year → Returns new Date with year set
 * - Class 2: Valid timestamp + valid year → Returns new Date with year set
 * - Class 3: Invalid Date object + valid year → Returns Invalid Date
 * - Class 4: Valid Date + invalid year (NaN, Infinity, -Infinity) → Returns Invalid Date
 *
 * Boundary Value Analysis:
 * - Year boundaries: 1900, 2000, 9999 (century/millennium)
 * - Negative years (BC dates): -1, -1000
 * - Leap year transitions: Feb 29 → non-leap year (adjusts to Feb 28)
 * - Fractional years: Truncation behavior
 *
 * Immutability Requirement:
 * - Original date must never be mutated
 */

describe("setYear", () => {
  describe("Equivalence Class 1: Valid Date object + valid year", () => {
    it("should set year to future year", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const year = 2030;

      // Act
      const result = setYear(date, year);

      // Assert
      expect(result.getFullYear()).toBe(2030);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(15);
    });

    it("should set year to past year", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const year = 2020;

      // Act
      const result = setYear(date, year);

      // Assert
      expect(result.getFullYear()).toBe(2020);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(15);
    });

    it("should set year to same year (no change)", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const year = 2025;

      // Act
      const result = setYear(date, year);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });

    it("should preserve month, day, time, and milliseconds", () => {
      // Arrange
      const date = new Date(2025, 5, 30, 14, 30, 45, 123);
      const year = 2024;

      // Act
      const result = setYear(date, year);

      // Assert
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(5);
      expect(result.getDate()).toBe(30);
      expect(result.getHours()).toBe(14);
      expect(result.getMinutes()).toBe(30);
      expect(result.getSeconds()).toBe(45);
      expect(result.getMilliseconds()).toBe(123);
    });

    it("should truncate fractional year (positive)", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const year = 2023.9;

      // Act
      const result = setYear(date, year);

      // Assert
      expect(result.getFullYear()).toBe(2023); // floor(2023.9) = 2023
    });

    it("should truncate fractional year (negative)", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const year = -2023.9;

      // Act
      const result = setYear(date, year);

      // Assert
      expect(result.getFullYear()).toBe(-2023); // floor(-2023.9) = -2023
    });
  });

  describe("Equivalence Class 2: Valid timestamp + valid year", () => {
    it("should accept timestamp input", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const timestamp = date.getTime();
      const year = 2030;

      // Act
      const result = setYear(timestamp, year);

      // Assert
      expect(result.getFullYear()).toBe(2030);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(15);
    });
  });

  describe("Equivalence Class 3: Invalid Date object + valid year", () => {
    it("should return Invalid Date when base date is invalid", () => {
      // Arrange
      const invalidDate = new Date("invalid");
      const year = 2025;

      // Act
      const result = setYear(invalidDate, year);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });
  });

  describe("Equivalence Class 4: Valid Date + invalid year", () => {
    it("should return Invalid Date when year is NaN", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const year = NaN;

      // Act
      const result = setYear(date, year);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when year is Infinity", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const year = Infinity;

      // Act
      const result = setYear(date, year);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when year is -Infinity", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const year = -Infinity;

      // Act
      const result = setYear(date, year);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });
  });

  describe("Boundary Value Analysis: Century and Millennium Years", () => {
    it("should set year to 1900 (century boundary)", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const year = 1900;

      // Act
      const result = setYear(date, year);

      // Assert
      expect(result.getFullYear()).toBe(1900);
    });

    it("should set year to 2000 (millennium boundary)", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const year = 2000;

      // Act
      const result = setYear(date, year);

      // Assert
      expect(result.getFullYear()).toBe(2000);
    });

    it("should set year to 9999 (maximum 4-digit year)", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const year = 9999;

      // Act
      const result = setYear(date, year);

      // Assert
      expect(result.getFullYear()).toBe(9999);
    });

    it("should set year to large positive year", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const year = 100000;

      // Act
      const result = setYear(date, year);

      // Assert
      expect(result.getFullYear()).toBe(100000);
    });
  });

  describe("Boundary Value Analysis: Negative Years (BC Dates)", () => {
    it("should set year to -1 (1 BC)", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const year = -1;

      // Act
      const result = setYear(date, year);

      // Assert
      expect(result.getFullYear()).toBe(-1);
    });

    it("should set year to -1000 (1000 BC)", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const year = -1000;

      // Act
      const result = setYear(date, year);

      // Assert
      expect(result.getFullYear()).toBe(-1000);
    });
  });

  describe("Boundary Value Analysis: Year-End Edge Cases", () => {
    it("should handle December 31, 23:59:59.999 correctly", () => {
      // Arrange
      const date = new Date(2025, 11, 31, 23, 59, 59, 999);
      const year = 2026;

      // Act
      const result = setYear(date, year);

      // Assert
      expect(result.getFullYear()).toBe(2026);
      expect(result.getMonth()).toBe(11);
      expect(result.getDate()).toBe(31);
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
      expect(result.getMilliseconds()).toBe(999);
    });
  });

  describe("Boundary Value Analysis: Leap Year Transitions (Feb 29)", () => {
    it("should preserve Feb 29 when setting to another leap year (divisible by 4)", () => {
      // Arrange
      const feb29_2020 = new Date(2020, 1, 29);
      const year = 2024; // Another leap year

      // Act
      const result = setYear(feb29_2020, year);

      // Assert
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(1); // February
      expect(result.getDate()).toBe(29); // Feb 29 preserved
    });

    it("should preserve Feb 29 when setting to leap year divisible by 400", () => {
      // Arrange
      const feb29_2020 = new Date(2020, 1, 29);
      const year = 2000; // Leap year (divisible by 400)

      // Act
      const result = setYear(feb29_2020, year);

      // Assert
      expect(result.getFullYear()).toBe(2000);
      expect(result.getMonth()).toBe(1); // February
      expect(result.getDate()).toBe(29); // Feb 29 preserved
    });

    it("should adjust Feb 29 to Feb 28 when setting to non-leap year (not divisible by 4)", () => {
      // Arrange
      const feb29_2020 = new Date(2020, 1, 29);
      const year = 2023; // Non-leap year

      // Act
      const result = setYear(feb29_2020, year);

      // Assert
      expect(result.getFullYear()).toBe(2023);
      expect(result.getMonth()).toBe(1); // February
      expect(result.getDate()).toBe(28); // Adjusted to Feb 28
    });

    it("should adjust Feb 29 to Feb 28 when setting to year divisible by 100 but not 400", () => {
      // Arrange
      const feb29_2020 = new Date(2020, 1, 29);
      const year = 1900; // Non-leap year (divisible by 100 but not 400)

      // Act
      const result = setYear(feb29_2020, year);

      // Assert
      expect(result.getFullYear()).toBe(1900);
      expect(result.getMonth()).toBe(1); // February
      expect(result.getDate()).toBe(28); // Adjusted to Feb 28
    });

    it("should handle multiple leap year transitions correctly", () => {
      // Arrange
      const feb29 = new Date(2020, 1, 29);
      const leapYears = [2020, 2024, 2028, 2032];
      const nonLeapYears = [2021, 2022, 2023, 2025];

      // Act & Assert: Leap years preserve Feb 29
      leapYears.forEach(year => {
        const result = setYear(feb29, year);
        expect(result.getMonth()).toBe(1); // February
        expect(result.getDate()).toBe(29); // Feb 29 preserved
        expect(result.getFullYear()).toBe(year);
      });

      // Act & Assert: Non-leap years adjust to Feb 28
      nonLeapYears.forEach(year => {
        const result = setYear(feb29, year);
        expect(result.getMonth()).toBe(1); // February
        expect(result.getDate()).toBe(28); // Adjusted to Feb 28
        expect(result.getFullYear()).toBe(year);
      });
    });
  });

  describe("Immutability: Original date must not be mutated", () => {
    it("should not mutate the original Date object", () => {
      // Arrange
      const original = new Date(2025, 0, 15);
      const originalTime = original.getTime();

      // Act
      setYear(original, 2030);

      // Assert
      expect(original.getTime()).toBe(originalTime);
    });

    it("should not mutate when input is timestamp", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const timestamp = date.getTime();

      // Act
      const result = setYear(timestamp, 2030);

      // Assert
      expect(timestamp).toBe(date.getTime()); // Timestamp is immutable by nature
      expect(result.getFullYear()).toBe(2030);
    });
  });
});
