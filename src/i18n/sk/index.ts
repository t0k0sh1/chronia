import { Locale } from "../../types";

/**
 * Slovak locale data.
 *
 * Based on CLDR data for Slovak (Slovakia).
 */
export const sk: Locale = {
  era: {
    // Narrow: pred Kr., po Kr.
    narrow: ["pred Kr.", "po Kr."] as const,
    // Abbreviated: pred Kr., po Kr.
    abbr: ["pred Kr.", "po Kr."] as const,
    // Wide: pred Kristom, po Kristovi
    wide: ["pred Kristom", "po Kristovi"] as const,
  },

  month: {
    // Narrow: single letter/number
    narrow: [
      "j",
      "f",
      "m",
      "a",
      "m",
      "j",
      "j",
      "a",
      "s",
      "o",
      "n",
      "d",
    ] as const,
    // Abbreviated
    abbr: [
      "jan",
      "feb",
      "mar",
      "apr",
      "máj",
      "jún",
      "júl",
      "aug",
      "sep",
      "okt",
      "nov",
      "dec",
    ] as const,
    // Wide
    wide: [
      "januára",
      "februára",
      "marca",
      "apríla",
      "mája",
      "júna",
      "júla",
      "augusta",
      "septembra",
      "októbra",
      "novembra",
      "decembra",
    ] as const,
  },

  weekday: {
    // Narrow: single letter
    narrow: ["n", "p", "u", "s", "š", "p", "s"] as const,
    // Abbreviated
    abbr: ["ne", "po", "ut", "st", "št", "pi", "so"] as const,
    // Wide
    wide: [
      "nedeľa",
      "pondelok",
      "utorok",
      "streda",
      "štvrtok",
      "piatok",
      "sobota",
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
