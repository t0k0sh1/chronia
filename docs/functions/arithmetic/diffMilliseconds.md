# diffMilliseconds

## Overview

The `diffMilliseconds` function calculates the exact difference in milliseconds between two dates, providing the most precise time difference measurement available in the Chronia library. It serves as the foundation for all time difference calculations.

## Signature

```typescript
function diffMilliseconds(dateLeft: Date | number, dateRight: Date | number): number
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `dateLeft` | `Date \| number` | The first date as a Date object or numeric timestamp (subtrahend in the calculation) |
| `dateRight` | `Date \| number` | The second date as a Date object or numeric timestamp (minuend in the calculation) |

## Return Value

| Type | Description |
|------|-------------|
| `number` | The difference in milliseconds. Returns a positive value if `dateLeft` is after `dateRight`, negative if before, `0` if identical, or `NaN` if any input is invalid |

## Description

The `diffMilliseconds` function computes the precise time difference between two dates at millisecond resolution. This is equivalent to calling `dateLeft.getTime() - dateRight.getTime()`, but with built-in validation and consistent error handling. The function is fundamental to Chronia's time difference calculations and serves as the basis for higher-level difference functions.

### Specification

#### Returns a positive number when:
- `dateLeft` represents a later point in time than `dateRight`
- Both inputs are valid Date objects or finite numeric timestamps
- The difference is calculated as: `dateLeft.getTime() - dateRight.getTime()`

#### Returns `0` when:
- Both dates represent the exact same millisecond in time
- Both inputs are valid

#### Returns a negative number when:
- `dateLeft` represents an earlier point in time than `dateRight`
- Both inputs are valid Date objects or finite numeric timestamps

#### Returns `NaN` when:
- Either `dateLeft` or `dateRight` is an Invalid Date object (e.g., `new Date('invalid')`)
- Either argument is `NaN`
- Either argument is `Infinity` or `-Infinity`
- Any input fails validation

### Behavior Notes

- No exceptions are thrown; invalid values gracefully return `NaN`
- Accepts mixed input types (can compare a Date object with a numeric timestamp)
- Returns exact millisecond differences with no rounding or truncation
- Uses Chronia's internal validation utilities for consistency across the library
- Calculation functions return `NaN` for invalid inputs, which differs from boolean functions (return `false`) and comparison functions (throw errors)
- Most precise time difference function available; use higher-level functions like `diffSeconds`, `diffMinutes`, etc., for larger time units
- Suitable for performance measurements and high-precision time calculations

## Use Cases

- **Performance Measurement**: Measure execution time of code blocks with millisecond precision. Essential for profiling and optimization work where accurate timing is critical.
- **Precise Time Calculations**: Calculate exact time differences when millisecond accuracy matters, such as in scientific applications, financial systems, or real-time systems.
- **Foundation for Time Differences**: Serve as the base calculation for higher-level difference functions. Other Chronia functions build upon this for seconds, minutes, hours, etc.
- **Timestamp Comparison**: Compare numeric timestamps directly without creating Date objects. Useful when working with data from APIs or databases that use Unix timestamps.
- **Animation and Timing**: Calculate precise intervals for animations, timers, or scheduling systems that require millisecond-level accuracy.

## Usage Examples

### Performance Measurement

```typescript
import { diffMilliseconds } from 'chronia';

// Measure function execution time
function measurePerformance<T>(fn: () => T): { result: T; elapsed: number } {
  const startTime = Date.now();
  const result = fn();
  const endTime = Date.now();

  const elapsed = diffMilliseconds(endTime, startTime);
  return { result, elapsed };
}

// Usage
const { result, elapsed } = measurePerformance(() => {
  // Some expensive operation
  return Array(1000000).fill(0).map((_, i) => i * 2);
});
console.log(`Operation took ${elapsed}ms`);  // e.g., "Operation took 42ms"
```

### Precise Time Calculations

```typescript
import { diffMilliseconds } from 'chronia';

// Calculate exact time difference
const start = new Date(2024, 5, 15, 14, 30, 45, 100);
const end = new Date(2024, 5, 15, 14, 30, 45, 500);

diffMilliseconds(end, start);  // Returns: 400

// Same time returns 0
const date1 = new Date(2024, 5, 15, 14, 30, 45, 123);
const date2 = new Date(2024, 5, 15, 14, 30, 45, 123);
diffMilliseconds(date1, date2);  // Returns: 0

// Negative result when first date is earlier
diffMilliseconds(start, end);  // Returns: -400
```

### Timestamp Comparison

```typescript
import { diffMilliseconds } from 'chronia';

// Compare numeric timestamps
const timestamp1 = 1718459446000;  // Unix timestamp
const timestamp2 = 1718459445000;

diffMilliseconds(timestamp1, timestamp2);  // Returns: 1000

// Mix Date objects and timestamps
const dateObj = new Date(2024, 5, 15, 14, 30, 46, 0);
const timestamp = new Date(2024, 5, 15, 14, 30, 45, 0).getTime();

diffMilliseconds(dateObj, timestamp);  // Returns: 1000
diffMilliseconds(timestamp, dateObj);  // Returns: -1000
```

### Input Validation

```typescript
import { diffMilliseconds } from 'chronia';

// Invalid Date returns NaN
const invalidDate = new Date('invalid');
const validDate = new Date(2024, 5, 15);

diffMilliseconds(invalidDate, validDate);  // Returns: NaN
diffMilliseconds(validDate, invalidDate);  // Returns: NaN

// Check for valid result
function safeDiff(date1: Date | number, date2: Date | number): number | null {
  const diff = diffMilliseconds(date1, date2);
  return isNaN(diff) ? null : diff;
}

safeDiff(validDate, invalidDate);  // Returns: null
safeDiff(validDate, validDate);    // Returns: 0
```

### Animation Timing

```typescript
import { diffMilliseconds } from 'chronia';

// Calculate animation progress
class Animation {
  private startTime: number;
  private duration: number;

  constructor(durationMs: number) {
    this.startTime = Date.now();
    this.duration = durationMs;
  }

  getProgress(): number {
    const elapsed = diffMilliseconds(Date.now(), this.startTime);
    return Math.min(elapsed / this.duration, 1);  // Clamp to [0, 1]
  }

  isComplete(): boolean {
    return this.getProgress() >= 1;
  }
}

// Usage
const animation = new Animation(1000);  // 1 second animation
console.log(animation.getProgress());    // e.g., 0.235 (23.5% complete)
```
