# Date Accessor Functions

## Overview

Chronia provides a comprehensive suite of date accessor functions that extract individual date and time components from Date objects or timestamps. All accessor functions accept both Date objects and numeric timestamps, validate inputs gracefully, and return `NaN` for invalid inputs without throwing exceptions.

## Available Functions

| Function | Description | Range | Returns |
|----------|-------------|-------|---------|
| [`getYear`](./getYear.md) | Extracts the full year (e.g., 2025) | Any valid JavaScript year | Full year or `NaN` |
| [`getMonth`](./getMonth.md) | Extracts the month as zero-based index | 0-11 (0=Jan, 11=Dec) | Month index or `NaN` |
| [`getDay`](./getDay.md) | Extracts the day of the month | 1-31 | Day or `NaN` |
| [`getHours`](./getHours.md) | Extracts the hour in 24-hour format | 0-23 | Hour or `NaN` |
| [`getMinutes`](./getMinutes.md) | Extracts the minutes component | 0-59 | Minutes or `NaN` |
| [`getSeconds`](./getSeconds.md) | Extracts the seconds component | 0-59 | Seconds or `NaN` |
| [`getMilliseconds`](./getMilliseconds.md) | Extracts the milliseconds component | 0-999 | Milliseconds or `NaN` |
| [`getTime`](./getTime.md) | Extracts the timestamp value | Any valid timestamp | Timestamp or `NaN` |

## Common Features

All accessor functions in this category share the following characteristics:

### Type Flexibility

All functions accept both Date objects and numeric timestamps:

```typescript
import { getYear, getMonth, getDay } from 'chronia';

// Date objects
getYear(new Date(2025, 0, 15));  // 2025
getMonth(new Date(2025, 0, 15));  // 0 (January)
getDay(new Date(2025, 0, 15));  // 15

// Timestamps
getYear(1704067200000);  // 2024
getMonth(1704067200000);  // 0 (January)
getDay(1704067200000);  // 1

// Mixed types in the same application
const date = new Date(2025, 5, 15);
const timestamp = date.getTime();

getMonth(date);  // 5 (June)
getMonth(timestamp);  // 5 (June)
```

### Input Validation

All functions validate inputs and return `NaN` for invalid dates without throwing exceptions:

```typescript
import { getYear, getHours, getMinutes } from 'chronia';

// Invalid Date object
getYear(new Date('invalid'));  // NaN
getHours(new Date('invalid'));  // NaN

// Invalid numeric values
getMinutes(NaN);  // NaN
getMinutes(Infinity);  // NaN
getMinutes(-Infinity);  // NaN

// Safe usage with validation
function safeGetYear(date: Date | number): number | null {
  const year = getYear(date);
  return isNaN(year) ? null : year;
}

safeGetYear(new Date(2025, 0, 1));  // 2025
safeGetYear(new Date('invalid'));   // null
```

### Local Timezone

All accessor functions return values in the **local timezone**, not UTC:

```typescript
import { getHours, getDay } from 'chronia';

// Date created in local timezone
const local = new Date(2025, 0, 15, 14, 30);
getHours(local);  // 14 (local time)
getDay(local);  // 15 (local date)

// For UTC values, use native Date methods:
local.getUTCHours();  // May differ from local hours
local.getUTCDate();   // May differ from local date
```

### Consistent Error Handling

No exceptions are thrown; invalid inputs consistently return `NaN`:

```typescript
import { getMonth, getSeconds } from 'chronia';

// Invalid inputs all return NaN
getMonth(new Date('invalid'));  // NaN
getMonth(NaN);                  // NaN
getMonth(Infinity);             // NaN

getSeconds(new Date('bad'));    // NaN
getSeconds(undefined as any);   // NaN (TypeScript prevents at compile time)

// This allows for graceful error handling
function processDate(date: Date | number): void {
  const month = getMonth(date);
  if (isNaN(month)) {
    console.error('Invalid date provided');
    return;
  }
  // Process valid month
}
```

## Choosing the Right Function

### Date Components vs Time Components vs Timestamp

