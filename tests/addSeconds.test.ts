import { describe, it, expect } from "vitest";
import { addSeconds } from "../src/addSeconds";

describe("addSeconds", () => {
  it.each([
    // --- Valid cases ---
    {
      date: new Date(2020, 5, 15, 12, 30, 30),
      amount: 15,
      expected: new Date(2020, 5, 15, 12, 30, 45),
      desc: "adds positive seconds",
    },
    {
      date: new Date(2025, 8, 10, 15, 45, 30),
      amount: -20,
      expected: new Date(2025, 8, 10, 15, 45, 10),
      desc: "adds negative seconds (subtracts)",
    },
    {
      date: new Date(2025, 3, 20, 10, 30, 30),
      amount: 0,
      expected: new Date(2025, 3, 20, 10, 30, 30),
      desc: "adding zero seconds returns same date",
    },
    {
      date: new Date(2020, 0, 1, 12, 0, 0),
      amount: 1.9,
      expected: new Date(2020, 0, 1, 12, 0, 1),
      desc: "truncates fractional amount (positive)",
    },
    {
      date: new Date(2020, 0, 1, 12, 0, 10),
      amount: -1.9,
      expected: new Date(2020, 0, 1, 12, 0, 9),
      desc: "truncates fractional amount (negative)",
    },
    {
      date: new Date(2020, 0, 1, 12, 30, 45),
      amount: 30,
      expected: new Date(2020, 0, 1, 12, 31, 15),
      desc: "crosses minute boundary forward",
    },
    {
      date: new Date(2020, 0, 1, 12, 31, 15),
      amount: -30,
      expected: new Date(2020, 0, 1, 12, 30, 45),
      desc: "crosses minute boundary backward",
    },
    {
      date: new Date(2020, 0, 1, 12, 59, 45),
      amount: 30,
      expected: new Date(2020, 0, 1, 13, 0, 15),
      desc: "crosses hour boundary forward",
    },
    {
      date: new Date(2020, 0, 1, 23, 59, 45),
      amount: 30,
      expected: new Date(2020, 0, 2, 0, 0, 15),
      desc: "crosses day boundary forward",
    },
    {
      date: new Date(2020, 0, 31, 23, 59, 50),
      amount: 20,
      expected: new Date(2020, 1, 1, 0, 0, 10),
      desc: "crosses month boundary",
    },
    {
      date: new Date(2020, 11, 31, 23, 59, 50),
      amount: 15,
      expected: new Date(2021, 0, 1, 0, 0, 5),
      desc: "crosses year boundary",
    },
    {
      date: new Date(2020, 5, 15, 12, 30, 45, 123),
      amount: 15,
      expected: new Date(2020, 5, 15, 12, 31, 0, 123),
      desc: "preserves milliseconds",
    },
    {
      date: new Date(2020, 6, 15, 12, 0, 0).getTime(),
      amount: 45,
      expected: new Date(2020, 6, 15, 12, 0, 45),
      desc: "accepts timestamp input",
    },
    {
      date: new Date(2025, 0, 1, 0, 0, 0),
      amount: 100000,
      expected: new Date(2025, 0, 2, 3, 46, 40),
      desc: "handles large positive seconds",
    },
    {
      date: new Date(2025, 0, 10, 0, 0, 0),
      amount: -100000,
      expected: new Date(2025, 0, 8, 20, 13, 20),
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
      date: new Date("2020-12-31T15:30:45Z"),
      amount: 30,
      expected: new Date("2020-12-31T15:31:15Z"),
      desc: "works correctly across UTC/JST boundary",
    },
  ])("$desc", ({ date, amount, expected }) => {
    const result = addSeconds(date as Date | number, amount);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });
});