import { describe, it, expect } from "vitest";
import { subYears } from "../src/subYears";

describe("subYears", () => {
  it.each([
    // --- Valid cases ---
    {
      base: new Date(2025, 8, 20), // Sep 20, 2025
      amount: 5,
      expected: new Date(2020, 8, 20), // Sep 20, 2020
      desc: "subtracts positive years",
    },
    {
      base: new Date(2020, 3, 15), // Apr 15, 2020
      amount: -3,
      expected: new Date(2023, 3, 15), // Apr 15, 2023 (subtracting negative = adding)
      desc: "subtracts negative years (adds)",
    },
    {
      base: new Date(2025, 7, 10), // Aug 10, 2025
      amount: 0,
      expected: new Date(2025, 7, 10), // Same date
      desc: "subtracting zero years returns same date",
    },

    // --- Leap year handling ---
    {
      base: new Date(2021, 1, 28), // Feb 28, 2021 (non-leap year)
      amount: 1,
      expected: new Date(2020, 1, 28), // Feb 28, 2020 (leap year, but same day)
      desc: "handles non-leap year to leap year",
    },
    {
      base: new Date(2024, 1, 29), // Feb 29, 2024 (leap year)
      amount: 1,
      expected: new Date(2023, 1, 28), // Feb 28, 2023 (non-leap year)
      desc: "handles leap year to non-leap year (Feb 29 -> Feb 28)",
    },
    {
      base: new Date(2024, 1, 29), // Feb 29, 2024 (leap year)
      amount: 4,
      expected: new Date(2020, 1, 29), // Feb 29, 2020 (leap year)
      desc: "handles leap year to leap year (Feb 29 -> Feb 29)",
    },
    {
      base: new Date(2023, 1, 28), // Feb 28, 2023 (non-leap year)
      amount: -1,
      expected: new Date(2024, 1, 28), // Feb 28, 2024 (leap year, same day)
      desc: "handles non-leap year to leap year with negative amount",
    },

    // --- Century transitions ---
    {
      base: new Date(2000, 0, 1), // Jan 1, 2000
      amount: 1,
      expected: new Date(1999, 0, 1), // Jan 1, 1999
      desc: "handles century transition backwards (2000 -> 1999)",
    },
    {
      base: new Date(1999, 11, 31), // Dec 31, 1999
      amount: -1,
      expected: new Date(2000, 11, 31), // Dec 31, 2000
      desc: "handles reverse century transition with negative amount",
    },

    // --- Special leap year cases ---
    {
      base: new Date(2000, 1, 29), // Feb 29, 2000 (leap year - century divisible by 400)
      amount: 4,
      expected: new Date(1996, 1, 29), // Feb 29, 1996 (leap year)
      desc: "handles century leap year (2000 -> 1996)",
    },
    {
      base: new Date(1900, 1, 28), // Feb 28, 1900 (not leap year - century not divisible by 400)
      amount: -4,
      expected: new Date(1904, 1, 28), // Feb 28, 1904 (leap year)
      desc: "handles non-century leap year transition",
    },

    // --- Edge cases with different months ---
    {
      base: new Date(2025, 11, 31), // Dec 31, 2025
      amount: 10,
      expected: new Date(2015, 11, 31), // Dec 31, 2015
      desc: "handles year-end dates correctly",
    },
    {
      base: new Date(2030, 5, 15), // Jun 15, 2030
      amount: 25,
      expected: new Date(2005, 5, 15), // Jun 15, 2005
      desc: "handles large year subtractions",
    },

    // --- Multiple leap year adjustments ---
    {
      base: new Date(2028, 1, 29), // Feb 29, 2028 (leap year)
      amount: 3,
      expected: new Date(2025, 1, 28), // Feb 28, 2025 (non-leap year)
      desc: "handles leap to non-leap year adjustment",
    },
    {
      base: new Date(2032, 1, 29), // Feb 29, 2032 (leap year)
      amount: 8,
      expected: new Date(2024, 1, 29), // Feb 29, 2024 (leap year)
      desc: "handles leap to leap year preservation",
    },

    // --- Timestamp input ---
    {
      base: new Date(2025, 4, 20).getTime(),
      amount: 7,
      expected: new Date(2018, 4, 20), // May 20, 2018
      desc: "accepts timestamp input",
    },

    // --- Invalid cases ---
    {
      base: new Date("invalid"),
      amount: 5,
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
    const result = subYears(base as Date | number, amount);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });

  it("does not mutate the original date", () => {
    const original = new Date(2025, 8, 15);
    const originalTime = original.getTime();
    
    subYears(original, 5);
    
    expect(original.getTime()).toBe(originalTime);
  });

  it("handles extreme year subtractions", () => {
    const base = new Date(2025, 3, 10);
    const result = subYears(base, 50); // Subtract 50 years
    const expected = new Date(1975, 3, 10);
    
    expect(result.getTime()).toBe(expected.getTime());
  });

  it("handles complex leap year sequences", () => {
    // Test going backwards through multiple leap years
    const base = new Date(2024, 1, 29); // Feb 29, 2024
    const result = subYears(base, 12); // Go back 12 years
    const expected = new Date(2012, 1, 29); // Feb 29, 2012 (also leap year)
    
    expect(result.getTime()).toBe(expected.getTime());
  });
});