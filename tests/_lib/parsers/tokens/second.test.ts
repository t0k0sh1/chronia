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

  describe("happy path", () => {
    it("should parse single-digit second with 's' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseSecond("9", 0, "s", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.seconds).toBe(9);
    });

    it("should parse double-digit second with 's' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseSecond("30", 0, "s", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.seconds).toBe(30);
    });

    it("should parse second with 'ss' pattern (zero-padded)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseSecond("09", 0, "ss", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.seconds).toBe(9);
    });

    it("should parse second with 'ss' pattern (two digits)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseSecond("30", 0, "ss", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.seconds).toBe(30);
    });

    it("should stop at non-digit for 's' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseSecond("30abc", 0, "s", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.seconds).toBe(30);
    });

    it("should parse at different position in string", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseSecond("abc45def", 3, "ss", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(5);
      expect(dateComponents.seconds).toBe(45);
    });
  });

  describe("edge cases", () => {
    it("should handle first second of minute (0)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseSecond("0", 0, "s", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.seconds).toBe(0);
    });

    it("should handle last second of minute (59)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseSecond("59", 0, "s", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.seconds).toBe(59);
    });

    it("should handle mid-range second (30)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseSecond("30", 0, "s", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.seconds).toBe(30);
    });

    it("should handle end of string correctly", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseSecond("59", 0, "ss", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.seconds).toBe(59);
    });
  });

  describe("partial numeric input handling", () => {
    it("should parse single digit followed by non-digit character", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseSecond("3a", 0, "s", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.seconds).toBe(3);
    });

    it("should parse single digit followed by space", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseSecond("7 ", 0, "s", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.seconds).toBe(7);
    });

    it("should parse single digit followed by punctuation", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseSecond("5:", 0, "s", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.seconds).toBe(5);
    });

    it("should parse single digit followed by special character", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseSecond("9-", 0, "s", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.seconds).toBe(9);
    });
  });

  describe("invalid inputs", () => {
    it("should return null for second 60 (out of range)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseSecond("60", 0, "s", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for second 99 (out of range)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseSecond("99", 0, "s", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for non-digit input", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseSecond("abc", 0, "s", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for 'ss' pattern with single digit", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseSecond("5", 0, "ss", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for 'ss' pattern with invalid second (60)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseSecond("60", 0, "ss", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for 'ss' pattern with non-digits", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseSecond("a1", 0, "ss", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for empty string", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseSecond("", 0, "s", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });
  });
});
