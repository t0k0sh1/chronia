# Common Pitfalls

## Overview

This document highlights common mistakes when using Chronia and how to avoid them.

## Invalid Date Handling

### ❌ Pitfall 1: Truthy Check on Invalid Date

**Problem:** Invalid Date objects are truthy in JavaScript.

```typescript
const invalid = new Date("not a date");

if (invalid) {
  // This EXECUTES even though date is invalid!
  const result = addDays(invalid, 7);  // Returns Invalid Date
}
```

**Solution:** Always use `isValid()` to check dates.

```typescript
import { isValid } from "chronia";

const date = new Date(userInput);

if (isValid(date)) {
  // Safe to use date
  const result = addDays(date, 7);
} else {
  console.error("Invalid date");
}
```

### ❌ Pitfall 2: Not Checking Return Values

**Problem:** Using results without validation.

```typescript
const result = addMonths(userDate, 3);
const formatted = format(result, "yyyy-MM-dd");
// If userDate was invalid, formatted is "Invalid Date"
```

**Solution:** Validate results before use.

```typescript
import { addMonths, isValid, format } from "chronia";

const result = addMonths(userDate, 3);

if (!isValid(result)) {
  return "Unable to calculate date";
}

const formatted = format(result, "yyyy-MM-dd");
```

### ❌ Pitfall 3: Boolean Function Error Ambiguity

**Problem:** `false` can mean error OR valid negative result.

```typescript
const result = isAfter(date1, date2);

if (!result) {
  // Could be:
  // 1. date1 is not after date2 (valid)
  // 2. date1 or date2 is invalid (error)
}
```

**Solution:** Validate inputs separately.

```typescript
import { isAfter, isValid } from "chronia";

if (!isValid(date1) || !isValid(date2)) {
  throw new Error("Invalid date inputs");
}

const result = isAfter(date1, date2);
if (!result) {
  // Now we know: date1 is NOT after date2 (valid result)
}
```

## Timezone Issues

### ❌ Pitfall 4: Expecting UTC Behavior

**Problem:** Chronia uses local timezone by default.

```typescript
const date = new Date("2024-01-15T10:00:00");  // Parsed in local timezone

format(date, "yyyy-MM-dd HH:mm:ss");
// Output depends on local timezone
// In PST: "2024-01-15 10:00:00"
// In JST: "2024-01-15 10:00:00" (same local time, different UTC)
```

**Solution:** Use UTC methods for timezone-independent operations.

```typescript
// For UTC operations, use native Date methods
const utcDate = new Date(Date.UTC(2024, 0, 15, 10, 0, 0));
const utcYear = utcDate.getUTCFullYear();
const utcMonth = utcDate.getUTCMonth();

// Or convert to/from UTC explicitly
const localDate = new Date(2024, 0, 15);
const utcTimestamp = Date.UTC(
  localDate.getFullYear(),
  localDate.getMonth(),
  localDate.getDate()
);
```

### ❌ Pitfall 5: Daylight Saving Time Confusion

**Problem:** DST transitions can cause unexpected behavior.

```typescript
// Spring forward (DST starts)
const beforeDST = new Date(2024, 2, 10, 1, 0, 0);  // Mar 10, 1:00 AM
const afterDST = addHours(beforeDST, 2);
// Result: Mar 10, 3:00 AM (2:00 AM doesn't exist due to DST)

// Fall back (DST ends)
const beforeFallback = new Date(2024, 10, 3, 1, 0, 0);  // Nov 3, 1:00 AM
const afterFallback = addHours(beforeFallback, 2);
// Result: Nov 3, 3:00 AM (but 1:00-2:00 occurs twice)
```

**Solution:** Be aware of DST implications. For critical applications, use UTC.

```typescript
// Use UTC to avoid DST issues
const utcDate = new Date(Date.UTC(2024, 2, 10, 1, 0, 0));
// DST doesn't affect UTC
```

## Month Indexing

### ❌ Pitfall 6: 1-Based Month Assumption

**Problem:** JavaScript months are 0-indexed (0 = January, 11 = December).

```typescript
const date = new Date(2024, 1, 15);  // February 15 (NOT January 15)

getMonth(date);  // Returns 1 (February)

setMonth(date, 12);  // Invalid: month 12 doesn't exist (0-11)
// Returns Invalid Date
```

**Solution:** Remember 0-based indexing.

