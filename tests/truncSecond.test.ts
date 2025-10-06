import { describe, it, expect } from "vitest";
import { truncSecond } from "../src/truncSecond";

describe("truncSecond", () => {
  it.each([
    // --- Valid cases ---
    {
      date: new Date(2024, 5, 15, 14, 30, 45, 123),
      expected: new Date(2024, 5, 15, 14, 30, 45, 0),
      desc: "truncates to the start of the second",
    },
    {
      date: new Date(2024, 0, 5, 8, 15, 0, 500),
      expected: new Date(2024, 0, 5, 8, 15, 0, 0),
      desc: "handles second 0",
    },
    {
      date: new Date(2024, 9, 31, 22, 45, 30, 1),
      expected: new Date(2024, 9, 31, 22, 45, 30, 0),
      desc: "handles mid-range second",
    },
    {
      date: new Date(2023, 6, 4, 16, 20, 59, 999),
      expected: new Date(2023, 6, 4, 16, 20, 59, 0),
      desc: "handles second 59 with max milliseconds",
    },
    {
      date: new Date(2024, 3, 18, 13, 42, 28, 0),
      expected: new Date(2024, 3, 18, 13, 42, 28, 0),
      desc: "handles start of second correctly (no change)",
    },
    {
      date: new Date(2024, 5, 15, 14, 30, 45, 123).getTime(),
      expected: new Date(2024, 5, 15, 14, 30, 45, 0),
      desc: "accepts timestamp input",
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
    const result = truncSecond(date as Date | number);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });

  it("does not modify the original date", () => {
    const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);
    const originalTime = originalDate.getTime();

    truncSecond(originalDate);

    expect(originalDate.getTime()).toBe(originalTime);
  });

  it("works across all 60 seconds", () => {
    for (let second = 0; second < 60; second++) {
      const date = new Date(2024, 0, 1, 12, 30, second, 789);
      const result = truncSecond(date);

      expect(result.getHours()).toBe(12);
      expect(result.getMinutes()).toBe(30);
      expect(result.getSeconds()).toBe(second);
      expect(result.getMilliseconds()).toBe(0);
    }
  });
});