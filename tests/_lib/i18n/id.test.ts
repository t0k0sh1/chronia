import { id } from "../../../src/i18n/id";
import {
  describeLocaleStructure,
  describeLocaleValues,
  LocaleExpectedValues,
} from "./_testUtils";

const expectedValues: LocaleExpectedValues = {
  era: {
    narrow: ["SM", "M"],
    abbr: ["SM", "M"],
    wide: ["Sebelum Masehi", "Masehi"],
  },
  month: {
    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    abbr: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agt",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ],
    wide: [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ],
  },
  weekday: {
    narrow: ["M", "S", "S", "R", "K", "J", "S"],
    abbr: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
    wide: [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
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
        "should have same values for narrow and abbreviated era names (Indonesian locale characteristic)",
    },
    {
      component: "dayPeriod",
      widths: ["narrow", "abbr", "wide"],
      description:
        "should have same values for all widths (Indonesian locale characteristic)",
    },
  ],
};

describeLocaleStructure(id, "id");
describeLocaleValues(id, "id", expectedValues);
