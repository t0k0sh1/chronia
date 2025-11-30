import { describe, it, expect } from "vitest";
import { setSeconds } from "../src/setSeconds";

/**
 * Test Design for setSeconds
 *
 * Function signature: setSeconds(date: Date | number, seconds: number): Date
 *
 * Equivalence Partitioning:
 * - Class 1: Valid Date object + valid seconds (0-59) → Returns new Date with seconds set
 * - Class 2: Valid timestamp + valid seconds (0-59) → Returns new Date with seconds set
 * - Class 3: Valid Date + seconds overflow/underflow → Returns new Date with minute adjusted
 * - Class 4: Invalid Date object + valid seconds → Returns Invalid Date
 * - Class 5: Valid Date + invalid seconds (NaN, Infinity, -Infinity) → Returns Invalid Date
 *
 * Boundary Value Analysis:
 * - Second boundaries: 0 (start of minute), 59 (end of minute)
 * - Second overflow: 60 (next minute), -1 (previous minute)
 * - Fractional seconds: Truncation behavior
 *
 * Immutability Requirement:
 * - Original date must never be mutated
 */

describe("setSeconds", () => {
  describe("Equivalence Class 1: Valid Date object + valid seconds", () => {
    it("should set seconds to mid-minute value", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45, 123);
      const seconds = 30;

      // Act
      const result = setSeconds(date, seconds);

      // Assert
      expect(result.getMinutes()).toBe(30);
      expect(result.getSeconds()).toBe(30);
      expect(result.getMilliseconds()).toBe(123);
    });

    it("should set seconds to 0 (boundary)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45);
      const seconds = 0;

      // Act
      const result = setSeconds(date, seconds);

      // Assert
      expect(result.getSeconds()).toBe(0);
    });

    it("should set seconds to 59 (boundary)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45);
      const seconds = 59;

      // Act
      const result = setSeconds(date, seconds);

      // Assert
      expect(result.getSeconds()).toBe(59);
    });

    it("should set seconds to same second (no change)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45);
      const seconds = 45;

      // Act
      const result = setSeconds(date, seconds);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });

    it("should truncate fractional seconds", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45, 123);
      const seconds = 30.9;

      // Act
      const result = setSeconds(date, seconds);

      // Assert
      expect(result.getSeconds()).toBe(30); // floor(30.9) = 30
    });
  });

  describe("Equivalence Class 2: Valid timestamp + valid seconds", () => {
    it("should accept timestamp input", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45);
      const timestamp = date.getTime();
      const seconds = 30;

      // Act
      const result = setSeconds(timestamp, seconds);

      // Assert
      expect(result.getHours()).toBe(12);
      expect(result.getMinutes()).toBe(30);
      expect(result.getSeconds()).toBe(30);
    });
  });

  describe("Equivalence Class 3: Valid Date + seconds overflow/underflow", () => {
    it("should handle negative seconds (rolls back to previous minute)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 0);
      const seconds = -1;

      // Act
      const result = setSeconds(date, seconds);

      // Assert
      expect(result.getMinutes()).toBe(29); // Previous minute
      expect(result.getSeconds()).toBe(59);
    });

    it("should handle second 60 (rolls over to next minute)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45);
      const seconds = 60;

      // Act
      const result = setSeconds(date, seconds);

      // Assert
      expect(result.getMinutes()).toBe(31); // Next minute
      expect(result.getSeconds()).toBe(0);
    });

    it("should handle large second value (rolls over multiple minutes)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45);
      const seconds = 120; // 2 minutes

      // Act
      const result = setSeconds(date, seconds);

      // Assert
      expect(result.getMinutes()).toBe(32); // 2 minutes later
      expect(result.getSeconds()).toBe(0);
    });

    it("should handle large negative seconds (crosses hour boundary)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 0, 30);
      const seconds = -90; // -1.5 minutes

      // Act
      const result = setSeconds(date, seconds);

      // Assert
      expect(result.getHours()).toBe(11); // Previous hour
      expect(result.getMinutes()).toBe(58); // 58:30
      expect(result.getSeconds()).toBe(30);
    });
  });

  describe("Equivalence Class 4: Invalid Date object + valid seconds", () => {
    it("should return Invalid Date when base date is invalid", () => {
      // Arrange
      const invalidDate = new Date("invalid");
      const seconds = 30;

      // Act
      const result = setSeconds(invalidDate, seconds);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });
  });

  describe("Equivalence Class 5: Valid Date + invalid seconds", () => {
    it("should return Invalid Date when seconds is NaN", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const seconds = NaN;

      // Act
      const result = setSeconds(date, seconds);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when seconds is Infinity", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const seconds = Infinity;

      // Act
      const result = setSeconds(date, seconds);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when seconds is -Infinity", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const seconds = -Infinity;

      // Act
      const result = setSeconds(date, seconds);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when timestamp is NaN", () => {
      // Arrange
      const timestamp = NaN;
      const seconds = 30;

      // Act
      const result = setSeconds(timestamp, seconds);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });
  });

  describe("Immutability: Original date must not be mutated", () => {
    it("should not mutate the original Date object", () => {
      // Arrange
      const original = new Date(2025, 0, 15, 12, 30, 45);
      const originalTime = original.getTime();

      // Act
      setSeconds(original, 30);

      // Assert
      expect(original.getTime()).toBe(originalTime);
    });

    it("should not mutate when input is timestamp", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45);
      const timestamp = date.getTime();

      // Act
      const result = setSeconds(timestamp, 30);

      // Assert
      expect(timestamp).toBe(date.getTime()); // Timestamp is immutable by nature
      expect(result.getSeconds()).toBe(30);
    });
  });
});
