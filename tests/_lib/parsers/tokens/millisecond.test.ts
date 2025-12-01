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

  describe("happy path", () => {
    it("should parse with 'S' pattern (tenths, 1 digit)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMillisecond("5", 0, "S", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.milliseconds).toBe(500);
    });

    it("should parse with 'SS' pattern (hundredths, 2 digits)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMillisecond("50", 0, "SS", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.milliseconds).toBe(500);
    });

    it("should parse with 'SSS' pattern (thousandths, 3 digits)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMillisecond("500", 0, "SSS", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
      expect(dateComponents.milliseconds).toBe(500);
    });

    it("should parse '0' with 'S' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMillisecond("0", 0, "S", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.milliseconds).toBe(0);
    });

    it("should parse '12' with 'SS' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMillisecond("12", 0, "SS", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.milliseconds).toBe(120);
    });

    it("should parse '123' with 'SSS' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMillisecond("123", 0, "SSS", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
      expect(dateComponents.milliseconds).toBe(123);
    });

    it("should parse at different position in string", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMillisecond("abc123def", 3, "SSS", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(6);
      expect(dateComponents.milliseconds).toBe(123);
    });
  });

  describe("edge cases", () => {
    it("should correctly scale different token lengths for same value", () => {
      // Arrange
      const components1 = createDateComponents();
      const components2 = createDateComponents();
      const components3 = createDateComponents();

      // Act
      parseMillisecond("5", 0, "S", undefined, components1);
      parseMillisecond("50", 0, "SS", undefined, components2);
      parseMillisecond("500", 0, "SSS", undefined, components3);

      // Assert
      expect(components1.milliseconds).toBe(500); // 5 * 100
      expect(components2.milliseconds).toBe(500); // 50 * 10
      expect(components3.milliseconds).toBe(500); // 500 * 1
    });

    it("should handle zero values correctly for all patterns", () => {
      // Arrange
      const components1 = createDateComponents();
      const components2 = createDateComponents();
      const components3 = createDateComponents();

      // Act
      parseMillisecond("0", 0, "S", undefined, components1);
      parseMillisecond("00", 0, "SS", undefined, components2);
      parseMillisecond("000", 0, "SSS", undefined, components3);

      // Assert
      expect(components1.milliseconds).toBe(0);
      expect(components2.milliseconds).toBe(0);
      expect(components3.milliseconds).toBe(0);
    });

    it("should handle maximum values correctly for all patterns", () => {
      // Arrange
      const components1 = createDateComponents();
      const components2 = createDateComponents();
      const components3 = createDateComponents();

      // Act
      parseMillisecond("9", 0, "S", undefined, components1);
      parseMillisecond("99", 0, "SS", undefined, components2);
      parseMillisecond("999", 0, "SSS", undefined, components3);

      // Assert
      expect(components1.milliseconds).toBe(900);
      expect(components2.milliseconds).toBe(990);
      expect(components3.milliseconds).toBe(999);
    });

    it("should handle single-digit zero-padded values", () => {
      // Arrange
      const components = createDateComponents();

      // Act
      const result = parseMillisecond("01", 0, "SS", undefined, components);

      // Assert
      expect(result).not.toBeNull();
      expect(components.milliseconds).toBe(10);
    });

    it("should handle double-digit zero-padded values", () => {
      // Arrange
      const components = createDateComponents();

      // Act
      const result = parseMillisecond("001", 0, "SSS", undefined, components);

      // Assert
      expect(result).not.toBeNull();
      expect(components.milliseconds).toBe(1);
    });

    it("should handle end of string correctly", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMillisecond("123", 0, "SSS", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
      expect(dateComponents.milliseconds).toBe(123);
    });

    it("should return null when position is at end of string", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMillisecond("123", 3, "S", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });
  });

  describe("invalid inputs", () => {
    it("should return null for non-digit input with 'S' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMillisecond("a", 0, "S", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for empty string with 'S' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMillisecond("", 0, "S", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for 'SS' pattern with single digit", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMillisecond("1", 0, "SS", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for 'SS' pattern with non-digits", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMillisecond("a1", 0, "SS", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for 'SSS' pattern with two digits", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMillisecond("12", 0, "SSS", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for 'SSS' pattern with non-digits", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseMillisecond("a12", 0, "SSS", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for partial match", () => {
      // Arrange
      const components = createDateComponents();

      // Act
      const result = parseMillisecond("5a", 0, "SS", undefined, components);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for unknown token", () => {
      // Arrange
      const components = createDateComponents();

      // Act
      const result = parseMillisecond("5000", 0, "SSSS", undefined, components);

      // Assert
      expect(result).toBeNull();
    });
  });
});
