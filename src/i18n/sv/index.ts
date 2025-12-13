import type { Locale } from "../../types";

export const sv: Locale = {
  era: {
    // Narrow: f.Kr., e.Kr.
    narrow: ["f.Kr.", "e.Kr."] as const,
    // Abbreviated: f.Kr., e.Kr.
    abbr: ["f.Kr.", "e.Kr."] as const,
    // Wide: före Kristus, efter Kristus
    wide: ["före Kristus", "efter Kristus"] as const,
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
      "mars",
      "apr.",
      "maj",
      "juni",
      "juli",
      "aug.",
      "sep.",
      "okt.",
      "nov.",
      "dec.",
    ] as const,
    // Wide
    wide: [
      "januari",
      "februari",
      "mars",
      "april",
      "maj",
      "juni",
      "juli",
      "augusti",
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
    abbr: ["sön", "mån", "tis", "ons", "tors", "fre", "lör"] as const,
    // Wide
    wide: [
      "söndag",
      "måndag",
      "tisdag",
      "onsdag",
      "torsdag",
      "fredag",
      "lördag",
    ] as const,
  },

  dayPeriod: {
    // Narrow: fm, em (Swedish-specific)
    narrow: ["fm", "em"] as const,
    // Abbreviated: f.m., e.m. (Swedish-specific)
    abbr: ["f.m.", "e.m."] as const,
    // Wide: förmiddag, eftermiddag (Swedish-specific)
    wide: ["förmiddag", "eftermiddag"] as const,
  },
};
