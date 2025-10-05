import { describe, it, expect } from "vitest";
import { truncMillisecond } from "../src/truncMillisecond";

describe("truncMillisecond", () => {
  it.each([
    // --- Valid cases ---
    {
      date: new Date(2024, 5, 15, 14, 30, 45, 123),
      expected: new Date(2024, 5, 15, 14, 30, 45, 123),
      desc: "returns the same date without truncation",
    },
    {
      date: new Date(2024, 0, 1, 0, 0, 0, 0),
      expected: new Date(2024, 0, 1, 0, 0, 0, 0),
      desc: "preserves zero milliseconds",
    },
    {
      date: new Date(2024, 11, 31, 23, 59, 59, 999),
      expected: new Date(2024, 11, 31, 23, 59, 59, 999),
      desc: "preserves maximum milliseconds",
    },
    {
      date: new Date(2023, 6, 15, 12, 30, 45, 500),
      expected: new Date(2023, 6, 15, 12, 30, 45, 500),
      desc: "preserves mid-range milliseconds",
    },
    {
      date: new Date(0),
      expected: new Date(0),
      desc: "handles Unix epoch",
    },
    {
      date: new Date(2024, 1, 29, 12, 0, 0, 1),
      expected: new Date(2024, 1, 29, 12, 0, 0, 1),
      desc: "handles leap year February 29",
    },
    {
      date: new Date(2024, 5, 15, 14, 30, 45, 123).getTime(),
      expected: new Date(2024, 5, 15, 14, 30, 45, 123),
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
    const result = truncMillisecond(date as Date | number);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });

  it("does not modify the original date", () => {
    const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);
    const originalTime = originalDate.getTime();

    truncMillisecond(originalDate);

    expect(originalDate.getTime()).toBe(originalTime);
  });

  it("returns a new Date object", () => {
    const originalDate = new Date(2024, 5, 15, 14, 30, 45, 123);
    const result = truncMillisecond(originalDate);

    expect(result).not.toBe(originalDate); // Different object references
    expect(result.getTime()).toBe(originalDate.getTime()); // Same time value
  });

  it("maintains millisecond precision", () => {
    for (let ms = 0; ms < 1000; ms += 50) {
      const date = new Date(2024, 0, 1, 12, 0, 0, ms);
      const result = truncMillisecond(date);

      expect(result.getMilliseconds()).toBe(ms);
      expect(result.getTime()).toBe(date.getTime());
    }
  });
});