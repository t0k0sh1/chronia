# getTime

## Overview

The `getTime` function returns the timestamp (milliseconds since Unix epoch) of the given date. It validates the input before processing and provides a safe way to extract timestamps from Date objects or numeric timestamps.

## Signature

```typescript
function getTime(date: Date | number): number
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `date` | `Date \| number` | A Date object or numeric timestamp to convert to a timestamp |

## Return Value

| Type | Description |
|------|-------------|
| `number` | The timestamp in milliseconds since Unix epoch (1970-01-01T00:00:00.000Z), or `NaN` if the input is invalid |

## Description

The `getTime` function extracts the timestamp value from a Date object or validates and returns a numeric timestamp as-is. It ensures consistent validation across the Chronia library by checking input validity before processing.

### Specification

#### Returns a valid timestamp when:
- The argument is a valid `Date` object (not Invalid Date)
- The argument is a finite numeric timestamp, including:
  - Positive timestamps (dates after Unix epoch)
  - Zero (`0`, representing January 1, 1970, 00:00:00 UTC)
  - Negative timestamps (dates before Unix epoch)

#### Returns `NaN` when:
- The argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The argument is `NaN`
- The argument is `Infinity`
- The argument is `-Infinity`

### Behavior Notes

- Validates input using the internal `isValidDateOrNumber` validator for consistency
- For numeric input, validates the number and returns it as-is if valid
- For Date objects, calls the native `getTime()` method after validation
- No exceptions are thrown; invalid inputs return `NaN`
- Type-safe with TypeScript, accepting only `Date | number`
- Returns values are in milliseconds since the Unix epoch (midnight, January 1, 1970 UTC)

## Use Cases

- **Timestamp Extraction**: Extract numeric timestamps from Date objects for storage, comparison, or serialization. Particularly useful when working with APIs or databases that require numeric timestamps.
- **Time Calculations**: Get timestamp values for performing arithmetic operations on dates. Enables precise time difference calculations and date manipulations.
- **Input Normalization**: Normalize both Date objects and numeric timestamps to a consistent numeric format for processing. Useful when handling mixed input types from various sources.
- **Validation with Conversion**: Validate and convert date inputs in a single operation, returning `NaN` for invalid inputs to enable graceful error handling.

## Usage Examples

### Timestamp Extraction

```typescript
import { getTime } from 'chronia';

// Extract timestamp from Date object
const timestamp = getTime(new Date("2024-01-01T00:00:00.000Z"));
// Returns: 1704067200000

// Unix epoch (zero timestamp)
const epoch = getTime(new Date(0));
// Returns: 0

// Negative timestamp (before Unix epoch)
const beforeEpoch = getTime(new Date("1969-12-31T00:00:00.000Z"));
// Returns: -86400000

// Invalid date returns NaN
const invalid = getTime(new Date("invalid"));
// Returns: NaN
```

### Time Calculations

```typescript
import { getTime } from 'chronia';

// Calculate time difference between two dates
function getDifferenceInMilliseconds(date1: Date, date2: Date): number {
  const time1 = getTime(date1);
  const time2 = getTime(date2);

  // Check for invalid inputs
  if (isNaN(time1) || isNaN(time2)) {
    return NaN;
  }

  return Math.abs(time1 - time2);
}

const diff = getDifferenceInMilliseconds(
  new Date("2024-01-02"),
  new Date("2024-01-01")
);
// Returns: 86400000 (24 hours in milliseconds)
```

### Input Normalization

```typescript
import { getTime } from 'chronia';

// Handle mixed input types
function normalizeToTimestamp(date: Date | number): number {
  return getTime(date);
}

// Date object input
normalizeToTimestamp(new Date("2024-01-01"));
// Returns: 1704067200000

// Numeric timestamp input (validated and returned as-is)
normalizeToTimestamp(1704067200000);
// Returns: 1704067200000

// Invalid input
normalizeToTimestamp(NaN);
// Returns: NaN
```

### Validation with Conversion

```typescript
import { getTime } from 'chronia';

// Safe timestamp conversion with validation
function formatTimestamp(date: Date | number): string {
  const timestamp = getTime(date);

  if (isNaN(timestamp)) {
    return "Invalid timestamp";
  }

  return `Timestamp: ${timestamp}`;
}

// Valid input
formatTimestamp(new Date("2024-01-01"));
// Returns: "Timestamp: 1704067200000"

// Invalid input
formatTimestamp(new Date("invalid"));
// Returns: "Invalid timestamp"
```
