import { describe, it, expect } from "vitest";
import { diffYears } from "../src/diffYears";

describe("diffYears", () => {
  it("calculates difference in calendar years", () => {
    const date1 = new Date(2024, 0, 1); // January 1, 2024
    const date2 = new Date(2020, 11, 31); // December 31, 2020
    expect(diffYears(date1, date2)).toBe(4);
  });

  it("returns 0 for same calendar year", () => {
    const date1 = new Date(2024, 0, 1); // January 1, 2024
    const date2 = new Date(2024, 11, 31); // December 31, 2024
    expect(diffYears(date1, date2)).toBe(0);
  });

  it("ignores months, days, and time components", () => {
    const date1 = new Date(2024, 11, 31, 23, 59, 59, 999); // December 31, 2024 23:59:59.999
    const date2 = new Date(2024, 0, 1, 0, 0, 0, 0); // January 1, 2024 00:00:00.000
    expect(diffYears(date1, date2)).toBe(0);
  });

  it("returns negative value when dateLeft is before dateRight", () => {
    const date1 = new Date(2020, 5, 15); // June 15, 2020
    const date2 = new Date(2024, 5, 15); // June 15, 2024
    expect(diffYears(date1, date2)).toBe(-4);
  });

  it("handles century boundaries", () => {
    const date1 = new Date(2000, 0, 1); // January 1, 2000
    const date2 = new Date(1999, 11, 31); // December 31, 1999
    expect(diffYears(date1, date2)).toBe(1);
  });

  it("handles millennium boundaries", () => {
    const date1 = new Date(2000, 5, 15); // June 15, 2000
    const date2 = new Date(1999, 5, 15); // June 15, 1999
    expect(diffYears(date1, date2)).toBe(1);
  });

  it("works with different month/day combinations", () => {
    const testCases = [
      { date1: new Date(2025, 0, 1), date2: new Date(2023, 11, 31), expected: 2 },
      { date1: new Date(2024, 6, 15), date2: new Date(2020, 1, 29), expected: 4 },
      { date1: new Date(2024, 11, 31), date2: new Date(2024, 0, 1), expected: 0 },
    ];

    testCases.forEach(({ date1, date2, expected }) => {
      expect(diffYears(date1, date2)).toBe(expected);
    });
  });

  it("handles negative years (BCE dates)", () => {
    const date1 = new Date(0, 0, 1); // January 1, 1900 (due to JS Date behavior)
    date1.setFullYear(0); // Year 0
    const date2 = new Date(0, 0, 1);
    date2.setFullYear(-100); // 100 BCE

    expect(diffYears(date1, date2)).toBe(100);
  });
});