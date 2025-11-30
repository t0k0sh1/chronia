import { describe, it, expect } from "vitest";
import { subMilliseconds } from "../src/subMilliseconds";

/**
 * Test Design for subMilliseconds
 *
 * Function signature: subMilliseconds(date: Date | number, amount: number): Date
 *
 * Equivalence Partitioning:
 * - Class 1: Valid Date + positive amount → Returns new Date with milliseconds subtracted
 * - Class 2: Valid Date + negative amount → Returns new Date with milliseconds added
 * - Class 3: Valid Date + zero amount → Returns same date
 * - Class 4: Valid timestamp + valid amount → Returns new Date with milliseconds subtracted
 * - Class 5: Invalid Date + valid amount → Returns Invalid Date
 * - Class 6: Valid Date + invalid amount (NaN, Infinity, -Infinity) → Returns Invalid Date
 * - Class 7: Boundary crossing (second, minute, hour, day, month, year) → Returns correctly adjusted Date
 *
 * Boundary Value Analysis:
 * - Zero amount: Returns same date
 * - Second boundary backward: 12:00:01.000 - 1 ms → 12:00:00.999
 * - Minute boundary backward: 12:01:00.000 - 1 ms → 12:00:59.999
 * - Hour boundary backward: 13:00:00.000 - 1 ms → 12:59:59.999
 * - Day boundary backward: 00:00:00.000 - 1 ms → 23:59:59.999 previous day
 * - Month boundary backward: Feb 1 00:00:00.000 - 1 ms → Jan 31 23:59:59.999
 * - Year boundary backward: Jan 1 00:00:00.000 - 1 ms → Dec 31 23:59:59.999 previous year
 * - Fractional amounts: Truncation behavior (floor)
 * - Large values: Subtracting many milliseconds
 *
 * Immutability Requirement:
 * - Original date must never be mutated
 */

