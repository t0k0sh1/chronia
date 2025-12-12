# isSameHour

## Overview

The `isSameHour` function checks if two dates fall within the same hour, ignoring minutes, seconds, and milliseconds. It provides a precise way to compare dates at the hour level within Chronia's consistent comparison API.

## Signature

```typescript
function isSameHour(dateLeft: DateInput, dateRight: DateInput): boolean;
```

## Parameters

| Parameter   | Type        | Description                                                             |
| ----------- | ----------- | ----------------------------------------------------------------------- |
| `dateLeft`  | `DateInput` | The first date as a Date object, numeric timestamp, or ISO 8601 string  |
| `dateRight` | `DateInput` | The second date as a Date object, numeric timestamp, or ISO 8601 string |

## Return Value

| Type      | Description                                                          |
| --------- | -------------------------------------------------------------------- |
| `boolean` | Returns `true` if both dates are in the same hour, `false` otherwise |

## Description

The `isSameHour` function determines whether two dates occur within the same hour by comparing their year, month, day, and hour components. The minute, second, and millisecond components are ignored in the comparison. Internally, it uses the `diffHours` function and checks if the difference equals zero.

### Specification

#### Returns `true` when:

- Both dates are valid
- Both dates have the same year, month, day, and hour
- The minute, second, and millisecond components may differ

#### Returns `false` when:

- Either date is invalid (Invalid Date, `NaN`, `Infinity`, `-Infinity`)
- The dates have different years
- The dates have different months (within the same year)
- The dates have different days (within the same month)
- The dates have different hours (within the same day)

### Behavior Notes

- No exceptions are thrown; invalid inputs return `false`
- Uses the `diffHours` function internally for consistency across the library
- Handles daylight saving time (DST) transitions correctly
- Type-safe with TypeScript, accepting only `Date | number`
- Validates both arguments before processing using Chronia's internal validation utilities
- Performance-optimized by leveraging the hour difference calculation

## Use Cases

- **Time-based Grouping**: Group events or records that occurred within the same hour for analytics or reporting. Useful when creating hourly statistics, time-series data aggregation, or activity dashboards.
- **Temporal Deduplication**: Identify and handle duplicate entries that were created within the same hour. Particularly valuable for preventing rapid re-submissions or detecting suspicious activity patterns.
- **Scheduling Validation**: Verify if two appointments or tasks are scheduled in the same hour to detect conflicts or ensure proper time slot allocation in booking systems.
- **Activity Tracking**: Determine if user actions occurred within the same hour for session analysis, rate limiting, or behavioral tracking without needing minute-level precision.

## Usage Examples

### Time-based Grouping

```typescript
import { isSameHour } from "chronia";

// Group events by hour
interface Event {
  timestamp: Date;
  type: string;
}

function groupEventsByHour(events: Event[]): Map<string, Event[]> {
  const groups = new Map<string, Event[]>();

  for (const event of events) {
    let found = false;
    for (const [key, group] of groups.entries()) {
      if (isSameHour(event.timestamp, group[0].timestamp)) {
        group.push(event);
        found = true;
        break;
      }
    }
    if (!found) {
      const key = event.timestamp.toISOString();
      groups.set(key, [event]);
    }
  }

  return groups;
}

// Same hour, different minutes
isSameHour(new Date(2024, 5, 15, 14, 0, 0), new Date(2024, 5, 15, 14, 59, 59)); // Returns: true

// Different hours
isSameHour(new Date(2024, 5, 15, 14, 59, 59), new Date(2024, 5, 15, 15, 0, 0)); // Returns: false
```

### Temporal Deduplication

```typescript
import { isSameHour } from "chronia";

interface Submission {
  userId: string;
  timestamp: Date;
  data: unknown;
}

function isDuplicateSubmission(
  newSubmission: Submission,
  recentSubmissions: Submission[],
): boolean {
  return recentSubmissions.some(
    (existing) =>
      existing.userId === newSubmission.userId &&
      isSameHour(existing.timestamp, newSubmission.timestamp),
  );
}

// Check for duplicate submissions
const recent: Submission[] = [
  { userId: "user123", timestamp: new Date(2024, 5, 15, 14, 30), data: {} },
];

const newSub: Submission = {
  userId: "user123",
  timestamp: new Date(2024, 5, 15, 14, 45),
  data: {},
};

isDuplicateSubmission(newSub, recent); // Returns: true (same hour)
```

### Scheduling Validation

```typescript
import { isSameHour } from "chronia";

interface Appointment {
  id: string;
  startTime: Date;
  duration: number;
}

function hasHourConflict(
  newAppointment: Appointment,
  existingAppointments: Appointment[],
): boolean {
  return existingAppointments.some((existing) =>
    isSameHour(existing.startTime, newAppointment.startTime),
  );
}

// Check for scheduling conflicts
const existing: Appointment[] = [
  { id: "A1", startTime: new Date(2024, 5, 15, 14, 0), duration: 60 },
];

const newAppt: Appointment = {
  id: "A2",
  startTime: new Date(2024, 5, 15, 14, 30),
  duration: 30,
};

hasHourConflict(newAppt, existing); // Returns: true (same hour)
```

### Activity Tracking

```typescript
import { isSameHour } from "chronia";

interface Activity {
  action: string;
  timestamp: Date;
}

function countActionsInSameHour(
  activities: Activity[],
  referenceTime: Date,
): number {
  return activities.filter((activity) =>
    isSameHour(activity.timestamp, referenceTime),
  ).length;
}

// Track actions in the same hour
const activities: Activity[] = [
  { action: "login", timestamp: new Date(2024, 5, 15, 14, 10) },
  { action: "view", timestamp: new Date(2024, 5, 15, 14, 25) },
  { action: "purchase", timestamp: new Date(2024, 5, 15, 15, 5) },
];

const reference = new Date(2024, 5, 15, 14, 30);
countActionsInSameHour(activities, reference); // Returns: 2

// Invalid dates return false
isSameHour(new Date("invalid"), new Date(2024, 5, 15, 14, 0)); // Returns: false

// Works with timestamps
isSameHour(
  new Date(2024, 5, 15, 14, 30).getTime(),
  new Date(2024, 5, 15, 14, 15).getTime(),
); // Returns: true
```
