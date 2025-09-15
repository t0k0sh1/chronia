import { describe, it, expect } from "vitest";
import { parseHour12 } from "../../../../src/_lib/parsers/tokens/hour12";
import { DateComponents } from "../../../../src/types";

describe("parseHour12", () => {
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

  describe("h pattern (single digit 12-hour)", () => {
    it.each([
      ["1", 0, 1, 1],
      ["9", 0, 1, 9],
      ["12", 0, 2, 12],
      ["1x", 0, 1, 1], // Should stop at non-digit
      ["12abc", 0, 2, 12], // Should stop at non-digit
    ])("parses %s at position %d, consumes %d chars, hour12=%d", (input, position, expectedLength, expectedHour12) => {
      const dateComponents = createDateComponents();
      const result = parseHour12(input, position, "h", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(position + expectedLength);
      expect(dateComponents.hours12).toBe(expectedHour12);
    });

    it("returns null for invalid hour values", () => {
      const dateComponents = createDateComponents();

      expect(parseHour12("0", 0, "h", undefined, dateComponents)).toBeNull();
      expect(parseHour12("13", 0, "h", undefined, dateComponents)).toBeNull();
      expect(parseHour12("24", 0, "h", undefined, dateComponents)).toBeNull();
      expect(parseHour12("99", 0, "h", undefined, dateComponents)).toBeNull();
    });

    it("returns null for no digits", () => {
      const dateComponents = createDateComponents();
      const result = parseHour12("abc", 0, "h", undefined, dateComponents);
      expect(result).toBeNull();
    });
  });

  describe("hh pattern (two-digit 12-hour)", () => {
    it.each([
      ["01", 0, 1],
      ["09", 0, 9],
      ["12", 0, 12],
    ])("parses %s as hour12 %d", (input, position, expectedHour12) => {
      const dateComponents = createDateComponents();
      const result = parseHour12(input, position, "hh", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(position + 2);
      expect(dateComponents.hours12).toBe(expectedHour12);
    });

    it("returns null for invalid formats or values", () => {
      const dateComponents = createDateComponents();

      expect(parseHour12("1", 0, "hh", undefined, dateComponents)).toBeNull(); // Not 2 digits
      expect(parseHour12("00", 0, "hh", undefined, dateComponents)).toBeNull(); // Invalid hour (0 not allowed in 12-hour)
      expect(parseHour12("13", 0, "hh", undefined, dateComponents)).toBeNull(); // Invalid hour
      expect(parseHour12("a1", 0, "hh", undefined, dateComponents)).toBeNull(); // Not digits
    });
  });

  describe("boundary values", () => {
    it("accepts valid 12-hour range (1-12)", () => {
      const dateComponents = createDateComponents();

      // Test boundary values
      expect(parseHour12("1", 0, "h", undefined, dateComponents)).not.toBeNull();
      expect(parseHour12("12", 0, "h", undefined, dateComponents)).not.toBeNull();

      // Test common values
      expect(parseHour12("6", 0, "h", undefined, dateComponents)).not.toBeNull();
      expect(parseHour12("11", 0, "h", undefined, dateComponents)).not.toBeNull();
    });

    it("rejects invalid hour values", () => {
      const dateComponents = createDateComponents();

      expect(parseHour12("0", 0, "h", undefined, dateComponents)).toBeNull(); // 0 not valid in 12-hour format
      expect(parseHour12("13", 0, "h", undefined, dateComponents)).toBeNull();
      expect(parseHour12("24", 0, "h", undefined, dateComponents)).toBeNull();
      expect(parseHour12("99", 0, "h", undefined, dateComponents)).toBeNull();
    });
  });

  describe("position handling", () => {
    it("parses at different positions", () => {
      const dateComponents = createDateComponents();
      const result = parseHour12("abc11def", 3, "hh", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(5);
      expect(dateComponents.hours12).toBe(11);
    });

    it("handles end of string", () => {
      const dateComponents = createDateComponents();
      const result = parseHour12("12", 0, "hh", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.hours12).toBe(12);
    });

    it("handles position at end of string", () => {
      const dateComponents = createDateComponents();
      const result = parseHour12("12", 2, "h", undefined, dateComponents);

      expect(result).toBeNull(); // No characters left to parse
    });
  });

  describe("edge cases", () => {
    it("handles single vs double digit parsing correctly", () => {
      const dateComponents1 = createDateComponents();
      const dateComponents2 = createDateComponents();

      // Single digit pattern should read variable length
      const result1 = parseHour12("5", 0, "h", undefined, dateComponents1);
      expect(result1).not.toBeNull();
      expect(result1!.position).toBe(1);
      expect(dateComponents1.hours12).toBe(5);

      // Double digit pattern should require exactly 2 digits
      const result2 = parseHour12("5", 0, "hh", undefined, dateComponents2);
      expect(result2).toBeNull();
    });

    it("stops parsing at first non-digit for variable length", () => {
      const dateComponents = createDateComponents();
      const result = parseHour12("11x34", 0, "h", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.hours12).toBe(11);
    });

    it("validates hour range regardless of pattern", () => {
      const dateComponents1 = createDateComponents();
      const dateComponents2 = createDateComponents();

      // Both patterns should reject invalid values
      expect(parseHour12("0", 0, "h", undefined, dateComponents1)).toBeNull();
      expect(parseHour12("00", 0, "hh", undefined, dateComponents2)).toBeNull();

      expect(parseHour12("13", 0, "h", undefined, dateComponents1)).toBeNull();
      expect(parseHour12("13", 0, "hh", undefined, dateComponents2)).toBeNull();
    });

    it("sets hours12 property correctly", () => {
      const dateComponents = createDateComponents();
      const result = parseHour12("3", 0, "h", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(dateComponents.hours12).toBe(3);
      expect(dateComponents.hours).toBe(0); // Should not modify 24-hour field
    });

    it("accepts noon (hour 12)", () => {
      const dateComponents1 = createDateComponents();
      const dateComponents2 = createDateComponents();

      const result1 = parseHour12("12", 0, "h", undefined, dateComponents1);
      expect(result1).not.toBeNull();
      expect(dateComponents1.hours12).toBe(12);

      const result2 = parseHour12("12", 0, "hh", undefined, dateComponents2);
      expect(result2).not.toBeNull();
      expect(dateComponents2.hours12).toBe(12);
    });
  });
});