import { describe, it, expect } from "vitest";
import { truncateToUnit } from "../../src/_lib/truncateToUnit";

describe("truncateToUnit", () => {
  describe("happy path", () => {
    it("should truncate to year (typical mid-year date)", () => {
      // Arrange
      const date = new Date(2024, 6, 15, 14, 30, 45, 678);

      // Act
      const result = truncateToUnit(date, "year");

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 0, 1, 0, 0, 0, 0).getTime());
    });

    it("should truncate to month (typical mid-month date)", () => {
      // Arrange
      const date = new Date(2024, 6, 15, 14, 30, 45, 678);

      // Act
      const result = truncateToUnit(date, "month");

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 6, 1, 0, 0, 0, 0).getTime());
    });

    it("should truncate to day (typical mid-day time)", () => {
      // Arrange
      const date = new Date(2024, 6, 15, 14, 30, 45, 678);

      // Act
      const result = truncateToUnit(date, "day");

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 6, 15, 0, 0, 0, 0).getTime());
    });

    it("should truncate to hour (typical mid-hour time)", () => {
      // Arrange
      const date = new Date(2024, 6, 15, 14, 30, 45, 678);

      // Act
      const result = truncateToUnit(date, "hour");

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 6, 15, 14, 0, 0, 0).getTime());
    });

    it("should truncate to minute (typical mid-minute time)", () => {
      // Arrange
      const date = new Date(2024, 6, 15, 14, 30, 45, 678);

      // Act
      const result = truncateToUnit(date, "minute");

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 6, 15, 14, 30, 0, 0).getTime());
    });

    it("should truncate to second (typical mid-second time)", () => {
      // Arrange
      const date = new Date(2024, 6, 15, 14, 30, 45, 678);

      // Act
      const result = truncateToUnit(date, "second");

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 6, 15, 14, 30, 45, 0).getTime());
    });

    it("should return unchanged Date for millisecond", () => {
      // Arrange
      const date = new Date(2024, 6, 15, 14, 30, 45, 678);

      // Act
      const result = truncateToUnit(date, "millisecond");

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });
  });

  describe("edge cases", () => {
    it("should handle year boundary - first day of year", () => {
      // Arrange
      const date = new Date(2024, 0, 1, 14, 30, 45, 678);

      // Act
      const resultYear = truncateToUnit(date, "year");
      const resultMonth = truncateToUnit(date, "month");

      // Assert
      expect(resultYear.getTime()).toBe(new Date(2024, 0, 1, 0, 0, 0, 0).getTime());
      expect(resultMonth.getTime()).toBe(new Date(2024, 0, 1, 0, 0, 0, 0).getTime());
    });

    it("should handle year boundary - last day of year", () => {
      // Arrange
      const date = new Date(2024, 11, 31, 23, 59, 59, 999);

      // Act
      const result = truncateToUnit(date, "year");

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 0, 1, 0, 0, 0, 0).getTime());
    });

    it("should handle month boundary - first day of month", () => {
      // Arrange
      const date = new Date(2024, 6, 1, 14, 30, 45, 678);

      // Act
      const resultMonth = truncateToUnit(date, "month");
      const resultDay = truncateToUnit(date, "day");

      // Assert
      expect(resultMonth.getTime()).toBe(new Date(2024, 6, 1, 0, 0, 0, 0).getTime());
      expect(resultDay.getTime()).toBe(new Date(2024, 6, 1, 0, 0, 0, 0).getTime());
    });

    it("should handle month boundary - last day of month", () => {
      // Arrange
      const date = new Date(2024, 1, 28, 23, 59, 59, 999);

      // Act
      const result = truncateToUnit(date, "month");

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 1, 1, 0, 0, 0, 0).getTime());
    });

    it("should handle day boundary - midnight", () => {
      // Arrange
      const date = new Date(2024, 6, 15, 0, 0, 0, 0);

      // Act
      const result = truncateToUnit(date, "day");

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });

    it("should handle day boundary - end of day", () => {
      // Arrange
      const date = new Date(2024, 6, 15, 23, 59, 59, 999);

      // Act
      const result = truncateToUnit(date, "day");

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 6, 15, 0, 0, 0, 0).getTime());
    });

    it("should handle hour boundary - start of hour", () => {
      // Arrange
      const date = new Date(2024, 6, 15, 14, 0, 0, 0);

      // Act
      const result = truncateToUnit(date, "hour");

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });

    it("should handle hour boundary - end of hour", () => {
      // Arrange
      const date = new Date(2024, 6, 15, 14, 59, 59, 999);

      // Act
      const result = truncateToUnit(date, "hour");

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 6, 15, 14, 0, 0, 0).getTime());
    });

    it("should handle minute boundary - start of minute", () => {
      // Arrange
      const date = new Date(2024, 6, 15, 14, 30, 0, 0);

      // Act
      const result = truncateToUnit(date, "minute");

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });

    it("should handle minute boundary - end of minute", () => {
      // Arrange
      const date = new Date(2024, 6, 15, 14, 30, 59, 999);

      // Act
      const result = truncateToUnit(date, "minute");

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 6, 15, 14, 30, 0, 0).getTime());
    });

    it("should handle second boundary - start of second", () => {
      // Arrange
      const date = new Date(2024, 6, 15, 14, 30, 45, 0);

      // Act
      const result = truncateToUnit(date, "second");

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });

    it("should handle second boundary - end of second", () => {
      // Arrange
      const date = new Date(2024, 6, 15, 14, 30, 45, 999);

      // Act
      const result = truncateToUnit(date, "second");

      // Assert
      expect(result.getTime()).toBe(new Date(2024, 6, 15, 14, 30, 45, 0).getTime());
    });

    it("should handle leap year February 29th", () => {
      // Arrange
      const date = new Date(2024, 1, 29, 14, 30, 45, 678);

      // Act
      const resultYear = truncateToUnit(date, "year");
      const resultMonth = truncateToUnit(date, "month");

      // Assert
      expect(resultYear.getTime()).toBe(new Date(2024, 0, 1, 0, 0, 0, 0).getTime());
      expect(resultMonth.getTime()).toBe(new Date(2024, 1, 1, 0, 0, 0, 0).getTime());
    });

    it("should not modify original Date object", () => {
      // Arrange
      const originalDate = new Date(2024, 6, 15, 14, 30, 45, 678);
      const originalTime = originalDate.getTime();

      // Act
      truncateToUnit(originalDate, "year");

      // Assert
      expect(originalDate.getTime()).toBe(originalTime);
    });

    it("should return new Date object, not reference to input", () => {
      // Arrange
      const originalDate = new Date(2024, 6, 15, 14, 30, 45, 678);

      // Act
      const result = truncateToUnit(originalDate, "year");

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
      const result = truncateToUnit(invalidDate, "year");

      // Assert
      expect(Number.isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when input is NaN", () => {
      // Act
      const result = truncateToUnit(NaN as any, "year");

      // Assert
      expect(Number.isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when input is Infinity", () => {
      // Arrange & Act
      const resultPositive = truncateToUnit(Infinity as any, "year");
      const resultNegative = truncateToUnit(-Infinity as any, "year");

      // Assert
      expect(Number.isNaN(resultPositive.getTime())).toBe(true);
      expect(Number.isNaN(resultNegative.getTime())).toBe(true);
    });
  });
});
