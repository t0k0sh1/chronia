import { describe, it, expect } from "vitest";
import { addSeconds } from "../src/addSeconds";

describe("addSeconds", () => {
  it.each([
    // --- Valid cases ---
    {
      base: new Date(2025, 0, 15, 12, 30, 30), // Jan 15, 2025, 12:30:30
      amount: 15,
      expected: new Date(2025, 0, 15, 12, 30, 45), // Jan 15, 2025, 12:30:45
      desc: "adds positive seconds",
    },
    {
      base: new Date(2025, 0, 15, 15, 45, 30), // Jan 15, 2025, 15:45:30
      amount: -20,
      expected: new Date(2025, 0, 15, 15, 45, 10), // Jan 15, 2025, 15:45:10
      desc: "adds negative seconds (subtracts)",
    },
    {
      base: new Date(2025, 0, 15, 10, 30, 30), // Jan 15, 2025, 10:30:30
      amount: 0,
      expected: new Date(2025, 0, 15, 10, 30, 30), // Same time
      desc: "adding zero seconds returns same time",
    },

    // --- Minute boundary crossing ---
    {
      base: new Date(2025, 0, 15, 12, 30, 45), // Jan 15, 2025, 12:30:45
      amount: 30,
      expected: new Date(2025, 0, 15, 12, 31, 15), // Jan 15, 2025, 12:31:15
      desc: "crosses minute boundary forward",
    },
    {
      base: new Date(2025, 0, 15, 13, 31, 15), // Jan 15, 2025, 13:31:15
      amount: -30,
      expected: new Date(2025, 0, 15, 13, 30, 45), // Jan 15, 2025, 13:30:45
      desc: "crosses minute boundary backward",
    },

    // --- Hour boundary crossing ---
    {
      base: new Date(2025, 0, 15, 12, 59, 45), // Jan 15, 2025, 12:59:45
      amount: 30,
      expected: new Date(2025, 0, 15, 13, 0, 15), // Jan 15, 2025, 13:00:15
      desc: "crosses hour boundary forward",
    },
    {
      base: new Date(2025, 0, 15, 13, 0, 15), // Jan 15, 2025, 13:00:15
      amount: -30,
      expected: new Date(2025, 0, 15, 12, 59, 45), // Jan 15, 2025, 12:59:45
      desc: "crosses hour boundary backward",
    },

    // --- Day boundary crossing ---
    {
      base: new Date(2025, 0, 15, 23, 59, 45), // Jan 15, 2025, 23:59:45
      amount: 30,
      expected: new Date(2025, 0, 16, 0, 0, 15), // Jan 16, 2025, 00:00:15
      desc: "crosses day boundary forward",
    },
    {
      base: new Date(2025, 0, 15, 0, 0, 15), // Jan 15, 2025, 00:00:15
      amount: -30,
      expected: new Date(2025, 0, 14, 23, 59, 45), // Jan 14, 2025, 23:59:45
      desc: "crosses day boundary backward",
    },

    // --- Month boundary crossing ---
    {
      base: new Date(2025, 0, 31, 23, 59, 50), // Jan 31, 2025, 23:59:50
      amount: 20,
      expected: new Date(2025, 1, 1, 0, 0, 10), // Feb 1, 2025, 00:00:10
      desc: "crosses month boundary",
    },

    // --- Year boundary crossing ---
    {
      base: new Date(2024, 11, 31, 23, 59, 50), // Dec 31, 2024, 23:59:50
      amount: 15,
      expected: new Date(2025, 0, 1, 0, 0, 5), // Jan 1, 2025, 00:00:05
      desc: "crosses year boundary",
    },

    // --- Large second additions ---
    {
      base: new Date(2025, 0, 1, 0, 0, 0), // Jan 1, 2025, 00:00:00
      amount: 90,
      expected: new Date(2025, 0, 1, 0, 1, 30), // Jan 1, 2025, 00:01:30
      desc: "handles large second additions (90 seconds)",
    },
    {
      base: new Date(2025, 0, 1, 12, 0, 0), // Jan 1, 2025, 12:00:00
      amount: 3600,
      expected: new Date(2025, 0, 1, 13, 0, 0), // Jan 1, 2025, 13:00:00
      desc: "adds full hour worth of seconds (3600)",
    },
    {
      base: new Date(2025, 0, 1, 12, 0, 0), // Jan 1, 2025, 12:00:00
      amount: 86400,
      expected: new Date(2025, 0, 2, 12, 0, 0), // Jan 2, 2025, 12:00:00
      desc: "adds full day worth of seconds (86400)",
    },

    // --- Fractional seconds ---
    {
      base: new Date(2025, 0, 15, 12, 0, 0, 0), // Jan 15, 2025, 12:00:00.000
      amount: 1.5,
      expected: new Date(2025, 0, 15, 12, 0, 1, 500), // Jan 15, 2025, 12:00:01.500
      desc: "handles fractional seconds (1.5 seconds)",
    },
    {
      base: new Date(2025, 0, 15, 10, 15, 0, 0), // Jan 15, 2025, 10:15:00.000
      amount: 0.5,
      expected: new Date(2025, 0, 15, 10, 15, 0, 500), // Jan 15, 2025, 10:15:00.500
      desc: "handles half second (0.5 seconds)",
    },
    {
      base: new Date(2025, 0, 15, 10, 15, 0, 0), // Jan 15, 2025, 10:15:00.000
      amount: 0.001,
      expected: new Date(2025, 0, 15, 10, 15, 0, 1), // Jan 15, 2025, 10:15:00.001
      desc: "handles millisecond precision (0.001 seconds)",
    },

    // --- Preserves milliseconds ---
    {
      base: new Date(2025, 0, 15, 12, 30, 45, 123), // Jan 15, 2025, 12:30:45.123
      amount: 15,
      expected: new Date(2025, 0, 15, 12, 31, 0, 123), // Jan 15, 2025, 12:31:00.123
      desc: "preserves milliseconds",
    },

    // --- Edge cases with midnight ---
    {
      base: new Date(2025, 0, 15, 0, 0, 0), // Jan 15, 2025, 00:00:00 (midnight)
      amount: 1,
      expected: new Date(2025, 0, 15, 0, 0, 1), // Jan 15, 2025, 00:00:01
      desc: "handles midnight correctly",
    },
    {
      base: new Date(2025, 0, 15, 23, 59, 59), // Jan 15, 2025, 23:59:59
      amount: 1,
      expected: new Date(2025, 0, 16, 0, 0, 0), // Jan 16, 2025, 00:00:00
      desc: "transitions from 23:59:59 to next day",
    },

    // --- Timestamp input ---
    {
      base: new Date(2025, 0, 15, 12, 0, 0).getTime(),
      amount: 45,
      expected: new Date(2025, 0, 15, 12, 0, 45), // Jan 15, 2025, 12:00:45
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
    const result = addSeconds(base as Date | number, amount);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });

  it("does not mutate the original date", () => {
    const original = new Date(2025, 0, 15, 12, 30, 30);
    const originalTime = original.getTime();
    
    addSeconds(original, 30);
    
    expect(original.getTime()).toBe(originalTime);
  });

  it("handles extreme second values", () => {
    const base = new Date(2025, 0, 15, 12, 0, 0);
    const result = addSeconds(base, 31536000); // Add 365 days worth of seconds
    const expected = new Date(2026, 0, 15, 12, 0, 0); // One year later
    
    expect(result.getTime()).toBe(expected.getTime());
  });

  it("handles precise fractional seconds", () => {
    const base = new Date(2025, 0, 15, 12, 0, 0, 0);
    const result = addSeconds(base, 0.25); // Quarter second = 250 milliseconds
    const expected = new Date(2025, 0, 15, 12, 0, 0, 250);
    
    expect(result.getTime()).toBe(expected.getTime());
  });

  it("works with leap seconds consideration", () => {
    // Note: JavaScript Date doesn't actually handle leap seconds,
    // but we test that the function works correctly around the times
    // when leap seconds might occur
    const base = new Date(2025, 11, 31, 23, 59, 59); // Dec 31, 2025, 23:59:59
    const result = addSeconds(base, 2);
    const expected = new Date(2026, 0, 1, 0, 0, 1); // Jan 1, 2026, 00:00:01
    
    expect(result.getTime()).toBe(expected.getTime());
  });
});