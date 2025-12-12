# isPast

## Overview

The `isPast` function checks whether a given date is in the past relative to the current time. It provides a simple and reliable way to determine if a date or timestamp occurred before the present moment, with millisecond precision.

## Signature

```typescript
function isPast(date: DateInput): boolean;
```

## Parameters

| Parameter | Type        | Description                                                                            |
| --------- | ----------- | -------------------------------------------------------------------------------------- |
| `date`    | `DateInput` | A Date object, numeric timestamp, or ISO 8601 string to check against the current time |

## Return Value

| Type      | Description                                                           |
| --------- | --------------------------------------------------------------------- |
| `boolean` | Returns `true` if the date is strictly in the past, `false` otherwise |

## Description

The `isPast` function determines whether the provided Date object or timestamp represents a time that occurred before the current moment. It uses the internal `compareDateTimes` helper to perform precise comparison at millisecond granularity, ensuring consistent behavior across the Chronia library.

The function captures the current time using `Date.now()` at the moment of invocation and compares the provided date against it. The comparison is strict, meaning that if the date equals the current time (same millisecond), it returns `false` because the date is in the present, not the past.

### Specification

#### Returns `true` when:

- The argument is a valid Date object representing a time before the current moment
- The argument is a finite numeric timestamp less than `Date.now()`
- The date is at least 1 millisecond in the past

#### Returns `false` when:

- The argument is a Date object representing the current moment (equal to `Date.now()`)
- The argument is a numeric timestamp equal to `Date.now()`
- The argument is a Date object or timestamp in the future
- The argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The argument is `NaN`
- The argument is `Infinity`
- The argument is `-Infinity`
- The argument is of an incorrect type (string, object, null, undefined)

### Behavior Notes

- **No exceptions thrown**: The function never throws exceptions; invalid values return `false` instead
- **Strict comparison**: Uses strict less-than comparison, so dates equal to the current time return `false`
- **Millisecond precision**: Comparison is performed at millisecond level using `Date.now()`
- **Time-dependent**: The return value depends on the system time at invocation; the same date may return different results at different times
- **Consistent validation**: Uses the same validation logic as other Chronia time comparison functions via `compareDateTimes` helper
- **Type-safe**: TypeScript enforces `Date | number` type, but runtime handles invalid types gracefully
- **Performance optimized**: Efficient comparison suitable for high-frequency validation scenarios

## Use Cases

- **Session Expiry Checking**: Verify if authentication tokens, sessions, or time-limited credentials have expired. Essential for security systems that need to invalidate past credentials and ensure users only have access with current tokens.
- **Event Timeline Filtering**: Filter events, posts, or records to show only historical items or determine whether a scheduled event has already occurred. Useful in calendar applications, social media feeds, and activity logs.
- **Deadline Validation**: Check if deadlines, due dates, or cutoff times have passed. Common in task management systems, invoice processing, and time-sensitive workflows where actions depend on whether a deadline is still active.
- **Data Archival Logic**: Identify outdated or stale data that should be archived, cleaned up, or marked as historical. Helps maintain database performance by segregating current and past records.
- **Age Verification**: Determine if a date of birth indicates a person has reached a certain age. Useful in registration forms, eligibility checks, and legal compliance validation.
- **Real-time Status Indicators**: Update UI elements to show whether events are happening now, happened in the past, or will happen in the future. Provides users with clear temporal context in applications.

## Usage Examples

### Session Expiry Checking

```typescript
import { isPast } from "chronia";

interface Session {
  token: string;
  expiresAt: Date;
}

function isSessionExpired(session: Session): boolean {
  return isPast(session.expiresAt);
}

// Check session validity
const session = {
  token: "abc123",
  expiresAt: new Date("2025-01-14T12:00:00Z"),
};

// If current time is 2025-01-15T12:00:00Z
isSessionExpired(session); // Returns: true (session expired yesterday)

// Using timestamp
const tokenExpiry = Date.now() - 3600000; // 1 hour ago
isPast(tokenExpiry); // Returns: true
```

### Event Timeline Filtering

```typescript
import { isPast } from "chronia";

interface Event {
  id: string;
  title: string;
  date: Date;
}

function filterPastEvents(events: Event[]): Event[] {
  return events.filter((event) => isPast(event.date));
}

function filterUpcomingEvents(events: Event[]): Event[] {
  return events.filter((event) => !isPast(event.date));
}

const events: Event[] = [
  { id: "1", title: "Conference", date: new Date("2025-01-10") },
  { id: "2", title: "Webinar", date: new Date("2025-01-20") },
  { id: "3", title: "Workshop", date: new Date("2025-01-05") },
];

// If current time is 2025-01-15
const pastEvents = filterPastEvents(events);
// Returns: [
//   { id: '1', title: 'Conference', date: ... },
//   { id: '3', title: 'Workshop', date: ... }
// ]

const upcomingEvents = filterUpcomingEvents(events);
// Returns: [{ id: '2', title: 'Webinar', date: ... }]
```

### Deadline Validation

