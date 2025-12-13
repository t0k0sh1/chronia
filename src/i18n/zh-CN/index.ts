import { Locale } from "../../types";

/**
 * Chinese (Simplified) locale data.
 *
 * Note: In Chinese, abbreviated and wide forms are often identical for
 * certain components (era, dayPeriod), which is a characteristic of
 * the language.
 */
export const zhCN: Locale = {
  era: {
    // Narrow: 公元前 (BC), 公元 (AD)
    narrow: ["公元前", "公元"] as const,
    // Abbreviated: 公元前 (BC), 公元 (AD)
    abbr: ["公元前", "公元"] as const,
    // Wide: 公元前 (BC), 公元 (AD)
    wide: ["公元前", "公元"] as const,
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
    // Abbreviated: 周 prefix
    abbr: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"] as const,
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
