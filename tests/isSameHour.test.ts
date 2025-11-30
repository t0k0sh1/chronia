import { describe, it, expect } from "vitest";
import { isSameHour } from "../src/isSameHour";

/**
 * Test Design for isSameHour
 *
 * Function signature: isSameHour(dateLeft: Date | number, dateRight: Date | number): boolean
 *
 * Equivalence Partitioning:
 * - Class 1: Both dates in same hour → Returns true
 * - Class 2: Dates in different hours of same day → Returns false
 * - Class 3: Dates in same hour but different days/months/years → Returns false
 * - Class 4: Valid timestamp inputs in same hour → Returns true
 * - Class 5: Valid timestamp inputs in different hours → Returns false
 * - Class 6: Invalid date inputs (Invalid Date, NaN, Infinity, -Infinity) → Returns false
 *
 * Boundary Value Analysis:
 * - Same hour boundary: Start (:00:00.000) and end (:59:59.999) of same hour
 * - Hour boundary crossing: Last moment and first moment across hours
 * - Day boundary crossing: 23:xx and 00:xx across days
 * - All 24 hours: 00:xx through 23:xx
 * - Midnight (00:xx) and noon (12:xx) special cases
 * - DST transitions: Hours skipped/repeated during daylight saving time
 * - Ignores: Minute, second, and millisecond components
 */

