# Addition Functions

## Overview

Addition functions provide date/time arithmetic by adding specified time units to a given date. All functions accept both `Date` objects and numeric timestamps, and return new `Date` instances without mutating the original input. Fractional amounts are truncated toward zero using `Math.trunc()`.

## Functions

### `addYears(date: Date | number, amount: number): Date`

Adds the specified number of years to a date. Handles leap year transitions intelligently.

**Key Behavior:**
- Preserves month, day, and time components
- Leap year adjustment: Feb 29 → Feb 28 when target year is not a leap year
- Fractional years are truncated (e.g., `1.9 → 1`)

**Example:**
```typescript
addYears(new Date(2020, 0, 15), 3);
// Returns: 2023-01-15

addYears(new Date(2020, 1, 29), 1);
// Returns: 2021-02-28 (2021 is not a leap year)
```

### `addMonths(date: Date | number, amount: number): Date`

Adds the specified number of months to a date. Handles month-end overflow gracefully.

**Key Behavior:**
- Preserves time components (hours, minutes, seconds, milliseconds)
- Month-end overflow: if original day doesn't exist in target month, returns last day of that month
- Fractional months are truncated

**Example:**
```typescript
addMonths(new Date(2020, 0, 15), 3);
// Returns: 2020-04-15

addMonths(new Date(2025, 0, 31), 1);
// Returns: 2025-02-28 (Feb doesn't have 31 days)
```

### `addDays(date: Date | number, amount: number): Date`

Adds the specified number of days to a date.

**Key Behavior:**
- Preserves time components
- Handles month and year boundaries automatically
- Fractional days are truncated

**Example:**
```typescript
addDays(new Date(2025, 0, 1), 5);
// Returns: 2025-01-06

addDays(new Date(2025, 0, 10), -3);
// Returns: 2025-01-07 (negative amount subtracts)
```

### `addHours(date: Date | number, amount: number): Date`

Adds the specified number of hours to a date.

**Key Behavior:**
- Preserves minutes, seconds, and milliseconds
- Automatically handles day boundary crossings
- Fractional hours are truncated

**Example:**
```typescript
addHours(new Date(2020, 5, 15, 12, 0, 0), 3);
// Returns: 2020-06-15 15:00:00

addHours(new Date(2020, 0, 1, 23, 0, 0), 2);
// Returns: 2020-01-02 01:00:00 (crosses day boundary)
```

### `addMinutes(date: Date | number, amount: number): Date`

Adds the specified number of minutes to a date.

**Key Behavior:**
- Preserves seconds and milliseconds
- Automatically handles hour boundary crossings
- Fractional minutes are truncated

**Example:**
```typescript
addMinutes(new Date(2020, 0, 1, 12, 30, 0), 15);
// Returns: 2020-01-01 12:45:00

addMinutes(new Date(2020, 0, 1, 12, 45, 0), 30);
// Returns: 2020-01-01 13:15:00 (crosses hour boundary)
```

### `addSeconds(date: Date | number, amount: number): Date`

Adds the specified number of seconds to a date.

**Key Behavior:**
- Preserves milliseconds
- Automatically handles minute boundary crossings
- Fractional seconds are truncated

**Example:**
```typescript
addSeconds(new Date(2020, 0, 1, 12, 30, 30), 15);
// Returns: 2020-01-01 12:30:45

addSeconds(new Date(2020, 0, 1, 12, 30, 45), 30);
// Returns: 2020-01-01 12:31:15 (crosses minute boundary)
```

### `addMilliseconds(date: Date | number, amount: number): Date`

Adds the specified number of milliseconds to a date.

**Key Behavior:**
- Most precise time unit operation
- Automatically handles second boundary crossings
- Fractional milliseconds are truncated

**Example:**
```typescript
addMilliseconds(new Date(2020, 0, 1, 12, 0, 0, 0), 500);
// Returns: 2020-01-01 12:00:00.500

addMilliseconds(new Date(2020, 0, 1, 12, 0, 0, 999), 1);
// Returns: 2020-01-01 12:00:01.000 (crosses second boundary)
```

