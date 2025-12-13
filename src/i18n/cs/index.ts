import { Locale } from "../../types";

/**
 * Czech locale data.
 *
 * Based on CLDR data for Czech (Czech Republic).
 */
export const cs: Locale = {
  era: {
    // Narrow: př.n.l., n.l.
    narrow: ["př.n.l.", "n.l."] as const,
    // Abbreviated: př. n. l., n. l.
    abbr: ["př. n. l.", "n. l."] as const,
    // Wide: před naším letopočtem, našeho letopočtu
    wide: ["před naším letopočtem", "našeho letopočtu"] as const,
  },

  month: {
    // Narrow: single letter/number
    narrow: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
    ] as const,
    // Abbreviated
    abbr: [
      "led",
      "úno",
      "bře",
      "dub",
      "kvě",
      "čvn",
      "čvc",
      "srp",
      "zář",
      "říj",
      "lis",
      "pro",
    ] as const,
    // Wide
    wide: [
      "ledna",
      "února",
      "března",
      "dubna",
      "května",
      "června",
      "července",
      "srpna",
      "září",
      "října",
      "listopadu",
      "prosince",
    ] as const,
  },

  weekday: {
    // Narrow: single letter
    narrow: ["N", "P", "Ú", "S", "Č", "P", "S"] as const,
    // Abbreviated
    abbr: ["ne", "po", "út", "st", "čt", "pá", "so"] as const,
    // Wide
    wide: [
      "neděle",
      "pondělí",
      "úterý",
      "středa",
      "čtvrtek",
      "pátek",
      "sobota",
    ] as const,
  },

  dayPeriod: {
    // Narrow: dop., odp.
    narrow: ["dop.", "odp."] as const,
    // Abbreviated: dop., odp.
    abbr: ["dop.", "odp."] as const,
    // Wide: dopoledne, odpoledne
    wide: ["dopoledne", "odpoledne"] as const,
  },
};