```typescript
// January = 0, December = 11
const january = new Date(2024, 0, 15);
const december = new Date(2024, 11, 15);

// getMonth() returns 0-11 (JavaScript standard)
// For display to users, add 1 to convert to 1-12
const displayMonth = getMonth(january) + 1;  // 0-11 → 1-12 for display
```

### ❌ Pitfall 7: Month Overflow

**Problem:** Setting invalid month values.

```typescript
setMonth(date, 12);   // Invalid (0-11 only) → Invalid Date
setMonth(date, -1);   // Invalid → Invalid Date
```

**Solution:** Validate month range (0-11).

```typescript
function safeSetMonth(date: Date, month: number): Date {
  if (month < 0 || month > 11) {
    throw new Error("Month must be 0-11");
  }
  return setMonth(date, month);
}
```

## Arithmetic Edge Cases

### ❌ Pitfall 8: Fractional Rounding Assumptions

**Problem:** Expecting rounding instead of truncation.

```typescript
addDays(new Date(2024, 0, 1), 1.9);
// Expected: Jan 3 (rounded up to 2 days)
// Actual: Jan 2 (truncated to 1 day)

addDays(new Date(2024, 0, 10), -1.9);
// Expected: Jan 8 (rounded to -2 days)
// Actual: Jan 9 (truncated to -1 day)
```

**Solution:** Use `Math.trunc()` or round explicitly before passing.

```typescript
// If you want rounding
addDays(date, Math.round(1.9));  // Adds 2 days

// If you want truncation (default)
addDays(date, 1.9);  // Adds 1 day
```

### ❌ Pitfall 9: Month-End Date Arithmetic

**Problem:** Month-end dates behave unexpectedly.

```typescript
addMonths(new Date(2024, 0, 31), 1);
// Expected: Jan 31 → Feb 31
// Actual: Feb 29, 2024 (Feb doesn't have 31 days)

addMonths(new Date(2024, 0, 31), 2);
// Returns: Mar 31, 2024 (preserves day when possible)
```

**Solution:** Understand month-end adjustment behavior.

```typescript
// If you need strict day preservation, handle manually
function strictAddMonths(date: Date, months: number): Date {
  const originalDay = getDay(date);
  const result = addMonths(date, months);
  const resultDay = getDay(result);
  
  if (originalDay !== resultDay) {
    throw new Error("Day changed due to month-end adjustment");
  }
  
  return result;
}
```

### ❌ Pitfall 10: Leap Year Confusion

**Problem:** Not accounting for leap years.

```typescript
addYears(new Date(2024, 1, 29), 1);
// Feb 29, 2024 → Feb 28, 2025 (2025 not a leap year)

addYears(new Date(2024, 1, 29), 4);
// Feb 29, 2024 → Feb 29, 2028 (2028 is a leap year)
```

**Solution:** Be aware of leap year implications.

```typescript
// Check if leap year
function isLeapYear(date: Date): boolean {
  const year = getYear(date);
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}
```

## Format and Parse Issues

### ❌ Pitfall 11: Month vs. Minute Token Confusion

**Problem:** Using 'm' (minute) instead of 'M' (month).

```typescript
format(new Date(2024, 5, 15), "yyyy-mm-dd");
// Expected: "2024-06-15"
// Actual: "2024-00-15" (mm = minutes, not month)
```

**Solution:** Use correct tokens: 'M' for month, 'm' for minute.

```typescript
format(date, "yyyy-MM-dd");       // CORRECT: Month
format(date, "HH:mm:ss");         // CORRECT: Minute
format(date, "yyyy-MM-dd HH:mm"); // CORRECT: Both
```

### ❌ Pitfall 12: Parse Pattern Mismatch

**Problem:** Pattern doesn't match input format.

```typescript
parse("2024-06-15", "MM/dd/yyyy");
// Expected: June 15, 2024
// Actual: Invalid Date (pattern mismatch)
```

**Solution:** Ensure pattern matches input exactly.

```typescript
parse("2024-06-15", "yyyy-MM-dd");    // CORRECT
parse("06/15/2024", "MM/dd/yyyy");    // CORRECT
parse("June 15, 2024", "MMMM d, yyyy");  // CORRECT
```

### ❌ Pitfall 13: Locale-Dependent Parsing

**Problem:** Parsing localized strings without locale.

```typescript
parse("1月 15, 2024", "MMMM d, yyyy");
// Expected: January 15, 2024
// Actual: Invalid Date (expects English month name)
```

**Solution:** Provide correct locale.

