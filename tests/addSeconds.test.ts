import { describe, it, expect } from "vitest";
import { addSeconds } from "../src/addSeconds";

/**
 * Test Design for addSeconds
 *
 * Function signature: addSeconds(date: Date | number, amount: number): Date
 *
 * Equivalence Partitioning:
 * - Class 1: Valid Date + positive amount → Returns new Date with seconds added
 * - Class 2: Valid Date + negative amount → Returns new Date with seconds subtracted
 * - Class 3: Valid Date + zero amount → Returns same date
 * - Class 4: Valid timestamp + valid amount → Returns new Date with seconds added
 * - Class 5: Invalid Date + valid amount → Returns Invalid Date
 * - Class 6: Valid Date + invalid amount (NaN, Infinity, -Infinity) → Returns Invalid Date
 * - Class 7: Boundary crossing (minute, hour, day) → Returns correctly adjusted Date
 *
 * Boundary Value Analysis:
 * - Zero amount: Returns same date
 * - Minute boundary: 12:30:45 + 30 seconds → 12:31:15
 * - Hour boundary: 12:59:45 + 30 seconds → 13:00:15
 * - Day boundary: 23:59:45 + 30 seconds → 00:00:15 next day
 * - Fractional amounts: Truncation behavior (floor)
 * - Large values: Adding/subtracting many seconds
 * - Preserve lower time units: Milliseconds
 *
 * Immutability Requirement:
 * - Original date must never be mutated
 */

