import { describe, it, expect } from "vitest";
import { addDays } from "../src/addDays";

describe("addDays", () => {
  it.each([
    // --- Valid cases ---
    {
      date: new Date(2025, 0, 1),
      amount: 5,
      expected: new Date(2025, 0, 6),
      desc: "adds positive days",
    },
    {
      date: new Date(2025, 0, 10),
      amount: -3,
      expected: new Date(2025, 0, 7),
      desc: "adds negative days (subtracts)",
    },
    {
      date: new Date(2025, 0, 15),
      amount: 0,
      expected: new Date(2025, 0, 15),
      desc: "adding zero days returns same date",
    },
    {
      date: new Date(2025, 0, 1),
      amount: 1.9,
      expected: new Date(2025, 0, 2),
      desc: "truncates fractional amount (positive)",
    },
    {
      date: new Date(2025, 0, 5),
      amount: -1.9,
      expected: new Date(2025, 0, 4),
      desc: "truncates fractional amount (negative)",
    },
    {
      date: new Date(2025, 0, 31),
      amount: 1,
      expected: new Date(2025, 1, 1),
      desc: "crosses month boundary",
    },
    {
      date: new Date(2024, 1, 28),
      amount: 1,
      expected: new Date(2024, 1, 29),
      desc: "handles leap year (Feb 28 → Feb 29)",
    },
    {
      date: new Date(2023, 1, 28),
      amount: 1,
      expected: new Date(2023, 2, 1),
      desc: "handles non-leap year (Feb 28 → Mar 1)",
    },
    {
      date: new Date(2025, 11, 31),
      amount: 1,
      expected: new Date(2026, 0, 1),
      desc: "crosses year boundary",
    },
    {
      date: new Date(2025, 0, 1).getTime(),
      amount: 10,
      expected: new Date(2025, 0, 11),
      desc: "accepts timestamp input",
    },
    {
      date: new Date(2025, 0, 1),
      amount: 365,
      expected: new Date(2026, 0, 1),
      desc: "handles large positive days",
    },
    {
      date: new Date(2025, 0, 1),
      amount: -365,
      expected: new Date(2024, 0, 2),
      desc: "handles large negative days",
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
    {
      date: "2020-01-01" as any,
      amount: 1,
      expected: new Date(NaN),
      desc: "rejects string as date",
    },
    {
      date: new Date(2020, 0, 1),
      amount: "1" as any,
      expected: new Date(NaN),
      desc: "rejects string as amount",
    },
    {
      date: new Date("2020-12-31T15:00:00Z"),
      amount: 1,
      expected: new Date("2021-01-01T15:00:00Z"),
      desc: "works correctly across UTC/JST boundary",
    },
  ])("$desc", ({ date, amount, expected }) => {
    const result = addDays(date as Date | number, amount);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });
});