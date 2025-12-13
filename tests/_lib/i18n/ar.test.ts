import { ar } from "../../../src/i18n/ar";
import {
  describeLocaleStructure,
  describeLocaleValues,
  LocaleExpectedValues,
} from "./_testUtils";

const expectedValues: LocaleExpectedValues = {
  era: {
    narrow: ["ق.م", "م"],
    abbr: ["ق.م", "م"],
    wide: ["قبل الميلاد", "ميلادي"],
  },
  month: {
    narrow: ["ي", "ف", "م", "أ", "و", "ن", "ل", "غ", "س", "ك", "ب", "د"],
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
    ],
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
    ],
  },
  weekday: {
    narrow: ["ح", "ن", "ث", "ر", "خ", "ج", "س"],
    abbr: [
      "الأحد",
      "الاثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ],
    wide: [
      "الأحد",
      "الاثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ],
  },
  dayPeriod: {
    narrow: ["ص", "م"],
    abbr: ["ص", "م"],
    wide: ["صباحًا", "مساءً"],
  },
  equivalences: [
    {
      component: "era",
      widths: ["narrow", "abbr"],
      description:
        "should have same values for narrow and abbreviated era names (Arabic locale characteristic)",
    },
    {
      component: "month",
      widths: ["abbr", "wide"],
      description:
        "should have same values for abbreviated and wide month names (Arabic locale characteristic)",
    },
    {
      component: "weekday",
      widths: ["abbr", "wide"],
      description:
        "should have same values for abbreviated and wide weekday names (Arabic locale characteristic)",
    },
    {
      component: "dayPeriod",
      widths: ["narrow", "abbr"],
      description:
        "should have same values for narrow and abbreviated day periods (Arabic locale characteristic)",
    },
  ],
};

describeLocaleStructure(ar, "ar");
describeLocaleValues(ar, "ar", expectedValues);
