import { Locale } from "../../types";

/**
 * German locale data.
 *
 * Based on CLDR data for German (Germany).
 */
export const de: Locale = {
  era: {
    // Narrow: v. Chr., n. Chr.
    narrow: ["v. Chr.", "n. Chr."] as const,
    // Abbreviated: v. Chr., n. Chr.
    abbr: ["v. Chr.", "n. Chr."] as const,
    // Wide: vor Christus, nach Christus
    wide: ["vor Christus", "nach Christus"] as const,
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
      "Jan.",
      "Feb.",
      "März",
      "Apr.",
      "Mai",
      "Juni",
      "Juli",
      "Aug.",
      "Sept.",
      "Okt.",
      "Nov.",
      "Dez.",
    ] as const,
    // Wide
    wide: [
      "Januar",
      "Februar",
      "März",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Dezember",
    ] as const,
  },

  weekday: {
    // Narrow: single letter
    narrow: ["S", "M", "D", "M", "D", "F", "S"] as const,
    // Abbreviated
    abbr: ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."] as const,
    // Wide
    wide: [
      "Sonntag",
      "Montag",
      "Dienstag",
      "Mittwoch",
      "Donnerstag",
      "Freitag",
      "Samstag",
    ] as const,
  },

  dayPeriod: {
    // Narrow: AM, PM
    narrow: ["AM", "PM"] as const,
    // Abbreviated: AM, PM
    abbr: ["AM", "PM"] as const,
    // Wide: AM, PM (German commonly uses 24-hour format, but AM/PM is standard)
    wide: ["AM", "PM"] as const,
  },
};
