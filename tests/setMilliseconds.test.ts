import { describe, it, expect } from "vitest";
import { setMilliseconds } from "../src/setMilliseconds";

describe("setMilliseconds", () => {
  it.each([
    // --- Valid cases ---
    {
      date: new Date(2025, 0, 15, 12, 30, 45, 123),
      milliseconds: 500,
      expected: new Date(2025, 0, 15, 12, 30, 45, 500),
      desc: "sets milliseconds to 500",
    },
    {
      date: new Date(2025, 0, 15, 12, 30, 45, 123),
      milliseconds: 0,
      expected: new Date(2025, 0, 15, 12, 30, 45, 0),
      desc: "sets milliseconds to 0",
    },
    {
      date: new Date(2025, 0, 15, 12, 30, 45, 123),
      milliseconds: 999,
      expected: new Date(2025, 0, 15, 12, 30, 45, 999),
      desc: "sets milliseconds to 999",
    },
    {
      date: new Date(2025, 0, 15, 12, 30, 45, 123),
      milliseconds: 123,
      expected: new Date(2025, 0, 15, 12, 30, 45, 123),
      desc: "sets milliseconds to same millisecond",
    },
    {
      date: new Date(2025, 0, 15, 12, 30, 45, 123),
      milliseconds: 500.9,
      expected: new Date(2025, 0, 15, 12, 30, 45, 500),
      desc: "truncates fractional milliseconds (positive)",
    },
    {
      date: new Date(2025, 0, 15, 12, 30, 45, 123),
      milliseconds: -500.9,
      expected: new Date(2025, 0, 15, 12, 30, 44, 500),
      desc: "truncates fractional milliseconds (negative)",
    },
    {
      date: new Date(2025, 0, 15, 12, 30, 45, 0),
      milliseconds: -1,
      expected: new Date(2025, 0, 15, 12, 30, 44, 999),
      desc: "negative milliseconds rolls back to previous second",
    },
    {
      date: new Date(2025, 0, 15, 12, 30, 45, 500),
      milliseconds: 1000,
      expected: new Date(2025, 0, 15, 12, 30, 46, 0),
      desc: "millisecond 1000 rolls over to next second",
    },
    {
      date: new Date(2025, 0, 15, 12, 30, 45, 500),
      milliseconds: 2500,
      expected: new Date(2025, 0, 15, 12, 30, 47, 500),
      desc: "large millisecond value rolls over multiple seconds",
    },
    {
      date: new Date(2025, 0, 15, 12, 30, 45, 123).getTime(),
      milliseconds: 500,
      expected: new Date(2025, 0, 15, 12, 30, 45, 500),
      desc: "accepts timestamp input",
    },

    // --- Invalid cases ---
    {
      date: new Date("invalid"),
      milliseconds: 500,
      expected: new Date(NaN),
      desc: "returns Invalid Date when base is invalid",
    },
    {
      date: new Date(2025, 0, 15),
      milliseconds: NaN,
      expected: new Date(NaN),
      desc: "returns Invalid Date when milliseconds is NaN",
    },
    {
      date: new Date(2025, 0, 15),
      milliseconds: Infinity,
      expected: new Date(NaN),
      desc: "returns Invalid Date when milliseconds is Infinity",
    },
    {
      date: new Date(2025, 0, 15),
      milliseconds: -Infinity,
      expected: new Date(NaN),
      desc: "returns Invalid Date when milliseconds is -Infinity",
    },
    {
      date: NaN,
      milliseconds: 500,
      expected: new Date(NaN),
      desc: "returns Invalid Date when timestamp is NaN",
    },
  ])("$desc", ({ date, milliseconds, expected }) => {
    const result = setMilliseconds(date as Date | number, milliseconds);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });

  it("does not mutate the original date", () => {
    const original = new Date(2025, 0, 15, 12, 30, 45, 123);
    const originalTime = original.getTime();

    setMilliseconds(original, 500);

    expect(original.getTime()).toBe(originalTime);
  });
});