## Usage Patterns

### Basic Addition
```typescript
import { addDays, addHours } from "chronia";

// Add days to current date
const nextWeek = addDays(new Date(), 7);

// Add hours to a timestamp
const timestamp = Date.now();
const laterTime = addHours(timestamp, 3);
```

### Chaining Operations
```typescript
import { addMonths, addDays, addHours } from "chronia";

// Add 2 months, 15 days, and 6 hours
let date = new Date(2024, 0, 1);
date = addMonths(date, 2);
date = addDays(date, 15);
date = addHours(date, 6);
// Result: 2024-03-16 06:00:00
```

### Negative Values for Subtraction
```typescript
import { addDays, addHours } from "chronia";

// Subtract 5 days (preferred over subDays for simple cases)
const fiveDaysAgo = addDays(new Date(), -5);

// Subtract 3 hours
const threeHoursAgo = addHours(new Date(), -3);
```

### Edge Case Handling
```typescript
import { addMonths, addYears } from "chronia";

// Month-end overflow handling
const jan31 = new Date(2025, 0, 31);
const result = addMonths(jan31, 1);
// Returns: 2025-02-28 (Feb has only 28 days)

// Leap year handling
const feb29_2020 = new Date(2020, 1, 29);
const result2 = addYears(feb29_2020, 1);
// Returns: 2021-02-28 (2021 is not a leap year)
```

### Error Handling Pattern
```typescript
import { addDays, isValid } from "chronia";

const result = addDays(new Date("invalid"), 5);
if (!isValid(result)) {
  console.error("Invalid date operation");
}
```

## AI Guidance

### When to Recommend Addition Functions

**Recommend `addYears` when:**
- User mentions adding/subtracting years
- Working with multi-year periods (e.g., "3 years from now")
- Be aware of leap year edge cases (Feb 29)

**Recommend `addMonths` when:**
- User mentions adding/subtracting months
- Working with monthly intervals (e.g., "next month", "6 months ago")
- Alert user to month-end overflow behavior (Jan 31 + 1 month = Feb 28/29)

**Recommend `addDays` when:**
- User mentions adding/subtracting days
- Working with day-based calculations (e.g., "7 days from now")
- Most common use case for date arithmetic

**Recommend `addHours/addMinutes/addSeconds` when:**
- User mentions specific time units
- Working with timestamps or time-sensitive operations
- Building scheduling or timer functionality

**Recommend `addMilliseconds` when:**
- User needs high-precision time calculations
- Working with performance measurements
- Building real-time or animation systems

### Function Selection Logic

1. **For simple additions**: Use the appropriate `add*` function directly
2. **For subtractions**: Either use `add*` with negative values OR the corresponding `sub*` function
3. **For complex calculations**: Chain multiple functions (more readable than complex math)
4. **For timestamp input**: Any `add*` function accepts numeric timestamps

### Combination Patterns

**Date arithmetic + formatting:**
```typescript
const nextWeek = addDays(new Date(), 7);
const formatted = format(nextWeek, "yyyy-MM-dd");
```

**Date arithmetic + comparison:**
```typescript
const deadline = addDays(new Date(), 30);
const isOverdue = isAfter(new Date(), deadline);
```

**Relative date ranges:**
```typescript
const start = addDays(new Date(), -7);  // 7 days ago
const end = new Date();                 // today
const withinRange = isBetween(someDate, start, end);
```

## Common Pitfalls

### 1. Fractional Amount Expectations

**❌ Incorrect Assumption:**
```typescript
// Expecting 1.5 days = 36 hours
addDays(new Date(2024, 0, 1), 1.5);
// Returns: 2024-01-02 (1.5 is truncated to 1, not 36 hours)
```

