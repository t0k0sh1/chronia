import { describe, expect, it } from "vitest";
import { parse } from "../src/parse";
import { Locale } from "../src/types";

describe("parse", () => {
  describe("basic date parsing", () => {
    it.each([
      ["2024-01-15", "yyyy-MM-dd", new Date(2024, 0, 15, 0, 0, 0, 0)],
      ["2024/12/31", "yyyy/MM/dd", new Date(2024, 11, 31, 0, 0, 0, 0)],
      ["15-01-2024", "dd-MM-yyyy", new Date(2024, 0, 15, 0, 0, 0, 0)],
      ["01/15/2024", "MM/dd/yyyy", new Date(2024, 0, 15, 0, 0, 0, 0)],
      ["2024-1-5", "yyyy-M-d", new Date(2024, 0, 5, 0, 0, 0, 0)],
      ["5-1-2024", "d-M-yyyy", new Date(2024, 0, 5, 0, 0, 0, 0)],
    ])("parses %s with pattern %s", (input, pattern, expected) => {
      expect(parse(input, pattern)).toEqual(expected);
    });
  });

  describe("time parsing", () => {
    it.each([
      ["23:59:59", "HH:mm:ss", { hours: 23, minutes: 59, seconds: 59 }],
      ["00:00:00", "HH:mm:ss", { hours: 0, minutes: 0, seconds: 0 }],
      ["12:30:45", "HH:mm:ss", { hours: 12, minutes: 30, seconds: 45 }],
      ["9:5:3", "H:m:s", { hours: 9, minutes: 5, seconds: 3 }],
      ["23:59", "HH:mm", { hours: 23, minutes: 59, seconds: 0 }],
      ["123", "SSS", { hours: 0, minutes: 0, seconds: 0, milliseconds: 123 }],
      ["50", "SS", { hours: 0, minutes: 0, seconds: 0, milliseconds: 500 }],
      ["5", "S", { hours: 0, minutes: 0, seconds: 0, milliseconds: 500 }],
    ])("parses %s with pattern %s", (input, pattern, expectedTime) => {
      const result = parse(input, pattern);
      expect(result.getHours()).toBe(expectedTime.hours);
      expect(result.getMinutes()).toBe(expectedTime.minutes);
      expect(result.getSeconds()).toBe(expectedTime.seconds);
      if (expectedTime.milliseconds !== undefined) {
        expect(result.getMilliseconds()).toBe(expectedTime.milliseconds);
      }
    });
  });

  describe("12-hour format", () => {
    it.each([
      ["12:00 AM", "hh:mm a", { hours: 0, minutes: 0 }],
      ["12:30 AM", "hh:mm a", { hours: 0, minutes: 30 }],
      ["01:00 AM", "hh:mm a", { hours: 1, minutes: 0 }],
      ["11:59 AM", "hh:mm a", { hours: 11, minutes: 59 }],
      ["12:00 PM", "hh:mm a", { hours: 12, minutes: 0 }],
      ["12:30 PM", "hh:mm a", { hours: 12, minutes: 30 }],
      ["01:00 PM", "hh:mm a", { hours: 13, minutes: 0 }],
      ["11:59 PM", "hh:mm a", { hours: 23, minutes: 59 }],
      ["3:45 PM", "h:mm a", { hours: 15, minutes: 45 }],
      ["9:15 AM", "h:mm a", { hours: 9, minutes: 15 }],
    ])("parses %s with pattern %s", (input, pattern, expectedTime) => {
      const result = parse(input, pattern);
      expect(result.getHours()).toBe(expectedTime.hours);
      expect(result.getMinutes()).toBe(expectedTime.minutes);
    });
  });

  describe("date and time combined", () => {
    it.each([
      [
        "2024-01-15 14:30:45",
        "yyyy-MM-dd HH:mm:ss",
        new Date(2024, 0, 15, 14, 30, 45, 0),
      ],
      [
        "2024-01-15T14:30:45",
        "yyyy-MM-dd'T'HH:mm:ss",
        new Date(2024, 0, 15, 14, 30, 45, 0),
      ],
      [
        "15/01/2024 2:30 PM",
        "dd/MM/yyyy h:mm a",
        new Date(2024, 0, 15, 14, 30, 0, 0),
      ],
      [
        "2024-01-15T14:30:45.123",
        "yyyy-MM-dd'T'HH:mm:ss.SSS",
        new Date(2024, 0, 15, 14, 30, 45, 123),
      ],
    ])("parses %s with pattern %s", (input, pattern, expected) => {
      expect(parse(input, pattern)).toEqual(expected);
    });
  });

  describe("year formats", () => {
    it.each([
      ["24", "yy", new Date(2024, 0, 1, 0, 0, 0, 0)],
      ["99", "yy", new Date(1999, 0, 1, 0, 0, 0, 0)],
      ["00", "yy", new Date(2000, 0, 1, 0, 0, 0, 0)],
      ["50", "yy", new Date(1950, 0, 1, 0, 0, 0, 0)],
      ["49", "yy", new Date(2049, 0, 1, 0, 0, 0, 0)],
      ["2024", "yyyy", new Date(2024, 0, 1, 0, 0, 0, 0)],
      ["024", "yyy", (() => { const d = new Date(2000, 0, 1, 0, 0, 0, 0); d.setFullYear(24); return d; })()],
      ["1", "y", (() => { const d = new Date(2000, 0, 1, 0, 0, 0, 0); d.setFullYear(1); return d; })()],
      ["2024", "y", new Date(2024, 0, 1, 0, 0, 0, 0)],
    ])("parses year %s with pattern %s", (input, pattern, expected) => {
      const result = parse(input, pattern);
      expect(result.getFullYear()).toBe(expected.getFullYear());
    });
  });

  describe("month text formats", () => {
    it.each([
      ["Jan", "MMM", 0],
      ["Feb", "MMM", 1],
      ["Mar", "MMM", 2],
      ["Apr", "MMM", 3],
      ["May", "MMM", 4],
      ["Jun", "MMM", 5],
      ["Jul", "MMM", 6],
      ["Aug", "MMM", 7],
      ["Sep", "MMM", 8],
      ["Oct", "MMM", 9],
      ["Nov", "MMM", 10],
      ["Dec", "MMM", 11],
      ["January", "MMMM", 0],
      ["February", "MMMM", 1],
      ["December", "MMMM", 11],
    ])("parses month %s with pattern %s", (input, pattern, expectedMonth) => {
      const result = parse(input, pattern);
      expect(result.getMonth()).toBe(expectedMonth);
    });
  });

  describe("month parsing day reset behavior", () => {
    it("resets day to 1 when parsing month-only to prevent rollover", () => {
      const referenceDate = new Date(2024, 0, 31); // Jan 31

      // Numeric month
      const result1 = parse("02", "MM", { referenceDate });
      expect(result1.getMonth()).toBe(1); // February
      expect(result1.getDate()).toBe(1);  // Day reset to 1

      // Text month
      const result2 = parse("Feb", "MMM", { referenceDate });
      expect(result2.getMonth()).toBe(1);
      expect(result2.getDate()).toBe(1);
    });

    it("allows explicit day to override month parser default", () => {
      const referenceDate = new Date(2024, 0, 31);
      const result = parse("02-15", "MM-dd", { referenceDate });
      expect(result.getDate()).toBe(15); // Explicit day overrides
    });

    it("preserves reference date for time-only parsing", () => {
      const referenceDate = new Date(2024, 0, 31, 0, 0, 0);
      const result = parse("14:30", "HH:mm", { referenceDate });
      expect(result.getDate()).toBe(31); // 31st preserved
    });

    it("correctly handles day when parsed day equals reference date's day (issue #87)", () => {
      // When reference date is the 15th and we parse "15", the day should NOT be reset to 1
      const referenceDate = new Date(2024, 0, 15); // Jan 15

      // dd-MM-yyyy: day comes before month
      const result1 = parse("15-01-2024", "dd-MM-yyyy", { referenceDate });
      expect(result1.getFullYear()).toBe(2024);
      expect(result1.getMonth()).toBe(0); // January
      expect(result1.getDate()).toBe(15); // Should be 15, NOT 1

      // dd/MM/yyyy h:mm a: day comes before month
      const result2 = parse("15/01/2024 2:30 PM", "dd/MM/yyyy h:mm a", { referenceDate });
      expect(result2.getDate()).toBe(15);
      expect(result2.getMonth()).toBe(0);
      expect(result2.getHours()).toBe(14);

      // d-M-yyyy: flexible day/month format
      const result3 = parse("15-1-2024", "d-M-yyyy", { referenceDate });
      expect(result3.getDate()).toBe(15);

      // Text month format
      const result4 = parse("15 Jan 2024", "dd MMM yyyy", { referenceDate });
      expect(result4.getDate()).toBe(15);
    });
  });

  describe("weekday parsing", () => {
    it.each([
      ["Sun", "EEE"],
      ["Mon", "EEE"],
      ["Sunday", "EEEE"],
      ["Monday", "EEEE"],
      ["S", "EEEEE"],
      ["M", "EEEEE"],
    ])("parses weekday %s with pattern %s", (input, pattern) => {
      const result = parse(input, pattern);
      expect(isNaN(result.getTime())).toBe(false);
    });
  });

  describe("day of year", () => {
    it.each([
      ["001", "DDD", new Date(2024, 0, 1, 0, 0, 0, 0)],
      ["032", "DDD", new Date(2024, 0, 32, 0, 0, 0, 0)], // Jan 32 = Feb 1
      ["060", "DDD", new Date(2024, 1, 29, 0, 0, 0, 0)], // 2024 is leap year
      ["365", "DDD", new Date(2024, 11, 30, 0, 0, 0, 0)],
      ["366", "DDD", new Date(2024, 11, 31, 0, 0, 0, 0)], // 2024 is leap year
      ["1", "D", new Date(2024, 0, 1, 0, 0, 0, 0)],
      ["15", "D", new Date(2024, 0, 15, 0, 0, 0, 0)],
      ["32", "DD", new Date(2024, 0, 32, 0, 0, 0, 0)],
    ])("parses day of year %s with pattern %s", (input, pattern, expected) => {
      const result = parse(input, pattern, { referenceDate: new Date(2024, 0, 1) });
      expect(result.getMonth()).toBe(expected.getMonth());
      expect(result.getDate()).toBe(expected.getDate());
    });
  });

  describe("era parsing", () => {
    it.each([
      ["2024 AD", "yyyy G", 2024],
      ["2024 BC", "yyyy G", -2023], // 2024 BC = year -2023
      ["100 BC", "y G", -99],
      ["1 BC", "y G", 0], // 1 BC = year 0
      ["1 AD", "y G", 1],
      ["0001 AD", "yyyy G", 1],
      ["0100 BC", "yyyy G", -99],
    ])("parses %s with pattern %s", (input, pattern, expectedYear) => {
      const result = parse(input, pattern);
      expect(result.getFullYear()).toBe(expectedYear);
    });
  });

  describe("literal text", () => {
    it.each([
      ["2024-01-15T14:30:45Z", "yyyy-MM-dd'T'HH:mm:ss'Z'", new Date(2024, 0, 15, 14, 30, 45)],
      ["Date: 2024/01/15", "'Date: 'yyyy/MM/dd", new Date(2024, 0, 15, 0, 0, 0)],
      ["15 of Jan, 2024", "dd' of 'MMM', 'yyyy", new Date(2024, 0, 15, 0, 0, 0)],
    ])("parses %s with pattern %s", (input, pattern, expected) => {
      expect(parse(input, pattern)).toEqual(expected);
    });

    it("parses literal text with reference date", () => {
      const result = parse("It's 2024", "'It''s 'yyyy", {
        referenceDate: new Date(2000, 0, 1, 0, 0, 0)
      });
      expect(result).toEqual(new Date(2024, 0, 1, 0, 0, 0));
    });

  });

  describe("invalid input", () => {
    it("returns invalid date for mismatched pattern", () => {
      expect(isNaN(parse("2024-01-15", "dd/MM/yyyy").getTime())).toBe(true);
      expect(isNaN(parse("2024/01/15", "yyyy-MM-dd").getTime())).toBe(true);
    });

    it("returns invalid date for invalid values", () => {
      expect(isNaN(parse("2024-13-01", "yyyy-MM-dd").getTime())).toBe(true); // Invalid month
      expect(isNaN(parse("2024-01-32", "yyyy-MM-dd").getTime())).toBe(true); // Invalid day > 31
      expect(isNaN(parse("2024-00-15", "yyyy-MM-dd").getTime())).toBe(true); // Invalid month 0
      expect(isNaN(parse("24:00:00", "HH:mm:ss").getTime())).toBe(true); // Invalid hour
      expect(isNaN(parse("23:60:00", "HH:mm:ss").getTime())).toBe(true); // Invalid minute
    });

    it("returns invalid date for extra characters", () => {
      expect(isNaN(parse("2024-01-15 extra", "yyyy-MM-dd").getTime())).toBe(true);
      expect(isNaN(parse("2024-01-155", "yyyy-MM-dd").getTime())).toBe(true);
    });

    it("returns invalid date for missing characters", () => {
      expect(isNaN(parse("2024-01", "yyyy-MM-dd").getTime())).toBe(true);
      expect(isNaN(parse("2024", "yyyy-MM-dd").getTime())).toBe(true);
    });

    it("returns invalid date when date construction results in NaN", () => {
      // Test for edge cases that result in invalid dates after construction
      // Extremely large values that cause Date constructor to return NaN
      expect(isNaN(parse("999999999", "yyyy").getTime())).toBe(true);
    });

    it("returns invalid date for null dateString", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(isNaN(parse(null as any, "yyyy-MM-dd").getTime())).toBe(true);
    });

    it("returns invalid date for undefined dateString", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(isNaN(parse(undefined as any, "yyyy-MM-dd").getTime())).toBe(true);
    });

    it("returns invalid date for null pattern", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(isNaN(parse("2024-01-15", null as any).getTime())).toBe(true);
    });

    it("returns invalid date for undefined pattern", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(isNaN(parse("2024-01-15", undefined as any).getTime())).toBe(true);
    });
  });

  describe("with localization", () => {
    const mockLocale: Locale = {
      era: {
        narrow: ["до н.э.", "н.э."],
        abbr: ["до н.э.", "н.э."],
        wide: ["до нашей эры", "нашей эры"],
      },
      month: {
        narrow: ["Я", "Ф", "М", "А", "М", "И", "И", "А", "С", "О", "Н", "Д"],
        abbr: [
          "янв", "фев", "мар", "апр", "мая", "июн",
          "июл", "авг", "сен", "окт", "ноя", "дек",
        ],
        wide: [
          "января", "февраля", "марта", "апреля", "мая", "июня",
          "июля", "августа", "сентября", "октября", "ноября", "декабря",
        ],
      },
      weekday: {
        narrow: ["В", "П", "В", "С", "Ч", "П", "С"],
        abbr: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        wide: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
      },
      dayPeriod: {
        narrow: ["д", "п"],
        abbr: ["ДП", "ПП"],
        wide: ["ДП (утро)", "ПП (вечер)"],
      },
    };

    it("parses localized month names", () => {
      const result = parse("15 января 2024", "dd MMMM yyyy", { locale: mockLocale });
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(15);
      expect(result.getFullYear()).toBe(2024);
    });

    it("parses localized day periods", () => {
      const result = parse("3:30 ПП", "h:mm a", { locale: mockLocale });
      expect(result.getHours()).toBe(15);
      expect(result.getMinutes()).toBe(30);
    });

    it("parses localized weekdays", () => {
      const result = parse("Пн", "EEE", { locale: mockLocale });
      expect(isNaN(result.getTime())).toBe(false);
    });
  });

  describe("reference date", () => {
    it("uses reference date for missing components", () => {
      const referenceDate = new Date(2024, 5, 15); // June 15, 2024
      const result = parse("14:30", "HH:mm", { referenceDate });
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(5);
      expect(result.getDate()).toBe(15);
      expect(result.getHours()).toBe(14);
      expect(result.getMinutes()).toBe(30);
    });

    it("uses current date as default reference", () => {
      const now = new Date();
      const result = parse("14:30", "HH:mm");
      expect(result.getFullYear()).toBe(now.getFullYear());
      expect(result.getMonth()).toBe(now.getMonth());
      expect(result.getDate()).toBe(now.getDate());
    });
  });
});