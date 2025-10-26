# Relational Comparison Functions

## Overview

Relational comparison functions enable chronological ordering and range checking of dates. These functions support optional granularity control via the `unit` parameter, allowing comparisons at year, month, day, hour, minute, second, or millisecond levels. All functions return `false` for invalid inputs, ensuring safe error handling without exceptions.

## Functions

### `isAfter(a: Date | number, b: Date | number, options?: ComparisonOptions): boolean`

Checks if the first date is **strictly after** the second date.

**Parameters:**
- `a` - The first date (Date object or timestamp)
- `b` - The second date (Date object or timestamp)
- `options.unit` - Comparison granularity (default: "millisecond")

**Key Behavior:**
- **Strict comparison**: Equality returns `false`
- Supports unit-based truncation for coarser comparisons
- Returns `false` for any invalid input

**Examples:**
```typescript
isAfter(new Date(2025, 0, 2), new Date(2025, 0, 1));
// Returns: true

// Equality is NOT "after"
const date = new Date(2025, 0, 1);
isAfter(date, date);
// Returns: false

// Unit-based comparison (day granularity)
isAfter(
  new Date(2025, 0, 2, 10, 0),  // Jan 2, 10:00
  new Date(2025, 0, 1, 23, 59), // Jan 1, 23:59
  { unit: "day" }
);
// Returns: true (Jan 2 is after Jan 1)

// Invalid input handling
isAfter(new Date("invalid"), new Date(2025, 0, 1));
// Returns: false
```

### `isAfterOrEqual(a: Date | number, b: Date | number, options?: ComparisonOptions): boolean`

Checks if the first date is **after or equal to** the second date.

**Parameters:**
- Same as `isAfter`

**Key Behavior:**
- **Inclusive comparison**: Equality returns `true`
- Useful for range boundaries and validation
- Unit-based truncation supported

**Examples:**
```typescript
isAfterOrEqual(new Date(2025, 0, 2), new Date(2025, 0, 1));
// Returns: true

// Equality IS "after or equal"
const date = new Date(2025, 0, 1);
isAfterOrEqual(date, date);
// Returns: true

// Unit-based comparison (day granularity)
isAfterOrEqual(
  new Date(2025, 0, 1, 23, 59),
  new Date(2025, 0, 1, 0, 0),
  { unit: "day" }
);
// Returns: true (same day)
```

### `isBefore(a: Date | number, b: Date | number, options?: ComparisonOptions): boolean`

Checks if the first date is **strictly before** the second date.

**Parameters:**
- Same as `isAfter`

**Key Behavior:**
- **Strict comparison**: Equality returns `false`
- Mirror of `isAfter` with reversed logic
- Unit-based truncation supported

**Examples:**
```typescript
isBefore(new Date(2025, 0, 1), new Date(2025, 0, 2));
// Returns: true

// Equality is NOT "before"
const date = new Date(2025, 0, 1);
isBefore(date, date);
// Returns: false

// Unit-based comparison (year granularity)
isBefore(
  new Date(2024, 11, 31), // Dec 31, 2024
  new Date(2025, 0, 1),   // Jan 1, 2025
  { unit: "year" }
);
// Returns: true (2024 is before 2025)
```

### `isBeforeOrEqual(a: Date | number, b: Date | number, options?: ComparisonOptions): boolean`

Checks if the first date is **before or equal to** the second date.

**Parameters:**
- Same as `isAfter`

**Key Behavior:**
- **Inclusive comparison**: Equality returns `true`
- Mirror of `isAfterOrEqual` with reversed logic
- Unit-based truncation supported

**Examples:**
```typescript
isBeforeOrEqual(new Date(2025, 0, 1), new Date(2025, 0, 2));
// Returns: true

// Equality IS "before or equal"
const date = new Date(2025, 0, 1);
isBeforeOrEqual(date, date);
// Returns: true

// Unit-based comparison (hour granularity)
isBeforeOrEqual(
  new Date(2025, 0, 1, 10, 30),
  new Date(2025, 0, 1, 10, 45),
  { unit: "hour" }
);
// Returns: true (same hour)
```

### `isBetween(date: Date | number, interval: Interval, options?: BetweenOption): boolean`

Checks if a date falls within an interval with configurable boundary inclusion.

**Parameters:**
- `date` - The date to check
- `interval` - Object with `start` and `end` properties (can be `null` for open-ended intervals)
- `options.bounds` - Boundary inclusion mode (default: "()")
  - `"()"` - Both boundaries excluded
  - `"[]"` - Both boundaries included
  - `"[)"` - Start included, end excluded
  - `"(]"` - Start excluded, end included

