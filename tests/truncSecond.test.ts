import { describe, it, expect } from "vitest";
import { truncSecond } from "../src/truncSecond";

describe("truncSecond", () => {
  describe("happy path", () => {
    it("should truncate Date to start of second", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 14, 30, 45, 123);

      // Act
      const result = truncSecond(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 5, 15, 14, 30, 45, 0).getTime());
    });

    it("should truncate timestamp to start of second", () => {
      // Arrange
      const timestamp = new Date(2024, 5, 15, 14, 30, 45, 123).getTime();

      // Act
      const result = truncSecond(timestamp);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 5, 15, 14, 30, 45, 0).getTime());
    });

    it("should handle mid-range second", () => {
      // Arrange
      const date = new Date(2024, 9, 31, 22, 45, 30, 1);

      // Act
      const result = truncSecond(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 9, 31, 22, 45, 30, 0).getTime());
    });
  });

  describe("edge cases", () => {
    it("should handle second 0", () => {
      // Arrange
      const date = new Date(2024, 0, 5, 8, 15, 0, 500);

      // Act
      const result = truncSecond(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 0, 5, 8, 15, 0, 0).getTime());
    });

    it("should handle second 59 with maximum milliseconds", () => {
      // Arrange
      const date = new Date(2023, 6, 4, 16, 20, 59, 999);

      // Act
      const result = truncSecond(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2023, 6, 4, 16, 20, 59, 0).getTime());
    });

    it("should handle start of second - no change", () => {
      // Arrange
      const date = new Date(2024, 3, 18, 13, 42, 28, 0);

      // Act
      const result = truncSecond(date);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });

    it("should work across all 60 seconds", () => {
      // Arrange & Act & Assert
      for (let second = 0; second < 60; second++) {
        const date = new Date(2024, 0, 1, 12, 30, second, 789);
        const result = truncSecond(date);

        expect(result.getHours()).toBe(12);
        expect(result.getMinutes()).toBe(30);
        expect(result.getSeconds()).toBe(second);
        expect(result.getMilliseconds()).toBe(0);
      }
    });

    it("should not modify original Date object", () => {
      // Arrange
      const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);
      const originalTime = originalDate.getTime();

      // Act
      truncSecond(originalDate);

      // Assert
      expect(originalDate.getTime()).toBe(originalTime);
    });
  });

  describe("invalid inputs", () => {
    it("should return Invalid Date when Date is invalid", () => {
      // Arrange
      const invalidDate = new Date("invalid");

      // Act
      const result = truncSecond(invalidDate);

      // Assert
      expect(Number.isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when timestamp is NaN", () => {
      // Arrange
      const invalidTimestamp = NaN;

      // Act
      const result = truncSecond(invalidTimestamp);

      // Assert
      expect(Number.isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when timestamp is Infinity", () => {
      // Arrange & Act
      const resultPositive = truncSecond(Infinity);
      const resultNegative = truncSecond(-Infinity);

      // Assert
      expect(Number.isNaN(resultPositive.getTime())).toBe(true);
      expect(Number.isNaN(resultNegative.getTime())).toBe(true);
    });
  });
});