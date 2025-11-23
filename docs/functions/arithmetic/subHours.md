# subHours

## Overview

The `subHours` function subtracts a specified number of hours from a given date and returns a new Date object. It provides a clean, type-safe API for hour subtraction with automatic validation and error handling, maintaining consistency with Chronia's design principles.

## Signature

```typescript
function subHours(date: Date | number, amount: number): Date
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `date` | `Date \| number` | The base date as a Date object or numeric timestamp from which to subtract hours |
| `amount` | `number` | The number of hours to subtract (can be negative to effectively add hours) |

## Return Value

| Type | Description |
|------|-------------|
| `Date` | A new Date object with the specified number of hours subtracted, or Invalid Date if any input is invalid |

## Description

The `subHours` function validates both the date and amount parameters before processing, then returns a new Date instance with the specified number of hours subtracted. Fractional hour values are truncated toward zero using `Math.trunc`, and minutes, seconds, and milliseconds from the original date are preserved. The function handles day, month, and year boundary crossings automatically.

### Specification

#### Returns a valid Date when:
- The `date` argument is a valid `Date` object or finite numeric timestamp
- The `amount` argument is a finite number (including zero)
- Fractional `amount` values are truncated toward zero (e.g., `1.9` → `1`, `-1.9` → `-1`)
- Negative `amount` values effectively add hours instead of subtracting
- The operation may cross day, month, or year boundaries naturally

#### Returns Invalid Date when:
- The `date` argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The `date` argument is `NaN`, `Infinity`, or `-Infinity`
- The `amount` argument is `NaN`, `Infinity`, or `-Infinity`

### Behavior Notes

- No exceptions are thrown; invalid inputs return Invalid Date
- Always returns a new Date instance without mutating the original input
- Implemented internally using `addHours(date, -amount)` for consistency
- Validates `amount` before delegating to `addHours`, which validates `date`
- Type-safe with TypeScript, accepting only `Date | number` for date and `number` for amount
- Fractional hours are handled using `Math.trunc`, ensuring consistent behavior for both positive and negative values
- Performance-optimized through minimal validation overhead and delegation pattern

## Use Cases

- **Time Calculations**: Calculate past times relative to a reference point, such as determining when a time window opened (e.g., "3 hours ago"). Useful in analytics, scheduling, and time-based business logic.
- **Scheduling and Appointments**: Adjust appointment or event times backward by specific hour amounts. Common in calendar applications, booking systems, and reminder scheduling.
- **Deadline Management**: Calculate earlier deadlines or start times by subtracting hours from target times. Particularly useful for project management and task tracking systems.
- **Time Zone Adjustments**: Manually adjust time values when working with time zones or offsets, such as converting from one time zone to an earlier one by subtracting the offset in hours.
- **Historical Data Processing**: Process time-series data by calculating timestamps in the past, useful for generating reports, analyzing trends, or creating time-based visualizations.

## Usage Examples

### Time Calculations

```typescript
import { subHours } from 'chronia';

// Calculate 5 hours ago
const now = new Date(2025, 0, 15, 18, 0, 0);
const fiveHoursAgo = subHours(now, 5);
// Returns: 2025-01-15 13:00:00

// Using numeric timestamp
const timestamp = Date.now();
const threeHoursAgo = subHours(timestamp, 3);

// Minutes, seconds, and milliseconds are preserved
const precise = new Date(2025, 0, 15, 14, 30, 45, 500);
const result = subHours(precise, 2);
// Returns: 2025-01-15 12:30:45.500
```

### Scheduling and Appointments

```typescript
import { subHours } from 'chronia';

// Move appointment 2 hours earlier
const appointmentTime = new Date(2025, 0, 20, 15, 0, 0);
const newAppointmentTime = subHours(appointmentTime, 2);
// Returns: 2025-01-20 13:00:00

// Calculate reminder time (2 hours before event)
function setReminder(eventTime: Date, hoursBefore: number): Date {
  return subHours(eventTime, hoursBefore);
}

const eventTime = new Date(2025, 1, 1, 19, 0, 0);
const reminder = setReminder(eventTime, 2);
// Returns: 2025-02-01 17:00:00
```

### Day Boundary Crossing

```typescript
import { subHours } from 'chronia';

// Crosses day boundary
const morning = new Date(2025, 0, 15, 2, 0, 0);
const result = subHours(morning, 4);
// Returns: 2025-01-14 22:00:00

// Crosses month boundary
const firstDayOfMonth = new Date(2025, 1, 1, 1, 0, 0);
const previousMonth = subHours(firstDayOfMonth, 3);
// Returns: 2025-01-31 22:00:00
```

### Edge Cases and Validation

```typescript
import { subHours } from 'chronia';

// Negative amount adds hours instead
const base = new Date(2025, 0, 15, 10, 30, 0);
const added = subHours(base, -3);
// Returns: 2025-01-15 13:30:00

// Fractional amounts are truncated toward zero
const date = new Date(2025, 0, 15, 15, 0, 0);
const truncated = subHours(date, 1.9);
// Returns: 2025-01-15 14:00:00 (1.9 truncated to 1)

// Invalid date returns Invalid Date
const invalidDate = new Date('invalid');
const result1 = subHours(invalidDate, 3);
// Returns: Invalid Date

// Invalid amount returns Invalid Date
const validDate = new Date(2025, 0, 15, 12, 0, 0);
const result2 = subHours(validDate, NaN);
// Returns: Invalid Date

// Zero hours returns a copy of the date
const original = new Date(2025, 0, 15, 12, 0, 0);
const copy = subHours(original, 0);
// Returns: 2025-01-15 12:00:00 (new instance)
```

### Time Zone Adjustments

```typescript
import { subHours } from 'chronia';

// Manually adjust for time zone offset
// (Note: For production use, consider proper time zone libraries)
function adjustToTimezone(date: Date, hoursOffset: number): Date {
  // If target timezone is earlier, subtract hours
  return hoursOffset < 0 ? subHours(date, Math.abs(hoursOffset)) : subHours(date, -hoursOffset);
}

// Convert UTC to PST (UTC-8)
const utcTime = new Date(Date.UTC(2025, 0, 15, 20, 0, 0));
const pstTime = adjustToTimezone(utcTime, -8);
// Subtracts 8 hours from UTC time
```
