import { describe, it, expect } from "vitest";
import { getHours } from "../src";

/**
 * Test Design for getHours
 *
 * Function signature: getHours(date: Date | number): number
 *
 * Equivalence Partitioning:
 * - Class 1: Valid Date object → Returns hour number (0-23)
 * - Class 2: Valid number timestamp → Returns hour number (0-23)
 * - Class 3: Invalid Date object → Returns NaN
 * - Class 4: Invalid number (NaN, Infinity, -Infinity) → Returns NaN
 *
 * Boundary Value Analysis:
 * - Hour boundaries: 0 (midnight), 23 (end of day)
 * - Day transitions: 23:59:59 to 00:00:00
 * - Noon: 12
 */

describe("getHours", () => {
  describe("Equivalence Class 1: Valid Date object", () => {
    it("should return hour for typical time (afternoon)", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 14, 30, 45); // 14:30:45

      // Act
      const result = getHours(date);

      // Assert
      expect(result).toBe(14);
    });

    it("should return hour for morning time", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 8, 15, 0); // 08:15:00

      // Act
      const result = getHours(date);

      // Assert
      expect(result).toBe(8);
    });

    it("should return hour in local timezone", () => {
      // Arrange: Test getHours respects local timezone (not UTC)
      const date = new Date("2024-01-15T14:30:00.000Z");
      const expected = date.getHours(); // Local hour

      // Act
      const result = getHours(date);

      // Assert
      expect(result).toBe(expected);
    });
  });

  describe("Equivalence Class 2: Valid number timestamp", () => {
    it("should accept timestamp for typical time", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 14, 30, 0);
      const timestamp = date.getTime();

      // Act
      const result = getHours(timestamp);

      // Assert
      expect(result).toBe(14);
    });

    it("should accept timestamp 0 (Unix epoch)", () => {
      // Arrange
      const timestamp = 0; // Jan 1, 1970 00:00:00 (local time may vary)

      // Act
      const result = getHours(timestamp);

      // Assert
      expect(result).toBe(new Date(0).getHours()); // Local hour
    });

    it("should accept positive timestamp", () => {
      // Arrange: Day after Unix epoch start
      const timestamp = 86400000; // Jan 2, 1970 (86400000ms = 1 day)

      // Act
      const result = getHours(timestamp);

      // Assert
      expect(result).toBe(new Date(86400000).getHours()); // Local hour
    });
  });

  describe("Equivalence Class 3: Invalid Date object", () => {
    it("should return NaN for Invalid Date from invalid string", () => {
      // Arrange
      const invalidDate = new Date("invalid");

      // Act
      const result = getHours(invalidDate);

      // Assert
      expect(result).toBeNaN();
    });

    it("should return NaN for Invalid Date from empty string", () => {
      // Arrange
      const invalidDate = new Date("");

      // Act
      const result = getHours(invalidDate);

      // Assert
      expect(result).toBeNaN();
    });

    it("should return NaN for Invalid Date from NaN", () => {
      // Arrange
      const invalidDate = new Date(NaN);

      // Act
      const result = getHours(invalidDate);

      // Assert
      expect(result).toBeNaN();
    });
  });

  describe("Equivalence Class 4: Invalid number (NaN, Infinity, -Infinity)", () => {
    it("should return NaN when timestamp is NaN", () => {
      // Arrange
      const timestamp = NaN;

      // Act
      const result = getHours(timestamp);

      // Assert
      expect(result).toBeNaN();
    });

    it("should return NaN when timestamp is Infinity", () => {
      // Arrange
      const timestamp = Infinity;

      // Act
      const result = getHours(timestamp);

      // Assert
      expect(result).toBeNaN();
    });

    it("should return NaN when timestamp is -Infinity", () => {
      // Arrange
      const timestamp = -Infinity;

      // Act
      const result = getHours(timestamp);

      // Assert
      expect(result).toBeNaN();
    });
  });

  describe("Boundary Value Analysis: Hour Boundaries", () => {
    it("should handle hour 0 (midnight, boundary)", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 0, 0, 0); // 00:00:00

      // Act
      const result = getHours(date);

      // Assert
      expect(result).toBe(0);
    });

    it("should handle hour 23 (end of day, boundary)", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 23, 59, 59); // 23:59:59

      // Act
      const result = getHours(date);

      // Assert
      expect(result).toBe(23);
    });

    it("should handle hour 12 (noon)", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 12, 0, 0); // 12:00:00

      // Act
      const result = getHours(date);

      // Assert
      expect(result).toBe(12);
    });

    it("should handle hour 1 (first hour after midnight)", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 1, 0, 0); // 01:00:00

      // Act
      const result = getHours(date);

      // Assert
      expect(result).toBe(1);
    });

    it("should handle hour 22 (late evening)", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 22, 0, 0); // 22:00:00

      // Act
      const result = getHours(date);

      // Assert
      expect(result).toBe(22);
    });
  });

  describe("Boundary Value Analysis: Day Transitions", () => {
    it("should handle 23:59:59 (last second of day)", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 23, 59, 59, 999);

      // Act
      const result = getHours(date);

      // Assert
      expect(result).toBe(23);
    });

    it("should handle 00:00:00 (first second of day)", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 0, 0, 0, 0);

      // Act
      const result = getHours(date);

      // Assert
      expect(result).toBe(0);
    });

    it("should handle transition from 23:59:59 to 00:00:00 (day boundary)", () => {
      // Arrange
      const lastSecond = new Date(2024, 0, 15, 23, 59, 59);
      const firstSecond = new Date(2024, 0, 16, 0, 0, 0);

      // Act
      const resultLast = getHours(lastSecond);
      const resultFirst = getHours(firstSecond);

      // Assert
      expect(resultLast).toBe(23); // Last hour of day
      expect(resultFirst).toBe(0); // First hour of next day
    });
  });

  describe("Boundary Value Analysis: Special Dates", () => {
    it("should handle leap year dates", () => {
      // Arrange
      const leapYearDate = new Date(2024, 1, 29, 10, 0, 0); // Feb 29, 2024

      // Act
      const result = getHours(leapYearDate);

      // Assert
      expect(result).toBe(10);
    });

    it("should handle non-leap year dates", () => {
      // Arrange
      const nonLeapYearDate = new Date(2023, 1, 28, 15, 0, 0); // Feb 28, 2023

      // Act
      const result = getHours(nonLeapYearDate);

      // Assert
      expect(result).toBe(15);
    });

    it("should handle year boundaries (Dec 31 to Jan 1)", () => {
      // Arrange
      const dec31 = new Date(2024, 11, 31, 20, 0, 0);
      const jan1 = new Date(2025, 0, 1, 5, 0, 0);

      // Act
      const resultDec = getHours(dec31);
      const resultJan = getHours(jan1);

      // Assert
      expect(resultDec).toBe(20);
      expect(resultJan).toBe(5);
    });
  });

  describe("Boundary Value Analysis: All Hours Coverage", () => {
    it("should handle all 24 hours (systematic coverage)", () => {
      // Arrange & Act & Assert: Test all hours 0-23
      for (let hour = 0; hour < 24; hour++) {
        const date = new Date(2024, 0, 15, hour, 30, 0);
        expect(getHours(date)).toBe(hour);
      }
    });
  });
});