**Date Components** (`getYear`, `getMonth`, `getDay`):
- Extract calendar date information
- Ideal for: date display, date filtering, calendar operations, age calculation
- Values depend on the local timezone

**Time Components** (`getHours`, `getMinutes`, `getSeconds`, `getMilliseconds`):
- Extract time-of-day information
- Ideal for: time display, scheduling, time-based logic, countdown timers
- Values depend on the local timezone

**Timestamp** (`getTime`):
- Get the raw numeric timestamp
- Ideal for: storage, serialization, time calculations, API communication
- Timezone-independent (represents UTC)

### Use Case Guide

| Scenario | Recommended Function | Reason |
|----------|---------------------|--------|
| Display current year | `getYear(new Date())` | Extract year for display |
| Filter by month | `getMonth(date) === targetMonth` | Compare month indices |
| Check day of month | `getDay(date) === 1` | Check if first day |
| Business hours check | `getHours(date) >= 9 && getHours(date) < 17` | Validate time range |
| Format time display | `getHours()`, `getMinutes()`, `getSeconds()` | Build custom time strings |
| High-precision timing | `getMilliseconds(date)` | Sub-second precision |
| Calculate age | `getYear(now) - getYear(birthDate)` | Year difference |
| Store in database | `getTime(date)` | Numeric timestamp |
| Time difference | `getTime(date1) - getTime(date2)` | Millisecond arithmetic |
| Group by year | `Map<getYear(date), data[]>` | Year-based grouping |
| Schedule validation | `getMinutes(date) % 15 === 0` | 15-minute intervals |

## Common Patterns

### Date Component Extraction

```typescript
import { getYear, getMonth, getDay } from 'chronia';

// Extract date components for display
function formatDate(date: Date | number): string {
  const year = getYear(date);
  const month = getMonth(date);
  const day = getDay(date);

  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return 'Invalid date';
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return `${monthNames[month]} ${day}, ${year}`;
}

formatDate(new Date(2025, 0, 15));  // "January 15, 2025"
```

### Time Component Extraction

```typescript
import { getHours, getMinutes, getSeconds } from 'chronia';

// Build custom time format
function formatTime(date: Date | number): string {
  const hours = getHours(date);
  const minutes = getMinutes(date);
  const seconds = getSeconds(date);

  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
    return 'Invalid time';
  }

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

formatTime(new Date(2025, 0, 15, 14, 5, 7));  // "14:05:07"
```

### Full DateTime Display

```typescript
import { getYear, getMonth, getDay, getHours, getMinutes, getSeconds, getMilliseconds } from 'chronia';

// Complete datetime formatter
function formatDateTime(date: Date | number): string {
  const year = getYear(date);
  const month = getMonth(date);
  const day = getDay(date);
  const hours = getHours(date);
  const minutes = getMinutes(date);
  const seconds = getSeconds(date);
  const ms = getMilliseconds(date);

  // Validate all components
  if ([year, month, day, hours, minutes, seconds, ms].some(isNaN)) {
    return 'Invalid date/time';
  }

  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')} ` +
         `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;
}

formatDateTime(new Date(2025, 0, 15, 14, 30, 45, 123));
// "2025-01-15 14:30:45.123"
```

### Date Filtering

```typescript
import { getYear, getMonth, getDay } from 'chronia';

// Filter dates by specific criteria
interface Event {
  name: string;
  date: Date;
}

// Get events from a specific month
function filterByMonth(events: Event[], year: number, month: number): Event[] {
  return events.filter(event =>
    getYear(event.date) === year && getMonth(event.date) === month
  );
}

// Get events on specific days
function filterByDay(events: Event[], day: number): Event[] {
  return events.filter(event => getDay(event.date) === day);
}

const events: Event[] = [
  { name: 'New Year', date: new Date(2025, 0, 1) },
  { name: 'Valentine', date: new Date(2025, 1, 14) },
  { name: 'Pi Day', date: new Date(2025, 2, 14) },
];

filterByMonth(events, 2025, 1);  // Valentine's Day event
filterByDay(events, 14);  // Valentine's and Pi Day events
```

### Time-Based Logic

