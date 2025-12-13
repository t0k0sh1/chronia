import { it } from "../../../src/i18n/it";
import {
  describeLocaleStructure,
  describeLocaleValues,
  LocaleExpectedValues,
} from "./_testUtils";

const expectedValues: LocaleExpectedValues = {
  era: {
    narrow: ["aC", "dC"],
    abbr: ["a.C.", "d.C."],
    wide: ["avanti Cristo", "dopo Cristo"],
  },
  month: {
    narrow: ["G", "F", "M", "A", "M", "G", "L", "A", "S", "O", "N", "D"],
    abbr: [
      "gen",
      "feb",
      "mar",
      "apr",
      "mag",
      "giu",
      "lug",
      "ago",
      "set",
      "ott",
      "nov",
      "dic",
    ],
    wide: [
      "gennaio",
      "febbraio",
      "marzo",
      "aprile",
      "maggio",
      "giugno",
      "luglio",
      "agosto",
      "settembre",
      "ottobre",
      "novembre",
      "dicembre",
    ],
  },
  weekday: {
    narrow: ["D", "L", "M", "M", "G", "V", "S"],
    abbr: ["dom", "lun", "mar", "mer", "gio", "ven", "sab"],
    wide: [
      "domenica",
      "lunedì",
      "martedì",
      "mercoledì",
      "giovedì",
      "venerdì",
      "sabato",
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
        "should have same values for all widths (Italian locale characteristic)",
    },
  ],
};

describeLocaleStructure(it, "it");
describeLocaleValues(it, "it", expectedValues);
