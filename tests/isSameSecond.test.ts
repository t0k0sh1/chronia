import { describe, it, expect } from "vitest";
import { isSameSecond } from "../src/isSameSecond";

/**
 * Test Design for isSameSecond
 *
 * Function signature: isSameSecond(dateLeft: Date | number, dateRight: Date | number): boolean
 *
 * Equivalence Partitioning:
 * - Class 1: Both dates in same second → Returns true
 * - Class 2: Dates in different seconds of same minute → Returns false
 * - Class 3: Dates in same second but different minutes/hours/days/months/years → Returns false
 * - Class 4: Valid timestamp inputs in same second → Returns true
 * - Class 5: Valid timestamp inputs in different seconds → Returns false
 * - Class 6: Invalid date inputs (Invalid Date, NaN, Infinity, -Infinity) → Returns false
 *
 * Boundary Value Analysis:
 * - Same second boundary: Start (:xx:xx.000) and end (:xx:xx.999) of same second
 * - Second boundary crossing: Last moment and first moment across seconds
 * - Minute boundary crossing: :30:59.xxx and :31:00.xxx across minutes
 * - All 60 seconds: :00 through :59
 * - Second 0 (:xx:00.xxx) and second 59 (:xx:59.xxx) special cases
 * - Various millisecond values: 0, 123, 500, 999
 * - Ignores: Millisecond component
 */

