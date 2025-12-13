import { Locale } from "../../types";

/**
 * Croatian locale data.
 *
 * Based on CLDR data for Croatian (Croatia).
 */
export const hr: Locale = {
  era: {
    // Narrow: pr. Kr., po. Kr.
    narrow: ["pr. Kr.", "po. Kr."] as const,
    // Abbreviated: pr. Kr., po. Kr.
    abbr: ["pr. Kr.", "po. Kr."] as const,
    // Wide: prije Krista, poslije Krista
    wide: ["prije Krista", "poslije Krista"] as const,
  },

  month: {
    // Narrow: single letter/number
    narrow: [
      "1.",
      "2.",
      "3.",
      "4.",
      "5.",
      "6.",
      "7.",
      "8.",
      "9.",
      "10.",
      "11.",
      "12.",
    ] as const,
    // Abbreviated
    abbr: [
      "sij",
      "velj",
      "ožu",
      "tra",
      "svi",
      "lip",
      "srp",
      "kol",
      "ruj",
      "lis",
      "stu",
      "pro",
    ] as const,
    // Wide
    wide: [
      "siječnja",
      "veljače",
      "ožujka",
      "travnja",
      "svibnja",
      "lipnja",
      "srpnja",
      "kolovoza",
      "rujna",
      "listopada",
      "studenoga",
      "prosinca",
    ] as const,
  },

  weekday: {
    // Narrow: single letter
    narrow: ["N", "P", "U", "S", "Č", "P", "S"] as const,
    // Abbreviated
    abbr: ["ned", "pon", "uto", "sri", "čet", "pet", "sub"] as const,
    // Wide
    wide: [
      "nedjelja",
      "ponedjeljak",
      "utorak",
      "srijeda",
      "četvrtak",
      "petak",
      "subota",
    ] as const,
  },

  dayPeriod: {
    // Narrow: AM, PM
    narrow: ["AM", "PM"] as const,
    // Abbreviated: AM, PM
    abbr: ["AM", "PM"] as const,
    // Wide: AM, PM
    wide: ["AM", "PM"] as const,
  },
};
