import { ru } from "../../../src/i18n/ru";
import {
  describeLocaleStructure,
  describeLocaleValues,
  LocaleExpectedValues,
} from "./_testUtils";

const expectedValues: LocaleExpectedValues = {
  era: {
    narrow: ["до н.э.", "н.э."],
    abbr: ["до н. э.", "н. э."],
    wide: ["до нашей эры", "нашей эры"],
  },
  month: {
    narrow: ["Я", "Ф", "М", "А", "М", "И", "И", "А", "С", "О", "Н", "Д"],
    abbr: [
      "янв.",
      "февр.",
      "март",
      "апр.",
      "май",
      "июнь",
      "июль",
      "авг.",
      "сент.",
      "окт.",
      "нояб.",
      "дек.",
    ],
    wide: [
      "январь",
      "февраль",
      "март",
      "апрель",
      "май",
      "июнь",
      "июль",
      "август",
      "сентябрь",
      "октябрь",
      "ноябрь",
      "декабрь",
    ],
  },
  weekday: {
    narrow: ["В", "П", "В", "С", "Ч", "П", "С"],
    abbr: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
    wide: [
      "воскресенье",
      "понедельник",
      "вторник",
      "среда",
      "четверг",
      "пятница",
      "суббота",
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
        "should have same values for all widths (Russian locale characteristic)",
    },
  ],
};

describeLocaleStructure(ru, "ru");
describeLocaleValues(ru, "ru", expectedValues);
