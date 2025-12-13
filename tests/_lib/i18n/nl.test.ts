import { nl } from "../../../src/i18n/nl";
import {
  describeLocaleStructure,
  describeLocaleValues,
  LocaleExpectedValues,
} from "./_testUtils";

const expectedValues: LocaleExpectedValues = {
  era: {
    narrow: ["v.C.", "n.C."],
    abbr: ["v.Chr.", "n.Chr."],
    wide: ["voor Christus", "na Christus"],
  },
  month: {
    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    abbr: [
      "jan.",
      "feb.",
      "mrt.",
      "apr.",
      "mei",
      "jun.",
      "jul.",
      "aug.",
      "sep.",
      "okt.",
      "nov.",
      "dec.",
    ],
    wide: [
      "januari",
      "februari",
      "maart",
      "april",
      "mei",
      "juni",
      "juli",
      "augustus",
      "september",
      "oktober",
      "november",
      "december",
    ],
  },
  weekday: {
    narrow: ["Z", "M", "D", "W", "D", "V", "Z"],
    abbr: ["zo", "ma", "di", "wo", "do", "vr", "za"],
    wide: [
      "zondag",
      "maandag",
      "dinsdag",
      "woensdag",
      "donderdag",
      "vrijdag",
      "zaterdag",
    ],
  },
  dayPeriod: {
    narrow: ["AM", "PM"],
    abbr: ["AM", "PM"],
    wide: ["AM", "PM"],
  },
  equivalences: [
    {
      component: "dayPeriod",
      widths: ["narrow", "abbr", "wide"],
      description:
        "should have same values for all widths (Dutch locale characteristic)",
    },
  ],
};

describeLocaleStructure(nl, "nl");
describeLocaleValues(nl, "nl", expectedValues);
