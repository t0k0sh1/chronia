import { describe, it, expect } from "vitest";
import { truncMinute } from "../src/truncMinute";

describe("truncMinute", () => {
  describe("happy path", () => {
    it("should truncate Date to start of minute", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 14, 30, 45, 123);

      // Act
      const result = truncMinute(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 5, 15, 14, 30, 0, 0).getTime());
    });

    it("should truncate timestamp to start of minute", () => {
      // Arrange
      const timestamp = new Date(2024, 5, 15, 14, 30, 45, 123).getTime();

      // Act
      const result = truncMinute(timestamp);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 5, 15, 14, 30, 0, 0).getTime());
    });

    it("should handle minute 0", () => {
      // Arrange
      const date = new Date(2024, 2, 10, 9, 0, 30, 500);

      // Act
      const result = truncMinute(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 2, 10, 9, 0, 0, 0).getTime());
    });
  });

  describe("edge cases", () => {
    it("should handle start of minute - no change", () => {
      // Arrange
      const date = new Date(2024, 4, 20, 11, 25, 0, 0);

      // Act
      const result = truncMinute(date);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });

    it("should handle start of minute with milliseconds", () => {
      // Arrange
      const date = new Date(2024, 7, 25, 18, 45, 0, 1);

      // Act
      const result = truncMinute(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 7, 25, 18, 45, 0, 0).getTime());
    });

    it("should handle end of minute (59.999)", () => {
      // Arrange
      const date = new Date(2023, 10, 15, 12, 59, 59, 999);

      // Act
      const result = truncMinute(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2023, 10, 15, 12, 59, 0, 0).getTime());
    });

    it("should work across all 60 minutes", () => {
      // Arrange & Act & Assert
      for (let minute = 0; minute < 60; minute++) {
        const date = new Date(2024, 0, 1, 12, minute, 30, 456);
        const result = truncMinute(date);

        expect(result.getHours()).toBe(12);
        expect(result.getMinutes()).toBe(minute);
        expect(result.getSeconds()).toBe(0);
        expect(result.getMilliseconds()).toBe(0);
      }
    });

    it("should not modify original Date object", () => {
      // Arrange
      const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);
      const originalTime = originalDate.getTime();

      // Act
      truncMinute(originalDate);

      // Assert
      expect(originalDate.getTime()).toBe(originalTime);
    });
  });

  describe("invalid inputs", () => {
    it("should return Invalid Date when Date is invalid", () => {
      // Arrange
      const invalidDate = new Date("invalid");

      // Act
      const result = truncMinute(invalidDate);

      // Assert
      expect(Number.isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when timestamp is NaN", () => {
      // Arrange
      const invalidTimestamp = NaN;

      // Act
      const result = truncMinute(invalidTimestamp);

      // Assert
      expect(Number.isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when timestamp is Infinity", () => {
      // Arrange & Act
      const resultPositive = truncMinute(Infinity);
      const resultNegative = truncMinute(-Infinity);

      // Assert
      expect(Number.isNaN(resultPositive.getTime())).toBe(true);
      expect(Number.isNaN(resultNegative.getTime())).toBe(true);
    });
  });
});