import { Locale } from "../../types";

/**
 * Spanish locale data.
 *
 * Based on CLDR data for Spanish (Spain).
 */
export const es: Locale = {
  era: {
    // Narrow: a (antes de Cristo), d (después de Cristo)
    narrow: ["a", "d"] as const,
    // Abbreviated: a. C., d. C.
    abbr: ["a. C.", "d. C."] as const,
    // Wide: antes de Cristo, después de Cristo
    wide: ["antes de Cristo", "después de Cristo"] as const,
  },

  month: {
    // Narrow: single letter (some repeated due to Spanish month names)
    narrow: [
      "E",
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
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sept",
      "oct",
      "nov",
      "dic",
    ] as const,
    // Wide
    wide: [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ] as const,
  },

  weekday: {
    // Narrow: single letter
    narrow: ["D", "L", "M", "X", "J", "V", "S"] as const,
    // Abbreviated
    abbr: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"] as const,
    // Wide
    wide: [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ] as const,
  },

  dayPeriod: {
    // Narrow: a. m., p. m.
    narrow: ["a. m.", "p. m."] as const,
    // Abbreviated: a. m., p. m.
    abbr: ["a. m.", "p. m."] as const,
    // Wide: a. m., p. m. (same in Spanish)
    wide: ["a. m.", "p. m."] as const,
  },
};
