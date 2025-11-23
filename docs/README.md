# Chronia Documentation

Welcome to the Chronia documentation! This comprehensive guide covers everything you need to know about using and contributing to Chronia, a modern TypeScript date/time utility library.

---

## What is Chronia?

Chronia is a modern, lightweight TypeScript date/time utility library with comprehensive formatting, parsing, and manipulation capabilities. It provides:

- 🚀 **TypeScript-first** – Strict typings with TypeScript 5.9+
- 📦 **Lightweight** – ESM/CJS dual modules, fully tree-shakable
- 🌍 **Internationalization** – Built-in locale support
- 📅 **Comprehensive Utilities** – 60+ functions for date operations
- 🎯 **Consistent API** – Unified support for `Date` objects and timestamps
- ✅ **Safe Error Handling** – No exceptions; graceful degradation
- ⚡ **Well-tested** – 2100+ automated test cases

---

## Documentation Navigation

### For Users

<table>
<tr>
<td width="50%">

**Getting Started**
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Core Concepts](#core-concepts)

**Function Reference**
- [Function Categories](#function-categories)
- [Browse by Category](#browse-functions-by-category)
- [Common Use Cases](#common-use-cases)

</td>
<td width="50%">

**Advanced Topics**
- [Internationalization](#internationalization)
- [Performance Tips](#performance-tips)
- [Migration Guide](#migration-guide)

**API Reference**
- [Type Definitions](#type-definitions)
- [Error Handling](#error-handling)

</td>
</tr>
</table>

### For Contributors

<table>
<tr>
<td width="50%">

**Development Guidelines**
- [Guidelines Overview](./guidelines/)
- [Function Design](./guidelines/function-design.md)
- [Function Implementation](./guidelines/function-implementation.md)
- [Function Testing](./guidelines/function-testing.md)

</td>
<td width="50%">

**Documentation Standards**
- [Function Documentation](./guidelines/documentation-function.md)
- [Category Documentation](./guidelines/documentation-category.md)
- [Quality Checks](./guidelines/function-check.md)

</td>
</tr>
</table>

---

## Installation

Chronia requires **Node.js v18 or higher**.

```bash
# Using pnpm (recommended)
pnpm add chronia

# Using npm
npm install chronia

# Using yarn
yarn add chronia
```

---

## Quick Start

### Basic Usage

```typescript
import { format, addDays, isBefore } from 'chronia';

// Format dates
const today = new Date();
format(today, 'yyyy-MM-dd');  // '2025-01-23'

// Date arithmetic
const nextWeek = addDays(today, 7);

// Date comparison
isBefore(today, nextWeek);  // true
```

### Working with Timestamps

Chronia functions accept both `Date` objects and numeric timestamps:

```typescript
import { isValid, getYear } from 'chronia';

// Date object
isValid(new Date(2025, 0, 1));     // true

// Timestamp
isValid(1704067200000);             // true
getYear(1704067200000);             // 2025
```

### Error Handling

Chronia never throws exceptions. Invalid inputs return predictable values:

```typescript
import { isValid, getYear, addDays } from 'chronia';

// Validation functions return false
isValid(new Date('invalid'));       // false
isValid(NaN);                       // false

// Accessor functions return NaN
getYear(NaN);                       // NaN

// Transformation functions return Invalid Date
const result = addDays(NaN, 5);
isValid(result);                    // false
```

---

## Core Concepts

### Type Flexibility

All Chronia functions accept `Date | number` for date parameters:

```typescript
function isValid(date: Date | number): boolean;
function format(date: Date | number, pattern: string): string;
function addDays(date: Date | number, amount: number): Date;
```

This provides flexibility while maintaining type safety.

### Immutability

Transformation functions always return new Date objects:

```typescript
const original = new Date(2025, 0, 1);
const modified = addDays(original, 5);

original.getTime() !== modified.getTime();  // true - original unchanged
```

### Options Pattern

Functions with configurable behavior use an options parameter:

```typescript
import { isBefore } from 'chronia';

const morning = new Date(2025, 0, 1, 9, 0);
const evening = new Date(2025, 0, 1, 17, 0);

// Default: millisecond precision
isBefore(morning, evening);              // true

// Custom: day precision
isBefore(morning, evening, { unit: 'day' });  // false (same day)
```

---

## Function Categories

Chronia organizes its 60+ functions into 11 logical categories:

### [Validations](./functions/validations/)
Validate dates and compare date values
- `isValid`, `isBefore`, `isAfter`, `isEqual`, `isSameDay`, etc.
- **Use for**: Input validation, date comparisons, chronological ordering

### [Accessors](./functions/accessors/)
Extract components from dates
- `getYear`, `getMonth`, `getDay`, `getHours`, etc.
- **Use for**: Reading date components, extracting values

### [Arithmetic](./functions/arithmetic/)
Add, subtract, and calculate date differences
- `addYears`, `addMonths`, `addDays`, `subHours`, `diffDays`, etc.
- **Use for**: Date calculations, scheduling, time intervals

### [Boundaries](./functions/boundaries/)
Get start/end of time periods
- `startOfDay`, `endOfMonth`, `startOfYear`, etc.
- **Use for**: Date ranges, period boundaries, calendar operations

### [Comparisons](./functions/comparisons/)
Compare and sort dates
- `max`, `min`, `compare`, `clamp`
- **Use for**: Finding earliest/latest dates, sorting, range validation

### [Formatting](./functions/formatting/)
Convert dates to strings
- `format` with customizable patterns
- **Use for**: Display formatting, localization, string conversion

### [Parsing](./functions/parsing/)
Convert strings to dates
- `parse` with pattern matching
- **Use for**: User input parsing, string-to-date conversion

### [Mutators](./functions/mutators/)
Set date components (immutably)
- `setYear`, `setMonth`, `setDay`, `setHours`, etc.
- **Use for**: Creating dates with specific components

### [Truncations](./functions/truncations/)
Truncate dates to specific units
- `truncToYear`, `truncToMonth`, `truncToDay`, etc.
- **Use for**: Date normalization, grouping by period

### [Utilities](./functions/utilities/)
Utility functions
- `now` - Get current timestamp
- **Use for**: Current time, testing, timestamps

### [Comparisons (Advanced)](./functions/comparisons/)
Utility functions for date comparison
- `max`, `min`, `compare`, `clamp`
- **Use for**: Array operations, sorting, range operations

---

## Browse Functions by Category

<table>
<tr>
<td width="33%">

**Basic Operations**
- [Validations →](./functions/validations/)
- [Accessors →](./functions/accessors/)
- [Utilities →](./functions/utilities/)

</td>
<td width="33%">

**Date Manipulation**
- [Arithmetic →](./functions/arithmetic/)
- [Mutators →](./functions/mutators/)
- [Truncations →](./functions/truncations/)

</td>
<td width="33%">

**Advanced Features**
- [Formatting →](./functions/formatting/)
- [Parsing →](./functions/parsing/)
- [Boundaries →](./functions/boundaries/)
- [Comparisons →](./functions/comparisons/)

</td>
</tr>
</table>

---

## Common Use Cases

### Input Validation

```typescript
import { isValid } from 'chronia';

function processDate(input: string): Date | null {
  const date = new Date(input);
  return isValid(date) ? date : null;
}
```

### Date Formatting

```typescript
import { format } from 'chronia';

const date = new Date(2025, 0, 23);
format(date, 'yyyy-MM-dd');           // '2025-01-23'
format(date, 'MMMM d, yyyy');         // 'January 23, 2025'
format(date, 'MMM d, yyyy HH:mm');    // 'Jan 23, 2025 00:00'
```

### Date Arithmetic

```typescript
import { addDays, addMonths, diffDays } from 'chronia';

const today = new Date(2025, 0, 23);
const nextWeek = addDays(today, 7);
const nextMonth = addMonths(today, 1);

diffDays(today, nextWeek);  // 7
```

### Date Comparison

```typescript
import { isBefore, isAfter, isSameDay } from 'chronia';

const date1 = new Date(2025, 0, 1);
const date2 = new Date(2025, 0, 15);

isBefore(date1, date2);     // true
isAfter(date1, date2);      // false
isSameDay(date1, date2);    // false
```

### Date Ranges

```typescript
import { startOfMonth, endOfMonth } from 'chronia';

const date = new Date(2025, 0, 15);
const monthStart = startOfMonth(date);  // 2025-01-01 00:00:00
const monthEnd = endOfMonth(date);      // 2025-01-31 23:59:59
```

### Sorting Dates

```typescript
import { compare, max, min } from 'chronia';

const dates = [
  new Date(2025, 0, 15),
  new Date(2025, 0, 1),
  new Date(2025, 0, 30)
];

dates.sort(compare);          // Sort chronologically
const latest = max(dates);    // 2025-01-30
const earliest = min(dates);  // 2025-01-01
```

---

## Internationalization

Chronia supports localization for formatting and parsing:

```typescript
import { format } from 'chronia';

const date = new Date(2025, 0, 23);

// English (default)
format(date, 'MMMM d, yyyy');  // 'January 23, 2025'

// Japanese
format(date, 'yyyy年M月d日', { locale: 'ja' });  // '2025年1月23日'
```

**Supported Locales**:
- `en` - English (default)
- `ja` - Japanese

---

## Performance Tips

### Use Timestamps for Performance-Critical Code

Timestamps are faster than Date objects:

```typescript
// Faster
isValid(1704067200000);

// Slower (creates Date object internally)
isValid(new Date(2025, 0, 1));
```

### Choose Appropriate Comparison Units

Millisecond comparisons are fastest:

```typescript
// Fastest - millisecond comparison
isBefore(date1, date2);

// Slower - requires truncation
isBefore(date1, date2, { unit: 'day' });
```

### Avoid Repeated Date Conversions

Cache converted values when possible:

```typescript
// Less efficient
for (const event of events) {
  if (isBefore(event.date, new Date())) {
    // Process past event
  }
}

// More efficient
const now = new Date();
for (const event of events) {
  if (isBefore(event.date, now)) {
    // Process past event
  }
}
```

---

## Type Definitions

### Core Types

```typescript
type TimeUnit = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond';
type Locale = 'en' | 'ja';

interface ComparisonOptions {
  unit?: TimeUnit;
}

interface FormatOptions {
  locale?: Locale;
}
```

### Function Signatures

All date functions follow consistent patterns:

```typescript
// Validation functions return boolean
function isValid(date: Date | number): boolean;

// Accessor functions return number (or NaN for invalid input)
function getYear(date: Date | number): number;

// Transformation functions return Date
function addDays(date: Date | number, amount: number): Date;

// Comparison functions return boolean
function isBefore(a: Date | number, b: Date | number, options?: ComparisonOptions): boolean;
```

---

## Error Handling

### Error Handling Philosophy

Chronia follows a **no-exceptions** philosophy:

- **Validation functions** return `false` for invalid input
- **Accessor functions** return `NaN` for invalid input
- **Transformation functions** return `Invalid Date` for invalid input

### Handling Invalid Inputs

```typescript
import { isValid, getYear, addDays } from 'chronia';

// Always validate before processing
const date = new Date(userInput);
if (!isValid(date)) {
  console.error('Invalid date provided');
  return;
}

// Safe to use
const year = getYear(date);
const nextWeek = addDays(date, 7);
```

---

## Migration Guide

### From date-fns

```typescript
// date-fns
import { format, addDays, isBefore } from 'date-fns';

// Chronia (same API)
import { format, addDays, isBefore } from 'chronia';
```

### From moment.js

```typescript
// moment.js
moment(date).format('YYYY-MM-DD');
moment(date).add(7, 'days');

// Chronia
format(date, 'yyyy-MM-dd');
addDays(date, 7);
```

### From Day.js

```typescript
// Day.js
dayjs(date).format('YYYY-MM-DD');
dayjs(date).add(7, 'day');

// Chronia
format(date, 'yyyy-MM-dd');
addDays(date, 7);
```

---

## Contributing

We welcome contributions! Whether you're fixing bugs, adding features, or improving documentation, please read our development guidelines.

### Development Guidelines

All contributions must follow our comprehensive guidelines:

1. **[Guidelines Overview](./guidelines/)** - Start here
2. **[Function Design](./guidelines/function-design.md)** - API design principles
3. **[Function Implementation](./guidelines/function-implementation.md)** - Implementation patterns
4. **[Function Testing](./guidelines/function-testing.md)** - Testing standards (TDD + PBT)
5. **[Function Check](./guidelines/function-check.md)** - Quality checks
6. **[Documentation Standards](./guidelines/documentation-function.md)** - Documentation requirements

### Development Workflow

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run property-based tests
pnpm test:pbt

# Lint code
pnpm lint

# Lint documentation
pnpm lint:docs

# Build
pnpm build
```

### Contribution Process

1. **Fork the repository**
2. **Create a feature branch**
3. **Follow the 5-phase development workflow**:
   - Phase 1: Design (function interfaces)
   - Phase 2: Implementation & Testing (TDD + PBT)
   - Phase 3: Quality Check (lint, test, build)
   - Phase 4: Documentation (function + category docs)
   - Phase 5: Commit & PR
4. **Submit a pull request**

See [CLAUDE.md](../CLAUDE.md) for detailed workflow instructions.

---

## Project Structure

```
chronia/
├── src/                    # Source code
│   ├── <function>/         # Each function in its own directory
│   │   └── index.ts
│   └── types.ts            # Type definitions
├── tests/                  # TDD tests (Vitest)
├── .kiro/spec/            # Specifications and PBT tests
├── docs/                   # Documentation (you are here!)
│   ├── functions/          # Function documentation by category
│   │   ├── validations/
│   │   ├── accessors/
│   │   ├── arithmetic/
│   │   └── ...
│   └── guidelines/         # Development guidelines
└── dist/                   # Build output
```

---

## Resources

### Links

- **GitHub Repository**: [github.com/t0k0sh1/chronia](https://github.com/t0k0sh1/chronia)
- **npm Package**: [npmjs.com/package/chronia](https://www.npmjs.com/package/chronia)
- **Issues**: [github.com/t0k0sh1/chronia/issues](https://github.com/t0k0sh1/chronia/issues)
- **Changelog**: [CHANGELOG.md](../CHANGELOG.md)

### Community

- Report bugs via [GitHub Issues](https://github.com/t0k0sh1/chronia/issues)
- Contribute via [Pull Requests](https://github.com/t0k0sh1/chronia/pulls)

---

## License

Chronia is [MIT licensed](../LICENSE).

---

## Acknowledgments

Chronia is inspired by excellent date libraries like date-fns, moment.js, and Day.js. We thank the JavaScript community for their continued innovation in date/time handling.

---

**Happy coding with Chronia! 📅**
