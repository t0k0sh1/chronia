# addDays

## Overview

The `addDays` function adds a specified number of days to a given date and returns a new Date object. It provides a safe and validated way to perform day-based date arithmetic in Chronia's consistent API surface.

## Signature

```typescript
function addDays(date: Date | number, amount: number): Date
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `date` | `Date \| number` | The base date as a Date object or numeric timestamp |
| `amount` | `number` | The number of days to add (can be negative to subtract) |

## Return Value

| Type | Description |
|------|-------------|
| `Date` | A new Date object with the specified number of days added, or Invalid Date if any input is invalid |

## Description

The `addDays` function performs day-based date arithmetic by adding (or subtracting when negative) a specified number of days to a base date. It validates all inputs before processing and always returns a new Date instance without mutating the original date.

### Specification

#### Returns a valid `Date` when:
- The `date` argument is a valid Date object (not Invalid Date)
- The `date` argument is a finite numeric timestamp, including:
  - Positive timestamps (dates after Unix epoch)
  - Zero (`0`, representing January 1, 1970, 00:00:00 UTC)
  - Negative timestamps (dates before Unix epoch)
- The `amount` argument is a finite number (positive, negative, or zero)
- Fractional `amount` values are automatically truncated toward zero:
  - `1.9` becomes `1`
  - `-1.9` becomes `-1`
  - `0.5` becomes `0`

#### Returns Invalid Date when:
- The `date` argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The `date` argument is `NaN`, `Infinity`, or `-Infinity`
- The `amount` argument is `NaN`, `Infinity`, or `-Infinity`

### Behavior Notes

- **Validation First**: Arguments are validated before any date calculations occur, ensuring consistent error handling
- **Immutability**: Always returns a new Date instance; the original date is never modified
- **Truncation Logic**: Fractional days are truncated using `Math.trunc()`, which rounds toward zero (not floor or ceiling)
- **No Exceptions**: Invalid inputs result in Invalid Date return values rather than thrown errors
- **Time Preservation**: Only the day component changes; the time portion (hours, minutes, seconds, milliseconds) remains unchanged
- **Month/Year Overflow**: Automatically handles month and year boundaries (e.g., adding 5 days to January 28 correctly results in February 2)
- **Type Safety**: TypeScript ensures only `Date | number` types are accepted for the date parameter

## Use Cases

- **Future Date Calculation**: Calculate dates a specific number of days in the future, such as scheduling events, setting deadlines, or computing delivery dates for business applications.
- **Past Date Calculation**: Determine dates in the past by using negative amounts, useful for lookups, historical data queries, or calculating date ranges that end "today" but start N days ago.
- **Date Range Generation**: Build date ranges by adding various day amounts to a base date, essential for reporting periods, calendar views, or iterating through sequential dates.
- **Deadline Management**: Add business days or calendar days to current dates for task management, SLA tracking, or reminder scheduling in productivity applications.
- **Safe Date Arithmetic**: Perform day addition with built-in validation that gracefully handles invalid inputs, preventing Invalid Date propagation through your application logic.

## Usage Examples

### Future Date Calculation

```typescript
import { addDays } from 'chronia';

// Schedule an event 7 days from today
const today = new Date(2025, 0, 15);  // January 15, 2025
const eventDate = addDays(today, 7);
// Returns: Date object for January 22, 2025

// Works with timestamps
const timestamp = Date.UTC(2025, 0, 1);
const futureDate = addDays(timestamp, 30);
// Returns: Date object for January 31, 2025

// Handles month overflow automatically
const endOfMonth = new Date(2025, 0, 28);  // January 28
const nextMonth = addDays(endOfMonth, 5);
// Returns: Date object for February 2, 2025
```

### Past Date Calculation

```typescript
import { addDays } from 'chronia';

// Calculate a date 10 days ago
const today = new Date(2025, 0, 15);  // January 15, 2025
const pastDate = addDays(today, -10);
// Returns: Date object for January 5, 2025

// Look back across month boundary
const monthStart = new Date(2025, 1, 3);  // February 3, 2025
const previousMonth = addDays(monthStart, -5);
// Returns: Date object for January 29, 2025
```

### Date Range Generation

```typescript
import { addDays } from 'chronia';

// Generate a 7-day range
function generateWeekRange(startDate: Date): Date[] {
  const range: Date[] = [];
  for (let i = 0; i < 7; i++) {
    range.push(addDays(startDate, i));
  }
  return range;
}

const weekStart = new Date(2025, 0, 1);
const week = generateWeekRange(weekStart);
// Returns: Array of 7 Date objects from January 1-7, 2025
```

### Fractional Day Handling

```typescript
import { addDays } from 'chronia';

// Fractional amounts are truncated toward zero
const baseDate = new Date(2025, 0, 1);

const result1 = addDays(baseDate, 1.9);
// Returns: January 2, 2025 (1.9 truncated to 1)

const result2 = addDays(baseDate, -1.9);
// Returns: December 31, 2024 (-1.9 truncated to -1)

const result3 = addDays(baseDate, 0.5);
// Returns: January 1, 2025 (0.5 truncated to 0, no change)
```

### Input Validation

```typescript
import { addDays } from 'chronia';

// Invalid date input
const invalidDate = new Date('invalid');
const result1 = addDays(invalidDate, 5);
// Returns: Invalid Date

// Invalid amount input
const validDate = new Date(2025, 0, 1);
const result2 = addDays(validDate, NaN);
// Returns: Invalid Date

const result3 = addDays(validDate, Infinity);
// Returns: Invalid Date

// Check validity before using
function safeDateAdd(date: Date, days: number): Date | null {
  const result = addDays(date, days);
  return isNaN(result.getTime()) ? null : result;
}
```
