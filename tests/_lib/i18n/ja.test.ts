import { ja } from "../../../src/i18n/ja";
import {
  describeLocaleStructure,
  describeLocaleValues,
  LocaleExpectedValues,
} from "./_testUtils";

const expectedValues: LocaleExpectedValues = {
  era: {
    // International standard: BC/AD for narrow (Anno Domini)
    // See src/i18n/ja/index.ts for the rationale behind using "AD" instead of date-fns's non-standard "AC".
    narrow: ["BC", "AD"],
    // date-fns compatible: Japanese text for abbr/wide
    abbr: ["紀元前", "西暦"],
    wide: ["紀元前", "西暦"],
  },
  month: {
    narrow: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
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
    ],
    wide: [
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
    ],
  },
  weekday: {
    narrow: ["日", "月", "火", "水", "木", "金", "土"],
    abbr: ["日", "月", "火", "水", "木", "金", "土"],
    wide: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
  },
  dayPeriod: {
    narrow: ["午前", "午後"],
    abbr: ["午前", "午後"],
    wide: ["午前", "午後"],
  },
  equivalences: [
    {
      component: "month",
      widths: ["abbr", "wide"],
      description:
        "should have same values for abbreviated and wide month names (Japanese locale characteristic)",
    },
    {
      component: "weekday",
      widths: ["narrow", "abbr"],
      description:
        "should have same values for narrow and abbreviated weekday names (Japanese locale characteristic)",
    },
    {
      component: "dayPeriod",
      widths: ["narrow", "abbr", "wide"],
      description:
        "should have same values for all widths (Japanese locale characteristic)",
    },
  ],
};

describeLocaleStructure(ja, "ja");
describeLocaleValues(ja, "ja", expectedValues);
