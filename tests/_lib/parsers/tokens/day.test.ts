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

  describe("happy path", () => {
    it("should parse single-digit day with 'd' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDay("9", 0, "d", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.day).toBe(9);
    });

    it("should parse double-digit day with 'd' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDay("15", 0, "d", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.day).toBe(15);
    });

    it("should parse day with 'dd' pattern (zero-padded)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDay("09", 0, "dd", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.day).toBe(9);
    });

    it("should parse day with 'dd' pattern (two digits)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDay("15", 0, "dd", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.day).toBe(15);
    });

    it("should stop at non-digit for 'd' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDay("15abc", 0, "d", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.day).toBe(15);
    });

    it("should parse at different position in string", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDay("abc15def", 3, "dd", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(5);
      expect(dateComponents.day).toBe(15);
    });
  });

  describe("edge cases", () => {
    it("should handle first day of month (1)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDay("1", 0, "d", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.day).toBe(1);
    });

    it("should handle last day of month (31)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDay("31", 0, "d", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.day).toBe(31);
    });

    it("should handle common days (28, 29, 30)", () => {
      // Arrange
      const dateComponents1 = createDateComponents();
      const dateComponents2 = createDateComponents();
      const dateComponents3 = createDateComponents();

      // Act
      const result1 = parseDay("28", 0, "d", undefined, dateComponents1);
      const result2 = parseDay("29", 0, "d", undefined, dateComponents2);
      const result3 = parseDay("30", 0, "d", undefined, dateComponents3);

      // Assert
      expect(result1).not.toBeNull();
      expect(dateComponents1.day).toBe(28);
      expect(result2).not.toBeNull();
      expect(dateComponents2.day).toBe(29);
      expect(result3).not.toBeNull();
      expect(dateComponents3.day).toBe(30);
    });

    it("should handle single vs double digit parsing correctly", () => {
      // Arrange
      const dateComponents1 = createDateComponents();
      const dateComponents2 = createDateComponents();

      // Act - Single digit pattern should read variable length
      const result1 = parseDay("5", 0, "d", undefined, dateComponents1);

      // Assert
      expect(result1).not.toBeNull();
      expect(result1!.position).toBe(1);
      expect(dateComponents1.day).toBe(5);

      // Act - Double digit pattern should require exactly 2 digits
      const result2 = parseDay("5", 0, "dd", undefined, dateComponents2);

      // Assert
      expect(result2).toBeNull();
    });

    it("should stop parsing at first non-digit for variable length", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDay("12x34", 0, "d", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.day).toBe(12);
    });

    it("should handle end of string correctly", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDay("31", 0, "dd", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.day).toBe(31);
    });

    it("should return null when position is at end of string", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDay("15", 2, "d", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });
  });

  describe("invalid inputs", () => {
    it("should return null for day 0 (invalid)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDay("0", 0, "d", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for day 32 (out of range)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDay("32", 0, "d", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for day 99 (out of range)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDay("99", 0, "d", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for non-digit input", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDay("abc", 0, "d", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for 'dd' pattern with single digit", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDay("1", 0, "dd", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for 'dd' pattern with invalid day (00)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDay("00", 0, "dd", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for 'dd' pattern with invalid day (32)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDay("32", 0, "dd", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for 'dd' pattern with non-digits", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDay("a1", 0, "dd", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should validate day range regardless of pattern", () => {
      // Arrange
      const dateComponents1 = createDateComponents();
      const dateComponents2 = createDateComponents();

      // Act
      const result1 = parseDay("00", 0, "d", undefined, dateComponents1);
      const result2 = parseDay("00", 0, "dd", undefined, dateComponents2);

      // Assert
      expect(result1).toBeNull();
      expect(result2).toBeNull();
    });

    it("should return null for empty string", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseDay("", 0, "d", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });
  });
});
