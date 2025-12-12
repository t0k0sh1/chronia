# setYear

## Overview

The `setYear` function sets the year component of a given date to a specified value and returns a new Date instance. It validates inputs, handles edge cases like leap year adjustments, and ensures immutability by not modifying the original date.

## Signature

```typescript
function setYear(date: DateInput, year: number): Date;
```

## Parameters

| Parameter | Type        | Description                                                                                 |
| --------- | ----------- | ------------------------------------------------------------------------------------------- |
| `date`    | `DateInput` | The base date as a Date object, numeric timestamp, or ISO 8601 string                       |
| `year`    | `number`    | The year to set (can be negative for BC dates, fractional values are truncated toward zero) |

## Return Value

| Type   | Description                                                                            |
| ------ | -------------------------------------------------------------------------------------- |
| `Date` | A new Date object with the specified year set, or Invalid Date if any input is invalid |

## Description

The `setYear` function creates a new Date object with the year component set to the specified value while preserving all other date and time components (month, day, hours, minutes, seconds, milliseconds). It provides robust input validation and handles edge cases such as leap year adjustments.

### Specification

#### Returns a valid Date with the specified year when:

- The `date` argument is a valid Date object (not Invalid Date)
- The `date` argument is a finite numeric timestamp (positive, zero, or negative)
- The `year` argument is a finite number (positive, zero, or negative)
- All other date/time components (month, day, hours, minutes, seconds, milliseconds) are preserved from the original date
- Fractional year values are truncated toward zero (e.g., 2023.9 → 2023, -2023.9 → -2023)

#### Returns Invalid Date when:

- The `date` argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The `date` argument is `NaN`, `Infinity`, or `-Infinity`
- The `year` argument is `NaN`, `Infinity`, or `-Infinity`

#### Special handling for leap year adjustments:

- When the source date is February 29 (leap year) and the target year is not a leap year, the resulting date becomes February 28
- This prevents invalid dates like February 29, 2021 (since 2021 is not a leap year)

### Behavior Notes

- **Immutability**: Always returns a new Date instance; the original date is never modified
- **Validation**: Validates both arguments before processing using Chronia's internal validation utilities for consistency
- **Truncation**: Fractional year values are truncated using `Math.trunc`, which rounds toward zero (2023.9 → 2023, -2023.9 → -2023)
- **No exceptions**: Invalid inputs result in an Invalid Date return value rather than throwing errors
- **Leap year handling**: Automatically adjusts February 29 to February 28 when setting a non-leap year
- **Type safety**: TypeScript types ensure only Date objects or numbers can be passed as the `date` parameter

## Use Cases

- **Date Transformation**: Transform dates to different years while preserving the month, day, and time. Useful for creating anniversary dates, scheduling recurring annual events, or adjusting historical data to different time periods.
- **Time Travel Scenarios**: Project or backdate dates to different years for forecasting, historical analysis, or what-if scenarios in financial or analytics applications.
- **Birthday Calculations**: Calculate when someone's birthday falls in a different year, handling leap year edge cases automatically (e.g., February 29 birthdays in non-leap years).
- **Data Normalization**: Normalize dates to a specific reference year for comparison purposes while maintaining the original month/day/time components.
- **Form Input Processing**: Process user input where users select years from dropdowns or input fields, combining them with existing date values.

## Usage Examples

### Date Transformation

```typescript
import { setYear } from "chronia";

// Set year to future year
const original = new Date(2025, 0, 15, 10, 30, 0);
const future = setYear(original, 2030);
// Returns: 2030-01-15 10:30:00 (same month, day, time)

// Set year to past year
const past = setYear(new Date(2025, 0, 15), 2020);
// Returns: 2020-01-15

// Works with timestamps too
const timestamp = new Date(2025, 5, 10).getTime();
const changed = setYear(timestamp, 2028);
// Returns: 2028-06-10
```

### Leap Year Handling

```typescript
import { setYear } from "chronia";

// Leap year to non-leap year (Feb 29 → Feb 28)
const leapDay = new Date(2020, 1, 29); // Feb 29, 2020
const nonLeapYear = setYear(leapDay, 2021);
// Returns: 2021-02-28 (automatically adjusted)

// Non-leap year to leap year (Feb 28 → Feb 28)
const regularDay = new Date(2021, 1, 28);
const toLeapYear = setYear(regularDay, 2020);
// Returns: 2020-02-28 (no adjustment needed)

// Leap year to leap year (Feb 29 → Feb 29)
const leapToLeap = setYear(new Date(2020, 1, 29), 2024);
// Returns: 2024-02-29 (both are leap years)
```

### Input Validation

```typescript
import { setYear, isValid } from "chronia";

// Fractional years are truncated
const truncated = setYear(new Date(2025, 0, 15), 2023.9);
// Returns: 2023-01-15 (2023.9 → 2023)

// Negative years for BC dates
const ancient = setYear(new Date(2025, 0, 15), -100);
// Returns: Date representing year -100 (100 BC)

// Invalid date input returns Invalid Date
const invalidDate = setYear(new Date("invalid"), 2025);
console.log(isValid(invalidDate)); // false

// Invalid year returns Invalid Date
const invalidYear = setYear(new Date(2025, 0, 15), NaN);
console.log(isValid(invalidYear)); // false
```

### Time Travel Scenarios

```typescript
import { setYear } from "chronia";

// Project an event to next year
function projectToNextYear(eventDate: Date): Date {
  const currentYear = eventDate.getFullYear();
  return setYear(eventDate, currentYear + 1);
}

const event = new Date(2025, 5, 15, 14, 0, 0);
const nextYearEvent = projectToNextYear(event);
// Returns: 2026-06-15 14:00:00

// Calculate historical equivalent
function historicalEquivalent(modernDate: Date, historicalYear: number): Date {
  return setYear(modernDate, historicalYear);
}

const today = new Date(2025, 10, 22);
const in1990 = historicalEquivalent(today, 1990);
// Returns: 1990-11-22 (same month and day, different year)
```

### Birthday Calculations

```typescript
import { setYear } from "chronia";

// Calculate when a birthday occurs in a specific year
function birthdayInYear(birthDate: Date, targetYear: number): Date {
  return setYear(birthDate, targetYear);
}

// Regular birthday
const birthday = new Date(1990, 5, 15);
const birthday2025 = birthdayInYear(birthday, 2025);
// Returns: 2025-06-15

// Leap year birthday edge case
const leapBirthday = new Date(2000, 1, 29); // Feb 29, 2000
const in2025 = birthdayInYear(leapBirthday, 2025);
// Returns: 2025-02-28 (automatically adjusted for non-leap year)
const in2024 = birthdayInYear(leapBirthday, 2024);
// Returns: 2024-02-29 (leap year preserved)
```
