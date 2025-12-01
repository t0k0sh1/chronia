import { describe, it, expect } from "vitest";
import { formatDay } from "../../../../src/_lib/formatters/tokens/day";

describe("formatDay", () => {
  describe("happy path", () => {
    it("should format single-digit day with 'd' token (no padding)", () => {
      // Arrange
      const date = new Date(2025, 0, 9);

      // Act
      const result = formatDay(date, "d");

      // Assert
      expect(result).toBe("9");
    });

    it("should format single-digit day with 'dd' token (zero-padded)", () => {
      // Arrange
      const date = new Date(2025, 0, 9);

      // Act
      const result = formatDay(date, "dd");

      // Assert
      expect(result).toBe("09");
    });

    it("should format double-digit day with 'd' token", () => {
      // Arrange
      const date = new Date(2025, 0, 15);

      // Act
      const result = formatDay(date, "d");

      // Assert
      expect(result).toBe("15");
    });

    it("should format double-digit day with 'dd' token", () => {
      // Arrange
      const date = new Date(2025, 0, 15);

      // Act
      const result = formatDay(date, "dd");

      // Assert
      expect(result).toBe("15");
    });
  });

  describe("edge cases", () => {
    it("should handle first day of month (1)", () => {
      // Arrange
      const date = new Date(2025, 0, 1);

      // Act
      const resultD = formatDay(date, "d");
      const resultDD = formatDay(date, "dd");

      // Assert
      expect(resultD).toBe("1");
      expect(resultDD).toBe("01");
    });

    it("should handle last day of 31-day month (31)", () => {
      // Arrange
      const date = new Date(2025, 0, 31);

      // Act
      const resultD = formatDay(date, "d");
      const resultDD = formatDay(date, "dd");

      // Assert
      expect(resultD).toBe("31");
      expect(resultDD).toBe("31");
    });

    it("should handle leap year February 29th", () => {
      // Arrange
      const date = new Date(2024, 1, 29);

      // Act
      const resultD = formatDay(date, "d");
      const resultDD = formatDay(date, "dd");

      // Assert
      expect(resultD).toBe("29");
      expect(resultDD).toBe("29");
    });
  });

  describe("invalid inputs", () => {
    it("should return 'NaN' for Invalid Date", () => {
      // Arrange
      const invalidDate = new Date("invalid");

      // Act
      const result = formatDay(invalidDate, "d");

      // Assert
      expect(result).toBe("NaN");
    });
  });
});
