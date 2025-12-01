import { describe, expect, it } from "vitest";
import {
  getDayPeriod,
  getEraName,
  getMonthName,
  getWeekdayName,
} from "../../src/_lib/localeHelpers";
import { enUS } from "../../src/i18n/en-US";
import { ja } from "../../src/i18n/ja";

describe("getMonthName", () => {
  describe("with explicit locale", () => {
    it("should return abbreviated month name by default (en-US)", () => {
      expect(getMonthName(enUS, 0)).toBe("Jan");
      expect(getMonthName(enUS, 11)).toBe("Dec");
    });

    it("should return narrow month name when width is 'narrow' (en-US)", () => {
      expect(getMonthName(enUS, 0, "narrow")).toBe("J");
      expect(getMonthName(enUS, 1, "narrow")).toBe("F");
      expect(getMonthName(enUS, 11, "narrow")).toBe("D");
    });

    it("should return abbreviated month name when width is 'abbr' (en-US)", () => {
      expect(getMonthName(enUS, 0, "abbr")).toBe("Jan");
      expect(getMonthName(enUS, 5, "abbr")).toBe("Jun");
      expect(getMonthName(enUS, 11, "abbr")).toBe("Dec");
    });

    it("should return wide month name when width is 'wide' (en-US)", () => {
      expect(getMonthName(enUS, 0, "wide")).toBe("January");
      expect(getMonthName(enUS, 5, "wide")).toBe("June");
      expect(getMonthName(enUS, 11, "wide")).toBe("December");
    });

    it("should work with Japanese locale (narrow)", () => {
      expect(getMonthName(ja, 0, "narrow")).toBe("1");
      expect(getMonthName(ja, 11, "narrow")).toBe("12");
    });

    it("should work with Japanese locale (abbr)", () => {
      expect(getMonthName(ja, 0, "abbr")).toBe("1月");
      expect(getMonthName(ja, 11, "abbr")).toBe("12月");
    });

    it("should work with Japanese locale (wide)", () => {
      expect(getMonthName(ja, 0, "wide")).toBe("1月");
      expect(getMonthName(ja, 11, "wide")).toBe("12月");
    });
  });

  describe("with undefined locale (fallback to defaultLocale)", () => {
    it("should use defaultLocale when locale is undefined (default width)", () => {
      expect(getMonthName(undefined, 0)).toBe("Jan");
      expect(getMonthName(undefined, 11)).toBe("Dec");
    });

    it("should use defaultLocale when locale is undefined (narrow)", () => {
      expect(getMonthName(undefined, 0, "narrow")).toBe("J");
      expect(getMonthName(undefined, 11, "narrow")).toBe("D");
    });

    it("should use defaultLocale when locale is undefined (abbr)", () => {
      expect(getMonthName(undefined, 0, "abbr")).toBe("Jan");
      expect(getMonthName(undefined, 11, "abbr")).toBe("Dec");
    });

    it("should use defaultLocale when locale is undefined (wide)", () => {
      expect(getMonthName(undefined, 0, "wide")).toBe("January");
      expect(getMonthName(undefined, 11, "wide")).toBe("December");
    });
  });

  describe("boundary values", () => {
    it("should handle first month (0)", () => {
      expect(getMonthName(enUS, 0)).toBe("Jan");
    });

    it("should handle last month (11)", () => {
      expect(getMonthName(enUS, 11)).toBe("Dec");
    });

    it("should handle mid-range month (5)", () => {
      expect(getMonthName(enUS, 5)).toBe("Jun");
    });
  });
});

