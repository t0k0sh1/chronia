import { describe, it, expect } from "vitest";
import { formatWeekday } from "../../../../src/_lib/formatters/tokens/weekday";
import { Locale } from "../../../../src/types";

const mockLocale: Locale = {
  era: {
    narrow: ["B", "A"],
    abbr: ["BC", "AD"],
    wide: ["Before Christ", "Anno Domini"],
  },
  month: {
    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    abbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  },
  weekday: {
    narrow: ["S", "M", "T", "W", "T", "F", "S"],
    abbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  },
  dayPeriod: {
    narrow: ["a", "p"],
    abbr: ["AM", "PM"],
    wide: ["AM (morning)", "PM (afternoon)"],
  },
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

    // --- default case with locale (unknown token) ---
    {
      date: new Date(2025, 0, 5),
      token: "EEEEEE",
      locale: mockLocale,
      expected: "Sun",
    },
  ])(
    "date=$date token=$token locale? => $expected",
    ({ date, token, locale, expected }) => {
      expect(formatWeekday(date, token, locale)).toBe(expected);
    },
  );
});
