# isAfterOrEqual

## Overview

The `isAfterOrEqual` function checks if the first date is after or equal to the second date. It provides flexible date comparison with optional unit-based granularity, allowing you to compare dates at different time scales (year, month, day, hour, minute, second, or millisecond). Unlike `isAfter`, this function returns `true` when the dates are equal.

## Signature

```typescript
function isAfterOrEqual(a: Date | number, b: Date | number, options?: ComparisonOptions): boolean
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `a` | `Date \| number` | The first date as a Date object or numeric timestamp |
| `b` | `Date \| number` | The second date as a Date object or numeric timestamp |
| `options` | `ComparisonOptions` | Optional configuration object |
| `options.unit` | `TimeUnit` | The unit of comparison: `"year"`, `"month"`, `"day"`, `"hour"`, `"minute"`, `"second"`, or `"millisecond"`. Defaults to `"millisecond"` |

## Return Value

| Type | Description |
|------|-------------|
| `boolean` | Returns `true` if date `a` is after or equal to date `b`, `false` otherwise or if either date is invalid |

## Description

The `isAfterOrEqual` function determines whether the first date occurs chronologically after or at the same time as the second date. It supports both precise millisecond-level comparison and coarser-grained comparisons by truncating dates to a specified unit before comparing. This function is the inclusive variant of `isAfter`, making it ideal for minimum requirement validation and threshold checks.

### Specification

#### Returns `true` when:
- Date `a` is chronologically after date `b` at the specified granularity
- Date `a` is exactly equal to date `b` (inclusive comparison)
- Both dates are valid (not Invalid Date, not `NaN`, not `Infinity`, not `-Infinity`)
- When using unit-based comparison, the truncated value of `a` is greater than or equal to the truncated value of `b`
- Works with both Date objects and numeric timestamps

#### Returns `false` when:
- Date `a` is before date `b`
- Either date `a` or date `b` is invalid (Invalid Date, `NaN`, `Infinity`, `-Infinity`)
- When using unit-based comparison, the truncated value of `a` is less than the truncated value of `b`

### Behavior Notes

- **Inclusive comparison**: Equality returns `true` - this is the key difference from `isAfter` which returns `false` for equal dates
- **Input validation**: Invalid dates return `false` immediately without throwing exceptions
- **Type flexibility**: Accepts both Date objects and numeric timestamps for both parameters
- **Unit truncation**: When a `unit` is specified, dates are truncated to that unit before comparison
  - Example: Comparing by `"day"` ignores hours, minutes, seconds, and milliseconds
  - Example: Comparing by `"year"` ignores months, days, and all time components
- **Performance**: Optimized for the common case of millisecond-precision comparison
- **Consistency**: Uses the same validation logic as other Chronia comparison functions
- **Comparison logic**: Uses `>=` operator internally, making it suitable for minimum threshold validation where the threshold itself is valid

## Use Cases

- **Minimum Requirement Validation**: Verify that a date meets or exceeds a minimum required date for age verification, start date validation, or eligibility checks where the minimum threshold date itself is valid.
- **Start Date Validation**: Ensure that an event, subscription, or availability period has begun by checking if the current date is on or after the start date. Essential for access control and feature availability.
- **Availability Checks**: Determine if a resource, product, or service is currently available by checking if the current date is at or past the availability start date. Used in e-commerce, content publishing, and service provisioning.
- **Progress Tracking**: Validate that milestones have been reached by checking if the current date is on or after scheduled milestone dates. Important for project management and task tracking where hitting the exact date counts as completion.
- **Version Comparison**: Check if a date-based version or release is current or newer than a reference version. Useful for feature flags, compatibility checks, and deprecation timelines where the boundary version is considered valid.
- **Timeline Filtering**: Filter records to include items from a specific date onward, where the boundary date itself should be included. Simplifies logic for reports, analytics, and historical data queries with inclusive ranges.

## Usage Examples

### Minimum Requirement Validation

```typescript
import { isAfterOrEqual } from 'chronia';

