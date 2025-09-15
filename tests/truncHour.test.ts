import { describe, it, expect } from "vitest";
import { truncHour } from "../src/truncHour";

describe("truncHour", () => {
  it("truncates to the start of the hour", () => {
    const date = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
    const result = truncHour(date);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(5); // June
    expect(result.getDate()).toBe(15);
    expect(result.getHours()).toBe(14);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);
  });

  it("works with different hours", () => {
    const testCases = [
      new Date(2024, 0, 1, 0, 30, 45, 500), // January 1, 2024 00:30:45.500
      new Date(2024, 6, 15, 12, 0, 0, 1), // July 15, 2024 12:00:00.001
      new Date(2023, 11, 25, 23, 59, 59, 999), // December 25, 2023 23:59:59.999
    ];

    testCases.forEach((date) => {
      const result = truncHour(date);
      expect(result.getFullYear()).toBe(date.getFullYear());
      expect(result.getMonth()).toBe(date.getMonth());
      expect(result.getDate()).toBe(date.getDate());
      expect(result.getHours()).toBe(date.getHours());
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });
  });

  it("does not modify the original date", () => {
    const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);
    const originalTime = originalDate.getTime();

    truncHour(originalDate);

    expect(originalDate.getTime()).toBe(originalTime);
  });

  it("handles start of hour correctly", () => {
    const startOfHour = new Date(2024, 3, 10, 8, 0, 0, 0); // April 10, 2024 08:00:00.000
    const result = truncHour(startOfHour);

    expect(result.getTime()).toBe(startOfHour.getTime());
  });

  it("handles hour boundaries", () => {
    // Start of hour with milliseconds
    const startWithMs = new Date(2024, 8, 5, 16, 0, 0, 1);
    const result1 = truncHour(startWithMs);

    expect(result1.getHours()).toBe(16);
    expect(result1.getMinutes()).toBe(0);
    expect(result1.getSeconds()).toBe(0);
    expect(result1.getMilliseconds()).toBe(0);

    // End of hour
    const endOfHour = new Date(2024, 8, 5, 16, 59, 59, 999);
    const result2 = truncHour(endOfHour);

    expect(result2.getHours()).toBe(16);
    expect(result2.getMinutes()).toBe(0);
    expect(result2.getSeconds()).toBe(0);
    expect(result2.getMilliseconds()).toBe(0);
  });

  it("works across all 24 hours", () => {
    for (let hour = 0; hour < 24; hour++) {
      const date = new Date(2024, 0, 1, hour, 30, 45, 123);
      const result = truncHour(date);

      expect(result.getHours()).toBe(hour);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    }
  });
});