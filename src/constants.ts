/**
 * Date constants for the minimum and maximum representable dates in JavaScript.
 *
 * JavaScript Date objects can represent dates from January 1, 271821 BC
 * to September 13, 275760 AD, based on the ECMAScript specification which
 * uses a time value range of -8,640,000,000,000,000 to 8,640,000,000,000,000
 * milliseconds relative to the Unix epoch (January 1, 1970 00:00:00 UTC).
 */

/**
 * The minimum date that can be represented by a JavaScript Date object.
 * Corresponds to April 20, 271821 BC.
 */
export const MIN_DATE = new Date(-8640000000000000);

/**
 * The maximum date that can be represented by a JavaScript Date object.
 * Corresponds to September 13, 275760 AD.
 */
export const MAX_DATE = new Date(8640000000000000);