```typescript
import { getHours, getMinutes } from 'chronia';

// Check if time falls within business hours
function isBusinessHours(date: Date | number): boolean {
  const hour = getHours(date);
  if (isNaN(hour)) return false;
  return hour >= 9 && hour < 17;
}

// Apply time-based pricing
function getPricingMultiplier(date: Date | number): number {
  const hour = getHours(date);
  if (isNaN(hour)) return 1.0;

  // Happy hour (5-7 PM): 20% discount
  if (hour >= 17 && hour < 19) return 0.8;

  // Peak hours (12-2 PM): 20% premium
  if (hour >= 12 && hour < 14) return 1.2;

  return 1.0;
}

// Validate appointment scheduling (15-minute intervals)
function isValidAppointmentTime(date: Date | number): boolean {
  const minutes = getMinutes(date);
  if (isNaN(minutes)) return false;
  return minutes % 15 === 0;
}
```

### Data Grouping and Analysis

```typescript
import { getYear, getMonth, getHours } from 'chronia';

interface LogEntry {
  timestamp: number;
  message: string;
}

// Group logs by hour
function groupLogsByHour(logs: LogEntry[]): Map<number, LogEntry[]> {
  const grouped = new Map<number, LogEntry[]>();

  for (const log of logs) {
    const hour = getHours(log.timestamp);
    if (isNaN(hour)) continue;

    if (!grouped.has(hour)) {
      grouped.set(hour, []);
    }
    grouped.get(hour)!.push(log);
  }

  return grouped;
}

// Group data by year and month
function groupByYearMonth<T extends { date: Date }>(
  items: T[]
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();

  for (const item of items) {
    const year = getYear(item.date);
    const month = getMonth(item.date);

    if (isNaN(year) || isNaN(month)) continue;

    const key = `${year}-${String(month + 1).padStart(2, '0')}`;
    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key)!.push(item);
  }

  return grouped;
}
```

### Timestamp Calculations

```typescript
import { getTime } from 'chronia';

// Calculate time difference in milliseconds
function getDifferenceInMs(date1: Date | number, date2: Date | number): number {
  const time1 = getTime(date1);
  const time2 = getTime(date2);

  if (isNaN(time1) || isNaN(time2)) {
    return NaN;
  }

  return Math.abs(time1 - time2);
}

// Calculate time difference in days
function getDifferenceInDays(date1: Date | number, date2: Date | number): number {
  const diffMs = getDifferenceInMs(date1, date2);
  if (isNaN(diffMs)) return NaN;

  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

// Add days to a date
function addDays(date: Date | number, days: number): number {
  const timestamp = getTime(date);
  if (isNaN(timestamp)) return NaN;

  return timestamp + (days * 24 * 60 * 60 * 1000);
}

const date1 = new Date(2025, 0, 1);
const date2 = new Date(2025, 0, 15);

getDifferenceInMs(date1, date2);  // 1209600000
getDifferenceInDays(date1, date2);  // 14
addDays(date1, 7);  // Timestamp for 2025-01-08
```

### Age and Duration Calculations

```typescript
import { getYear, getMonth, getDay } from 'chronia';

// Calculate age in years
function calculateAge(birthDate: Date | number): number {
  const birthYear = getYear(birthDate);
  const birthMonth = getMonth(birthDate);
  const birthDay = getDay(birthDate);

  const now = new Date();
  const currentYear = getYear(now);
  const currentMonth = getMonth(now);
  const currentDay = getDay(now);

  if ([birthYear, birthMonth, birthDay, currentYear, currentMonth, currentDay].some(isNaN)) {
    return NaN;
  }

  let age = currentYear - birthYear;

  // Adjust if birthday hasn't occurred this year
  if (currentMonth < birthMonth ||
     (currentMonth === birthMonth && currentDay < birthDay)) {
    age--;
  }

  return age;
}

calculateAge(new Date(1990, 5, 15));  // Age as of current date
```

### Input Normalization

