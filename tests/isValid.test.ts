import { describe, it, expect } from "vitest";
import { isValid } from "../src/isValid";

describe("isValid", () => {
  it.each([
    // --- Valid Date objects ---
    {
      input: new Date(2025, 0, 1), // Jan 1, 2025
      expected: true,
      desc: "returns true for valid Date object",
    },
    {
      input: new Date(2024, 1, 29), // Feb 29, 2024 (leap year)
      expected: true,
      desc: "returns true for leap year date",
    },
    {
      input: new Date(1970, 0, 1), // Unix epoch
      expected: true,
      desc: "returns true for Unix epoch",
    },
    {
      input: new Date(-1000000000000), // Far past date
      expected: true,
      desc: "returns true for far past date",
    },
    {
      input: new Date(3000, 11, 31), // Far future date
      expected: true,
      desc: "returns true for far future date",
    },

    // --- Valid timestamps ---
    {
      input: Date.now(),
      expected: true,
      desc: "returns true for current timestamp",
    },
    {
      input: 0, // Unix epoch timestamp
      expected: true,
      desc: "returns true for Unix epoch timestamp",
    },
    {
      input: 1640995200000, // Jan 1, 2022 timestamp
      expected: true,
      desc: "returns true for valid timestamp",
    },
    {
      input: -86400000, // Dec 31, 1969 timestamp
      expected: true,
      desc: "returns true for negative timestamp",
    },

    // --- Invalid Date objects ---
    {
      input: new Date("invalid"),
      expected: false,
      desc: "returns false for invalid Date string",
    },
    {
      input: new Date(NaN),
      expected: false,
      desc: "returns false for Date created from NaN",
    },
    // Note: JavaScript Date automatically adjusts invalid dates
    // new Date(2025, 1, 30) becomes Mar 2, 2025 (valid)
    // new Date(2025, 12, 1) becomes Jan 1, 2026 (valid)

    // --- Invalid timestamps ---
    {
      input: NaN,
      expected: false,
      desc: "returns false for NaN timestamp",
    },
    {
      input: Infinity,
      expected: false,
      desc: "returns false for Infinity timestamp",
    },
    {
      input: -Infinity,
      expected: false,
      desc: "returns false for -Infinity timestamp",
    },

    // --- Edge cases ---
    // Note: "2025-02-30" is parsed as valid by some JS engines
    // and becomes Mar 2, 2025
    {
      input: new Date("2025-13-01"), // Invalid month in ISO string
      expected: false,
      desc: "returns false for invalid month in ISO string",
    },
    {
      input: new Date("not a date"),
      expected: false,
      desc: "returns false for non-date string",
    },
  ])("$desc", ({ input, expected }) => {
    const result = isValid(input);
    expect(result).toBe(expected);
  });

  it("handles various input types correctly", () => {
    // Test that the function correctly distinguishes between Date objects and numbers
    const validDate = new Date(2025, 0, 1);
    const validTimestamp = validDate.getTime();
    const invalidDate = new Date("invalid");
    const invalidTimestamp = NaN;

    expect(isValid(validDate)).toBe(true);
    expect(isValid(validTimestamp)).toBe(true);
    expect(isValid(invalidDate)).toBe(false);
    expect(isValid(invalidTimestamp)).toBe(false);
  });
});