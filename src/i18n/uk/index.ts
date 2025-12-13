import { Locale } from "../../types";

/**
 * Ukrainian locale data.
 *
 * Based on CLDR data for Ukrainian (Ukraine).
 */
export const uk: Locale = {
  era: {
    // Narrow: до н.е., н.е.
    narrow: ["до н.е.", "н.е."] as const,
    // Abbreviated: до н. е., н. е.
    abbr: ["до н. е.", "н. е."] as const,
    // Wide: до нашої ери, нашої ери
    wide: ["до нашої ери", "нашої ери"] as const,
  },

  month: {
    // Narrow: single letter
    narrow: [
      "С",
      "Л",
      "Б",
      "К",
      "Т",
      "Ч",
      "Л",
      "С",
      "В",
      "Ж",
      "Л",
      "Г",
    ] as const,
    // Abbreviated
    abbr: [
      "січ.",
      "лют.",
      "бер.",
      "квіт.",
      "трав.",
      "черв.",
      "лип.",
      "серп.",
      "вер.",
      "жовт.",
      "лист.",
      "груд.",
    ] as const,
    // Wide
    wide: [
      "січня",
      "лютого",
      "березня",
      "квітня",
      "травня",
      "червня",
      "липня",
      "серпня",
      "вересня",
      "жовтня",
      "листопада",
      "грудня",
    ] as const,
  },

  weekday: {
    // Narrow: single letter
    narrow: ["Н", "П", "В", "С", "Ч", "П", "С"] as const,
    // Abbreviated
    abbr: ["нд", "пн", "вт", "ср", "чт", "пт", "сб"] as const,
    // Wide
    wide: [
      "неділя",
      "понеділок",
      "вівторок",
      "середа",
      "четвер",
      "пʼятниця",
      "субота",
    ] as const,
  },

  dayPeriod: {
    // Narrow: дп, пп
    narrow: ["дп", "пп"] as const,
    // Abbreviated: дп, пп
    abbr: ["дп", "пп"] as const,
    // Wide: дп, пп
    wide: ["дп", "пп"] as const,
  },
};
