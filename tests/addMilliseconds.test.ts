import { describe, it, expect } from "vitest";
import { addMilliseconds } from "../src/addMilliseconds";

/**
 * Test Design for addMilliseconds
 *
 * Function signature: addMilliseconds(date: Date | number, amount: number): Date
 *
 * Equivalence Partitioning:
 * - Class 1: Valid Date + positive amount → Returns new Date with milliseconds added
 * - Class 2: Valid Date + negative amount → Returns new Date with milliseconds subtracted
 * - Class 3: Valid Date + zero amount → Returns same date
 * - Class 4: Valid timestamp + valid amount → Returns new Date with milliseconds added
 * - Class 5: Invalid Date + valid amount → Returns Invalid Date
 * - Class 6: Valid Date + invalid amount (NaN, Infinity, -Infinity) → Returns Invalid Date
 * - Class 7: Boundary crossing (second, minute, hour, day, month, year) → Returns correctly adjusted Date
 *
 * Boundary Value Analysis:
 * - Zero amount: Returns same date
 * - Second boundary: 12:00:00.999 + 1 ms → 12:00:01.000
 * - Minute boundary: 12:00:59.999 + 1 ms → 12:01:00.000
 * - Hour boundary: 12:59:59.999 + 1 ms → 13:00:00.000
 * - Day boundary: 23:59:59.999 + 1 ms → 00:00:00.000 next day
 * - Month boundary: Jan 31 23:59:59.999 + 1 ms → Feb 1 00:00:00.000
 * - Year boundary: Dec 31 23:59:59.999 + 1 ms → Jan 1 00:00:00.000 next year
 * - Fractional amounts: Truncation behavior (floor)
 * - Large values: Adding/subtracting many milliseconds
 *
 * Immutability Requirement:
 * - Original date must never be mutated
 */

