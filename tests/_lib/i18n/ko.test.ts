import { ko } from "../../../src/i18n/ko";
import {
  describeLocaleStructure,
  describeLocaleValues,
  LocaleExpectedValues,
} from "./_testUtils";

const expectedValues: LocaleExpectedValues = {
  era: {
    // International standard: BC/AD for narrow
    narrow: ["BC", "AD"],
    // Korean text for abbr/wide
    abbr: ["기원전", "서기"],
    wide: ["기원전", "서기"],
  },
  month: {
    narrow: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
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
    ],
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
    ],
  },
  weekday: {
    narrow: ["일", "월", "화", "수", "목", "금", "토"],
    abbr: ["일", "월", "화", "수", "목", "금", "토"],
    wide: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
  },
  dayPeriod: {
    narrow: ["오전", "오후"],
    abbr: ["오전", "오후"],
    wide: ["오전", "오후"],
  },
  equivalences: [
    {
      component: "month",
      widths: ["abbr", "wide"],
      description:
        "should have same values for abbreviated and wide month names (Korean locale characteristic)",
    },
    {
      component: "weekday",
      widths: ["narrow", "abbr"],
      description:
        "should have same values for narrow and abbreviated weekday names (Korean locale characteristic)",
    },
    {
      component: "dayPeriod",
      widths: ["narrow", "abbr", "wide"],
      description:
        "should have same values for all widths (Korean locale characteristic)",
    },
  ],
};

describeLocaleStructure(ko, "ko");
describeLocaleValues(ko, "ko", expectedValues);
