import { describe, it, expect } from "vitest";
import { parseHour } from "../../../../src/_lib/parsers/tokens/hour";
import { DateComponents } from "../../../../src/types";

describe("parseHour", () => {
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

  describe("H pattern (single digit 24-hour)", () => {
    it.each([
      ["0", 0, 1, 0],
      ["9", 0, 1, 9],
      ["15", 0, 2, 15],
      ["23", 0, 2, 23],
      ["1x", 0, 1, 1], // Should stop at non-digit
      ["15abc", 0, 2, 15], // Should stop at non-digit
    ])("parses %s at position %d, consumes %d chars, hour=%d", (input, position, expectedLength, expectedHour) => {
      const dateComponents = createDateComponents();
      const result = parseHour(input, position, "H", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(position + expectedLength);
      expect(dateComponents.hours).toBe(expectedHour);
    });

    it("returns null for invalid hour values", () => {
      const dateComponents = createDateComponents();

      expect(parseHour("24", 0, "H", undefined, dateComponents)).toBeNull();
      expect(parseHour("25", 0, "H", undefined, dateComponents)).toBeNull();
      expect(parseHour("99", 0, "H", undefined, dateComponents)).toBeNull();
    });

    it("returns null for no digits", () => {
      const dateComponents = createDateComponents();
      const result = parseHour("abc", 0, "H", undefined, dateComponents);
      expect(result).toBeNull();
    });
  });

  describe("HH pattern (two-digit 24-hour)", () => {
    it.each([
      ["00", 0, 0],
      ["09", 0, 9],
      ["15", 0, 15],
      ["23", 0, 23],
    ])("parses %s as hour %d", (input, position, expectedHour) => {
      const dateComponents = createDateComponents();
      const result = parseHour(input, position, "HH", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(position + 2);
      expect(dateComponents.hours).toBe(expectedHour);
    });

    it("returns null for invalid formats or values", () => {
      const dateComponents = createDateComponents();

      expect(parseHour("1", 0, "HH", undefined, dateComponents)).toBeNull(); // Not 2 digits
      expect(parseHour("24", 0, "HH", undefined, dateComponents)).toBeNull(); // Invalid hour
      expect(parseHour("a1", 0, "HH", undefined, dateComponents)).toBeNull(); // Not digits
    });
  });

  describe("boundary values", () => {
    it("accepts valid 24-hour range (0-23)", () => {
      const dateComponents = createDateComponents();

      // Test boundary values
      expect(parseHour("0", 0, "H", undefined, dateComponents)).not.toBeNull();
      expect(parseHour("23", 0, "H", undefined, dateComponents)).not.toBeNull();

      // Test common values
      expect(parseHour("12", 0, "H", undefined, dateComponents)).not.toBeNull();
      expect(parseHour("6", 0, "H", undefined, dateComponents)).not.toBeNull();
      expect(parseHour("18", 0, "H", undefined, dateComponents)).not.toBeNull();
    });

    it("rejects invalid hour values", () => {
      const dateComponents = createDateComponents();

      expect(parseHour("24", 0, "H", undefined, dateComponents)).toBeNull();
      expect(parseHour("25", 0, "H", undefined, dateComponents)).toBeNull();
      expect(parseHour("99", 0, "H", undefined, dateComponents)).toBeNull();
    });
  });

  describe("position handling", () => {
    it("parses at different positions", () => {
      const dateComponents = createDateComponents();
      const result = parseHour("abc15def", 3, "HH", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(5);
      expect(dateComponents.hours).toBe(15);
    });

    it("handles end of string", () => {
      const dateComponents = createDateComponents();
      const result = parseHour("23", 0, "HH", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.hours).toBe(23);
    });

    it("handles position at end of string", () => {
      const dateComponents = createDateComponents();
      const result = parseHour("15", 2, "H", undefined, dateComponents);

      expect(result).toBeNull(); // No characters left to parse
    });
  });

  describe("edge cases", () => {
    it("handles single vs double digit parsing correctly", () => {
      const dateComponents1 = createDateComponents();
      const dateComponents2 = createDateComponents();

      // Single digit pattern should read variable length
      const result1 = parseHour("5", 0, "H", undefined, dateComponents1);
      expect(result1).not.toBeNull();
      expect(result1!.position).toBe(1);
      expect(dateComponents1.hours).toBe(5);

      // Double digit pattern should require exactly 2 digits
      const result2 = parseHour("5", 0, "HH", undefined, dateComponents2);
      expect(result2).toBeNull();
    });

    it("stops parsing at first non-digit for variable length", () => {
      const dateComponents = createDateComponents();
      const result = parseHour("12x34", 0, "H", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.hours).toBe(12);
    });

    it("validates hour range regardless of pattern", () => {
      const dateComponents1 = createDateComponents();
      const dateComponents2 = createDateComponents();

      // Both patterns should reject invalid values
      expect(parseHour("24", 0, "H", undefined, dateComponents1)).toBeNull();
      expect(parseHour("24", 0, "HH", undefined, dateComponents2)).toBeNull();

      expect(parseHour("25", 0, "H", undefined, dateComponents1)).toBeNull();
      expect(parseHour("25", 0, "HH", undefined, dateComponents2)).toBeNull();
    });

    it("accepts midnight (hour 0)", () => {
      const dateComponents1 = createDateComponents();
      const dateComponents2 = createDateComponents();

      const result1 = parseHour("0", 0, "H", undefined, dateComponents1);
      expect(result1).not.toBeNull();
      expect(dateComponents1.hours).toBe(0);

      const result2 = parseHour("00", 0, "HH", undefined, dateComponents2);
      expect(result2).not.toBeNull();
      expect(dateComponents2.hours).toBe(0);
    });
  });
});