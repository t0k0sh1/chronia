import { describe, it, expect } from "vitest";
import { endOfDay } from "../src/endOfDay";

describe("endOfDay", () => {
  it("returns end of day (23:59:59.999) for the same date", () => {
    const date = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
    const result = endOfDay(date);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(5); // June
    expect(result.getDate()).toBe(15);
    expect(result.getHours()).toBe(23);
    expect(result.getMinutes()).toBe(59);
    expect(result.getSeconds()).toBe(59);
    expect(result.getMilliseconds()).toBe(999);
  });

  it("works with midnight time", () => {
    const date = new Date(2024, 5, 15, 0, 0, 0, 0); // June 15, 2024 00:00:00.000
    const result = endOfDay(date);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(5); // June
    expect(result.getDate()).toBe(15);
    expect(result.getHours()).toBe(23);
    expect(result.getMinutes()).toBe(59);
    expect(result.getSeconds()).toBe(59);
    expect(result.getMilliseconds()).toBe(999);
  });

  it("works with end of day time", () => {
    const date = new Date(2024, 5, 15, 23, 59, 59, 999); // June 15, 2024 23:59:59.999
    const result = endOfDay(date);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(5); // June
    expect(result.getDate()).toBe(15);
    expect(result.getHours()).toBe(23);
    expect(result.getMinutes()).toBe(59);
    expect(result.getSeconds()).toBe(59);
    expect(result.getMilliseconds()).toBe(999);
  });

  it("handles different times of day", () => {
    const testCases = [
      new Date(2024, 5, 15, 1, 30, 45, 123), // 01:30:45.123
      new Date(2024, 5, 15, 12, 0, 0, 0), // Noon
      new Date(2024, 5, 15, 18, 45, 30, 500), // Evening
    ];

    testCases.forEach((date) => {
      const result = endOfDay(date);
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(5); // June
      expect(result.getDate()).toBe(15);
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
      expect(result.getMilliseconds()).toBe(999);
    });
  });

  it("handles different months correctly", () => {
    const testCases = [
      { date: new Date(2024, 0, 15, 14, 30), expectedMonth: 0, expectedDate: 15 }, // January
      { date: new Date(2024, 1, 29, 14, 30), expectedMonth: 1, expectedDate: 29 }, // February (leap year)
      { date: new Date(2024, 11, 25, 14, 30), expectedMonth: 11, expectedDate: 25 }, // December
    ];

    testCases.forEach(({ date, expectedMonth, expectedDate }) => {
      const result = endOfDay(date);
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(expectedMonth);
      expect(result.getDate()).toBe(expectedDate);
      expect(result.getHours()).toBe(23);
    });
  });

  it("handles month boundaries", () => {
    const lastDayOfMonth = new Date(2024, 5, 30, 15, 30, 0); // June 30, 2024 15:30:00
    const result = endOfDay(lastDayOfMonth);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(5); // June
    expect(result.getDate()).toBe(30);
    expect(result.getHours()).toBe(23);
  });

  it("handles year boundaries", () => {
    const testCases = [
      new Date(2024, 0, 1, 12, 0, 0), // January 1, 2024
      new Date(2024, 11, 31, 23, 30, 0), // December 31, 2024
    ];

    testCases.forEach((date) => {
      const result = endOfDay(date);
      expect(result.getFullYear()).toBe(date.getFullYear());
      expect(result.getMonth()).toBe(date.getMonth());
      expect(result.getDate()).toBe(date.getDate());
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
      expect(result.getMilliseconds()).toBe(999);
    });
  });

  it("handles leap year February 29th", () => {
    const leapDay = new Date(2024, 1, 29, 14, 30, 45); // February 29, 2024 14:30:45
    const result = endOfDay(leapDay);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(1); // February
    expect(result.getDate()).toBe(29);
    expect(result.getHours()).toBe(23);
  });

  it("does not modify the original date", () => {
    const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);
    const originalTime = originalDate.getTime();

    endOfDay(originalDate);

    expect(originalDate.getTime()).toBe(originalTime);
  });

  it("returns a new Date object", () => {
    const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);
    const result = endOfDay(originalDate);

    expect(result).not.toBe(originalDate);
    expect(result instanceof Date).toBe(true);
  });

  it("handles DST transitions correctly", () => {
    // Note: This test may vary by timezone, but function should handle consistently
    const beforeDST = new Date(2024, 2, 10, 15, 0, 0); // March 10, 2024 (around DST in US)
    const result = endOfDay(beforeDST);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(2); // March
    expect(result.getDate()).toBe(10);
    expect(result.getHours()).toBe(23);
  });

  it("handles different years", () => {
    const testCases = [
      new Date(2000, 6, 15, 12, 30), // July 15, 2000
      new Date(2023, 2, 20, 18, 45), // March 20, 2023
      new Date(2025, 10, 5, 9, 15), // November 5, 2025
    ];

    testCases.forEach((date) => {
      const result = endOfDay(date);
      expect(result.getFullYear()).toBe(date.getFullYear());
      expect(result.getMonth()).toBe(date.getMonth());
      expect(result.getDate()).toBe(date.getDate());
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
      expect(result.getMilliseconds()).toBe(999);
    });
  });
});