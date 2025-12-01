import { describe, it, expect } from "vitest";
import { startOfDay } from "../src/startOfDay";

describe("startOfDay", () => {
  describe("happy path", () => {
    it("should return midnight of the same date", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 14, 30, 45, 123);

      // Act
      const result = startOfDay(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 5, 15, 0, 0, 0, 0).getTime());
    });

    it("should handle noon time", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 12, 0, 0, 0);

      // Act
      const result = startOfDay(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 5, 15, 0, 0, 0, 0).getTime());
    });

    it("should handle evening time", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 18, 45, 30, 500);

      // Act
      const result = startOfDay(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 5, 15, 0, 0, 0, 0).getTime());
    });

    it("should handle timestamp input", () => {
      // Arrange
      const timestamp = new Date(2024, 5, 15, 14, 30, 45, 123).getTime();

      // Act
      const result = startOfDay(timestamp);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 5, 15, 0, 0, 0, 0).getTime());
    });
  });

  describe("edge cases", () => {
    it("should handle midnight time - no change", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 0, 0, 0, 0);

      // Act
      const result = startOfDay(date);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });

    it("should handle end of day (23:59:59.999)", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 23, 59, 59, 999);

      // Act
      const result = startOfDay(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 5, 15, 0, 0, 0, 0).getTime());
    });

    it("should handle first day of year (January 1st)", () => {
      // Arrange
      const date = new Date(2024, 0, 1, 12, 0, 0);

      // Act
      const result = startOfDay(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 0, 1, 0, 0, 0, 0).getTime());
    });

    it("should handle last day of year (December 31st)", () => {
      // Arrange
      const date = new Date(2024, 11, 31, 23, 30, 0);

      // Act
      const result = startOfDay(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 11, 31, 0, 0, 0, 0).getTime());
    });

    it("should handle leap year February 29th", () => {
      // Arrange
      const date = new Date(2024, 1, 29, 14, 30, 45);

      // Act
      const result = startOfDay(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 1, 29, 0, 0, 0, 0).getTime());
    });

    it("should not modify original Date object", () => {
      // Arrange
      const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);
      const originalTime = originalDate.getTime();

      // Act
      startOfDay(originalDate);

      // Assert
      expect(originalDate.getTime()).toBe(originalTime);
    });

    it("should return new Date object, not reference to input", () => {
      // Arrange
      const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);

      // Act
      const result = startOfDay(originalDate);

      // Assert
      expect(result).not.toBe(originalDate);
      expect(result).toBeInstanceOf(Date);
    });

    it("should handle DST transition dates correctly", () => {
      // Arrange - US DST "spring forward" transition (second Sunday in March 2024)
      // March 10, 2024 at 2:00 AM clocks moved forward to 3:00 AM
      const dstTransitionDate = new Date(2024, 2, 10, 14, 30, 45, 123);

      // Act
      const result = startOfDay(dstTransitionDate);

      // Assert - Should return midnight (00:00:00.000) in local time
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(2); // March
      expect(result.getDate()).toBe(10);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });
  });

  describe("invalid inputs", () => {
    it("should return Invalid Date when Date is invalid", () => {
      // Arrange
      const invalidDate = new Date("invalid");

      // Act
      const result = startOfDay(invalidDate);

      // Assert
      expect(Number.isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when input is NaN", () => {
      // Act
      const result = startOfDay(NaN as any);

      // Assert
      expect(Number.isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when input is Infinity", () => {
      // Arrange & Act
      const resultPositive = startOfDay(Infinity as any);
      const resultNegative = startOfDay(-Infinity as any);

      // Assert
      expect(Number.isNaN(resultPositive.getTime())).toBe(true);
      expect(Number.isNaN(resultNegative.getTime())).toBe(true);
    });
  });
});