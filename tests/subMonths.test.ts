import { describe, it, expect } from "vitest";
import { subMonths } from "../src/subMonths";

/**
 * Test Design for subMonths
 *
 * Function signature: subMonths(date: Date | number, amount: number): Date
 *
 * Equivalence Partitioning:
 * - Class 1: Valid Date + positive amount → Returns new Date with months subtracted
 * - Class 2: Valid Date + negative amount → Returns new Date with months added
 * - Class 3: Valid Date + zero amount → Returns same date
 * - Class 4: Valid timestamp + valid amount → Returns new Date with months subtracted
 * - Class 5: Invalid Date + valid amount → Returns Invalid Date
 * - Class 6: Valid Date + invalid amount (NaN, Infinity, -Infinity) → Returns Invalid Date
 * - Class 7: Month-end overflow adjustment → Returns last valid day of target month
 * - Class 8: Year boundary crossing → Returns correctly adjusted Date
 *
 * Boundary Value Analysis:
 * - Zero amount: Returns same date
 * - Month-end overflow backward: Mar 31 - 1 month → Feb 28/29 (adjusted to last day)
 * - Year boundary backward: Feb - 3 months → Nov previous year
 * - Year boundary forward with negative: Nov - (-2) months → Jan next year
 * - Leap year transitions: Feb 29 → Feb 28 in non-leap year
 * - Fractional amounts: Truncation behavior (floor)
 * - Large values: Subtracting many months
 *
 * Immutability Requirement:
 * - Original date must never be mutated
 */