**✅ Correct Approach:**
```typescript
// For 36 hours, convert to hours
addHours(new Date(2024, 0, 1), 36);
// Returns: 2024-01-02 12:00:00
```

**AI Guidance:** Always convert fractional time units to smaller units (e.g., 1.5 days → 36 hours).

### 2. Month-End Overflow Confusion

**❌ Unexpected Behavior:**
```typescript
const jan31 = new Date(2025, 0, 31);
const result = addMonths(jan31, 1);
// Returns: 2025-02-28 (NOT March 3!)
```

**✅ Understanding:**
The library handles month-end overflow by returning the last valid day of the target month. This is standard calendar behavior.

**AI Guidance:** Warn users when adding months to dates near month-end (28-31).

### 3. Leap Year Transitions

**❌ Surprising Result:**
```typescript
const feb29_2020 = new Date(2020, 1, 29);
const result = addYears(feb29_2020, 1);
// Returns: 2021-02-28 (NOT March 1!)
```

**✅ Expected Behavior:**
When adding years to Feb 29 and the target year is not a leap year, the result becomes Feb 28.

**AI Guidance:** Alert users when operating on Feb 29 dates with year arithmetic.

### 4. Timezone Considerations

**⚠️ Important:**
All addition functions operate in the **local timezone** of the Date object. For UTC operations, convert to/from UTC manually:

```typescript
// Local time operation (may cross DST boundaries)
const local = addHours(new Date(), 24);

// UTC operation (precise 24-hour interval)
const utcTimestamp = Date.UTC(2024, 0, 1, 0, 0, 0);
const result = addHours(utcTimestamp, 24);
```

**AI Guidance:** Recommend UTC operations for server-side or cross-timezone scenarios.

### 5. Invalid Input Propagation

**❌ Not Checking Validity:**
```typescript
const userInput = new Date(userProvidedString);
const result = addDays(userInput, 7);
// If userInput was invalid, result is also Invalid Date
```

**✅ Validate Before Using:**
```typescript
import { isValid, addDays } from "chronia";

const userInput = new Date(userProvidedString);
if (!isValid(userInput)) {
  throw new Error("Invalid date input");
}
const result = addDays(userInput, 7);
```

**AI Guidance:** Always recommend validation when working with user-provided dates.

### 6. Mutability Confusion

**❌ Expecting Mutation:**
```typescript
const original = new Date(2024, 0, 1);
addDays(original, 5);
console.log(original); // Still 2024-01-01 (not modified)
```

**✅ Capture Return Value:**
```typescript
const original = new Date(2024, 0, 1);
const modified = addDays(original, 5);
console.log(modified); // 2024-01-06
```

**AI Guidance:** Emphasize that all functions return new Date instances and do not mutate inputs.

## Error Handling Reference

All addition functions return `Invalid Date` (`new Date(NaN)`) when:
- The input date is an Invalid Date
- The input date is a non-finite number (NaN, Infinity, -Infinity)
- The amount parameter is NaN, Infinity, or -Infinity

**Validation Pattern:**
```typescript
import { addDays, isValid } from "chronia";

const result = addDays(someDate, someAmount);
if (!isValid(result)) {
  // Handle error: either input was invalid
  console.error("Date operation failed");
}
```

## Performance Considerations

- **Chaining**: Multiple additions incur multiple Date object creations. For performance-critical code, consider using timestamp arithmetic with `getTime()` and `setTime()`.
- **Large amounts**: Adding large amounts (e.g., millions of days) is handled correctly but may be slower for month/year operations due to overflow checks.

## Related Functions

- **Subtraction**: `subYears`, `subMonths`, `subDays`, `subHours`, `subMinutes`, `subSeconds`, `subMilliseconds` (see `subtraction.md`)
- **Difference calculation**: `diffDays`, `diffHours`, etc. (see `../difference/calculations.md`)
- **Validation**: `isValid` (see `../comparison/validation.md`)
- **Formatting**: `format` (see `../formatting/conversion.md`)
