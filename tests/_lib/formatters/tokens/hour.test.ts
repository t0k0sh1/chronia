import { describe, it, expect } from "vitest";
import { formatHour } from "../../../../src/_lib/formatters/tokens/hour";

describe("formatHour", () => {
  describe("happy path", () => {
    it("should format 24-hour with 'H' token (no padding)", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 9);

      // Act
      const result = formatHour(date, "H");

      // Assert
      expect(result).toBe("9");
    });

    it("should format 24-hour with 'HH' token (zero-padded)", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 9);

      // Act
      const result = formatHour(date, "HH");

      // Assert
      expect(result).toBe("09");
    });

    it("should format 12-hour with 'h' token (no padding)", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 9);

      // Act
      const result = formatHour(date, "h");

      // Assert
      expect(result).toBe("9");
    });

    it("should format 12-hour with 'hh' token (zero-padded)", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 9);

      // Act
      const result = formatHour(date, "hh");

      // Assert
      expect(result).toBe("09");
    });

    it("should format afternoon hour in 24-hour format", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 15);

      // Act
      const resultH = formatHour(date, "H");
      const resultHH = formatHour(date, "HH");

      // Assert
      expect(resultH).toBe("15");
      expect(resultHH).toBe("15");
    });

    it("should format afternoon hour in 12-hour format", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 15);

      // Act
      const resultH = formatHour(date, "h");
      const resultHH = formatHour(date, "hh");

      // Assert
      expect(resultH).toBe("3");
      expect(resultHH).toBe("03");
    });
  });

  describe("edge cases", () => {
    it("should handle midnight (0) in 24-hour format", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 0);

      // Act
      const resultH = formatHour(date, "H");
      const resultHH = formatHour(date, "HH");

      // Assert
      expect(resultH).toBe("0");
      expect(resultHH).toBe("00");
    });

    it("should handle midnight (0) in 12-hour format as 12", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 0);

      // Act
      const resultH = formatHour(date, "h");
      const resultHH = formatHour(date, "hh");

      // Assert
      expect(resultH).toBe("12");
      expect(resultHH).toBe("12");
    });

    it("should handle noon (12) in 24-hour format", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 12);

      // Act
      const resultH = formatHour(date, "H");
      const resultHH = formatHour(date, "HH");

      // Assert
      expect(resultH).toBe("12");
      expect(resultHH).toBe("12");
    });

    it("should handle noon (12) in 12-hour format", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 12);

      // Act
      const resultH = formatHour(date, "h");
      const resultHH = formatHour(date, "hh");

      // Assert
      expect(resultH).toBe("12");
      expect(resultHH).toBe("12");
    });

    it("should handle last hour of day (23) in 24-hour format", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 23);

      // Act
      const resultH = formatHour(date, "H");
      const resultHH = formatHour(date, "HH");

      // Assert
      expect(resultH).toBe("23");
      expect(resultHH).toBe("23");
    });

    it("should handle last hour of day (23) in 12-hour format as 11", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 23);

      // Act
      const resultH = formatHour(date, "h");
      const resultHH = formatHour(date, "hh");

      // Assert
      expect(resultH).toBe("11");
      expect(resultHH).toBe("11");
    });

    it("should use default format for unknown token", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 15);

      // Act
      const result = formatHour(date, "HHH");

      // Assert
      expect(result).toBe("15");
    });
  });

  describe("invalid inputs", () => {
    it("should return 'NaN' for Invalid Date", () => {
      // Arrange
      const invalidDate = new Date("invalid");

      // Act
      const result = formatHour(invalidDate, "H");

      // Assert
      expect(result).toBe("NaN");
    });
  });
});
