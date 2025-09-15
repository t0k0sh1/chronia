import { describe, it, expect } from "vitest";
import { truncSecond } from "../src/truncSecond";

describe("truncSecond", () => {
  it("truncates to the start of the second", () => {
    const date = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
    const result = truncSecond(date);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(5); // June
    expect(result.getDate()).toBe(15);
    expect(result.getHours()).toBe(14);
    expect(result.getMinutes()).toBe(30);
    expect(result.getSeconds()).toBe(45);
    expect(result.getMilliseconds()).toBe(0);
  });

  it("works with different seconds", () => {
    const testCases = [
      new Date(2024, 0, 5, 8, 15, 0, 500), // January 5, 2024 08:15:00.500
      new Date(2024, 9, 31, 22, 45, 30, 1), // October 31, 2024 22:45:30.001
      new Date(2023, 6, 4, 16, 20, 59, 999), // July 4, 2023 16:20:59.999
    ];

    testCases.forEach((date) => {
      const result = truncSecond(date);
      expect(result.getFullYear()).toBe(date.getFullYear());
      expect(result.getMonth()).toBe(date.getMonth());
      expect(result.getDate()).toBe(date.getDate());
      expect(result.getHours()).toBe(date.getHours());
      expect(result.getMinutes()).toBe(date.getMinutes());
      expect(result.getSeconds()).toBe(date.getSeconds());
      expect(result.getMilliseconds()).toBe(0);
    });
  });

  it("does not modify the original date", () => {
    const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);
    const originalTime = originalDate.getTime();

    truncSecond(originalDate);

    expect(originalDate.getTime()).toBe(originalTime);
  });

  it("handles start of second correctly", () => {
    const startOfSecond = new Date(2024, 3, 18, 13, 42, 28, 0); // April 18, 2024 13:42:28.000
    const result = truncSecond(startOfSecond);

    expect(result.getTime()).toBe(startOfSecond.getTime());
  });

  it("handles millisecond precision", () => {
    const testCases = [
      { ms: 1, expected: 0 },
      { ms: 500, expected: 0 },
      { ms: 999, expected: 0 },
    ];

    testCases.forEach(({ ms, expected }) => {
      const date = new Date(2024, 6, 12, 10, 25, 15, ms);
      const result = truncSecond(date);

      expect(result.getHours()).toBe(10);
      expect(result.getMinutes()).toBe(25);
      expect(result.getSeconds()).toBe(15);
      expect(result.getMilliseconds()).toBe(expected);
    });
  });

  it("works across all 60 seconds", () => {
    for (let second = 0; second < 60; second++) {
      const date = new Date(2024, 0, 1, 12, 30, second, 789);
      const result = truncSecond(date);

      expect(result.getHours()).toBe(12);
      expect(result.getMinutes()).toBe(30);
      expect(result.getSeconds()).toBe(second);
      expect(result.getMilliseconds()).toBe(0);
    }
  });
});