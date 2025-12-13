import { Locale } from "../../types";

/**
 * Serbian locale data.
 *
 * Based on CLDR data for Serbian (Serbia, Cyrillic script).
 */
export const sr: Locale = {
  era: {
    // Narrow: п.н.е., н.е.
    narrow: ["п.н.е.", "н.е."] as const,
    // Abbreviated: п. н. е., н. е.
    abbr: ["п. н. е.", "н. е."] as const,
    // Wide: пре нове ере, нове ере
    wide: ["пре нове ере", "нове ере"] as const,
  },

  month: {
    // Narrow: single letter/number
    narrow: [
      "ј",
      "ф",
      "м",
      "а",
      "м",
      "ј",
      "ј",
      "а",
      "с",
      "о",
      "н",
      "д",
    ] as const,
    // Abbreviated
    abbr: [
      "јан",
      "феб",
      "мар",
      "апр",
      "мај",
      "јун",
      "јул",
      "авг",
      "сеп",
      "окт",
      "нов",
      "дец",
    ] as const,
    // Wide
    wide: [
      "јануар",
      "фебруар",
      "март",
      "април",
      "мај",
      "јун",
      "јул",
      "август",
      "септембар",
      "октобар",
      "новембар",
      "децембар",
    ] as const,
  },

  weekday: {
    // Narrow: single letter
    narrow: ["н", "п", "у", "с", "ч", "п", "с"] as const,
    // Abbreviated
    abbr: ["нед", "пон", "уто", "сре", "чет", "пет", "суб"] as const,
    // Wide
    wide: [
      "недеља",
      "понедељак",
      "уторак",
      "среда",
      "четвртак",
      "петак",
      "субота",
    ] as const,
  },

  dayPeriod: {
    // Narrow: AM, PM
    narrow: ["AM", "PM"] as const,
    // Abbreviated: AM, PM
    abbr: ["AM", "PM"] as const,
    // Wide: AM, PM (Serbian often uses 24-hour format)
    wide: ["AM", "PM"] as const,
  },
};