describe("isSameHour", () => {
  describe("Equivalence Class 1: Both dates in same hour", () => {
    it("should return true for dates at start and end of same hour", () => {
      // Arrange
      const date1 = new Date(2024, 5, 15, 14, 0, 0, 0); // June 15, 2024 14:00:00.000
      const date2 = new Date(2024, 5, 15, 14, 59, 59, 999); // June 15, 2024 14:59:59.999

      // Act & Assert
      expect(isSameHour(date1, date2)).toBe(true);
    });

    it("should return true for dates at different minutes of same hour", () => {
      // Arrange
      const date1 = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
      const date2 = new Date(2024, 5, 15, 14, 15, 20, 456); // June 15, 2024 14:15:20.456

      // Act & Assert
      expect(isSameHour(date1, date2)).toBe(true);
    });

    it("should ignore minute, second, and millisecond components", () => {
      // Arrange
      const start = new Date(2024, 5, 15, 14, 0, 0, 0); // June 15, 2024 14:00:00.000
      const end = new Date(2024, 5, 15, 14, 59, 59, 999); // June 15, 2024 14:59:59.999

      // Act & Assert
      expect(isSameHour(start, end)).toBe(true);
    });
  });

  describe("Equivalence Class 2: Dates in different hours of same day", () => {
    it("should return false for dates in consecutive hours", () => {
      // Arrange
      const date1 = new Date(2024, 5, 15, 14, 59, 59, 999); // June 15, 2024 14:59:59.999
      const date2 = new Date(2024, 5, 15, 15, 0, 0, 0); // June 15, 2024 15:00:00.000

      // Act & Assert
      expect(isSameHour(date1, date2)).toBe(false);
    });

    it("should return false for different hours in same day", () => {
      // Arrange
      const morning = new Date(2024, 5, 15, 9, 30); // June 15, 2024 09:30
      const afternoon = new Date(2024, 5, 15, 15, 30); // June 15, 2024 15:30

      // Act & Assert
      expect(isSameHour(morning, afternoon)).toBe(false);
    });
  });

  describe("Equivalence Class 3: Dates in same hour but different days/months/years", () => {
    it("should return false for same hour in different days", () => {
      // Arrange
      const day1 = new Date(2024, 5, 15, 14, 30); // June 15, 2024 14:30
      const day2 = new Date(2024, 5, 16, 14, 30); // June 16, 2024 14:30

      // Act & Assert
      expect(isSameHour(day1, day2)).toBe(false);
    });

    it("should return false for same hour in different months", () => {
      // Arrange
      const june = new Date(2024, 5, 15, 14, 30); // June 15, 2024 14:30
      const july = new Date(2024, 6, 15, 14, 30); // July 15, 2024 14:30

      // Act & Assert
      expect(isSameHour(june, july)).toBe(false);
    });

    it("should return false for same hour in different years", () => {
      // Arrange
      const year2024 = new Date(2024, 5, 15, 14, 30); // June 15, 2024 14:30
      const year2023 = new Date(2023, 5, 15, 14, 30); // June 15, 2023 14:30

      // Act & Assert
      expect(isSameHour(year2024, year2023)).toBe(false);
    });
  });

  describe("Equivalence Class 4: Valid timestamp inputs in same hour", () => {
    it("should accept timestamp inputs in same hour", () => {
      // Arrange
      const timestamp1 = new Date(2024, 5, 15, 14, 15, 0).getTime();
      const timestamp2 = new Date(2024, 5, 15, 14, 45, 0).getTime();

      // Act & Assert
      expect(isSameHour(timestamp1, timestamp2)).toBe(true);
    });

    it("should accept mixed Date and timestamp in same hour", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 14, 30);
      const timestamp = new Date(2024, 5, 15, 14, 45).getTime();

      // Act & Assert
      expect(isSameHour(date, timestamp)).toBe(true);
      expect(isSameHour(timestamp, date)).toBe(true);
    });
  });

  describe("Equivalence Class 5: Valid timestamp inputs in different hours", () => {
    it("should return false for timestamps in different hours", () => {
      // Arrange
      const timestamp1 = new Date(2024, 5, 15, 14, 59).getTime();
      const timestamp2 = new Date(2024, 5, 15, 15, 0).getTime();

      // Act & Assert
      expect(isSameHour(timestamp1, timestamp2)).toBe(false);
    });
  });

  describe("Equivalence Class 6: Invalid date inputs", () => {
    it("should return false when first date is Invalid Date", () => {
      // Arrange
      const invalidDate = new Date("invalid");
      const validDate = new Date(2024, 5, 15, 14, 30);

      // Act & Assert
      expect(isSameHour(invalidDate, validDate)).toBe(false);
    });

    it("should return false when second date is Invalid Date", () => {
      // Arrange
      const validDate = new Date(2024, 5, 15, 14, 30);
      const invalidDate = new Date("invalid");

      // Act & Assert
      expect(isSameHour(validDate, invalidDate)).toBe(false);
    });

    it("should return false when both dates are Invalid Date", () => {
      // Arrange
      const invalidDate1 = new Date("invalid");
      const invalidDate2 = new Date(NaN);

      // Act & Assert
      expect(isSameHour(invalidDate1, invalidDate2)).toBe(false);
    });

    it("should return false when timestamp is NaN", () => {
      // Arrange
      const validDate = new Date(2024, 5, 15, 14, 30);

      // Act & Assert
      expect(isSameHour(NaN, validDate)).toBe(false);
      expect(isSameHour(validDate, NaN)).toBe(false);
      expect(isSameHour(NaN, NaN)).toBe(false);
    });

    it("should return false when timestamp is Infinity", () => {
      // Arrange
      const validDate = new Date(2024, 5, 15, 14, 30);

      // Act & Assert
      expect(isSameHour(Infinity, validDate)).toBe(false);
      expect(isSameHour(validDate, Infinity)).toBe(false);
    });

    it("should return false when timestamp is -Infinity", () => {
      // Arrange
      const validDate = new Date(2024, 5, 15, 14, 30);

      // Act & Assert
      expect(isSameHour(-Infinity, validDate)).toBe(false);
      expect(isSameHour(validDate, -Infinity)).toBe(false);
    });
  });

  describe("Boundary Value Analysis: All 24 hours", () => {
    it("should handle all 24 hours correctly", () => {
      // Arrange & Act & Assert
      for (let hour = 0; hour < 24; hour++) {
        const date1 = new Date(2024, 5, 15, hour, 0, 0);
        const date2 = new Date(2024, 5, 15, hour, 45, 30);
        expect(isSameHour(date1, date2)).toBe(true);

        if (hour < 23) {
          const nextHour = new Date(2024, 5, 15, hour + 1, 0, 0);
          expect(isSameHour(date1, nextHour)).toBe(false);
        }
      }
    });
  });

  describe("Boundary Value Analysis: Midnight hour", () => {
    it("should handle midnight (00:xx) correctly", () => {
      // Arrange
      const midnight1 = new Date(2024, 5, 15, 0, 0, 0); // June 15, 2024 00:00:00
      const midnight2 = new Date(2024, 5, 15, 0, 59, 59); // June 15, 2024 00:59:59
      const oneAM = new Date(2024, 5, 15, 1, 0, 0); // June 15, 2024 01:00:00

      // Act & Assert
      expect(isSameHour(midnight1, midnight2)).toBe(true);
      expect(isSameHour(midnight1, oneAM)).toBe(false);
    });
  });

  describe("Boundary Value Analysis: Noon hour", () => {
    it("should handle noon (12:xx) correctly", () => {
      // Arrange
      const noon1 = new Date(2024, 5, 15, 12, 0, 0); // June 15, 2024 12:00:00
      const noon2 = new Date(2024, 5, 15, 12, 59, 59); // June 15, 2024 12:59:59
      const onePM = new Date(2024, 5, 15, 13, 0, 0); // June 15, 2024 13:00:00

      // Act & Assert
      expect(isSameHour(noon1, noon2)).toBe(true);
      expect(isSameHour(noon1, onePM)).toBe(false);
    });
  });

  describe("Boundary Value Analysis: Day boundaries", () => {
    it("should handle day boundaries (23:xx → 00:xx)", () => {
      // Arrange
      const endOfDay = new Date(2024, 5, 15, 23, 59, 59); // June 15, 2024 23:59:59
      const startOfNextDay = new Date(2024, 5, 16, 0, 0, 0); // June 16, 2024 00:00:00
      const sameHour = new Date(2024, 5, 15, 23, 30, 0); // June 15, 2024 23:30:00

      // Act & Assert
      expect(isSameHour(endOfDay, startOfNextDay)).toBe(false);
      expect(isSameHour(endOfDay, sameHour)).toBe(true);
    });
  });

  describe("Boundary Value Analysis: Month boundaries", () => {
    it("should handle month boundaries", () => {
      // Arrange
      const endOfMonth = new Date(2024, 5, 30, 23, 45); // June 30, 2024 23:45
      const startOfNextMonth = new Date(2024, 6, 1, 0, 15); // July 1, 2024 00:15
      const sameHour = new Date(2024, 5, 30, 23, 15); // June 30, 2024 23:15

      // Act & Assert
      expect(isSameHour(endOfMonth, startOfNextMonth)).toBe(false);
      expect(isSameHour(endOfMonth, sameHour)).toBe(true);
    });
  });

  describe("Boundary Value Analysis: Year boundaries", () => {
    it("should handle year boundaries", () => {
      // Arrange
      const endOfYear = new Date(2024, 11, 31, 23, 45); // December 31, 2024 23:45
      const startOfNextYear = new Date(2025, 0, 1, 0, 15); // January 1, 2025 00:15
      const sameHour = new Date(2024, 11, 31, 23, 15); // December 31, 2024 23:15

      // Act & Assert
      expect(isSameHour(endOfYear, startOfNextYear)).toBe(false);
      expect(isSameHour(endOfYear, sameHour)).toBe(true);
    });
  });

  describe("Boundary Value Analysis: DST transitions", () => {
    it("should handle DST transitions", () => {
      // Arrange
      // Note: This test assumes local time behavior may vary by timezone
      const beforeDST = new Date(2024, 2, 10, 1, 30); // March 10, 2024 01:30 (before spring forward)
      const sameDayDifferentHour = new Date(2024, 2, 10, 3, 30); // March 10, 2024 03:30 (after spring forward)
      const sameHour = new Date(2024, 2, 10, 1, 45); // March 10, 2024 01:45

      // Act & Assert
      expect(isSameHour(beforeDST, sameHour)).toBe(true);
      expect(isSameHour(beforeDST, sameDayDifferentHour)).toBe(false);
    });
  });

  describe("Same Date object reference", () => {
    it("should return true when comparing same date object", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 14, 30, 45);

      // Act & Assert
      expect(isSameHour(date, date)).toBe(true);
    });
  });

  describe("Argument order independence", () => {
    it("should return same result regardless of argument order", () => {
      // Arrange
      const date1 = new Date(2024, 5, 15, 14, 15, 0);
      const date2 = new Date(2024, 5, 15, 14, 45, 0);
      const date3 = new Date(2024, 5, 15, 15, 15, 0);

      // Act & Assert
      expect(isSameHour(date1, date2)).toBe(isSameHour(date2, date1));
      expect(isSameHour(date1, date3)).toBe(isSameHour(date3, date1));
    });
  });
});
