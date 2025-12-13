import { Locale } from "../../types";

/**
 * Hindi locale data.
 *
 * Note: Hindi uses Devanagari script. Era uses "ईसा-पूर्व" (Before Christ)
 * and "ईसवी सन" (Anno Domini/Common Era). Day periods use "पूर्वाह्न"
 * (forenoon/AM) and "अपराह्न" (afternoon/PM).
 */
export const hi: Locale = {
  era: {
    // Narrow: abbreviated Devanagari forms
    narrow: ["ई.पू.", "ई."] as const,
    // Abbreviated: ईसा-पूर्व, ईस्वी
    abbr: ["ईसा-पूर्व", "ईस्वी"] as const,
    // Wide: full Hindi forms
    wide: ["ईसा-पूर्व", "ईसवी सन"] as const,
  },

  month: {
    // Narrow: first character(s) of each month
    narrow: [
      "ज",
      "फ़",
      "मा",
      "अ",
      "म",
      "जू",
      "जु",
      "अ",
      "सि",
      "अ",
      "न",
      "दि",
    ] as const,
    // Abbreviated: shortened Hindi month names
    abbr: [
      "जन",
      "फ़र",
      "मार्च",
      "अप्रैल",
      "मई",
      "जून",
      "जुल",
      "अग",
      "सित",
      "अक्टू",
      "नव",
      "दिस",
    ] as const,
    // Wide: full Hindi month names
    wide: [
      "जनवरी",
      "फ़रवरी",
      "मार्च",
      "अप्रैल",
      "मई",
      "जून",
      "जुलाई",
      "अगस्त",
      "सितंबर",
      "अक्टूबर",
      "नवंबर",
      "दिसंबर",
    ] as const,
  },

  weekday: {
    // Narrow: first character(s) of each day
    narrow: ["र", "सो", "मं", "बु", "गु", "शु", "श"] as const,
    // Abbreviated: shortened Hindi day names
    abbr: ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"] as const,
    // Wide: full Hindi day names
    wide: [
      "रविवार",
      "सोमवार",
      "मंगलवार",
      "बुधवार",
      "गुरुवार",
      "शुक्रवार",
      "शनिवार",
    ] as const,
  },

  dayPeriod: {
    // Narrow: पूर्वाह्न (AM), अपराह्न (PM)
    narrow: ["पूर्वाह्न", "अपराह्न"] as const,
    // Abbreviated: same as narrow
    abbr: ["पूर्वाह्न", "अपराह्न"] as const,
    // Wide: same as narrow (Hindi uses these forms consistently)
    wide: ["पूर्वाह्न", "अपराह्न"] as const,
  },
};
