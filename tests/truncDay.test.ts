import { describe, it, expect } from "vitest";
import { truncDay } from "../src/truncDay";

describe("truncDay", () => {
  it.each([
    // --- Valid cases ---
    {
      date: new Date(2024, 5, 15, 14, 30, 45, 123),
      expected: new Date(2024, 5, 15, 0, 0, 0, 0),
      desc: "truncates to the start of the day",
    },
    {
      date: new Date(2024, 3, 10, 0, 0, 0, 1),
      expected: new Date(2024, 3, 10, 0, 0, 0, 0),
      desc: "handles start of day with milliseconds",
    },
    {
      date: new Date(2024, 7, 20, 12, 30, 45, 500),
      expected: new Date(2024, 7, 20, 0, 0, 0, 0),
      desc: "handles midday",
    },
    {
      date: new Date(2023, 11, 31, 23, 59, 59, 999),
      expected: new Date(2023, 11, 31, 0, 0, 0, 0),
      desc: "handles end of day",
    },
    {
      date: new Date(2024, 6, 20, 0, 0, 0, 0),
      expected: new Date(2024, 6, 20, 0, 0, 0, 0),
      desc: "handles midnight correctly (no change)",
    },
    {
      date: new Date(2024, 5, 15, 14, 30, 45, 123).getTime(),
      expected: new Date(2024, 5, 15, 0, 0, 0, 0),
      desc: "accepts timestamp input",
    },
    {
      date: new Date(2024, 2, 10, 15, 30, 0, 0),
      expected: new Date(2024, 2, 10, 0, 0, 0, 0),
      desc: "preserves date across DST transitions",
    },

    // --- Invalid cases ---
    {
      date: new Date("invalid"),
      expected: new Date(NaN),
      desc: "returns Invalid Date when input is invalid",
    },
    {
      date: NaN,
      expected: new Date(NaN),
      desc: "returns Invalid Date when timestamp is NaN",
    },
    {
      date: Infinity,
      expected: new Date(NaN),
      desc: "returns Invalid Date when timestamp is Infinity",
    },
    {
      date: -Infinity,
      expected: new Date(NaN),
      desc: "returns Invalid Date when timestamp is -Infinity",
    },
  ])("$desc", ({ date, expected }) => {
    const result = truncDay(date as Date | number);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });

  it("does not modify the original date", () => {
    const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);
    const originalTime = originalDate.getTime();

    truncDay(originalDate);

    expect(originalDate.getTime()).toBe(originalTime);
  });
});