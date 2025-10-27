# Subtraction Functions

## Overview

Subtraction functions provide date/time arithmetic by subtracting specified time units from a given date. These functions are convenience wrappers around their corresponding `add*` functions, internally calling them with negated amounts. All functions accept both `Date` objects and numeric timestamps, and return new `Date` instances without mutating the original input.

## Functions

### `subYears(date: Date | number, amount: number): Date`

Subtracts the specified number of years from a date.

**Implementation Note:** Internally calls `addYears(date, -amount)`

**Key Behavior:**
- Preserves month, day, and time components
- Leap year adjustment: Feb 29 → Feb 28 when target year is not a leap year
- Fractional years are truncated
- Negative amounts add years instead of subtracting

**Example:**
```typescript
subYears(new Date(2020, 0, 15), 3);
// Returns: 2017-01-15

subYears(new Date(2024, 1, 29), 1);
// Returns: 2023-02-28 (2023 is not a leap year)

subYears(new Date(2020, 0, 15), -3);
// Returns: 2023-01-15 (negative amount adds)
```

### `subMonths(date: Date | number, amount: number): Date`

Subtracts the specified number of months from a date.

**Implementation Note:** Internally calls `addMonths(date, -amount)`

**Key Behavior:**
- Preserves time components (hours, minutes, seconds, milliseconds)
- Month-end overflow: if original day doesn't exist in target month, returns last day of that month
- Fractional months are truncated
- Negative amounts add months instead of subtracting

**Example:**
```typescript
subMonths(new Date(2020, 3, 15), 3);
// Returns: 2020-01-15

subMonths(new Date(2025, 2, 31), 1);
// Returns: 2025-02-28 (Feb doesn't have 31 days)

subMonths(new Date(2020, 3, 15), -2);
// Returns: 2020-05-15 (negative amount adds)
```

### `subDays(date: Date | number, amount: number): Date`

Subtracts the specified number of days from a date.

**Implementation Note:** Internally calls `addDays(date, -amount)`

**Key Behavior:**
- Preserves time components
- Handles month and year boundaries automatically
- Fractional days are truncated
- Negative amounts add days instead of subtracting

**Example:**
```typescript
subDays(new Date(2025, 0, 10), 5);
// Returns: 2025-01-05

subDays(new Date(2025, 0, 10), -3);
// Returns: 2025-01-13 (negative amount adds)
```

### `subHours(date: Date | number, amount: number): Date`

Subtracts the specified number of hours from a date.

**Implementation Note:** Internally calls `addHours(date, -amount)`

**Key Behavior:**
- Preserves minutes, seconds, and milliseconds
- Automatically handles day boundary crossings
- Fractional hours are truncated
- Negative amounts add hours instead of subtracting

**Example:**
```typescript
subHours(new Date(2020, 5, 15, 15, 0, 0), 3);
// Returns: 2020-06-15 12:00:00

subHours(new Date(2020, 0, 2, 1, 0, 0), 2);
// Returns: 2020-01-01 23:00:00 (crosses day boundary)
```

### `subMinutes(date: Date | number, amount: number): Date`

Subtracts the specified number of minutes from a date.

**Implementation Note:** Internally calls `addMinutes(date, -amount)`

**Key Behavior:**
- Preserves seconds and milliseconds
- Automatically handles hour boundary crossings
- Fractional minutes are truncated
- Negative amounts add minutes instead of subtracting

**Example:**
```typescript
subMinutes(new Date(2020, 0, 1, 12, 30, 0), 15);
// Returns: 2020-01-01 12:15:00

subMinutes(new Date(2020, 0, 1, 13, 15, 0), 30);
// Returns: 2020-01-01 12:45:00 (crosses hour boundary)
```

### `subSeconds(date: Date | number, amount: number): Date`

Subtracts the specified number of seconds from a date.

**Implementation Note:** Internally calls `addSeconds(date, -amount)`

**Key Behavior:**
- Preserves milliseconds
- Automatically handles minute boundary crossings
- Fractional seconds are truncated
- Negative amounts add seconds instead of subtracting

**Example:**
```typescript
subSeconds(new Date(2020, 0, 1, 12, 30, 45), 15);
// Returns: 2020-01-01 12:30:30

subSeconds(new Date(2020, 0, 1, 12, 31, 15), 30);
// Returns: 2020-01-01 12:30:45 (crosses minute boundary)
```

### `subMilliseconds(date: Date | number, amount: number): Date`

Subtracts the specified number of milliseconds from a date.

**Implementation Note:** Internally calls `addMilliseconds(date, -amount)`

**Key Behavior:**
- Most precise time unit operation
- Automatically handles second boundary crossings
- Fractional milliseconds are truncated
- Negative amounts add milliseconds instead of subtracting

**Example:**
```typescript
subMilliseconds(new Date(2020, 0, 1, 12, 0, 0, 500), 300);
// Returns: 2020-01-01 12:00:00.200

subMilliseconds(new Date(2020, 0, 1, 12, 00, 01, 0), 1);
// Returns: 2020-01-01 12:00:00.999 (crosses second boundary)
```

## Usage Patterns

### Basic Subtraction
```typescript
import { subDays, subHours } from "chronia";

// Subtract days from current date
const lastWeek = subDays(new Date(), 7);

// Subtract hours from a timestamp
const timestamp = Date.now();
const earlierTime = subHours(timestamp, 3);
```

