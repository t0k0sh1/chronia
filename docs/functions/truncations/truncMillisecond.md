# truncMillisecond

## Overview

The `truncMillisecond` function truncates a date to the millisecond unit. Since millisecond is the smallest unit supported by JavaScript Date objects, this function returns the same date value without any truncation, but is provided for API consistency with other truncation functions in the Chronia library.

## Signature

```typescript
function truncMillisecond(date: Date | number): Date;
```

## Parameters

| Parameter | Type             | Description                                    |
| --------- | ---------------- | ---------------------------------------------- |
| `date`    | `Date \| number` | A Date object or numeric timestamp to truncate |

## Return Value

| Type   | Description                                                                                             |
| ------ | ------------------------------------------------------------------------------------------------------- |
| `Date` | A new Date object with the same millisecond value as the input, or Invalid Date if the input is invalid |

## Description

The `truncMillisecond` function creates a new Date object with the same value as the input date. While no actual truncation occurs (since millisecond is the smallest unit in JavaScript Date objects), this function maintains API consistency with other truncation functions like `truncSecond`, `truncMinute`, and `truncHour`.

### Specification

#### Returns a new Date object with the same value when:

- The argument is a valid `Date` object (not Invalid Date)
- The argument is a finite numeric timestamp, including:
  - Positive timestamps (dates after Unix epoch)
  - Zero (`0`, representing January 1, 1970, 00:00:00.000 UTC)
  - Negative timestamps (dates before Unix epoch)

#### Returns Invalid Date when:

- The argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The argument is `NaN`
- The argument is `Infinity`
- The argument is `-Infinity`

### Behavior Notes

- Always returns a new Date instance; the input is never mutated
- Validates arguments before processing using the same validation logic as other Chronia functions
- No actual truncation occurs since millisecond (0-999) is already the smallest unit
- Provided primarily for API completeness and consistency with the truncation function family
- Type-safe with TypeScript, accepting only `Date | number`
- No exceptions are thrown; invalid values return Invalid Date

## Use Cases

- **API Consistency**: Complete the set of truncation functions in a date library, allowing users to programmatically truncate to any unit including millisecond without special-casing.
- **Date Copying**: Create a new Date instance with the same value as an existing date, ensuring no reference sharing between objects while maintaining type safety and validation.
- **Programmatic Unit Selection**: Enable generic code that truncates to a user-specified unit (including millisecond) without requiring conditional logic to handle the millisecond case differently.
- **Input Validation with Copy**: Validate a date or timestamp input and simultaneously create a new Date instance, combining validation and instantiation in a single operation.

## Usage Examples

### API Consistency

```typescript
import { truncMillisecond, truncSecond, truncMinute } from "chronia";

// Programmatically select truncation unit
type TruncUnit = "millisecond" | "second" | "minute";

function truncateToUnit(date: Date, unit: TruncUnit): Date {
  switch (unit) {
    case "millisecond":
      return truncMillisecond(date);
    case "second":
      return truncSecond(date);
    case "minute":
      return truncMinute(date);
  }
}

const date = new Date(2024, 5, 15, 14, 30, 45, 123);
truncateToUnit(date, "millisecond"); // Returns: June 15, 2024 14:30:45.123
```

### Date Copying

```typescript
import { truncMillisecond } from "chronia";

// Create a new Date instance with validation
const original = new Date(2024, 11, 31, 23, 59, 59, 999);
const copy = truncMillisecond(original);

// Mutating copy does not affect original
copy.setFullYear(2025);
console.log(original.getFullYear()); // Returns: 2024
console.log(copy.getFullYear()); // Returns: 2025
```

### Input Validation with Copy

```typescript
import { truncMillisecond } from "chronia";

// Validate and create Date instance from timestamp
function createValidDate(input: Date | number): Date | null {
  const result = truncMillisecond(input);
  return isNaN(result.getTime()) ? null : result;
}

// Valid timestamp
createValidDate(1704067200000); // Returns: Date object for Jan 1, 2024
createValidDate(0); // Returns: Date object for Jan 1, 1970

// Invalid inputs
createValidDate(NaN); // Returns: null
createValidDate(Infinity); // Returns: null
createValidDate(new Date("invalid")); // Returns: null
```

### Preserving Full Precision

```typescript
import { truncMillisecond } from "chronia";

// No truncation occurs - millisecond precision preserved
const precise = new Date(2024, 5, 15, 14, 30, 45, 123);
const result = truncMillisecond(precise);

console.log(result.getMilliseconds()); // Returns: 123 (unchanged)

// Works with timestamps
const timestamp = Date.now(); // e.g., 1704067200123
const fromTimestamp = truncMillisecond(timestamp);
console.log(fromTimestamp.getTime()); // Returns: 1704067200123 (same value)
```
