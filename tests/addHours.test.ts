import { describe, it, expect } from "vitest";
import { addHours } from "../src/addHours";

describe("addHours", () => {
  it.each([
    // --- Valid cases ---
    {
      date: new Date(2020, 5, 15, 12, 0, 0),
      amount: 3,
      expected: new Date(2020, 5, 15, 15, 0, 0),
      desc: "adds positive hours",
    },
    {
      date: new Date(2025, 8, 10, 15, 30, 0),
      amount: -5,
      expected: new Date(2025, 8, 10, 10, 30, 0),
      desc: "adds negative hours (subtracts)",
    },
    {
      date: new Date(2025, 3, 20, 10, 0, 0),
      amount: 0,
      expected: new Date(2025, 3, 20, 10, 0, 0),
      desc: "adding zero hours returns same date",
    },
    {
      date: new Date(2020, 0, 1, 12, 0, 0),
      amount: 1.9,
      expected: new Date(2020, 0, 1, 13, 0, 0),
      desc: "truncates fractional amount (positive)",
    },
    {
      date: new Date(2020, 0, 1, 12, 0, 0),
      amount: -1.9,
      expected: new Date(2020, 0, 1, 11, 0, 0),
      desc: "truncates fractional amount (negative)",
    },
    {
      date: new Date(2020, 0, 1, 23, 0, 0),
      amount: 2,
      expected: new Date(2020, 0, 2, 1, 0, 0),
      desc: "crosses day boundary forward",
    },
    {
      date: new Date(2020, 0, 2, 1, 0, 0),
      amount: -2,
      expected: new Date(2020, 0, 1, 23, 0, 0),
      desc: "crosses day boundary backward",
    },
    {
      date: new Date(2020, 0, 31, 23, 0, 0),
      amount: 2,
      expected: new Date(2020, 1, 1, 1, 0, 0),
      desc: "crosses month boundary",
    },
    {
      date: new Date(2020, 11, 31, 23, 0, 0),
      amount: 2,
      expected: new Date(2021, 0, 1, 1, 0, 0),
      desc: "crosses year boundary",
    },
    {
      date: new Date(2020, 5, 15, 12, 30, 45, 123),
      amount: 2,
      expected: new Date(2020, 5, 15, 14, 30, 45, 123),
      desc: "preserves minutes, seconds and milliseconds",
    },
    {
      date: new Date(2020, 6, 15, 12, 0, 0).getTime(),
      amount: 5,
      expected: new Date(2020, 6, 15, 17, 0, 0),
      desc: "accepts timestamp input",
    },
    {
      date: new Date(2025, 0, 1, 0, 0, 0),
      amount: 1000,
      expected: new Date(2025, 1, 11, 16, 0, 0),
      desc: "handles large positive hours",
    },
    {
      date: new Date(2025, 0, 1, 0, 0, 0),
      amount: -1000,
      expected: new Date(2024, 10, 20, 8, 0, 0),
      desc: "handles large negative hours",
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
      date: "2020-01-01T12:00:00" as any,
      amount: 1,
      expected: new Date(NaN),
      desc: "rejects string as date",
    },
    {
      date: new Date(2020, 0, 1, 12, 0, 0),
      amount: "1" as any,
      expected: new Date(NaN),
      desc: "rejects string as amount",
    },
    {
      date: new Date("2020-12-31T15:00:00Z"),
      amount: 1,
      expected: new Date("2020-12-31T16:00:00Z"),
      desc: "works correctly across UTC/JST boundary",
    },
  ])("$desc", ({ date, amount, expected }) => {
    const result = addHours(date as Date | number, amount);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });
});