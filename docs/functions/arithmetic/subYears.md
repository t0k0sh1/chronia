# subYears

## Overview

The `subYears` function subtracts a specified number of years from a given date, returning a new Date object. It provides a convenient way to perform year-based date arithmetic while preserving other date components and handling edge cases like leap years.

## Signature

```typescript
function subYears(date: Date | number, amount: number): Date
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `date` | `Date \| number` | The base date as a Date object or numeric timestamp from which to subtract years |
| `amount` | `number` | The number of years to subtract (can be negative to add years instead) |

## Return Value

| Type | Description |
|------|-------------|
| `Date` | A new Date object with the specified number of years subtracted, or Invalid Date if any input is invalid |

## Description

The `subYears` function calculates a new date by subtracting the specified number of years from the input date. It validates all arguments before processing and preserves the month, day, and time components of the original date. The function handles leap year edge cases automatically, adjusting February 29 dates when the target year is not a leap year.

### Specification

#### Returns a valid `Date` when:
- The `date` argument is a valid Date object or finite numeric timestamp
- The `amount` argument is a finite number
- Fractional `amount` values are automatically truncated toward zero using `Math.trunc`
  - `1.9` becomes `1`
  - `-1.9` becomes `-1`
- Negative `amount` values effectively add years (e.g., subtracting -3 years adds 3 years)
- Month, day, and time components (hours, minutes, seconds, milliseconds) are preserved
- Leap year adjustment: February 29 becomes February 28 when the target year is not a leap year
- Leap year preservation: February 29 remains February 29 when the target year is also a leap year

#### Returns Invalid Date when:
- The `date` argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The `date` argument is `NaN`, `Infinity`, or `-Infinity`
- The `amount` argument is `NaN`, `Infinity`, or `-Infinity`

### Behavior Notes

- No exceptions are thrown; invalid inputs return Invalid Date
- Always returns a new Date instance without mutating the original input
- Internally uses `addYears` with a negated amount for implementation efficiency
- Validates `amount` first before delegating to `addYears` for consistent error handling
- Type-safe with TypeScript, accepting only `Date | number` for the date parameter
- Follows Chronia's consistent validation pattern across all date manipulation functions
- Performance-optimized by leveraging the existing `addYears` implementation

## Use Cases

- **Historical Date Calculations**: Calculate dates in the past by subtracting years from a reference date. Useful for determining birth dates from age, calculating anniversary dates, or analyzing historical trends.
- **Age-Based Operations**: Compute dates relative to a person's age, such as determining when someone was born based on their current age or calculating eligibility dates based on age requirements.
- **Contract and Subscription Management**: Calculate start dates or retroactive dates for contracts, subscriptions, or agreements that span multiple years. Particularly useful for backdating documents or determining when multi-year terms began.
- **Time Travel in Testing**: Generate dates in the past for testing purposes, such as creating historical data sets or validating date-dependent business logic across different time periods.
- **Reverse Date Calculations**: Work backwards from a known date to determine when an event occurred, such as calculating when a project started based on its completion date and duration in years.

## Usage Examples

### Historical Date Calculations

```typescript
import { subYears } from 'chronia';

// Calculate a date 5 years in the past
const fiveYearsAgo = subYears(new Date(2025, 0, 15), 5);
// Returns: Date object representing 2020-01-15

// Subtract years from a timestamp
const timestamp = new Date(2025, 5, 20).getTime();
const threeYearsEarlier = subYears(timestamp, 3);
// Returns: Date object representing 2022-06-20

// Use current date for recent history
const now = new Date();
const oneYearAgo = subYears(now, 1);
// Returns: Date object representing exactly 1 year before current date
```

### Age-Based Operations

```typescript
import { subYears } from 'chronia';

// Calculate birth year from current age
function estimateBirthDate(currentDate: Date, age: number): Date {
  return subYears(currentDate, age);
}

const birthDate = estimateBirthDate(new Date(2025, 0, 1), 30);
// Returns: Date object representing 1995-01-01

// Determine eligibility date (e.g., must be 18 years old)
function getEligibilityDate(minimumAge: number): Date {
  return subYears(new Date(), minimumAge);
}

const mustBeBornBefore = getEligibilityDate(18);
// Returns: Date 18 years before today
```

### Leap Year Handling

```typescript
import { subYears } from 'chronia';

// Leap year to non-leap year (Feb 29 → Feb 28)
const leapDate = new Date(2024, 1, 29); // Feb 29, 2024
const result1 = subYears(leapDate, 1);
// Returns: Date object representing 2023-02-28 (2023 is not a leap year)

// Leap year to leap year (Feb 29 → Feb 29)
const result2 = subYears(leapDate, 4);
// Returns: Date object representing 2020-02-29 (2020 is a leap year)

// Non-leap year date remains unchanged
const regularDate = new Date(2023, 1, 28); // Feb 28, 2023
const result3 = subYears(regularDate, 2);
// Returns: Date object representing 2021-02-28
```

### Negative Amounts (Adding Years)

```typescript
import { subYears } from 'chronia';

// Negative amount adds years instead
const baseDate = new Date(2020, 5, 15);
const futureDate = subYears(baseDate, -3);
// Returns: Date object representing 2023-06-15

// Equivalent to addYears
import { addYears } from 'chronia';
const result1 = subYears(baseDate, -3);
const result2 = addYears(baseDate, 3);
// result1 and result2 are equivalent
```

### Fractional Years and Edge Cases

```typescript
import { subYears } from 'chronia';

// Fractional amounts are truncated toward zero
const date = new Date(2025, 0, 1);
const result1 = subYears(date, 1.9);
// Returns: Date object representing 2024-01-01 (1.9 truncated to 1)

const result2 = subYears(date, -1.9);
// Returns: Date object representing 2024-01-01 (-1.9 truncated to -1)

// Invalid inputs return Invalid Date
const invalidResult = subYears(new Date('invalid'), 3);
// Returns: Invalid Date

const nanResult = subYears(new Date(), NaN);
// Returns: Invalid Date

const infinityResult = subYears(new Date(), Infinity);
// Returns: Invalid Date
```

### Time Preservation

```typescript
import { subYears } from 'chronia';

// Time components are preserved
const dateTime = new Date(2025, 5, 15, 14, 30, 45, 500);
const result = subYears(dateTime, 2);
// Returns: Date object representing 2023-06-15 14:30:45.500
// Hours, minutes, seconds, and milliseconds are preserved
```
