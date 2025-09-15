import { describe, it, expect } from "vitest";
import { parseMinute } from "../../../../src/_lib/parsers/tokens/minute";
import { DateComponents } from "../../../../src/types";

describe("parseMinute", () => {
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

  describe("m pattern (single digit minute)", () => {
    it.each([
      ["0", 0, 1, 0],
      ["9", 0, 1, 9],
      ["30", 0, 2, 30],
      ["59", 0, 2, 59],
      ["5x", 0, 1, 5], // Should stop at non-digit
      ["30abc", 0, 2, 30], // Should stop at non-digit
    ])("parses %s at position %d, consumes %d chars, minute=%d", (input, position, expectedLength, expectedMinute) => {
      const dateComponents = createDateComponents();
      const result = parseMinute(input, position, "m", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(position + expectedLength);
      expect(dateComponents.minutes).toBe(expectedMinute);
    });

    it("returns null for invalid minute values", () => {
      const dateComponents = createDateComponents();

      expect(parseMinute("60", 0, "m", undefined, dateComponents)).toBeNull();
      expect(parseMinute("99", 0, "m", undefined, dateComponents)).toBeNull();
    });

    it("returns null for no digits", () => {
      const dateComponents = createDateComponents();
      const result = parseMinute("abc", 0, "m", undefined, dateComponents);
      expect(result).toBeNull();
    });
  });

  describe("mm pattern (two-digit minute)", () => {
    it.each([
      ["00", 0, 0],
      ["09", 0, 9],
      ["30", 0, 30],
      ["59", 0, 59],
    ])("parses %s as minute %d", (input, position, expectedMinute) => {
      const dateComponents = createDateComponents();
      const result = parseMinute(input, position, "mm", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(position + 2);
      expect(dateComponents.minutes).toBe(expectedMinute);
    });

    it("returns null for invalid formats or values", () => {
      const dateComponents = createDateComponents();

      expect(parseMinute("5", 0, "mm", undefined, dateComponents)).toBeNull(); // Not 2 digits
      expect(parseMinute("60", 0, "mm", undefined, dateComponents)).toBeNull(); // Invalid minute
      expect(parseMinute("a1", 0, "mm", undefined, dateComponents)).toBeNull(); // Not digits
    });
  });

  describe("boundary values", () => {
    it("accepts valid minute range (0-59)", () => {
      const dateComponents = createDateComponents();

      expect(parseMinute("0", 0, "m", undefined, dateComponents)).not.toBeNull();
      expect(parseMinute("59", 0, "m", undefined, dateComponents)).not.toBeNull();
      expect(parseMinute("30", 0, "m", undefined, dateComponents)).not.toBeNull();
    });

    it("rejects invalid minute values", () => {
      const dateComponents = createDateComponents();

      expect(parseMinute("60", 0, "m", undefined, dateComponents)).toBeNull();
      expect(parseMinute("99", 0, "m", undefined, dateComponents)).toBeNull();
    });
  });

  describe("position handling", () => {
    it("parses at different positions", () => {
      const dateComponents = createDateComponents();
      const result = parseMinute("abc45def", 3, "mm", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(5);
      expect(dateComponents.minutes).toBe(45);
    });

    it("handles end of string", () => {
      const dateComponents = createDateComponents();
      const result = parseMinute("59", 0, "mm", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.minutes).toBe(59);
    });
  });
});