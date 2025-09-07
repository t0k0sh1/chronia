import { describe, it, expect } from "vitest";
import { format } from "../src";
import { Localize } from "../src/_lib/types";

// モック localize
const mockLocalize: Localize = {
  era: (era, options) => {
    if (options?.width === "narrow") return era ? "A" : "B";
    if (options?.width === "wide") return era ? "Anno Domini" : "Before Christ";
    return era ? "AD" : "BC";
  },
  month: () => "",
  day: () => "",
  dayPeriod: (period, options) => {
    if (options?.width === "narrow") return period === "am" ? "a" : "p";
    if (options?.width === "wide")
      return period === "am" ? "ante meridiem" : "post meridiem";
    return period === "am" ? "AM" : "PM";
  },
};

describe("format - year tokens", () => {
  it.each([
    // AD
    [2025, "yyyy", "2025"],
    [2025, "yy", "25"],
    [2025, "y", "2025"],
    [9, "yyyy", "0009"],
    [9, "yy", "09"],
    [9, "y", "9"],
    [999, "yyyy", "0999"],
    [999, "yy", "99"],
    [999, "y", "999"],
    [12345, "yyyy", "12345"],
    [12345, "yy", "45"],
    [12345, "y", "12345"],
    // BC (ISO: 0 = 1 BC, -1 = 2 BC, -999 = 1000 BC)
    [0, "yyyy", "0001"], // 1 BC
    [0, "yy", "01"],
    [0, "y", "1"],
    [-1, "yyyy", "0002"], // 2 BC
    [-1, "yy", "02"],
    [-1, "y", "2"],
    [-999, "yyyy", "1000"], // 1000 BC
    [-999, "yy", "00"],
    [-999, "y", "1000"],
  ])("year %s with pattern %s → %s", (year, pattern, expected) => {
    const d = new Date(0, 0, 1);
    d.setFullYear(year);
    expect(format(d, pattern)).toBe(expected);
  });

  it("can combine with text", () => {
    const d = new Date(2025, 8, 6);
    expect(format(d, "yyyy")).toBe("2025");
    expect(format(d, "yy年")).toBe("25年");
  });
});

describe("format - month tokens", () => {
  it.each([
    [new Date(2025, 0, 1), "M", "1"],
    [new Date(2025, 8, 6), "M", "9"],
    [new Date(2025, 11, 31), "M", "12"],
    [new Date(2025, 0, 1), "MM", "01"],
    [new Date(2025, 8, 6), "MM", "09"],
    [new Date(2025, 11, 31), "MM", "12"],
  ])("date %s with pattern %s → %s", (date, pattern, expected) => {
    expect(format(date, pattern)).toBe(expected);
  });

  it("can combine year and month tokens", () => {
    const d = new Date(2025, 8, 6);
    expect(format(d, "yyyy-MM")).toBe("2025-09");
    expect(format(d, "yy/M")).toBe("25/9");
  });
});

describe("format - day tokens", () => {
  it.each([
    [new Date(2025, 0, 5), "d", "5"],
    [new Date(2025, 0, 5), "dd", "05"],
    [new Date(2025, 8, 15), "d", "15"],
    [new Date(2025, 8, 15), "dd", "15"],
    [new Date(2024, 1, 29), "d", "29"], // leap year
    [new Date(2024, 1, 29), "dd", "29"], // leap year
    [new Date(2023, 1, 28), "d", "28"], // non-leap year
    [new Date(2023, 1, 28), "dd", "28"], // non-leap year
  ])("date %s with pattern %s → %s", (date, pattern, expected) => {
    expect(format(date, pattern)).toBe(expected);
  });

  it("can combine with year and month", () => {
    const d = new Date(2025, 8, 6); // Sep 6, 2025
    expect(format(d, "yyyy-MM-dd")).toBe("2025-09-06");
    expect(format(d, "yy/M/d")).toBe("25/9/6");
  });
});

