import { describe, it, expect } from "vitest";
import { addYears } from "../src/addYears";

describe("addYears", () => {
  it.each([
    // --- Valid cases ---
    {
      base: new Date(2020, 5, 15), // Jun 15, 2020
      amount: 3,
      expected: new Date(2023, 5, 15), // Jun 15, 2023
      desc: "adds positive years",
    },
    {
      base: new Date(2025, 8, 10), // Sep 10, 2025
      amount: -5,
      expected: new Date(2020, 8, 10), // Sep 10, 2020
      desc: "adds negative years (subtracts)",
    },
    {
      base: new Date(2025, 3, 20), // Apr 20, 2025
      amount: 0,
      expected: new Date(2025, 3, 20), // Same date
      desc: "adding zero years returns same date",
    },

    // --- Leap year handling ---
    {
      base: new Date(2020, 1, 29), // Feb 29, 2020 (leap year)
      amount: 1,
      expected: new Date(2021, 1, 28), // Feb 28, 2021 (non-leap year)
      desc: "handles leap year to non-leap year (Feb 29 -> Feb 28)",
    },
    {
      base: new Date(2020, 1, 29), // Feb 29, 2020 (leap year)
      amount: 4,
      expected: new Date(2024, 1, 29), // Feb 29, 2024 (leap year)
      desc: "handles leap year to leap year (Feb 29 -> Feb 29)",
    },
    {
      base: new Date(2021, 1, 28), // Feb 28, 2021 (non-leap year)
      amount: 3,
      expected: new Date(2024, 1, 28), // Feb 28, 2024 (leap year, but same day)
      desc: "handles non-leap year to leap year",
    },
    {
      base: new Date(2024, 1, 29), // Feb 29, 2024 (leap year)
      amount: -1,
      expected: new Date(2023, 1, 28), // Feb 28, 2023 (non-leap year)
      desc: "handles leap year to non-leap year with negative amount",
    },

    // --- Century transitions ---
    {
      base: new Date(1999, 11, 31), // Dec 31, 1999
      amount: 1,
      expected: new Date(2000, 11, 31), // Dec 31, 2000
      desc: "handles century transition (1999 -> 2000)",
    },
    {
      base: new Date(2000, 0, 1), // Jan 1, 2000
      amount: -1,
      expected: new Date(1999, 0, 1), // Jan 1, 1999
      desc: "handles reverse century transition (2000 -> 1999)",
    },

    // --- Edge cases with different months ---
    {
      base: new Date(2020, 0, 31), // Jan 31, 2020
      amount: 2,
      expected: new Date(2022, 0, 31), // Jan 31, 2022
      desc: "handles month-end dates correctly",
    },
    {
      base: new Date(2020, 11, 25), // Dec 25, 2020
      amount: 10,
      expected: new Date(2030, 11, 25), // Dec 25, 2030
      desc: "handles large year additions",
    },

    // --- Timestamp input ---
    {
      base: new Date(2020, 6, 15).getTime(),
      amount: 5,
      expected: new Date(2025, 6, 15), // Jul 15, 2025
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
    const result = addYears(base as Date | number, amount);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });

  it("does not mutate the original date", () => {
    const original = new Date(2020, 5, 15);
    const originalTime = original.getTime();
    
    addYears(original, 3);
    
    expect(original.getTime()).toBe(originalTime);
  });

  it("handles multiple leap year transitions", () => {
    // Test multiple consecutive leap years
    const base = new Date(2020, 1, 29); // Feb 29, 2020
    const result = addYears(base, 8); // Add 8 years -> 2028 (leap year)
    const expected = new Date(2028, 1, 29); // Feb 29, 2028
    
    expect(result.getTime()).toBe(expected.getTime());
  });

  it("handles extreme year values", () => {
    const base = new Date(2020, 5, 15);
    const result = addYears(base, 100); // Add 100 years
    const expected = new Date(2120, 5, 15);
    
    expect(result.getTime()).toBe(expected.getTime());
  });
});