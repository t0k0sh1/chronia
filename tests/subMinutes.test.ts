import { describe, it, expect } from "vitest";
import { subMinutes } from "../src/subMinutes";

describe("subMinutes", () => {
  it.each([
    // --- Valid cases ---
    {
      date: new Date(2025, 0, 15, 12, 45, 0),
      amount: 15,
      expected: new Date(2025, 0, 15, 12, 30, 0),
      desc: "subtracts positive minutes",
    },
    {
      date: new Date(2025, 0, 15, 15, 15, 0),
      amount: -30,
      expected: new Date(2025, 0, 15, 15, 45, 0),
      desc: "subtracts negative minutes (adds)",
    },
    {
      date: new Date(2025, 0, 15, 10, 30, 0),
      amount: 0,
      expected: new Date(2025, 0, 15, 10, 30, 0),
      desc: "subtracting zero minutes returns same time",
    },
    {
      date: new Date(2025, 0, 15, 12, 30, 0),
      amount: 1.9,
      expected: new Date(2025, 0, 15, 12, 29, 0),
      desc: "truncates fractional amount (positive)",
    },
    {
      date: new Date(2025, 0, 15, 12, 30, 0),
      amount: -1.9,
      expected: new Date(2025, 0, 15, 12, 31, 0),
      desc: "truncates fractional amount (negative)",
    },
    {
      date: new Date(2025, 0, 15, 13, 15, 0),
      amount: 30,
      expected: new Date(2025, 0, 15, 12, 45, 0),
      desc: "crosses hour boundary backward",
    },
    {
      date: new Date(2025, 0, 15, 0, 15, 0),
      amount: 30,
      expected: new Date(2025, 0, 14, 23, 45, 0),
      desc: "crosses day boundary backward",
    },
    {
      date: new Date(2025, 1, 1, 0, 15, 0),
      amount: 30,
      expected: new Date(2025, 0, 31, 23, 45, 0),
      desc: "crosses month boundary",
    },
    {
      date: new Date(2025, 0, 1, 0, 15, 0),
      amount: 30,
      expected: new Date(2024, 11, 31, 23, 45, 0),
      desc: "crosses year boundary",
    },
    {
      date: new Date(2025, 0, 15, 12, 45, 45, 123),
      amount: 15,
      expected: new Date(2025, 0, 15, 12, 30, 45, 123),
      desc: "preserves seconds and milliseconds",
    },
    {
      date: new Date(2025, 0, 15, 12, 45, 0).getTime(),
      amount: 30,
      expected: new Date(2025, 0, 15, 12, 15, 0),
      desc: "accepts timestamp input",
    },
    {
      date: new Date(2025, 0, 15, 12, 0, 0),
      amount: 10000,
      expected: new Date(2025, 0, 8, 13, 20, 0),
      desc: "handles large positive minutes",
    },
    {
      date: new Date(2025, 0, 15, 12, 0, 0),
      amount: -10000,
      expected: new Date(2025, 0, 22, 10, 40, 0),
      desc: "handles large negative minutes",
    },

    // --- Invalid cases ---
    {
      date: new Date("invalid"),
      amount: 30,
      expected: new Date(NaN),
      desc: "returns Invalid Date when base is invalid",
    },
    {
      date: new Date(2025, 0, 15, 12, 0, 0),
      amount: NaN,
      expected: new Date(NaN),
      desc: "returns Invalid Date when amount is NaN",
    },
    {
      date: new Date(2025, 0, 15, 12, 0, 0),
      amount: Infinity,
      expected: new Date(NaN),
      desc: "returns Invalid Date when amount is Infinity",
    },
    {
      date: new Date(2025, 0, 15, 12, 0, 0),
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
    const result = subMinutes(date as Date | number, amount);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });
});