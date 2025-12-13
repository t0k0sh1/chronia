import { Locale } from "../../types";

/**
 * Korean locale data.
 *
 * Note: In Korean, narrow and abbreviated forms are often identical for
 * weekdays and dayPeriod, which is a characteristic of the language.
 */
export const ko: Locale = {
  era: {
    // Narrow: BC, AD (international standard)
    narrow: ["BC", "AD"] as const,
    // Abbreviated: 기원전 (BC), 서기 (AD)
    abbr: ["기원전", "서기"] as const,
    // Wide: 기원전 (BC), 서기 (AD)
    wide: ["기원전", "서기"] as const,
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
    // Abbreviated: numeric with "월" suffix
    abbr: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ] as const,
    // Wide: numeric with "월" suffix (same as abbr in Korean)
    wide: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ] as const,
  },

  weekday: {
    // Narrow: single character
    narrow: ["일", "월", "화", "수", "목", "금", "토"] as const,
    // Abbreviated: single character (same as narrow in Korean)
    abbr: ["일", "월", "화", "수", "목", "금", "토"] as const,
    // Wide: with "요일" suffix
    wide: [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ] as const,
  },

  dayPeriod: {
    // Narrow: 오전 (AM), 오후 (PM)
    narrow: ["오전", "오후"] as const,
    // Abbreviated: 오전 (AM), 오후 (PM) (same as narrow in Korean)
    abbr: ["오전", "오후"] as const,
    // Wide: 오전 (AM), 오후 (PM) (same in Korean)
    wide: ["오전", "오후"] as const,
  },
};
