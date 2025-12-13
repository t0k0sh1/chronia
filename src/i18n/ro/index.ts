import { Locale } from "../../types";

/**
 * Romanian locale data.
 *
 * Based on CLDR data for Romanian (Romania).
 */
export const ro: Locale = {
  era: {
    // Narrow: î.Hr., d.Hr.
    narrow: ["î.Hr.", "d.Hr."] as const,
    // Abbreviated: î.Hr., d.Hr.
    abbr: ["î.Hr.", "d.Hr."] as const,
    // Wide: înainte de Hristos, după Hristos
    wide: ["înainte de Hristos", "după Hristos"] as const,
  },

  month: {
    // Narrow: single letter
    narrow: [
      "I",
      "F",
      "M",
      "A",
      "M",
      "I",
      "I",
      "A",
      "S",
      "O",
      "N",
      "D",
    ] as const,
    // Abbreviated
    abbr: [
      "ian.",
      "feb.",
      "mar.",
      "apr.",
      "mai",
      "iun.",
      "iul.",
      "aug.",
      "sept.",
      "oct.",
      "nov.",
      "dec.",
    ] as const,
    // Wide
    wide: [
      "ianuarie",
      "februarie",
      "martie",
      "aprilie",
      "mai",
      "iunie",
      "iulie",
      "august",
      "septembrie",
      "octombrie",
      "noiembrie",
      "decembrie",
    ] as const,
  },

  weekday: {
    // Narrow: single letter
    narrow: ["D", "L", "M", "M", "J", "V", "S"] as const,
    // Abbreviated
    abbr: ["dum.", "lun.", "mar.", "mie.", "joi", "vin.", "sâm."] as const,
    // Wide
    wide: [
      "duminică",
      "luni",
      "marți",
      "miercuri",
      "joi",
      "vineri",
      "sâmbătă",
    ] as const,
  },

  dayPeriod: {
    // Narrow: a.m., p.m.
    narrow: ["a.m.", "p.m."] as const,
    // Abbreviated: a.m., p.m.
    abbr: ["a.m.", "p.m."] as const,
    // Wide: a.m., p.m.
    wide: ["a.m.", "p.m."] as const,
  },
};
