import { describe, it, expect } from "vitest";
import { getYear } from "../src";

describe("getYear", () => {
  describe("normal cases", () => {
    it.each([
      ["2024-01-01", 2024], // Start of year
      ["2024-06-15", 2024], // Mid year
      ["2024-12-31", 2024], // End of year
      ["2023-01-01", 2023],
      ["2025-01-01", 2025],
    ])("should return year %s -> %i", (dateStr, expected) => {
      const date = new Date(dateStr);
      expect(getYear(date)).toBe(expected);
    });

    it("should return the local year", () => {
      // getFullYear() returns the year in local timezone
      const date = new Date("2024-01-01T12:00:00.000Z");
      const expected = date.getFullYear();
      expect(getYear(date)).toBe(expected);
    });
  });

  describe("edge cases", () => {
    it("should handle leap years", () => {
      expect(getYear(new Date("2024-02-29"))).toBe(2024); // Leap year
      expect(getYear(new Date("2000-02-29"))).toBe(2000); // Leap year (divisible by 400)
      expect(getYear(new Date("2023-02-28"))).toBe(2023); // Non-leap year
      expect(getYear(new Date("1900-02-28"))).toBe(1900); // Non-leap year (divisible by 100 but not 400)
    });

    it("should handle century and millennium boundaries", () => {
      expect(getYear(new Date("1000-01-01"))).toBe(1000);
      expect(getYear(new Date("1900-01-01"))).toBe(1900);
      expect(getYear(new Date("2000-01-01"))).toBe(2000);
      expect(getYear(new Date("2100-01-01"))).toBe(2100);
      expect(getYear(new Date("3000-01-01"))).toBe(3000);
    });
  });

  describe("historic dates", () => {
    it.each([
      ["1776-07-04", 1776], // US Independence
      ["1492-10-12", 1492], // Columbus
      ["0001-01-01", 1],    // Year 1
      ["0100-01-01", 100],  // Year 100
      ["0500-01-01", 500],  // Year 500
    ])("should handle historic date %s -> %i", (dateStr, expected) => {
      const date = new Date(dateStr);
      expect(getYear(date)).toBe(expected);
    });
  });

  describe("future dates", () => {
    it.each([
      ["2030-01-01", 2030],
      ["2050-12-31", 2050],
      ["2999-12-31", 2999],
    ])("should handle future date %s -> %i", (dateStr, expected) => {
      const date = new Date(dateStr);
      expect(getYear(date)).toBe(expected);
    });
  });

  describe("invalid dates", () => {
    it("should return NaN for invalid dates", () => {
      expect(getYear(new Date("invalid"))).toBeNaN();
      expect(getYear(new Date(""))).toBeNaN();
    });
  });

  describe("number input", () => {
    it("should accept timestamp as input", () => {
      const timestamp = new Date("2024-06-15").getTime();
      expect(getYear(timestamp)).toBe(2024);
    });

    it("should handle edge timestamp values", () => {
      expect(getYear(0)).toBe(1970); // Unix epoch
      expect(getYear(-86400000)).toBe(1969); // Day before Unix epoch
      expect(getYear(86400000)).toBe(1970); // Day after Unix epoch start
    });

    it("should handle various years via timestamp", () => {
      for (let year = 1900; year <= 2100; year += 10) {
        const date = new Date(year, 5, 15); // June 15th of each year
        const timestamp = date.getTime();
        expect(getYear(timestamp)).toBe(year);
      }
    });
  });

  describe("negative years (BC dates)", () => {
    it("should handle BC dates", () => {
      // Note: JavaScript Date can handle negative years (BC dates)
      const bcDate = new Date();
      bcDate.setFullYear(-100); // 100 BC
      expect(getYear(bcDate)).toBe(-100);
      
      const bcDate2 = new Date();
      bcDate2.setFullYear(-1); // 1 BC
      expect(getYear(bcDate2)).toBe(-1);
    });
  });
});