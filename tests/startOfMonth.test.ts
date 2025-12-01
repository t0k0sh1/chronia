import { describe, it, expect } from "vitest";
import { startOfMonth } from "../src/startOfMonth";

describe("startOfMonth", () => {
  describe("happy path", () => {
    it("should return first day of month at midnight", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 14, 30, 45, 123);

      // Act
      const result = startOfMonth(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 5, 1, 0, 0, 0, 0).getTime());
    });

    it("should handle mid-month date", () => {
      // Arrange
      const date = new Date(2023, 8, 20, 12, 0, 0, 0);

      // Act
      const result = startOfMonth(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2023, 8, 1, 0, 0, 0, 0).getTime());
    });

    it("should handle last day of month", () => {
      // Arrange
      const date = new Date(2024, 5, 30, 18, 45, 30, 500);

      // Act
      const result = startOfMonth(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 5, 1, 0, 0, 0, 0).getTime());
    });

    it("should handle timestamp input", () => {
      // Arrange
      const timestamp = new Date(2024, 5, 15, 14, 30, 45).getTime();

      // Act
      const result = startOfMonth(timestamp);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 5, 1, 0, 0, 0, 0).getTime());
    });
  });

  describe("edge cases", () => {
    it("should handle first day of month - no change", () => {
      // Arrange
      const date = new Date(2024, 5, 1, 0, 0, 0, 0);

      // Act
      const result = startOfMonth(date);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });

    it("should handle first day of month with milliseconds", () => {
      // Arrange
      const date = new Date(2024, 5, 1, 23, 59, 59, 999);

      // Act
      const result = startOfMonth(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 5, 1, 0, 0, 0, 0).getTime());
    });

    it("should handle January (month 0)", () => {
      // Arrange
      const date = new Date(2024, 0, 15, 12, 30, 0, 0);

      // Act
      const result = startOfMonth(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 0, 1, 0, 0, 0, 0).getTime());
    });

    it("should handle December (month 11)", () => {
      // Arrange
      const date = new Date(2024, 11, 31, 23, 59, 59, 999);

      // Act
      const result = startOfMonth(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 11, 1, 0, 0, 0, 0).getTime());
    });

    it("should handle leap year February (Feb 29)", () => {
      // Arrange
      const date = new Date(2024, 1, 29, 12, 0, 0, 0);

      // Act
      const result = startOfMonth(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 1, 1, 0, 0, 0, 0).getTime());
    });

    it("should handle non-leap year February (Feb 28)", () => {
      // Arrange
      const date = new Date(2023, 1, 28, 12, 0, 0, 0);

      // Act
      const result = startOfMonth(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2023, 1, 1, 0, 0, 0, 0).getTime());
    });

    it("should handle month-end boundaries correctly", () => {
      // Arrange - Test all month-end variations (28, 29, 30, 31 days)
      const jan31 = new Date(2024, 0, 31, 23, 59, 59, 999); // 31 days
      const feb28 = new Date(2023, 1, 28, 23, 59, 59, 999); // 28 days (non-leap)
      const feb29 = new Date(2024, 1, 29, 23, 59, 59, 999); // 29 days (leap year)
      const apr30 = new Date(2024, 3, 30, 23, 59, 59, 999); // 30 days

      // Act
      const resultJan = startOfMonth(jan31);
      const resultFeb28 = startOfMonth(feb28);
      const resultFeb29 = startOfMonth(feb29);
      const resultApr = startOfMonth(apr30);

      // Assert - All should return first day of respective month
      expect(resultJan.getTime()).toBe(new Date(2024, 0, 1, 0, 0, 0, 0).getTime());
      expect(resultFeb28.getTime()).toBe(new Date(2023, 1, 1, 0, 0, 0, 0).getTime());
      expect(resultFeb29.getTime()).toBe(new Date(2024, 1, 1, 0, 0, 0, 0).getTime());
      expect(resultApr.getTime()).toBe(new Date(2024, 3, 1, 0, 0, 0, 0).getTime());
    });

    it("should not modify original Date object", () => {
      // Arrange
      const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);
      const originalTime = originalDate.getTime();

      // Act
      startOfMonth(originalDate);

      // Assert
      expect(originalDate.getTime()).toBe(originalTime);
    });

    it("should return new Date object, not reference to input", () => {
      // Arrange
      const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);

      // Act
      const result = startOfMonth(originalDate);

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
      const result = startOfMonth(invalidDate);

      // Assert
      expect(Number.isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when input is NaN", () => {
      // Act
      const result = startOfMonth(NaN as any);

      // Assert
      expect(Number.isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when input is Infinity", () => {
      // Arrange & Act
      const resultPositive = startOfMonth(Infinity as any);
      const resultNegative = startOfMonth(-Infinity as any);

      // Assert
      expect(Number.isNaN(resultPositive.getTime())).toBe(true);
      expect(Number.isNaN(resultNegative.getTime())).toBe(true);
    });
  });
});
