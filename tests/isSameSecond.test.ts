import { describe, it, expect } from "vitest";
import { isSameSecond } from "../src/isSameSecond";

describe("isSameSecond", () => {
  it("returns true for dates in the same second", () => {
    const date1 = new Date(2024, 5, 15, 14, 30, 45, 0); // June 15, 2024 14:30:45.000
    const date2 = new Date(2024, 5, 15, 14, 30, 45, 999); // June 15, 2024 14:30:45.999
    expect(isSameSecond(date1, date2)).toBe(true);
  });

  it("returns false for dates in different seconds", () => {
    const date1 = new Date(2024, 5, 15, 14, 30, 45, 999); // June 15, 2024 14:30:45.999
    const date2 = new Date(2024, 5, 15, 14, 30, 46, 0); // June 15, 2024 14:30:46.000
    expect(isSameSecond(date1, date2)).toBe(false);
  });

  it("ignores milliseconds", () => {
    const testCases = [
      {
        date1: new Date(2024, 5, 15, 14, 30, 45, 123), // June 15, 2024 14:30:45.123
        date2: new Date(2024, 5, 15, 14, 30, 45, 456), // June 15, 2024 14:30:45.456
        expected: true,
      },
      {
        date1: new Date(2024, 5, 15, 14, 30, 45, 0), // June 15, 2024 14:30:45.000
        date2: new Date(2024, 5, 15, 14, 30, 45, 999), // June 15, 2024 14:30:45.999
        expected: true,
      },
      {
        date1: new Date(2024, 5, 15, 14, 30, 45, 999), // June 15, 2024 14:30:45.999
        date2: new Date(2024, 5, 15, 14, 30, 46, 0), // June 15, 2024 14:30:46.000
        expected: false,
      },
    ];

    testCases.forEach(({ date1, date2, expected }) => {
      expect(isSameSecond(date1, date2)).toBe(expected);
    });
  });

  it("handles minute boundaries", () => {
    const endOfMinute = new Date(2024, 5, 15, 14, 30, 59, 999); // June 15, 2024 14:30:59.999
    const startOfNextMinute = new Date(2024, 5, 15, 14, 31, 0, 0); // June 15, 2024 14:31:00.000
    const sameSecond = new Date(2024, 5, 15, 14, 30, 59, 500); // June 15, 2024 14:30:59.500

    expect(isSameSecond(endOfMinute, startOfNextMinute)).toBe(false);
    expect(isSameSecond(endOfMinute, sameSecond)).toBe(true);
  });

  it("handles hour boundaries", () => {
    const endOfHour = new Date(2024, 5, 15, 14, 59, 59, 750); // June 15, 2024 14:59:59.750
    const startOfNextHour = new Date(2024, 5, 15, 15, 0, 0, 250); // June 15, 2024 15:00:00.250
    const sameSecond = new Date(2024, 5, 15, 14, 59, 59, 250); // June 15, 2024 14:59:59.250

    expect(isSameSecond(endOfHour, startOfNextHour)).toBe(false);
    expect(isSameSecond(endOfHour, sameSecond)).toBe(true);
  });

  it("handles day boundaries", () => {
    const endOfDay = new Date(2024, 5, 15, 23, 59, 59, 500); // June 15, 2024 23:59:59.500
    const startOfNextDay = new Date(2024, 5, 16, 0, 0, 0, 500); // June 16, 2024 00:00:00.500
    const sameSecond = new Date(2024, 5, 15, 23, 59, 59, 750); // June 15, 2024 23:59:59.750

    expect(isSameSecond(endOfDay, startOfNextDay)).toBe(false);
    expect(isSameSecond(endOfDay, sameSecond)).toBe(true);
  });

  it("handles month boundaries", () => {
    const endOfMonth = new Date(2024, 5, 30, 23, 59, 59, 300); // June 30, 2024 23:59:59.300
    const startOfNextMonth = new Date(2024, 6, 1, 0, 0, 0, 300); // July 1, 2024 00:00:00.300
    const sameSecond = new Date(2024, 5, 30, 23, 59, 59, 800); // June 30, 2024 23:59:59.800

    expect(isSameSecond(endOfMonth, startOfNextMonth)).toBe(false);
    expect(isSameSecond(endOfMonth, sameSecond)).toBe(true);
  });

  it("handles year boundaries", () => {
    const endOfYear = new Date(2024, 11, 31, 23, 59, 59, 100); // December 31, 2024 23:59:59.100
    const startOfNextYear = new Date(2025, 0, 1, 0, 0, 0, 100); // January 1, 2025 00:00:00.100
    const sameSecond = new Date(2024, 11, 31, 23, 59, 59, 900); // December 31, 2024 23:59:59.900

    expect(isSameSecond(endOfYear, startOfNextYear)).toBe(false);
    expect(isSameSecond(endOfYear, sameSecond)).toBe(true);
  });

  it("handles all 60 seconds correctly", () => {
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

  it("handles second 0 correctly", () => {
    const second0_1 = new Date(2024, 5, 15, 14, 30, 0, 0);
    const second0_2 = new Date(2024, 5, 15, 14, 30, 0, 999);
    const second1 = new Date(2024, 5, 15, 14, 30, 1, 0);

    expect(isSameSecond(second0_1, second0_2)).toBe(true);
    expect(isSameSecond(second0_1, second1)).toBe(false);
  });

  it("handles second 59 correctly", () => {
    const second59_1 = new Date(2024, 5, 15, 14, 30, 59, 0);
    const second59_2 = new Date(2024, 5, 15, 14, 30, 59, 999);
    const nextMinute = new Date(2024, 5, 15, 14, 31, 0, 0);

    expect(isSameSecond(second59_1, second59_2)).toBe(true);
    expect(isSameSecond(second59_1, nextMinute)).toBe(false);
  });

  it("handles edge cases with same date", () => {
    const date = new Date(2024, 5, 15, 14, 30, 45, 123);
    expect(isSameSecond(date, date)).toBe(true);
  });

  it("handles argument order independence", () => {
    const date1 = new Date(2024, 5, 15, 14, 30, 45, 123);
    const date2 = new Date(2024, 5, 15, 14, 30, 45, 456);
    const date3 = new Date(2024, 5, 15, 14, 30, 46, 123);

    expect(isSameSecond(date1, date2)).toBe(isSameSecond(date2, date1));
    expect(isSameSecond(date1, date3)).toBe(isSameSecond(date3, date1));
  });

  it("handles different minutes with same second", () => {
    const date1 = new Date(2024, 5, 15, 14, 30, 45, 123);
    const date2 = new Date(2024, 5, 15, 14, 31, 45, 123);
    expect(isSameSecond(date1, date2)).toBe(false);
  });

  it("handles different hours with same second", () => {
    const date1 = new Date(2024, 5, 15, 14, 30, 45, 123);
    const date2 = new Date(2024, 5, 15, 15, 30, 45, 123);
    expect(isSameSecond(date1, date2)).toBe(false);
  });

  it("handles different days with same second", () => {
    const date1 = new Date(2024, 5, 15, 14, 30, 45, 123);
    const date2 = new Date(2024, 5, 16, 14, 30, 45, 123);
    expect(isSameSecond(date1, date2)).toBe(false);
  });

  it("handles different months with same second", () => {
    const date1 = new Date(2024, 5, 15, 14, 30, 45, 123);
    const date2 = new Date(2024, 6, 15, 14, 30, 45, 123);
    expect(isSameSecond(date1, date2)).toBe(false);
  });

  it("handles different years with same second", () => {
    const date1 = new Date(2024, 5, 15, 14, 30, 45, 123);
    const date2 = new Date(2023, 5, 15, 14, 30, 45, 123);
    expect(isSameSecond(date1, date2)).toBe(false);
  });

  it("handles various millisecond values", () => {
    const base = new Date(2024, 5, 15, 14, 30, 45);
    const testCases = [
      { ms1: 0, ms2: 999, expected: true },
      { ms1: 123, ms2: 456, expected: true },
      { ms1: 500, ms2: 500, expected: true },
      { ms1: 1, ms2: 998, expected: true },
    ];

    testCases.forEach(({ ms1, ms2, expected }) => {
      const date1 = new Date(base.getTime());
      const date2 = new Date(base.getTime());
      date1.setMilliseconds(ms1);
      date2.setMilliseconds(ms2);
      expect(isSameSecond(date1, date2)).toBe(expected);
    });
  });
});