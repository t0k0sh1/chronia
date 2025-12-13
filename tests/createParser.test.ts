import { describe, it, expect } from "vitest";
import { createParser } from "../src";
import { Locale } from "../src/types";

const mockLocale: Locale = {
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
    wide: ["ante meridiem", "post meridiem"],
  },
};

describe("createParser", () => {
  describe("basic parsing", () => {
    it("parses dates with ISO pattern", () => {
      const parseISO = createParser("yyyy-MM-dd");
      expect(parseISO("2024-01-15")).toEqual(new Date(2024, 0, 15, 0, 0, 0, 0));
      expect(parseISO("2024-12-31")).toEqual(
        new Date(2024, 11, 31, 0, 0, 0, 0),
      );
    });

    it("parses dates with time pattern", () => {
      const parseTime = createParser("HH:mm:ss");
      const result = parseTime("14:30:45");
      expect(result.getHours()).toBe(14);
      expect(result.getMinutes()).toBe(30);
      expect(result.getSeconds()).toBe(45);
    });

    it("parses dates with datetime pattern", () => {
      const parseDateTime = createParser("yyyy-MM-dd HH:mm:ss");
      expect(parseDateTime("2024-01-15 14:30:45")).toEqual(
        new Date(2024, 0, 15, 14, 30, 45, 0),
      );
    });

    it("parses dates with complex pattern", () => {
      const parseComplex = createParser("yyyy/MM/dd'T'HH:mm:ss.SSS");
      expect(parseComplex("2024/01/15T14:30:45.123")).toEqual(
        new Date(2024, 0, 15, 14, 30, 45, 123),
      );
    });
  });

  describe("default locale support", () => {
    it("uses default locale for month names", () => {
      const parseMonth = createParser("MMMM yyyy", { locale: mockLocale });
      const result = parseMonth("January 2024");
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(0);
    });

    it("uses default locale for day periods", () => {
      const parse12h = createParser("h:mm a", { locale: mockLocale });
      const result = parse12h("2:30 PM");
      expect(result.getHours()).toBe(14);
      expect(result.getMinutes()).toBe(30);
    });
  });

  describe("default referenceDate support", () => {
    it("uses default referenceDate for missing date components", () => {
      const refDate = new Date(2024, 5, 15);
      const parseTime = createParser("HH:mm", { referenceDate: refDate });
      const result = parseTime("14:30");
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(5);
      expect(result.getDate()).toBe(15);
      expect(result.getHours()).toBe(14);
      expect(result.getMinutes()).toBe(30);
    });

    it("uses default referenceDate for year-only pattern", () => {
      const refDate = new Date(2020, 3, 10);
      const parseYear = createParser("yyyy", { referenceDate: refDate });
      const result = parseYear("2024");
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(3);
      expect(result.getDate()).toBe(10);
    });
  });

  describe("per-call option overrides", () => {
    it("overrides default locale per call", () => {
      const parseMonth = createParser("MMMM yyyy");
      const result = parseMonth("January 2024", { locale: mockLocale });
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(0);
    });

    it("overrides default referenceDate per call", () => {
      const defaultRef = new Date(2020, 0, 1);
      const callRef = new Date(2024, 5, 15);
      const parseTime = createParser("HH:mm", { referenceDate: defaultRef });
      const result = parseTime("14:30", { referenceDate: callRef });
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(5);
      expect(result.getDate()).toBe(15);
    });

    it("merges options with call options taking precedence", () => {
      const defaultRef = new Date(2020, 0, 1);
      const callRef = new Date(2024, 5, 15);
      const parseMonth = createParser("MMMM HH:mm", {
        locale: mockLocale,
        referenceDate: defaultRef,
      });
      const result = parseMonth("January 14:30", { referenceDate: callRef });
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(0);
      // Note: month parsing resets day to 1 to prevent date rollover
      expect(result.getDate()).toBe(1);
      expect(result.getHours()).toBe(14);
    });
  });

  describe("invalid pattern handling", () => {
    it("throws TypeError for null pattern", () => {
      expect(() => createParser(null as unknown as string)).toThrow(TypeError);
      expect(() => createParser(null as unknown as string)).toThrow(
        "Pattern must be a string",
      );
    });

    it("throws TypeError for undefined pattern", () => {
      expect(() => createParser(undefined as unknown as string)).toThrow(
        TypeError,
      );
      expect(() => createParser(undefined as unknown as string)).toThrow(
        "Pattern must be a string",
      );
    });

    it("throws TypeError for number pattern", () => {
      expect(() => createParser(123 as unknown as string)).toThrow(TypeError);
      expect(() => createParser(123 as unknown as string)).toThrow(
        "Pattern must be a string",
      );
    });

    it("throws TypeError for object pattern", () => {
      expect(() => createParser({} as unknown as string)).toThrow(TypeError);
      expect(() => createParser({} as unknown as string)).toThrow(
        "Pattern must be a string",
      );
    });
  });

  describe("invalid dateString handling", () => {
    it("returns Invalid Date for mismatched pattern", () => {
      const parser = createParser("yyyy-MM-dd");
      const result = parser("15/01/2024");
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("returns Invalid Date for invalid values", () => {
      const parser = createParser("yyyy-MM-dd");
      const result = parser("2024-13-01");
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("returns Invalid Date for extra characters", () => {
      const parser = createParser("yyyy-MM-dd");
      const result = parser("2024-01-15extra");
      expect(isNaN(result.getTime())).toBe(true);
    });

    it("returns Invalid Date for non-string input", () => {
      const parser = createParser("yyyy-MM-dd");
      const result = parser(12345 as unknown as string);
      expect(isNaN(result.getTime())).toBe(true);
    });
  });

  describe("reusability", () => {
    it("can be reused for multiple date strings", () => {
      const parser = createParser("yyyy-MM-dd");
      const strings = ["2024-01-01", "2024-06-15", "2024-12-31"];
      const results = strings.map((s) => parser(s));
      expect(results).toEqual([
        new Date(2024, 0, 1, 0, 0, 0, 0),
        new Date(2024, 5, 15, 0, 0, 0, 0),
        new Date(2024, 11, 31, 0, 0, 0, 0),
      ]);
    });

    it("returns consistent results across multiple calls", () => {
      const parser = createParser("yyyy-MM-dd HH:mm:ss");
      const expected = new Date(2024, 0, 15, 14, 30, 45, 0);
      expect(parser("2024-01-15 14:30:45")).toEqual(expected);
      expect(parser("2024-01-15 14:30:45")).toEqual(expected);
      expect(parser("2024-01-15 14:30:45")).toEqual(expected);
    });
  });
});
