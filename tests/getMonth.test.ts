import { describe, it, expect } from "vitest";
import { getMonth } from "../src";

describe("getMonth", () => {
  describe("normal cases", () => {
    it.each([
      ["2024-01-01", 1],  // January = 1
      ["2024-02-15", 2],  // February = 2
      ["2024-03-31", 3],  // March = 3
      ["2024-04-30", 4],  // April = 4
      ["2024-05-15", 5],  // May = 5
      ["2024-06-30", 6],  // June = 6
      ["2024-07-31", 7],  // July = 7
      ["2024-08-15", 8],  // August = 8
      ["2024-09-30", 9],  // September = 9
      ["2024-10-31", 10], // October = 10
      ["2024-11-30", 11], // November = 11
      ["2024-12-25", 12], // December = 12
    ])("should return month %s -> %i", (dateStr, expected) => {
      const date = new Date(dateStr);
      expect(getMonth(date)).toBe(expected);
    });
  });

  describe("boundary values", () => {
    it.each([
      ["2024-01-01", 1],  // First day of January
      ["2024-01-31", 1],  // Last day of January
      ["2024-12-01", 12], // First day of December
      ["2024-12-31", 12], // Last day of December
      ["2024-02-29", 2],  // Leap day
      ["2023-02-28", 2],  // Last day of non-leap February
    ])("should handle boundary case %s -> %i", (dateStr, expected) => {
      const date = new Date(dateStr);
      expect(getMonth(date)).toBe(expected);
    });

    it("should return the local month", () => {
      // getMonth() returns the month in local timezone
      const date = new Date("2024-06-15T12:00:00.000Z");
      const expected = date.getMonth() + 1; // Convert 0-based to 1-based
      expect(getMonth(date)).toBe(expected);
    });
  });

  describe("edge cases", () => {
    it("should handle dates at year boundaries", () => {
      expect(getMonth(new Date("2023-12-31"))).toBe(12);
      expect(getMonth(new Date("2024-01-01"))).toBe(1);
      expect(getMonth(new Date("2024-12-31"))).toBe(12);
      expect(getMonth(new Date("2025-01-01"))).toBe(1);
    });

    it("should handle different time of day", () => {
      expect(getMonth(new Date("2024-03-15T00:00:00"))).toBe(3);
      expect(getMonth(new Date("2024-03-15T12:00:00"))).toBe(3);
      expect(getMonth(new Date("2024-03-15T23:59:59"))).toBe(3);
    });

    it("should handle dates in different timezones consistently", () => {
      const date = new Date("2024-07-15T12:00:00.000Z");
      const expected = date.getMonth() + 1; // Convert to 1-based
      expect(getMonth(date)).toBe(expected);
    });
  });

  describe("historic dates", () => {
    it.each([
      ["1900-01-15", 1],
      ["1900-12-31", 12],
      ["1970-01-01", 1],  // Unix epoch
      ["1999-12-31", 12], // Before Y2K
      ["2000-01-01", 1],  // Y2K
      ["0001-01-01", 1],  // Year 1
      ["0001-12-31", 12], // Year 1, December
    ])("should handle historic date %s -> %i", (dateStr, expected) => {
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
      expect(getMonth(timestamp)).toBe(8);
    });

    it("should handle edge timestamp values", () => {
      expect(getMonth(0)).toBe(1); // Unix epoch (January 1970)
      expect(getMonth(-86400000)).toBe(12); // Day before Unix epoch (December 1969)
    });

    it("should handle all months via timestamp", () => {
      for (let month = 1; month <= 12; month++) {
        const date = new Date(2024, month - 1, 15); // month - 1 because Date constructor uses 0-based months
        const timestamp = date.getTime();
        expect(getMonth(timestamp)).toBe(month);
      }
    });
  });
});