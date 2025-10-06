import { describe, it, expect } from "vitest";
import { subDays } from "../src/subDays";

describe("subDays", () => {
  it.each([
    // --- Valid cases ---
    {
      date: new Date(2025, 0, 10),
      amount: 5,
      expected: new Date(2025, 0, 5),
      desc: "subtracts positive days",
    },
    {
      date: new Date(2025, 0, 5),
      amount: -3,
      expected: new Date(2025, 0, 8),
      desc: "subtracts negative days (adds)",
    },
    {
      date: new Date(2025, 0, 15),
      amount: 0,
      expected: new Date(2025, 0, 15),
      desc: "subtracting zero days returns same date",
    },
    {
      date: new Date(2025, 0, 5),
      amount: 1.9,
      expected: new Date(2025, 0, 4),
      desc: "truncates fractional amount (positive)",
    },
    {
      date: new Date(2025, 0, 5),
      amount: -1.9,
      expected: new Date(2025, 0, 6),
      desc: "truncates fractional amount (negative)",
    },
    {
      date: new Date(2025, 1, 1),
      amount: 1,
      expected: new Date(2025, 0, 31),
      desc: "crosses month boundary backward",
    },
    {
      date: new Date(2024, 2, 1),
      amount: 1,
      expected: new Date(2024, 1, 29),
      desc: "handles leap year backward (Mar 1 → Feb 29)",
    },
    {
      date: new Date(2023, 2, 1),
      amount: 1,
      expected: new Date(2023, 1, 28),
      desc: "handles non-leap year backward (Mar 1 → Feb 28)",
    },
    {
      date: new Date(2025, 0, 1),
      amount: 1,
      expected: new Date(2024, 11, 31),
      desc: "crosses year boundary backward",
    },
    {
      date: new Date(2025, 0, 15).getTime(),
      amount: 10,
      expected: new Date(2025, 0, 5),
      desc: "accepts timestamp input",
    },
    {
      date: new Date(2025, 0, 15),
      amount: 365,
      expected: new Date(2024, 0, 16),
      desc: "handles large positive days",
    },
    {
      date: new Date(2025, 0, 15),
      amount: -365,
      expected: new Date(2026, 0, 15),
      desc: "subtracts large negative days (adds)",
    },

    // --- Invalid cases ---
    {
      date: new Date("invalid"),
      amount: 5,
      expected: new Date(NaN),
      desc: "returns Invalid Date when base is invalid",
    },
    {
      date: new Date(2025, 0, 1),
      amount: NaN,
      expected: new Date(NaN),
      desc: "returns Invalid Date when amount is NaN",
    },
    {
      date: new Date(2025, 0, 1),
      amount: Infinity,
      expected: new Date(NaN),
      desc: "returns Invalid Date when amount is Infinity",
    },
    {
      date: new Date(2025, 0, 1),
      amount: -Infinity,
      expected: new Date(NaN),
      desc: "returns Invalid Date when amount is -Infinity",
    },
    {
      date: NaN,
      amount: 1,
      expected: new Date(NaN),
      desc: "returns Invalid Date when timestamp is NaN",
    },
  ])("$desc", ({ date, amount, expected }) => {
    const result = subDays(date as Date | number, amount);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });
});