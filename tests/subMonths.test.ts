import { describe, it, expect } from "vitest";
import { subMonths } from "../src/subMonths";

describe("subMonths", () => {
  it.each([
    // --- Valid cases ---
    {
      date: new Date(2025, 6, 15),
      amount: 3,
      expected: new Date(2025, 3, 15),
      desc: "subtracts positive months",
    },
    {
      date: new Date(2025, 3, 15),
      amount: -2,
      expected: new Date(2025, 5, 15),
      desc: "subtracts negative months (adds)",
    },
    {
      date: new Date(2025, 6, 15),
      amount: 0,
      expected: new Date(2025, 6, 15),
      desc: "subtracting zero months returns same date",
    },
    {
      date: new Date(2025, 3, 15),
      amount: 1.9,
      expected: new Date(2025, 2, 15),
      desc: "truncates fractional amount (positive)",
    },
    {
      date: new Date(2025, 3, 15),
      amount: -1.9,
      expected: new Date(2025, 4, 15),
      desc: "truncates fractional amount (negative)",
    },
    {
      date: new Date(2025, 2, 31),
      amount: 1,
      expected: new Date(2025, 1, 28),
      desc: "handles month-end overflow (Mar 31 -> Feb 28)",
    },
    {
      date: new Date(2024, 2, 31),
      amount: 1,
      expected: new Date(2024, 1, 29),
      desc: "handles month-end overflow in leap year (Mar 31 -> Feb 29)",
    },
    {
      date: new Date(2025, 4, 31),
      amount: 1,
      expected: new Date(2025, 3, 30),
      desc: "handles month-end overflow (May 31 -> Apr 30)",
    },
    {
      date: new Date(2025, 1, 28),
      amount: 12,
      expected: new Date(2024, 1, 28),
      desc: "handles non-leap year to leap year",
    },
    {
      date: new Date(2025, 1, 15),
      amount: 3,
      expected: new Date(2024, 10, 15),
      desc: "crosses year boundary backward",
    },
    {
      date: new Date(2025, 10, 15),
      amount: -2,
      expected: new Date(2026, 0, 15),
      desc: "crosses year boundary forward with negative amount",
    },
    {
      date: new Date(2025, 6, 15).getTime(),
      amount: 4,
      expected: new Date(2025, 2, 15),
      desc: "accepts timestamp input",
    },
    {
      date: new Date(2025, 6, 15),
      amount: 100,
      expected: new Date(2017, 2, 15),
      desc: "handles large positive months",
    },
    {
      date: new Date(2025, 6, 15),
      amount: -100,
      expected: new Date(2033, 10, 15),
      desc: "subtracts large negative months (adds)",
    },

    // --- Invalid cases ---
    {
      date: new Date("invalid"),
      amount: 3,
      expected: new Date(NaN),
      desc: "returns Invalid Date when base is invalid",
    },
    {
      date: new Date(2025, 6, 15),
      amount: NaN,
      expected: new Date(NaN),
      desc: "returns Invalid Date when amount is NaN",
    },
    {
      date: new Date(2025, 6, 15),
      amount: Infinity,
      expected: new Date(NaN),
      desc: "returns Invalid Date when amount is Infinity",
    },
    {
      date: new Date(2025, 6, 15),
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
    {
      date: "2025-07-15" as any,
      amount: 1,
      expected: new Date(NaN),
      desc: "rejects string as date",
    },
    {
      date: new Date(2025, 6, 15),
      amount: "1" as any,
      expected: new Date(NaN),
      desc: "rejects string as amount",
    },
    {
      date: new Date("2021-01-31T15:00:00Z"),
      amount: 1,
      expected: new Date("2020-12-31T15:00:00Z"),
      desc: "works correctly across UTC/JST boundary",
    },
  ])("$desc", ({ date, amount, expected }) => {
    const result = subMonths(date as Date | number, amount);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });
});