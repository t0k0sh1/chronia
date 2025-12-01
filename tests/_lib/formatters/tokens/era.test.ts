import { describe, it, expect } from "vitest";
import { formatEra } from "../../../../src/_lib/formatters/tokens/era";
import { Locale } from "../../../../src/types";

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

describe("formatEra", () => {
  describe("happy path", () => {
    it("should format AD era with 'G' token (abbreviated)", () => {
      // Arrange
      const date = new Date(0, 0, 1);
      date.setFullYear(2025);

      // Act
      const result = formatEra(date, "G");

      // Assert
      expect(result).toBe("AD");
    });

    it("should format BC era with 'G' token (abbreviated)", () => {
      // Arrange
      const date = new Date(0, 0, 1);
      date.setFullYear(0);

      // Act
      const result = formatEra(date, "G");

      // Assert
      expect(result).toBe("BC");
    });

    it("should format AD era with locale (abbreviated)", () => {
      // Arrange
      const date = new Date(0, 0, 1);
      date.setFullYear(2025);

      // Act
      const result = formatEra(date, "G", mockLocale);

      // Assert
      expect(result).toBe("AD");
    });

    it("should format AD era with locale (wide)", () => {
      // Arrange
      const date = new Date(0, 0, 1);
      date.setFullYear(2025);

      // Act
      const result = formatEra(date, "GGGG", mockLocale);

      // Assert
      expect(result).toBe("Anno Domini");
    });

    it("should format AD era with locale (narrow)", () => {
      // Arrange
      const date = new Date(0, 0, 1);
      date.setFullYear(2025);

      // Act
      const result = formatEra(date, "GGGGG", mockLocale);

      // Assert
      expect(result).toBe("A");
    });
  });

  describe("edge cases", () => {
    it("should handle year 0 as BC", () => {
      // Arrange
      const date = new Date(0, 0, 1);
      date.setFullYear(0);

      // Act
      const result = formatEra(date, "G", mockLocale);

      // Assert
      expect(result).toBe("BC");
    });

    it("should handle negative year (-1) as BC", () => {
      // Arrange
      const date = new Date(0, 0, 1);
      date.setFullYear(-1);

      // Act
      const resultG = formatEra(date, "G", mockLocale);
      const resultGGGG = formatEra(date, "GGGG", mockLocale);
      const resultGGGGG = formatEra(date, "GGGGG", mockLocale);

      // Assert
      expect(resultG).toBe("BC");
      expect(resultGGGG).toBe("Before Christ");
      expect(resultGGGGG).toBe("B");
    });

    it("should handle year 1 as AD", () => {
      // Arrange
      const date = new Date(0, 0, 1);
      date.setFullYear(1);

      // Act
      const result = formatEra(date, "G");

      // Assert
      expect(result).toBe("AD");
    });
  });

});
