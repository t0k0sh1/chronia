import { describe, it, expect } from "vitest";
import { formatDayPeriod } from "../../../../src/_lib/formatters/tokens/dayPeriod";
import { Localize } from "../../../../src/types";

const mockLocalize: Localize = {
  era: () => "",
  month: () => "",
  day: () => "",
  dayPeriod: (period, options) => {
    if (options?.width === "narrow") return period === "am" ? "a" : "p";
    if (options?.width === "wide") return period === "am" ? "午前" : "午後";
    return period === "am" ? "AM" : "PM"; // abbreviated
  },
};

describe("formatDayPeriod", () => {
  it.each([
    // --- fallback ---
    { hour: 0, token: "a", localize: undefined, expected: "AM" },
    { hour: 11, token: "a", localize: undefined, expected: "AM" },
    { hour: 12, token: "a", localize: undefined, expected: "PM" },
    { hour: 23, token: "a", localize: undefined, expected: "PM" },

    // --- localize abbreviated (a, aa, aaa) ---
    { hour: 9, token: "a", localize: mockLocalize, expected: "AM" },
    { hour: 9, token: "aa", localize: mockLocalize, expected: "AM" },
    { hour: 9, token: "aaa", localize: mockLocalize, expected: "AM" },
    { hour: 15, token: "a", localize: mockLocalize, expected: "PM" },

    // --- localize wide (aaaa) ---
    { hour: 9, token: "aaaa", localize: mockLocalize, expected: "午前" },
    { hour: 15, token: "aaaa", localize: mockLocalize, expected: "午後" },

    // --- localize narrow (aaaaa) ---
    { hour: 9, token: "aaaaa", localize: mockLocalize, expected: "a" },
    { hour: 15, token: "aaaaa", localize: mockLocalize, expected: "p" },
  ])(
    "hour=$hour token=$token localize? => $expected",
    ({ hour, token, localize, expected }) => {
      const d = new Date(2025, 0, 1, hour);
      expect(formatDayPeriod(d, token, localize)).toBe(expected);
    },
  );
});
