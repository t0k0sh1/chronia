import { describe, it, expect } from "vitest";
import { getMinutes } from "../src";

describe("getMinutes", () => {
  describe("normal cases", () => {
    it.each([
      ["2024-01-15T00:00:00", 0], // Start of hour
      ["2024-01-15T12:30:45", 30], // Mid hour
      ["2024-01-15T23:59:59", 59], // End of hour
      ["2024-01-15T15:15:30", 15],
      ["2024-12-31T23:01:00", 1],
    ])("should return minutes %s -> %i", (dateStr, expected) => {
      const date = new Date(dateStr);
      expect(getMinutes(date)).toBe(expected);
    });

    it("should return the local minutes", () => {
      // getMinutes() returns the minutes in local timezone
      const date = new Date("2024-01-15T12:30:00.000Z");
      const expected = date.getMinutes();
      expect(getMinutes(date)).toBe(expected);
    });
  });

  describe("edge cases", () => {
    it("should handle boundary values", () => {
      expect(getMinutes(new Date(2024, 0, 1, 10, 0, 0))).toBe(0); // Start of hour
      expect(getMinutes(new Date(2024, 0, 1, 10, 59, 59))).toBe(59); // End of hour
      expect(getMinutes(new Date(2024, 0, 1, 10, 30, 0))).toBe(30); // Mid hour
    });

    it("should handle leap years", () => {
      expect(getMinutes(new Date("2024-02-29T08:25:00"))).toBe(25); // Leap year
      expect(getMinutes(new Date("2000-02-29T14:42:00"))).toBe(42); // Leap year (divisible by 400)
    });
  });

  describe("historic dates", () => {
    it.each([
      ["1970-01-01T00:00:00", 0], // Unix epoch
      ["2000-01-01T18:42:00", 42],
      ["1776-07-04T10:15:00", 15], // US Independence
    ])("should handle historic date %s -> %i", (dateStr, expected) => {
      const date = new Date(dateStr);
      expect(getMinutes(date)).toBe(expected);
    });
  });

  describe("future dates", () => {
    it.each([
      ["2030-01-01T08:30:00", 30],
      ["2050-12-31T23:45:00", 45],
      ["2999-12-31T12:05:00", 5],
    ])("should handle future date %s -> %i", (dateStr, expected) => {
      const date = new Date(dateStr);
      expect(getMinutes(date)).toBe(expected);
    });
  });

  describe("invalid dates", () => {
    it("should return NaN for invalid dates", () => {
      expect(getMinutes(new Date("invalid"))).toBeNaN();
      expect(getMinutes(new Date(""))).toBeNaN();
    });
  });

  describe("number input", () => {
    it("should accept timestamp as input", () => {
      const timestamp = new Date("2024-06-15T14:30:00").getTime();
      expect(getMinutes(timestamp)).toBe(30);
    });

    it("should handle edge timestamp values", () => {
      expect(getMinutes(0)).toBe(new Date(0).getMinutes()); // Unix epoch
      expect(getMinutes(-86400000)).toBe(new Date(-86400000).getMinutes()); // Day before Unix epoch
      expect(getMinutes(86400000)).toBe(new Date(86400000).getMinutes()); // Day after Unix epoch start
    });
  });

  describe("negative years (BC dates)", () => {
    it("should handle BC dates", () => {
      // Note: JavaScript Date can handle negative years (BC dates)
      const bcDate = new Date();
      bcDate.setFullYear(-100, 0, 1); // 100 BC
      bcDate.setHours(10, 45, 0, 0);
      expect(getMinutes(bcDate)).toBe(45);

      const bcDate2 = new Date();
      bcDate2.setFullYear(-1, 0, 1); // 1 BC
      bcDate2.setHours(15, 20, 0, 0);
      expect(getMinutes(bcDate2)).toBe(20);
    });
  });
});