describe("subMilliseconds", () => {
  describe("Equivalence Class 1: Valid Date + positive amount", () => {
    it("should subtract positive milliseconds within same second", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 0, 0, 500);
      const amount = 300;

      // Act
      const result = subMilliseconds(date, amount);

      // Assert
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(200);
    });

    it("should subtract 1 millisecond", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 0, 0, 100);
      const amount = 1;

      // Act
      const result = subMilliseconds(date, amount);

      // Assert
      expect(result.getMilliseconds()).toBe(99);
    });

    it("should subtract large number of milliseconds", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 0, 0, 0);
      const amount = 1000000;

      // Act
      const result = subMilliseconds(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(15);
      expect(result.getHours()).toBe(11);
      expect(result.getMinutes()).toBe(43);
      expect(result.getSeconds()).toBe(20);
      expect(result.getMilliseconds()).toBe(0);
    });
  });

  describe("Equivalence Class 2: Valid Date + negative amount", () => {
    it("should add milliseconds when amount is negative", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 0, 0, 200);
      const amount = -300;

      // Act
      const result = subMilliseconds(date, amount);

      // Assert
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(500);
    });

    it("should handle large negative amount", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 0, 0, 0);
      const amount = -1000000;

      // Act
      const result = subMilliseconds(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(15);
      expect(result.getHours()).toBe(12);
      expect(result.getMinutes()).toBe(16);
      expect(result.getSeconds()).toBe(40);
      expect(result.getMilliseconds()).toBe(0);
    });
  });

  describe("Equivalence Class 3: Valid Date + zero amount", () => {
    it("should return same date when subtracting zero milliseconds", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 0, 0, 100);
      const amount = 0;

      // Act
      const result = subMilliseconds(date, amount);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });
  });

  describe("Equivalence Class 4: Valid timestamp + valid amount", () => {
    it("should accept timestamp input and subtract milliseconds", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 0, 0, 500);
      const timestamp = date.getTime();
      const amount = 250;

      // Act
      const result = subMilliseconds(timestamp, amount);

      // Assert
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(250);
    });

    it("should accept timestamp and add milliseconds (negative amount)", () => {
      // Arrange
      const timestamp = new Date(2025, 0, 15, 12, 0, 0, 200).getTime();
      const amount = -300;

      // Act
      const result = subMilliseconds(timestamp, amount);

      // Assert
      expect(result.getMilliseconds()).toBe(500);
    });
  });

  describe("Equivalence Class 5: Invalid Date + valid amount", () => {
    it("should return Invalid Date when base date is invalid", () => {
      // Arrange
      const invalidDate = new Date("invalid");
      const amount = 500;

      // Act
      const result = subMilliseconds(invalidDate, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when timestamp is NaN", () => {
      // Arrange
      const timestamp = NaN;
      const amount = 1;

      // Act
      const result = subMilliseconds(timestamp, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });
  });

  describe("Equivalence Class 6: Valid Date + invalid amount", () => {
    it("should return Invalid Date when amount is NaN", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 0, 0, 0);
      const amount = NaN;

      // Act
      const result = subMilliseconds(date, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when amount is Infinity", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 0, 0, 0);
      const amount = Infinity;

      // Act
      const result = subMilliseconds(date, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when amount is -Infinity", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 0, 0, 0);
      const amount = -Infinity;

      // Act
      const result = subMilliseconds(date, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });
  });

  describe("Equivalence Class 7: Boundary crossing - Second boundaries", () => {
    it("should cross second boundary backward (12:00:01.000 - 1 ms → 12:00:00.999)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 0, 1, 0);
      const amount = 1;

      // Act
      const result = subMilliseconds(date, amount);

      // Assert
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(999);
    });

    it("should cross second boundary forward (12:00:00.999 - (-1) ms → 12:00:01.000)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 0, 0, 999);
      const amount = -1;

      // Act
      const result = subMilliseconds(date, amount);

      // Assert
      expect(result.getSeconds()).toBe(1);
      expect(result.getMilliseconds()).toBe(0);
    });
  });

  describe("Equivalence Class 7: Boundary crossing - Minute/Hour boundaries", () => {
    it("should cross minute boundary backward (12:01:00.000 - 1 ms → 12:00:59.999)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 1, 0, 0);
      const amount = 1;

      // Act
      const result = subMilliseconds(date, amount);

      // Assert
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(59);
      expect(result.getMilliseconds()).toBe(999);
    });

    it("should cross hour boundary backward (13:00:00.000 - 1 ms → 12:59:59.999)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 13, 0, 0, 0);
      const amount = 1;

      // Act
      const result = subMilliseconds(date, amount);

      // Assert
      expect(result.getHours()).toBe(12);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
      expect(result.getMilliseconds()).toBe(999);
    });
  });

  describe("Equivalence Class 7: Boundary crossing - Day/Month/Year boundaries", () => {
    it("should cross day boundary backward (00:00:00.000 - 1 ms → 23:59:59.999 previous day)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 0, 0, 0, 0);
      const amount = 1;

      // Act
      const result = subMilliseconds(date, amount);

      // Assert
      expect(result.getDate()).toBe(14);
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
      expect(result.getMilliseconds()).toBe(999);
    });

    it("should cross month boundary backward (Feb 1 00:00:00.000 - 1 ms → Jan 31 23:59:59.999)", () => {
      // Arrange
      const date = new Date(2025, 1, 1, 0, 0, 0, 0);
      const amount = 1;

      // Act
      const result = subMilliseconds(date, amount);

      // Assert
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(31);
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
      expect(result.getMilliseconds()).toBe(999);
    });

    it("should cross year boundary backward (Jan 1 00:00:00.000 - 1 ms → Dec 31 23:59:59.999)", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 0, 0, 0, 0);
      const amount = 1;

      // Act
      const result = subMilliseconds(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(11);
      expect(result.getDate()).toBe(31);
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
      expect(result.getMilliseconds()).toBe(999);
    });
  });

  describe("Boundary Value Analysis: Fractional amounts", () => {
    it("should truncate fractional amount (positive)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 0, 0, 100);
      const amount = 1.9;

      // Act
      const result = subMilliseconds(date, amount);

      // Assert
      expect(result.getMilliseconds()).toBe(99); // floor(1.9) = 1 millisecond subtracted
    });

    it("should truncate fractional amount (negative)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 0, 0, 100);
      const amount = -2.7;

      // Act
      const result = subMilliseconds(date, amount);

      // Assert
      expect(result.getMilliseconds()).toBe(102); // floor(-2.7) = -2 milliseconds (adds 2)
    });
  });

  describe("Immutability: Original date must not be mutated", () => {
    it("should not mutate the original Date object", () => {
      // Arrange
      const original = new Date(2025, 0, 15, 12, 0, 0, 500);
      const originalTime = original.getTime();

      // Act
      subMilliseconds(original, 300);

      // Assert
      expect(original.getTime()).toBe(originalTime);
    });

    it("should preserve all time components of original date", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 0, 0, 500);
      const originalTime = date.getTime();
      const amount = 300;

      // Act
      const result = subMilliseconds(date, amount);

      // Assert
      expect(date.getTime()).toBe(originalTime);
      expect(result.getTime()).not.toBe(originalTime);
    });
  });
});
