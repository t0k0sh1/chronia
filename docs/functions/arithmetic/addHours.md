# addHours

## Overview

The `addHours` function adds a specified number of hours to a given date, returning a new Date object with the hours added. It provides a safe way to perform hour-based date arithmetic while preserving other time components and handling edge cases gracefully.

## Signature

```typescript
function addHours(date: Date | number, amount: number): Date;
```

## Parameters

| Parameter | Type             | Description                                              |
| --------- | ---------------- | -------------------------------------------------------- |
| `date`    | `Date \| number` | The base date as a Date object or numeric timestamp      |
| `amount`  | `number`         | The number of hours to add (can be negative to subtract) |

## Return Value

| Type   | Description                                                                               |
| ------ | ----------------------------------------------------------------------------------------- |
| `Date` | A new Date object with the specified hours added, or Invalid Date if any input is invalid |

## Description

The `addHours` function performs hour-based date arithmetic by adding (or subtracting) a specified number of hours to a given date. The function validates all inputs before processing and returns a new Date instance, ensuring immutability of the original date. Fractional hour values are truncated toward zero, and all other time components (minutes, seconds, milliseconds) are preserved.

### Specification

#### Returns a valid Date when:

- The `date` argument is a valid Date object (not Invalid Date)
- The `date` argument is a finite numeric timestamp, including:
  - Positive timestamps (dates after Unix epoch)
  - Zero (`0`, representing January 1, 1970, 00:00:00 UTC)
  - Negative timestamps (dates before Unix epoch)
- The `amount` argument is a finite number (can be positive, negative, or zero)
- The operation correctly handles:
  - Positive amounts (adding hours)
  - Negative amounts (subtracting hours)
  - Zero amount (returns a new Date with same time)
  - Fractional amounts (truncated using `Math.trunc`)
  - Day boundary crossing
  - Month boundary crossing
  - Year boundary crossing
  - Daylight Saving Time transitions (handled by native Date implementation)

#### Returns Invalid Date when:

- The `date` argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The `date` argument is `NaN`, `Infinity`, or `-Infinity`
- The `amount` argument is `NaN`, `Infinity`, or `-Infinity`

### Behavior Notes

- **Immutability**: Always returns a new Date instance; the original date is never mutated
- **Validation**: Validates both arguments before processing using internal validators (`isValidDateOrNumber` and `isValidNumber`)
- **Truncation**: Fractional hours are truncated toward zero using `Math.trunc` (e.g., `1.9` becomes `1`, `-1.9` becomes `-1`)
- **Preservation**: Minutes, seconds, and milliseconds are preserved from the original date
- **No Exceptions**: Invalid inputs return Invalid Date rather than throwing errors
- **Type Safety**: TypeScript-typed to accept only `Date | number` for date and `number` for amount
- **Native Implementation**: Uses native `Date.setHours()` and `Date.getHours()` methods for reliable date arithmetic

## Use Cases

- **Scheduling Operations**: Calculate future or past times based on hour offsets. Useful for appointment scheduling, deadline calculations, or time-based notifications where hour-level precision is needed.
- **Time Zone Conversions**: Adjust dates by hour offsets when working with time zones. While not a full time zone solution, it's useful for simple offset-based conversions or displaying times in different zones.
- **Expiration Handling**: Set expiration times for sessions, tokens, or cache entries that expire after a certain number of hours. Common in authentication systems and temporary resource management.
- **Business Hours Calculation**: Calculate opening/closing times or shift schedules by adding or subtracting hours from a base time. Useful in workforce management and operational planning systems.
- **Time-Based Filtering**: Generate time ranges for filtering data by adding hours to create time windows. Helpful when querying logs, metrics, or events within specific hour-based ranges.

## Usage Examples

### Scheduling Operations

```typescript
import { addHours } from "chronia";

// Schedule a meeting 3 hours from now
const now = new Date(2025, 0, 15, 14, 30, 0);
const meetingTime = addHours(now, 3);
// Returns: 2025-01-15 17:30:00

// Calculate a deadline 24 hours from now
const deadline = addHours(new Date(), 24);

// Look back 2 hours for recent activity
const twoHoursAgo = addHours(new Date(), -2);
```

### Time Zone Conversions

```typescript
import { addHours } from "chronia";

// Convert UTC to EST (UTC-5)
const utcTime = new Date(Date.UTC(2025, 0, 15, 20, 0, 0));
const estTime = addHours(utcTime, -5);
// Returns: 2025-01-15 15:00:00 (EST)

// Convert PST to JST (PST+17)
const pstTime = new Date(2025, 0, 15, 9, 0, 0);
const jstTime = addHours(pstTime, 17);
// Returns: 2025-01-16 02:00:00 (JST, crosses day boundary)
```

### Expiration Handling

```typescript
import { addHours } from "chronia";

// Set session expiration to 2 hours from now
function createSession() {
  const now = new Date();
  const expiresAt = addHours(now, 2);

  return {
    id: generateId(),
    createdAt: now,
    expiresAt: expiresAt,
  };
}

// Check if token is still valid (expires in 24 hours)
function isTokenValid(tokenCreatedAt: Date): boolean {
  const expirationTime = addHours(tokenCreatedAt, 24);
  return new Date() < expirationTime;
}
```

### Business Hours Calculation

```typescript
import { addHours } from "chronia";

// Calculate closing time from opening time
const openingTime = new Date(2025, 0, 15, 9, 0, 0);
const closingTime = addHours(openingTime, 8);
// Returns: 2025-01-15 17:00:00 (8-hour work day)

// Calculate end of night shift (crosses midnight)
const shiftStart = new Date(2025, 0, 15, 22, 0, 0);
const shiftEnd = addHours(shiftStart, 8);
// Returns: 2025-01-16 06:00:00 (next day)
```

### Edge Cases and Validation

```typescript
import { addHours } from "chronia";

// Fractional hours are truncated
const result1 = addHours(new Date(2025, 0, 1, 12, 0, 0), 1.9);
// Returns: 2025-01-01 13:00:00 (1.9 truncated to 1)

const result2 = addHours(new Date(2025, 0, 1, 12, 0, 0), -1.9);
// Returns: 2025-01-01 11:00:00 (-1.9 truncated to -1)

// Minutes, seconds, and milliseconds are preserved
const precise = new Date(2025, 0, 1, 12, 34, 56, 789);
const adjusted = addHours(precise, 3);
// Returns: 2025-01-01 15:34:56.789

// Invalid inputs return Invalid Date
const invalid1 = addHours(new Date("invalid"), 3);
// Returns: Invalid Date

const invalid2 = addHours(new Date(), NaN);
// Returns: Invalid Date

const invalid3 = addHours(new Date(), Infinity);
// Returns: Invalid Date

// Zero amount returns new Date with same time
const original = new Date(2025, 0, 1, 12, 0, 0);
const copy = addHours(original, 0);
// Returns: 2025-01-01 12:00:00 (new instance, same time)

// Works with numeric timestamps
const timestamp = 1704110400000; // 2024-01-01 12:00:00 UTC
const adjusted2 = addHours(timestamp, 5);
// Returns: 2024-01-01 17:00:00 UTC
```
