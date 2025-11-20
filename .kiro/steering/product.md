# Product Overview

Chronia is a modern, lightweight TypeScript date/time utility library that provides a predictable alternative to the native JavaScript `Date` object. It serves JavaScript and TypeScript developers who need reliable date manipulation with strong type safety.

## Core Capabilities

- **Formatting & Parsing** - Convert between Date objects and strings using Unicode tokens (70+ token combinations)
- **Date Arithmetic** - Add/subtract time units (years, months, days, hours, minutes, seconds, milliseconds) with fractional truncation
- **Date Comparison** - Compare dates with relational operators (before/after) and check equality at various granularities (same year/month/day/hour/minute/second)
- **Date Ranges & Differences** - Calculate differences between dates in specific units, check if dates fall within ranges
- **Boundary & Truncation** - Get start/end of time periods (year/month/day) and zero out components below a specified unit

## Target Use Cases

- **Date Formatting** - Display dates in user-friendly formats for UI (ISO 8601, localized formats, custom patterns)
- **Date Validation** - Check date validity without exceptions (consistent error handling via return values)
- **Date Calculations** - Business logic requiring date arithmetic (due dates, scheduling, time tracking)
- **Internationalization** - Localized date formatting for multi-language applications (built-in English/Japanese, extensible)

## Value Proposition

- **No-exceptions Policy** - All errors indicated by return values (`Invalid Date`, `NaN`, `false`), eliminating try-catch overhead
- **TypeScript-first Design** - Strict typing with TypeScript 5.9+, full inference support
- **Tree-shakable Architecture** - Function-per-file structure enables aggressive bundle size optimization
- **Comprehensive Testing** - 2100+ test cases ensure reliability across edge cases
- **Consistent API** - Unified support for both Date objects and numeric timestamps across all functions

---
_Generated from codebase: 2025-11-20_
