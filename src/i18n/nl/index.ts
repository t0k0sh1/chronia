import type { Locale } from "../../types";

export const nl: Locale = {
  era: {
    // Narrow: v.C., n.C.
    narrow: ["v.C.", "n.C."] as const,
    // Abbreviated: v.Chr., n.Chr.
    abbr: ["v.Chr.", "n.Chr."] as const,
    // Wide: voor Christus, na Christus
    wide: ["voor Christus", "na Christus"] as const,
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
      "mrt.",
      "apr.",
      "mei",
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
      "januari",
      "februari",
      "maart",
      "april",
      "mei",
      "juni",
      "juli",
      "augustus",
      "september",
      "oktober",
      "november",
      "december",
    ] as const,
  },

  weekday: {
    // Narrow: single letter
    narrow: ["Z", "M", "D", "W", "D", "V", "Z"] as const,
    // Abbreviated
    abbr: ["zo", "ma", "di", "wo", "do", "vr", "za"] as const,
    // Wide
    wide: [
      "zondag",
      "maandag",
      "dinsdag",
      "woensdag",
      "donderdag",
      "vrijdag",
      "zaterdag",
    ] as const,
  },

  dayPeriod: {
    // Narrow: AM, PM
    narrow: ["AM", "PM"] as const,
    // Abbreviated: AM, PM
    abbr: ["AM", "PM"] as const,
    // Wide: AM, PM (Dutch commonly uses 24-hour format)
    wide: ["AM", "PM"] as const,
  },
};
