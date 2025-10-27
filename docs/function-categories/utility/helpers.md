# Utility Helper Functions

## Overview

Utility functions provide common date/time operations: getting current time, finding min/max dates, and clamping dates within ranges.

## Functions

### `now(): Date`

Returns the current date and time.

**Equivalent to:** `new Date()`, but more semantic within the Chronia ecosystem.

```typescript
import { now } from "chronia";

const current = now();

// Common usage
const tomorrow = addDays(now(), 1);
const formatted = format(now(), "yyyy-MM-dd HH:mm:ss");
```

### `min(...dates: (Date | number)[]): Date`

Returns the earliest date from multiple dates.

```typescript
import { min } from "chronia";

const date1 = new Date(2024, 5, 15);
const date2 = new Date(2024, 5, 10);
const date3 = new Date(2024, 5, 20);

min(date1, date2, date3);  // June 10, 2024 (earliest)

// Works with timestamps
min(Date.now(), Date.now() - 1000);  // Earlier timestamp

// Single date
min(date1);  // Returns date1

// Invalid if any input is invalid
min(new Date("invalid"), date1);  // Invalid Date
```

### `max(...dates: (Date | number)[]): Date`

Returns the latest date from multiple dates.

```typescript
import { max } from "chronia";

const date1 = new Date(2024, 5, 15);
const date2 = new Date(2024, 5, 10);
const date3 = new Date(2024, 5, 20);

max(date1, date2, date3);  // June 20, 2024 (latest)
```

### `clamp(date: Date | number, minDate: Date | number, maxDate: Date | number): Date`

Restricts a date within a specified range.

```typescript
import { clamp } from "chronia";

const minDate = new Date(2024, 5, 10);
const maxDate = new Date(2024, 5, 20);

// Before range → returns min
clamp(new Date(2024, 5, 5), minDate, maxDate);   // June 10

// After range → returns max
clamp(new Date(2024, 5, 25), minDate, maxDate);  // June 20

// Within range → returns unchanged
clamp(new Date(2024, 5, 15), minDate, maxDate);  // June 15

// Automatically swaps min/max if reversed
clamp(date, maxDate, minDate);  // Still works correctly
```

## Common Patterns

### Finding Date Ranges
```typescript
import { min, max } from "chronia";

const dates = [/* array of dates */];
const earliest = min(...dates);
const latest = max(...dates);
const range = { start: earliest, end: latest };
```

### Bounding User Input
```typescript
import { clamp } from "chronia";

const today = now();
const minAllowed = subDays(today, 90);  // 90 days ago
const maxAllowed = addDays(today, 365); // 1 year ahead

const userDate = clamp(userInput, minAllowed, maxAllowed);
```

### Comparison with Current Time
```typescript
import { now, isAfter } from "chronia";

if (isAfter(deadline, now())) {
  console.log("Deadline is in the future");
}
```

### Relative Time Calculations
```typescript
import { now, diff Days } from "chronia";

const daysAgo = diffDays(now(), eventDate);
if (daysAgo === 0) {
  return "today";
} else if (daysAgo === 1) {
  return "yesterday";
} else {
  return `${daysAgo} days ago`;
}
```

## AI Guidance

**Recommend `now()` when:**
- User needs current time
- Building "time ago" displays
- Creating timestamps
- More semantic than `new Date()`

**Recommend `min/max` when:**
- Finding earliest/latest from multiple dates
- Computing date ranges
- Implementing date constraints

**Recommend `clamp` when:**
- Restricting dates to valid ranges
- Validating date picker inputs
- Enforcing business rules (e.g., booking windows)
- Preventing out-of-bounds dates

## Common Pitfalls

### 1. min/max with Invalid Dates
```typescript
min(new Date("invalid"), validDate);
// Returns: Invalid Date (any invalid input fails entire operation)
```

**AI Guidance:** Validate inputs before passing to min/max.

### 2. Empty Array to min/max
```typescript
min();  // Returns: Invalid Date (no dates provided)
```

### 3. clamp with Reversed min/max
```typescript
// Library automatically handles this
clamp(date, maxDate, minDate);  // Works correctly (swaps internally)
```

**AI Guidance:** While automatic swapping works, encourage correct parameter order for clarity.

### 4. now() Precision
```typescript
const time1 = now();
// ... some code ...
const time2 = now();

// time1 !== time2 (different milliseconds)
```

For consistent "now" within a function, call once and store:
```typescript
const currentTime = now();
// Use currentTime throughout function
```

## Error Handling

- **`now()`**: Always returns valid Date
- **`min/max`**: Return Invalid Date if any input is invalid or no dates provided
- **`clamp`**: Returns Invalid Date if any input is invalid

```typescript
import { isValid, min } from "chronia";

const result = min(date1, date2, date3);
if (!isValid(result)) {
  console.error("Invalid dates in min operation");
}
```

## Performance Considerations

- **`now()`**: Very fast (direct `new Date()` call)
- **`min/max`**: O(n) where n = number of dates
- **`clamp`**: O(1) constant time

## Related Functions

- **Arithmetic**: `add*`, `sub*` for relative dates from `now()`
- **Comparison**: `isAfter`, `isBefore` for date ordering
- **Difference**: `diff*` for calculating time elapsed from `now()`
- **Boundary**: `startOf*`, `endOf*` for period boundaries
