import { describe, it, expect } from "vitest";
import { diffMilliseconds } from "../src/diffMilliseconds";

describe("diffMilliseconds", () => {
  it("calculates exact difference in milliseconds", () => {
    const date1 = new Date(2024, 5, 15, 14, 30, 45, 500); // June 15, 2024 14:30:45.500
    const date2 = new Date(2024, 5, 15, 14, 30, 45, 100); // June 15, 2024 14:30:45.100
    expect(diffMilliseconds(date1, date2)).toBe(400);
  });

  it("returns 0 for identical timestamps", () => {
    const date1 = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
    const date2 = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
    expect(diffMilliseconds(date1, date2)).toBe(0);
  });

  it("handles second boundaries", () => {
    const date1 = new Date(2024, 5, 15, 14, 30, 46, 0); // June 15, 2024 14:30:46.000
    const date2 = new Date(2024, 5, 15, 14, 30, 45, 0); // June 15, 2024 14:30:45.000
    expect(diffMilliseconds(date1, date2)).toBe(1000);
  });

  it("returns negative value when dateLeft is before dateRight", () => {
    const date1 = new Date(2024, 5, 15, 14, 30, 45, 100); // June 15, 2024 14:30:45.100
    const date2 = new Date(2024, 5, 15, 14, 30, 45, 500); // June 15, 2024 14:30:45.500
    expect(diffMilliseconds(date1, date2)).toBe(-400);
  });

  it("handles minute boundaries", () => {
    const date1 = new Date(2024, 5, 15, 14, 31, 0, 250); // June 15, 2024 14:31:00.250
    const date2 = new Date(2024, 5, 15, 14, 30, 59, 750); // June 15, 2024 14:30:59.750
    expect(diffMilliseconds(date1, date2)).toBe(500);
  });

  it("handles hour boundaries", () => {
    const date1 = new Date(2024, 5, 15, 15, 0, 0, 100); // June 15, 2024 15:00:00.100
    const date2 = new Date(2024, 5, 15, 14, 59, 59, 900); // June 15, 2024 14:59:59.900
    expect(diffMilliseconds(date1, date2)).toBe(200);
  });

  it("handles day boundaries", () => {
    const date1 = new Date(2024, 5, 16, 0, 0, 0, 300); // June 16, 2024 00:00:00.300
    const date2 = new Date(2024, 5, 15, 23, 59, 59, 800); // June 15, 2024 23:59:59.800
    expect(diffMilliseconds(date1, date2)).toBe(500);
  });

  it("handles month boundaries", () => {
    const date1 = new Date(2024, 6, 1, 0, 0, 0, 200); // July 1, 2024 00:00:00.200
    const date2 = new Date(2024, 5, 30, 23, 59, 59, 700); // June 30, 2024 23:59:59.700
    expect(diffMilliseconds(date1, date2)).toBe(500);
  });

  it("handles year boundaries", () => {
    const date1 = new Date(2024, 0, 1, 0, 0, 0, 150); // January 1, 2024 00:00:00.150
    const date2 = new Date(2023, 11, 31, 23, 59, 59, 650); // December 31, 2023 23:59:59.650
    expect(diffMilliseconds(date1, date2)).toBe(500);
  });

  it("calculates large millisecond differences", () => {
    const date1 = new Date(2024, 5, 15, 14, 30, 47, 0); // June 15, 2024 14:30:47.000
    const date2 = new Date(2024, 5, 15, 14, 30, 45, 0); // June 15, 2024 14:30:45.000
    expect(diffMilliseconds(date1, date2)).toBe(2000); // 2 seconds
  });

  it("works with all millisecond values", () => {
    const baseDate = new Date(2024, 5, 15, 14, 30, 45, 0);

    for (let ms = 0; ms < 1000; ms += 50) {
      const testDate = new Date(2024, 5, 15, 14, 30, 45, ms);
      expect(diffMilliseconds(testDate, baseDate)).toBe(ms);
    }
  });

  it("handles very precise differences", () => {
    const testCases = [
      { date1: new Date(2024, 5, 15, 14, 30, 45, 1), date2: new Date(2024, 5, 15, 14, 30, 45, 0), expected: 1 },
      { date1: new Date(2024, 5, 15, 14, 30, 45, 999), date2: new Date(2024, 5, 15, 14, 30, 45, 998), expected: 1 },
      { date1: new Date(2024, 5, 15, 14, 30, 45, 500), date2: new Date(2024, 5, 15, 14, 30, 45, 0), expected: 500 },
    ];

    testCases.forEach(({ date1, date2, expected }) => {
      expect(diffMilliseconds(date1, date2)).toBe(expected);
    });
  });

  it("handles Unix epoch and modern timestamps", () => {
    const epoch = new Date(0); // January 1, 1970 00:00:00.000 UTC
    const modern = new Date(2024, 0, 1, 0, 0, 0, 0); // January 1, 2024 00:00:00.000

    // This will be a large number representing years in milliseconds
    const diff = diffMilliseconds(modern, epoch);
    expect(diff).toBeGreaterThan(0);
    expect(diff).toBe(modern.getTime() - epoch.getTime());
  });

  it("is equivalent to getTime() difference", () => {
    const date1 = new Date(2024, 5, 15, 14, 30, 45, 123);
    const date2 = new Date(2024, 3, 10, 8, 15, 20, 456);

    expect(diffMilliseconds(date1, date2)).toBe(date1.getTime() - date2.getTime());
  });

  describe("invalid inputs", () => {
    it("returns NaN when the first date is invalid", () => {
      const invalidDate = new Date("invalid");
      const validDate = new Date(2024, 5, 15, 14, 30, 45, 123);
      expect(diffMilliseconds(invalidDate, validDate)).toBe(NaN);
    });

    it("returns NaN when the second date is invalid", () => {
      const validDate = new Date(2024, 5, 15, 14, 30, 45, 123);
      const invalidDate = new Date("invalid");
      expect(diffMilliseconds(validDate, invalidDate)).toBe(NaN);
    });

    it("returns NaN when both dates are invalid", () => {
      const invalidDate1 = new Date("invalid");
      const invalidDate2 = new Date("also invalid");
      expect(diffMilliseconds(invalidDate1, invalidDate2)).toBe(NaN);
    });

    it("returns NaN when dateLeft is NaN", () => {
      const validDate = new Date(2024, 5, 15, 14, 30, 45, 123);
      expect(diffMilliseconds(NaN, validDate)).toBe(NaN);
    });

    it("returns NaN when dateRight is NaN", () => {
      const validDate = new Date(2024, 5, 15, 14, 30, 45, 123);
      expect(diffMilliseconds(validDate, NaN)).toBe(NaN);
    });

    it("returns NaN when both dates are NaN", () => {
      expect(diffMilliseconds(NaN, NaN)).toBe(NaN);
    });

    it("returns NaN when dateLeft is Infinity", () => {
      const validDate = new Date(2024, 5, 15, 14, 30, 45, 123);
      expect(diffMilliseconds(Infinity, validDate)).toBe(NaN);
    });

    it("returns NaN when dateRight is Infinity", () => {
      const validDate = new Date(2024, 5, 15, 14, 30, 45, 123);
      expect(diffMilliseconds(validDate, Infinity)).toBe(NaN);
    });

    it("returns NaN when dateLeft is -Infinity", () => {
      const validDate = new Date(2024, 5, 15, 14, 30, 45, 123);
      expect(diffMilliseconds(-Infinity, validDate)).toBe(NaN);
    });

    it("returns NaN when dateRight is -Infinity", () => {
      const validDate = new Date(2024, 5, 15, 14, 30, 45, 123);
      expect(diffMilliseconds(validDate, -Infinity)).toBe(NaN);
    });
  });
});