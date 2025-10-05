import { describe, it, expect } from "vitest";
import { setHours } from "../src/setHours";

describe("setHours", () => {
  it.each([
    // --- Valid cases ---
    {
      date: new Date(2025, 0, 15, 12, 30, 45, 123),
      hours: 18,
      expected: new Date(2025, 0, 15, 18, 30, 45, 123),
      desc: "sets hours to 18",
    },
    {
      date: new Date(2025, 0, 15, 12, 30, 45),
      hours: 0,
      expected: new Date(2025, 0, 15, 0, 30, 45),
      desc: "sets hours to 0 (midnight)",
    },
    {
      date: new Date(2025, 0, 15, 12, 30, 45),
      hours: 23,
      expected: new Date(2025, 0, 15, 23, 30, 45),
      desc: "sets hours to 23",
    },
    {
      date: new Date(2025, 0, 15, 12, 30, 45),
      hours: 12,
      expected: new Date(2025, 0, 15, 12, 30, 45),
      desc: "sets hours to same hour",
    },
    {
      date: new Date(2025, 0, 15, 12, 30, 45, 123),
      hours: 14.9,
      expected: new Date(2025, 0, 15, 14, 30, 45, 123),
      desc: "truncates fractional hours",
    },
    {
      date: new Date(2025, 0, 15, 12, 30, 45),
      hours: -1,
      expected: new Date(2025, 0, 14, 23, 30, 45),
      desc: "negative hours rolls back to previous day",
    },
    {
      date: new Date(2025, 0, 15, 12, 30, 45),
      hours: 24,
      expected: new Date(2025, 0, 16, 0, 30, 45),
      desc: "hour 24 rolls over to next day",
    },
    {
      date: new Date(2025, 0, 15, 12, 30, 45),
      hours: 48,
      expected: new Date(2025, 0, 17, 0, 30, 45),
      desc: "large hour value rolls over multiple days",
    },
    {
      date: new Date(2025, 0, 1, 12, 30, 45),
      hours: -25,
      expected: new Date(2024, 11, 30, 23, 30, 45),
      desc: "large negative hours crosses month boundary",
    },
    {
      date: new Date(2025, 0, 15, 12, 30, 45).getTime(),
      hours: 18,
      expected: new Date(2025, 0, 15, 18, 30, 45),
      desc: "accepts timestamp input",
    },

    // --- Invalid cases ---
    {
      date: new Date("invalid"),
      hours: 12,
      expected: new Date(NaN),
      desc: "returns Invalid Date when base is invalid",
    },
    {
      date: new Date(2025, 0, 15),
      hours: NaN,
      expected: new Date(NaN),
      desc: "returns Invalid Date when hours is NaN",
    },
    {
      date: new Date(2025, 0, 15),
      hours: Infinity,
      expected: new Date(NaN),
      desc: "returns Invalid Date when hours is Infinity",
    },
    {
      date: new Date(2025, 0, 15),
      hours: -Infinity,
      expected: new Date(NaN),
      desc: "returns Invalid Date when hours is -Infinity",
    },
  ])("$desc", ({ date, hours, expected }) => {
    const result = setHours(date as Date | number, hours);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });

  it("does not mutate the original date", () => {
    const original = new Date(2025, 0, 15, 12, 30, 45);
    const originalTime = original.getTime();

    setHours(original, 18);

    expect(original.getTime()).toBe(originalTime);
  });
});