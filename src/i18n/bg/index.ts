import { Locale } from "../../types";

/**
 * Bulgarian locale data.
 *
 * Based on CLDR data for Bulgarian (Bulgaria).
 */
export const bg: Locale = {
  era: {
    // Narrow: пр.Хр., сл.Хр.
    narrow: ["пр.Хр.", "сл.Хр."] as const,
    // Abbreviated: пр.Хр., сл.Хр.
    abbr: ["пр.Хр.", "сл.Хр."] as const,
    // Wide: преди Христа, след Христа
    wide: ["преди Христа", "след Христа"] as const,
  },

  month: {
    // Narrow: single letter/number
    narrow: [
      "я",
      "ф",
      "м",
      "а",
      "м",
      "ю",
      "ю",
      "а",
      "с",
      "о",
      "н",
      "д",
    ] as const,
    // Abbreviated
    abbr: [
      "яну",
      "фев",
      "март",
      "апр",
      "май",
      "юни",
      "юли",
      "авг",
      "сеп",
      "окт",
      "ное",
      "дек",
    ] as const,
    // Wide
    wide: [
      "януари",
      "февруари",
      "март",
      "април",
      "май",
      "юни",
      "юли",
      "август",
      "септември",
      "октомври",
      "ноември",
      "декември",
    ] as const,
  },

  weekday: {
    // Narrow: single letter
    narrow: ["н", "п", "в", "с", "ч", "п", "с"] as const,
    // Abbreviated
    abbr: ["нд", "пн", "вт", "ср", "чт", "пт", "сб"] as const,
    // Wide
    wide: [
      "неделя",
      "понеделник",
      "вторник",
      "сряда",
      "четвъртък",
      "петък",
      "събота",
    ] as const,
  },

  dayPeriod: {
    // Narrow: am, pm
    narrow: ["am", "pm"] as const,
    // Abbreviated: пр.об., сл.об.
    abbr: ["пр.об.", "сл.об."] as const,
    // Wide: преди обяд, следобед
    wide: ["преди обяд", "следобед"] as const,
  },
};
