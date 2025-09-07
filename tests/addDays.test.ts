import { describe, it, expect } from "vitest";
import { addDays } from "../src/addDays";

describe("addDays", () => {
  it.each([
    // --- Valid cases ---
    {
      base: new Date(2025, 0, 1), // Jan 1, 2025
      amount: 5,
      expected: new Date(2025, 0, 6),
      desc: "adds positive days",
    },
    {
      base: new Date(2025, 0, 10),
      amount: -3,
      expected: new Date(2025, 0, 7),
      desc: "adds negative days",
    },
    {
      base: new Date(2025, 0, 31),
      amount: 1,
      expected: new Date(2025, 1, 1), // Feb 1, 2025
      desc: "crosses month boundary",
    },
    {
      base: new Date(2024, 1, 28), // Feb 28, 2024 (leap year)
      amount: 1,
      expected: new Date(2024, 1, 29),
      desc: "handles leap year",
    },
    {
      base: new Date(2023, 1, 28), // Feb 28, 2023 (non-leap year)
      amount: 1,
      expected: new Date(2023, 2, 1),
      desc: "handles non-leap year",
    },
    {
      base: new Date(2025, 0, 1).getTime(),
      amount: 10,
      expected: new Date(2025, 0, 11),
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
  ])("$desc", ({ base, amount, expected }) => {
    const result = addDays(base as Date | number, amount);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });
});
