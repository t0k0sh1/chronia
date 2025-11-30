import { describe, it, expect } from "vitest";
import { isSameMinute } from "../src/isSameMinute";

/**
 * Test Design for isSameMinute
 *
 * Function signature: isSameMinute(dateLeft: Date | number, dateRight: Date | number): boolean
 *
 * Equivalence Partitioning:
 * - Class 1: Both dates in same minute → Returns true
 * - Class 2: Dates in different minutes of same hour → Returns false
 * - Class 3: Dates in same minute but different hours/days/months/years → Returns false
 * - Class 4: Valid timestamp inputs in same minute → Returns true
 * - Class 5: Valid timestamp inputs in different minutes → Returns false
 * - Class 6: Invalid date inputs (Invalid Date, NaN, Infinity, -Infinity) → Returns false
 *
 * Boundary Value Analysis:
 * - Same minute boundary: Start (:xx:00.000) and end (:xx:59.999) of same minute
 * - Minute boundary crossing: Last moment and first moment across minutes
 * - Hour boundary crossing: 14:59:xx and 15:00:xx across hours
 * - All 60 minutes: :00 through :59
 * - Minute 0 (:00:xx) and minute 59 (:59:xx) special cases
 * - Leap seconds: Conceptual handling of 60th second edge case
 * - Ignores: Second and millisecond components
 */

