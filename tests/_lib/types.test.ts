import { describe, it, expectTypeOf } from "vitest";
import type { Locale, LocaleWidth } from "../../src/types";

describe("LocaleWidth type", () => {
  describe("valid values", () => {
    it("should accept 'narrow'", () => {
      const width: LocaleWidth = "narrow";
      expectTypeOf(width).toExtend<LocaleWidth>();
    });

    it("should accept 'abbr'", () => {
      const width: LocaleWidth = "abbr";
      expectTypeOf(width).toExtend<LocaleWidth>();
    });

    it("should accept 'wide'", () => {
      const width: LocaleWidth = "wide";
      expectTypeOf(width).toExtend<LocaleWidth>();
    });
  });

  describe("invalid values", () => {
    it("should reject 'abbreviated' (old name)", () => {
      // @ts-expect-error - 'abbreviated' is not a valid LocaleWidth
      const width: LocaleWidth = "abbreviated";
    });

    it("should reject arbitrary strings", () => {
      // @ts-expect-error - arbitrary string is not valid
      const width: LocaleWidth = "invalid";
    });
  });
});

describe("Locale type", () => {
  describe("data structure", () => {
    it("should have era property with narrow, abbr, and wide arrays", () => {
      const locale: Locale = {
        era: {
          narrow: ["B", "A"],
          abbr: ["BC", "AD"],
          wide: ["Before Christ", "Anno Domini"],
        },
        month: {
          narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          abbr: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          wide: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        },
        weekday: {
          narrow: ["S", "M", "T", "W", "T", "F", "S"],
          abbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          wide: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
        },
        dayPeriod: {
          narrow: ["a", "p"],
          abbr: ["AM", "PM"],
          wide: ["AM (morning)", "PM (afternoon)"],
        },
      };

      expectTypeOf(locale).toEqualTypeOf<Locale>();
      expectTypeOf(locale.era.narrow).toEqualTypeOf<
        readonly [string, string]
      >();
      expectTypeOf(locale.era.abbr).toEqualTypeOf<readonly [string, string]>();
      expectTypeOf(locale.era.wide).toEqualTypeOf<readonly [string, string]>();
    });

    it("should have month property with 12-element arrays for each width", () => {
      const locale: Locale = {
        era: {
          narrow: ["B", "A"],
          abbr: ["BC", "AD"],
          wide: ["Before Christ", "Anno Domini"],
        },
        month: {
          narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          abbr: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          wide: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        },
        weekday: {
          narrow: ["S", "M", "T", "W", "T", "F", "S"],
          abbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          wide: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
        },
        dayPeriod: {
          narrow: ["a", "p"],
          abbr: ["AM", "PM"],
          wide: ["AM (morning)", "PM (afternoon)"],
        },
      };

      expectTypeOf(locale.month.narrow).toExtend<readonly string[]>();
      expectTypeOf(locale.month.abbr).toExtend<readonly string[]>();
      expectTypeOf(locale.month.wide).toExtend<readonly string[]>();
    });

    it("should have weekday property with 7-element arrays for each width", () => {
      const locale: Locale = {
        era: {
          narrow: ["B", "A"],
          abbr: ["BC", "AD"],
          wide: ["Before Christ", "Anno Domini"],
        },
        month: {
          narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          abbr: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          wide: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        },
        weekday: {
          narrow: ["S", "M", "T", "W", "T", "F", "S"],
          abbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          wide: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
        },
        dayPeriod: {
          narrow: ["a", "p"],
          abbr: ["AM", "PM"],
          wide: ["AM (morning)", "PM (afternoon)"],
        },
      };

      expectTypeOf(locale.weekday.narrow).toExtend<readonly string[]>();
      expectTypeOf(locale.weekday.abbr).toExtend<readonly string[]>();
      expectTypeOf(locale.weekday.wide).toExtend<readonly string[]>();
    });

    it("should have dayPeriod property with 2-element arrays for each width", () => {
      const locale: Locale = {
        era: {
          narrow: ["B", "A"],
          abbr: ["BC", "AD"],
          wide: ["Before Christ", "Anno Domini"],
        },
        month: {
          narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          abbr: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          wide: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        },
        weekday: {
          narrow: ["S", "M", "T", "W", "T", "F", "S"],
          abbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          wide: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
        },
        dayPeriod: {
          narrow: ["a", "p"],
          abbr: ["AM", "PM"],
          wide: ["AM (morning)", "PM (afternoon)"],
        },
      };

      expectTypeOf(locale.dayPeriod.narrow).toEqualTypeOf<
        readonly [string, string]
      >();
      expectTypeOf(locale.dayPeriod.abbr).toEqualTypeOf<
        readonly [string, string]
      >();
      expectTypeOf(locale.dayPeriod.wide).toEqualTypeOf<
        readonly [string, string]
      >();
    });
  });

  describe("immutability (readonly)", () => {
    it("should enforce readonly on all arrays", () => {
      const locale: Locale = {
        era: {
          narrow: ["B", "A"],
          abbr: ["BC", "AD"],
          wide: ["Before Christ", "Anno Domini"],
        },
        month: {
          narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          abbr: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          wide: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        },
        weekday: {
          narrow: ["S", "M", "T", "W", "T", "F", "S"],
          abbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          wide: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
        },
        dayPeriod: {
          narrow: ["a", "p"],
          abbr: ["AM", "PM"],
          wide: ["AM (morning)", "PM (afternoon)"],
        },
      };

      // These should all fail at compile time due to readonly
      // @ts-expect-error - Cannot assign to readonly array
      locale.era.narrow[0] = "X";
      // @ts-expect-error - Cannot push to readonly array
      locale.month.abbr.push("Extra");
      // @ts-expect-error - Cannot modify readonly array
      locale.weekday.wide[0] = "Modified";
      // @ts-expect-error - Cannot assign to readonly array
      locale.dayPeriod.narrow[1] = "Y";
    });
  });

  describe("type safety", () => {
    it("should reject missing properties", () => {
      // @ts-expect-error - Missing required properties
      const incompleteLocale: Locale = {
        era: {
          narrow: ["B", "A"],
          abbr: ["BC", "AD"],
          wide: ["Before Christ", "Anno Domini"],
        },
      };

    });

    it("should reject incorrect width property names", () => {
      const invalidLocale: Locale = {
        era: {
          narrow: ["B", "A"],
          // @ts-expect-error - 'abbreviated' should be 'abbr'
          abbreviated: ["BC", "AD"], // Wrong property name
          wide: ["Before Christ", "Anno Domini"],
        },
        month: {
          narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          abbr: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          wide: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        },
        weekday: {
          narrow: ["S", "M", "T", "W", "T", "F", "S"],
          abbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          wide: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
        },
        dayPeriod: {
          narrow: ["a", "p"],
          abbr: ["AM", "PM"],
          wide: ["AM (morning)", "PM (afternoon)"],
        },
      };

    });

    it("should enforce correct array element counts for era", () => {
      // Era arrays should have exactly 2 elements
      const locale: Locale = {
        era: {
          narrow: ["B", "A"], // Correct: 2 elements
          abbr: ["BC", "AD"], // Correct: 2 elements
          wide: ["Before Christ", "Anno Domini"], // Correct: 2 elements
        },
        month: {
          narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          abbr: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          wide: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        },
        weekday: {
          narrow: ["S", "M", "T", "W", "T", "F", "S"],
          abbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          wide: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
        },
        dayPeriod: {
          narrow: ["a", "p"],
          abbr: ["AM", "PM"],
          wide: ["AM (morning)", "PM (afternoon)"],
        },
      };

      expectTypeOf(locale).toEqualTypeOf<Locale>();

      // Should reject era arrays with wrong element count
      const wrongEraCount: Locale = {
        era: {
          // @ts-expect-error - Era narrow should have exactly 2 elements
          narrow: ["B"], // Wrong: only 1 element
          abbr: ["BC", "AD"],
          wide: ["Before Christ", "Anno Domini"],
        },
        month: {
          narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          abbr: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          wide: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        },
        weekday: {
          narrow: ["S", "M", "T", "W", "T", "F", "S"],
          abbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          wide: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
        },
        dayPeriod: {
          narrow: ["a", "p"],
          abbr: ["AM", "PM"],
          wide: ["AM (morning)", "PM (afternoon)"],
        },
      };

    });

    it("should enforce correct array element counts for dayPeriod", () => {
      // DayPeriod arrays should have exactly 2 elements
      const locale: Locale = {
        era: {
          narrow: ["B", "A"],
          abbr: ["BC", "AD"],
          wide: ["Before Christ", "Anno Domini"],
        },
        month: {
          narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          abbr: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          wide: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        },
        weekday: {
          narrow: ["S", "M", "T", "W", "T", "F", "S"],
          abbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          wide: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
        },
        dayPeriod: {
          narrow: ["a", "p"], // Correct: 2 elements
          abbr: ["AM", "PM"], // Correct: 2 elements
          wide: ["AM (morning)", "PM (afternoon)"], // Correct: 2 elements
        },
      };

      expectTypeOf(locale).toEqualTypeOf<Locale>();

      // Should reject dayPeriod arrays with wrong element count
      const wrongDayPeriodCount: Locale = {
        era: {
          narrow: ["B", "A"],
          abbr: ["BC", "AD"],
          wide: ["Before Christ", "Anno Domini"],
        },
        month: {
          narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          abbr: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          wide: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        },
        weekday: {
          narrow: ["S", "M", "T", "W", "T", "F", "S"],
          abbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          wide: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
        },
        dayPeriod: {
          narrow: ["a", "p"],
          // @ts-expect-error - DayPeriod abbr should have exactly 2 elements
          abbr: ["AM", "PM", "Noon"], // Wrong: 3 elements
          wide: ["AM (morning)", "PM (afternoon)"],
        },
      };

    });
  });
});
