/**
 * Locale Test Utilities
 *
 * This module provides shared test utilities for locale data validation.
 * It separates common test logic from locale-specific data, making it easy
 * to add and test new locales.
 *
 * ## Adding Tests for a New Locale
 *
 * 1. Create a new test file: `tests/_lib/i18n/{locale}.test.ts`
 *
 * 2. Import the test utilities and your locale:
 *    ```typescript
 *    import { localeData } from "../../../src/i18n/{locale}";
 *    import {
 *      describeLocaleStructure,
 *      describeLocaleValues,
 *      LocaleExpectedValues,
 *    } from "./_testUtils";
 *    ```
 *
 * 3. Define expected values:
 *    ```typescript
 *    const expectedValues: LocaleExpectedValues = {
 *      era: { narrow: [...], abbr: [...], wide: [...] },
 *      month: { narrow: [...], abbr: [...], wide: [...] },
 *      weekday: { narrow: [...], abbr: [...], wide: [...] },
 *      dayPeriod: { narrow: [...], abbr: [...], wide: [...] },
 *      // Optional: Add equivalences for language-specific characteristics
 *      equivalences: [
 *        { component: "month", widths: ["abbr", "wide"], description: "..." },
 *      ],
 *    };
 *    ```
 *
 * 4. Call the test functions:
 *    ```typescript
 *    describeLocaleStructure(localeData, "locale-name");
 *    describeLocaleValues(localeData, "locale-name", expectedValues);
 *    ```
 */

import { describe, it, expect } from "vitest";
import type { Locale, LocaleWidth } from "../../../src/types";

/**
 * Locale component names.
 */
type LocaleComponent = "era" | "month" | "weekday" | "dayPeriod";

/**
 * Equivalence rule for language-specific tests.
 *
 * Some languages have identical values for different widths
 * (e.g., Japanese dayPeriod is the same for narrow, abbr, and wide).
 */
export type EquivalenceRule = {
  /** The locale component to test */
  component: LocaleComponent;
  /** The widths that should have equal values (at least 2) */
  widths: [LocaleWidth, LocaleWidth, ...LocaleWidth[]];
  /** Description of the equivalence rule for test output */
  description: string;
};

/**
 * Expected values for locale data testing.
 */
export type LocaleExpectedValues = {
  era: {
    narrow: readonly [string, string];
    abbr: readonly [string, string];
    wide: readonly [string, string];
  };
  month: {
    narrow: readonly string[];
    abbr: readonly string[];
    wide: readonly string[];
  };
  weekday: {
    narrow: readonly string[];
    abbr: readonly string[];
    wide: readonly string[];
  };
  dayPeriod: {
    narrow: readonly [string, string];
    abbr: readonly [string, string];
    wide: readonly [string, string];
  };
  /** Optional equivalence rules for language-specific characteristics */
  equivalences?: EquivalenceRule[];
};

/**
 * Expected array lengths for each component.
 */
const EXPECTED_LENGTHS: Record<LocaleComponent, number> = {
  era: 2,
  month: 12,
  weekday: 7,
  dayPeriod: 2,
};

/**
 * All width types.
 */
const WIDTHS: LocaleWidth[] = ["narrow", "abbr", "wide"];

/**
 * All locale components.
 */
const COMPONENTS: LocaleComponent[] = ["era", "month", "weekday", "dayPeriod"];

/**
 * Tests the structural completeness of a locale object.
 *
 * Verifies that:
 * - All required properties exist (era, month, weekday, dayPeriod)
 * - Each property has all width options (narrow, abbr, wide)
 * - Each array has the correct length
 *
 * @param locale - The locale object to test
 * @param localeName - The name of the locale (for test descriptions)
 */
export function describeLocaleStructure(
  locale: Locale,
  localeName: string
): void {
  describe(`${localeName} Locale Structure`, () => {
    describe("property completeness", () => {
      it("should have all required properties", () => {
        for (const component of COMPONENTS) {
          expect(locale).toHaveProperty(component);
        }
      });

      it.each(COMPONENTS)(
        "should have all width properties for %s",
        (component) => {
          for (const width of WIDTHS) {
            expect(locale[component]).toHaveProperty(width);
          }
        }
      );
    });

    describe("array lengths", () => {
      it.each(COMPONENTS)(
        "should have correct array lengths for %s",
        (component) => {
          const expectedLength = EXPECTED_LENGTHS[component];
          for (const width of WIDTHS) {
            expect(locale[component][width]).toHaveLength(expectedLength);
          }
        }
      );
    });
  });
}

/**
 * Tests the data values of a locale object against expected values.
 *
 * Verifies that:
 * - All era values match expected
 * - All month values match expected
 * - All weekday values match expected
 * - All dayPeriod values match expected
 * - Optional equivalence rules are satisfied (for language-specific characteristics)
 *
 * @param locale - The locale object to test
 * @param localeName - The name of the locale (for test descriptions)
 * @param expected - The expected values to compare against
 */
export function describeLocaleValues(
  locale: Locale,
  localeName: string,
  expected: LocaleExpectedValues
): void {
  describe(`${localeName} Locale Values`, () => {
    describe("era values", () => {
      it.each(WIDTHS)("should have correct %s era names", (width) => {
        expect(locale.era[width]).toEqual(expected.era[width]);
      });
    });

    describe("month values", () => {
      it.each(WIDTHS)("should have correct %s month names", (width) => {
        expect(locale.month[width]).toEqual(expected.month[width]);
      });
    });

    describe("weekday values", () => {
      it.each(WIDTHS)("should have correct %s weekday names", (width) => {
        expect(locale.weekday[width]).toEqual(expected.weekday[width]);
      });
    });

    describe("dayPeriod values", () => {
      it.each(WIDTHS)("should have correct %s day period names", (width) => {
        expect(locale.dayPeriod[width]).toEqual(expected.dayPeriod[width]);
      });
    });

    // Language-specific equivalence tests
    if (expected.equivalences && expected.equivalences.length > 0) {
      describe("language-specific characteristics", () => {
        it.each(expected.equivalences!)(
          "$description",
          ({ component, widths }) => {
            const [first, ...rest] = widths;
            const firstValue = locale[component][first];
            for (const width of rest) {
              expect(locale[component][width]).toEqual(firstValue);
            }
          }
        );
      });
    }
  });
}
