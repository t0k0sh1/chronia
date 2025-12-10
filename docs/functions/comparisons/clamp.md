# clamp

## Overview

The `clamp` function constrains a date or timestamp to fall within a specified range. If the date is outside the bounds, it returns the nearest boundary value (minimum or maximum).

## Signature

```typescript
function clamp(
  date: Date | number,
  minDate: Date | number,
  maxDate: Date | number,
): Date;
```

## Parameters

| Parameter | Type             | Description                           |
| --------- | ---------------- | ------------------------------------- |
| `date`    | `Date \| number` | The date or timestamp to clamp        |
| `minDate` | `Date \| number` | The minimum allowed date or timestamp |
| `maxDate` | `Date \| number` | The maximum allowed date or timestamp |

## Return Value

| Type   | Description                                                                                                                                                                                                |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Date` | The clamped date as a Date object. Returns the `date` if it's within range, `minDate` if `date` is below the minimum, `maxDate` if `date` is above the maximum, or an Invalid Date if any input is invalid |

## Description

The `clamp` function ensures a date value stays within specified boundaries by returning the date itself if it's within range, or the nearest boundary if it's outside. This is useful for enforcing date constraints in applications.

### Specification

#### Returns the original `date` when:

- The date falls within the `minDate` and `maxDate` range (inclusive)
- The date equals `minDate` or `maxDate`

#### Returns `minDate` when:

- The date is earlier than `minDate`

#### Returns `maxDate` when:

- The date is later than `maxDate`

#### Returns Invalid Date when:

- Any of the input parameters (`date`, `minDate`, or `maxDate`) is an Invalid Date
- Any of the input parameters is `NaN`
- Any of the input parameters is `Infinity` or `-Infinity`

### Behavior Notes

- **Automatic Range Correction**: If `minDate` is greater than `maxDate`, the function automatically swaps them to ensure a valid range
- **Type Flexibility**: Accepts both Date objects and numeric timestamps for all three parameters
- **Consistent Return Type**: Always returns a new Date object, even when the input is a timestamp
- **Validation First**: Validates all inputs before performing any operations, ensuring type safety
- **No Mutations**: Does not modify the original Date objects; always returns a new Date instance
- **Edge Case Handling**: Returns Invalid Date if any input is invalid, following fail-fast principles

## Use Cases

- **Date Range Enforcement**: Ensure user-selected dates stay within allowed boundaries, such as preventing booking dates outside of availability windows.
- **UI Date Pickers**: Constrain date picker selections to valid ranges, like limiting a birth date to be no later than today and no earlier than 120 years ago.
- **Data Normalization**: Clean and normalize date data from external sources by clamping to acceptable business logic boundaries.
- **Time Window Restrictions**: Enforce time-based restrictions in scheduling applications, ensuring events fall within operating hours or business days.
- **Validity Boundaries**: Prevent dates from exceeding system or application limits, such as clamping to JavaScript's valid Date range.

## Usage Examples

### Date Range Enforcement

```typescript
import { clamp } from "chronia";

// Define allowed date range
const minDate = new Date(2024, 5, 10); // June 10, 2024
const maxDate = new Date(2024, 5, 20); // June 20, 2024

// Date before minimum - gets clamped to minDate
const earlyDate = new Date(2024, 5, 5); // June 5, 2024
const clampedEarly = clamp(earlyDate, minDate, maxDate);
// Returns: Date object representing June 10, 2024

// Date after maximum - gets clamped to maxDate
const lateDate = new Date(2024, 5, 25); // June 25, 2024
const clampedLate = clamp(lateDate, minDate, maxDate);
// Returns: Date object representing June 20, 2024

// Date within range - unchanged
const normalDate = new Date(2024, 5, 15); // June 15, 2024
const clampedNormal = clamp(normalDate, minDate, maxDate);
// Returns: Date object representing June 15, 2024
```

### UI Date Pickers

```typescript
import { clamp } from "chronia";

// Restrict birth date selection
function validateBirthDate(selectedDate: Date): Date {
  const today = new Date();
  const minDate = new Date(
    today.getFullYear() - 120,
    today.getMonth(),
    today.getDate(),
  );
  const maxDate = today;

  return clamp(selectedDate, minDate, maxDate);
}

// User selects a future date (invalid for birth date)
const futureDate = new Date(2030, 0, 1);
const validBirthDate = validateBirthDate(futureDate);
// Returns: Today's date (clamped to maximum)
```

### Working with Timestamps

```typescript
import { clamp } from "chronia";

// Works seamlessly with numeric timestamps
const currentTime = Date.now();
const oneHourAgo = currentTime - 60 * 60 * 1000;
const oneHourFromNow = currentTime + 60 * 60 * 1000;

// Clamp a timestamp to recent time window
const recentEvent = currentTime + 2 * 60 * 60 * 1000; // 2 hours from now
const clampedEvent = clamp(recentEvent, oneHourAgo, oneHourFromNow);
// Returns: Date object representing oneHourFromNow (clamped to maximum)
```

### Automatic Range Correction

```typescript
import { clamp } from "chronia";

// If min and max are swapped, function handles it gracefully
const date = new Date(2024, 5, 15);
const min = new Date(2024, 5, 20); // Actually the max
const max = new Date(2024, 5, 10); // Actually the min

const result = clamp(date, min, max);
// Returns: Date object representing June 15, 2024
// Function automatically corrects the range (min=June 10, max=June 20)
```

### Invalid Input Handling

```typescript
import { clamp } from "chronia";

// Returns Invalid Date if any input is invalid
const invalidDate = new Date("invalid");
const validMin = new Date(2024, 5, 10);
const validMax = new Date(2024, 5, 20);

const result = clamp(invalidDate, validMin, validMax);
// Returns: Invalid Date

// Also handles NaN and Infinity
const nanResult = clamp(NaN, validMin, validMax);
// Returns: Invalid Date

const infinityResult = clamp(Infinity, validMin, validMax);
// Returns: Invalid Date
```
