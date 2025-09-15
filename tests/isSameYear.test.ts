import { describe, it, expect } from "vitest";
import { isSameYear } from "../src/isSameYear";

describe("isSameYear", () => {
  it("returns true for dates in the same year", () => {
    const date1 = new Date(2024, 0, 1); // January 1, 2024
    const date2 = new Date(2024, 11, 31); // December 31, 2024
    expect(isSameYear(date1, date2)).toBe(true);
  });

  it("returns false for dates in different years", () => {
    const date1 = new Date(2024, 11, 31); // December 31, 2024
    const date2 = new Date(2025, 0, 1); // January 1, 2025
    expect(isSameYear(date1, date2)).toBe(false);
  });

  it("ignores month, day, and time components", () => {
    const testCases = [
      {
        date1: new Date(2024, 5, 15, 14, 30, 45, 123), // June 15, 2024 14:30:45.123
        date2: new Date(2024, 8, 20, 9, 15, 30, 456), // September 20, 2024 09:15:30.456
        expected: true,
      },
      {
        date1: new Date(2024, 0, 1, 0, 0, 0, 0), // January 1, 2024 00:00:00.000
        date2: new Date(2024, 11, 31, 23, 59, 59, 999), // December 31, 2024 23:59:59.999
        expected: true,
      },
      {
        date1: new Date(2023, 11, 31, 23, 59, 59, 999), // December 31, 2023 23:59:59.999
        date2: new Date(2024, 0, 1, 0, 0, 0, 0), // January 1, 2024 00:00:00.000
        expected: false,
      },
    ];

    testCases.forEach(({ date1, date2, expected }) => {
      expect(isSameYear(date1, date2)).toBe(expected);
    });
  });

  it("handles leap years correctly", () => {
    const leapYear1 = new Date(2024, 1, 29); // February 29, 2024 (leap year)
    const leapYear2 = new Date(2024, 2, 1); // March 1, 2024
    const nonLeapYear = new Date(2023, 1, 28); // February 28, 2023 (non-leap year)

    expect(isSameYear(leapYear1, leapYear2)).toBe(true);
    expect(isSameYear(leapYear1, nonLeapYear)).toBe(false);
  });

  it("handles century boundaries", () => {
    const endOf20th = new Date(1999, 11, 31);
    const startOf21st = new Date(2000, 0, 1);
    const endOf21st = new Date(2099, 11, 31);
    const startOf22nd = new Date(2100, 0, 1);

    expect(isSameYear(endOf20th, startOf21st)).toBe(false);
    expect(isSameYear(endOf21st, startOf22nd)).toBe(false);
    expect(isSameYear(startOf21st, endOf21st)).toBe(false);
  });

  it("handles BC dates correctly", () => {
    const bcDate1 = new Date(-1, 5, 15); // Year 0 (1 BC)
    const bcDate2 = new Date(-1, 8, 20); // Year 0 (1 BC)
    const adDate = new Date(1, 5, 15); // Year 1 AD

    expect(isSameYear(bcDate1, bcDate2)).toBe(true);
    expect(isSameYear(bcDate1, adDate)).toBe(false);
  });

  it("handles edge cases with same date", () => {
    const date = new Date(2024, 5, 15, 14, 30, 45);
    expect(isSameYear(date, date)).toBe(true);
  });

  it("handles different years with same month and day", () => {
    const date1 = new Date(2024, 5, 15);
    const date2 = new Date(2023, 5, 15);
    const date3 = new Date(2025, 5, 15);

    expect(isSameYear(date1, date2)).toBe(false);
    expect(isSameYear(date1, date3)).toBe(false);
    expect(isSameYear(date2, date3)).toBe(false);
  });

  it("handles argument order independence", () => {
    const date1 = new Date(2024, 5, 15);
    const date2 = new Date(2024, 8, 20);
    const date3 = new Date(2023, 5, 15);

    expect(isSameYear(date1, date2)).toBe(isSameYear(date2, date1));
    expect(isSameYear(date1, date3)).toBe(isSameYear(date3, date1));
  });

  it("handles various years correctly", () => {
    const testCases = [
      { year1: 2000, year2: 2000, expected: true },
      { year1: 2000, year2: 2001, expected: false },
      { year1: 1900, year2: 1900, expected: true },
      { year1: 2024, year2: 2025, expected: false },
      { year1: 1999, year2: 2000, expected: false },
    ];

    testCases.forEach(({ year1, year2, expected }) => {
      const date1 = new Date(year1, 6, 15);
      const date2 = new Date(year2, 6, 15);
      expect(isSameYear(date1, date2)).toBe(expected);
    });
  });
});