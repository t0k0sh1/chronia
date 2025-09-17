import { describe, it, expect } from "vitest";
import { formatWeekday } from "../../../../src/_lib/formatters/tokens/weekday";
import { Locale } from "../../../../src/types";

const mockLocale: Locale = {
  era: () => "",
  month: () => "",
  weekday: (weekday, options) => {
    const abbreviated = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const wide = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const narrow = ["S", "M", "T", "W", "T", "F", "S"];

    if (options?.width === "wide") return wide[weekday];
    if (options?.width === "narrow") return narrow[weekday];
    return abbreviated[weekday];
  },
  dayPeriod: () => "",
};

describe("formatWeekday", () => {
  it.each([
    // --- fallback abbreviated ---
    {
      date: new Date(2025, 0, 5),
      token: "E",
      locale: undefined,
      expected: "Sun",
    }, // 2025-01-05 = Sunday
    {
      date: new Date(2025, 0, 6),
      token: "EEE",
      locale: undefined,
      expected: "Mon",
    }, // Monday

    // --- fallback wide ---
    {
      date: new Date(2025, 0, 7),
      token: "EEEE",
      locale: undefined,
      expected: "Tuesday",
    },

    // --- fallback narrow ---
    {
      date: new Date(2025, 0, 8),
      token: "EEEEE",
      locale: undefined,
      expected: "W",
    },

    // --- localize abbreviated ---
    {
      date: new Date(2025, 0, 9),
      token: "E",
      locale: mockLocale,
      expected: "Thu",
    },

    // --- localize wide ---
    {
      date: new Date(2025, 0, 10),
      token: "EEEE",
      locale: mockLocale,
      expected: "Friday",
    },

    // --- localize narrow ---
    {
      date: new Date(2025, 0, 11),
      token: "EEEEE",
      locale: mockLocale,
      expected: "S",
    }, // Saturday
  ])(
    "date=$date token=$token locale? => $expected",
    ({ date, token, locale, expected }) => {
      expect(formatWeekday(date, token, locale)).toBe(expected);
    },
  );
});
