import { describe, it, expect } from "vitest";
import { getMinutes } from "../src";

const MILLISECONDS_IN_DAY = 86400000;

/**
 * Test Design for getMinutes
 *
 * Function signature: getMinutes(date: Date | number): number
 *
 * Equivalence Partitioning:
 * - Class 1: Valid Date object → Returns minute number (0-59)
 * - Class 2: Valid number timestamp → Returns minute number (0-59)
 * - Class 3: Invalid Date object → Returns NaN
 * - Class 4: Invalid number (NaN, Infinity, -Infinity) → Returns NaN
 *
 * Boundary Value Analysis:
 * - Minute boundaries: 0 (start of hour), 59 (end of hour)
 * - Hour transitions: 59 to 00
 * - Mid-hour: 30
 */

describe("getMinutes", () => {
  describe("Equivalence Class 1: Valid Date object", () => {
    it("should return minutes for typical time (mid-hour)", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 14, 30, 45); // 14:30:45

      // Act
      const result = getMinutes(date);

      // Assert
      expect(result).toBe(30);
    });

    it("should return minutes for quarter hour", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 12, 15, 0); // 12:15:00

      // Act
      const result = getMinutes(date);

      // Assert
      expect(result).toBe(15);
    });

    it("should return minutes in local timezone", () => {
      // Arrange: Test getMinutes respects local timezone (not UTC)
      const date = new Date("2024-01-15T12:30:00.000Z");
      const expected = date.getMinutes(); // Local minutes

      // Act
      const result = getMinutes(date);

      // Assert
      expect(result).toBe(expected);
    });
  });

  describe("Equivalence Class 2: Valid number timestamp", () => {
    it("should accept timestamp for typical time", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 14, 30, 0);
      const timestamp = date.getTime();

      // Act
      const result = getMinutes(timestamp);

      // Assert
      expect(result).toBe(30);
    });

    it("should accept timestamp 0 (Unix epoch)", () => {
      // Arrange
      const timestamp = 0; // Jan 1, 1970 00:00:00 (local time may vary)

      // Act
      const result = getMinutes(timestamp);

      // Assert
      expect(result).toBe(new Date(0).getMinutes()); // Local minutes
    });

    it("should accept negative timestamp (before Unix epoch)", () => {
      // Arrange: Day before Unix epoch
      const timestamp = -MILLISECONDS_IN_DAY; // Dec 31, 1969

      // Act
      const result = getMinutes(timestamp);

      // Assert
      expect(result).toBe(new Date(-MILLISECONDS_IN_DAY).getMinutes()); // Local minutes
    });

    it("should accept positive timestamp", () => {
      // Arrange: Day after Unix epoch start
      const timestamp = MILLISECONDS_IN_DAY; // Jan 2, 1970

      // Act
      const result = getMinutes(timestamp);

      // Assert
      expect(result).toBe(new Date(MILLISECONDS_IN_DAY).getMinutes()); // Local minutes
    });
  });

  describe("Equivalence Class 3: Invalid Date object", () => {
    it("should return NaN for Invalid Date from invalid string", () => {
      // Arrange
      const invalidDate = new Date("invalid");

      // Act
      const result = getMinutes(invalidDate);

      // Assert
      expect(result).toBeNaN();
    });

    it("should return NaN for Invalid Date from empty string", () => {
      // Arrange
      const invalidDate = new Date("");

      // Act
      const result = getMinutes(invalidDate);

      // Assert
      expect(result).toBeNaN();
    });

    it("should return NaN for Invalid Date from NaN", () => {
      // Arrange
      const invalidDate = new Date(NaN);

      // Act
      const result = getMinutes(invalidDate);

      // Assert
      expect(result).toBeNaN();
    });
  });

  describe("Equivalence Class 4: Invalid number (NaN, Infinity, -Infinity)", () => {
    it("should return NaN when timestamp is NaN", () => {
      // Arrange
      const timestamp = NaN;

      // Act
      const result = getMinutes(timestamp);

      // Assert
      expect(result).toBeNaN();
    });

    it("should return NaN when timestamp is Infinity", () => {
      // Arrange
      const timestamp = Infinity;

      // Act
      const result = getMinutes(timestamp);

      // Assert
      expect(result).toBeNaN();
    });

    it("should return NaN when timestamp is -Infinity", () => {
      // Arrange
      const timestamp = -Infinity;

      // Act
      const result = getMinutes(timestamp);

      // Assert
      expect(result).toBeNaN();
    });
  });

  describe("Boundary Value Analysis: Minute Boundaries", () => {
    it("should handle minute 0 (start of hour, boundary)", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 10, 0, 0); // 10:00:00

      // Act
      const result = getMinutes(date);

      // Assert
      expect(result).toBe(0);
    });

    it("should handle minute 59 (end of hour, boundary)", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 10, 59, 59); // 10:59:59

      // Act
      const result = getMinutes(date);

      // Assert
      expect(result).toBe(59);
    });

    it("should handle minute 30 (mid-hour)", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 10, 30, 0); // 10:30:00

      // Act
      const result = getMinutes(date);

      // Assert
      expect(result).toBe(30);
    });

    it("should handle minute 1 (first minute after hour start)", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 10, 1, 0); // 10:01:00

      // Act
      const result = getMinutes(date);

      // Assert
      expect(result).toBe(1);
    });

    it("should handle minute 58 (near end of hour)", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 10, 58, 0); // 10:58:00

      // Act
      const result = getMinutes(date);

      // Assert
      expect(result).toBe(58);
    });
  });

  describe("Boundary Value Analysis: Hour Transitions", () => {
    it("should handle 59 (last minute of hour)", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 10, 59, 59);

      // Act
      const result = getMinutes(date);

      // Assert
      expect(result).toBe(59);
    });

    it("should handle 00 (first minute of hour)", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 10, 0, 0);

      // Act
      const result = getMinutes(date);

      // Assert
      expect(result).toBe(0);
    });

    it("should handle transition from 59 to 00 (hour boundary)", () => {
      // Arrange
      const lastMinute = new Date(2024, 0, 15, 10, 59, 59);
      const firstMinute = new Date(2024, 0, 15, 11, 0, 0);

      // Act
      const resultLast = getMinutes(lastMinute);
      const resultFirst = getMinutes(firstMinute);

      // Assert
      expect(resultLast).toBe(59); // Last minute of hour
      expect(resultFirst).toBe(0); // First minute of next hour
    });
  });

  describe("Boundary Value Analysis: Special Dates", () => {
    it("should handle leap year dates", () => {
      // Arrange
      const leapYearDate = new Date("2024-02-29T08:25:00");

      // Act
      const result = getMinutes(leapYearDate);

      // Assert
      expect(result).toBe(25);
    });

    it("should handle leap year divisible by 400", () => {
      // Arrange
      const centuryLeapYear = new Date("2000-02-29T14:42:00");

      // Act
      const result = getMinutes(centuryLeapYear);

      // Assert
      expect(result).toBe(42);
    });

    it("should handle Unix epoch", () => {
      // Arrange
      const date = new Date("1970-01-01T00:00:00");

      // Act
      const result = getMinutes(date);

      // Assert
      expect(result).toBe(0);
    });

    it("should handle historic dates", () => {
      // Arrange
      const date = new Date("1776-07-04T10:15:00");

      // Act
      const result = getMinutes(date);

      // Assert
      expect(result).toBe(15);
    });
  });

  describe("Boundary Value Analysis: Future Dates", () => {
    it("should handle year 2030", () => {
      // Arrange
      const date = new Date("2030-01-01T08:30:00");

      // Act
      const result = getMinutes(date);

      // Assert
      expect(result).toBe(30);
    });

    it("should handle year 2050", () => {
      // Arrange
      const date = new Date("2050-12-31T23:45:00");

      // Act
      const result = getMinutes(date);

      // Assert
      expect(result).toBe(45);
    });

    it("should handle year 2999", () => {
      // Arrange
      const date = new Date("2999-12-31T12:05:00");

      // Act
      const result = getMinutes(date);

      // Assert
      expect(result).toBe(5);
    });
  });

  describe("Boundary Value Analysis: Negative Years (BC Dates)", () => {
    it("should handle 100 BC", () => {
      // Arrange
      const bcDate = new Date();
      bcDate.setFullYear(-100, 0, 1); // 100 BC
      bcDate.setHours(10, 45, 0, 0);

      // Act
      const result = getMinutes(bcDate);

      // Assert
      expect(result).toBe(45);
    });

    it("should handle 1 BC", () => {
      // Arrange
      const bcDate = new Date();
      bcDate.setFullYear(-1, 0, 1); // 1 BC
      bcDate.setHours(15, 20, 0, 0);

      // Act
      const result = getMinutes(bcDate);

      // Assert
      expect(result).toBe(20);
    });
  });

  describe("Boundary Value Analysis: All Minutes Coverage", () => {
    it("should handle all 60 minutes (systematic coverage)", () => {
      // Arrange & Act & Assert: Test all minutes 0-59
      for (let minute = 0; minute < 60; minute++) {
        const date = new Date(2024, 0, 15, 10, minute, 0);
        expect(getMinutes(date)).toBe(minute);
      }
    });
  });
});
