import { pl } from "../../../src/i18n/pl";
import {
  describeLocaleStructure,
  describeLocaleValues,
  LocaleExpectedValues,
} from "./_testUtils";

const expectedValues: LocaleExpectedValues = {
  era: {
    narrow: ["p.n.e.", "n.e."],
    abbr: ["p.n.e.", "n.e."],
    wide: ["przed naszą erą", "naszej ery"],
  },
  month: {
    narrow: ["S", "L", "M", "K", "M", "C", "L", "S", "W", "P", "L", "G"],
    abbr: [
      "sty",
      "lut",
      "mar",
      "kwi",
      "maj",
      "cze",
      "lip",
      "sie",
      "wrz",
      "paź",
      "lis",
      "gru",
    ],
    wide: [
      "styczeń",
      "luty",
      "marzec",
      "kwiecień",
      "maj",
      "czerwiec",
      "lipiec",
      "sierpień",
      "wrzesień",
      "październik",
      "listopad",
      "grudzień",
    ],
  },
  weekday: {
    narrow: ["N", "P", "W", "Ś", "C", "P", "S"],
    abbr: ["niedz.", "pon.", "wt.", "śr.", "czw.", "pt.", "sob."],
    wide: [
      "niedziela",
      "poniedziałek",
      "wtorek",
      "środa",
      "czwartek",
      "piątek",
      "sobota",
    ],
  },
  dayPeriod: {
    narrow: ["AM", "PM"],
    abbr: ["AM", "PM"],
    wide: ["AM", "PM"],
  },
  equivalences: [
    {
      component: "era",
      widths: ["narrow", "abbr"],
      description:
        "should have same values for narrow and abbreviated era names (Polish locale characteristic)",
    },
    {
      component: "dayPeriod",
      widths: ["narrow", "abbr", "wide"],
      description:
        "should have same values for all widths (Polish locale characteristic)",
    },
  ],
};

describeLocaleStructure(pl, "pl");
describeLocaleValues(pl, "pl", expectedValues);
