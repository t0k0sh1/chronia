import { describe, it, expect } from "vitest";
import { ja } from "../../../src/i18n/ja";

describe("ja Locale Data Structure", () => {
  describe("Data completeness", () => {
    it("should have all required properties", () => {
      expect(ja).toHaveProperty("era");
      expect(ja).toHaveProperty("month");
      expect(ja).toHaveProperty("weekday");
      expect(ja).toHaveProperty("dayPeriod");
    });

    it("should have all width options for era", () => {
      expect(ja.era).toHaveProperty("narrow");
      expect(ja.era).toHaveProperty("abbr");
      expect(ja.era).toHaveProperty("wide");
    });

    it("should have all width options for month", () => {
      expect(ja.month).toHaveProperty("narrow");
      expect(ja.month).toHaveProperty("abbr");
      expect(ja.month).toHaveProperty("wide");
    });

    it("should have all width options for weekday", () => {
      expect(ja.weekday).toHaveProperty("narrow");
      expect(ja.weekday).toHaveProperty("abbr");
      expect(ja.weekday).toHaveProperty("wide");
    });

    it("should have all width options for dayPeriod", () => {
      expect(ja.dayPeriod).toHaveProperty("narrow");
      expect(ja.dayPeriod).toHaveProperty("abbr");
      expect(ja.dayPeriod).toHaveProperty("wide");
    });
  });

  describe("Array element counts", () => {
    it("should have 2 era names for each width", () => {
      expect(ja.era.narrow).toHaveLength(2);
      expect(ja.era.abbr).toHaveLength(2);
      expect(ja.era.wide).toHaveLength(2);
    });

    it("should have 12 month names for each width", () => {
      expect(ja.month.narrow).toHaveLength(12);
      expect(ja.month.abbr).toHaveLength(12);
      expect(ja.month.wide).toHaveLength(12);
    });

    it("should have 7 weekday names for each width", () => {
      expect(ja.weekday.narrow).toHaveLength(7);
      expect(ja.weekday.abbr).toHaveLength(7);
      expect(ja.weekday.wide).toHaveLength(7);
    });

    it("should have 2 dayPeriod names for each width", () => {
      expect(ja.dayPeriod.narrow).toHaveLength(2);
      expect(ja.dayPeriod.abbr).toHaveLength(2);
      expect(ja.dayPeriod.wide).toHaveLength(2);
    });
  });

  describe("Era names", () => {
    it("should have correct narrow era names", () => {
      // date-fns compatible: BC/AC for narrow
      expect(ja.era.narrow).toEqual(["BC", "AC"]);
    });

    it("should have correct abbreviated era names", () => {
      // date-fns compatible: Japanese text for abbr
      expect(ja.era.abbr).toEqual(["紀元前", "西暦"]);
    });

    it("should have correct wide era names", () => {
      expect(ja.era.wide).toEqual(["紀元前", "西暦"]);
    });
  });

  describe("Month names", () => {
    it("should have correct narrow month names", () => {
      expect(ja.month.narrow).toEqual([
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
      ]);
    });

    it("should have correct abbreviated month names", () => {
      expect(ja.month.abbr).toEqual([
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ]);
    });

    it("should have correct wide month names", () => {
      expect(ja.month.wide).toEqual([
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ]);
    });

    it("should have same values for abbreviated and wide month names (Japanese locale characteristic)", () => {
      expect(ja.month.abbr).toEqual(ja.month.wide);
    });
  });

  describe("Weekday names", () => {
    it("should have correct narrow weekday names", () => {
      expect(ja.weekday.narrow).toEqual(["日", "月", "火", "水", "木", "金", "土"]);
    });

    it("should have correct abbreviated weekday names", () => {
      expect(ja.weekday.abbr).toEqual(["日", "月", "火", "水", "木", "金", "土"]);
    });

    it("should have correct wide weekday names", () => {
      expect(ja.weekday.wide).toEqual([
        "日曜日",
        "月曜日",
        "火曜日",
        "水曜日",
        "木曜日",
        "金曜日",
        "土曜日",
      ]);
    });

    it("should have same values for narrow and abbreviated weekday names (Japanese locale characteristic)", () => {
      expect(ja.weekday.narrow).toEqual(ja.weekday.abbr);
    });
  });

  describe("Day period names", () => {
    it("should have correct narrow day period names", () => {
      expect(ja.dayPeriod.narrow).toEqual(["午前", "午後"]);
    });

    it("should have correct abbreviated day period names", () => {
      expect(ja.dayPeriod.abbr).toEqual(["午前", "午後"]);
    });

    it("should have correct wide day period names", () => {
      expect(ja.dayPeriod.wide).toEqual(["午前", "午後"]);
    });

    it("should have same values for all widths (Japanese locale characteristic)", () => {
      expect(ja.dayPeriod.narrow).toEqual(ja.dayPeriod.abbr);
      expect(ja.dayPeriod.abbr).toEqual(ja.dayPeriod.wide);
    });
  });
});
