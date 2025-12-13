import type { Locale } from "../../types";

export const it: Locale = {
  era: {
    // Narrow: aC, dC
    narrow: ["aC", "dC"] as const,
    // Abbreviated: a.C., d.C.
    abbr: ["a.C.", "d.C."] as const,
    // Wide: avanti Cristo, dopo Cristo
    wide: ["avanti Cristo", "dopo Cristo"] as const,
  },

  month: {
    // Narrow: single letter
    narrow: [
      "G",
      "F",
      "M",
      "A",
      "M",
      "G",
      "L",
      "A",
      "S",
      "O",
      "N",
      "D",
    ] as const,
    // Abbreviated
    abbr: [
      "gen",
      "feb",
      "mar",
      "apr",
      "mag",
      "giu",
      "lug",
      "ago",
      "set",
      "ott",
      "nov",
      "dic",
    ] as const,
    // Wide
    wide: [
      "gennaio",
      "febbraio",
      "marzo",
      "aprile",
      "maggio",
      "giugno",
      "luglio",
      "agosto",
      "settembre",
      "ottobre",
      "novembre",
      "dicembre",
    ] as const,
  },

  weekday: {
    // Narrow: single letter
    narrow: ["D", "L", "M", "M", "G", "V", "S"] as const,
    // Abbreviated
    abbr: ["dom", "lun", "mar", "mer", "gio", "ven", "sab"] as const,
    // Wide
    wide: [
      "domenica",
      "lunedì",
      "martedì",
      "mercoledì",
      "giovedì",
      "venerdì",
      "sabato",
    ] as const,
  },

  dayPeriod: {
    // Narrow: AM, PM
    narrow: ["AM", "PM"] as const,
    // Abbreviated: AM, PM
    abbr: ["AM", "PM"] as const,
    // Wide: AM, PM (Italian commonly uses 24-hour format)
    wide: ["AM", "PM"] as const,
  },
};
