import { describe, it, expect } from "vitest";
import { subSeconds } from "../src/subSeconds";

/**
 * Test Design for subSeconds
 *
 * Function signature: subSeconds(date: Date | number, amount: number): Date
 *
 * Equivalence Partitioning:
 * - Class 1: Valid Date + positive amount → Returns new Date with seconds subtracted
 * - Class 2: Valid Date + negative amount → Returns new Date with seconds added
 * - Class 3: Valid Date + zero amount → Returns same date
 * - Class 4: Valid timestamp + valid amount → Returns new Date with seconds subtracted
 * - Class 5: Invalid Date + valid amount → Returns Invalid Date
 * - Class 6: Valid Date + invalid amount (NaN, Infinity, -Infinity) → Returns Invalid Date
 * - Class 7: Boundary crossing (minute, hour, day) → Returns correctly adjusted Date
 *
 * Boundary Value Analysis:
 * - Zero amount: Returns same date
 * - Minute boundary backward: 12:31:15 - 30 seconds → 12:30:45
 * - Hour boundary backward: 13:00:15 - 30 seconds → 12:59:45
 * - Day boundary backward: 00:00:15 - 30 seconds → 23:59:45 previous day
 * - Fractional amounts: Truncation behavior (floor)
 * - Large values: Subtracting many seconds
 * - Preserve lower time units: Milliseconds
 *
 * Immutability Requirement:
 * - Original date must never be mutated
 */

describe("subSeconds", () => {
  describe("Equivalence Class 1: Valid Date + positive amount", () => {
    it("should subtract positive seconds within same minute", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45);
      const amount = 20;

      // Act
      const result = subSeconds(date, amount);

      // Assert
      expect(result.getMinutes()).toBe(30);
      expect(result.getSeconds()).toBe(25);
    });

    it("should subtract 1 second", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 30);
      const amount = 1;

      // Act
      const result = subSeconds(date, amount);

      // Assert
      expect(result.getSeconds()).toBe(29);
    });

    it("should subtract large number of seconds", () => {
      // Arrange
      const date = new Date(2025, 0, 2, 3, 46, 40);
      const amount = 100000;

      // Act
      const result = subSeconds(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(1);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
    });
  });

  describe("Equivalence Class 2: Valid Date + negative amount", () => {
    it("should add seconds when amount is negative", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 15);
      const amount = -20;

      // Act
      const result = subSeconds(date, amount);

      // Assert
      expect(result.getMinutes()).toBe(30);
      expect(result.getSeconds()).toBe(35);
    });

    it("should handle large negative amount", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 0, 0, 0);
      const amount = -100000;

      // Act
      const result = subSeconds(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(2);
      expect(result.getHours()).toBe(3);
      expect(result.getMinutes()).toBe(46);
      expect(result.getSeconds()).toBe(40);
    });
  });

  describe("Equivalence Class 3: Valid Date + zero amount", () => {
    it("should return same date when subtracting zero seconds", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 14, 30, 45, 123);
      const amount = 0;

      // Act
      const result = subSeconds(date, amount);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });
  });

  describe("Equivalence Class 4: Valid timestamp + valid amount", () => {
    it("should accept timestamp input and subtract seconds", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 31, 0);
      const timestamp = date.getTime();
      const amount = 45;

      // Act
      const result = subSeconds(timestamp, amount);

      // Assert
      expect(result.getMinutes()).toBe(30);
      expect(result.getSeconds()).toBe(15);
    });

    it("should accept timestamp and add seconds (negative amount)", () => {
      // Arrange
      const timestamp = new Date(2025, 0, 15, 12, 30, 15).getTime();
      const amount = -30;

      // Act
      const result = subSeconds(timestamp, amount);

      // Assert
      expect(result.getSeconds()).toBe(45);
    });
  });

  describe("Equivalence Class 5: Invalid Date + valid amount", () => {
    it("should return Invalid Date when base date is invalid", () => {
      // Arrange
      const invalidDate = new Date("invalid");
      const amount = 30;

      // Act
      const result = subSeconds(invalidDate, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when timestamp is NaN", () => {
      // Arrange
      const timestamp = NaN;
      const amount = 1;

      // Act
      const result = subSeconds(timestamp, amount);

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
      const result = subSeconds(date, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when amount is Infinity", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 0, 0);
      const amount = Infinity;

      // Act
      const result = subSeconds(date, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when amount is -Infinity", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 0, 0);
      const amount = -Infinity;

      // Act
      const result = subSeconds(date, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });
  });

  describe("Equivalence Class 7: Boundary crossing - Minute boundaries", () => {
    it("should cross minute boundary backward (12:31:15 - 30 seconds → 12:30:45)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 31, 15);
      const amount = 30;

      // Act
      const result = subSeconds(date, amount);

      // Assert
      expect(result.getMinutes()).toBe(30);
      expect(result.getSeconds()).toBe(45);
    });

    it("should cross minute boundary forward (12:30:45 - (-30) seconds → 12:31:15)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45);
      const amount = -30;

      // Act
      const result = subSeconds(date, amount);

      // Assert
      expect(result.getMinutes()).toBe(31);
      expect(result.getSeconds()).toBe(15);
    });
  });

  describe("Equivalence Class 7: Boundary crossing - Hour/Day boundaries", () => {
    it("should cross hour boundary backward (13:00:15 - 30 seconds → 12:59:45)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 13, 0, 15);
      const amount = 30;

      // Act
      const result = subSeconds(date, amount);

      // Assert
      expect(result.getHours()).toBe(12);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(45);
    });

    it("should cross day boundary backward (00:00:15 - 30 seconds → 23:59:45 previous day)", () => {
      // Arrange
      const date = new Date(2025, 0, 2, 0, 0, 15);
      const amount = 30;

      // Act
      const result = subSeconds(date, amount);

      // Assert
      expect(result.getDate()).toBe(1);
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(45);
    });
  });

  describe("Boundary Value Analysis: Fractional amounts", () => {
    it("should truncate fractional amount (positive)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 0, 30);
      const amount = 1.9;

      // Act
      const result = subSeconds(date, amount);

      // Assert
      expect(result.getSeconds()).toBe(29); // floor(1.9) = 1 second subtracted
    });

    it("should truncate fractional amount (negative)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 0, 0);
      const amount = -1.9;

      // Act
      const result = subSeconds(date, amount);

      // Assert
      expect(result.getSeconds()).toBe(1); // floor(-1.9) = -1 second (adds 1)
    });
  });

  describe("Boundary Value Analysis: Preserve lower time units", () => {
    it("should preserve milliseconds", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45, 123);
      const amount = 30;

      // Act
      const result = subSeconds(date, amount);

      // Assert
      expect(result.getSeconds()).toBe(15);
      expect(result.getMilliseconds()).toBe(123);
    });
  });

  describe("Immutability: Original date must not be mutated", () => {
    it("should not mutate the original Date object", () => {
      // Arrange
      const original = new Date(2025, 0, 15, 12, 31, 15);
      const originalTime = original.getTime();

      // Act
      subSeconds(original, 30);

      // Assert
      expect(original.getTime()).toBe(originalTime);
    });

    it("should preserve all time components of original date", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 31, 15, 123);
      const originalTime = date.getTime();
      const amount = 30;

      // Act
      const result = subSeconds(date, amount);

      // Assert
      expect(date.getTime()).toBe(originalTime);
      expect(result.getTime()).not.toBe(originalTime);
    });
  });
});
