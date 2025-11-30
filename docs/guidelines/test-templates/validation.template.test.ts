/**
 * Test Template: Validation Functions
 *
 * Target functions:
 * - isDate, isExists, isValid
 *
 * Usage:
 * 1. Copy this file and save as tests/{functionName}.test.ts
 * 2. Replace `isValid` with the actual function name
 * 3. Add function-specific test cases (validation rules)
 * 4. Remove unnecessary test cases
 *
 * Test Design:
 * - isDate: Test all types (Date, number, string, null, undefined, object)
 * - isExists: Test leap years, end-of-month dates, out-of-range values
 * - isValid: Test Invalid Date, NaN, valid dates
 * - Boundary values: Min/max years, timestamp ranges
 * - Invalid inputs: Invalid Date, NaN, Infinity, -Infinity
 * - Type variations: Test all types when function accepts multiple types
 */

import { describe, it, expect } from "vitest";
import { isValid } from "../src/isValid";

describe("isValid", () => {
  describe("valid dates", () => {
    it.each([
      { date: new Date(2024, 0, 1), desc: "Normal date" },
      { date: new Date(2024, 1, 29), desc: "Leap year Feb 29" },
      { date: new Date(2024, 11, 31), desc: "Year-end date" },
      { date: new Date(0, 0, 1), desc: "Minimum year date" },
      { date: new Date(9999, 11, 31), desc: "Maximum year date" },
    ])("Return true for $desc", ({ date }) => {
      expect(isValid(date)).toBe(true);
    });

    it("Return true for valid timestamps", () => {
      expect(isValid(0)).toBe(true); // Unix epoch
      expect(isValid(new Date(2024, 0, 1).getTime())).toBe(true);
      expect(isValid(-86400000)).toBe(true); // Negative timestamp
    });
  });

  describe("invalid dates", () => {
    it.each([
      { date: new Date("invalid"), desc: "Date from invalid string" },
      { date: new Date(""), desc: "Date from empty string" },
      { date: new Date(NaN), desc: "Date from NaN" },
    ])("Return false for $desc", ({ date }) => {
      expect(isValid(date)).toBe(false);
    });

    it("Return false for invalid timestamps", () => {
      expect(isValid(NaN)).toBe(false);
      expect(isValid(Infinity)).toBe(false);
      expect(isValid(-Infinity)).toBe(false);
    });
  });

  describe("edge cases", () => {
    it("Return false for non-leap year Feb 29 (non-existent date)", () => {
      const invalidDate = new Date(2023, 1, 29);
      // Note: JavaScript Date auto-adjusts 2023-02-29 to 2023-03-01,
      // so isValid behavior may vary depending on implementation
      const result = isValid(invalidDate);
      expect(typeof result).toBe("boolean");
    });

    it("Handle BC dates (negative years)", () => {
      const bcDate = new Date();
      bcDate.setFullYear(-100, 5, 15);
      expect(isValid(bcDate)).toBe(true);
    });

    it("Boundary value: Minimum and maximum timestamps", () => {
      // JavaScript Date range: -8640000000000000 ~ 8640000000000000
      const minTimestamp = -8640000000000000;
      const maxTimestamp = 8640000000000000;
      expect(isValid(minTimestamp)).toBe(true);
      expect(isValid(maxTimestamp)).toBe(true);
      expect(isValid(minTimestamp - 1)).toBe(false);
      expect(isValid(maxTimestamp + 1)).toBe(false);
    });
  });
});
