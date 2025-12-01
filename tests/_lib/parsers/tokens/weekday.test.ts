import { describe, it, expect } from "vitest";
import { parseWeekday } from "../../../../src/_lib/parsers/tokens/weekday";
import { DateComponents, Locale } from "../../../../src/types";

describe("parseWeekday", () => {
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
      wide: ["AM (morning)", "PM (afternoon)"],
    },
  };

  describe("happy path", () => {
    it("should parse English abbreviated 'Sun' with 'E' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseWeekday("Sun", 0, "E", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
    });

    it("should parse English abbreviated 'Mon' with 'EE' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseWeekday("Mon", 0, "EE", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
    });

    it("should parse English abbreviated 'Tue' with 'EEE' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseWeekday("Tue", 0, "EEE", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
    });

    it("should parse English abbreviated 'Wed' with 'E' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseWeekday("Wed", 0, "E", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
    });

    it("should parse English abbreviated 'Thu' with 'EE' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseWeekday("Thu", 0, "EE", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
    });

    it("should parse English abbreviated 'Fri' with 'EEE' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseWeekday("Fri", 0, "EEE", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
    });

    it("should parse English abbreviated 'Sat' with 'E' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseWeekday("Sat", 0, "E", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
    });

    it("should parse English wide 'Sunday' with 'EEEE' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseWeekday("Sunday", 0, "EEEE", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(6);
    });

    it("should parse English wide 'Monday' with 'EEEE' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseWeekday("Monday", 0, "EEEE", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(6);
    });

    it("should parse English wide 'Tuesday' with 'EEEE' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseWeekday("Tuesday", 0, "EEEE", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(7);
    });

    it("should parse English wide 'Wednesday' with 'EEEE' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseWeekday("Wednesday", 0, "EEEE", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(9);
    });

    it("should parse English wide 'Thursday' with 'EEEE' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseWeekday("Thursday", 0, "EEEE", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(8);
    });

    it("should parse English wide 'Friday' with 'EEEE' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseWeekday("Friday", 0, "EEEE", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(6);
    });

    it("should parse English wide 'Saturday' with 'EEEE' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseWeekday("Saturday", 0, "EEEE", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(8);
    });

    it("should parse English narrow 'S' for Sunday with 'EEEEE' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseWeekday("S", 0, "EEEEE", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
    });

    it("should parse English narrow 'M' for Monday with 'EEEEE' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseWeekday("M", 0, "EEEEE", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
    });

    it("should parse English narrow 'T' for Tuesday with 'EEEEE' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseWeekday("T", 0, "EEEEE", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
    });

    it("should parse English narrow 'W' for Wednesday with 'EEEEE' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseWeekday("W", 0, "EEEEE", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
    });

    it("should parse English narrow 'F' for Friday with 'EEEEE' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseWeekday("F", 0, "EEEEE", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
    });

    it("should parse localized abbreviated 'Sun' with 'E' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseWeekday("Sun", 0, "E", mockLocale, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
    });

    it("should parse localized abbreviated 'Mon' with 'EE' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseWeekday("Mon", 0, "EE", mockLocale, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
    });

    it("should parse localized abbreviated 'Tue' with 'EEE' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseWeekday("Tue", 0, "EEE", mockLocale, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
    });

    it("should parse localized wide 'Sunday' with 'EEEE' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseWeekday("Sunday", 0, "EEEE", mockLocale, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(6);
    });

    it("should parse localized wide 'Monday' with 'EEEE' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseWeekday("Monday", 0, "EEEE", mockLocale, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(6);
    });

    it("should parse localized narrow 'S' for Sunday with 'EEEEE' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseWeekday("S", 0, "EEEEE", mockLocale, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
    });

    it("should parse localized narrow 'M' for Monday with 'EEEEE' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseWeekday("M", 0, "EEEEE", mockLocale, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
    });

    it("should parse at different position in string", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseWeekday("abcMondef", 3, "EEE", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(6);
    });
  });

  describe("edge cases", () => {
    it("should handle ambiguous narrow weekdays (Tuesday and Thursday both 'T')", () => {
      // Arrange
      const dateComponents1 = createDateComponents();
      const dateComponents2 = createDateComponents();

      // Act
      const result1 = parseWeekday("T", 0, "EEEEE", mockLocale, dateComponents1);
      const result2 = parseWeekday("T", 0, "EEEEE", mockLocale, dateComponents2);

      // Assert
      expect(result1).not.toBeNull();
      expect(result1!.position).toBe(1);
      expect(result2).not.toBeNull();
      expect(result2!.position).toBe(1);
    });

    it("should prefer longer matches (full weekday name over narrow)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act - "Sunday" should match completely rather than just "S"
      const result = parseWeekday("Sunday", 0, "EEEE", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(6); // Should consume entire word
    });

    it("should handle different token lengths correctly", () => {
      // Arrange
      const dateComponents1 = createDateComponents();
      const dateComponents2 = createDateComponents();
      const dateComponents3 = createDateComponents();

      // Act - All should parse Monday but use appropriate format
      const result1 = parseWeekday("Mon", 0, "E", undefined, dateComponents1);
      const result2 = parseWeekday("Monday", 0, "EEEE", undefined, dateComponents2);
      const result3 = parseWeekday("M", 0, "EEEEE", undefined, dateComponents3);

      // Assert
      expect(result1).not.toBeNull();
      expect(result1!.position).toBe(3);
      expect(result2).not.toBeNull();
      expect(result2!.position).toBe(6);
      expect(result3).not.toBeNull();
      expect(result3!.position).toBe(1);
    });

    it("should not modify date components", () => {
      // Arrange
      const dateComponents = createDateComponents();
      const originalYear = dateComponents.year;
      const originalMonth = dateComponents.month;
      const originalDay = dateComponents.day;

      // Act - Weekday parsing should not change the actual date
      parseWeekday("Monday", 0, "EEEE", undefined, dateComponents);

      // Assert
      expect(dateComponents.year).toBe(originalYear);
      expect(dateComponents.month).toBe(originalMonth);
      expect(dateComponents.day).toBe(originalDay);
    });

    it("should handle end of string correctly", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseWeekday("Friday", 0, "EEEE", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(6);
    });

    it("should return null when position is at end of string", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseWeekday("Mon", 3, "EEE", undefined, dateComponents);

      // Assert
      expect(result).toBeNull(); // No characters left to parse
    });

    it("should handle Japanese locale with non-standard pattern", () => {
      // Arrange
      const jaLocale: Locale = {
        era: {
          narrow: ["紀", "西"],
          abbr: ["BC", "AD"],
          wide: ["紀元前", "西暦"],
        },
        month: {
          narrow: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
          abbr: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
          wide: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        },
        weekday: {
          narrow: ["日", "月", "火", "水", "木", "金", "土"],
          abbr: ["日", "月", "火", "水", "木", "金", "土"],
          wide: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
        },
        dayPeriod: {
          narrow: ["午前", "午後"],
          abbr: ["午前", "午後"],
          wide: ["午前", "午後"],
        },
      };
      const dateComponents = createDateComponents();

      // Act - Using unknown pattern EEEEEE with Japanese locale
      const result = parseWeekday("月", 0, "EEEEEE", jaLocale, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
    });
  });

  describe("invalid inputs", () => {
    it("should return null for unrecognized weekday 'Xyz'", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseWeekday("Xyz", 0, "EEE", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for numeric input '123'", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseWeekday("123", 0, "EEE", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for empty string", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseWeekday("", 0, "EEE", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null when no match found with localization", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseWeekday("InvalidDay", 0, "EEEE", mockLocale, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for unsupported token patterns", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseWeekday("Mon", 0, "EEEEEE", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for lowercase weekday (case-sensitive)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act - Should not match different case without localization handling it
      const result = parseWeekday("monday", 0, "EEEE", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });
  });
});
