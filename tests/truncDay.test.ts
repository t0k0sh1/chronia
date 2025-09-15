import { describe, it, expect } from "vitest";
import { truncDay } from "../src/truncDay";

describe("truncDay", () => {
  it("truncates to the start of the day", () => {
    const date = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
    const result = truncDay(date);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(5); // June
    expect(result.getDate()).toBe(15);
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);
  });

  it("works with different times of day", () => {
    const testCases = [
      new Date(2024, 3, 10, 0, 0, 0, 1), // April 10, 2024 00:00:00.001
      new Date(2024, 7, 20, 12, 30, 45, 500), // August 20, 2024 12:30:45.500
      new Date(2023, 11, 31, 23, 59, 59, 999), // December 31, 2023 23:59:59.999
    ];

    testCases.forEach((date) => {
      const result = truncDay(date);
      expect(result.getFullYear()).toBe(date.getFullYear());
      expect(result.getMonth()).toBe(date.getMonth());
      expect(result.getDate()).toBe(date.getDate());
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });
  });

  it("does not modify the original date", () => {
    const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);
    const originalTime = originalDate.getTime();

    truncDay(originalDate);

    expect(originalDate.getTime()).toBe(originalTime);
  });

  it("handles midnight correctly", () => {
    const midnight = new Date(2024, 6, 20, 0, 0, 0, 0); // July 20, 2024 00:00:00.000
    const result = truncDay(midnight);

    expect(result.getTime()).toBe(midnight.getTime());
  });

  it("handles day boundaries", () => {
    // Start of day
    const startOfDay = new Date(2024, 2, 15, 0, 0, 0, 1);
    const result1 = truncDay(startOfDay);

    expect(result1.getFullYear()).toBe(2024);
    expect(result1.getMonth()).toBe(2); // March
    expect(result1.getDate()).toBe(15);
    expect(result1.getHours()).toBe(0);
    expect(result1.getMilliseconds()).toBe(0);

    // End of day
    const endOfDay = new Date(2024, 2, 15, 23, 59, 59, 999);
    const result2 = truncDay(endOfDay);

    expect(result2.getFullYear()).toBe(2024);
    expect(result2.getMonth()).toBe(2); // March
    expect(result2.getDate()).toBe(15);
    expect(result2.getHours()).toBe(0);
    expect(result2.getMilliseconds()).toBe(0);
  });

  it("preserves date across DST transitions", () => {
    // Note: This test depends on local timezone, but demonstrates the function works
    const beforeDST = new Date(2024, 2, 10, 15, 30, 0, 0); // March 10, 2024 (around DST)
    const result = truncDay(beforeDST);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(2); // March
    expect(result.getDate()).toBe(10);
    expect(result.getHours()).toBe(0);
  });
});