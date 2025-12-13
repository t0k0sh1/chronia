import { Locale } from "../../types";

/**
 * Thai locale data.
 *
 * Note: Thai uses Thai script. This implementation uses the Gregorian calendar
 * era (ค.ศ. = คริสต์ศักราช) rather than Buddhist Era (พ.ศ. = พุทธศักราช)
 * for consistency with international standards.
 */
export const th: Locale = {
  era: {
    // Narrow: BC/AD (international standard for narrow)
    narrow: ["BC", "AD"] as const,
    // Abbreviated: ก่อน ค.ศ. (before AD), ค.ศ. (AD = คริสต์ศักราช)
    abbr: ["ก่อน ค.ศ.", "ค.ศ."] as const,
    // Wide: full Thai forms
    wide: ["ปีก่อนคริสตกาล", "คริสต์ศักราช"] as const,
  },

  month: {
    // Narrow: abbreviated forms with periods
    narrow: [
      "ม.ค.",
      "ก.พ.",
      "มี.ค.",
      "เม.ย.",
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
      "ส.ค.",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค.",
    ] as const,
    // Abbreviated: same as narrow (Thai commonly uses these forms)
    abbr: [
      "ม.ค.",
      "ก.พ.",
      "มี.ค.",
      "เม.ย.",
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
      "ส.ค.",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค.",
    ] as const,
    // Wide: full Thai month names
    wide: [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ] as const,
  },

  weekday: {
    // Narrow: abbreviated forms with periods
    narrow: ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."] as const,
    // Abbreviated: same as narrow (Thai commonly uses these forms)
    abbr: ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."] as const,
    // Wide: full Thai day names
    wide: [
      "อาทิตย์",
      "จันทร์",
      "อังคาร",
      "พุธ",
      "พฤหัสบดี",
      "ศุกร์",
      "เสาร์",
    ] as const,
  },

  dayPeriod: {
    // Narrow: ก่อนเที่ยง (before noon), หลังเที่ยง (after noon)
    narrow: ["ก่อนเที่ยง", "หลังเที่ยง"] as const,
    // Abbreviated: same as narrow
    abbr: ["ก่อนเที่ยง", "หลังเที่ยง"] as const,
    // Wide: same as narrow (Thai commonly uses these forms)
    wide: ["ก่อนเที่ยง", "หลังเที่ยง"] as const,
  },
};
