import { describe, it, expect } from "vitest";
import { formatDayOfYear } from "../../../../src/_lib/formatters/tokens/dayOfYear";

describe("formatDayOfYear", () => {
  describe("happy path", () => {
    it("should format day of year with 'D' token (no padding)", () => {
      // Arrange
      const date = new Date(2025, 0, 15); // Jan 15 = day 15

      // Act
      const result = formatDayOfYear(date, "D");

      // Assert
      expect(result).toBe("15");
    });

    it("should format day of year with 'DD' token (zero-padded to 2 digits)", () => {
      // Arrange
      const date = new Date(2025, 0, 15);

      // Act
      const result = formatDayOfYear(date, "DD");

      // Assert
      expect(result).toBe("15");
    });

    it("should format day of year with 'DDD' token (zero-padded to 3 digits)", () => {
      // Arrange
      const date = new Date(2025, 0, 15);

      // Act
      const result = formatDayOfYear(date, "DDD");

      // Assert
      expect(result).toBe("015");
    });

    it("should format mid-year day correctly", () => {
      // Arrange
      const date = new Date(2025, 6, 1); // July 1

      // Act
      const result = formatDayOfYear(date, "D");

      // Assert
      expect(result).toBe("182");
    });
  });

  describe("edge cases", () => {
    it("should handle first day of year (Jan 1)", () => {
      // Arrange
      const date = new Date(2025, 0, 1);

      // Act
      const resultD = formatDayOfYear(date, "D");
      const resultDD = formatDayOfYear(date, "DD");
      const resultDDD = formatDayOfYear(date, "DDD");

      // Assert
      expect(resultD).toBe("1");
      expect(resultDD).toBe("01");
      expect(resultDDD).toBe("001");
    });

    it("should handle last day of non-leap year (Dec 31)", () => {
      // Arrange
      const date = new Date(2025, 11, 31);

      // Act
      const resultD = formatDayOfYear(date, "D");
      const resultDDD = formatDayOfYear(date, "DDD");

      // Assert
      expect(resultD).toBe("365");
      expect(resultDDD).toBe("365");
    });

    it("should handle leap year February 29th", () => {
      // Arrange
      const date = new Date(2024, 1, 29); // Feb 29, 2024 (leap year)

      // Act
      const result = formatDayOfYear(date, "D");

      // Assert
      expect(result).toBe("60");
    });

    it("should handle last day of leap year (Dec 31)", () => {
      // Arrange
      const date = new Date(2024, 11, 31);

      // Act
      const result = formatDayOfYear(date, "D");

      // Assert
      expect(result).toBe("366");
    });

    it("should use default format for unknown token", () => {
      // Arrange
      const date = new Date(2025, 0, 15);

      // Act
      const result = formatDayOfYear(date, "DDDD");

      // Assert
      expect(result).toBe("15");
    });
  });

  describe("invalid inputs", () => {
    it("should return 'NaN' for Invalid Date", () => {
      // Arrange
      const invalidDate = new Date("invalid");

      // Act
      const result = formatDayOfYear(invalidDate, "D");

      // Assert
      expect(result).toBe("NaN");
    });
  });
});
