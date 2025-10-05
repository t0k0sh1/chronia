import { describe, it, expect } from "vitest";
import { getMilliseconds } from "../src";

describe("getMilliseconds", () => {
  describe("normal cases", () => {
    it.each([
      [new Date(2024, 0, 15, 12, 30, 45, 0), 0], // Start of second
      [new Date(2024, 0, 15, 12, 30, 45, 123), 123], // Typical value
      [new Date(2024, 0, 15, 12, 30, 45, 500), 500], // Mid-range
      [new Date(2024, 0, 15, 12, 30, 45, 999), 999], // End of second
    ])("should return milliseconds from %s -> %i", (date, expected) => {
      expect(getMilliseconds(date)).toBe(expected);
    });

    it("should return the local milliseconds", () => {
      // getMilliseconds() returns milliseconds in local timezone
      const date = new Date(Date.UTC(2024, 0, 15, 14, 33, 47, 333));
      const expected = date.getMilliseconds();
      expect(getMilliseconds(date)).toBe(expected);
    });
  });

  describe("edge cases", () => {
    it("should handle boundary values", () => {
      expect(getMilliseconds(new Date(2024, 0, 1, 0, 0, 0, 0))).toBe(0); // Minimum
      expect(getMilliseconds(new Date(2024, 0, 1, 0, 0, 0, 1))).toBe(1); // Just above minimum
      expect(getMilliseconds(new Date(2024, 0, 1, 0, 0, 0, 998))).toBe(998); // Just below maximum
      expect(getMilliseconds(new Date(2024, 0, 1, 0, 0, 0, 999))).toBe(999); // Maximum
    });

    it("should handle milliseconds rollover in timestamps", () => {
      expect(getMilliseconds(0)).toBe(0); // Unix epoch
      expect(getMilliseconds(999)).toBe(999); // Before rollover
      expect(getMilliseconds(1000)).toBe(0); // After rollover
      expect(getMilliseconds(1500)).toBe(500); // Mid-range after rollover
    });
  });

  describe("invalid dates", () => {
    it("should return NaN for invalid dates", () => {
      expect(getMilliseconds(new Date("invalid"))).toBeNaN();
      expect(getMilliseconds(new Date(""))).toBeNaN();
    });
  });

  describe("number input", () => {
    it("should accept timestamp as input", () => {
      const timestamp = new Date(2024, 0, 15, 12, 30, 45, 456).getTime();
      expect(getMilliseconds(timestamp)).toBe(456);
    });

    it("should handle edge timestamp values", () => {
      expect(getMilliseconds(0)).toBe(0); // Unix epoch
      expect(getMilliseconds(123)).toBe(123); // Small timestamp
      expect(getMilliseconds(1705276800999)).toBe(999); // Large timestamp with milliseconds
    });

    it("should return NaN for invalid number inputs", () => {
      expect(getMilliseconds(NaN)).toBeNaN();
      expect(getMilliseconds(Infinity)).toBeNaN();
      expect(getMilliseconds(-Infinity)).toBeNaN();
    });
  });

  describe("negative years (BC dates)", () => {
    it("should handle BC dates", () => {
      // Note: JavaScript Date can handle negative years (BC dates)
      const bcDate = new Date(-100, 0, 1, 10, 45, 33, 666);
      expect(getMilliseconds(bcDate)).toBe(666);
    });
  });
});