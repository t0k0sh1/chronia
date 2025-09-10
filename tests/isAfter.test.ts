import { describe, it, expect } from "vitest";
import { isAfter } from "../src/isAfter";

describe("isAfter", () => {
  describe("millisecond comparison (default)", () => {
    it.each([
      [new Date(2024, 0, 1, 12, 0, 0, 1), new Date(2024, 0, 1, 12, 0, 0, 0), true],
      [new Date(2024, 0, 1, 12, 0, 0, 0), new Date(2024, 0, 1, 12, 0, 0, 1), false],
      [new Date(2024, 0, 1, 12, 0, 0, 0), new Date(2024, 0, 1, 12, 0, 0, 0), false],
    ])("isAfter(%s, %s) should return %s", (a, b, expected) => {
      expect(isAfter(a, b)).toBe(expected);
    });
  });

  describe("year comparison", () => {
    it.each([
      [new Date(2025, 0, 1), new Date(2024, 0, 1), { unit: "year" as const }, true],
      [new Date(2024, 0, 1), new Date(2025, 0, 1), { unit: "year" as const }, false],
      [new Date(2024, 11, 31), new Date(2024, 0, 1), { unit: "year" as const }, false],
      [new Date(2025, 0, 1), new Date(2024, 11, 31), { unit: "year" as const }, true],
    ])("isAfter(%s, %s, %s) should return %s", (a, b, opts, expected) => {
      expect(isAfter(a, b, opts)).toBe(expected);
    });
  });

  describe("month comparison", () => {
    it.each([
      [new Date(2024, 1, 1), new Date(2024, 0, 1), { unit: "month" as const }, true],
      [new Date(2024, 0, 1), new Date(2024, 1, 1), { unit: "month" as const }, false],
      [new Date(2024, 0, 31), new Date(2024, 0, 1), { unit: "month" as const }, false],
      [new Date(2025, 0, 1), new Date(2024, 11, 31), { unit: "month" as const }, true],
    ])("isAfter(%s, %s, %s) should return %s", (a, b, opts, expected) => {
      expect(isAfter(a, b, opts)).toBe(expected);
    });
  });

  describe("day comparison", () => {
    it.each([
      [new Date(2024, 0, 2, 0, 0, 0), new Date(2024, 0, 1, 23, 59, 59), { unit: "day" as const }, true],
      [new Date(2024, 0, 1, 23, 59, 59), new Date(2024, 0, 2, 0, 0, 0), { unit: "day" as const }, false],
      [new Date(2024, 0, 1, 12, 0, 0), new Date(2024, 0, 1, 0, 0, 0), { unit: "day" as const }, false],
      [new Date(2024, 0, 2), new Date(2024, 0, 1), { unit: "day" as const }, true],
    ])("isAfter(%s, %s, %s) should return %s", (a, b, opts, expected) => {
      expect(isAfter(a, b, opts)).toBe(expected);
    });
  });

  describe("hour comparison", () => {
    it.each([
      [new Date(2024, 0, 1, 13, 0, 0), new Date(2024, 0, 1, 12, 59, 59), { unit: "hour" as const }, true],
      [new Date(2024, 0, 1, 12, 59, 59), new Date(2024, 0, 1, 13, 0, 0), { unit: "hour" as const }, false],
      [new Date(2024, 0, 1, 12, 30, 0), new Date(2024, 0, 1, 12, 0, 0), { unit: "hour" as const }, false],
      [new Date(2024, 0, 2, 0, 0, 0), new Date(2024, 0, 1, 23, 59, 59), { unit: "hour" as const }, true],
    ])("isAfter(%s, %s, %s) should return %s", (a, b, opts, expected) => {
      expect(isAfter(a, b, opts)).toBe(expected);
    });
  });

  describe("minute comparison", () => {
    it.each([
      [new Date(2024, 0, 1, 12, 1, 0), new Date(2024, 0, 1, 12, 0, 59), { unit: "minute" as const }, true],
      [new Date(2024, 0, 1, 12, 0, 59), new Date(2024, 0, 1, 12, 1, 0), { unit: "minute" as const }, false],
      [new Date(2024, 0, 1, 12, 0, 30), new Date(2024, 0, 1, 12, 0, 0), { unit: "minute" as const }, false],
      [new Date(2024, 0, 1, 13, 0, 0), new Date(2024, 0, 1, 12, 59, 59), { unit: "minute" as const }, true],
    ])("isAfter(%s, %s, %s) should return %s", (a, b, opts, expected) => {
      expect(isAfter(a, b, opts)).toBe(expected);
    });
  });

  describe("second comparison", () => {
    it.each([
      [new Date(2024, 0, 1, 12, 0, 1, 0), new Date(2024, 0, 1, 12, 0, 0, 999), { unit: "second" as const }, true],
      [new Date(2024, 0, 1, 12, 0, 0, 999), new Date(2024, 0, 1, 12, 0, 1, 0), { unit: "second" as const }, false],
      [new Date(2024, 0, 1, 12, 0, 0, 500), new Date(2024, 0, 1, 12, 0, 0, 0), { unit: "second" as const }, false],
      [new Date(2024, 0, 1, 12, 0, 2), new Date(2024, 0, 1, 12, 0, 1), { unit: "second" as const }, true],
    ])("isAfter(%s, %s, %s) should return %s", (a, b, opts, expected) => {
      expect(isAfter(a, b, opts)).toBe(expected);
    });
  });

  describe("edge cases", () => {
    it("should handle leap year boundaries", () => {
      expect(isAfter(new Date(2024, 2, 1), new Date(2024, 1, 29), { unit: "day" })).toBe(true);
      expect(isAfter(new Date(2024, 1, 29), new Date(2024, 2, 1), { unit: "day" })).toBe(false);
    });

    it("should handle year boundaries", () => {
      expect(isAfter(new Date(2025, 0, 1, 0, 0, 0), new Date(2024, 11, 31, 23, 59, 59))).toBe(true);
      expect(isAfter(new Date(2024, 11, 31, 23, 59, 59), new Date(2025, 0, 1, 0, 0, 0))).toBe(false);
    });

    it("should handle DST transitions", () => {
      const beforeDST = new Date(2024, 2, 10, 1, 59, 59);
      const afterDST = new Date(2024, 2, 10, 3, 0, 0);
      expect(isAfter(afterDST, beforeDST)).toBe(true);
      expect(isAfter(beforeDST, afterDST)).toBe(false);
    });

    it("should handle negative years (BC dates)", () => {
      const date1 = new Date(-100, 0, 1);
      const date2 = new Date(-200, 0, 1);
      expect(isAfter(date1, date2)).toBe(true);
      expect(isAfter(date2, date1)).toBe(false);
    });

    it("should handle same dates", () => {
      const date = new Date(2024, 0, 1, 12, 0, 0, 0);
      expect(isAfter(date, date)).toBe(false);
      expect(isAfter(date, date, { unit: "year" })).toBe(false);
      expect(isAfter(date, date, { unit: "month" })).toBe(false);
      expect(isAfter(date, date, { unit: "day" })).toBe(false);
      expect(isAfter(date, date, { unit: "hour" })).toBe(false);
      expect(isAfter(date, date, { unit: "minute" })).toBe(false);
      expect(isAfter(date, date, { unit: "second" })).toBe(false);
    });
  });
});