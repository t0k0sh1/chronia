import { describe, it, expect } from "vitest";
import { subHours } from "../src/subHours";

/**
 * Test Design for subHours
 *
 * Function signature: subHours(date: Date | number, amount: number): Date
 *
 * Equivalence Partitioning:
 * - Class 1: Valid Date + positive amount → Returns new Date with hours subtracted
 * - Class 2: Valid Date + negative amount → Returns new Date with hours added
 * - Class 3: Valid Date + zero amount → Returns same date
 * - Class 4: Valid timestamp + valid amount → Returns new Date with hours subtracted
 * - Class 5: Invalid Date + valid amount → Returns Invalid Date
 * - Class 6: Valid Date + invalid amount (NaN, Infinity, -Infinity) → Returns Invalid Date
 * - Class 7: Boundary crossing (day, month, year) → Returns correctly adjusted Date
 *
 * Boundary Value Analysis:
 * - Zero amount: Returns same date
 * - Day boundary backward: 02:00 - 4 hours → 22:00 previous day
 * - Day boundary forward with negative: 22:00 - (-4) hours → 02:00 next day
 * - Month boundary backward: Feb 1 01:00 - 2 hours → Jan 31 23:00
 * - Year boundary backward: Jan 1 01:00 - 2 hours → Dec 31 23:00 previous year
 * - Fractional amounts: Truncation behavior (floor)
 * - Large values: Subtracting many hours
 * - Preserve lower time units: Minutes, seconds, milliseconds
 *
 * Immutability Requirement:
 * - Original date must never be mutated
 */

