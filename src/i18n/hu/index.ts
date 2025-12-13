import { Locale } from "../../types";

/**
 * Hungarian locale data.
 *
 * Based on CLDR data for Hungarian (Hungary).
 */
export const hu: Locale = {
  era: {
    // Narrow: i.e., i.sz.
    narrow: ["i. e.", "i. sz."] as const,
    // Abbreviated: i. e., i. sz.
    abbr: ["i. e.", "i. sz."] as const,
    // Wide: időszámításunk előtt, időszámításunk szerint
    wide: ["időszámításunk előtt", "időszámításunk szerint"] as const,
  },

  month: {
    // Narrow: single letter
    narrow: [
      "J",
      "F",
      "M",
      "Á",
      "M",
      "J",
      "J",
      "A",
      "Sz",
      "O",
      "N",
      "D",
    ] as const,
    // Abbreviated
    abbr: [
      "jan.",
      "febr.",
      "márc.",
      "ápr.",
      "máj.",
      "jún.",
      "júl.",
      "aug.",
      "szept.",
      "okt.",
      "nov.",
      "dec.",
    ] as const,
    // Wide
    wide: [
      "január",
      "február",
      "március",
      "április",
      "május",
      "június",
      "július",
      "augusztus",
      "szeptember",
      "október",
      "november",
      "december",
    ] as const,
  },

  weekday: {
    // Narrow: single letter
    narrow: ["V", "H", "K", "Sz", "Cs", "P", "Sz"] as const,
    // Abbreviated
    abbr: ["V", "H", "K", "Sze", "Cs", "P", "Szo"] as const,
    // Wide
    wide: [
      "vasárnap",
      "hétfő",
      "kedd",
      "szerda",
      "csütörtök",
      "péntek",
      "szombat",
    ] as const,
  },

  dayPeriod: {
    // Narrow: de., du.
    narrow: ["de.", "du."] as const,
    // Abbreviated: de., du.
    abbr: ["de.", "du."] as const,
    // Wide: délelőtt, délután
    wide: ["de.", "du."] as const,
  },
};