```typescript
import { getTime } from 'chronia';

// Normalize mixed date inputs to timestamps
function normalizeToTimestamp(date: Date | number | string): number {
  if (typeof date === 'string') {
    return getTime(new Date(date));
  }
  return getTime(date);
}

// Normalize to Date object
function normalizeToDate(date: Date | number | string): Date | null {
  const timestamp = normalizeToTimestamp(date);
  if (isNaN(timestamp)) return null;
  return new Date(timestamp);
}

// Usage
normalizeToTimestamp(new Date(2025, 0, 1));  // 1735689600000
normalizeToTimestamp(1735689600000);         // 1735689600000
normalizeToTimestamp('2025-01-01');          // 1735689600000
normalizeToTimestamp('invalid');             // NaN
```

## Performance Considerations

- **Single Validation**: All accessor functions validate input only once before processing
- **Type Conversion**: Numeric timestamps are converted to Date objects internally only after validation
- **No Exceptions**: Returning `NaN` for invalid inputs is faster than exception handling
- **Native Methods**: After validation, functions use native Date methods which are highly optimized
- **High-Frequency Usage**: Accessors are optimized for scenarios requiring frequent component extraction

## Important Notes

### Zero-Based Month Indexing

JavaScript uses zero-based month indexing (0-11). Chronia's `getMonth` function preserves this convention:

```typescript
import { getMonth } from 'chronia';

getMonth(new Date(2025, 0, 1));   // 0 (January)
getMonth(new Date(2025, 1, 1));   // 1 (February)
getMonth(new Date(2025, 11, 1));  // 11 (December)

// Convert to 1-based for display
const month = getMonth(date) + 1;  // 1-12 for display
```

### Local vs UTC Timezone

All accessor functions return values in the **local timezone**. For UTC values, use native Date UTC methods:

```typescript
import { getHours, getDay } from 'chronia';

const date = new Date('2025-01-15T14:30:00Z');  // UTC time

// Local timezone (depends on system timezone)
getHours(date);       // May be 14, 15, or other depending on timezone
date.getUTCHours();  // Always 14 (UTC)

// Local date (may differ from UTC date near midnight)
getDay(date);        // May be 14, 15, or 16 depending on timezone
date.getUTCDate();  // Always 15 (UTC)
```

### Day vs Day of Week

`getDay` returns the **day of the month** (1-31), not the day of the week:

```typescript
import { getDay } from 'chronia';

getDay(new Date(2025, 0, 15));  // 15 (15th day of month)

// For day of week (0-6, Sunday-Saturday), use native method:
new Date(2025, 0, 15).getDay();  // 3 (Wednesday)
```

## Type Definitions

```typescript
// All accessor functions follow this pattern
type AccessorFunction = (date: Date | number) => number;

// Examples
const getYear: AccessorFunction;
const getMonth: AccessorFunction;
const getDay: AccessorFunction;
const getHours: AccessorFunction;
const getMinutes: AccessorFunction;
const getSeconds: AccessorFunction;
const getMilliseconds: AccessorFunction;
const getTime: AccessorFunction;
```

## Error Handling

All accessor functions follow a consistent error handling pattern:

- **No exceptions thrown**: Invalid inputs return `NaN` instead of throwing errors
- **Invalid Date**: Returns `NaN`
- **NaN input**: Returns `NaN`
- **Infinity / -Infinity**: Returns `NaN`
- **Non-date, non-number inputs**: TypeScript prevents at compile time

```typescript
import { getYear, getMonth } from 'chronia';

// All invalid inputs return NaN
getYear(new Date('invalid'));  // NaN
getMonth(NaN);                 // NaN
getDay(Infinity);             // NaN

// Check for invalid results
function safeAccessor<T>(value: number, defaultValue: T): number | T {
  return isNaN(value) ? defaultValue : value;
}

safeAccessor(getYear(new Date(2025, 0, 1)), 0);     // 2025
safeAccessor(getYear(new Date('invalid')), 0);       // 0
```

## See Also

- [Date Validation](../validations/) - Validate dates and compare date values
- [Date Formatting](../formatting/) - Format dates for display
- [Date Manipulation](../manipulation/) - Add, subtract, and modify dates
- [Chronia Types](../../types.md) - Type definitions used across the library
