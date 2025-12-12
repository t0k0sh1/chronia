# isFuture

## Overview

The `isFuture` function checks if a given date is in the future relative to the current time. It provides a reliable way to determine whether a date or timestamp occurs after the present moment, using millisecond-precision comparison.

## Signature

```typescript
function isFuture(date: DateInput): boolean;
```

## Parameters

| Parameter | Type        | Description                                                   |
| --------- | ----------- | ------------------------------------------------------------- |
| `date`    | `DateInput` | A Date object, numeric timestamp, or ISO 8601 string to check |

## Return Value

| Type      | Description                                                             |
| --------- | ----------------------------------------------------------------------- |
| `boolean` | Returns `true` if the date is strictly in the future, `false` otherwise |

## Description

The `isFuture` function determines whether the provided date or timestamp occurs after the current time. It uses `Date.now()` to obtain the current time at the moment of invocation and performs a strict comparison at millisecond precision using Chronia's internal `compareDateTimes` helper.

### Specification

#### Returns `true` when:

- The date is strictly greater than the current time (date > Date.now())
- The date represents a valid moment in the future at millisecond precision

#### Returns `false` when:

- The date is less than the current time (in the past)
- The date equals the current time (present moment, not future)
- The date is an Invalid Date object (e.g., `new Date('invalid')`)
- The date is `NaN`
- The date is `Infinity`
- The date is `-Infinity`

### Behavior Notes

- **Time-dependent**: This function depends on the system time at invocation via `Date.now()`
- **Strict comparison**: Returns `false` when the date exactly equals the current time, as this represents the present, not the future
- **Millisecond precision**: Comparisons are performed at millisecond granularity
- **No exceptions thrown**: Invalid inputs safely return `false` instead of throwing errors
- **Type-safe**: Accepts both Date objects and numeric timestamps for flexibility
- **Consistent validation**: Uses the same validation logic as other Chronia functions

## Use Cases

- **Future Date Validation**: Check if scheduled events, deadlines, or expiration dates are still in the future before taking action. Essential for task schedulers, reminder systems, and time-based workflows.
- **Conditional Logic**: Execute different code paths based on whether a date has passed or is yet to come. Useful for feature toggles, limited-time offers, or access control based on time.
- **User Input Validation**: Validate that user-provided dates for future events (appointments, bookings, reminders) are actually in the future and not mistakenly set in the past.
- **Cache Expiration**: Determine if a cached item's expiration timestamp is still in the future, indicating the cache is still valid and doesn't need refreshing.
- **Time-Based Filtering**: Filter arrays of dates to find only those that represent future events, such as upcoming appointments or pending deadlines.

## Usage Examples

### Future Date Validation

```typescript
import { isFuture } from "chronia";

// Check if appointment is in the future
function isAppointmentValid(appointmentDate: Date): boolean {
  return isFuture(appointmentDate);
}

// Future date
isFuture(new Date(2026, 0, 1)); // Returns: true

// Past date
isFuture(new Date(2024, 0, 1)); // Returns: false

// Current time (exactly now)
isFuture(Date.now()); // Returns: false (present, not future)

// Future timestamp (1 second from now)
isFuture(Date.now() + 1000); // Returns: true
```

### Conditional Logic

```typescript
import { isFuture } from "chronia";

// Show different messages based on deadline status
function getDeadlineMessage(deadline: Date): string {
  if (isFuture(deadline)) {
    return "Deadline is still upcoming";
  }
  return "Deadline has passed";
}

// Check feature availability
function isFeatureAvailable(activationDate: Date): boolean {
  return !isFuture(activationDate);
}

const feature = new Date(2025, 5, 1);
isFeatureAvailable(feature); // Returns: true if current date >= June 1, 2025
```

### User Input Validation

```typescript
import { isFuture } from "chronia";

// Validate booking date is in the future
function validateBooking(bookingDate: Date): {
  valid: boolean;
  error?: string;
} {
  if (!isFuture(bookingDate)) {
    return {
      valid: false,
      error: "Booking date must be in the future",
    };
  }
  return { valid: true };
}

// Create reminder only for future dates
function createReminder(reminderDate: Date, message: string): boolean {
  if (!isFuture(reminderDate)) {
    console.error("Cannot create reminder for past or current time");
    return false;
  }
  // Create reminder logic here
  return true;
}
```

### Cache Expiration

```typescript
import { isFuture } from "chronia";

interface CacheEntry {
  data: unknown;
  expiresAt: number;
}

// Check if cached data is still valid
function isCacheValid(entry: CacheEntry): boolean {
  return isFuture(entry.expiresAt);
}

// Get data with cache validation
function getCachedData(cache: CacheEntry): unknown | null {
  if (isCacheValid(cache)) {
    return cache.data;
  }
  // Cache expired, return null to trigger refresh
  return null;
}

const cache = {
  data: { user: "John" },
  expiresAt: Date.now() + 3600000, // Expires in 1 hour
};

isCacheValid(cache); // Returns: true
```

### Time-Based Filtering

```typescript
import { isFuture } from "chronia";

interface Event {
  id: string;
  name: string;
  date: Date;
}

// Filter to get only upcoming events
function getUpcomingEvents(events: Event[]): Event[] {
  return events.filter((event) => isFuture(event.date));
}

// Find next future event
function getNextEvent(events: Event[]): Event | null {
  const upcomingEvents = events.filter((event) => isFuture(event.date));
  if (upcomingEvents.length === 0) return null;

  return upcomingEvents.reduce((earliest, current) =>
    current.date < earliest.date ? current : earliest,
  );
}

const events = [
  { id: "1", name: "Past Event", date: new Date(2024, 0, 1) },
  { id: "2", name: "Future Event", date: new Date(2026, 0, 1) },
  { id: "3", name: "Another Future Event", date: new Date(2027, 0, 1) },
];

getUpcomingEvents(events); // Returns: array with 2 future events
```

### Invalid Input Handling

```typescript
import { isFuture } from "chronia";

// Safely handle potentially invalid dates
function safeDateCheck(input: unknown): boolean {
  if (input instanceof Date || typeof input === "number") {
    return isFuture(input);
  }
  return false;
}

// Invalid Date object
isFuture(new Date("invalid")); // Returns: false

// Invalid numeric values
isFuture(NaN); // Returns: false
isFuture(Infinity); // Returns: false
isFuture(-Infinity); // Returns: false
```
