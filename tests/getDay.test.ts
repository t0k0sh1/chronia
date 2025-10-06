import { describe, it, expect } from "vitest";
import { getDay } from "../src";

describe("getDay", () => {
  describe("normal cases", () => {
    it.each([
      ["2024-01-01", 1],   // Start of month
      ["2024-01-15", 15],  // Mid month
      ["2024-01-31", 31],  // End of month
      ["2024-02-29", 29],  // Leap day
      ["2024-12-31", 31],  // End of year
    ])("should return day %s -> %i", (dateStr, expected) => {
      const date = new Date(dateStr);
      expect(getDay(date)).toBe(expected);
    });

    it("should return the local date", () => {
      // getDate() returns the day in local timezone
      const date = new Date("2024-01-15T12:00:00.000Z");
      const expected = date.getDate();
      expect(getDay(date)).toBe(expected);
    });
  });

  describe("edge cases", () => {
    it("should handle leap years", () => {
      expect(getDay(new Date("2024-02-29"))).toBe(29); // Leap year
      expect(getDay(new Date("2000-02-29"))).toBe(29); // Leap year (divisible by 400)
      expect(getDay(new Date("2023-02-28"))).toBe(28); // Non-leap year
    });

    it("should handle month boundaries", () => {
      expect(getDay(new Date("2024-01-31"))).toBe(31); // 31-day month
      expect(getDay(new Date("2024-04-30"))).toBe(30); // 30-day month
      expect(getDay(new Date("2024-02-28"))).toBe(28); // February (non-leap)
    });
  });

  describe("historic dates", () => {
    it.each([
      ["1970-01-01", 1],  // Unix epoch
      ["2000-01-01", 1],  // Y2K
      ["0001-01-01", 1],  // Year 1
    ])("should handle historic date %s -> %i", (dateStr, expected) => {
      const date = new Date(dateStr);
      expect(getDay(date)).toBe(expected);
    });
  });

  describe("invalid dates", () => {
    it("should return NaN for invalid dates", () => {
      expect(getDay(new Date("invalid"))).toBeNaN();
      expect(getDay(new Date(""))).toBeNaN();
    });
  });

  describe("number input", () => {
    it("should accept timestamp as input", () => {
      const timestamp = new Date("2024-03-15").getTime();
      expect(getDay(timestamp)).toBe(15);
    });

    it("should handle edge timestamp values", () => {
      expect(getDay(0)).toBe(1); // Unix epoch
      expect(getDay(-86400000)).toBe(31); // Day before Unix epoch
    });
  });
});