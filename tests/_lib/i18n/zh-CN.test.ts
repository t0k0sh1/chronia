import { zhCN } from "../../../src/i18n/zh-CN";
import {
  describeLocaleStructure,
  describeLocaleValues,
  LocaleExpectedValues,
} from "./_testUtils";

const expectedValues: LocaleExpectedValues = {
  era: {
    narrow: ["公元前", "公元"],
    abbr: ["公元前", "公元"],
    wide: ["公元前", "公元"],
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
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月",
    ],
  },
  weekday: {
    narrow: ["日", "一", "二", "三", "四", "五", "六"],
    abbr: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    wide: [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
    ],
  },
  dayPeriod: {
    narrow: ["上午", "下午"],
    abbr: ["上午", "下午"],
    wide: ["上午", "下午"],
  },
  equivalences: [
    {
      component: "era",
      widths: ["narrow", "abbr", "wide"],
      description:
        "should have same values for all widths (Chinese locale characteristic)",
    },
    {
      component: "dayPeriod",
      widths: ["narrow", "abbr", "wide"],
      description:
        "should have same values for all widths (Chinese locale characteristic)",
    },
  ],
};

describeLocaleStructure(zhCN, "zh-CN");
describeLocaleValues(zhCN, "zh-CN", expectedValues);
