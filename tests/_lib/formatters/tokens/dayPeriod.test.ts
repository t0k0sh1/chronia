import { describe, it, expect } from "vitest";
import { formatDayPeriod } from "../../../../src/_lib/formatters/tokens/dayPeriod";
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
    wide: ["午前", "午後"],
  },
};

describe("formatDayPeriod", () => {
  describe("happy path", () => {
    it("should format AM with 'a' token (no locale)", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 0); // midnight

      // Act
      const result = formatDayPeriod(date, "a");

      // Assert
      expect(result).toBe("AM");
    });

    it("should format PM with 'a' token (no locale)", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 12); // noon

      // Act
      const result = formatDayPeriod(date, "a");

      // Assert
      expect(result).toBe("PM");
    });

    it("should format AM with 'a' token (with locale)", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 9);

      // Act
      const result = formatDayPeriod(date, "a", mockLocale);

      // Assert
      expect(result).toBe("AM");
    });

    it("should format AM with 'aa' token (with locale)", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 9);

      // Act
      const result = formatDayPeriod(date, "aa", mockLocale);

      // Assert
      expect(result).toBe("AM");
    });

    it("should format AM with 'aaa' token (lowercase, with locale)", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 9);

      // Act
      const result = formatDayPeriod(date, "aaa", mockLocale);

      // Assert
      expect(result).toBe("am");
    });

    it("should format PM with 'aaa' token (lowercase, with locale)", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 15);

      // Act
      const result = formatDayPeriod(date, "aaa", mockLocale);

      // Assert
      expect(result).toBe("pm");
    });

    it("should format AM with 'aaaa' token (wide, with locale)", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 9);

      // Act
      const result = formatDayPeriod(date, "aaaa", mockLocale);

      // Assert
      expect(result).toBe("午前");
    });

    it("should format PM with 'aaaa' token (wide, with locale)", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 15);

      // Act
      const result = formatDayPeriod(date, "aaaa", mockLocale);

      // Assert
      expect(result).toBe("午後");
    });

    it("should format AM with 'aaaaa' token (narrow, with locale)", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 9);

      // Act
      const result = formatDayPeriod(date, "aaaaa", mockLocale);

      // Assert
      expect(result).toBe("a");
    });

    it("should format PM with 'aaaaa' token (narrow, with locale)", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 15);

      // Act
      const result = formatDayPeriod(date, "aaaaa", mockLocale);

      // Assert
      expect(result).toBe("p");
    });
  });

  describe("edge cases", () => {
    it("should handle midnight (hour 0) as AM", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 0);

      // Act
      const resultA = formatDayPeriod(date, "a");
      const resultAAAA = formatDayPeriod(date, "aaaa", mockLocale);

      // Assert
      expect(resultA).toBe("AM");
      expect(resultAAAA).toBe("午前");
    });

    it("should handle last AM hour (hour 11) as AM", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 11);

      // Act
      const resultA = formatDayPeriod(date, "a");
      const resultAAAA = formatDayPeriod(date, "aaaa", mockLocale);

      // Assert
      expect(resultA).toBe("AM");
      expect(resultAAAA).toBe("午前");
    });

    it("should handle noon (hour 12) as PM", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 12);

      // Act
      const resultA = formatDayPeriod(date, "a");
      const resultAAAA = formatDayPeriod(date, "aaaa", mockLocale);

      // Assert
      expect(resultA).toBe("PM");
      expect(resultAAAA).toBe("午後");
    });

    it("should handle last PM hour (hour 23) as PM", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 23);

      // Act
      const resultA = formatDayPeriod(date, "a");
      const resultAAAA = formatDayPeriod(date, "aaaa", mockLocale);

      // Assert
      expect(resultA).toBe("PM");
      expect(resultAAAA).toBe("午後");
    });

    it("should use default format for unknown token", () => {
      // Arrange
      const date = new Date(2025, 0, 1, 9);

      // Act
      const result = formatDayPeriod(date, "aaaaaa", mockLocale);

      // Assert
      expect(result).toBe("AM");
    });
  });

});