describe("getWeekdayName", () => {
  describe("with explicit locale", () => {
    it("should return abbreviated weekday name by default (en-US)", () => {
      expect(getWeekdayName(enUS, 0)).toBe("Sun");
      expect(getWeekdayName(enUS, 6)).toBe("Sat");
    });

    it("should return narrow weekday name when width is 'narrow' (en-US)", () => {
      expect(getWeekdayName(enUS, 0, "narrow")).toBe("S");
      expect(getWeekdayName(enUS, 1, "narrow")).toBe("M");
      expect(getWeekdayName(enUS, 6, "narrow")).toBe("S");
    });

    it("should return abbreviated weekday name when width is 'abbr' (en-US)", () => {
      expect(getWeekdayName(enUS, 0, "abbr")).toBe("Sun");
      expect(getWeekdayName(enUS, 3, "abbr")).toBe("Wed");
      expect(getWeekdayName(enUS, 6, "abbr")).toBe("Sat");
    });

    it("should return wide weekday name when width is 'wide' (en-US)", () => {
      expect(getWeekdayName(enUS, 0, "wide")).toBe("Sunday");
      expect(getWeekdayName(enUS, 3, "wide")).toBe("Wednesday");
      expect(getWeekdayName(enUS, 6, "wide")).toBe("Saturday");
    });

    it("should work with Japanese locale (narrow)", () => {
      expect(getWeekdayName(ja, 0, "narrow")).toBe("日");
      expect(getWeekdayName(ja, 6, "narrow")).toBe("土");
    });

    it("should work with Japanese locale (abbr)", () => {
      expect(getWeekdayName(ja, 0, "abbr")).toBe("日");
      expect(getWeekdayName(ja, 6, "abbr")).toBe("土");
    });

    it("should work with Japanese locale (wide)", () => {
      expect(getWeekdayName(ja, 0, "wide")).toBe("日曜日");
      expect(getWeekdayName(ja, 6, "wide")).toBe("土曜日");
    });
  });

  describe("with undefined locale (fallback to defaultLocale)", () => {
    it("should use defaultLocale when locale is undefined (default width)", () => {
      expect(getWeekdayName(undefined, 0)).toBe("Sun");
      expect(getWeekdayName(undefined, 6)).toBe("Sat");
    });

    it("should use defaultLocale when locale is undefined (narrow)", () => {
      expect(getWeekdayName(undefined, 0, "narrow")).toBe("S");
      expect(getWeekdayName(undefined, 6, "narrow")).toBe("S");
    });

    it("should use defaultLocale when locale is undefined (abbr)", () => {
      expect(getWeekdayName(undefined, 0, "abbr")).toBe("Sun");
      expect(getWeekdayName(undefined, 6, "abbr")).toBe("Sat");
    });

    it("should use defaultLocale when locale is undefined (wide)", () => {
      expect(getWeekdayName(undefined, 0, "wide")).toBe("Sunday");
      expect(getWeekdayName(undefined, 6, "wide")).toBe("Saturday");
    });
  });

  describe("boundary values", () => {
    it("should handle first weekday (0 = Sunday)", () => {
      expect(getWeekdayName(enUS, 0)).toBe("Sun");
    });

    it("should handle last weekday (6 = Saturday)", () => {
      expect(getWeekdayName(enUS, 6)).toBe("Sat");
    });

    it("should handle mid-range weekday (3 = Wednesday)", () => {
      expect(getWeekdayName(enUS, 3)).toBe("Wed");
    });
  });
});

describe("getEraName", () => {
  describe("with explicit locale", () => {
    it("should return abbreviated era name by default (en-US)", () => {
      expect(getEraName(enUS, 0)).toBe("BC");
      expect(getEraName(enUS, 1)).toBe("AD");
    });

    it("should return narrow era name when width is 'narrow' (en-US)", () => {
      expect(getEraName(enUS, 0, "narrow")).toBe("B");
      expect(getEraName(enUS, 1, "narrow")).toBe("A");
    });

    it("should return abbreviated era name when width is 'abbr' (en-US)", () => {
      expect(getEraName(enUS, 0, "abbr")).toBe("BC");
      expect(getEraName(enUS, 1, "abbr")).toBe("AD");
    });

    it("should return wide era name when width is 'wide' (en-US)", () => {
      expect(getEraName(enUS, 0, "wide")).toBe("Before Christ");
      expect(getEraName(enUS, 1, "wide")).toBe("Anno Domini");
    });

    it("should work with Japanese locale (narrow)", () => {
      // International standard values (Anno Domini)
      expect(getEraName(ja, 0, "narrow")).toBe("BC");
      expect(getEraName(ja, 1, "narrow")).toBe("AD");
    });

    it("should work with Japanese locale (abbr)", () => {
      // date-fns compatible values (Japanese text)
      expect(getEraName(ja, 0, "abbr")).toBe("紀元前");
      expect(getEraName(ja, 1, "abbr")).toBe("西暦");
    });

    it("should work with Japanese locale (wide)", () => {
      expect(getEraName(ja, 0, "wide")).toBe("紀元前");
      expect(getEraName(ja, 1, "wide")).toBe("西暦");
    });
  });

  describe("with undefined locale (fallback to defaultLocale)", () => {
    it("should use defaultLocale when locale is undefined (default width)", () => {
      expect(getEraName(undefined, 0)).toBe("BC");
      expect(getEraName(undefined, 1)).toBe("AD");
    });

    it("should use defaultLocale when locale is undefined (narrow)", () => {
      expect(getEraName(undefined, 0, "narrow")).toBe("B");
      expect(getEraName(undefined, 1, "narrow")).toBe("A");
    });

    it("should use defaultLocale when locale is undefined (abbr)", () => {
      expect(getEraName(undefined, 0, "abbr")).toBe("BC");
      expect(getEraName(undefined, 1, "abbr")).toBe("AD");
    });

    it("should use defaultLocale when locale is undefined (wide)", () => {
      expect(getEraName(undefined, 0, "wide")).toBe("Before Christ");
      expect(getEraName(undefined, 1, "wide")).toBe("Anno Domini");
    });
  });

  describe("boundary values", () => {
    it("should handle era 0 (BC)", () => {
      expect(getEraName(enUS, 0)).toBe("BC");
    });

    it("should handle era 1 (AD)", () => {
      expect(getEraName(enUS, 1)).toBe("AD");
    });
  });
});