describe("format - era tokens", () => {
  it.each([
    // --- fallback ---
    { year: 2025, token: "G", localize: undefined, expected: "AD" },
    { year: 0, token: "G", localize: undefined, expected: "BC" },

    // --- localize abbreviated ---
    { year: 2025, token: "G", localize: mockLocalize, expected: "AD" },
    { year: -1, token: "G", localize: mockLocalize, expected: "BC" },

    // --- localize wide ---
    {
      year: 2025,
      token: "GGGG",
      localize: mockLocalize,
      expected: "Anno Domini",
    },
    {
      year: -1,
      token: "GGGG",
      localize: mockLocalize,
      expected: "Before Christ",
    },

    // --- localize narrow ---
    { year: 2025, token: "GGGGG", localize: mockLocalize, expected: "A" },
    { year: -1, token: "GGGGG", localize: mockLocalize, expected: "B" },
  ])(
    "year=$year token=$token localize? => $expected",
    ({ year, token, localize, expected }) => {
      const d = new Date(0, 0, 1);
      d.setFullYear(year);
      expect(format(d, token, localize)).toBe(expected);
    },
  );
});

describe("format - hour tokens", () => {
  it.each([
    // 24h制
    [new Date(2025, 0, 1, 0), "H", "0"],
    [new Date(2025, 0, 1, 0), "HH", "00"],
    [new Date(2025, 0, 1, 9), "H", "9"],
    [new Date(2025, 0, 1, 9), "HH", "09"],
    [new Date(2025, 0, 1, 23), "H", "23"],
    [new Date(2025, 0, 1, 23), "HH", "23"],

    // 12h制
    [new Date(2025, 0, 1, 0), "h", "12"], // midnight
    [new Date(2025, 0, 1, 0), "hh", "12"],
    [new Date(2025, 0, 1, 9), "h", "9"],
    [new Date(2025, 0, 1, 9), "hh", "09"],
    [new Date(2025, 0, 1, 12), "h", "12"], // noon
    [new Date(2025, 0, 1, 12), "hh", "12"],
    [new Date(2025, 0, 1, 15), "h", "3"],
    [new Date(2025, 0, 1, 15), "hh", "03"],
    [new Date(2025, 0, 1, 23), "h", "11"],
    [new Date(2025, 0, 1, 23), "hh", "11"],
  ])("date %s with pattern %s → %s", (date, pattern, expected) => {
    expect(format(date, pattern)).toBe(expected);
  });
});

describe("format - dayPeriod tokens", () => {
  it.each([
    // --- fallback ---
    { hour: 0, token: "a", localize: undefined, expected: "AM" },
    { hour: 11, token: "a", localize: undefined, expected: "AM" },
    { hour: 12, token: "a", localize: undefined, expected: "PM" },
    { hour: 23, token: "a", localize: undefined, expected: "PM" },

    // --- localize abbreviated ---
    { hour: 9, token: "a", localize: mockLocalize, expected: "AM" },
    { hour: 9, token: "aa", localize: mockLocalize, expected: "AM" },
    { hour: 15, token: "a", localize: mockLocalize, expected: "PM" },

    // --- localize wide ---
    {
      hour: 9,
      token: "aaaa",
      localize: mockLocalize,
      expected: "ante meridiem",
    },
    {
      hour: 15,
      token: "aaaa",
      localize: mockLocalize,
      expected: "post meridiem",
    },

    // --- localize narrow ---
    { hour: 9, token: "aaaaa", localize: mockLocalize, expected: "a" },
    { hour: 15, token: "aaaaa", localize: mockLocalize, expected: "p" },
  ])(
    "hour=$hour token=$token localize? => $expected",
    ({ hour, token, localize, expected }) => {
      const d = new Date(2025, 0, 1, hour);
      expect(format(d, token, localize)).toBe(expected);
    },
  );
});

describe("format - minute tokens", () => {
  it.each([
    [new Date(2025, 0, 1, 12, 0), "m", "0"],
    [new Date(2025, 0, 1, 12, 0), "mm", "00"],
    [new Date(2025, 0, 1, 12, 5), "m", "5"],
    [new Date(2025, 0, 1, 12, 5), "mm", "05"],
    [new Date(2025, 0, 1, 12, 59), "m", "59"],
    [new Date(2025, 0, 1, 12, 59), "mm", "59"],
  ])("date %s with pattern %s → %s", (date, pattern, expected) => {
    expect(format(date, pattern)).toBe(expected);
  });

  it("works combined with hour", () => {
    const d = new Date(2025, 0, 1, 15, 7); // 3:07 PM
    expect(format(d, "hh:mm a")).toBe("03:07 PM");
  });
});

