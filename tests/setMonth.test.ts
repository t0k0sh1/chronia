import { describe, it, expect } from "vitest";
import { setMonth } from "../src/setMonth";

describe("setMonth", () => {
  it.each([
    // --- Valid cases ---
    {
      date: new Date(2025, 0, 15),
      month: 5,
      expected: new Date(2025, 5, 15),
      desc: "sets month to June (5)",
    },
    {
      date: new Date(2025, 5, 15),
      month: 0,
      expected: new Date(2025, 0, 15),
      desc: "sets month to January (0)",
    },
    {
      date: new Date(2025, 5, 15),
      month: 11,
      expected: new Date(2025, 11, 15),
      desc: "sets month to December (11)",
    },
    {
      date: new Date(2025, 5, 15),
      month: 5,
      expected: new Date(2025, 5, 15),
      desc: "sets month to same month",
    },
    {
      date: new Date(2025, 0, 31),
      month: 1,
      expected: new Date(2025, 1, 28),
      desc: "adjusts day when target month has fewer days (Jan 31 -> Feb 28)",
    },
    {
      date: new Date(2024, 0, 31),
      month: 1,
      expected: new Date(2024, 1, 29),
      desc: "adjusts to Feb 29 in leap year (Jan 31 -> Feb 29)",
    },
    {
      date: new Date(2025, 2, 31),
      month: 3,
      expected: new Date(2025, 3, 30),
      desc: "adjusts day to last day of April (Mar 31 -> Apr 30)",
    },
    {
      date: new Date(2025, 0, 31),
      month: 10,
      expected: new Date(2025, 10, 30),
      desc: "adjusts day to last day of November (Jan 31 -> Nov 30)",
    },
    {
      date: new Date(2025, 0, 15, 14, 30, 45, 123),
      month: 6,
      expected: new Date(2025, 6, 15, 14, 30, 45, 123),
      desc: "preserves day, time, and milliseconds",
    },
    {
      date: new Date(2025, 0, 15),
      month: 5.9,
      expected: new Date(2025, 5, 15),
      desc: "truncates fractional month (positive)",
    },
    {
      date: new Date(2025, 0, 15),
      month: -1.9,
      expected: new Date(2025, -1, 15),
      desc: "truncates fractional month (negative)",
    },
    {
      date: new Date(2025, 0, 15),
      month: -1,
      expected: new Date(2024, 11, 15),
      desc: "handles negative month (rolls back to previous year)",
    },
    {
      date: new Date(2025, 0, 15),
      month: 12,
      expected: new Date(2026, 0, 15),
      desc: "handles month overflow (rolls forward to next year)",
    },
    {
      date: new Date(2025, 0, 15),
      month: 24,
      expected: new Date(2027, 0, 15),
      desc: "handles large month values (adds years)",
    },
    {
      date: new Date(2025, 0, 15).getTime(),
      month: 6,
      expected: new Date(2025, 6, 15),
      desc: "accepts timestamp input",
    },
    {
      date: new Date(2025, 11, 31),
      month: 1,
      expected: new Date(2025, 1, 28),
      desc: "year-end date to February",
    },

    // --- Invalid cases ---
    {
      date: new Date("invalid"),
      month: 5,
      expected: new Date(NaN),
      desc: "returns Invalid Date when base is invalid",
    },
    {
      date: new Date(2025, 0, 15),
      month: NaN,
      expected: new Date(NaN),
      desc: "returns Invalid Date when month is NaN",
    },
    {
      date: new Date(2025, 0, 15),
      month: Infinity,
      expected: new Date(NaN),
      desc: "returns Invalid Date when month is Infinity",
    },
    {
      date: new Date(2025, 0, 15),
      month: -Infinity,
      expected: new Date(NaN),
      desc: "returns Invalid Date when month is -Infinity",
    },
    {
      date: NaN,
      month: 5,
      expected: new Date(NaN),
      desc: "returns Invalid Date when timestamp is NaN",
    },
    {
      date: "2025-01-15" as any,
      month: 5,
      expected: new Date(NaN),
      desc: "rejects string as date",
    },
    {
      date: new Date(2025, 0, 15),
      month: "5" as any,
      expected: new Date(NaN),
      desc: "rejects string as month",
    },
    {
      date: new Date(2020, 11, 31, 15, 0, 0),
      month: 5,
      expected: new Date(2020, 5, 30, 15, 0, 0),
      desc: "handles day adjustment with time preserved",
    },
  ])("$desc", ({ date, month, expected }) => {
    const result = setMonth(date as Date | number, month);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });

  it("does not mutate the original date", () => {
    const original = new Date(2025, 0, 15);
    const originalTime = original.getTime();

    setMonth(original, 6);

    expect(original.getTime()).toBe(originalTime);
  });

  it("handles month-end adjustments correctly", () => {
    // Test all months that have 31 days setting to months with fewer days
    const jan31 = new Date(2025, 0, 31);

    // To February (28 days in non-leap year)
    expect(setMonth(jan31, 1).getDate()).toBe(28);

    // To April (30 days)
    expect(setMonth(jan31, 3).getDate()).toBe(30);

    // To June (30 days)
    expect(setMonth(jan31, 5).getDate()).toBe(30);

    // To September (30 days)
    expect(setMonth(jan31, 8).getDate()).toBe(30);

    // To November (30 days)
    expect(setMonth(jan31, 10).getDate()).toBe(30);
  });
});