describe("getDayPeriod", () => {
  describe("with explicit locale", () => {
    it("should return abbreviated day period by default (en-US)", () => {
      expect(getDayPeriod(enUS, "am")).toBe("AM");
      expect(getDayPeriod(enUS, "pm")).toBe("PM");
    });

    it("should return narrow day period when width is 'narrow' (en-US)", () => {
      expect(getDayPeriod(enUS, "am", "narrow")).toBe("a");
      expect(getDayPeriod(enUS, "pm", "narrow")).toBe("p");
    });

    it("should return abbreviated day period when width is 'abbr' (en-US)", () => {
      expect(getDayPeriod(enUS, "am", "abbr")).toBe("AM");
      expect(getDayPeriod(enUS, "pm", "abbr")).toBe("PM");
    });

    it("should return wide day period when width is 'wide' (en-US)", () => {
      expect(getDayPeriod(enUS, "am", "wide")).toBe("a.m.");
      expect(getDayPeriod(enUS, "pm", "wide")).toBe("p.m.");
    });

    it("should work with Japanese locale (narrow)", () => {
      expect(getDayPeriod(ja, "am", "narrow")).toBe("午前");
      expect(getDayPeriod(ja, "pm", "narrow")).toBe("午後");
    });

    it("should work with Japanese locale (abbr)", () => {
      expect(getDayPeriod(ja, "am", "abbr")).toBe("午前");
      expect(getDayPeriod(ja, "pm", "abbr")).toBe("午後");
    });

    it("should work with Japanese locale (wide)", () => {
      expect(getDayPeriod(ja, "am", "wide")).toBe("午前");
      expect(getDayPeriod(ja, "pm", "wide")).toBe("午後");
    });
  });

  describe("with undefined locale (fallback to defaultLocale)", () => {
    it("should use defaultLocale when locale is undefined (default width)", () => {
      expect(getDayPeriod(undefined, "am")).toBe("AM");
      expect(getDayPeriod(undefined, "pm")).toBe("PM");
    });

    it("should use defaultLocale when locale is undefined (narrow)", () => {
      expect(getDayPeriod(undefined, "am", "narrow")).toBe("a");
      expect(getDayPeriod(undefined, "pm", "narrow")).toBe("p");
    });

    it("should use defaultLocale when locale is undefined (abbr)", () => {
      expect(getDayPeriod(undefined, "am", "abbr")).toBe("AM");
      expect(getDayPeriod(undefined, "pm", "abbr")).toBe("PM");
    });

    it("should use defaultLocale when locale is undefined (wide)", () => {
      expect(getDayPeriod(undefined, "am", "wide")).toBe("a.m.");
      expect(getDayPeriod(undefined, "pm", "wide")).toBe("p.m.");
    });
  });

  describe("boundary values", () => {
    it("should handle 'am' period", () => {
      expect(getDayPeriod(enUS, "am")).toBe("AM");
    });

    it("should handle 'pm' period", () => {
      expect(getDayPeriod(enUS, "pm")).toBe("PM");
    });
  });
});

describe("Input validation", () => {
  describe("getMonthName - out of range values", () => {
    it("should fallback to January (0) for negative month values", () => {
      expect(getMonthName(enUS, -1)).toBe("Jan");
      expect(getMonthName(enUS, -10)).toBe("Jan");
      expect(getMonthName(enUS, -100, "wide")).toBe("January");
    });

    it("should fallback to January (0) for month values > 11", () => {
      expect(getMonthName(enUS, 12)).toBe("Jan");
      expect(getMonthName(enUS, 100)).toBe("Jan");
      expect(getMonthName(enUS, 999, "wide")).toBe("January");
    });

    it("should return correct month names for boundary values (0 and 11)", () => {
      expect(getMonthName(enUS, 0)).toBe("Jan"); // January (minimum)
      expect(getMonthName(enUS, 11)).toBe("Dec"); // December (maximum)
    });

    it("should fallback to January for NaN values", () => {
      expect(getMonthName(enUS, NaN)).toBe("Jan");
    });
  });

  describe("getWeekdayName - out of range values", () => {
    it("should fallback to Sunday (0) for negative weekday values", () => {
      expect(getWeekdayName(enUS, -1)).toBe("Sun");
      expect(getWeekdayName(enUS, -10)).toBe("Sun");
      expect(getWeekdayName(enUS, -100, "wide")).toBe("Sunday");
    });

    it("should fallback to Sunday (0) for weekday values > 6", () => {
      expect(getWeekdayName(enUS, 7)).toBe("Sun");
      expect(getWeekdayName(enUS, 100)).toBe("Sun");
      expect(getWeekdayName(enUS, 999, "wide")).toBe("Sunday");
    });

    it("should return correct weekday names for boundary values (0 and 6)", () => {
      expect(getWeekdayName(enUS, 0)).toBe("Sun"); // Sunday (minimum)
      expect(getWeekdayName(enUS, 6)).toBe("Sat"); // Saturday (maximum)
    });

    it("should fallback to Sunday for NaN values", () => {
      expect(getWeekdayName(enUS, NaN)).toBe("Sun");
    });
  });
});