describe("isSameMinute", () => {
  describe("Equivalence Class 1: Both dates in same minute", () => {
    it("should return true for dates at start and end of same minute", () => {
      // Arrange
      const date1 = new Date(2024, 5, 15, 14, 30, 0, 0); // June 15, 2024 14:30:00.000
      const date2 = new Date(2024, 5, 15, 14, 30, 59, 999); // June 15, 2024 14:30:59.999

      // Act & Assert
      expect(isSameMinute(date1, date2)).toBe(true);
    });

    it("should return true for dates at different seconds of same minute", () => {
      // Arrange
      const date1 = new Date(2024, 5, 15, 14, 30, 15, 500); // June 15, 2024 14:30:15.500
      const date2 = new Date(2024, 5, 15, 14, 30, 45, 800); // June 15, 2024 14:30:45.800

      // Act & Assert
      expect(isSameMinute(date1, date2)).toBe(true);
    });

    it("should ignore second and millisecond components", () => {
      // Arrange
      const start = new Date(2024, 5, 15, 14, 30, 0, 0); // June 15, 2024 14:30:00.000
      const end = new Date(2024, 5, 15, 14, 30, 59, 999); // June 15, 2024 14:30:59.999

      // Act & Assert
      expect(isSameMinute(start, end)).toBe(true);
    });
  });

  describe("Equivalence Class 2: Dates in different minutes of same hour", () => {
    it("should return false for dates in consecutive minutes", () => {
      // Arrange
      const date1 = new Date(2024, 5, 15, 14, 30, 59, 999); // June 15, 2024 14:30:59.999
      const date2 = new Date(2024, 5, 15, 14, 31, 0, 0); // June 15, 2024 14:31:00.000

      // Act & Assert
      expect(isSameMinute(date1, date2)).toBe(false);
    });

    it("should return false for different minutes in same hour", () => {
      // Arrange
      const minute15 = new Date(2024, 5, 15, 14, 15, 30); // June 15, 2024 14:15:30
      const minute45 = new Date(2024, 5, 15, 14, 45, 30); // June 15, 2024 14:45:30

      // Act & Assert
      expect(isSameMinute(minute15, minute45)).toBe(false);
    });
  });

  describe("Equivalence Class 3: Dates in same minute but different hours/days/months/years", () => {
    it("should return false for same minute in different hours", () => {
      // Arrange
      const hour14 = new Date(2024, 5, 15, 14, 30, 15); // June 15, 2024 14:30:15
      const hour15 = new Date(2024, 5, 15, 15, 30, 15); // June 15, 2024 15:30:15

      // Act & Assert
      expect(isSameMinute(hour14, hour15)).toBe(false);
    });

    it("should return false for same minute in different days", () => {
      // Arrange
      const day15 = new Date(2024, 5, 15, 14, 30, 15); // June 15, 2024 14:30:15
      const day16 = new Date(2024, 5, 16, 14, 30, 15); // June 16, 2024 14:30:15

      // Act & Assert
      expect(isSameMinute(day15, day16)).toBe(false);
    });

    it("should return false for same minute in different months", () => {
      // Arrange
      const june = new Date(2024, 5, 15, 14, 30, 15); // June 15, 2024 14:30:15
      const july = new Date(2024, 6, 15, 14, 30, 15); // July 15, 2024 14:30:15

      // Act & Assert
      expect(isSameMinute(june, july)).toBe(false);
    });

    it("should return false for same minute in different years", () => {
      // Arrange
      const year2024 = new Date(2024, 5, 15, 14, 30, 15); // June 15, 2024 14:30:15
      const year2023 = new Date(2023, 5, 15, 14, 30, 15); // June 15, 2023 14:30:15

      // Act & Assert
      expect(isSameMinute(year2024, year2023)).toBe(false);
    });
  });

  describe("Equivalence Class 4: Valid timestamp inputs in same minute", () => {
    it("should accept timestamp inputs in same minute", () => {
      // Arrange
      const timestamp1 = new Date(2024, 5, 15, 14, 30, 15).getTime();
      const timestamp2 = new Date(2024, 5, 15, 14, 30, 45).getTime();

      // Act & Assert
      expect(isSameMinute(timestamp1, timestamp2)).toBe(true);
    });

    it("should accept mixed Date and timestamp in same minute", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 14, 30, 20);
      const timestamp = new Date(2024, 5, 15, 14, 30, 50).getTime();

      // Act & Assert
      expect(isSameMinute(date, timestamp)).toBe(true);
      expect(isSameMinute(timestamp, date)).toBe(true);
    });
  });

  describe("Equivalence Class 5: Valid timestamp inputs in different minutes", () => {
    it("should return false for timestamps in different minutes", () => {
      // Arrange
      const timestamp1 = new Date(2024, 5, 15, 14, 30, 59).getTime();
      const timestamp2 = new Date(2024, 5, 15, 14, 31, 0).getTime();

      // Act & Assert
      expect(isSameMinute(timestamp1, timestamp2)).toBe(false);
    });
  });

  describe("Equivalence Class 6: Invalid date inputs", () => {
    it("should return false when first date is Invalid Date", () => {
      // Arrange
      const invalidDate = new Date("invalid");
      const validDate = new Date(2024, 5, 15, 14, 30);

      // Act & Assert
      expect(isSameMinute(invalidDate, validDate)).toBe(false);
    });

    it("should return false when second date is Invalid Date", () => {
      // Arrange
      const validDate = new Date(2024, 5, 15, 14, 30);
      const invalidDate = new Date("invalid");

      // Act & Assert
      expect(isSameMinute(validDate, invalidDate)).toBe(false);
    });

    it("should return false when both dates are Invalid Date", () => {
      // Arrange
      const invalidDate1 = new Date("invalid");
      const invalidDate2 = new Date(NaN);

      // Act & Assert
      expect(isSameMinute(invalidDate1, invalidDate2)).toBe(false);
    });

    it("should return false when timestamp is NaN", () => {
      // Arrange
      const validDate = new Date(2024, 5, 15, 14, 30);

      // Act & Assert
      expect(isSameMinute(NaN, validDate)).toBe(false);
      expect(isSameMinute(validDate, NaN)).toBe(false);
      expect(isSameMinute(NaN, NaN)).toBe(false);
    });

    it("should return false when timestamp is Infinity", () => {
      // Arrange
      const validDate = new Date(2024, 5, 15, 14, 30);

      // Act & Assert
      expect(isSameMinute(Infinity, validDate)).toBe(false);
      expect(isSameMinute(validDate, Infinity)).toBe(false);
    });

    it("should return false when timestamp is -Infinity", () => {
      // Arrange
      const validDate = new Date(2024, 5, 15, 14, 30);

      // Act & Assert
      expect(isSameMinute(-Infinity, validDate)).toBe(false);
      expect(isSameMinute(validDate, -Infinity)).toBe(false);
    });
  });

  describe("Boundary Value Analysis: All 60 minutes", () => {
    it("should handle all 60 minutes correctly", () => {
      // Arrange & Act & Assert
      for (let minute = 0; minute < 60; minute++) {
        const date1 = new Date(2024, 5, 15, 14, minute, 0);
        const date2 = new Date(2024, 5, 15, 14, minute, 30);
        expect(isSameMinute(date1, date2)).toBe(true);

        if (minute < 59) {
          const nextMinute = new Date(2024, 5, 15, 14, minute + 1, 0);
          expect(isSameMinute(date1, nextMinute)).toBe(false);
        }
      }
    });
  });

  describe("Boundary Value Analysis: Minute 0", () => {
    it("should handle minute 0 (:00:xx) correctly", () => {
      // Arrange
      const minute0_1 = new Date(2024, 5, 15, 14, 0, 0); // June 15, 2024 14:00:00
      const minute0_2 = new Date(2024, 5, 15, 14, 0, 59); // June 15, 2024 14:00:59
      const minute1 = new Date(2024, 5, 15, 14, 1, 0); // June 15, 2024 14:01:00

      // Act & Assert
      expect(isSameMinute(minute0_1, minute0_2)).toBe(true);
      expect(isSameMinute(minute0_1, minute1)).toBe(false);
    });
  });

  describe("Boundary Value Analysis: Minute 59", () => {
    it("should handle minute 59 (:59:xx) correctly", () => {
      // Arrange
      const minute59_1 = new Date(2024, 5, 15, 14, 59, 0); // June 15, 2024 14:59:00
      const minute59_2 = new Date(2024, 5, 15, 14, 59, 59); // June 15, 2024 14:59:59
      const nextHour = new Date(2024, 5, 15, 15, 0, 0); // June 15, 2024 15:00:00

      // Act & Assert
      expect(isSameMinute(minute59_1, minute59_2)).toBe(true);
      expect(isSameMinute(minute59_1, nextHour)).toBe(false);
    });
  });

  describe("Boundary Value Analysis: Hour boundaries", () => {
    it("should handle hour boundaries (14:59:xx → 15:00:xx)", () => {
      // Arrange
      const endOfHour = new Date(2024, 5, 15, 14, 59, 59); // June 15, 2024 14:59:59
      const startOfNextHour = new Date(2024, 5, 15, 15, 0, 0); // June 15, 2024 15:00:00
      const sameMinute = new Date(2024, 5, 15, 14, 59, 30); // June 15, 2024 14:59:30

      // Act & Assert
      expect(isSameMinute(endOfHour, startOfNextHour)).toBe(false);
      expect(isSameMinute(endOfHour, sameMinute)).toBe(true);
    });
  });

  describe("Boundary Value Analysis: Day boundaries", () => {
    it("should handle day boundaries (23:59:xx → 00:00:xx)", () => {
      // Arrange
      const endOfDay = new Date(2024, 5, 15, 23, 59, 45); // June 15, 2024 23:59:45
      const startOfNextDay = new Date(2024, 5, 16, 0, 0, 15); // June 16, 2024 00:00:15
      const sameMinute = new Date(2024, 5, 15, 23, 59, 15); // June 15, 2024 23:59:15

      // Act & Assert
      expect(isSameMinute(endOfDay, startOfNextDay)).toBe(false);
      expect(isSameMinute(endOfDay, sameMinute)).toBe(true);
    });
  });

  describe("Boundary Value Analysis: Month boundaries", () => {
    it("should handle month boundaries", () => {
      // Arrange
      const endOfMonth = new Date(2024, 5, 30, 23, 59, 30); // June 30, 2024 23:59:30
      const startOfNextMonth = new Date(2024, 6, 1, 0, 0, 30); // July 1, 2024 00:00:30
      const sameMinute = new Date(2024, 5, 30, 23, 59, 45); // June 30, 2024 23:59:45

      // Act & Assert
      expect(isSameMinute(endOfMonth, startOfNextMonth)).toBe(false);
      expect(isSameMinute(endOfMonth, sameMinute)).toBe(true);
    });
  });

  describe("Boundary Value Analysis: Year boundaries", () => {
    it("should handle year boundaries", () => {
      // Arrange
      const endOfYear = new Date(2024, 11, 31, 23, 59, 30); // December 31, 2024 23:59:30
      const startOfNextYear = new Date(2025, 0, 1, 0, 0, 30); // January 1, 2025 00:00:30
      const sameMinute = new Date(2024, 11, 31, 23, 59, 45); // December 31, 2024 23:59:45

      // Act & Assert
      expect(isSameMinute(endOfYear, startOfNextYear)).toBe(false);
      expect(isSameMinute(endOfYear, sameMinute)).toBe(true);
    });
  });

  describe("Boundary Value Analysis: Leap seconds", () => {
    it("should handle leap seconds conceptually", () => {
      // Arrange
      // Note: JavaScript Date doesn't handle leap seconds, but we test edge cases
      const lastSecond = new Date(2024, 5, 15, 14, 30, 59, 999); // June 15, 2024 14:30:59.999
      const sameMinute = new Date(2024, 5, 15, 14, 30, 0, 0); // June 15, 2024 14:30:00.000
      const nextMinute = new Date(2024, 5, 15, 14, 31, 0, 0); // June 15, 2024 14:31:00.000

      // Act & Assert
      expect(isSameMinute(lastSecond, sameMinute)).toBe(true);
      expect(isSameMinute(lastSecond, nextMinute)).toBe(false);
    });
  });

  describe("Same Date object reference", () => {
    it("should return true when comparing same date object", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 14, 30, 45);

      // Act & Assert
      expect(isSameMinute(date, date)).toBe(true);
    });
  });

  describe("Argument order independence", () => {
    it("should return same result regardless of argument order", () => {
      // Arrange
      const date1 = new Date(2024, 5, 15, 14, 30, 15);
      const date2 = new Date(2024, 5, 15, 14, 30, 45);
      const date3 = new Date(2024, 5, 15, 14, 31, 15);

      // Act & Assert
      expect(isSameMinute(date1, date2)).toBe(isSameMinute(date2, date1));
      expect(isSameMinute(date1, date3)).toBe(isSameMinute(date3, date1));
    });
  });
});
