import { describe, it, expect } from "vitest";
import { truncYear } from "../src/truncYear";

describe("truncYear", () => {
  it("truncates to the start of the year", () => {
    const date = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
    const result = truncYear(date);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(0); // January
    expect(result.getDate()).toBe(1);
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);
  });

  it("works with different years", () => {
    const testCases = [
      new Date(2020, 11, 31, 23, 59, 59, 999), // December 31, 2020 23:59:59.999
      new Date(2023, 6, 10, 12, 30, 0, 0), // July 10, 2023 12:30:00.000
      new Date(1999, 0, 1, 0, 0, 0, 1), // January 1, 1999 00:00:00.001
    ];

    testCases.forEach((date) => {
      const result = truncYear(date);
      expect(result.getFullYear()).toBe(date.getFullYear());
      expect(result.getMonth()).toBe(0);
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

    truncYear(originalDate);

    expect(originalDate.getTime()).toBe(originalTime);
  });

  it("handles leap years correctly", () => {
    const leapYear = new Date(2024, 2, 29, 12, 0, 0, 0); // March 29, 2024 (leap year)
    const result = truncYear(leapYear);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(0);
    expect(result.getDate()).toBe(1);
  });

  it("handles edge cases", () => {
    // Year boundary
    const newYear = new Date(2024, 0, 1, 0, 0, 0, 1);
    const result = truncYear(newYear);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(0);
    expect(result.getDate()).toBe(1);
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);
  });
});