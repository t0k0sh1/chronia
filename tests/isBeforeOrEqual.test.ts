import { describe, it, expect } from "vitest";
import { isBeforeOrEqual } from "../src/isBeforeOrEqual";

describe("isBeforeOrEqual", () => {
  describe("millisecond comparison (default)", () => {
    it.each([
      [new Date(2024, 0, 1, 12, 0, 0, 0), new Date(2024, 0, 1, 12, 0, 0, 1), true],
      [new Date(2024, 0, 1, 12, 0, 0, 1), new Date(2024, 0, 1, 12, 0, 0, 0), false],
      [new Date(2024, 0, 1, 12, 0, 0, 0), new Date(2024, 0, 1, 12, 0, 0, 0), true],
      [new Date(2024, 0, 1), new Date(2024, 0, 2), true],
      [new Date(2024, 0, 2), new Date(2024, 0, 1), false],
    ])("isBeforeOrEqual(%s, %s) should return %s", (a, b, expected) => {
      expect(isBeforeOrEqual(a, b)).toBe(expected);
    });
  });

  describe("year comparison", () => {
    it.each([
      [new Date(2024, 0, 1), new Date(2025, 0, 1), { unit: "year" as const }, true],
      [new Date(2025, 0, 1), new Date(2024, 0, 1), { unit: "year" as const }, false],
      [new Date(2024, 11, 31), new Date(2024, 0, 1), { unit: "year" as const }, true],
      [new Date(2024, 0, 1), new Date(2024, 11, 31), { unit: "year" as const }, true],
      [new Date(2023, 11, 31), new Date(2024, 0, 1), { unit: "year" as const }, true],
    ])("isBeforeOrEqual(%s, %s, %s) should return %s", (a, b, opts, expected) => {
      expect(isBeforeOrEqual(a, b, opts)).toBe(expected);
    });
  });

  describe("month comparison", () => {
    it.each([
      [new Date(2024, 0, 1), new Date(2024, 1, 1), { unit: "month" as const }, true],
      [new Date(2024, 1, 1), new Date(2024, 0, 1), { unit: "month" as const }, false],
      [new Date(2024, 0, 31), new Date(2024, 0, 1), { unit: "month" as const }, true],
      [new Date(2024, 0, 1), new Date(2024, 0, 31), { unit: "month" as const }, true],
      [new Date(2023, 11, 31), new Date(2024, 0, 1), { unit: "month" as const }, true],
      [new Date(2024, 0, 15), new Date(2024, 0, 16), { unit: "month" as const }, true],
    ])("isBeforeOrEqual(%s, %s, %s) should return %s", (a, b, opts, expected) => {
      expect(isBeforeOrEqual(a, b, opts)).toBe(expected);
    });
  });

  describe("day comparison", () => {
    it.each([
      [new Date(2024, 0, 1, 0, 0, 0), new Date(2024, 0, 2, 0, 0, 0), { unit: "day" as const }, true],
      [new Date(2024, 0, 2, 0, 0, 0), new Date(2024, 0, 1, 23, 59, 59), { unit: "day" as const }, false],
      [new Date(2024, 0, 1, 12, 0, 0), new Date(2024, 0, 1, 0, 0, 0), { unit: "day" as const }, true],
      [new Date(2024, 0, 1, 23, 59, 59), new Date(2024, 0, 1, 0, 0, 0), { unit: "day" as const }, true],
      [new Date(2024, 0, 1), new Date(2024, 0, 2), { unit: "day" as const }, true],
    ])("isBeforeOrEqual(%s, %s, %s) should return %s", (a, b, opts, expected) => {
      expect(isBeforeOrEqual(a, b, opts)).toBe(expected);
    });
  });

  describe("hour comparison", () => {
    it.each([
      [new Date(2024, 0, 1, 12, 0, 0), new Date(2024, 0, 1, 13, 0, 0), { unit: "hour" as const }, true],
      [new Date(2024, 0, 1, 13, 0, 0), new Date(2024, 0, 1, 12, 59, 59), { unit: "hour" as const }, false],
      [new Date(2024, 0, 1, 12, 30, 0), new Date(2024, 0, 1, 12, 0, 0), { unit: "hour" as const }, true],
      [new Date(2024, 0, 1, 12, 59, 59), new Date(2024, 0, 1, 12, 0, 0), { unit: "hour" as const }, true],
      [new Date(2024, 0, 1, 11, 59, 59), new Date(2024, 0, 1, 12, 0, 0), { unit: "hour" as const }, true],
    ])("isBeforeOrEqual(%s, %s, %s) should return %s", (a, b, opts, expected) => {
      expect(isBeforeOrEqual(a, b, opts)).toBe(expected);
    });
  });

  describe("minute comparison", () => {
    it.each([
      [new Date(2024, 0, 1, 12, 0, 0), new Date(2024, 0, 1, 12, 1, 0), { unit: "minute" as const }, true],
      [new Date(2024, 0, 1, 12, 1, 0), new Date(2024, 0, 1, 12, 0, 59), { unit: "minute" as const }, false],
      [new Date(2024, 0, 1, 12, 0, 30), new Date(2024, 0, 1, 12, 0, 0), { unit: "minute" as const }, true],
      [new Date(2024, 0, 1, 12, 0, 59), new Date(2024, 0, 1, 12, 0, 0), { unit: "minute" as const }, true],
      [new Date(2024, 0, 1, 11, 59, 59), new Date(2024, 0, 1, 12, 0, 0), { unit: "minute" as const }, true],
    ])("isBeforeOrEqual(%s, %s, %s) should return %s", (a, b, opts, expected) => {
      expect(isBeforeOrEqual(a, b, opts)).toBe(expected);
    });
  });

  describe("second comparison", () => {
    it.each([
      [new Date(2024, 0, 1, 12, 0, 0, 0), new Date(2024, 0, 1, 12, 0, 1, 0), { unit: "second" as const }, true],
      [new Date(2024, 0, 1, 12, 0, 1, 0), new Date(2024, 0, 1, 12, 0, 0, 999), { unit: "second" as const }, false],
      [new Date(2024, 0, 1, 12, 0, 0, 500), new Date(2024, 0, 1, 12, 0, 0, 0), { unit: "second" as const }, true],
      [new Date(2024, 0, 1, 12, 0, 0, 999), new Date(2024, 0, 1, 12, 0, 0, 0), { unit: "second" as const }, true],
      [new Date(2024, 0, 1, 11, 59, 59), new Date(2024, 0, 1, 12, 0, 0), { unit: "second" as const }, true],
    ])("isBeforeOrEqual(%s, %s, %s) should return %s", (a, b, opts, expected) => {
      expect(isBeforeOrEqual(a, b, opts)).toBe(expected);
    });
  });

  describe("edge cases", () => {
    it("should handle same dates as equal", () => {
      const date = new Date(2024, 0, 1, 12, 0, 0, 0);
      expect(isBeforeOrEqual(date, date)).toBe(true);
      expect(isBeforeOrEqual(date, date, { unit: "year" })).toBe(true);
      expect(isBeforeOrEqual(date, date, { unit: "month" })).toBe(true);
      expect(isBeforeOrEqual(date, date, { unit: "day" })).toBe(true);
      expect(isBeforeOrEqual(date, date, { unit: "hour" })).toBe(true);
      expect(isBeforeOrEqual(date, date, { unit: "minute" })).toBe(true);
      expect(isBeforeOrEqual(date, date, { unit: "second" })).toBe(true);
    });

    it("should handle leap year boundaries", () => {
      expect(isBeforeOrEqual(new Date(2024, 1, 29), new Date(2024, 2, 1), { unit: "day" })).toBe(true);
      expect(isBeforeOrEqual(new Date(2024, 2, 1), new Date(2024, 1, 29), { unit: "day" })).toBe(false);
      expect(isBeforeOrEqual(new Date(2024, 1, 28), new Date(2024, 1, 29), { unit: "day" })).toBe(true);
    });

    it("should handle year boundaries", () => {
      expect(isBeforeOrEqual(new Date(2024, 11, 31, 23, 59, 59), new Date(2025, 0, 1, 0, 0, 0))).toBe(true);
      expect(isBeforeOrEqual(new Date(2025, 0, 1, 0, 0, 0), new Date(2024, 11, 31, 23, 59, 59))).toBe(false);
      expect(isBeforeOrEqual(new Date(2024, 11, 31), new Date(2024, 11, 31), { unit: "day" })).toBe(true);
    });

    it("should handle DST transitions", () => {
      const beforeDST = new Date(2024, 2, 10, 1, 59, 59);
      const afterDST = new Date(2024, 2, 10, 3, 0, 0);
      expect(isBeforeOrEqual(beforeDST, afterDST)).toBe(true);
      expect(isBeforeOrEqual(afterDST, beforeDST)).toBe(false);
      expect(isBeforeOrEqual(beforeDST, afterDST, { unit: "day" })).toBe(true);
      expect(isBeforeOrEqual(afterDST, beforeDST, { unit: "day" })).toBe(true);
    });

    it("should handle negative years (BC dates)", () => {
      const date1 = new Date(-100, 0, 1);
      const date2 = new Date(-200, 0, 1);
      expect(isBeforeOrEqual(date2, date1)).toBe(true);
      expect(isBeforeOrEqual(date1, date2)).toBe(false);
      expect(isBeforeOrEqual(date1, date1)).toBe(true);
    });

    it("should handle dates created from same timestamp", () => {
      const timestamp = 1704067200000; // 2024-01-01 00:00:00 UTC
      const date1 = new Date(timestamp);
      const date2 = new Date(timestamp);
      expect(isBeforeOrEqual(date1, date2)).toBe(true);
      expect(isBeforeOrEqual(date2, date1)).toBe(true);
    });

    it("should handle boundary values correctly", () => {
      const date1 = new Date(2024, 0, 1, 0, 0, 0, 0);
      const date2 = new Date(2024, 0, 1, 0, 0, 0, 1);
      expect(isBeforeOrEqual(date1, date2)).toBe(true);
      expect(isBeforeOrEqual(date2, date1)).toBe(false);
      expect(isBeforeOrEqual(date1, date2, { unit: "second" })).toBe(true);
      expect(isBeforeOrEqual(date2, date1, { unit: "second" })).toBe(true);
    });
  });

  describe("invalid input handling", () => {
    it("should return false when first date is invalid", () => {
      expect(isBeforeOrEqual(new Date(NaN), new Date(2024, 0, 1))).toBe(false);
      expect(isBeforeOrEqual(NaN, new Date(2024, 0, 1))).toBe(false);
      expect(isBeforeOrEqual(Infinity, new Date(2024, 0, 1))).toBe(false);
      expect(isBeforeOrEqual(-Infinity, new Date(2024, 0, 1))).toBe(false);
    });

    it("should return false when second date is invalid", () => {
      expect(isBeforeOrEqual(new Date(2024, 0, 1), new Date(NaN))).toBe(false);
      expect(isBeforeOrEqual(new Date(2024, 0, 1), NaN)).toBe(false);
      expect(isBeforeOrEqual(new Date(2024, 0, 1), Infinity)).toBe(false);
      expect(isBeforeOrEqual(new Date(2024, 0, 1), -Infinity)).toBe(false);
    });

    it("should return false when both dates are invalid", () => {
      expect(isBeforeOrEqual(new Date(NaN), new Date(NaN))).toBe(false);
      expect(isBeforeOrEqual(NaN, NaN)).toBe(false);
      expect(isBeforeOrEqual(Infinity, -Infinity)).toBe(false);
    });
  });
});