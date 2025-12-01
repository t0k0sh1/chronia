import { describe, it, expect } from "vitest";
import { formatWeekday } from "../../../../src/_lib/formatters/tokens/weekday";
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

describe("formatWeekday", () => {
  describe("happy path", () => {
    it("should format weekday with 'E' token (abbreviated, no locale)", () => {
      // Arrange
      const sunday = new Date(2025, 0, 5); // 2025-01-05 = Sunday

      // Act
      const result = formatWeekday(sunday, "E");

      // Assert
      expect(result).toBe("Sun");
    });

    it("should format weekday with 'EEE' token (abbreviated, no locale)", () => {
      // Arrange
      const monday = new Date(2025, 0, 6); // Monday

      // Act
      const result = formatWeekday(monday, "EEE");

      // Assert
      expect(result).toBe("Mon");
    });

    it("should format weekday with 'EEEE' token (wide, no locale)", () => {
      // Arrange
      const tuesday = new Date(2025, 0, 7); // Tuesday

      // Act
      const result = formatWeekday(tuesday, "EEEE");

      // Assert
      expect(result).toBe("Tuesday");
    });

    it("should format weekday with 'EEEEE' token (narrow, no locale)", () => {
      // Arrange
      const wednesday = new Date(2025, 0, 8); // Wednesday

      // Act
      const result = formatWeekday(wednesday, "EEEEE");

      // Assert
      expect(result).toBe("W");
    });

    it("should format weekday with locale (abbreviated)", () => {
      // Arrange
      const thursday = new Date(2025, 0, 9); // Thursday

      // Act
      const result = formatWeekday(thursday, "E", mockLocale);

      // Assert
      expect(result).toBe("Thu");
    });

    it("should format weekday with locale (wide)", () => {
      // Arrange
      const friday = new Date(2025, 0, 10); // Friday

      // Act
      const result = formatWeekday(friday, "EEEE", mockLocale);

      // Assert
      expect(result).toBe("Friday");
    });

    it("should format weekday with locale (narrow)", () => {
      // Arrange
      const saturday = new Date(2025, 0, 11); // Saturday

      // Act
      const result = formatWeekday(saturday, "EEEEE", mockLocale);

      // Assert
      expect(result).toBe("S");
    });
  });

  describe("edge cases", () => {
    it("should handle Sunday (first day of week)", () => {
      // Arrange
      const sunday = new Date(2025, 0, 5); // Sunday

      // Act
      const resultAbbr = formatWeekday(sunday, "E");
      const resultWide = formatWeekday(sunday, "EEEE");
      const resultNarrow = formatWeekday(sunday, "EEEEE");

      // Assert
      expect(resultAbbr).toBe("Sun");
      expect(resultWide).toBe("Sunday");
      expect(resultNarrow).toBe("S");
    });

    it("should handle Saturday (last day of week)", () => {
      // Arrange
      const saturday = new Date(2025, 0, 11); // Saturday

      // Act
      const resultAbbr = formatWeekday(saturday, "E");
      const resultWide = formatWeekday(saturday, "EEEE");
      const resultNarrow = formatWeekday(saturday, "EEEEE");

      // Assert
      expect(resultAbbr).toBe("Sat");
      expect(resultWide).toBe("Saturday");
      expect(resultNarrow).toBe("S");
    });

    it("should use default format for unknown token", () => {
      // Arrange
      const sunday = new Date(2025, 0, 5);

      // Act
      const result = formatWeekday(sunday, "EEEEEE", mockLocale);

      // Assert
      expect(result).toBe("Sun");
    });
  });

});
