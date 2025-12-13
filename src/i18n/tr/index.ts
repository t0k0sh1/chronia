import type { Locale } from "../../types";

export const tr: Locale = {
  era: {
    // Narrow: MÖ, MS
    narrow: ["MÖ", "MS"] as const,
    // Abbreviated: MÖ, MS
    abbr: ["MÖ", "MS"] as const,
    // Wide: Milattan Önce, Milattan Sonra
    wide: ["Milattan Önce", "Milattan Sonra"] as const,
  },

  month: {
    // Narrow: single letter
    narrow: [
      "O",
      "Ş",
      "M",
      "N",
      "M",
      "H",
      "T",
      "A",
      "E",
      "E",
      "K",
      "A",
    ] as const,
    // Abbreviated
    abbr: [
      "Oca",
      "Şub",
      "Mar",
      "Nis",
      "May",
      "Haz",
      "Tem",
      "Ağu",
      "Eyl",
      "Eki",
      "Kas",
      "Ara",
    ] as const,
    // Wide
    wide: [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık",
    ] as const,
  },

  weekday: {
    // Narrow: single letter
    narrow: ["P", "P", "S", "Ç", "P", "C", "C"] as const,
    // Abbreviated
    abbr: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"] as const,
    // Wide
    wide: [
      "Pazar",
      "Pazartesi",
      "Salı",
      "Çarşamba",
      "Perşembe",
      "Cuma",
      "Cumartesi",
    ] as const,
  },

  dayPeriod: {
    // Narrow: ÖÖ, ÖS (Turkish-specific)
    narrow: ["ÖÖ", "ÖS"] as const,
    // Abbreviated: ÖÖ, ÖS (Turkish-specific)
    abbr: ["ÖÖ", "ÖS"] as const,
    // Wide: Ö.Ö., Ö.S. (Turkish-specific)
    wide: ["Ö.Ö.", "Ö.S."] as const,
  },
};
