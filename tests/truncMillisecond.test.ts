import { describe, it, expect } from "vitest";
import { truncMillisecond } from "../src/truncMillisecond";

describe("truncMillisecond", () => {
  describe("happy path", () => {
    it("should return same Date with millisecond precision (no truncation)", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 14, 30, 45, 123);

      // Act
      const result = truncMillisecond(date);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });

    it("should return same timestamp with millisecond precision", () => {
      // Arrange
      const timestamp = new Date(2024, 5, 15, 14, 30, 45, 123).getTime();

      // Act
      const result = truncMillisecond(timestamp);

      // Assert
      expect(result.getTime()).toBe(timestamp);
    });

    it("should preserve mid-range milliseconds", () => {
      // Arrange
      const date = new Date(2023, 6, 15, 12, 30, 45, 500);

      // Act
      const result = truncMillisecond(date);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });
  });

  describe("edge cases", () => {
    it("should preserve zero milliseconds", () => {
      // Arrange
      const date = new Date(2024, 0, 1, 0, 0, 0, 0);

      // Act
      const result = truncMillisecond(date);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });

    it("should preserve maximum milliseconds (999)", () => {
      // Arrange
      const date = new Date(2024, 11, 31, 23, 59, 59, 999);

      // Act
      const result = truncMillisecond(date);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });

    it("should handle epoch date (timestamp 0)", () => {
      // Arrange
      const EPOCH = 0;

      // Act
      const result = truncMillisecond(EPOCH);

      // Assert
      expect(result.getTime()).toBe(EPOCH);
    });

    it("should maintain millisecond precision across all values", () => {
      // Arrange & Act & Assert
      for (let ms = 0; ms < 1000; ms += 50) {
        const date = new Date(2024, 0, 1, 12, 0, 0, ms);
        const result = truncMillisecond(date);

        expect(result.getMilliseconds()).toBe(ms);
        expect(result.getTime()).toBe(date.getTime());
      }
    });

    it("should return new Date object, not reference to input", () => {
      // Arrange
      const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);

      // Act
      const result = truncMillisecond(originalDate);

      // Assert
      expect(result).not.toBe(originalDate);
      expect(result.getTime()).toBe(originalDate.getTime());
    });

    it("should not modify original Date object", () => {
      // Arrange
      const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);
      const originalTime = originalDate.getTime();

      // Act
      truncMillisecond(originalDate);

      // Assert
      expect(originalDate.getTime()).toBe(originalTime);
    });
  });

  describe("invalid inputs", () => {
    it("should return Invalid Date when Date is invalid", () => {
      // Arrange
      const invalidDate = new Date("invalid");

      // Act
      const result = truncMillisecond(invalidDate);

      // Assert
      expect(Number.isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when timestamp is NaN", () => {
      // Arrange
      const invalidTimestamp = NaN;

      // Act
      const result = truncMillisecond(invalidTimestamp);

      // Assert
      expect(Number.isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when timestamp is Infinity", () => {
      // Arrange & Act
      const resultPositive = truncMillisecond(Infinity);
      const resultNegative = truncMillisecond(-Infinity);

      // Assert
      expect(Number.isNaN(resultPositive.getTime())).toBe(true);
      expect(Number.isNaN(resultNegative.getTime())).toBe(true);
    });
  });
});