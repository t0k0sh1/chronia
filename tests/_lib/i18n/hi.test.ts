import { hi } from "../../../src/i18n/hi";
import {
  describeLocaleStructure,
  describeLocaleValues,
  LocaleExpectedValues,
} from "./_testUtils";

const expectedValues: LocaleExpectedValues = {
  era: {
    narrow: ["ई.पू.", "ई."],
    abbr: ["ईसा-पूर्व", "ईस्वी"],
    wide: ["ईसा-पूर्व", "ईसवी सन"],
  },
  month: {
    narrow: [
      "ज",
      "फ़",
      "मा",
      "अ",
      "म",
      "जू",
      "जु",
      "अ",
      "सि",
      "अ",
      "न",
      "दि",
    ],
    abbr: [
      "जन",
      "फ़र",
      "मार्च",
      "अप्रैल",
      "मई",
      "जून",
      "जुल",
      "अग",
      "सित",
      "अक्टू",
      "नव",
      "दिस",
    ],
    wide: [
      "जनवरी",
      "फ़रवरी",
      "मार्च",
      "अप्रैल",
      "मई",
      "जून",
      "जुलाई",
      "अगस्त",
      "सितंबर",
      "अक्टूबर",
      "नवंबर",
      "दिसंबर",
    ],
  },
  weekday: {
    narrow: ["र", "सो", "मं", "बु", "गु", "शु", "श"],
    abbr: ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"],
    wide: [
      "रविवार",
      "सोमवार",
      "मंगलवार",
      "बुधवार",
      "गुरुवार",
      "शुक्रवार",
      "शनिवार",
    ],
  },
  dayPeriod: {
    narrow: ["पूर्वाह्न", "अपराह्न"],
    abbr: ["पूर्वाह्न", "अपराह्न"],
    wide: ["पूर्वाह्न", "अपराह्न"],
  },
  equivalences: [
    {
      component: "dayPeriod",
      widths: ["narrow", "abbr", "wide"],
      description:
        "should have same values for all widths (Hindi locale characteristic)",
    },
  ],
};

describeLocaleStructure(hi, "hi");
describeLocaleValues(hi, "hi", expectedValues);
