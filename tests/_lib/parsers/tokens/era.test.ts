import { describe, it, expect } from "vitest";
import { parseEra } from "../../../../src/_lib/parsers/tokens/era";
import { DateComponents, Localize } from "../../../../src/types";

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

  const mockLocalize: Localize = {
    era: (era, options) => {
      if (options?.width === "narrow") return era ? "A" : "B";
      if (options?.width === "wide") return era ? "Anno Domini" : "Before Christ";
      return era ? "AD" : "BC"; // abbreviated
    },
    month: () => "",
    weekday: () => "",
    dayPeriod: () => "",
  };

  describe("with localization", () => {
    it("parses AD/CE variants", () => {
      const dateComponents1 = createDateComponents(100);
      const dateComponents2 = createDateComponents(100);
      const dateComponents3 = createDateComponents(100);

      // Narrow
      const result1 = parseEra("A", 0, "G", mockLocalize, dateComponents1);
      expect(result1).not.toBeNull();
      expect(result1!.position).toBe(1);
      expect(dateComponents1.year).toBe(100); // No change for AD

      // Abbreviated
      const result2 = parseEra("AD", 0, "G", mockLocalize, dateComponents2);
      expect(result2).not.toBeNull();
      expect(result2!.position).toBe(2);
      expect(dateComponents2.year).toBe(100); // No change for AD

      // Wide
      const result3 = parseEra("Anno Domini", 0, "G", mockLocalize, dateComponents3);
      expect(result3).not.toBeNull();
      expect(result3!.position).toBe(11);
      expect(dateComponents3.year).toBe(100); // No change for AD
    });

    it("parses BC/BCE variants and converts year", () => {
      const dateComponents1 = createDateComponents(100);
      const dateComponents2 = createDateComponents(100);
      const dateComponents3 = createDateComponents(100);

      // Narrow
      const result1 = parseEra("B", 0, "G", mockLocalize, dateComponents1);
      expect(result1).not.toBeNull();
      expect(result1!.position).toBe(1);
      expect(dateComponents1.year).toBe(-99); // 100 BC = year -99

      // Abbreviated
      const result2 = parseEra("BC", 0, "G", mockLocalize, dateComponents2);
      expect(result2).not.toBeNull();
      expect(result2!.position).toBe(2);
      expect(dateComponents2.year).toBe(-99); // 100 BC = year -99

      // Wide
      const result3 = parseEra("Before Christ", 0, "G", mockLocalize, dateComponents3);
      expect(result3).not.toBeNull();
      expect(result3!.position).toBe(13);
      expect(dateComponents3.year).toBe(-99); // 100 BC = year -99
    });
  });

  describe("without localization (English fallback)", () => {
    it("parses AD/CE", () => {
      const dateComponents1 = createDateComponents(100);
      const dateComponents2 = createDateComponents(100);

      const result1 = parseEra("AD", 0, "G", undefined, dateComponents1);
      expect(result1).not.toBeNull();
      expect(result1!.position).toBe(2);
      expect(dateComponents1.year).toBe(100); // No change for AD

      const result2 = parseEra("CE", 0, "G", undefined, dateComponents2);
      expect(result2).not.toBeNull();
      expect(result2!.position).toBe(2);
      expect(dateComponents2.year).toBe(100); // No change for CE
    });

    it("parses BC/BCE and converts year", () => {
      const dateComponents1 = createDateComponents(100);
      const dateComponents2 = createDateComponents(1);

      const result1 = parseEra("BC", 0, "G", undefined, dateComponents1);
      expect(result1).not.toBeNull();
      expect(result1!.position).toBe(2);
      expect(dateComponents1.year).toBe(-99); // 100 BC = year -99

      const result2 = parseEra("BCE", 0, "G", undefined, dateComponents2);
      expect(result2).not.toBeNull();
      expect(result2!.position).toBe(3);
      expect(dateComponents2.year).toBe(0); // 1 BC = year 0
    });

    it("parses case-insensitive", () => {
      const dateComponents1 = createDateComponents(100);
      const dateComponents2 = createDateComponents(100);
      const dateComponents3 = createDateComponents(100);
      const dateComponents4 = createDateComponents(100);

      const result1 = parseEra("ad", 0, "G", undefined, dateComponents1);
      expect(result1).not.toBeNull();
      expect(dateComponents1.year).toBe(100);

      const result2 = parseEra("bc", 0, "G", undefined, dateComponents2);
      expect(result2).not.toBeNull();
      expect(dateComponents2.year).toBe(-99);

      const result3 = parseEra("Ad", 0, "G", undefined, dateComponents3);
      expect(result3).not.toBeNull();
      expect(dateComponents3.year).toBe(100);

      const result4 = parseEra("Bc", 0, "G", undefined, dateComponents4);
      expect(result4).not.toBeNull();
      expect(dateComponents4.year).toBe(-99);
    });

    it("parses single letter A/B", () => {
      const dateComponents1 = createDateComponents(100);
      const dateComponents2 = createDateComponents(100);

      const result1 = parseEra("A", 0, "G", undefined, dateComponents1);
      expect(result1).not.toBeNull();
      expect(result1!.position).toBe(1);
      expect(dateComponents1.year).toBe(100); // No change for A (AD)

      const result2 = parseEra("B", 0, "G", undefined, dateComponents2);
      expect(result2).not.toBeNull();
      expect(result2!.position).toBe(1);
      expect(dateComponents2.year).toBe(-99); // 100 BC = year -99
    });
  });

  describe("year conversion logic", () => {
    it("converts positive years to negative for BC", () => {
      const testCases = [
        [1, 0],     // 1 BC = year 0
        [10, -9],   // 10 BC = year -9
        [100, -99], // 100 BC = year -99
        [2024, -2023], // 2024 BC = year -2023
      ];

      testCases.forEach(([inputYear, expectedYear]) => {
        const dateComponents = createDateComponents(inputYear);
        const result = parseEra("BC", 0, "G", undefined, dateComponents);
        expect(result).not.toBeNull();
        expect(dateComponents.year).toBe(expectedYear);
      });
    });

    it("does not convert negative years for BC", () => {
      const dateComponents = createDateComponents(-50);
      const result = parseEra("BC", 0, "G", undefined, dateComponents);
      expect(result).not.toBeNull();
      expect(dateComponents.year).toBe(-50); // Already negative, no change
    });

    it("does not convert years for AD/CE", () => {
      const testCases = [1, 10, 100, 2024, -50];

      testCases.forEach((year) => {
        const dateComponents = createDateComponents(year);
        const result = parseEra("AD", 0, "G", undefined, dateComponents);
        expect(result).not.toBeNull();
        expect(dateComponents.year).toBe(year); // No change for AD
      });
    });
  });

  describe("position handling", () => {
    it("parses at different positions", () => {
      const dateComponents = createDateComponents(100);
      const result = parseEra("abcADdef", 3, "G", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(5);
      expect(dateComponents.year).toBe(100);
    });

    it("handles end of string", () => {
      const dateComponents = createDateComponents(100);
      const result = parseEra("BC", 0, "G", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(2);
      expect(dateComponents.year).toBe(-99);
    });

    it("handles position at end of string", () => {
      const dateComponents = createDateComponents(100);
      const result = parseEra("AD", 2, "G", undefined, dateComponents);

      expect(result).toBeNull(); // No characters left to parse
    });
  });

  describe("invalid input", () => {
    it("returns null for unrecognized input", () => {
      const dateComponents = createDateComponents(100);

      expect(parseEra("XD", 0, "G", undefined, dateComponents)).toBeNull();
      expect(parseEra("123", 0, "G", undefined, dateComponents)).toBeNull();
      expect(parseEra("", 0, "G", undefined, dateComponents)).toBeNull();
      expect(parseEra("Z", 0, "G", undefined, dateComponents)).toBeNull();
    });

    it("returns null when no match found with localization", () => {
      const dateComponents = createDateComponents(100);
      const result = parseEra("XYZ", 0, "G", mockLocalize, dateComponents);

      expect(result).toBeNull();
    });
  });

  describe("edge cases", () => {
    it("prefers longer matches", () => {
      // When both "BC" and "B" could match, should prefer "BC"
      const dateComponents = createDateComponents(100);
      const result = parseEra("BC", 0, "G", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(2); // Should consume both characters
      expect(dateComponents.year).toBe(-99);
    });

    it("prefers BCE over BC", () => {
      const dateComponents = createDateComponents(100);
      const result = parseEra("BCE", 0, "G", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(3); // Should consume all three characters
      expect(dateComponents.year).toBe(-99);
    });

    it("handles year 0 correctly", () => {
      const dateComponents = createDateComponents(0);
      const result = parseEra("BC", 0, "G", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(dateComponents.year).toBe(0); // 0 stays 0
    });
  });
});