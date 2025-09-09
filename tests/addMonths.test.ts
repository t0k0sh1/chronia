import { describe, it, expect } from "vitest";
import { addMonths } from "../src/addMonths";

describe("addMonths", () => {
  it.each([
    // --- Valid cases ---
    {
      base: new Date(2025, 0, 15), // Jan 15, 2025
      amount: 3,
      expected: new Date(2025, 3, 15), // Apr 15, 2025
      desc: "adds positive months",
    },
    {
      base: new Date(2025, 5, 15), // Jun 15, 2025
      amount: -2,
      expected: new Date(2025, 3, 15), // Apr 15, 2025
      desc: "adds negative months (subtracts)",
    },
    {
      base: new Date(2025, 0, 15), // Jan 15, 2025
      amount: 0,
      expected: new Date(2025, 0, 15), // Same date
      desc: "adding zero months returns same date",
    },

    // --- Year boundary crossing ---
    {
      base: new Date(2025, 11, 15), // Dec 15, 2025
      amount: 2,
      expected: new Date(2026, 1, 15), // Feb 15, 2026
      desc: "crosses year boundary forward",
    },
    {
      base: new Date(2025, 1, 15), // Feb 15, 2025
      amount: -3,
      expected: new Date(2024, 10, 15), // Nov 15, 2024
      desc: "crosses year boundary backward",
    },

    // --- Month-end edge cases ---
    {
      base: new Date(2025, 0, 31), // Jan 31, 2025
      amount: 1,
      expected: new Date(2025, 1, 28), // Feb 28, 2025 (Feb has only 28 days)
      desc: "handles month-end overflow (Jan 31 -> Feb 28)",
    },
    {
      base: new Date(2024, 0, 31), // Jan 31, 2024 (leap year)
      amount: 1,
      expected: new Date(2024, 1, 29), // Feb 29, 2024 (leap year)
      desc: "handles month-end overflow in leap year (Jan 31 -> Feb 29)",
    },
    {
      base: new Date(2025, 2, 31), // Mar 31, 2025
      amount: 1,
      expected: new Date(2025, 3, 30), // Apr 30, 2025 (Apr has only 30 days)
      desc: "handles month-end overflow (Mar 31 -> Apr 30)",
    },
    {
      base: new Date(2025, 4, 31), // May 31, 2025
      amount: 1,
      expected: new Date(2025, 5, 30), // Jun 30, 2025 (Jun has only 30 days)
      desc: "handles month-end overflow (May 31 -> Jun 30)",
    },

    // --- Leap year handling ---
    {
      base: new Date(2024, 1, 29), // Feb 29, 2024 (leap year)
      amount: 12,
      expected: new Date(2025, 1, 28), // Feb 28, 2025 (non-leap year)
      desc: "handles leap year to non-leap year (Feb 29 -> Feb 28)",
    },
    {
      base: new Date(2023, 1, 28), // Feb 28, 2023 (non-leap year)
      amount: 12,
      expected: new Date(2024, 1, 28), // Feb 28, 2024 (leap year, but same day)
      desc: "handles non-leap year to leap year",
    },

    // --- Timestamp input ---
    {
      base: new Date(2025, 0, 15).getTime(),
      amount: 6,
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
    const result = addMonths(base as Date | number, amount);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });

  it("does not mutate the original date", () => {
    const original = new Date(2025, 0, 15);
    const originalTime = original.getTime();
    
    addMonths(original, 5);
    
    expect(original.getTime()).toBe(originalTime);
  });

  it("handles large month additions correctly", () => {
    const base = new Date(2025, 0, 15); // Jan 15, 2025
    const result = addMonths(base, 25); // Add 25 months
    const expected = new Date(2027, 1, 15); // Feb 15, 2027
    
    expect(result.getTime()).toBe(expected.getTime());
  });
});