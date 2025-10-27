# Common Use Cases

## Overview

This guide demonstrates practical patterns for common date/time operations using Chronia.

## Date Arithmetic

### Adding/Subtracting Time

```typescript
import { addDays, addMonths, addYears, subDays } from "chronia";

// Add time
const tomorrow = addDays(new Date(), 1);
const nextMonth = addMonths(new Date(), 1);
const nextYear = addYears(new Date(), 1);

// Subtract time
const yesterday = subDays(new Date(), 1);
const lastWeek = subDays(new Date(), 7);
const threeMonthsAgo = addMonths(new Date(), -3);  // Or subMonths(new Date(), 3)
```

### Relative Date Calculations

```typescript
import { addDays, now } from "chronia";

// Due dates
const dueDate = addDays(now(), 30);  // 30 days from now

// Subscription expiry
const subscriptionStart = new Date(2024, 0, 1);
const subscriptionEnd = addYears(subscriptionStart, 1);

// Trial period
const trialStart = now();
const trialEnd = addDays(trialStart, 14);  // 14-day trial
```

### Calendar Edge Cases

```typescript
import { addMonths, addYears } from "chronia";

// Month-end handling
addMonths(new Date(2024, 0, 31), 1);
// Returns: Feb 29, 2024 (leap year adjustment)

addMonths(new Date(2024, 0, 31), 2);
// Returns: Mar 31, 2024 (preserves day when possible)

// Leap year handling
addYears(new Date(2024, 1, 29), 1);
// Returns: Feb 28, 2025 (2025 is not a leap year)
```

## Formatting and Parsing

### Display Formats

```typescript
import { format } from "chronia";

const date = new Date(2024, 5, 15, 14, 30, 0);

// Common formats
format(date, "yyyy-MM-dd");              // "2024-06-15"
format(date, "MM/dd/yyyy");              // "06/15/2024"
format(date, "MMMM d, yyyy");            // "June 15, 2024"
format(date, "MMM d, yyyy");             // "Jun 15, 2024"
format(date, "yyyy-MM-dd HH:mm:ss");     // "2024-06-15 14:30:00"
format(date, "h:mm a");                  // "2:30 PM"
format(date, "EEEE, MMMM d, yyyy");      // "Saturday, June 15, 2024"
```

### ISO 8601 Formats

```typescript
import { format } from "chronia";

// Date only
format(date, "yyyy-MM-dd");  // "2024-06-15"

// DateTime (local time)
format(date, "yyyy-MM-dd'T'HH:mm:ss");  // "2024-06-15T14:30:00"

// With milliseconds
format(date, "yyyy-MM-dd'T'HH:mm:ss.SSS");  // "2024-06-15T14:30:00.000"
```

### Parsing User Input

```typescript
import { parse, isValid } from "chronia";

// Parse common formats
const date1 = parse("2024-06-15", "yyyy-MM-dd");
const date2 = parse("06/15/2024", "MM/dd/yyyy");
const date3 = parse("June 15, 2024", "MMMM d, yyyy");

// Always validate parsed dates
if (!isValid(date1)) {
  console.error("Failed to parse date");
}
```

### Localized Formatting

```typescript
import { format } from "chronia";
import { enLocale, jaLocale } from "chronia/i18n";

const date = new Date(2024, 5, 15);

// English
format(date, "MMMM d, yyyy", enLocale);
// "June 15, 2024"

// Japanese
format(date, "yyyy年M月d日", jaLocale);
// "2024年6月15日"

// Weekdays
format(date, "EEEE", enLocale);  // "Saturday"
format(date, "EEEE", jaLocale);  // "土曜日"
```

## Comparisons and Validation

### Basic Comparisons

```typescript
import { isAfter, isBefore, isEqual } from "chronia";

const deadline = new Date(2024, 11, 31);
const today = new Date();

if (isAfter(today, deadline)) {
  console.log("Deadline has passed");
} else if (isBefore(today, deadline)) {
  console.log("Still time remaining");
} else {
  console.log("Today is the deadline");
}
```

### Same Day/Month/Year Checks

```typescript
import { isSameDay, isSameMonth, isSameYear } from "chronia";

const date1 = new Date(2024, 5, 15, 10, 0, 0);
const date2 = new Date(2024, 5, 15, 18, 30, 0);

isSameDay(date1, date2);    // true (both June 15, 2024)
isSameMonth(date1, date2);  // true (both June 2024)
isSameYear(date1, date2);   // true (both 2024)

// Different times but same day
const morning = new Date(2024, 5, 15, 9, 0, 0);
const evening = new Date(2024, 5, 15, 21, 0, 0);
isSameDay(morning, evening);  // true
```

### Date Range Validation

```typescript
import { isBetween, isValid } from "chronia";

const eventDate = new Date(2024, 6, 15);
const range = {
  start: new Date(2024, 6, 1),
  end: new Date(2024, 6, 31)
};

if (isBetween(eventDate, range)) {
  console.log("Event is within range");
}

// With boundary control
isBetween(eventDate, range, { bounds: "[]" });  // Inclusive
isBetween(eventDate, range, { bounds: "()" });  // Exclusive
isBetween(eventDate, range, { bounds: "[)" });  // Start inclusive, end exclusive
```

