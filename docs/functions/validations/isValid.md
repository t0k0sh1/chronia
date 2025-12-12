# isValid

## Overview

The `isValid` function validates whether a given Date object or timestamp represents a valid date. It provides a reliable way to check date validity in Chronia's consistent API surface.

## Signature

```typescript
function isValid(date: DateInput): boolean;
```

## Parameters

| Parameter | Type        | Description                                                      |
| --------- | ----------- | ---------------------------------------------------------------- |
| `date`    | `DateInput` | A Date object, numeric timestamp, or ISO 8601 string to validate |

## Return Value

| Type      | Description                                            |
| --------- | ------------------------------------------------------ |
| `boolean` | Returns `true` if the date is valid, `false` otherwise |

## Description

The `isValid` function determines whether the provided Date object or timestamp represents a valid date/time value. It leverages Chronia's internal validation utilities to ensure consistency across the library.

### Specification

#### Returns `true` when:

- The argument is a valid `Date` object (not Invalid Date)
- The argument is a finite numeric timestamp, including:
  - Positive timestamps (dates after Unix epoch)
  - Zero (`0`, representing January 1, 1970, 00:00:00 UTC)
  - Negative timestamps (dates before Unix epoch)
  - Any timestamp within JavaScript's supported date range (approximately -8,640,000,000,000,000 to 8,640,000,000,000,000 milliseconds from epoch)

#### Returns `false` when:

- The argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The argument is `NaN`
- The argument is `Infinity`
- The argument is `-Infinity`
- The argument is a timestamp outside JavaScript's supported date range

### Behavior Notes

- No exceptions are thrown; invalid values return `false`
- Uses the same validation logic as other Chronia functions for consistency
- Performance-optimized for high-frequency validation scenarios
- Type-safe with TypeScript, accepting only `Date | number`

## Use Cases

- **Input Validation**: Validate user input or parsed dates before performing operations. Particularly useful when parsing date strings or receiving dates from external sources where validity cannot be guaranteed.
- **Defensive Programming**: Guard against Invalid Date objects in functions that expect valid dates. Prevents propagation of invalid values through your application's date logic.
- **Data Filtering**: Filter collections of dates to exclude invalid entries. Useful when processing arrays of dates from various sources where some entries may be corrupted or malformed.
- **Error Recovery**: Determine whether date parsing or calculation resulted in a valid date, allowing graceful error handling and user feedback instead of silent failures.

## Usage Examples

### Input Validation

```typescript
import { isValid, parse } from "chronia";

// Validate parsed date
function processUserDate(input: string): Date | null {
  const parsed = parse(input, "yyyy-MM-dd");
  return isValid(parsed) ? parsed : null;
}

// Valid Date object
isValid(new Date(2025, 0, 1)); // Returns: true

// Valid timestamp
isValid(Date.now()); // Returns: true

// Zero timestamp (Unix epoch)
isValid(0); // Returns: true

// Negative timestamp (before Unix epoch)
isValid(-1000); // Returns: true

// Invalid Date object
isValid(new Date("invalid")); // Returns: false

// Invalid numeric values
isValid(NaN); // Returns: false
isValid(Infinity); // Returns: false
isValid(-Infinity); // Returns: false
```

### Defensive Programming

```typescript
import { isValid, format } from "chronia";

function formatDate(date: Date | number): string {
  if (!isValid(date)) {
    return "Invalid date";
  }
  return format(date, "yyyy-MM-dd");
}

// Safe date formatting
formatDate(new Date(2025, 0, 1)); // Returns: '2025-01-01'
formatDate(new Date("invalid")); // Returns: 'Invalid date'
```

### Data Filtering

```typescript
import { isValid } from "chronia";

const dates = [new Date(2025, 0, 1), new Date("invalid"), Date.now(), NaN];

const validDates = dates.filter(isValid);
// Returns: [new Date(2025, 0, 1), Date.now()]
```

### Error Recovery

```typescript
import { isValid, parse, format } from "chronia";

function parseAndFormat(dateString: string): string {
  const parsed = parse(dateString, "yyyy-MM-dd");

  if (!isValid(parsed)) {
    return "Failed to parse date. Please use yyyy-MM-dd format.";
  }

  return format(parsed, "MMMM d, yyyy");
}

parseAndFormat("2025-01-01"); // Returns: 'January 1, 2025'
parseAndFormat("invalid"); // Returns: 'Failed to parse date. Please use yyyy-MM-dd format.'
```
