# isSameMonth

## Overview

The `isSameMonth` function checks whether two dates fall within the same calendar month and year. It provides a simple and reliable way to compare month equality in Chronia's consistent API surface.

## Signature

```typescript
function isSameMonth(
  dateLeft: Date | number,
  dateRight: Date | number,
): boolean;
```

## Parameters

| Parameter   | Type             | Description                                           |
| ----------- | ---------------- | ----------------------------------------------------- |
| `dateLeft`  | `Date \| number` | The first date as a Date object or numeric timestamp  |
| `dateRight` | `Date \| number` | The second date as a Date object or numeric timestamp |

## Return Value

| Type      | Description                                                                                                 |
| --------- | ----------------------------------------------------------------------------------------------------------- |
| `boolean` | Returns `true` if both dates are in the same month and year, `false` otherwise or if either date is invalid |

## Description

The `isSameMonth` function determines whether two provided dates occur within the same calendar month and year. It ignores the day and time components, focusing solely on the month and year values. The function internally uses `diffMonths` to calculate the month difference and returns `true` when the difference is exactly zero.

### Specification

#### Returns `true` when:

- Both dates are in the same calendar month AND year
- The dates can have different days (e.g., June 1st and June 30th, 2024)
- The dates can have different time components (hours, minutes, seconds, milliseconds)
- Both inputs are valid dates (Date objects or finite numeric timestamps)

#### Returns `false` when:

- The dates are in different months (even if same year)
- The dates are in the same month but different years (e.g., June 2024 vs June 2023)
- Either input is an Invalid Date object (e.g., `new Date('invalid')`)
- Either input is `NaN`
- Either input is `Infinity` or `-Infinity`

### Behavior Notes

- No exceptions are thrown; invalid inputs return `false`
- Uses `diffMonths` internally, which validates inputs and returns `NaN` for invalid dates
- The function checks if `diffMonths` returns exactly `0`, which handles the `NaN` case (since `NaN === 0` is `false`)
- Accepts both Date objects and numeric timestamps for flexibility
- Type-safe with TypeScript, accepting only `Date | number`
- Correctly handles month boundaries, leap years, and year transitions
- Day and time components are completely ignored in the comparison

## Use Cases

- **Event Grouping**: Group events, transactions, or records by month for reporting or analytics. Particularly useful when generating monthly summaries or categorizing time-series data.
- **Date Range Validation**: Verify that two dates fall within the same billing period, subscription month, or reporting period. Helps ensure data consistency in financial and administrative applications.
- **Calendar Navigation**: Determine if a selected date and current view date are in the same month for calendar UI components. Useful for highlighting or filtering dates in calendar interfaces.
- **Data Filtering**: Filter collections of timestamped records to find all entries from the same month as a reference date. Common in log analysis, financial reporting, and historical data queries.
- **Comparison Logic**: Implement business logic that treats all dates within the same month equally, regardless of specific day or time. Useful for monthly subscription renewals, billing cycles, or periodic tasks.

## Usage Examples

### Event Grouping

```typescript
import { isSameMonth } from "chronia";

interface Event {
  name: string;
  date: Date;
}

// Group events by month
function groupEventsByMonth(events: Event[], referenceDate: Date): Event[] {
  return events.filter((event) => isSameMonth(event.date, referenceDate));
}

const events: Event[] = [
  { name: "Meeting", date: new Date(2024, 5, 5) },
  { name: "Conference", date: new Date(2024, 5, 20) },
  { name: "Workshop", date: new Date(2024, 6, 10) },
];

const juneEvents = groupEventsByMonth(events, new Date(2024, 5, 1));
// Returns: [{ name: 'Meeting', date: ... }, { name: 'Conference', date: ... }]

// Same month, different days
isSameMonth(new Date(2024, 5, 1), new Date(2024, 5, 30)); // Returns: true

// Different months
isSameMonth(new Date(2024, 5, 30), new Date(2024, 6, 1)); // Returns: false
```

### Date Range Validation

```typescript
import { isSameMonth } from "chronia";

// Validate billing period
function isInSameBillingMonth(
  transactionDate: Date,
  billingDate: Date,
): boolean {
  return isSameMonth(transactionDate, billingDate);
}

const billingDate = new Date(2024, 5, 1);
const transaction1 = new Date(2024, 5, 15, 14, 30);
const transaction2 = new Date(2024, 6, 5);

isInSameBillingMonth(transaction1, billingDate); // Returns: true
isInSameBillingMonth(transaction2, billingDate); // Returns: false

// Same month and year, different times (time is ignored)
isSameMonth(new Date(2024, 5, 15, 14, 30), new Date(2024, 5, 20, 9, 45)); // Returns: true
```

### Calendar Navigation

```typescript
import { isSameMonth } from "chronia";

// Check if a date is in the currently displayed month
function isInCurrentView(date: Date, viewDate: Date): boolean {
  return isSameMonth(date, viewDate);
}

const currentView = new Date(2024, 5, 1); // June 2024
const selectedDate1 = new Date(2024, 5, 15);
const selectedDate2 = new Date(2024, 4, 15);

isInCurrentView(selectedDate1, currentView); // Returns: true
isInCurrentView(selectedDate2, currentView); // Returns: false

// Same month, different years (year matters)
isSameMonth(new Date(2024, 5, 15), new Date(2023, 5, 15)); // Returns: false
```

### Data Filtering

```typescript
import { isSameMonth } from "chronia";

interface LogEntry {
  message: string;
  timestamp: number;
}

// Filter logs from the same month
function getLogsForMonth(logs: LogEntry[], referenceDate: Date): LogEntry[] {
  return logs.filter((log) => isSameMonth(log.timestamp, referenceDate));
}

const logs: LogEntry[] = [
  { message: "Error", timestamp: new Date(2024, 5, 10).getTime() },
  { message: "Warning", timestamp: new Date(2024, 5, 25).getTime() },
  { message: "Info", timestamp: new Date(2024, 6, 5).getTime() },
];

const juneLogs = getLogsForMonth(logs, new Date(2024, 5, 1));
// Returns: [{ message: 'Error', ... }, { message: 'Warning', ... }]

// Works with numeric timestamps
isSameMonth(new Date(2024, 5, 15).getTime(), new Date(2024, 5, 20).getTime()); // Returns: true
```

### Comparison Logic

```typescript
import { isSameMonth } from "chronia";

// Check if subscription renewal is in the same month
function needsRenewalNotice(lastRenewal: Date, checkDate: Date): boolean {
  return !isSameMonth(lastRenewal, checkDate);
}

const lastRenewal = new Date(2024, 5, 1);
const today = new Date(2024, 6, 1);

needsRenewalNotice(lastRenewal, today); // Returns: true (different months)

// Invalid dates return false
isSameMonth(new Date("invalid"), new Date(2024, 5, 1)); // Returns: false
isSameMonth(NaN, new Date(2024, 5, 1)); // Returns: false
isSameMonth(Infinity, new Date(2024, 5, 1)); // Returns: false
```