### Input Validation

```typescript
import { isValid } from "chronia";

function processDate(userInput: string): Date | null {
  const date = new Date(userInput);
  
  if (!isValid(date)) {
    console.error("Invalid date input");
    return null;
  }
  
  return date;
}

// Usage
const date = processDate("2024-06-15");  // Valid
const invalid = processDate("not a date");  // null
```

## Boundary Operations

### Start/End of Periods

```typescript
import { startOfDay, endOfDay, startOfMonth, endOfMonth } from "chronia";

const date = new Date(2024, 5, 15, 14, 30, 0);

// Day boundaries
startOfDay(date);  // 2024-06-15 00:00:00.000
endOfDay(date);    // 2024-06-15 23:59:59.999

// Month boundaries
startOfMonth(date);  // 2024-06-01 00:00:00.000
endOfMonth(date);    // 2024-06-30 23:59:59.999

// Year boundaries
startOfYear(date);  // 2024-01-01 00:00:00.000
endOfYear(date);    // 2024-12-31 23:59:59.999
```

### Date Range Construction

```typescript
import { startOfMonth, endOfMonth } from "chronia";

function getMonthRange(date: Date) {
  return {
    start: startOfMonth(date),
    end: endOfMonth(date)
  };
}

const juneRange = getMonthRange(new Date(2024, 5, 15));
// { start: 2024-06-01 00:00:00.000, end: 2024-06-30 23:59:59.999 }
```

### Truncation

```typescript
import { truncDay, truncHour, truncMinute } from "chronia";

const dateTime = new Date(2024, 5, 15, 14, 37, 42, 123);

truncDay(dateTime);     // 2024-06-15 00:00:00.000
truncHour(dateTime);    // 2024-06-15 14:00:00.000
truncMinute(dateTime);  // 2024-06-15 14:37:00.000
```

## Time Differences

### Calculating Differences

```typescript
import { diffDays, diffHours, diffMinutes } from "chronia";

const start = new Date(2024, 5, 1, 10, 0, 0);
const end = new Date(2024, 5, 15, 16, 30, 0);

diffDays(end, start);     // 14 (days difference)
diffHours(end, start);    // 342 (hours difference)
diffMinutes(end, start);  // 20550 (minutes difference)
```

### Age Calculation

```typescript
import { diffYears, diffMonths, diffDays } from "chronia";

const birthDate = new Date(1990, 5, 15);
const today = new Date();

const ageInYears = diffYears(today, birthDate);
const ageInMonths = diffMonths(today, birthDate);
const ageInDays = diffDays(today, birthDate);

console.log(`Age: ${ageInYears} years`);
```

### Time Ago Display

```typescript
import { diffDays, diffHours, diffMinutes, now } from "chronia";

function timeAgo(date: Date): string {
  const current = now();
  const days = diffDays(current, date);
  
  if (days === 0) {
    const hours = diffHours(current, date);
    if (hours === 0) {
      const minutes = diffMinutes(current, date);
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    }
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  }
  
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}
```

### Duration Display

```typescript
import { diffDays, diffHours, diffMinutes } from "chronia";

function formatDuration(start: Date, end: Date): string {
  const totalMinutes = diffMinutes(end, start);
  const days = Math.floor(totalMinutes / (24 * 60));
  const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
  const minutes = totalMinutes % 60;
  
  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  
  return parts.join(" ") || "0m";
}

const start = new Date(2024, 5, 1, 10, 0, 0);
const end = new Date(2024, 5, 2, 14, 30, 0);
formatDuration(start, end);  // "1d 4h 30m"
```

## Sorting and Ordering

### Sorting Dates

```typescript
import { compare } from "chronia";

const dates = [
  new Date(2024, 5, 15),
  new Date(2024, 5, 1),
  new Date(2024, 5, 30)
];

// Ascending order (earliest first)
dates.sort((a, b) => compare(a, b, { order: "ASC" }));
// [Jun 1, Jun 15, Jun 30]

// Descending order (latest first)
dates.sort((a, b) => compare(a, b, { order: "DESC" }));
// [Jun 30, Jun 15, Jun 1]
```

### Finding Min/Max

```typescript
import { min, max } from "chronia";

const dates = [
  new Date(2024, 5, 15),
  new Date(2024, 5, 1),
  new Date(2024, 5, 30)
];

const earliest = min(...dates);  // Jun 1, 2024
const latest = max(...dates);    // Jun 30, 2024

// Date range
const range = { start: earliest, end: latest };
```

### Clamping Dates

```typescript
import { clamp } from "chronia";

const minDate = new Date(2024, 5, 1);
const maxDate = new Date(2024, 5, 30);

// User input outside range
clamp(new Date(2024, 4, 15), minDate, maxDate);  // Returns Jun 1 (min)
clamp(new Date(2024, 6, 15), minDate, maxDate);  // Returns Jun 30 (max)
clamp(new Date(2024, 5, 15), minDate, maxDate);  // Returns Jun 15 (unchanged)
```