describe("format - second tokens", () => {
  it.each([
    [new Date(2025, 0, 1, 12, 0, 0), "s", "0"],
    [new Date(2025, 0, 1, 12, 0, 0), "ss", "00"],
    [new Date(2025, 0, 1, 12, 0, 5), "s", "5"],
    [new Date(2025, 0, 1, 12, 0, 5), "ss", "05"],
    [new Date(2025, 0, 1, 12, 0, 59), "s", "59"],
    [new Date(2025, 0, 1, 12, 0, 59), "ss", "59"],
  ])("date %s with pattern %s → %s", (date, pattern, expected) => {
    expect(format(date, pattern)).toBe(expected);
  });

  it("works combined with hour and minute", () => {
    const d = new Date(2025, 0, 1, 15, 7, 9); // 3:07:09 PM
    expect(format(d, "hh:mm:ss a")).toBe("03:07:09 PM");
  });
});

describe("format - millisecond tokens", () => {
  it.each([
    [new Date(2025, 0, 1, 12, 0, 0, 7), "S", "7"],
    [new Date(2025, 0, 1, 12, 0, 0, 7), "SS", "07"],
    [new Date(2025, 0, 1, 12, 0, 0, 7), "SSS", "007"],

    [new Date(2025, 0, 1, 12, 0, 0, 45), "S", "4"],
    [new Date(2025, 0, 1, 12, 0, 0, 45), "SS", "45"],
    [new Date(2025, 0, 1, 12, 0, 0, 45), "SSS", "045"],

    [new Date(2025, 0, 1, 12, 0, 0, 123), "S", "1"],
    [new Date(2025, 0, 1, 12, 0, 0, 123), "SS", "12"],
    [new Date(2025, 0, 1, 12, 0, 0, 123), "SSS", "123"],
  ])("date %s with pattern %s → %s", (date, pattern, expected) => {
    expect(format(date, pattern)).toBe(expected);
  });

  it("works combined with time", () => {
    const d = new Date(2025, 0, 1, 15, 7, 9, 45); // 3:07:09.045 PM
    expect(format(d, "hh:mm:ss.SSS a")).toBe("03:07:09.045 PM");
  });
});

describe("format - day of year tokens", () => {
  it.each([
    // --- Jan 1, 2025 (非うるう年) ---
    { date: new Date(2025, 0, 1), token: "D", expected: "1" },
    { date: new Date(2025, 0, 1), token: "DD", expected: "01" },
    { date: new Date(2025, 0, 1), token: "DDD", expected: "001" },

    // --- Dec 31, 2025 (365日目) ---
    { date: new Date(2025, 11, 31), token: "D", expected: "365" },
    { date: new Date(2025, 11, 31), token: "DD", expected: "365" },
    { date: new Date(2025, 11, 31), token: "DDD", expected: "365" },

    // --- Feb 29, 2024 (うるう年 60日目) ---
    { date: new Date(2024, 1, 29), token: "D", expected: "60" },
    { date: new Date(2024, 1, 29), token: "DD", expected: "60" },
    { date: new Date(2024, 1, 29), token: "DDD", expected: "060" },

    // --- Dec 31, 2024 (うるう年 366日目) ---
    { date: new Date(2024, 11, 31), token: "D", expected: "366" },
    { date: new Date(2024, 11, 31), token: "DD", expected: "366" },
    { date: new Date(2024, 11, 31), token: "DDD", expected: "366" },

    // --- 他のトークンと組み合わせ ---
    { date: new Date(2025, 0, 1), token: "yyyy-DDD", expected: "2025-001" },
    { date: new Date(2024, 11, 31), token: "yyyy-DDD", expected: "2024-366" },
  ])("date=$date token=$token => $expected", ({ date, token, expected }) => {
    expect(format(date, token)).toBe(expected);
  });
});
