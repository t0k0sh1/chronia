# Difference Calculation Functions

## Overview

Difference calculation functions compute the numerical difference between two dates in specific time units. All functions return `NaN` for invalid inputs (not `false` or Invalid Date), making errors unambiguous. Results can be positive, negative, or zero depending on chronological order.

## Functions Summary

| Function | Unit | Ignores | Returns |
|----------|------|---------|---------|
| `diffYears` | Years | Month, day, time | Integer year difference |
| `diffMonths` | Months | Day, time | Integer month difference |
| `diffDays` | Days | Time components | Integer day difference |
| `diffHours` | Hours | Minutes, seconds, ms | Integer hour difference |
| `diffMinutes` | Minutes | Seconds, ms | Integer minute difference |
| `diffSeconds` | Seconds | Milliseconds | Integer second difference |
| `diffMilliseconds` | Milliseconds | None | Exact timestamp difference |

## Function Details

### `diffYears(dateLeft: Date | number, dateRight: Date | number): number`

Calculates calendar year difference.

**Example:**
```typescript
diffYears(new Date(2025, 5, 15), new Date(2023, 2, 1));
// Returns: 2

diffYears(new Date(2024, 0, 1), new Date(2024, 11, 31));
// Returns: 0 (same year)
```

### `diffMonths(dateLeft: Date | number, dateRight: Date | number): number`

Calculates calendar month difference.

**Calculation:** `(yearDiff * 12) + monthDiff`

**Example:**
```typescript
diffMonths(new Date(2024, 5, 15), new Date(2024, 2, 1));
// Returns: 3

diffMonths(new Date(2025, 2, 1), new Date(2024, 2, 1));
// Returns: 12
```

### `diffDays(dateLeft: Date | number, dateRight: Date | number): number`

Calculates calendar day difference (compares at midnight).

**Example:**
```typescript
diffDays(new Date(2024, 5, 15), new Date(2024, 5, 14));
// Returns: 1

diffDays(new Date(2024, 5, 15, 23, 59), new Date(2024, 5, 15, 0, 0));
// Returns: 0 (same calendar day)
```

### `diffHours(dateLeft: Date | number, dateRight: Date | number): number`

Calculates hour difference.

**Example:**
```typescript
diffHours(new Date(2024, 0, 1, 15, 0), new Date(2024, 0, 1, 12, 0));
// Returns: 3

diffHours(new Date(2024, 0, 2, 1, 0), new Date(2024, 0, 1, 23, 0));
// Returns: 2 (crosses day boundary)
```

### `diffMinutes(dateLeft: Date | number, dateRight: Date | number): number`

Calculates minute difference.

**Example:**
```typescript
diffMinutes(new Date(2024, 0, 1, 12, 30), new Date(2024, 0, 1, 12, 0));
// Returns: 30
```

### `diffSeconds(dateLeft: Date | number, dateRight: Date | number): number`

Calculates second difference.

**Example:**
```typescript
diffSeconds(new Date(2024, 0, 1, 12, 0, 45), new Date(2024, 0, 1, 12, 0, 0));
// Returns: 45
```

### `diffMilliseconds(dateLeft: Date | number, dateRight: Date | number): number`

Calculates exact millisecond difference.

**Example:**
```typescript
diffMilliseconds(new Date(2024, 0, 1, 0, 0, 1), new Date(2024, 0, 1, 0, 0, 0));
// Returns: 1000
```

## Common Patterns

### Signed Results
All functions return signed results:
- **Positive**: `dateLeft` is after `dateRight`
- **Zero**: Dates are in same unit
- **Negative**: `dateLeft` is before `dateRight`

```typescript
diffDays(new Date(2024, 0, 15), new Date(2024, 0, 10));
// Returns: 5 (Jan 15 is after Jan 10)

diffDays(new Date(2024, 0, 10), new Date(2024, 0, 15));
// Returns: -5 (Jan 10 is before Jan 15)
```

### Age Calculation
```typescript
import { diffYears } from "chronia";

function calculateAge(birthDate: Date): number {
  return diffYears(new Date(), birthDate);
}
```

### Duration Formatting
```typescript
import { diffDays, diffHours, diffMinutes } from "chronia";

function formatDuration(start: Date, end: Date): string {
  const days = Math.abs(diffDays(end, start));
  if (days > 0) return `${days} days`;

  const hours = Math.abs(diffHours(end, start));
  if (hours > 0) return `${hours} hours`;

  const minutes = Math.abs(diffMinutes(end, start));
  return `${minutes} minutes`;
}
```

### Relative Time
```typescript
import { diffDays, diffHours } from "chronia";

function getRelativeTime(date: Date): string {
  const now = new Date();
  const days = diffDays(now, date);

  if (days === 0) {
    const hours = diffHours(now, date);
    return hours === 0 ? "just now" : `${hours}h ago`;
  }

  return days > 0 ? `${days}d ago` : `in ${Math.abs(days)}d`;
}
```

## AI Guidance

**Recommend `diff*` functions when:**
- User asks "how many X between dates"
- Calculating age, duration, or time elapsed
- Building relative time displays ("X days ago")
- Implementing `isSame*` behavior (check if diff === 0)
- Need signed results (positive/negative direction)

**Guide users on unit selection:**
- Years: Age, annual statistics
- Months: Subscriptions, billing cycles
- Days: Most common (event scheduling, deadlines)
- Hours/Minutes/Seconds: Fine-grained durations
- Milliseconds: Performance measurements

## Common Pitfalls

### 1. Calendar vs. Absolute Differences
```typescript
// Calendar day difference (ignores time)
diffDays(new Date(2024, 0, 2, 1, 0), new Date(2024, 0, 1, 23, 0));
// Returns: 1 (different calendar days)

// Absolute hours difference
diffHours(new Date(2024, 0, 2, 1, 0), new Date(2024, 0, 1, 23, 0));
// Returns: 2 (only 2 hours apart)
```

**AI Guidance:** Clarify that `diffDays` counts calendar days, not 24-hour periods.

### 2. NaN Return Value
```typescript
const result = diffDays(new Date("invalid"), new Date());
// Returns: NaN (not Invalid Date or false)

if (result) {  // NaN is falsy, but...
  // This branch doesn't execute
}

if (isNaN(result)) {  // Correct check
  console.error("Invalid dates");
}
```

**AI Guidance:** Emphasize that diff functions return `NaN` for errors. Use `isNaN()` to check.

### 3. Month/Year Differences Ignore Days
```typescript
diffMonths(new Date(2024, 5, 30), new Date(2024, 2, 1));
// Returns: 3 (June - March, days ignored)

diffMonths(new Date(2024, 5, 1), new Date(2024, 2, 31));
// Returns: 3 (same result, day doesn't matter)
```

**AI Guidance:** Warn that month/year calculations ignore day components.

## Error Handling

All `diff*` functions return `NaN` for invalid inputs:

```typescript
import { isNaN, diffDays } from "chronia";

const result = diffDays(date1, date2);
if (isNaN(result)) {
  console.error("Invalid dates");
} else {
  console.log(`Difference: ${result} days`);
}
```

## Related Functions

- **Arithmetic**: `add*`, `sub*` (see `../arithmetic/`)
- **Comparison**: `isSame*` use `diff*` internally (see `../comparison/equality.md`)
- **Validation**: Use `isValid` before calling `diff*` to avoid `NaN` results
