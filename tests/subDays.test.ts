import { describe, it, expect } from "vitest";
import { subDays } from "../src/subDays";

describe("subDays", () => {
  it.each([
    // --- Valid cases ---
    {
      base: new Date(2025, 0, 10), // Jan 10, 2025
      amount: 5,
      expected: new Date(2025, 0, 5), // Jan 5, 2025
      desc: "subtracts positive days",
    },
    {
      base: new Date(2025, 0, 5),
      amount: -3,
      expected: new Date(2025, 0, 8), // Jan 8, 2025 (subtracting negative = adding)
      desc: "subtracts negative days (adds)",
    },
    {
      base: new Date(2025, 1, 1), // Feb 1, 2025
      amount: 1,
      expected: new Date(2025, 0, 31), // Jan 31, 2025
      desc: "crosses month boundary backwards",
    },
    {
      base: new Date(2024, 2, 1), // Mar 1, 2024 (leap year)
      amount: 1,
      expected: new Date(2024, 1, 29), // Feb 29, 2024
      desc: "handles leap year backwards",
    },
    {
      base: new Date(2023, 2, 1), // Mar 1, 2023 (non-leap year)
      amount: 1,
      expected: new Date(2023, 1, 28), // Feb 28, 2023
      desc: "handles non-leap year backwards",
    },
    {
      base: new Date(2025, 0, 15).getTime(),
      amount: 10,
      expected: new Date(2025, 0, 5), // Jan 5, 2025
      desc: "accepts timestamp input",
    },
    {
      base: new Date(2025, 0, 1), // Jan 1, 2025
      amount: 0,
      expected: new Date(2025, 0, 1), // Same date
      desc: "subtracting zero returns same date",
    },

    // --- Invalid cases ---
    {
      base: new Date("invalid"),
      amount: 5,
      expected: new Date(NaN),
      desc: "returns Invalid Date when base is invalid",
    },
    {
      base: new Date(2025, 0, 1),
      amount: NaN,
      expected: new Date(NaN),
      desc: "returns Invalid Date when amount is NaN",
    },
    {
      base: new Date(2025, 0, 1),
      amount: Infinity,
      expected: new Date(NaN),
      desc: "returns Invalid Date when amount is Infinity",
    },
    {
      base: new Date(2025, 0, 1),
      amount: -Infinity,
      expected: new Date(NaN),
      desc: "returns Invalid Date when amount is -Infinity",
    },
  ])("$desc", ({ base, amount, expected }) => {
    const result = subDays(base as Date | number, amount);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });

  it("does not mutate the original date", () => {
    const original = new Date(2025, 0, 15);
    const originalTime = original.getTime();
    
    subDays(original, 5);
    
    expect(original.getTime()).toBe(originalTime);
  });
});