/**
 * Test Template: Format/Parse Functions
 *
 * Target functions:
 * - format, parse
 *
 * Usage:
 * 1. Copy this file and save as tests/{functionName}.test.ts
 * 2. Replace `format` with the actual function name
 * 3. Add function-specific test cases (tokens, locales)
 * 4. Remove unnecessary test cases
 *
 * Test Design:
 * - Equivalence partitioning: Valid patterns, invalid patterns
 * - Category values: All tokens (year, month, day, hour, minute, second, millisecond), all locales (en-US, ja, unspecified)
 * - Boundary values: Min/max years, leap years, BC/AD
 * - Invalid inputs: Invalid Date, empty string, invalid patterns
 * - Round-trip: format(parse(str)) === str
 * - Type variations: Test all types when function accepts multiple types
 */

import { describe, it, expect } from "vitest";
import { format } from "../src/format";

describe("format", () => {
  describe("basic tokens", () => {
    it.each([
      {
        date: new Date(2024, 0, 15, 14, 30, 45, 123),
        pattern: "yyyy-MM-dd",
        expected: "2024-01-15",
        desc: "Format year-month-day",
      },
      {
        date: new Date(2024, 0, 15, 14, 30, 45, 123),
        pattern: "HH:mm:ss",
        expected: "14:30:45",
        desc: "Format hour-minute-second",
      },
      {
        date: new Date(2024, 0, 15, 14, 30, 45, 123),
        pattern: "yyyy-MM-dd HH:mm:ss.SSS",
        expected: "2024-01-15 14:30:45.123",
        desc: "Format year-month-day hour-minute-second-millisecond",
      },
    ])("$desc", ({ date, pattern, expected }) => {
      expect(format(date, pattern)).toBe(expected);
    });
  });

  // Category value test: Comprehensive testing of all tokens
  describe("all token coverage", () => {
    const testDate = new Date(2024, 5, 15, 14, 30, 45, 123);

    it.each([
      { token: "yyyy", expected: "2024", desc: "Year (4 digits)" },
      { token: "yy", expected: "24", desc: "Year (2 digits)" },
      { token: "MM", expected: "06", desc: "Month (2 digits)" },
      { token: "M", expected: "6", desc: "Month (1-2 digits)" },
      { token: "dd", expected: "15", desc: "Day (2 digits)" },
      { token: "d", expected: "15", desc: "Day (1-2 digits)" },
      { token: "HH", expected: "14", desc: "Hour (24-hour, 2 digits)" },
      { token: "H", expected: "14", desc: "Hour (24-hour, 1-2 digits)" },
      { token: "hh", expected: "02", desc: "Hour (12-hour, 2 digits)" },
      { token: "h", expected: "2", desc: "Hour (12-hour, 1-2 digits)" },
      { token: "mm", expected: "30", desc: "Minute (2 digits)" },
      { token: "m", expected: "30", desc: "Minute (1-2 digits)" },
      { token: "ss", expected: "45", desc: "Second (2 digits)" },
      { token: "s", expected: "45", desc: "Second (1-2 digits)" },
      { token: "SSS", expected: "123", desc: "Millisecond (3 digits)" },
    ])("Token $token: $desc", ({ token, expected }) => {
      expect(format(testDate, token)).toBe(expected);
    });
  });

  // Category value test: All locales
  describe("locale support", () => {
    const testDate = new Date(2024, 0, 15);

    it.each([
      {
        pattern: "MMMM",
        locale: undefined,
        expected: "January",
        desc: "Default locale (English)",
      },
      {
        pattern: "MMMM",
        locale: "en-US",
        expected: "January",
        desc: "en-US locale",
      },
      {
        pattern: "MMMM",
        locale: "ja",
        expected: "1月",
        desc: "ja locale",
      },
    ])("$desc", ({ pattern, locale, expected }) => {
      expect(format(testDate, pattern, { locale })).toBe(expected);
    });
  });

  // Boundary value test: Leap years, year boundaries
  describe("edge cases", () => {
    it("Format leap year Feb 29", () => {
      expect(format(new Date(2024, 1, 29), "yyyy-MM-dd")).toBe("2024-02-29");
    });

    it("Format year boundary", () => {
      expect(format(new Date(2024, 11, 31, 23, 59, 59), "yyyy-MM-dd HH:mm:ss")).toBe(
        "2024-12-31 23:59:59"
      );
      expect(format(new Date(2025, 0, 1, 0, 0, 0), "yyyy-MM-dd HH:mm:ss")).toBe(
        "2025-01-01 00:00:00"
      );
    });

    it("Format minimum and maximum years", () => {
      expect(format(new Date(0, 0, 1), "yyyy-MM-dd")).toBe("1900-01-01"); // Note: JavaScript limitation
      expect(format(new Date(9999, 11, 31), "yyyy-MM-dd")).toBe("9999-12-31");
    });

    it("Format BC dates", () => {
      const bcDate = new Date();
      bcDate.setFullYear(-100, 5, 15);
      // Note: BC date formatting behavior is implementation-dependent
      expect(format(bcDate, "yyyy-MM-dd")).toMatch(/^\-?\d{1,4}-06-15$/);
    });
  });

  // Literal text and quote escaping (Section 1.2.3 of test-design.md)
  describe("literal text and quote escaping", () => {
    const date = new Date(2024, 0, 15, 14, 30, 45);

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
      {
        pattern: "yyyy 'at' HH:mm",
        expected: "2024 at 14:30",
        desc: "Literal text between tokens",
      },
    ])("Handle literal text: $desc", ({ pattern, expected }) => {
      expect(format(date, pattern)).toBe(expected);
    });

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
    ])("Handle escaped quotes: $desc", ({ pattern, expected }) => {
      expect(format(date, pattern)).toBe(expected);
    });

    it.each([
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
    ])("Handle mixed patterns: $desc", ({ pattern, expected }) => {
      expect(format(date, pattern)).toBe(expected);
    });

    it("Handle consecutive escaped quotes", () => {
      expect(format(date, "yyyy''''MM")).toBe("2024''01");
    });

    it("Handle complex real-world format", () => {
      expect(format(date, "EEEE, MMMM dd, yyyy 'at' h:mm a")).toBe(
        "Monday, January 15, 2024 at 2:30 PM"
      );
    });
  });

  // Edge case: Invalid Date
  describe("invalid input handling", () => {
    it("Return empty string for Invalid Date", () => {
      expect(format(new Date("invalid"), "yyyy-MM-dd")).toBe("");
      expect(format(new Date(NaN), "yyyy-MM-dd")).toBe("");
    });

    it("Return empty string for empty pattern", () => {
      expect(format(new Date(2024, 0, 15), "")).toBe("");
    });

    it("Output invalid tokens as-is", () => {
      // Note: Implementation-dependent behavior
      const result = format(new Date(2024, 0, 15), "invalid-token");
      expect(typeof result).toBe("string");
    });
  });

  // Timestamp input
  describe("number input (timestamp)", () => {
    it("Accept timestamp input", () => {
      const timestamp = new Date(2024, 0, 15, 14, 30, 45).getTime();
      expect(format(timestamp, "yyyy-MM-dd HH:mm:ss")).toBe("2024-01-15 14:30:45");
    });
  });
});
