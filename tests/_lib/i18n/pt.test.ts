import { pt } from "../../../src/i18n/pt";
import {
  describeLocaleStructure,
  describeLocaleValues,
  LocaleExpectedValues,
} from "./_testUtils";

const expectedValues: LocaleExpectedValues = {
  era: {
    narrow: ["aC", "dC"],
    abbr: ["a.C.", "d.C."],
    wide: ["antes de Cristo", "depois de Cristo"],
  },
  month: {
    narrow: ["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
    abbr: [
      "jan",
      "fev",
      "mar",
      "abr",
      "mai",
      "jun",
      "jul",
      "ago",
      "set",
      "out",
      "nov",
      "dez",
    ],
    wide: [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro",
    ],
  },
  weekday: {
    narrow: ["d", "s", "t", "q", "q", "s", "s"],
    abbr: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
    wide: [
      "domingo",
      "segunda-feira",
      "terça-feira",
      "quarta-feira",
      "quinta-feira",
      "sexta-feira",
      "sábado",
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
        "should have same values for all widths (Portuguese locale characteristic)",
    },
  ],
};

describeLocaleStructure(pt, "pt");
describeLocaleValues(pt, "pt", expectedValues);
