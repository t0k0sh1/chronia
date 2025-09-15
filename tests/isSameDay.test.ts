import { describe, it, expect } from "vitest";
import { isSameDay } from "../src/isSameDay";

describe("isSameDay", () => {
  it("returns true for dates on the same calendar day", () => {
    const date1 = new Date(2024, 5, 15, 0, 0, 0); // June 15, 2024 00:00:00
    const date2 = new Date(2024, 5, 15, 23, 59, 59); // June 15, 2024 23:59:59
    expect(isSameDay(date1, date2)).toBe(true);
  });

  it("returns false for dates on different calendar days", () => {
    const date1 = new Date(2024, 5, 15, 23, 59, 59); // June 15, 2024 23:59:59
    const date2 = new Date(2024, 5, 16, 0, 0, 0); // June 16, 2024 00:00:00
    expect(isSameDay(date1, date2)).toBe(false);
  });

  it("ignores time components", () => {
    const testCases = [
      {
        date1: new Date(2024, 5, 15, 14, 30, 45, 123), // June 15, 2024 14:30:45.123
        date2: new Date(2024, 5, 15, 9, 15, 20, 456), // June 15, 2024 09:15:20.456
        expected: true,
      },
      {
        date1: new Date(2024, 5, 15, 0, 0, 0, 0), // June 15, 2024 00:00:00.000
        date2: new Date(2024, 5, 15, 23, 59, 59, 999), // June 15, 2024 23:59:59.999
        expected: true,
      },
      {
        date1: new Date(2024, 5, 15, 23, 59, 59, 999), // June 15, 2024 23:59:59.999
        date2: new Date(2024, 5, 16, 0, 0, 0, 0), // June 16, 2024 00:00:00.000
        expected: false,
      },
    ];

    testCases.forEach(({ date1, date2, expected }) => {
      expect(isSameDay(date1, date2)).toBe(expected);
    });
  });

  it("handles month boundaries", () => {
    const endOfMonth = new Date(2024, 5, 30, 23, 59); // June 30, 2024 23:59
    const startOfNextMonth = new Date(2024, 6, 1, 0, 0); // July 1, 2024 00:00
    const sameDay = new Date(2024, 5, 30, 12, 0); // June 30, 2024 12:00

    expect(isSameDay(endOfMonth, startOfNextMonth)).toBe(false);
    expect(isSameDay(endOfMonth, sameDay)).toBe(true);
  });

  it("handles year boundaries", () => {
    const endOfYear = new Date(2024, 11, 31, 23, 59); // December 31, 2024 23:59
    const startOfNextYear = new Date(2025, 0, 1, 0, 0); // January 1, 2025 00:00
    const sameDay = new Date(2024, 11, 31, 12, 0); // December 31, 2024 12:00

    expect(isSameDay(endOfYear, startOfNextYear)).toBe(false);
    expect(isSameDay(endOfYear, sameDay)).toBe(true);
  });

  it("handles leap year February 29th", () => {
    const leapDay1 = new Date(2024, 1, 29, 10, 0); // February 29, 2024 10:00
    const leapDay2 = new Date(2024, 1, 29, 22, 30); // February 29, 2024 22:30
    const nonLeapDay = new Date(2023, 1, 28, 15, 0); // February 28, 2023 15:00

    expect(isSameDay(leapDay1, leapDay2)).toBe(true);
    expect(isSameDay(leapDay1, nonLeapDay)).toBe(false);
  });

  it("handles different days in same month", () => {
    const day1 = new Date(2024, 5, 15);
    const day2 = new Date(2024, 5, 16);
    const day3 = new Date(2024, 5, 14);

    expect(isSameDay(day1, day2)).toBe(false);
    expect(isSameDay(day1, day3)).toBe(false);
    expect(isSameDay(day2, day3)).toBe(false);
  });

  it("handles edge cases with same date", () => {
    const date = new Date(2024, 5, 15, 14, 30, 45);
    expect(isSameDay(date, date)).toBe(true);
  });

  it("handles argument order independence", () => {
    const date1 = new Date(2024, 5, 15, 10, 0);
    const date2 = new Date(2024, 5, 15, 20, 0);
    const date3 = new Date(2024, 5, 16, 10, 0);

    expect(isSameDay(date1, date2)).toBe(isSameDay(date2, date1));
    expect(isSameDay(date1, date3)).toBe(isSameDay(date3, date1));
  });

  it("handles different years with same month and day", () => {
    const date1 = new Date(2024, 5, 15);
    const date2 = new Date(2023, 5, 15);
    const date3 = new Date(2025, 5, 15);

    expect(isSameDay(date1, date2)).toBe(false);
    expect(isSameDay(date1, date3)).toBe(false);
    expect(isSameDay(date2, date3)).toBe(false);
  });

  it("handles DST transitions", () => {
    // DST typically occurs in March and November in many regions
    const beforeDST = new Date(2024, 2, 10, 1, 0); // March 10, 2024 01:00
    const afterDST = new Date(2024, 2, 10, 3, 0); // March 10, 2024 03:00 (after spring forward)
    const differentDay = new Date(2024, 2, 11, 2, 0); // March 11, 2024 02:00

    expect(isSameDay(beforeDST, afterDST)).toBe(true);
    expect(isSameDay(beforeDST, differentDay)).toBe(false);
  });

  it("handles various time zones consistently", () => {
    // Since we're using local dates, the function should work consistently
    const morning = new Date(2024, 5, 15, 6, 0);
    const afternoon = new Date(2024, 5, 15, 18, 0);
    const nextDay = new Date(2024, 5, 16, 6, 0);

    expect(isSameDay(morning, afternoon)).toBe(true);
    expect(isSameDay(morning, nextDay)).toBe(false);
  });
});