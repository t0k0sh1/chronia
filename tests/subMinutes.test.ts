import { describe, it, expect } from "vitest";
import { subMinutes } from "../src/subMinutes";

describe("subMinutes", () => {
  it.each([
    // --- Valid cases ---
    {
      base: new Date(2025, 0, 15, 12, 45, 0), // Jan 15, 2025, 12:45:00
      amount: 15,
      expected: new Date(2025, 0, 15, 12, 30, 0), // Jan 15, 2025, 12:30:00
      desc: "subtracts positive minutes",
    },
    {
      base: new Date(2025, 0, 15, 15, 15, 0), // Jan 15, 2025, 15:15:00
      amount: -30,
      expected: new Date(2025, 0, 15, 15, 45, 0), // Jan 15, 2025, 15:45:00 (subtracting negative = adding)
      desc: "subtracts negative minutes (adds)",
    },
    {
      base: new Date(2025, 0, 15, 10, 30, 0), // Jan 15, 2025, 10:30:00
      amount: 0,
      expected: new Date(2025, 0, 15, 10, 30, 0), // Same time
      desc: "subtracting zero minutes returns same time",
    },

    // --- Hour boundary crossing ---
    {
      base: new Date(2025, 0, 15, 13, 15, 0), // Jan 15, 2025, 13:15:00
      amount: 30,
      expected: new Date(2025, 0, 15, 12, 45, 0), // Jan 15, 2025, 12:45:00
      desc: "crosses hour boundary backward",
    },
    {
      base: new Date(2025, 0, 15, 12, 45, 0), // Jan 15, 2025, 12:45:00
      amount: -30,
      expected: new Date(2025, 0, 15, 13, 15, 0), // Jan 15, 2025, 13:15:00 (subtracting negative)
      desc: "crosses hour boundary forward with negative amount",
    },

    // --- Day boundary crossing ---
    {
      base: new Date(2025, 0, 15, 0, 15, 0), // Jan 15, 2025, 00:15:00
      amount: 30,
      expected: new Date(2025, 0, 14, 23, 45, 0), // Jan 14, 2025, 23:45:00
      desc: "crosses day boundary backward",
    },
    {
      base: new Date(2025, 0, 15, 23, 45, 0), // Jan 15, 2025, 23:45:00
      amount: -30,
      expected: new Date(2025, 0, 16, 0, 15, 0), // Jan 16, 2025, 00:15:00 (subtracting negative)
      desc: "crosses day boundary forward with negative amount",
    },

    // --- Month boundary crossing ---
    {
      base: new Date(2025, 1, 1, 0, 15, 0), // Feb 1, 2025, 00:15:00
      amount: 30,
      expected: new Date(2025, 0, 31, 23, 45, 0), // Jan 31, 2025, 23:45:00
      desc: "crosses month boundary backward",
    },

    // --- Year boundary crossing ---
    {
      base: new Date(2025, 0, 1, 0, 15, 0), // Jan 1, 2025, 00:15:00
      amount: 30,
      expected: new Date(2024, 11, 31, 23, 45, 0), // Dec 31, 2024, 23:45:00
      desc: "crosses year boundary backward",
    },

    // --- Large minute subtractions ---
    {
      base: new Date(2025, 0, 2, 1, 30, 0), // Jan 2, 2025, 01:30:00
      amount: 90,
      expected: new Date(2025, 0, 2, 0, 0, 0), // Jan 2, 2025, 00:00:00
      desc: "handles large minute subtractions (90 minutes)",
    },
    {
      base: new Date(2025, 0, 3, 12, 0, 0), // Jan 3, 2025, 12:00:00
      amount: 1440,
      expected: new Date(2025, 0, 2, 12, 0, 0), // Jan 2, 2025, 12:00:00
      desc: "subtracts full day worth of minutes (1440)",
    },
    {
      base: new Date(2025, 0, 5, 12, 0, 0), // Jan 5, 2025, 12:00:00
      amount: 2880,
      expected: new Date(2025, 0, 3, 12, 0, 0), // Jan 3, 2025, 12:00:00
      desc: "subtracts two days worth of minutes (2880)",
    },

    // --- Fractional minutes (truncated) ---
    {
      base: new Date(2025, 0, 15, 12, 1, 30), // Jan 15, 2025, 12:01:30
      amount: 1.5,
      expected: new Date(2025, 0, 15, 12, 0, 30), // Jan 15, 2025, 12:00:30 (1 minute subtracted, 0.5 truncated)
      desc: "handles fractional minutes (1.5 minutes)",
    },
    {
      base: new Date(2025, 0, 15, 10, 15, 30), // Jan 15, 2025, 10:15:30
      amount: 0.5,
      expected: new Date(2025, 0, 15, 10, 15, 30), // Jan 15, 2025, 10:15:30 (0 minutes subtracted, 0.5 truncated)
      desc: "handles half minute (0.5 minutes)",
    },

    // --- Preserves seconds and milliseconds ---
    {
      base: new Date(2025, 0, 15, 12, 45, 45, 123), // Jan 15, 2025, 12:45:45.123
      amount: 15,
      expected: new Date(2025, 0, 15, 12, 30, 45, 123), // Jan 15, 2025, 12:30:45.123
      desc: "preserves seconds and milliseconds",
    },

    // --- Edge cases with midnight ---
    {
      base: new Date(2025, 0, 15, 0, 1, 0), // Jan 15, 2025, 00:01:00
      amount: 1,
      expected: new Date(2025, 0, 15, 0, 0, 0), // Jan 15, 2025, 00:00:00 (midnight)
      desc: "handles transition to midnight",
    },
    {
      base: new Date(2025, 0, 16, 0, 0, 0), // Jan 16, 2025, 00:00:00
      amount: 1,
      expected: new Date(2025, 0, 15, 23, 59, 0), // Jan 15, 2025, 23:59:00
      desc: "transitions from midnight to 23:59 previous day",
    },
    {
      base: new Date(2025, 0, 1, 0, 0, 0), // Jan 1, 2025, 00:00:00 (New Year midnight)
      amount: 60,
      expected: new Date(2024, 11, 31, 23, 0, 0), // Dec 31, 2024, 23:00:00
      desc: "handles New Year boundary",
    },

    // --- Timestamp input ---
    {
      base: new Date(2025, 0, 15, 12, 45, 0).getTime(),
      amount: 30,
      expected: new Date(2025, 0, 15, 12, 15, 0), // Jan 15, 2025, 12:15:00
      desc: "accepts timestamp input",
    },

    // --- Invalid cases ---
    {
      base: new Date("invalid"),
      amount: 30,
      expected: new Date(NaN),
      desc: "returns Invalid Date when base is invalid",
    },
    {
      base: new Date(2025, 0, 15, 12, 0, 0),
      amount: NaN,
      expected: new Date(NaN),
      desc: "returns Invalid Date when amount is NaN",
    },
    {
      base: new Date(2025, 0, 15, 12, 0, 0),
      amount: Infinity,
      expected: new Date(NaN),
      desc: "returns Invalid Date when amount is Infinity",
    },
    {
      base: new Date(2025, 0, 15, 12, 0, 0),
      amount: -Infinity,
      expected: new Date(NaN),
      desc: "returns Invalid Date when amount is -Infinity",
    },
  ])("$desc", ({ base, amount, expected }) => {
    const result = subMinutes(base as Date | number, amount);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });

  it("does not mutate the original date", () => {
    const original = new Date(2025, 0, 15, 12, 45, 0);
    const originalTime = original.getTime();
    
    subMinutes(original, 30);
    
    expect(original.getTime()).toBe(originalTime);
  });

  it("handles extreme minute subtractions", () => {
    const base = new Date(2025, 0, 15, 12, 0, 0);
    const result = subMinutes(base, 527040); // Subtract 366 days worth of minutes (2024 is leap year)
    const expected = new Date(2024, 0, 15, 12, 0, 0); // One year earlier
    
    expect(result.getTime()).toBe(expected.getTime());
  });

  it("works correctly with leap year", () => {
    // Test across leap year day
    const base = new Date(2024, 2, 1, 12, 0, 0); // Mar 1, 2024, 12:00:00 (leap year)
    const result = subMinutes(base, 1440); // Go back 24 hours (1440 minutes)
    const expected = new Date(2024, 1, 29, 12, 0, 0); // Feb 29, 2024, 12:00:00
    
    expect(result.getTime()).toBe(expected.getTime());
  });

  it("handles precise fractional minutes", () => {
    const base = new Date(2025, 0, 15, 12, 0, 15, 0);
    const result = subMinutes(base, 0.25); // Quarter minute truncated to 0
    const expected = new Date(2025, 0, 15, 12, 0, 15, 0); // No change (0 minutes subtracted)

    expect(result.getTime()).toBe(expected.getTime());
  });
});