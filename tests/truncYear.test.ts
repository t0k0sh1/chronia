import { describe, it, expect } from "vitest";
import { truncYear } from "../src/truncYear";

describe("truncYear", () => {
  describe("happy path", () => {
    it("should truncate Date to start of year (January 1st)", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 14, 30, 45, 123);

      // Act
      const result = truncYear(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 0, 1, 0, 0, 0, 0).getTime());
    });

    it("should truncate timestamp to start of year", () => {
      // Arrange
      const timestamp = new Date(2024, 5, 15, 14, 30, 45, 123).getTime();

      // Act
      const result = truncYear(timestamp);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 0, 1, 0, 0, 0, 0).getTime());
    });

    it("should handle mid-year date", () => {
      // Arrange
      const date = new Date(2023, 6, 10, 12, 30, 0, 0);

      // Act
      const result = truncYear(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2023, 0, 1, 0, 0, 0, 0).getTime());
    });
  });

  describe("edge cases", () => {
    it("should handle start of year - no change", () => {
      // Arrange
      const date = new Date(2024, 0, 1, 0, 0, 0, 0);

      // Act
      const result = truncYear(date);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });

    it("should handle start of year with milliseconds", () => {
      // Arrange
      const date = new Date(1999, 0, 1, 0, 0, 0, 1);

      // Act
      const result = truncYear(date);

      // Assert
      expect(result.getTime()).toBe(new Date(1999, 0, 1, 0, 0, 0, 0).getTime());
    });

    it("should handle end of year (December 31st)", () => {
      // Arrange
      const date = new Date(2020, 11, 31, 23, 59, 59, 999);

      // Act
      const result = truncYear(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2020, 0, 1, 0, 0, 0, 0).getTime());
    });

    it("should handle leap years correctly", () => {
      // Arrange
      const date = new Date(2024, 2, 29, 12, 0, 0, 0); // Feb 29 in leap year

      // Act
      const result = truncYear(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 0, 1, 0, 0, 0, 0).getTime());
    });

    it("should not modify original Date object", () => {
      // Arrange
      const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);
      const originalTime = originalDate.getTime();

      // Act
      truncYear(originalDate);

      // Assert
      expect(originalDate.getTime()).toBe(originalTime);
    });
  });

  describe("invalid inputs", () => {
    it("should return Invalid Date when Date is invalid", () => {
      // Arrange
      const invalidDate = new Date("invalid");

      // Act
      const result = truncYear(invalidDate);

      // Assert
      expect(Number.isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when timestamp is NaN", () => {
      // Arrange
      const invalidTimestamp = NaN;

      // Act
      const result = truncYear(invalidTimestamp);

      // Assert
      expect(Number.isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when timestamp is Infinity", () => {
      // Arrange & Act
      const resultPositive = truncYear(Infinity);
      const resultNegative = truncYear(-Infinity);

      // Assert
      expect(Number.isNaN(resultPositive.getTime())).toBe(true);
      expect(Number.isNaN(resultNegative.getTime())).toBe(true);
    });
  });
});