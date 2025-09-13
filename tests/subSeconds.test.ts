import { describe, it, expect } from "vitest";
import { subSeconds } from "../src/subSeconds";

describe("subSeconds", () => {
  it.each([
    // --- Valid cases ---
    {
      base: new Date(2025, 0, 15, 12, 30, 45), // Jan 15, 2025, 12:30:45
      amount: 15,
      expected: new Date(2025, 0, 15, 12, 30, 30), // Jan 15, 2025, 12:30:30
      desc: "subtracts positive seconds",
    },
    {
      base: new Date(2025, 0, 15, 15, 45, 10), // Jan 15, 2025, 15:45:10
      amount: -20,
      expected: new Date(2025, 0, 15, 15, 45, 30), // Jan 15, 2025, 15:45:30 (subtracting negative = adding)
      desc: "subtracts negative seconds (adds)",
    },
    {
      base: new Date(2025, 0, 15, 10, 30, 30), // Jan 15, 2025, 10:30:30
      amount: 0,
      expected: new Date(2025, 0, 15, 10, 30, 30), // Same time
      desc: "subtracting zero seconds returns same time",
    },

    // --- Minute boundary crossing ---
    {
      base: new Date(2025, 0, 15, 13, 31, 15), // Jan 15, 2025, 13:31:15
      amount: 30,
      expected: new Date(2025, 0, 15, 13, 30, 45), // Jan 15, 2025, 13:30:45
      desc: "crosses minute boundary backward",
    },
    {
      base: new Date(2025, 0, 15, 12, 30, 45), // Jan 15, 2025, 12:30:45
      amount: -30,
      expected: new Date(2025, 0, 15, 12, 31, 15), // Jan 15, 2025, 12:31:15 (subtracting negative)
      desc: "crosses minute boundary forward with negative amount",
    },

    // --- Hour boundary crossing ---
    {
      base: new Date(2025, 0, 15, 13, 0, 15), // Jan 15, 2025, 13:00:15
      amount: 30,
      expected: new Date(2025, 0, 15, 12, 59, 45), // Jan 15, 2025, 12:59:45
      desc: "crosses hour boundary backward",
    },
    {
      base: new Date(2025, 0, 15, 12, 59, 45), // Jan 15, 2025, 12:59:45
      amount: -30,
      expected: new Date(2025, 0, 15, 13, 0, 15), // Jan 15, 2025, 13:00:15 (subtracting negative)
      desc: "crosses hour boundary forward with negative amount",
    },

    // --- Day boundary crossing ---
    {
      base: new Date(2025, 0, 15, 0, 0, 15), // Jan 15, 2025, 00:00:15
      amount: 30,
      expected: new Date(2025, 0, 14, 23, 59, 45), // Jan 14, 2025, 23:59:45
      desc: "crosses day boundary backward",
    },
    {
      base: new Date(2025, 0, 15, 23, 59, 45), // Jan 15, 2025, 23:59:45
      amount: -30,
      expected: new Date(2025, 0, 16, 0, 0, 15), // Jan 16, 2025, 00:00:15 (subtracting negative)
      desc: "crosses day boundary forward with negative amount",
    },

    // --- Month boundary crossing ---
    {
      base: new Date(2025, 1, 1, 0, 0, 10), // Feb 1, 2025, 00:00:10
      amount: 20,
      expected: new Date(2025, 0, 31, 23, 59, 50), // Jan 31, 2025, 23:59:50
      desc: "crosses month boundary backward",
    },

    // --- Year boundary crossing ---
    {
      base: new Date(2025, 0, 1, 0, 0, 5), // Jan 1, 2025, 00:00:05
      amount: 15,
      expected: new Date(2024, 11, 31, 23, 59, 50), // Dec 31, 2024, 23:59:50
      desc: "crosses year boundary backward",
    },

    // --- Large second subtractions ---
    {
      base: new Date(2025, 0, 2, 0, 1, 30), // Jan 2, 2025, 00:01:30
      amount: 90,
      expected: new Date(2025, 0, 2, 0, 0, 0), // Jan 2, 2025, 00:00:00
      desc: "handles large second subtractions (90 seconds)",
    },
    {
      base: new Date(2025, 0, 2, 13, 0, 0), // Jan 2, 2025, 13:00:00
      amount: 3600,
      expected: new Date(2025, 0, 2, 12, 0, 0), // Jan 2, 2025, 12:00:00
      desc: "subtracts full hour worth of seconds (3600)",
    },
    {
      base: new Date(2025, 0, 3, 12, 0, 0), // Jan 3, 2025, 12:00:00
      amount: 86400,
      expected: new Date(2025, 0, 2, 12, 0, 0), // Jan 2, 2025, 12:00:00
      desc: "subtracts full day worth of seconds (86400)",
    },

    // --- Fractional seconds ---
    {
      base: new Date(2025, 0, 15, 12, 0, 1, 500), // Jan 15, 2025, 12:00:01.500
      amount: 1.5,
      expected: new Date(2025, 0, 15, 12, 0, 0, 500), // Jan 15, 2025, 12:00:00.500 (1 second subtracted, 0.5 truncated)
      desc: "handles fractional seconds (1.5 seconds)",
    },
    {
      base: new Date(2025, 0, 15, 10, 15, 0, 500), // Jan 15, 2025, 10:15:00.500
      amount: 0.5,
      expected: new Date(2025, 0, 15, 10, 15, 0, 500), // Jan 15, 2025, 10:15:00.500 (0 seconds subtracted, 0.5 truncated)
      desc: "handles half second (0.5 seconds)",
    },
    {
      base: new Date(2025, 0, 15, 10, 15, 0, 1), // Jan 15, 2025, 10:15:00.001
      amount: 0.001,
      expected: new Date(2025, 0, 15, 10, 15, 0, 1), // Jan 15, 2025, 10:15:00.001 (0 seconds subtracted, 0.001 truncated)
      desc: "handles millisecond precision (0.001 seconds)",
    },

    // --- Preserves milliseconds ---
    {
      base: new Date(2025, 0, 15, 12, 31, 0, 123), // Jan 15, 2025, 12:31:00.123
      amount: 15,
      expected: new Date(2025, 0, 15, 12, 30, 45, 123), // Jan 15, 2025, 12:30:45.123
      desc: "preserves milliseconds",
    },

    // --- Edge cases with midnight ---
    {
      base: new Date(2025, 0, 15, 0, 0, 1), // Jan 15, 2025, 00:00:01
      amount: 1,
      expected: new Date(2025, 0, 15, 0, 0, 0), // Jan 15, 2025, 00:00:00 (midnight)
      desc: "handles transition to midnight",
    },
    {
      base: new Date(2025, 0, 16, 0, 0, 0), // Jan 16, 2025, 00:00:00
      amount: 1,
      expected: new Date(2025, 0, 15, 23, 59, 59), // Jan 15, 2025, 23:59:59
      desc: "transitions from midnight to 23:59:59 previous day",
    },
    {
      base: new Date(2025, 0, 1, 0, 0, 0), // Jan 1, 2025, 00:00:00 (New Year midnight)
      amount: 60,
      expected: new Date(2024, 11, 31, 23, 59, 0), // Dec 31, 2024, 23:59:00
      desc: "handles New Year boundary",
    },

    // --- Timestamp input ---
    {
      base: new Date(2025, 0, 15, 12, 0, 45).getTime(),
      amount: 30,
      expected: new Date(2025, 0, 15, 12, 0, 15), // Jan 15, 2025, 12:00:15
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
    const result = subSeconds(base as Date | number, amount);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });

  it("does not mutate the original date", () => {
    const original = new Date(2025, 0, 15, 12, 30, 45);
    const originalTime = original.getTime();
    
    subSeconds(original, 30);
    
    expect(original.getTime()).toBe(originalTime);
  });

  it("handles extreme second subtractions", () => {
    const base = new Date(2025, 0, 15, 12, 0, 0);
    const result = subSeconds(base, 31622400); // Subtract 366 days worth of seconds (2024 is leap year)
    const expected = new Date(2024, 0, 15, 12, 0, 0); // One year earlier
    
    expect(result.getTime()).toBe(expected.getTime());
  });

  it("works correctly with leap year", () => {
    // Test across leap year day
    const base = new Date(2024, 2, 1, 12, 0, 0); // Mar 1, 2024, 12:00:00 (leap year)
    const result = subSeconds(base, 86400); // Go back 24 hours (86400 seconds)
    const expected = new Date(2024, 1, 29, 12, 0, 0); // Feb 29, 2024, 12:00:00
    
    expect(result.getTime()).toBe(expected.getTime());
  });

  it("handles precise fractional seconds", () => {
    const base = new Date(2025, 0, 15, 12, 0, 0, 250);
    const result = subSeconds(base, 0.25); // Quarter second truncated to 0
    const expected = new Date(2025, 0, 15, 12, 0, 0, 250); // No change (0 seconds subtracted)

    expect(result.getTime()).toBe(expected.getTime());
  });

  it("works at second precision edge", () => {
    const base = new Date(2025, 0, 15, 12, 0, 0, 999); // 999 milliseconds
    const result = subSeconds(base, 0.999); // 0.999 truncated to 0
    const expected = new Date(2025, 0, 15, 12, 0, 0, 999); // No change (0 seconds subtracted)

    expect(result.getTime()).toBe(expected.getTime());
  });
});