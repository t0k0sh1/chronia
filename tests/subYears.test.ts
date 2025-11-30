import { describe, it, expect } from "vitest";
import { subYears } from "../src/subYears";

/**
 * Test Design for subYears
 *
 * Function signature: subYears(date: Date | number, amount: number): Date
 *
 * Equivalence Partitioning:
 * - Class 1: Valid Date + positive amount → Returns new Date with years subtracted
 * - Class 2: Valid Date + negative amount → Returns new Date with years added
 * - Class 3: Valid Date + zero amount → Returns same date
 * - Class 4: Valid timestamp + valid amount → Returns new Date with years subtracted
 * - Class 5: Invalid Date + valid amount → Returns Invalid Date
 * - Class 6: Valid Date + invalid amount (NaN, Infinity, -Infinity) → Returns Invalid Date
 * - Class 7: Leap year handling (Feb 29) → Returns correctly adjusted Date
 *
 * Boundary Value Analysis:
 * - Zero amount: Returns same date
 * - Leap year to non-leap year backward: Feb 29 → Feb 28
 * - Leap year to leap year backward: Feb 29 → Feb 29
 * - Month-end preservation: Jan 31 → Jan 31 previous year
 * - Fractional amounts: Truncation behavior (floor)
 * - Large values: Subtracting many years
 *
 * Immutability Requirement:
 * - Original date must never be mutated
 */

