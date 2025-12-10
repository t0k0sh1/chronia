# Utility Functions

## Overview

Chronia provides essential utility functions for common date and time operations. These lightweight, focused functions serve as building blocks for more complex date manipulation tasks, offering consistent interfaces and reliable behavior across the library ecosystem.

## Available Functions

### Time Utilities

| Function          | Description                                        |
| ----------------- | -------------------------------------------------- |
| [`now`](./now.md) | Returns the current date and time as a Date object |

## Common Features

All utility functions in this category share the following characteristics:

### Type Safety

All functions provide full TypeScript type safety with clear return types:

```typescript
import { now } from "chronia";

const currentTime: Date = now(); // Type-safe Date return
```

### Consistency

Utility functions integrate seamlessly with other Chronia functions:

```typescript
import { now, addDays, isBefore } from "chronia";

// now() returns Date objects compatible with all Chronia functions
const tomorrow = addDays(now(), 1);
const isPast = isBefore(someDate, now());
```

### No Side Effects

All utility functions are pure functions (or as pure as time-based operations can be) with no side effects:

```typescript
import { now } from "chronia";

// Each call creates a new Date object
const time1 = now();
const time2 = now();
// time1 and time2 are separate objects with potentially different values
```

## Choosing the Right Function

### Current Time Reference

**`now()` function**:

- Use to get the current date and time
- Returns a fresh Date object with each call
- Ideal for: timestamps, current time reference, relative calculations

### Use Case Guide

| Scenario                        | Recommended Function     | Reason                           |
| ------------------------------- | ------------------------ | -------------------------------- |
| Create timestamp for logging    | `now()`                  | Captures exact current moment    |
| Calculate future dates          | `addDays(now(), n)`      | Current time as baseline         |
| Check if date is in past        | `isBefore(date, now())`  | Compare against current time     |
| Provide default date value      | `scheduledFor ?? now()`  | Current time as sensible default |
| Measure operation duration      | `now()` at start and end | Mark time boundaries             |
| Create "last updated" timestamp | `now()`                  | Record modification time         |
| Generate unique time-based IDs  | `now().getTime()`        | Timestamp as ID component        |

## Common Patterns

### Timestamping Records

```typescript
import { now } from "chronia";

interface Record {
  id: string;
  data: unknown;
  createdAt: Date;
  updatedAt: Date;
}

function createRecord(id: string, data: unknown): Record {
  const timestamp = now();
  return {
    id,
    data,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

function updateRecord(record: Record, data: unknown): Record {
  return {
    ...record,
    data,
    updatedAt: now(), // Update timestamp
  };
}
```

### Relative Time Calculations

```typescript
import { now, addDays, addMonths, subHours } from "chronia";

// Calculate dates relative to now
const tomorrow = addDays(now(), 1);
const nextWeek = addDays(now(), 7);
const nextMonth = addMonths(now(), 1);
const oneHourAgo = subHours(now(), 1);

// Dynamic deadlines
function createTaskWithDeadline(task: string, daysUntilDue: number) {
  return {
    task,
    createdAt: now(),
    dueDate: addDays(now(), daysUntilDue),
  };
}
```

### Time-Based Comparisons

```typescript
import { now, isBefore, isAfter, isBetween } from "chronia";

// Check if date is in the past
function isExpired(expirationDate: Date): boolean {
  return isBefore(expirationDate, now());
}

// Check if date is in the future
function isUpcoming(eventDate: Date): boolean {
  return isAfter(eventDate, now());
}

// Check if currently active
function isActive(startDate: Date, endDate: Date): boolean {
  const current = now();
  return isAfter(current, startDate) && isBefore(current, endDate);
}

// Filter active items
interface Campaign {
  name: string;
  startDate: Date;
  endDate: Date;
}

function getActiveCampaigns(campaigns: Campaign[]): Campaign[] {
  const current = now();
  return campaigns.filter(
    (campaign) =>
      isAfter(current, campaign.startDate) &&
      isBefore(current, campaign.endDate),
  );
}
```

### Default Values and Fallbacks

