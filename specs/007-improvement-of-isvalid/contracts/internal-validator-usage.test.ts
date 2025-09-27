import { describe, it, expect, vi } from "vitest";
import { isValid } from "../../../src/isValid";

/**
 * Contract Test: isValid function must use internal validator
 *
 * This test verifies that the isValid function uses the internal
 * isValidDateOrNumber validator instead of creating Date objects
 * for all validation logic.
 *
 * IMPORTANT: This test MUST FAIL before implementation and PASS after.
 */
describe("isValid internal validator contract", () => {
  it("should use isValidDateOrNumber for validation", async () => {
    // This test verifies the internal implementation uses the correct validator
    // by checking that the isValidDateOrNumber function is called

    // Mock the internal validator to track its usage
    const { isValidDateOrNumber } = await import("../../../src/_lib/validators");
    const spy = vi.spyOn(await import("../../../src/_lib/validators"), "isValidDateOrNumber");

    // Test with various inputs to ensure the internal validator is used
    const testInputs = [
      new Date(2025, 0, 1),  // Valid Date
      new Date("invalid"),   // Invalid Date
      1640995200000,         // Valid timestamp
      NaN,                   // Invalid timestamp
      Infinity,              // Invalid timestamp
    ];

    // Clear any previous calls
    spy.mockClear();

    // Call isValid for each test input
    testInputs.forEach(input => {
      isValid(input);
    });

    // Verify that isValidDateOrNumber was called for each input
    expect(spy).toHaveBeenCalledTimes(testInputs.length);

    // Verify it was called with the correct arguments
    testInputs.forEach((input, index) => {
      expect(spy).toHaveBeenNthCalledWith(index + 1, input);
    });

    spy.mockRestore();
  });

  it("should not create unnecessary Date objects for invalid numbers", () => {
    // This test ensures the optimization works: invalid numbers should not
    // result in Date object creation

    const originalDateConstructor = global.Date;
    const dateConstructorSpy = vi.spyOn(global, "Date");

    // Test invalid numbers that should be rejected early
    const invalidNumbers = [NaN, Infinity, -Infinity];

    invalidNumbers.forEach(num => {
      const result = isValid(num);
      expect(result).toBe(false);
    });

    // After the implementation, this should show that Date constructor
    // was not called for these invalid numbers
    // (This test will initially fail with current implementation)
    expect(dateConstructorSpy).not.toHaveBeenCalled();

    dateConstructorSpy.mockRestore();
  });

  it("should maintain identical behavior to current implementation", () => {
    // Regression test: ensure all current test cases still pass
    const testCases = [
      // Valid cases
      { input: new Date(2025, 0, 1), expected: true },
      { input: new Date(2024, 1, 29), expected: true },
      { input: Date.now(), expected: true },
      { input: 0, expected: true },
      { input: 1640995200000, expected: true },
      { input: -86400000, expected: true },

      // Invalid cases
      { input: new Date("invalid"), expected: false },
      { input: new Date(NaN), expected: false },
      { input: NaN, expected: false },
      { input: Infinity, expected: false },
      { input: -Infinity, expected: false },
      { input: new Date("2025-13-01"), expected: false },
    ];

    testCases.forEach(({ input, expected }) => {
      const result = isValid(input);
      expect(result).toBe(expected);
    });
  });
});