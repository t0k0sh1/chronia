import { describe, it, expect } from "vitest";
import { formatSecond } from "../../../../src/_lib/formatters/tokens/second";

describe("formatSecond", () => {
  describe("happy path", () => {
    it("should format single-digit second with 's' token (no padding)", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 0, 0, 7);

      // Act
      const result = formatSecond(date, "s");

      // Assert
      expect(result).toBe("7");
    });

    it("should format single-digit second with 'ss' token (zero-padded)", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 0, 0, 7);

      // Act
      const result = formatSecond(date, "ss");

      // Assert
      expect(result).toBe("07");
    });

    it("should format double-digit second with 's' token", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 0, 0, 30);

      // Act
      const result = formatSecond(date, "s");

      // Assert
      expect(result).toBe("30");
    });

    it("should format double-digit second with 'ss' token", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 0, 0, 30);

      // Act
      const result = formatSecond(date, "ss");

      // Assert
      expect(result).toBe("30");
    });
  });

  describe("edge cases", () => {
    it("should handle first second of minute (0)", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 0, 0, 0);

      // Act
      const resultS = formatSecond(date, "s");
      const resultSS = formatSecond(date, "ss");

      // Assert
      expect(resultS).toBe("0");
      expect(resultSS).toBe("00");
    });

    it("should handle last second of minute (59)", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 0, 0, 59);

      // Act
      const resultS = formatSecond(date, "s");
      const resultSS = formatSecond(date, "ss");

      // Assert
      expect(resultS).toBe("59");
      expect(resultSS).toBe("59");
    });
  });

  describe("invalid inputs", () => {
    it("should return 'NaN' for Invalid Date", () => {
      // Arrange
      const invalidDate = new Date("invalid");

      // Act
      const result = formatSecond(invalidDate, "s");

      // Assert
      expect(result).toBe("NaN");
    });
  });
});
