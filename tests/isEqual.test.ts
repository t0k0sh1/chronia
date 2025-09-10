import { describe, it, expect } from "vitest";
import { isEqual } from "../src/isEqual";

describe("isEqual", () => {
  describe("millisecond comparison (default)", () => {
    it.each([
      [new Date(2024, 0, 1, 12, 0, 0, 0), new Date(2024, 0, 1, 12, 0, 0, 0), true],
      [new Date(2024, 0, 1, 12, 0, 0, 1), new Date(2024, 0, 1, 12, 0, 0, 0), false],
      [new Date(2024, 0, 1, 12, 0, 0, 0), new Date(2024, 0, 1, 12, 0, 0, 1), false],
      [new Date(2024, 0, 1), new Date(2024, 0, 2), false],
    ])("isEqual(%s, %s) should return %s", (a, b, expected) => {
      expect(isEqual(a, b)).toBe(expected);
    });
  });

  describe("year comparison", () => {
    it.each([
      [new Date(2024, 0, 1), new Date(2024, 11, 31), { unit: "year" as const }, true],
      [new Date(2024, 5, 15), new Date(2024, 0, 1), { unit: "year" as const }, true],
      [new Date(2024, 0, 1), new Date(2025, 0, 1), { unit: "year" as const }, false],
      [new Date(2025, 0, 1), new Date(2024, 0, 1), { unit: "year" as const }, false],
      [new Date(2024, 11, 31, 23, 59, 59), new Date(2024, 0, 1, 0, 0, 0), { unit: "year" as const }, true],
    ])("isEqual(%s, %s, %s) should return %s", (a, b, opts, expected) => {
      expect(isEqual(a, b, opts)).toBe(expected);
    });
  });

  describe("month comparison", () => {
    it.each([
      [new Date(2024, 0, 1), new Date(2024, 0, 31), { unit: "month" as const }, true],
      [new Date(2024, 0, 15), new Date(2024, 0, 1), { unit: "month" as const }, true],
      [new Date(2024, 0, 1), new Date(2024, 1, 1), { unit: "month" as const }, false],
      [new Date(2024, 1, 1), new Date(2024, 0, 1), { unit: "month" as const }, false],
      [new Date(2024, 0, 31, 23, 59, 59), new Date(2024, 0, 1, 0, 0, 0), { unit: "month" as const }, true],
      [new Date(2025, 0, 1), new Date(2024, 0, 1), { unit: "month" as const }, false],
    ])("isEqual(%s, %s, %s) should return %s", (a, b, opts, expected) => {
      expect(isEqual(a, b, opts)).toBe(expected);
    });
  });

  describe("day comparison", () => {
    it.each([
      [new Date(2024, 0, 1, 0, 0, 0), new Date(2024, 0, 1, 23, 59, 59), { unit: "day" as const }, true],
      [new Date(2024, 0, 1, 12, 0, 0), new Date(2024, 0, 1, 6, 0, 0), { unit: "day" as const }, true],
      [new Date(2024, 0, 1), new Date(2024, 0, 2), { unit: "day" as const }, false],
      [new Date(2024, 0, 2), new Date(2024, 0, 1), { unit: "day" as const }, false],
      [new Date(2024, 0, 1, 23, 59, 59, 999), new Date(2024, 0, 1, 0, 0, 0, 0), { unit: "day" as const }, true],
    ])("isEqual(%s, %s, %s) should return %s", (a, b, opts, expected) => {
      expect(isEqual(a, b, opts)).toBe(expected);
    });
  });

  describe("hour comparison", () => {
    it.each([
      [new Date(2024, 0, 1, 12, 0, 0), new Date(2024, 0, 1, 12, 59, 59), { unit: "hour" as const }, true],
      [new Date(2024, 0, 1, 12, 30, 0), new Date(2024, 0, 1, 12, 0, 0), { unit: "hour" as const }, true],
      [new Date(2024, 0, 1, 12, 0, 0), new Date(2024, 0, 1, 13, 0, 0), { unit: "hour" as const }, false],
      [new Date(2024, 0, 1, 13, 0, 0), new Date(2024, 0, 1, 12, 0, 0), { unit: "hour" as const }, false],
      [new Date(2024, 0, 1, 12, 59, 59, 999), new Date(2024, 0, 1, 12, 0, 0, 0), { unit: "hour" as const }, true],
    ])("isEqual(%s, %s, %s) should return %s", (a, b, opts, expected) => {
      expect(isEqual(a, b, opts)).toBe(expected);
    });
  });

  describe("minute comparison", () => {
    it.each([
      [new Date(2024, 0, 1, 12, 0, 0), new Date(2024, 0, 1, 12, 0, 59), { unit: "minute" as const }, true],
      [new Date(2024, 0, 1, 12, 0, 30), new Date(2024, 0, 1, 12, 0, 0), { unit: "minute" as const }, true],
      [new Date(2024, 0, 1, 12, 0, 0), new Date(2024, 0, 1, 12, 1, 0), { unit: "minute" as const }, false],
      [new Date(2024, 0, 1, 12, 1, 0), new Date(2024, 0, 1, 12, 0, 0), { unit: "minute" as const }, false],
      [new Date(2024, 0, 1, 12, 0, 59, 999), new Date(2024, 0, 1, 12, 0, 0, 0), { unit: "minute" as const }, true],
    ])("isEqual(%s, %s, %s) should return %s", (a, b, opts, expected) => {
      expect(isEqual(a, b, opts)).toBe(expected);
    });
  });

  describe("second comparison", () => {
    it.each([
      [new Date(2024, 0, 1, 12, 0, 0, 0), new Date(2024, 0, 1, 12, 0, 0, 999), { unit: "second" as const }, true],
      [new Date(2024, 0, 1, 12, 0, 0, 500), new Date(2024, 0, 1, 12, 0, 0, 0), { unit: "second" as const }, true],
      [new Date(2024, 0, 1, 12, 0, 0, 0), new Date(2024, 0, 1, 12, 0, 1, 0), { unit: "second" as const }, false],
      [new Date(2024, 0, 1, 12, 0, 1, 0), new Date(2024, 0, 1, 12, 0, 0, 0), { unit: "second" as const }, false],
      [new Date(2024, 0, 1, 12, 0, 0, 999), new Date(2024, 0, 1, 12, 0, 0, 0), { unit: "second" as const }, true],
    ])("isEqual(%s, %s, %s) should return %s", (a, b, opts, expected) => {
      expect(isEqual(a, b, opts)).toBe(expected);
    });
  });

  describe("edge cases", () => {
    it("should handle identical dates", () => {
      const date = new Date(2024, 0, 1, 12, 0, 0, 0);
      expect(isEqual(date, date)).toBe(true);
      expect(isEqual(date, date, { unit: "year" })).toBe(true);
      expect(isEqual(date, date, { unit: "month" })).toBe(true);
      expect(isEqual(date, date, { unit: "day" })).toBe(true);
      expect(isEqual(date, date, { unit: "hour" })).toBe(true);
      expect(isEqual(date, date, { unit: "minute" })).toBe(true);
      expect(isEqual(date, date, { unit: "second" })).toBe(true);
    });

    it("should handle leap year boundaries", () => {
      expect(isEqual(new Date(2024, 1, 29), new Date(2024, 1, 29), { unit: "day" })).toBe(true);
      expect(isEqual(new Date(2024, 1, 29), new Date(2024, 2, 1), { unit: "day" })).toBe(false);
      expect(isEqual(new Date(2024, 1, 29), new Date(2023, 1, 28), { unit: "day" })).toBe(false);
    });

    it("should handle year boundaries", () => {
      expect(isEqual(new Date(2024, 11, 31, 23, 59, 59), new Date(2025, 0, 1, 0, 0, 0))).toBe(false);
      expect(isEqual(new Date(2024, 11, 31), new Date(2025, 0, 1), { unit: "year" })).toBe(false);
      expect(isEqual(new Date(2024, 11, 31), new Date(2024, 0, 1), { unit: "year" })).toBe(true);
    });

    it("should handle DST transitions", () => {
      const beforeDST = new Date(2024, 2, 10, 1, 59, 59);
      const afterDST = new Date(2024, 2, 10, 3, 0, 0);
      expect(isEqual(beforeDST, afterDST)).toBe(false);
      expect(isEqual(beforeDST, afterDST, { unit: "day" })).toBe(true);
    });

    it("should handle negative years (BC dates)", () => {
      const date1 = new Date(-100, 0, 1);
      const date2 = new Date(-100, 0, 1);
      const date3 = new Date(-200, 0, 1);
      expect(isEqual(date1, date2)).toBe(true);
      expect(isEqual(date1, date3)).toBe(false);
      expect(isEqual(date1, date3, { unit: "year" })).toBe(false);
    });

    it("should handle dates created from same timestamp", () => {
      const timestamp = 1704067200000; // 2024-01-01 00:00:00 UTC
      const date1 = new Date(timestamp);
      const date2 = new Date(timestamp);
      expect(isEqual(date1, date2)).toBe(true);
      expect(isEqual(date1, date2, { unit: "year" })).toBe(true);
      expect(isEqual(date1, date2, { unit: "month" })).toBe(true);
      expect(isEqual(date1, date2, { unit: "day" })).toBe(true);
      expect(isEqual(date1, date2, { unit: "hour" })).toBe(true);
      expect(isEqual(date1, date2, { unit: "minute" })).toBe(true);
      expect(isEqual(date1, date2, { unit: "second" })).toBe(true);
    });
  });
});