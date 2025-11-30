import { describe, it, expect } from "vitest";
import { addDays } from "../src/addDays";

/**
 * Test Design for addDays
 *
 * Function signature: addDays(date: Date | number, amount: number): Date
 *
 * Equivalence Partitioning:
 * - Class 1: Valid Date + positive amount → Returns new Date with days added
 * - Class 2: Valid Date + negative amount → Returns new Date with days subtracted
 * - Class 3: Valid Date + zero amount → Returns same date
 * - Class 4: Valid timestamp + valid amount → Returns new Date with days added
 * - Class 5: Invalid Date + valid amount → Returns Invalid Date
 * - Class 6: Valid Date + invalid amount (NaN, Infinity, -Infinity) → Returns Invalid Date
 * - Class 7: Boundary crossing (month, year, leap year) → Returns correctly adjusted Date
 *
 * Boundary Value Analysis:
 * - Zero amount: Returns same date
 * - Month boundary: Jan 31 + 1 day → Feb 1
 * - Year boundary: Dec 31 + 1 day → Jan 1 next year
 * - Leap year: Feb 28 + 1 day in leap year → Feb 29
 * - Leap year: Feb 28 + 1 day in non-leap year → Mar 1
 * - Fractional amounts: Truncation behavior (floor)
 * - Large values: Adding/subtracting many days
 *
 * Immutability Requirement:
 * - Original date must never be mutated
 */

