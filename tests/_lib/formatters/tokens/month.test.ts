import { describe, it, expect } from "vitest";
import { formatMonth } from "../../../../src/_lib/formatters/tokens/month";
import { Locale } from "../../../../src/types";

const mockLocale: Locale = {
  era: () => "",
  month: (month, options) => {
    const abbreviated = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const wide = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const narrow = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
    if (options?.width === "wide") return wide[month];
    if (options?.width === "narrow") return narrow[month];
    return abbreviated[month];
  },
  weekday: () => "",
  dayPeriod: () => "",
};

describe("formatMonth", () => {
  it.each([
    // --- fallback (数値のみ) ---
    { month: 0, token: "M", locale: undefined, expected: "1" },
    { month: 0, token: "MM", locale: undefined, expected: "01" },
    { month: 8, token: "M", locale: undefined, expected: "9" },
    { month: 11, token: "MM", locale: undefined, expected: "12" },

    // --- localize (abbreviated) ---
    { month: 0, token: "MMM", locale: mockLocale, expected: "Jan" },
    { month: 11, token: "MMM", locale: mockLocale, expected: "Dec" },

    // --- localize (wide) ---
    { month: 0, token: "MMMM", locale: mockLocale, expected: "January" },
    { month: 1, token: "MMMM", locale: mockLocale, expected: "February" },

    // --- localize (narrow) ---
    { month: 0, token: "MMMMM", locale: mockLocale, expected: "J" },
    { month: 1, token: "MMMMM", locale: mockLocale, expected: "F" },

    // --- localize with M/MM (numeric with locale) ---
    { month: 0, token: "M", locale: mockLocale, expected: "1" },
    { month: 0, token: "MM", locale: mockLocale, expected: "01" },
    { month: 11, token: "M", locale: mockLocale, expected: "12" },
  ])(
    "month=$month token=$token locale? => $expected",
    ({ month, token, locale, expected }) => {
      const d = new Date(2025, month, 1);
      expect(formatMonth(d, token, locale)).toBe(expected);
    },
  );
});
