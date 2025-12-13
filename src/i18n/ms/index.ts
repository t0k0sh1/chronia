import { Locale } from "../../types";

/**
 * Malay locale data.
 *
 * Note: Malay uses Latin script with some differences from Indonesian.
 * Era uses "Sebelum Masihi" (Before Christ) and "Masihi" (Common Era).
 * Day periods use "PG" (pagi - morning) and "PTG" (petang - evening).
 */
export const ms: Locale = {
  era: {
    // Narrow: SM (Sebelum Masihi), M (Masihi)
    narrow: ["SM", "M"] as const,
    // Abbreviated: same as narrow
    abbr: ["SM", "M"] as const,
    // Wide: full forms
    wide: ["Sebelum Masihi", "Masihi"] as const,
  },

  month: {
    // Narrow: first letter of each month
    narrow: [
      "J",
      "F",
      "M",
      "A",
      "M",
      "J",
      "J",
      "O",
      "S",
      "O",
      "N",
      "D",
    ] as const,
    // Abbreviated: 3-letter abbreviations
    abbr: [
      "Jan",
      "Feb",
      "Mac",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Ogo",
      "Sep",
      "Okt",
      "Nov",
      "Dis",
    ] as const,
    // Wide: full Malay month names
    wide: [
      "Januari",
      "Februari",
      "Mac",
      "April",
      "Mei",
      "Jun",
      "Julai",
      "Ogos",
      "September",
      "Oktober",
      "November",
      "Disember",
    ] as const,
  },

  weekday: {
    // Narrow: first letter
    narrow: ["A", "I", "S", "R", "K", "J", "S"] as const,
    // Abbreviated: 3-letter abbreviations
    abbr: ["Ahd", "Isn", "Sel", "Rab", "Kha", "Jum", "Sab"] as const,
    // Wide: full Malay day names
    wide: [
      "Ahad",
      "Isnin",
      "Selasa",
      "Rabu",
      "Khamis",
      "Jumaat",
      "Sabtu",
    ] as const,
  },

  dayPeriod: {
    // Narrow: PG (pagi), PTG (petang)
    narrow: ["PG", "PTG"] as const,
    // Abbreviated: same as narrow
    abbr: ["PG", "PTG"] as const,
    // Wide: same (Malay commonly uses abbreviated forms)
    wide: ["PG", "PTG"] as const,
  },
};
