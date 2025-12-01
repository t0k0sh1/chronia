import { describe, it, expect } from "vitest";
import { parseEra } from "../../../../src/_lib/parsers/tokens/era";
import { DateComponents, Locale } from "../../../../src/types";

describe("parseEra", () => {
  const createDateComponents = (year = 2000): DateComponents => ({
    year,
    month: 0,
    day: 1,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
    isPM: false,
    hours12: null,
  });

  const mockLocale: Locale = {
    era: {
      narrow: ["B", "A"],
      abbr: ["BC", "AD"],
      wide: ["Before Christ", "Anno Domini"],
    },
    month: {
      narrow: [],
      abbr: [],
      wide: [],
    },
    weekday: {
      narrow: [],
      abbr: [],
      wide: [],
    },
    dayPeriod: {
      narrow: ["", ""],
      abbr: ["", ""],
      wide: ["", ""],
    },
  };

  describe("happy path", () => {
    it("should parse AD (standard uppercase)", () => {
      // Arrange
      const dateComponents = createDateComponents(100);

      // Act
      const result = parseEra("AD", 0, "G", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.year).toBe(100); // No change for AD
    });

    it("should parse CE (Common Era)", () => {
      // Arrange
      const dateComponents = createDateComponents(100);

      // Act
      const result = parseEra("CE", 0, "G", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.year).toBe(100); // No change for CE
    });

    it("should parse BC (standard uppercase)", () => {
      // Arrange
      const dateComponents = createDateComponents(100);

      // Act
      const result = parseEra("BC", 0, "G", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.year).toBe(-99); // 100 BC = year -99
    });

    it("should parse BCE (Before Common Era)", () => {
      // Arrange
      const dateComponents = createDateComponents(1);

      // Act
      const result = parseEra("BCE", 0, "G", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
      expect(dateComponents.year).toBe(0); // 1 BC = year 0
    });

    it("should parse localized narrow 'A' for AD", () => {
      // Arrange
      const dateComponents = createDateComponents(100);

      // Act
      const result = parseEra("A", 0, "G", mockLocale, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.year).toBe(100); // No change for AD
    });

    it("should parse localized narrow 'B' for BC", () => {
      // Arrange
      const dateComponents = createDateComponents(100);

      // Act
      const result = parseEra("B", 0, "G", mockLocale, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.year).toBe(-99); // 100 BC = year -99
    });

    it("should parse localized abbreviated 'AD'", () => {
      // Arrange
      const dateComponents = createDateComponents(100);

      // Act
      const result = parseEra("AD", 0, "G", mockLocale, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.year).toBe(100); // No change for AD
    });

    it("should parse localized abbreviated 'BC'", () => {
      // Arrange
      const dateComponents = createDateComponents(100);

      // Act
      const result = parseEra("BC", 0, "G", mockLocale, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.year).toBe(-99); // 100 BC = year -99
    });

    it("should parse localized wide 'Anno Domini' for AD", () => {
      // Arrange
      const dateComponents = createDateComponents(100);

      // Act
      const result = parseEra("Anno Domini", 0, "G", mockLocale, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(11);
      expect(dateComponents.year).toBe(100); // No change for AD
    });

    it("should parse localized wide 'Before Christ' for BC", () => {
      // Arrange
      const dateComponents = createDateComponents(100);

      // Act
      const result = parseEra("Before Christ", 0, "G", mockLocale, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(13);
      expect(dateComponents.year).toBe(-99); // 100 BC = year -99
    });

    it("should parse at different position in string", () => {
      // Arrange
      const dateComponents = createDateComponents(100);

      // Act
      const result = parseEra("abcADdef", 3, "G", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(5);
      expect(dateComponents.year).toBe(100);
    });
  });

  describe("edge cases", () => {
    it("should parse case-insensitive 'ad' (lowercase)", () => {
      // Arrange
      const dateComponents = createDateComponents(100);

      // Act
      const result = parseEra("ad", 0, "G", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.year).toBe(100);
    });

    it("should parse case-insensitive 'bc' (lowercase)", () => {
      // Arrange
      const dateComponents = createDateComponents(100);

      // Act
      const result = parseEra("bc", 0, "G", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.year).toBe(-99);
    });

    it("should parse case-insensitive 'Ad' (mixed case)", () => {
      // Arrange
      const dateComponents = createDateComponents(100);

      // Act
      const result = parseEra("Ad", 0, "G", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.year).toBe(100);
    });

    it("should parse case-insensitive 'Bc' (mixed case)", () => {
      // Arrange
      const dateComponents = createDateComponents(100);

      // Act
      const result = parseEra("Bc", 0, "G", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.year).toBe(-99);
    });

    it("should parse single letter 'A' for AD", () => {
      // Arrange
      const dateComponents = createDateComponents(100);

      // Act
      const result = parseEra("A", 0, "G", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.year).toBe(100); // No change for A (AD)
    });

    it("should parse single letter 'B' for BC", () => {
      // Arrange
      const dateComponents = createDateComponents(100);

      // Act
      const result = parseEra("B", 0, "G", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(1);
      expect(dateComponents.year).toBe(-99); // 100 BC = year -99
    });

    it("should convert year 1 BC to year 0", () => {
      // Arrange
      const dateComponents = createDateComponents(1);

      // Act
      const result = parseEra("BC", 0, "G", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(dateComponents.year).toBe(0); // 1 BC = year 0
    });

    it("should convert year 10 BC to year -9", () => {
      // Arrange
      const dateComponents = createDateComponents(10);

      // Act
      const result = parseEra("BC", 0, "G", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(dateComponents.year).toBe(-9); // 10 BC = year -9
    });

    it("should convert year 2024 BC to year -2023", () => {
      // Arrange
      const dateComponents = createDateComponents(2024);

      // Act
      const result = parseEra("BC", 0, "G", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(dateComponents.year).toBe(-2023); // 2024 BC = year -2023
    });

    it("should not convert negative years for BC", () => {
      // Arrange
      const dateComponents = createDateComponents(-50);

      // Act
      const result = parseEra("BC", 0, "G", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(dateComponents.year).toBe(-50); // Already negative, no change
    });

    it("should not convert years for AD", () => {
      // Arrange
      const dateComponents = createDateComponents(100);

      // Act
      const result = parseEra("AD", 0, "G", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(dateComponents.year).toBe(100); // No change for AD
    });

    it("should not convert negative years for AD", () => {
      // Arrange
      const dateComponents = createDateComponents(-50);

      // Act
      const result = parseEra("AD", 0, "G", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(dateComponents.year).toBe(-50); // No change for AD
    });

    it("should handle year 0 correctly", () => {
      // Arrange
      const dateComponents = createDateComponents(0);

      // Act
      const result = parseEra("BC", 0, "G", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(dateComponents.year).toBe(0); // 0 stays 0
    });

    it("should prefer longer matches (BC over B)", () => {
      // Arrange
      const dateComponents = createDateComponents(100);

      // Act - When both "BC" and "B" could match, should prefer "BC"
      const result = parseEra("BC", 0, "G", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2); // Should consume both characters
      expect(dateComponents.year).toBe(-99);
    });

    it("should prefer longer matches (BCE over BC)", () => {
      // Arrange
      const dateComponents = createDateComponents(100);

      // Act
      const result = parseEra("BCE", 0, "G", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(3); // Should consume all three characters
      expect(dateComponents.year).toBe(-99);
    });

    it("should handle end of string correctly", () => {
      // Arrange
      const dateComponents = createDateComponents(100);

      // Act
      const result = parseEra("BC", 0, "G", undefined, dateComponents);

      // Assert
      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.year).toBe(-99);
    });

    it("should return null when position is at end of string", () => {
      // Arrange
      const dateComponents = createDateComponents(100);

      // Act
      const result = parseEra("AD", 2, "G", undefined, dateComponents);

      // Assert
      expect(result).toBeNull(); // No characters left to parse
    });
  });

  describe("invalid inputs", () => {
    it("should return null for unrecognized input 'XD'", () => {
      // Arrange
      const dateComponents = createDateComponents(100);

      // Act
      const result = parseEra("XD", 0, "G", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for numeric input '123'", () => {
      // Arrange
      const dateComponents = createDateComponents(100);

      // Act
      const result = parseEra("123", 0, "G", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for empty string", () => {
      // Arrange
      const dateComponents = createDateComponents(100);

      // Act
      const result = parseEra("", 0, "G", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for invalid letter 'Z'", () => {
      // Arrange
      const dateComponents = createDateComponents(100);

      // Act
      const result = parseEra("Z", 0, "G", undefined, dateComponents);

      // Assert
      expect(result).toBeNull();
    });

    it("should return null when no match found with localization", () => {
      // Arrange
      const dateComponents = createDateComponents(100);

      // Act
      const result = parseEra("XYZ", 0, "G", mockLocale, dateComponents);

      // Assert
      expect(result).toBeNull();
    });
  });
});
