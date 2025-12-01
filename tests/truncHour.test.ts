import { describe, it, expect } from "vitest";
import { truncHour } from "../src/truncHour";

describe("truncHour", () => {
  describe("happy path", () => {
    it("should truncate Date to start of hour", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 14, 30, 45, 123);

      // Act
      const result = truncHour(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 5, 15, 14, 0, 0, 0).getTime());
    });

    it("should truncate timestamp to start of hour", () => {
      // Arrange
      const timestamp = new Date(2024, 5, 15, 14, 30, 45, 123).getTime();

      // Act
      const result = truncHour(timestamp);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 5, 15, 14, 0, 0, 0).getTime());
    });

    it("should handle midnight hour (hour 0)", () => {
      // Arrange
      const date = new Date(2024, 0, 1, 0, 30, 45, 500);

      // Act
      const result = truncHour(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 0, 1, 0, 0, 0, 0).getTime());
    });
  });

  describe("edge cases", () => {
    it("should handle start of hour - no change", () => {
      // Arrange
      const date = new Date(2024, 3, 10, 8, 0, 0, 0);

      // Act
      const result = truncHour(date);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });

    it("should handle start of hour with milliseconds", () => {
      // Arrange
      const date = new Date(2024, 6, 15, 12, 0, 0, 1);

      // Act
      const result = truncHour(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 6, 15, 12, 0, 0, 0).getTime());
    });

    it("should handle end of hour (59:59.999)", () => {
      // Arrange
      const date = new Date(2023, 11, 25, 23, 59, 59, 999);

      // Act
      const result = truncHour(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2023, 11, 25, 23, 0, 0, 0).getTime());
    });

    it("should work across all 24 hours", () => {
      // Arrange & Act & Assert
      for (let hour = 0; hour < 24; hour++) {
        const date = new Date(2024, 0, 1, hour, 30, 45, 123);
        const result = truncHour(date);

        expect(result.getHours()).toBe(hour);
        expect(result.getMinutes()).toBe(0);
        expect(result.getSeconds()).toBe(0);
        expect(result.getMilliseconds()).toBe(0);
      }
    });

    it("should not modify original Date object", () => {
      // Arrange
      const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);
      const originalTime = originalDate.getTime();

      // Act
      truncHour(originalDate);

      // Assert
      expect(originalDate.getTime()).toBe(originalTime);
    });
  });

  describe("invalid inputs", () => {
    it("should return Invalid Date when Date is invalid", () => {
      // Arrange
      const invalidDate = new Date("invalid");

      // Act
      const result = truncHour(invalidDate);

      // Assert
      expect(Number.isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when timestamp is NaN", () => {
      // Arrange
      const invalidTimestamp = NaN;

      // Act
      const result = truncHour(invalidTimestamp);

      // Assert
      expect(Number.isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when timestamp is Infinity", () => {
      // Arrange & Act
      const resultPositive = truncHour(Infinity);
      const resultNegative = truncHour(-Infinity);

      // Assert
      expect(Number.isNaN(resultPositive.getTime())).toBe(true);
      expect(Number.isNaN(resultNegative.getTime())).toBe(true);
    });
  });
});