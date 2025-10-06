import { describe, it, expect } from "vitest";
import { getHours } from "../src";

describe("getHours", () => {
  describe("normal cases", () => {
    it.each([
      [new Date(2024, 0, 15, 0, 0, 0), 0],   // Midnight
      [new Date(2024, 0, 15, 12, 0, 0), 12], // Noon
      [new Date(2024, 0, 15, 23, 59, 59), 23], // End of day
      [new Date(2024, 0, 15, 14, 30, 0), 14], // Afternoon
      [new Date(2024, 0, 15, 8, 15, 0), 8],  // Morning
    ])("should return hours from Date object", (date, expected) => {
      expect(getHours(date)).toBe(expected);
    });

    it("should return the local hours", () => {
      // getHours() returns the hours in local timezone
      const date = new Date("2024-01-15T14:30:00.000Z");
      const expected = date.getHours();
      expect(getHours(date)).toBe(expected);
    });
  });

  describe("edge cases", () => {
    it("should handle boundary hours", () => {
      expect(getHours(new Date(2024, 0, 1, 0, 0, 0))).toBe(0);  // Start (midnight)
      expect(getHours(new Date(2024, 0, 1, 23, 59, 59))).toBe(23); // End
      expect(getHours(new Date(2024, 0, 1, 1, 0, 0))).toBe(1);  // First hour
      expect(getHours(new Date(2024, 0, 1, 22, 0, 0))).toBe(22); // Late evening
    });

    it("should handle leap year dates", () => {
      expect(getHours(new Date(2024, 1, 29, 10, 0, 0))).toBe(10); // Leap year
      expect(getHours(new Date(2023, 1, 28, 15, 0, 0))).toBe(15); // Non-leap year
    });
  });

  describe("number input", () => {
    it("should accept timestamp as input", () => {
      const date = new Date(2024, 0, 15, 14, 30, 0);
      const timestamp = date.getTime();
      expect(getHours(timestamp)).toBe(14);
    });

    it("should handle edge timestamp values", () => {
      expect(getHours(0)).toBe(new Date(0).getHours()); // Unix epoch
      expect(getHours(86400000)).toBe(new Date(86400000).getHours()); // Day after epoch
    });
  });

  describe("invalid dates", () => {
    it("should return NaN for invalid dates", () => {
      expect(getHours(new Date("invalid"))).toBeNaN();
      expect(getHours(new Date(""))).toBeNaN();
    });

    it("should return NaN for invalid numbers", () => {
      expect(getHours(NaN)).toBeNaN();
      expect(getHours(Infinity)).toBeNaN();
      expect(getHours(-Infinity)).toBeNaN();
    });
  });
});