```typescript
import { now } from "chronia";

// Provide current date as default
function scheduleTask(
  task: string,
  scheduledFor?: Date,
): { task: string; scheduledFor: Date } {
  return {
    task,
    scheduledFor: scheduledFor ?? now(),
  };
}

// API request with optional date parameters
async function fetchData(options?: { since?: Date; until?: Date }) {
  const params = {
    since: options?.since ?? addDays(now(), -30), // Default: 30 days ago
    until: options?.until ?? now(), // Default: now
  };

  // Fetch data...
}
```

### Performance Measurement

```typescript
import { now, differenceInMilliseconds, differenceInSeconds } from "chronia";

// Simple performance timer
function measureSync<T>(fn: () => T): { result: T; durationMs: number } {
  const start = now();
  const result = fn();
  const end = now();

  return {
    result,
    durationMs: differenceInMilliseconds(end, start),
  };
}

// Async performance timer
async function measureAsync<T>(
  fn: () => Promise<T>,
): Promise<{ result: T; durationMs: number }> {
  const start = now();
  const result = await fn();
  const end = now();

  return {
    result,
    durationMs: differenceInMilliseconds(end, start),
  };
}

// Usage
const { result, durationMs } = measureSync(() => {
  // Some computation
  return heavyCalculation();
});

console.log(`Operation took ${durationMs}ms`);
```

### Time-Based Caching

```typescript
import { now, isAfter, addMinutes } from "chronia";

interface CacheEntry<T> {
  value: T;
  expiresAt: Date;
}

class TimeBasedCache<T> {
  private cache = new Map<string, CacheEntry<T>>();

  set(key: string, value: T, ttlMinutes: number): void {
    this.cache.set(key, {
      value,
      expiresAt: addMinutes(now(), ttlMinutes),
    });
  }

  get(key: string): T | undefined {
    const entry = this.cache.get(key);

    if (!entry) {
      return undefined;
    }

    // Check if expired
    if (isAfter(now(), entry.expiresAt)) {
      this.cache.delete(key);
      return undefined;
    }

    return entry.value;
  }

  cleanup(): void {
    const current = now();
    for (const [key, entry] of this.cache.entries()) {
      if (isAfter(current, entry.expiresAt)) {
        this.cache.delete(key);
      }
    }
  }
}

// Usage
const cache = new TimeBasedCache<string>();
cache.set("user:123", "John Doe", 5); // Cache for 5 minutes

// Later...
const user = cache.get("user:123"); // Returns value if not expired
```

### Time-Based Logging

```typescript
import { now, format, differenceInSeconds } from "chronia";

class Logger {
  private startTime = now();

  log(message: string): void {
    const timestamp = format(now(), "yyyy-MM-dd HH:mm:ss.SSS");
    const elapsed = differenceInSeconds(now(), this.startTime);
    console.log(`[${timestamp}] +${elapsed}s: ${message}`);
  }

  info(message: string): void {
    this.log(`[INFO] ${message}`);
  }

  error(message: string): void {
    this.log(`[ERROR] ${message}`);
  }
}

// Usage
const logger = new Logger();
logger.info("Application started");
// Output: [2025-01-22 10:30:45.123] +0s: [INFO] Application started

// Later...
logger.info("Processing complete");
// Output: [2025-01-22 10:30:48.456] +3s: [INFO] Processing complete
```

### Rate Limiting

```typescript
import { now, differenceInMilliseconds, addMilliseconds } from "chronia";

class RateLimiter {
  private lastCallTime: Date | null = null;
  private minIntervalMs: number;

  constructor(minIntervalMs: number) {
    this.minIntervalMs = minIntervalMs;
  }

  canProceed(): boolean {
    if (!this.lastCallTime) {
      this.lastCallTime = now();
      return true;
    }

    const timeSinceLastCall = differenceInMilliseconds(
      now(),
      this.lastCallTime,
    );

    if (timeSinceLastCall >= this.minIntervalMs) {
      this.lastCallTime = now();
      return true;
    }

    return false;
  }

  timeUntilNext(): number {
    if (!this.lastCallTime) {
      return 0;
    }

    const nextAllowedTime = addMilliseconds(
      this.lastCallTime,
      this.minIntervalMs,
    );

    return Math.max(0, differenceInMilliseconds(nextAllowedTime, now()));
  }
}

// Usage
const limiter = new RateLimiter(1000); // 1 second between calls

if (limiter.canProceed()) {
  makeApiCall();
} else {
  const waitTime = limiter.timeUntilNext();
  console.log(`Please wait ${waitTime}ms before trying again`);
}
```

