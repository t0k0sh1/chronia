import { describe, it, expect } from "vitest";
import { formatYear } from "../../../../src/_lib/formatters/tokens/year";

describe("formatYear (current implementation)", () => {
  it.each([
    // --- 通常ケース ---
    { year: 2025, token: "yyyy", expected: "2025" },
    { year: 2025, token: "yy", expected: "25" },
    { year: 2025, token: "y", expected: "2025" },

    // --- 境界値: 西暦1年 ---
    { year: 1, token: "yyyy", expected: "0001" },
    { year: 1, token: "yy", expected: "01" },
    { year: 1, token: "y", expected: "1" },

    // --- 境界値: 西暦9年 ---
    { year: 9, token: "yyyy", expected: "0009" },
    { year: 9, token: "yy", expected: "09" },
    { year: 9, token: "y", expected: "9" },

    // --- 2桁年: 西暦12年 ---
    { year: 12, token: "yyyy", expected: "0012" },
    { year: 12, token: "yy", expected: "12" },
    { year: 12, token: "y", expected: "12" },

    // --- 3桁年: 西暦123年 ---
    { year: 123, token: "yyyy", expected: "0123" },
    { year: 123, token: "yy", expected: "23" },
    { year: 123, token: "y", expected: "123" },

    // --- 4桁年: 西暦2025年 (再確認) ---
    { year: 2025, token: "yyyy", expected: "2025" },
    { year: 2025, token: "yy", expected: "25" },
    { year: 2025, token: "y", expected: "2025" },

    // --- 5桁以上: 西暦12345年 ---
    { year: 12345, token: "yyyy", expected: "12345" },
    { year: 12345, token: "yy", expected: "45" },
    { year: 12345, token: "y", expected: "12345" },

    // --- 紀元前1年 (year=0) ---
    { year: 0, token: "yyyy", expected: "0001" },
    { year: 0, token: "yy", expected: "01" },
    { year: 0, token: "y", expected: "1" },

    // --- 紀元前2年 (year=-1) ---
    { year: -1, token: "yyyy", expected: "0002" },
    { year: -1, token: "yy", expected: "02" },
    { year: -1, token: "y", expected: "2" },

    // --- 紀元前999年 (year=-998, 表示999) ---
    { year: -998, token: "yyyy", expected: "0999" },
    { year: -998, token: "yy", expected: "99" },
    { year: -998, token: "y", expected: "999" },
  ])("year=$year token=$token => $expected", ({ year, token, expected }) => {
    const d = new Date(0, 0, 1);
    d.setFullYear(year);
    expect(formatYear(d, token)).toBe(expected);
  });
});
