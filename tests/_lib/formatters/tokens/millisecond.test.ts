import { describe, it, expect } from "vitest";
import { formatMillisecond } from "../../../../src/_lib/formatters/tokens/millisecond";

describe("formatMillisecond", () => {
  describe("happy path", () => {
    it("should format millisecond with 'S' token (tenths)", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 0, 0, 0, 789);

      // Act
      const result = formatMillisecond(date, "S");

      // Assert
      expect(result).toBe("7");
    });

    it("should format millisecond with 'SS' token (hundredths)", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 0, 0, 0, 789);

      // Act
      const result = formatMillisecond(date, "SS");

      // Assert
      expect(result).toBe("78");
    });

    it("should format millisecond with 'SSS' token (thousandths)", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 0, 0, 0, 789);

      // Act
      const result = formatMillisecond(date, "SSS");

      // Assert
      expect(result).toBe("789");
    });

    it("should format small millisecond value with padding", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 0, 0, 0, 45);

      // Act
      const resultS = formatMillisecond(date, "S");
      const resultSS = formatMillisecond(date, "SS");
      const resultSSS = formatMillisecond(date, "SSS");

      // Assert
      expect(resultS).toBe("0"); // Math.floor(45/100) = 0
      expect(resultSS).toBe("04"); // Math.floor(45/10) = 4, padded to 2 digits
      expect(resultSSS).toBe("045"); // 45 padded to 3 digits
    });
  });

  describe("edge cases", () => {
    it("should handle zero milliseconds", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 0, 0, 0, 0);

      // Act
      const resultS = formatMillisecond(date, "S");
      const resultSS = formatMillisecond(date, "SS");
      const resultSSS = formatMillisecond(date, "SSS");

      // Assert
      expect(resultS).toBe("0");
      expect(resultSS).toBe("00");
      expect(resultSSS).toBe("000");
    });

    it("should handle single-digit milliseconds", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 0, 0, 0, 7);

      // Act
      const resultS = formatMillisecond(date, "S");
      const resultSS = formatMillisecond(date, "SS");
      const resultSSS = formatMillisecond(date, "SSS");

      // Assert
      expect(resultS).toBe("0"); // Math.floor(7/100) = 0
      expect(resultSS).toBe("00"); // Math.floor(7/10) = 0, padded
      expect(resultSSS).toBe("007");
    });

    it("should handle maximum milliseconds (999)", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 0, 0, 0, 999);

      // Act
      const resultS = formatMillisecond(date, "S");
      const resultSS = formatMillisecond(date, "SS");
      const resultSSS = formatMillisecond(date, "SSS");

      // Assert
      expect(resultS).toBe("9"); // Math.floor(999/100) = 9
      expect(resultSS).toBe("99"); // Math.floor(999/10) = 99
      expect(resultSSS).toBe("999");
    });
  });

  describe("invalid inputs", () => {
    it("should return 'NaN' for Invalid Date", () => {
      // Arrange
      const invalidDate = new Date("invalid");

      // Act
      const result = formatMillisecond(invalidDate, "S");

      // Assert
      expect(result).toBe("NaN");
    });
  });

  describe("unknown token handling", () => {
    it("should handle unknown token by defaulting to 'S' behavior", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 0, 0, 0, 789);

      // Act
      // @ts-expect-error Testing runtime behavior with unknown token
      const result = formatMillisecond(date, "SSSS");

      // Assert
      expect(result).toBe("7"); // Math.floor(789/100) = 7 (same as 'S' token)
    });

    it("should handle empty string token by defaulting to 'S' behavior", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 0, 0, 0, 456);

      // Act
      // @ts-expect-error Testing runtime behavior with empty token
      const result = formatMillisecond(date, "");

      // Assert
      expect(result).toBe("4"); // Math.floor(456/100) = 4
    });

    it("should handle arbitrary string token by defaulting to 'S' behavior", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 0, 0, 0, 123);

      // Act
      // @ts-expect-error Testing runtime behavior with arbitrary token
      const result = formatMillisecond(date, "xyz");

      // Assert
      expect(result).toBe("1"); // Math.floor(123/100) = 1
    });
  });
});
