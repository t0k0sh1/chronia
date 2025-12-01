import { describe, it, expect } from "vitest";
import { formatMonth } from "../../../../src/_lib/formatters/tokens/month";
import { Locale } from "../../../../src/types";

const mockLocale: Locale = {
  era: {
    narrow: ["B", "A"],
    abbr: ["BC", "AD"],
    wide: ["Before Christ", "Anno Domini"],
  },
  month: {
    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    abbr: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    wide: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  },
  weekday: {
    narrow: ["S", "M", "T", "W", "T", "F", "S"],
    abbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    wide: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
  },
  dayPeriod: {
    narrow: ["a", "p"],
    abbr: ["AM", "PM"],
    wide: ["AM (morning)", "PM (afternoon)"],
  },
};

describe("formatMonth", () => {
  describe("happy path", () => {
    it("should format month with 'M' token (no padding, no locale)", () => {
      // Arrange
      const date = new Date(2025, 8, 1); // September (month 8, displays as 9)

      // Act
      const result = formatMonth(date, "M");

      // Assert
      expect(result).toBe("9");
    });

    it("should format month with 'MM' token (zero-padded, no locale)", () => {
      // Arrange
      const date = new Date(2025, 0, 1); // January (month 0, displays as 01)

      // Act
      const result = formatMonth(date, "MM");

      // Assert
      expect(result).toBe("01");
    });

    it("should format month with 'MMM' token (abbreviated with locale)", () => {
      // Arrange
      const date = new Date(2025, 0, 1); // January

      // Act
      const result = formatMonth(date, "MMM", mockLocale);

      // Assert
      expect(result).toBe("Jan");
    });

    it("should format month with 'MMMM' token (wide with locale)", () => {
      // Arrange
      const date = new Date(2025, 1, 1); // February

      // Act
      const result = formatMonth(date, "MMMM", mockLocale);

      // Assert
      expect(result).toBe("February");
    });

    it("should format month with 'MMMMM' token (narrow with locale)", () => {
      // Arrange
      const date = new Date(2025, 1, 1); // February

      // Act
      const result = formatMonth(date, "MMMMM", mockLocale);

      // Assert
      expect(result).toBe("F");
    });

    it("should format month with locale (abbreviated)", () => {
      // Arrange
      const date = new Date(2025, 11, 1); // December

      // Act
      const result = formatMonth(date, "MMM", mockLocale);

      // Assert
      expect(result).toBe("Dec");
    });

    it("should format month with locale (wide)", () => {
      // Arrange
      const date = new Date(2025, 0, 1); // January

      // Act
      const result = formatMonth(date, "MMMM", mockLocale);

      // Assert
      expect(result).toBe("January");
    });

    it("should format month with locale (narrow)", () => {
      // Arrange
      const date = new Date(2025, 0, 1); // January

      // Act
      const result = formatMonth(date, "MMMMM", mockLocale);

      // Assert
      expect(result).toBe("J");
    });

    it("should format numeric month with locale (M token)", () => {
      // Arrange
      const date = new Date(2025, 0, 1); // January

      // Act
      const result = formatMonth(date, "M", mockLocale);

      // Assert
      expect(result).toBe("1");
    });

    it("should format numeric month with locale (MM token)", () => {
      // Arrange
      const date = new Date(2025, 0, 1); // January

      // Act
      const result = formatMonth(date, "MM", mockLocale);

      // Assert
      expect(result).toBe("01");
    });
  });

  describe("edge cases", () => {
    it("should handle first month of year (January, 0)", () => {
      // Arrange
      const date = new Date(2025, 0, 1);

      // Act
      const resultM = formatMonth(date, "M");
      const resultMM = formatMonth(date, "MM");
      const resultMMM = formatMonth(date, "MMM", mockLocale);

      // Assert
      expect(resultM).toBe("1");
      expect(resultMM).toBe("01");
      expect(resultMMM).toBe("Jan");
    });

    it("should handle last month of year (December, 11)", () => {
      // Arrange
      const date = new Date(2025, 11, 1);

      // Act
      const resultM = formatMonth(date, "M");
      const resultMM = formatMonth(date, "MM");
      const resultMMM = formatMonth(date, "MMM", mockLocale);

      // Assert
      expect(resultM).toBe("12");
      expect(resultMM).toBe("12");
      expect(resultMMM).toBe("Dec");
    });

    it("should use default format for unknown token", () => {
      // Arrange
      const date = new Date(2025, 0, 1);

      // Act
      const result = formatMonth(date, "MMMMMM", mockLocale);

      // Assert
      expect(result).toBe("1");
    });
  });

  describe("invalid inputs", () => {
    it("should return 'NaN' for Invalid Date", () => {
      // Arrange
      const invalidDate = new Date("invalid");

      // Act
      const result = formatMonth(invalidDate, "M");

      // Assert
      expect(result).toBe("NaN");
    });
  });
});
