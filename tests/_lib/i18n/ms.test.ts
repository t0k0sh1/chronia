import { ms } from "../../../src/i18n/ms";
import {
  describeLocaleStructure,
  describeLocaleValues,
  LocaleExpectedValues,
} from "./_testUtils";

const expectedValues: LocaleExpectedValues = {
  era: {
    narrow: ["SM", "M"],
    abbr: ["SM", "M"],
    wide: ["Sebelum Masihi", "Masihi"],
  },
  month: {
    narrow: ["J", "F", "M", "A", "M", "J", "J", "O", "S", "O", "N", "D"],
    abbr: [
      "Jan",
      "Feb",
      "Mac",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Ogo",
      "Sep",
      "Okt",
      "Nov",
      "Dis",
    ],
    wide: [
      "Januari",
      "Februari",
      "Mac",
      "April",
      "Mei",
      "Jun",
      "Julai",
      "Ogos",
      "September",
      "Oktober",
      "November",
      "Disember",
    ],
  },
  weekday: {
    narrow: ["A", "I", "S", "R", "K", "J", "S"],
    abbr: ["Ahd", "Isn", "Sel", "Rab", "Kha", "Jum", "Sab"],
    wide: [
      "Ahad",
      "Isnin",
      "Selasa",
      "Rabu",
      "Khamis",
      "Jumaat",
      "Sabtu",
    ],
  },
  dayPeriod: {
    narrow: ["PG", "PTG"],
    abbr: ["PG", "PTG"],
    wide: ["PG", "PTG"],
  },
  equivalences: [
    {
      component: "era",
      widths: ["narrow", "abbr"],
      description:
        "should have same values for narrow and abbreviated era names (Malay locale characteristic)",
    },
    {
      component: "dayPeriod",
      widths: ["narrow", "abbr", "wide"],
      description:
        "should have same values for all widths (Malay locale characteristic)",
    },
  ],
};

describeLocaleStructure(ms, "ms");
describeLocaleValues(ms, "ms", expectedValues);