**Key Behavior:**
- Uses mathematical interval notation for boundary control
- Supports open-ended intervals (`null` start/end)
- `null` start defaults to `MIN_DATE` (-8640000000000000)
- `null` end defaults to `MAX_DATE` (8640000000000000)
- Returns `false` for invalid inputs

**Examples:**
```typescript
// Default (exclusive boundaries)
isBetween(
  new Date(2024, 5, 15),
  { start: new Date(2024, 5, 10), end: new Date(2024, 5, 20) }
);
// Returns: true

// Inclusive boundaries
isBetween(
  new Date(2024, 5, 10),
  { start: new Date(2024, 5, 10), end: new Date(2024, 5, 20) },
  { bounds: "[]" }
);
// Returns: true (boundary is included)

// Exclusive boundaries (boundary not included)
isBetween(
  new Date(2024, 5, 10),
  { start: new Date(2024, 5, 10), end: new Date(2024, 5, 20) },
  { bounds: "()" }
);
// Returns: false (boundary is excluded)

// Open-ended interval (null end)
isBetween(
  new Date(2025, 0, 1),
  { start: new Date(2024, 0, 1), end: null }
);
// Returns: true (any date after start)

// Open-ended interval (null start)
isBetween(
  new Date(2023, 0, 1),
  { start: null, end: new Date(2024, 0, 1) }
);
// Returns: true (any date before end)

// Works with timestamps
isBetween(
  Date.now(),
  { start: Date.now() - 1000, end: Date.now() + 1000 }
);
// Returns: true (within 1 second window)
```

### `compare(date1: Date | number, date2: Date | number, options?: CompareOptions): number`

Compares two dates chronologically for sorting with configurable order.

**Parameters:**
- `date1` - The first date
- `date2` - The second date
- `options.order` - Sort order: `"ASC"` (default) or `"DESC"`

**Returns:**
- `-1` if `date1 < date2` (ascending) or `date1 > date2` (descending)
- `1` if `date1 > date2` (ascending) or `date1 < date2` (descending)
- `0` if equal
- `NaN` if either input is invalid

**Key Behavior:**
- Designed for use with `Array.sort()`
- Order parameter is case-insensitive at runtime
- Returns `NaN` for invalid inputs (not `false`)
- JavaScript users can pass string directly: `compare(a, b, "DESC")`

**Examples:**
```typescript
// Basic ascending comparison
compare(new Date('2024-01-01'), new Date('2024-01-02'));
// Returns: -1 (first date is earlier)

// Equality
compare(new Date('2024-01-01'), new Date('2024-01-01'));
// Returns: 0

// Descending comparison
compare(new Date('2024-01-01'), new Date('2024-01-02'), { order: 'DESC' });
// Returns: 1 (reversed for descending order)

// Sort ascending (default)
const dates = [
  new Date(2024, 0, 15),
  new Date(2024, 0, 1),
  new Date(2024, 0, 30)
];
dates.sort(compare);
// Result: [Jan 1, Jan 15, Jan 30]

// Sort descending
dates.sort((a, b) => compare(a, b, { order: 'DESC' }));
// Result: [Jan 30, Jan 15, Jan 1]

// Invalid input handling
compare(new Date("invalid"), new Date(2024, 0, 1));
// Returns: NaN
```

## Usage Patterns

### Range Validation
```typescript
import { isAfter, isBefore } from "chronia";

function isValidRange(start: Date, end: Date): boolean {
  return isBefore(start, end);
}

function isDateInRange(date: Date, start: Date, end: Date): boolean {
  return isAfter(date, start) && isBefore(date, end);
}
```

### Unit-Based Comparisons
```typescript
import { isAfter, isSameDay } from "chronia";

// Check if two dates are on the same day
isAfter(
  new Date(2025, 0, 1, 23, 59),
  new Date(2025, 0, 1, 0, 0),
  { unit: "day" }
);
// Returns: false (same day, not "after")

// Alternative: use isSameDay for clarity
isSameDay(new Date(2025, 0, 1, 23, 59), new Date(2025, 0, 1, 0, 0));
// Returns: true
```

### Sorting with compare
```typescript
import { compare } from "chronia";

// Sort events by date
interface Event {
  date: Date;
  name: string;
}

const events: Event[] = [/* ... */];

// Ascending order (oldest first)
events.sort((a, b) => compare(a.date, b.date));

// Descending order (newest first)
events.sort((a, b) => compare(a.date, b.date, { order: "DESC" }));
```