```typescript
import { parse } from "chronia";
import { jaLocale } from "chronia/i18n";

parse("1月 15, 2024", "MMMM d, yyyy", jaLocale);  // CORRECT
```

## Immutability Assumptions

### ❌ Pitfall 14: Expecting Mutation

**Problem:** Thinking functions mutate the input.

```typescript
const date = new Date(2024, 0, 15);
addDays(date, 7);

console.log(date);  // Still Jan 15 (not mutated)
```

**Solution:** Capture returned value.

```typescript
const date = new Date(2024, 0, 15);
const newDate = addDays(date, 7);  // Jan 22

console.log(date);     // Jan 15 (original unchanged)
console.log(newDate);  // Jan 22 (new date)
```

### ❌ Pitfall 15: Reusing Date Objects

**Problem:** Mutating Date objects between Chronia calls.

```typescript
const date = new Date(2024, 0, 15);

// WRONG: Mutating date
date.setDate(date.getDate() + 7);
const result = addMonths(date, 1);  // Based on mutated date
```

**Solution:** Use Chronia functions for all operations.

```typescript
const date = new Date(2024, 0, 15);

// CORRECT: Chain Chronia functions
const step1 = addDays(date, 7);
const result = addMonths(step1, 1);

// Or combine
const result = addMonths(addDays(date, 7), 1);
```

## Comparison Issues

### ❌ Pitfall 16: Millisecond-Level Equality

**Problem:** Comparing dates with different timestamps.

```typescript
const date1 = new Date(2024, 0, 15, 10, 30, 0, 0);
const date2 = new Date(2024, 0, 15, 10, 30, 0, 123);

isEqual(date1, date2);  // false (different milliseconds)
```

**Solution:** Use unit-based comparison.

```typescript
isEqual(date1, date2, { unit: "second" });  // true (same second)
isEqual(date1, date2, { unit: "day" });     // true (same day)
```

### ❌ Pitfall 17: Boundary Inclusion Confusion

**Problem:** Misunderstanding `isBetween` boundary semantics.

```typescript
const interval = {
  start: new Date(2024, 0, 1),
  end: new Date(2024, 0, 31)
};

// Default: exclusive boundaries "()"
isBetween(new Date(2024, 0, 1), interval);   // false (start excluded)
isBetween(new Date(2024, 0, 31), interval);  // false (end excluded)
```

**Solution:** Specify boundary type explicitly.

```typescript
isBetween(date, interval, { bounds: "[]" });  // Inclusive: both included
isBetween(date, interval, { bounds: "[)" });  // Start included, end excluded
```

## Performance Issues

### ❌ Pitfall 18: Unnecessary Date Creation

**Problem:** Creating Date objects in loops.

```typescript
// INEFFICIENT
for (let i = 0; i < 1000; i++) {
  if (isAfter(events[i].date, new Date())) {
    // Creates new Date 1000 times
  }
}
```

**Solution:** Create Date once outside loop.

```typescript
// EFFICIENT
const now = new Date();
for (let i = 0; i < 1000; i++) {
  if (isAfter(events[i].date, now)) {
    // Reuses same Date
  }
}
```

### ❌ Pitfall 19: Inefficient Sorting

**Problem:** Using complex comparisons in sort.

```typescript
// INEFFICIENT
dates.sort((a, b) => {
  if (isAfter(a, b)) return 1;
  if (isBefore(a, b)) return -1;
  return 0;
});
```

**Solution:** Use `compare()` function.

```typescript
// EFFICIENT
import { compare } from "chronia";

dates.sort((a, b) => compare(a, b, { order: "ASC" }));
```

## Type Safety

### ❌ Pitfall 20: Passing Wrong Types

**Problem:** TypeScript allows `any`, runtime fails.

```typescript
const value: any = "2024-01-15";
addDays(value, 7);  // TypeScript OK, runtime Invalid Date
```

**Solution:** Validate types at runtime.

```typescript
import { isValid } from "chronia";

function safeAddDays(value: any, days: number): Date {
  const date = value instanceof Date ? value : new Date(value);
  
  if (!isValid(date)) {
    throw new Error("Invalid date");
  }
  
  return addDays(date, days);
}
```

## Related

- **Error Handling**: See `error-handling.md` for error patterns
- **Input Validation**: See `input-validation.md` for validation strategies
- **Debugging Guide**: See `debugging-guide.md` for troubleshooting steps
- **Common Use Cases**: See `common-use-cases.md` for correct usage patterns
