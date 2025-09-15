import { describe, it, expect } from "vitest";
import { isSameMonth } from "../src/isSameMonth";

describe("isSameMonth", () => {
  it("returns true for dates in the same month and year", () => {
    const date1 = new Date(2024, 5, 1); // June 1, 2024
    const date2 = new Date(2024, 5, 30); // June 30, 2024
    expect(isSameMonth(date1, date2)).toBe(true);
  });

  it("returns false for dates in different months", () => {
    const date1 = new Date(2024, 5, 30); // June 30, 2024
    const date2 = new Date(2024, 6, 1); // July 1, 2024
    expect(isSameMonth(date1, date2)).toBe(false);
  });

  it("returns false for same month but different years", () => {
    const date1 = new Date(2024, 5, 15); // June 15, 2024
    const date2 = new Date(2023, 5, 15); // June 15, 2023
    expect(isSameMonth(date1, date2)).toBe(false);
  });

  it("ignores day and time components", () => {
    const testCases = [
      {
        date1: new Date(2024, 5, 15, 14, 30, 45, 123), // June 15, 2024 14:30:45.123
        date2: new Date(2024, 5, 20, 9, 15, 30, 456), // June 20, 2024 09:15:30.456
        expected: true,
      },
      {
        date1: new Date(2024, 5, 1, 0, 0, 0, 0), // June 1, 2024 00:00:00.000
        date2: new Date(2024, 5, 30, 23, 59, 59, 999), // June 30, 2024 23:59:59.999
        expected: true,
      },
      {
        date1: new Date(2024, 5, 30, 23, 59, 59, 999), // June 30, 2024 23:59:59.999
        date2: new Date(2024, 6, 1, 0, 0, 0, 0), // July 1, 2024 00:00:00.000
        expected: false,
      },
    ];

    testCases.forEach(({ date1, date2, expected }) => {
      expect(isSameMonth(date1, date2)).toBe(expected);
    });
  });

  it("handles all months correctly", () => {
    const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    months.forEach((month) => {
      const date1 = new Date(2024, month, 1);
      const date2 = new Date(2024, month, 15);
      expect(isSameMonth(date1, date2)).toBe(true);

      if (month < 11) {
        const nextMonth = new Date(2024, month + 1, 1);
        expect(isSameMonth(date1, nextMonth)).toBe(false);
      }
    });
  });

  it("handles leap year February correctly", () => {
    const leapFeb1 = new Date(2024, 1, 1); // February 1, 2024 (leap year)
    const leapFeb29 = new Date(2024, 1, 29); // February 29, 2024
    const nonLeapFeb = new Date(2023, 1, 28); // February 28, 2023 (non-leap year)

    expect(isSameMonth(leapFeb1, leapFeb29)).toBe(true);
    expect(isSameMonth(leapFeb1, nonLeapFeb)).toBe(false);
  });

  it("handles year boundaries", () => {
    const endOfYear = new Date(2024, 11, 31); // December 31, 2024
    const startOfNextYear = new Date(2025, 0, 1); // January 1, 2025
    const sameMonth = new Date(2024, 11, 1); // December 1, 2024

    expect(isSameMonth(endOfYear, startOfNextYear)).toBe(false);
    expect(isSameMonth(endOfYear, sameMonth)).toBe(true);
  });

  it("handles edge cases with same date", () => {
    const date = new Date(2024, 5, 15, 14, 30, 45);
    expect(isSameMonth(date, date)).toBe(true);
  });

  it("handles different months with same day", () => {
    const testCases = [
      { month1: 0, month2: 1, expected: false }, // January vs February
      { month1: 1, month2: 2, expected: false }, // February vs March
      { month1: 11, month2: 0, expected: false }, // December vs January
    ];

    testCases.forEach(({ month1, month2, expected }) => {
      const date1 = new Date(2024, month1, 15);
      const date2 = new Date(2024, month2, 15);
      expect(isSameMonth(date1, date2)).toBe(expected);
    });
  });

  it("handles argument order independence", () => {
    const date1 = new Date(2024, 5, 15);
    const date2 = new Date(2024, 5, 20);
    const date3 = new Date(2024, 6, 15);

    expect(isSameMonth(date1, date2)).toBe(isSameMonth(date2, date1));
    expect(isSameMonth(date1, date3)).toBe(isSameMonth(date3, date1));
  });

  it("handles cross-year month differences", () => {
    const dec2024 = new Date(2024, 11, 15); // December 2024
    const jan2025 = new Date(2025, 0, 15); // January 2025
    const dec2023 = new Date(2023, 11, 15); // December 2023

    expect(isSameMonth(dec2024, jan2025)).toBe(false);
    expect(isSameMonth(dec2024, dec2023)).toBe(false);
  });
});