import { describe, it, expect } from "vitest";
import { getSeconds } from "../src";

describe("getSeconds", () => {
  describe("normal cases", () => {
    it.each([
      ["2024-01-15T00:00:00", 0], // Start of minute
      ["2024-01-15T12:45:30", 30], // Mid minute
      ["2024-01-15T23:59:59", 59], // End of minute
      ["2024-01-15T01:30:45", 45],
      ["2024-12-31T23:01:15", 15],
    ])("should return seconds %s -> %i", (dateStr, expected) => {
      const date = new Date(dateStr);
      expect(getSeconds(date)).toBe(expected);
    });

    it("should return the local seconds", () => {
      // getSeconds() returns the seconds in local timezone
      const date = new Date("2024-01-01T12:00:45.000Z");
      const expected = date.getSeconds();
      expect(getSeconds(date)).toBe(expected);
    });
  });

  describe("edge cases", () => {
    it("should handle boundary values", () => {
      expect(getSeconds(new Date(2024, 0, 1, 10, 30, 0))).toBe(0); // Start of minute
      expect(getSeconds(new Date(2024, 0, 1, 10, 30, 59))).toBe(59); // End of minute
      expect(getSeconds(new Date(2024, 0, 1, 10, 30, 30))).toBe(30); // Mid minute
    });

    it("should handle dates with milliseconds", () => {
      // Milliseconds should not affect seconds value
      expect(getSeconds(new Date(2024, 0, 1, 10, 30, 45, 0))).toBe(45);
      expect(getSeconds(new Date(2024, 0, 1, 10, 30, 45, 999))).toBe(45);
      expect(getSeconds(new Date(2024, 0, 1, 10, 30, 45, 500))).toBe(45);
    });
  });

  describe("historic dates", () => {
    it.each([
      ["1970-01-01T00:00:00", 0], // Unix epoch
      ["2000-01-01T18:42:42", 42],
      ["1776-07-04T15:30:33", 33], // US Independence
    ])("should handle historic date %s -> %i", (dateStr, expected) => {
      const date = new Date(dateStr);
      expect(getSeconds(date)).toBe(expected);
    });
  });

  describe("future dates", () => {
    it.each([
      ["2030-01-01T10:20:30", 30],
      ["2050-12-31T23:45:55", 55],
      ["2999-12-31T20:15:25", 25],
    ])("should handle future date %s -> %i", (dateStr, expected) => {
      const date = new Date(dateStr);
      expect(getSeconds(date)).toBe(expected);
    });
  });

  describe("invalid dates", () => {
    it("should return NaN for invalid dates", () => {
      expect(getSeconds(new Date("invalid"))).toBeNaN();
      expect(getSeconds(new Date(""))).toBeNaN();
    });
  });

  describe("number input", () => {
    it("should accept timestamp as input", () => {
      const timestamp = new Date("2024-06-15T12:30:45").getTime();
      expect(getSeconds(timestamp)).toBe(45);
    });

    it("should handle edge timestamp values", () => {
      expect(getSeconds(0)).toBe(0); // Unix epoch
      expect(getSeconds(86400000)).toBe(0); // Day after Unix epoch start
      expect(getSeconds(1000)).toBe(1); // 1 second after epoch
    });

    it("should handle various seconds via timestamp", () => {
      for (let sec = 0; sec <= 59; sec += 5) {
        const date = new Date(2024, 0, 1, 10, 30, sec);
        const timestamp = date.getTime();
        expect(getSeconds(timestamp)).toBe(sec);
      }
    });
  });

  describe("negative years (BC dates)", () => {
    it("should handle BC dates", () => {
      // Note: JavaScript Date can handle negative years (BC dates)
      const bcDate = new Date(-100, 0, 1, 10, 45, 33);
      expect(getSeconds(bcDate)).toBe(33);

      const bcDate2 = new Date(-1, 0, 1, 5, 15, 59);
      expect(getSeconds(bcDate2)).toBe(59);
    });
  });
});