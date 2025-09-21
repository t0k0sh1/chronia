import { describe, it, expect } from "vitest";
import { setMinutes } from "../src/setMinutes";

describe("setMinutes", () => {
  it.each([
    // --- Valid cases ---
    {
      date: new Date(2025, 0, 15, 12, 30, 45, 123),
      minutes: 45,
      expected: new Date(2025, 0, 15, 12, 45, 45, 123),
      desc: "sets minutes to 45",
    },
    {
      date: new Date(2025, 0, 15, 12, 30, 45),
      minutes: 0,
      expected: new Date(2025, 0, 15, 12, 0, 45),
      desc: "sets minutes to 0",
    },
    {
      date: new Date(2025, 0, 15, 12, 30, 45),
      minutes: 59,
      expected: new Date(2025, 0, 15, 12, 59, 45),
      desc: "sets minutes to 59",
    },
    {
      date: new Date(2025, 0, 15, 12, 30, 45),
      minutes: 30,
      expected: new Date(2025, 0, 15, 12, 30, 45),
      desc: "sets minutes to same minute",
    },
    {
      date: new Date(2025, 0, 15, 12, 30, 45, 123),
      minutes: 45.9,
      expected: new Date(2025, 0, 15, 12, 45, 45, 123),
      desc: "truncates fractional minutes",
    },
    {
      date: new Date(2025, 0, 15, 12, 30, 45),
      minutes: -1,
      expected: new Date(2025, 0, 15, 11, 59, 45),
      desc: "negative minutes rolls back to previous hour",
    },
    {
      date: new Date(2025, 0, 15, 12, 30, 45),
      minutes: 60,
      expected: new Date(2025, 0, 15, 13, 0, 45),
      desc: "minute 60 rolls over to next hour",
    },
    {
      date: new Date(2025, 0, 15, 12, 30, 45),
      minutes: 120,
      expected: new Date(2025, 0, 15, 14, 0, 45),
      desc: "large minute value rolls over multiple hours",
    },
    {
      date: new Date(2025, 0, 15, 0, 30, 45),
      minutes: -90,
      expected: new Date(2025, 0, 14, 22, 30, 45),
      desc: "large negative minutes crosses day boundary",
    },
    {
      date: new Date(2025, 0, 15, 12, 30, 45).getTime(),
      minutes: 45,
      expected: new Date(2025, 0, 15, 12, 45, 45),
      desc: "accepts timestamp input",
    },

    // --- Invalid cases ---
    {
      date: new Date("invalid"),
      minutes: 30,
      expected: new Date(NaN),
      desc: "returns Invalid Date when base is invalid",
    },
    {
      date: new Date(2025, 0, 15),
      minutes: NaN,
      expected: new Date(NaN),
      desc: "returns Invalid Date when minutes is NaN",
    },
    {
      date: new Date(2025, 0, 15),
      minutes: Infinity,
      expected: new Date(NaN),
      desc: "returns Invalid Date when minutes is Infinity",
    },
    {
      date: new Date(2025, 0, 15),
      minutes: -Infinity,
      expected: new Date(NaN),
      desc: "returns Invalid Date when minutes is -Infinity",
    },
    {
      date: "2025-01-15" as any,
      minutes: 30,
      expected: new Date(NaN),
      desc: "rejects string as date",
    },
    {
      date: new Date(2025, 0, 15),
      minutes: "30" as any,
      expected: new Date(NaN),
      desc: "rejects string as minutes",
    },
  ])("$desc", ({ date, minutes, expected }) => {
    const result = setMinutes(date as Date | number, minutes);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });

  it("does not mutate the original date", () => {
    const original = new Date(2025, 0, 15, 12, 30, 45);
    const originalTime = original.getTime();

    setMinutes(original, 45);

    expect(original.getTime()).toBe(originalTime);
  });
});