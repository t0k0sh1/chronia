# Quickstart: Compare Function Implementation

## Overview
This guide demonstrates how to use the compare() utility function for chronological comparison and sorting of Date objects.

## Installation
```bash
npm install chronia
```

## Basic Usage

### Import
```typescript
import { compare } from 'chronia';
```

### compare() - Date Comparison

#### Basic Comparison (Ascending Order - Default)
```typescript
const date1 = new Date('2024-01-01');
const date2 = new Date('2024-01-02');

const result = compare(date1, date2);
console.log(result); // -1 (date1 is earlier than date2)

const reverseResult = compare(date2, date1);
console.log(reverseResult); // 1 (date2 is later than date1)

const equalResult = compare(date1, date1);
console.log(equalResult); // 0 (dates are equal)
```

#### Descending Order Comparison
```typescript
const date1 = new Date('2024-01-01');
const date2 = new Date('2024-01-02');

const result = compare(date1, date2, 'DESC');
console.log(result); // 1 (for descending order, earlier date ranks higher)

const reverseResult = compare(date2, date1, 'DESC');
console.log(reverseResult); // -1 (for descending order, later date ranks lower)
```

#### Explicit Ascending Order
```typescript
const date1 = new Date('2024-01-01');
const date2 = new Date('2024-01-02');

const result = compare(date1, date2, 'ASC');
console.log(result); // -1 (same as default behavior)
```

## Common Use Cases

### Array Sorting

#### Sort Dates in Ascending Order (Chronological)
```typescript
const dates = [
  new Date('2024-01-03'),
  new Date('2024-01-01'),
  new Date('2024-01-02')
];

// Using default ascending order
dates.sort(compare);
console.log(dates);
// [2024-01-01, 2024-01-02, 2024-01-03]

// Using explicit ascending order
dates.sort((a, b) => compare(a, b, 'ASC'));
console.log(dates);
// [2024-01-01, 2024-01-02, 2024-01-03]
```

#### Sort Dates in Descending Order (Reverse Chronological)
```typescript
const dates = [
  new Date('2024-01-01'),
  new Date('2024-01-03'),
  new Date('2024-01-02')
];

dates.sort((a, b) => compare(a, b, 'DESC'));
console.log(dates);
// [2024-01-03, 2024-01-02, 2024-01-01]
```

### Event Timeline Management
```typescript
interface Event {
  name: string;
  timestamp: Date;
}

const events: Event[] = [
  { name: 'Meeting Start', timestamp: new Date('2024-01-01T14:00:00Z') },
  { name: 'Lunch Break', timestamp: new Date('2024-01-01T12:00:00Z') },
  { name: 'Project Deadline', timestamp: new Date('2024-01-01T17:00:00Z') }
];

// Sort events chronologically
events.sort((a, b) => compare(a.timestamp, b.timestamp));
console.log(events);
// [Lunch Break, Meeting Start, Project Deadline]

// Sort events in reverse chronological order
events.sort((a, b) => compare(a.timestamp, b.timestamp, 'DESC'));
console.log(events);
// [Project Deadline, Meeting Start, Lunch Break]
```

### Date Range Validation
```typescript
function isDateInRange(date: Date, startDate: Date, endDate: Date): boolean {
  return compare(date, startDate) >= 0 && compare(date, endDate) <= 0;
}

const checkDate = new Date('2024-01-15');
const rangeStart = new Date('2024-01-01');
const rangeEnd = new Date('2024-01-31');

console.log(isDateInRange(checkDate, rangeStart, rangeEnd)); // true
```

### Finding Earliest/Latest Dates
```typescript
function findEarliestDate(dates: Date[]): Date {
  return dates.reduce((earliest, current) =>
    compare(current, earliest) < 0 ? current : earliest
  );
}

function findLatestDate(dates: Date[]): Date {
  return dates.reduce((latest, current) =>
    compare(current, latest) > 0 ? current : latest
  );
}

const dates = [
  new Date('2024-01-15'),
  new Date('2024-01-05'),
  new Date('2024-01-25')
];

console.log(findEarliestDate(dates)); // 2024-01-05
console.log(findLatestDate(dates)); // 2024-01-25
```

## Advanced Usage

### Custom Sorting with Additional Criteria
```typescript
interface Task {
  title: string;
  dueDate: Date;
  priority: number;
}

const tasks: Task[] = [
  { title: 'Task A', dueDate: new Date('2024-01-01'), priority: 2 },
  { title: 'Task B', dueDate: new Date('2024-01-01'), priority: 1 },
  { title: 'Task C', dueDate: new Date('2024-01-02'), priority: 3 }
];

// Sort by due date first, then by priority
tasks.sort((a, b) => {
  const dateComparison = compare(a.dueDate, b.dueDate);
  if (dateComparison !== 0) {
    return dateComparison;
  }
  return a.priority - b.priority; // Secondary sort by priority
});

console.log(tasks);
// [Task B (Jan 1, priority 1), Task A (Jan 1, priority 2), Task C (Jan 2, priority 3)]
```

### Date Grouping
```typescript
function groupDatesByDay(dates: Date[]): Map<string, Date[]> {
  const groups = new Map<string, Date[]>();

  // Sort dates first for consistent grouping
  const sortedDates = [...dates].sort(compare);

  for (const date of sortedDates) {
    const dayKey = date.toDateString();
    if (!groups.has(dayKey)) {
      groups.set(dayKey, []);
    }
    groups.get(dayKey)!.push(date);
  }

  return groups;
}

const dates = [
  new Date('2024-01-01T10:00:00Z'),
  new Date('2024-01-01T15:00:00Z'),
  new Date('2024-01-02T09:00:00Z')
];

const grouped = groupDatesByDay(dates);
console.log(grouped);
// Map {
//   'Mon Jan 01 2024' => [10:00, 15:00],
//   'Tue Jan 02 2024' => [09:00]
// }
```

