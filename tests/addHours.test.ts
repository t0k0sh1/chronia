import { describe, it, expect } from "vitest";
import { addHours } from "../src/addHours";

/**
 * Test Design for addHours
 *
 * Function signature: addHours(date: Date | number, amount: number): Date
 *
 * Equivalence Partitioning:
 * - Class 1: Valid Date + positive amount → Returns new Date with hours added
 * - Class 2: Valid Date + negative amount → Returns new Date with hours subtracted
 * - Class 3: Valid Date + zero amount → Returns same date
 * - Class 4: Valid timestamp + valid amount → Returns new Date with hours added
 * - Class 5: Invalid Date + valid amount → Returns Invalid Date
 * - Class 6: Valid Date + invalid amount (NaN, Infinity, -Infinity) → Returns Invalid Date
 * - Class 7: Boundary crossing (day, month, year) → Returns correctly adjusted Date
 *
 * Boundary Value Analysis:
 * - Zero amount: Returns same date
 * - Day boundary forward: 23:00 + 2 hours → 01:00 next day
 * - Day boundary backward: 01:00 - 2 hours → 23:00 previous day
 * - Month boundary: Jan 31 23:00 + 2 hours → Feb 1 01:00
 * - Year boundary: Dec 31 23:00 + 2 hours → Jan 1 01:00 next year
 * - Fractional amounts: Truncation behavior (floor)
 * - Large values: Adding/subtracting many hours
 * - Preserve lower time units: Minutes, seconds, milliseconds
 *
 * Immutability Requirement:
 * - Original date must never be mutated
 */

