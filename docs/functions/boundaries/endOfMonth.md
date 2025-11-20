# endOfMonth

## Overview

The `endOfMonth` function returns a new Date object set to the last day of the month at 23:59:59.999 for the given date. It automatically handles different month lengths and leap years while preserving the year and month of the input date.

## Signature

```typescript
function endOfMonth(date: Date | number): Date
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `date` | `Date \| number` | The base date as a Date object or numeric timestamp |

## Return Value

| Type | Description |
|------|-------------|
| `Date` | A new Date object set to the last day of the month at 23:59:59.999, or Invalid Date if input is invalid |

## Description

The `endOfMonth` function calculates the last moment of the month for the provided date. It takes any date within a month and returns a new Date object representing the final millisecond of that month (23:59:59.999 on the last day). The function intelligently handles varying month lengths and leap year February dates.

### Specification

#### Returns a valid Date when:
- The argument is a valid `Date` object (not Invalid Date)
- The argument is a finite numeric timestamp, including:
  - Positive timestamps (dates after Unix epoch)
  - Zero (`0`, representing January 1, 1970, 00:00:00 UTC)
  - Negative timestamps (dates before Unix epoch)

The returned Date will have:
- The same year and month as the input date
- Day set to the last day of that month (28, 29, 30, or 31)
- Time set to 23:59:59.999 (the last millisecond of the day)

#### Returns Invalid Date when:
- The argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The argument is `NaN`
- The argument is `Infinity`
- The argument is `-Infinity`

### Behavior Notes

- Validates arguments before processing using Chronia's internal validation utilities
- Always returns a new Date instance; does not mutate the input date
- Automatically handles different month lengths:
  - January, March, May, July, August, October, December: 31 days
  - April, June, September, November: 30 days
  - February: 28 days (29 in leap years)
- Correctly calculates leap years for February
- Uses JavaScript's Date constructor behavior where day `0` of the next month equals the last day of the current month
- Type-safe with TypeScript, accepting only `Date | number`
- No exceptions are thrown; invalid inputs return Invalid Date

## Use Cases

- **Month Boundary Calculations**: Determine the last moment of a month for billing cycles, subscription periods, or reporting periods. Essential for systems that need to process data up to and including the last day of a month.
- **Date Range Generation**: Create date ranges that span entire months by combining with `startOfMonth`. Useful for calendar applications, analytics dashboards, and time-based queries.
- **Deadline Setting**: Set deadlines to the end of the current or future months. Common in project management tools, payment systems, and task scheduling applications.
- **Month-End Reports**: Generate month-end snapshots for financial reports, analytics, or data exports. Ensures all data from the entire month is captured in the reporting period.
- **Validation and Constraints**: Check if a date falls within the current month by comparing it against the month's end. Useful for form validation and business rule enforcement.

## Usage Examples

### Month Boundary Calculations

```typescript
import { endOfMonth } from 'chronia';

// Get end of month from mid-month date
const midMonth = new Date(2024, 5, 15, 14, 30, 45);
const monthEnd = endOfMonth(midMonth);
// Returns: June 30, 2024 23:59:59.999

// Works with first day of month
const firstDay = new Date(2024, 0, 1, 0, 0, 0);
const januaryEnd = endOfMonth(firstDay);
// Returns: January 31, 2024 23:59:59.999

// Works with last day of month
const lastDay = new Date(2024, 11, 31);
const decemberEnd = endOfMonth(lastDay);
// Returns: December 31, 2024 23:59:59.999
```

### Handling Different Month Lengths

```typescript
import { endOfMonth } from 'chronia';

// 31-day month (January)
endOfMonth(new Date(2024, 0, 10));
// Returns: January 31, 2024 23:59:59.999

// 30-day month (April)
endOfMonth(new Date(2024, 3, 10));
// Returns: April 30, 2024 23:59:59.999

// 28-day month (February in non-leap year)
endOfMonth(new Date(2023, 1, 10));
// Returns: February 28, 2023 23:59:59.999

// 29-day month (February in leap year)
endOfMonth(new Date(2024, 1, 10));
// Returns: February 29, 2024 23:59:59.999
```

### Date Range Generation

```typescript
import { endOfMonth } from 'chronia';

// Create a month range for queries
function getMonthRange(date: Date) {
  const start = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
  const end = endOfMonth(date);
  return { start, end };
}

const range = getMonthRange(new Date(2024, 5, 15));
// Returns: {
//   start: June 1, 2024 00:00:00.000,
//   end: June 30, 2024 23:59:59.999
// }

// Use for database queries or filtering
function getMonthlyData(date: Date, data: Array<{ timestamp: Date, value: number }>) {
  const { start, end } = getMonthRange(date);
  return data.filter(item => item.timestamp >= start && item.timestamp <= end);
}
```

### Working with Timestamps

```typescript
import { endOfMonth } from 'chronia';

// Works with numeric timestamps
const timestamp = Date.now();
const currentMonthEnd = endOfMonth(timestamp);
// Returns: Last day of current month at 23:59:59.999

// Unix epoch timestamp
const epochEnd = endOfMonth(0);
// Returns: January 31, 1970 23:59:59.999

// Historical dates (negative timestamps)
const historicalEnd = endOfMonth(new Date(1969, 11, 15).getTime());
// Returns: December 31, 1969 23:59:59.999
```

### Deadline Setting and Validation

```typescript
import { endOfMonth } from 'chronia';

// Set deadline to end of current month
function setMonthEndDeadline(): Date {
  return endOfMonth(new Date());
}

// Check if a date is within the current month
function isInCurrentMonth(date: Date): boolean {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = endOfMonth(now);
  return date >= monthStart && date <= monthEnd;
}

isInCurrentMonth(new Date(2024, 5, 15));  // Returns: true (if current month is June 2024)
isInCurrentMonth(new Date(2024, 6, 1));   // Returns: false (if current month is June 2024)
```

### Error Handling

```typescript
import { endOfMonth } from 'chronia';

// Invalid inputs return Invalid Date
endOfMonth(new Date('invalid'));  // Returns: Invalid Date
endOfMonth(NaN);                   // Returns: Invalid Date
endOfMonth(Infinity);              // Returns: Invalid Date
endOfMonth(-Infinity);             // Returns: Invalid Date

// Validate result before using
function safeEndOfMonth(date: Date | number): Date | null {
  const result = endOfMonth(date);
  return isNaN(result.getTime()) ? null : result;
}

safeEndOfMonth(new Date(2024, 5, 15));  // Returns: June 30, 2024 23:59:59.999
safeEndOfMonth(new Date('invalid'));    // Returns: null
```
