# getHours

## Overview

The `getHours` function extracts the hour component from a given Date object or timestamp in 24-hour format (0-23). It provides a validated way to retrieve hour information with consistent error handling across Chronia's API surface.

## Signature

```typescript
function getHours(date: Date | number): number;
```

## Parameters

| Parameter | Type             | Description                                                        |
| --------- | ---------------- | ------------------------------------------------------------------ |
| `date`    | `Date \| number` | A Date object or numeric timestamp from which to extract the hours |

## Return Value

| Type     | Description                                                                  |
| -------- | ---------------------------------------------------------------------------- |
| `number` | Returns the hours (0-23) in 24-hour format, or `NaN` if the input is invalid |

## Description

The `getHours` function determines the hour component of the provided Date object or timestamp, returning a value between 0 and 23 representing the hour in 24-hour format. It validates the input before processing to ensure consistency with Chronia's error handling patterns.

### Specification

#### Returns a number (0-23) when:

- The argument is a valid `Date` object containing a valid date/time
- The argument is a finite numeric timestamp, including:
  - Positive timestamps (dates after Unix epoch)
  - Zero (`0`, representing January 1, 1970, 00:00:00 UTC)
  - Negative timestamps (dates before Unix epoch)

#### Returns `NaN` when:

- The argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The argument is `NaN`
- The argument is `Infinity`
- The argument is `-Infinity`

### Behavior Notes

- Returns hours in the local timezone, not UTC (use `getUTCHours()` for UTC hours if needed)
- Hours are returned in 24-hour format (0-23), not 12-hour format
- No exceptions are thrown; invalid values return `NaN`
- Validates arguments before processing using Chronia's internal validation utilities
- Type-safe with TypeScript, accepting only `Date | number`
- Midnight is represented as `0`, not `24`
- Performance-optimized for high-frequency access scenarios

## Use Cases

- **Time Display**: Extract the hour component for displaying time in custom formats. Useful when building UI components that show hours separately or need to format time in specific ways.
- **Time-Based Logic**: Implement business rules based on hours of the day, such as operating hours validation, pricing tiers by time of day, or scheduling systems.
- **Time Comparison**: Compare hours across different dates to identify patterns or filter events. Particularly useful for analytics, reporting, or grouping data by hour.
- **Alarm and Scheduling**: Build alarm clocks, reminder systems, or scheduled task executors that trigger at specific hours. Enables precise hour-based scheduling logic.
- **Data Extraction**: Extract hour data from timestamps for storage, transformation, or analysis in data processing pipelines where hour granularity is needed.

## Usage Examples

### Time Display

```typescript
import { getHours } from "chronia";

// Get hours from Date object
const afternoon = new Date(2025, 0, 15, 14, 30);
getHours(afternoon); // Returns: 14

// Get hours from timestamp (note: uses local timezone)
const timestamp = 1704110400000; // 2024-01-01T12:00:00.000Z in UTC
getHours(timestamp); // Returns: 12 (in UTC+0) or varies by timezone

// Midnight (start of day)
const midnight = new Date(2024, 0, 1, 0, 0, 0);
getHours(midnight); // Returns: 0

// End of day
const lateNight = new Date(2024, 0, 1, 23, 59, 59);
getHours(lateNight); // Returns: 23
```

### Time-Based Logic

```typescript
import { getHours } from "chronia";

// Check if a date falls within business hours
function isBusinessHours(date: Date | number): boolean {
  const hour = getHours(date);

  // Returns NaN for invalid dates, which fails the comparison
  return hour >= 9 && hour < 17;
}

// Business hours check
isBusinessHours(new Date(2025, 0, 15, 14, 30)); // Returns: true (2:30 PM)
isBusinessHours(new Date(2025, 0, 15, 8, 30)); // Returns: false (8:30 AM)
isBusinessHours(new Date(2025, 0, 15, 18, 0)); // Returns: false (6:00 PM)

// Apply time-based pricing
function getPricing(orderDate: Date): number {
  const hour = getHours(orderDate);

  if (isNaN(hour)) {
    throw new Error("Invalid order date");
  }

  // Happy hour pricing (5 PM - 7 PM)
  if (hour >= 17 && hour < 19) {
    return 0.8; // 20% discount
  }

  return 1.0; // Regular price
}
```

### Time Comparison

```typescript
import { getHours } from "chronia";

// Filter events by hour
interface Event {
  name: string;
  timestamp: number;
}

function filterEventsByHour(events: Event[], targetHour: number): Event[] {
  return events.filter((event) => getHours(event.timestamp) === targetHour);
}

const events: Event[] = [
  { name: "Morning Meeting", timestamp: new Date(2025, 0, 15, 9, 0).getTime() },
  { name: "Lunch Break", timestamp: new Date(2025, 0, 15, 12, 0).getTime() },
  {
    name: "Afternoon Review",
    timestamp: new Date(2025, 0, 15, 14, 0).getTime(),
  },
  { name: "Evening Call", timestamp: new Date(2025, 0, 15, 18, 0).getTime() },
];

// Get all events at 2 PM (14:00)
const afternoonEvents = filterEventsByHour(events, 14);
// Returns: [{ name: 'Afternoon Review', timestamp: ... }]
```

### Alarm and Scheduling

```typescript
import { getHours } from "chronia";

// Check if current time matches alarm time
function shouldTriggerAlarm(alarmHour: number): boolean {
  const now = new Date();
  const currentHour = getHours(now);

  return currentHour === alarmHour;
}

// Schedule a task to run at specific hours
function scheduleHourlyTask(
  task: () => void,
  targetHours: number[],
): NodeJS.Timeout {
  return setInterval(() => {
    const currentHour = getHours(new Date());

    if (targetHours.includes(currentHour)) {
      task();
    }
  }, 60000); // Check every minute
}

// Run cleanup task at midnight and noon
scheduleHourlyTask(() => {
  console.log("Running scheduled cleanup");
}, [0, 12]);
```

### Data Extraction

```typescript
import { getHours } from "chronia";

// Extract hour data for analytics
interface LogEntry {
  message: string;
  timestamp: number;
}

function analyzeLogsByHour(logs: LogEntry[]): Map<number, number> {
  const hourCounts = new Map<number, number>();

  for (const log of logs) {
    const hour = getHours(log.timestamp);

    // Skip invalid timestamps
    if (isNaN(hour)) continue;

    hourCounts.set(hour, (hourCounts.get(hour) || 0) + 1);
  }

  return hourCounts;
}

// Invalid date handling
const invalidDate = new Date("invalid");
getHours(invalidDate); // Returns: NaN

// Handle edge cases safely
function safeGetHours(date: Date | number, defaultValue: number = 0): number {
  const hour = getHours(date);
  return isNaN(hour) ? defaultValue : hour;
}

safeGetHours(new Date(2025, 0, 15, 14, 30)); // Returns: 14
safeGetHours(new Date("invalid"), -1); // Returns: -1 (default)
```
