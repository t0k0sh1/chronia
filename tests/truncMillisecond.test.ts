import { describe, it, expect } from "vitest";
import { truncMillisecond } from "../src/truncMillisecond";

describe("truncMillisecond", () => {
  it("returns the same date without truncation", () => {
    const date = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
    const result = truncMillisecond(date);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(5); // June
    expect(result.getDate()).toBe(15);
    expect(result.getHours()).toBe(14);
    expect(result.getMinutes()).toBe(30);
    expect(result.getSeconds()).toBe(45);
    expect(result.getMilliseconds()).toBe(123);
  });

  it("preserves all time components", () => {
    const testCases = [
      new Date(2024, 0, 1, 0, 0, 0, 0), // January 1, 2024 00:00:00.000
      new Date(2024, 11, 31, 23, 59, 59, 999), // December 31, 2024 23:59:59.999
      new Date(2023, 6, 15, 12, 30, 45, 500), // July 15, 2023 12:30:45.500
    ];

    testCases.forEach((date) => {
      const result = truncMillisecond(date);
      expect(result.getTime()).toBe(date.getTime());
    });
  });

  it("does not modify the original date", () => {
    const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);
    const originalTime = originalDate.getTime();

    truncMillisecond(originalDate);

    expect(originalDate.getTime()).toBe(originalTime);
  });

  it("returns a new Date object", () => {
    const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);
    const result = truncMillisecond(originalDate);

    expect(result).not.toBe(originalDate); // Different object references
    expect(result.getTime()).toBe(originalDate.getTime()); // Same time value
  });

  it("handles edge cases", () => {
    const testCases = [
      new Date(0), // Unix epoch
      new Date(2024, 1, 29, 12, 0, 0, 1), // Leap year February 29
      new Date(1999, 11, 31, 23, 59, 59, 999), // Y2K boundary
    ];

    testCases.forEach((date) => {
      const result = truncMillisecond(date);
      expect(result.getTime()).toBe(date.getTime());
      expect(result).not.toBe(date);
    });
  });

  it("maintains millisecond precision", () => {
    for (let ms = 0; ms < 1000; ms += 50) {
      const date = new Date(2024, 0, 1, 12, 0, 0, ms);
      const result = truncMillisecond(date);

      expect(result.getMilliseconds()).toBe(ms);
      expect(result.getTime()).toBe(date.getTime());
    }
  });

  it("provides API consistency", () => {
    // This function exists for API consistency even though it doesn't truncate
    const date = new Date(2024, 5, 15, 14, 30, 45, 123);
    const result = truncMillisecond(date);

    // Should behave consistently with other trunc functions (returns new object)
    expect(typeof result).toBe("object");
    expect(result instanceof Date).toBe(true);
    expect(result).not.toBe(date);
  });
});