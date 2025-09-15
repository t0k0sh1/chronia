# Chronia

[![npm version](https://badge.fury.io/js/chronia.svg)](https://badge.fury.io/js/chronia)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, lightweight TypeScript date/time utility library with comprehensive formatting, parsing, and manipulation capabilities.

## Features

- 🚀 **Modern TypeScript** - Built with TypeScript 5.9+ for excellent type safety
- 📦 **Lightweight** - Tree-shakable ESM/CJS dual module support
- 🌍 **Internationalization** - Built-in locale support (English, Japanese)
- 🎯 **Unicode Patterns** - Standard Unicode date format patterns
- ⚡ **Fast & Reliable** - Extensively tested with 1300+ test cases
- 🔧 **Date Arithmetic** - Add/subtract days, months, years, hours, minutes, seconds
- 📅 **Formatting** - Flexible date formatting with Unicode tokens
- 🔍 **Parsing** - Robust date string parsing with error handling
- 📊 **Comparison** - Date comparison utilities (before, after, equal)
- ✅ **Validation** - Date validation and component extraction

## Installation

```bash
npm install chronia
```

## Quick Start

```typescript
import { format, parse, addDays, isAfter } from 'chronia';

// Format dates
const date = new Date(2024, 0, 15, 14, 30, 0);
format(date, 'yyyy-MM-dd HH:mm:ss'); // "2024-01-15 14:30:00"
format(date, 'EEEE, MMMM do'); // "Monday, January 15th"

// Parse date strings
const parsed = parse('2024-01-15', 'yyyy-MM-dd');
const withTime = parse('15/01/2024 14:30', 'dd/MM/yyyy HH:mm');

// Date arithmetic
const tomorrow = addDays(date, 1);
const nextWeek = addDays(date, 7);

// Date comparisons
isAfter(tomorrow, date); // true
```

## Core Functions

### Formatting

Format dates using Unicode date format patterns:

```typescript
import { format } from 'chronia';

const date = new Date(2024, 0, 15, 14, 30, 45, 123);

// Basic patterns
format(date, 'yyyy-MM-dd');           // "2024-01-15"
format(date, 'dd/MM/yyyy');           // "15/01/2024"
format(date, 'MM/dd/yyyy');           // "01/15/2024"

// Time patterns
format(date, 'HH:mm:ss');            // "14:30:45"
format(date, 'h:mm:ss a');           // "2:30:45 PM"
format(date, 'HH:mm:ss.SSS');        // "14:30:45.123"

// Combined patterns
format(date, 'yyyy-MM-dd HH:mm:ss'); // "2024-01-15 14:30:45"
format(date, 'EEEE, MMMM do, yyyy'); // "Monday, January 15th, 2024"

// Literals and custom text
format(date, "'Today is' EEEE");     // "Today is Monday"
format(date, 'yyyy年MM月dd日');        // "2024年01月15日"
```

#### Format Tokens

| Pattern | Description | Example |
|---------|-------------|---------|
| `y` | Year (variable) | 1, 12, 123, 2024 |
| `yy` | Year (2-digit) | 01, 99, 24 |
| `yyyy` | Year (4-digit) | 0001, 2024 |
| `M` | Month | 1, 12 |
| `MM` | Month (2-digit) | 01, 12 |
| `MMM` | Month (short) | Jan, Dec |
| `MMMM` | Month (full) | January, December |
| `d` | Day | 1, 31 |
| `dd` | Day (2-digit) | 01, 31 |
| `H` | Hour (0-23) | 0, 23 |
| `HH` | Hour (2-digit, 0-23) | 00, 23 |
| `h` | Hour (1-12) | 1, 12 |
| `hh` | Hour (2-digit, 1-12) | 01, 12 |
| `m` | Minute | 0, 59 |
| `mm` | Minute (2-digit) | 00, 59 |
| `s` | Second | 0, 59 |
| `ss` | Second (2-digit) | 00, 59 |
| `S` | Millisecond (1-digit) | 1, 9 |
| `SS` | Millisecond (2-digit) | 12, 99 |
| `SSS` | Millisecond (3-digit) | 123, 999 |
| `a` | AM/PM | AM, PM |
| `E`, `EE`, `EEE` | Weekday (short) | Mon, Tue |
| `EEEE` | Weekday (full) | Monday, Tuesday |
| `D` | Day of year | 1, 365 |
| `DD` | Day of year (2-digit) | 01, 365 |
| `DDD` | Day of year (3-digit) | 001, 365 |
| `G` | Era | AD, BC |

### Parsing

Parse date strings using the same format patterns:

```typescript
import { parse } from 'chronia';

// Basic parsing
parse('2024-01-15', 'yyyy-MM-dd');
parse('15/01/2024', 'dd/MM/yyyy');
parse('Jan 15, 2024', 'MMM dd, yyyy');

// Time parsing
parse('14:30:45', 'HH:mm:ss');
parse('2:30 PM', 'h:mm a');

// Combined date and time
parse('2024-01-15 14:30:45', 'yyyy-MM-dd HH:mm:ss');
parse('15/01/2024 2:30 PM', 'dd/MM/yyyy h:mm a');

// With reference date for missing components
const refDate = new Date(2023, 5, 10); // June 10, 2023
parse('14:30', 'HH:mm', { referenceDate: refDate }); // June 10, 2023 14:30

// Error handling
const invalid = parse('invalid-date', 'yyyy-MM-dd');
console.log(isNaN(invalid.getTime())); // true
```

### Date Arithmetic

Add or subtract time units:

```typescript
import {
  addDays, addMonths, addYears, addHours, addMinutes, addSeconds, addMilliseconds,
  subDays, subMonths, subYears, subHours, subMinutes, subSeconds, subMilliseconds
} from 'chronia';

const date = new Date(2024, 0, 15);

// Add time units
addDays(date, 7);        // Add 7 days
addMonths(date, 3);      // Add 3 months
addYears(date, 1);       // Add 1 year
addHours(date, 5);       // Add 5 hours
addMinutes(date, 30);    // Add 30 minutes
addSeconds(date, 45);    // Add 45 seconds

// Subtract time units
subDays(date, 7);        // Subtract 7 days
subMonths(date, 3);      // Subtract 3 months
subYears(date, 1);       // Subtract 1 year
subHours(date, 5);       // Subtract 5 hours
subMinutes(date, 30);    // Subtract 30 minutes
subSeconds(date, 45);    // Subtract 45 seconds
```

### Date Comparison

Compare dates with intuitive functions:

```typescript
import { isAfter, isBefore, isEqual, isAfterOrEqual, isBeforeOrEqual } from 'chronia';

const date1 = new Date(2024, 0, 15);
const date2 = new Date(2024, 0, 20);

isAfter(date2, date1);        // true
isBefore(date1, date2);       // true
isEqual(date1, date1);        // true
isAfterOrEqual(date2, date1); // true
isBeforeOrEqual(date1, date2); // true
```

### Date Component Extraction

Extract specific components from dates:

```typescript
import { getYear, getMonth, getDay, getHours, getMinutes, getSeconds, getMilliseconds } from 'chronia';

const date = new Date(2024, 0, 15, 14, 30, 45, 123);

getYear(date);         // 2024
getMonth(date);        // 0 (January)
getDay(date);          // 15
getHours(date);        // 14
getMinutes(date);      // 30
getSeconds(date);      // 45
getMilliseconds(date); // 123
```

### Date Validation

```typescript
import { isValid } from 'chronia';

isValid(new Date(2024, 0, 15)); // true
isValid(new Date('invalid'));   // false
isValid(new Date(NaN));         // false
```

## Internationalization

Chronia supports locale-specific formatting and parsing:

```typescript
import { format, parse } from 'chronia';
import { enUS } from 'chronia/locale/en-US';
import { ja } from 'chronia/locale/ja';

const date = new Date(2024, 0, 15);

// English
format(date, 'EEEE, MMMM do', enUS); // "Monday, January 15th"
parse('January 15, 2024', 'MMMM dd, yyyy', { localize: enUS });

// Japanese
format(date, 'EEEE, MMMM do', ja); // "月曜日, 1月 15日"
parse('月曜日, 1月 15日', 'EEEE, MMMM do', { localize: ja });
```

### Available Locales

- `en-US` - English (United States)
- `ja` - Japanese

## TypeScript Support

Chronia is built with TypeScript and provides excellent type safety:

```typescript
import { format, parse, addDays, Localize } from 'chronia';

// All functions are fully typed
const date: Date = new Date();
const formatted: string = format(date, 'yyyy-MM-dd');
const parsed: Date = parse('2024-01-15', 'yyyy-MM-dd');
const future: Date = addDays(date, 7);

// Custom localization
const customLocale: Localize = {
  era: (era, options) => era ? 'CE' : 'BCE',
  month: (month, options) => `Month ${month + 1}`,
  weekday: (weekday, options) => `Day ${weekday}`,
  dayPeriod: (period, options) => period === 'am' ? 'Morning' : 'Evening'
};
```

## Browser Support

- Modern browsers with ES2020 support
- Node.js 18+
- TypeScript 5.0+

## Bundle Size

Chronia is designed to be lightweight and tree-shakable:

- Core library: ~30KB (minified)
- Individual functions can be imported to reduce bundle size
- ESM and CJS builds available

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass: `npm test`
5. Run linting: `npm run lint`
6. Submit a pull request

## API Reference

For detailed API documentation with examples, visit our [TypeDoc documentation](https://t0k0sh1.github.io/chronia/).

---

Made with ❤️ by [Takashi Yamashina](https://github.com/t0k0sh1)