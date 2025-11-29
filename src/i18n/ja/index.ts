import { Locale } from "../../types";

/**
 * Japanese locale data.
 *
 * Note: In Japanese, narrow and abbreviated forms are often identical for
 * certain components (weekday, dayPeriod), which is a characteristic of
 * the language.
 */
export const ja: Locale = {
  era: {
    // Narrow: BC, AC (date-fns compatible)
    narrow: ["BC", "AC"] as const,
    // Abbreviated: 紀元前 (Before Christ), 西暦 (Anno Domini)
    abbr: ["紀元前", "西暦"] as const,
    // Wide: 紀元前 (Before Christ), 西暦 (Anno Domini)
    wide: ["紀元前", "西暦"] as const,
  },

  month: {
    // Narrow: numeric representation (1-12)
    narrow: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
    ] as const,
    // Abbreviated: numeric with "月" suffix (same as wide in Japanese)
    abbr: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ] as const,
    // Wide: numeric with "月" suffix (no difference from abbr in Japanese)
    wide: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ] as const,
  },

  weekday: {
    // Narrow: single kanji character
    narrow: ["日", "月", "火", "水", "木", "金", "土"] as const,
    // Abbreviated: single kanji character (same as narrow in Japanese)
    abbr: ["日", "月", "火", "水", "木", "金", "土"] as const,
    // Wide: kanji character with "曜日" suffix
    wide: [
      "日曜日",
      "月曜日",
      "火曜日",
      "水曜日",
      "木曜日",
      "金曜日",
      "土曜日",
    ] as const,
  },

  dayPeriod: {
    // Narrow: 午前 (AM), 午後 (PM)
    narrow: ["午前", "午後"] as const,
    // Abbreviated: 午前 (AM), 午後 (PM) (same as narrow in Japanese)
    abbr: ["午前", "午後"] as const,
    // Wide: 午前 (AM), 午後 (PM) (no difference in Japanese)
    wide: ["午前", "午後"] as const,
  },
};
