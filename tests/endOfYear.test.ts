import { describe, it, expect } from "vitest";
import { endOfYear } from "../src/endOfYear";

describe("endOfYear", () => {
  it("returns December 31st at end of day of the same year", () => {
    const date = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
    const result = endOfYear(date);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(11); // December
    expect(result.getDate()).toBe(31);
    expect(result.getHours()).toBe(23);
    expect(result.getMinutes()).toBe(59);
    expect(result.getSeconds()).toBe(59);
    expect(result.getMilliseconds()).toBe(999);
  });

  it("works with the first day of the year", () => {
    const date = new Date(2024, 0, 1, 0, 0, 0, 0); // January 1, 2024 00:00:00.000
    const result = endOfYear(date);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(11); // December
    expect(result.getDate()).toBe(31);
    expect(result.getHours()).toBe(23);
    expect(result.getMinutes()).toBe(59);
    expect(result.getSeconds()).toBe(59);
    expect(result.getMilliseconds()).toBe(999);
  });

  it("works with the last day of the year", () => {
    const date = new Date(2024, 11, 31, 12, 30, 0, 0); // December 31, 2024 12:30:00.000
    const result = endOfYear(date);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(11); // December
    expect(result.getDate()).toBe(31);
    expect(result.getHours()).toBe(23);
    expect(result.getMinutes()).toBe(59);
    expect(result.getSeconds()).toBe(59);
    expect(result.getMilliseconds()).toBe(999);
  });

  it("handles different months correctly", () => {
    const testCases = [
      new Date(2024, 1, 15), // February
      new Date(2024, 6, 4), // July
      new Date(2024, 11, 25), // December
    ];

    testCases.forEach((date) => {
      const result = endOfYear(date);
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(11); // December
      expect(result.getDate()).toBe(31);
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
      expect(result.getMilliseconds()).toBe(999);
    });
  });

  it("handles leap years correctly", () => {
    const leapYear = new Date(2024, 1, 29, 12, 0, 0, 0); // February 29, 2024 (leap year)
    const result = endOfYear(leapYear);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(11); // December
    expect(result.getDate()).toBe(31);
  });

  it("handles non-leap years correctly", () => {
    const nonLeapYear = new Date(2023, 1, 28, 12, 0, 0, 0); // February 28, 2023 (non-leap year)
    const result = endOfYear(nonLeapYear);

    expect(result.getFullYear()).toBe(2023);
    expect(result.getMonth()).toBe(11); // December
    expect(result.getDate()).toBe(31);
  });

  it("handles different years", () => {
    const testCases = [
      { date: new Date(1999, 6, 15), expectedYear: 1999 },
      { date: new Date(2000, 1, 29), expectedYear: 2000 }, // Leap year
      { date: new Date(2025, 0, 1), expectedYear: 2025 },
      { date: new Date(2030, 11, 31), expectedYear: 2030 },
    ];

    testCases.forEach(({ date, expectedYear }) => {
      const result = endOfYear(date);
      expect(result.getFullYear()).toBe(expectedYear);
      expect(result.getMonth()).toBe(11); // December
      expect(result.getDate()).toBe(31);
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
      expect(result.getMilliseconds()).toBe(999);
    });
  });

  it("handles century boundaries", () => {
    const testCases = [
      new Date(1999, 6, 15), // July 15, 1999
      new Date(2000, 5, 10), // June 10, 2000
      new Date(2099, 2, 20), // March 20, 2099
      new Date(2100, 8, 5), // September 5, 2100
    ];

    testCases.forEach((date) => {
      const result = endOfYear(date);
      expect(result.getFullYear()).toBe(date.getFullYear());
      expect(result.getMonth()).toBe(11); // December
      expect(result.getDate()).toBe(31);
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
      expect(result.getMilliseconds()).toBe(999);
    });
  });

  it("handles millennium boundaries", () => {
    const testCases = [
      new Date(999, 6, 15), // July 15, 999
      new Date(1000, 0, 1), // January 1, 1000
      new Date(1999, 11, 31), // December 31, 1999
      new Date(2000, 0, 1), // January 1, 2000
    ];

    testCases.forEach((date) => {
      const result = endOfYear(date);
      expect(result.getFullYear()).toBe(date.getFullYear());
      expect(result.getMonth()).toBe(11); // December
      expect(result.getDate()).toBe(31);
    });
  });

  it("does not modify the original date", () => {
    const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);
    const originalTime = originalDate.getTime();

    endOfYear(originalDate);

    expect(originalDate.getTime()).toBe(originalTime);
  });

  it("returns a new Date object", () => {
    const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);
    const result = endOfYear(originalDate);

    expect(result).not.toBe(originalDate);
    expect(result instanceof Date).toBe(true);
  });

  it("handles negative years (BCE dates)", () => {
    const date = new Date(0, 6, 15); // Default year handling
    date.setFullYear(-100); // 100 BCE
    const result = endOfYear(date);

    expect(result.getFullYear()).toBe(-100);
    expect(result.getMonth()).toBe(11); // December
    expect(result.getDate()).toBe(31);
  });

  it("maintains consistent behavior across all months", () => {
    // Test all 12 months to ensure December 31st is always returned
    for (let month = 0; month < 12; month++) {
      const date = new Date(2024, month, 15);
      const result = endOfYear(date);

      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(11); // Always December
      expect(result.getDate()).toBe(31); // Always 31st
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
      expect(result.getMilliseconds()).toBe(999);
    }
  });
});