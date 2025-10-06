import { describe, it, expect } from "vitest";
import { diffSeconds } from "../src/diffSeconds";

describe("diffSeconds", () => {
  it("calculates difference in complete seconds", () => {
    const date1 = new Date(2024, 5, 15, 14, 30, 45, 999); // June 15, 2024 14:30:45.999
    const date2 = new Date(2024, 5, 15, 14, 30, 43, 0); // June 15, 2024 14:30:43.000
    expect(diffSeconds(date1, date2)).toBe(2);
  });

  it("returns 0 for same second", () => {
    const date1 = new Date(2024, 5, 15, 14, 30, 45, 0); // June 15, 2024 14:30:45.000
    const date2 = new Date(2024, 5, 15, 14, 30, 45, 999); // June 15, 2024 14:30:45.999
    expect(diffSeconds(date1, date2)).toBe(0);
  });

  it("ignores milliseconds", () => {
    const date1 = new Date(2024, 5, 15, 14, 30, 45, 999); // June 15, 2024 14:30:45.999
    const date2 = new Date(2024, 5, 15, 14, 30, 45, 0); // June 15, 2024 14:30:45.000
    expect(diffSeconds(date1, date2)).toBe(0);
  });

  it("handles minute boundaries", () => {
    const date1 = new Date(2024, 5, 15, 14, 31, 0); // June 15, 2024 14:31:00
    const date2 = new Date(2024, 5, 15, 14, 30, 30); // June 15, 2024 14:30:30
    expect(diffSeconds(date1, date2)).toBe(30);
  });

  it("returns negative value when dateLeft is before dateRight", () => {
    const date1 = new Date(2024, 5, 15, 14, 30, 40); // June 15, 2024 14:30:40
    const date2 = new Date(2024, 5, 15, 14, 30, 45); // June 15, 2024 14:30:45
    expect(diffSeconds(date1, date2)).toBe(-5);
  });

  it("handles 60-second differences correctly", () => {
    const testCases = [
      { date1: new Date(2024, 5, 15, 14, 31, 0), date2: new Date(2024, 5, 15, 14, 30, 0), expected: 60 },
      { date1: new Date(2024, 5, 15, 14, 30, 30), date2: new Date(2024, 5, 15, 14, 30, 0), expected: 30 },
      { date1: new Date(2024, 5, 15, 14, 31, 15), date2: new Date(2024, 5, 15, 14, 30, 45), expected: 30 },
    ];

    testCases.forEach(({ date1, date2, expected }) => {
      expect(diffSeconds(date1, date2)).toBe(expected);
    });
  });

  it("works across all seconds of a minute", () => {
    for (let second = 0; second < 60; second++) {
      const date1 = new Date(2024, 5, 15, 14, 30, second, 500);
      const date2 = new Date(2024, 5, 15, 14, 30, 0, 500);
      expect(diffSeconds(date1, date2)).toBe(second);
    }
  });

  it("handles hour boundaries", () => {
    const date1 = new Date(2024, 5, 15, 15, 0, 30); // June 15, 2024 15:00:30
    const date2 = new Date(2024, 5, 15, 14, 59, 45); // June 15, 2024 14:59:45
    expect(diffSeconds(date1, date2)).toBe(45);
  });

  it("handles day boundaries", () => {
    const date1 = new Date(2024, 5, 16, 0, 0, 15); // June 16, 2024 00:00:15
    const date2 = new Date(2024, 5, 15, 23, 59, 45); // June 15, 2024 23:59:45
    expect(diffSeconds(date1, date2)).toBe(30);
  });

  it("handles month boundaries", () => {
    const date1 = new Date(2024, 6, 1, 0, 0, 10); // July 1, 2024 00:00:10
    const date2 = new Date(2024, 5, 30, 23, 59, 50); // June 30, 2024 23:59:50
    expect(diffSeconds(date1, date2)).toBe(20);
  });

  it("handles year boundaries", () => {
    const date1 = new Date(2024, 0, 1, 0, 0, 5); // January 1, 2024 00:00:05
    const date2 = new Date(2023, 11, 31, 23, 59, 55); // December 31, 2023 23:59:55
    expect(diffSeconds(date1, date2)).toBe(10);
  });

  it("calculates large second differences", () => {
    const date1 = new Date(2024, 5, 15, 14, 32, 0); // June 15, 2024 14:32:00
    const date2 = new Date(2024, 5, 15, 14, 30, 0); // June 15, 2024 14:30:00
    expect(diffSeconds(date1, date2)).toBe(120); // 2 minutes * 60 seconds
  });

  it("handles edge cases within seconds", () => {
    // Test that millisecond differences within the same second don't affect result
    const startOfSecond = new Date(2024, 5, 15, 14, 30, 45, 0);
    const midSecond = new Date(2024, 5, 15, 14, 30, 45, 500);
    const endOfSecond = new Date(2024, 5, 15, 14, 30, 45, 999);

    expect(diffSeconds(midSecond, startOfSecond)).toBe(0);
    expect(diffSeconds(endOfSecond, startOfSecond)).toBe(0);
    expect(diffSeconds(endOfSecond, midSecond)).toBe(0);
  });

  describe("invalid inputs", () => {
    it("returns NaN when the first date is invalid", () => {
      const invalidDate = new Date("invalid");
      const validDate = new Date(2024, 5, 15, 14, 30, 45);
      expect(diffSeconds(invalidDate, validDate)).toBe(NaN);
    });

    it("returns NaN when the second date is invalid", () => {
      const validDate = new Date(2024, 5, 15, 14, 30, 45);
      const invalidDate = new Date("invalid");
      expect(diffSeconds(validDate, invalidDate)).toBe(NaN);
    });

    it("returns NaN when both dates are invalid", () => {
      const invalidDate1 = new Date("invalid");
      const invalidDate2 = new Date("also invalid");
      expect(diffSeconds(invalidDate1, invalidDate2)).toBe(NaN);
    });

    it("returns NaN when dateLeft is NaN", () => {
      const validDate = new Date(2024, 5, 15, 14, 30, 45);
      expect(diffSeconds(NaN, validDate)).toBe(NaN);
    });

    it("returns NaN when dateRight is NaN", () => {
      const validDate = new Date(2024, 5, 15, 14, 30, 45);
      expect(diffSeconds(validDate, NaN)).toBe(NaN);
    });

    it("returns NaN when both dates are NaN", () => {
      expect(diffSeconds(NaN, NaN)).toBe(NaN);
    });

    it("returns NaN when dateLeft is Infinity", () => {
      const validDate = new Date(2024, 5, 15, 14, 30, 45);
      expect(diffSeconds(Infinity, validDate)).toBe(NaN);
    });

    it("returns NaN when dateRight is Infinity", () => {
      const validDate = new Date(2024, 5, 15, 14, 30, 45);
      expect(diffSeconds(validDate, Infinity)).toBe(NaN);
    });

    it("returns NaN when dateLeft is -Infinity", () => {
      const validDate = new Date(2024, 5, 15, 14, 30, 45);
      expect(diffSeconds(-Infinity, validDate)).toBe(NaN);
    });

    it("returns NaN when dateRight is -Infinity", () => {
      const validDate = new Date(2024, 5, 15, 14, 30, 45);
      expect(diffSeconds(validDate, -Infinity)).toBe(NaN);
    });
  });
});