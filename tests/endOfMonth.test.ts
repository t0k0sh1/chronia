import { describe, it, expect } from "vitest";
import { endOfMonth } from "../src/endOfMonth";

describe("endOfMonth", () => {
  describe("happy path", () => {
    it("should return last day of month at end of day", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 14, 30, 45, 123);

      // Act
      const result = endOfMonth(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 5, 30, 23, 59, 59, 999).getTime());
    });

    it("should handle mid-month date", () => {
      // Arrange
      const date = new Date(2023, 8, 20, 12, 0, 0, 0);

      // Act
      const result = endOfMonth(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2023, 8, 30, 23, 59, 59, 999).getTime());
    });

    it("should handle first day of month", () => {
      // Arrange
      const date = new Date(2024, 5, 1, 0, 0, 0, 0);

      // Act
      const result = endOfMonth(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 5, 30, 23, 59, 59, 999).getTime());
    });

    it("should handle timestamp input", () => {
      // Arrange
      const timestamp = new Date(2024, 5, 15, 14, 30, 45, 123).getTime();

      // Act
      const result = endOfMonth(timestamp);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 5, 30, 23, 59, 59, 999).getTime());
    });
  });

  describe("edge cases", () => {
    it("should handle last day of month - no change", () => {
      // Arrange
      const date = new Date(2024, 5, 30, 23, 59, 59, 999);

      // Act
      const result = endOfMonth(date);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });

    it("should handle last day of month with earlier time", () => {
      // Arrange
      const date = new Date(2024, 5, 30, 12, 30, 0, 0);

      // Act
      const result = endOfMonth(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 5, 30, 23, 59, 59, 999).getTime());
    });

    it("should handle January (31 days)", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 12, 30, 0, 0);

      // Act
      const result = endOfMonth(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 0, 31, 23, 59, 59, 999).getTime());
    });

    it("should handle April (30 days)", () => {
      // Arrange
      const date = new Date(2024, 3, 15, 12, 30, 0, 0);

      // Act
      const result = endOfMonth(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 3, 30, 23, 59, 59, 999).getTime());
    });

    it("should handle leap year February (29 days)", () => {
      // Arrange
      const date = new Date(2024, 1, 15, 12, 0, 0, 0);

      // Act
      const result = endOfMonth(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 1, 29, 23, 59, 59, 999).getTime());
    });

    it("should handle non-leap year February (28 days)", () => {
      // Arrange
      const date = new Date(2023, 1, 15, 12, 0, 0, 0);

      // Act
      const result = endOfMonth(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2023, 1, 28, 23, 59, 59, 999).getTime());
    });

    it("should handle century leap year (Feb 29, 2000)", () => {
      // Arrange
      const date = new Date(2000, 1, 15, 12, 0, 0, 0);

      // Act
      const result = endOfMonth(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2000, 1, 29, 23, 59, 59, 999).getTime());
    });

    it("should handle non-leap century years correctly", () => {
      // Arrange - Years divisible by 100 but not by 400 are NOT leap years
      const date1900 = new Date(1900, 1, 15, 12, 0, 0, 0); // Feb 1900
      const date2100 = new Date(2100, 1, 15, 12, 0, 0, 0); // Feb 2100

      // Act
      const result1900 = endOfMonth(date1900);
      const result2100 = endOfMonth(date2100);

      // Assert - February should have 28 days, not 29
      expect(result1900.getTime()).toBe(new Date(1900, 1, 28, 23, 59, 59, 999).getTime());
      expect(result2100.getTime()).toBe(new Date(2100, 1, 28, 23, 59, 59, 999).getTime());
    });

    it("should not modify original Date object", () => {
      // Arrange
      const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);
      const originalTime = originalDate.getTime();

      // Act
      endOfMonth(originalDate);

      // Assert
      expect(originalDate.getTime()).toBe(originalTime);
    });

    it("should return new Date object, not reference to input", () => {
      // Arrange
      const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);

      // Act
      const result = endOfMonth(originalDate);

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
      const result = endOfMonth(invalidDate);

      // Assert
      expect(Number.isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when input is NaN", () => {
      // Act
      const result = endOfMonth(NaN as any);

      // Assert
      expect(Number.isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when input is Infinity", () => {
      // Arrange & Act
      const resultPositive = endOfMonth(Infinity as any);
      const resultNegative = endOfMonth(-Infinity as any);

      // Assert
      expect(Number.isNaN(resultPositive.getTime())).toBe(true);
      expect(Number.isNaN(resultNegative.getTime())).toBe(true);
    });
  });
});
