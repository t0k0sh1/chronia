import { describe, it, expect } from "vitest";
import { formatEra } from "../../../../src/_lib/formatters/tokens/era";
import { Locale } from "../../../../src/types";

const mockLocale: Locale = {
  era: (era, options) => {
    if (options?.width === "narrow") return era ? "A" : "B";
    if (options?.width === "wide") return era ? "Anno Domini" : "Before Christ";
    return era ? "AD" : "BC";
  },
  month: () => "",
  weekday: () => "",
  dayPeriod: () => "",
};

describe("formatEra", () => {
  it.each([
    // --- fallback (localizeなし) ---
    { year: 2025, token: "G", locale: undefined, expected: "AD" },
    { year: 0, token: "G", locale: undefined, expected: "BC" },

    // --- localizeあり (abbreviated) ---
    { year: 2025, token: "G", locale: mockLocale, expected: "AD" },
    { year: 0, token: "G", locale: mockLocale, expected: "BC" },

    // --- localizeあり (wide) ---
    {
      year: 2025,
      token: "GGGG",
      locale: mockLocale,
      expected: "Anno Domini",
    },
    {
      year: -1,
      token: "GGGG",
      locale: mockLocale,
      expected: "Before Christ",
    },

    // --- localizeあり (narrow) ---
    { year: 2025, token: "GGGGG", locale: mockLocale, expected: "A" },
    { year: -1, token: "GGGGG", locale: mockLocale, expected: "B" },
  ])(
    "year=$year token=$token locale=$locale => $expected",
    ({ year, token, locale, expected }) => {
      const d = new Date(0, 0, 1);
      d.setFullYear(year);
      expect(formatEra(d, token, locale)).toBe(expected);
    },
  );
});
