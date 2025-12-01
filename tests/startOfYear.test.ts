import { describe, it, expect } from "vitest";
import { startOfYear } from "../src/startOfYear";

describe("startOfYear", () => {
  describe("happy path", () => {
    it("should return January 1st at midnight of same year", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 14, 30, 45, 123);

      // Act
      const result = startOfYear(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 0, 1, 0, 0, 0, 0).getTime());
    });

    it("should handle mid-year date", () => {
      // Arrange
      const date = new Date(2023, 6, 4, 12, 0, 0, 0);

      // Act
      const result = startOfYear(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2023, 0, 1, 0, 0, 0, 0).getTime());
    });

    it("should handle end-of-year date", () => {
      // Arrange
      const date = new Date(2024, 11, 25, 18, 45, 30, 500);

      // Act
      const result = startOfYear(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 0, 1, 0, 0, 0, 0).getTime());
    });

    it("should handle timestamp input", () => {
      // Arrange
      const timestamp = new Date(2024, 5, 15).getTime();

      // Act
      const result = startOfYear(timestamp);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 0, 1, 0, 0, 0, 0).getTime());
    });
  });

  describe("edge cases", () => {
    it("should handle first day of year - no change", () => {
      // Arrange
      const date = new Date(2024, 0, 1, 0, 0, 0, 0);

      // Act
      const result = startOfYear(date);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });

    it("should handle first day of year with milliseconds", () => {
      // Arrange
      const date = new Date(2024, 0, 1, 23, 59, 59, 999);

      // Act
      const result = startOfYear(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 0, 1, 0, 0, 0, 0).getTime());
    });

    it("should handle last day of year (December 31st)", () => {
      // Arrange
      const date = new Date(2024, 11, 31, 23, 59, 59, 999);

      // Act
      const result = startOfYear(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 0, 1, 0, 0, 0, 0).getTime());
    });

    it("should handle leap year February 29th", () => {
      // Arrange
      const date = new Date(2024, 1, 29, 12, 0, 0, 0);

      // Act
      const result = startOfYear(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 0, 1, 0, 0, 0, 0).getTime());
    });

    it("should handle non-leap year", () => {
      // Arrange
      const date = new Date(2023, 1, 28, 12, 0, 0, 0);

      // Act
      const result = startOfYear(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2023, 0, 1, 0, 0, 0, 0).getTime());
    });

    it("should handle century boundaries", () => {
      // Arrange
      const centuryBoundary1999 = new Date(1999, 11, 31, 23, 59, 59, 999);
      const centuryBoundary2000 = new Date(2000, 0, 1, 0, 0, 0, 0);

      // Act
      const result1999 = startOfYear(centuryBoundary1999);
      const result2000 = startOfYear(centuryBoundary2000);

      // Assert
      expect(result1999.getTime()).toBe(new Date(1999, 0, 1, 0, 0, 0, 0).getTime());
      expect(result2000.getTime()).toBe(new Date(2000, 0, 1, 0, 0, 0, 0).getTime());
    });

    it("should handle negative years (BCE dates)", () => {
      // Arrange
      const date = new Date(0, 6, 15);
      date.setFullYear(-100);

      // Act
      const result = startOfYear(date);

      // Assert
      expect(result.getFullYear()).toBe(-100);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(1);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });

    it("should handle extreme year values (year 9999)", () => {
      // Arrange
      const date = new Date(9999, 6, 15, 12, 30, 45, 123);

      // Act
      const result = startOfYear(date);

      // Assert
      expect(result.getFullYear()).toBe(9999);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(1);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });

    it("should handle extreme negative year values (year -9999)", () => {
      // Arrange
      const date = new Date(0, 6, 15, 12, 30, 45, 123);
      date.setFullYear(-9999);

      // Act
      const result = startOfYear(date);

      // Assert
      expect(result.getFullYear()).toBe(-9999);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(1);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });

    it("should not modify original Date object", () => {
      // Arrange
      const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);
      const originalTime = originalDate.getTime();

      // Act
      startOfYear(originalDate);

      // Assert
      expect(originalDate.getTime()).toBe(originalTime);
    });

    it("should return new Date object, not reference to input", () => {
      // Arrange
      const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);

      // Act
      const result = startOfYear(originalDate);

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
      const result = startOfYear(invalidDate);

      // Assert
      expect(Number.isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when input is NaN", () => {
      // Act
      const result = startOfYear(NaN as any);

      // Assert
      expect(Number.isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when input is Infinity", () => {
      // Arrange & Act
      const resultPositive = startOfYear(Infinity as any);
      const resultNegative = startOfYear(-Infinity as any);

      // Assert
      expect(Number.isNaN(resultPositive.getTime())).toBe(true);
      expect(Number.isNaN(resultNegative.getTime())).toBe(true);
    });
  });
});
