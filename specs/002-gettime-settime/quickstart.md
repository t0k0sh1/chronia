# Quickstart: getTime/setTime Implementation

## Overview
This guide demonstrates how to use the getTime() and setTime() utility functions for timestamp extraction and Date object manipulation.

## Installation
```bash
npm install chronia
```

## Basic Usage

### Import
```typescript
import { getTime, setTime } from 'chronia';
```

### getTime() - Extract Timestamps

#### Basic Usage
```typescript
const date = new Date('2024-01-01T00:00:00.000Z');
const timestamp = getTime(date);
console.log(timestamp); // 1704067200000
```

#### With Current Date
```typescript
const now = new Date();
const currentTimestamp = getTime(now);
console.log(currentTimestamp); // Current timestamp in milliseconds
```

#### Invalid Date Handling
```typescript
const invalidDate = new Date('invalid-date-string');
const timestamp = getTime(invalidDate);
console.log(timestamp); // NaN
console.log(isNaN(timestamp)); // true - check for invalid dates
```

### setTime() - Modify Date Objects

#### Basic Usage
```typescript
const date = new Date();
setTime(date, 1704067200000);
console.log(date.toISOString()); // "2024-01-01T00:00:00.000Z"
```

#### Method Chaining
```typescript
const date = new Date();
const result = setTime(date, 1704067200000)
  .toISOString();
console.log(result); // "2024-01-01T00:00:00.000Z"
```

#### Copying and Setting
```typescript
// Create new date with specific timestamp
const sourceDate = new Date();
const targetDate = new Date();
setTime(targetDate, getTime(sourceDate));
// targetDate now has same timestamp as sourceDate
```

## Common Use Cases

### Unix Timestamp Conversion
```typescript
// Convert Date to Unix timestamp (seconds)
const date = new Date('2024-01-01');
const unixTimestamp = Math.floor(getTime(date) / 1000);
console.log(unixTimestamp); // 1704067200

// Convert Unix timestamp to Date
const unixSeconds = 1704067200;
const dateFromUnix = new Date();
setTime(dateFromUnix, unixSeconds * 1000);
console.log(dateFromUnix.toISOString()); // "2024-01-01T00:00:00.000Z"
```

### Date Comparison
```typescript
const date1 = new Date('2024-01-01');
const date2 = new Date('2024-01-02');

// Compare timestamps directly
const timestamp1 = getTime(date1);
const timestamp2 = getTime(date2);

if (timestamp1 < timestamp2) {
  console.log('date1 is earlier than date2');
}

// Calculate difference in days
const diffMs = timestamp2 - timestamp1;
const diffDays = diffMs / (1000 * 60 * 60 * 24);
console.log(`Difference: ${diffDays} days`);
```

### Date Manipulation
```typescript
// Add days to a date
function addDays(date: Date, days: number): Date {
  const newDate = new Date(date);
  const currentTime = getTime(newDate);
  const daysInMs = days * 24 * 60 * 60 * 1000;
  setTime(newDate, currentTime + daysInMs);
  return newDate;
}

const today = new Date();
const tomorrow = addDays(today, 1);
```

### Database Timestamp Storage
```typescript
// Store timestamp for database
const user = {
  name: 'John Doe',
  createdAt: getTime(new Date()),
  updatedAt: getTime(new Date())
};

// Retrieve from database and convert back
const retrievedUser = {
  name: 'John Doe',
  createdAt: 1704067200000,
  updatedAt: 1704067200000
};

const createdDate = new Date();
setTime(createdDate, retrievedUser.createdAt);
console.log('Created:', createdDate.toISOString());
```

## Advanced Usage

### Invalid Date Handling
```typescript
function safeGetTime(date: Date): number | null {
  const timestamp = getTime(date);
  return isNaN(timestamp) ? null : timestamp;
}

function safeSetTime(date: Date, timestamp: number): boolean {
  setTime(date, timestamp);
  return !isNaN(getTime(date));
}

// Usage
const date = new Date();
if (safeSetTime(date, 1704067200000)) {
  console.log('Date set successfully');
} else {
  console.log('Failed to set date');
}
```

### Batch Date Operations
```typescript
// Process multiple dates
const dates = [
  new Date('2024-01-01'),
  new Date('2024-01-02'),
  new Date('2024-01-03')
];

// Extract all timestamps
const timestamps = dates.map(date => getTime(date));
console.log(timestamps);

// Set all dates to same timestamp
const targetTimestamp = Date.now();
dates.forEach(date => setTime(date, targetTimestamp));
```

## TypeScript Support

Full TypeScript support with proper type definitions:

```typescript
import { getTime, setTime } from 'chronia';

// Type-safe usage
const date: Date = new Date();
const timestamp: number = getTime(date);
const modifiedDate: Date = setTime(date, timestamp);

// Error checking
function processDate(input: Date): string {
  const timestamp = getTime(input);

  if (isNaN(timestamp)) {
    throw new Error('Invalid date provided');
  }

  return `Timestamp: ${timestamp}`;
}
```

## Error Handling

### Validation Examples
```typescript
// Check for invalid dates before processing
function isValidDate(date: Date): boolean {
  return !isNaN(getTime(date));
}

// Safe timestamp extraction
function extractTimestamp(date: Date): number {
  if (!isValidDate(date)) {
    throw new Error('Cannot extract timestamp from invalid date');
  }
  return getTime(date);
}

// Safe date modification
function updateDate(date: Date, timestamp: number): void {
  if (typeof timestamp !== 'number' || isNaN(timestamp)) {
    throw new Error('Invalid timestamp provided');
  }
  setTime(date, timestamp);

  if (!isValidDate(date)) {
    throw new Error('Timestamp resulted in invalid date');
  }
}
```

## Performance Considerations

### Efficient Date Operations
```typescript
// Efficient: Direct timestamp manipulation
const dates = Array.from({length: 1000}, () => new Date());
const baseTimestamp = Date.now();

// Fast batch update
dates.forEach((date, index) => {
  setTime(date, baseTimestamp + (index * 1000));
});

// Fast comparison
dates.sort((a, b) => getTime(a) - getTime(b));
```

## Validation Tests

Run these examples to verify the implementation:

```typescript
// Test 1: Basic functionality
const testDate = new Date('2024-01-01T00:00:00.000Z');
console.assert(getTime(testDate) === 1704067200000, 'getTime should return correct timestamp');

// Test 2: setTime functionality
const date = new Date();
const result = setTime(date, 1704067200000);
console.assert(result === date, 'setTime should return same object');
console.assert(getTime(date) === 1704067200000, 'setTime should update timestamp');

// Test 3: Invalid date handling
const invalidDate = new Date('invalid');
console.assert(isNaN(getTime(invalidDate)), 'getTime should return NaN for invalid dates');

// Test 4: Chaining support
const chainResult = setTime(new Date(), Date.now()).toISOString();
console.assert(typeof chainResult === 'string', 'setTime should support method chaining');

console.log('All validation tests passed!');
```

## Migration from Native Date Methods

### From Date.prototype.getTime()
```typescript
// Old approach
const timestamp = date.getTime();

// New approach (identical behavior)
const timestamp = getTime(date);
```

### From Date.prototype.setTime()
```typescript
// Old approach
date.setTime(timestamp); // Returns timestamp
const result = date;

// New approach (returns Date object for chaining)
const result = setTime(date, timestamp); // Returns Date object
```

## Next Steps

- Explore other chronia date utilities
- Check out advanced date manipulation functions
- Review the comprehensive test suite for edge cases