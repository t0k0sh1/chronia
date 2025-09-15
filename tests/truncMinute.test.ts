import { describe, it, expect } from "vitest";
import { truncMinute } from "../src/truncMinute";

describe("truncMinute", () => {
  it("truncates to the start of the minute", () => {
    const date = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
    const result = truncMinute(date);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(5); // June
    expect(result.getDate()).toBe(15);
    expect(result.getHours()).toBe(14);
    expect(result.getMinutes()).toBe(30);
    expect(result.getSeconds()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);
  });

  it("works with different minutes", () => {
    const testCases = [
      new Date(2024, 2, 10, 9, 0, 30, 500), // March 10, 2024 09:00:30.500
      new Date(2024, 7, 25, 18, 45, 0, 1), // August 25, 2024 18:45:00.001
      new Date(2023, 10, 15, 12, 59, 59, 999), // November 15, 2023 12:59:59.999
    ];

    testCases.forEach((date) => {
      const result = truncMinute(date);
      expect(result.getFullYear()).toBe(date.getFullYear());
      expect(result.getMonth()).toBe(date.getMonth());
      expect(result.getDate()).toBe(date.getDate());
      expect(result.getHours()).toBe(date.getHours());
      expect(result.getMinutes()).toBe(date.getMinutes());
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });
  });

  it("does not modify the original date", () => {
    const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);
    const originalTime = originalDate.getTime();

    truncMinute(originalDate);

    expect(originalDate.getTime()).toBe(originalTime);
  });

  it("handles start of minute correctly", () => {
    const startOfMinute = new Date(2024, 4, 20, 11, 25, 0, 0); // May 20, 2024 11:25:00.000
    const result = truncMinute(startOfMinute);

    expect(result.getTime()).toBe(startOfMinute.getTime());
  });

  it("handles minute boundaries", () => {
    // Start of minute with milliseconds
    const startWithMs = new Date(2024, 1, 14, 7, 33, 0, 1);
    const result1 = truncMinute(startWithMs);

    expect(result1.getHours()).toBe(7);
    expect(result1.getMinutes()).toBe(33);
    expect(result1.getSeconds()).toBe(0);
    expect(result1.getMilliseconds()).toBe(0);

    // End of minute
    const endOfMinute = new Date(2024, 1, 14, 7, 33, 59, 999);
    const result2 = truncMinute(endOfMinute);

    expect(result2.getHours()).toBe(7);
    expect(result2.getMinutes()).toBe(33);
    expect(result2.getSeconds()).toBe(0);
    expect(result2.getMilliseconds()).toBe(0);
  });

  it("works across all 60 minutes", () => {
    for (let minute = 0; minute < 60; minute++) {
      const date = new Date(2024, 0, 1, 12, minute, 30, 456);
      const result = truncMinute(date);

      expect(result.getHours()).toBe(12);
      expect(result.getMinutes()).toBe(minute);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    }
  });
});