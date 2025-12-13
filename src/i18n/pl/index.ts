import type { Locale } from "../../types";

export const pl: Locale = {
  era: {
    // Narrow: p.n.e., n.e.
    narrow: ["p.n.e.", "n.e."] as const,
    // Abbreviated: p.n.e., n.e.
    abbr: ["p.n.e.", "n.e."] as const,
    // Wide: przed naszą erą, naszej ery
    wide: ["przed naszą erą", "naszej ery"] as const,
  },

  month: {
    // Narrow: single letter
    narrow: [
      "S",
      "L",
      "M",
      "K",
      "M",
      "C",
      "L",
      "S",
      "W",
      "P",
      "L",
      "G",
    ] as const,
    // Abbreviated
    abbr: [
      "sty",
      "lut",
      "mar",
      "kwi",
      "maj",
      "cze",
      "lip",
      "sie",
      "wrz",
      "paź",
      "lis",
      "gru",
    ] as const,
    // Wide
    wide: [
      "styczeń",
      "luty",
      "marzec",
      "kwiecień",
      "maj",
      "czerwiec",
      "lipiec",
      "sierpień",
      "wrzesień",
      "październik",
      "listopad",
      "grudzień",
    ] as const,
  },

  weekday: {
    // Narrow: single letter
    narrow: ["N", "P", "W", "Ś", "C", "P", "S"] as const,
    // Abbreviated
    abbr: ["niedz.", "pon.", "wt.", "śr.", "czw.", "pt.", "sob."] as const,
    // Wide
    wide: [
      "niedziela",
      "poniedziałek",
      "wtorek",
      "środa",
      "czwartek",
      "piątek",
      "sobota",
    ] as const,
  },

  dayPeriod: {
    // Narrow: AM, PM
    narrow: ["AM", "PM"] as const,
    // Abbreviated: AM, PM
    abbr: ["AM", "PM"] as const,
    // Wide: AM, PM (Polish commonly uses 24-hour format)
    wide: ["AM", "PM"] as const,
  },
};