### Interval Checking with isBetween
```typescript
import { isBetween } from "chronia";

// Check if date is within business hours (9 AM - 5 PM)
function isBusinessHours(date: Date): boolean {
  const hours = date.getHours();
  return isBetween(
    date,
    {
      start: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9),
      end: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 17)
    },
    { bounds: "[)" } // 9:00 included, 17:00 excluded
  );
}

// Check if subscription is active
function isSubscriptionActive(now: Date, expiryDate: Date): boolean {
  return isBetween(
    now,
    { start: null, end: expiryDate },
    { bounds: "(]" } // null start, expiry included
  );
}
```

### Boundary Conditions
```typescript
import { isAfterOrEqual, isBeforeOrEqual } from "chronia";

// Inclusive range check
function isInInclusiveRange(date: Date, start: Date, end: Date): boolean {
  return isAfterOrEqual(date, start) && isBeforeOrEqual(date, end);
}

// Or use isBetween with inclusive bounds
function isInInclusiveRange2(date: Date, start: Date, end: Date): boolean {
  return isBetween(date, { start, end }, { bounds: "[]" });
}
```

## AI Guidance

### When to Recommend Each Function

**Recommend `isAfter` when:**
- User mentions "after", "later than", "newer than"
- Checking if one date is chronologically later (strict)
- Validating chronological ordering (e.g., end > start)

**Recommend `isAfterOrEqual` when:**
- User mentions "at least", "no earlier than", "from X onwards"
- Inclusive lower bound checking
- Validating ranges where boundary should be included

**Recommend `isBefore` when:**
- User mentions "before", "earlier than", "prior to"
- Checking if one date is chronologically earlier (strict)
- Expiry or deadline checking (strict)

**Recommend `isBeforeOrEqual` when:**
- User mentions "at most", "no later than", "up to and including"
- Inclusive upper bound checking
- Deadline checking where boundary is included

**Recommend `isBetween` when:**
- User mentions "between", "within", "in the range of"
- Checking if date falls within an interval
- Complex boundary requirements (different start/end inclusion)
- Open-ended intervals (null start or end)

**Recommend `compare` when:**
- User mentions "sort", "order", "arrange by date"
- Implementing custom sorting logic
- Building comparison functions for data structures

### Function Selection Logic

1. **For strict ordering**: Use `isAfter` or `isBefore`
2. **For inclusive boundaries**: Use `isAfterOrEqual` or `isBeforeOrEqual`
3. **For interval checking**: Use `isBetween` (most flexible)
4. **For sorting**: Use `compare` (designed for `Array.sort()`)
5. **For unit-based comparison**: Add `{ unit: "day" }` etc. to any comparison function

### Unit Parameter Guidance

Guide users to select appropriate units:
- **millisecond** (default): Precise timestamp comparison
- **second**: Ignore milliseconds (e.g., API timestamps)
- **minute**: Ignore seconds/ms (e.g., scheduling)
- **hour**: Ignore minutes/seconds/ms (e.g., hourly reports)
- **day**: Ignore time components (e.g., calendar dates)
- **month**: Ignore day and time (e.g., monthly billing)
- **year**: Ignore month, day, and time (e.g., yearly statistics)

### Combination Patterns

**Date validation with comparison:**
```typescript
import { isValid, isAfter } from "chronia";

if (!isValid(startDate) || !isValid(endDate)) {
  throw new Error("Invalid dates");
}
if (!isAfter(endDate, startDate)) {
  throw new Error("End must be after start");
}
```

**Multi-criteria filtering:**
```typescript
import { isAfter, isBetween } from "chronia";

const recentItems = items.filter(item =>
  isAfter(item.date, lastWeek, { unit: "day" })
);

const monthlyItems = items.filter(item =>
  isBetween(item.date, { start: monthStart, end: monthEnd }, { bounds: "[]" })
);
```

## Common Pitfalls

### 1. Equality Ambiguity with Strict Comparisons

**❌ Incorrect Assumption:**
```typescript
const date1 = new Date(2025, 0, 1);
const date2 = new Date(2025, 0, 1);

if (isAfter(date1, date2)) {
  // This branch is NEVER taken (dates are equal)
}
```

**✅ Correct Approach:**
```typescript
// For "greater than or equal", use isAfterOrEqual
if (isAfterOrEqual(date1, date2)) {
  // This branch IS taken
}

// Or check explicitly
if (isEqual(date1, date2) || isAfter(date1, date2)) {
  // This also works but is more verbose
}
```

**AI Guidance:** When user requirements include boundaries, suggest `isAfterOrEqual` / `isBeforeOrEqual` instead of `isAfter` / `isBefore`.

### 2. Unit Comparison Confusion

**❌ Unexpected Behavior:**
```typescript
isAfter(
  new Date(2025, 0, 1, 10, 0),  // Jan 1, 10:00
  new Date(2025, 0, 1, 9, 0),   // Jan 1, 09:00
  { unit: "day" }
);
// Returns: false (NOT true!)
// Both dates truncate to Jan 1, 00:00, so they're equal
```

