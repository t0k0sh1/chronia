import { Locale } from "../../types";

/**
 * Russian locale data.
 *
 * Based on CLDR data for Russian (Russia).
 */
export const ru: Locale = {
  era: {
    // Narrow: до н.э., н.э.
    narrow: ["до н.э.", "н.э."] as const,
    // Abbreviated: до н. э., н. э.
    abbr: ["до н. э.", "н. э."] as const,
    // Wide: до нашей эры, нашей эры
    wide: ["до нашей эры", "нашей эры"] as const,
  },

  month: {
    // Narrow: single letter (Cyrillic)
    narrow: [
      "Я",
      "Ф",
      "М",
      "А",
      "М",
      "И",
      "И",
      "А",
      "С",
      "О",
      "Н",
      "Д",
    ] as const,
    // Abbreviated
    abbr: [
      "янв.",
      "февр.",
      "март",
      "апр.",
      "май",
      "июнь",
      "июль",
      "авг.",
      "сент.",
      "окт.",
      "нояб.",
      "дек.",
    ] as const,
    // Wide
    wide: [
      "январь",
      "февраль",
      "март",
      "апрель",
      "май",
      "июнь",
      "июль",
      "август",
      "сентябрь",
      "октябрь",
      "ноябрь",
      "декабрь",
    ] as const,
  },

  weekday: {
    // Narrow: single letter (Cyrillic)
    narrow: ["В", "П", "В", "С", "Ч", "П", "С"] as const,
    // Abbreviated
    abbr: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"] as const,
    // Wide
    wide: [
      "воскресенье",
      "понедельник",
      "вторник",
      "среда",
      "четверг",
      "пятница",
      "суббота",
    ] as const,
  },

  dayPeriod: {
    // Narrow: AM, PM
    narrow: ["AM", "PM"] as const,
    // Abbreviated: AM, PM
    abbr: ["AM", "PM"] as const,
    // Wide: AM, PM (Russian commonly uses 24-hour format, but AM/PM is standard)
    wide: ["AM", "PM"] as const,
  },
};
