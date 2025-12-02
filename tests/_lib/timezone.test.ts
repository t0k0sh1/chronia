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
        expect(isValidTimeZone("UTC")).toBe(true);
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
        // Whitespace is trimmed for better UX
        expect(isValidTimeZone(" Asia/Tokyo ")).toBe(true);
        expect(isValidTimeZone("  America/New_York  ")).toBe(true);
        expect(isValidTimeZone("\tEurope/London\n")).toBe(true);
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
        const winterDate = new Date(Date.UTC(2025, 0, 1)); // Jan 1, 2025 UTC
        const summerDate = new Date(Date.UTC(2025, 6, 1)); // Jul 1, 2025 UTC
        expect(getTimeZoneOffset(JST, winterDate)).toBe(540); // UTC+9
        expect(getTimeZoneOffset(JST, summerDate)).toBe(540); // No DST in Japan
      });

      it("should return correct offset for EST with DST", () => {
        const winterDate = new Date(Date.UTC(2025, 0, 1)); // Jan 1, 2025 UTC (EST)
        const summerDate = new Date(Date.UTC(2025, 6, 1)); // Jul 1, 2025 UTC (EDT)
        expect(getTimeZoneOffset(EST, winterDate)).toBe(-300); // UTC-5 (EST)
        expect(getTimeZoneOffset(EST, summerDate)).toBe(-240); // UTC-4 (EDT)
      });

      it("should return correct offset for PST with DST", () => {
        const winterDate = new Date(Date.UTC(2025, 0, 1)); // Jan 1, 2025 UTC (PST)
        const summerDate = new Date(Date.UTC(2025, 6, 1)); // Jul 1, 2025 UTC (PDT)
        expect(getTimeZoneOffset(PST, winterDate)).toBe(-480); // UTC-8 (PST)
        expect(getTimeZoneOffset(PST, summerDate)).toBe(-420); // UTC-7 (PDT)
      });

      it("should return correct offset for GMT with DST", () => {
        const winterDate = new Date(Date.UTC(2025, 0, 1)); // Jan 1, 2025 UTC (GMT)
        const summerDate = new Date(Date.UTC(2025, 6, 1)); // Jul 1, 2025 UTC (BST)
        expect(getTimeZoneOffset(GMT, winterDate)).toBe(0); // UTC+0 (GMT)
        expect(getTimeZoneOffset(GMT, summerDate)).toBe(60); // UTC+1 (BST)
      });

      it("should return zero offset for UTC", () => {
        const anyDate = new Date(Date.UTC(2025, 0, 1));
        expect(getTimeZoneOffset(UTC, anyDate)).toBe(0);
      });
    });

    describe("string timezone offsets", () => {
      it("should return correct offset for string IANA names", () => {
        const winterDate = new Date(Date.UTC(2025, 0, 1));
        expect(getTimeZoneOffset("Asia/Tokyo", winterDate)).toBe(540);
        expect(getTimeZoneOffset("America/New_York", winterDate)).toBe(-300);
        expect(getTimeZoneOffset("UTC", winterDate)).toBe(0);
      });
    });

    describe("default parameter behavior", () => {
      it("should use current date when referenceDate is not provided", () => {
        const offset = getTimeZoneOffset(UTC);
        expect(offset).toBe(0);
      });

      it("should accept timestamp number", () => {
        const timestamp = Date.UTC(2025, 0, 1);
        expect(getTimeZoneOffset(JST, timestamp)).toBe(540);
      });
    });

    describe("leap year edge cases", () => {
      it("should handle leap year dates correctly", () => {
        const leapYearDate = new Date(Date.UTC(2024, 1, 29)); // Feb 29, 2024 UTC
        expect(getTimeZoneOffset(JST, leapYearDate)).toBe(540);
        expect(getTimeZoneOffset(EST, leapYearDate)).toBe(-300); // Winter (EST)
        expect(getTimeZoneOffset(UTC, leapYearDate)).toBe(0);
      });

      it("should handle non-leap year Feb 28 correctly", () => {
        const nonLeapYearDate = new Date(Date.UTC(2023, 1, 28)); // Feb 28, 2023 UTC
        expect(getTimeZoneOffset(JST, nonLeapYearDate)).toBe(540);
        expect(getTimeZoneOffset(PST, nonLeapYearDate)).toBe(-480); // Winter (PST)
      });
    });

    describe("DST transition boundaries", () => {
      it("should handle EST/EDT transitions throughout the year", () => {
        // Winter (January - EST)
        const winter = new Date(Date.UTC(2024, 0, 15)); // Mid-January
        expect(getTimeZoneOffset(EST, winter)).toBe(-300); // EST (UTC-5)

        // Spring - before DST (early March - EST)
        const earlyMarch = new Date(Date.UTC(2024, 2, 5)); // March 5
        expect(getTimeZoneOffset(EST, earlyMarch)).toBe(-300); // EST (UTC-5)

        // Spring - after DST transition (mid-March - EDT)
        const midMarch = new Date(Date.UTC(2024, 2, 15)); // March 15
        expect(getTimeZoneOffset(EST, midMarch)).toBe(-240); // EDT (UTC-4)

        // Summer (July - EDT)
        const summer = new Date(Date.UTC(2024, 6, 15)); // Mid-July
        expect(getTimeZoneOffset(EST, summer)).toBe(-240); // EDT (UTC-4)

        // Fall - before DST end (early November - EDT)
        const earlyNov = new Date(Date.UTC(2024, 10, 1)); // November 1
        expect(getTimeZoneOffset(EST, earlyNov)).toBe(-240); // EDT (UTC-4)

        // Fall - after DST end (mid-November - EST)
        const midNov = new Date(Date.UTC(2024, 10, 10)); // November 10
        expect(getTimeZoneOffset(EST, midNov)).toBe(-300); // EST (UTC-5)
      });

      it("should handle PST/PDT transitions throughout the year", () => {
        // Winter (January - PST)
        const winter = new Date(Date.UTC(2024, 0, 15));
        expect(getTimeZoneOffset(PST, winter)).toBe(-480); // PST (UTC-8)

        // Summer (July - PDT)
        const summer = new Date(Date.UTC(2024, 6, 15));
        expect(getTimeZoneOffset(PST, summer)).toBe(-420); // PDT (UTC-7)
      });

      it("should handle timezones without DST (JST)", () => {
        // Japan doesn't observe DST - offset should be constant
        const winter = new Date(Date.UTC(2024, 0, 15)); // January
        const summer = new Date(Date.UTC(2024, 6, 15)); // July
        expect(getTimeZoneOffset(JST, winter)).toBe(540); // UTC+9
        expect(getTimeZoneOffset(JST, summer)).toBe(540); // UTC+9
      });
    });

    describe("month-end boundary cases", () => {
      it("should handle 31-day month ends correctly", () => {
        // Test dates at the end of 31-day months
        const jan31 = new Date(Date.UTC(2025, 0, 31)); // January 31
        const mar31 = new Date(Date.UTC(2025, 2, 31)); // March 31
        const dec31 = new Date(Date.UTC(2025, 11, 31)); // December 31

        expect(getTimeZoneOffset(JST, jan31)).toBe(540);
        expect(getTimeZoneOffset(EST, jan31)).toBe(-300); // Winter (EST)
        expect(getTimeZoneOffset(PST, jan31)).toBe(-480); // Winter (PST)

        expect(getTimeZoneOffset(JST, mar31)).toBe(540);
        expect(getTimeZoneOffset(EST, mar31)).toBe(-240); // Summer (EDT)
        expect(getTimeZoneOffset(PST, mar31)).toBe(-420); // Summer (PDT)

        expect(getTimeZoneOffset(JST, dec31)).toBe(540);
        expect(getTimeZoneOffset(EST, dec31)).toBe(-300); // Winter (EST)
        expect(getTimeZoneOffset(PST, dec31)).toBe(-480); // Winter (PST)
      });

      it("should handle 30-day month ends correctly", () => {
        // Test dates at the end of 30-day months
        const apr30 = new Date(Date.UTC(2025, 3, 30)); // April 30
        const jun30 = new Date(Date.UTC(2025, 5, 30)); // June 30
        const sep30 = new Date(Date.UTC(2025, 8, 30)); // September 30
        const nov30 = new Date(Date.UTC(2025, 10, 30)); // November 30

        expect(getTimeZoneOffset(JST, apr30)).toBe(540);
        expect(getTimeZoneOffset(EST, apr30)).toBe(-240); // Summer (EDT)

        expect(getTimeZoneOffset(JST, jun30)).toBe(540);
        expect(getTimeZoneOffset(PST, jun30)).toBe(-420); // Summer (PDT)

        expect(getTimeZoneOffset(JST, sep30)).toBe(540);
        expect(getTimeZoneOffset(EST, sep30)).toBe(-240); // Summer (EDT)

        expect(getTimeZoneOffset(JST, nov30)).toBe(540);
        expect(getTimeZoneOffset(EST, nov30)).toBe(-300); // Winter (EST)
      });

      it("should handle February 28/29 correctly", () => {
        // Non-leap year February
        const feb28_2025 = new Date(Date.UTC(2025, 1, 28)); // Feb 28, 2025
        expect(getTimeZoneOffset(JST, feb28_2025)).toBe(540);
        expect(getTimeZoneOffset(EST, feb28_2025)).toBe(-300); // Winter (EST)
        expect(getTimeZoneOffset(PST, feb28_2025)).toBe(-480); // Winter (PST)

        // Leap year February
        const feb29_2024 = new Date(Date.UTC(2024, 1, 29)); // Feb 29, 2024
        expect(getTimeZoneOffset(JST, feb29_2024)).toBe(540);
        expect(getTimeZoneOffset(EST, feb29_2024)).toBe(-300); // Winter (EST)
        expect(getTimeZoneOffset(PST, feb29_2024)).toBe(-480); // Winter (PST)
      });

      it("should handle midnight at month-end boundaries", () => {
        // Test midnight transitions at month ends
        const jan31_midnight = new Date(Date.UTC(2025, 0, 31, 23, 59, 59));
        const feb1_midnight = new Date(Date.UTC(2025, 1, 1, 0, 0, 0));

        expect(getTimeZoneOffset(JST, jan31_midnight)).toBe(540);
        expect(getTimeZoneOffset(JST, feb1_midnight)).toBe(540);

        expect(getTimeZoneOffset(EST, jan31_midnight)).toBe(-300);
        expect(getTimeZoneOffset(EST, feb1_midnight)).toBe(-300);
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
