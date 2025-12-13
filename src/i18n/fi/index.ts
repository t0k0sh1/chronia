import { Locale } from "../../types";

/**
 * Finnish locale data.
 *
 * Based on CLDR data for Finnish (Finland).
 */
export const fi: Locale = {
  era: {
    // Narrow: eKr., jKr.
    narrow: ["eKr.", "jKr."] as const,
    // Abbreviated: eKr., jKr.
    abbr: ["eKr.", "jKr."] as const,
    // Wide: ennen Kristuksen syntymää, jälkeen Kristuksen syntymän
    wide: ["ennen Kristuksen syntymää", "jälkeen Kristuksen syntymän"] as const,
  },

  month: {
    // Narrow: single letter
    narrow: [
      "T",
      "H",
      "M",
      "H",
      "T",
      "K",
      "H",
      "E",
      "S",
      "L",
      "M",
      "J",
    ] as const,
    // Abbreviated
    abbr: [
      "tammik.",
      "helmik.",
      "maalisk.",
      "huhtik.",
      "toukok.",
      "kesäk.",
      "heinäk.",
      "elok.",
      "syysk.",
      "lokak.",
      "marrask.",
      "jouluk.",
    ] as const,
    // Wide
    wide: [
      "tammikuuta",
      "helmikuuta",
      "maaliskuuta",
      "huhtikuuta",
      "toukokuuta",
      "kesäkuuta",
      "heinäkuuta",
      "elokuuta",
      "syyskuuta",
      "lokakuuta",
      "marraskuuta",
      "joulukuuta",
    ] as const,
  },

  weekday: {
    // Narrow: single letter
    narrow: ["S", "M", "T", "K", "T", "P", "L"] as const,
    // Abbreviated
    abbr: ["su", "ma", "ti", "ke", "to", "pe", "la"] as const,
    // Wide
    wide: [
      "sunnuntaina",
      "maanantaina",
      "tiistaina",
      "keskiviikkona",
      "torstaina",
      "perjantaina",
      "lauantaina",
    ] as const,
  },

  dayPeriod: {
    // Narrow: ap., ip.
    narrow: ["ap.", "ip."] as const,
    // Abbreviated: ap., ip.
    abbr: ["ap.", "ip."] as const,
    // Wide: aamupäivä, iltapäivä
    wide: ["ap.", "ip."] as const,
  },
};
