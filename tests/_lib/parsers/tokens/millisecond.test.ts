import { describe, it, expect } from "vitest";
import { parseMillisecond } from "../../../../src/_lib/parsers/tokens/millisecond";
import { DateComponents } from "../../../../src/types";

describe("parseMillisecond", () => {
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

  describe("S pattern (single digit millisecond)", () => {
    it.each([
      ["1", 0, 100], // 1 -> 100ms
      ["5", 0, 500], // 5 -> 500ms
      ["9", 0, 900], // 9 -> 900ms
      ["0", 0, 0],   // 0 -> 0ms
    ])("parses %s as %d milliseconds", (input, position, expectedMs) => {
      const dateComponents = createDateComponents();
      const result = parseMillisecond(input, position, "S", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(position + 1);
      expect(dateComponents.milliseconds).toBe(expectedMs);
    });

    it("returns null for invalid format", () => {
      const dateComponents = createDateComponents();

      expect(parseMillisecond("a", 0, "S", undefined, dateComponents)).toBeNull(); // Not digit
      expect(parseMillisecond("", 0, "S", undefined, dateComponents)).toBeNull(); // Empty
    });
  });

  describe("SS pattern (two-digit millisecond)", () => {
    it.each([
      ["12", 0, 120], // 12 -> 120ms
      ["50", 0, 500], // 50 -> 500ms
      ["99", 0, 990], // 99 -> 990ms
      ["00", 0, 0],   // 00 -> 0ms
      ["01", 0, 10],  // 01 -> 10ms
    ])("parses %s as %d milliseconds", (input, position, expectedMs) => {
      const dateComponents = createDateComponents();
      const result = parseMillisecond(input, position, "SS", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(position + 2);
      expect(dateComponents.milliseconds).toBe(expectedMs);
    });

    it("returns null for invalid format", () => {
      const dateComponents = createDateComponents();

      expect(parseMillisecond("1", 0, "SS", undefined, dateComponents)).toBeNull(); // Not 2 digits
      expect(parseMillisecond("a1", 0, "SS", undefined, dateComponents)).toBeNull(); // Not digits
    });
  });

  describe("SSS pattern (three-digit millisecond)", () => {
    it.each([
      ["123", 0, 123], // 123 -> 123ms
      ["500", 0, 500], // 500 -> 500ms
      ["999", 0, 999], // 999 -> 999ms
      ["000", 0, 0],   // 000 -> 0ms
      ["001", 0, 1],   // 001 -> 1ms
    ])("parses %s as %d milliseconds", (input, position, expectedMs) => {
      const dateComponents = createDateComponents();
      const result = parseMillisecond(input, position, "SSS", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(position + 3);
      expect(dateComponents.milliseconds).toBe(expectedMs);
    });

    it("returns null for invalid format", () => {
      const dateComponents = createDateComponents();

      expect(parseMillisecond("12", 0, "SSS", undefined, dateComponents)).toBeNull(); // Not 3 digits
      expect(parseMillisecond("a12", 0, "SSS", undefined, dateComponents)).toBeNull(); // Not digits
    });
  });

  describe("position handling", () => {
    it("parses at different positions", () => {
      const dateComponents = createDateComponents();
      const result = parseMillisecond("abc123def", 3, "SSS", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(6);
      expect(dateComponents.milliseconds).toBe(123);
    });

    it("handles end of string", () => {
      const dateComponents = createDateComponents();
      const result = parseMillisecond("123", 0, "SSS", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
      expect(dateComponents.milliseconds).toBe(123);
    });

    it("handles position at end of string", () => {
      const dateComponents = createDateComponents();
      const result = parseMillisecond("123", 3, "S", undefined, dateComponents);

      expect(result).toBeNull(); // No characters left to parse
    });
  });

  describe("edge cases", () => {
    it("correctly scales different token lengths", () => {
      const components1 = createDateComponents();
      const components2 = createDateComponents();
      const components3 = createDateComponents();

      // Same input "5" should scale differently based on token
      parseMillisecond("5", 0, "S", undefined, components1);
      expect(components1.milliseconds).toBe(500); // 5 * 100

      parseMillisecond("50", 0, "SS", undefined, components2);
      expect(components2.milliseconds).toBe(500); // 50 * 10

      parseMillisecond("500", 0, "SSS", undefined, components3);
      expect(components3.milliseconds).toBe(500); // 500 * 1
    });

    it("handles zero values correctly", () => {
      const components1 = createDateComponents();
      const components2 = createDateComponents();
      const components3 = createDateComponents();

      parseMillisecond("0", 0, "S", undefined, components1);
      expect(components1.milliseconds).toBe(0);

      parseMillisecond("00", 0, "SS", undefined, components2);
      expect(components2.milliseconds).toBe(0);

      parseMillisecond("000", 0, "SSS", undefined, components3);
      expect(components3.milliseconds).toBe(0);
    });

    it("handles maximum values correctly", () => {
      const components1 = createDateComponents();
      const components2 = createDateComponents();
      const components3 = createDateComponents();

      parseMillisecond("9", 0, "S", undefined, components1);
      expect(components1.milliseconds).toBe(900);

      parseMillisecond("99", 0, "SS", undefined, components2);
      expect(components2.milliseconds).toBe(990);

      parseMillisecond("999", 0, "SSS", undefined, components3);
      expect(components3.milliseconds).toBe(999);
    });

    it("returns null for partial match (break case)", () => {
      const components = createDateComponents();
      const result = parseMillisecond("5a", 0, "SS", undefined, components);
      expect(result).toBeNull();
    });

    it("returns null for unknown token (default case)", () => {
      const components = createDateComponents();
      const result = parseMillisecond("5000", 0, "SSSS", undefined, components);
      expect(result).toBeNull();
    });
  });
});