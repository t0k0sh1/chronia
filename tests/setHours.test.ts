import { describe, it, expect } from "vitest";
import { setHours } from "../src/setHours";

/**
 * Test Design for setHours
 *
 * Function signature: setHours(date: Date | number, hours: number): Date
 *
 * Equivalence Partitioning:
 * - Class 1: Valid Date object + valid hours (0-23) → Returns new Date with hours set
 * - Class 2: Valid timestamp + valid hours (0-23) → Returns new Date with hours set
 * - Class 3: Valid Date + hours overflow/underflow → Returns new Date with day adjusted
 * - Class 4: Invalid Date object + valid hours → Returns Invalid Date
 * - Class 5: Valid Date + invalid hours (NaN, Infinity, -Infinity) → Returns Invalid Date
 *
 * Boundary Value Analysis:
 * - Hour boundaries: 0 (midnight), 23 (end of day)
 * - Hour overflow: 24 (next day), -1 (previous day)
 * - Fractional hours: Truncation behavior
 *
 * Immutability Requirement:
 * - Original date must never be mutated
 */

describe("setHours", () => {
  describe("Equivalence Class 1: Valid Date object + valid hours", () => {
    it("should set hours to mid-day hour", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45, 123);
      const hours = 18;

      // Act
      const result = setHours(date, hours);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(15);
      expect(result.getHours()).toBe(18);
      expect(result.getMinutes()).toBe(30);
      expect(result.getSeconds()).toBe(45);
      expect(result.getMilliseconds()).toBe(123);
    });

    it("should set hours to 0 (midnight, boundary)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45);
      const hours = 0;

      // Act
      const result = setHours(date, hours);

      // Assert
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(30);
      expect(result.getSeconds()).toBe(45);
    });

    it("should set hours to 23 (end of day, boundary)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45);
      const hours = 23;

      // Act
      const result = setHours(date, hours);

      // Assert
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(30);
      expect(result.getSeconds()).toBe(45);
    });

    it("should set hours to same hour (no change)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45);
      const hours = 12;

      // Act
      const result = setHours(date, hours);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });

    it("should truncate fractional hours", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45, 123);
      const hours = 14.9;

      // Act
      const result = setHours(date, hours);

      // Assert
      expect(result.getHours()).toBe(14); // floor(14.9) = 14
    });
  });

  describe("Equivalence Class 2: Valid timestamp + valid hours", () => {
    it("should accept timestamp input", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45);
      const timestamp = date.getTime();
      const hours = 18;

      // Act
      const result = setHours(timestamp, hours);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(15);
      expect(result.getHours()).toBe(18);
    });
  });

  describe("Equivalence Class 3: Valid Date + hours overflow/underflow", () => {
    it("should handle negative hours (rolls back to previous day)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45);
      const hours = -1;

      // Act
      const result = setHours(date, hours);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(14); // Previous day
      expect(result.getHours()).toBe(23); // 23:30:45
    });

    it("should handle hour 24 (rolls over to next day)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45);
      const hours = 24;

      // Act
      const result = setHours(date, hours);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(16); // Next day
      expect(result.getHours()).toBe(0); // 00:30:45
    });

    it("should handle large hour value (rolls over multiple days)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45);
      const hours = 48; // 2 days forward

      // Act
      const result = setHours(date, hours);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(17); // 2 days later
      expect(result.getHours()).toBe(0);
    });

    it("should handle large negative hours (crosses month boundary)", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 12, 30, 45); // Jan 1, 2025
      const hours = -25;

      // Act
      const result = setHours(date, hours);

      // Assert
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(11); // December
      expect(result.getDate()).toBe(30); // Dec 30, 2024
      expect(result.getHours()).toBe(23);
    });
  });

  describe("Equivalence Class 4: Invalid Date object + valid hours", () => {
    it("should return Invalid Date when base date is invalid", () => {
      // Arrange
      const invalidDate = new Date("invalid");
      const hours = 12;

      // Act
      const result = setHours(invalidDate, hours);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });
  });

  describe("Equivalence Class 5: Valid Date + invalid hours", () => {
    it("should return Invalid Date when hours is NaN", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const hours = NaN;

      // Act
      const result = setHours(date, hours);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when hours is Infinity", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const hours = Infinity;

      // Act
      const result = setHours(date, hours);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when hours is -Infinity", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const hours = -Infinity;

      // Act
      const result = setHours(date, hours);

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
      setHours(original, 18);

      // Assert
      expect(original.getTime()).toBe(originalTime);
    });

    it("should not mutate when input is timestamp", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45);
      const timestamp = date.getTime();

      // Act
      const result = setHours(timestamp, 18);

      // Assert
      expect(timestamp).toBe(date.getTime()); // Timestamp is immutable by nature
      expect(result.getHours()).toBe(18);
    });
  });
});
