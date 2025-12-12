# addYears

## Overview

The `addYears` function adds a specified number of years to a given date, returning a new Date object. It handles leap year edge cases intelligently and validates all inputs before processing, making it a reliable choice for year-based date transformations in Chronia's consistent API surface.

## Signature

```typescript
function addYears(date: DateInput, amount: number): Date;
```

## Parameters

| Parameter | Type        | Description                                                           |
| --------- | ----------- | --------------------------------------------------------------------- |
| `date`    | `DateInput` | The base date as a Date object, numeric timestamp, or ISO 8601 string |
| `amount`  | `number`    | The number of years to add (can be negative to subtract years)        |

## Return Value

| Type   | Description                                                                               |
| ------ | ----------------------------------------------------------------------------------------- |
| `Date` | A new Date object with the specified years added, or Invalid Date if any input is invalid |

## Description

The `addYears` function calculates a new date by adding the specified number of years to the provided date. It preserves the month, day, and time components from the original date while intelligently handling leap year edge cases, particularly when the source date is February 29 and the target year is not a leap year.

### Specification

#### Returns a valid `Date` when:

- The `date` argument is a valid `Date` object or finite numeric timestamp
- The `amount` argument is a finite number
- The resulting date is calculable

The returned date will have:

- Year value increased by `amount` (fractional amounts are truncated toward zero)
- Original month, day, and time components preserved
- Automatic adjustment to February 28 if the source date is February 29 and the target year is not a leap year

#### Returns Invalid Date when:

- The `date` argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The `date` argument is `NaN`, `Infinity`, or `-Infinity`
- The `amount` argument is `NaN`, `Infinity`, or `-Infinity`

### Behavior Notes

- **Validation First**: All arguments are validated before any date manipulation occurs, consistent with Chronia's defensive programming approach
- **Fractional Truncation**: Fractional year amounts are truncated toward zero using `Math.trunc` (e.g., `1.9` becomes `1`, `-1.9` becomes `-1`)
- **Leap Year Handling**: When adding years from February 29 (leap year) to a non-leap year, the result automatically becomes February 28
- **Immutability**: Always returns a new Date instance; the input date is never modified
- **No Exceptions**: Invalid inputs result in Invalid Date rather than thrown exceptions
- **Type Safety**: TypeScript ensures only `Date | number` can be passed for the date parameter
- **Negative Years**: Supports negative `amount` values to subtract years

## Use Cases

- **Anniversary Calculations**: Calculate future or past anniversary dates by adding or subtracting years. Useful for contract renewals, subscription expiration dates, or multi-year event planning.
- **Age Calculations**: Determine dates for future birthdays or ages, accounting for leap year births. Particularly useful for calculating when someone will reach a certain age or for age-based eligibility checks.
- **Multi-Year Projections**: Project dates into the future for financial planning, long-term scheduling, or forecasting scenarios where you need to maintain the same day and month across multiple years.
- **Historical Date Analysis**: Subtract years to analyze historical events or calculate dates in the past while preserving the month and day. Useful for comparing year-over-year data on the same calendar date.
- **Lease and Contract Management**: Calculate lease end dates, contract renewal dates, or warranty expiration dates that are based on multi-year terms while properly handling leap year edge cases.

## Usage Examples

### Anniversary Calculations

```typescript
import { addYears } from "chronia";

// Calculate 5-year contract renewal date
const contractStart = new Date(2020, 0, 15); // January 15, 2020
const renewalDate = addYears(contractStart, 5);
// Returns: Date object representing January 15, 2025

// Calculate past anniversary (negative years)
const currentDate = new Date(2025, 5, 10); // June 10, 2025
const threeYearsAgo = addYears(currentDate, -3);
// Returns: Date object representing June 10, 2022
```

### Age Calculations

```typescript
import { addYears } from "chronia";

// Calculate when someone will turn 18
const birthDate = new Date(2010, 3, 22); // April 22, 2010
const adultDate = addYears(birthDate, 18);
// Returns: Date object representing April 22, 2028

// Handle leap year birthday
const leapBirthday = new Date(2004, 1, 29); // February 29, 2004
const nextBirthday = addYears(leapBirthday, 1);
// Returns: Date object representing February 28, 2005 (2005 is not a leap year)

const leapToLeap = addYears(leapBirthday, 4);
// Returns: Date object representing February 29, 2008 (2008 is a leap year)
```

### Multi-Year Projections

```typescript
import { addYears } from "chronia";

// Project quarterly report date 2 years forward
const quarterlyReport = new Date(2023, 2, 31); // March 31, 2023
const futureReport = addYears(quarterlyReport, 2);
// Returns: Date object representing March 31, 2025

// Fractional years are truncated
const baseDate = new Date(2020, 0, 1); // January 1, 2020
const result = addYears(baseDate, 2.9);
// Returns: Date object representing January 1, 2022 (2.9 truncated to 2)

// Negative fractional truncation
const negResult = addYears(baseDate, -1.7);
// Returns: Date object representing January 1, 2019 (-1.7 truncated to -1)
```

### Input Validation and Error Handling

```typescript
import { addYears } from "chronia";

// Invalid date input
const invalidDate = new Date("invalid string");
const result1 = addYears(invalidDate, 3);
// Returns: Invalid Date

// Invalid amount (NaN)
const validDate = new Date(2020, 0, 1);
const result2 = addYears(validDate, NaN);
// Returns: Invalid Date

// Invalid amount (Infinity)
const result3 = addYears(validDate, Infinity);
// Returns: Invalid Date

// Checking for invalid results
function safeAddYears(date: Date | number, years: number): Date | null {
  const result = addYears(date, years);
  return isNaN(result.getTime()) ? null : result;
}

safeAddYears(new Date(2020, 0, 1), 5); // Returns: Date object
safeAddYears(new Date("invalid"), 5); // Returns: null
```

### Time Preservation

```typescript
import { addYears } from "chronia";

// Time components are preserved
const dateWithTime = new Date(2020, 5, 15, 14, 30, 45, 123);
// June 15, 2020, 14:30:45.123

const futureDate = addYears(dateWithTime, 3);
// Returns: Date object representing June 15, 2023, 14:30:45.123
// Hours, minutes, seconds, and milliseconds are preserved

// Using timestamp
const timestamp = new Date(2020, 0, 1, 12, 0, 0).getTime();
const fromTimestamp = addYears(timestamp, 2);
// Returns: Date object representing January 1, 2022, 12:00:00
```
