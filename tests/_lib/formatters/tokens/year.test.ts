import { describe, it, expect } from "vitest";
import { formatYear } from "../../../../src/_lib/formatters/tokens/year";

describe("formatYear", () => {
  describe("happy path", () => {
    it("should format year with 'y' token (no padding)", () => {
      // Arrange
      const date = new Date(0, 0, 1);
      date.setFullYear(2025);

      // Act
      const result = formatYear(date, "y");

      // Assert
      expect(result).toBe("2025");
    });

    it("should format year with 'yy' token (2-digit)", () => {
      // Arrange
      const date = new Date(0, 0, 1);
      date.setFullYear(2025);

      // Act
      const result = formatYear(date, "yy");

      // Assert
      expect(result).toBe("25");
    });

    it("should format year with 'yyy' token (minimum 3 digits)", () => {
      // Arrange
      const date = new Date(0, 0, 1);
      date.setFullYear(2025);

      // Act
      const result = formatYear(date, "yyy");

      // Assert
      expect(result).toBe("2025"); // Unicode TR35: minimum 3 digits (already 4)
    });

    it("should format year with 'yyyy' token (4-digit)", () => {
      // Arrange
      const date = new Date(0, 0, 1);
      date.setFullYear(2025);

      // Act
      const result = formatYear(date, "yyyy");

      // Assert
      expect(result).toBe("2025");
    });

    it("should format small year (123) with different tokens", () => {
      // Arrange
      const date = new Date(0, 0, 1);
      date.setFullYear(123);

      // Act
      const resultY = formatYear(date, "y");
      const resultYY = formatYear(date, "yy");
      const resultYYY = formatYear(date, "yyy");
      const resultYYYY = formatYear(date, "yyyy");

      // Assert
      expect(resultY).toBe("123");
      expect(resultYY).toBe("23");
      expect(resultYYY).toBe("123"); // Unicode TR35: minimum 3 digits
      expect(resultYYYY).toBe("0123");
    });

    it("should format large year (12345) with different tokens", () => {
      // Arrange
      const date = new Date(0, 0, 1);
      date.setFullYear(12345);

      // Act
      const resultY = formatYear(date, "y");
      const resultYY = formatYear(date, "yy");
      const resultYYY = formatYear(date, "yyy");
      const resultYYYY = formatYear(date, "yyyy");

      // Assert
      expect(resultY).toBe("12345");
      expect(resultYY).toBe("45");
      expect(resultYYY).toBe("12345"); // Unicode TR35: minimum 3 digits (already 5)
      expect(resultYYYY).toBe("12345");
    });
  });

  describe("edge cases", () => {
    it("should handle year 0 (displays as 1)", () => {
      // Arrange
      const date = new Date(0, 0, 1);
      date.setFullYear(0);

      // Act
      const resultY = formatYear(date, "y");
      const resultYY = formatYear(date, "yy");
      const resultYYY = formatYear(date, "yyy");
      const resultYYYY = formatYear(date, "yyyy");

      // Assert
      expect(resultY).toBe("1");
      expect(resultYY).toBe("01");
      expect(resultYYY).toBe("001"); // Unicode TR35: minimum 3 digits
      expect(resultYYYY).toBe("0001");
    });

    it("should handle year 1 with different tokens", () => {
      // Arrange
      const date = new Date(0, 0, 1);
      date.setFullYear(1);

      // Act
      const resultY = formatYear(date, "y");
      const resultYY = formatYear(date, "yy");
      const resultYYY = formatYear(date, "yyy");
      const resultYYYY = formatYear(date, "yyyy");

      // Assert
      expect(resultY).toBe("1");
      expect(resultYY).toBe("01");
      expect(resultYYY).toBe("001"); // Unicode TR35: minimum 3 digits
      expect(resultYYYY).toBe("0001");
    });

    it("should handle single-digit year (9)", () => {
      // Arrange
      const date = new Date(0, 0, 1);
      date.setFullYear(9);

      // Act
      const resultY = formatYear(date, "y");
      const resultYY = formatYear(date, "yy");
      const resultYYY = formatYear(date, "yyy");
      const resultYYYY = formatYear(date, "yyyy");

      // Assert
      expect(resultY).toBe("9");
      expect(resultYY).toBe("09");
      expect(resultYYY).toBe("009"); // Unicode TR35: minimum 3 digits
      expect(resultYYYY).toBe("0009");
    });

    it("should handle two-digit year (12)", () => {
      // Arrange
      const date = new Date(0, 0, 1);
      date.setFullYear(12);

      // Act
      const resultY = formatYear(date, "y");
      const resultYY = formatYear(date, "yy");
      const resultYYY = formatYear(date, "yyy");
      const resultYYYY = formatYear(date, "yyyy");

      // Assert
      expect(resultY).toBe("12");
      expect(resultYY).toBe("12");
      expect(resultYYY).toBe("012"); // Unicode TR35: minimum 3 digits
      expect(resultYYYY).toBe("0012");
    });

    it("should handle negative year (-1, displays as 2)", () => {
      // Arrange
      const date = new Date(0, 0, 1);
      date.setFullYear(-1);

      // Act
      const resultY = formatYear(date, "y");
      const resultYY = formatYear(date, "yy");
      const resultYYY = formatYear(date, "yyy");
      const resultYYYY = formatYear(date, "yyyy");

      // Assert
      expect(resultY).toBe("2");
      expect(resultYY).toBe("02");
      expect(resultYYY).toBe("002"); // Unicode TR35: minimum 3 digits
      expect(resultYYYY).toBe("0002");
    });

    it("should handle negative year (-998, displays as 999)", () => {
      // Arrange
      const date = new Date(0, 0, 1);
      date.setFullYear(-998);

      // Act
      const resultY = formatYear(date, "y");
      const resultYY = formatYear(date, "yy");
      const resultYYY = formatYear(date, "yyy");
      const resultYYYY = formatYear(date, "yyyy");

      // Assert
      expect(resultY).toBe("999");
      expect(resultYY).toBe("99");
      expect(resultYYY).toBe("999"); // Unicode TR35: minimum 3 digits
      expect(resultYYYY).toBe("0999");
    });

    it("should enforce Unicode TR35 minimum 3 digits for 'yyy' token", () => {
      // Arrange
      const dateSmall = new Date(0, 0, 1);
      dateSmall.setFullYear(9);
      const dateLarge = new Date(0, 0, 1);
      dateLarge.setFullYear(2025);

      // Act
      const resultSmall = formatYear(dateSmall, "yyy");
      const resultLarge = formatYear(dateLarge, "yyy");

      // Assert
      expect(resultSmall).toBe("009"); // Padded to 3 digits
      expect(resultLarge).toBe("2025"); // Already 4 digits, no change
    });

    it("should use default format for unknown token", () => {
      // Arrange
      const date = new Date(0, 0, 1);
      date.setFullYear(2025);

      // Act
      const result = formatYear(date, "yyyyy");

      // Assert
      expect(result).toBe("2025");
    });
  });

  describe("invalid inputs", () => {
    it("should return 'NaN' for Invalid Date", () => {
      // Arrange
      const invalidDate = new Date("invalid");

      // Act
      const result = formatYear(invalidDate, "y");

      // Assert
      expect(result).toBe("NaN");
    });
  });
});
