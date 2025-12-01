import { describe, it, expect } from "vitest";
import { truncDay } from "../src/truncDay";

describe("truncDay", () => {
  describe("happy path", () => {
    it("should truncate Date to start of day (midnight)", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 14, 30, 45, 123);

      // Act
      const result = truncDay(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 5, 15, 0, 0, 0, 0).getTime());
    });

    it("should truncate timestamp to start of day", () => {
      // Arrange
      const timestamp = new Date(2024, 5, 15, 14, 30, 45, 123).getTime();

      // Act
      const result = truncDay(timestamp);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 5, 15, 0, 0, 0, 0).getTime());
    });

    it("should handle midday time", () => {
      // Arrange
      const date = new Date(2024, 7, 20, 12, 30, 45, 500);

      // Act
      const result = truncDay(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 7, 20, 0, 0, 0, 0).getTime());
    });
  });

  describe("edge cases", () => {
    it("should handle start of day (midnight) - no change", () => {
      // Arrange
      const date = new Date(2024, 6, 20, 0, 0, 0, 0);

      // Act
      const result = truncDay(date);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });

    it("should handle start of day with milliseconds", () => {
      // Arrange
      const date = new Date(2024, 3, 10, 0, 0, 0, 1);

      // Act
      const result = truncDay(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 3, 10, 0, 0, 0, 0).getTime());
    });

    it("should handle end of day (23:59:59.999)", () => {
      // Arrange
      const date = new Date(2023, 11, 31, 23, 59, 59, 999);

      // Act
      const result = truncDay(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2023, 11, 31, 0, 0, 0, 0).getTime());
    });

    it("should not modify original Date object", () => {
      // Arrange
      const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);
      const originalTime = originalDate.getTime();

      // Act
      truncDay(originalDate);

      // Assert
      expect(originalDate.getTime()).toBe(originalTime);
    });
  });

  describe("invalid inputs", () => {
    it("should return Invalid Date when Date is invalid", () => {
      // Arrange
      const invalidDate = new Date("invalid");

      // Act
      const result = truncDay(invalidDate);

      // Assert
      expect(Number.isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when timestamp is NaN", () => {
      // Arrange
      const invalidTimestamp = NaN;

      // Act
      const result = truncDay(invalidTimestamp);

      // Assert
      expect(Number.isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when timestamp is Infinity", () => {
      // Arrange & Act
      const resultPositive = truncDay(Infinity);
      const resultNegative = truncDay(-Infinity);

      // Assert
      expect(Number.isNaN(resultPositive.getTime())).toBe(true);
      expect(Number.isNaN(resultNegative.getTime())).toBe(true);
    });
  });
});