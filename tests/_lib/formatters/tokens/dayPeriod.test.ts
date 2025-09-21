import { describe, it, expect } from "vitest";
import { formatDayPeriod } from "../../../../src/_lib/formatters/tokens/dayPeriod";
import { Locale } from "../../../../src/types";

const mockLocale: Locale = {
  era: () => "",
  month: () => "",
  weekday: () => "",
  dayPeriod: (period, options) => {
    if (options?.width === "narrow") return period === "am" ? "a" : "p";
    if (options?.width === "wide") return period === "am" ? "午前" : "午後";
    return period === "am" ? "AM" : "PM"; // abbreviated
  },
};

describe("formatDayPeriod", () => {
  it.each([
    // --- fallback ---
    { hour: 0, token: "a", locale: undefined, expected: "AM" },
    { hour: 11, token: "a", locale: undefined, expected: "AM" },
    { hour: 12, token: "a", locale: undefined, expected: "PM" },
    { hour: 23, token: "a", locale: undefined, expected: "PM" },

    // --- localize abbreviated (a, aa, aaa) ---
    { hour: 9, token: "a", locale: mockLocale, expected: "AM" },
    { hour: 9, token: "aa", locale: mockLocale, expected: "AM" },
    { hour: 9, token: "aaa", locale: mockLocale, expected: "AM" },
    { hour: 15, token: "a", locale: mockLocale, expected: "PM" },

    // --- localize wide (aaaa) ---
    { hour: 9, token: "aaaa", locale: mockLocale, expected: "午前" },
    { hour: 15, token: "aaaa", locale: mockLocale, expected: "午後" },

    // --- localize narrow (aaaaa) ---
    { hour: 9, token: "aaaaa", locale: mockLocale, expected: "a" },
    { hour: 15, token: "aaaaa", locale: mockLocale, expected: "p" },
  ])(
    "hour=$hour token=$token locale? => $expected",
    ({ hour, token, locale, expected }) => {
      const d = new Date(2025, 0, 1, hour);
      expect(formatDayPeriod(d, token, locale)).toBe(expected);
    },
  );
});
