import { describe, it, expect } from "vitest";
import { endOfDay } from "../src/endOfDay";

describe("endOfDay", () => {
  describe("happy path", () => {
    it("should return end of day (23:59:59.999) for the same date", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 14, 30, 45, 123);

      // Act
      const result = endOfDay(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 5, 15, 23, 59, 59, 999).getTime());
    });

    it("should handle noon time", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 12, 0, 0, 0);

      // Act
      const result = endOfDay(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 5, 15, 23, 59, 59, 999).getTime());
    });

    it("should handle evening time", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 18, 45, 30, 500);

      // Act
      const result = endOfDay(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 5, 15, 23, 59, 59, 999).getTime());
    });
  });

  describe("edge cases", () => {
    it("should handle end of day - no change", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 23, 59, 59, 999);

      // Act
      const result = endOfDay(date);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });

    it("should handle midnight (start of day)", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 0, 0, 0, 0);

      // Act
      const result = endOfDay(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 5, 15, 23, 59, 59, 999).getTime());
    });

    it("should handle first day of year (January 1st)", () => {
      // Arrange
      const date = new Date(2024, 0, 1, 12, 0, 0, 0);

      // Act
      const result = endOfDay(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 0, 1, 23, 59, 59, 999).getTime());
    });

    it("should handle last day of year (December 31st)", () => {
      // Arrange
      const date = new Date(2024, 11, 31, 14, 30, 0, 0);

      // Act
      const result = endOfDay(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 11, 31, 23, 59, 59, 999).getTime());
    });

    it("should handle leap year February 29th", () => {
      // Arrange
      const date = new Date(2024, 1, 29, 14, 30, 45, 123);

      // Act
      const result = endOfDay(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 1, 29, 23, 59, 59, 999).getTime());
    });

    it("should not modify original Date object", () => {
      // Arrange
      const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);
      const originalTime = originalDate.getTime();

      // Act
      endOfDay(originalDate);

      // Assert
      expect(originalDate.getTime()).toBe(originalTime);
    });

    it("should return new Date object, not reference to input", () => {
      // Arrange
      const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);

      // Act
      const result = endOfDay(originalDate);

      // Assert
      expect(result).not.toBe(originalDate);
      expect(result).toBeInstanceOf(Date);
    });
  });

  describe("invalid inputs", () => {
    it("should return Invalid Date when Date is invalid", () => {
      // Arrange
      const invalidDate = new Date("invalid");

      // Act
      const result = endOfDay(invalidDate);

      // Assert
      expect(Number.isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when input is NaN", () => {
      // Act
      const result = endOfDay(NaN as any);

      // Assert
      expect(Number.isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when input is Infinity", () => {
      // Arrange & Act
      const resultPositive = endOfDay(Infinity as any);
      const resultNegative = endOfDay(-Infinity as any);

      // Assert
      expect(Number.isNaN(resultPositive.getTime())).toBe(true);
      expect(Number.isNaN(resultNegative.getTime())).toBe(true);
    });
  });
});
