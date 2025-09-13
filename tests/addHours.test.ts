import { describe, it, expect } from "vitest";
import { addHours } from "../src/addHours";

describe("addHours", () => {
  it.each([
    // --- Valid cases ---
    {
      base: new Date(2025, 0, 15, 12, 0, 0), // Jan 15, 2025, 12:00:00
      amount: 3,
      expected: new Date(2025, 0, 15, 15, 0, 0), // Jan 15, 2025, 15:00:00
      desc: "adds positive hours",
    },
    {
      base: new Date(2025, 0, 15, 15, 30, 0), // Jan 15, 2025, 15:30:00
      amount: -5,
      expected: new Date(2025, 0, 15, 10, 30, 0), // Jan 15, 2025, 10:30:00
      desc: "adds negative hours (subtracts)",
    },
    {
      base: new Date(2025, 0, 15, 10, 0, 0), // Jan 15, 2025, 10:00:00
      amount: 0,
      expected: new Date(2025, 0, 15, 10, 0, 0), // Same time
      desc: "adding zero hours returns same time",
    },

    // --- Day boundary crossing ---
    {
      base: new Date(2025, 0, 15, 22, 0, 0), // Jan 15, 2025, 22:00:00
      amount: 4,
      expected: new Date(2025, 0, 16, 2, 0, 0), // Jan 16, 2025, 02:00:00
      desc: "crosses day boundary forward",
    },
    {
      base: new Date(2025, 0, 15, 2, 0, 0), // Jan 15, 2025, 02:00:00
      amount: -4,
      expected: new Date(2025, 0, 14, 22, 0, 0), // Jan 14, 2025, 22:00:00
      desc: "crosses day boundary backward",
    },

    // --- Month boundary crossing ---
    {
      base: new Date(2025, 0, 31, 23, 0, 0), // Jan 31, 2025, 23:00:00
      amount: 2,
      expected: new Date(2025, 1, 1, 1, 0, 0), // Feb 1, 2025, 01:00:00
      desc: "crosses month boundary",
    },

    // --- Year boundary crossing ---
    {
      base: new Date(2024, 11, 31, 23, 0, 0), // Dec 31, 2024, 23:00:00
      amount: 2,
      expected: new Date(2025, 0, 1, 1, 0, 0), // Jan 1, 2025, 01:00:00
      desc: "crosses year boundary",
    },

    // --- Daylight Saving Time considerations (handled by Date object) ---
    {
      base: new Date(2025, 2, 9, 1, 0, 0), // Mar 9, 2025, 01:00:00 (before DST in some regions)
      amount: 2,
      expected: new Date(2025, 2, 9, 3, 0, 0), // Mar 9, 2025, 03:00:00
      desc: "handles time changes (DST handled by Date object)",
    },

    // --- Large hour additions ---
    {
      base: new Date(2025, 0, 1, 0, 0, 0), // Jan 1, 2025, 00:00:00
      amount: 25,
      expected: new Date(2025, 0, 2, 1, 0, 0), // Jan 2, 2025, 01:00:00
      desc: "handles large hour additions",
    },
    {
      base: new Date(2025, 0, 1, 12, 0, 0), // Jan 1, 2025, 12:00:00
      amount: 48,
      expected: new Date(2025, 0, 3, 12, 0, 0), // Jan 3, 2025, 12:00:00
      desc: "adds multiple days worth of hours",
    },

    // --- Fractional hours (truncated) ---
    {
      base: new Date(2025, 0, 15, 12, 0, 0), // Jan 15, 2025, 12:00:00
      amount: 1.5,
      expected: new Date(2025, 0, 15, 13, 0, 0), // Jan 15, 2025, 13:00:00 (1 hour added, 0.5 truncated)
      desc: "handles fractional hours (1.5 hours)",
    },
    {
      base: new Date(2025, 0, 15, 10, 15, 0), // Jan 15, 2025, 10:15:00
      amount: 0.25,
      expected: new Date(2025, 0, 15, 10, 15, 0), // Jan 15, 2025, 10:15:00 (0 hours added, 0.25 truncated)
      desc: "handles quarter hour (0.25 hours)",
    },

    // --- Preserves milliseconds ---
    {
      base: new Date(2025, 0, 15, 12, 30, 45, 123), // Jan 15, 2025, 12:30:45.123
      amount: 2,
      expected: new Date(2025, 0, 15, 14, 30, 45, 123), // Jan 15, 2025, 14:30:45.123
      desc: "preserves seconds and milliseconds",
    },

    // --- Timestamp input ---
    {
      base: new Date(2025, 0, 15, 12, 0, 0).getTime(),
      amount: 6,
      expected: new Date(2025, 0, 15, 18, 0, 0), // Jan 15, 2025, 18:00:00
      desc: "accepts timestamp input",
    },

    // --- Invalid cases ---
    {
      base: new Date("invalid"),
      amount: 3,
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
    const result = addHours(base as Date | number, amount);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });

  it("does not mutate the original date", () => {
    const original = new Date(2025, 0, 15, 12, 0, 0);
    const originalTime = original.getTime();
    
    addHours(original, 5);
    
    expect(original.getTime()).toBe(originalTime);
  });

  it("handles extreme hour values", () => {
    const base = new Date(2025, 0, 15, 12, 0, 0);
    const result = addHours(base, 8760); // Add 365 days worth of hours
    const expected = new Date(2026, 0, 15, 12, 0, 0); // One year later
    
    expect(result.getTime()).toBe(expected.getTime());
  });
});