// Check if user meets minimum age requirement
function meetsAgeRequirement(birthDate: Date, minimumAge: number): boolean {
  const minimumBirthDate = new Date();
  minimumBirthDate.setFullYear(minimumBirthDate.getFullYear() - minimumAge);

  // Birth date must be on or before the minimum birth date
  return !isAfterOrEqual(birthDate, minimumBirthDate);
}

// Check if date is at least as recent as minimum date
function isAtLeastAsRecentAs(date: Date, minimumDate: Date): boolean {
  return isAfterOrEqual(date, minimumDate);
}

// Example usage
const birthDate = new Date(2005, 0, 1);  // January 1, 2005
meetsAgeRequirement(birthDate, 18);  // Returns: true if person is 18 or older

const lastUpdate = new Date(2025, 0, 15);
const requiredDate = new Date(2025, 0, 15);  // Same date
isAtLeastAsRecentAs(lastUpdate, requiredDate);  // Returns: true (equality is valid)

// Works with timestamps
const dataTimestamp = Date.now();
const minimumTimestamp = Date.now() - 86400000;  // 24 hours ago
isAfterOrEqual(dataTimestamp, minimumTimestamp);  // Returns: true
```

### Start Date Validation

```typescript
import { isAfterOrEqual } from 'chronia';

// Check if subscription has started
function hasSubscriptionStarted(startDate: Date): boolean {
  return isAfterOrEqual(Date.now(), startDate);
}

// Check if event has begun
function isEventLive(eventStartDate: Date, currentTime: Date = new Date()): boolean {
  return isAfterOrEqual(currentTime, eventStartDate);
}

// Validate access based on activation date
function hasAccess(userActivationDate: Date, checkDate: Date = new Date()): boolean {
  // Access is granted on or after activation date
  return isAfterOrEqual(checkDate, userActivationDate);
}

// Example usage
const subscriptionStart = new Date(2025, 0, 1);  // January 1, 2025
hasSubscriptionStarted(subscriptionStart);  // Returns: true if current date is Jan 1 or later

const eventStart = new Date(2025, 0, 15, 10, 0);  // January 15, 2025, 10:00
const now = new Date(2025, 0, 15, 10, 0);  // Exactly at start time
isEventLive(eventStart, now);  // Returns: true (event starts now)

// User activated exactly on check date
const activationDate = new Date(2025, 0, 10);
const checkDate = new Date(2025, 0, 10);
hasAccess(activationDate, checkDate);  // Returns: true (same day counts)
```

### Availability Checks

```typescript
import { isAfterOrEqual } from 'chronia';

interface Product {
  id: string;
  name: string;
  availableFrom: Date;
  availableUntil: Date | null;
}

// Check if product is currently available
function isProductAvailable(product: Product, currentTime: Date = new Date()): boolean {
  const hasStarted = isAfterOrEqual(currentTime, product.availableFrom);
  const hasNotEnded = product.availableUntil === null ||
                      !isAfterOrEqual(currentTime, product.availableUntil);

  return hasStarted && hasNotEnded;
}

// Filter available products
function getAvailableProducts(products: Product[], asOf: Date = new Date()): Product[] {
  return products.filter(product => isProductAvailable(product, asOf));
}

// Check if content is published
function isContentPublished(publishDate: Date, currentDate: Date = new Date()): boolean {
  return isAfterOrEqual(currentDate, publishDate);
}

// Example usage
const products: Product[] = [
  {
    id: '1',
    name: 'Early Bird Special',
    availableFrom: new Date(2025, 0, 1),
    availableUntil: new Date(2025, 0, 31)
  },
  {
    id: '2',
    name: 'Regular Product',
    availableFrom: new Date(2025, 0, 15),
    availableUntil: null  // No end date
  }
];

// Check on exactly the start date
const checkDate = new Date(2025, 0, 15);
const available = getAvailableProducts(products, checkDate);
// Returns: Both products (product 2 starts on this date)

const articlePublishDate = new Date(2025, 0, 20, 9, 0);
const currentTime = new Date(2025, 0, 20, 9, 0);  // Exactly at publish time
isContentPublished(articlePublishDate, currentTime);  // Returns: true
```

### Progress Tracking

```typescript
import { isAfterOrEqual } from 'chronia';

