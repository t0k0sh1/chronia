import { describe, it, expect } from "vitest";
import { truncYear } from "../src/truncYear";

describe("truncYear", () => {
  it.each([
    // --- Valid cases ---
    {
      date: new Date(2024, 5, 15, 14, 30, 45, 123),
      expected: new Date(2024, 0, 1, 0, 0, 0, 0),
      desc: "truncates to the start of the year",
    },
    {
      date: new Date(2020, 11, 31, 23, 59, 59, 999),
      expected: new Date(2020, 0, 1, 0, 0, 0, 0),
      desc: "handles end of year",
    },
    {
      date: new Date(2023, 6, 10, 12, 30, 0, 0),
      expected: new Date(2023, 0, 1, 0, 0, 0, 0),
      desc: "handles mid-year date",
    },
    {
      date: new Date(1999, 0, 1, 0, 0, 0, 1),
      expected: new Date(1999, 0, 1, 0, 0, 0, 0),
      desc: "handles start of year with milliseconds",
    },
    {
      date: new Date(2024, 2, 29, 12, 0, 0, 0),
      expected: new Date(2024, 0, 1, 0, 0, 0, 0),
      desc: "handles leap years correctly",
    },
    {
      date: new Date(2024, 0, 1, 0, 0, 0, 0),
      expected: new Date(2024, 0, 1, 0, 0, 0, 0),
      desc: "handles start of year (no change)",
    },
    {
      date: new Date(2024, 5, 15, 14, 30, 45, 123).getTime(),
      expected: new Date(2024, 0, 1, 0, 0, 0, 0),
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
    const result = truncYear(date as Date | number);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });

  it("does not modify the original date", () => {
    const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);
    const originalTime = originalDate.getTime();

    truncYear(originalDate);

    expect(originalDate.getTime()).toBe(originalTime);
  });
});