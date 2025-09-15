import { describe, it, expect } from "vitest";
import { isSameMinute } from "../src/isSameMinute";

describe("isSameMinute", () => {
  it("returns true for dates in the same minute", () => {
    const date1 = new Date(2024, 5, 15, 14, 30, 0); // June 15, 2024 14:30:00
    const date2 = new Date(2024, 5, 15, 14, 30, 59); // June 15, 2024 14:30:59
    expect(isSameMinute(date1, date2)).toBe(true);
  });

  it("returns false for dates in different minutes", () => {
    const date1 = new Date(2024, 5, 15, 14, 30, 59); // June 15, 2024 14:30:59
    const date2 = new Date(2024, 5, 15, 14, 31, 0); // June 15, 2024 14:31:00
    expect(isSameMinute(date1, date2)).toBe(false);
  });

  it("ignores seconds and milliseconds", () => {
    const testCases = [
      {
        date1: new Date(2024, 5, 15, 14, 30, 15, 500), // June 15, 2024 14:30:15.500
        date2: new Date(2024, 5, 15, 14, 30, 45, 800), // June 15, 2024 14:30:45.800
        expected: true,
      },
      {
        date1: new Date(2024, 5, 15, 14, 30, 0, 0), // June 15, 2024 14:30:00.000
        date2: new Date(2024, 5, 15, 14, 30, 59, 999), // June 15, 2024 14:30:59.999
        expected: true,
      },
      {
        date1: new Date(2024, 5, 15, 14, 30, 59, 999), // June 15, 2024 14:30:59.999
        date2: new Date(2024, 5, 15, 14, 31, 0, 0), // June 15, 2024 14:31:00.000
        expected: false,
      },
    ];

    testCases.forEach(({ date1, date2, expected }) => {
      expect(isSameMinute(date1, date2)).toBe(expected);
    });
  });

  it("handles hour boundaries", () => {
    const endOfHour = new Date(2024, 5, 15, 14, 59, 59); // June 15, 2024 14:59:59
    const startOfNextHour = new Date(2024, 5, 15, 15, 0, 0); // June 15, 2024 15:00:00
    const sameMinute = new Date(2024, 5, 15, 14, 59, 30); // June 15, 2024 14:59:30

    expect(isSameMinute(endOfHour, startOfNextHour)).toBe(false);
    expect(isSameMinute(endOfHour, sameMinute)).toBe(true);
  });

  it("handles day boundaries", () => {
    const endOfDay = new Date(2024, 5, 15, 23, 59, 45); // June 15, 2024 23:59:45
    const startOfNextDay = new Date(2024, 5, 16, 0, 0, 15); // June 16, 2024 00:00:15
    const sameMinute = new Date(2024, 5, 15, 23, 59, 15); // June 15, 2024 23:59:15

    expect(isSameMinute(endOfDay, startOfNextDay)).toBe(false);
    expect(isSameMinute(endOfDay, sameMinute)).toBe(true);
  });

  it("handles month boundaries", () => {
    const endOfMonth = new Date(2024, 5, 30, 23, 59, 30); // June 30, 2024 23:59:30
    const startOfNextMonth = new Date(2024, 6, 1, 0, 0, 30); // July 1, 2024 00:00:30
    const sameMinute = new Date(2024, 5, 30, 23, 59, 45); // June 30, 2024 23:59:45

    expect(isSameMinute(endOfMonth, startOfNextMonth)).toBe(false);
    expect(isSameMinute(endOfMonth, sameMinute)).toBe(true);
  });

  it("handles year boundaries", () => {
    const endOfYear = new Date(2024, 11, 31, 23, 59, 30); // December 31, 2024 23:59:30
    const startOfNextYear = new Date(2025, 0, 1, 0, 0, 30); // January 1, 2025 00:00:30
    const sameMinute = new Date(2024, 11, 31, 23, 59, 45); // December 31, 2024 23:59:45

    expect(isSameMinute(endOfYear, startOfNextYear)).toBe(false);
    expect(isSameMinute(endOfYear, sameMinute)).toBe(true);
  });

  it("handles all 60 minutes correctly", () => {
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

  it("handles minute 0 correctly", () => {
    const minute0_1 = new Date(2024, 5, 15, 14, 0, 0);
    const minute0_2 = new Date(2024, 5, 15, 14, 0, 59);
    const minute1 = new Date(2024, 5, 15, 14, 1, 0);

    expect(isSameMinute(minute0_1, minute0_2)).toBe(true);
    expect(isSameMinute(minute0_1, minute1)).toBe(false);
  });

  it("handles minute 59 correctly", () => {
    const minute59_1 = new Date(2024, 5, 15, 14, 59, 0);
    const minute59_2 = new Date(2024, 5, 15, 14, 59, 59);
    const nextHour = new Date(2024, 5, 15, 15, 0, 0);

    expect(isSameMinute(minute59_1, minute59_2)).toBe(true);
    expect(isSameMinute(minute59_1, nextHour)).toBe(false);
  });

  it("handles edge cases with same date", () => {
    const date = new Date(2024, 5, 15, 14, 30, 45);
    expect(isSameMinute(date, date)).toBe(true);
  });

  it("handles argument order independence", () => {
    const date1 = new Date(2024, 5, 15, 14, 30, 15);
    const date2 = new Date(2024, 5, 15, 14, 30, 45);
    const date3 = new Date(2024, 5, 15, 14, 31, 15);

    expect(isSameMinute(date1, date2)).toBe(isSameMinute(date2, date1));
    expect(isSameMinute(date1, date3)).toBe(isSameMinute(date3, date1));
  });

  it("handles different hours with same minute", () => {
    const date1 = new Date(2024, 5, 15, 14, 30, 15);
    const date2 = new Date(2024, 5, 15, 15, 30, 15);
    expect(isSameMinute(date1, date2)).toBe(false);
  });

  it("handles different days with same minute", () => {
    const date1 = new Date(2024, 5, 15, 14, 30, 15);
    const date2 = new Date(2024, 5, 16, 14, 30, 15);
    expect(isSameMinute(date1, date2)).toBe(false);
  });

  it("handles different months with same minute", () => {
    const date1 = new Date(2024, 5, 15, 14, 30, 15);
    const date2 = new Date(2024, 6, 15, 14, 30, 15);
    expect(isSameMinute(date1, date2)).toBe(false);
  });

  it("handles different years with same minute", () => {
    const date1 = new Date(2024, 5, 15, 14, 30, 15);
    const date2 = new Date(2023, 5, 15, 14, 30, 15);
    expect(isSameMinute(date1, date2)).toBe(false);
  });

  it("handles leap seconds conceptually", () => {
    // Note: JavaScript Date doesn't handle leap seconds, but we test edge cases
    const lastSecond = new Date(2024, 5, 15, 14, 30, 59, 999);
    const sameMinute = new Date(2024, 5, 15, 14, 30, 0, 0);
    const nextMinute = new Date(2024, 5, 15, 14, 31, 0, 0);

    expect(isSameMinute(lastSecond, sameMinute)).toBe(true);
    expect(isSameMinute(lastSecond, nextMinute)).toBe(false);
  });
});