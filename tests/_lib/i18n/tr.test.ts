import { tr } from "../../../src/i18n/tr";
import {
  describeLocaleStructure,
  describeLocaleValues,
  LocaleExpectedValues,
} from "./_testUtils";

const expectedValues: LocaleExpectedValues = {
  era: {
    narrow: ["MÖ", "MS"],
    abbr: ["MÖ", "MS"],
    wide: ["Milattan Önce", "Milattan Sonra"],
  },
  month: {
    narrow: ["O", "Ş", "M", "N", "M", "H", "T", "A", "E", "E", "K", "A"],
    abbr: [
      "Oca",
      "Şub",
      "Mar",
      "Nis",
      "May",
      "Haz",
      "Tem",
      "Ağu",
      "Eyl",
      "Eki",
      "Kas",
      "Ara",
    ],
    wide: [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık",
    ],
  },
  weekday: {
    narrow: ["P", "P", "S", "Ç", "P", "C", "C"],
    abbr: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"],
    wide: [
      "Pazar",
      "Pazartesi",
      "Salı",
      "Çarşamba",
      "Perşembe",
      "Cuma",
      "Cumartesi",
    ],
  },
  dayPeriod: {
    narrow: ["ÖÖ", "ÖS"],
    abbr: ["ÖÖ", "ÖS"],
    wide: ["Ö.Ö.", "Ö.S."],
  },
  equivalences: [
    {
      component: "era",
      widths: ["narrow", "abbr"],
      description:
        "should have same values for narrow and abbreviated era names (Turkish locale characteristic)",
    },
    {
      component: "dayPeriod",
      widths: ["narrow", "abbr"],
      description:
        "should have same values for narrow and abbreviated day period (Turkish locale characteristic)",
    },
  ],
};

describeLocaleStructure(tr, "tr");
describeLocaleValues(tr, "tr", expectedValues);