describe("subHours", () => {
  describe("Equivalence Class 1: Valid Date + positive amount", () => {
    it("should subtract positive hours within same day", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 18, 0, 0);
      const amount = 5;

      // Act
      const result = subHours(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(15);
      expect(result.getHours()).toBe(13);
    });

    it("should subtract 1 hour", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 18, 0, 0);
      const amount = 1;

      // Act
      const result = subHours(date, amount);

      // Assert
      expect(result.getHours()).toBe(17);
    });

    it("should subtract large number of hours", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 0, 0);
      const amount = 1000;

      // Act
      const result = subHours(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(11);
      expect(result.getDate()).toBe(4);
      expect(result.getHours()).toBe(20);
    });
  });

  describe("Equivalence Class 2: Valid Date + negative amount", () => {
    it("should add hours when amount is negative", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 10, 30, 0);
      const amount = -3;

      // Act
      const result = subHours(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(15);
      expect(result.getHours()).toBe(13);
      expect(result.getMinutes()).toBe(30);
    });

    it("should handle large negative amount", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 0, 0);
      const amount = -1000;

      // Act
      const result = subHours(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(1);
      expect(result.getDate()).toBe(26);
      expect(result.getHours()).toBe(4);
    });
  });

  describe("Equivalence Class 3: Valid Date + zero amount", () => {
    it("should return same date when subtracting zero hours", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 14, 30, 45, 123);
      const amount = 0;

      // Act
      const result = subHours(date, amount);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });
  });

  describe("Equivalence Class 4: Valid timestamp + valid amount", () => {
    it("should accept timestamp input and subtract hours", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 18, 0, 0);
      const timestamp = date.getTime();
      const amount = 4;

      // Act
      const result = subHours(timestamp, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(15);
      expect(result.getHours()).toBe(14);
    });

    it("should accept timestamp and add hours (negative amount)", () => {
      // Arrange
      const timestamp = new Date(2025, 0, 15, 10, 0, 0).getTime();
      const amount = -3;

      // Act
      const result = subHours(timestamp, amount);

      // Assert
      expect(result.getHours()).toBe(13);
    });
  });

  describe("Equivalence Class 5: Invalid Date + valid amount", () => {
    it("should return Invalid Date when base date is invalid", () => {
      // Arrange
      const invalidDate = new Date("invalid");
      const amount = 3;

      // Act
      const result = subHours(invalidDate, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when timestamp is NaN", () => {
      // Arrange
      const timestamp = NaN;
      const amount = 1;

      // Act
      const result = subHours(timestamp, amount);

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
      const result = subHours(date, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when amount is Infinity", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 0, 0);
      const amount = Infinity;

      // Act
      const result = subHours(date, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when amount is -Infinity", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 0, 0);
      const amount = -Infinity;

      // Act
      const result = subHours(date, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });
  });

  describe("Equivalence Class 7: Boundary crossing - Day boundaries", () => {
    it("should cross day boundary backward (02:00 - 4 hours → 22:00 previous day)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 2, 0, 0);
      const amount = 4;

      // Act
      const result = subHours(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(14);
      expect(result.getHours()).toBe(22);
    });

    it("should cross day boundary forward (22:00 - (-4) hours → 02:00 next day)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 22, 0, 0);
      const amount = -4;

      // Act
      const result = subHours(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(16);
      expect(result.getHours()).toBe(2);
    });
  });

  describe("Equivalence Class 7: Boundary crossing - Month boundaries", () => {
    it("should cross month boundary backward (Feb 1 01:00 - 2 hours → Jan 31 23:00)", () => {
      // Arrange
      const date = new Date(2025, 1, 1, 1, 0, 0);
      const amount = 2;

      // Act
      const result = subHours(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(31);
      expect(result.getHours()).toBe(23);
    });

    it("should cross month boundary forward (Jan 31 23:00 - (-2) hours → Feb 1 01:00)", () => {
      // Arrange
      const date = new Date(2025, 0, 31, 23, 0, 0);
      const amount = -2;

      // Act
      const result = subHours(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(1);
      expect(result.getDate()).toBe(1);
      expect(result.getHours()).toBe(1);
    });
  });

  describe("Equivalence Class 7: Boundary crossing - Year boundaries", () => {
    it("should cross year boundary backward (Jan 1 01:00 - 2 hours → Dec 31 23:00)", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 1, 0, 0);
      const amount = 2;

      // Act
      const result = subHours(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(11);
      expect(result.getDate()).toBe(31);
      expect(result.getHours()).toBe(23);
    });

    it("should cross year boundary forward (Dec 31 23:00 - (-2) hours → Jan 1 01:00)", () => {
      // Arrange
      const date = new Date(2024, 11, 31, 23, 0, 0);
      const amount = -2;

      // Act
      const result = subHours(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(1);
      expect(result.getHours()).toBe(1);
    });
  });

  describe("Boundary Value Analysis: Fractional amounts", () => {
    it("should truncate fractional amount (positive)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 15, 0, 0);
      const amount = 1.9;

      // Act
      const result = subHours(date, amount);

      // Assert
      expect(result.getHours()).toBe(14); // floor(1.9) = 1 hour subtracted
    });

    it("should truncate fractional amount (negative)", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 10, 0, 0);
      const amount = -1.9;

      // Act
      const result = subHours(date, amount);

      // Assert
      expect(result.getHours()).toBe(11); // floor(-1.9) = -1 hour (adds 1)
    });
  });

  describe("Boundary Value Analysis: Preserve lower time units", () => {
    it("should preserve minutes, seconds, and milliseconds", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 14, 30, 45, 123);
      const amount = 3;

      // Act
      const result = subHours(date, amount);

      // Assert
      expect(result.getHours()).toBe(11);
      expect(result.getMinutes()).toBe(30);
      expect(result.getSeconds()).toBe(45);
      expect(result.getMilliseconds()).toBe(123);
    });
  });

  describe("Immutability: Original date must not be mutated", () => {
    it("should not mutate the original Date object", () => {
      // Arrange
      const original = new Date(2025, 0, 15, 18, 0, 0);
      const originalTime = original.getTime();

      // Act
      subHours(original, 5);

      // Assert
      expect(original.getTime()).toBe(originalTime);
    });

    it("should preserve all time components of original date", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 14, 30, 45, 123);
      const originalTime = date.getTime();
      const amount = 3;

      // Act
      const result = subHours(date, amount);

      // Assert
      expect(date.getTime()).toBe(originalTime);
      expect(result.getTime()).not.toBe(originalTime);
    });
  });
});
