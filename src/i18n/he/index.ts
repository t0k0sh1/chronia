import { Locale } from "../../types";

/**
 * Hebrew locale data.
 *
 * Based on CLDR data for Hebrew (Israel).
 * Note: Hebrew is a right-to-left (RTL) language.
 */
export const he: Locale = {
  era: {
    // Narrow: לפנה״ס, לספירה
    narrow: ["לפנה״ס", "לספירה"] as const,
    // Abbreviated: לפנה״ס, לספירה
    abbr: ["לפנה״ס", "לספירה"] as const,
    // Wide: לפני הספירה, לספירה
    wide: ["לפני הספירה", "לספירה"] as const,
  },

  month: {
    // Narrow: single letter/number
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
    // Abbreviated
    abbr: [
      "ינו׳",
      "פבר׳",
      "מרץ",
      "אפר׳",
      "מאי",
      "יוני",
      "יולי",
      "אוג׳",
      "ספט׳",
      "אוק׳",
      "נוב׳",
      "דצמ׳",
    ] as const,
    // Wide
    wide: [
      "ינואר",
      "פברואר",
      "מרץ",
      "אפריל",
      "מאי",
      "יוני",
      "יולי",
      "אוגוסט",
      "ספטמבר",
      "אוקטובר",
      "נובמבר",
      "דצמבר",
    ] as const,
  },

  weekday: {
    // Narrow: single letter
    narrow: ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"] as const,
    // Abbreviated
    abbr: [
      "יום א׳",
      "יום ב׳",
      "יום ג׳",
      "יום ד׳",
      "יום ה׳",
      "יום ו׳",
      "שבת",
    ] as const,
    // Wide
    wide: [
      "יום ראשון",
      "יום שני",
      "יום שלישי",
      "יום רביעי",
      "יום חמישי",
      "יום שישי",
      "יום שבת",
    ] as const,
  },

  dayPeriod: {
    // Narrow: לפנה״צ, אחה״צ
    narrow: ["לפנה״צ", "אחה״צ"] as const,
    // Abbreviated: לפנה״צ, אחה״צ
    abbr: ["לפנה״צ", "אחה״צ"] as const,
    // Wide: לפני הצהריים, אחרי הצהריים
    wide: ["לפני הצהריים", "אחרי הצהריים"] as const,
  },
};
