import { describe, it, expect } from "vitest";
import { formatMonth } from "../../../../src/_lib/formatters/tokens/month";
import { Localize } from "../../../../src/_lib/types";

const mockLocalize: Localize = {
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
  day: () => "",
  dayPeriod: () => "",
};

describe("formatMonth", () => {
  it.each([
    // --- fallback (数値のみ) ---
    { month: 0, token: "M", localize: undefined, expected: "1" },
    { month: 0, token: "MM", localize: undefined, expected: "01" },
    { month: 8, token: "M", localize: undefined, expected: "9" },
    { month: 11, token: "MM", localize: undefined, expected: "12" },

    // --- localize (abbreviated) ---
    { month: 0, token: "MMM", localize: mockLocalize, expected: "Jan" },
    { month: 11, token: "MMM", localize: mockLocalize, expected: "Dec" },

    // --- localize (wide) ---
    { month: 0, token: "MMMM", localize: mockLocalize, expected: "January" },
    { month: 1, token: "MMMM", localize: mockLocalize, expected: "February" },

    // --- localize (narrow) ---
    { month: 0, token: "MMMMM", localize: mockLocalize, expected: "J" },
    { month: 1, token: "MMMMM", localize: mockLocalize, expected: "F" },
  ])(
    "month=$month token=$token localize? => $expected",
    ({ month, token, localize, expected }) => {
      const d = new Date(2025, month, 1);
      expect(formatMonth(d, token, localize)).toBe(expected);
    },
  );
});
