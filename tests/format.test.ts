import { describe, it, expect } from "vitest";
import { format } from "../src";
import { Locale } from "../src/types";

// モック locale
const mockLocale: Locale = {
  era: {
    narrow: ["B", "A"],
    abbr: ["BC", "AD"],
    wide: ["Before Christ", "Anno Domini"],
  },
  month: {
    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    abbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  },
  weekday: {
    narrow: ["S", "M", "T", "W", "T", "F", "S"],
    abbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  },
  dayPeriod: {
    narrow: ["a", "p"],
    abbr: ["AM", "PM"],
    wide: ["ante meridiem", "post meridiem"],
  },
};

describe("format - year tokens", () => {
  /**
   * Equivalence partitioning:
   * - AD years: 1-digit (9), 3-digit (999), 4-digit (2025), 5-digit (12345)
   * - BC years: ISO year 0 = 1 BC, -1 = 2 BC, -999 = 1000 BC
   * - Patterns: yyyy (4-digit padded), yy (2-digit), y (unpadded)
   *
   * Boundary values:
   * - Small years: 9, 999 (padding behavior)
   * - Large years: 12345 (exceeds 4 digits)
   * - BC years: 0, -1, -999 (negative to positive conversion)
   */
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
  /**
   * Equivalence partitioning:
   * - Single-digit months (1-9): Test with M (no padding)
   * - Double-digit months (10-12): Test with M and MM (with padding)
   *
   * Category values coverage checklist (months 1-12):
   * ✓ 1 (January), ✓ 9 (September), ✓ 12 (December)
   * Note: Representative values from single-digit (1, 9) and double-digit (12) ranges
   */
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
    { year: 2025, token: "G", localize: mockLocale, expected: "AD" },
    { year: -1, token: "G", localize: mockLocale, expected: "BC" },

    // --- localize wide ---
    {
      year: 2025,
      token: "GGGG",
      localize: mockLocale,
      expected: "Anno Domini",
    },
    {
      year: -1,
      token: "GGGG",
      localize: mockLocale,
      expected: "Before Christ",
    },

    // --- localize narrow ---
    { year: 2025, token: "GGGGG", localize: mockLocale, expected: "A" },
    { year: -1, token: "GGGGG", localize: mockLocale, expected: "B" },
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
    { hour: 9, token: "a", localize: mockLocale, expected: "AM" },
    { hour: 9, token: "aa", localize: mockLocale, expected: "AM" },
    { hour: 15, token: "a", localize: mockLocale, expected: "PM" },

    // --- localize wide ---
    {
      hour: 9,
      token: "aaaa",
      localize: mockLocale,
      expected: "ante meridiem",
    },
    {
      hour: 15,
      token: "aaaa",
      localize: mockLocale,
      expected: "post meridiem",
    },

    // --- localize narrow ---
    { hour: 9, token: "aaaaa", localize: mockLocale, expected: "a" },
    { hour: 15, token: "aaaaa", localize: mockLocale, expected: "p" },
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
    // date-fns compatible: S = hundreds, SS = tens, SSS = full
    [new Date(2025, 0, 1, 12, 0, 0, 7), "S", "0"], // 7ms → Math.floor(7/100) = 0
    [new Date(2025, 0, 1, 12, 0, 0, 7), "SS", "00"], // 7ms → Math.floor(7/10) = 0 → "00"
    [new Date(2025, 0, 1, 12, 0, 0, 7), "SSS", "007"],

    [new Date(2025, 0, 1, 12, 0, 0, 45), "S", "0"], // 45ms → Math.floor(45/100) = 0
    [new Date(2025, 0, 1, 12, 0, 0, 45), "SS", "04"], // 45ms → Math.floor(45/10) = 4 → "04"
    [new Date(2025, 0, 1, 12, 0, 0, 45), "SSS", "045"],

    [new Date(2025, 0, 1, 12, 0, 0, 123), "S", "1"], // 123ms → Math.floor(123/100) = 1
    [new Date(2025, 0, 1, 12, 0, 0, 123), "SS", "12"], // 123ms → Math.floor(123/10) = 12
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

describe("format - weekday tokens", () => {
  it.each([
    // --- fallback ---
    {
      date: new Date(2025, 0, 5),
      token: "E",
      localize: undefined,
      expected: "Sun",
    }, // Sunday
    {
      date: new Date(2025, 0, 6),
      token: "EEE",
      localize: undefined,
      expected: "Mon",
    }, // Monday
    {
      date: new Date(2025, 0, 7),
      token: "EEEE",
      localize: undefined,
      expected: "Tuesday",
    },
    {
      date: new Date(2025, 0, 8),
      token: "EEEEE",
      localize: undefined,
      expected: "W",
    },

    // --- with localize ---
    {
      date: new Date(2025, 0, 9),
      token: "E",
      localize: mockLocale,
      expected: "Thu",
    }, // Thursday
    {
      date: new Date(2025, 0, 10),
      token: "EEEE",
      localize: mockLocale,
      expected: "Friday",
    },
    {
      date: new Date(2025, 0, 11),
      token: "EEEEE",
      localize: mockLocale,
      expected: "S",
    }, // Saturday
  ])(
    "date=$date token=$token localize? => $expected",
    ({ date, token, localize, expected }) => {
      expect(format(date, token, localize)).toBe(expected);
    },
  );

  it("can combine weekday with year/month/day", () => {
    const d = new Date(2025, 0, 5); // Sunday
    expect(format(d, "yyyy-MM-dd EEEE")).toBe("2025-01-05 Sunday");
  });
});

describe("format - edge cases", () => {
  /**
   * Equivalence partitioning:
   * - Valid dates with edge patterns: Empty pattern, very long pattern
   * - Invalid dates: Invalid Date, NaN timestamp
   * - Boundary dates: Leap year Feb 29, year boundary, min/max dates
   */

  describe("pattern edge cases", () => {
    it("returns empty string for empty pattern", () => {
      const date = new Date(2024, 0, 15);
      expect(format(date, "")).toBe("");
    });

    it("handles very long pattern", () => {
      const date = new Date(2024, 5, 15, 14, 30, 45, 123);
      const pattern =
        "yyyy-MM-dd HH:mm:ss.SSS EEEE (day DDD of year) G era";
      const result = format(date, pattern);
      expect(result).toContain("2024");
      expect(result).toContain("06");
      expect(result).toContain("15");
    });
  });

  describe("invalid input handling", () => {
    it("returns 'Invalid Date' string for Invalid Date object", () => {
      const invalidDate = new Date("invalid");
      expect(format(invalidDate, "yyyy-MM-dd")).toBe("Invalid Date");
    });

    it("returns 'Invalid Date' string for Date from NaN", () => {
      const invalidDate = new Date(NaN);
      expect(format(invalidDate, "yyyy-MM-dd")).toBe("Invalid Date");
    });

    it("returns 'Invalid Date' string for Date from Infinity", () => {
      const invalidDate = new Date(Infinity);
      expect(format(invalidDate, "yyyy-MM-dd")).toBe("Invalid Date");
    });

    it("returns 'Invalid Date' string for Date from -Infinity", () => {
      const invalidDate = new Date(-Infinity);
      expect(format(invalidDate, "yyyy-MM-dd")).toBe("Invalid Date");
    });
  });

  describe("boundary dates", () => {
    it("handles leap year Feb 29", () => {
      const leapDay = new Date(2024, 1, 29);
      expect(format(leapDay, "yyyy-MM-dd")).toBe("2024-02-29");
      expect(format(leapDay, "DDD")).toBe("060"); // Day 60 of year
    });

    it("handles year boundary (Dec 31 → Jan 1)", () => {
      const lastDayOfYear = new Date(2024, 11, 31, 23, 59, 59);
      const firstDayOfYear = new Date(2025, 0, 1, 0, 0, 0);

      expect(format(lastDayOfYear, "yyyy-MM-dd HH:mm:ss")).toBe(
        "2024-12-31 23:59:59",
      );
      expect(format(firstDayOfYear, "yyyy-MM-dd HH:mm:ss")).toBe(
        "2025-01-01 00:00:00",
      );
    });

    it("handles minimum and maximum safe dates", () => {
      // JavaScript Date range: -8640000000000000 ~ 8640000000000000
      const minDate = new Date(-8640000000000000);
      const maxDate = new Date(8640000000000000);

      // These should format without errors (actual values may vary)
      const minResult = format(minDate, "yyyy");
      const maxResult = format(maxDate, "yyyy");

      expect(typeof minResult).toBe("string");
      expect(typeof maxResult).toBe("string");
      expect(minResult).not.toBe("Invalid Date");
      expect(maxResult).not.toBe("Invalid Date");
    });
  });

  /**
   * Literal text and quote escaping (Section 1.2.3 of test-design.md)
   *
   * Equivalence partitioning for pattern strings:
   * - Class 2: Literal text patterns (single-quoted text)
   * - Class 3: Escaped quote patterns (two consecutive quotes)
   * - Class 4: Mixed patterns (combination of above)
   *
   * Pattern Syntax Rules:
   * - Literal text must be enclosed in single quotes (e.g., 'at', 'Year')
   * - Two single quotes ('') represent a literal single quote character
   * - Unrecognized characters outside quotes are passed through as-is
   */
  describe("literal text and quote escaping", () => {
    const date = new Date(2024, 0, 15, 14, 30, 45);

    describe("literal text patterns (Class 2)", () => {
      it.each([
        {
          pattern: "'Year' yyyy",
          expected: "Year 2024",
          desc: "Simple literal text",
        },
        {
          pattern: "'Month' MM",
          expected: "Month 01",
          desc: "Literal text with month token",
        },
      ])("$desc", ({ pattern, expected }) => {
        expect(format(date, pattern)).toBe(expected);
      });
    });

    describe("escaped quote patterns (Class 3)", () => {
      it.each([
        {
          pattern: "yyyy''MM''dd",
          expected: "2024'01'15",
          desc: "Escaped quotes between tokens",
        },
        {
          pattern: "''yyyy''",
          expected: "'2024'",
          desc: "Escaped quotes at boundaries",
        },
        {
          pattern: "HH''mm''ss",
          expected: "14'30'45",
          desc: "Multiple escaped quotes",
        },
      ])("$desc", ({ pattern, expected }) => {
        expect(format(date, pattern)).toBe(expected);
      });
    });

    describe("mixed patterns (Class 4)", () => {
      it.each([
        {
          pattern: "yyyy 'at' HH:mm",
          expected: "2024 at 14:30",
          desc: "Literal text between tokens",
        },
        {
          pattern: "'It''s' yyyy",
          expected: "It's 2024",
          desc: "Literal with escaped quote",
        },
        {
          pattern: "'Today''s date:' yyyy-MM-dd",
          expected: "Today's date: 2024-01-15",
          desc: "Complex literal with escaped quote and tokens",
        },
        {
          pattern: "'Year' yyyy', Month' MM",
          expected: "Year 2024, Month 01",
          desc: "Multiple literals in one pattern",
        },
      ])("$desc", ({ pattern, expected }) => {
        expect(format(date, pattern)).toBe(expected);
      });

      it("handles consecutive escaped quotes", () => {
        expect(format(date, "yyyy''''MM")).toBe("2024''01");
      });

      it("handles complex real-world format", () => {
        expect(format(date, "EEEE, MMMM dd, yyyy 'at' h:mm a")).toBe(
          "Monday, January 15, 2024 at 2:30 PM",
        );
      });
    });

    describe("invalid syntax patterns (Class 6)", () => {
      it.each([
        {
          pattern: "yyyy'MM",
          desc: "Unmatched quote",
        },
        {
          pattern: "'incomplete",
          desc: "Unclosed literal",
        },
        {
          pattern: "''",
          desc: "Lone escaped quotes",
        },
      ])("handles $desc: $pattern", ({ pattern }) => {
        // Document actual behavior for invalid syntax
        // Implementation may pass through as-is, throw error, or produce unexpected output
        const result = format(date, pattern);
        expect(typeof result).toBe("string");
      });
    });
  });
});
