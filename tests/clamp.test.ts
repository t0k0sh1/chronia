import { describe, it, expect } from "vitest";
import { clamp } from "../src/clamp";

/**
 * Test Design for clamp
 *
 * Function signature: clamp(date: Date | number, minDate: Date | number, maxDate: Date | number): Date
 *
 * Equivalence Partitioning:
 * - Class 1: Date within range (min <= date <= max) → Returns date
 * - Class 2: Date before range (date < min) → Returns minDate
 * - Class 3: Date after range (date > max) → Returns maxDate
 * - Class 4: Date with timestamp input → Returns Date object with correct time
 * - Class 5: Mixed Date and timestamp inputs → Returns Date object with correct time
 * - Class 6: Invalid date input → Returns Invalid Date
 * - Class 7: Invalid min/max input → Returns Invalid Date
 * - Class 8: Swapped min and max (min > max) → Auto-corrects to (max, min)
 *
 * Boundary Value Analysis:
 * - Date exactly at min boundary
 * - Date exactly at max boundary
 * - Min and max are equal
 * - Millisecond precision boundaries
 * - Year boundaries
 * - Epoch date (timestamp 0)
 * - Very large/small timestamps
 */

describe("clamp", () => {
  describe("happy path", () => {
    it("should return date when within range (Date objects)", () => {
      // Arrange
      const date = new Date(2024, 5, 15); // June 15, 2024
      const minDate = new Date(2024, 5, 10); // June 10, 2024
      const maxDate = new Date(2024, 5, 20); // June 20, 2024

      // Act
      const result = clamp(date, minDate, maxDate);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
      expect(result).not.toBe(date); // Should return a new Date object
    });

    it("should return date when within range (timestamps)", () => {
      // Arrange
      const timestamp = new Date(2024, 5, 15).getTime();
      const minTimestamp = new Date(2024, 5, 10).getTime();
      const maxTimestamp = new Date(2024, 5, 20).getTime();

      // Act
      const result = clamp(timestamp, minTimestamp, maxTimestamp);

      // Assert
      expect(result.getTime()).toBe(timestamp);
      expect(result).toBeInstanceOf(Date);
    });

    it("should return date when within range (mixed Date and timestamps)", () => {
      // Arrange
      const date = new Date(2024, 5, 15);
      const minTimestamp = new Date(2024, 5, 10).getTime();
      const maxDate = new Date(2024, 5, 20);

      // Act
      const result = clamp(date, minTimestamp, maxDate);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
      expect(result).toBeInstanceOf(Date);
    });

    it("should return minDate when date is before range", () => {
      // Arrange
      const date = new Date(2024, 5, 5); // June 5, 2024
      const minDate = new Date(2024, 5, 10); // June 10, 2024
      const maxDate = new Date(2024, 5, 20); // June 20, 2024

      // Act
      const result = clamp(date, minDate, maxDate);

      // Assert
      expect(result.getTime()).toBe(minDate.getTime());
      expect(result).not.toBe(minDate); // Should return a new Date object
    });

    it("should return maxDate when date is after range", () => {
      // Arrange
      const date = new Date(2024, 5, 25); // June 25, 2024
      const minDate = new Date(2024, 5, 10); // June 10, 2024
      const maxDate = new Date(2024, 5, 20); // June 20, 2024

      // Act
      const result = clamp(date, minDate, maxDate);

      // Assert
      expect(result.getTime()).toBe(maxDate.getTime());
      expect(result).not.toBe(maxDate); // Should return a new Date object
    });
  });

  describe("edge cases", () => {
    it("should handle date exactly at min boundary", () => {
      // Arrange
      const date = new Date(2024, 5, 10);
      const minDate = new Date(2024, 5, 10);
      const maxDate = new Date(2024, 5, 20);

      // Act
      const result = clamp(date, minDate, maxDate);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });

    it("should handle date exactly at max boundary", () => {
      // Arrange
      const date = new Date(2024, 5, 20);
      const minDate = new Date(2024, 5, 10);
      const maxDate = new Date(2024, 5, 20);

      // Act
      const result = clamp(date, minDate, maxDate);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });

    it("should handle same min and max dates", () => {
      // Arrange
      const date = new Date(2024, 5, 15);
      const boundaryDate = new Date(2024, 5, 10);

      // Act
      const result = clamp(date, boundaryDate, boundaryDate);

      // Assert
      expect(result.getTime()).toBe(boundaryDate.getTime());
    });

    it("should handle dates with millisecond precision", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 12, 0, 0, 500);
      const minDate = new Date(2024, 5, 15, 12, 0, 0, 100);
      const maxDate = new Date(2024, 5, 15, 12, 0, 0, 900);

      // Act
      const result = clamp(date, minDate, maxDate);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });

    it("should clamp millisecond precision dates to min", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 12, 0, 0, 50);
      const minDate = new Date(2024, 5, 15, 12, 0, 0, 100);
      const maxDate = new Date(2024, 5, 15, 12, 0, 0, 900);

      // Act
      const result = clamp(date, minDate, maxDate);

      // Assert
      expect(result.getTime()).toBe(minDate.getTime());
    });

    it("should clamp millisecond precision dates to max", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 12, 0, 0, 1000);
      const minDate = new Date(2024, 5, 15, 12, 0, 0, 100);
      const maxDate = new Date(2024, 5, 15, 12, 0, 0, 900);

      // Act
      const result = clamp(date, minDate, maxDate);

      // Assert
      expect(result.getTime()).toBe(maxDate.getTime());
    });

    it("should handle dates across different years", () => {
      // Arrange
      const date = new Date(2025, 5, 15);
      const minDate = new Date(2024, 5, 10);
      const maxDate = new Date(2024, 5, 20);

      // Act
      const result = clamp(date, minDate, maxDate);

      // Assert
      expect(result.getTime()).toBe(maxDate.getTime());
    });

    it("should handle epoch date (timestamp 0)", () => {
      // Arrange
      const date = new Date(0); // Epoch
      const minDate = new Date(-86400000); // 1 day before epoch
      const maxDate = new Date(86400000); // 1 day after epoch

      // Act
      const result = clamp(date, minDate, maxDate);

      // Assert
      expect(result.getTime()).toBe(0);
    });

    it("should handle BC dates (negative years)", () => {
      // Arrange
      const date = new Date(-1, 5, 15); // Year 0 (1 BC)
      const minDate = new Date(-2, 5, 10); // Year -1 (2 BC)
      const maxDate = new Date(1, 5, 20); // Year 1 AD

      // Act
      const result = clamp(date, minDate, maxDate);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });

    it("should clamp BC date to min", () => {
      // Arrange
      const date = new Date(-3, 5, 15); // Year -2 (3 BC)
      const minDate = new Date(-2, 5, 10); // Year -1 (2 BC)
      const maxDate = new Date(1, 5, 20); // Year 1 AD

      // Act
      const result = clamp(date, minDate, maxDate);

      // Assert
      expect(result.getTime()).toBe(minDate.getTime());
    });

    it("should handle very large timestamps", () => {
      // Arrange
      const timestamp = 8640000000000000 - 500; // Near Date.MAX_VALUE
      const minTimestamp = 8640000000000000 - 2000;
      const maxTimestamp = 8640000000000000 - 1000;

      // Act
      const result = clamp(timestamp, minTimestamp, maxTimestamp);

      // Assert
      expect(result.getTime()).toBe(maxTimestamp);
    });

    it("should handle very small timestamps", () => {
      // Arrange
      const timestamp = 500;
      const minTimestamp = 1000;
      const maxTimestamp = 2000;

      // Act
      const result = clamp(timestamp, minTimestamp, maxTimestamp);

      // Assert
      expect(result.getTime()).toBe(minTimestamp);
    });

    it("should handle time component within same day", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 14, 30, 0);
      const minDate = new Date(2024, 5, 15, 12, 0, 0);
      const maxDate = new Date(2024, 5, 15, 16, 0, 0);

      // Act
      const result = clamp(date, minDate, maxDate);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });

    it("should clamp time component to max within same day", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 18, 30, 0); // 6:30 PM
      const minDate = new Date(2024, 5, 15, 12, 0, 0); // 12:00 PM
      const maxDate = new Date(2024, 5, 15, 16, 0, 0); // 4:00 PM

      // Act
      const result = clamp(date, minDate, maxDate);

      // Assert
      expect(result.getTime()).toBe(maxDate.getTime());
    });

    it("should handle swapped min and max dates", () => {
      // Arrange
      const date = new Date(2024, 5, 15);
      const minDate = new Date(2024, 5, 20); // Larger than maxDate
      const maxDate = new Date(2024, 5, 10); // Smaller than minDate

      // Act
      const result = clamp(date, minDate, maxDate);

      // Assert
      // Should treat maxDate as min and minDate as max
      expect(result.getTime()).toBe(date.getTime()); // 15 is between 10 and 20
    });

    it("should clamp to correct bound when min and max are swapped", () => {
      // Arrange
      const date = new Date(2024, 5, 25); // After both bounds
      const minDate = new Date(2024, 5, 20); // Actually the max
      const maxDate = new Date(2024, 5, 10); // Actually the min

      // Act
      const result = clamp(date, minDate, maxDate);

      // Assert
      expect(result.getTime()).toBe(minDate.getTime()); // Should clamp to 20 (the actual max)
    });

    it("should always return a new Date object, not a reference", () => {
      // Arrange
      const date = new Date(2024, 5, 15);
      const minDate = new Date(2024, 5, 10);
      const maxDate = new Date(2024, 5, 20);

      // Act
      const result = clamp(date, minDate, maxDate);

      // Assert
      expect(result).not.toBe(date);
      expect(result).not.toBe(minDate);
      expect(result).not.toBe(maxDate);
      expect(result instanceof Date).toBe(true);
    });
  });

  describe("invalid inputs", () => {
    it("should return Invalid Date when input date is Invalid Date", () => {
      // Arrange
      const invalidDate = new Date("invalid");
      const minDate = new Date(2024, 5, 10);
      const maxDate = new Date(2024, 5, 20);

      // Act
      const result = clamp(invalidDate, minDate, maxDate);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when minDate is Invalid Date", () => {
      // Arrange
      const date = new Date(2024, 5, 15);
      const invalidMin = new Date("invalid");
      const maxDate = new Date(2024, 5, 20);

      // Act
      const result = clamp(date, invalidMin, maxDate);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when maxDate is Invalid Date", () => {
      // Arrange
      const date = new Date(2024, 5, 15);
      const minDate = new Date(2024, 5, 10);
      const invalidMax = new Date("invalid");

      // Act
      const result = clamp(date, minDate, invalidMax);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when timestamp is NaN", () => {
      // Arrange
      const nanTimestamp = NaN;
      const minDate = new Date(2024, 5, 10);
      const maxDate = new Date(2024, 5, 20);

      // Act
      const result = clamp(nanTimestamp, minDate, maxDate);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when minDate is NaN", () => {
      // Arrange
      const date = Date.now();
      const nanMin = NaN;
      const maxDate = Date.now() + 1000;

      // Act
      const result = clamp(date, nanMin, maxDate);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when maxDate is NaN", () => {
      // Arrange
      const date = Date.now();
      const minDate = Date.now() - 1000;
      const nanMax = NaN;

      // Act
      const result = clamp(date, minDate, nanMax);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when date is Infinity", () => {
      // Arrange
      const infinityValue = Infinity;
      const minDate = new Date(2024, 5, 10);
      const maxDate = new Date(2024, 5, 20);

      // Act
      const result = clamp(infinityValue, minDate, maxDate);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when date is -Infinity", () => {
      // Arrange
      const negInfinityValue = -Infinity;
      const minDate = new Date(2024, 5, 10);
      const maxDate = new Date(2024, 5, 20);

      // Act
      const result = clamp(negInfinityValue, minDate, maxDate);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when minDate is Infinity", () => {
      // Arrange
      const date = Date.now();
      const infinityMin = Infinity;
      const maxDate = Date.now() + 1000;

      // Act
      const result = clamp(date, infinityMin, maxDate);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when maxDate is Infinity", () => {
      // Arrange
      const date = Date.now();
      const minDate = Date.now() - 1000;
      const infinityMax = Infinity;

      // Act
      const result = clamp(date, minDate, infinityMax);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when multiple arguments are invalid", () => {
      // Arrange
      const invalidDate = NaN;
      const invalidMin = Infinity;
      const invalidMax = new Date("invalid");

      // Act
      const result = clamp(invalidDate, invalidMin, invalidMax);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });
  });
});
