import { describe, it, expect } from "vitest";
import { setSeconds } from "../src/setSeconds";

describe("setSeconds", () => {
  it.each([
    // --- Valid cases ---
    {
      date: new Date(2025, 0, 15, 12, 30, 45, 123),
      seconds: 30,
      expected: new Date(2025, 0, 15, 12, 30, 30, 123),
      desc: "sets seconds to 30",
    },
    {
      date: new Date(2025, 0, 15, 12, 30, 45),
      seconds: 0,
      expected: new Date(2025, 0, 15, 12, 30, 0),
      desc: "sets seconds to 0",
    },
    {
      date: new Date(2025, 0, 15, 12, 30, 45),
      seconds: 59,
      expected: new Date(2025, 0, 15, 12, 30, 59),
      desc: "sets seconds to 59",
    },
    {
      date: new Date(2025, 0, 15, 12, 30, 45),
      seconds: 45,
      expected: new Date(2025, 0, 15, 12, 30, 45),
      desc: "sets seconds to same second",
    },
    {
      date: new Date(2025, 0, 15, 12, 30, 45, 123),
      seconds: 30.9,
      expected: new Date(2025, 0, 15, 12, 30, 30, 123),
      desc: "truncates fractional seconds",
    },
    {
      date: new Date(2025, 0, 15, 12, 30, 0),
      seconds: -1,
      expected: new Date(2025, 0, 15, 12, 29, 59),
      desc: "negative seconds rolls back to previous minute",
    },
    {
      date: new Date(2025, 0, 15, 12, 30, 45),
      seconds: 60,
      expected: new Date(2025, 0, 15, 12, 31, 0),
      desc: "second 60 rolls over to next minute",
    },
    {
      date: new Date(2025, 0, 15, 12, 30, 45),
      seconds: 120,
      expected: new Date(2025, 0, 15, 12, 32, 0),
      desc: "large second value rolls over multiple minutes",
    },
    {
      date: new Date(2025, 0, 15, 12, 0, 30),
      seconds: -90,
      expected: new Date(2025, 0, 15, 11, 58, 30),
      desc: "large negative seconds crosses hour boundary",
    },
    {
      date: new Date(2025, 0, 15, 12, 30, 45).getTime(),
      seconds: 30,
      expected: new Date(2025, 0, 15, 12, 30, 30),
      desc: "accepts timestamp input",
    },

    // --- Invalid cases ---
    {
      date: new Date("invalid"),
      seconds: 30,
      expected: new Date(NaN),
      desc: "returns Invalid Date when base is invalid",
    },
    {
      date: new Date(2025, 0, 15),
      seconds: NaN,
      expected: new Date(NaN),
      desc: "returns Invalid Date when seconds is NaN",
    },
    {
      date: new Date(2025, 0, 15),
      seconds: Infinity,
      expected: new Date(NaN),
      desc: "returns Invalid Date when seconds is Infinity",
    },
    {
      date: new Date(2025, 0, 15),
      seconds: -Infinity,
      expected: new Date(NaN),
      desc: "returns Invalid Date when seconds is -Infinity",
    },
    {
      date: NaN,
      seconds: 30,
      expected: new Date(NaN),
      desc: "returns Invalid Date when timestamp is NaN",
    },
  ])("$desc", ({ date, seconds, expected }) => {
    const result = setSeconds(date as Date | number, seconds);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });

  it("does not mutate the original date", () => {
    const original = new Date(2025, 0, 15, 12, 30, 45);
    const originalTime = original.getTime();

    setSeconds(original, 30);

    expect(original.getTime()).toBe(originalTime);
  });
});