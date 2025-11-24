import { describe, it, expect, vi, afterEach } from "vitest";
import { isPast } from "../src/isPast";

describe("isPast", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  describe("Boundary Cases (Highest Priority)", () => {
    it("should return true for date exactly 1ms in the past", () => {
      const now = new Date("2025-01-15T12:00:00.000Z");
      vi.setSystemTime(now);

      const past = new Date(now.getTime() - 1);
      expect(isPast(past)).toBe(true);
    });

    it("should return false for date exactly 1ms in the future", () => {
      const now = new Date("2025-01-15T12:00:00.000Z");
      vi.setSystemTime(now);

      const future = new Date(now.getTime() + 1);
      expect(isPast(future)).toBe(false);
    });

    it("should return false for date exactly equal to current time (not past, not future)", () => {
      const now = new Date("2025-01-15T12:00:00.000Z");
      vi.setSystemTime(now);

      expect(isPast(now)).toBe(false);
      expect(isPast(now.getTime())).toBe(false);
    });

    it("should handle date at millisecond boundary (exactly midnight)", () => {
      vi.setSystemTime(new Date("2025-01-15T12:00:00.000Z"));
      const midnight = new Date("2025-01-15T00:00:00.000Z");

      expect(isPast(midnight)).toBe(true);
    });

    it("should handle timestamp at millisecond boundary", () => {
      const midnight = new Date("2025-01-15T00:00:00.000Z").getTime();
      vi.setSystemTime(new Date("2025-01-15T12:00:00.000Z"));

      expect(isPast(midnight)).toBe(true);
    });
  });

  describe("Invalid Inputs (High Priority)", () => {
    it("should return false for Invalid Date", () => {
      const now = new Date("2025-01-15T12:00:00.000Z");
      vi.setSystemTime(now);

      expect(isPast(new Date("invalid"))).toBe(false);
    });

    it("should return false for NaN", () => {
      const now = new Date("2025-01-15T12:00:00.000Z");
      vi.setSystemTime(now);

      expect(isPast(NaN)).toBe(false);
    });

    it("should return false for Infinity", () => {
      const now = new Date("2025-01-15T12:00:00.000Z");
      vi.setSystemTime(now);

      expect(isPast(Infinity)).toBe(false);
    });

    it("should return false for -Infinity", () => {
      const now = new Date("2025-01-15T12:00:00.000Z");
      vi.setSystemTime(now);

      expect(isPast(-Infinity)).toBe(false);
    });

    it("should return false for wrong type: string", () => {
      const now = new Date("2025-01-15T12:00:00.000Z");
      vi.setSystemTime(now);

      // @ts-expect-error Testing runtime behavior with wrong type
      expect(isPast("2025-01-14")).toBe(false);
    });

    it("should return false for wrong type: object", () => {
      const now = new Date("2025-01-15T12:00:00.000Z");
      vi.setSystemTime(now);

      // @ts-expect-error Testing runtime behavior with wrong type
      expect(isPast({})).toBe(false);
    });

    it("should return false for wrong type: null", () => {
      const now = new Date("2025-01-15T12:00:00.000Z");
      vi.setSystemTime(now);

      // @ts-expect-error Testing runtime behavior with wrong type
      expect(isPast(null)).toBe(false);
    });

    it("should return false for wrong type: undefined", () => {
      const now = new Date("2025-01-15T12:00:00.000Z");
      vi.setSystemTime(now);

      // @ts-expect-error Testing runtime behavior with wrong type
      expect(isPast(undefined)).toBe(false);
    });
  });

  describe("Happy Path (Minimum Necessary)", () => {
    it("should return true for Date object 1 day in the past", () => {
      const now = new Date("2025-01-15T12:00:00.000Z");
      vi.setSystemTime(now);

      const yesterday = new Date("2025-01-14T12:00:00.000Z");
      expect(isPast(yesterday)).toBe(true);
    });

    it("should return false for Date object 1 day in the future", () => {
      const now = new Date("2025-01-15T12:00:00.000Z");
      vi.setSystemTime(now);

      const tomorrow = new Date("2025-01-16T12:00:00.000Z");
      expect(isPast(tomorrow)).toBe(false);
    });

    it("should return true for timestamp in the past", () => {
      const now = new Date("2025-01-15T12:00:00.000Z");
      vi.setSystemTime(now);

      const pastTimestamp = new Date("2025-01-14T12:00:00.000Z").getTime();
      expect(isPast(pastTimestamp)).toBe(true);
    });

    it("should return false for timestamp in the future", () => {
      const now = new Date("2025-01-15T12:00:00.000Z");
      vi.setSystemTime(now);

      const futureTimestamp = new Date("2025-01-16T12:00:00.000Z").getTime();
      expect(isPast(futureTimestamp)).toBe(false);
    });
  });
});
