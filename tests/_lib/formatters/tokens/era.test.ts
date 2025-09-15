import { describe, it, expect } from "vitest";
import { formatEra } from "../../../../src/_lib/formatters/tokens/era";
import { Localize } from "../../../../src/types";

const mockLocalize: Localize = {
  era: (era, options) => {
    if (options?.width === "narrow") return era ? "A" : "B";
    if (options?.width === "wide") return era ? "Anno Domini" : "Before Christ";
    return era ? "AD" : "BC";
  },
  month: () => "",
  day: () => "",
  dayPeriod: () => "",
};

describe("formatEra", () => {
  it.each([
    // --- fallback (localizeなし) ---
    { year: 2025, token: "G", localize: undefined, expected: "AD" },
    { year: 0, token: "G", localize: undefined, expected: "BC" },

    // --- localizeあり (abbreviated) ---
    { year: 2025, token: "G", localize: mockLocalize, expected: "AD" },
    { year: 0, token: "G", localize: mockLocalize, expected: "BC" },

    // --- localizeあり (wide) ---
    {
      year: 2025,
      token: "GGGG",
      localize: mockLocalize,
      expected: "Anno Domini",
    },
    {
      year: -1,
      token: "GGGG",
      localize: mockLocalize,
      expected: "Before Christ",
    },

    // --- localizeあり (narrow) ---
    { year: 2025, token: "GGGGG", localize: mockLocalize, expected: "A" },
    { year: -1, token: "GGGGG", localize: mockLocalize, expected: "B" },
  ])(
    "year=$year token=$token localize=$localize => $expected",
    ({ year, token, localize, expected }) => {
      const d = new Date(0, 0, 1);
      d.setFullYear(year);
      expect(formatEra(d, token, localize)).toBe(expected);
    },
  );
});
