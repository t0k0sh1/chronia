import { describe, it, expect } from "vitest";
import { setMilliseconds } from "../src/setMilliseconds";

/**
 * Test Design for setMilliseconds
 *
 * Function signature: setMilliseconds(date: Date | number, milliseconds: number): Date
 *
 * Equivalence Partitioning:
 * - Class 1: Valid Date object + valid milliseconds (0-999) → Returns new Date with milliseconds set
 * - Class 2: Valid timestamp + valid milliseconds (0-999) → Returns new Date with milliseconds set
 * - Class 3: Valid Date + milliseconds overflow/underflow → Returns new Date with second adjusted
 * - Class 4: Invalid Date object + valid milliseconds → Returns Invalid Date
 * - Class 5: Valid Date + invalid milliseconds (NaN, Infinity, -Infinity) → Returns Invalid Date
 *
 * Boundary Value Analysis:
 * - Millisecond boundaries: 0 (start of second), 999 (end of second)
 * - Millisecond overflow: 1000 (next second), -1 (previous second)
 * - Fractional milliseconds: Truncation behavior
 *
 * Immutability Requirement:
 * - Original date must never be mutated
 */

describe("setMilliseconds", () => {
  describe("Equivalence Class 1: Valid Date object + valid milliseconds", () => {
    it("should set milliseconds to mid-second value", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45, 123);
      const milliseconds = 500;

      // Act
      const result = setMilliseconds(date, milliseconds);

      // Assert
      expect(result.getSeconds()).toBe(45);
      expect(result.getMilliseconds()).toBe(500);
    });

    it("should set milliseconds to 0 (boundary)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45, 123);
      const milliseconds = 0;

      // Act
      const result = setMilliseconds(date, milliseconds);

      // Assert
      expect(result.getMilliseconds()).toBe(0);
    });

    it("should set milliseconds to 999 (boundary)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45, 123);
      const milliseconds = 999;

      // Act
      const result = setMilliseconds(date, milliseconds);

      // Assert
      expect(result.getMilliseconds()).toBe(999);
    });

    it("should set milliseconds to same millisecond (no change)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45, 123);
      const milliseconds = 123;

      // Act
      const result = setMilliseconds(date, milliseconds);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });

    it("should truncate fractional milliseconds (positive)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45, 123);
      const milliseconds = 500.9;

      // Act
      const result = setMilliseconds(date, milliseconds);

      // Assert
      expect(result.getMilliseconds()).toBe(500); // floor(500.9) = 500
    });

    it("should truncate fractional milliseconds (negative)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45, 123);
      const milliseconds = -500.9;

      // Act
      const result = setMilliseconds(date, milliseconds);

      // Assert
      expect(result.getSeconds()).toBe(44); // Rolled back to previous second
      expect(result.getMilliseconds()).toBe(500); // floor(-500.9) = -500, which is 500ms in previous second
    });
  });

  describe("Equivalence Class 2: Valid timestamp + valid milliseconds", () => {
    it("should accept timestamp input", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45, 123);
      const timestamp = date.getTime();
      const milliseconds = 500;

      // Act
      const result = setMilliseconds(timestamp, milliseconds);

      // Assert
      expect(result.getHours()).toBe(12);
      expect(result.getMinutes()).toBe(30);
      expect(result.getSeconds()).toBe(45);
      expect(result.getMilliseconds()).toBe(500);
    });
  });

  describe("Equivalence Class 3: Valid Date + milliseconds overflow/underflow", () => {
    it("should handle negative milliseconds (rolls back to previous second)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45, 0);
      const milliseconds = -1;

      // Act
      const result = setMilliseconds(date, milliseconds);

      // Assert
      expect(result.getSeconds()).toBe(44); // Previous second
      expect(result.getMilliseconds()).toBe(999);
    });

    it("should handle millisecond 1000 (rolls over to next second)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45, 500);
      const milliseconds = 1000;

      // Act
      const result = setMilliseconds(date, milliseconds);

      // Assert
      expect(result.getSeconds()).toBe(46); // Next second
      expect(result.getMilliseconds()).toBe(0);
    });

    it("should handle large millisecond value (rolls over multiple seconds)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45, 500);
      const milliseconds = 2500; // 2.5 seconds

      // Act
      const result = setMilliseconds(date, milliseconds);

      // Assert
      expect(result.getSeconds()).toBe(47); // 2 seconds later
      expect(result.getMilliseconds()).toBe(500);
    });
  });

  describe("Equivalence Class 4: Invalid Date object + valid milliseconds", () => {
    it("should return Invalid Date when base date is invalid", () => {
      // Arrange
      const invalidDate = new Date("invalid");
      const milliseconds = 500;

      // Act
      const result = setMilliseconds(invalidDate, milliseconds);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });
  });

  describe("Equivalence Class 5: Valid Date + invalid milliseconds", () => {
    it("should return Invalid Date when milliseconds is NaN", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const milliseconds = NaN;

      // Act
      const result = setMilliseconds(date, milliseconds);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when milliseconds is Infinity", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const milliseconds = Infinity;

      // Act
      const result = setMilliseconds(date, milliseconds);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when milliseconds is -Infinity", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const milliseconds = -Infinity;

      // Act
      const result = setMilliseconds(date, milliseconds);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when timestamp is NaN", () => {
      // Arrange
      const timestamp = NaN;
      const milliseconds = 500;

      // Act
      const result = setMilliseconds(timestamp, milliseconds);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });
  });

  describe("Immutability: Original date must not be mutated", () => {
    it("should not mutate the original Date object", () => {
      // Arrange
      const original = new Date(2025, 0, 15, 12, 30, 45, 123);
      const originalTime = original.getTime();

      // Act
      setMilliseconds(original, 500);

      // Assert
      expect(original.getTime()).toBe(originalTime);
    });

    it("should not mutate when input is timestamp", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45, 123);
      const timestamp = date.getTime();

      // Act
      const result = setMilliseconds(timestamp, 500);

      // Assert
      expect(timestamp).toBe(date.getTime()); // Timestamp is immutable by nature
      expect(result.getMilliseconds()).toBe(500);
    });
  });
});
