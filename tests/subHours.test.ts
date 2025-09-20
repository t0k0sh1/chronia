import { describe, it, expect } from "vitest";
import { subHours } from "../src/subHours";

describe("subHours", () => {
  it.each([
    // --- Valid cases ---
    {
      date: new Date(2025, 0, 15, 18, 0, 0),
      amount: 5,
      expected: new Date(2025, 0, 15, 13, 0, 0),
      desc: "subtracts positive hours",
    },
    {
      date: new Date(2025, 0, 15, 10, 30, 0),
      amount: -3,
      expected: new Date(2025, 0, 15, 13, 30, 0),
      desc: "subtracts negative hours (adds)",
    },
    {
      date: new Date(2025, 0, 15, 14, 0, 0),
      amount: 0,
      expected: new Date(2025, 0, 15, 14, 0, 0),
      desc: "subtracting zero hours returns same time",
    },
    {
      date: new Date(2025, 0, 15, 15, 0, 0),
      amount: 1.9,
      expected: new Date(2025, 0, 15, 14, 0, 0),
      desc: "truncates fractional amount (positive)",
    },
    {
      date: new Date(2025, 0, 15, 10, 0, 0),
      amount: -1.9,
      expected: new Date(2025, 0, 15, 11, 0, 0),
      desc: "truncates fractional amount (negative)",
    },
    {
      date: new Date(2025, 0, 15, 2, 0, 0),
      amount: 4,
      expected: new Date(2025, 0, 14, 22, 0, 0),
      desc: "crosses day boundary backward",
    },
    {
      date: new Date(2025, 1, 1, 1, 0, 0),
      amount: 2,
      expected: new Date(2025, 0, 31, 23, 0, 0),
      desc: "crosses month boundary backward",
    },
    {
      date: new Date(2025, 0, 1, 1, 0, 0),
      amount: 2,
      expected: new Date(2024, 11, 31, 23, 0, 0),
      desc: "crosses year boundary backward",
    },
    {
      date: new Date(2025, 0, 15, 14, 30, 45, 123),
      amount: 3,
      expected: new Date(2025, 0, 15, 11, 30, 45, 123),
      desc: "preserves minutes, seconds and milliseconds",
    },
    {
      date: new Date(2025, 0, 15, 18, 0, 0).getTime(),
      amount: 4,
      expected: new Date(2025, 0, 15, 14, 0, 0),
      desc: "accepts timestamp input",
    },
    {
      date: new Date(2025, 0, 15, 12, 0, 0),
      amount: 1000,
      expected: new Date(2024, 11, 4, 20, 0, 0),
      desc: "handles large positive hours",
    },
    {
      date: new Date(2025, 0, 15, 12, 0, 0),
      amount: -1000,
      expected: new Date(2025, 1, 26, 4, 0, 0),
      desc: "subtracts large negative hours (adds)",
    },

    // --- Invalid cases ---
    {
      date: new Date("invalid"),
      amount: 3,
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
    {
      date: "2025-01-15T18:00:00" as any,
      amount: 1,
      expected: new Date(NaN),
      desc: "rejects string as date",
    },
    {
      date: new Date(2025, 0, 15, 18, 0, 0),
      amount: "1" as any,
      expected: new Date(NaN),
      desc: "rejects string as amount",
    },
    {
      date: new Date("2020-12-31T16:00:00Z"),
      amount: 1,
      expected: new Date("2020-12-31T15:00:00Z"),
      desc: "works correctly across UTC/JST boundary",
    },
  ])("$desc", ({ date, amount, expected }) => {
    const result = subHours(date as Date | number, amount);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });
});

