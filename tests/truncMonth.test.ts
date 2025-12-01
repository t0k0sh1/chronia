import { describe, it, expect } from "vitest";
import { truncMonth } from "../src/truncMonth";

describe("truncMonth", () => {
  describe("happy path", () => {
    it("should truncate Date to start of month (first day)", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 14, 30, 45, 123);

      // Act
      const result = truncMonth(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 5, 1, 0, 0, 0, 0).getTime());
    });

    it("should truncate timestamp to start of month", () => {
      // Arrange
      const timestamp = new Date(2024, 5, 15, 14, 30, 45, 123).getTime();

      // Act
      const result = truncMonth(timestamp);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 5, 1, 0, 0, 0, 0).getTime());
    });

    it("should handle mid-year month", () => {
      // Arrange
      const date = new Date(2023, 6, 4, 6, 15, 30, 500);

      // Act
      const result = truncMonth(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2023, 6, 1, 0, 0, 0, 0).getTime());
    });
  });

  describe("edge cases", () => {
    it("should handle January (month 0)", () => {
      // Arrange
      const date = new Date(2024, 0, 31, 23, 59, 59, 999);

      // Act
      const result = truncMonth(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 0, 1, 0, 0, 0, 0).getTime());
    });

    it("should handle December (month 11)", () => {
      // Arrange
      const date = new Date(2024, 11, 25, 12, 30, 0, 0);

      // Act
      const result = truncMonth(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 11, 1, 0, 0, 0, 0).getTime());
    });

    it("should handle February in leap years", () => {
      // Arrange
      const date = new Date(2024, 1, 29, 12, 0, 0, 0);

      // Act
      const result = truncMonth(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 1, 1, 0, 0, 0, 0).getTime());
    });

    it("should handle first day of month with milliseconds", () => {
      // Arrange
      const date = new Date(2024, 3, 1, 0, 0, 0, 1);

      // Act
      const result = truncMonth(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 3, 1, 0, 0, 0, 0).getTime());
    });

    it("should not modify original Date object", () => {
      // Arrange
      const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);
      const originalTime = originalDate.getTime();

      // Act
      truncMonth(originalDate);

      // Assert
      expect(originalDate.getTime()).toBe(originalTime);
    });
  });

  describe("invalid inputs", () => {
    it("should return Invalid Date when Date is invalid", () => {
      // Arrange
      const invalidDate = new Date("invalid");

      // Act
      const result = truncMonth(invalidDate);

      // Assert
      expect(Number.isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when timestamp is NaN", () => {
      // Arrange
      const invalidTimestamp = NaN;

      // Act
      const result = truncMonth(invalidTimestamp);

      // Assert
      expect(Number.isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when timestamp is Infinity", () => {
      // Arrange & Act
      const resultPositive = truncMonth(Infinity);
      const resultNegative = truncMonth(-Infinity);

      // Assert
      expect(Number.isNaN(resultPositive.getTime())).toBe(true);
      expect(Number.isNaN(resultNegative.getTime())).toBe(true);
    });
  });
});