import { describe, it, expect } from "vitest";
import { subDays } from "../src/subDays";

/**
 * Test Design for subDays
 *
 * Function signature: subDays(date: Date | number, amount: number): Date
 *
 * Equivalence Partitioning:
 * - Class 1: Valid Date + positive amount → Returns new Date with days subtracted
 * - Class 2: Valid Date + negative amount → Returns new Date with days added
 * - Class 3: Valid Date + zero amount → Returns same date
 * - Class 4: Valid timestamp + valid amount → Returns new Date with days subtracted
 * - Class 5: Invalid Date + valid amount → Returns Invalid Date
 * - Class 6: Valid Date + invalid amount (NaN, Infinity, -Infinity) → Returns Invalid Date
 * - Class 7: Boundary crossing (month, year, leap year) → Returns correctly adjusted Date
 *
 * Boundary Value Analysis:
 * - Zero amount: Returns same date
 * - Month boundary backward: Feb 1 - 1 day → Jan 31
 * - Year boundary backward: Jan 1 - 1 day → Dec 31 previous year
 * - Leap year backward: Mar 1 - 1 day in leap year → Feb 29
 * - Leap year backward: Mar 1 - 1 day in non-leap year → Feb 28
 * - Fractional amounts: Truncation behavior (floor)
 * - Large values: Subtracting many days
 *
 * Immutability Requirement:
 * - Original date must never be mutated
 */

