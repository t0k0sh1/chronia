import { describe, it, expect } from "vitest";
import { addMilliseconds } from "../src/addMilliseconds";

describe("addMilliseconds", () => {
  it.each([
    // --- Basic operations ---
    {
      base: new Date(2025, 0, 15, 12, 0, 0, 0), // Jan 15, 2025, 12:00:00.000
      amount: 500,
      expected: new Date(2025, 0, 15, 12, 0, 0, 500), // Jan 15, 2025, 12:00:00.500
      desc: "adds positive milliseconds",
    },
    {
      base: new Date(2025, 0, 15, 12, 0, 0, 500), // Jan 15, 2025, 12:00:00.500
      amount: -300,
      expected: new Date(2025, 0, 15, 12, 0, 0, 200), // Jan 15, 2025, 12:00:00.200
      desc: "adds negative milliseconds (subtracts)",
    },
    {
      base: new Date(2025, 0, 15, 12, 0, 0, 100), // Jan 15, 2025, 12:00:00.100
      amount: 0,
      expected: new Date(2025, 0, 15, 12, 0, 0, 100), // Jan 15, 2025, 12:00:00.100
      desc: "adding zero milliseconds returns same time",
    },

    // --- Boundary crossing ---
    {
      base: new Date(2025, 0, 15, 12, 0, 0, 999), // Jan 15, 2025, 12:00:00.999
      amount: 1,
      expected: new Date(2025, 0, 15, 12, 0, 1, 0), // Jan 15, 2025, 12:00:01.000
      desc: "crosses second boundary forward",
    },
    {
      base: new Date(2025, 0, 15, 12, 0, 1, 0), // Jan 15, 2025, 12:00:01.000
      amount: -1,
      expected: new Date(2025, 0, 15, 12, 0, 0, 999), // Jan 15, 2025, 12:00:00.999
      desc: "crosses second boundary backward",
    },
    {
      base: new Date(2025, 0, 15, 12, 59, 59, 999), // Jan 15, 2025, 12:59:59.999
      amount: 1,
      expected: new Date(2025, 0, 15, 13, 0, 0, 0), // Jan 15, 2025, 13:00:00.000
      desc: "crosses minute and hour boundary forward",
    },
    {
      base: new Date(2025, 0, 15, 0, 0, 0, 0), // Jan 15, 2025, 00:00:00.000
      amount: -1,
      expected: new Date(2025, 0, 14, 23, 59, 59, 999), // Jan 14, 2025, 23:59:59.999
      desc: "crosses day boundary backward",
    },
    {
      base: new Date(2025, 0, 31, 23, 59, 59, 999), // Jan 31, 2025, 23:59:59.999
      amount: 1,
      expected: new Date(2025, 1, 1, 0, 0, 0, 0), // Feb 1, 2025, 00:00:00.000
      desc: "crosses month boundary",
    },
    {
      base: new Date(2025, 11, 31, 23, 59, 59, 999), // Dec 31, 2025, 23:59:59.999
      amount: 1,
      expected: new Date(2026, 0, 1, 0, 0, 0, 0), // Jan 1, 2026, 00:00:00.000
      desc: "crosses year boundary",
    },

    // --- Large values ---
    {
      base: new Date(2025, 0, 15, 12, 0, 0, 0), // Jan 15, 2025, 12:00:00.000
      amount: 1000,
      expected: new Date(2025, 0, 15, 12, 0, 1, 0), // Jan 15, 2025, 12:00:01.000
      desc: "adds full second worth of milliseconds (1000)",
    },
    {
      base: new Date(2025, 0, 15, 12, 0, 0, 0), // Jan 15, 2025, 12:00:00.000
      amount: 60000,
      expected: new Date(2025, 0, 15, 12, 1, 0, 0), // Jan 15, 2025, 12:01:00.000
      desc: "adds full minute worth of milliseconds (60000)",
    },
    {
      base: new Date(2025, 0, 15, 12, 0, 0, 0), // Jan 15, 2025, 12:00:00.000
      amount: 3600000,
      expected: new Date(2025, 0, 15, 13, 0, 0, 0), // Jan 15, 2025, 13:00:00.000
      desc: "adds full hour worth of milliseconds (3600000)",
    },
    {
      base: new Date(2025, 0, 15, 12, 0, 0, 0), // Jan 15, 2025, 12:00:00.000
      amount: 86400000,
      expected: new Date(2025, 0, 16, 12, 0, 0, 0), // Jan 16, 2025, 12:00:00.000
      desc: "adds full day worth of milliseconds (86400000)",
    },

    // --- Fractional milliseconds (truncated) ---
    {
      base: new Date(2025, 0, 15, 12, 0, 0, 0), // Jan 15, 2025, 12:00:00.000
      amount: 1.5,
      expected: new Date(2025, 0, 15, 12, 0, 0, 1), // Jan 15, 2025, 12:00:00.001 (1ms added, 0.5 truncated)
      desc: "handles fractional milliseconds (1.5 milliseconds)",
    },
    {
      base: new Date(2025, 0, 15, 10, 15, 0, 0), // Jan 15, 2025, 10:15:00.000
      amount: 0.9,
      expected: new Date(2025, 0, 15, 10, 15, 0, 0), // Jan 15, 2025, 10:15:00.000 (0ms added, 0.9 truncated)
      desc: "handles fractional milliseconds less than 1",
    },
    {
      base: new Date(2025, 0, 15, 10, 15, 0, 100), // Jan 15, 2025, 10:15:00.100
      amount: -2.7,
      expected: new Date(2025, 0, 15, 10, 15, 0, 98), // Jan 15, 2025, 10:15:00.098 (-2ms added, -0.7 truncated)
      desc: "handles negative fractional milliseconds",
    },

    // --- Edge cases with midnight ---
    {
      base: new Date(2025, 0, 15, 0, 0, 0, 0), // Jan 15, 2025, 00:00:00.000 (midnight)
      amount: 1,
      expected: new Date(2025, 0, 15, 0, 0, 0, 1), // Jan 15, 2025, 00:00:00.001
      desc: "handles midnight correctly",
    },
    {
      base: new Date(2025, 0, 14, 23, 59, 59, 999), // Jan 14, 2025, 23:59:59.999
      amount: 1,
      expected: new Date(2025, 0, 15, 0, 0, 0, 0), // Jan 15, 2025, 00:00:00.000
      desc: "transitions from end of day to next day",
    },

    // --- Timestamp input ---
    {
      base: 1736942400000, // Jan 15, 2025, 12:00:00.000 UTC
      amount: 500,
      expected: new Date(1736942400500), // Jan 15, 2025, 12:00:00.500 UTC
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
    const result = addMilliseconds(base as Date | number, amount);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });

  it("does not mutate the original date", () => {
    const original = new Date(2025, 0, 15, 12, 0, 0, 500);
    const originalTime = original.getTime();

    addMilliseconds(original, 250);

    expect(original.getTime()).toBe(originalTime);
  });

  it("handles extreme millisecond values", () => {
    const base = new Date(2025, 0, 15, 12, 0, 0, 0);

    // Add a year worth of milliseconds
    const yearInMs = 365 * 24 * 60 * 60 * 1000;
    const result = addMilliseconds(base, yearInMs);
    const expected = new Date(2026, 0, 15, 12, 0, 0, 0);

    expect(result.getTime()).toBe(expected.getTime());
  });

  it("handles precise millisecond operations", () => {
    const base = new Date(2025, 0, 15, 12, 0, 0, 123);
    const result = addMilliseconds(base, 456);
    const expected = new Date(2025, 0, 15, 12, 0, 0, 579);

    expect(result.getTime()).toBe(expected.getTime());
  });

  it("correctly handles millisecond overflow", () => {
    const base = new Date(2025, 0, 15, 12, 0, 0, 950);
    const result = addMilliseconds(base, 100);
    const expected = new Date(2025, 0, 15, 12, 0, 1, 50);

    expect(result.getTime()).toBe(expected.getTime());
  });
});