```typescript
import { isPast } from "chronia";

interface Task {
  id: string;
  title: string;
  dueDate: Date;
  completed: boolean;
}

function isTaskOverdue(task: Task): boolean {
  return !task.completed && isPast(task.dueDate);
}

function getOverdueTasks(tasks: Task[]): Task[] {
  return tasks.filter(isTaskOverdue);
}

const tasks: Task[] = [
  {
    id: "1",
    title: "Review PR",
    dueDate: new Date("2025-01-14"),
    completed: false,
  },
  {
    id: "2",
    title: "Write docs",
    dueDate: new Date("2025-01-20"),
    completed: false,
  },
  {
    id: "3",
    title: "Fix bug",
    dueDate: new Date("2025-01-10"),
    completed: true,
  },
];

// If current time is 2025-01-15
const overdue = getOverdueTasks(tasks);
// Returns: [{ id: '1', title: 'Review PR', ... }]
// Task 3 is not overdue because it's completed
// Task 2 is not overdue because deadline hasn't passed
```

### Data Archival Logic

```typescript
import { isPast } from "chronia";

interface Record {
  id: string;
  data: unknown;
  expiresAt: Date;
}

function shouldArchiveRecord(record: Record): boolean {
  // Archive if expiration date has passed
  return isPast(record.expiresAt);
}

function partitionRecords(records: Record[]): {
  active: Record[];
  archived: Record[];
} {
  const active: Record[] = [];
  const archived: Record[] = [];

  for (const record of records) {
    if (shouldArchiveRecord(record)) {
      archived.push(record);
    } else {
      active.push(record);
    }
  }

  return { active, archived };
}

// Example usage
const records: Record[] = [
  { id: "1", data: { value: "A" }, expiresAt: new Date("2025-01-10") },
  { id: "2", data: { value: "B" }, expiresAt: new Date("2025-01-20") },
];

// If current time is 2025-01-15
const { active, archived } = partitionRecords(records);
// active: [{ id: '2', ... }]
// archived: [{ id: '1', ... }]
```

### Age Verification

```typescript
import { isPast } from "chronia";

function isAdult(birthDate: Date): boolean {
  // Calculate date 18 years ago from today
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

  // Person is adult if birth date is before 18 years ago
  return isPast(eighteenYearsAgo)
    ? birthDate.getTime() <= eighteenYearsAgo.getTime()
    : false;
}

function canRegister(birthDate: Date | string): {
  allowed: boolean;
  reason: string;
} {
  // Parse if string provided
  const date = typeof birthDate === "string" ? new Date(birthDate) : birthDate;

  // Validate date
  if (!isPast(date)) {
    return {
      allowed: false,
      reason: "Birth date cannot be in the future or present",
    };
  }

  // Check age requirement
  if (!isAdult(date)) {
    return { allowed: false, reason: "Must be 18 years or older to register" };
  }

  return { allowed: true, reason: "Eligible" };
}

// Valid birth date in the past
canRegister(new Date("2000-01-01"));
// Returns: { allowed: true, reason: 'Eligible' }

// Future date (invalid)
canRegister(new Date("2030-01-01"));
// Returns: { allowed: false, reason: 'Birth date cannot be in the future or present' }

// Too young
canRegister(new Date("2020-01-01"));
// Returns: { allowed: false, reason: 'Must be 18 years or older to register' }
```

### Real-time Status Indicators

```typescript
import { isPast } from "chronia";

type EventStatus = "completed" | "in-progress" | "upcoming";

interface ScheduledEvent {
  title: string;
  startTime: Date;
  endTime: Date;
}

function getEventStatus(event: ScheduledEvent): EventStatus {
  const now = Date.now();

  if (isPast(event.endTime)) {
    return "completed";
  }

  if (isPast(event.startTime)) {
    return "in-progress";
  }

  return "upcoming";
}

function getStatusColor(status: EventStatus): string {
  switch (status) {
    case "completed":
      return "gray";
    case "in-progress":
      return "green";
    case "upcoming":
      return "blue";
  }
}

// Example usage
const meeting: ScheduledEvent = {
  title: "Team Standup",
  startTime: new Date("2025-01-15T10:00:00Z"),
  endTime: new Date("2025-01-15T10:30:00Z"),
};

// If current time is 2025-01-15T10:15:00Z
const status = getEventStatus(meeting); // Returns: 'in-progress'
const color = getStatusColor(status); // Returns: 'green'

// If current time is 2025-01-15T11:00:00Z
const statusLater = getEventStatus(meeting); // Returns: 'completed'
const colorLater = getStatusColor(statusLater); // Returns: 'gray'
```

### Edge Cases and Invalid Input Handling

```typescript
import { isPast } from "chronia";

// Invalid Date - returns false instead of throwing
isPast(new Date("invalid")); // Returns: false

// NaN timestamp - handled gracefully
isPast(NaN); // Returns: false

// Infinity - handled gracefully
isPast(Infinity); // Returns: false
isPast(-Infinity); // Returns: false

// Current moment - returns false (not in the past)
isPast(Date.now()); // Returns: false

// 1 millisecond ago - returns true
isPast(Date.now() - 1); // Returns: true

// 1 millisecond in future - returns false
isPast(Date.now() + 1); // Returns: false

// Defensive usage with validation
function processExpiredData(expiryDate: Date | number): void {
  if (isPast(expiryDate)) {
    console.log("Data has expired, archiving...");
    // Safe to proceed - we know it's past
  } else {
    console.log("Data is still valid");
  }
}

// Even with invalid input, no exceptions thrown
processExpiredData(new Date("malformed")); // Logs: 'Data is still valid'
processExpiredData(NaN); // Logs: 'Data is still valid'
```
