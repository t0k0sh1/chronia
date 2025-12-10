# isAfter

## Overview

The `isAfter` function checks if the first date is strictly after the second date. It provides flexible date comparison with optional unit-based granularity, allowing you to compare dates at different time scales (year, month, day, hour, minute, second, or millisecond).

## Signature

```typescript
function isAfter(
  a: Date | number,
  b: Date | number,
  options?: ComparisonOptions,
): boolean;
```

## Parameters

| Parameter      | Type                | Description                                                                                                                             |
| -------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `a`            | `Date \| number`    | The first date as a Date object or numeric timestamp                                                                                    |
| `b`            | `Date \| number`    | The second date as a Date object or numeric timestamp                                                                                   |
| `options`      | `ComparisonOptions` | Optional configuration object                                                                                                           |
| `options.unit` | `TimeUnit`          | The unit of comparison: `"year"`, `"month"`, `"day"`, `"hour"`, `"minute"`, `"second"`, or `"millisecond"`. Defaults to `"millisecond"` |

## Return Value

| Type      | Description                                                                                           |
| --------- | ----------------------------------------------------------------------------------------------------- |
| `boolean` | Returns `true` if date `a` is strictly after date `b`, `false` otherwise or if either date is invalid |

## Description

The `isAfter` function determines whether the first date occurs chronologically after the second date. It supports both precise millisecond-level comparison and coarser-grained comparisons by truncating dates to a specified unit before comparing.

### Specification

#### Returns `true` when:

- Date `a` is chronologically after date `b` at the specified granularity
- Both dates are valid (not Invalid Date, not `NaN`, not `Infinity`, not `-Infinity`)
- When using unit-based comparison, the truncated value of `a` is greater than the truncated value of `b`
- Works with both Date objects and numeric timestamps

#### Returns `false` when:

- Date `a` is equal to date `b` (strict comparison - equality is not "after")
- Date `a` is before date `b`
- Either date `a` or date `b` is invalid (Invalid Date, `NaN`, `Infinity`, `-Infinity`)
- When using unit-based comparison, the truncated values are equal or `a` is less

### Behavior Notes

- **Strict comparison**: Equality returns `false` - this function checks if `a` is strictly after `b`, not after-or-equal
- **Input validation**: Invalid dates return `false` immediately without throwing exceptions
- **Type flexibility**: Accepts both Date objects and numeric timestamps for both parameters
- **Unit truncation**: When a `unit` is specified, dates are truncated to that unit before comparison
  - Example: Comparing by `"day"` ignores hours, minutes, seconds, and milliseconds
  - Example: Comparing by `"year"` ignores months, days, and all time components
- **Performance**: Optimized for the common case of millisecond-precision comparison
- **Consistency**: Uses the same validation logic as other Chronia comparison functions

## Use Cases

- **Expiration Checks**: Verify that the current time is after an expiration date to determine if content, tokens, or access periods have expired. Essential for authentication systems, subscription management, and time-limited content.
- **Recency Filtering**: Filter datasets to include only records after a certain date, such as retrieving recent activity, new updates, or future events. Useful for dashboards, notification systems, and activity feeds.
- **Future Event Validation**: Ensure that a scheduled event or deadline is set in the future relative to a reference date. Critical for booking systems, calendar applications, and project management tools.
- **Timeline Ordering**: Determine the temporal order of events by checking if one event occurred after another. Particularly useful when implementing custom sorting logic or building chronological views.
- **Date Range Validation**: Validate that an end date is after a start date when accepting date ranges from users. Prevents invalid time periods in forms, reports, and scheduling interfaces.
- **Unit-Based Comparison**: Compare dates at specific granularities (e.g., same year, same month) without needing to manually normalize dates. Simplifies logic for grouping by time periods or checking if dates fall in the same time window.

## Usage Examples

### Expiration Checks

```typescript
import { isAfter } from "chronia";

// Check if content has expired
function hasExpired(expirationDate: Date): boolean {
  return isAfter(Date.now(), expirationDate);
}

// Check if token is still valid
function isTokenExpired(tokenExpiryTimestamp: number): boolean {
  const now = Date.now();
  return isAfter(now, tokenExpiryTimestamp);
}

// Example usage
const subscriptionExpiry = new Date(2025, 0, 1); // January 1, 2025
hasExpired(subscriptionExpiry); // Returns: false (if current date is before Jan 1, 2025)

const tokenExpiry = Date.now() - 1000; // 1 second ago
isTokenExpired(tokenExpiry); // Returns: true
```

### Recency Filtering

```typescript
import { isAfter } from "chronia";

interface Activity {
  user: string;
  timestamp: number;
  action: string;
}

// Filter activities after a specific date
function getRecentActivities(
  activities: Activity[],
  sinceDate: Date,
): Activity[] {
  return activities.filter((activity) =>
    isAfter(activity.timestamp, sinceDate),
  );
}

// Get activities from the last 7 days
function getLastWeekActivities(activities: Activity[]): Activity[] {
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  return activities.filter((activity) =>
    isAfter(activity.timestamp, sevenDaysAgo),
  );
}

// Example usage
const activities: Activity[] = [
  { user: "alice", timestamp: new Date(2025, 0, 5).getTime(), action: "login" },
  { user: "bob", timestamp: new Date(2025, 0, 15).getTime(), action: "update" },
  {
    user: "charlie",
    timestamp: new Date(2025, 0, 20).getTime(),
    action: "create",
  },
];

const cutoff = new Date(2025, 0, 10); // January 10, 2025
const recent = getRecentActivities(activities, cutoff);
// Returns: activities from bob (Jan 15) and charlie (Jan 20)
```

