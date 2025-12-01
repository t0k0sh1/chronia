import { describe, it, expect } from "vitest";
import {
  isValidTimeZone,
  normalizeTimeZone,
  getTimeZoneOffset,
} from "../../src/_lib/timezone";
import { JST, EST, PST, GMT, UTC } from "../../src/tz";

describe("timezone", () => {
  describe("isValidTimeZone", () => {
    describe("valid TZ objects", () => {
      it("should return true for JST", () => {
        expect(isValidTimeZone(JST)).toBe(true);
      });

      it("should return true for EST", () => {
        expect(isValidTimeZone(EST)).toBe(true);
      });

      it("should return true for PST", () => {
        expect(isValidTimeZone(PST)).toBe(true);
      });

      it("should return true for GMT", () => {
        expect(isValidTimeZone(GMT)).toBe(true);
      });

      it("should return true for UTC", () => {
        expect(isValidTimeZone(UTC)).toBe(true);
      });
    });

    describe("valid IANA timezone strings", () => {
      it("should return true for valid IANA timezones", () => {
        expect(isValidTimeZone("America/New_York")).toBe(true);
        expect(isValidTimeZone("Asia/Tokyo")).toBe(true);
        expect(isValidTimeZone("Europe/London")).toBe(true);
        expect(isValidTimeZone("Etc/UTC")).toBe(true);
        expect(isValidTimeZone("America/Los_Angeles")).toBe(true);
      });

      it("should return true for nested timezone paths", () => {
        expect(isValidTimeZone("America/Argentina/Buenos_Aires")).toBe(true);
      });

      it("should return true for case variations", () => {
        expect(isValidTimeZone("asia/tokyo")).toBe(true);
        expect(isValidTimeZone("AMERICA/NEW_YORK")).toBe(true);
      });
    });

    describe("invalid timezone values", () => {
      it("should return false for invalid timezone names", () => {
        expect(isValidTimeZone("invalid")).toBe(false);
        expect(isValidTimeZone("Not/A/TimeZone")).toBe(false);
        expect(isValidTimeZone("Foo/Bar")).toBe(false);
      });
    });

    describe("edge cases", () => {
      it("should return false for non-string values", () => {
        expect(isValidTimeZone(null)).toBe(false);
        expect(isValidTimeZone(undefined)).toBe(false);
        expect(isValidTimeZone(123)).toBe(false);
        expect(isValidTimeZone({})).toBe(false);
        expect(isValidTimeZone([])).toBe(false);
      });

      it("should return false for empty strings", () => {
        expect(isValidTimeZone("")).toBe(false);
        expect(isValidTimeZone("   ")).toBe(false);
      });

      it("should handle whitespace correctly", () => {
        // Note: Intl API may or may not trim whitespace
        // This test documents the behavior
        expect(isValidTimeZone(" Asia/Tokyo ")).toBe(false);
      });
    });
  });

  describe("normalizeTimeZone", () => {
    describe("TZ object normalization", () => {
      it("should return canonical form for JST", () => {
        expect(normalizeTimeZone(JST)).toBe("Asia/Tokyo");
      });

      it("should return canonical form for EST", () => {
        expect(normalizeTimeZone(EST)).toBe("America/New_York");
      });

      it("should return canonical form for PST", () => {
        expect(normalizeTimeZone(PST)).toBe("America/Los_Angeles");
      });

      it("should return canonical form for GMT", () => {
        expect(normalizeTimeZone(GMT)).toBe("Europe/London");
      });

      it("should return canonical form for UTC", () => {
        expect(normalizeTimeZone(UTC)).toBe("UTC");
      });
    });

    describe("string normalization", () => {
      it("should normalize case variations", () => {
        expect(normalizeTimeZone("asia/tokyo")).toBe("Asia/Tokyo");
        expect(normalizeTimeZone("AMERICA/NEW_YORK")).toBe("America/New_York");
      });

      it("should return canonical form for already canonical names", () => {
        expect(normalizeTimeZone("Asia/Tokyo")).toBe("Asia/Tokyo");
        expect(normalizeTimeZone("America/New_York")).toBe("America/New_York");
      });
    });

    describe("invalid inputs", () => {
      it("should return null for invalid timezones", () => {
        expect(normalizeTimeZone("invalid")).toBe(null);
        expect(normalizeTimeZone("Foo/Bar")).toBe(null);
      });

      it("should return null for non-string values", () => {
        expect(normalizeTimeZone(null as any)).toBe(null);
        expect(normalizeTimeZone(undefined as any)).toBe(null);
        expect(normalizeTimeZone(123 as any)).toBe(null);
      });
    });
  });

  describe("getTimeZoneOffset", () => {
    describe("TZ object offsets", () => {
      it("should return correct offset for JST", () => {
        const winterDate = new Date(2025, 0, 1); // Jan 1, 2025
        const summerDate = new Date(2025, 6, 1); // Jul 1, 2025
        expect(getTimeZoneOffset(JST, winterDate)).toBe(540); // UTC+9
        expect(getTimeZoneOffset(JST, summerDate)).toBe(540); // No DST in Japan
      });

      it("should return correct offset for EST with DST", () => {
        const winterDate = new Date(2025, 0, 1); // Jan 1, 2025 (EST)
        const summerDate = new Date(2025, 6, 1); // Jul 1, 2025 (EDT)
        expect(getTimeZoneOffset(EST, winterDate)).toBe(-300); // UTC-5 (EST)
        expect(getTimeZoneOffset(EST, summerDate)).toBe(-240); // UTC-4 (EDT)
      });

      it("should return correct offset for PST with DST", () => {
        const winterDate = new Date(2025, 0, 1); // Jan 1, 2025 (PST)
        const summerDate = new Date(2025, 6, 1); // Jul 1, 2025 (PDT)
        expect(getTimeZoneOffset(PST, winterDate)).toBe(-480); // UTC-8 (PST)
        expect(getTimeZoneOffset(PST, summerDate)).toBe(-420); // UTC-7 (PDT)
      });

      it("should return correct offset for GMT with DST", () => {
        const winterDate = new Date(2025, 0, 1); // Jan 1, 2025 (GMT)
        const summerDate = new Date(2025, 6, 1); // Jul 1, 2025 (BST)
        expect(getTimeZoneOffset(GMT, winterDate)).toBe(0); // UTC+0 (GMT)
        expect(getTimeZoneOffset(GMT, summerDate)).toBe(60); // UTC+1 (BST)
      });

      it("should return zero offset for UTC", () => {
        const anyDate = new Date(2025, 0, 1);
        expect(getTimeZoneOffset(UTC, anyDate)).toBe(0);
      });
    });

    describe("string timezone offsets", () => {
      it("should return correct offset for string IANA names", () => {
        const winterDate = new Date(2025, 0, 1);
        expect(getTimeZoneOffset("Asia/Tokyo", winterDate)).toBe(540);
        expect(getTimeZoneOffset("America/New_York", winterDate)).toBe(-300);
        expect(getTimeZoneOffset("Etc/UTC", winterDate)).toBe(0);
      });
    });

    describe("default parameter behavior", () => {
      it("should use current date when referenceDate is not provided", () => {
        const offset = getTimeZoneOffset(UTC);
        expect(offset).toBe(0);
      });

      it("should accept timestamp number", () => {
        const timestamp = new Date(2025, 0, 1).getTime();
        expect(getTimeZoneOffset(JST, timestamp)).toBe(540);
      });
    });

    describe("invalid inputs", () => {
      it("should return null for invalid timezone", () => {
        expect(getTimeZoneOffset("invalid", new Date())).toBe(null);
        expect(getTimeZoneOffset("Not/A/TimeZone", new Date())).toBe(null);
      });

      it("should return null for invalid date", () => {
        expect(getTimeZoneOffset(JST, NaN)).toBe(null);
        expect(getTimeZoneOffset(JST, Infinity)).toBe(null);
        expect(getTimeZoneOffset(JST, new Date("invalid"))).toBe(null);
      });

      it("should return null for non-date values", () => {
        expect(getTimeZoneOffset(JST, "2025-01-01" as any)).toBe(null);
        expect(getTimeZoneOffset(JST, null as any)).toBe(null);
      });
    });
  });
});
