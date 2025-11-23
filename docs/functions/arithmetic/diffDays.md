# diffDays

## Overview

The `diffDays` function calculates the difference in calendar days between two dates. It normalizes both dates to midnight before comparison, ensuring accurate calendar day counting regardless of time components.

## Signature

```typescript
function diffDays(dateLeft: Date | number, dateRight: Date | number): number
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `dateLeft` | `Date \| number` | The first date as a Date object or numeric timestamp |
| `dateRight` | `Date \| number` | The second date as a Date object or numeric timestamp |

## Return Value

| Type | Description |
|------|-------------|
| `number` | The difference in calendar days (positive if `dateLeft` is after `dateRight`, negative if before, zero if same calendar day). Returns `NaN` if either input is invalid. |

## Description

The `diffDays` function determines the number of full calendar days between two dates by normalizing both dates to midnight and comparing their timestamps. This approach ensures that time components (hours, minutes, seconds, milliseconds) do not affect the calendar day calculation.

### Specification

#### Returns a positive number when:
- `dateLeft` represents a calendar day that occurs after `dateRight`
- Both inputs are valid Date objects or finite numeric timestamps
- Example: `diffDays(new Date(2024, 5, 20), new Date(2024, 5, 15))` returns `5`

#### Returns zero (`0`) when:
- `dateLeft` and `dateRight` represent the same calendar day
- This applies even when the time components differ
- Example: `diffDays(new Date(2024, 5, 15, 23, 59), new Date(2024, 5, 15, 0, 0))` returns `0`

#### Returns a negative number when:
- `dateLeft` represents a calendar day that occurs before `dateRight`
- Example: `diffDays(new Date(2024, 5, 10), new Date(2024, 5, 15))` returns `-5`

#### Returns `NaN` when:
- Either `dateLeft` or `dateRight` is an Invalid Date object (e.g., `new Date('invalid')`)
- Either input is `NaN`
- Either input is `Infinity` or `-Infinity`
- This graceful error handling allows the caller to check for invalid results

### Behavior Notes

- **Time normalization**: Both dates are normalized to midnight (00:00:00.000) in the local timezone before comparison, ensuring pure calendar day counting
- **Graceful error handling**: Invalid inputs return `NaN` rather than throwing exceptions, consistent with Chronia's calculation functions
- **Integer precision**: Uses `Math.round` to ensure integer results, avoiding floating-point precision issues
- **Calendar accuracy**: Correctly handles leap years, month boundaries, and year boundaries
- **Flexible input**: Accepts both Date objects and numeric timestamps for maximum flexibility
- **Type-safe**: TypeScript ensures only `Date | number` types are accepted

## Use Cases

- **Date Range Calculations**: Calculate the number of days between two dates for scheduling, booking systems, or timeline features. Useful for determining rental periods, subscription durations, or project timelines.
- **Age Calculations**: Determine age in days by comparing a birth date with the current date. Particularly useful for applications that track infant age, pet age, or account age in days.
- **Deadline Tracking**: Calculate how many days remain until or have passed since a deadline. Essential for task management systems, reminder applications, or compliance tracking.
- **Historical Analysis**: Measure time spans between historical events or data points. Useful for analytics dashboards, reporting systems, or trend analysis where calendar day precision is required.
- **Business Logic**: Implement business rules based on day differences, such as late fees, grace periods, or eligibility windows. The time-agnostic nature ensures consistent behavior regardless of when during the day events occur.

## Usage Examples

### Date Range Calculations

```typescript
import { diffDays } from 'chronia';

// Calculate rental period duration
function calculateRentalDays(checkIn: Date, checkOut: Date): number {
  return diffDays(checkOut, checkIn);
}

const checkIn = new Date(2024, 5, 15);   // June 15, 2024
const checkOut = new Date(2024, 5, 20);  // June 20, 2024
const rentalDays = calculateRentalDays(checkIn, checkOut);
// Returns: 5