## Practical Application Patterns

### Date Picker Validation

```typescript
import { isValid, isBetween, clamp, now } from "chronia";

function validateBookingDate(userDate: Date): Date | null {
  // Validate input
  if (!isValid(userDate)) {
    return null;
  }
  
  // Define allowed range (today to 1 year ahead)
  const today = now();
  const maxDate = addYears(today, 1);
  
  // Check if within range
  if (!isBetween(userDate, { start: today, end: maxDate })) {
    console.error("Date must be within the next year");
    return null;
  }
  
  return userDate;
}
```

### Recurring Events

```typescript
import { addDays, addWeeks, addMonths, isBefore } from "chronia";

function generateRecurringDates(
  start: Date,
  end: Date,
  interval: "daily" | "weekly" | "monthly"
): Date[] {
  const dates = [];
  let current = start;
  
  while (isBefore(current, end) || isEqual(current, end)) {
    dates.push(current);
    
    if (interval === "daily") {
      current = addDays(current, 1);
    } else if (interval === "weekly") {
      current = addDays(current, 7);  // Or addWeeks(current, 1)
    } else {
      current = addMonths(current, 1);
    }
  }
  
  return dates;
}
```

### Business Days (Example Extension)

```typescript
import { addDays, getDay, isValid } from "chronia";

function addBusinessDays(date: Date, days: number): Date {
  if (!isValid(date) || !Number.isFinite(days)) {
    return new Date(NaN);
  }
  
  let current = new Date(date);
  let remaining = Math.abs(Math.trunc(days));
  const direction = days >= 0 ? 1 : -1;
  
  while (remaining > 0) {
    current = addDays(current, direction);
    const dayOfWeek = getDay(current);
    
    // Skip weekends (0 = Sunday, 6 = Saturday)
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      remaining--;
    }
  }
  
  return current;
}
```

### Fiscal Year Calculations

```typescript
import { getYear, getMonth, setYear, setMonth, setDay } from "chronia";

function getFiscalYear(date: Date, fiscalStartMonth: number = 3): number {
  // Fiscal year starting in April (month 3)
  const year = getYear(date);
  const month = getMonth(date);
  
  return month >= fiscalStartMonth ? year : year - 1;
}

function getFiscalYearStart(date: Date, fiscalStartMonth: number = 3): Date {
  const fiscalYear = getFiscalYear(date, fiscalStartMonth);
  return setDay(setMonth(setYear(date, fiscalYear), fiscalStartMonth), 1);
}
```

### Countdown Timer

```typescript
import { diffDays, diffHours, diffMinutes, diffSeconds } from "chronia";

function getCountdown(targetDate: Date): string {
  const now = new Date();
  const totalSeconds = diffSeconds(targetDate, now);
  
  if (totalSeconds <= 0) {
    return "Expired";
  }
  
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;
  
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
```

### Session Expiry

```typescript
import { addMinutes, isAfter, now } from "chronia";

class Session {
  private expiryDate: Date;
  
  constructor(durationMinutes: number = 30) {
    this.expiryDate = addMinutes(now(), durationMinutes);
  }
  
  isExpired(): boolean {
    return isAfter(now(), this.expiryDate);
  }
  
  extend(additionalMinutes: number = 30): void {
    this.expiryDate = addMinutes(this.expiryDate, additionalMinutes);
  }
  
  getRemainingMinutes(): number {
    return Math.max(0, diffMinutes(this.expiryDate, now()));
  }
}
```

## Error Handling Patterns

### Safe Date Operations

```typescript
import { addDays, isValid } from "chronia";

function safeAddDays(date: Date, days: number): Date {
  const result = addDays(date, days);
  
  if (!isValid(result)) {
    throw new Error("Failed to add days: invalid date or amount");
  }
  
  return result;
}
```

### Fallback Values

```typescript
import { parse, isValid, now } from "chronia";

function parseOrDefault(dateString: string, fallback: Date = now()): Date {
  const parsed = parse(dateString, "yyyy-MM-dd");
  return isValid(parsed) ? parsed : fallback;
}
```

### Validation Pipeline

```typescript
import { isValid, isBetween, clamp } from "chronia";

function validateAndClampDate(
  date: Date,
  minDate: Date,
  maxDate: Date
): Date | null {
  // Step 1: Validate input
  if (!isValid(date)) {
    console.error("Invalid date");
    return null;
  }
  
  // Step 2: Clamp to range
  const clamped = clamp(date, minDate, maxDate);
  
  // Step 3: Validate result
  if (!isValid(clamped)) {
    console.error("Failed to clamp date");
    return null;
  }
  
  return clamped;
}
```

## Related

- **Function Categories**: See `docs/function-categories/` for detailed function documentation
- **Error Handling**: See `error-handling.md` for error patterns
- **Input Validation**: See `input-validation.md` for validation strategies
- **Development Principles**: See `development-principles.md` for design philosophy
