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

  describe("happy path", () => {
    it("should parse single-digit hour with 'h' pattern (12-hour)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour12("9", 0, "h", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.hours12).toBe(9);
    });

    it("should parse double-digit hour with 'h' pattern (12-hour)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour12("12", 0, "h", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.hours12).toBe(12);
    });

    it("should parse hour with 'hh' pattern (zero-padded 12-hour)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour12("09", 0, "hh", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.hours12).toBe(9);
    });

    it("should parse hour with 'hh' pattern (two-digit 12-hour)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour12("12", 0, "hh", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.hours12).toBe(12);
    });

    it("should stop at non-digit for 'h' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour12("12abc", 0, "h", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.hours12).toBe(12);
    });

    it("should parse at different position in string", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour12("abc11def", 3, "hh", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(5);
      expect(dateComponents.hours12).toBe(11);
    });
  });

  describe("edge cases", () => {
    it("should handle first hour (1)", () => {
      // Arrange
      const dateComponents1 = createDateComponents();
      const dateComponents2 = createDateComponents();

      // Act
      const result1 = parseHour12("1", 0, "h", undefined, dateComponents1);
      const result2 = parseHour12("01", 0, "hh", undefined, dateComponents2);

      // Assert
      expect(result1).not.toBeNull();
      expect(dateComponents1.hours12).toBe(1);
      expect(result2).not.toBeNull();
      expect(dateComponents2.hours12).toBe(1);
    });

    it("should handle noon (hour 12)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour12("12", 0, "h", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.hours12).toBe(12);
    });

    it("should handle common hours (6, 11)", () => {
      // Arrange
      const dateComponents1 = createDateComponents();
      const dateComponents2 = createDateComponents();

      // Act
      const result1 = parseHour12("6", 0, "h", undefined, dateComponents1);
      const result2 = parseHour12("11", 0, "h", undefined, dateComponents2);

      // Assert
      expect(result1).not.toBeNull();
      expect(dateComponents1.hours12).toBe(6);
      expect(result2).not.toBeNull();
      expect(dateComponents2.hours12).toBe(11);
    });

    it("should handle single vs double digit parsing correctly", () => {
      // Arrange
      const dateComponents1 = createDateComponents();
      const dateComponents2 = createDateComponents();

      // Act - Single digit pattern should read variable length
      const result1 = parseHour12("5", 0, "h", undefined, dateComponents1);

      // Assert
      expect(result1).not.toBeNull();
      expect(result1!.position).toBe(1);
      expect(dateComponents1.hours12).toBe(5);

      // Act - Double digit pattern should require exactly 2 digits
      const result2 = parseHour12("5", 0, "hh", undefined, dateComponents2);

      // Assert
      expect(result2).toBeNull();
    });

    it("should stop parsing at first non-digit for variable length", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour12("11x34", 0, "h", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.hours12).toBe(11);
    });

    it("should handle end of string correctly", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour12("12", 0, "hh", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.hours12).toBe(12);
    });

    it("should return null when position is at end of string", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour12("12", 2, "h", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should set hours12 property without modifying hours", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour12("3", 0, "h", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(dateComponents.hours12).toBe(3);
      expect(dateComponents.hours).toBe(0); // Should not modify 24-hour field
    });
  });

  describe("invalid inputs", () => {
    it("should return null for hour 0 (invalid in 12-hour format)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour12("0", 0, "h", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for hour 13 (out of range)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour12("13", 0, "h", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for hour 24 (out of range)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour12("24", 0, "h", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for hour 99 (out of range)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour12("99", 0, "h", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for non-digit input", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour12("abc", 0, "h", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for 'hh' pattern with single digit", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour12("1", 0, "hh", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for 'hh' pattern with invalid hour (00)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour12("00", 0, "hh", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for 'hh' pattern with invalid hour (13)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour12("13", 0, "hh", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for 'hh' pattern with non-digits", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour12("a1", 0, "hh", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should validate hour range regardless of pattern", () => {
      // Arrange
      const dateComponents1 = createDateComponents();
      const dateComponents2 = createDateComponents();

      // Act
      const result1 = parseHour12("0", 0, "h", undefined, dateComponents1);
      const result2 = parseHour12("00", 0, "hh", undefined, dateComponents2);

      // Assert
      expect(result1).toBeNull();
      expect(result2).toBeNull();
    });

    it("should return null for empty string", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour12("", 0, "h", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });
  });
});
