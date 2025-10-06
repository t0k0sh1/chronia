import { describe, it, expect } from "vitest";
import { truncHour } from "../src/truncHour";

describe("truncHour", () => {
  it.each([
    // --- Valid cases ---
    {
      date: new Date(2024, 5, 15, 14, 30, 45, 123),
      expected: new Date(2024, 5, 15, 14, 0, 0, 0),
      desc: "truncates to the start of the hour",
    },
    {
      date: new Date(2024, 0, 1, 0, 30, 45, 500),
      expected: new Date(2024, 0, 1, 0, 0, 0, 0),
      desc: "handles midnight hour",
    },
    {
      date: new Date(2024, 6, 15, 12, 0, 0, 1),
      expected: new Date(2024, 6, 15, 12, 0, 0, 0),
      desc: "handles start of hour with milliseconds",
    },
    {
      date: new Date(2023, 11, 25, 23, 59, 59, 999),
      expected: new Date(2023, 11, 25, 23, 0, 0, 0),
      desc: "handles end of hour",
    },
    {
      date: new Date(2024, 3, 10, 8, 0, 0, 0),
      expected: new Date(2024, 3, 10, 8, 0, 0, 0),
      desc: "handles start of hour correctly (no change)",
    },
    {
      date: new Date(2024, 5, 15, 14, 30, 45, 123).getTime(),
      expected: new Date(2024, 5, 15, 14, 0, 0, 0),
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
    const result = truncHour(date as Date | number);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });

  it("does not modify the original date", () => {
    const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);
    const originalTime = originalDate.getTime();

    truncHour(originalDate);

    expect(originalDate.getTime()).toBe(originalTime);
  });

  it("works across all 24 hours", () => {
    for (let hour = 0; hour < 24; hour++) {
      const date = new Date(2024, 0, 1, hour, 30, 45, 123);
      const result = truncHour(date);

      expect(result.getHours()).toBe(hour);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    }
  });
});