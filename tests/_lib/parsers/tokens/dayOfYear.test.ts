import { describe, it, expect } from "vitest";
import { parseDayOfYear } from "../../../../src/_lib/parsers/tokens/dayOfYear";
import { DateComponents } from "../../../../src/types";

describe("parseDayOfYear", () => {
  const createDateComponents = (year = 2024): DateComponents => ({
    year,
    month: 0,
    day: 1,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
    isPM: false,
    hours12: null,
  });

  describe("happy path", () => {
    it("should parse single-digit day-of-year with 'D' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayOfYear("1", 0, "D", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.month).toBe(0); // January
      expect(dateComponents.day).toBe(1);   // Jan 1
    });

    it("should parse double-digit day-of-year with 'D' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayOfYear("15", 0, "D", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.month).toBe(0); // January
      expect(dateComponents.day).toBe(15);  // Jan 15
    });

    it("should parse three-digit day-of-year with 'D' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents(2024); // Leap year

      // Act
      const result = parseDayOfYear("365", 0, "D", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
      expect(dateComponents.month).toBe(11); // December
      expect(dateComponents.day).toBe(30);   // Dec 30 in leap year
    });

    it("should parse with 'DD' pattern (two-digit)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayOfYear("15", 0, "DD", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.month).toBe(0); // January
      expect(dateComponents.day).toBe(15);  // Jan 15
    });

    it("should parse with 'DDD' pattern (three-digit)", () => {
      // Arrange
      const dateComponents = createDateComponents(2024); // Leap year

      // Act
      const result = parseDayOfYear("032", 0, "DDD", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
      expect(dateComponents.month).toBe(1); // February
      expect(dateComponents.day).toBe(1);   // Feb 1
    });

    it("should stop at non-digit for 'D' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayOfYear("15x", 0, "D", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.month).toBe(0); // January
      expect(dateComponents.day).toBe(15);  // Jan 15
    });

    it("should parse at different position in string", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayOfYear("abc100def", 3, "DDD", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(6);
      expect(dateComponents.month).toBe(3); // April
      expect(dateComponents.day).toBe(9);   // April 9 (day 100 of year)
    });
  });

  describe("edge cases", () => {
    it("should handle first day of year (1) as Jan 1", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayOfYear("001", 0, "DDD", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(dateComponents.month).toBe(0); // January
      expect(dateComponents.day).toBe(1);   // 1st
    });

    it("should handle last day of leap year (366) as Dec 31", () => {
      // Arrange
      const dateComponents = createDateComponents(2024); // Leap year

      // Act
      const result = parseDayOfYear("366", 0, "D", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(dateComponents.month).toBe(11); // December
      expect(dateComponents.day).toBe(31);   // 31st
    });

    it("should handle last day of non-leap year (365) as Dec 31", () => {
      // Arrange
      const dateComponents = createDateComponents(2023); // Non-leap year

      // Act
      const result = parseDayOfYear("365", 0, "DDD", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(dateComponents.month).toBe(11); // December
      expect(dateComponents.day).toBe(31);   // 31st
    });

    it("should handle Feb 29 in leap year (day 60)", () => {
      // Arrange
      const dateComponents = createDateComponents(2024); // Leap year

      // Act
      const result = parseDayOfYear("060", 0, "DDD", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(dateComponents.month).toBe(1); // February
      expect(dateComponents.day).toBe(29);  // 29th (leap day)
    });

    it("should handle Mar 1 in non-leap year (day 60)", () => {
      // Arrange
      const dateComponents = createDateComponents(2023); // Non-leap year

      // Act
      const result = parseDayOfYear("060", 0, "DDD", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(dateComponents.month).toBe(2); // March
      expect(dateComponents.day).toBe(1);   // 1st
    });

    it("should handle leap year detection (divisible by 400)", () => {
      // Arrange
      const dateComponents2000 = createDateComponents(2000); // Leap year (divisible by 400)
      const dateComponents1900 = createDateComponents(1900); // Not a leap year (divisible by 100 but not 400)

      // Act - Day 60 behavior differs based on leap year
      const result2000 = parseDayOfYear("060", 0, "DDD", undefined, dateComponents2000);
      const result1900 = parseDayOfYear("060", 0, "DDD", undefined, dateComponents1900);

      // Assert
      expect(result2000).not.toBeNull();
      expect(dateComponents2000.month).toBe(1); // February in leap year
      expect(dateComponents2000.day).toBe(29);  // Feb 29

      expect(result1900).not.toBeNull();
      expect(dateComponents1900.month).toBe(2); // March in non-leap year
      expect(dateComponents1900.day).toBe(1);   // Mar 1
    });

    it("should handle month boundary conversions", () => {
      // Arrange
      const components1 = createDateComponents();
      const components2 = createDateComponents();
      const components3 = createDateComponents();

      // Act
      const result1 = parseDayOfYear("032", 0, "DDD", undefined, components1); // Feb 1 (day 32)
      const result2 = parseDayOfYear("099", 0, "DDD", undefined, components2); // April 8 (day 99)
      const result3 = parseDayOfYear("305", 0, "DDD", undefined, components3); // Oct 31 (day 305 of 2024)

      // Assert
      expect(result1).not.toBeNull();
      expect(components1.month).toBe(1); // February
      expect(components1.day).toBe(1);

      expect(result2).not.toBeNull();
      expect(components2.month).toBe(3); // April
      expect(components2.day).toBe(8);

      expect(result3).not.toBeNull();
      expect(components3.month).toBe(9); // October
      expect(components3.day).toBe(31);
    });

    it("should handle month lengths correctly in leap year", () => {
      // Arrange
      const jan31 = createDateComponents(2024);
      const feb29 = createDateComponents(2024);
      const mar31 = createDateComponents(2024);
      const apr30 = createDateComponents(2024);

      // Act
      parseDayOfYear("031", 0, "DDD", undefined, jan31); // Jan 31
      parseDayOfYear("060", 0, "DDD", undefined, feb29); // Feb 29
      parseDayOfYear("091", 0, "DDD", undefined, mar31); // Mar 31
      parseDayOfYear("121", 0, "DDD", undefined, apr30); // Apr 30

      // Assert
      expect(jan31.month).toBe(0);
      expect(jan31.day).toBe(31);
      expect(feb29.month).toBe(1);
      expect(feb29.day).toBe(29);
      expect(mar31.month).toBe(2);
      expect(mar31.day).toBe(31);
      expect(apr30.month).toBe(3);
      expect(apr30.day).toBe(30);
    });

    it("should handle fixed vs variable length patterns correctly", () => {
      // Arrange
      const components1 = createDateComponents();
      const components2 = createDateComponents();

      // Act - Variable length 'D' reads until non-digit
      const result1 = parseDayOfYear("1", 0, "D", undefined, components1);

      // Assert
      expect(result1).not.toBeNull();
      expect(result1!.position).toBe(1);
      expect(components1.day).toBe(1);

      // Act - Fixed length 'DDD' requires exactly 3 digits
      const result2 = parseDayOfYear("1", 0, "DDD", undefined, components2);

      // Assert
      expect(result2).toBeNull();
    });

    it("should handle end of string correctly", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayOfYear("365", 0, "DDD", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
    });

    it("should handle longer patterns (DDDD)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayOfYear("0001", 0, "DDDD", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(4);
      expect(dateComponents.month).toBe(0); // January
      expect(dateComponents.day).toBe(1);   // 1st
    });

    it("should parse first N digits for longer input", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act - DDD should consume first 3 digits
      const result = parseDayOfYear("1234", 0, "DDD", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
      expect(dateComponents.month).toBe(4); // May
      expect(dateComponents.day).toBe(2);   // May 2 (day 123 of year)
    });
  });

  describe("invalid inputs", () => {
    it("should return null for day 0 (invalid)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayOfYear("0", 0, "D", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for day 367 (out of range)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayOfYear("367", 0, "D", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for day 999 (out of range)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayOfYear("999", 0, "D", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for day 366 in non-leap year", () => {
      // Arrange
      const dateComponents = createDateComponents(2023); // Non-leap year

      // Act
      const result = parseDayOfYear("366", 0, "DDD", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for non-digit input", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayOfYear("abc", 0, "D", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for 'DD' pattern with single digit", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayOfYear("1", 0, "DD", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for 'DD' pattern with non-digits", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayOfYear("a1", 0, "DD", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for 'DD' pattern with too many digits", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayOfYear("123", 0, "DD", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for 'DDD' pattern with two digits", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayOfYear("12", 0, "DDD", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for 'DDD' pattern with non-digits", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayOfYear("a12", 0, "DDD", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for empty string", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDayOfYear("", 0, "D", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });
  });
});
