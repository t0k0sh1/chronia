import { Locale } from "../../types";

/**
 * French locale data.
 *
 * Based on CLDR data for French (France).
 */
export const fr: Locale = {
  era: {
    // Narrow: av. J.-C., ap. J.-C.
    narrow: ["av. J.-C.", "ap. J.-C."] as const,
    // Abbreviated: av. J.-C., ap. J.-C.
    abbr: ["av. J.-C.", "ap. J.-C."] as const,
    // Wide: avant Jésus-Christ, après Jésus-Christ
    wide: ["avant Jésus-Christ", "après Jésus-Christ"] as const,
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
      "janv.",
      "févr.",
      "mars",
      "avr.",
      "mai",
      "juin",
      "juil.",
      "août",
      "sept.",
      "oct.",
      "nov.",
      "déc.",
    ] as const,
    // Wide
    wide: [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ] as const,
  },

  weekday: {
    // Narrow: single letter
    narrow: ["D", "L", "M", "M", "J", "V", "S"] as const,
    // Abbreviated
    abbr: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."] as const,
    // Wide
    wide: [
      "dimanche",
      "lundi",
      "mardi",
      "mercredi",
      "jeudi",
      "vendredi",
      "samedi",
    ] as const,
  },

  dayPeriod: {
    // Narrow: AM, PM
    narrow: ["AM", "PM"] as const,
    // Abbreviated: AM, PM
    abbr: ["AM", "PM"] as const,
    // Wide: AM, PM (French commonly uses 24-hour format, but AM/PM is standard)
    wide: ["AM", "PM"] as const,
  },
};
