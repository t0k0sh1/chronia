import { describe, it, expect } from "vitest";
import { parseYear } from "../../../../src/_lib/parsers/tokens/year";
import { DateComponents } from "../../../../src/types";

describe("parseYear", () => {
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
    it("should parse single-digit year with 'y' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseYear("1", 0, "y", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.year).toBe(1);
    });

    it("should parse multi-digit year with 'y' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseYear("2024", 0, "y", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(4);
      expect(dateComponents.year).toBe(2024);
    });

    it("should parse two-digit year with 'yy' pattern (00-49 range)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseYear("24", 0, "yy", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.year).toBe(2024); // 24 -> 2024 (00-49 -> 2000-2049)
    });

    it("should parse two-digit year with 'yy' pattern (50-99 range)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseYear("99", 0, "yy", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.year).toBe(1999); // 99 -> 1999 (50-99 -> 1950-1999)
    });

    it("should parse three-digit year with 'yyy' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseYear("123", 0, "yyy", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
      expect(dateComponents.year).toBe(123);
    });

    it("should parse four-digit year with 'yyyy' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseYear("2024", 0, "yyyy", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(4);
      expect(dateComponents.year).toBe(2024);
    });

    it("should stop at non-digit for 'y' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseYear("12abc", 0, "y", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.year).toBe(12);
    });

    it("should parse at different position in string", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseYear("abc2024def", 3, "yyyy", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(7);
      expect(dateComponents.year).toBe(2024);
    });
  });

  describe("edge cases", () => {
    it("should handle year 0", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseYear("0", 0, "y", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.year).toBe(0);
    });

    it("should handle large years", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseYear("9999", 0, "y", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(4);
      expect(dateComponents.year).toBe(9999);
    });

    it("should handle two-digit pivot year correctly (boundary at 50)", () => {
      // Arrange
      const dateComponents1 = createDateComponents();
      const dateComponents2 = createDateComponents();
      const dateComponents3 = createDateComponents();
      const dateComponents4 = createDateComponents();

      // Act
      const result1 = parseYear("00", 0, "yy", undefined, dateComponents1);
      const result2 = parseYear("49", 0, "yy", undefined, dateComponents2);
      const result3 = parseYear("50", 0, "yy", undefined, dateComponents3);
      const result4 = parseYear("99", 0, "yy", undefined, dateComponents4);

      // Assert
      expect(result1).not.toBeNull();
      expect(dateComponents1.year).toBe(2000); // 00 -> 2000
      expect(result2).not.toBeNull();
      expect(dateComponents2.year).toBe(2049); // 49 -> 2049 (last year in 2000-2049 range)
      expect(result3).not.toBeNull();
      expect(dateComponents3.year).toBe(1950); // 50 -> 1950 (first year in 1950-1999 range)
      expect(result4).not.toBeNull();
      expect(dateComponents4.year).toBe(1999); // 99 -> 1999
    });

    it("should handle 'yyyy' pattern with variable length input", () => {
      // Arrange
      const dateComponents1 = createDateComponents();
      const dateComponents2 = createDateComponents();
      const dateComponents3 = createDateComponents();

      // Act - yyyy accepts 1-4 digits
      const result1 = parseYear("1", 0, "yyyy", undefined, dateComponents1);
      const result2 = parseYear("12", 0, "yyyy", undefined, dateComponents2);
      const result3 = parseYear("0001", 0, "yyyy", undefined, dateComponents3);

      // Assert
      expect(result1).not.toBeNull();
      expect(dateComponents1.year).toBe(1);
      expect(result2).not.toBeNull();
      expect(dateComponents2.year).toBe(12);
      expect(result3).not.toBeNull();
      expect(dateComponents3.year).toBe(1);
    });

    it("should limit parsing to maximum digits for fixed-length patterns", () => {
      // Arrange
      const dateComponents1 = createDateComponents();
      const dateComponents2 = createDateComponents();
      const dateComponents3 = createDateComponents();

      // Act - Should consume only specified number of digits
      const result1 = parseYear("123", 0, "yy", undefined, dateComponents1);
      const result2 = parseYear("1234", 0, "yyy", undefined, dateComponents2);
      const result3 = parseYear("12345", 0, "yyyy", undefined, dateComponents3);

      // Assert
      expect(result1).not.toBeNull();
      expect(result1!.position).toBe(2); // yy consumes 2 digits
      expect(dateComponents1.year).toBe(2012); // 12 -> 2012
      expect(result2).not.toBeNull();
      expect(result2!.position).toBe(3); // yyy consumes 3 digits
      expect(dateComponents2.year).toBe(123);
      expect(result3).not.toBeNull();
      expect(result3!.position).toBe(4); // yyyy consumes up to 4 digits
      expect(dateComponents3.year).toBe(1234);
    });

    it("should stop parsing at first non-digit for variable length", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseYear("123x456", 0, "y", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
      expect(dateComponents.year).toBe(123);
    });

    it("should handle end of string correctly", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseYear("2024", 0, "yyyy", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(4);
      expect(dateComponents.year).toBe(2024);
    });

    it("should handle longer token patterns (yyyyy)", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseYear("12345", 0, "yyyyy", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(5);
      expect(dateComponents.year).toBe(12345);
    });
  });

  describe("invalid inputs", () => {
    it("should return null for non-digit input with 'y' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseYear("abc", 0, "y", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for non-digit input with 'yyyy' pattern", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseYear("abcd", 0, "yyyy", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for 'yy' pattern with single digit", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseYear("1", 0, "yy", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for 'yy' pattern with non-digits", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseYear("a1", 0, "yy", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for 'yyy' pattern with two digits", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseYear("12", 0, "yyy", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for 'yyy' pattern with non-digits", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseYear("12a", 0, "yyy", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for empty string", () => {
      // Arrange
      const dateComponents = createDateComponents();

      // Act
      const result = parseYear("", 0, "y", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });
  });
});
