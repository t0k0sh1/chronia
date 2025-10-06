import { describe, it, expect } from "vitest";
import { parseYear } from "../../../../src/_lib/parsers/tokens/year";
import { DateComponents } from "../../../../src/types";

describe("parseYear", () => {
  const createDateComponents = (): DateComponents => ({
    year: 2000,
    month: 0,
    day: 1,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
    isPM: false,
    hours12: null,
  });

  describe("single y pattern", () => {
    it.each([
      ["1", 0, 1, 1],
      ["12", 0, 2, 12],
      ["123", 0, 3, 123],
      ["1234", 0, 4, 1234],
      ["2024", 0, 4, 2024],
      ["1 ", 0, 1, 1], // Should stop at non-digit
      ["12abc", 0, 2, 12], // Should stop at non-digit
    ])("parses %s at position %d, consumes %d chars, year=%d", (input, position, expectedLength, expectedYear) => {
      const dateComponents = createDateComponents();
      const result = parseYear(input, position, "y", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(position + expectedLength);
      expect(dateComponents.year).toBe(expectedYear);
    });

    it("returns null for no digits", () => {
      const dateComponents = createDateComponents();
      const result = parseYear("abc", 0, "y", undefined, dateComponents);
      expect(result).toBeNull();
    });
  });

  describe("yy pattern (two-digit year)", () => {
    it.each([
      ["00", 0, 2000], // 00-49 -> 2000-2049
      ["01", 0, 2001],
      ["49", 0, 2049],
      ["50", 0, 1950], // 50-99 -> 1950-1999
      ["99", 0, 1999],
      ["24", 0, 2024],
    ])("parses %s as year %d", (input, position, expectedYear) => {
      const dateComponents = createDateComponents();
      const result = parseYear(input, position, "yy", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(position + 2);
      expect(dateComponents.year).toBe(expectedYear);
    });

    it("returns null for non-two-digit input", () => {
      const dateComponents = createDateComponents();

      expect(parseYear("1", 0, "yy", undefined, dateComponents)).toBeNull();
      expect(parseYear("a1", 0, "yy", undefined, dateComponents)).toBeNull();
    });

    it("parses first two digits for longer input", () => {
      const dateComponents = createDateComponents();
      const result = parseYear("123", 0, "yy", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(2); // Should consume first 2 digits
      expect(dateComponents.year).toBe(2012); // 12 -> 2012 (00-49 -> 2000-2049)
    });
  });

  describe("yyy pattern (three-digit year)", () => {
    it.each([
      ["001", 0, 1],
      ["024", 0, 24],
      ["123", 0, 123],
      ["999", 0, 999],
    ])("parses %s as year %d", (input, position, expectedYear) => {
      const dateComponents = createDateComponents();
      const result = parseYear(input, position, "yyy", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(position + 3);
      expect(dateComponents.year).toBe(expectedYear);
    });

    it("returns null for non-three-digit input", () => {
      const dateComponents = createDateComponents();

      expect(parseYear("12", 0, "yyy", undefined, dateComponents)).toBeNull();
      expect(parseYear("12a", 0, "yyy", undefined, dateComponents)).toBeNull();
    });

    it("parses first three digits for longer input", () => {
      const dateComponents = createDateComponents();
      const result = parseYear("1234", 0, "yyy", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(3); // Should consume first 3 digits
      expect(dateComponents.year).toBe(123);
    });
  });

  describe("yyyy pattern (four-digit year)", () => {
    it.each([
      ["1", 0, 1],
      ["12", 0, 12],
      ["123", 0, 123],
      ["1234", 0, 1234],
      ["2024", 0, 2024],
      ["0001", 0, 1],
    ])("parses %s as year %d", (input, position, expectedYear) => {
      const dateComponents = createDateComponents();
      const result = parseYear(input, position, "yyyy", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(position + input.length);
      expect(dateComponents.year).toBe(expectedYear);
    });

    it("parses up to 4 digits for yyyy pattern", () => {
      const dateComponents = createDateComponents();
      const result = parseYear("12345", 0, "yyyy", undefined, dateComponents);
      expect(result).not.toBeNull();
      expect(result!.position).toBe(4); // Should consume first 4 digits
      expect(dateComponents.year).toBe(1234);
    });

    it("returns null for no digits", () => {
      const dateComponents = createDateComponents();
      const result = parseYear("abcd", 0, "yyyy", undefined, dateComponents);
      expect(result).toBeNull();
    });
  });

  describe("position handling", () => {
    it("parses at different positions", () => {
      const dateComponents = createDateComponents();
      const result = parseYear("abc2024def", 3, "yyyy", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(7);
      expect(dateComponents.year).toBe(2024);
    });

    it("handles end of string", () => {
      const dateComponents = createDateComponents();
      const result = parseYear("2024", 0, "yyyy", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(4);
      expect(dateComponents.year).toBe(2024);
    });
  });

  describe("edge cases", () => {
    it("handles year 0", () => {
      const dateComponents = createDateComponents();
      const result = parseYear("0", 0, "y", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.year).toBe(0);
    });

    it("handles large years", () => {
      const dateComponents = createDateComponents();
      const result = parseYear("9999", 0, "y", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(4);
      expect(dateComponents.year).toBe(9999);
    });

    it("stops at first non-digit for variable length", () => {
      const dateComponents = createDateComponents();
      const result = parseYear("123x456", 0, "y", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
      expect(dateComponents.year).toBe(123);
    });

    it("handles unknown token (default case - yyyyy)", () => {
      const dateComponents = createDateComponents();
      const result = parseYear("12345", 0, "yyyyy", undefined, dateComponents);
      expect(result).not.toBeNull();
      expect(result!.position).toBe(5);
      expect(dateComponents.year).toBe(12345);
    });
  });
});