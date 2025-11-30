import { describe, it, expect } from "vitest";
import { setDay } from "../src/setDay";

/**
 * Test Design for setDay
 *
 * Function signature: setDay(date: Date | number, day: number): Date
 *
 * Equivalence Partitioning:
 * - Class 1: Valid Date object + valid day (1-31) → Returns new Date with day set
 * - Class 2: Valid timestamp + valid day (1-31) → Returns new Date with day set
 * - Class 3: Valid Date + day overflow/underflow → Returns new Date with month/year adjusted
 * - Class 4: Invalid Date object + valid day → Returns Invalid Date
 * - Class 5: Valid Date + invalid day (NaN, Infinity, -Infinity) → Returns Invalid Date
 *
 * Boundary Value Analysis:
 * - Day boundaries: 1 (first day), 28/29/30/31 (last day, varies by month)
 * - Day overflow: 32 (next month), 0 (previous month's last day), -1 (previous month)
 * - Month-specific boundaries: February (28/29), 30-day months, 31-day months
 * - Fractional days: Truncation behavior
 *
 * Immutability Requirement:
 * - Original date must never be mutated
 */

describe("setDay", () => {
  describe("Equivalence Class 1: Valid Date object + valid day", () => {
    it("should set day to mid-month day", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const day = 20;

      // Act
      const result = setDay(date, day);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(20);
    });

    it("should set day to 1st (boundary)", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const day = 1;

      // Act
      const result = setDay(date, day);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(1);
    });

    it("should set day to 31st (boundary)", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const day = 31;

      // Act
      const result = setDay(date, day);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(31);
    });

    it("should set day to same day (no change)", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const day = 15;

      // Act
      const result = setDay(date, day);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });

    it("should preserve year, month, time, and milliseconds", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 14, 30, 45, 123);
      const day = 20;

      // Act
      const result = setDay(date, day);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(20);
      expect(result.getHours()).toBe(14);
      expect(result.getMinutes()).toBe(30);
      expect(result.getSeconds()).toBe(45);
      expect(result.getMilliseconds()).toBe(123);
    });

    it("should truncate fractional day (positive)", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const day = 15.9;

      // Act
      const result = setDay(date, day);

      // Assert
      expect(result.getDate()).toBe(15); // floor(15.9) = 15
    });

    it("should truncate fractional day (negative)", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const day = -1.9;

      // Act
      const result = setDay(date, day);

      // Assert
      expect(result.getFullYear()).toBe(2024); // Rolled back to previous year
      expect(result.getMonth()).toBe(11); // December
      expect(result.getDate()).toBe(30); // floor(-1.9) = -1, which is Dec 30
    });
  });

  describe("Equivalence Class 2: Valid timestamp + valid day", () => {
    it("should accept timestamp input", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const timestamp = date.getTime();
      const day = 20;

      // Act
      const result = setDay(timestamp, day);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(20);
    });
  });

  describe("Equivalence Class 3: Valid Date + day overflow/underflow", () => {
    it("should handle day 0 (becomes last day of previous month)", () => {
      // Arrange
      const date = new Date(2025, 0, 15); // Jan 15, 2025
      const day = 0;

      // Act
      const result = setDay(date, day);

      // Assert
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(11); // December
      expect(result.getDate()).toBe(31); // Dec 31, 2024
    });

    it("should handle negative day (goes to previous month)", () => {
      // Arrange
      const date = new Date(2025, 0, 15); // Jan 15, 2025
      const day = -1;

      // Act
      const result = setDay(date, day);

      // Assert
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(11); // December
      expect(result.getDate()).toBe(30); // Dec 30, 2024
    });

    it("should handle day overflow (goes to next month)", () => {
      // Arrange
      const date = new Date(2025, 0, 15); // Jan 15, 2025
      const day = 32;

      // Act
      const result = setDay(date, day);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(1); // February
      expect(result.getDate()).toBe(1); // Feb 1, 2025
    });

    it("should handle large day value (rolls over multiple months)", () => {
      // Arrange
      const date = new Date(2025, 0, 15); // Jan 15, 2025
      const day = 100;

      // Act
      const result = setDay(date, day);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(3); // April
      expect(result.getDate()).toBe(10); // Apr 10, 2025
    });

    it("should handle year-end correctly", () => {
      // Arrange
      const date = new Date(2025, 11, 31, 23, 59, 59, 999); // Dec 31, 2025 23:59:59.999
      const day = 1;

      // Act
      const result = setDay(date, day);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(11); // December
      expect(result.getDate()).toBe(1); // Dec 1, 2025
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
      expect(result.getMilliseconds()).toBe(999);
    });
  });

  describe("Equivalence Class 4: Invalid Date object + valid day", () => {
    it("should return Invalid Date when base date is invalid", () => {
      // Arrange
      const invalidDate = new Date("invalid");
      const day = 15;

      // Act
      const result = setDay(invalidDate, day);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });
  });

  describe("Equivalence Class 5: Valid Date + invalid day", () => {
    it("should return Invalid Date when day is NaN", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const day = NaN;

      // Act
      const result = setDay(date, day);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when day is Infinity", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const day = Infinity;

      // Act
      const result = setDay(date, day);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when day is -Infinity", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const day = -Infinity;

      // Act
      const result = setDay(date, day);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when timestamp is NaN", () => {
      // Arrange
      const timestamp = NaN;
      const day = 15;

      // Act
      const result = setDay(timestamp, day);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });
  });

  describe("Boundary Value Analysis: Month Boundaries and Rollover", () => {
    it("should rollover day 31 to next month for 30-day months (April)", () => {
      // Arrange
      const date = new Date(2025, 3, 15); // April 15
      const day = 31;

      // Act
      const result = setDay(date, day);

      // Assert
      expect(result.getMonth()).toBe(4); // May
      expect(result.getDate()).toBe(1); // May 1
    });

    it("should rollover day 31 to next month for 30-day months (June)", () => {
      // Arrange
      const date = new Date(2025, 5, 15); // June 15
      const day = 31;

      // Act
      const result = setDay(date, day);

      // Assert
      expect(result.getMonth()).toBe(6); // July
      expect(result.getDate()).toBe(1); // July 1
    });

    it("should rollover day 31 to next month for 30-day months (September)", () => {
      // Arrange
      const date = new Date(2025, 8, 15); // September 15
      const day = 31;

      // Act
      const result = setDay(date, day);

      // Assert
      expect(result.getMonth()).toBe(9); // October
      expect(result.getDate()).toBe(1); // October 1
    });

    it("should rollover day 31 to next month for 30-day months (November)", () => {
      // Arrange
      const date = new Date(2025, 10, 15); // November 15
      const day = 31;

      // Act
      const result = setDay(date, day);

      // Assert
      expect(result.getMonth()).toBe(11); // December
      expect(result.getDate()).toBe(1); // December 1
    });

    it("should rollover day 29 in February non-leap year", () => {
      // Arrange
      const date = new Date(2025, 1, 15); // February 15, 2025
      const day = 29;

      // Act
      const result = setDay(date, day);

      // Assert
      expect(result.getMonth()).toBe(2); // March
      expect(result.getDate()).toBe(1); // March 1
    });

    it("should accept day 29 in February leap year", () => {
      // Arrange
      const date = new Date(2024, 1, 15); // February 15, 2024 (leap year)
      const day = 29;

      // Act
      const result = setDay(date, day);

      // Assert
      expect(result.getMonth()).toBe(1); // Still February
      expect(result.getDate()).toBe(29); // Feb 29, 2024
    });

    it("should handle day 0 in March (non-leap year, goes to Feb 28)", () => {
      // Arrange
      const date = new Date(2025, 2, 15); // March 15, 2025
      const day = 0;

      // Act
      const result = setDay(date, day);

      // Assert
      expect(result.getMonth()).toBe(1); // February
      expect(result.getDate()).toBe(28); // Feb 28, 2025
    });

    it("should handle day 0 in March (leap year, goes to Feb 29)", () => {
      // Arrange
      const date = new Date(2024, 2, 15); // March 15, 2024 (leap year)
      const day = 0;

      // Act
      const result = setDay(date, day);

      // Assert
      expect(result.getMonth()).toBe(1); // February
      expect(result.getDate()).toBe(29); // Feb 29, 2024
    });
  });

  describe("Immutability: Original date must not be mutated", () => {
    it("should not mutate the original Date object", () => {
      // Arrange
      const original = new Date(2025, 0, 15);
      const originalTime = original.getTime();

      // Act
      setDay(original, 20);

      // Assert
      expect(original.getTime()).toBe(originalTime);
    });

    it("should not mutate when input is timestamp", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const timestamp = date.getTime();

      // Act
      const result = setDay(timestamp, 20);

      // Assert
      expect(timestamp).toBe(date.getTime()); // Timestamp is immutable by nature
      expect(result.getDate()).toBe(20);
    });
  });
});