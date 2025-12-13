import { Locale } from "../../types";

/**
 * Chinese (Traditional - Taiwan) locale data.
 *
 * Note: Taiwan uses "西元" (Western calendar) for era naming, which differs
 * from zh-CN's "公元" (Common Era). Weekday abbreviations use "週" instead
 * of "周" (Simplified Chinese variant).
 */
export const zhTW: Locale = {
  era: {
    // Narrow: 西元前 (BC), 西元 (AD) - Taiwan style
    narrow: ["西元前", "西元"] as const,
    // Abbreviated: 西元前 (BC), 西元 (AD)
    abbr: ["西元前", "西元"] as const,
    // Wide: 西元前 (BC), 西元 (AD)
    wide: ["西元前", "西元"] as const,
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
    // Abbreviated: numeric with "月" suffix
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
    // Wide: Chinese numerals with "月" suffix
    wide: [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月",
    ] as const,
  },

  weekday: {
    // Narrow: single character
    narrow: ["日", "一", "二", "三", "四", "五", "六"] as const,
    // Abbreviated: 週 prefix (Traditional Chinese uses 週)
    abbr: ["週日", "週一", "週二", "週三", "週四", "週五", "週六"] as const,
    // Wide: 星期 prefix
    wide: [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
    ] as const,
  },

  dayPeriod: {
    // Narrow: 上午 (AM), 下午 (PM)
    narrow: ["上午", "下午"] as const,
    // Abbreviated: 上午 (AM), 下午 (PM) (same as narrow in Chinese)
    abbr: ["上午", "下午"] as const,
    // Wide: 上午 (AM), 下午 (PM) (same in Chinese)
    wide: ["上午", "下午"] as const,
  },
};
