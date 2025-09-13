import { describe, it, expect } from "vitest";
import { subHours } from "../src/subHours";

describe("subHours", () => {
  it.each([
    // --- Valid cases ---
    {
      base: new Date(2025, 0, 15, 18, 0, 0), // Jan 15, 2025, 18:00:00
      amount: 5,
      expected: new Date(2025, 0, 15, 13, 0, 0), // Jan 15, 2025, 13:00:00
      desc: "subtracts positive hours",
    },
    {
      base: new Date(2025, 0, 15, 10, 30, 0), // Jan 15, 2025, 10:30:00
      amount: -3,
      expected: new Date(2025, 0, 15, 13, 30, 0), // Jan 15, 2025, 13:30:00 (subtracting negative = adding)
      desc: "subtracts negative hours (adds)",
    },
    {
      base: new Date(2025, 0, 15, 14, 0, 0), // Jan 15, 2025, 14:00:00
      amount: 0,
      expected: new Date(2025, 0, 15, 14, 0, 0), // Same time
      desc: "subtracting zero hours returns same time",
    },

    // --- Day boundary crossing ---
    {
      base: new Date(2025, 0, 15, 2, 0, 0), // Jan 15, 2025, 02:00:00
      amount: 4,
      expected: new Date(2025, 0, 14, 22, 0, 0), // Jan 14, 2025, 22:00:00
      desc: "crosses day boundary backward",
    },
    {
      base: new Date(2025, 0, 15, 22, 0, 0), // Jan 15, 2025, 22:00:00
      amount: -4,
      expected: new Date(2025, 0, 16, 2, 0, 0), // Jan 16, 2025, 02:00:00 (subtracting negative)
      desc: "crosses day boundary forward with negative amount",
    },

    // --- Month boundary crossing ---
    {
      base: new Date(2025, 1, 1, 1, 0, 0), // Feb 1, 2025, 01:00:00
      amount: 2,
      expected: new Date(2025, 0, 31, 23, 0, 0), // Jan 31, 2025, 23:00:00
      desc: "crosses month boundary backward",
    },

    // --- Year boundary crossing ---
    {
      base: new Date(2025, 0, 1, 1, 0, 0), // Jan 1, 2025, 01:00:00
      amount: 2,
      expected: new Date(2024, 11, 31, 23, 0, 0), // Dec 31, 2024, 23:00:00
      desc: "crosses year boundary backward",
    },

    // --- Daylight Saving Time considerations (handled by Date object) ---
    {
      base: new Date(2025, 10, 2, 3, 0, 0), // Nov 2, 2025, 03:00:00 (after DST in some regions)
      amount: 2,
      expected: new Date(2025, 10, 2, 1, 0, 0), // Nov 2, 2025, 01:00:00
      desc: "handles time changes (DST handled by Date object)",
    },

    // --- Large hour subtractions ---
    {
      base: new Date(2025, 0, 3, 1, 0, 0), // Jan 3, 2025, 01:00:00
      amount: 25,
      expected: new Date(2025, 0, 2, 0, 0, 0), // Jan 2, 2025, 00:00:00
      desc: "handles large hour subtractions",
    },
    {
      base: new Date(2025, 0, 5, 12, 0, 0), // Jan 5, 2025, 12:00:00
      amount: 72,
      expected: new Date(2025, 0, 2, 12, 0, 0), // Jan 2, 2025, 12:00:00
      desc: "subtracts multiple days worth of hours",
    },

    // --- Fractional hours ---
    {
      base: new Date(2025, 0, 15, 14, 30, 0), // Jan 15, 2025, 14:30:00
      amount: 1.5,
      expected: new Date(2025, 0, 15, 13, 30, 0), // Jan 15, 2025, 13:30:00 (1 hour subtracted, 0.5 truncated)
      desc: "handles fractional hours (1.5 hours)",
    },
    {
      base: new Date(2025, 0, 15, 10, 30, 0), // Jan 15, 2025, 10:30:00
      amount: 0.25,
      expected: new Date(2025, 0, 15, 10, 30, 0), // Jan 15, 2025, 10:30:00 (0 hours subtracted, 0.25 truncated)
      desc: "handles quarter hour (0.25 hours)",
    },

    // --- Preserves milliseconds ---
    {
      base: new Date(2025, 0, 15, 14, 30, 45, 789), // Jan 15, 2025, 14:30:45.789
      amount: 3,
      expected: new Date(2025, 0, 15, 11, 30, 45, 789), // Jan 15, 2025, 11:30:45.789
      desc: "preserves seconds and milliseconds",
    },

    // --- Edge cases with midnight ---
    {
      base: new Date(2025, 0, 15, 0, 0, 0), // Jan 15, 2025, 00:00:00 (midnight)
      amount: 1,
      expected: new Date(2025, 0, 14, 23, 0, 0), // Jan 14, 2025, 23:00:00
      desc: "handles midnight correctly",
    },
    {
      base: new Date(2025, 0, 1, 0, 0, 0), // Jan 1, 2025, 00:00:00 (New Year midnight)
      amount: 24,
      expected: new Date(2024, 11, 31, 0, 0, 0), // Dec 31, 2024, 00:00:00
      desc: "handles New Year boundary",
    },

    // --- Timestamp input ---
    {
      base: new Date(2025, 0, 15, 18, 0, 0).getTime(),
      amount: 4,
      expected: new Date(2025, 0, 15, 14, 0, 0), // Jan 15, 2025, 14:00:00
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
    const result = subHours(base as Date | number, amount);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });

  it("does not mutate the original date", () => {
    const original = new Date(2025, 0, 15, 18, 0, 0);
    const originalTime = original.getTime();
    
    subHours(original, 3);
    
    expect(original.getTime()).toBe(originalTime);
  });

  it("handles extreme hour subtractions", () => {
    const base = new Date(2025, 0, 15, 12, 0, 0);
    const result = subHours(base, 8784); // Subtract 366 days worth of hours (2024 is leap year)
    const expected = new Date(2024, 0, 15, 12, 0, 0); // One year earlier
    
    expect(result.getTime()).toBe(expected.getTime());
  });

  it("works correctly with leap year", () => {
    // Test across leap year day
    const base = new Date(2024, 2, 1, 12, 0, 0); // Mar 1, 2024, 12:00:00 (leap year)
    const result = subHours(base, 24); // Go back 24 hours
    const expected = new Date(2024, 1, 29, 12, 0, 0); // Feb 29, 2024, 12:00:00
    
    expect(result.getTime()).toBe(expected.getTime());
  });
});