import { es } from "../../../src/i18n/es";
import {
  describeLocaleStructure,
  describeLocaleValues,
  LocaleExpectedValues,
} from "./_testUtils";

const expectedValues: LocaleExpectedValues = {
  era: {
    narrow: ["a", "d"],
    abbr: ["a. C.", "d. C."],
    wide: ["antes de Cristo", "después de Cristo"],
  },
  month: {
    narrow: ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    abbr: [
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sept",
      "oct",
      "nov",
      "dic",
    ],
    wide: [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ],
  },
  weekday: {
    narrow: ["D", "L", "M", "X", "J", "V", "S"],
    abbr: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    wide: [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ],
  },
  dayPeriod: {
    narrow: ["a. m.", "p. m."],
    abbr: ["a. m.", "p. m."],
    wide: ["a. m.", "p. m."],
  },
  equivalences: [
    {
      component: "dayPeriod",
      widths: ["narrow", "abbr", "wide"],
      description:
        "should have same values for all widths (Spanish locale characteristic)",
    },
  ],
};

describeLocaleStructure(es, "es");
describeLocaleValues(es, "es", expectedValues);
