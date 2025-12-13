import { describe, it, expect } from "vitest";
import { createFormatter } from "../src";
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

describe("createFormatter", () => {
  describe("basic formatting", () => {
    it("formats dates with ISO pattern", () => {
      const formatISO = createFormatter("yyyy-MM-dd");
      expect(formatISO(new Date(2024, 0, 15))).toBe("2024-01-15");
      expect(formatISO(new Date(2024, 11, 31))).toBe("2024-12-31");
    });

    it("formats dates with time pattern", () => {
      const formatTime = createFormatter("HH:mm:ss");
      expect(formatTime(new Date(2024, 0, 1, 14, 30, 45))).toBe("14:30:45");
      expect(formatTime(new Date(2024, 0, 1, 0, 0, 0))).toBe("00:00:00");
    });

    it("formats dates with datetime pattern", () => {
      const formatDateTime = createFormatter("yyyy-MM-dd HH:mm:ss");
      expect(formatDateTime(new Date(2024, 0, 15, 14, 30, 45))).toBe(
        "2024-01-15 14:30:45",
      );
    });

    it("formats dates with complex pattern", () => {
      const formatComplex = createFormatter("yyyy/MM/dd'T'HH:mm:ss.SSS");
      expect(formatComplex(new Date(2024, 0, 15, 14, 30, 45, 123))).toBe(
        "2024/01/15T14:30:45.123",
      );
    });
  });

  describe("locale support", () => {
    it("uses locale for month names", () => {
      const formatMonth = createFormatter("MMMM yyyy", mockLocale);
      expect(formatMonth(new Date(2024, 0, 15))).toBe("January 2024");
      expect(formatMonth(new Date(2024, 11, 15))).toBe("December 2024");
    });

    it("uses locale for weekday names", () => {
      const formatWeekday = createFormatter("EEEE, yyyy-MM-dd", mockLocale);
      expect(formatWeekday(new Date(2024, 0, 15))).toBe("Monday, 2024-01-15");
    });

    it("uses locale for day periods", () => {
      const format12h = createFormatter("h:mm a", mockLocale);
      expect(format12h(new Date(2024, 0, 1, 14, 30))).toBe("2:30 PM");
      expect(format12h(new Date(2024, 0, 1, 9, 15))).toBe("9:15 AM");
    });
  });

  describe("invalid pattern handling", () => {
    it("throws TypeError for null pattern", () => {
      expect(() => createFormatter(null as unknown as string)).toThrow(
        TypeError,
      );
      expect(() => createFormatter(null as unknown as string)).toThrow(
        "Pattern must be a string",
      );
    });

    it("throws TypeError for undefined pattern", () => {
      expect(() => createFormatter(undefined as unknown as string)).toThrow(
        TypeError,
      );
      expect(() => createFormatter(undefined as unknown as string)).toThrow(
        "Pattern must be a string",
      );
    });

    it("throws TypeError for number pattern", () => {
      expect(() => createFormatter(123 as unknown as string)).toThrow(
        TypeError,
      );
      expect(() => createFormatter(123 as unknown as string)).toThrow(
        "Pattern must be a string",
      );
    });

    it("throws TypeError for object pattern", () => {
      expect(() => createFormatter({} as unknown as string)).toThrow(TypeError);
      expect(() => createFormatter({} as unknown as string)).toThrow(
        "Pattern must be a string",
      );
    });
  });

  describe("invalid date handling", () => {
    it('returns "Invalid Date" for null date', () => {
      const formatter = createFormatter("yyyy-MM-dd");
      expect(formatter(null as unknown as Date)).toBe("Invalid Date");
    });

    it('returns "Invalid Date" for undefined date', () => {
      const formatter = createFormatter("yyyy-MM-dd");
      expect(formatter(undefined as unknown as Date)).toBe("Invalid Date");
    });

    it('returns "Invalid Date" for Invalid Date object', () => {
      const formatter = createFormatter("yyyy-MM-dd");
      expect(formatter(new Date(NaN))).toBe("Invalid Date");
    });

    it('returns "Invalid Date" for non-Date object', () => {
      const formatter = createFormatter("yyyy-MM-dd");
      expect(formatter("2024-01-15" as unknown as Date)).toBe("Invalid Date");
    });
  });

  describe("reusability", () => {
    it("can be reused for multiple dates", () => {
      const formatter = createFormatter("yyyy-MM-dd");
      const dates = [
        new Date(2024, 0, 1),
        new Date(2024, 5, 15),
        new Date(2024, 11, 31),
      ];
      const results = dates.map((d) => formatter(d));
      expect(results).toEqual(["2024-01-01", "2024-06-15", "2024-12-31"]);
    });

    it("returns consistent results across multiple calls", () => {
      const formatter = createFormatter("yyyy-MM-dd HH:mm:ss");
      const date = new Date(2024, 0, 15, 14, 30, 45);
      expect(formatter(date)).toBe("2024-01-15 14:30:45");
      expect(formatter(date)).toBe("2024-01-15 14:30:45");
      expect(formatter(date)).toBe("2024-01-15 14:30:45");
    });
  });
});