describe("addDays", () => {
  describe("Equivalence Class 1: Valid Date + positive amount", () => {
    it("should add positive days within same month", () => {
      // Arrange
      const date = new Date(2025, 0, 1);
      const amount = 5;

      // Act
      const result = addDays(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(6);
    });

    it("should add 1 day", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const amount = 1;

      // Act
      const result = addDays(date, amount);

      // Assert
      expect(result.getDate()).toBe(16);
    });

    it("should add large number of days", () => {
      // Arrange
      const date = new Date(2025, 0, 1);
      const amount = 365;

      // Act
      const result = addDays(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2026);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(1);
    });
  });

  describe("Equivalence Class 2: Valid Date + negative amount", () => {
    it("should subtract days when amount is negative", () => {
      // Arrange
      const date = new Date(2025, 0, 10);
      const amount = -3;

      // Act
      const result = addDays(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(7);
    });

    it("should handle large negative amount", () => {
      // Arrange
      const date = new Date(2025, 0, 1);
      const amount = -365;

      // Act
      const result = addDays(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(2); // 2024 is leap year
    });
  });

  describe("Equivalence Class 3: Valid Date + zero amount", () => {
    it("should return same date when adding zero days", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45, 123);
      const amount = 0;

      // Act
      const result = addDays(date, amount);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });
  });

  describe("Equivalence Class 4: Valid timestamp + valid amount", () => {
    it("should accept timestamp input and add days", () => {
      // Arrange
      const date = new Date(2025, 0, 1);
      const timestamp = date.getTime();
      const amount = 10;

      // Act
      const result = addDays(timestamp, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(11);
    });

    it("should accept timestamp and subtract days", () => {
      // Arrange
      const timestamp = new Date(2025, 0, 15).getTime();
      const amount = -5;

      // Act
      const result = addDays(timestamp, amount);

      // Assert
      expect(result.getDate()).toBe(10);
    });
  });

  describe("Equivalence Class 5: Invalid Date + valid amount", () => {
    it("should return Invalid Date when base date is invalid", () => {
      // Arrange
      const invalidDate = new Date("invalid");
      const amount = 5;

      // Act
      const result = addDays(invalidDate, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when timestamp is NaN", () => {
      // Arrange
      const timestamp = NaN;
      const amount = 1;

      // Act
      const result = addDays(timestamp, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });
  });

  describe("Equivalence Class 6: Valid Date + invalid amount", () => {
    it("should return Invalid Date when amount is NaN", () => {
      // Arrange
      const date = new Date(2025, 0, 1);
      const amount = NaN;

      // Act
      const result = addDays(date, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when amount is Infinity", () => {
      // Arrange
      const date = new Date(2025, 0, 1);
      const amount = Infinity;

      // Act
      const result = addDays(date, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when amount is -Infinity", () => {
      // Arrange
      const date = new Date(2025, 0, 1);
      const amount = -Infinity;

      // Act
      const result = addDays(date, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });
  });

  describe("Equivalence Class 7: Boundary crossing - Month boundaries", () => {
    it("should cross month boundary forward (Jan → Feb)", () => {
      // Arrange
      const date = new Date(2025, 0, 31);
      const amount = 1;

      // Act
      const result = addDays(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(1);
      expect(result.getDate()).toBe(1);
    });

    it("should cross month boundary backward (Feb → Jan)", () => {
      // Arrange
      const date = new Date(2025, 1, 1);
      const amount = -1;

      // Act
      const result = addDays(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(31);
    });

    it("should cross multiple month boundaries", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const amount = 100;

      // Act
      const result = addDays(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(3); // April
      expect(result.getDate()).toBe(25);
    });
  });

  describe("Equivalence Class 7: Boundary crossing - Year boundaries", () => {
    it("should cross year boundary forward (Dec → Jan)", () => {
      // Arrange
      const date = new Date(2025, 11, 31);
      const amount = 1;

      // Act
      const result = addDays(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2026);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(1);
    });

    it("should cross year boundary backward (Jan → Dec)", () => {
      // Arrange
      const date = new Date(2025, 0, 1);
      const amount = -1;

      // Act
      const result = addDays(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(11);
      expect(result.getDate()).toBe(31);
    });
  });

  describe("Equivalence Class 7: Boundary crossing - Leap year handling", () => {
    it("should handle leap year (Feb 28 → Feb 29)", () => {
      // Arrange
      const date = new Date(2024, 1, 28); // 2024 is leap year
      const amount = 1;

      // Act
      const result = addDays(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(1);
      expect(result.getDate()).toBe(29);
    });

    it("should handle non-leap year (Feb 28 → Mar 1)", () => {
      // Arrange
      const date = new Date(2023, 1, 28); // 2023 is not leap year
      const amount = 1;

      // Act
      const result = addDays(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2023);
      expect(result.getMonth()).toBe(2);
      expect(result.getDate()).toBe(1);
    });

    it("should handle backward from Mar 1 in leap year → Feb 29", () => {
      // Arrange
      const date = new Date(2024, 2, 1); // Mar 1, 2024 (leap year)
      const amount = -1;

      // Act
      const result = addDays(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(1);
      expect(result.getDate()).toBe(29);
    });

    it("should handle backward from Mar 1 in non-leap year → Feb 28", () => {
      // Arrange
      const date = new Date(2023, 2, 1); // Mar 1, 2023 (non-leap year)
      const amount = -1;

      // Act
      const result = addDays(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2023);
      expect(result.getMonth()).toBe(1);
      expect(result.getDate()).toBe(28);
    });
  });

  describe("Boundary Value Analysis: Fractional amounts", () => {
    it("should truncate fractional amount (positive)", () => {
      // Arrange
      const date = new Date(2025, 0, 1);
      const amount = 1.9;

      // Act
      const result = addDays(date, amount);

      // Assert
      expect(result.getDate()).toBe(2); // floor(1.9) = 1 day added
    });

    it("should truncate fractional amount (negative)", () => {
      // Arrange
      const date = new Date(2025, 0, 5);
      const amount = -1.9;

      // Act
      const result = addDays(date, amount);

      // Assert
      expect(result.getDate()).toBe(4); // floor(-1.9) = -1 day
    });
  });

  describe("Immutability: Original date must not be mutated", () => {
    it("should not mutate the original Date object", () => {
      // Arrange
      const original = new Date(2025, 0, 15);
      const originalTime = original.getTime();

      // Act
      addDays(original, 10);

      // Assert
      expect(original.getTime()).toBe(originalTime);
    });

    it("should preserve all time components", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 14, 30, 45, 123);
      const amount = 5;

      // Act
      const result = addDays(date, amount);

      // Assert
      expect(result.getHours()).toBe(14);
      expect(result.getMinutes()).toBe(30);
      expect(result.getSeconds()).toBe(45);
      expect(result.getMilliseconds()).toBe(123);
    });
  });
});
