import { describe, it, expect } from "vitest";
import { isSameHour } from "../src/isSameHour";

describe("isSameHour", () => {
  it("returns true for dates in the same hour", () => {
    const date1 = new Date(2024, 5, 15, 14, 0, 0); // June 15, 2024 14:00:00
    const date2 = new Date(2024, 5, 15, 14, 59, 59); // June 15, 2024 14:59:59
    expect(isSameHour(date1, date2)).toBe(true);
  });

  it("returns false for dates in different hours", () => {
    const date1 = new Date(2024, 5, 15, 14, 59, 59); // June 15, 2024 14:59:59
    const date2 = new Date(2024, 5, 15, 15, 0, 0); // June 15, 2024 15:00:00
    expect(isSameHour(date1, date2)).toBe(false);
  });

  it("ignores minutes, seconds, and milliseconds", () => {
    const testCases = [
      {
        date1: new Date(2024, 5, 15, 14, 30, 45, 123), // June 15, 2024 14:30:45.123
        date2: new Date(2024, 5, 15, 14, 15, 20, 456), // June 15, 2024 14:15:20.456
        expected: true,
      },
      {
        date1: new Date(2024, 5, 15, 14, 0, 0, 0), // June 15, 2024 14:00:00.000
        date2: new Date(2024, 5, 15, 14, 59, 59, 999), // June 15, 2024 14:59:59.999
        expected: true,
      },
      {
        date1: new Date(2024, 5, 15, 14, 59, 59, 999), // June 15, 2024 14:59:59.999
        date2: new Date(2024, 5, 15, 15, 0, 0, 0), // June 15, 2024 15:00:00.000
        expected: false,
      },
    ];

    testCases.forEach(({ date1, date2, expected }) => {
      expect(isSameHour(date1, date2)).toBe(expected);
    });
  });

  it("handles day boundaries", () => {
    const endOfDay = new Date(2024, 5, 15, 23, 59, 59); // June 15, 2024 23:59:59
    const startOfNextDay = new Date(2024, 5, 16, 0, 0, 0); // June 16, 2024 00:00:00
    const sameHour = new Date(2024, 5, 15, 23, 30, 0); // June 15, 2024 23:30:00

    expect(isSameHour(endOfDay, startOfNextDay)).toBe(false);
    expect(isSameHour(endOfDay, sameHour)).toBe(true);
  });

  it("handles month boundaries", () => {
    const endOfMonth = new Date(2024, 5, 30, 23, 45); // June 30, 2024 23:45
    const startOfNextMonth = new Date(2024, 6, 1, 0, 15); // July 1, 2024 00:15
    const sameHour = new Date(2024, 5, 30, 23, 15); // June 30, 2024 23:15

    expect(isSameHour(endOfMonth, startOfNextMonth)).toBe(false);
    expect(isSameHour(endOfMonth, sameHour)).toBe(true);
  });

  it("handles year boundaries", () => {
    const endOfYear = new Date(2024, 11, 31, 23, 45); // December 31, 2024 23:45
    const startOfNextYear = new Date(2025, 0, 1, 0, 15); // January 1, 2025 00:15
    const sameHour = new Date(2024, 11, 31, 23, 15); // December 31, 2024 23:15

    expect(isSameHour(endOfYear, startOfNextYear)).toBe(false);
    expect(isSameHour(endOfYear, sameHour)).toBe(true);
  });

  it("handles all 24 hours correctly", () => {
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

  it("handles midnight correctly", () => {
    const midnight1 = new Date(2024, 5, 15, 0, 0, 0);
    const midnight2 = new Date(2024, 5, 15, 0, 59, 59);
    const oneAM = new Date(2024, 5, 15, 1, 0, 0);

    expect(isSameHour(midnight1, midnight2)).toBe(true);
    expect(isSameHour(midnight1, oneAM)).toBe(false);
  });

  it("handles noon correctly", () => {
    const noon1 = new Date(2024, 5, 15, 12, 0, 0);
    const noon2 = new Date(2024, 5, 15, 12, 59, 59);
    const onePM = new Date(2024, 5, 15, 13, 0, 0);

    expect(isSameHour(noon1, noon2)).toBe(true);
    expect(isSameHour(noon1, onePM)).toBe(false);
  });

  it("handles edge cases with same date", () => {
    const date = new Date(2024, 5, 15, 14, 30, 45);
    expect(isSameHour(date, date)).toBe(true);
  });

  it("handles argument order independence", () => {
    const date1 = new Date(2024, 5, 15, 14, 15, 0);
    const date2 = new Date(2024, 5, 15, 14, 45, 0);
    const date3 = new Date(2024, 5, 15, 15, 15, 0);

    expect(isSameHour(date1, date2)).toBe(isSameHour(date2, date1));
    expect(isSameHour(date1, date3)).toBe(isSameHour(date3, date1));
  });

  it("handles different days with same hour", () => {
    const date1 = new Date(2024, 5, 15, 14, 30);
    const date2 = new Date(2024, 5, 16, 14, 30);
    expect(isSameHour(date1, date2)).toBe(false);
  });

  it("handles different months with same hour", () => {
    const date1 = new Date(2024, 5, 15, 14, 30);
    const date2 = new Date(2024, 6, 15, 14, 30);
    expect(isSameHour(date1, date2)).toBe(false);
  });

  it("handles different years with same hour", () => {
    const date1 = new Date(2024, 5, 15, 14, 30);
    const date2 = new Date(2023, 5, 15, 14, 30);
    expect(isSameHour(date1, date2)).toBe(false);
  });

  it("handles DST transitions", () => {
    // Note: This test assumes local time behavior may vary by timezone
    const beforeDST = new Date(2024, 2, 10, 1, 30); // March 10, 2024 01:30 (before spring forward)
    const sameDayDifferentHour = new Date(2024, 2, 10, 3, 30); // March 10, 2024 03:30 (after spring forward)
    const sameHour = new Date(2024, 2, 10, 1, 45); // March 10, 2024 01:45

    expect(isSameHour(beforeDST, sameHour)).toBe(true);
    expect(isSameHour(beforeDST, sameDayDifferentHour)).toBe(false);
  });
});