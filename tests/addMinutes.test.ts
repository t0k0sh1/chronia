import { describe, it, expect } from "vitest";
import { addMinutes } from "../src/addMinutes";

/**
 * Test Design for addMinutes
 *
 * Function signature: addMinutes(date: Date | number, amount: number): Date
 *
 * Equivalence Partitioning:
 * - Class 1: Valid Date + positive amount → Returns new Date with minutes added
 * - Class 2: Valid Date + negative amount → Returns new Date with minutes subtracted
 * - Class 3: Valid Date + zero amount → Returns same date
 * - Class 4: Valid timestamp + valid amount → Returns new Date with minutes added
 * - Class 5: Invalid Date + valid amount → Returns Invalid Date
 * - Class 6: Valid Date + invalid amount (NaN, Infinity, -Infinity) → Returns Invalid Date
 * - Class 7: Boundary crossing (hour, day, month, year) → Returns correctly adjusted Date
 *
 * Boundary Value Analysis:
 * - Zero amount: Returns same date
 * - Hour boundary: 12:45 + 30 minutes → 13:15
 * - Day boundary: 23:45 + 30 minutes → 00:15 next day
 * - Month boundary: Jan 31 23:45 + 30 minutes → Feb 1 00:15
 * - Year boundary: Dec 31 23:45 + 30 minutes → Jan 1 00:15 next year
 * - Fractional amounts: Truncation behavior (floor)
 * - Large values: Adding/subtracting many minutes
 * - Preserve lower time units: Seconds, milliseconds
 *
 * Immutability Requirement:
 * - Original date must never be mutated
 */