describe("subMonths", () => {
  describe("Equivalence Class 1: Valid Date + positive amount", () => {
    it("should subtract positive months within same year", () => {
      // Arrange
      const date = new Date(2025, 6, 15);
      const amount = 3;

      // Act
      const result = subMonths(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(3);
      expect(result.getDate()).toBe(15);
    });

    it("should subtract 1 month", () => {
      // Arrange
      const date = new Date(2025, 6, 15);
      const amount = 1;

      // Act
      const result = subMonths(date, amount);

      // Assert
      expect(result.getMonth()).toBe(5);
      expect(result.getDate()).toBe(15);
    });

    it("should subtract large number of months", () => {
      // Arrange
      const date = new Date(2025, 6, 15);
      const amount = 100;

      // Act
      const result = subMonths(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2017);
      expect(result.getMonth()).toBe(2);
      expect(result.getDate()).toBe(15);
    });
  });

  describe("Equivalence Class 2: Valid Date + negative amount", () => {
    it("should add months when amount is negative", () => {
      // Arrange
      const date = new Date(2025, 3, 15);
      const amount = -2;

      // Act
      const result = subMonths(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(5);
      expect(result.getDate()).toBe(15);
    });

    it("should handle large negative amount", () => {
      // Arrange
      const date = new Date(2025, 6, 15);
      const amount = -100;

      // Act
      const result = subMonths(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2033);
      expect(result.getMonth()).toBe(10);
      expect(result.getDate()).toBe(15);
    });
  });

  describe("Equivalence Class 3: Valid Date + zero amount", () => {
    it("should return same date when subtracting zero months", () => {
      // Arrange
      const date = new Date(2025, 6, 15, 12, 30, 45, 123);
      const amount = 0;

      // Act
      const result = subMonths(date, amount);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });
  });

  describe("Equivalence Class 4: Valid timestamp + valid amount", () => {
    it("should accept timestamp input and subtract months", () => {
      // Arrange
      const date = new Date(2025, 6, 15);
      const timestamp = date.getTime();
      const amount = 4;

      // Act
      const result = subMonths(timestamp, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(2);
      expect(result.getDate()).toBe(15);
    });

    it("should accept timestamp and add months (negative amount)", () => {
      // Arrange
      const timestamp = new Date(2025, 3, 15).getTime();
      const amount = -3;

      // Act
      const result = subMonths(timestamp, amount);

      // Assert
      expect(result.getMonth()).toBe(6);
    });
  });

  describe("Equivalence Class 5: Invalid Date + valid amount", () => {
    it("should return Invalid Date when base date is invalid", () => {
      // Arrange
      const invalidDate = new Date("invalid");
      const amount = 3;

      // Act
      const result = subMonths(invalidDate, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when timestamp is NaN", () => {
      // Arrange
      const timestamp = NaN;
      const amount = 1;

      // Act
      const result = subMonths(timestamp, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });
  });

  describe("Equivalence Class 6: Valid Date + invalid amount", () => {
    it("should return Invalid Date when amount is NaN", () => {
      // Arrange
      const date = new Date(2025, 6, 15);
      const amount = NaN;

      // Act
      const result = subMonths(date, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when amount is Infinity", () => {
      // Arrange
      const date = new Date(2025, 6, 15);
      const amount = Infinity;

      // Act
      const result = subMonths(date, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when amount is -Infinity", () => {
      // Arrange
      const date = new Date(2025, 6, 15);
      const amount = -Infinity;

      // Act
      const result = subMonths(date, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });
  });

  describe("Equivalence Class 7: Month-end overflow adjustment", () => {
    it("should handle month-end overflow (Mar 31 → Feb 28 in non-leap year)", () => {
      // Arrange
      const date = new Date(2025, 2, 31);
      const amount = 1;

      // Act
      const result = subMonths(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(1);
      expect(result.getDate()).toBe(28); // Adjusted to last day of February
    });

    it("should handle month-end overflow (Mar 31 → Feb 29 in leap year)", () => {
      // Arrange
      const date = new Date(2024, 2, 31);
      const amount = 1;

      // Act
      const result = subMonths(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(1);
      expect(result.getDate()).toBe(29); // Adjusted to last day of February (leap year)
    });

    it("should handle month-end overflow (May 31 → Apr 30)", () => {
      // Arrange
      const date = new Date(2025, 4, 31);
      const amount = 1;

      // Act
      const result = subMonths(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(3);
      expect(result.getDate()).toBe(30); // Adjusted to last day of April
    });

    it("should handle month-end overflow (Jul 31 → May 31)", () => {
      // Arrange
      const date = new Date(2025, 6, 31);
      const amount = 2;

      // Act
      const result = subMonths(date, amount);

      // Assert
      expect(result.getMonth()).toBe(4);
      expect(result.getDate()).toBe(31);
    });

    it("should handle month-end overflow (Oct 31 → Sep 30 → Aug 30)", () => {
      // Arrange
      const date = new Date(2025, 9, 31);
      const amount = 2;

      // Act
      const result = subMonths(date, amount);

      // Assert
      expect(result.getMonth()).toBe(7);
      expect(result.getDate()).toBe(31);
    });
  });

  describe("Equivalence Class 7: Leap year transitions", () => {
    it("should handle non-leap year to leap year (Feb 28 → Feb 28)", () => {
      // Arrange
      const date = new Date(2025, 1, 28); // Feb 28, 2025 (non-leap year)
      const amount = 12;

      // Act
      const result = subMonths(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(1);
      expect(result.getDate()).toBe(28);
    });

    it("should handle Feb 29 → Feb 29 in another leap year", () => {
      // Arrange
      const date = new Date(2024, 1, 29);
      const amount = 48; // 4 years (2020 is also leap year)

      // Act
      const result = subMonths(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2020);
      expect(result.getMonth()).toBe(1);
      expect(result.getDate()).toBe(29);
    });
  });

  describe("Equivalence Class 8: Year boundary crossing", () => {
    it("should cross year boundary backward (Feb → Nov)", () => {
      // Arrange
      const date = new Date(2025, 1, 15);
      const amount = 3;

      // Act
      const result = subMonths(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(10);
      expect(result.getDate()).toBe(15);
    });

    it("should cross year boundary forward (Nov → Jan) with negative amount", () => {
      // Arrange
      const date = new Date(2025, 10, 15);
      const amount = -2;

      // Act
      const result = subMonths(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2026);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(15);
    });

    it("should cross multiple year boundaries backward", () => {
      // Arrange
      const date = new Date(2025, 1, 15);
      const amount = 14;

      // Act
      const result = subMonths(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2023);
      expect(result.getMonth()).toBe(11);
      expect(result.getDate()).toBe(15);
    });

    it("should cross multiple year boundaries forward with negative amount", () => {
      // Arrange
      const date = new Date(2025, 10, 15);
      const amount = -14;

      // Act
      const result = subMonths(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2027);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(15);
    });
  });

  describe("Boundary Value Analysis: Fractional amounts", () => {
    it("should truncate fractional amount (positive)", () => {
      // Arrange
      const date = new Date(2025, 3, 15);
      const amount = 1.9;

      // Act
      const result = subMonths(date, amount);

      // Assert
      expect(result.getMonth()).toBe(2); // floor(1.9) = 1 month subtracted
    });

    it("should truncate fractional amount (negative)", () => {
      // Arrange
      const date = new Date(2025, 3, 15);
      const amount = -1.9;

      // Act
      const result = subMonths(date, amount);

      // Assert
      expect(result.getMonth()).toBe(4); // floor(-1.9) = -1 month (adds 1)
    });
  });

  describe("Immutability: Original date must not be mutated", () => {
    it("should not mutate the original Date object", () => {
      // Arrange
      const original = new Date(2025, 6, 15);
      const originalTime = original.getTime();

      // Act
      subMonths(original, 4);

      // Assert
      expect(original.getTime()).toBe(originalTime);
    });

    it("should preserve all time components", () => {
      // Arrange
      const date = new Date(2025, 6, 15, 14, 30, 45, 123);
      const amount = 3;

      // Act
      const result = subMonths(date, amount);

      // Assert
      expect(result.getHours()).toBe(14);
      expect(result.getMinutes()).toBe(30);
      expect(result.getSeconds()).toBe(45);
      expect(result.getMilliseconds()).toBe(123);
    });
  });
});