describe("isSameSecond", () => {
  describe("Equivalence Class 1: Both dates in same second", () => {
    it("should return true for dates at start and end of same second", () => {
      // Arrange
      const date1 = new Date(2024, 5, 15, 14, 30, 45, 0); // June 15, 2024 14:30:45.000
      const date2 = new Date(2024, 5, 15, 14, 30, 45, 999); // June 15, 2024 14:30:45.999

      // Act & Assert
      expect(isSameSecond(date1, date2)).toBe(true);
    });

    it("should return true for dates at different milliseconds of same second", () => {
      // Arrange
      const date1 = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
      const date2 = new Date(2024, 5, 15, 14, 30, 45, 456); // June 15, 2024 14:30:45.456

      // Act & Assert
      expect(isSameSecond(date1, date2)).toBe(true);
    });

    it("should ignore millisecond component", () => {
      // Arrange
      const start = new Date(2024, 5, 15, 14, 30, 45, 0); // June 15, 2024 14:30:45.000
      const end = new Date(2024, 5, 15, 14, 30, 45, 999); // June 15, 2024 14:30:45.999

      // Act & Assert
      expect(isSameSecond(start, end)).toBe(true);
    });
  });

  describe("Equivalence Class 2: Dates in different seconds of same minute", () => {
    it("should return false for dates in consecutive seconds", () => {
      // Arrange
      const date1 = new Date(2024, 5, 15, 14, 30, 45, 999); // June 15, 2024 14:30:45.999
      const date2 = new Date(2024, 5, 15, 14, 30, 46, 0); // June 15, 2024 14:30:46.000

      // Act & Assert
      expect(isSameSecond(date1, date2)).toBe(false);
    });

    it("should return false for different seconds in same minute", () => {
      // Arrange
      const second15 = new Date(2024, 5, 15, 14, 30, 15, 500); // June 15, 2024 14:30:15.500
      const second45 = new Date(2024, 5, 15, 14, 30, 45, 500); // June 15, 2024 14:30:45.500

      // Act & Assert
      expect(isSameSecond(second15, second45)).toBe(false);
    });
  });

  describe("Equivalence Class 3: Dates in same second but different minutes/hours/days/months/years", () => {
    it("should return false for same second in different minutes", () => {
      // Arrange
      const minute30 = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
      const minute31 = new Date(2024, 5, 15, 14, 31, 45, 123); // June 15, 2024 14:31:45.123

      // Act & Assert
      expect(isSameSecond(minute30, minute31)).toBe(false);
    });

    it("should return false for same second in different hours", () => {
      // Arrange
      const hour14 = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
      const hour15 = new Date(2024, 5, 15, 15, 30, 45, 123); // June 15, 2024 15:30:45.123

      // Act & Assert
      expect(isSameSecond(hour14, hour15)).toBe(false);
    });

    it("should return false for same second in different days", () => {
      // Arrange
      const day15 = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
      const day16 = new Date(2024, 5, 16, 14, 30, 45, 123); // June 16, 2024 14:30:45.123

      // Act & Assert
      expect(isSameSecond(day15, day16)).toBe(false);
    });

    it("should return false for same second in different months", () => {
      // Arrange
      const june = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
      const july = new Date(2024, 6, 15, 14, 30, 45, 123); // July 15, 2024 14:30:45.123

      // Act & Assert
      expect(isSameSecond(june, july)).toBe(false);
    });

    it("should return false for same second in different years", () => {
      // Arrange
      const year2024 = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
      const year2023 = new Date(2023, 5, 15, 14, 30, 45, 123); // June 15, 2023 14:30:45.123

      // Act & Assert
      expect(isSameSecond(year2024, year2023)).toBe(false);
    });
  });

  describe("Equivalence Class 4: Valid timestamp inputs in same second", () => {
    it("should accept timestamp inputs in same second", () => {
      // Arrange
      const timestamp1 = new Date(2024, 5, 15, 14, 30, 45, 100).getTime();
      const timestamp2 = new Date(2024, 5, 15, 14, 30, 45, 900).getTime();

      // Act & Assert
      expect(isSameSecond(timestamp1, timestamp2)).toBe(true);
    });

    it("should accept mixed Date and timestamp in same second", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 14, 30, 45, 200);
      const timestamp = new Date(2024, 5, 15, 14, 30, 45, 800).getTime();

      // Act & Assert
      expect(isSameSecond(date, timestamp)).toBe(true);
      expect(isSameSecond(timestamp, date)).toBe(true);
    });
  });

  describe("Equivalence Class 5: Valid timestamp inputs in different seconds", () => {
    it("should return false for timestamps in different seconds", () => {
      // Arrange
      const timestamp1 = new Date(2024, 5, 15, 14, 30, 45, 999).getTime();
      const timestamp2 = new Date(2024, 5, 15, 14, 30, 46, 0).getTime();

      // Act & Assert
      expect(isSameSecond(timestamp1, timestamp2)).toBe(false);
    });
  });

  describe("Equivalence Class 6: Invalid date inputs", () => {
    it("should return false when first date is Invalid Date", () => {
      // Arrange
      const invalidDate = new Date("invalid");
      const validDate = new Date(2024, 5, 15, 14, 30, 45);

      // Act & Assert
      expect(isSameSecond(invalidDate, validDate)).toBe(false);
    });

    it("should return false when second date is Invalid Date", () => {
      // Arrange
      const validDate = new Date(2024, 5, 15, 14, 30, 45);
      const invalidDate = new Date("invalid");

      // Act & Assert
      expect(isSameSecond(validDate, invalidDate)).toBe(false);
    });

    it("should return false when both dates are Invalid Date", () => {
      // Arrange
      const invalidDate1 = new Date("invalid");
      const invalidDate2 = new Date(NaN);

      // Act & Assert
      expect(isSameSecond(invalidDate1, invalidDate2)).toBe(false);
    });

    it("should return false when timestamp is NaN", () => {
      // Arrange
      const validDate = new Date(2024, 5, 15, 14, 30, 45);

      // Act & Assert
      expect(isSameSecond(NaN, validDate)).toBe(false);
      expect(isSameSecond(validDate, NaN)).toBe(false);
      expect(isSameSecond(NaN, NaN)).toBe(false);
    });

    it("should return false when timestamp is Infinity", () => {
      // Arrange
      const validDate = new Date(2024, 5, 15, 14, 30, 45);

      // Act & Assert
      expect(isSameSecond(Infinity, validDate)).toBe(false);
      expect(isSameSecond(validDate, Infinity)).toBe(false);
    });

    it("should return false when timestamp is -Infinity", () => {
      // Arrange
      const validDate = new Date(2024, 5, 15, 14, 30, 45);

      // Act & Assert
      expect(isSameSecond(-Infinity, validDate)).toBe(false);
      expect(isSameSecond(validDate, -Infinity)).toBe(false);
    });
  });

  describe("Boundary Value Analysis: All 60 seconds", () => {
    it("should handle all 60 seconds correctly", () => {
      // Arrange & Act & Assert
      for (let second = 0; second < 60; second++) {
        const date1 = new Date(2024, 5, 15, 14, 30, second, 0);
        const date2 = new Date(2024, 5, 15, 14, 30, second, 500);
        expect(isSameSecond(date1, date2)).toBe(true);

        if (second < 59) {
          const nextSecond = new Date(2024, 5, 15, 14, 30, second + 1, 0);
          expect(isSameSecond(date1, nextSecond)).toBe(false);
        }
      }
    });
  });

  describe("Boundary Value Analysis: Second 0", () => {
    it("should handle second 0 (:xx:00.xxx) correctly", () => {
      // Arrange
      const second0_1 = new Date(2024, 5, 15, 14, 30, 0, 0); // June 15, 2024 14:30:00.000
      const second0_2 = new Date(2024, 5, 15, 14, 30, 0, 999); // June 15, 2024 14:30:00.999
      const second1 = new Date(2024, 5, 15, 14, 30, 1, 0); // June 15, 2024 14:30:01.000

      // Act & Assert
      expect(isSameSecond(second0_1, second0_2)).toBe(true);
      expect(isSameSecond(second0_1, second1)).toBe(false);
    });
  });

  describe("Boundary Value Analysis: Second 59", () => {
    it("should handle second 59 (:xx:59.xxx) correctly", () => {
      // Arrange
      const second59_1 = new Date(2024, 5, 15, 14, 30, 59, 0); // June 15, 2024 14:30:59.000
      const second59_2 = new Date(2024, 5, 15, 14, 30, 59, 999); // June 15, 2024 14:30:59.999
      const nextMinute = new Date(2024, 5, 15, 14, 31, 0, 0); // June 15, 2024 14:31:00.000

      // Act & Assert
      expect(isSameSecond(second59_1, second59_2)).toBe(true);
      expect(isSameSecond(second59_1, nextMinute)).toBe(false);
    });
  });

  describe("Boundary Value Analysis: Minute boundaries", () => {
    it("should handle minute boundaries (:30:59.xxx → :31:00.xxx)", () => {
      // Arrange
      const endOfMinute = new Date(2024, 5, 15, 14, 30, 59, 999); // June 15, 2024 14:30:59.999
      const startOfNextMinute = new Date(2024, 5, 15, 14, 31, 0, 0); // June 15, 2024 14:31:00.000
      const sameSecond = new Date(2024, 5, 15, 14, 30, 59, 500); // June 15, 2024 14:30:59.500

      // Act & Assert
      expect(isSameSecond(endOfMinute, startOfNextMinute)).toBe(false);
      expect(isSameSecond(endOfMinute, sameSecond)).toBe(true);
    });
  });

  describe("Boundary Value Analysis: Hour boundaries", () => {
    it("should handle hour boundaries (14:59:59.xxx → 15:00:00.xxx)", () => {
      // Arrange
      const endOfHour = new Date(2024, 5, 15, 14, 59, 59, 750); // June 15, 2024 14:59:59.750
      const startOfNextHour = new Date(2024, 5, 15, 15, 0, 0, 250); // June 15, 2024 15:00:00.250
      const sameSecond = new Date(2024, 5, 15, 14, 59, 59, 250); // June 15, 2024 14:59:59.250

      // Act & Assert
      expect(isSameSecond(endOfHour, startOfNextHour)).toBe(false);
      expect(isSameSecond(endOfHour, sameSecond)).toBe(true);
    });
  });

  describe("Boundary Value Analysis: Day boundaries", () => {
    it("should handle day boundaries (23:59:59.xxx → 00:00:00.xxx)", () => {
      // Arrange
      const endOfDay = new Date(2024, 5, 15, 23, 59, 59, 500); // June 15, 2024 23:59:59.500
      const startOfNextDay = new Date(2024, 5, 16, 0, 0, 0, 500); // June 16, 2024 00:00:00.500
      const sameSecond = new Date(2024, 5, 15, 23, 59, 59, 750); // June 15, 2024 23:59:59.750

      // Act & Assert
      expect(isSameSecond(endOfDay, startOfNextDay)).toBe(false);
      expect(isSameSecond(endOfDay, sameSecond)).toBe(true);
    });
  });

  describe("Boundary Value Analysis: Month boundaries", () => {
    it("should handle month boundaries", () => {
      // Arrange
      const endOfMonth = new Date(2024, 5, 30, 23, 59, 59, 300); // June 30, 2024 23:59:59.300
      const startOfNextMonth = new Date(2024, 6, 1, 0, 0, 0, 300); // July 1, 2024 00:00:00.300
      const sameSecond = new Date(2024, 5, 30, 23, 59, 59, 800); // June 30, 2024 23:59:59.800

      // Act & Assert
      expect(isSameSecond(endOfMonth, startOfNextMonth)).toBe(false);
      expect(isSameSecond(endOfMonth, sameSecond)).toBe(true);
    });
  });

  describe("Boundary Value Analysis: Year boundaries", () => {
    it("should handle year boundaries", () => {
      // Arrange
      const endOfYear = new Date(2024, 11, 31, 23, 59, 59, 100); // December 31, 2024 23:59:59.100
      const startOfNextYear = new Date(2025, 0, 1, 0, 0, 0, 100); // January 1, 2025 00:00:00.100
      const sameSecond = new Date(2024, 11, 31, 23, 59, 59, 900); // December 31, 2024 23:59:59.900

      // Act & Assert
      expect(isSameSecond(endOfYear, startOfNextYear)).toBe(false);
      expect(isSameSecond(endOfYear, sameSecond)).toBe(true);
    });
  });

  describe("Boundary Value Analysis: Various millisecond values", () => {
    it("should handle various millisecond values", () => {
      // Arrange
      const base = new Date(2024, 5, 15, 14, 30, 45);
      const testCases = [
        { ms1: 0, ms2: 999, expected: true },
        { ms1: 123, ms2: 456, expected: true },
        { ms1: 500, ms2: 500, expected: true },
        { ms1: 1, ms2: 998, expected: true },
      ];

      // Act & Assert
      testCases.forEach(({ ms1, ms2, expected }) => {
        const date1 = new Date(base.getTime());
        const date2 = new Date(base.getTime());
        date1.setMilliseconds(ms1);
        date2.setMilliseconds(ms2);
        expect(isSameSecond(date1, date2)).toBe(expected);
      });
    });
  });

  describe("Same Date object reference", () => {
    it("should return true when comparing same date object", () => {
      // Arrange
      const date = new Date(2024, 5, 15, 14, 30, 45, 123);

      // Act & Assert
      expect(isSameSecond(date, date)).toBe(true);
    });
  });

  describe("Argument order independence", () => {
    it("should return same result regardless of argument order", () => {
      // Arrange
      const date1 = new Date(2024, 5, 15, 14, 30, 45, 123);
      const date2 = new Date(2024, 5, 15, 14, 30, 45, 456);
      const date3 = new Date(2024, 5, 15, 14, 30, 46, 123);

      // Act & Assert
      expect(isSameSecond(date1, date2)).toBe(isSameSecond(date2, date1));
      expect(isSameSecond(date1, date3)).toBe(isSameSecond(date3, date1));
    });
  });
});
