import { describe, it, expect } from "vitest";
import { startOfMonth } from "../src/startOfMonth";

describe("startOfMonth", () => {
  it("returns the first day of the month at midnight", () => {
    const date = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
    const result = startOfMonth(date);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(5); // June
    expect(result.getDate()).toBe(1);
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);
  });

  it("works with the first day of the month", () => {
    const date = new Date(2024, 5, 1, 23, 59, 59, 999); // June 1, 2024 23:59:59.999
    const result = startOfMonth(date);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(5); // June
    expect(result.getDate()).toBe(1);
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);
  });

  it("works with the last day of the month", () => {
    const date = new Date(2024, 5, 30, 0, 0, 0, 0); // June 30, 2024 00:00:00.000
    const result = startOfMonth(date);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(5); // June
    expect(result.getDate()).toBe(1);
  });

  it("handles different months correctly", () => {
    const testCases = [
      { date: new Date(2024, 0, 15), expectedMonth: 0 }, // January
      { date: new Date(2024, 1, 15), expectedMonth: 1 }, // February
      { date: new Date(2024, 11, 15), expectedMonth: 11 }, // December
    ];

    testCases.forEach(({ date, expectedMonth }) => {
      const result = startOfMonth(date);
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(expectedMonth);
      expect(result.getDate()).toBe(1);
      expect(result.getHours()).toBe(0);
    });
  });

  it("handles leap year February correctly", () => {
    const leapYear = new Date(2024, 1, 29, 12, 0, 0, 0); // February 29, 2024 (leap year)
    const result = startOfMonth(leapYear);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(1); // February
    expect(result.getDate()).toBe(1);
  });

  it("handles non-leap year February correctly", () => {
    const nonLeapYear = new Date(2023, 1, 28, 12, 0, 0, 0); // February 28, 2023 (non-leap year)
    const result = startOfMonth(nonLeapYear);

    expect(result.getFullYear()).toBe(2023);
    expect(result.getMonth()).toBe(1); // February
    expect(result.getDate()).toBe(1);
  });

  it("handles year boundaries", () => {
    const endOfYear = new Date(2024, 11, 31, 23, 59, 59, 999); // December 31, 2024
    const result = startOfMonth(endOfYear);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(11); // December
    expect(result.getDate()).toBe(1);
  });

  it("does not modify the original date", () => {
    const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);
    const originalTime = originalDate.getTime();

    startOfMonth(originalDate);

    expect(originalDate.getTime()).toBe(originalTime);
  });

  it("returns a new Date object", () => {
    const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);
    const result = startOfMonth(originalDate);

    expect(result).not.toBe(originalDate);
    expect(result instanceof Date).toBe(true);
  });

  it("handles edge cases with different years", () => {
    const testCases = [
      new Date(1999, 6, 15), // July 15, 1999
      new Date(2000, 1, 29), // February 29, 2000 (leap year)
      new Date(2025, 0, 1), // January 1, 2025
    ];

    testCases.forEach((date) => {
      const result = startOfMonth(date);
      expect(result.getFullYear()).toBe(date.getFullYear());
      expect(result.getMonth()).toBe(date.getMonth());
      expect(result.getDate()).toBe(1);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
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
        const result = startOfMonth(input as any);
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
        const result = startOfMonth(invalidDate);
        expect(result instanceof Date).toBe(true);
        expect(result.getTime()).toBeNaN();
      });
    });

    it("should return Invalid Date for special number values", () => {
      const specialNumbers = [NaN, Infinity, -Infinity];

      specialNumbers.forEach(num => {
        const result = startOfMonth(num as any);
        expect(result instanceof Date).toBe(true);
        expect(result.getTime()).toBeNaN();
      });
    });
  });
});