describe("addMinutes", () => {
  describe("Equivalence Class 1: Valid Date + positive amount", () => {
    it("should add positive minutes within same hour", () => {
      // Arrange
      const date = new Date(2020, 5, 15, 12, 30, 0);
      const amount = 15;

      // Act
      const result = addMinutes(date, amount);

      // Assert
      expect(result.getHours()).toBe(12);
      expect(result.getMinutes()).toBe(45);
    });

    it("should add 1 minute", () => {
      // Arrange
      const date = new Date(2020, 5, 15, 12, 30, 0);
      const amount = 1;

      // Act
      const result = addMinutes(date, amount);

      // Assert
      expect(result.getMinutes()).toBe(31);
    });

    it("should add large number of minutes", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 0, 0, 0);
      const amount = 10000;

      // Act
      const result = addMinutes(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(7);
      expect(result.getHours()).toBe(22);
      expect(result.getMinutes()).toBe(40);
    });
  });

  describe("Equivalence Class 2: Valid Date + negative amount", () => {
    it("should subtract minutes when amount is negative", () => {
      // Arrange
      const date = new Date(2025, 8, 10, 15, 45, 0);
      const amount = -30;

      // Act
      const result = addMinutes(date, amount);

      // Assert
      expect(result.getHours()).toBe(15);
      expect(result.getMinutes()).toBe(15);
    });

    it("should handle large negative amount", () => {
      // Arrange
      const date = new Date(2025, 0, 7, 22, 40, 0);
      const amount = -10000;

      // Act
      const result = addMinutes(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(1);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
    });
  });

  describe("Equivalence Class 3: Valid Date + zero amount", () => {
    it("should return same date when adding zero minutes", () => {
      // Arrange
      const date = new Date(2025, 3, 20, 10, 30, 45, 123);
      const amount = 0;

      // Act
      const result = addMinutes(date, amount);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });
  });

  describe("Equivalence Class 4: Valid timestamp + valid amount", () => {
    it("should accept timestamp input and add minutes", () => {
      // Arrange
      const date = new Date(2020, 6, 15, 12, 30, 0);
      const timestamp = date.getTime();
      const amount = 45;

      // Act
      const result = addMinutes(timestamp, amount);

      // Assert
      expect(result.getHours()).toBe(13);
      expect(result.getMinutes()).toBe(15);
    });

    it("should accept timestamp and subtract minutes (negative amount)", () => {
      // Arrange
      const timestamp = new Date(2020, 6, 15, 13, 15, 0).getTime();
      const amount = -30;

      // Act
      const result = addMinutes(timestamp, amount);

      // Assert
      expect(result.getMinutes()).toBe(45);
    });
  });

  describe("Equivalence Class 5: Invalid Date + valid amount", () => {
    it("should return Invalid Date when base date is invalid", () => {
      // Arrange
      const invalidDate = new Date("invalid");
      const amount = 15;

      // Act
      const result = addMinutes(invalidDate, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when timestamp is NaN", () => {
      // Arrange
      const timestamp = NaN;
      const amount = 1;

      // Act
      const result = addMinutes(timestamp, amount);

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
      const result = addMinutes(date, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when amount is Infinity", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 0, 0);
      const amount = Infinity;

      // Act
      const result = addMinutes(date, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when amount is -Infinity", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 0, 0);
      const amount = -Infinity;

      // Act
      const result = addMinutes(date, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });
  });

  describe("Equivalence Class 7: Boundary crossing - Hour boundaries", () => {
    it("should cross hour boundary forward (12:45 + 30 minutes → 13:15)", () => {
      // Arrange
      const date = new Date(2020, 0, 1, 12, 45, 0);
      const amount = 30;

      // Act
      const result = addMinutes(date, amount);

      // Assert
      expect(result.getHours()).toBe(13);
      expect(result.getMinutes()).toBe(15);
    });

    it("should cross hour boundary backward (13:15 - 30 minutes → 12:45)", () => {
      // Arrange
      const date = new Date(2020, 0, 1, 13, 15, 0);
      const amount = -30;

      // Act
      const result = addMinutes(date, amount);

      // Assert
      expect(result.getHours()).toBe(12);
      expect(result.getMinutes()).toBe(45);
    });
  });

  describe("Equivalence Class 7: Boundary crossing - Day boundaries", () => {
    it("should cross day boundary forward (23:45 + 30 minutes → 00:15 next day)", () => {
      // Arrange
      const date = new Date(2020, 0, 1, 23, 45, 0);
      const amount = 30;

      // Act
      const result = addMinutes(date, amount);

      // Assert
      expect(result.getDate()).toBe(2);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(15);
    });

    it("should cross day boundary backward (00:15 - 30 minutes → 23:45 previous day)", () => {
      // Arrange
      const date = new Date(2020, 0, 2, 0, 15, 0);
      const amount = -30;

      // Act
      const result = addMinutes(date, amount);

      // Assert
      expect(result.getDate()).toBe(1);
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(45);
    });
  });

  describe("Equivalence Class 7: Boundary crossing - Month/Year boundaries", () => {
    it("should cross month boundary forward (Jan 31 23:45 + 30 minutes → Feb 1 00:15)", () => {
      // Arrange
      const date = new Date(2020, 0, 31, 23, 45, 0);
      const amount = 30;

      // Act
      const result = addMinutes(date, amount);

      // Assert
      expect(result.getMonth()).toBe(1);
      expect(result.getDate()).toBe(1);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(15);
    });

    it("should cross year boundary forward (Dec 31 23:45 + 30 minutes → Jan 1 00:15)", () => {
      // Arrange
      const date = new Date(2020, 11, 31, 23, 45, 0);
      const amount = 30;

      // Act
      const result = addMinutes(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2021);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(1);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(15);
    });
  });

  describe("Boundary Value Analysis: Fractional amounts", () => {
    it("should truncate fractional amount (positive)", () => {
      // Arrange
      const date = new Date(2020, 0, 1, 12, 0, 0);
      const amount = 1.9;

      // Act
      const result = addMinutes(date, amount);

      // Assert
      expect(result.getMinutes()).toBe(1); // floor(1.9) = 1 minute added
    });

    it("should truncate fractional amount (negative)", () => {
      // Arrange
      const date = new Date(2020, 0, 1, 12, 30, 0);
      const amount = -1.9;

      // Act
      const result = addMinutes(date, amount);

      // Assert
      expect(result.getMinutes()).toBe(29); // floor(-1.9) = -1 minute
    });
  });

  describe("Boundary Value Analysis: Preserve lower time units", () => {
    it("should preserve seconds and milliseconds", () => {
      // Arrange
      const date = new Date(2020, 5, 15, 12, 30, 45, 123);
      const amount = 15;

      // Act
      const result = addMinutes(date, amount);

      // Assert
      expect(result.getMinutes()).toBe(45);
      expect(result.getSeconds()).toBe(45);
      expect(result.getMilliseconds()).toBe(123);
    });
  });

  describe("Immutability: Original date must not be mutated", () => {
    it("should not mutate the original Date object", () => {
      // Arrange
      const original = new Date(2020, 5, 15, 12, 30, 0);
      const originalTime = original.getTime();

      // Act
      addMinutes(original, 30);

      // Assert
      expect(original.getTime()).toBe(originalTime);
    });

    it("should preserve all time components of original date", () => {
      // Arrange
      const date = new Date(2020, 5, 15, 12, 30, 45, 123);
      const originalTime = date.getTime();
      const amount = 15;

      // Act
      const result = addMinutes(date, amount);

      // Assert
      expect(date.getTime()).toBe(originalTime);
      expect(result.getTime()).not.toBe(originalTime);
    });
  });
});