## Error Handling

### Validation Examples
```typescript
// Check for valid Date objects before comparison
function safeCompare(date1: any, date2: any, order?: 'ASC' | 'DESC'): number {
  try {
    return compare(date1, date2, order);
  } catch (error) {
    if (error instanceof RangeError) {
      console.error('Invalid date comparison:', error.message);
      throw error;
    }
    throw error;
  }
}

// Example error cases
try {
  compare(null as any, new Date()); // RangeError: First argument must be a Date object
} catch (error) {
  console.error(error.message);
}

try {
  compare(new Date('invalid'), new Date()); // RangeError: First date is invalid
} catch (error) {
  console.error(error.message);
}

try {
  compare(new Date(), new Date(), 'INVALID' as any); // RangeError: Order must be 'ASC' or 'DESC'
} catch (error) {
  console.error(error.message);
}
```

### Safe Comparison Wrapper
```typescript
function safeSort(dates: Date[], order: 'ASC' | 'DESC' = 'ASC'): Date[] {
  // Validate all dates first
  for (let i = 0; i < dates.length; i++) {
    if (!(dates[i] instanceof Date)) {
      throw new RangeError(`Element at index ${i} is not a Date object`);
    }
    if (isNaN(dates[i].getTime())) {
      throw new RangeError(`Element at index ${i} is an invalid Date`);
    }
  }

  // Perform safe sort
  return [...dates].sort((a, b) => compare(a, b, order));
}

const dates = [
  new Date('2024-01-03'),
  new Date('2024-01-01'),
  new Date('2024-01-02')
];

const sorted = safeSort(dates, 'ASC');
console.log(sorted); // [2024-01-01, 2024-01-02, 2024-01-03]
```

## TypeScript Support

Full TypeScript support with proper type definitions:

```typescript
import { compare } from 'chronia';

// Type-safe usage
const date1: Date = new Date('2024-01-01');
const date2: Date = new Date('2024-01-02');
const order: 'ASC' | 'DESC' = 'ASC';

const result: number = compare(date1, date2, order);

// Type checking prevents invalid order values
// compare(date1, date2, 'INVALID'); // TypeScript error

// Generic sorting function with type safety
function sortDates<T>(
  items: T[],
  getDate: (item: T) => Date,
  order: 'ASC' | 'DESC' = 'ASC'
): T[] {
  return [...items].sort((a, b) => compare(getDate(a), getDate(b), order));
}

interface BlogPost {
  title: string;
  publishedAt: Date;
}

const posts: BlogPost[] = [
  { title: 'Post 1', publishedAt: new Date('2024-01-02') },
  { title: 'Post 2', publishedAt: new Date('2024-01-01') }
];

const sortedPosts = sortDates(posts, post => post.publishedAt, 'DESC');
```

## Performance Considerations

### Efficient Large Dataset Sorting
```typescript
// For large datasets, consider pre-validation
function performantDateSort(dates: Date[], order: 'ASC' | 'DESC' = 'ASC'): Date[] {
  // Pre-validate to avoid repeated checks during sorting
  dates.forEach((date, index) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new RangeError(`Invalid date at index ${index}`);
    }
  });

  // Use efficient comparison
  return [...dates].sort((a, b) => {
    const result = a.getTime() - b.getTime();
    return order === 'DESC' ? -result : result;
  });
}

// Benchmark comparison
const largeDateSet = Array.from({length: 10000}, () =>
  new Date(Math.random() * 1000000000000)
);

console.time('compare function');
largeDateSet.sort(compare);
console.timeEnd('compare function');

console.time('optimized sorting');
performantDateSort(largeDateSet);
console.timeEnd('optimized sorting');
```

## Validation Tests

Run these examples to verify the implementation:

```typescript
// Test 1: Basic ascending comparison
const date1 = new Date('2024-01-01');
const date2 = new Date('2024-01-02');
console.assert(compare(date1, date2) === -1, 'Earlier date should return -1');
console.assert(compare(date2, date1) === 1, 'Later date should return 1');
console.assert(compare(date1, date1) === 0, 'Equal dates should return 0');

// Test 2: Descending comparison
console.assert(compare(date1, date2, 'DESC') === 1, 'DESC order should reverse result');
console.assert(compare(date2, date1, 'DESC') === -1, 'DESC order should reverse result');

// Test 3: Array.sort() compatibility
const dates = [
  new Date('2024-01-03'),
  new Date('2024-01-01'),
  new Date('2024-01-02')
];
dates.sort(compare);
console.assert(dates[0].getTime() === new Date('2024-01-01').getTime(), 'Sort should work correctly');

// Test 4: Error handling
let errorThrown = false;
try {
  compare(null as any, new Date());
} catch (error) {
  errorThrown = error instanceof RangeError;
}
console.assert(errorThrown, 'Should throw RangeError for invalid arguments');

console.log('All validation tests passed!');
```

## Migration from Direct Date Comparison

### From Direct Comparison
```typescript
// Old approach (unreliable)
const dates = [date3, date1, date2];
dates.sort((a, b) => a - b); // Type coercion issues

// New approach (reliable)
dates.sort(compare);
```

### From Custom Comparison Functions
```typescript
// Old approach (manual implementation)
function compareOld(a: Date, b: Date): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

// New approach (standardized with order support)
// Replace compareOld with compare function
dates.sort(compare);
// Or with explicit order
dates.sort((a, b) => compare(a, b, 'DESC'));
```

## Next Steps

- Explore other chronia date utilities for more advanced date operations
- Check out date arithmetic functions for date manipulation
- Review the comprehensive test suite for additional edge cases