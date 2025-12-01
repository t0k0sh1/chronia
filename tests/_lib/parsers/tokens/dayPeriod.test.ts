import { describe, it, expect } from "vitest";
import { parseDayPeriod } from "../../../../src/_lib/parsers/tokens/dayPeriod";
import { DateComponents, Locale } from "../../../../src/types";

describe("parseDayPeriod", () => {
  const createDateComponents = (): DateComponents => ({
    year: 2000,
    month: 0,
    day: 1,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
    isPM: false,
    hours12: null,
  });

  const mockLocale: Locale = {
    era: {
      narrow: ["B", "A"],
      abbr: ["BC", "AD"],
      wide: ["Before Christ", "Anno Domini"],
    },
    month: {
      narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
      abbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    },
    weekday: {
      narrow: ["S", "M", "T", "W", "T", "F", "S"],
      abbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    },
    dayPeriod: {
      narrow: ["a", "p"],
      abbr: ["AM", "PM"],
      wide: ["Morning", "Evening"],
    },
  };

  describe("happy path", () => {
    it("should parse AM (standard uppercase)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayPeriod("AM", 0, "a", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.isPM).toBe(false);
    });

    it("should parse PM (standard uppercase)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayPeriod("PM", 0, "a", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.isPM).toBe(true);
    });

    it("should parse localized narrow 'a' for AM", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayPeriod("a", 0, "a", mockLocale, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.isPM).toBe(false);
    });

    it("should parse localized narrow 'p' for PM", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayPeriod("p", 0, "a", mockLocale, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.isPM).toBe(true);
    });

    it("should parse localized abbreviated 'AM'", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayPeriod("AM", 0, "a", mockLocale, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.isPM).toBe(false);
    });

    it("should parse localized abbreviated 'PM'", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayPeriod("PM", 0, "a", mockLocale, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.isPM).toBe(true);
    });

    it("should parse localized wide 'Morning' for AM", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayPeriod("Morning", 0, "a", mockLocale, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(7);
      expect(dateComponents.isPM).toBe(false);
    });

    it("should parse localized wide 'Evening' for PM", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayPeriod("Evening", 0, "a", mockLocale, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(7);
      expect(dateComponents.isPM).toBe(true);
    });

    it("should parse at different position in string", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayPeriod("abcAMdef", 3, "a", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(5);
      expect(dateComponents.isPM).toBe(false);
    });
  });

  describe("edge cases", () => {
    it("should parse case-insensitive 'am' (lowercase) as narrow format", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayPeriod("am", 0, "a", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1); // Matches narrow format "a" first
      expect(dateComponents.isPM).toBe(false);
    });

    it("should parse case-insensitive 'pm' (lowercase) as narrow format", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayPeriod("pm", 0, "a", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1); // Matches narrow format "p" first
      expect(dateComponents.isPM).toBe(true);
    });

    it("should parse case-insensitive 'Am' (mixed case)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayPeriod("Am", 0, "a", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.isPM).toBe(false);
    });

    it("should parse case-insensitive 'Pm' (mixed case)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayPeriod("Pm", 0, "a", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.isPM).toBe(true);
    });

    it("should parse single letter 'A' for AM", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayPeriod("A", 0, "a", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.isPM).toBe(false);
    });

    it("should parse single letter 'P' for PM", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayPeriod("P", 0, "a", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.isPM).toBe(true);
    });

    it("should parse lowercase single letter 'a' for AM", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayPeriod("a", 0, "a", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.isPM).toBe(false);
    });

    it("should parse lowercase single letter 'p' for PM", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayPeriod("p", 0, "a", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.isPM).toBe(true);
    });

    it("should prefer longer matches (AM over A)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act - When both "AM" and "A" could match, should prefer "AM"
      const result = parseDayPeriod("AM", 0, "a", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2); // Should consume both characters
      expect(dateComponents.isPM).toBe(false);
    });

    it("should handle custom localized strings", () => {
      // Arrange
      const conflictLocale: Locale = {
        era: {
          narrow: ["B", "A"],
          abbr: ["BC", "AD"],
          wide: ["Before Christ", "Anno Domini"],
        },
        month: {
          narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          abbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        },
        weekday: {
          narrow: ["S", "M", "T", "W", "T", "F", "S"],
          abbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        },
        dayPeriod: {
          narrow: ["A", "P"],
          abbr: ["ANTE", "POST"],
          wide: ["ANTE", "POST"],
        },
      };
      const dateComponents1 = createDateComponents();
      const dateComponents2 = createDateComponents();

      // Act
      const result1 = parseDayPeriod("ANTE", 0, "a", conflictLocale, dateComponents1);
      const result2 = parseDayPeriod("POST", 0, "a", conflictLocale, dateComponents2);

      // Assert
      expect(result1).not.toBeNull();
      expect(result1!.position).toBe(4);
      expect(dateComponents1.isPM).toBe(false);

      expect(result2).not.toBeNull();
      expect(result2!.position).toBe(4);
      expect(dateComponents2.isPM).toBe(true);
    });

    it("should handle end of string correctly", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayPeriod("PM", 0, "a", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.isPM).toBe(true);
    });

    it("should return null when position is at end of string", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayPeriod("AM", 2, "a", undefined, dateComponents);

      // Assert
      expect(result).toBeNull(); // No characters left to parse
    });
  });

  describe("invalid inputs", () => {
    it("should return null for unrecognized input 'XM'", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayPeriod("XM", 0, "a", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for numeric input '123'", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayPeriod("123", 0, "a", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for empty string", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayPeriod("", 0, "a", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for invalid letter 'Z'", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayPeriod("Z", 0, "a", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null when no match found with localization", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayPeriod("XYZ", 0, "a", mockLocale, dateComponents);

      // Assert
      expect(result).toBeNull();
    });
  });
});
