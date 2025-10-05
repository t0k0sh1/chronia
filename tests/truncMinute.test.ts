import { describe, it, expect } from "vitest";
import { truncMinute } from "../src/truncMinute";

describe("truncMinute", () => {
  it.each([
    // --- Valid cases ---
    {
      date: new Date(2024, 5, 15, 14, 30, 45, 123),
      expected: new Date(2024, 5, 15, 14, 30, 0, 0),
      desc: "truncates to the start of the minute",
    },
    {
      date: new Date(2024, 2, 10, 9, 0, 30, 500),
      expected: new Date(2024, 2, 10, 9, 0, 0, 0),
      desc: "handles minute 0",
    },
    {
      date: new Date(2024, 7, 25, 18, 45, 0, 1),
      expected: new Date(2024, 7, 25, 18, 45, 0, 0),
      desc: "handles start of minute with milliseconds",
    },
    {
      date: new Date(2023, 10, 15, 12, 59, 59, 999),
      expected: new Date(2023, 10, 15, 12, 59, 0, 0),
      desc: "handles end of minute",
    },
    {
      date: new Date(2024, 4, 20, 11, 25, 0, 0),
      expected: new Date(2024, 4, 20, 11, 25, 0, 0),
      desc: "handles start of minute correctly (no change)",
    },
    {
      date: new Date(2024, 5, 15, 14, 30, 45, 123).getTime(),
      expected: new Date(2024, 5, 15, 14, 30, 0, 0),
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
    const result = truncMinute(date as Date | number);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });

  it("does not modify the original date", () => {
    const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);
    const originalTime = originalDate.getTime();

    truncMinute(originalDate);

    expect(originalDate.getTime()).toBe(originalTime);
  });

  it("works across all 60 minutes", () => {
    for (let minute = 0; minute < 60; minute++) {
      const date = new Date(2024, 0, 1, 12, minute, 30, 456);
      const result = truncMinute(date);

      expect(result.getHours()).toBe(12);
      expect(result.getMinutes()).toBe(minute);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    }
  });
});