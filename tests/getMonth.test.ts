import { describe, it, expect } from "vitest";
import { getMonth } from "../src";

describe("getMonth", () => {
  describe("normal cases", () => {
    it.each([
      ["2024-01-01", 0],  // January (start of year)
      ["2024-06-15", 5],  // June (mid year)
      ["2024-12-31", 11], // December (end of year)
      ["2023-02-15", 1],
      ["2025-11-30", 10],
    ])("should return month %s -> %i", (dateStr, expected) => {
      const date = new Date(dateStr);
      expect(getMonth(date)).toBe(expected);
    });

    it("should return the local month", () => {
      // getMonth() returns the month in local timezone
      const date = new Date("2024-06-15T12:00:00.000Z");
      const expected = date.getMonth();
      expect(getMonth(date)).toBe(expected);
    });
  });

  describe("edge cases", () => {
    it("should handle leap years", () => {
      expect(getMonth(new Date("2024-02-29"))).toBe(1); // Leap year
      expect(getMonth(new Date("2000-02-29"))).toBe(1); // Leap year (divisible by 400)
      expect(getMonth(new Date("2023-02-28"))).toBe(1); // Non-leap year
      expect(getMonth(new Date("1900-02-28"))).toBe(1); // Non-leap year (divisible by 100 but not 400)
    });

    it("should handle all twelve months", () => {
      for (let month = 0; month < 12; month++) {
        const date = new Date(2024, month, 15);
        expect(getMonth(date)).toBe(month);
      }
    });
  });

  describe("historic dates", () => {
    it.each([
      ["1970-01-01", 0],  // Unix epoch
      ["1776-07-04", 6],  // US Independence
      ["0001-01-01", 0],  // Year 1
      ["0001-12-31", 11], // Year 1, December
    ])("should handle historic date %s -> %i", (dateStr, expected) => {
      const date = new Date(dateStr);
      expect(getMonth(date)).toBe(expected);
    });
  });

  describe("future dates", () => {
    it.each([
      ["2030-01-01", 0],
      ["2050-06-15", 5],
      ["2999-12-31", 11],
    ])("should handle future date %s -> %i", (dateStr, expected) => {
      const date = new Date(dateStr);
      expect(getMonth(date)).toBe(expected);
    });
  });

  describe("invalid dates", () => {
    it("should return NaN for invalid dates", () => {
      expect(getMonth(new Date("invalid"))).toBeNaN();
      expect(getMonth(new Date(""))).toBeNaN();
    });
  });

  describe("number input", () => {
    it("should accept timestamp as input", () => {
      const timestamp = new Date("2024-08-15").getTime();
      expect(getMonth(timestamp)).toBe(7);
    });

    it("should handle edge timestamp values", () => {
      expect(getMonth(0)).toBe(0); // Unix epoch (January 1970)
      expect(getMonth(-86400000)).toBe(11); // Day before Unix epoch (December 1969)
      expect(getMonth(86400000)).toBe(0); // Day after Unix epoch start
    });

    it("should handle various months via timestamp", () => {
      for (let month = 0; month < 12; month++) {
        const date = new Date(2024, month, 15);
        const timestamp = date.getTime();
        expect(getMonth(timestamp)).toBe(month);
      }
    });
  });

  describe("negative years (BC dates)", () => {
    it("should handle BC dates", () => {
      // Note: JavaScript Date can handle negative years (BC dates)
      const bcDate = new Date();
      bcDate.setFullYear(-100, 5, 15); // 100 BC, June
      expect(getMonth(bcDate)).toBe(5);

      const bcDate2 = new Date();
      bcDate2.setFullYear(-1, 11, 25); // 1 BC, December
      expect(getMonth(bcDate2)).toBe(11);
    });
  });
});