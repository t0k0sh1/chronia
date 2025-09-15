import { describe, it, expect } from "vitest";
import { diffHours } from "../src/diffHours";

describe("diffHours", () => {
  it("calculates difference in complete hours", () => {
    const date1 = new Date(2024, 5, 15, 14, 59, 59); // June 15, 2024 14:59:59
    const date2 = new Date(2024, 5, 15, 12, 0, 0); // June 15, 2024 12:00:00
    expect(diffHours(date1, date2)).toBe(2);
  });

  it("returns 0 for same hour", () => {
    const date1 = new Date(2024, 5, 15, 14, 0, 0); // June 15, 2024 14:00:00
    const date2 = new Date(2024, 5, 15, 14, 59, 59); // June 15, 2024 14:59:59
    expect(diffHours(date1, date2)).toBe(0);
  });

  it("ignores minutes, seconds, and milliseconds", () => {
    const date1 = new Date(2024, 5, 15, 14, 59, 59, 999); // June 15, 2024 14:59:59.999
    const date2 = new Date(2024, 5, 15, 14, 0, 0, 0); // June 15, 2024 14:00:00.000
    expect(diffHours(date1, date2)).toBe(0);
  });

  it("handles day boundaries", () => {
    const date1 = new Date(2024, 5, 16, 2, 0); // June 16, 2024 02:00
    const date2 = new Date(2024, 5, 15, 23, 0); // June 15, 2024 23:00
    expect(diffHours(date1, date2)).toBe(3);
  });

  it("returns negative value when dateLeft is before dateRight", () => {
    const date1 = new Date(2024, 5, 15, 10, 30); // June 15, 2024 10:30
    const date2 = new Date(2024, 5, 15, 14, 30); // June 15, 2024 14:30
    expect(diffHours(date1, date2)).toBe(-4);
  });

  it("handles 24-hour differences correctly", () => {
    const testCases = [
      { date1: new Date(2024, 5, 15, 0, 30), date2: new Date(2024, 5, 15, 23, 30), expected: -23 },
      { date1: new Date(2024, 5, 16, 0, 0), date2: new Date(2024, 5, 15, 0, 0), expected: 24 },
      { date1: new Date(2024, 5, 15, 12, 0), date2: new Date(2024, 5, 15, 6, 0), expected: 6 },
    ];

    testCases.forEach(({ date1, date2, expected }) => {
      expect(diffHours(date1, date2)).toBe(expected);
    });
  });

  it("works across all hours of the day", () => {
    for (let hour = 0; hour < 24; hour++) {
      const date1 = new Date(2024, 5, 15, hour, 30);
      const date2 = new Date(2024, 5, 15, 0, 30);
      expect(diffHours(date1, date2)).toBe(hour);
    }
  });

  it("handles month boundaries", () => {
    const date1 = new Date(2024, 6, 1, 1, 0); // July 1, 2024 01:00
    const date2 = new Date(2024, 5, 30, 22, 0); // June 30, 2024 22:00
    expect(diffHours(date1, date2)).toBe(3);
  });

  it("handles year boundaries", () => {
    const date1 = new Date(2024, 0, 1, 2, 0); // January 1, 2024 02:00
    const date2 = new Date(2023, 11, 31, 20, 0); // December 31, 2023 20:00
    expect(diffHours(date1, date2)).toBe(6);
  });

  it("calculates large hour differences", () => {
    const date1 = new Date(2024, 5, 20, 14, 0); // June 20, 2024 14:00
    const date2 = new Date(2024, 5, 15, 14, 0); // June 15, 2024 14:00
    expect(diffHours(date1, date2)).toBe(120); // 5 days * 24 hours
  });

  it("handles edge cases within hours", () => {
    // Test that minute/second differences within the same hour don't affect result
    const startOfHour = new Date(2024, 5, 15, 14, 0, 0);
    const midHour = new Date(2024, 5, 15, 14, 30, 0);
    const endOfHour = new Date(2024, 5, 15, 14, 59, 59);

    expect(diffHours(midHour, startOfHour)).toBe(0);
    expect(diffHours(endOfHour, startOfHour)).toBe(0);
    expect(diffHours(endOfHour, midHour)).toBe(0);
  });
});