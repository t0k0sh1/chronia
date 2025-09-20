import { describe, it, expect } from "vitest";
import { subMilliseconds } from "../src/subMilliseconds";

describe("subMilliseconds", () => {
  it.each([
    // --- Valid cases ---
    {
      date: new Date(2025, 0, 15, 12, 0, 0, 500),
      amount: 300,
      expected: new Date(2025, 0, 15, 12, 0, 0, 200),
      desc: "subtracts positive milliseconds",
    },
    {
      date: new Date(2025, 0, 15, 12, 0, 0, 200),
      amount: -300,
      expected: new Date(2025, 0, 15, 12, 0, 0, 500),
      desc: "subtracts negative milliseconds (adds)",
    },
    {
      date: new Date(2025, 0, 15, 12, 0, 0, 100),
      amount: 0,
      expected: new Date(2025, 0, 15, 12, 0, 0, 100),
      desc: "subtracting zero milliseconds returns same time",
    },
    {
      date: new Date(2025, 0, 15, 12, 0, 0, 100),
      amount: 1.9,
      expected: new Date(2025, 0, 15, 12, 0, 0, 99),
      desc: "truncates fractional amount (positive)",
    },
    {
      date: new Date(2025, 0, 15, 12, 0, 0, 100),
      amount: -2.7,
      expected: new Date(2025, 0, 15, 12, 0, 0, 102),
      desc: "truncates fractional amount (negative)",
    },
    {
      date: new Date(2025, 0, 15, 12, 0, 1, 0),
      amount: 1,
      expected: new Date(2025, 0, 15, 12, 0, 0, 999),
      desc: "crosses second boundary backward",
    },
    {
      date: new Date(2025, 0, 15, 0, 0, 0, 0),
      amount: 1,
      expected: new Date(2025, 0, 14, 23, 59, 59, 999),
      desc: "crosses day boundary backward",
    },
    {
      date: new Date(2025, 1, 1, 0, 0, 0, 0),
      amount: 1,
      expected: new Date(2025, 0, 31, 23, 59, 59, 999),
      desc: "crosses month boundary backward",
    },
    {
      date: new Date(2025, 0, 1, 0, 0, 0, 0),
      amount: 1,
      expected: new Date(2024, 11, 31, 23, 59, 59, 999),
      desc: "crosses year boundary backward",
    },
    {
      date: new Date(2025, 0, 15, 12, 0, 1, 0),
      amount: 1000,
      expected: new Date(2025, 0, 15, 12, 0, 0, 0),
      desc: "subtracts full second worth of milliseconds (1000)",
    },
    {
      date: new Date(2025, 0, 15, 12, 1, 0, 0),
      amount: 60000,
      expected: new Date(2025, 0, 15, 12, 0, 0, 0),
      desc: "subtracts full minute worth of milliseconds (60000)",
    },
    {
      date: new Date(2025, 0, 15, 13, 0, 0, 0),
      amount: 3600000,
      expected: new Date(2025, 0, 15, 12, 0, 0, 0),
      desc: "subtracts full hour worth of milliseconds (3600000)",
    },
    {
      date: new Date(2025, 0, 16, 12, 0, 0, 0),
      amount: 86400000,
      expected: new Date(2025, 0, 15, 12, 0, 0, 0),
      desc: "subtracts full day worth of milliseconds (86400000)",
    },
    {
      date: 1736942400500,
      amount: 250,
      expected: new Date(1736942400250),
      desc: "accepts timestamp input",
    },
    {
      date: new Date(2025, 0, 15, 12, 0, 0, 0),
      amount: 1000000,
      expected: new Date(2025, 0, 15, 11, 43, 20, 0),
      desc: "handles large positive milliseconds",
    },
    {
      date: new Date(2025, 0, 15, 12, 0, 0, 0),
      amount: -1000000,
      expected: new Date(2025, 0, 15, 12, 16, 40, 0),
      desc: "subtracts large negative milliseconds (adds)",
    },

    // --- Invalid cases ---
    {
      date: new Date("invalid"),
      amount: 500,
      expected: new Date(NaN),
      desc: "returns Invalid Date when base is invalid",
    },
    {
      date: new Date(2025, 0, 15),
      amount: NaN,
      expected: new Date(NaN),
      desc: "returns Invalid Date when amount is NaN",
    },
    {
      date: new Date(2025, 0, 15),
      amount: Infinity,
      expected: new Date(NaN),
      desc: "returns Invalid Date when amount is Infinity",
    },
    {
      date: new Date(2025, 0, 15),
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
      date: "2025-01-15T12:00:00.500" as any,
      amount: 1,
      expected: new Date(NaN),
      desc: "rejects string as date",
    },
    {
      date: new Date(2025, 0, 15, 12, 0, 0, 500),
      amount: "1" as any,
      expected: new Date(NaN),
      desc: "rejects string as amount",
    },
    {
      date: new Date("2020-12-31T15:30:46.000Z"),
      amount: 500,
      expected: new Date("2020-12-31T15:30:45.500Z"),
      desc: "works correctly across UTC/JST boundary",
    },
  ])("$desc", ({ date, amount, expected }) => {
    const result = subMilliseconds(date as Date | number, amount);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });
});