// Works with timestamps
const timestamp1 = new Date(2024, 5, 20).getTime();
const timestamp2 = new Date(2024, 5, 15).getTime();
const days = diffDays(timestamp1, timestamp2);
// Returns: 5
```

### Age Calculations

```typescript
import { diffDays } from 'chronia';

// Calculate age in days
function getAgeInDays(birthDate: Date): number {
  const today = new Date();
  return diffDays(today, birthDate);
}

const birthDate = new Date(2024, 0, 1);  // January 1, 2024
const ageInDays = getAgeInDays(birthDate);
// Returns: number of days since birth (varies by current date)

// Track infant age
const babyBirthDate = new Date(2024, 5, 1);
const currentDate = new Date(2024, 5, 15);
const babyAgeInDays = diffDays(currentDate, babyBirthDate);
// Returns: 14
```

### Deadline Tracking

```typescript
import { diffDays } from 'chronia';

// Calculate days until deadline
function getDaysUntilDeadline(deadline: Date): number {
  const today = new Date();
  return diffDays(deadline, today);
}

// Check if deadline has passed
function isOverdue(deadline: Date): boolean {
  return getDaysUntilDeadline(deadline) < 0;
}

const deadline = new Date(2024, 5, 30);
const today = new Date(2024, 5, 15);
const daysRemaining = diffDays(deadline, today);
// Returns: 15

const pastDeadline = new Date(2024, 5, 10);
const daysOverdue = diffDays(today, pastDeadline);
// Returns: 5 (deadline was 5 days ago)
```

### Time Components Are Ignored

```typescript
import { diffDays } from 'chronia';

// Same calendar day, different times
const morning = new Date(2024, 5, 15, 8, 0);   // 8:00 AM
const evening = new Date(2024, 5, 15, 23, 59); // 11:59 PM
const sameDayDiff = diffDays(evening, morning);
// Returns: 0 (same calendar day)

// Different calendar days, close in time
const lateNight = new Date(2024, 5, 15, 23, 59);  // 11:59 PM
const earlyMorning = new Date(2024, 5, 16, 0, 1); // 12:01 AM
const nextDayDiff = diffDays(earlyMorning, lateNight);
// Returns: 1 (different calendar days)
```

### Error Handling

```typescript
import { diffDays } from 'chronia';

// Validate result before using
function safeDiffDays(date1: Date | number, date2: Date | number): number | null {
  const result = diffDays(date1, date2);
  return isNaN(result) ? null : result;
}

// Invalid date handling
const invalidDate = new Date('invalid');
const validDate = new Date(2024, 5, 15);
const result1 = diffDays(invalidDate, validDate);
// Returns: NaN

// NaN input handling
const result2 = diffDays(NaN, validDate);
// Returns: NaN

// Infinity input handling
const result3 = diffDays(Infinity, validDate);
// Returns: NaN

// Check for valid result
if (!isNaN(result1)) {
  console.log(`Days difference: ${result1}`);
} else {
  console.log('Invalid date input');
}
```

### Cross-Month and Cross-Year Boundaries

```typescript
import { diffDays } from 'chronia';

// Across month boundary
const endOfMay = new Date(2024, 4, 31);    // May 31, 2024
const startOfJune = new Date(2024, 5, 5);  // June 5, 2024
const daysAcrossMonths = diffDays(startOfJune, endOfMay);
// Returns: 5

// Across year boundary
const endOf2023 = new Date(2023, 11, 25);  // December 25, 2023
const startOf2024 = new Date(2024, 0, 5);  // January 5, 2024
const daysAcrossYears = diffDays(startOf2024, endOf2023);
// Returns: 11

// Leap year handling
const feb28 = new Date(2024, 1, 28);  // February 28, 2024 (leap year)
const mar1 = new Date(2024, 2, 1);    // March 1, 2024
const leapYearDays = diffDays(mar1, feb28);
// Returns: 2 (includes Feb 29)
```
