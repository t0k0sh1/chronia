# diffMonths

## Overview

The `diffMonths` function calculates the difference in calendar months between two dates. It considers only the year and month components of dates, ignoring day and time values entirely.

## Signature

```typescript
function diffMonths(dateLeft: Date | number, dateRight: Date | number): number;
```

## Parameters

| Parameter   | Type             | Description                                           |
| ----------- | ---------------- | ----------------------------------------------------- |
| `dateLeft`  | `Date \| number` | The first date as a Date object or numeric timestamp  |
| `dateRight` | `Date \| number` | The second date as a Date object or numeric timestamp |

## Return Value

| Type     | Description                                                                                                                          |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `number` | The difference in calendar months. Positive if `dateLeft` is after `dateRight`, negative if before, or `NaN` if any input is invalid |

## Description

The `diffMonths` function computes the number of full calendar months between two dates by examining only their year and month values. Day and time components (hours, minutes, seconds, milliseconds) are completely ignored in the calculation. This makes it ideal for calculating month-based differences where the specific day doesn't matter.

### Specification

#### Returns a positive number when:

- `dateLeft` represents a later month/year than `dateRight`
- Both inputs are valid dates or timestamps
- Example: `diffMonths(new Date(2024, 5, 1), new Date(2024, 2, 1))` returns `3`

#### Returns zero when:

- Both dates fall within the same calendar month and year
- Days may differ, but year and month are identical
- Example: `diffMonths(new Date(2024, 5, 30), new Date(2024, 5, 1))` returns `0`

#### Returns a negative number when:

- `dateLeft` represents an earlier month/year than `dateRight`
- Both inputs are valid dates or timestamps
- Example: `diffMonths(new Date(2024, 2, 1), new Date(2024, 5, 1))` returns `-3`

#### Returns `NaN` when:

- Either `dateLeft` or `dateRight` is an Invalid Date object (e.g., `new Date('invalid')`)
- Either parameter is `NaN`
- Either parameter is `Infinity` or `-Infinity`
- Any input fails validation

### Behavior Notes

- **Day and time components ignored**: Only year and month values affect the calculation
- **Calculation formula**: `(yearDiff * 12) + monthDiff`
- **Year boundaries handled correctly**: Properly calculates across year transitions
- **Graceful error handling**: Returns `NaN` for invalid inputs rather than throwing errors
- **Accepts multiple input types**: Works with both Date objects and numeric timestamps
- **Type-safe**: TypeScript ensures only `Date | number` types are accepted
- **Consistent with Chronia's design**: Calculation functions return `NaN` for invalid inputs (unlike boolean functions which return `false` or comparison functions which throw errors)

## Use Cases

- **Subscription Duration**: Calculate the number of months between a subscription start date and end date, regardless of the specific day of month. Useful for billing systems where monthly periods are calendar-month based.
- **Age Calculation**: Determine someone's age in months or calculate the number of months since a specific event. The day component doesn't matter when measuring age in full months.
- **Date Range Analysis**: Measure the span between two dates in months for analytics, reporting, or data aggregation purposes where day-level precision isn't required.
- **Payment Schedules**: Calculate the number of monthly payments between two dates in financial applications, where payments align with calendar months rather than specific days.
- **Temporal Comparisons**: Compare dates at month granularity, such as determining how many months apart two project milestones are, where exact days are irrelevant.

## Usage Examples

### Subscription Duration

```typescript
import { diffMonths } from "chronia";

// Calculate months in a subscription period
const subscriptionStart = new Date(2024, 0, 15); // January 15, 2024
const subscriptionEnd = new Date(2024, 11, 20); // December 20, 2024
const monthsSubscribed = diffMonths(subscriptionEnd, subscriptionStart);
// Returns: 11

// Calculate months remaining
const currentDate = new Date(2024, 5, 10); // June 10, 2024
const monthsRemaining = diffMonths(subscriptionEnd, currentDate);
// Returns: 6
```

### Age Calculation

```typescript
import { diffMonths } from "chronia";

// Calculate age in months
const birthDate = new Date(2020, 2, 15); // March 15, 2020
const today = new Date(2024, 5, 20); // June 20, 2024
const ageInMonths = diffMonths(today, birthDate);
// Returns: 51

// Months since project started
const projectStart = new Date(2023, 8, 1); // September 1, 2023
const monthsSinceStart = diffMonths(today, projectStart);
// Returns: 9
```

### Date Range Analysis

```typescript
import { diffMonths } from "chronia";

// Days are ignored in calculation
const date1 = new Date(2024, 5, 30); // June 30, 2024
const date2 = new Date(2024, 5, 1); // June 1, 2024
const result = diffMonths(date1, date2);
// Returns: 0 (same month and year)

// Works across year boundaries
const endOfYear = new Date(2024, 11, 31); // December 31, 2024
const startOfYear = new Date(2024, 0, 1); // January 1, 2024
const monthsInYear = diffMonths(endOfYear, startOfYear);
// Returns: 11
```

### Working with Timestamps

```typescript
import { diffMonths } from "chronia";

// Using numeric timestamps
const timestamp1 = new Date(2025, 2, 15).getTime();
const timestamp2 = new Date(2024, 2, 15).getTime();
const monthsDiff = diffMonths(timestamp1, timestamp2);
// Returns: 12

// Mixed Date and timestamp
const dateObj = new Date(2024, 6, 10);
const timestampNum = new Date(2024, 3, 5).getTime();
const result = diffMonths(dateObj, timestampNum);
// Returns: 3
```

### Error Handling

```typescript
import { diffMonths } from "chronia";

// Invalid Date returns NaN
const invalidDate = new Date("invalid");
const validDate = new Date(2024, 5, 15);
const result = diffMonths(invalidDate, validDate);
// Returns: NaN

// Check for valid result
function calculateMonthDifference(date1: Date, date2: Date): number | null {
  const diff = diffMonths(date1, date2);
  return isNaN(diff) ? null : diff;
}

// Usage with validation
const diff = calculateMonthDifference(
  new Date(2024, 5, 1),
  new Date(2024, 2, 1),
);
// Returns: 3
const invalidDiff = calculateMonthDifference(
  new Date("invalid"),
  new Date(2024, 2, 1),
);
// Returns: null
```

### Negative Results

```typescript
import { diffMonths } from "chronia";

// Earlier date as first parameter gives negative result
const earlier = new Date(2024, 2, 15); // March 15, 2024
const later = new Date(2024, 5, 20); // June 20, 2024
const result = diffMonths(earlier, later);
// Returns: -3

// Useful for determining past vs future
function getMonthsUntilEvent(eventDate: Date): number {
  const today = new Date();
  const months = diffMonths(eventDate, today);

  if (months > 0) {
    return months; // Event is in the future
  } else if (months < 0) {
    return Math.abs(months); // Event was in the past
  } else {
    return 0; // Event is this month
  }
}
```