describe("addSeconds", () => {
  describe("Equivalence Class 1: Valid Date + positive amount", () => {
    it("should add positive seconds within same minute", () => {
      // Arrange
      const date = new Date(2020, 5, 15, 12, 30, 15);
      const amount = 20;

      // Act
      const result = addSeconds(date, amount);

      // Assert
      expect(result.getMinutes()).toBe(30);
      expect(result.getSeconds()).toBe(35);
    });

    it("should add 1 second", () => {
      // Arrange
      const date = new Date(2020, 5, 15, 12, 30, 15);
      const amount = 1;

      // Act
      const result = addSeconds(date, amount);

      // Assert
      expect(result.getSeconds()).toBe(16);
    });

    it("should add large number of seconds", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 0, 0, 0);
      const amount = 100000;

      // Act
      const result = addSeconds(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(2);
      expect(result.getHours()).toBe(3);
      expect(result.getMinutes()).toBe(46);
      expect(result.getSeconds()).toBe(40);
    });
  });

  describe("Equivalence Class 2: Valid Date + negative amount", () => {
    it("should subtract seconds when amount is negative", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45);
      const amount = -20;

      // Act
      const result = addSeconds(date, amount);

      // Assert
      expect(result.getMinutes()).toBe(30);
      expect(result.getSeconds()).toBe(25);
    });

    it("should handle large negative amount", () => {
      // Arrange
      const date = new Date(2025, 0, 2, 3, 46, 40);
      const amount = -100000;

      // Act
      const result = addSeconds(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(1);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
    });
  });

  describe("Equivalence Class 3: Valid Date + zero amount", () => {
    it("should return same date when adding zero seconds", () => {
      // Arrange
      const date = new Date(2025, 3, 20, 10, 30, 45, 123);
      const amount = 0;

      // Act
      const result = addSeconds(date, amount);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });
  });

  describe("Equivalence Class 4: Valid timestamp + valid amount", () => {
    it("should accept timestamp input and add seconds", () => {
      // Arrange
      const date = new Date(2020, 6, 15, 12, 30, 15);
      const timestamp = date.getTime();
      const amount = 45;

      // Act
      const result = addSeconds(timestamp, amount);

      // Assert
      expect(result.getMinutes()).toBe(31);
      expect(result.getSeconds()).toBe(0);
    });

    it("should accept timestamp and subtract seconds (negative amount)", () => {
      // Arrange
      const timestamp = new Date(2020, 6, 15, 12, 31, 0).getTime();
      const amount = -30;

      // Act
      const result = addSeconds(timestamp, amount);

      // Assert
      expect(result.getSeconds()).toBe(30);
    });
  });

  describe("Equivalence Class 5: Invalid Date + valid amount", () => {
    it("should return Invalid Date when base date is invalid", () => {
      // Arrange
      const invalidDate = new Date("invalid");
      const amount = 30;

      // Act
      const result = addSeconds(invalidDate, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when timestamp is NaN", () => {
      // Arrange
      const timestamp = NaN;
      const amount = 1;

      // Act
      const result = addSeconds(timestamp, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });
  });

  describe("Equivalence Class 6: Valid Date + invalid amount", () => {
    it("should return Invalid Date when amount is NaN", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 0, 0);
      const amount = NaN;

      // Act
      const result = addSeconds(date, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when amount is Infinity", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 0, 0);
      const amount = Infinity;

      // Act
      const result = addSeconds(date, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when amount is -Infinity", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 0, 0);
      const amount = -Infinity;

      // Act
      const result = addSeconds(date, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });
  });

  describe("Equivalence Class 7: Boundary crossing - Minute boundaries", () => {
    it("should cross minute boundary forward (12:30:45 + 30 seconds → 12:31:15)", () => {
      // Arrange
      const date = new Date(2020, 0, 1, 12, 30, 45);
      const amount = 30;

      // Act
      const result = addSeconds(date, amount);

      // Assert
      expect(result.getMinutes()).toBe(31);
      expect(result.getSeconds()).toBe(15);
    });

    it("should cross minute boundary backward (12:31:15 - 30 seconds → 12:30:45)", () => {
      // Arrange
      const date = new Date(2020, 0, 1, 12, 31, 15);
      const amount = -30;

      // Act
      const result = addSeconds(date, amount);

      // Assert
      expect(result.getMinutes()).toBe(30);
      expect(result.getSeconds()).toBe(45);
    });
  });

  describe("Equivalence Class 7: Boundary crossing - Hour/Day boundaries", () => {
    it("should cross hour boundary forward (12:59:45 + 30 seconds → 13:00:15)", () => {
      // Arrange
      const date = new Date(2020, 0, 1, 12, 59, 45);
      const amount = 30;

      // Act
      const result = addSeconds(date, amount);

      // Assert
      expect(result.getHours()).toBe(13);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(15);
    });

    it("should cross day boundary forward (23:59:45 + 30 seconds → 00:00:15 next day)", () => {
      // Arrange
      const date = new Date(2020, 0, 1, 23, 59, 45);
      const amount = 30;

      // Act
      const result = addSeconds(date, amount);

      // Assert
      expect(result.getDate()).toBe(2);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(15);
    });
  });

  describe("Boundary Value Analysis: Fractional amounts", () => {
    it("should truncate fractional amount (positive)", () => {
      // Arrange
      const date = new Date(2020, 0, 1, 12, 0, 0);
      const amount = 1.9;

      // Act
      const result = addSeconds(date, amount);

      // Assert
      expect(result.getSeconds()).toBe(1); // floor(1.9) = 1 second added
    });

    it("should truncate fractional amount (negative)", () => {
      // Arrange
      const date = new Date(2020, 0, 1, 12, 0, 30);
      const amount = -1.9;

      // Act
      const result = addSeconds(date, amount);

      // Assert
      expect(result.getSeconds()).toBe(29); // floor(-1.9) = -1 second
    });
  });

  describe("Boundary Value Analysis: Preserve lower time units", () => {
    it("should preserve milliseconds", () => {
      // Arrange
      const date = new Date(2020, 5, 15, 12, 30, 15, 123);
      const amount = 30;

      // Act
      const result = addSeconds(date, amount);

      // Assert
      expect(result.getSeconds()).toBe(45);
      expect(result.getMilliseconds()).toBe(123);
    });
  });

  describe("Immutability: Original date must not be mutated", () => {
    it("should not mutate the original Date object", () => {
      // Arrange
      const original = new Date(2020, 5, 15, 12, 30, 15);
      const originalTime = original.getTime();

      // Act
      addSeconds(original, 30);

      // Assert
      expect(original.getTime()).toBe(originalTime);
    });

    it("should preserve all time components of original date", () => {
      // Arrange
      const date = new Date(2020, 5, 15, 12, 30, 15, 123);
      const originalTime = date.getTime();
      const amount = 30;

      // Act
      const result = addSeconds(date, amount);

      // Assert
      expect(date.getTime()).toBe(originalTime);
      expect(result.getTime()).not.toBe(originalTime);
    });
  });
});
