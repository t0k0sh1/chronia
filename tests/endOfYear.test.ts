import { describe, it, expect } from "vitest";
import { endOfYear } from "../src/endOfYear";

describe("endOfYear", () => {
  describe("happy path", () => {
    it("should return December 31st at end of day of same year", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 14, 30, 45, 123);

      // Act
      const result = endOfYear(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 11, 31, 23, 59, 59, 999).getTime());
    });

    it("should handle mid-year date", () => {
      // Arrange
      const date = new Date(2023, 6, 4, 12, 0, 0, 0);

      // Act
      const result = endOfYear(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2023, 11, 31, 23, 59, 59, 999).getTime());
    });

    it("should handle first day of year", () => {
      // Arrange
      const date = new Date(2024, 0, 1, 0, 0, 0, 0);

      // Act
      const result = endOfYear(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 11, 31, 23, 59, 59, 999).getTime());
    });

    it("should handle timestamp input", () => {
      // Arrange
      const timestamp = new Date(2024, 5, 15).getTime();

      // Act
      const result = endOfYear(timestamp);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 11, 31, 23, 59, 59, 999).getTime());
    });
  });

  describe("edge cases", () => {
    it("should handle last day of year - no change", () => {
      // Arrange
      const date = new Date(2024, 11, 31, 23, 59, 59, 999);

      // Act
      const result = endOfYear(date);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });

    it("should handle last day of year with earlier time", () => {
      // Arrange
      const date = new Date(2024, 11, 31, 12, 30, 0, 0);

      // Act
      const result = endOfYear(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 11, 31, 23, 59, 59, 999).getTime());
    });

    it("should handle leap year February 29th", () => {
      // Arrange
      const date = new Date(2024, 1, 29, 12, 0, 0, 0);

      // Act
      const result = endOfYear(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 11, 31, 23, 59, 59, 999).getTime());
    });

    it("should handle non-leap year", () => {
      // Arrange
      const date = new Date(2023, 1, 28, 12, 0, 0, 0);

      // Act
      const result = endOfYear(date);

      // Assert
      expect(result.getTime()).toBe(new Date(2023, 11, 31, 23, 59, 59, 999).getTime());
    });

    it("should handle century boundaries", () => {
      // Arrange
      const centuryBoundary1999 = new Date(1999, 6, 15, 12, 0, 0, 0);
      const centuryBoundary2000 = new Date(2000, 5, 10, 12, 0, 0, 0);

      // Act
      const result1999 = endOfYear(centuryBoundary1999);
      const result2000 = endOfYear(centuryBoundary2000);

      // Assert
      expect(result1999.getTime()).toBe(new Date(1999, 11, 31, 23, 59, 59, 999).getTime());
      expect(result2000.getTime()).toBe(new Date(2000, 11, 31, 23, 59, 59, 999).getTime());
    });

    it("should handle negative years (BCE dates)", () => {
      // Arrange
      const date = new Date(0, 6, 15);
      date.setFullYear(-100);

      // Act
      const result = endOfYear(date);

      // Assert
      expect(result.getFullYear()).toBe(-100);
      expect(result.getMonth()).toBe(11);
      expect(result.getDate()).toBe(31);
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
      expect(result.getMilliseconds()).toBe(999);
    });

    it("should handle extreme year values (year 9999)", () => {
      // Arrange
      const date = new Date(9999, 6, 15, 12, 30, 45, 123);

      // Act
      const result = endOfYear(date);

      // Assert
      expect(result.getFullYear()).toBe(9999);
      expect(result.getMonth()).toBe(11);
      expect(result.getDate()).toBe(31);
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
      expect(result.getMilliseconds()).toBe(999);
    });

    it("should handle extreme negative year values (year -9999)", () => {
      // Arrange
      const date = new Date(0, 6, 15, 12, 30, 45, 123);
      date.setFullYear(-9999);

      // Act
      const result = endOfYear(date);

      // Assert
      expect(result.getFullYear()).toBe(-9999);
      expect(result.getMonth()).toBe(11);
      expect(result.getDate()).toBe(31);
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
      expect(result.getMilliseconds()).toBe(999);
    });

    it("should not modify original Date object", () => {
      // Arrange
      const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);
      const originalTime = originalDate.getTime();

      // Act
      endOfYear(originalDate);

      // Assert
      expect(originalDate.getTime()).toBe(originalTime);
    });

    it("should return new Date object, not reference to input", () => {
      // Arrange
      const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);

      // Act
      const result = endOfYear(originalDate);

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
      const result = endOfYear(invalidDate);

      // Assert
      expect(Number.isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when input is NaN", () => {
      // Act
      // @ts-expect-error - Testing runtime behavior with invalid input type
      const result = endOfYear(NaN);

      // Assert
      expect(Number.isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when input is Infinity", () => {
      // Arrange & Act
      // @ts-expect-error - Testing runtime behavior with invalid input type
      const resultPositive = endOfYear(Infinity);
      // @ts-expect-error - Testing runtime behavior with invalid input type
      const resultNegative = endOfYear(-Infinity);

      // Assert
      expect(Number.isNaN(resultPositive.getTime())).toBe(true);
      expect(Number.isNaN(resultNegative.getTime())).toBe(true);
    });
  });
});
