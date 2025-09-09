import { describe, it, expect } from "vitest";
import { subMonths } from "../src/subMonths";

describe("subMonths", () => {
  it.each([
    // --- Valid cases ---
    {
      base: new Date(2025, 6, 15), // Jul 15, 2025
      amount: 3,
      expected: new Date(2025, 3, 15), // Apr 15, 2025
      desc: "subtracts positive months",
    },
    {
      base: new Date(2025, 3, 15), // Apr 15, 2025
      amount: -2,
      expected: new Date(2025, 5, 15), // Jun 15, 2025 (subtracting negative = adding)
      desc: "subtracts negative months (adds)",
    },
    {
      base: new Date(2025, 6, 15), // Jul 15, 2025
      amount: 0,
      expected: new Date(2025, 6, 15), // Same date
      desc: "subtracting zero months returns same date",
    },

    // --- Year boundary crossing ---
    {
      base: new Date(2025, 1, 15), // Feb 15, 2025
      amount: 3,
      expected: new Date(2024, 10, 15), // Nov 15, 2024
      desc: "crosses year boundary backward",
    },
    {
      base: new Date(2025, 10, 15), // Nov 15, 2025
      amount: -2,
      expected: new Date(2026, 0, 15), // Jan 15, 2026 (subtracting negative)
      desc: "crosses year boundary forward with negative amount",
    },

    // --- Month-end edge cases ---
    {
      base: new Date(2025, 2, 31), // Mar 31, 2025
      amount: 1,
      expected: new Date(2025, 1, 28), // Feb 28, 2025 (Feb has only 28 days)
      desc: "handles month-end overflow (Mar 31 -> Feb 28)",
    },
    {
      base: new Date(2024, 2, 31), // Mar 31, 2024 (leap year)
      amount: 1,
      expected: new Date(2024, 1, 29), // Feb 29, 2024 (leap year)
      desc: "handles month-end overflow in leap year (Mar 31 -> Feb 29)",
    },
    {
      base: new Date(2025, 4, 31), // May 31, 2025
      amount: 1,
      expected: new Date(2025, 3, 30), // Apr 30, 2025 (Apr has only 30 days)
      desc: "handles month-end overflow (May 31 -> Apr 30)",
    },
    {
      base: new Date(2025, 6, 31), // Jul 31, 2025
      amount: 1,
      expected: new Date(2025, 5, 30), // Jun 30, 2025 (Jun has only 30 days)
      desc: "handles month-end overflow (Jul 31 -> Jun 30)",
    },

    // --- Leap year handling ---
    {
      base: new Date(2025, 1, 28), // Feb 28, 2025 (non-leap year)
      amount: 12,
      expected: new Date(2024, 1, 28), // Feb 28, 2024 (leap year, but same day)
      desc: "handles non-leap year to leap year",
    },
    {
      base: new Date(2024, 1, 29), // Feb 29, 2024 (leap year)
      amount: 12,
      expected: new Date(2023, 1, 28), // Feb 28, 2023 (non-leap year)
      desc: "handles leap year to non-leap year (Feb 29 -> Feb 28)",
    },

    // --- Same month, different day cases ---
    {
      base: new Date(2025, 0, 30), // Jan 30, 2025
      amount: 12,
      expected: new Date(2024, 0, 30), // Jan 30, 2024
      desc: "handles same month with sufficient days",
    },
    {
      base: new Date(2025, 0, 31), // Jan 31, 2025
      amount: 24,
      expected: new Date(2023, 0, 31), // Jan 31, 2023
      desc: "handles large month subtraction",
    },

    // --- Timestamp input ---
    {
      base: new Date(2025, 6, 15).getTime(),
      amount: 4,
      expected: new Date(2025, 2, 15), // Mar 15, 2025
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
      base: new Date(2025, 6, 15),
      amount: NaN,
      expected: new Date(NaN),
      desc: "returns Invalid Date when amount is NaN",
    },
    {
      base: new Date(2025, 6, 15),
      amount: Infinity,
      expected: new Date(NaN),
      desc: "returns Invalid Date when amount is Infinity",
    },
    {
      base: new Date(2025, 6, 15),
      amount: -Infinity,
      expected: new Date(NaN),
      desc: "returns Invalid Date when amount is -Infinity",
    },
  ])("$desc", ({ base, amount, expected }) => {
    const result = subMonths(base as Date | number, amount);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });

  it("does not mutate the original date", () => {
    const original = new Date(2025, 6, 15);
    const originalTime = original.getTime();
    
    subMonths(original, 3);
    
    expect(original.getTime()).toBe(originalTime);
  });

  it("handles large month subtractions correctly", () => {
    const base = new Date(2025, 6, 15); // Jul 15, 2025
    const result = subMonths(base, 25); // Subtract 25 months
    const expected = new Date(2023, 5, 15); // Jun 15, 2023
    
    expect(result.getTime()).toBe(expected.getTime());
  });
});