# getMilliseconds

## Overview

The `getMilliseconds` function extracts the milliseconds component (0-999) from a given Date object or timestamp. It provides a type-safe way to access millisecond values with built-in validation, consistent with Chronia's API design.

## Signature

```typescript
function getMilliseconds(date: Date | number): number
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `date` | `Date \| number` | A Date object or numeric timestamp from which to extract milliseconds |

## Return Value

| Type | Description |
|------|-------------|
| `number` | Returns the milliseconds component (0-999) of the given date, or `NaN` if the input is invalid |

## Description

The `getMilliseconds` function retrieves the milliseconds component from a date value. It validates the input before processing and ensures consistent behavior across Chronia's API surface by handling both Date objects and numeric timestamps.

### Specification

#### Returns a number (0-999) when:
- The argument is a valid `Date` object
- The argument is a finite numeric timestamp, including:
  - Positive timestamps (dates after Unix epoch)
  - Zero (`0`, representing January 1, 1970, 00:00:00.000 UTC)
  - Negative timestamps (dates before Unix epoch)

#### Returns `NaN` when:
- The argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The argument is `NaN`
- The argument is `Infinity`
- The argument is `-Infinity`

### Behavior Notes

- Validates arguments before processing using `isValidDateOrNumber` for consistency
- No exceptions are thrown; invalid values return `NaN`
- Returns the milliseconds component in local time (not UTC)
- The returned value is always in the range 0-999 for valid dates
- Type-safe with TypeScript, accepting only `Date | number`
- Internally converts numeric timestamps to Date objects before extraction

## Use Cases

- **High-Precision Timing**: Extract millisecond components when working with high-precision timestamps, such as performance measurements, logging systems, or event timing applications.
- **Time Component Extraction**: Isolate the milliseconds portion of a datetime value for display, calculation, or comparison purposes, particularly in time-sensitive applications.
- **Data Validation**: Verify millisecond components of parsed dates or user input to ensure values fall within expected ranges or match specific patterns.
- **Time Formatting**: Build custom date/time formatters that need to display or process milliseconds separately from other time components.

## Usage Examples

### High-Precision Timing

```typescript
import { getMilliseconds } from 'chronia';

// Extract milliseconds from a Date object
const date = new Date(2024, 0, 15, 12, 30, 45, 123);
getMilliseconds(date);  // Returns: 123

// Get milliseconds from timestamp
const timestamp = 1704067200500; // 2024-01-01T00:00:00.500Z in UTC
getMilliseconds(timestamp);  // Returns: 500

// Measure elapsed milliseconds
const start = new Date();
// ... some operation ...
const end = new Date();
const msStart = getMilliseconds(start);
const msEnd = getMilliseconds(end);
```

### Time Component Extraction

```typescript
import { getMilliseconds } from 'chronia';

// Start of second (0 milliseconds)
const startOfSecond = new Date(2024, 0, 1, 0, 0, 0, 0);
getMilliseconds(startOfSecond);  // Returns: 0

// End of second (999 milliseconds)
const endOfSecond = new Date(2024, 0, 1, 0, 0, 0, 999);
getMilliseconds(endOfSecond);  // Returns: 999

// Extract from current time
const now = new Date();
const ms = getMilliseconds(now);
console.log(`Current milliseconds: ${ms}`);
```

### Data Validation

```typescript
import { getMilliseconds } from 'chronia';

// Validate millisecond component
function hasValidMilliseconds(date: Date | number): boolean {
  const ms = getMilliseconds(date);
  return !isNaN(ms) && ms >= 0 && ms <= 999;
}

// Valid date
hasValidMilliseconds(new Date(2024, 0, 1, 0, 0, 0, 500));  // Returns: true

// Invalid date returns NaN
const invalidDate = new Date('invalid');
getMilliseconds(invalidDate);  // Returns: NaN
hasValidMilliseconds(invalidDate);  // Returns: false
```

### Time Formatting

```typescript
import { getMilliseconds } from 'chronia';

// Custom formatter with milliseconds
function formatWithMilliseconds(date: Date | number): string {
  const ms = getMilliseconds(date);

  if (isNaN(ms)) {
    return 'Invalid date';
  }

  const dateObj = typeof date === 'number' ? new Date(date) : date;
  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  const seconds = dateObj.getSeconds().toString().padStart(2, '0');
  const milliseconds = ms.toString().padStart(3, '0');

  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

const date = new Date(2024, 0, 15, 12, 30, 45, 123);
formatWithMilliseconds(date);  // Returns: '12:30:45.123'
```