describe("subYears", () => {
  describe("Equivalence Class 1: Valid Date + positive amount", () => {
    it("should subtract positive years", () => {
      // Arrange
      const date = new Date(2025, 8, 20);
      const amount = 5;

      // Act
      const result = subYears(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2020);
      expect(result.getMonth()).toBe(8);
      expect(result.getDate()).toBe(20);
    });

    it("should subtract 1 year", () => {
      // Arrange
      const date = new Date(2025, 5, 15);
      const amount = 1;

      // Act
      const result = subYears(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2024);
    });

    it("should subtract large number of years", () => {
      // Arrange
      const date = new Date(2025, 0, 1);
      const amount = 1000;

      // Act
      const result = subYears(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(1025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(1);
    });
  });

  describe("Equivalence Class 2: Valid Date + negative amount", () => {
    it("should add years when amount is negative", () => {
      // Arrange
      const date = new Date(2020, 3, 15);
      const amount = -3;

      // Act
      const result = subYears(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2023);
      expect(result.getMonth()).toBe(3);
      expect(result.getDate()).toBe(15);
    });

    it("should handle large negative amount", () => {
      // Arrange
      const date = new Date(2025, 0, 1);
      const amount = -1000;

      // Act
      const result = subYears(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(3025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(1);
    });
  });

  describe("Equivalence Class 3: Valid Date + zero amount", () => {
    it("should return same date when subtracting zero years", () => {
      // Arrange
      const date = new Date(2025, 7, 10, 12, 30, 45, 123);
      const amount = 0;

      // Act
      const result = subYears(date, amount);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });
  });

  describe("Equivalence Class 4: Valid timestamp + valid amount", () => {
    it("should accept timestamp input and subtract years", () => {
      // Arrange
      const date = new Date(2025, 4, 20);
      const timestamp = date.getTime();
      const amount = 7;

      // Act
      const result = subYears(timestamp, amount);

      // Assert
      expect(result.getFullYear()).toBe(2018);
      expect(result.getMonth()).toBe(4);
      expect(result.getDate()).toBe(20);
    });

    it("should accept timestamp and add years (negative amount)", () => {
      // Arrange
      const timestamp = new Date(2020, 6, 15).getTime();
      const amount = -5;

      // Act
      const result = subYears(timestamp, amount);

      // Assert
      expect(result.getFullYear()).toBe(2025);
    });
  });

  describe("Equivalence Class 5: Invalid Date + valid amount", () => {
    it("should return Invalid Date when base date is invalid", () => {
      // Arrange
      const invalidDate = new Date("invalid");
      const amount = 5;

      // Act
      const result = subYears(invalidDate, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when timestamp is NaN", () => {
      // Arrange
      const timestamp = NaN;
      const amount = 1;

      // Act
      const result = subYears(timestamp, amount);

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
      const result = subYears(date, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when amount is Infinity", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const amount = Infinity;

      // Act
      const result = subYears(date, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when amount is -Infinity", () => {
      // Arrange
      const date = new Date(2025, 0, 15);
      const amount = -Infinity;

      // Act
      const result = subYears(date, amount);

      // Assert
      expect(isNaN(result.getTime())).toBe(true);
    });
  });

  describe("Equivalence Class 7: Leap year handling", () => {
    it("should handle leap year to non-leap year backward (Feb 29 → Feb 28)", () => {
      // Arrange
      const date = new Date(2024, 1, 29); // Feb 29, 2024 (leap year)
      const amount = 1;

      // Act
      const result = subYears(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2023);
      expect(result.getMonth()).toBe(1);
      expect(result.getDate()).toBe(28); // Adjusted to Feb 28
    });

    it("should handle leap year to leap year backward (Feb 29 → Feb 29)", () => {
      // Arrange
      const date = new Date(2024, 1, 29); // Feb 29, 2024 (leap year)
      const amount = 4;

      // Act
      const result = subYears(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2020);
      expect(result.getMonth()).toBe(1);
      expect(result.getDate()).toBe(29); // Preserved Feb 29
    });

    it("should handle non-leap year to leap year forward (Feb 28 → Feb 28) with negative amount", () => {
      // Arrange
      const date = new Date(2023, 1, 28); // Feb 28, 2023 (non-leap year)
      const amount = -1;

      // Act
      const result = subYears(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(1);
      expect(result.getDate()).toBe(28);
    });
  });

  describe("Boundary Value Analysis: Month-end preservation", () => {
    it("should preserve month-end (Jan 31 → Jan 31 previous year)", () => {
      // Arrange
      const date = new Date(2021, 0, 31);
      const amount = 1;

      // Act
      const result = subYears(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2020);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(31);
    });

    it("should preserve month-end (Mar 31 → Mar 31 next year) with negative amount", () => {
      // Arrange
      const date = new Date(2021, 2, 31);
      const amount = -1;

      // Act
      const result = subYears(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2022);
      expect(result.getMonth()).toBe(2);
      expect(result.getDate()).toBe(31);
    });

    it("should preserve Dec 31 across years", () => {
      // Arrange
      const date = new Date(2024, 11, 31);
      const amount = 1;

      // Act
      const result = subYears(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2023);
      expect(result.getMonth()).toBe(11);
      expect(result.getDate()).toBe(31);
    });
  });

  describe("Boundary Value Analysis: Fractional amounts", () => {
    it("should truncate fractional amount (positive)", () => {
      // Arrange
      const date = new Date(2020, 0, 1);
      const amount = 1.9;

      // Act
      const result = subYears(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2019); // floor(1.9) = 1 year subtracted
    });

    it("should truncate fractional amount (negative)", () => {
      // Arrange
      const date = new Date(2020, 0, 1);
      const amount = -1.9;

      // Act
      const result = subYears(date, amount);

      // Assert
      expect(result.getFullYear()).toBe(2021); // floor(-1.9) = -1 year (adds 1)
    });
  });

  describe("Immutability: Original date must not be mutated", () => {
    it("should not mutate the original Date object", () => {
      // Arrange
      const original = new Date(2025, 8, 20);
      const originalTime = original.getTime();

      // Act
      subYears(original, 5);

      // Assert
      expect(original.getTime()).toBe(originalTime);
    });

    it("should preserve all time components", () => {
      // Arrange
      const date = new Date(2025, 5, 15, 14, 30, 45, 123);
      const amount = 3;

      // Act
      const result = subYears(date, amount);

      // Assert
      expect(result.getHours()).toBe(14);
      expect(result.getMinutes()).toBe(30);
      expect(result.getSeconds()).toBe(45);
      expect(result.getMilliseconds()).toBe(123);
    });
  });

  describe("Type validation: Invalid date argument types", () => {
    it("should return Invalid Date for null", () => {
      // Arrange
      const invalidInput = null;

      // Act
      const result = subYears(invalidInput as any, 1);

      // Assert
      expect(result instanceof Date).toBe(true);
      expect(result.getTime()).toBeNaN();
    });

    it("should return Invalid Date for undefined", () => {
      // Arrange
      const invalidInput = undefined;

      // Act
      const result = subYears(invalidInput as any, 1);

      // Assert
      expect(result instanceof Date).toBe(true);
      expect(result.getTime()).toBeNaN();
    });

    it("should return Invalid Date for boolean values", () => {
      // Arrange
      const invalidInputs = [true, false];

      // Act & Assert
      invalidInputs.forEach(input => {
        const result = subYears(input as any, 1);
        expect(result instanceof Date).toBe(true);
        expect(result.getTime()).toBeNaN();
      });
    });

    it("should return Invalid Date for object/array/function/symbol", () => {
      // Arrange
      const invalidInputs = [{}, [], () => {}, Symbol("test")];

      // Act & Assert
      invalidInputs.forEach(input => {
        const result = subYears(input as any, 1);
        expect(result instanceof Date).toBe(true);
        expect(result.getTime()).toBeNaN();
      });
    });
  });

  describe("Type validation: Invalid amount argument types", () => {
    it("should return Invalid Date for null amount", () => {
      // Arrange
      const validDate = new Date(2024, 0, 1);

      // Act
      const result = subYears(validDate, null as any);

      // Assert
      expect(result instanceof Date).toBe(true);
      expect(result.getTime()).toBeNaN();
    });

    it("should return Invalid Date for undefined amount", () => {
      // Arrange
      const validDate = new Date(2024, 0, 1);

      // Act
      const result = subYears(validDate, undefined as any);

      // Assert
      expect(result instanceof Date).toBe(true);
      expect(result.getTime()).toBeNaN();
    });

    it("should return Invalid Date for string amount", () => {
      // Arrange
      const validDate = new Date(2024, 0, 1);

      // Act
      const result = subYears(validDate, "1" as any);

      // Assert
      expect(result instanceof Date).toBe(true);
      expect(result.getTime()).toBeNaN();
    });

    it("should return Invalid Date for boolean/object/array/function/symbol amounts", () => {
      // Arrange
      const validDate = new Date(2024, 0, 1);
      const invalidAmounts = [true, false, {}, [], () => {}, Symbol("test")];

      // Act & Assert
      invalidAmounts.forEach(input => {
        const result = subYears(validDate, input as any);
        expect(result instanceof Date).toBe(true);
        expect(result.getTime()).toBeNaN();
      });
    });
  });

  describe("Type validation: Invalid Date objects", () => {
    it("should return Invalid Date when input is Invalid Date object", () => {
      // Arrange
      const invalidDate = new Date("invalid");

      // Act
      const result = subYears(invalidDate, 1);

      // Assert
      expect(result instanceof Date).toBe(true);
      expect(result.getTime()).toBeNaN();
    });

    it("should return Invalid Date when input is Date(NaN)", () => {
      // Arrange
      const invalidDate = new Date(NaN);

      // Act
      const result = subYears(invalidDate, 1);

      // Assert
      expect(result instanceof Date).toBe(true);
      expect(result.getTime()).toBeNaN();
    });
  });
});
