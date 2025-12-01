import { describe, it, expect } from "vitest";
import { formatMinute } from "../../../../src/_lib/formatters/tokens/minute";

describe("formatMinute", () => {
  describe("happy path", () => {
    it("should format single-digit minute with 'm' token (no padding)", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 0, 5);

      // Act
      const result = formatMinute(date, "m");

      // Assert
      expect(result).toBe("5");
    });

    it("should format single-digit minute with 'mm' token (zero-padded)", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 0, 5);

      // Act
      const result = formatMinute(date, "mm");

      // Assert
      expect(result).toBe("05");
    });

    it("should format double-digit minute with 'm' token", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 0, 30);

      // Act
      const result = formatMinute(date, "m");

      // Assert
      expect(result).toBe("30");
    });

    it("should format double-digit minute with 'mm' token", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 0, 30);

      // Act
      const result = formatMinute(date, "mm");

      // Assert
      expect(result).toBe("30");
    });
  });

  describe("edge cases", () => {
    it("should handle first minute of hour (0)", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 0, 0);

      // Act
      const resultM = formatMinute(date, "m");
      const resultMM = formatMinute(date, "mm");

      // Assert
      expect(resultM).toBe("0");
      expect(resultMM).toBe("00");
    });

    it("should handle last minute of hour (59)", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 0, 59);

      // Act
      const resultM = formatMinute(date, "m");
      const resultMM = formatMinute(date, "mm");

      // Assert
      expect(resultM).toBe("59");
      expect(resultMM).toBe("59");
    });
  });

  describe("invalid inputs", () => {
    it("should return 'NaN' for Invalid Date", () => {
      // Arrange
      const invalidDate = new Date("invalid");

      // Act
      const result = formatMinute(invalidDate, "m");

      // Assert
      expect(result).toBe("NaN");
    });
  });
});
