import { describe, it, expect } from "vitest";
import { endOfMonth } from "../src/endOfMonth";

describe("endOfMonth", () => {
  it("returns the last day of the month at end of day", () => {
    const date = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
    const result = endOfMonth(date);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(5); // June
    expect(result.getDate()).toBe(30); // June has 30 days
    expect(result.getHours()).toBe(23);
    expect(result.getMinutes()).toBe(59);
    expect(result.getSeconds()).toBe(59);
    expect(result.getMilliseconds()).toBe(999);
  });

  it("works with the first day of the month", () => {
    const date = new Date(2024, 5, 1, 0, 0, 0, 0); // June 1, 2024 00:00:00.000
    const result = endOfMonth(date);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(5); // June
    expect(result.getDate()).toBe(30); // June has 30 days
    expect(result.getHours()).toBe(23);
    expect(result.getMinutes()).toBe(59);
    expect(result.getSeconds()).toBe(59);
    expect(result.getMilliseconds()).toBe(999);
  });

  it("works with the last day of the month", () => {
    const date = new Date(2024, 5, 30, 12, 30, 0, 0); // June 30, 2024 12:30:00.000
    const result = endOfMonth(date);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(5); // June
    expect(result.getDate()).toBe(30);
    expect(result.getHours()).toBe(23);
    expect(result.getMinutes()).toBe(59);
    expect(result.getSeconds()).toBe(59);
    expect(result.getMilliseconds()).toBe(999);
  });

  it("handles months with different numbers of days", () => {
    const testCases = [
      { date: new Date(2024, 0, 15), expectedDate: 31 }, // January (31 days)
      { date: new Date(2024, 3, 15), expectedDate: 30 }, // April (30 days)
      { date: new Date(2024, 4, 15), expectedDate: 31 }, // May (31 days)
      { date: new Date(2024, 8, 15), expectedDate: 30 }, // September (30 days)
      { date: new Date(2024, 10, 15), expectedDate: 30 }, // November (30 days)
      { date: new Date(2024, 11, 15), expectedDate: 31 }, // December (31 days)
    ];

    testCases.forEach(({ date, expectedDate }) => {
      const result = endOfMonth(date);
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(date.getMonth());
      expect(result.getDate()).toBe(expectedDate);
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
      expect(result.getMilliseconds()).toBe(999);
    });
  });

  it("handles leap year February correctly", () => {
    const leapYear = new Date(2024, 1, 15, 12, 0, 0, 0); // February 15, 2024 (leap year)
    const result = endOfMonth(leapYear);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(1); // February
    expect(result.getDate()).toBe(29); // February 29 in leap year
    expect(result.getHours()).toBe(23);
    expect(result.getMinutes()).toBe(59);
    expect(result.getSeconds()).toBe(59);
    expect(result.getMilliseconds()).toBe(999);
  });

  it("handles non-leap year February correctly", () => {
    const nonLeapYear = new Date(2023, 1, 15, 12, 0, 0, 0); // February 15, 2023 (non-leap year)
    const result = endOfMonth(nonLeapYear);

    expect(result.getFullYear()).toBe(2023);
    expect(result.getMonth()).toBe(1); // February
    expect(result.getDate()).toBe(28); // February 28 in non-leap year
    expect(result.getHours()).toBe(23);
    expect(result.getMinutes()).toBe(59);
    expect(result.getSeconds()).toBe(59);
    expect(result.getMilliseconds()).toBe(999);
  });

  it("handles year boundaries", () => {
    const startOfYear = new Date(2024, 0, 1, 0, 0, 0, 0); // January 1, 2024
    const result = endOfMonth(startOfYear);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(0); // January
    expect(result.getDate()).toBe(31); // January 31
  });

  it("handles century leap years correctly", () => {
    // 2000 is a leap year (divisible by 400)
    const centuryLeapYear = new Date(2000, 1, 15); // February 15, 2000
    const result = endOfMonth(centuryLeapYear);

    expect(result.getFullYear()).toBe(2000);
    expect(result.getMonth()).toBe(1); // February
    expect(result.getDate()).toBe(29); // February 29 in leap year

    // 1900 is not a leap year (divisible by 100 but not 400)
    const centuryNonLeapYear = new Date(1900, 1, 15); // February 15, 1900
    const result2 = endOfMonth(centuryNonLeapYear);

    expect(result2.getFullYear()).toBe(1900);
    expect(result2.getMonth()).toBe(1); // February
    expect(result2.getDate()).toBe(28); // February 28 in non-leap year
  });

  it("does not modify the original date", () => {
    const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);
    const originalTime = originalDate.getTime();

    endOfMonth(originalDate);

    expect(originalDate.getTime()).toBe(originalTime);
  });

  it("returns a new Date object", () => {
    const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);
    const result = endOfMonth(originalDate);

    expect(result).not.toBe(originalDate);
    expect(result instanceof Date).toBe(true);
  });

  it("handles edge cases with different years", () => {
    const testCases = [
      { date: new Date(1999, 1, 15), expectedDate: 28 }, // February 1999 (non-leap)
      { date: new Date(2000, 1, 15), expectedDate: 29 }, // February 2000 (leap)
      { date: new Date(2004, 1, 15), expectedDate: 29 }, // February 2004 (leap)
      { date: new Date(2100, 1, 15), expectedDate: 28 }, // February 2100 (non-leap, century)
    ];

    testCases.forEach(({ date, expectedDate }) => {
      const result = endOfMonth(date);
      expect(result.getFullYear()).toBe(date.getFullYear());
      expect(result.getMonth()).toBe(1); // February
      expect(result.getDate()).toBe(expectedDate);
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
      expect(result.getMilliseconds()).toBe(999);
    });
  });

  describe("type validation", () => {
    it("should return Invalid Date for invalid argument types", () => {
      const invalidInputs = [
        null,
        undefined,
        "2024-01-01",
        true,
        false,
        {},
        [],
        () => {},
        Symbol("test")
      ];

      invalidInputs.forEach(input => {
        const result = endOfMonth(input as any);
        expect(result instanceof Date).toBe(true);
        expect(result.getTime()).toBeNaN();
      });
    });

    it("should return Invalid Date for Invalid Date objects", () => {
      const invalidDates = [
        new Date("invalid"),
        new Date(NaN)
      ];

      invalidDates.forEach(invalidDate => {
        const result = endOfMonth(invalidDate);
        expect(result instanceof Date).toBe(true);
        expect(result.getTime()).toBeNaN();
      });
    });

    it("should return Invalid Date for special number values", () => {
      const specialNumbers = [NaN, Infinity, -Infinity];

      specialNumbers.forEach(num => {
        const result = endOfMonth(num as any);
        expect(result instanceof Date).toBe(true);
        expect(result.getTime()).toBeNaN();
      });
    });
  });
});