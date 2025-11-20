# subMilliseconds

## Overview

The `subMilliseconds` function subtracts a specified number of milliseconds from a given date. It provides a reliable way to perform millisecond-level date arithmetic while maintaining Chronia's consistent validation and immutability patterns.

## Signature

```typescript
function subMilliseconds(date: Date | number, amount: number): Date
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `date` | `Date \| number` | The base date as a Date object or numeric timestamp from which to subtract milliseconds |
| `amount` | `number` | The number of milliseconds to subtract (can be negative to add milliseconds) |

## Return Value

| Type | Description |
|------|-------------|
| `Date` | A new Date object with the specified number of milliseconds subtracted, or Invalid Date if any input is invalid |

## Description

The `subMilliseconds` function decreases the time value of the provided date by a specified number of milliseconds. It leverages Chronia's internal `addMilliseconds` function by negating the amount, ensuring consistent behavior across the library. Fractional milliseconds are truncated toward zero using `Math.trunc`.

### Specification

#### Returns a valid Date when:
- The `date` argument is a valid Date object or finite numeric timestamp
- The `amount` argument is a finite number (including zero)
- The resulting timestamp is within JavaScript's valid date range
- Fractional amounts (e.g., `1.9`) are truncated to integers (`1`) before subtraction

#### Returns Invalid Date when:
- The `date` argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The `date` argument is `NaN`, `Infinity`, or `-Infinity`
- The `amount` argument is `NaN`, `Infinity`, or `-Infinity`
- Any validation check fails

### Behavior Notes

- No exceptions are thrown; invalid inputs return Invalid Date
- Always returns a new Date instance; the original date is never mutated
- Fractional milliseconds are truncated using `Math.trunc` (e.g., `1.9 → 1`, `-1.9 → -1`)
- Negative amounts result in addition (subtracting a negative adds)
- Uses the same validation logic as other Chronia functions for consistency
- Internally delegates to `addMilliseconds(date, -amount)` for implementation consistency
- Type-safe with TypeScript, accepting only `Date | number` for date and `number` for amount
- Handles time boundary crossings correctly (e.g., crossing from one second to the previous)

## Use Cases

- **Precise Time Calculations**: Subtract exact millisecond durations from timestamps for high-precision time tracking, performance measurements, or timing calculations in applications requiring millisecond accuracy.
- **Backward Time Adjustments**: Calculate past times by subtracting millisecond intervals, useful for determining when events occurred relative to a reference point or creating historical timestamps.
- **Timeout and Delay Calculations**: Compute start times by subtracting delay durations from current times, particularly useful in scheduling systems or when calculating when timers should have been initiated.
- **Animation and Frame Timing**: Calculate previous frame times by subtracting frame duration in milliseconds, essential for animation systems, game loops, or time-based visual effects that need to track elapsed time precisely.
- **Negative Amounts for Addition**: Use negative amounts to add milliseconds, providing an alternative syntax when the semantic context suggests "subtracting a negative duration" is more intuitive than direct addition.

## Usage Examples

### Precise Time Calculations

```typescript
import { subMilliseconds } from 'chronia';

// Subtract 300 milliseconds
const date = new Date(2020, 0, 1, 12, 0, 0, 500);
const result = subMilliseconds(date, 300);
// Returns: new Date(2020, 0, 1, 12, 0, 0, 200)
// ISO: 2020-01-01T12:00:00.200

// Crossing second boundary backward
const date2 = new Date(2020, 0, 1, 12, 0, 1, 0);
const result2 = subMilliseconds(date2, 1);
// Returns: new Date(2020, 0, 1, 12, 0, 0, 999)
// ISO: 2020-01-01T12:00:00.999
```

### Backward Time Adjustments

```typescript
import { subMilliseconds } from 'chronia';

// Calculate when an event started 2500ms ago
const now = new Date(2025, 10, 22, 14, 30, 5, 750);
const eventStart = subMilliseconds(now, 2500);
// Returns: new Date(2025, 10, 22, 14, 30, 3, 250)
// 2.5 seconds earlier

// Working with timestamps
const timestamp = Date.now();
const earlier = subMilliseconds(timestamp, 1000);
// Returns: Date object 1000ms (1 second) earlier
```

### Negative Amounts for Addition

```typescript
import { subMilliseconds } from 'chronia';

// Subtract a negative amount (effectively adds)
const date = new Date(2020, 0, 1, 12, 0, 0, 200);
const result = subMilliseconds(date, -300);
// Returns: new Date(2020, 0, 1, 12, 0, 0, 500)
// ISO: 2020-01-01T12:00:00.500
```

### Fractional Amounts

```typescript
import { subMilliseconds } from 'chronia';

// Fractional amounts are truncated toward zero
const date = new Date(2020, 0, 1, 12, 0, 0, 100);
const result = subMilliseconds(date, 1.9);
// Returns: new Date(2020, 0, 1, 12, 0, 0, 99)
// 1.9 truncated to 1, so 100 - 1 = 99

// Negative fractions also truncated
const result2 = subMilliseconds(date, -1.9);
// Returns: new Date(2020, 0, 1, 12, 0, 0, 101)
// -1.9 truncated to -1, so 100 - (-1) = 101
```

### Invalid Input Handling

```typescript
import { subMilliseconds } from 'chronia';

// Invalid date returns Invalid Date
const invalid = subMilliseconds(new Date('invalid'), 500);
// Returns: Invalid Date

// Invalid amount returns Invalid Date
const result = subMilliseconds(new Date(), NaN);
// Returns: Invalid Date

// Infinity returns Invalid Date
const result2 = subMilliseconds(new Date(), Infinity);
// Returns: Invalid Date

// Original date is not mutated
const original = new Date(2020, 0, 1, 12, 0, 0, 500);
const modified = subMilliseconds(original, 200);
console.log(original.getMilliseconds()); // Still 500
console.log(modified.getMilliseconds()); // 300
```
