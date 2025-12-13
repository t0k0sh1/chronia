import { th } from "../../../src/i18n/th";
import {
  describeLocaleStructure,
  describeLocaleValues,
  LocaleExpectedValues,
} from "./_testUtils";

const expectedValues: LocaleExpectedValues = {
  era: {
    narrow: ["BC", "AD"],
    abbr: ["ก่อน ค.ศ.", "ค.ศ."],
    wide: ["ปีก่อนคริสตกาล", "คริสต์ศักราช"],
  },
  month: {
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
    ],
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
    ],
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
    ],
  },
  weekday: {
    narrow: ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."],
    abbr: ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."],
    wide: [
      "อาทิตย์",
      "จันทร์",
      "อังคาร",
      "พุธ",
      "พฤหัสบดี",
      "ศุกร์",
      "เสาร์",
    ],
  },
  dayPeriod: {
    narrow: ["ก่อนเที่ยง", "หลังเที่ยง"],
    abbr: ["ก่อนเที่ยง", "หลังเที่ยง"],
    wide: ["ก่อนเที่ยง", "หลังเที่ยง"],
  },
  equivalences: [
    {
      component: "month",
      widths: ["narrow", "abbr"],
      description:
        "should have same values for narrow and abbreviated month names (Thai locale characteristic)",
    },
    {
      component: "weekday",
      widths: ["narrow", "abbr"],
      description:
        "should have same values for narrow and abbreviated weekday names (Thai locale characteristic)",
    },
    {
      component: "dayPeriod",
      widths: ["narrow", "abbr", "wide"],
      description:
        "should have same values for all widths (Thai locale characteristic)",
    },
  ],
};

describeLocaleStructure(th, "th");
describeLocaleValues(th, "th", expectedValues);
