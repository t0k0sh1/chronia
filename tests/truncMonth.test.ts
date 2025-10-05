import { describe, it, expect } from "vitest";
import { truncMonth } from "../src/truncMonth";

describe("truncMonth", () => {
  it.each([
    // --- Valid cases ---
    {
      date: new Date(2024, 5, 15, 14, 30, 45, 123),
      expected: new Date(2024, 5, 1, 0, 0, 0, 0),
      desc: "truncates to the start of the month",
    },
    {
      date: new Date(2024, 0, 31, 23, 59, 59, 999),
      expected: new Date(2024, 0, 1, 0, 0, 0, 0),
      desc: "handles January (month 0)",
    },
    {
      date: new Date(2024, 11, 25, 12, 30, 0, 0),
      expected: new Date(2024, 11, 1, 0, 0, 0, 0),
      desc: "handles December (month 11)",
    },
    {
      date: new Date(2023, 6, 4, 6, 15, 30, 500),
      expected: new Date(2023, 6, 1, 0, 0, 0, 0),
      desc: "handles mid-year month",
    },
    {
      date: new Date(2024, 1, 29, 12, 0, 0, 0),
      expected: new Date(2024, 1, 1, 0, 0, 0, 0),
      desc: "handles February in leap years",
    },
    {
      date: new Date(2024, 3, 1, 0, 0, 0, 1),
      expected: new Date(2024, 3, 1, 0, 0, 0, 0),
      desc: "handles first day of month with milliseconds",
    },
    {
      date: new Date(2024, 5, 15, 14, 30, 45, 123).getTime(),
      expected: new Date(2024, 5, 1, 0, 0, 0, 0),
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
    const result = truncMonth(date as Date | number);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });

  it("does not modify the original date", () => {
    const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);
    const originalTime = originalDate.getTime();

    truncMonth(originalDate);

    expect(originalDate.getTime()).toBe(originalTime);
  });
});