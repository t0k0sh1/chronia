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

  describe("happy path", () => {
    it("should parse single-digit minute with 'm' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMinute("9", 0, "m", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.minutes).toBe(9);
    });

    it("should parse double-digit minute with 'm' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMinute("30", 0, "m", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.minutes).toBe(30);
    });

    it("should parse minute with 'mm' pattern (zero-padded)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMinute("09", 0, "mm", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.minutes).toBe(9);
    });

    it("should parse minute with 'mm' pattern (two digits)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMinute("30", 0, "mm", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.minutes).toBe(30);
    });

    it("should stop at non-digit for 'm' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMinute("30abc", 0, "m", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.minutes).toBe(30);
    });

    it("should parse at different position in string", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMinute("abc45def", 3, "mm", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(5);
      expect(dateComponents.minutes).toBe(45);
    });
  });

  describe("edge cases", () => {
    it("should handle first minute of hour (0)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMinute("0", 0, "m", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.minutes).toBe(0);
    });

    it("should handle last minute of hour (59)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMinute("59", 0, "m", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.minutes).toBe(59);
    });

    it("should handle mid-range minute (30)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMinute("30", 0, "m", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.minutes).toBe(30);
    });

    it("should handle end of string correctly", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMinute("59", 0, "mm", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.minutes).toBe(59);
    });
  });

  describe("invalid inputs", () => {
    it("should return null for minute 60 (out of range)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMinute("60", 0, "m", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for minute 99 (out of range)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMinute("99", 0, "m", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for non-digit input", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMinute("abc", 0, "m", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for 'mm' pattern with single digit", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMinute("5", 0, "mm", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for 'mm' pattern with invalid minute (60)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMinute("60", 0, "mm", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for 'mm' pattern with non-digits", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMinute("a1", 0, "mm", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for empty string", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMinute("", 0, "m", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });
  });
});
