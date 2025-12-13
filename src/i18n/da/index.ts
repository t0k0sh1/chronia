import { Locale } from "../../types";

/**
 * Danish locale data.
 *
 * Based on CLDR data for Danish (Denmark).
 */
export const da: Locale = {
  era: {
    // Narrow: f.Kr., e.Kr.
    narrow: ["f.Kr.", "e.Kr."] as const,
    // Abbreviated: f.Kr., e.Kr.
    abbr: ["f.Kr.", "e.Kr."] as const,
    // Wide: før Kristus, efter Kristus
    wide: ["før Kristus", "efter Kristus"] as const,
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
      "maj",
      "jun.",
      "jul.",
      "aug.",
      "sep.",
      "okt.",
      "nov.",
      "dec.",
    ] as const,
    // Wide
    wide: [
      "januar",
      "februar",
      "marts",
      "april",
      "maj",
      "juni",
      "juli",
      "august",
      "september",
      "oktober",
      "november",
      "december",
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
    // Narrow: AM, PM
    narrow: ["a", "p"] as const,
    // Abbreviated: AM, PM
    abbr: ["AM", "PM"] as const,
    // Wide: AM, PM
    wide: ["AM", "PM"] as const,
  },
};