describe("addMilliseconds", () => {
  describe("Equivalence Class 1: Valid Date + positive amount", () => {
    it("should add positive milliseconds within same second", () => {
      // Arrange
      const date = new Date(2020, 5, 15, 12, 0, 0, 0);
      const amount = 500;

      // Act
      const result = addMilliseconds(date, amount);

      // Assert
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(500);
    });

    it("should add 1 millisecond", () => {
      // Arrange
      const date = new Date(2020, 5, 15, 12, 0, 0, 0);
      const amount = 1;

      // Act
      const result = addMilliseconds(date, amount);

      // Assert
      expect(result.getMilliseconds()).toBe(1);
    });

    it("should add large number of milliseconds", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 0, 0, 0, 0);
      const amount = 1000000;

      // Act
      const result = addMilliseconds(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(1);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(16);
      expect(result.getSeconds()).toBe(40);
      expect(result.getMilliseconds()).toBe(0);
    });
  });

  describe("Equivalence Class 2: Valid Date + negative amount", () => {
    it("should subtract milliseconds when amount is negative", () => {
      // Arrange
      const date = new Date(2025, 8, 10, 15, 0, 0, 500);
      const amount = -300;

      // Act
      const result = addMilliseconds(date, amount);

      // Assert
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(200);
    });

    it("should handle large negative amount", () => {
      // Arrange
      const date = new Date(2025, 0, 10, 0, 0, 0, 0);
      const amount = -1000000;

      // Act
      const result = addMilliseconds(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(9);
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(43);
      expect(result.getSeconds()).toBe(20);
      expect(result.getMilliseconds()).toBe(0);
    });
  });

  describe("Equivalence Class 3: Valid Date + zero amount", () => {
    it("should return same date when adding zero milliseconds", () => {
      // Arrange
      const date = new Date(2025, 3, 20, 10, 0, 0, 100);
      const amount = 0;

      // Act
      const result = addMilliseconds(date, amount);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });
  });

  describe("Equivalence Class 4: Valid timestamp + valid amount", () => {
    it("should accept timestamp input and add milliseconds", () => {
      // Arrange
      const date = new Date(2020, 6, 15, 12, 0, 0, 0);
      const timestamp = date.getTime();
      const amount = 500;

      // Act
      const result = addMilliseconds(timestamp, amount);

      // Assert
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(500);
    });

    it("should accept timestamp and subtract milliseconds (negative amount)", () => {
      // Arrange
      const timestamp = new Date(2020, 6, 15, 12, 0, 0, 500).getTime();
      const amount = -300;

      // Act
      const result = addMilliseconds(timestamp, amount);

      // Assert
      expect(result.getMilliseconds()).toBe(200);
    });
  });

  describe("Equivalence Class 5: Invalid Date + valid amount", () => {
    it("should return Invalid Date when base date is invalid", () => {
      // Arrange
      const invalidDate = new Date("invalid");
      const amount = 500;

      // Act
      const result = addMilliseconds(invalidDate, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when timestamp is NaN", () => {
      // Arrange
      const timestamp = NaN;
      const amount = 1;

      // Act
      const result = addMilliseconds(timestamp, amount);

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
      const result = addMilliseconds(date, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when amount is Infinity", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 0, 0, 0);
      const amount = Infinity;

      // Act
      const result = addMilliseconds(date, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when amount is -Infinity", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 0, 0, 0);
      const amount = -Infinity;

      // Act
      const result = addMilliseconds(date, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });
  });

  describe("Equivalence Class 7: Boundary crossing - Second boundaries", () => {
    it("should cross second boundary forward (12:00:00.999 + 1 ms → 12:00:01.000)", () => {
      // Arrange
      const date = new Date(2020, 0, 1, 12, 0, 0, 999);
      const amount = 1;

      // Act
      const result = addMilliseconds(date, amount);

      // Assert
      expect(result.getSeconds()).toBe(1);
      expect(result.getMilliseconds()).toBe(0);
    });

    it("should cross second boundary backward (12:00:01.000 - 1 ms → 12:00:00.999)", () => {
      // Arrange
      const date = new Date(2020, 0, 1, 12, 0, 1, 0);
      const amount = -1;

      // Act
      const result = addMilliseconds(date, amount);

      // Assert
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(999);
    });
  });

  describe("Equivalence Class 7: Boundary crossing - Minute/Hour boundaries", () => {
    it("should cross minute boundary forward (12:00:59.999 + 1 ms → 12:01:00.000)", () => {
      // Arrange
      const date = new Date(2020, 0, 1, 12, 0, 59, 999);
      const amount = 1;

      // Act
      const result = addMilliseconds(date, amount);

      // Assert
      expect(result.getMinutes()).toBe(1);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });

    it("should cross hour boundary forward (12:59:59.999 + 1 ms → 13:00:00.000)", () => {
      // Arrange
      const date = new Date(2020, 0, 1, 12, 59, 59, 999);
      const amount = 1;

      // Act
      const result = addMilliseconds(date, amount);

      // Assert
      expect(result.getHours()).toBe(13);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });
  });

  describe("Equivalence Class 7: Boundary crossing - Day/Month/Year boundaries", () => {
    it("should cross day boundary forward (23:59:59.999 + 1 ms → 00:00:00.000 next day)", () => {
      // Arrange
      const date = new Date(2020, 0, 1, 23, 59, 59, 999);
      const amount = 1;

      // Act
      const result = addMilliseconds(date, amount);

      // Assert
      expect(result.getDate()).toBe(2);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });

    it("should cross month boundary forward (Jan 31 23:59:59.999 + 1 ms → Feb 1 00:00:00.000)", () => {
      // Arrange
      const date = new Date(2020, 0, 31, 23, 59, 59, 999);
      const amount = 1;

      // Act
      const result = addMilliseconds(date, amount);

      // Assert
      expect(result.getMonth()).toBe(1);
      expect(result.getDate()).toBe(1);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });

    it("should cross year boundary forward (Dec 31 23:59:59.999 + 1 ms → Jan 1 00:00:00.000)", () => {
      // Arrange
      const date = new Date(2020, 11, 31, 23, 59, 59, 999);
      const amount = 1;

      // Act
      const result = addMilliseconds(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2021);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(1);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });
  });

  describe("Boundary Value Analysis: Fractional amounts", () => {
    it("should truncate fractional amount (positive)", () => {
      // Arrange
      const date = new Date(2020, 0, 1, 12, 0, 0, 0);
      const amount = 1.9;

      // Act
      const result = addMilliseconds(date, amount);

      // Assert
      expect(result.getMilliseconds()).toBe(1); // floor(1.9) = 1 millisecond added
    });

    it("should truncate fractional amount (negative)", () => {
      // Arrange
      const date = new Date(2020, 0, 1, 12, 0, 0, 100);
      const amount = -2.7;

      // Act
      const result = addMilliseconds(date, amount);

      // Assert
      expect(result.getMilliseconds()).toBe(98); // floor(-2.7) = -2 milliseconds
    });
  });

  describe("Immutability: Original date must not be mutated", () => {
    it("should not mutate the original Date object", () => {
      // Arrange
      const original = new Date(2020, 5, 15, 12, 0, 0, 0);
      const originalTime = original.getTime();

      // Act
      addMilliseconds(original, 500);

      // Assert
      expect(original.getTime()).toBe(originalTime);
    });

    it("should preserve all time components of original date", () => {
      // Arrange
      const date = new Date(2020, 5, 15, 12, 0, 0, 123);
      const originalTime = date.getTime();
      const amount = 500;

      // Act
      const result = addMilliseconds(date, amount);

      // Assert
      expect(date.getTime()).toBe(originalTime);
      expect(result.getTime()).not.toBe(originalTime);
    });
  });
});
