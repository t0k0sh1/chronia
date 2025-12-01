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

  describe("happy path", () => {
    it("should parse single-digit hour with 'H' pattern (24-hour)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour("9", 0, "H", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.hours).toBe(9);
    });

    it("should parse double-digit hour with 'H' pattern (24-hour)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour("15", 0, "H", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.hours).toBe(15);
    });

    it("should parse hour with 'HH' pattern (zero-padded 24-hour)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour("09", 0, "HH", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.hours).toBe(9);
    });

    it("should parse hour with 'HH' pattern (two-digit 24-hour)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour("15", 0, "HH", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.hours).toBe(15);
    });

    it("should stop at non-digit for 'H' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour("15abc", 0, "H", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.hours).toBe(15);
    });

    it("should parse at different position in string", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour("abc15def", 3, "HH", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(5);
      expect(dateComponents.hours).toBe(15);
    });
  });

  describe("edge cases", () => {
    it("should handle midnight (hour 0)", () => {
      // Arrange
      const dateComponents1 = createDateComponents();
      const dateComponents2 = createDateComponents();

      // Act
      const result1 = parseHour("0", 0, "H", undefined, dateComponents1);
      const result2 = parseHour("00", 0, "HH", undefined, dateComponents2);

      // Assert
      expect(result1).not.toBeNull();
      expect(dateComponents1.hours).toBe(0);
      expect(result2).not.toBeNull();
      expect(dateComponents2.hours).toBe(0);
    });

    it("should handle noon (hour 12)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour("12", 0, "H", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.hours).toBe(12);
    });

    it("should handle last hour of day (23)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour("23", 0, "H", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.hours).toBe(23);
    });

    it("should handle common hours (6, 18)", () => {
      // Arrange
      const dateComponents1 = createDateComponents();
      const dateComponents2 = createDateComponents();

      // Act
      const result1 = parseHour("6", 0, "H", undefined, dateComponents1);
      const result2 = parseHour("18", 0, "H", undefined, dateComponents2);

      // Assert
      expect(result1).not.toBeNull();
      expect(dateComponents1.hours).toBe(6);
      expect(result2).not.toBeNull();
      expect(dateComponents2.hours).toBe(18);
    });

    it("should handle single vs double digit parsing correctly", () => {
      // Arrange
      const dateComponents1 = createDateComponents();
      const dateComponents2 = createDateComponents();

      // Act - Single digit pattern should read variable length
      const result1 = parseHour("5", 0, "H", undefined, dateComponents1);

      // Assert
      expect(result1).not.toBeNull();
      expect(result1!.position).toBe(1);
      expect(dateComponents1.hours).toBe(5);

      // Act - Double digit pattern should require exactly 2 digits
      const result2 = parseHour("5", 0, "HH", undefined, dateComponents2);

      // Assert
      expect(result2).toBeNull();
    });

    it("should stop parsing at first non-digit for variable length", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour("12x34", 0, "H", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.hours).toBe(12);
    });

    it("should handle end of string correctly", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour("23", 0, "HH", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.hours).toBe(23);
    });

    it("should return null when position is at end of string", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour("15", 2, "H", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });
  });

  describe("invalid inputs", () => {
    it("should return null for hour 24 (out of range)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour("24", 0, "H", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for hour 25 (out of range)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour("25", 0, "H", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for hour 99 (out of range)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour("99", 0, "H", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for non-digit input", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour("abc", 0, "H", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for 'HH' pattern with single digit", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour("1", 0, "HH", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for 'HH' pattern with invalid hour (24)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour("24", 0, "HH", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for 'HH' pattern with non-digits", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour("a1", 0, "HH", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should validate hour range regardless of pattern", () => {
      // Arrange
      const dateComponents1 = createDateComponents();
      const dateComponents2 = createDateComponents();

      // Act
      const result1 = parseHour("24", 0, "H", undefined, dateComponents1);
      const result2 = parseHour("24", 0, "HH", undefined, dateComponents2);

      // Assert
      expect(result1).toBeNull();
      expect(result2).toBeNull();
    });

    it("should return null for empty string", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseHour("", 0, "H", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });
  });
});
