import { describe, it, expect } from "vitest";
import { getSeconds } from "../src";

/**
 * Test Design for getSeconds
 *
 * Function signature: getSeconds(date: Date | number): number
 *
 * Equivalence Partitioning:
 * - Class 1: Valid Date object → Returns second number (0-59)
 * - Class 2: Valid number timestamp → Returns second number (0-59)
 * - Class 3: Invalid Date object → Returns NaN
 * - Class 4: Invalid number (NaN, Infinity, -Infinity) → Returns NaN
 *
 * Boundary Value Analysis:
 * - Second boundaries: 0 (start of minute), 59 (end of minute)
 * - Minute transitions: 59 to 00
 * - Mid-minute: 30
 */

describe("getSeconds", () => {
  describe("Equivalence Class 1: Valid Date object", () => {
    it("should return seconds for typical time (mid-minute)", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 14, 30, 45); // 14:30:45

      // Act
      const result = getSeconds(date);

      // Assert
      expect(result).toBe(45);
    });

    it("should return seconds for start of minute", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 12, 15, 0); // 12:15:00

      // Act
      const result = getSeconds(date);

      // Assert
      expect(result).toBe(0);
    });

    it("should return seconds in local timezone", () => {
      // Arrange: Test getSeconds respects local timezone (not UTC)
      const date = new Date("2024-01-15T12:30:45.000Z");
      const expected = date.getSeconds(); // Local seconds

      // Act
      const result = getSeconds(date);

      // Assert
      expect(result).toBe(expected);
    });

    it("should not be affected by milliseconds", () => {
      // Arrange
      const date1 = new Date(2024, 0, 15, 10, 30, 45, 0);
      const date2 = new Date(2024, 0, 15, 10, 30, 45, 999);
      const date3 = new Date(2024, 0, 15, 10, 30, 45, 500);

      // Act
      const result1 = getSeconds(date1);
      const result2 = getSeconds(date2);
      const result3 = getSeconds(date3);

      // Assert
      expect(result1).toBe(45);
      expect(result2).toBe(45);
      expect(result3).toBe(45);
    });
  });

  describe("Equivalence Class 2: Valid number timestamp", () => {
    it("should accept timestamp for typical time", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 14, 30, 45);
      const timestamp = date.getTime();

      // Act
      const result = getSeconds(timestamp);

      // Assert
      expect(result).toBe(45);
    });

    it("should accept timestamp 0 (Unix epoch)", () => {
      // Arrange
      const timestamp = 0; // Jan 1, 1970 00:00:00 (local time may vary)

      // Act
      const result = getSeconds(timestamp);

      // Assert
      expect(result).toBe(new Date(0).getSeconds()); // Local seconds
    });

    it("should accept negative timestamp (before Unix epoch)", () => {
      // Arrange: Day before Unix epoch
      const timestamp = -86400000; // Dec 31, 1969

      // Act
      const result = getSeconds(timestamp);

      // Assert
      expect(result).toBe(new Date(-86400000).getSeconds()); // Local seconds
    });

    it("should accept positive timestamp", () => {
      // Arrange: 1 second after Unix epoch
      const timestamp = 1000; // Jan 1, 1970 00:00:01

      // Act
      const result = getSeconds(timestamp);

      // Assert
      expect(result).toBe(new Date(1000).getSeconds()); // Local seconds
    });
  });

  describe("Equivalence Class 3: Invalid Date object", () => {
    it("should return NaN for Invalid Date from invalid string", () => {
      // Arrange
      const invalidDate = new Date("invalid");

      // Act
      const result = getSeconds(invalidDate);

      // Assert
      expect(result).toBeNaN();
    });

    it("should return NaN for Invalid Date from empty string", () => {
      // Arrange
      const invalidDate = new Date("");

      // Act
      const result = getSeconds(invalidDate);

      // Assert
      expect(result).toBeNaN();
    });

    it("should return NaN for Invalid Date from NaN", () => {
      // Arrange
      const invalidDate = new Date(NaN);

      // Act
      const result = getSeconds(invalidDate);

      // Assert
      expect(result).toBeNaN();
    });
  });

  describe("Equivalence Class 4: Invalid number (NaN, Infinity, -Infinity)", () => {
    it("should return NaN when timestamp is NaN", () => {
      // Arrange
      const timestamp = NaN;

      // Act
      const result = getSeconds(timestamp);

      // Assert
      expect(result).toBeNaN();
    });

    it("should return NaN when timestamp is Infinity", () => {
      // Arrange
      const timestamp = Infinity;

      // Act
      const result = getSeconds(timestamp);

      // Assert
      expect(result).toBeNaN();
    });

    it("should return NaN when timestamp is -Infinity", () => {
      // Arrange
      const timestamp = -Infinity;

      // Act
      const result = getSeconds(timestamp);

      // Assert
      expect(result).toBeNaN();
    });
  });

  describe("Boundary Value Analysis: Second Boundaries", () => {
    it("should handle second 0 (start of minute, boundary)", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 10, 30, 0); // 10:30:00

      // Act
      const result = getSeconds(date);

      // Assert
      expect(result).toBe(0);
    });

    it("should handle second 59 (end of minute, boundary)", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 10, 30, 59); // 10:30:59

      // Act
      const result = getSeconds(date);

      // Assert
      expect(result).toBe(59);
    });

    it("should handle second 30 (mid-minute)", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 10, 30, 30); // 10:30:30

      // Act
      const result = getSeconds(date);

      // Assert
      expect(result).toBe(30);
    });

    it("should handle second 1 (first second after minute start)", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 10, 30, 1); // 10:30:01

      // Act
      const result = getSeconds(date);

      // Assert
      expect(result).toBe(1);
    });

    it("should handle second 58 (near end of minute)", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 10, 30, 58); // 10:30:58

      // Act
      const result = getSeconds(date);

      // Assert
      expect(result).toBe(58);
    });
  });

  describe("Boundary Value Analysis: Minute Transitions", () => {
    it("should handle 59 (last second of minute)", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 10, 30, 59);

      // Act
      const result = getSeconds(date);

      // Assert
      expect(result).toBe(59);
    });

    it("should handle 00 (first second of minute)", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 10, 30, 0);

      // Act
      const result = getSeconds(date);

      // Assert
      expect(result).toBe(0);
    });

    it("should handle transition from 59 to 00 (minute boundary)", () => {
      // Arrange
      const lastSecond = new Date(2024, 0, 15, 10, 30, 59);
      const firstSecond = new Date(2024, 0, 15, 10, 31, 0);

      // Act
      const resultLast = getSeconds(lastSecond);
      const resultFirst = getSeconds(firstSecond);

      // Assert
      expect(resultLast).toBe(59); // Last second of minute
      expect(resultFirst).toBe(0); // First second of next minute
    });
  });

  describe("Boundary Value Analysis: Special Dates", () => {
    it("should handle leap year dates", () => {
      // Arrange
      const leapYearDate = new Date("2024-02-29T08:25:42");

      // Act
      const result = getSeconds(leapYearDate);

      // Assert
      expect(result).toBe(42);
    });

    it("should handle leap year divisible by 400", () => {
      // Arrange
      const centuryLeapYear = new Date("2000-02-29T14:42:33");

      // Act
      const result = getSeconds(centuryLeapYear);

      // Assert
      expect(result).toBe(33);
    });

    it("should handle Unix epoch", () => {
      // Arrange
      const date = new Date("1970-01-01T00:00:00");

      // Act
      const result = getSeconds(date);

      // Assert
      expect(result).toBe(0);
    });

    it("should handle historic dates", () => {
      // Arrange
      const date = new Date("1776-07-04T10:15:33");

      // Act
      const result = getSeconds(date);

      // Assert
      expect(result).toBe(33);
    });
  });

  describe("Boundary Value Analysis: Future Dates", () => {
    it("should handle year 2030", () => {
      // Arrange
      const date = new Date("2030-01-01T08:30:42");

      // Act
      const result = getSeconds(date);

      // Assert
      expect(result).toBe(42);
    });

    it("should handle year 2050", () => {
      // Arrange
      const date = new Date("2050-12-31T23:45:55");

      // Act
      const result = getSeconds(date);

      // Assert
      expect(result).toBe(55);
    });

    it("should handle year 2999", () => {
      // Arrange
      const date = new Date("2999-12-31T12:05:25");

      // Act
      const result = getSeconds(date);

      // Assert
      expect(result).toBe(25);
    });
  });

  describe("Boundary Value Analysis: Negative Years (BC Dates)", () => {
    it("should handle 100 BC", () => {
      // Arrange
      const bcDate = new Date();
      bcDate.setFullYear(-100, 0, 1); // 100 BC
      bcDate.setHours(10, 45, 33, 0);

      // Act
      const result = getSeconds(bcDate);

      // Assert
      expect(result).toBe(33);
    });

    it("should handle 1 BC", () => {
      // Arrange
      const bcDate = new Date();
      bcDate.setFullYear(-1, 0, 1); // 1 BC
      bcDate.setHours(15, 20, 59, 0);

      // Act
      const result = getSeconds(bcDate);

      // Assert
      expect(result).toBe(59);
    });
  });

  describe("Boundary Value Analysis: All Seconds Coverage", () => {
    it("should handle all 60 seconds (systematic coverage)", () => {
      // Arrange & Act & Assert: Test all seconds 0-59
      for (let second = 0; second < 60; second++) {
        const date = new Date(2024, 0, 15, 10, 30, second);
        expect(getSeconds(date)).toBe(second);
      }
    });
  });
});