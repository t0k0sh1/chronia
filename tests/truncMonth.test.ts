import { describe, it, expect } from "vitest";
import { truncMonth } from "../src/truncMonth";

describe("truncMonth", () => {
  it("truncates to the start of the month", () => {
    const date = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
    const result = truncMonth(date);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(5); // June
    expect(result.getDate()).toBe(1);
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);
  });

  it("works with different months", () => {
    const testCases = [
      new Date(2024, 0, 31, 23, 59, 59, 999), // January 31, 2024 23:59:59.999
      new Date(2024, 11, 25, 12, 30, 0, 0), // December 25, 2024 12:30:00.000
      new Date(2023, 6, 4, 6, 15, 30, 500), // July 4, 2023 06:15:30.500
    ];

    testCases.forEach((date) => {
      const result = truncMonth(date);
      expect(result.getFullYear()).toBe(date.getFullYear());
      expect(result.getMonth()).toBe(date.getMonth());
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

    truncMonth(originalDate);

    expect(originalDate.getTime()).toBe(originalTime);
  });

  it("handles February in leap years", () => {
    const februaryLeap = new Date(2024, 1, 29, 12, 0, 0, 0); // February 29, 2024 (leap year)
    const result = truncMonth(februaryLeap);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(1); // February
    expect(result.getDate()).toBe(1);
  });

  it("handles month boundaries", () => {
    // First day of month
    const firstDay = new Date(2024, 3, 1, 0, 0, 0, 1);
    const result1 = truncMonth(firstDay);

    expect(result1.getFullYear()).toBe(2024);
    expect(result1.getMonth()).toBe(3); // April
    expect(result1.getDate()).toBe(1);
    expect(result1.getMilliseconds()).toBe(0);

    // Last day of month
    const lastDay = new Date(2024, 3, 30, 23, 59, 59, 999);
    const result2 = truncMonth(lastDay);

    expect(result2.getFullYear()).toBe(2024);
    expect(result2.getMonth()).toBe(3); // April
    expect(result2.getDate()).toBe(1);
    expect(result2.getHours()).toBe(0);
  });
});