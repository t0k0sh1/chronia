import { describe, it, expect } from "vitest";
import { parseDay } from "../../../../src/_lib/parsers/tokens/day";
import { DateComponents } from "../../../../src/types";

describe("parseDay", () => {
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

  describe("d pattern (single digit day)", () => {
    it.each([
      ["1", 0, 1, 1],
      ["9", 0, 1, 9],
      ["15", 0, 2, 15],
      ["31", 0, 2, 31],
      ["1x", 0, 1, 1], // Should stop at non-digit
      ["15abc", 0, 2, 15], // Should stop at non-digit
    ])("parses %s at position %d, consumes %d chars, day=%d", (input, position, expectedLength, expectedDay) => {
      const dateComponents = createDateComponents();
      const result = parseDay(input, position, "d", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(position + expectedLength);
      expect(dateComponents.day).toBe(expectedDay);
    });

    it("returns null for invalid day values", () => {
      const dateComponents = createDateComponents();

      expect(parseDay("0", 0, "d", undefined, dateComponents)).toBeNull();
      expect(parseDay("32", 0, "d", undefined, dateComponents)).toBeNull();
      expect(parseDay("99", 0, "d", undefined, dateComponents)).toBeNull();
    });

    it("returns null for no digits", () => {
      const dateComponents = createDateComponents();
      const result = parseDay("abc", 0, "d", undefined, dateComponents);
      expect(result).toBeNull();
    });
  });

  describe("dd pattern (two-digit day)", () => {
    it.each([
      ["01", 0, 1],
      ["09", 0, 9],
      ["15", 0, 15],
      ["31", 0, 31],
    ])("parses %s as day %d", (input, position, expectedDay) => {
      const dateComponents = createDateComponents();
      const result = parseDay(input, position, "dd", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(position + 2);
      expect(dateComponents.day).toBe(expectedDay);
    });

    it("returns null for invalid formats or values", () => {
      const dateComponents = createDateComponents();

      expect(parseDay("1", 0, "dd", undefined, dateComponents)).toBeNull(); // Not 2 digits
      expect(parseDay("00", 0, "dd", undefined, dateComponents)).toBeNull(); // Invalid day
      expect(parseDay("32", 0, "dd", undefined, dateComponents)).toBeNull(); // Invalid day
      expect(parseDay("a1", 0, "dd", undefined, dateComponents)).toBeNull(); // Not digits
    });
  });

  describe("boundary values", () => {
    it("accepts valid day range (1-31)", () => {
      const dateComponents = createDateComponents();

      // Test boundary values
      expect(parseDay("1", 0, "d", undefined, dateComponents)).not.toBeNull();
      expect(parseDay("31", 0, "d", undefined, dateComponents)).not.toBeNull();

      // Test common values
      expect(parseDay("15", 0, "d", undefined, dateComponents)).not.toBeNull();
      expect(parseDay("28", 0, "d", undefined, dateComponents)).not.toBeNull();
      expect(parseDay("29", 0, "d", undefined, dateComponents)).not.toBeNull();
      expect(parseDay("30", 0, "d", undefined, dateComponents)).not.toBeNull();
    });

    it("rejects invalid day values", () => {
      const dateComponents = createDateComponents();

      expect(parseDay("0", 0, "d", undefined, dateComponents)).toBeNull();
      expect(parseDay("32", 0, "d", undefined, dateComponents)).toBeNull();
      expect(parseDay("99", 0, "d", undefined, dateComponents)).toBeNull();
    });
  });

  describe("position handling", () => {
    it("parses at different positions", () => {
      const dateComponents = createDateComponents();
      const result = parseDay("abc15def", 3, "dd", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(5);
      expect(dateComponents.day).toBe(15);
    });

    it("handles end of string", () => {
      const dateComponents = createDateComponents();
      const result = parseDay("31", 0, "dd", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.day).toBe(31);
    });

    it("handles position at end of string", () => {
      const dateComponents = createDateComponents();
      const result = parseDay("15", 2, "d", undefined, dateComponents);

      expect(result).toBeNull(); // No characters left to parse
    });
  });

  describe("edge cases", () => {
    it("handles single vs double digit parsing correctly", () => {
      const dateComponents1 = createDateComponents();
      const dateComponents2 = createDateComponents();

      // Single digit pattern should read variable length
      const result1 = parseDay("5", 0, "d", undefined, dateComponents1);
      expect(result1).not.toBeNull();
      expect(result1!.position).toBe(1);
      expect(dateComponents1.day).toBe(5);

      // Double digit pattern should require exactly 2 digits
      const result2 = parseDay("5", 0, "dd", undefined, dateComponents2);
      expect(result2).toBeNull();
    });

    it("stops parsing at first non-digit for variable length", () => {
      const dateComponents = createDateComponents();
      const result = parseDay("12x34", 0, "d", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.day).toBe(12);
    });

    it("validates day range regardless of pattern", () => {
      const dateComponents1 = createDateComponents();
      const dateComponents2 = createDateComponents();

      // Both patterns should reject invalid values
      expect(parseDay("00", 0, "d", undefined, dateComponents1)).toBeNull();
      expect(parseDay("00", 0, "dd", undefined, dateComponents2)).toBeNull();

      expect(parseDay("32", 0, "d", undefined, dateComponents1)).toBeNull();
      expect(parseDay("32", 0, "dd", undefined, dateComponents2)).toBeNull();
    });
  });
});