### Chaining Operations
```typescript
import { subMonths, subDays, subHours } from "chronia";

// Subtract 2 months, 15 days, and 6 hours
let date = new Date(2024, 5, 15);
date = subMonths(date, 2);
date = subDays(date, 15);
date = subHours(date, 6);
// Result: 2024-03-30 18:00:00 (approximately)
```

### Relative Date Calculations
```typescript
import { subDays } from "chronia";

// Common patterns for relative dates
const yesterday = subDays(new Date(), 1);
const lastWeek = subDays(new Date(), 7);
const lastMonth = subDays(new Date(), 30);
const lastYear = subDays(new Date(), 365);
```

### Negative Values for Addition
```typescript
import { subDays } from "chronia";

// Using negative values (adds instead of subtracts)
const fiveDaysFromNow = subDays(new Date(), -5);

// Equivalent to:
import { addDays } from "chronia";
const same = addDays(new Date(), 5);
```

## AI Guidance

### When to Recommend Subtraction Functions

**Prefer `sub*` functions when:**
- User explicitly mentions "subtract", "remove", "go back", "ago", "earlier", "previous"
- Working with past dates (e.g., "7 days ago", "last month")
- Building historical data queries or lookups
- More semantically clear than `add*` with negative values

**Prefer `add*` with negative values when:**
- Already using `add*` functions in the same context
- User provides a variable that might be positive or negative
- Building generic utilities that handle both directions

### Function Selection Logic

1. **For semantic clarity**: Use `sub*` for past dates, `add*` for future dates
2. **For consistency**: If the codebase uses one pattern, stick with it
3. **For user input**: If amount comes from user input and direction is unknown, use `add*` with signed values

### Combination Patterns

**Date ranges (past to present):**
```typescript
const start = subDays(new Date(), 30);  // 30 days ago
const end = new Date();                 // today
const withinLastMonth = isBetween(someDate, start, end);
```

**Comparison with past dates:**
```typescript
const deadline = subDays(new Date(), 7);
const isRecent = isAfter(someDate, deadline);
```

**Mixed arithmetic:**
```typescript
// Start of last month
const date = new Date();
const lastMonth = subMonths(date, 1);
const startOfLastMonth = startOfMonth(lastMonth);
```

## Common Pitfalls

### 1. Choosing Between `sub*` and `add*` with Negative Values

**Both approaches work identically:**
```typescript
// These are exactly equivalent:
subDays(new Date(2024, 0, 10), 5);     // Returns: 2024-01-05
addDays(new Date(2024, 0, 10), -5);    // Returns: 2024-01-05
```

**Recommendation:** Use `sub*` for semantic clarity when working with past dates.

### 2. Negative Amount Confusion

**⚠️ Be aware:**
```typescript
// Negative amounts reverse the operation
subDays(new Date(2024, 0, 1), -5);     // Returns: 2024-01-06 (adds 5 days!)
```

**AI Guidance:** Warn users when passing negative literals to `sub*` functions - suggest using `add*` instead for clarity.

### 3. Month-End Behavior (Inherited from `add*`)

All month-end overflow behaviors from `add*` functions apply:

```typescript
const march31 = new Date(2025, 2, 31);
const result = subMonths(march31, 1);
// Returns: 2025-02-28 (Feb doesn't have 31 days)
```

See `addition.md` for complete month-end overflow documentation.

### 4. Leap Year Behavior (Inherited from `add*`)

All leap year adjustments from `add*` functions apply:

```typescript
const feb29_2024 = new Date(2024, 1, 29);
const result = subYears(feb29_2024, 1);
// Returns: 2023-02-28 (2023 is not a leap year)
```

See `addition.md` for complete leap year documentation.

### 5. Timezone Considerations

Like `add*` functions, all subtraction operates in local timezone:

```typescript
// Local time operation (may cross DST boundaries)
const local = subHours(new Date(), 24);

// For UTC, work with timestamps:
const utcTimestamp = Date.UTC(2024, 0, 2, 0, 0, 0);
const result = subHours(utcTimestamp, 24);
```

### 6. Validation Requirements

Same validation patterns as `add*` functions:

```typescript
import { isValid, subDays } from "chronia";

const result = subDays(userProvidedDate, 7);
if (!isValid(result)) {
  console.error("Invalid date operation");
}
```

## Error Handling Reference

All subtraction functions return `Invalid Date` (`new Date(NaN)`) when:
- The input date is an Invalid Date
- The input date is a non-finite number (NaN, Infinity, -Infinity)
- The amount parameter is NaN, Infinity, or -Infinity

**Validation Pattern:**
```typescript
import { subDays, isValid } from "chronia";

const result = subDays(someDate, someAmount);
if (!isValid(result)) {
  // Handle error: either input was invalid
  console.error("Date operation failed");
}
```

## Implementation Details

All subtraction functions are thin wrappers:

```typescript
// Conceptual implementation
export function subDays(date: Date | number, amount: number): Date {
  if (!isValidNumber(amount)) {
    return new Date(NaN);
  }
  return addDays(date, -amount);  // Delegates to addDays
}
```

**Implications:**
- No additional overhead beyond amount negation and validation
- All edge case handling is in the `add*` functions
- Performance characteristics identical to `add*` functions

## Related Functions

- **Addition**: `addYears`, `addMonths`, `addDays`, `addHours`, `addMinutes`, `addSeconds`, `addMilliseconds` (see `addition.md`)
- **Difference calculation**: `diffDays`, `diffHours`, etc. (see `../difference/calculations.md`)
- **Validation**: `isValid` (see `../comparison/validation.md`)
- **Boundary operations**: `startOfDay`, `endOfDay`, etc. (see `../boundary/periods.md`)
