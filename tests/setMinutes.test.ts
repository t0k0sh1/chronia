import { describe, it, expect } from "vitest";
import { setMinutes } from "../src/setMinutes";

/**
 * Test Design for setMinutes
 *
 * Function signature: setMinutes(date: Date | number, minutes: number): Date
 *
 * Equivalence Partitioning:
 * - Class 1: Valid Date object + valid minutes (0-59) → Returns new Date with minutes set
 * - Class 2: Valid timestamp + valid minutes (0-59) → Returns new Date with minutes set
 * - Class 3: Valid Date + minutes overflow/underflow → Returns new Date with hour adjusted
 * - Class 4: Invalid Date object + valid minutes → Returns Invalid Date
 * - Class 5: Valid Date + invalid minutes (NaN, Infinity, -Infinity) → Returns Invalid Date
 *
 * Boundary Value Analysis:
 * - Minute boundaries: 0 (start of hour), 59 (end of hour)
 * - Minute overflow: 60 (next hour), -1 (previous hour)
 * - Fractional minutes: Truncation behavior
 *
 * Immutability Requirement:
 * - Original date must never be mutated
 */

describe("setMinutes", () => {
  describe("Equivalence Class 1: Valid Date object + valid minutes", () => {
    it("should set minutes to mid-hour value", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45, 123);
      const minutes = 45;

      // Act
      const result = setMinutes(date, minutes);

      // Assert
      expect(result.getHours()).toBe(12);
      expect(result.getMinutes()).toBe(45);
      expect(result.getSeconds()).toBe(45);
      expect(result.getMilliseconds()).toBe(123);
    });

    it("should set minutes to 0 (boundary)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45);
      const minutes = 0;

      // Act
      const result = setMinutes(date, minutes);

      // Assert
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(45);
    });

    it("should set minutes to 59 (boundary)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45);
      const minutes = 59;

      // Act
      const result = setMinutes(date, minutes);

      // Assert
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(45);
    });

    it("should set minutes to same minute (no change)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45);
      const minutes = 30;

      // Act
      const result = setMinutes(date, minutes);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });

    it("should truncate fractional minutes (positive)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45, 123);
      const minutes = 45.9;

      // Act
      const result = setMinutes(date, minutes);

      // Assert
      expect(result.getMinutes()).toBe(45); // floor(45.9) = 45
    });

    it("should truncate fractional minutes (negative)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45, 123);
      const minutes = -45.9;

      // Act
      const result = setMinutes(date, minutes);

      // Assert
      expect(result.getHours()).toBe(11); // Rolled back to previous hour
      expect(result.getMinutes()).toBe(15); // floor(-45.9) = -45, which is 15 minutes in previous hour
    });
  });

  describe("Equivalence Class 2: Valid timestamp + valid minutes", () => {
    it("should accept timestamp input", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45);
      const timestamp = date.getTime();
      const minutes = 45;

      // Act
      const result = setMinutes(timestamp, minutes);

      // Assert
      expect(result.getHours()).toBe(12);
      expect(result.getMinutes()).toBe(45);
      expect(result.getSeconds()).toBe(45);
    });
  });

  describe("Equivalence Class 3: Valid Date + minutes overflow/underflow", () => {
    it("should handle minute 60 (rolls over to next hour)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45);
      const minutes = 60;

      // Act
      const result = setMinutes(date, minutes);

      // Assert
      expect(result.getHours()).toBe(13); // Next hour
      expect(result.getMinutes()).toBe(0);
    });

    it("should handle large negative minutes (crosses day boundary)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 0, 30, 45); // Jan 15, 00:30:45
      const minutes = -90; // -1.5 hours

      // Act
      const result = setMinutes(date, minutes);

      // Assert
      expect(result.getDate()).toBe(14); // Previous day
      expect(result.getHours()).toBe(22); // 22:30:45 on Jan 14
      expect(result.getMinutes()).toBe(30);
    });
  });

  describe("Equivalence Class 4: Invalid Date object + valid minutes", () => {
    it("should return Invalid Date when base date is invalid", () => {
      // Arrange
      const invalidDate = new Date("invalid");
      const minutes = 30;

      // Act
      const result = setMinutes(invalidDate, minutes);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });
  });

  describe("Equivalence Class 5: Valid Date + invalid minutes", () => {
    it("should return Invalid Date when minutes is NaN", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const minutes = NaN;

      // Act
      const result = setMinutes(date, minutes);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when minutes is Infinity", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const minutes = Infinity;

      // Act
      const result = setMinutes(date, minutes);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when minutes is -Infinity", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const minutes = -Infinity;

      // Act
      const result = setMinutes(date, minutes);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when timestamp is NaN", () => {
      // Arrange
      const timestamp = NaN;
      const minutes = 30;

      // Act
      const result = setMinutes(timestamp, minutes);

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
      setMinutes(original, 45);

      // Assert
      expect(original.getTime()).toBe(originalTime);
    });

    it("should not mutate when input is timestamp", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45);
      const timestamp = date.getTime();

      // Act
      const result = setMinutes(timestamp, 45);

      // Assert
      expect(timestamp).toBe(date.getTime()); // Timestamp is immutable by nature
      expect(result.getMinutes()).toBe(45);
    });
  });
});
