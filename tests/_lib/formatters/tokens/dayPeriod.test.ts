import { describe, it, expect } from "vitest";
import { formatDayPeriod } from "../../../../src/_lib/formatters/tokens/dayPeriod";
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
    wide: ["午前", "午後"],
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
    { hour: 9, token: "aaa", locale: mockLocale, expected: "am" }, // date-fns: lowercase for aaa
    { hour: 15, token: "a", locale: mockLocale, expected: "PM" },
    { hour: 15, token: "aaa", locale: mockLocale, expected: "pm" }, // date-fns: lowercase for aaa

    // --- localize wide (aaaa) ---
    { hour: 9, token: "aaaa", locale: mockLocale, expected: "午前" },
    { hour: 15, token: "aaaa", locale: mockLocale, expected: "午後" },

    // --- localize narrow (aaaaa) ---
    { hour: 9, token: "aaaaa", locale: mockLocale, expected: "a" },
    { hour: 15, token: "aaaaa", locale: mockLocale, expected: "p" },

    // --- default case with locale (unknown token) ---
    { hour: 9, token: "aaaaaa", locale: mockLocale, expected: "AM" },
  ])(
    "hour=$hour token=$token locale? => $expected",
    ({ hour, token, locale, expected }) => {
      const d = new Date(2025, 0, 1, hour);
      expect(formatDayPeriod(d, token, locale)).toBe(expected);
    },
  );
});
