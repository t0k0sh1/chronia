import { describe, it, expect } from "vitest";
import { subMilliseconds } from "../src/subMilliseconds";

describe("subMilliseconds", () => {
  it.each([
    // --- Basic operations ---
    {
      base: new Date(2025, 0, 15, 12, 0, 0, 500), // Jan 15, 2025, 12:00:00.500
      amount: 300,
      expected: new Date(2025, 0, 15, 12, 0, 0, 200), // Jan 15, 2025, 12:00:00.200
      desc: "subtracts positive milliseconds",
    },
    {
      base: new Date(2025, 0, 15, 12, 0, 0, 200), // Jan 15, 2025, 12:00:00.200
      amount: -300,
      expected: new Date(2025, 0, 15, 12, 0, 0, 500), // Jan 15, 2025, 12:00:00.500
      desc: "subtracts negative milliseconds (adds)",
    },
    {
      base: new Date(2025, 0, 15, 12, 0, 0, 100), // Jan 15, 2025, 12:00:00.100
      amount: 0,
      expected: new Date(2025, 0, 15, 12, 0, 0, 100), // Jan 15, 2025, 12:00:00.100
      desc: "subtracting zero milliseconds returns same time",
    },

    // --- Boundary crossing ---
    {
      base: new Date(2025, 0, 15, 12, 0, 1, 0), // Jan 15, 2025, 12:00:01.000
      amount: 1,
      expected: new Date(2025, 0, 15, 12, 0, 0, 999), // Jan 15, 2025, 12:00:00.999
      desc: "crosses second boundary backward",
    },
    {
      base: new Date(2025, 0, 15, 0, 0, 0, 0), // Jan 15, 2025, 00:00:00.000
      amount: 1,
      expected: new Date(2025, 0, 14, 23, 59, 59, 999), // Jan 14, 2025, 23:59:59.999
      desc: "crosses day boundary backward",
    },
    {
      base: new Date(2025, 1, 1, 0, 0, 0, 0), // Feb 1, 2025, 00:00:00.000
      amount: 1,
      expected: new Date(2025, 0, 31, 23, 59, 59, 999), // Jan 31, 2025, 23:59:59.999
      desc: "crosses month boundary backward",
    },
    {
      base: new Date(2025, 0, 1, 0, 0, 0, 0), // Jan 1, 2025, 00:00:00.000
      amount: 1,
      expected: new Date(2024, 11, 31, 23, 59, 59, 999), // Dec 31, 2024, 23:59:59.999
      desc: "crosses year boundary backward",
    },

    // --- Large values ---
    {
      base: new Date(2025, 0, 15, 12, 0, 1, 0), // Jan 15, 2025, 12:00:01.000
      amount: 1000,
      expected: new Date(2025, 0, 15, 12, 0, 0, 0), // Jan 15, 2025, 12:00:00.000
      desc: "subtracts full second worth of milliseconds (1000)",
    },
    {
      base: new Date(2025, 0, 15, 12, 1, 0, 0), // Jan 15, 2025, 12:01:00.000
      amount: 60000,
      expected: new Date(2025, 0, 15, 12, 0, 0, 0), // Jan 15, 2025, 12:00:00.000
      desc: "subtracts full minute worth of milliseconds (60000)",
    },
    {
      base: new Date(2025, 0, 15, 13, 0, 0, 0), // Jan 15, 2025, 13:00:00.000
      amount: 3600000,
      expected: new Date(2025, 0, 15, 12, 0, 0, 0), // Jan 15, 2025, 12:00:00.000
      desc: "subtracts full hour worth of milliseconds (3600000)",
    },
    {
      base: new Date(2025, 0, 16, 12, 0, 0, 0), // Jan 16, 2025, 12:00:00.000
      amount: 86400000,
      expected: new Date(2025, 0, 15, 12, 0, 0, 0), // Jan 15, 2025, 12:00:00.000
      desc: "subtracts full day worth of milliseconds (86400000)",
    },

    // --- Fractional milliseconds (truncated) ---
    {
      base: new Date(2025, 0, 15, 12, 0, 0, 5), // Jan 15, 2025, 12:00:00.005
      amount: 1.5,
      expected: new Date(2025, 0, 15, 12, 0, 0, 4), // Jan 15, 2025, 12:00:00.004 (1ms subtracted, 0.5 truncated)
      desc: "handles fractional milliseconds (1.5 milliseconds)",
    },
    {
      base: new Date(2025, 0, 15, 10, 15, 0, 100), // Jan 15, 2025, 10:15:00.100
      amount: 0.9,
      expected: new Date(2025, 0, 15, 10, 15, 0, 100), // Jan 15, 2025, 10:15:00.100 (0ms subtracted, 0.9 truncated)
      desc: "handles fractional milliseconds less than 1",
    },
    {
      base: new Date(2025, 0, 15, 10, 15, 0, 100), // Jan 15, 2025, 10:15:00.100
      amount: -2.7,
      expected: new Date(2025, 0, 15, 10, 15, 0, 102), // Jan 15, 2025, 10:15:00.102 (-2ms subtracted, -0.7 truncated)
      desc: "handles negative fractional milliseconds",
    },

    // --- Edge cases ---
    {
      base: new Date(2025, 0, 15, 0, 0, 0, 1), // Jan 15, 2025, 00:00:00.001 (midnight)
      amount: 1,
      expected: new Date(2025, 0, 15, 0, 0, 0, 0), // Jan 15, 2025, 00:00:00.000
      desc: "handles millisecond at midnight correctly",
    },

    // --- Timestamp input ---
    {
      base: 1736942400500, // Jan 15, 2025, 12:00:00.500 UTC
      amount: 250,
      expected: new Date(1736942400250), // Jan 15, 2025, 12:00:00.250 UTC
      desc: "accepts timestamp input",
    },

    // --- Invalid inputs ---
    {
      base: new Date(NaN),
      amount: 100,
      expected: new Date(NaN),
      desc: "returns Invalid Date when base is invalid",
    },
    {
      base: new Date(2025, 0, 15),
      amount: NaN,
      expected: new Date(NaN),
      desc: "returns Invalid Date when amount is NaN",
    },
    {
      base: new Date(2025, 0, 15),
      amount: Infinity,
      expected: new Date(NaN),
      desc: "returns Invalid Date when amount is Infinity",
    },
    {
      base: new Date(2025, 0, 15),
      amount: -Infinity,
      expected: new Date(NaN),
      desc: "returns Invalid Date when amount is -Infinity",
    },
  ])("$desc", ({ base, amount, expected }) => {
    const result = subMilliseconds(base as Date | number, amount);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });

  it("does not mutate the original date", () => {
    const original = new Date(2025, 0, 15, 12, 0, 0, 500);
    const originalTime = original.getTime();

    subMilliseconds(original, 250);

    expect(original.getTime()).toBe(originalTime);
  });

  it("handles extreme millisecond values", () => {
    const base = new Date(2026, 0, 15, 12, 0, 0, 0);

    // Subtract a year worth of milliseconds
    const yearInMs = 365 * 24 * 60 * 60 * 1000;
    const result = subMilliseconds(base, yearInMs);
    const expected = new Date(2025, 0, 15, 12, 0, 0, 0);

    expect(result.getTime()).toBe(expected.getTime());
  });

  it("handles precise millisecond operations", () => {
    const base = new Date(2025, 0, 15, 12, 0, 0, 579);
    const result = subMilliseconds(base, 456);
    const expected = new Date(2025, 0, 15, 12, 0, 0, 123);

    expect(result.getTime()).toBe(expected.getTime());
  });

  it("correctly handles millisecond underflow", () => {
    const base = new Date(2025, 0, 15, 12, 0, 1, 50);
    const result = subMilliseconds(base, 100);
    const expected = new Date(2025, 0, 15, 12, 0, 0, 950);

    expect(result.getTime()).toBe(expected.getTime());
  });
});