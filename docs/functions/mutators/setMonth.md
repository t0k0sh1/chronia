# setMonth

## Overview

The `setMonth` function sets the month of a given date and returns a new Date instance with the specified month. It provides robust validation and handles edge cases like day overflow when the target month has fewer days than the original date.

## Signature

```typescript
function setMonth(date: Date | number, month: number): Date
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `date` | `Date \| number` | The base date as a Date object or numeric timestamp |
| `month` | `number` | The month to set (0-indexed: 0 = January, 11 = December) |

## Return Value

| Type | Description |
|------|-------------|
| `Date` | A new Date object with the specified month set, or Invalid Date if any input is invalid |

## Description

The `setMonth` function creates a new Date instance with the month component modified to the specified value while preserving all other date and time components (year, day, hours, minutes, seconds, milliseconds). It validates both arguments before processing and intelligently handles day overflow scenarios.

### Specification

#### Returns a valid Date when:
- The `date` argument is a valid Date object (not Invalid Date)
- The `date` argument is a finite numeric timestamp, including:
  - Positive timestamps (dates after Unix epoch)
  - Zero (`0`, representing January 1, 1970, 00:00:00 UTC)
  - Negative timestamps (dates before Unix epoch)
- The `month` argument is a finite number (including negative values and values >= 12)
- Fractional month values are accepted and truncated toward zero using `Math.trunc`

#### Returns Invalid Date when:
- The `date` argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The `date` argument is `NaN`, `Infinity`, or `-Infinity`
- The `month` argument is `NaN`, `Infinity`, or `-Infinity`

### Behavior Notes

- **Immutability**: Always returns a new Date instance; the original date is never modified
- **Validation First**: Both arguments are validated before any conversion or processing occurs, ensuring consistent error handling
- **Fractional Handling**: Fractional month values are truncated using `Math.trunc` (e.g., `5.9` becomes `5`, `-1.9` becomes `-1`)
- **Month Overflow**: Months outside the 0-11 range are handled by JavaScript's native behavior (e.g., `13` becomes January of the next year, `-1` becomes December of the previous year)
- **Day Overflow Protection**: When setting a month that has fewer days than the current date's day, the function adjusts to the last valid day of the target month
  - Example: January 31 → February becomes February 28 (or 29 in leap years)
  - This prevents the native JavaScript behavior of rolling over to the next month
- **Time Preservation**: All time components (hours, minutes, seconds, milliseconds) are preserved from the original date
- **No Exceptions**: Invalid inputs return Invalid Date rather than throwing exceptions

## Use Cases

- **Date Normalization**: Adjust dates to specific months while maintaining the day and time components. Useful when building date ranges or scheduling features where you need to shift dates to different months.
- **Recurring Events**: Generate recurring monthly events by setting the month while keeping the day constant. The day overflow handling ensures dates like "31st of each month" gracefully fall back to the last day of shorter months.
- **Date Calculations**: Build month-based date arithmetic operations, such as moving forward or backward by a specific number of months. Can be combined with other date manipulation functions for complex date calculations.
- **Input Sanitization**: Convert user-provided month values into valid dates while handling edge cases automatically. The validation ensures that invalid inputs result in predictable Invalid Date objects rather than unexpected behavior.
- **Calendar Operations**: Implement calendar navigation features where users move between months while maintaining their selected day when possible. The intelligent day adjustment provides a better user experience than JavaScript's default rollover behavior.

## Usage Examples

### Date Normalization

```typescript
import { setMonth } from 'chronia';

// Set month to June (month index 5)
const result = setMonth(new Date(2025, 0, 15), 5);
// Returns: Date representing 2025-06-15

// Set month to January (month index 0)
const result2 = setMonth(new Date(2025, 5, 15), 0);
// Returns: Date representing 2025-01-15

// Using timestamp input
const result3 = setMonth(1704067200000, 5); // Jan 1, 2024
// Returns: Date representing 2024-06-01
```

### Recurring Events

```typescript
import { setMonth } from 'chronia';

// Generate last day of each month for the year
const baseDate = new Date(2025, 0, 31); // January 31, 2025

const february = setMonth(baseDate, 1);
// Returns: 2025-02-28 (automatically adjusts to last day of February)

const april = setMonth(baseDate, 3);
// Returns: 2025-04-30 (automatically adjusts to last day of April)

const june = setMonth(baseDate, 5);
// Returns: 2025-06-30 (automatically adjusts to last day of June)

// Leap year handling
const leapYear = new Date(2024, 0, 31);
const februaryLeap = setMonth(leapYear, 1);
// Returns: 2024-02-29 (leap year, so February has 29 days)
```

### Date Calculations

```typescript
import { setMonth } from 'chronia';

// Move forward by N months
function addMonths(date: Date, monthsToAdd: number): Date {
  const currentMonth = date.getMonth();
  return setMonth(date, currentMonth + monthsToAdd);
}

const startDate = new Date(2025, 0, 15); // January 15, 2025
const threeMonthsLater = addMonths(startDate, 3);
// Returns: 2025-04-15

// Move backward by N months
const threeMonthsEarlier = addMonths(startDate, -3);
// Returns: 2024-10-15 (previous year)
```

### Input Sanitization

```typescript
import { setMonth } from 'chronia';

// Handle fractional values
const result = setMonth(new Date(2025, 0, 15), 5.9);
// Returns: 2025-06-15 (5.9 truncated to 5)

const result2 = setMonth(new Date(2025, 0, 15), -1.2);
// Returns: 2024-12-15 (-1.2 truncated to -1, which is December of previous year)

// Handle invalid inputs
const invalid1 = setMonth(new Date('invalid'), 5);
// Returns: Invalid Date

const invalid2 = setMonth(new Date(2025, 0, 15), NaN);
// Returns: Invalid Date

const invalid3 = setMonth(new Date(2025, 0, 15), Infinity);
// Returns: Invalid Date
```

### Calendar Operations

```typescript
import { setMonth } from 'chronia';

// Calendar navigation with day preservation
function navigateMonth(currentDate: Date, direction: 'prev' | 'next'): Date {
  const currentMonth = currentDate.getMonth();
  const newMonth = direction === 'next' ? currentMonth + 1 : currentMonth - 1;
  return setMonth(currentDate, newMonth);
}

// User viewing January 31, 2025
const current = new Date(2025, 0, 31);

// Navigate to next month
const nextMonth = navigateMonth(current, 'next');
// Returns: 2025-02-28 (gracefully handles day overflow)

// Navigate to previous month
const prevMonth = navigateMonth(current, 'prev');
// Returns: 2024-12-31 (previous year, December has 31 days)

// Preserves time components
const withTime = new Date(2025, 0, 15, 14, 30, 45, 123);
const movedMonth = setMonth(withTime, 5);
// Returns: 2025-06-15 14:30:45.123 (time preserved)
```