describe("addHours", () => {
  describe("Equivalence Class 1: Valid Date + positive amount", () => {
    it("should add positive hours within same day", () => {
      // Arrange
      const date = new Date(2020, 5, 15, 12, 0, 0);
      const amount = 3;

      // Act
      const result = addHours(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2020);
      expect(result.getMonth()).toBe(5);
      expect(result.getDate()).toBe(15);
      expect(result.getHours()).toBe(15);
    });

    it("should add 1 hour", () => {
      // Arrange
      const date = new Date(2020, 5, 15, 12, 0, 0);
      const amount = 1;

      // Act
      const result = addHours(date, amount);

      // Assert
      expect(result.getHours()).toBe(13);
    });

    it("should add large number of hours", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 0, 0, 0);
      const amount = 1000;

      // Act
      const result = addHours(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(1);
      expect(result.getDate()).toBe(11);
      expect(result.getHours()).toBe(16);
    });
  });

  describe("Equivalence Class 2: Valid Date + negative amount", () => {
    it("should subtract hours when amount is negative", () => {
      // Arrange
      const date = new Date(2025, 8, 10, 15, 30, 0);
      const amount = -5;

      // Act
      const result = addHours(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(8);
      expect(result.getDate()).toBe(10);
      expect(result.getHours()).toBe(10);
      expect(result.getMinutes()).toBe(30);
    });

    it("should handle large negative amount", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 0, 0, 0);
      const amount = -1000;

      // Act
      const result = addHours(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(10);
      expect(result.getDate()).toBe(20);
      expect(result.getHours()).toBe(8);
    });
  });

  describe("Equivalence Class 3: Valid Date + zero amount", () => {
    it("should return same date when adding zero hours", () => {
      // Arrange
      const date = new Date(2025, 3, 20, 10, 30, 45, 123);
      const amount = 0;

      // Act
      const result = addHours(date, amount);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });
  });

  describe("Equivalence Class 4: Valid timestamp + valid amount", () => {
    it("should accept timestamp input and add hours", () => {
      // Arrange
      const date = new Date(2020, 6, 15, 12, 0, 0);
      const timestamp = date.getTime();
      const amount = 5;

      // Act
      const result = addHours(timestamp, amount);

      // Assert
      expect(result.getFullYear()).toBe(2020);
      expect(result.getMonth()).toBe(6);
      expect(result.getDate()).toBe(15);
      expect(result.getHours()).toBe(17);
    });

    it("should accept timestamp and subtract hours (negative amount)", () => {
      // Arrange
      const timestamp = new Date(2020, 6, 15, 17, 0, 0).getTime();
      const amount = -3;

      // Act
      const result = addHours(timestamp, amount);

      // Assert
      expect(result.getHours()).toBe(14);
    });
  });

  describe("Equivalence Class 5: Invalid Date + valid amount", () => {
    it("should return Invalid Date when base date is invalid", () => {
      // Arrange
      const invalidDate = new Date("invalid");
      const amount = 3;

      // Act
      const result = addHours(invalidDate, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when timestamp is NaN", () => {
      // Arrange
      const timestamp = NaN;
      const amount = 1;

      // Act
      const result = addHours(timestamp, amount);

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
      const result = addHours(date, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when amount is Infinity", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 0, 0);
      const amount = Infinity;

      // Act
      const result = addHours(date, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when amount is -Infinity", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 0, 0);
      const amount = -Infinity;

      // Act
      const result = addHours(date, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });
  });

  describe("Equivalence Class 7: Boundary crossing - Day boundaries", () => {
    it("should cross day boundary forward (23:00 + 2 hours → 01:00 next day)", () => {
      // Arrange
      const date = new Date(2020, 0, 1, 23, 0, 0);
      const amount = 2;

      // Act
      const result = addHours(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2020);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(2);
      expect(result.getHours()).toBe(1);
    });

    it("should cross day boundary backward (01:00 - 2 hours → 23:00 previous day)", () => {
      // Arrange
      const date = new Date(2020, 0, 2, 1, 0, 0);
      const amount = -2;

      // Act
      const result = addHours(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2020);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(1);
      expect(result.getHours()).toBe(23);
    });
  });

  describe("Equivalence Class 7: Boundary crossing - Month boundaries", () => {
    it("should cross month boundary forward (Jan 31 23:00 + 2 hours → Feb 1 01:00)", () => {
      // Arrange
      const date = new Date(2020, 0, 31, 23, 0, 0);
      const amount = 2;

      // Act
      const result = addHours(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2020);
      expect(result.getMonth()).toBe(1);
      expect(result.getDate()).toBe(1);
      expect(result.getHours()).toBe(1);
    });

    it("should cross month boundary backward (Feb 1 01:00 - 2 hours → Jan 31 23:00)", () => {
      // Arrange
      const date = new Date(2020, 1, 1, 1, 0, 0);
      const amount = -2;

      // Act
      const result = addHours(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2020);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(31);
      expect(result.getHours()).toBe(23);
    });
  });

  describe("Equivalence Class 7: Boundary crossing - Year boundaries", () => {
    it("should cross year boundary forward (Dec 31 23:00 + 2 hours → Jan 1 01:00)", () => {
      // Arrange
      const date = new Date(2020, 11, 31, 23, 0, 0);
      const amount = 2;

      // Act
      const result = addHours(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2021);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(1);
      expect(result.getHours()).toBe(1);
    });

    it("should cross year boundary backward (Jan 1 01:00 - 2 hours → Dec 31 23:00)", () => {
      // Arrange
      const date = new Date(2021, 0, 1, 1, 0, 0);
      const amount = -2;

      // Act
      const result = addHours(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2020);
      expect(result.getMonth()).toBe(11);
      expect(result.getDate()).toBe(31);
      expect(result.getHours()).toBe(23);
    });
  });

  describe("Boundary Value Analysis: Fractional amounts", () => {
    it("should truncate fractional amount (positive)", () => {
      // Arrange
      const date = new Date(2020, 0, 1, 12, 0, 0);
      const amount = 1.9;

      // Act
      const result = addHours(date, amount);

      // Assert
      expect(result.getHours()).toBe(13); // floor(1.9) = 1 hour added
    });

    it("should truncate fractional amount (negative)", () => {
      // Arrange
      const date = new Date(2020, 0, 1, 12, 0, 0);
      const amount = -1.9;

      // Act
      const result = addHours(date, amount);

      // Assert
      expect(result.getHours()).toBe(11); // floor(-1.9) = -1 hour
    });
  });

  describe("Boundary Value Analysis: Preserve lower time units", () => {
    it("should preserve minutes, seconds, and milliseconds", () => {
      // Arrange
      const date = new Date(2020, 5, 15, 12, 30, 45, 123);
      const amount = 2;

      // Act
      const result = addHours(date, amount);

      // Assert
      expect(result.getHours()).toBe(14);
      expect(result.getMinutes()).toBe(30);
      expect(result.getSeconds()).toBe(45);
      expect(result.getMilliseconds()).toBe(123);
    });
  });

  describe("Immutability: Original date must not be mutated", () => {
    it("should not mutate the original Date object", () => {
      // Arrange
      const original = new Date(2020, 5, 15, 12, 0, 0);
      const originalTime = original.getTime();

      // Act
      addHours(original, 5);

      // Assert
      expect(original.getTime()).toBe(originalTime);
    });

    it("should preserve all time components of original date", () => {
      // Arrange
      const date = new Date(2020, 5, 15, 12, 30, 45, 123);
      const originalTime = date.getTime();
      const amount = 3;

      // Act
      const result = addHours(date, amount);

      // Assert
      expect(date.getTime()).toBe(originalTime);
      expect(result.getTime()).not.toBe(originalTime);
    });
  });
});
