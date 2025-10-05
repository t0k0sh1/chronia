<h1 align="center"><img width="550" src="./docs/logo.png" alt="Chronia" /></h1>

![npm version](https://badge.fury.io/js/chronia.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/t0k0sh1/chronia/ci.yaml)
![snyk](https://snyk.io/test/github/t0k0sh1/chronia/badge.svg)
![Bundle size](https://badgen.net/bundlephobia/minzip/chronia)
![Node Current](https://img.shields.io/node/v/chronia)
![NPM Downloads](https://img.shields.io/npm/dm/chronia)

A modern, lightweight TypeScript date/time utility library with comprehensive formatting, parsing, and manipulation capabilities.

> **Note**
> This library is currently in the **v0.1.x** stage.
> Breaking changes may occur at any time without prior notice.
> A stable API will be introduced starting from v1.0.0

## Overview

Chronia is a modern date and time utility library for JavaScript and TypeScript.
It offers a simple, consistent, and functional API that makes working with dates and times more predictable than the native `Date` object.

### Key Features

- 🚀 **TypeScript-first** – Strict typings with TypeScript 5.9+
- 📦 **Lightweight** – ESM/CJS dual modules, fully tree-shakable
- 🌍 **Internationalization** – Built-in locale support (English, Japanese)
- 📅 **Comprehensive Utilities** – Formatting, parsing, arithmetic, comparison, ranges, differences
- 🎯 **Consistent API** – Unified support for `Date` objects and timestamps
- ✅ **Safe Error Handling** – No exceptions; standardized values (`Invalid Date`, `NaN`, `false`)
- ⚡ **Well-tested** – 1700+ automated test cases ensure reliability

## Installation

Chronia requires **Node.js v18 or higher**.

```bash
# Using npm
npm install chronia

# Using yarn
yarn add chronia

# Using pnpm
pnpm add chronia
```

## Quick Start

```typescript
import { now, format, addDays, isAfter } from "chronia";

// Get the current time
const current = now();

// Format dates
console.log(format(current, "yyyy-MM-dd HH:mm:ss"));

// Date arithmetic
const nextWeek = addDays(current, 7);

// Comparison
console.log(isAfter(nextWeek, current)); // true
```

## Core Functions

### Current Time

```typescript
import { now } from "chronia";

const current = now(); // Equivalent to new Date(), but more semantic
```

### Formatting & Parsing

```typescript
import { format, parse } from "chronia";

const date = new Date(2024, 0, 15);

format(date, "yyyy-MM-dd HH:mm:ss"); // "2024-01-15 00:00:00"
parse("2024-01-15", "yyyy-MM-dd"); // Date object
```

Supports standard Unicode tokens. See [API Reference](https://t0k0sh1.github.io/chronia/) for full list.

### Date Arithmetic

```typescript
import { addDays, subMonths } from "chronia";

addDays(new Date(), 7); // +7 days
subMonths(Date.now(), 3); // -3 months (timestamp input also supported)
```

### Comparison

```typescript
import { isAfter, compare } from "chronia";

isAfter(new Date(2025, 0, 1), new Date(2024, 0, 1)); // true

const dates = [new Date(2024, 0, 10), new Date(2024, 0, 20)];
dates.sort(compare); // chronological order
```

### Ranges & Differences

```typescript
import { isBetween, diffDays } from "chronia";

isBetween(new Date(2024, 0, 15), new Date(2024, 0, 10), new Date(2024, 0, 20)); // true
diffDays(new Date(2024, 6, 20), new Date(2024, 0, 15)); // ~186
```

### Utilities

```typescript
import { startOfMonth, getYear, isValid } from "chronia";

startOfMonth(new Date(2024, 5, 15)); // 2024-06-01
getYear(Date.now()); // 2024
isValid(new Date("invalid")); // false
```

⸻

👉 For full API docs and more examples, see the [TypeDoc documentation](https://t0k0sh1.github.io/chronia/).

## Error Handling Policy

- This library **does not use exceptions** for error reporting
- Errors are always indicated by the return value:
  - **Date**: `Invalid Date`
  - **number**: `NaN`
  - **boolean**: `false` (Note: may also indicate a valid negative result; check input validity when needed)
- Use the `isValid` function to detect invalid values for `Date` and `number` results
- This ensures consistent and predictable error handling across all APIs

Example: `isAfter(date1, date2)` returns `false` if `date1` is **before** `date2` (valid),
but also `false` if either input is invalid (error).
Use `isValid()` to distinguish these cases.

## Node.js Version Support Policy

- Support is limited to **LTS releases (even-numbered major versions)** (e.g., v18, v20, v22, v24, ...).
- For LTS versions that have reached end-of-life (EOL), support will continue **as long as the following conditions are not met**:
  - Updates to dependencies become impossible
  - Changes in the Node.js core make it impossible to maintain compatibility
- CI tests must include the latest LTS release, and older LTS releases will be tested as far as reasonably possible

## Versioning and Backward Compatibility Policy

- This library follows **Semantic Versioning (SemVer)**

  - **MAJOR** version (e.g., 1.x → 2.0): Introduced when backward-incompatible changes are made
  - **MINOR** version (e.g., 1.1 → 1.2): Introduced when new features are added while maintaining backward compatibility
  - **PATCH** version (e.g., 1.1.0 → 1.1.1): Introduced for bug fixes or improvements that do not break backward compatibility

- The fundamental policy is to maintain backward compatibility, and **only MAJOR version updates may include breaking changes**
- Any breaking changes must be explicitly documented in the release notes and changelog
- The official release of this library starts from **v1.0.0**
  - Versions in the **0.x.x range are considered beta releases** and do not strictly follow the above rules

## Contributing

1. Fork the repository
2. Create a feature branch
3. Implement your changes with clear commits
4. Add tests for any new functionality
5. Run checks locally:
   - `npm run lint` – ensure code style and quality
   - `npm test` – ensure all tests pass
   - `npm run build` – ensure the project builds successfully
6. Push your branch and open a pull request with a clear description

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for details.

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [Takashi Yamashina](https://github.com/t0k0sh1)
