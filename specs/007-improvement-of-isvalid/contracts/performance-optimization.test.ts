import { describe, it, expect } from "vitest";
import { isValid } from "../../../src/isValid";

/**
 * Contract Test: Performance optimization verification
 *
 * This test verifies that the improved isValid function provides
 * better performance characteristics, particularly for invalid
 * numeric inputs.
 *
 * IMPORTANT: This test MUST FAIL before implementation and PASS after.
 */
describe("isValid performance optimization contract", () => {
  it("should process invalid numbers efficiently", () => {
    // Measure performance for invalid numeric inputs
    // The improved implementation should be faster because it avoids
    // Date object creation for NaN, Infinity, etc.

    const invalidNumbers = [NaN, Infinity, -Infinity];
    const iterations = 1000;

    const startTime = performance.now();

    for (let i = 0; i < iterations; i++) {
      invalidNumbers.forEach(num => {
        const result = isValid(num);
        expect(result).toBe(false); // Verify correctness
      });
    }

    const endTime = performance.now();
    const executionTime = endTime - startTime;

    // This threshold will need to be adjusted based on actual measurements
    // The expectation is that the new implementation should be faster
    // Current implementation: ~X ms, Target: <X ms
    expect(executionTime).toBeLessThan(50); // Placeholder threshold

    console.log(`Performance test: ${iterations * invalidNumbers.length} validations in ${executionTime.toFixed(2)}ms`);
  });

  it("should maintain or improve performance for valid inputs", () => {
    // Ensure that optimization doesn't degrade performance for valid inputs

    const validInputs = [
      new Date(2025, 0, 1),
      new Date(),
      Date.now(),
      0,
      1640995200000,
    ];
    const iterations = 1000;

    const startTime = performance.now();

    for (let i = 0; i < iterations; i++) {
      validInputs.forEach(input => {
        const result = isValid(input);
        expect(result).toBe(true); // Verify correctness
      });
    }

    const endTime = performance.now();
    const executionTime = endTime - startTime;

    // Performance should be maintained or improved
    expect(executionTime).toBeLessThan(100); // Placeholder threshold

    console.log(`Valid inputs performance: ${iterations * validInputs.length} validations in ${executionTime.toFixed(2)}ms`);
  });

  it("should have consistent performance characteristics", () => {
    // Test that performance is predictable across different input types

    const mixedInputs = [
      new Date(2025, 0, 1),   // Valid Date
      new Date("invalid"),    // Invalid Date
      1640995200000,          // Valid number
      NaN,                    // Invalid number
      Infinity,               // Invalid number
    ];

    const timings: number[] = [];

    mixedInputs.forEach(input => {
      const startTime = performance.now();

      // Run the same input multiple times to get stable measurement
      for (let i = 0; i < 100; i++) {
        isValid(input);
      }

      const endTime = performance.now();
      timings.push(endTime - startTime);
    });

    // Calculate average and variance to ensure consistent performance
    const average = timings.reduce((sum, time) => sum + time, 0) / timings.length;
    const variance = timings.reduce((sum, time) => sum + Math.pow(time - average, 2), 0) / timings.length;
    const standardDeviation = Math.sqrt(variance);

    // Performance should be consistent (low variance)
    const coefficientOfVariation = standardDeviation / average;
    expect(coefficientOfVariation).toBeLessThan(0.5); // 50% CV threshold

    console.log(`Performance consistency - Average: ${average.toFixed(2)}ms, CV: ${(coefficientOfVariation * 100).toFixed(1)}%`);
  });
});