**✅ Understanding:**
When using `unit` parameter, dates are **truncated** to that unit before comparison. Same-day dates become identical when truncated to "day".

**AI Guidance:** Explain that unit-based comparison truncates dates before comparing. For same-unit dates, use `isEqual` with the same unit option.

### 3. `isBetween` Boundary Defaults

**⚠️ Default Behavior:**
```typescript
isBetween(
  new Date(2024, 5, 10),
  { start: new Date(2024, 5, 10), end: new Date(2024, 5, 20) }
);
// Returns: false (default bounds are EXCLUSIVE "()")
```

**✅ Correct Usage:**
```typescript
// Explicitly specify inclusive bounds if needed
isBetween(
  new Date(2024, 5, 10),
  { start: new Date(2024, 5, 10), end: new Date(2024, 5, 20) },
  { bounds: "[]" }
);
// Returns: true (boundaries included)
```

**AI Guidance:** Always remind users that `isBetween` defaults to exclusive boundaries `"()"`. Suggest explicit `bounds` option for clarity.

### 4. Invalid Input Silent Failures

**❌ Not Checking Validity:**
```typescript
const result = isAfter(userDate1, userDate2);
// If either input is invalid, result is false
// But false could also mean "not after" (valid negative result)
```

**✅ Validate Inputs:**
```typescript
import { isValid, isAfter } from "chronia";

if (!isValid(userDate1) || !isValid(userDate2)) {
  console.error("Invalid date inputs");
  return;
}

const result = isAfter(userDate1, userDate2);
// Now false unambiguously means "not after"
```

**AI Guidance:** Recommend validating inputs when working with user-provided dates to distinguish errors from valid negative results.

### 5. `compare` Return Value Misuse

**❌ Incorrect Boolean Usage:**
```typescript
if (compare(date1, date2)) {
  // This is WRONG - compare returns -1, 0, or 1, not boolean
  // Only 0 is falsy, -1 and 1 are both truthy!
}
```

**✅ Correct Usage:**
```typescript
// For sorting (correct usage)
dates.sort(compare);

// For boolean checks, use specific comparison functions
if (isAfter(date1, date2)) {
  // Correct
}

// Or explicitly check compare result
const result = compare(date1, date2);
if (result > 0) {
  // date1 is after date2 (ascending order)
}
```

**AI Guidance:** Emphasize that `compare` is designed for sorting, not boolean checks. Suggest `isAfter` / `isBefore` for conditional logic.

### 6. Timezone Considerations

**⚠️ Local vs UTC:**
All comparison functions operate on the **Date object's internal UTC timestamp**, but Date construction uses local timezone:

```typescript
const localDate = new Date(2024, 0, 1);  // Midnight in local timezone
const utcTimestamp = Date.UTC(2024, 0, 1, 0, 0, 0);  // Midnight UTC

// These may represent different moments in time!
isAfter(localDate, utcTimestamp);
// Result depends on your timezone offset
```

**AI Guidance:** For cross-timezone scenarios, recommend working exclusively with UTC timestamps or using consistent timezone conversion.

## Error Handling Reference

### Return Values for Invalid Inputs

**Comparison functions (`isAfter`, `isBefore`, etc.):**
- Return `false` for any invalid input
- `false` has dual meaning: either "condition is not met" or "error occurred"
- Use `isValid()` to distinguish errors from valid negative results

**`compare` function:**
- Returns `NaN` for invalid inputs (different from other functions)
- `NaN` unambiguously indicates an error
- Safe to use in sorting (NaN values are grouped together)

**Validation Pattern:**
```typescript
import { isValid, isAfter } from "chronia";

// Validate before comparing
if (!isValid(date1) || !isValid(date2)) {
  throw new Error("Invalid date inputs");
}

const result = isAfter(date1, date2);
// Now false means "not after", not "error"
```

## Performance Considerations

- **Unit-based comparisons**: Slightly slower than millisecond comparison due to truncation overhead
- **`isBetween`**: Single function call is more efficient than chaining `isAfter` and `isBefore`
- **Sorting large arrays**: `compare` is optimized for use with `Array.sort()` and has minimal overhead

## Related Functions

- **Equality comparison**: `isEqual`, `isSame*` functions (see `equality.md`)
- **Validation**: `isValid` (see `validation.md`)
- **Truncation**: `truncDay`, `truncHour`, etc. (see `../truncation/units.md`)
- **Boundary operations**: `startOfDay`, `endOfDay`, etc. (see `../boundary/periods.md`)
