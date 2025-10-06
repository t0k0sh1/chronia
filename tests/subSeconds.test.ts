import { describe, it, expect } from "vitest";
import { subSeconds } from "../src/subSeconds";

describe("subSeconds", () => {
  it.each([
    // --- Valid cases ---
    {
      date: new Date(2025, 0, 15, 12, 30, 45),
      amount: 15,
      expected: new Date(2025, 0, 15, 12, 30, 30),
      desc: "subtracts positive seconds",
    },
    {
      date: new Date(2025, 0, 15, 15, 45, 10),
      amount: -20,
      expected: new Date(2025, 0, 15, 15, 45, 30),
      desc: "subtracts negative seconds (adds)",
    },
    {
      date: new Date(2025, 0, 15, 10, 30, 30),
      amount: 0,
      expected: new Date(2025, 0, 15, 10, 30, 30),
      desc: "subtracting zero seconds returns same time",
    },
    {
      date: new Date(2025, 0, 15, 12, 0, 30),
      amount: 1.9,
      expected: new Date(2025, 0, 15, 12, 0, 29),
      desc: "truncates fractional amount (positive)",
    },
    {
      date: new Date(2025, 0, 15, 12, 0, 30),
      amount: -1.9,
      expected: new Date(2025, 0, 15, 12, 0, 31),
      desc: "truncates fractional amount (negative)",
    },
    {
      date: new Date(2025, 0, 15, 13, 31, 15),
      amount: 30,
      expected: new Date(2025, 0, 15, 13, 30, 45),
      desc: "crosses minute boundary backward",
    },
    {
      date: new Date(2025, 0, 15, 13, 0, 15),
      amount: 30,
      expected: new Date(2025, 0, 15, 12, 59, 45),
      desc: "crosses hour boundary backward",
    },
    {
      date: new Date(2025, 0, 15, 0, 0, 15),
      amount: 30,
      expected: new Date(2025, 0, 14, 23, 59, 45),
      desc: "crosses day boundary backward",
    },
    {
      date: new Date(2025, 1, 1, 0, 0, 10),
      amount: 20,
      expected: new Date(2025, 0, 31, 23, 59, 50),
      desc: "crosses month boundary",
    },
    {
      date: new Date(2025, 0, 1, 0, 0, 5),
      amount: 15,
      expected: new Date(2024, 11, 31, 23, 59, 50),
      desc: "crosses year boundary",
    },
    {
      date: new Date(2025, 0, 15, 12, 31, 0, 123),
      amount: 15,
      expected: new Date(2025, 0, 15, 12, 30, 45, 123),
      desc: "preserves milliseconds",
    },
    {
      date: new Date(2025, 0, 15, 12, 0, 45).getTime(),
      amount: 30,
      expected: new Date(2025, 0, 15, 12, 0, 15),
      desc: "accepts timestamp input",
    },
    {
      date: new Date(2025, 0, 15, 12, 0, 0),
      amount: 100000,
      expected: new Date(2025, 0, 14, 8, 13, 20),
      desc: "handles large positive seconds",
    },
    {
      date: new Date(2025, 0, 15, 12, 0, 0),
      amount: -100000,
      expected: new Date(2025, 0, 16, 15, 46, 40),
      desc: "handles large negative seconds",
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
    const result = subSeconds(date as Date | number, amount);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });
});