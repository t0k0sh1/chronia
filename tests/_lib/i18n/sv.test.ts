import { sv } from "../../../src/i18n/sv";
import {
  describeLocaleStructure,
  describeLocaleValues,
  LocaleExpectedValues,
} from "./_testUtils";

const expectedValues: LocaleExpectedValues = {
  era: {
    narrow: ["f.Kr.", "e.Kr."],
    abbr: ["f.Kr.", "e.Kr."],
    wide: ["före Kristus", "efter Kristus"],
  },
  month: {
    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    abbr: [
      "jan.",
      "feb.",
      "mars",
      "apr.",
      "maj",
      "juni",
      "juli",
      "aug.",
      "sep.",
      "okt.",
      "nov.",
      "dec.",
    ],
    wide: [
      "januari",
      "februari",
      "mars",
      "april",
      "maj",
      "juni",
      "juli",
      "augusti",
      "september",
      "oktober",
      "november",
      "december",
    ],
  },
  weekday: {
    narrow: ["S", "M", "T", "O", "T", "F", "L"],
    abbr: ["sön", "mån", "tis", "ons", "tors", "fre", "lör"],
    wide: [
      "söndag",
      "måndag",
      "tisdag",
      "onsdag",
      "torsdag",
      "fredag",
      "lördag",
    ],
  },
  dayPeriod: {
    narrow: ["fm", "em"],
    abbr: ["f.m.", "e.m."],
    wide: ["förmiddag", "eftermiddag"],
  },
  equivalences: [
    {
      component: "era",
      widths: ["narrow", "abbr"],
      description:
        "should have same values for narrow and abbreviated era names (Swedish locale characteristic)",
    },
  ],
};

describeLocaleStructure(sv, "sv");
describeLocaleValues(sv, "sv", expectedValues);
