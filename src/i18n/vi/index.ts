import { Locale } from "../../types";

/**
 * Vietnamese locale data.
 *
 * Note: Vietnamese uses Latin script with diacritics. Weekdays use "Thứ"
 * (ordinal) prefix except for Sunday which is "Chủ Nhật" (Lord's Day).
 * Day periods use abbreviated forms "SA" (sáng - morning) and "CH"
 * (chiều - afternoon).
 */
export const vi: Locale = {
  era: {
    // Narrow: TCN (Trước Công Nguyên), SCN (Sau Công Nguyên)
    narrow: ["TCN", "SCN"] as const,
    // Abbreviated: trước CN, sau CN
    abbr: ["trước CN", "sau CN"] as const,
    // Wide: full forms
    wide: ["trước Công Nguyên", "sau Công Nguyên"] as const,
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
    // Abbreviated: Thg (Tháng) prefix with number
    abbr: [
      "Thg 1",
      "Thg 2",
      "Thg 3",
      "Thg 4",
      "Thg 5",
      "Thg 6",
      "Thg 7",
      "Thg 8",
      "Thg 9",
      "Thg 10",
      "Thg 11",
      "Thg 12",
    ] as const,
    // Wide: Tháng (month) with Vietnamese ordinal numbers
    wide: [
      "Tháng Một",
      "Tháng Hai",
      "Tháng Ba",
      "Tháng Tư",
      "Tháng Năm",
      "Tháng Sáu",
      "Tháng Bảy",
      "Tháng Tám",
      "Tháng Chín",
      "Tháng Mười",
      "Tháng Mười Một",
      "Tháng Mười Hai",
    ] as const,
  },

  weekday: {
    // Narrow: CN (Chủ Nhật), T2-T7 (Thứ 2-7)
    narrow: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"] as const,
    // Abbreviated: CN, Th 2-7
    abbr: ["CN", "Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7"] as const,
    // Wide: Full Vietnamese day names
    wide: [
      "Chủ Nhật",
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
    ] as const,
  },

  dayPeriod: {
    // Narrow: SA (sáng - morning), CH (chiều - afternoon)
    narrow: ["SA", "CH"] as const,
    // Abbreviated: same as narrow
    abbr: ["SA", "CH"] as const,
    // Wide: same as narrow (Vietnamese commonly uses abbreviated forms)
    wide: ["SA", "CH"] as const,
  },
};
