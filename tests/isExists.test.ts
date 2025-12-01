import { describe, it, expect } from "vitest";
import { isExists } from "../src/isExists";

describe("isExists", () => {
  describe("happy path", () => {
    it("should return true for typical valid date", () => {
      // Arrange & Act
      const result = isExists(2024, 6, 15);

      // Assert
      expect(result).toBe(true);
    });

    it("should return true for valid year boundary dates", () => {
      // Arrange & Act
      const resultJan1 = isExists(2024, 1, 1);
      const resultDec31 = isExists(2024, 12, 31);

      // Assert
      expect(resultJan1).toBe(true);
      expect(resultDec31).toBe(true);
    });

    it("should return true for valid leap year date", () => {
      // Arrange & Act
      const result = isExists(2024, 2, 29);

      // Assert
      expect(result).toBe(true);
    });
  });

  describe("edge cases", () => {
    it("should handle leap year - 4-year rule (2024)", () => {
      // Arrange & Act
      const feb29Exists = isExists(2024, 2, 29);
      const feb28Exists = isExists(2024, 2, 28);

      // Assert
      expect(feb29Exists).toBe(true);
      expect(feb28Exists).toBe(true);
    });

    it("should handle leap year - 400-year rule (2000)", () => {
      // Arrange & Act
      const result = isExists(2000, 2, 29);

      // Assert
      expect(result).toBe(true);
    });

    it("should handle non-leap year - 100-year rule (1900)", () => {
      // Arrange & Act
      const feb29 = isExists(1900, 2, 29);
      const feb28 = isExists(1900, 2, 28);

      // Assert
      expect(feb29).toBe(false);
      expect(feb28).toBe(true);
    });

    it("should handle non-leap year - 100-year rule (2100)", () => {
      // Arrange & Act
      const result = isExists(2100, 2, 29);

      // Assert
      expect(result).toBe(false);
    });

    it("should handle common year February (2023)", () => {
      // Arrange & Act
      const feb29 = isExists(2023, 2, 29);
      const feb28 = isExists(2023, 2, 28);

      // Assert
      expect(feb29).toBe(false);
      expect(feb28).toBe(true);
    });

    it("should handle 31-day month boundaries (January)", () => {
      // Arrange & Act
      const day1 = isExists(2024, 1, 1);
      const day31 = isExists(2024, 1, 31);
      const day32 = isExists(2024, 1, 32);
      const day0 = isExists(2024, 1, 0);

      // Assert
      expect(day1).toBe(true);
      expect(day31).toBe(true);
      expect(day32).toBe(false);
      expect(day0).toBe(false);
    });

    it("should handle 30-day month boundaries (April)", () => {
      // Arrange & Act
      const day1 = isExists(2024, 4, 1);
      const day30 = isExists(2024, 4, 30);
      const day31 = isExists(2024, 4, 31);

      // Assert
      expect(day1).toBe(true);
      expect(day30).toBe(true);
      expect(day31).toBe(false);
    });

    it("should handle February boundaries in common year", () => {
      // Arrange & Act
      const day1 = isExists(2023, 2, 1);
      const day28 = isExists(2023, 2, 28);
      const day29 = isExists(2023, 2, 29);
      const day30 = isExists(2023, 2, 30);

      // Assert
      expect(day1).toBe(true);
      expect(day28).toBe(true);
      expect(day29).toBe(false);
      expect(day30).toBe(false);
    });

    it("should handle month range boundaries (1-12)", () => {
      // Arrange & Act
      const month0 = isExists(2024, 0, 1);
      const month1 = isExists(2024, 1, 1);
      const month12 = isExists(2024, 12, 1);
      const month13 = isExists(2024, 13, 1);

      // Assert
      expect(month0).toBe(false);
      expect(month1).toBe(true);
      expect(month12).toBe(true);
      expect(month13).toBe(false);
    });

    it("should handle non-existent dates in various months", () => {
      // Arrange & Act
      const feb31 = isExists(2024, 2, 31);
      const jun31 = isExists(2024, 6, 31);
      const sep31 = isExists(2024, 9, 31);
      const nov31 = isExists(2024, 11, 31);

      // Assert
      expect(feb31).toBe(false);
      expect(jun31).toBe(false);
      expect(sep31).toBe(false);
      expect(nov31).toBe(false);
    });

    it("should handle fractional year values", () => {
      // Arrange & Act
      const result2024_9 = isExists(2024.9, 1, 15);
      const result2024_5Feb29 = isExists(2024.5, 2, 29);

      // Assert
      expect(result2024_9).toBe(true);
      expect(result2024_5Feb29).toBe(true);
    });

    it("should handle fractional month values", () => {
      // Arrange & Act
      const month1_7 = isExists(2024, 1.7, 15);
      const month2_9 = isExists(2024, 2.9, 29);

      // Assert
      expect(month1_7).toBe(true);
      expect(month2_9).toBe(true);
    });

    it("should handle fractional day values", () => {
      // Arrange & Act
      const day15_3 = isExists(2024, 1, 15.3);
      const day31_9 = isExists(2024, 1, 31.9);

      // Assert
      expect(day15_3).toBe(true);
      expect(day31_9).toBe(true);
    });

    it("should handle fractional values for non-existent dates", () => {
      // Arrange & Act
      const result2023Feb29 = isExists(2023.9, 2.9, 29.1);
      const resultApr31 = isExists(2024, 4.9, 31.1);

      // Assert
      expect(result2023Feb29).toBe(false);
      expect(resultApr31).toBe(false);
    });

    it("should handle special year 0", () => {
      // Arrange & Act
      const result = isExists(0, 1, 1);

      // Assert
      expect(result).toBe(true);
    });

    it("should handle negative years (BCE dates)", () => {
      // Arrange & Act
      const yearNeg1 = isExists(-1, 1, 1);
      const yearNeg2024 = isExists(-2024, 1, 1);

      // Assert
      expect(yearNeg1).toBe(true);
      expect(yearNeg2024).toBe(true);
    });

    it("should handle distant future year (9999)", () => {
      // Arrange & Act
      const result = isExists(9999, 12, 31);

      // Assert
      expect(result).toBe(true);
    });

    it("should handle negative month values", () => {
      // Arrange & Act
      const result = isExists(2024, -1, 1);

      // Assert
      expect(result).toBe(false);
    });

    it("should handle negative day values", () => {
      // Arrange & Act
      const result = isExists(2024, 1, -1);

      // Assert
      expect(result).toBe(false);
    });
  });

  describe("invalid inputs", () => {
    it("should return false for NaN year", () => {
      // Arrange & Act
      const result = isExists(NaN, 1, 1);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false for NaN month", () => {
      // Arrange & Act
      const result = isExists(2024, NaN, 1);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false for NaN day", () => {
      // Arrange & Act
      const result = isExists(2024, 1, NaN);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false for all NaN values", () => {
      // Arrange & Act
      const result = isExists(NaN, NaN, NaN);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false for Infinity year", () => {
      // Arrange & Act
      const resultPositive = isExists(Infinity, 1, 1);
      const resultNegative = isExists(-Infinity, 1, 1);

      // Assert
      expect(resultPositive).toBe(false);
      expect(resultNegative).toBe(false);
    });

    it("should return false for Infinity month", () => {
      // Arrange & Act
      const resultPositive = isExists(2024, Infinity, 1);
      const resultNegative = isExists(2024, -Infinity, 1);

      // Assert
      expect(resultPositive).toBe(false);
      expect(resultNegative).toBe(false);
    });

    it("should return false for Infinity day", () => {
      // Arrange & Act
      const resultPositive = isExists(2024, 1, Infinity);
      const resultNegative = isExists(2024, 1, -Infinity);

      // Assert
      expect(resultPositive).toBe(false);
      expect(resultNegative).toBe(false);
    });

    it("should return false for all Infinity values", () => {
      // Arrange & Act
      const resultPositive = isExists(Infinity, Infinity, Infinity);
      const resultNegative = isExists(-Infinity, -Infinity, -Infinity);

      // Assert
      expect(resultPositive).toBe(false);
      expect(resultNegative).toBe(false);
    });
  });
});
