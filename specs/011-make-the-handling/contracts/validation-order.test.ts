import { describe, it, expect } from "vitest";
import { clamp } from "../../../src/clamp";

/**
 * Contract Test: Validation Order for clamp Function
 *
 * This test verifies that clamp validates arguments BEFORE converting them,
 * following the pattern established by addDays function.
 *
 * Contract Rules:
 * 1. Validate arguments in original form (Date | number)
 * 2. Return Invalid Date immediately if any argument is invalid
 * 3. Convert to Date objects only after validation passes
 * 4. Use isValidDateOrNumber() from _lib/validators
 */
describe("Contract: clamp validation order", () => {
  describe("TC-1: Validation rejects Invalid Date before conversion", () => {
    it("should return Invalid Date when date argument is Invalid Date", () => {
      const invalidDate = new Date("invalid");
      const validMin = new Date(2024, 5, 10);
      const validMax = new Date(2024, 5, 20);

      const result = clamp(invalidDate, validMin, validMax);

      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when minDate argument is Invalid Date", () => {
      const validDate = new Date(2024, 5, 15);
      const invalidMin = new Date("invalid");
      const validMax = new Date(2024, 5, 20);

      const result = clamp(validDate, invalidMin, validMax);

      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when maxDate argument is Invalid Date", () => {
      const validDate = new Date(2024, 5, 15);
      const validMin = new Date(2024, 5, 10);
      const invalidMax = new Date("invalid");

      const result = clamp(validDate, validMin, invalidMax);

      expect(isNaN(result.getTime())).toBe(true);
    });
  });

  describe("TC-2: Validation rejects NaN before conversion", () => {
    it("should return Invalid Date when date is NaN", () => {
      const nanValue = NaN;
      const validMin = Date.now();
      const validMax = Date.now() + 1000;

      const result = clamp(nanValue, validMin, validMax);

      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when minDate is NaN", () => {
      const validDate = Date.now();
      const nanMin = NaN;
      const validMax = Date.now() + 1000;

      const result = clamp(validDate, nanMin, validMax);

      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when maxDate is NaN", () => {
      const validDate = Date.now();
      const validMin = Date.now() - 1000;
      const nanMax = NaN;

      const result = clamp(validDate, validMin, nanMax);

      expect(isNaN(result.getTime())).toBe(true);
    });
  });

  describe("TC-3: Validation rejects Infinity before conversion", () => {
    it("should return Invalid Date when date is Infinity", () => {
      const infinityValue = Infinity;
      const validMin = 0;
      const validMax = 1000;

      const result = clamp(infinityValue, validMin, validMax);

      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when date is -Infinity", () => {
      const negInfinityValue = -Infinity;
      const validMin = 0;
      const validMax = 1000;

      const result = clamp(negInfinityValue, validMin, validMax);

      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when minDate is Infinity", () => {
      const validDate = Date.now();
      const infinityMin = Infinity;
      const validMax = Date.now() + 1000;

      const result = clamp(validDate, infinityMin, validMax);

      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when maxDate is Infinity", () => {
      const validDate = Date.now();
      const validMin = Date.now() - 1000;
      const infinityMax = Infinity;

      const result = clamp(validDate, validMin, infinityMax);

      expect(isNaN(result.getTime())).toBe(true);
    });
  });

  describe("TC-4: Valid arguments pass validation, then convert", () => {
    it("should accept valid number timestamps and return valid Date", () => {
      const timestamp = Date.now();
      const minTimestamp = timestamp - 1000;
      const maxTimestamp = timestamp + 1000;

      const result = clamp(timestamp, minTimestamp, maxTimestamp);

      expect(result.getTime()).toBe(timestamp);
      expect(result).toBeInstanceOf(Date);
    });

    it("should accept valid Date objects and return valid Date", () => {
      const date = new Date(2024, 5, 15);
      const minDate = new Date(2024, 5, 10);
      const maxDate = new Date(2024, 5, 20);

      const result = clamp(date, minDate, maxDate);

      expect(result.getTime()).toBe(date.getTime());
      expect(result).toBeInstanceOf(Date);
    });

    it("should accept mixed Date and number arguments", () => {
      const dateObj = new Date(2024, 5, 15);
      const minTimestamp = new Date(2024, 5, 10).getTime();
      const maxTimestamp = new Date(2024, 5, 20).getTime();

      const result = clamp(dateObj, minTimestamp, maxTimestamp);

      expect(result.getTime()).toBe(dateObj.getTime());
      expect(result).toBeInstanceOf(Date);
    });
  });

  describe("TC-5: Mixed invalid arguments fail fast", () => {
    it("should fail when any argument is invalid (valid date, invalid min, valid max)", () => {
      const validDate = new Date(2024, 5, 15);
      const invalidMin = new Date("invalid");
      const validMax = new Date(2024, 5, 20);

      const result = clamp(validDate, invalidMin, validMax);

      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should fail when any argument is invalid (invalid date, valid min, valid max)", () => {
      const invalidDate = new Date("invalid");
      const validMin = new Date(2024, 5, 10);
      const validMax = new Date(2024, 5, 20);

      const result = clamp(invalidDate, validMin, validMax);

      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should fail when any argument is invalid (valid date, valid min, invalid max)", () => {
      const validDate = new Date(2024, 5, 15);
      const validMin = new Date(2024, 5, 10);
      const invalidMax = new Date("invalid");

      const result = clamp(validDate, validMin, invalidMax);

      expect(isNaN(result.getTime())).toBe(true);
    });

    it("should fail when multiple arguments are invalid", () => {
      const invalidDate = NaN;
      const invalidMin = Infinity;
      const invalidMax = new Date("invalid");

      const result = clamp(invalidDate, invalidMin, invalidMax);

      expect(isNaN(result.getTime())).toBe(true);
    });
  });

  describe("Consistency with addDays validation pattern", () => {
    it("should use same validation approach as addDays (reject invalid before conversion)", () => {
      // This test verifies behavioral consistency
      // Both functions should reject invalid inputs the same way

      const invalidInputs = [
        NaN,
        Infinity,
        -Infinity,
        new Date("invalid"),
      ];

      invalidInputs.forEach((invalidInput) => {
        const clampResult = clamp(
          invalidInput,
          new Date(2024, 5, 10),
          new Date(2024, 5, 20)
        );

        // Should return Invalid Date for invalid input
        expect(isNaN(clampResult.getTime())).toBe(true);
      });
    });
  });
});
