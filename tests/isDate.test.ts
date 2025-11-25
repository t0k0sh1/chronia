import { describe, it, expect } from "vitest";
import { isDate } from "../src";

describe("isDate", () => {
  describe("Edge Cases", () => {
    it("should return true for Invalid Date objects", () => {
      // Invalid Date is still a Date instance
      const invalidDate = new Date("invalid");
      expect(isDate(invalidDate)).toBe(true);
    });

    it("should return true for dates at Unix epoch boundary", () => {
      const epochDate = new Date(0);
      expect(isDate(epochDate)).toBe(true);
    });

    it("should return true for dates at max safe timestamp", () => {
      const maxDate = new Date(8640000000000000); // Max Date value
      expect(isDate(maxDate)).toBe(true);
    });

    it("should return true for dates at min safe timestamp", () => {
      const minDate = new Date(-8640000000000000); // Min Date value
      expect(isDate(minDate)).toBe(true);
    });

    it("should return true for date created with NaN", () => {
      const nanDate = new Date(NaN);
      expect(isDate(nanDate)).toBe(true);
    });

    it("should return true for date created with Infinity", () => {
      const infDate = new Date(Infinity);
      expect(isDate(infDate)).toBe(true);
    });

    it("should return true for date created with -Infinity", () => {
      const negInfDate = new Date(-Infinity);
      expect(isDate(negInfDate)).toBe(true);
    });
  });

  describe("Invalid Inputs", () => {
    it("should return false for null", () => {
      expect(isDate(null)).toBe(false);
    });

    it("should return false for undefined", () => {
      expect(isDate(undefined)).toBe(false);
    });

    it("should return false for number (timestamp)", () => {
      expect(isDate(Date.now())).toBe(false);
      expect(isDate(1234567890)).toBe(false);
      expect(isDate(0)).toBe(false);
    });

    it("should return false for string (date string)", () => {
      expect(isDate("2025-01-01")).toBe(false);
      expect(isDate("invalid")).toBe(false);
      expect(isDate("")).toBe(false);
    });

    it("should return false for boolean", () => {
      expect(isDate(true)).toBe(false);
      expect(isDate(false)).toBe(false);
    });

    it("should return false for array", () => {
      expect(isDate([])).toBe(false);
      expect(isDate([2025, 0, 1])).toBe(false);
    });

    it("should return false for plain object", () => {
      expect(isDate({})).toBe(false);
      expect(isDate({ year: 2025, month: 0, day: 1 })).toBe(false);
    });

    it("should return false for object with Date-like properties", () => {
      const fakeDateObj = {
        getTime: () => Date.now(),
        toISOString: () => "2025-01-01T00:00:00.000Z",
      };
      expect(isDate(fakeDateObj)).toBe(false);
    });

    it("should return false for function", () => {
      expect(isDate(() => new Date())).toBe(false);
      expect(isDate(Date)).toBe(false);
    });

    it("should return false for symbol", () => {
      expect(isDate(Symbol("date"))).toBe(false);
    });

    it("should return false for NaN", () => {
      expect(isDate(NaN)).toBe(false);
    });

    it("should return false for Infinity", () => {
      expect(isDate(Infinity)).toBe(false);
      expect(isDate(-Infinity)).toBe(false);
    });

    it("should return false for BigInt", () => {
      expect(isDate(BigInt(123))).toBe(false);
    });
  });

  describe("Happy Path", () => {
    it("should return true for valid Date object", () => {
      const date = new Date(2025, 0, 1);
      expect(isDate(date)).toBe(true);
    });

    it("should return true for Date created with current time", () => {
      const now = new Date();
      expect(isDate(now)).toBe(true);
    });

    it("should return true for Date created from string", () => {
      const date = new Date("2025-01-01");
      expect(isDate(date)).toBe(true);
    });

    it("should return true for Date created from timestamp", () => {
      const date = new Date(1704067200000);
      expect(isDate(date)).toBe(true);
    });
  });

  describe("Type Guard", () => {
    it("should narrow type to Date in TypeScript", () => {
      const value: unknown = new Date(2025, 0, 1);

      if (isDate(value)) {
        // TypeScript should know that 'value' is Date here
        const time: number = value.getTime();
        expect(typeof time).toBe("number");
      } else {
        throw new Error("Type guard failed");
      }
    });

    it("should work with union types", () => {
      const values: (Date | string | number)[] = [
        new Date(2025, 0, 1),
        "2025-01-01",
        1704067200000,
      ];

      const dates = values.filter(isDate);

      expect(dates).toHaveLength(1);
      expect(dates[0]).toBeInstanceOf(Date);
    });
  });
});
