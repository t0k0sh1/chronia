import { describe, it, expect } from "vitest";
import { diffMinutes } from "../src/diffMinutes";

describe("diffMinutes", () => {
  it("calculates difference in complete minutes", () => {
    const date1 = new Date(2024, 5, 15, 14, 30, 59); // June 15, 2024 14:30:59
    const date2 = new Date(2024, 5, 15, 14, 28, 0); // June 15, 2024 14:28:00
    expect(diffMinutes(date1, date2)).toBe(2);
  });

  it("returns 0 for same minute", () => {
    const date1 = new Date(2024, 5, 15, 14, 30, 0); // June 15, 2024 14:30:00
    const date2 = new Date(2024, 5, 15, 14, 30, 59); // June 15, 2024 14:30:59
    expect(diffMinutes(date1, date2)).toBe(0);
  });

  it("ignores seconds and milliseconds", () => {
    const date1 = new Date(2024, 5, 15, 14, 30, 59, 999); // June 15, 2024 14:30:59.999
    const date2 = new Date(2024, 5, 15, 14, 30, 0, 0); // June 15, 2024 14:30:00.000
    expect(diffMinutes(date1, date2)).toBe(0);
  });

  it("handles hour boundaries", () => {
    const date1 = new Date(2024, 5, 15, 15, 0); // June 15, 2024 15:00
    const date2 = new Date(2024, 5, 15, 14, 45); // June 15, 2024 14:45
    expect(diffMinutes(date1, date2)).toBe(15);
  });

  it("returns negative value when dateLeft is before dateRight", () => {
    const date1 = new Date(2024, 5, 15, 14, 25); // June 15, 2024 14:25
    const date2 = new Date(2024, 5, 15, 14, 30); // June 15, 2024 14:30
    expect(diffMinutes(date1, date2)).toBe(-5);
  });

  it("handles 60-minute differences correctly", () => {
    const testCases = [
      { date1: new Date(2024, 5, 15, 14, 0), date2: new Date(2024, 5, 15, 13, 0), expected: 60 },
      { date1: new Date(2024, 5, 15, 14, 30), date2: new Date(2024, 5, 15, 14, 0), expected: 30 },
      { date1: new Date(2024, 5, 15, 15, 15), date2: new Date(2024, 5, 15, 14, 45), expected: 30 },
    ];

    testCases.forEach(({ date1, date2, expected }) => {
      expect(diffMinutes(date1, date2)).toBe(expected);
    });
  });

  it("works across all minutes of an hour", () => {
    for (let minute = 0; minute < 60; minute++) {
      const date1 = new Date(2024, 5, 15, 14, minute, 30);
      const date2 = new Date(2024, 5, 15, 14, 0, 30);
      expect(diffMinutes(date1, date2)).toBe(minute);
    }
  });

  it("handles day boundaries", () => {
    const date1 = new Date(2024, 5, 16, 0, 30); // June 16, 2024 00:30
    const date2 = new Date(2024, 5, 15, 23, 45); // June 15, 2024 23:45
    expect(diffMinutes(date1, date2)).toBe(45);
  });

  it("handles month boundaries", () => {
    const date1 = new Date(2024, 6, 1, 0, 15); // July 1, 2024 00:15
    const date2 = new Date(2024, 5, 30, 23, 50); // June 30, 2024 23:50
    expect(diffMinutes(date1, date2)).toBe(25);
  });

  it("handles year boundaries", () => {
    const date1 = new Date(2024, 0, 1, 0, 10); // January 1, 2024 00:10
    const date2 = new Date(2023, 11, 31, 23, 50); // December 31, 2023 23:50
    expect(diffMinutes(date1, date2)).toBe(20);
  });

  it("calculates large minute differences", () => {
    const date1 = new Date(2024, 5, 15, 16, 0); // June 15, 2024 16:00
    const date2 = new Date(2024, 5, 15, 14, 0); // June 15, 2024 14:00
    expect(diffMinutes(date1, date2)).toBe(120); // 2 hours * 60 minutes
  });

  it("handles edge cases within minutes", () => {
    // Test that second/millisecond differences within the same minute don't affect result
    const startOfMinute = new Date(2024, 5, 15, 14, 30, 0, 0);
    const midMinute = new Date(2024, 5, 15, 14, 30, 30, 0);
    const endOfMinute = new Date(2024, 5, 15, 14, 30, 59, 999);

    expect(diffMinutes(midMinute, startOfMinute)).toBe(0);
    expect(diffMinutes(endOfMinute, startOfMinute)).toBe(0);
    expect(diffMinutes(endOfMinute, midMinute)).toBe(0);
  });
});