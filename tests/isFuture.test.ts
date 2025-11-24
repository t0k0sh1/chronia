import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { isFuture } from "../src/isFuture";

describe("isFuture", () => {
  describe("boundary cases", () => {
    const FIXED_TIME = new Date(2025, 0, 15, 12, 0, 0, 0).getTime(); // Jan 15, 2025, 12:00:00.000

    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(FIXED_TIME);
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should return true for date exactly 1ms in the future", () => {
      const future = new Date(FIXED_TIME + 1);
      expect(isFuture(future)).toBe(true);
    });

    it("should return false for date exactly 1ms in the past", () => {
      const past = new Date(FIXED_TIME - 1);
      expect(isFuture(past)).toBe(false);
    });

    it("should return false for date exactly equal to current time", () => {
      const now = new Date(FIXED_TIME);
      expect(isFuture(now)).toBe(false);
    });

    it("should return false when timestamp exactly equals Date.now()", () => {
      expect(isFuture(FIXED_TIME)).toBe(false);
    });

    it("should handle millisecond boundary (exactly midnight)", () => {
      const midnight = new Date(2025, 0, 16, 0, 0, 0, 0).getTime(); // Next day midnight
      vi.setSystemTime(midnight - 1); // 1ms before midnight

      const exactMidnight = new Date(midnight);
      expect(isFuture(exactMidnight)).toBe(true);
    });
  });

  describe("invalid inputs", () => {
    it("should return false for Invalid Date", () => {
      const invalidDate = new Date("invalid string");
      expect(isFuture(invalidDate)).toBe(false);
    });

    it("should return false for NaN", () => {
      expect(isFuture(NaN)).toBe(false);
    });

    it("should return false for Infinity", () => {
      expect(isFuture(Infinity)).toBe(false);
    });

    it("should return false for -Infinity", () => {
      expect(isFuture(-Infinity)).toBe(false);
    });

    it("should return false for wrong type: string", () => {
      // @ts-expect-error Testing runtime behavior with wrong type
      expect(isFuture("2025-01-16")).toBe(false);
    });

    it("should return false for wrong type: object", () => {
      // @ts-expect-error Testing runtime behavior with wrong type
      expect(isFuture({})).toBe(false);
    });

    it("should return false for wrong type: null", () => {
      // @ts-expect-error Testing runtime behavior with wrong type
      expect(isFuture(null)).toBe(false);
    });

    it("should return false for wrong type: undefined", () => {
      // @ts-expect-error Testing runtime behavior with wrong type
      expect(isFuture(undefined)).toBe(false);
    });
  });

  describe("happy path", () => {
    const FIXED_TIME = new Date(2025, 0, 15, 12, 0, 0, 0).getTime();

    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(FIXED_TIME);
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should return true for Date object 1 day in the future", () => {
      const tomorrow = new Date(2025, 0, 16, 12, 0, 0, 0);
      expect(isFuture(tomorrow)).toBe(true);
    });

    it("should return false for Date object 1 day in the past", () => {
      const yesterday = new Date(2025, 0, 14, 12, 0, 0, 0);
      expect(isFuture(yesterday)).toBe(false);
    });

    it("should return true for timestamp in the future", () => {
      const futureTimestamp = FIXED_TIME + 86400000; // +1 day
      expect(isFuture(futureTimestamp)).toBe(true);
    });

    it("should return false for timestamp in the past", () => {
      const pastTimestamp = FIXED_TIME - 86400000; // -1 day
      expect(isFuture(pastTimestamp)).toBe(false);
    });
  });
});