interface Milestone {
  name: string;
  dueDate: Date;
  completed: boolean;
}

// Check if milestone deadline has been reached
function isMilestoneDue(milestone: Milestone, currentDate: Date = new Date()): boolean {
  return isAfterOrEqual(currentDate, milestone.dueDate);
}

// Get overdue milestones (including those due today)
function getOverdueMilestones(milestones: Milestone[], asOf: Date = new Date()): Milestone[] {
  return milestones.filter(m =>
    !m.completed && isAfterOrEqual(asOf, m.dueDate)
  );
}

// Check project phase completion eligibility
function canAdvanceToNextPhase(phaseStartDate: Date): boolean {
  // Can advance if we're at or past the phase start date
  return isAfterOrEqual(Date.now(), phaseStartDate);
}

// Example usage
const milestones: Milestone[] = [
  { name: 'Design Complete', dueDate: new Date(2025, 0, 10), completed: true },
  { name: 'Development Start', dueDate: new Date(2025, 0, 15), completed: false },
  { name: 'Testing', dueDate: new Date(2025, 0, 20), completed: false }
];

const today = new Date(2025, 0, 15);  // Exactly on development start date
const overdue = getOverdueMilestones(milestones, today);
// Returns: [Development Start] - due today counts as overdue if not completed

const nextPhaseDate = new Date(2025, 1, 1);
canAdvanceToNextPhase(nextPhaseDate);  // Returns: true if current date is Feb 1 or later
```

### Version Comparison

```typescript
import { isAfterOrEqual } from 'chronia';

interface Release {
  version: string;
  releaseDate: Date;
  features: string[];
}

// Check if current version is at least as new as required version
function meetsMinimumVersion(currentRelease: Release, minimumRelease: Release): boolean {
  return isAfterOrEqual(currentRelease.releaseDate, minimumRelease.releaseDate);
}

// Check if feature is available based on release date
function isFeatureAvailable(featureReleaseDate: Date, currentVersionDate: Date): boolean {
  return isAfterOrEqual(currentVersionDate, featureReleaseDate);
}

// Filter releases since a specific version
function getReleasesFrom(releases: Release[], fromRelease: Release): Release[] {
  return releases.filter(release =>
    isAfterOrEqual(release.releaseDate, fromRelease.releaseDate)
  );
}

// Example usage
const releases: Release[] = [
  { version: '1.0.0', releaseDate: new Date(2024, 0, 1), features: ['basic'] },
  { version: '1.1.0', releaseDate: new Date(2024, 6, 1), features: ['advanced'] },
  { version: '2.0.0', releaseDate: new Date(2025, 0, 1), features: ['premium'] }
];

const currentVersion = releases[2];  // v2.0.0
const minimumRequired = releases[1]; // v1.1.0

meetsMinimumVersion(currentVersion, minimumRequired);  // Returns: true

// Feature released on same date as current version
const newFeatureDate = new Date(2025, 0, 1);
const currentVersionDate = new Date(2025, 0, 1);
isFeatureAvailable(newFeatureDate, currentVersionDate);  // Returns: true

const fromVersion = releases[1];
const recentReleases = getReleasesFrom(releases, fromVersion);
// Returns: [v1.1.0, v2.0.0] - includes the fromVersion itself
```

### Timeline Filtering

```typescript
import { isAfterOrEqual } from 'chronia';

interface LogEntry {
  timestamp: Date;
  message: string;
  level: 'info' | 'warn' | 'error';
}

// Get logs from a specific date onward (inclusive)
function getLogsFrom(logs: LogEntry[], fromDate: Date): LogEntry[] {
  return logs.filter(log => isAfterOrEqual(log.timestamp, fromDate));
}

// Get logs between two dates (inclusive start)
function getLogsBetween(logs: LogEntry[], startDate: Date, endDate: Date): LogEntry[] {
  return logs.filter(log =>
    isAfterOrEqual(log.timestamp, startDate) &&
    !isAfterOrEqual(log.timestamp, endDate)
  );
}

