import { describe, it, expect } from "vitest";
import { formatWeekday } from "../../../../src/_lib/formatters/tokens/weekday";
import { Localize } from "../../../../src/types";

const mockLocalize: Localize = {
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
      localize: undefined,
      expected: "Sun",
    }, // 2025-01-05 = Sunday
    {
      date: new Date(2025, 0, 6),
      token: "EEE",
      localize: undefined,
      expected: "Mon",
    }, // Monday

    // --- fallback wide ---
    {
      date: new Date(2025, 0, 7),
      token: "EEEE",
      localize: undefined,
      expected: "Tuesday",
    },

    // --- fallback narrow ---
    {
      date: new Date(2025, 0, 8),
      token: "EEEEE",
      localize: undefined,
      expected: "W",
    },

    // --- localize abbreviated ---
    {
      date: new Date(2025, 0, 9),
      token: "E",
      localize: mockLocalize,
      expected: "Thu",
    },

    // --- localize wide ---
    {
      date: new Date(2025, 0, 10),
      token: "EEEE",
      localize: mockLocalize,
      expected: "Friday",
    },

    // --- localize narrow ---
    {
      date: new Date(2025, 0, 11),
      token: "EEEEE",
      localize: mockLocalize,
      expected: "S",
    }, // Saturday
  ])(
    "date=$date token=$token localize? => $expected",
    ({ date, token, localize, expected }) => {
      expect(formatWeekday(date, token, localize)).toBe(expected);
    },
  );
});
