import { describe, it, expect } from "vitest";
import { getDay } from "../src";

/**
 * Test Design for getDay
 *
 * Function signature: getDay(date: Date | number): number
 *
 * Equivalence Partitioning:
 * - Class 1: Valid Date object → Returns day number (1-31)
 * - Class 2: Valid number timestamp → Returns day number (1-31)
 * - Class 3: Invalid Date object → Returns NaN
 * - Class 4: Invalid number (NaN, Infinity, -Infinity) → Returns NaN
 *
 * Boundary Value Analysis:
 * - Day boundaries: 1 (first day), 28/29/30/31 (last day, varies by month)
 * - Month-specific boundaries: February (28/29), 30-day months, 31-day months
 * - Leap year February 29
 * - Month transitions: Last day of month to first day of next month
 */

describe("getDay", () => {
  describe("Equivalence Class 1: Valid Date object", () => {
    it("should return day for typical date (mid-month)", () => {
      // Arrange
      const date = new Date(2024, 0, 15); // January 15, 2024

      // Act
      const result = getDay(date);

      // Assert
      expect(result).toBe(15);
    });

    it("should return day for first day of month", () => {
      // Arrange
      const date = new Date(2024, 5, 1); // June 1, 2024

      // Act
      const result = getDay(date);

      // Assert
      expect(result).toBe(1);
    });

    it("should return day for last day of month", () => {
      // Arrange
      const date = new Date(2024, 0, 31); // January 31, 2024

      // Act
      const result = getDay(date);

      // Assert
      expect(result).toBe(31);
    });

    it("should return day in local timezone", () => {
      // Arrange: Test getDay respects local timezone (not UTC)
      const date = new Date("2024-01-15T12:00:00.000Z");
      const expected = date.getDate(); // Local day

      // Act
      const result = getDay(date);

      // Assert
      expect(result).toBe(expected);
    });
  });

  describe("Equivalence Class 2: Valid number timestamp", () => {
    it("should accept timestamp for typical date", () => {
      // Arrange
      const date = new Date(2024, 2, 15); // March 15, 2024
      const timestamp = date.getTime();

      // Act
      const result = getDay(timestamp);

      // Assert
      expect(result).toBe(15);
    });

    it("should accept timestamp 0 (Unix epoch)", () => {
      // Arrange
      const timestamp = 0; // Jan 1, 1970

      // Act
      const result = getDay(timestamp);

      // Assert
      expect(result).toBe(new Date(0).getDate()); // Local day (timezone-agnostic)
    });

    it("should accept positive timestamp", () => {
      // Arrange: Day after Unix epoch start
      const timestamp = 86400000; // Jan 2, 1970 (86400000ms = 1 day)

      // Act
      const result = getDay(timestamp);

      // Assert
      expect(result).toBe(2); // January 2nd
    });

    it("should accept negative timestamp (before Unix epoch)", () => {
      // Arrange: Day before Unix epoch
      const timestamp = -86400000; // Dec 31, 1969

      // Act
      const result = getDay(timestamp);

      // Assert
      expect(result).toBe(31); // December 31st
    });
  });

  describe("Equivalence Class 3: Invalid Date object", () => {
    it("should return NaN for Invalid Date from invalid string", () => {
      // Arrange
      const invalidDate = new Date("invalid");

      // Act
      const result = getDay(invalidDate);

      // Assert
      expect(result).toBeNaN();
    });

    it("should return NaN for Invalid Date from empty string", () => {
      // Arrange
      const invalidDate = new Date("");

      // Act
      const result = getDay(invalidDate);

      // Assert
      expect(result).toBeNaN();
    });

    it("should return NaN for Invalid Date from NaN", () => {
      // Arrange
      const invalidDate = new Date(NaN);

      // Act
      const result = getDay(invalidDate);

      // Assert
      expect(result).toBeNaN();
    });
  });

  describe("Equivalence Class 4: Invalid number (NaN, Infinity, -Infinity)", () => {
    it("should return NaN when timestamp is NaN", () => {
      // Arrange
      const timestamp = NaN;

      // Act
      const result = getDay(timestamp);

      // Assert
      expect(result).toBeNaN();
    });

    it("should return NaN when timestamp is Infinity", () => {
      // Arrange
      const timestamp = Infinity;

      // Act
      const result = getDay(timestamp);

      // Assert
      expect(result).toBeNaN();
    });

    it("should return NaN when timestamp is -Infinity", () => {
      // Arrange
      const timestamp = -Infinity;

      // Act
      const result = getDay(timestamp);

      // Assert
      expect(result).toBeNaN();
    });
  });

  describe("Boundary Value Analysis: Day Boundaries", () => {
    it("should handle day 1 (first day of month, boundary)", () => {
      // Arrange
      const date = new Date(2024, 3, 1); // April 1

      // Act
      const result = getDay(date);

      // Assert
      expect(result).toBe(1);
    });

    it("should handle day 31 (maximum day in 31-day month)", () => {
      // Arrange
      const date = new Date(2024, 0, 31); // January 31

      // Act
      const result = getDay(date);

      // Assert
      expect(result).toBe(31);
    });

    it("should handle day 30 (maximum day in 30-day month)", () => {
      // Arrange
      const date = new Date(2024, 3, 30); // April 30

      // Act
      const result = getDay(date);

      // Assert
      expect(result).toBe(30);
    });

    it("should handle day 29 (February in leap year)", () => {
      // Arrange
      const date = new Date(2024, 1, 29); // February 29, 2024 (leap year)

      // Act
      const result = getDay(date);

      // Assert
      expect(result).toBe(29);
    });

    it("should handle day 28 (February in non-leap year)", () => {
      // Arrange
      const date = new Date(2023, 1, 28); // February 28, 2023 (non-leap year)

      // Act
      const result = getDay(date);

      // Assert
      expect(result).toBe(28);
    });
  });

  describe("Boundary Value Analysis: Month-Specific Day Boundaries", () => {
    it("should handle 31-day months (January)", () => {
      // Arrange
      const date = new Date(2024, 0, 31); // January 31

      // Act
      const result = getDay(date);

      // Assert
      expect(result).toBe(31);
    });

    it("should handle 31-day months (March)", () => {
      // Arrange
      const date = new Date(2024, 2, 31); // March 31

      // Act
      const result = getDay(date);

      // Assert
      expect(result).toBe(31);
    });

    it("should handle 31-day months (May)", () => {
      // Arrange
      const date = new Date(2024, 4, 31); // May 31

      // Act
      const result = getDay(date);

      // Assert
      expect(result).toBe(31);
    });

    it("should handle 31-day months (December)", () => {
      // Arrange
      const date = new Date(2024, 11, 31); // December 31

      // Act
      const result = getDay(date);

      // Assert
      expect(result).toBe(31);
    });

    it("should handle 30-day months (April)", () => {
      // Arrange
      const date = new Date(2024, 3, 30); // April 30

      // Act
      const result = getDay(date);

      // Assert
      expect(result).toBe(30);
    });

    it("should handle 30-day months (June)", () => {
      // Arrange
      const date = new Date(2024, 5, 30); // June 30

      // Act
      const result = getDay(date);

      // Assert
      expect(result).toBe(30);
    });

    it("should handle 30-day months (September)", () => {
      // Arrange
      const date = new Date(2024, 8, 30); // September 30

      // Act
      const result = getDay(date);

      // Assert
      expect(result).toBe(30);
    });

    it("should handle 30-day months (November)", () => {
      // Arrange
      const date = new Date(2024, 10, 30); // November 30

      // Act
      const result = getDay(date);

      // Assert
      expect(result).toBe(30);
    });
  });

  describe("Boundary Value Analysis: Leap Years", () => {
    it("should handle leap year February 29 (divisible by 4)", () => {
      // Arrange
      const leapYearDate = new Date(2024, 1, 29); // Feb 29, 2024

      // Act
      const result = getDay(leapYearDate);

      // Assert
      expect(result).toBe(29);
    });

    it("should handle leap year February 29 (divisible by 400)", () => {
      // Arrange
      const centuryLeapYear = new Date(2000, 1, 29); // Feb 29, 2000

      // Act
      const result = getDay(centuryLeapYear);

      // Assert
      expect(result).toBe(29);
    });

    it("should handle non-leap year February 28 (divisible by 100 but not 400)", () => {
      // Arrange
      const nonLeapYear = new Date(1900, 1, 28); // Feb 28, 1900 (no Feb 29)

      // Act
      const result = getDay(nonLeapYear);

      // Assert
      expect(result).toBe(28);
    });

    it("should handle non-leap year February 28 (not divisible by 4)", () => {
      // Arrange
      const nonLeapYear = new Date(2023, 1, 28); // Feb 28, 2023

      // Act
      const result = getDay(nonLeapYear);

      // Assert
      expect(result).toBe(28);
    });
  });

  describe("Boundary Value Analysis: Month Transitions", () => {
    it("should handle January 31 to February 1 transition", () => {
      // Arrange
      const jan31 = new Date(2024, 0, 31);
      const feb1 = new Date(2024, 1, 1);

      // Act
      const resultJan = getDay(jan31);
      const resultFeb = getDay(feb1);

      // Assert
      expect(resultJan).toBe(31); // Last day of January
      expect(resultFeb).toBe(1); // First day of February
    });

    it("should handle February 28 (non-leap) to March 1 transition", () => {
      // Arrange
      const feb28 = new Date(2023, 1, 28);
      const mar1 = new Date(2023, 2, 1);

      // Act
      const resultFeb = getDay(feb28);
      const resultMar = getDay(mar1);

      // Assert
      expect(resultFeb).toBe(28); // Last day of February (non-leap)
      expect(resultMar).toBe(1); // First day of March
    });

    it("should handle February 29 (leap) to March 1 transition", () => {
      // Arrange
      const feb29 = new Date(2024, 1, 29); // 2024 is a leap year
      const mar1 = new Date(2024, 2, 1);

      // Act
      const resultFeb = getDay(feb29);
      const resultMar = getDay(mar1);

      // Assert
      expect(resultFeb).toBe(29); // Last day of February (leap)
      expect(resultMar).toBe(1); // First day of March
    });

    it("should handle December 31 to January 1 (year boundary) transition", () => {
      // Arrange
      const dec31 = new Date(2024, 11, 31);
      const jan1 = new Date(2025, 0, 1);

      // Act
      const resultDec = getDay(dec31);
      const resultJan = getDay(jan1);

      // Assert
      expect(resultDec).toBe(31); // Last day of year
      expect(resultJan).toBe(1); // First day of next year
    });
  });

  describe("Boundary Value Analysis: Historic Dates", () => {
    it("should handle Unix epoch (January 1, 1970)", () => {
      // Arrange
      const date = new Date("1970-01-01");

      // Act
      const result = getDay(date);

      // Assert
      expect(result).toBe(1);
    });

    it("should handle Y2K (January 1, 2000)", () => {
      // Arrange
      const date = new Date("2000-01-01");

      // Act
      const result = getDay(date);

      // Assert
      expect(result).toBe(1);
    });

    it("should handle year 1 (January 1, 0001)", () => {
      // Arrange
      const date = new Date("0001-01-01");

      // Act
      const result = getDay(date);

      // Assert
      expect(result).toBe(1);
    });
  });

  describe("Boundary Value Analysis: Year Start and End", () => {
    it("should handle first day of year (January 1)", () => {
      // Arrange
      const date = new Date(2024, 0, 1);

      // Act
      const result = getDay(date);

      // Assert
      expect(result).toBe(1);
    });

    it("should handle last day of year (December 31)", () => {
      // Arrange
      const date = new Date(2024, 11, 31);

      // Act
      const result = getDay(date);

      // Assert
      expect(result).toBe(31);
    });
  });

  describe("Boundary Value Analysis: Timestamp Ranges", () => {
    it("should handle various days via timestamp (systematic sampling)", () => {
      // Arrange & Act & Assert: Test days 1-15 via timestamp
      for (let day = 1; day <= 15; day++) {
        const date = new Date(2024, 5, day); // June (30-day month)
        const timestamp = date.getTime();

        expect(getDay(timestamp)).toBe(day);
      }
    });
  });
});
