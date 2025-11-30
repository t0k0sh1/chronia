import { describe, it, expect } from "vitest";
import { getMilliseconds } from "../src";

/**
 * Test Design for getMilliseconds
 *
 * Function signature: getMilliseconds(date: Date | number): number
 *
 * Equivalence Partitioning:
 * - Class 1: Valid Date object → Returns millisecond number (0-999)
 * - Class 2: Valid number timestamp → Returns millisecond number (0-999)
 * - Class 3: Invalid Date object → Returns NaN
 * - Class 4: Invalid number (NaN, Infinity, -Infinity) → Returns NaN
 *
 * Boundary Value Analysis:
 * - Millisecond boundaries: 0 (start of second), 999 (end of second)
 * - Second transitions: 999 to 000
 * - Mid-second: 500
 */

describe("getMilliseconds", () => {
  describe("Equivalence Class 1: Valid Date object", () => {
    it("should return milliseconds for typical time (mid-second)", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 14, 30, 45, 500); // 14:30:45.500

      // Act
      const result = getMilliseconds(date);

      // Assert
      expect(result).toBe(500);
    });

    it("should return milliseconds for start of second", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 12, 15, 30, 0); // 12:15:30.000

      // Act
      const result = getMilliseconds(date);

      // Assert
      expect(result).toBe(0);
    });

    it("should return milliseconds in local timezone", () => {
      // Arrange: Test getMilliseconds respects local timezone (not UTC)
      const date = new Date(Date.UTC(2024, 0, 15, 14, 33, 47, 333));
      const expected = date.getMilliseconds(); // Local milliseconds

      // Act
      const result = getMilliseconds(date);

      // Assert
      expect(result).toBe(expected);
    });

    it("should return typical millisecond value", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 12, 30, 45, 123);

      // Act
      const result = getMilliseconds(date);

      // Assert
      expect(result).toBe(123);
    });
  });

  describe("Equivalence Class 2: Valid number timestamp", () => {
    it("should accept timestamp for typical time", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 14, 30, 45, 456);
      const timestamp = date.getTime();

      // Act
      const result = getMilliseconds(timestamp);

      // Assert
      expect(result).toBe(456);
    });

    it("should accept timestamp 0 (Unix epoch)", () => {
      // Arrange
      const timestamp = 0; // Jan 1, 1970 00:00:00.000 (local time may vary)

      // Act
      const result = getMilliseconds(timestamp);

      // Assert
      expect(result).toBe(0);
    });

    it("should accept small timestamp", () => {
      // Arrange
      const timestamp = 123; // 123ms after epoch

      // Act
      const result = getMilliseconds(timestamp);

      // Assert
      expect(result).toBe(123);
    });

    it("should handle milliseconds rollover at 1000ms", () => {
      // Arrange
      const before = 999; // 999ms
      const after = 1000; // 1000ms = 1 second, 0ms

      // Act
      const resultBefore = getMilliseconds(before);
      const resultAfter = getMilliseconds(after);

      // Assert
      expect(resultBefore).toBe(999);
      expect(resultAfter).toBe(0);
    });

    it("should handle mid-range after rollover", () => {
      // Arrange
      const timestamp = 1500; // 1 second + 500ms

      // Act
      const result = getMilliseconds(timestamp);

      // Assert
      expect(result).toBe(500);
    });
  });

  describe("Equivalence Class 3: Invalid Date object", () => {
    it("should return NaN for Invalid Date from invalid string", () => {
      // Arrange
      const invalidDate = new Date("invalid");

      // Act
      const result = getMilliseconds(invalidDate);

      // Assert
      expect(result).toBeNaN();
    });

    it("should return NaN for Invalid Date from empty string", () => {
      // Arrange
      const invalidDate = new Date("");

      // Act
      const result = getMilliseconds(invalidDate);

      // Assert
      expect(result).toBeNaN();
    });

    it("should return NaN for Invalid Date from NaN", () => {
      // Arrange
      const invalidDate = new Date(NaN);

      // Act
      const result = getMilliseconds(invalidDate);

      // Assert
      expect(result).toBeNaN();
    });
  });

  describe("Equivalence Class 4: Invalid number (NaN, Infinity, -Infinity)", () => {
    it("should return NaN when timestamp is NaN", () => {
      // Arrange
      const timestamp = NaN;

      // Act
      const result = getMilliseconds(timestamp);

      // Assert
      expect(result).toBeNaN();
    });

    it("should return NaN when timestamp is Infinity", () => {
      // Arrange
      const timestamp = Infinity;

      // Act
      const result = getMilliseconds(timestamp);

      // Assert
      expect(result).toBeNaN();
    });

    it("should return NaN when timestamp is -Infinity", () => {
      // Arrange
      const timestamp = -Infinity;

      // Act
      const result = getMilliseconds(timestamp);

      // Assert
      expect(result).toBeNaN();
    });
  });

  describe("Boundary Value Analysis: Millisecond Boundaries", () => {
    it("should handle millisecond 0 (start of second, boundary)", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 10, 30, 45, 0); // 10:30:45.000

      // Act
      const result = getMilliseconds(date);

      // Assert
      expect(result).toBe(0);
    });

    it("should handle millisecond 999 (end of second, boundary)", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 10, 30, 45, 999); // 10:30:45.999

      // Act
      const result = getMilliseconds(date);

      // Assert
      expect(result).toBe(999);
    });

    it("should handle millisecond 500 (mid-second)", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 10, 30, 45, 500); // 10:30:45.500

      // Act
      const result = getMilliseconds(date);

      // Assert
      expect(result).toBe(500);
    });

    it("should handle millisecond 1 (first millisecond after second start)", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 10, 30, 45, 1); // 10:30:45.001

      // Act
      const result = getMilliseconds(date);

      // Assert
      expect(result).toBe(1);
    });

    it("should handle millisecond 998 (near end of second)", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 10, 30, 45, 998); // 10:30:45.998

      // Act
      const result = getMilliseconds(date);

      // Assert
      expect(result).toBe(998);
    });
  });

  describe("Boundary Value Analysis: Second Transitions", () => {
    it("should handle 999 (last millisecond of second)", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 10, 30, 45, 999);

      // Act
      const result = getMilliseconds(date);

      // Assert
      expect(result).toBe(999);
    });

    it("should handle 000 (first millisecond of second)", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 10, 30, 45, 0);

      // Act
      const result = getMilliseconds(date);

      // Assert
      expect(result).toBe(0);
    });

    it("should handle transition from 999 to 000 (second boundary)", () => {
      // Arrange
      const lastMs = new Date(2024, 0, 15, 10, 30, 45, 999);
      const firstMs = new Date(2024, 0, 15, 10, 30, 46, 0);

      // Act
      const resultLast = getMilliseconds(lastMs);
      const resultFirst = getMilliseconds(firstMs);

      // Assert
      expect(resultLast).toBe(999); // Last millisecond of second
      expect(resultFirst).toBe(0); // First millisecond of next second
    });
  });

  describe("Boundary Value Analysis: Special Dates", () => {
    it("should handle leap year dates", () => {
      // Arrange
      const leapYearDate = new Date("2024-02-29T08:25:42.333");

      // Act
      const result = getMilliseconds(leapYearDate);

      // Assert
      expect(result).toBe(333);
    });

    it("should handle leap year divisible by 400", () => {
      // Arrange
      const centuryLeapYear = new Date("2000-02-29T14:42:33.777");

      // Act
      const result = getMilliseconds(centuryLeapYear);

      // Assert
      expect(result).toBe(777);
    });

    it("should handle Unix epoch", () => {
      // Arrange
      const date = new Date("1970-01-01T00:00:00.000");

      // Act
      const result = getMilliseconds(date);

      // Assert
      expect(result).toBe(0);
    });

    it("should handle historic dates", () => {
      // Arrange
      const date = new Date("1776-07-04T10:15:33.456");

      // Act
      const result = getMilliseconds(date);

      // Assert
      expect(result).toBe(456);
    });
  });

  describe("Boundary Value Analysis: Future Dates", () => {
    it("should handle year 2030", () => {
      // Arrange
      const date = new Date("2030-01-01T08:30:42.123");

      // Act
      const result = getMilliseconds(date);

      // Assert
      expect(result).toBe(123);
    });

    it("should handle year 2050", () => {
      // Arrange
      const date = new Date("2050-12-31T23:45:55.888");

      // Act
      const result = getMilliseconds(date);

      // Assert
      expect(result).toBe(888);
    });

    it("should handle year 2999", () => {
      // Arrange
      const date = new Date("2999-12-31T12:05:25.999");

      // Act
      const result = getMilliseconds(date);

      // Assert
      expect(result).toBe(999);
    });
  });

  describe("Boundary Value Analysis: Negative Years (BC Dates)", () => {
    it("should handle 100 BC", () => {
      // Arrange
      const bcDate = new Date();
      bcDate.setFullYear(-100, 0, 1); // 100 BC
      bcDate.setHours(10, 45, 33, 666);

      // Act
      const result = getMilliseconds(bcDate);

      // Assert
      expect(result).toBe(666);
    });

    it("should handle 1 BC", () => {
      // Arrange
      const bcDate = new Date();
      bcDate.setFullYear(-1, 0, 1); // 1 BC
      bcDate.setHours(15, 20, 59, 999);

      // Act
      const result = getMilliseconds(bcDate);

      // Assert
      expect(result).toBe(999);
    });
  });

  describe("Boundary Value Analysis: Milliseconds Range Coverage", () => {
    it("should handle key millisecond values (systematic sampling)", () => {
      // Arrange & Act & Assert: Test key milliseconds across the range
      const testValues = [0, 1, 100, 250, 500, 750, 900, 998, 999];

      for (const ms of testValues) {
        const date = new Date(2024, 0, 15, 10, 30, 45, ms);
        expect(getMilliseconds(date)).toBe(ms);
      }
    });
  });
});