import { describe, it, expect } from "vitest";
import { addMilliseconds } from "../src/addMilliseconds";

describe("addMilliseconds", () => {
  it.each([
    // --- Valid cases ---
    {
      date: new Date(2020, 5, 15, 12, 0, 0, 0),
      amount: 500,
      expected: new Date(2020, 5, 15, 12, 0, 0, 500),
      desc: "adds positive milliseconds",
    },
    {
      date: new Date(2025, 8, 10, 15, 0, 0, 500),
      amount: -300,
      expected: new Date(2025, 8, 10, 15, 0, 0, 200),
      desc: "adds negative milliseconds (subtracts)",
    },
    {
      date: new Date(2025, 3, 20, 10, 0, 0, 100),
      amount: 0,
      expected: new Date(2025, 3, 20, 10, 0, 0, 100),
      desc: "adding zero milliseconds returns same date",
    },
    {
      date: new Date(2020, 0, 1, 12, 0, 0, 0),
      amount: 1.9,
      expected: new Date(2020, 0, 1, 12, 0, 0, 1),
      desc: "truncates fractional amount (positive)",
    },
    {
      date: new Date(2020, 0, 1, 12, 0, 0, 100),
      amount: -2.7,
      expected: new Date(2020, 0, 1, 12, 0, 0, 98),
      desc: "truncates fractional amount (negative)",
    },
    {
      date: new Date(2020, 0, 1, 12, 0, 0, 999),
      amount: 1,
      expected: new Date(2020, 0, 1, 12, 0, 1, 0),
      desc: "crosses second boundary forward",
    },
    {
      date: new Date(2020, 0, 1, 12, 0, 1, 0),
      amount: -1,
      expected: new Date(2020, 0, 1, 12, 0, 0, 999),
      desc: "crosses second boundary backward",
    },
    {
      date: new Date(2020, 0, 1, 12, 59, 59, 999),
      amount: 1,
      expected: new Date(2020, 0, 1, 13, 0, 0, 0),
      desc: "crosses minute and hour boundary forward",
    },
    {
      date: new Date(2020, 0, 1, 23, 59, 59, 999),
      amount: 1,
      expected: new Date(2020, 0, 2, 0, 0, 0, 0),
      desc: "crosses day boundary forward",
    },
    {
      date: new Date(2020, 0, 31, 23, 59, 59, 999),
      amount: 1,
      expected: new Date(2020, 1, 1, 0, 0, 0, 0),
      desc: "crosses month boundary",
    },
    {
      date: new Date(2020, 11, 31, 23, 59, 59, 999),
      amount: 1,
      expected: new Date(2021, 0, 1, 0, 0, 0, 0),
      desc: "crosses year boundary",
    },
    {
      date: new Date(2020, 6, 15, 12, 0, 0, 0).getTime(),
      amount: 500,
      expected: new Date(2020, 6, 15, 12, 0, 0, 500),
      desc: "accepts timestamp input",
    },
    {
      date: new Date(2025, 0, 1, 0, 0, 0, 0),
      amount: 1000000,
      expected: new Date(2025, 0, 1, 0, 16, 40, 0),
      desc: "handles large positive milliseconds",
    },
    {
      date: new Date(2025, 0, 10, 0, 0, 0, 0),
      amount: -1000000,
      expected: new Date(2025, 0, 9, 23, 43, 20, 0),
      desc: "handles large negative milliseconds",
    },

    // --- Invalid cases ---
    {
      date: new Date("invalid"),
      amount: 500,
      expected: new Date(NaN),
      desc: "returns Invalid Date when base is invalid",
    },
    {
      date: new Date(2025, 0, 15, 12, 0, 0, 0),
      amount: NaN,
      expected: new Date(NaN),
      desc: "returns Invalid Date when amount is NaN",
    },
    {
      date: new Date(2025, 0, 15, 12, 0, 0, 0),
      amount: Infinity,
      expected: new Date(NaN),
      desc: "returns Invalid Date when amount is Infinity",
    },
    {
      date: new Date(2025, 0, 15, 12, 0, 0, 0),
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
    const result = addMilliseconds(date as Date | number, amount);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });
});