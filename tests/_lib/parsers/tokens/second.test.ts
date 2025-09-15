import { describe, it, expect } from "vitest";
import { parseSecond } from "../../../../src/_lib/parsers/tokens/second";
import { DateComponents } from "../../../../src/types";

describe("parseSecond", () => {
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

  describe("s pattern (single digit second)", () => {
    it.each([
      ["0", 0, 1, 0],
      ["9", 0, 1, 9],
      ["30", 0, 2, 30],
      ["59", 0, 2, 59],
      ["5x", 0, 1, 5], // Should stop at non-digit
      ["30abc", 0, 2, 30], // Should stop at non-digit
    ])("parses %s at position %d, consumes %d chars, second=%d", (input, position, expectedLength, expectedSecond) => {
      const dateComponents = createDateComponents();
      const result = parseSecond(input, position, "s", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(position + expectedLength);
      expect(dateComponents.seconds).toBe(expectedSecond);
    });

    it("returns null for invalid second values", () => {
      const dateComponents = createDateComponents();

      expect(parseSecond("60", 0, "s", undefined, dateComponents)).toBeNull();
      expect(parseSecond("99", 0, "s", undefined, dateComponents)).toBeNull();
    });

    it("returns null for no digits", () => {
      const dateComponents = createDateComponents();
      const result = parseSecond("abc", 0, "s", undefined, dateComponents);
      expect(result).toBeNull();
    });
  });

  describe("ss pattern (two-digit second)", () => {
    it.each([
      ["00", 0, 0],
      ["09", 0, 9],
      ["30", 0, 30],
      ["59", 0, 59],
    ])("parses %s as second %d", (input, position, expectedSecond) => {
      const dateComponents = createDateComponents();
      const result = parseSecond(input, position, "ss", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(position + 2);
      expect(dateComponents.seconds).toBe(expectedSecond);
    });

    it("returns null for invalid formats or values", () => {
      const dateComponents = createDateComponents();

      expect(parseSecond("5", 0, "ss", undefined, dateComponents)).toBeNull(); // Not 2 digits
      expect(parseSecond("60", 0, "ss", undefined, dateComponents)).toBeNull(); // Invalid second
      expect(parseSecond("a1", 0, "ss", undefined, dateComponents)).toBeNull(); // Not digits
    });
  });

  describe("boundary values", () => {
    it("accepts valid second range (0-59)", () => {
      const dateComponents = createDateComponents();

      expect(parseSecond("0", 0, "s", undefined, dateComponents)).not.toBeNull();
      expect(parseSecond("59", 0, "s", undefined, dateComponents)).not.toBeNull();
      expect(parseSecond("30", 0, "s", undefined, dateComponents)).not.toBeNull();
    });

    it("rejects invalid second values", () => {
      const dateComponents = createDateComponents();

      expect(parseSecond("60", 0, "s", undefined, dateComponents)).toBeNull();
      expect(parseSecond("99", 0, "s", undefined, dateComponents)).toBeNull();
    });
  });

  describe("position handling", () => {
    it("parses at different positions", () => {
      const dateComponents = createDateComponents();
      const result = parseSecond("abc45def", 3, "ss", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(5);
      expect(dateComponents.seconds).toBe(45);
    });

    it("handles end of string", () => {
      const dateComponents = createDateComponents();
      const result = parseSecond("59", 0, "ss", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.seconds).toBe(59);
    });
  });
});