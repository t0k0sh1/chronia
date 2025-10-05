import { describe, it, expect } from "vitest";
import { startOfYear } from "../src/startOfYear";

describe("startOfYear", () => {
  it("returns January 1st at midnight of the same year", () => {
    const date = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
    const result = startOfYear(date);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(0); // January
    expect(result.getDate()).toBe(1);
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);
  });

  it("works with the first day of the year", () => {
    const date = new Date(2024, 0, 1, 23, 59, 59, 999); // January 1, 2024 23:59:59.999
    const result = startOfYear(date);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(0); // January
    expect(result.getDate()).toBe(1);
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);
  });

  it("works with the last day of the year", () => {
    const date = new Date(2024, 11, 31, 0, 0, 0, 0); // December 31, 2024 00:00:00.000
    const result = startOfYear(date);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(0); // January
    expect(result.getDate()).toBe(1);
  });

  it("handles different months correctly", () => {
    const testCases = [
      new Date(2024, 1, 15), // February
      new Date(2024, 6, 4), // July
      new Date(2024, 11, 25), // December
    ];

    testCases.forEach((date) => {
      const result = startOfYear(date);
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(0); // January
      expect(result.getDate()).toBe(1);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });
  });

  it("handles leap years correctly", () => {
    const leapYear = new Date(2024, 1, 29, 12, 0, 0, 0); // February 29, 2024 (leap year)
    const result = startOfYear(leapYear);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(0); // January
    expect(result.getDate()).toBe(1);
  });

  it("handles non-leap years correctly", () => {
    const nonLeapYear = new Date(2023, 1, 28, 12, 0, 0, 0); // February 28, 2023 (non-leap year)
    const result = startOfYear(nonLeapYear);

    expect(result.getFullYear()).toBe(2023);
    expect(result.getMonth()).toBe(0); // January
    expect(result.getDate()).toBe(1);
  });

  it("handles different years", () => {
    const testCases = [
      { date: new Date(1999, 6, 15), expectedYear: 1999 },
      { date: new Date(2000, 1, 29), expectedYear: 2000 }, // Leap year
      { date: new Date(2025, 0, 1), expectedYear: 2025 },
      { date: new Date(2030, 11, 31), expectedYear: 2030 },
    ];

    testCases.forEach(({ date, expectedYear }) => {
      const result = startOfYear(date);
      expect(result.getFullYear()).toBe(expectedYear);
      expect(result.getMonth()).toBe(0); // January
      expect(result.getDate()).toBe(1);
      expect(result.getHours()).toBe(0);
    });
  });

  it("handles century boundaries", () => {
    const testCases = [
      new Date(1999, 11, 31, 23, 59, 59, 999), // December 31, 1999
      new Date(2000, 0, 1, 0, 0, 0, 0), // January 1, 2000
      new Date(2099, 6, 15), // July 15, 2099
      new Date(2100, 0, 1), // January 1, 2100
    ];

    testCases.forEach((date) => {
      const result = startOfYear(date);
      expect(result.getFullYear()).toBe(date.getFullYear());
      expect(result.getMonth()).toBe(0); // January
      expect(result.getDate()).toBe(1);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });
  });

  it("does not modify the original date", () => {
    const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);
    const originalTime = originalDate.getTime();

    startOfYear(originalDate);

    expect(originalDate.getTime()).toBe(originalTime);
  });

  it("returns a new Date object", () => {
    const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);
    const result = startOfYear(originalDate);

    expect(result).not.toBe(originalDate);
    expect(result instanceof Date).toBe(true);
  });

  it("handles negative years (BCE dates)", () => {
    const date = new Date(0, 6, 15); // Default year handling
    date.setFullYear(-100); // 100 BCE
    const result = startOfYear(date);

    expect(result.getFullYear()).toBe(-100);
    expect(result.getMonth()).toBe(0); // January
    expect(result.getDate()).toBe(1);
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
        const result = startOfYear(input as any);
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
        const result = startOfYear(invalidDate);
        expect(result instanceof Date).toBe(true);
        expect(result.getTime()).toBeNaN();
      });
    });

    it("should return Invalid Date for special number values", () => {
      const specialNumbers = [NaN, Infinity, -Infinity];

      specialNumbers.forEach(num => {
        const result = startOfYear(num as any);
        expect(result instanceof Date).toBe(true);
        expect(result.getTime()).toBeNaN();
      });
    });
  });
});