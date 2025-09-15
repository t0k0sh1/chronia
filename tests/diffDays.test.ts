import { describe, it, expect } from "vitest";
import { diffDays } from "../src/diffDays";

describe("diffDays", () => {
  it("calculates difference in calendar days", () => {
    const date1 = new Date(2024, 5, 15, 23, 59); // June 15, 2024 23:59
    const date2 = new Date(2024, 5, 14, 0, 0); // June 14, 2024 00:00
    expect(diffDays(date1, date2)).toBe(1);
  });

  it("returns 0 for same calendar day", () => {
    const date1 = new Date(2024, 5, 15, 0, 0); // June 15, 2024 00:00
    const date2 = new Date(2024, 5, 15, 23, 59); // June 15, 2024 23:59
    expect(diffDays(date1, date2)).toBe(0);
  });

  it("ignores time components", () => {
    const date1 = new Date(2024, 5, 15, 23, 59, 59, 999); // June 15, 2024 23:59:59.999
    const date2 = new Date(2024, 5, 15, 0, 0, 0, 0); // June 15, 2024 00:00:00.000
    expect(diffDays(date1, date2)).toBe(0);
  });

  it("handles month boundaries", () => {
    const date1 = new Date(2024, 6, 1); // July 1, 2024
    const date2 = new Date(2024, 5, 30); // June 30, 2024
    expect(diffDays(date1, date2)).toBe(1);
  });

  it("handles year boundaries", () => {
    const date1 = new Date(2024, 0, 1); // January 1, 2024
    const date2 = new Date(2023, 11, 31); // December 31, 2023
    expect(diffDays(date1, date2)).toBe(1);
  });

  it("returns negative value when dateLeft is before dateRight", () => {
    const date1 = new Date(2024, 5, 14); // June 14, 2024
    const date2 = new Date(2024, 5, 15); // June 15, 2024
    expect(diffDays(date1, date2)).toBe(-1);
  });

  it("handles multiple day differences", () => {
    const testCases = [
      { date1: new Date(2024, 5, 20), date2: new Date(2024, 5, 15), expected: 5 },
      { date1: new Date(2024, 5, 1), date2: new Date(2024, 4, 25), expected: 7 }, // May 25 to June 1
      { date1: new Date(2024, 11, 31), date2: new Date(2024, 0, 1), expected: 365 }, // Leap year
      { date1: new Date(2023, 11, 31), date2: new Date(2023, 0, 1), expected: 364 }, // Non-leap year
    ];

    testCases.forEach(({ date1, date2, expected }) => {
      expect(diffDays(date1, date2)).toBe(expected);
    });
  });

  it("handles leap year correctly", () => {
    const date1 = new Date(2024, 2, 1); // March 1, 2024 (leap year)
    const date2 = new Date(2024, 1, 1); // February 1, 2024
    expect(diffDays(date1, date2)).toBe(29); // 29 days in February 2024

    const date3 = new Date(2023, 2, 1); // March 1, 2023 (non-leap year)
    const date4 = new Date(2023, 1, 1); // February 1, 2023
    expect(diffDays(date3, date4)).toBe(28); // 28 days in February 2023
  });

  it("handles DST transitions", () => {
    // Note: This may vary by timezone, but function should handle consistently
    const beforeDST = new Date(2024, 2, 9); // March 9, 2024 (before DST in US)
    const afterDST = new Date(2024, 2, 11); // March 11, 2024 (after DST in US)
    expect(diffDays(afterDST, beforeDST)).toBe(2);
  });

  it("calculates large day differences", () => {
    const date1 = new Date(2025, 0, 1); // January 1, 2025
    const date2 = new Date(2024, 0, 1); // January 1, 2024
    expect(diffDays(date1, date2)).toBe(366); // 2024 is a leap year
  });

  it("handles edge cases with different times", () => {
    // Test that time differences within the same day don't affect result
    const earlyMorning = new Date(2024, 5, 15, 1, 0, 0); // June 15, 2024 01:00
    const lateMorning = new Date(2024, 5, 15, 11, 0, 0); // June 15, 2024 11:00
    const evening = new Date(2024, 5, 15, 22, 0, 0); // June 15, 2024 22:00

    expect(diffDays(lateMorning, earlyMorning)).toBe(0);
    expect(diffDays(evening, earlyMorning)).toBe(0);
    expect(diffDays(evening, lateMorning)).toBe(0);
  });
});