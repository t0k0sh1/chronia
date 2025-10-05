import { describe, it, expect } from "vitest";
import { setDay } from "../src/setDay";

describe("setDay", () => {
  it.each([
    // --- Valid cases ---
    {
      date: new Date(2025, 0, 15),
      day: 1,
      expected: new Date(2025, 0, 1),
      desc: "sets day to 1st",
    },
    {
      date: new Date(2025, 0, 15),
      day: 31,
      expected: new Date(2025, 0, 31),
      desc: "sets day to 31st",
    },
    {
      date: new Date(2025, 0, 15),
      day: 15,
      expected: new Date(2025, 0, 15),
      desc: "sets day to same day",
    },
    {
      date: new Date(2025, 0, 15, 14, 30, 45, 123),
      day: 20,
      expected: new Date(2025, 0, 20, 14, 30, 45, 123),
      desc: "preserves year, month, time, and milliseconds",
    },
    {
      date: new Date(2025, 0, 15),
      day: 15.9,
      expected: new Date(2025, 0, 15),
      desc: "truncates fractional day (positive)",
    },
    {
      date: new Date(2025, 0, 15),
      day: -1.9,
      expected: new Date(2024, 11, 30),
      desc: "truncates fractional day (negative)",
    },
    {
      date: new Date(2025, 0, 15),
      day: 0,
      expected: new Date(2024, 11, 31),
      desc: "day 0 becomes last day of previous month",
    },
    {
      date: new Date(2025, 0, 15),
      day: -1,
      expected: new Date(2024, 11, 30),
      desc: "negative day goes to previous month",
    },
    {
      date: new Date(2025, 0, 15),
      day: 32,
      expected: new Date(2025, 1, 1),
      desc: "day overflow goes to next month",
    },
    {
      date: new Date(2025, 0, 15),
      day: 100,
      expected: new Date(2025, 3, 10),
      desc: "large day value rolls over multiple months",
    },
    {
      date: new Date(2025, 11, 31, 23, 59, 59, 999),
      day: 1,
      expected: new Date(2025, 11, 1, 23, 59, 59, 999),
      desc: "handles year-end correctly",
    },

    // --- Invalid cases ---
    {
      date: new Date("invalid"),
      day: 15,
      expected: new Date(NaN),
      desc: "returns Invalid Date when base is invalid",
    },
    {
      date: new Date(2025, 0, 15),
      day: NaN,
      expected: new Date(NaN),
      desc: "returns Invalid Date when day is NaN",
    },
    {
      date: new Date(2025, 0, 15),
      day: Infinity,
      expected: new Date(NaN),
      desc: "returns Invalid Date when day is Infinity",
    },
    {
      date: new Date(2025, 0, 15),
      day: -Infinity,
      expected: new Date(NaN),
      desc: "returns Invalid Date when day is -Infinity",
    },
    {
      date: NaN,
      day: 15,
      expected: new Date(NaN),
      desc: "returns Invalid Date when timestamp is NaN",
    },
  ])("$desc", ({ date, day, expected }) => {
    const result = setDay(date as Date | number, day);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });

  it("does not mutate the original date", () => {
    const original = new Date(2025, 0, 15);
    const originalTime = original.getTime();

    setDay(original, 20);

    expect(original.getTime()).toBe(originalTime);
  });

  it("handles month boundaries and rollover correctly", () => {
    // Test rollover to next month (30-day months)
    const months30Days = [3, 5, 8, 10]; // April, June, September, November

    months30Days.forEach(month => {
      const date = new Date(2025, month, 15);
      const result = setDay(date, 31);
      expect(result.getMonth()).toBe((month + 1) % 12);
      expect(result.getDate()).toBe(1);
    });

    // February rollover in non-leap year
    const feb2025 = new Date(2025, 1, 15);
    const feb29_2025 = setDay(feb2025, 29);
    expect(feb29_2025.getMonth()).toBe(2); // March
    expect(feb29_2025.getDate()).toBe(1);

    // February in leap year (no rollover)
    const feb2024 = new Date(2024, 1, 15);
    const feb29_2024 = setDay(feb2024, 29);
    expect(feb29_2024.getMonth()).toBe(1); // Still February
    expect(feb29_2024.getDate()).toBe(29);

    // Day 0 becomes last day of previous month
    const jan15 = new Date(2025, 0, 15);
    const day0 = setDay(jan15, 0);
    expect(day0.getMonth()).toBe(11); // December
    expect(day0.getDate()).toBe(31);
    expect(day0.getFullYear()).toBe(2024);

    // Day 0 in March (non-leap year)
    const mar15 = new Date(2025, 2, 15);
    const feb28 = setDay(mar15, 0);
    expect(feb28.getMonth()).toBe(1); // February
    expect(feb28.getDate()).toBe(28);

    // Day 0 in March (leap year)
    const mar15_leap = new Date(2024, 2, 15);
    const feb29_leap = setDay(mar15_leap, 0);
    expect(feb29_leap.getMonth()).toBe(1); // February
    expect(feb29_leap.getDate()).toBe(29);
  });
});