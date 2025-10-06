import { describe, it, expect } from "vitest";
import { setYear } from "../src/setYear";

describe("setYear", () => {
  it.each([
    // --- Valid cases ---
    {
      date: new Date(2025, 0, 15),
      year: 2030,
      expected: new Date(2030, 0, 15),
      desc: "sets year to future year",
    },
    {
      date: new Date(2025, 0, 15),
      year: 2020,
      expected: new Date(2020, 0, 15),
      desc: "sets year to past year",
    },
    {
      date: new Date(2025, 0, 15),
      year: 2025,
      expected: new Date(2025, 0, 15),
      desc: "sets year to same year",
    },
    {
      date: new Date(2025, 5, 30, 14, 30, 45, 123),
      year: 2024,
      expected: new Date(2024, 5, 30, 14, 30, 45, 123),
      desc: "preserves month, day, time, and milliseconds",
    },
    {
      date: new Date(2025, 0, 15),
      year: 2023.9,
      expected: new Date(2023, 0, 15),
      desc: "truncates fractional year (positive)",
    },
    {
      date: new Date(2025, 0, 15),
      year: -2023.9,
      expected: new Date(-2023, 0, 15),
      desc: "truncates fractional year (negative)",
    },
    {
      date: new Date(2025, 0, 15),
      year: 1900,
      expected: new Date(1900, 0, 15),
      desc: "sets year to 1900",
    },
    {
      date: new Date(2025, 0, 15),
      year: -1000,
      expected: new Date(-1000, 0, 15),
      desc: "sets year to negative (BC)",
    },
    {
      date: new Date(2025, 11, 31, 23, 59, 59, 999),
      year: 2026,
      expected: new Date(2026, 11, 31, 23, 59, 59, 999),
      desc: "handles year-end correctly",
    },
    {
      date: new Date(2025, 0, 15),
      year: 9999,
      expected: new Date(9999, 0, 15),
      desc: "sets year to maximum 4-digit year",
    },
    {
      date: new Date(2025, 0, 15),
      year: 100000,
      expected: new Date(100000, 0, 15),
      desc: "sets year to large positive year",
    },

    // --- Invalid cases ---
    {
      date: new Date("invalid"),
      year: 2025,
      expected: new Date(NaN),
      desc: "returns Invalid Date when base is invalid",
    },
    {
      date: new Date(2025, 0, 15),
      year: NaN,
      expected: new Date(NaN),
      desc: "returns Invalid Date when year is NaN",
    },
    {
      date: new Date(2025, 0, 15),
      year: Infinity,
      expected: new Date(NaN),
      desc: "returns Invalid Date when year is Infinity",
    },
    {
      date: new Date(2025, 0, 15),
      year: -Infinity,
      expected: new Date(NaN),
      desc: "returns Invalid Date when year is -Infinity",
    },
    {
      date: NaN,
      year: 2025,
      expected: new Date(NaN),
      desc: "returns Invalid Date when timestamp is NaN",
    },
  ])("$desc", ({ date, year, expected }) => {
    const result = setYear(date as Date | number, year);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });

  it("does not mutate the original date", () => {
    const original = new Date(2025, 0, 15);
    const originalTime = original.getTime();

    setYear(original, 2030);

    expect(original.getTime()).toBe(originalTime);
  });

  it("handles Feb 29 edge cases correctly", () => {
    // Test multiple leap years
    const leapYears = [2020, 2024, 2028, 2032];
    const nonLeapYears = [2021, 2022, 2023, 2025];

    const feb29 = new Date(2020, 1, 29);

    leapYears.forEach(year => {
      const result = setYear(feb29, year);
      expect(result.getMonth()).toBe(1); // February
      expect(result.getDate()).toBe(29);
      expect(result.getFullYear()).toBe(year);
    });

    nonLeapYears.forEach(year => {
      const result = setYear(feb29, year);
      expect(result.getMonth()).toBe(1); // February
      expect(result.getDate()).toBe(28); // Adjusted to Feb 28
      expect(result.getFullYear()).toBe(year);
    });
  });
});