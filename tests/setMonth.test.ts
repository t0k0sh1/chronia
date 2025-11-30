import { describe, it, expect } from "vitest";
import { setMonth } from "../src/setMonth";

/**
 * Test Design for setMonth
 *
 * Function signature: setMonth(date: Date | number, month: number): Date
 *
 * Equivalence Partitioning:
 * - Class 1: Valid Date object + valid month (0-11) → Returns new Date with month set
 * - Class 2: Valid timestamp + valid month (0-11) → Returns new Date with month set
 * - Class 3: Valid Date + month overflow/underflow → Returns new Date with year adjusted
 * - Class 4: Invalid Date object + valid month → Returns Invalid Date
 * - Class 5: Valid Date + invalid month (NaN, Infinity, -Infinity) → Returns Invalid Date
 *
 * Boundary Value Analysis:
 * - Month boundaries: 0 (January), 11 (December)
 * - Month overflow: 12 (January next year), -1 (December previous year)
 * - Day adjustment: 31→28/29/30 (when target month has fewer days)
 * - Fractional months: Truncation behavior
 *
 * Immutability Requirement:
 * - Original date must never be mutated
 */

describe("setMonth", () => {
  describe("Equivalence Class 1: Valid Date object + valid month", () => {
    it("should set month to mid-year month", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const month = 5; // June

      // Act
      const result = setMonth(date, month);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(5);
      expect(result.getDate()).toBe(15);
    });

    it("should set month to January (boundary: 0)", () => {
      // Arrange
      const date = new Date(2025, 5, 15);
      const month = 0;

      // Act
      const result = setMonth(date, month);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(15);
    });

    it("should set month to December (boundary: 11)", () => {
      // Arrange
      const date = new Date(2025, 5, 15);
      const month = 11;

      // Act
      const result = setMonth(date, month);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(11);
      expect(result.getDate()).toBe(15);
    });

    it("should set month to same month (no change)", () => {
      // Arrange
      const date = new Date(2025, 5, 15);
      const month = 5;

      // Act
      const result = setMonth(date, month);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });

    it("should preserve day, time, and milliseconds", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 14, 30, 45, 123);
      const month = 6;

      // Act
      const result = setMonth(date, month);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(6);
      expect(result.getDate()).toBe(15);
      expect(result.getHours()).toBe(14);
      expect(result.getMinutes()).toBe(30);
      expect(result.getSeconds()).toBe(45);
      expect(result.getMilliseconds()).toBe(123);
    });

    it("should truncate fractional month (positive)", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const month = 5.9;

      // Act
      const result = setMonth(date, month);

      // Assert
      expect(result.getMonth()).toBe(5); // floor(5.9) = 5
    });

    it("should truncate fractional month (negative)", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const month = -1.9;

      // Act
      const result = setMonth(date, month);

      // Assert
      expect(result.getFullYear()).toBe(2024); // Rolled back to previous year
      expect(result.getMonth()).toBe(11); // December
    });
  });

  describe("Equivalence Class 2: Valid timestamp + valid month", () => {
    it("should accept timestamp input", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const timestamp = date.getTime();
      const month = 5;

      // Act
      const result = setMonth(timestamp, month);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(5);
      expect(result.getDate()).toBe(15);
    });
  });

  describe("Equivalence Class 3: Valid Date + month overflow/underflow", () => {
    it("should handle negative month (rolls back to previous year)", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const month = -1;

      // Act
      const result = setMonth(date, month);

      // Assert
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(11); // December
      expect(result.getDate()).toBe(15);
    });

    it("should handle month overflow (rolls forward to next year)", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const month = 12;

      // Act
      const result = setMonth(date, month);

      // Assert
      expect(result.getFullYear()).toBe(2026);
      expect(result.getMonth()).toBe(0); // January
      expect(result.getDate()).toBe(15);
    });

    it("should handle large month values (adds years)", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const month = 24; // 2 years forward

      // Act
      const result = setMonth(date, month);

      // Assert
      expect(result.getFullYear()).toBe(2027);
      expect(result.getMonth()).toBe(0); // January
      expect(result.getDate()).toBe(15);
    });
  });

  describe("Equivalence Class 4: Invalid Date object + valid month", () => {
    it("should return Invalid Date when base date is invalid", () => {
      // Arrange
      const invalidDate = new Date("invalid");
      const month = 5;

      // Act
      const result = setMonth(invalidDate, month);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });
  });

  describe("Equivalence Class 5: Valid Date + invalid month", () => {
    it("should return Invalid Date when month is NaN", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const month = NaN;

      // Act
      const result = setMonth(date, month);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when month is Infinity", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const month = Infinity;

      // Act
      const result = setMonth(date, month);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when month is -Infinity", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const month = -Infinity;

      // Act
      const result = setMonth(date, month);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when timestamp is NaN", () => {
      // Arrange
      const timestamp = NaN;
      const month = 5;

      // Act
      const result = setMonth(timestamp, month);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });
  });

  describe("Boundary Value Analysis: Day Adjustments (Month-End Transitions)", () => {
    it("should adjust Jan 31 to Feb 28 in non-leap year", () => {
      // Arrange
      const jan31 = new Date(2025, 0, 31);
      const month = 1; // February

      // Act
      const result = setMonth(jan31, month);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(1); // February
      expect(result.getDate()).toBe(28); // Adjusted to last day
    });

    it("should adjust Jan 31 to Feb 29 in leap year", () => {
      // Arrange
      const jan31 = new Date(2024, 0, 31);
      const month = 1; // February

      // Act
      const result = setMonth(jan31, month);

      // Assert
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(1); // February
      expect(result.getDate()).toBe(29); // Adjusted to leap year last day
    });

    it("should adjust Mar 31 to Apr 30 (30-day month)", () => {
      // Arrange
      const mar31 = new Date(2025, 2, 31);
      const month = 3; // April

      // Act
      const result = setMonth(mar31, month);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(3); // April
      expect(result.getDate()).toBe(30); // Adjusted to last day
    });

    it("should handle all month-end adjustments from Jan 31", () => {
      // Arrange
      const jan31 = new Date(2025, 0, 31);

      // Act & Assert: February (28 days in non-leap year)
      expect(setMonth(jan31, 1).getDate()).toBe(28);

      // Act & Assert: April (30 days)
      expect(setMonth(jan31, 3).getDate()).toBe(30);

      // Act & Assert: June (30 days)
      expect(setMonth(jan31, 5).getDate()).toBe(30);

      // Act & Assert: September (30 days)
      expect(setMonth(jan31, 8).getDate()).toBe(30);

      // Act & Assert: November (30 days)
      expect(setMonth(jan31, 10).getDate()).toBe(30);
    });
  });

  describe("Immutability: Original date must not be mutated", () => {
    it("should not mutate the original Date object", () => {
      // Arrange
      const original = new Date(2025, 0, 15);
      const originalTime = original.getTime();

      // Act
      setMonth(original, 6);

      // Assert
      expect(original.getTime()).toBe(originalTime);
    });

    it("should not mutate when input is timestamp", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const timestamp = date.getTime();

      // Act
      const result = setMonth(timestamp, 6);

      // Assert
      expect(timestamp).toBe(date.getTime()); // Timestamp is immutable by nature
      expect(result.getMonth()).toBe(6);
    });
  });
});