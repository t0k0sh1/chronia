import { Locale } from "../../types";

/**
 * Norwegian Bokmål locale data.
 *
 * Based on CLDR data for Norwegian Bokmål (Norway).
 */
export const nb: Locale = {
  era: {
    // Narrow: f.Kr., e.Kr.
    narrow: ["f.Kr.", "e.Kr."] as const,
    // Abbreviated: f.Kr., e.Kr.
    abbr: ["f.Kr.", "e.Kr."] as const,
    // Wide: før Kristus, etter Kristus
    wide: ["før Kristus", "etter Kristus"] as const,
  },

  month: {
    // Narrow: single letter
    narrow: [
      "J",
      "F",
      "M",
      "A",
      "M",
      "J",
      "J",
      "A",
      "S",
      "O",
      "N",
      "D",
    ] as const,
    // Abbreviated
    abbr: [
      "jan.",
      "feb.",
      "mar.",
      "apr.",
      "mai",
      "jun.",
      "jul.",
      "aug.",
      "sep.",
      "okt.",
      "nov.",
      "des.",
    ] as const,
    // Wide
    wide: [
      "januar",
      "februar",
      "mars",
      "april",
      "mai",
      "juni",
      "juli",
      "august",
      "september",
      "oktober",
      "november",
      "desember",
    ] as const,
  },

  weekday: {
    // Narrow: single letter
    narrow: ["S", "M", "T", "O", "T", "F", "L"] as const,
    // Abbreviated
    abbr: ["søn.", "man.", "tir.", "ons.", "tor.", "fre.", "lør."] as const,
    // Wide
    wide: [
      "søndag",
      "mandag",
      "tirsdag",
      "onsdag",
      "torsdag",
      "fredag",
      "lørdag",
    ] as const,
  },

  dayPeriod: {
    // Narrow: a, p
    narrow: ["a", "p"] as const,
    // Abbreviated: a.m., p.m.
    abbr: ["a.m.", "p.m."] as const,
    // Wide: a.m., p.m.
    wide: ["a.m.", "p.m."] as const,
  },
};
