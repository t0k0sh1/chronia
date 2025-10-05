import { describe, it, expect } from "vitest";
import { getTime } from "../src";

describe("getTime", () => {
  describe("normal cases", () => {
    it.each([
      ["2024-01-01T00:00:00.000Z", 1704067200000], // Start of year
      ["2024-06-15T12:30:45.123Z", new Date("2024-06-15T12:30:45.123Z").getTime()], // With milliseconds
      ["2024-12-31T23:59:59.999Z", new Date("2024-12-31T23:59:59.999Z").getTime()], // End of year
    ])("should return timestamp %s -> %i", (dateStr, expected) => {
      const date = new Date(dateStr);
      expect(getTime(date)).toBe(expected);
    });

    it("should handle Unix epoch", () => {
      expect(getTime(new Date(0))).toBe(0);
    });
  });

  describe("edge cases", () => {
    it("should handle maximum and minimum valid timestamps", () => {
      expect(getTime(new Date(8.64e15))).toBe(8.64e15); // Max valid timestamp
      expect(getTime(new Date(-8.64e15))).toBe(-8.64e15); // Min valid timestamp
    });

    it("should handle negative timestamps (before epoch)", () => {
      expect(getTime(new Date("1969-12-31T00:00:00.000Z"))).toBe(-86400000);
      expect(getTime(new Date(-86400000))).toBe(-86400000);
    });
  });

  describe("invalid dates", () => {
    it("should return NaN for invalid dates", () => {
      expect(getTime(new Date("invalid"))).toBeNaN();
      expect(getTime(new Date(""))).toBeNaN();
      expect(getTime(new Date(NaN))).toBeNaN();
    });
  });

  describe("number input", () => {
    it("should accept timestamp as input", () => {
      const timestamp = new Date("2024-06-15").getTime();
      expect(getTime(timestamp)).toBe(timestamp);
    });

    it("should handle edge timestamp values", () => {
      expect(getTime(0)).toBe(0); // Unix epoch
      expect(getTime(-86400000)).toBe(-86400000); // Day before Unix epoch
      expect(getTime(1704067200000)).toBe(1704067200000); // 2024-01-01
    });

    it("should handle various timestamps", () => {
      for (let year = 1970; year <= 2100; year += 10) {
        const date = new Date(year, 5, 15); // June 15th of each year
        const timestamp = date.getTime();
        expect(getTime(timestamp)).toBe(timestamp);
      }
    });

    it("should return NaN for invalid numbers", () => {
      expect(getTime(NaN)).toBeNaN();
      expect(getTime(Infinity)).toBeNaN();
      expect(getTime(-Infinity)).toBeNaN();
    });
  });

  describe("native compatibility", () => {
    it.each([
      new Date("2024-01-01T00:00:00.000Z"),
      new Date(1704067200000),
      new Date("invalid"),
      new Date(NaN),
      new Date(0),
      new Date(8.64e15),
      new Date(-8.64e15),
    ])("should match native Date.prototype.getTime() for Date input", (date) => {
      const nativeResult = date.getTime();
      const implResult = getTime(date);

      if (isNaN(nativeResult)) {
        expect(implResult).toBeNaN();
      } else {
        expect(implResult).toBe(nativeResult);
      }
    });
  });
});
