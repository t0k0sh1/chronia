import { Locale } from "../../types";

/**
 * Arabic locale data.
 *
 * Based on CLDR data for Arabic.
 *
 * Note: Arabic is a right-to-left (RTL) language. The locale data contains
 * standard Unicode strings; RTL display handling is the responsibility of
 * the UI layer. Applications should apply appropriate CSS styles
 * (`direction: rtl`) or use platform-specific RTL rendering.
 */
export const ar: Locale = {
  era: {
    // Narrow: ق.م, م
    narrow: ["ق.م", "م"] as const,
    // Abbreviated: ق.م, م
    abbr: ["ق.م", "م"] as const,
    // Wide: قبل الميلاد, ميلادي
    wide: ["قبل الميلاد", "ميلادي"] as const,
  },

  month: {
    // Narrow: single number (Arabic numerals)
    narrow: [
      "ي",
      "ف",
      "م",
      "أ",
      "و",
      "ن",
      "ل",
      "غ",
      "س",
      "ك",
      "ب",
      "د",
    ] as const,
    // Abbreviated
    abbr: [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ] as const,
    // Wide
    wide: [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ] as const,
  },

  weekday: {
    // Narrow: single letter
    narrow: ["ح", "ن", "ث", "ر", "خ", "ج", "س"] as const,
    // Abbreviated
    abbr: [
      "الأحد",
      "الاثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ] as const,
    // Wide
    wide: [
      "الأحد",
      "الاثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ] as const,
  },

  dayPeriod: {
    // Narrow: ص, م
    narrow: ["ص", "م"] as const,
    // Abbreviated: ص, م
    abbr: ["ص", "م"] as const,
    // Wide: صباحًا, مساءً
    wide: ["صباحًا", "مساءً"] as const,
  },
};
