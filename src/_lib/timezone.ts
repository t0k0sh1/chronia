/**
 * Internal timezone utilities for the chronia library.
 * These functions are for internal use only and are not exported in the public API.
 */

import type { TZ } from "../types";
import { isValidDateOrNumber } from "./validators";

// ========================================
// Timezone Validation
// ========================================

/**
 * Validates if a value is a valid timezone (TZ object or IANA name string).
 *
 * For TZ objects, validates the ianaName property.
 * For strings, validates as IANA timezone name.
 * Uses Intl.DateTimeFormat for validation against the IANA timezone database.
 *
 * @internal
 * @param tz - TZ object or IANA timezone name string to validate
 * @returns true if tz is valid, false otherwise
 *
 * @example
 * ```typescript
 * import { JST, EST } from 'chronia';
 *
 * isValidTimeZone(JST); // true
 * isValidTimeZone(EST); // true
 * isValidTimeZone('Asia/Tokyo'); // true
 * isValidTimeZone('America/New_York'); // true
 * isValidTimeZone('UTC'); // true
 * isValidTimeZone('+09:00'); // false (UTC offset not supported)
 * isValidTimeZone('JST'); // false (abbreviation not supported)
 * isValidTimeZone(null); // false
 * isValidTimeZone(undefined); // false
 * ```
 */
export function isValidTimeZone(tz: TZ | string | unknown): boolean {
  // Extract IANA name from TZ object or use string directly
  const ianaName = typeof tz === "string" ? tz : (tz as TZ)?.ianaName;

  // Validate ianaName is a non-empty string
  if (!ianaName || typeof ianaName !== "string") {
    return false;
  }

  // Validate against IANA timezone database using Intl API
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: ianaName });
    return true;
  } catch {
    return false;
  }
}

// ========================================
// Timezone Normalization
// ========================================

/**
 * Normalizes a timezone to its canonical IANA form.
 *
 * Handles case variations and returns the canonical timezone identifier
 * from the IANA Time Zone Database. Returns null if the timezone is invalid.
 *
 * @internal
 * @param tz - TZ object or IANA timezone name string to normalize
 * @returns Canonical IANA timezone name, or null if invalid
 *
 * @example
 * ```typescript
 * import { JST } from 'chronia';
 *
 * normalizeTimeZone(JST); // 'Asia/Tokyo'
 * normalizeTimeZone('asia/tokyo'); // 'Asia/Tokyo'
 * normalizeTimeZone('AMERICA/NEW_YORK'); // 'America/New_York'
 * normalizeTimeZone('America/New_York'); // 'America/New_York' (already canonical)
 * normalizeTimeZone('invalid'); // null
 * normalizeTimeZone('+09:00'); // null
 * ```
 */
export function normalizeTimeZone(tz: TZ | string): string | null {
  // Validate timezone first
  if (!isValidTimeZone(tz)) {
    return null;
  }

  // Extract IANA name
  const ianaName = typeof tz === "string" ? tz : tz.ianaName;

  // Get canonical form using Intl API
  try {
    const formatter = new Intl.DateTimeFormat("en-US", { timeZone: ianaName });
    return formatter.resolvedOptions().timeZone;
  } catch {
    return null;
  }
}

// ========================================
// Timezone Offset Calculation
// ========================================

/**
 * Gets the UTC offset in minutes for a timezone at a specific date.
 *
 * Calculates the offset by comparing the timezone's local time representation
 * with UTC at the given reference date. Handles DST (Daylight Saving Time)
 * automatically based on the reference date.
 *
 * Returns positive values for timezones east of UTC (e.g., +540 for UTC+9)
 * and negative values for timezones west of UTC (e.g., -300 for UTC-5).
 *
 * @internal
 * @param tz - TZ object or IANA timezone name string
 * @param referenceDate - Date or timestamp for which to calculate the offset (defaults to current date)
 * @returns UTC offset in minutes, or null if timezone or date is invalid
 *
 * @example
 * ```typescript
 * import { JST, EST } from 'chronia';
 *
 * // Fixed offset timezone (no DST)
 * getTimeZoneOffset(JST, new Date(2025, 0, 1)); // 540 (UTC+9)
 * getTimeZoneOffset(JST, new Date(2025, 6, 1)); // 540 (no DST in Japan)
 *
 * // DST timezone
 * getTimeZoneOffset(EST, new Date(2025, 0, 1)); // -300 (UTC-5, EST winter)
 * getTimeZoneOffset(EST, new Date(2025, 6, 1)); // -240 (UTC-4, EDT summer)
 *
 * // String IANA name
 * getTimeZoneOffset('Asia/Tokyo', new Date()); // 540
 * getTimeZoneOffset('America/New_York', new Date()); // -300 or -240 depending on DST
 *
 * // UTC timezone
 * getTimeZoneOffset('Etc/UTC', new Date()); // 0
 *
 * // Invalid inputs
 * getTimeZoneOffset('invalid', new Date()); // null
 * getTimeZoneOffset(JST, NaN); // null
 * getTimeZoneOffset(JST, Infinity); // null
 * ```
 */
export function getTimeZoneOffset(
  tz: TZ | string,
  referenceDate: Date | number = Date.now()
): number | null {
  // Validate timezone
  if (!isValidTimeZone(tz)) {
    return null;
  }

  // Validate date
  if (!isValidDateOrNumber(referenceDate)) {
    return null;
  }

  // Extract IANA name
  const ianaName = typeof tz === "string" ? tz : tz.ianaName;

  // Convert to Date object if needed
  const date = typeof referenceDate === "number" ? new Date(referenceDate) : referenceDate;

  try {
    // Get timezone offset using Intl API
    // The offset is calculated by comparing the local time in the target timezone
    // with UTC time at the same moment
    const utcDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
    const tzDate = new Date(date.toLocaleString("en-US", { timeZone: ianaName }));

    // Calculate offset in minutes
    // Positive for east of UTC, negative for west of UTC
    const offsetMs = tzDate.getTime() - utcDate.getTime();
    return offsetMs / 60000;
  } catch {
    return null;
  }
}
