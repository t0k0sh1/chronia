import { describe, it, expect } from "vitest";
import { isAfterOrEqual } from "../src/isAfterOrEqual";

describe("isAfterOrEqual", () => {
  describe("millisecond comparison (default)", () => {
    it.each([
      [new Date(2024, 0, 1, 12, 0, 0, 1), new Date(2024, 0, 1, 12, 0, 0, 0), true],
      [new Date(2024, 0, 1, 12, 0, 0, 0), new Date(2024, 0, 1, 12, 0, 0, 1), false],
      [new Date(2024, 0, 1, 12, 0, 0, 0), new Date(2024, 0, 1, 12, 0, 0, 0), true],
      [new Date(2024, 0, 2), new Date(2024, 0, 1), true],
      [new Date(2024, 0, 1), new Date(2024, 0, 2), false],
    ])("isAfterOrEqual(%s, %s) should return %s", (a, b, expected) => {
      expect(isAfterOrEqual(a, b)).toBe(expected);
    });
  });

  describe("year comparison", () => {
    it.each([
      [new Date(2025, 0, 1), new Date(2024, 0, 1), { unit: "year" as const }, true],
      [new Date(2024, 0, 1), new Date(2025, 0, 1), { unit: "year" as const }, false],
      [new Date(2024, 11, 31), new Date(2024, 0, 1), { unit: "year" as const }, true],
      [new Date(2024, 0, 1), new Date(2024, 11, 31), { unit: "year" as const }, true],
      [new Date(2025, 0, 1), new Date(2024, 11, 31), { unit: "year" as const }, true],
    ])("isAfterOrEqual(%s, %s, %s) should return %s", (a, b, opts, expected) => {
      expect(isAfterOrEqual(a, b, opts)).toBe(expected);
    });
  });

  describe("month comparison", () => {
    it.each([
      [new Date(2024, 1, 1), new Date(2024, 0, 1), { unit: "month" as const }, true],
      [new Date(2024, 0, 1), new Date(2024, 1, 1), { unit: "month" as const }, false],
      [new Date(2024, 0, 31), new Date(2024, 0, 1), { unit: "month" as const }, true],
      [new Date(2024, 0, 1), new Date(2024, 0, 31), { unit: "month" as const }, true],
      [new Date(2025, 0, 1), new Date(2024, 11, 31), { unit: "month" as const }, true],
      [new Date(2024, 0, 16), new Date(2024, 0, 15), { unit: "month" as const }, true],
    ])("isAfterOrEqual(%s, %s, %s) should return %s", (a, b, opts, expected) => {
      expect(isAfterOrEqual(a, b, opts)).toBe(expected);
    });
  });

  describe("day comparison", () => {
    it.each([
      [new Date(2024, 0, 2, 0, 0, 0), new Date(2024, 0, 1, 0, 0, 0), { unit: "day" as const }, true],
      [new Date(2024, 0, 1, 23, 59, 59), new Date(2024, 0, 2, 0, 0, 0), { unit: "day" as const }, false],
      [new Date(2024, 0, 1, 12, 0, 0), new Date(2024, 0, 1, 0, 0, 0), { unit: "day" as const }, true],
      [new Date(2024, 0, 1, 23, 59, 59), new Date(2024, 0, 1, 0, 0, 0), { unit: "day" as const }, true],
      [new Date(2024, 0, 2), new Date(2024, 0, 1), { unit: "day" as const }, true],
    ])("isAfterOrEqual(%s, %s, %s) should return %s", (a, b, opts, expected) => {
      expect(isAfterOrEqual(a, b, opts)).toBe(expected);
    });
  });

  describe("hour comparison", () => {
    it.each([
      [new Date(2024, 0, 1, 13, 0, 0), new Date(2024, 0, 1, 12, 0, 0), { unit: "hour" as const }, true],
      [new Date(2024, 0, 1, 12, 59, 59), new Date(2024, 0, 1, 13, 0, 0), { unit: "hour" as const }, false],
      [new Date(2024, 0, 1, 12, 30, 0), new Date(2024, 0, 1, 12, 0, 0), { unit: "hour" as const }, true],
      [new Date(2024, 0, 1, 12, 59, 59), new Date(2024, 0, 1, 12, 0, 0), { unit: "hour" as const }, true],
      [new Date(2024, 0, 1, 13, 0, 0), new Date(2024, 0, 1, 12, 59, 59), { unit: "hour" as const }, true],
    ])("isAfterOrEqual(%s, %s, %s) should return %s", (a, b, opts, expected) => {
      expect(isAfterOrEqual(a, b, opts)).toBe(expected);
    });
  });

  describe("minute comparison", () => {
    it.each([
      [new Date(2024, 0, 1, 12, 1, 0), new Date(2024, 0, 1, 12, 0, 0), { unit: "minute" as const }, true],
      [new Date(2024, 0, 1, 12, 0, 59), new Date(2024, 0, 1, 12, 1, 0), { unit: "minute" as const }, false],
      [new Date(2024, 0, 1, 12, 0, 30), new Date(2024, 0, 1, 12, 0, 0), { unit: "minute" as const }, true],
      [new Date(2024, 0, 1, 12, 0, 59), new Date(2024, 0, 1, 12, 0, 0), { unit: "minute" as const }, true],
      [new Date(2024, 0, 1, 12, 1, 0), new Date(2024, 0, 1, 12, 0, 59), { unit: "minute" as const }, true],
    ])("isAfterOrEqual(%s, %s, %s) should return %s", (a, b, opts, expected) => {
      expect(isAfterOrEqual(a, b, opts)).toBe(expected);
    });
  });

  describe("second comparison", () => {
    it.each([
      [new Date(2024, 0, 1, 12, 0, 1, 0), new Date(2024, 0, 1, 12, 0, 0, 0), { unit: "second" as const }, true],
      [new Date(2024, 0, 1, 12, 0, 0, 999), new Date(2024, 0, 1, 12, 0, 1, 0), { unit: "second" as const }, false],
      [new Date(2024, 0, 1, 12, 0, 0, 500), new Date(2024, 0, 1, 12, 0, 0, 0), { unit: "second" as const }, true],
      [new Date(2024, 0, 1, 12, 0, 0, 999), new Date(2024, 0, 1, 12, 0, 0, 0), { unit: "second" as const }, true],
      [new Date(2024, 0, 1, 12, 0, 1, 0), new Date(2024, 0, 1, 12, 0, 0, 999), { unit: "second" as const }, true],
    ])("isAfterOrEqual(%s, %s, %s) should return %s", (a, b, opts, expected) => {
      expect(isAfterOrEqual(a, b, opts)).toBe(expected);
    });
  });

  describe("edge cases", () => {
    it("should handle same dates as equal", () => {
      const date = new Date(2024, 0, 1, 12, 0, 0, 0);
      expect(isAfterOrEqual(date, date)).toBe(true);
      expect(isAfterOrEqual(date, date, { unit: "year" })).toBe(true);
      expect(isAfterOrEqual(date, date, { unit: "month" })).toBe(true);
      expect(isAfterOrEqual(date, date, { unit: "day" })).toBe(true);
      expect(isAfterOrEqual(date, date, { unit: "hour" })).toBe(true);
      expect(isAfterOrEqual(date, date, { unit: "minute" })).toBe(true);
      expect(isAfterOrEqual(date, date, { unit: "second" })).toBe(true);
    });

    it("should handle leap year boundaries", () => {
      expect(isAfterOrEqual(new Date(2024, 2, 1), new Date(2024, 1, 29), { unit: "day" })).toBe(true);
      expect(isAfterOrEqual(new Date(2024, 1, 29), new Date(2024, 2, 1), { unit: "day" })).toBe(false);
      expect(isAfterOrEqual(new Date(2024, 1, 29), new Date(2024, 1, 28), { unit: "day" })).toBe(true);
    });

    it("should handle year boundaries", () => {
      expect(isAfterOrEqual(new Date(2025, 0, 1, 0, 0, 0), new Date(2024, 11, 31, 23, 59, 59))).toBe(true);
      expect(isAfterOrEqual(new Date(2024, 11, 31, 23, 59, 59), new Date(2025, 0, 1, 0, 0, 0))).toBe(false);
      expect(isAfterOrEqual(new Date(2024, 11, 31), new Date(2024, 11, 31), { unit: "day" })).toBe(true);
    });

    it("should handle DST transitions", () => {
      const beforeDST = new Date(2024, 2, 10, 1, 59, 59);
      const afterDST = new Date(2024, 2, 10, 3, 0, 0);
      expect(isAfterOrEqual(afterDST, beforeDST)).toBe(true);
      expect(isAfterOrEqual(beforeDST, afterDST)).toBe(false);
      expect(isAfterOrEqual(beforeDST, afterDST, { unit: "day" })).toBe(true);
      expect(isAfterOrEqual(afterDST, beforeDST, { unit: "day" })).toBe(true);
    });

    it("should handle negative years (BC dates)", () => {
      const date1 = new Date(-100, 0, 1);
      const date2 = new Date(-200, 0, 1);
      expect(isAfterOrEqual(date1, date2)).toBe(true);
      expect(isAfterOrEqual(date2, date1)).toBe(false);
      expect(isAfterOrEqual(date1, date1)).toBe(true);
    });

    it("should handle dates created from same timestamp", () => {
      const timestamp = 1704067200000; // 2024-01-01 00:00:00 UTC
      const date1 = new Date(timestamp);
      const date2 = new Date(timestamp);
      expect(isAfterOrEqual(date1, date2)).toBe(true);
      expect(isAfterOrEqual(date2, date1)).toBe(true);
    });

    it("should handle boundary values correctly", () => {
      const date1 = new Date(2024, 0, 1, 0, 0, 0, 0);
      const date2 = new Date(2024, 0, 1, 0, 0, 0, 1);
      expect(isAfterOrEqual(date2, date1)).toBe(true);
      expect(isAfterOrEqual(date1, date2)).toBe(false);
      expect(isAfterOrEqual(date1, date2, { unit: "second" })).toBe(true);
      expect(isAfterOrEqual(date2, date1, { unit: "second" })).toBe(true);
    });
  });
});