// Get logs from this month onward using day granularity
function getThisMonthLogs(logs: LogEntry[]): LogEntry[] {
  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);

  return logs.filter(log =>
    isAfterOrEqual(log.timestamp, monthStart, { unit: 'day' })
  );
}

// Example usage
const logs: LogEntry[] = [
  { timestamp: new Date(2025, 0, 10, 9, 0), message: 'System start', level: 'info' },
  { timestamp: new Date(2025, 0, 15, 14, 30), message: 'Warning detected', level: 'warn' },
  { timestamp: new Date(2025, 0, 15, 14, 30), message: 'Another event', level: 'info' },
  { timestamp: new Date(2025, 0, 20, 11, 0), message: 'Error occurred', level: 'error' }
];

const cutoffDate = new Date(2025, 0, 15, 14, 30);  // Exact timestamp
const recentLogs = getLogsFrom(logs, cutoffDate);
// Returns: Last 3 logs (includes the exact cutoff timestamp)

const startDate = new Date(2025, 0, 15);
const endDate = new Date(2025, 0, 20);
const rangeLogs = getLogsBetween(logs, startDate, endDate);
// Returns: Logs from Jan 15 (included) to Jan 19 (Jan 20 excluded)
```

### Unit-Based Comparison

```typescript
import { isAfterOrEqual } from 'chronia';

// Compare dates at year granularity
const date1 = new Date(2025, 0, 1, 0, 0, 0);        // January 1, 2025, 00:00:00
const date2 = new Date(2024, 11, 31, 23, 59, 59);  // December 31, 2024, 23:59:59

isAfterOrEqual(date1, date2, { unit: 'year' });  // Returns: true (2025 >= 2024)

// Same year comparison
const sameYear1 = new Date(2025, 0, 1);
const sameYear2 = new Date(2025, 11, 31);

isAfterOrEqual(sameYear1, sameYear2, { unit: 'year' });  // Returns: true (2025 >= 2025)

// Compare dates at day granularity (ignores time)
const morning = new Date(2025, 0, 15, 9, 0, 0);   // January 15, 2025, 09:00
const evening = new Date(2025, 0, 15, 18, 0, 0);  // January 15, 2025, 18:00

isAfterOrEqual(morning, evening, { unit: 'day' });  // Returns: true (same day)
isAfterOrEqual(morning, evening);                   // Returns: false (different times)

// Compare dates at hour granularity
const time1 = new Date(2025, 0, 15, 9, 30, 0);   // 09:30:00
const time2 = new Date(2025, 0, 15, 9, 45, 0);   // 09:45:00

isAfterOrEqual(time1, time2, { unit: 'hour' });  // Returns: true (same hour)
isAfterOrEqual(time1, time2);                    // Returns: false (different minutes)

// Compare dates at month granularity
const jan31 = new Date(2025, 0, 31);  // January 31, 2025
const feb1 = new Date(2025, 1, 1);    // February 1, 2025

isAfterOrEqual(jan31, feb1, { unit: 'month' });  // Returns: false (Jan < Feb)
isAfterOrEqual(feb1, jan31, { unit: 'month' });  // Returns: true (Feb >= Jan)

// Boundary case: exactly equal dates
const exact1 = new Date(2025, 0, 15, 12, 0, 0);
const exact2 = new Date(2025, 0, 15, 12, 0, 0);

isAfterOrEqual(exact1, exact2);                    // Returns: true (equal)
isAfterOrEqual(exact1, exact2, { unit: 'month' }); // Returns: true (same month)

// Compare with timestamps at second granularity
const timestamp1 = new Date(2025, 0, 15, 10, 30, 45).getTime();
const timestamp2 = new Date(2025, 0, 15, 10, 30, 50).getTime();

isAfterOrEqual(timestamp1, timestamp2, { unit: 'second' });  // Returns: false (45s < 50s)
isAfterOrEqual(timestamp2, timestamp1, { unit: 'second' });  // Returns: true (50s >= 45s)
```