### Future Event Validation

```typescript
import { isAfter } from "chronia";

// Validate that an event is scheduled in the future
function isFutureEvent(
  eventDate: Date,
  referenceDate: Date = new Date(),
): boolean {
  return isAfter(eventDate, referenceDate);
}

// Check if deadline is in the future
function hasTimeRemaining(deadline: number): boolean {
  return isAfter(deadline, Date.now());
}

// Validate event scheduling constraints
function canScheduleEvent(eventDate: Date, minimumLeadTime: number): boolean {
  const earliestAllowed = Date.now() + minimumLeadTime;
  return isAfter(eventDate, earliestAllowed);
}

// Example usage
const futureEvent = new Date(2025, 11, 31); // December 31, 2025
isFutureEvent(futureEvent); // Returns: true (if current date is before Dec 31, 2025)

const deadline = Date.now() + 3 * 24 * 60 * 60 * 1000; // 3 days from now
hasTimeRemaining(deadline); // Returns: true

// Require at least 48 hours lead time
const eventDate = new Date(Date.now() + 72 * 60 * 60 * 1000); // 72 hours from now
const leadTime = 48 * 60 * 60 * 1000; // 48 hours
canScheduleEvent(eventDate, leadTime); // Returns: true
```

### Timeline Ordering

```typescript
import { isAfter } from "chronia";

interface Event {
  name: string;
  timestamp: Date;
}

// Sort events in descending chronological order
function sortEventsDescending(events: Event[]): Event[] {
  return events.sort((a, b) => {
    if (isAfter(a.timestamp, b.timestamp)) return -1;
    if (isAfter(b.timestamp, a.timestamp)) return 1;
    return 0;
  });
}

// Find the most recent event
function getMostRecentEvent(events: Event[]): Event | null {
  if (events.length === 0) return null;

  return events.reduce((latest, current) => {
    return isAfter(current.timestamp, latest.timestamp) ? current : latest;
  });
}

// Example usage
const events: Event[] = [
  { name: "Project Start", timestamp: new Date(2025, 0, 1) },
  { name: "Milestone 1", timestamp: new Date(2025, 2, 15) },
  { name: "Milestone 2", timestamp: new Date(2025, 5, 30) },
];

const sorted = sortEventsDescending(events);
// Returns: [Milestone 2 (Jun 30), Milestone 1 (Mar 15), Project Start (Jan 1)]

const latest = getMostRecentEvent(events);
// Returns: { name: 'Milestone 2', timestamp: ... }
```

### Date Range Validation

```typescript
import { isAfter } from "chronia";

// Validate date range
function isValidDateRange(start: Date, end: Date): boolean {
  return isAfter(end, start);
}

// Validate booking dates
function validateBooking(
  checkIn: Date,
  checkOut: Date,
): { valid: boolean; error?: string } {
  if (!isAfter(checkOut, checkIn)) {
    return {
      valid: false,
      error: "Check-out date must be after check-in date",
    };
  }

  if (!isAfter(checkIn, Date.now())) {
    return {
      valid: false,
      error: "Check-in date must be in the future",
    };
  }

  return { valid: true };
}

// Example usage
const startDate = new Date(2025, 0, 1); // January 1, 2025
const endDate = new Date(2025, 11, 31); // December 31, 2025

isValidDateRange(startDate, endDate); // Returns: true
isValidDateRange(endDate, startDate); // Returns: false

// Equality returns false (strict comparison)
const sameDate = new Date(2025, 0, 1);
isAfter(sameDate, sameDate); // Returns: false

const checkIn = new Date(2025, 6, 1); // July 1, 2025
const checkOut = new Date(2025, 6, 7); // July 7, 2025
validateBooking(checkIn, checkOut); // Returns: { valid: true }
```

### Unit-Based Comparison

```typescript
import { isAfter } from "chronia";

// Compare dates at year granularity
const date1 = new Date(2025, 0, 1, 0, 0, 0); // January 1, 2025, 00:00:00
const date2 = new Date(2024, 11, 31, 23, 59, 59); // December 31, 2024, 23:59:59

isAfter(date1, date2, { unit: "year" }); // Returns: true (2025 > 2024)

// Compare dates at month granularity
const feb1 = new Date(2025, 1, 1); // February 1, 2025
const jan15 = new Date(2025, 0, 15); // January 15, 2025

isAfter(feb1, jan15, { unit: "month" }); // Returns: true (Feb > Jan)

// Compare dates at day granularity (ignores time)
const evening = new Date(2025, 0, 15, 18, 0, 0); // January 15, 2025, 18:00
const morning = new Date(2025, 0, 15, 9, 0, 0); // January 15, 2025, 09:00

isAfter(evening, morning, { unit: "day" }); // Returns: false (same day)
isAfter(evening, morning); // Returns: true (different times)

// Compare dates at hour granularity
const time1 = new Date(2025, 0, 15, 9, 45, 0); // 09:45:00
const time2 = new Date(2025, 0, 15, 9, 30, 0); // 09:30:00

isAfter(time1, time2, { unit: "hour" }); // Returns: false (same hour)
isAfter(time1, time2); // Returns: true (different minutes)

// Group events by year
function getEventsAfterYear(events: Event[], year: number): Event[] {
  const referenceDate = new Date(year, 11, 31); // End of the reference year
  return events.filter((event) =>
    isAfter(event.timestamp, referenceDate, { unit: "year" }),
  );
}
```
