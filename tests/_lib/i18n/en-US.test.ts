import { describe, it, expect } from "vitest";
import { enUS } from "../../../src/i18n/en-US";

describe("en-US Locale Data", () => {
  describe("structure completeness", () => {
    it("should have all required properties", () => {
      expect(enUS).toHaveProperty("era");
      expect(enUS).toHaveProperty("month");
      expect(enUS).toHaveProperty("weekday");
      expect(enUS).toHaveProperty("dayPeriod");
    });

    it("should have all width properties for era", () => {
      expect(enUS.era).toHaveProperty("narrow");
      expect(enUS.era).toHaveProperty("abbr");
      expect(enUS.era).toHaveProperty("wide");
    });

    it("should have all width properties for month", () => {
      expect(enUS.month).toHaveProperty("narrow");
      expect(enUS.month).toHaveProperty("abbr");
      expect(enUS.month).toHaveProperty("wide");
    });

    it("should have all width properties for weekday", () => {
      expect(enUS.weekday).toHaveProperty("narrow");
      expect(enUS.weekday).toHaveProperty("abbr");
      expect(enUS.weekday).toHaveProperty("wide");
    });

    it("should have all width properties for dayPeriod", () => {
      expect(enUS.dayPeriod).toHaveProperty("narrow");
      expect(enUS.dayPeriod).toHaveProperty("abbr");
      expect(enUS.dayPeriod).toHaveProperty("wide");
    });
  });

  describe("array lengths", () => {
    it("should have 2 era names for each width", () => {
      expect(enUS.era.narrow).toHaveLength(2);
      expect(enUS.era.abbr).toHaveLength(2);
      expect(enUS.era.wide).toHaveLength(2);
    });

    it("should have 12 month names for each width", () => {
      expect(enUS.month.narrow).toHaveLength(12);
      expect(enUS.month.abbr).toHaveLength(12);
      expect(enUS.month.wide).toHaveLength(12);
    });

    it("should have 7 weekday names for each width", () => {
      expect(enUS.weekday.narrow).toHaveLength(7);
      expect(enUS.weekday.abbr).toHaveLength(7);
      expect(enUS.weekday.wide).toHaveLength(7);
    });

    it("should have 2 day period names for each width", () => {
      expect(enUS.dayPeriod.narrow).toHaveLength(2);
      expect(enUS.dayPeriod.abbr).toHaveLength(2);
      expect(enUS.dayPeriod.wide).toHaveLength(2);
    });
  });

  describe("era data values", () => {
    it("should have correct narrow era names", () => {
      expect(enUS.era.narrow).toEqual(["B", "A"]);
    });

    it("should have correct abbreviated era names", () => {
      expect(enUS.era.abbr).toEqual(["BC", "AD"]);
    });

    it("should have correct wide era names", () => {
      expect(enUS.era.wide).toEqual(["Before Christ", "Anno Domini"]);
    });
  });

  describe("month data values", () => {
    it("should have correct narrow month names", () => {
      expect(enUS.month.narrow).toEqual([
        "J",
        "F",
        "M",
        "A",
        "M",
        "J",
        "J",
        "A",
        "S",
        "O",
        "N",
        "D",
      ]);
    });

    it("should have correct abbreviated month names", () => {
      expect(enUS.month.abbr).toEqual([
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
      ]);
    });

    it("should have correct wide month names", () => {
      expect(enUS.month.wide).toEqual([
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
      ]);
    });
  });

  describe("weekday data values", () => {
    it("should have correct narrow weekday names", () => {
      expect(enUS.weekday.narrow).toEqual(["S", "M", "T", "W", "T", "F", "S"]);
    });

    it("should have correct abbreviated weekday names", () => {
      expect(enUS.weekday.abbr).toEqual([
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
      ]);
    });

    it("should have correct wide weekday names", () => {
      expect(enUS.weekday.wide).toEqual([
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ]);
    });
  });

  describe("dayPeriod data values", () => {
    it("should have correct narrow day period names", () => {
      expect(enUS.dayPeriod.narrow).toEqual(["a", "p"]);
    });

    it("should have correct abbreviated day period names", () => {
      expect(enUS.dayPeriod.abbr).toEqual(["AM", "PM"]);
    });

    it("should have correct wide day period names", () => {
      expect(enUS.dayPeriod.wide).toEqual(["a.m.", "p.m."]);
    });
  });
});