describe("subDays", () => {
  describe("Equivalence Class 1: Valid Date + positive amount", () => {
    it("should subtract positive days within same month", () => {
      // Arrange
      const date = new Date(2025, 0, 10);
      const amount = 5;

      // Act
      const result = subDays(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(5);
    });

    it("should subtract 1 day", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const amount = 1;

      // Act
      const result = subDays(date, amount);

      // Assert
      expect(result.getDate()).toBe(14);
    });

    it("should subtract large number of days", () => {
      // Arrange
      const date = new Date(2026, 0, 1);
      const amount = 365;

      // Act
      const result = subDays(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(1);
    });
  });

  describe("Equivalence Class 2: Valid Date + negative amount", () => {
    it("should add days when amount is negative", () => {
      // Arrange
      const date = new Date(2025, 0, 5);
      const amount = -3;

      // Act
      const result = subDays(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(8);
    });

    it("should handle large negative amount", () => {
      // Arrange
      const date = new Date(2025, 0, 1);
      const amount = -365;

      // Act
      const result = subDays(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2026);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(1);
    });
  });

  describe("Equivalence Class 3: Valid Date + zero amount", () => {
    it("should return same date when subtracting zero days", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 12, 30, 45, 123);
      const amount = 0;

      // Act
      const result = subDays(date, amount);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });
  });

  describe("Equivalence Class 4: Valid timestamp + valid amount", () => {
    it("should accept timestamp input and subtract days", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const timestamp = date.getTime();
      const amount = 10;

      // Act
      const result = subDays(timestamp, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(5);
    });

    it("should accept timestamp and add days (negative amount)", () => {
      // Arrange
      const timestamp = new Date(2025, 0, 10).getTime();
      const amount = -5;

      // Act
      const result = subDays(timestamp, amount);

      // Assert
      expect(result.getDate()).toBe(15);
    });
  });

  describe("Equivalence Class 5: Invalid Date + valid amount", () => {
    it("should return Invalid Date when base date is invalid", () => {
      // Arrange
      const invalidDate = new Date("invalid");
      const amount = 5;

      // Act
      const result = subDays(invalidDate, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when timestamp is NaN", () => {
      // Arrange
      const timestamp = NaN;
      const amount = 1;

      // Act
      const result = subDays(timestamp, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });
  });

  describe("Equivalence Class 6: Valid Date + invalid amount", () => {
    it("should return Invalid Date when amount is NaN", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const amount = NaN;

      // Act
      const result = subDays(date, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when amount is Infinity", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const amount = Infinity;

      // Act
      const result = subDays(date, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when amount is -Infinity", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const amount = -Infinity;

      // Act
      const result = subDays(date, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });
  });

  describe("Equivalence Class 7: Boundary crossing - Month boundaries", () => {
    it("should cross month boundary backward (Feb → Jan)", () => {
      // Arrange
      const date = new Date(2025, 1, 1);
      const amount = 1;

      // Act
      const result = subDays(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(31);
    });

    it("should cross month boundary forward (Jan → Feb) with negative amount", () => {
      // Arrange
      const date = new Date(2025, 0, 31);
      const amount = -1;

      // Act
      const result = subDays(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(1);
      expect(result.getDate()).toBe(1);
    });

    it("should cross multiple month boundaries backward", () => {
      // Arrange
      const date = new Date(2025, 3, 25);
      const amount = 100;

      // Act
      const result = subDays(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(15);
    });
  });

  describe("Equivalence Class 7: Boundary crossing - Year boundaries", () => {
    it("should cross year boundary backward (Jan → Dec)", () => {
      // Arrange
      const date = new Date(2025, 0, 1);
      const amount = 1;

      // Act
      const result = subDays(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(11);
      expect(result.getDate()).toBe(31);
    });

    it("should cross year boundary forward (Dec → Jan) with negative amount", () => {
      // Arrange
      const date = new Date(2025, 11, 31);
      const amount = -1;

      // Act
      const result = subDays(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2026);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(1);
    });
  });

  describe("Equivalence Class 7: Boundary crossing - Leap year handling", () => {
    it("should handle leap year backward (Mar 1 → Feb 29)", () => {
      // Arrange
      const date = new Date(2024, 2, 1); // 2024 is leap year
      const amount = 1;

      // Act
      const result = subDays(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(1);
      expect(result.getDate()).toBe(29);
    });

    it("should handle non-leap year backward (Mar 1 → Feb 28)", () => {
      // Arrange
      const date = new Date(2023, 2, 1); // 2023 is not leap year
      const amount = 1;

      // Act
      const result = subDays(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2023);
      expect(result.getMonth()).toBe(1);
      expect(result.getDate()).toBe(28);
    });

    it("should handle forward from Feb 29 in leap year → Mar 1 with negative amount", () => {
      // Arrange
      const date = new Date(2024, 1, 29); // Feb 29, 2024 (leap year)
      const amount = -1;

      // Act
      const result = subDays(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(2);
      expect(result.getDate()).toBe(1);
    });

    it("should handle forward from Feb 28 in non-leap year → Mar 1 with negative amount", () => {
      // Arrange
      const date = new Date(2023, 1, 28); // Feb 28, 2023 (non-leap year)
      const amount = -1;

      // Act
      const result = subDays(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2023);
      expect(result.getMonth()).toBe(2);
      expect(result.getDate()).toBe(1);
    });
  });

  describe("Boundary Value Analysis: Fractional amounts", () => {
    it("should truncate fractional amount (positive)", () => {
      // Arrange
      const date = new Date(2025, 0, 5);
      const amount = 1.9;

      // Act
      const result = subDays(date, amount);

      // Assert
      expect(result.getDate()).toBe(4); // floor(1.9) = 1 day subtracted
    });

    it("should truncate fractional amount (negative)", () => {
      // Arrange
      const date = new Date(2025, 0, 5);
      const amount = -1.9;

      // Act
      const result = subDays(date, amount);

      // Assert
      expect(result.getDate()).toBe(6); // floor(-1.9) = -1 day (adds 1)
    });
  });

  describe("Immutability: Original date must not be mutated", () => {
    it("should not mutate the original Date object", () => {
      // Arrange
      const original = new Date(2025, 0, 15);
      const originalTime = original.getTime();

      // Act
      subDays(original, 10);

      // Assert
      expect(original.getTime()).toBe(originalTime);
    });

    it("should preserve all time components", () => {
      // Arrange
      const date = new Date(2025, 0, 15, 14, 30, 45, 123);
      const amount = 5;

      // Act
      const result = subDays(date, amount);

      // Assert
      expect(result.getHours()).toBe(14);
      expect(result.getMinutes()).toBe(30);
      expect(result.getSeconds()).toBe(45);
      expect(result.getMilliseconds()).toBe(123);
    });
  });
});