## Performance Considerations

- **`now()` is lightweight**: Creates a Date object with minimal overhead
- **Cache current time**: If you need the same timestamp multiple times in a function, call `now()` once and reuse:

  ```typescript
  // Good: Single call
  const current = now();
  const isPast = isBefore(date1, current);
  const isFuture = isAfter(date2, current);

  // Less optimal: Multiple calls
  const isPast = isBefore(date1, now());
  const isFuture = isAfter(date2, now()); // Slightly different time
  ```

- **Time precision**: `now()` returns millisecond precision; for most use cases this is more than sufficient
- **Consider testability**: For unit tests, inject time dependencies rather than calling `now()` directly:
  ```typescript
  // Better for testing
  function processExpiration(
    expirationDate: Date,
    currentTime: Date = now(),
  ): boolean {
    return isBefore(expirationDate, currentTime);
  }
  ```

## Type Definitions

```typescript
function now(): Date;
```

## Best Practices

### Testing with `now()`

When writing testable code, make `now()` injectable:

```typescript
import { now } from "chronia";

// Good: Time is injectable for testing
function isExpired(expirationDate: Date, currentTime: Date = now()): boolean {
  return isBefore(expirationDate, currentTime);
}

// In tests:
const testTime = new Date(2025, 0, 1);
expect(isExpired(new Date(2024, 11, 31), testTime)).toBe(true);

// In production:
expect(isExpired(new Date(2024, 11, 31))).toBe(true); // Uses now()
```

### Consistent Timestamps

For operations requiring a consistent timestamp across multiple operations, capture `now()` once:

```typescript
import { now } from "chronia";

function processBatch(items: Item[]): ProcessedBatch {
  const processedAt = now(); // Single timestamp for entire batch

  return {
    items: items.map((item) => ({
      ...item,
      processedAt, // Same timestamp for all items
    })),
    completedAt: processedAt,
  };
}
```

### Avoid Redundant Calls

```typescript
// Avoid: Multiple calls when one timestamp is needed
function logEvent(event: string) {
  console.log(`${format(now(), "HH:mm:ss")}: ${event}`);
  saveToDatabase({ event, timestamp: now() }); // Different timestamp!
}

// Better: Single call
function logEvent(event: string) {
  const timestamp = now();
  console.log(`${format(timestamp, "HH:mm:ss")}: ${event}`);
  saveToDatabase({ event, timestamp });
}
```

## Integration with Other Chronia Functions

The `now()` function works seamlessly with all Chronia functions:

```typescript
import {
  now,
  addDays,
  subDays,
  isBefore,
  isAfter,
  format,
  startOfDay,
  endOfDay,
  differenceInDays,
} from "chronia";

// Manipulation
const tomorrow = addDays(now(), 1);
const yesterday = subDays(now(), 1);

// Comparison
const isPastDate = isBefore(someDate, now());
const isFutureDate = isAfter(someDate, now());

// Formatting
const currentTime = format(now(), "yyyy-MM-dd HH:mm:ss");

// Boundaries
const todayStart = startOfDay(now());
const todayEnd = endOfDay(now());

// Calculations
const daysFromNow = differenceInDays(futureDate, now());
```

## See Also

- [Date Validations](../validations/) - Validate and compare dates
- [Date Manipulation](../manipulation/) - Add, subtract, and modify dates
- [Date Formatting](../formatting/) - Format dates for display
- [Date Calculations](../calculations/) - Calculate differences and durations
- [Chronia Types](../../types.md) - Type definitions used across the library
