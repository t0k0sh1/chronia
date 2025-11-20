# addMilliseconds

## Overview

The `addMilliseconds` function adds a specified number of milliseconds to a given date, returning a new Date object. It provides a reliable way to perform millisecond-level date arithmetic in Chronia's consistent API surface.

## Signature

```typescript
function addMilliseconds(date: Date | number, amount: number): Date
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `date` | `Date \| number` | The base date as a Date object or numeric timestamp |
| `amount` | `number` | The number of milliseconds to add (can be negative to subtract) |

## Return Value

| Type | Description |
|------|-------------|
| `Date` | A new Date object with the specified milliseconds added, or Invalid Date if any input is invalid |

## Description

The `addMilliseconds` function performs precise millisecond-level arithmetic on dates. It validates all inputs before processing and returns a new Date instance without mutating the original date. Fractional milliseconds in the amount parameter are truncated toward zero using `Math.trunc`.

### Specification

#### Returns a valid Date when:
- The `date` argument is a valid `Date` object (not Invalid Date)
- The `date` argument is a finite numeric timestamp, including:
  - Positive timestamps (dates after Unix epoch)
  - Zero (`0`, representing January 1, 1970, 00:00:00 UTC)
  - Negative timestamps (dates before Unix epoch)
- The `amount` argument is a finite number, including:
  - Positive values (adds milliseconds)
  - Zero (`0`, returns equivalent date)
  - Negative values (subtracts milliseconds)
  - Fractional values (truncated toward zero: `1.9 → 1`, `-1.9 → -1`)

#### Returns Invalid Date when:
- The `date` argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The `date` argument is `NaN`
- The `date` argument is `Infinity` or `-Infinity`
- The `amount` argument is `NaN`
- The `amount` argument is `Infinity` or `-Infinity`

### Behavior Notes

- No exceptions are thrown; invalid inputs return Invalid Date
- Uses Chronia's internal validation utilities (`isValidDateOrNumber`, `isValidNumber`) for consistency
- Fractional amounts are truncated using `Math.trunc` before addition
- Always returns a new Date instance; the original date is never mutated
- Type-safe with TypeScript, accepting only `Date | number` for date and `number` for amount
- Handles time boundary crossings automatically (e.g., crossing from one second to the next)

## Use Cases

- **Precise Timing**: Add or subtract milliseconds for high-precision time calculations, such as measuring elapsed time, scheduling animations, or working with performance metrics.
- **Time Offset Adjustments**: Apply small time offsets in milliseconds when synchronizing timestamps, adjusting for network latency, or fine-tuning event timing.
- **Animation Frames**: Calculate exact frame timestamps for animations or time-based visual effects where millisecond precision is critical.
- **Performance Measurements**: Manipulate timestamps in performance monitoring, profiling, or benchmarking scenarios where millisecond accuracy matters.
- **Date Arithmetic Building Block**: Serve as a foundation for implementing higher-level date arithmetic functions (seconds, minutes, hours) by combining multiple millisecond additions.

## Usage Examples

### Precise Timing

```typescript
import { addMilliseconds } from 'chronia';

// Add positive milliseconds
const baseDate = new Date(2020, 0, 1, 12, 0, 0, 0);
const result = addMilliseconds(baseDate, 500);
// Returns: Date representing 2020-01-01T12:00:00.500

// Subtract milliseconds using negative amount
const withMillis = new Date(2020, 0, 1, 12, 0, 0, 500);
const subtracted = addMilliseconds(withMillis, -300);
// Returns: Date representing 2020-01-01T12:00:00.200

// Fractional amounts are truncated toward zero
const fractional = addMilliseconds(new Date(2020, 0, 1), 1.9);
// Returns: Date with 1 millisecond added (1.9 truncated to 1)

const negativeFractional = addMilliseconds(new Date(2020, 0, 1), -1.9);
// Returns: Date with 1 millisecond subtracted (-1.9 truncated to -1)
```

### Time Offset Adjustments

```typescript
import { addMilliseconds } from 'chronia';

// Apply network latency compensation
function compensateForLatency(timestamp: number, latencyMs: number): Date {
  return addMilliseconds(timestamp, latencyMs);
}

const serverTime = Date.now();
const adjustedTime = compensateForLatency(serverTime, 150);
// Returns: Date adjusted by 150ms latency

// Synchronize timestamps across systems
const receivedTimestamp = 1704110400000;
const synchronized = addMilliseconds(receivedTimestamp, -50);
// Returns: Date adjusted backward by 50ms
```

### Animation Frames

```typescript
import { addMilliseconds } from 'chronia';

// Calculate frame timestamps for 60fps animation
function calculateFrameTimestamps(startDate: Date, frameCount: number): Date[] {
  const frameIntervalMs = 1000 / 60; // ~16.67ms per frame
  const frames: Date[] = [];

  for (let i = 0; i < frameCount; i++) {
    frames.push(addMilliseconds(startDate, frameIntervalMs * i));
  }

  return frames;
}

const animationStart = new Date(2025, 0, 1, 12, 0, 0, 0);
const frameTimestamps = calculateFrameTimestamps(animationStart, 10);
// Returns: Array of 10 Date objects at ~16.67ms intervals
```

### Boundary Crossing

```typescript
import { addMilliseconds } from 'chronia';

// Crossing second boundary
const nearBoundary = new Date(2020, 0, 1, 12, 0, 0, 999);
const crossedSecond = addMilliseconds(nearBoundary, 1);
// Returns: Date representing 2020-01-01T12:00:01.000

// Crossing minute boundary
const nearMinute = new Date(2020, 0, 1, 12, 0, 59, 999);
const crossedMinute = addMilliseconds(nearMinute, 1);
// Returns: Date representing 2020-01-01T12:01:00.000
```

### Invalid Input Handling

```typescript
import { addMilliseconds } from 'chronia';

// Invalid Date input
const invalidDate = addMilliseconds(new Date('invalid'), 500);
// Returns: Invalid Date

// NaN amount
const nanResult = addMilliseconds(new Date(), NaN);
// Returns: Invalid Date

// Infinity amount
const infinityResult = addMilliseconds(new Date(), Infinity);
// Returns: Invalid Date

// Check validity before use
function safeAddMilliseconds(date: Date, amount: number): Date | null {
  const result = addMilliseconds(date, amount);
  return isNaN(result.getTime()) ? null : result;
}
```
