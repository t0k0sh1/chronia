import { describe, it, expect } from "vitest";
import { diffMonths } from "../src/diffMonths";

describe("diffMonths", () => {
  it("calculates difference in calendar months", () => {
    const date1 = new Date(2024, 5, 15); // June 15, 2024
    const date2 = new Date(2024, 2, 1); // March 1, 2024
    expect(diffMonths(date1, date2)).toBe(3);
  });

  it("returns 0 for same calendar month", () => {
    const date1 = new Date(2024, 5, 1); // June 1, 2024
    const date2 = new Date(2024, 5, 30); // June 30, 2024
    expect(diffMonths(date1, date2)).toBe(0);
  });

  it("ignores days and time components", () => {
    const date1 = new Date(2024, 5, 30, 23, 59, 59, 999); // June 30, 2024 23:59:59.999
    const date2 = new Date(2024, 5, 1, 0, 0, 0, 0); // June 1, 2024 00:00:00.000
    expect(diffMonths(date1, date2)).toBe(0);
  });

  it("handles year boundaries", () => {
    const date1 = new Date(2024, 0, 31); // January 31, 2024
    const date2 = new Date(2023, 11, 1); // December 1, 2023
    expect(diffMonths(date1, date2)).toBe(1);
  });

  it("calculates across multiple years", () => {
    const date1 = new Date(2025, 2, 1); // March 1, 2025
    const date2 = new Date(2024, 2, 31); // March 31, 2024
    expect(diffMonths(date1, date2)).toBe(12);
  });

  it("returns negative value when dateLeft is before dateRight", () => {
    const date1 = new Date(2024, 2, 15); // March 15, 2024
    const date2 = new Date(2024, 5, 15); // June 15, 2024
    expect(diffMonths(date1, date2)).toBe(-3);
  });

  it("handles complex year/month combinations", () => {
    const testCases = [
      { date1: new Date(2024, 11, 31), date2: new Date(2023, 0, 1), expected: 23 },
      { date1: new Date(2025, 0, 1), date2: new Date(2023, 11, 31), expected: 13 },
      { date1: new Date(2024, 6, 15), date2: new Date(2022, 6, 15), expected: 24 },
      { date1: new Date(2024, 3, 30), date2: new Date(2024, 3, 1), expected: 0 },
    ];

    testCases.forEach(({ date1, date2, expected }) => {
      expect(diffMonths(date1, date2)).toBe(expected);
    });
  });

  it("handles leap year February correctly", () => {
    const date1 = new Date(2024, 1, 29); // February 29, 2024 (leap year)
    const date2 = new Date(2024, 1, 1); // February 1, 2024
    expect(diffMonths(date1, date2)).toBe(0); // Same month

    const date3 = new Date(2024, 2, 1); // March 1, 2024
    expect(diffMonths(date3, date1)).toBe(1); // One month difference
  });

  it("calculates large month differences", () => {
    const date1 = new Date(2030, 5, 15); // June 15, 2030
    const date2 = new Date(2020, 5, 15); // June 15, 2020
    expect(diffMonths(date1, date2)).toBe(120); // 10 years * 12 months
  });

  describe("invalid inputs", () => {
    it("returns NaN when the first date is invalid", () => {
      const invalidDate = new Date("invalid");
      const validDate = new Date(2024, 5, 15);
      expect(diffMonths(invalidDate, validDate)).toBe(NaN);
    });

    it("returns NaN when the second date is invalid", () => {
      const validDate = new Date(2024, 5, 15);
      const invalidDate = new Date("invalid");
      expect(diffMonths(validDate, invalidDate)).toBe(NaN);
    });

    it("returns NaN when both dates are invalid", () => {
      const invalidDate1 = new Date("invalid");
      const invalidDate2 = new Date("also invalid");
      expect(diffMonths(invalidDate1, invalidDate2)).toBe(NaN);
    });

    it("returns NaN when dateLeft is NaN", () => {
      const validDate = new Date(2024, 5, 15);
      expect(diffMonths(NaN, validDate)).toBe(NaN);
    });

    it("returns NaN when dateRight is NaN", () => {
      const validDate = new Date(2024, 5, 15);
      expect(diffMonths(validDate, NaN)).toBe(NaN);
    });

    it("returns NaN when both dates are NaN", () => {
      expect(diffMonths(NaN, NaN)).toBe(NaN);
    });

    it("returns NaN when dateLeft is Infinity", () => {
      const validDate = new Date(2024, 5, 15);
      expect(diffMonths(Infinity, validDate)).toBe(NaN);
    });

    it("returns NaN when dateRight is Infinity", () => {
      const validDate = new Date(2024, 5, 15);
      expect(diffMonths(validDate, Infinity)).toBe(NaN);
    });

    it("returns NaN when dateLeft is -Infinity", () => {
      const validDate = new Date(2024, 5, 15);
      expect(diffMonths(-Infinity, validDate)).toBe(NaN);
    });

    it("returns NaN when dateRight is -Infinity", () => {
      const validDate = new Date(2024, 5, 15);
      expect(diffMonths(validDate, -Infinity)).toBe(NaN);
    });
  });
});