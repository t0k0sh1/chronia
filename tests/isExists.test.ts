import { describe, it, expect } from "vitest";
import { isExists } from "../src/isExists";

describe("isExists", () => {
  // Test Category 1: Edge Cases - Leap Year Detection (Highest Priority)
  describe("leap year edge cases", () => {
    it.each([
      {
        year: 2024,
        month: 2,
        day: 29,
        expected: true,
        desc: "2024/2/29 - 4年ルール(閏年)",
      },
      {
        year: 2000,
        month: 2,
        day: 29,
        expected: true,
        desc: "2000/2/29 - 400年ルール(閏年)",
      },
      {
        year: 1900,
        month: 2,
        day: 29,
        expected: false,
        desc: "1900/2/29 - 100年ルール(平年)",
      },
      {
        year: 2100,
        month: 2,
        day: 29,
        expected: false,
        desc: "2100/2/29 - 100年ルール(平年)",
      },
      {
        year: 2023,
        month: 2,
        day: 29,
        expected: false,
        desc: "2023/2/29 - 平年の2月29日",
      },
      {
        year: 2024,
        month: 2,
        day: 28,
        expected: true,
        desc: "2024/2/28 - 閏年の2月28日",
      },
      {
        year: 2023,
        month: 2,
        day: 28,
        expected: true,
        desc: "2023/2/28 - 平年の2月28日",
      },
    ])("$desc", ({ year, month, day, expected }) => {
      expect(isExists(year, month, day)).toBe(expected);
    });
  });

  // Test Category 2: Edge Cases - Month Boundary Values (Highest Priority)
  describe("month boundary values", () => {
    it.each([
      // January (31 days)
      { year: 2024, month: 1, day: 1, expected: true, desc: "1月1日(境界値)" },
      { year: 2024, month: 1, day: 31, expected: true, desc: "1月31日(境界値)" },
      {
        year: 2024,
        month: 1,
        day: 32,
        expected: false,
        desc: "1月32日(範囲外)",
      },
      // February (28/29 days) - covered in leap year tests
      { year: 2023, month: 2, day: 1, expected: true, desc: "2月1日(境界値)" },
      {
        year: 2023,
        month: 2,
        day: 28,
        expected: true,
        desc: "平年2月28日(境界値)",
      },
      {
        year: 2023,
        month: 2,
        day: 29,
        expected: false,
        desc: "平年2月29日(範囲外)",
      },
      {
        year: 2023,
        month: 2,
        day: 30,
        expected: false,
        desc: "2月30日(範囲外)",
      },
      // March (31 days)
      { year: 2024, month: 3, day: 1, expected: true, desc: "3月1日(境界値)" },
      { year: 2024, month: 3, day: 31, expected: true, desc: "3月31日(境界値)" },
      {
        year: 2024,
        month: 3,
        day: 32,
        expected: false,
        desc: "3月32日(範囲外)",
      },
      // April (30 days)
      { year: 2024, month: 4, day: 1, expected: true, desc: "4月1日(境界値)" },
      { year: 2024, month: 4, day: 30, expected: true, desc: "4月30日(境界値)" },
      {
        year: 2024,
        month: 4,
        day: 31,
        expected: false,
        desc: "4月31日(範囲外)",
      },
      // May (31 days)
      { year: 2024, month: 5, day: 1, expected: true, desc: "5月1日(境界値)" },
      { year: 2024, month: 5, day: 31, expected: true, desc: "5月31日(境界値)" },
      {
        year: 2024,
        month: 5,
        day: 32,
        expected: false,
        desc: "5月32日(範囲外)",
      },
      // June (30 days)
      { year: 2024, month: 6, day: 1, expected: true, desc: "6月1日(境界値)" },
      { year: 2024, month: 6, day: 30, expected: true, desc: "6月30日(境界値)" },
      {
        year: 2024,
        month: 6,
        day: 31,
        expected: false,
        desc: "6月31日(範囲外)",
      },
      // July (31 days)
      { year: 2024, month: 7, day: 1, expected: true, desc: "7月1日(境界値)" },
      { year: 2024, month: 7, day: 31, expected: true, desc: "7月31日(境界値)" },
      {
        year: 2024,
        month: 7,
        day: 32,
        expected: false,
        desc: "7月32日(範囲外)",
      },
      // August (31 days)
      { year: 2024, month: 8, day: 1, expected: true, desc: "8月1日(境界値)" },
      { year: 2024, month: 8, day: 31, expected: true, desc: "8月31日(境界値)" },
      {
        year: 2024,
        month: 8,
        day: 32,
        expected: false,
        desc: "8月32日(範囲外)",
      },
      // September (30 days)
      { year: 2024, month: 9, day: 1, expected: true, desc: "9月1日(境界値)" },
      { year: 2024, month: 9, day: 30, expected: true, desc: "9月30日(境界値)" },
      {
        year: 2024,
        month: 9,
        day: 31,
        expected: false,
        desc: "9月31日(範囲外)",
      },
      // October (31 days)
      { year: 2024, month: 10, day: 1, expected: true, desc: "10月1日(境界値)" },
      {
        year: 2024,
        month: 10,
        day: 31,
        expected: true,
        desc: "10月31日(境界値)",
      },
      {
        year: 2024,
        month: 10,
        day: 32,
        expected: false,
        desc: "10月32日(範囲外)",
      },
      // November (30 days)
      { year: 2024, month: 11, day: 1, expected: true, desc: "11月1日(境界値)" },
      {
        year: 2024,
        month: 11,
        day: 30,
        expected: true,
        desc: "11月30日(境界値)",
      },
      {
        year: 2024,
        month: 11,
        day: 31,
        expected: false,
        desc: "11月31日(範囲外)",
      },
      // December (31 days)
      { year: 2024, month: 12, day: 1, expected: true, desc: "12月1日(境界値)" },
      {
        year: 2024,
        month: 12,
        day: 31,
        expected: true,
        desc: "12月31日(境界値)",
      },
      {
        year: 2024,
        month: 12,
        day: 32,
        expected: false,
        desc: "12月32日(範囲外)",
      },
    ])("$desc", ({ year, month, day, expected }) => {
      expect(isExists(year, month, day)).toBe(expected);
    });
  });

  // Test Category 3: Edge Cases - Day Boundary Values (Highest Priority)
  describe("day boundary values", () => {
    it.each([
      { year: 2024, month: 1, day: 0, expected: false, desc: "0日(範囲外)" },
      { year: 2024, month: 1, day: 1, expected: true, desc: "1日(最小境界値)" },
      {
        year: 2024,
        month: 1,
        day: 31,
        expected: true,
        desc: "31日(1月の最大境界値)",
      },
      {
        year: 2024,
        month: 1,
        day: 32,
        expected: false,
        desc: "32日(範囲外)",
      },
      {
        year: 2024,
        month: 4,
        day: 30,
        expected: true,
        desc: "30日(4月の最大境界値)",
      },
      {
        year: 2024,
        month: 4,
        day: 31,
        expected: false,
        desc: "31日(4月の範囲外)",
      },
    ])("$desc", ({ year, month, day, expected }) => {
      expect(isExists(year, month, day)).toBe(expected);
    });
  });

  // Test Category 4: Edge Cases - Month Boundary Values (Highest Priority)
  describe("month boundary values", () => {
    it.each([
      { year: 2024, month: 0, day: 1, expected: false, desc: "0月(範囲外)" },
      { year: 2024, month: 1, day: 1, expected: true, desc: "1月(最小境界値)" },
      {
        year: 2024,
        month: 12,
        day: 1,
        expected: true,
        desc: "12月(最大境界値)",
      },
      { year: 2024, month: 13, day: 1, expected: false, desc: "13月(範囲外)" },
      {
        year: 2024,
        month: -1,
        day: 1,
        expected: false,
        desc: "-1月(範囲外)",
      },
    ])("$desc", ({ year, month, day, expected }) => {
      expect(isExists(year, month, day)).toBe(expected);
    });
  });

  // Test Category 5: Invalid Inputs - NaN (High Priority)
  describe("invalid inputs - NaN", () => {
    it.each([
      { year: NaN, month: 1, day: 1, expected: false, desc: "NaN年" },
      { year: 2024, month: NaN, day: 1, expected: false, desc: "NaN月" },
      { year: 2024, month: 1, day: NaN, expected: false, desc: "NaN日" },
      {
        year: NaN,
        month: NaN,
        day: NaN,
        expected: false,
        desc: "全てNaN",
      },
    ])("$desc", ({ year, month, day, expected }) => {
      expect(isExists(year, month, day)).toBe(expected);
    });
  });

  // Test Category 6: Invalid Inputs - Infinity (High Priority)
  describe("invalid inputs - Infinity", () => {
    it.each([
      {
        year: Infinity,
        month: 1,
        day: 1,
        expected: false,
        desc: "Infinity年",
      },
      {
        year: 2024,
        month: Infinity,
        day: 1,
        expected: false,
        desc: "Infinity月",
      },
      {
        year: 2024,
        month: 1,
        day: Infinity,
        expected: false,
        desc: "Infinity日",
      },
      {
        year: -Infinity,
        month: 1,
        day: 1,
        expected: false,
        desc: "-Infinity年",
      },
      {
        year: 2024,
        month: -Infinity,
        day: 1,
        expected: false,
        desc: "-Infinity月",
      },
      {
        year: 2024,
        month: 1,
        day: -Infinity,
        expected: false,
        desc: "-Infinity日",
      },
      {
        year: Infinity,
        month: Infinity,
        day: Infinity,
        expected: false,
        desc: "全てInfinity",
      },
      {
        year: -Infinity,
        month: -Infinity,
        day: -Infinity,
        expected: false,
        desc: "全て-Infinity",
      },
    ])("$desc", ({ year, month, day, expected }) => {
      expect(isExists(year, month, day)).toBe(expected);
    });
  });

  // Test Category 7: Edge Cases - Fractional Values (High Priority)
  describe("fractional inputs", () => {
    it.each([
      {
        year: 2024.9,
        month: 1,
        day: 15,
        expected: true,
        desc: "小数年(整数部2024使用)",
      },
      {
        year: 2024,
        month: 1.7,
        day: 15,
        expected: true,
        desc: "小数月(整数部1使用)",
      },
      {
        year: 2024,
        month: 1,
        day: 15.3,
        expected: true,
        desc: "小数日(整数部15使用)",
      },
      {
        year: 2024.5,
        month: 2.9,
        day: 29.1,
        expected: true,
        desc: "全て小数(2024/2/29として処理)",
      },
      {
        year: 2023.9,
        month: 2.9,
        day: 29.1,
        expected: false,
        desc: "全て小数(2023/2/29は存在しない)",
      },
      {
        year: 2024,
        month: 4.9,
        day: 31.1,
        expected: false,
        desc: "小数で4月31日(存在しない)",
      },
      {
        year: 2024,
        month: 1.9,
        day: 31.9,
        expected: true,
        desc: "小数で1月31日(存在する)",
      },
    ])("$desc", ({ year, month, day, expected }) => {
      expect(isExists(year, month, day)).toBe(expected);
    });
  });

  // Test Category 8: Happy Path - Valid Dates (Minimum Necessary)
  describe("valid dates", () => {
    it.each([
      {
        year: 2024,
        month: 1,
        day: 15,
        expected: true,
        desc: "通常の有効な日付(2024/1/15)",
      },
      {
        year: 2024,
        month: 6,
        day: 15,
        expected: true,
        desc: "年央の有効な日付(2024/6/15)",
      },
      {
        year: 2024,
        month: 12,
        day: 31,
        expected: true,
        desc: "年末の有効な日付(2024/12/31)",
      },
    ])("$desc", ({ year, month, day, expected }) => {
      expect(isExists(year, month, day)).toBe(expected);
    });
  });

  // Test Category 9: Invalid Dates - Non-existent Dates (High Priority)
  describe("non-existent dates", () => {
    it.each([
      {
        year: 2024,
        month: 2,
        day: 30,
        expected: false,
        desc: "2月30日(存在しない)",
      },
      {
        year: 2024,
        month: 2,
        day: 31,
        expected: false,
        desc: "2月31日(存在しない)",
      },
      {
        year: 2024,
        month: 4,
        day: 31,
        expected: false,
        desc: "4月31日(存在しない)",
      },
      {
        year: 2024,
        month: 6,
        day: 31,
        expected: false,
        desc: "6月31日(存在しない)",
      },
      {
        year: 2024,
        month: 9,
        day: 31,
        expected: false,
        desc: "9月31日(存在しない)",
      },
      {
        year: 2024,
        month: 11,
        day: 31,
        expected: false,
        desc: "11月31日(存在しない)",
      },
      {
        year: 2024,
        month: 13,
        day: 1,
        expected: false,
        desc: "13月1日(13月は存在しない)",
      },
    ])("$desc", ({ year, month, day, expected }) => {
      expect(isExists(year, month, day)).toBe(expected);
    });
  });

  // Test Category 10: Edge Cases - Special Years (High Priority)
  describe("special years", () => {
    it.each([
      {
        year: 0,
        month: 1,
        day: 1,
        expected: true,
        desc: "0年1月1日(JavaScript Date対応)",
      },
      {
        year: -1,
        month: 1,
        day: 1,
        expected: true,
        desc: "負の年(-1年1月1日)",
      },
      {
        year: 9999,
        month: 12,
        day: 31,
        expected: true,
        desc: "遠い未来(9999年12月31日)",
      },
    ])("$desc", ({ year, month, day, expected }) => {
      expect(isExists(year, month, day)).toBe(expected);
    });
  });

  // Test Category 11: Edge Cases - Negative Values (High Priority)
  describe("negative values", () => {
    it.each([
      {
        year: 2024,
        month: -1,
        day: 1,
        expected: false,
        desc: "負の月(-1月)",
      },
      {
        year: 2024,
        month: 1,
        day: -1,
        expected: false,
        desc: "負の日(-1日)",
      },
      {
        year: -2024,
        month: 1,
        day: 1,
        expected: true,
        desc: "負の年(紀元前2024年1月1日)",
      },
    ])("$desc", ({ year, month, day, expected }) => {
      expect(isExists(year, month, day)).toBe(expected);
    });
  });
});
