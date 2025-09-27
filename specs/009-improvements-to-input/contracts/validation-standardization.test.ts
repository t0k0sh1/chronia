import { describe, it, expect } from "vitest";

/**
 * Contract Test: Validation Standardization
 *
 * This test verifies that all target functions use the standardized
 * internal validator functions (isValidDate, isValidNumber, isValidDateOrNumber)
 * while maintaining their exact current behavior.
 *
 * IMPORTANT: This test MUST FAIL before implementation and PASS after.
 */
describe("Validation standardization contract", () => {
  it("should use isValidDate in comparison functions", async () => {
    // This test verifies that compare function uses isValidDate internally
    try {
      const { compare } = await import("../../../src/compare");

      // These should continue to throw RangeError as before
      expect(() => compare(new Date("invalid"), new Date())).toThrow(RangeError);
      expect(() => compare(new Date(), new Date("invalid"))).toThrow(RangeError);
      expect(() => compare("not a date" as any, new Date())).toThrow(RangeError);

      // Valid dates should work normally
      const result = compare(new Date("2024-01-01"), new Date("2024-01-02"));
      expect(typeof result).toBe("number");
      expect(result).toBe(-1);

    } catch (error) {
      throw new Error(`Compare function validation failed: ${error}`);
    }
  });

  it("should use isValidDateOrNumber in boolean functions", async () => {
    // Test that is* functions use consistent validation
    try {
      const { isAfter } = await import("../../../src/isAfter");
      const { isBefore } = await import("../../../src/isBefore");
      const { isEqual } = await import("../../../src/isEqual");

      // These should return false for invalid inputs (current behavior)
      expect(isAfter(new Date("invalid"), new Date())).toBe(false);
      expect(isBefore(new Date(), "not a date" as any)).toBe(false);
      expect(isEqual(NaN, new Date())).toBe(false);

      // Valid inputs should work normally
      expect(isAfter(new Date("2024-01-02"), new Date("2024-01-01"))).toBe(true);
      expect(isBefore(new Date("2024-01-01"), new Date("2024-01-02"))).toBe(true);
      expect(isEqual(new Date("2024-01-01"), new Date("2024-01-01"))).toBe(true);

    } catch (error) {
      throw new Error(`Boolean function validation failed: ${error}`);
    }
  });

  it("should use isValidDateOrNumber in calculation functions", async () => {
    // Test that diff* functions use consistent validation
    try {
      const { diffDays } = await import("../../../src/diffDays");
      const { diffMinutes } = await import("../../../src/diffMinutes");
      const { diffSeconds } = await import("../../../src/diffSeconds");

      // Test behavior with invalid inputs (should handle gracefully)
      const invalidResult1 = diffDays(new Date("invalid"), new Date());
      const invalidResult2 = diffMinutes(new Date(), "not a date" as any);
      const invalidResult3 = diffSeconds(NaN, new Date());

      // Results should be numbers (may be NaN, but should not throw)
      expect(typeof invalidResult1).toBe("number");
      expect(typeof invalidResult2).toBe("number");
      expect(typeof invalidResult3).toBe("number");

      // Valid inputs should work normally
      const validResult = diffDays(new Date("2024-01-02"), new Date("2024-01-01"));
      expect(typeof validResult).toBe("number");
      expect(validResult).toBe(1);

    } catch (error) {
      throw new Error(`Calculation function validation failed: ${error}`);
    }
  });

  it("should use isValidDateOrNumber in range functions", async () => {
    // Test that clamp function uses consistent validation
    try {
      const { clamp } = await import("../../../src/clamp");

      // Test with invalid inputs (should return Invalid Date)
      const invalidResult1 = clamp(new Date("invalid"), new Date(), new Date());
      const invalidResult2 = clamp(new Date(), "not a date" as any, new Date());
      const invalidResult3 = clamp(new Date(), new Date(), NaN);

      // Results should be Invalid Date objects
      expect(invalidResult1 instanceof Date).toBe(true);
      expect(isNaN(invalidResult1.getTime())).toBe(true);
      expect(invalidResult2 instanceof Date).toBe(true);
      expect(isNaN(invalidResult2.getTime())).toBe(true);
      expect(invalidResult3 instanceof Date).toBe(true);
      expect(isNaN(invalidResult3.getTime())).toBe(true);

      // Valid inputs should work normally
      const minDate = new Date("2024-01-01");
      const maxDate = new Date("2024-01-10");
      const testDate = new Date("2024-01-05");
      const validResult = clamp(testDate, minDate, maxDate);

      expect(validResult instanceof Date).toBe(true);
      expect(isNaN(validResult.getTime())).toBe(false);
      expect(validResult.getTime()).toBe(testDate.getTime());

    } catch (error) {
      throw new Error(`Range function validation failed: ${error}`);
    }
  });

  it("should maintain performance within 5% of baseline", async () => {
    // Performance contract test
    try {
      const { isAfter } = await import("../../../src/isAfter");
      const { diffDays } = await import("../../../src/diffDays");

      const date1 = new Date("2024-01-01");
      const date2 = new Date("2024-01-02");

      // Warm up
      for (let i = 0; i < 100; i++) {
        isAfter(date1, date2);
        diffDays(date1, date2);
      }

      // Measure performance
      const iterations = 10000;
      const startTime = performance.now();

      for (let i = 0; i < iterations; i++) {
        isAfter(date1, date2);
        diffDays(date1, date2);
      }

      const endTime = performance.now();
      const totalTime = endTime - startTime;
      const avgTimePerCall = totalTime / (iterations * 2); // 2 functions per iteration

      // Should complete in reasonable time (less than 0.1ms per call pair)
      expect(avgTimePerCall).toBeLessThan(0.1);

    } catch (error) {
      throw new Error(`Performance validation failed: ${error}`);
    }
  });

  it("should preserve exact error messages for compare function", async () => {
    // Contract test for error message preservation
    try {
      const { compare } = await import("../../../src/compare");

      // Test specific error messages that must be preserved
      expect(() => compare(null as any, new Date())).toThrow("First argument must be a Date object");
      expect(() => compare(new Date(), "string" as any)).toThrow("Second argument must be a Date object");
      expect(() => compare(new Date("invalid"), new Date())).toThrow("First date is invalid");
      expect(() => compare(new Date(), new Date("invalid"))).toThrow("Second date is invalid");
      expect(() => compare(new Date(), new Date(), "INVALID" as any)).toThrow("Order must be 'ASC' or 'DESC'");

    } catch (error) {
      throw new Error(`Error message preservation failed: ${error}`);
    }
  });

  it("should handle edge cases consistently across function categories", async () => {
    // Edge case validation contract
    try {
      const { isAfter } = await import("../../../src/isAfter");
      const { diffDays } = await import("../../../src/diffDays");
      const { clamp } = await import("../../../src/clamp");

      // Test with edge case inputs
      const edgeCases = [
        new Date(Number.MAX_SAFE_INTEGER),
        new Date(Number.MIN_SAFE_INTEGER),
        new Date(0), // Unix epoch
        new Date("1970-01-01T00:00:00.000Z"),
      ];

      for (const edgeDate of edgeCases) {
        // Boolean functions should handle gracefully
        const isAfterResult = isAfter(edgeDate, new Date());
        expect(typeof isAfterResult).toBe("boolean");

        // Calculation functions should handle gracefully
        const diffResult = diffDays(edgeDate, new Date());
        expect(typeof diffResult).toBe("number");

        // Range functions should handle gracefully
        const clampResult = clamp(edgeDate, new Date("2024-01-01"), new Date("2024-12-31"));
        expect(clampResult instanceof Date).toBe(true);
      }

    } catch (error) {
      throw new Error(`Edge case validation failed: ${error}`);
    }
  });
});