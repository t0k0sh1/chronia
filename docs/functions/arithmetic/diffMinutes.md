# diffMinutes

## Overview

The `diffMinutes` function calculates the difference in complete minutes between two dates. It compares dates at the start of each minute, ignoring seconds and milliseconds for accurate minute counting.

## Signature

```typescript
function diffMinutes(dateLeft: Date | number, dateRight: Date | number): number
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `dateLeft` | `Date \| number` | The first date as a Date object or numeric timestamp |
| `dateRight` | `Date \| number` | The second date as a Date object or numeric timestamp |

## Return Value

| Type | Description |
|------|-------------|
| `number` | The difference in complete minutes between the two dates. Returns a positive number if `dateLeft` is after `dateRight`, negative if before, and `NaN` if any input is invalid |

## Description

The `diffMinutes` function computes the number of complete minutes between two dates by normalizing both dates to the start of their respective minutes (setting seconds and milliseconds to zero) and then calculating the time difference. This approach ensures that partial minutes are not counted, providing accurate minute-level precision for time difference calculations.

### Specification

#### Returns a positive integer when:
- `dateLeft` represents a time that is after `dateRight`
- Both inputs are valid Date objects or finite numeric timestamps
- The difference is calculated by subtracting `dateRight` from `dateLeft`

#### Returns zero when:
- Both dates fall within the same minute (regardless of seconds or milliseconds)
- Both dates represent the exact same minute

#### Returns a negative integer when:
- `dateLeft` represents a time that is before `dateRight`
- Both inputs are valid Date objects or finite numeric timestamps

#### Returns `NaN` when:
- Either `dateLeft` or `dateRight` is an Invalid Date object (e.g., `new Date('invalid')`)
- Either parameter is `NaN`
- Either parameter is `Infinity`
- Either parameter is `-Infinity`

### Behavior Notes

- Returns `NaN` for invalid inputs rather than throwing errors, following Chronia's calculation function conventions
- Seconds and milliseconds are completely ignored in the calculation
- Uses `Math.round()` to ensure integer results, eliminating floating-point precision issues
- Handles all time boundaries correctly (hour, day, month, year transitions)
- Works consistently with both Date objects and numeric timestamps
- Performance-optimized for frequent time difference calculations
- Type-safe with TypeScript, accepting only `Date | number` types

## Use Cases

- **Time Tracking**: Calculate elapsed time in minutes between two events. Useful for logging, analytics, or tracking user activity durations where minute-level precision is sufficient.
- **Scheduling and Reminders**: Determine how many minutes remain until a scheduled event or deadline. Essential for countdown timers, notification systems, and appointment reminders.
- **Duration Calculations**: Compute meeting lengths, call durations, or session times in minutes. Common in calendar applications, time-tracking software, and billing systems.
- **Time-Based Validation**: Verify that a certain number of minutes has passed between actions. Used in rate limiting, cooldown periods, or enforcing minimum time intervals between operations.
- **Timezone-Agnostic Comparisons**: Calculate minute differences without timezone conversions. Since the function works on absolute time values, it's useful when you need raw time differences regardless of timezone representation.

## Usage Examples

### Time Tracking

```typescript
import { diffMinutes } from 'chronia';

// Track elapsed time
const sessionStart = new Date(2024, 5, 15, 14, 25);
const sessionEnd = new Date(2024, 5, 15, 14, 30);
const duration = diffMinutes(sessionEnd, sessionStart);
// Returns: 5

// Seconds are ignored (same minute)
const start = new Date(2024, 5, 15, 14, 30, 0);
const end = new Date(2024, 5, 15, 14, 30, 59);
const diff = diffMinutes(end, start);
// Returns: 0

// Works across hours and days
const yesterday = new Date(2024, 5, 14, 23, 50);
const today = new Date(2024, 5, 15, 0, 10);
const minutesPassed = diffMinutes(today, yesterday);
// Returns: 20
```

### Scheduling and Reminders

```typescript
import { diffMinutes } from 'chronia';

// Calculate time until an event
function getMinutesUntilEvent(eventTime: Date): number {
  const now = new Date();
  return diffMinutes(eventTime, now);
}

const meeting = new Date(2024, 5, 15, 15, 0);
const minutesRemaining = getMinutesUntilEvent(meeting);

if (minutesRemaining > 0) {
  console.log(`Meeting starts in ${minutesRemaining} minutes`);
} else if (minutesRemaining === 0) {
  console.log('Meeting is starting now');
} else {
  console.log(`Meeting started ${Math.abs(minutesRemaining)} minutes ago`);
}
```

### Duration Calculations

```typescript
import { diffMinutes } from 'chronia';

// Calculate meeting duration
interface Meeting {
  startTime: number;
  endTime: number;
}

function getMeetingDuration(meeting: Meeting): number {
  return diffMinutes(meeting.endTime, meeting.startTime);
}

const meeting: Meeting = {
  startTime: new Date(2024, 5, 15, 14, 0).getTime(),
  endTime: new Date(2024, 5, 15, 15, 30).getTime(),
};

const duration = getMeetingDuration(meeting);
// Returns: 90
```

### Time-Based Validation

```typescript
import { diffMinutes } from 'chronia';

// Enforce minimum time between actions
function canPerformAction(lastActionTime: Date, cooldownMinutes: number): boolean {
  const now = new Date();
  const minutesSinceLastAction = diffMinutes(now, lastActionTime);
  return minutesSinceLastAction >= cooldownMinutes;
}

const lastSubmit = new Date(2024, 5, 15, 14, 25);
const canSubmit = canPerformAction(lastSubmit, 5);

if (canSubmit) {
  console.log('Action allowed');
} else {
  const timeRemaining = 5 - diffMinutes(new Date(), lastSubmit);
  console.log(`Please wait ${timeRemaining} more minutes`);
}
```

### Handling Invalid Inputs

```typescript
import { diffMinutes } from 'chronia';

// Graceful error handling
function calculateSafeDifference(date1: Date | number, date2: Date | number): string {
  const diff = diffMinutes(date1, date2);

  if (isNaN(diff)) {
    return 'Invalid date input';
  }

  return `${Math.abs(diff)} minutes`;
}

// Valid inputs
calculateSafeDifference(new Date(2024, 5, 15, 14, 30), new Date(2024, 5, 15, 14, 25));
// Returns: '5 minutes'

// Invalid inputs return NaN, handled gracefully
calculateSafeDifference(new Date('invalid'), new Date(2024, 5, 15, 14, 25));
// Returns: 'Invalid date input'
```
