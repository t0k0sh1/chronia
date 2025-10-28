![Chronia](logo.png)

## Overview

This documentation is specifically designed for AI agents (like Claude, GitHub Copilot, and other AI assistants) working with the Chronia date/time utility library. It provides comprehensive, structured information to help AI agents understand, explain, and correctly implement Chronia functions.

**Chronia** is a TypeScript-first date/time utility library with 70+ functions across 10 categories, following a no-exceptions error handling policy.

## Documentation Structure

This documentation is organized into three main sections:

### 1. Functions

Detailed documentation for all Chronia functions, organized by category:

- **Arithmetic**: Date/time addition and subtraction

  - [Addition](functions/arithmetic/addition.md) - `addYears`, `addMonths`, `addDays`, `addHours`, `addMinutes`, `addSeconds`, `addMilliseconds`
  - [Subtraction](functions/arithmetic/subtraction.md) - `subYears`, `subMonths`, `subDays`, `subHours`, `subMinutes`, `subSeconds`, `subMilliseconds`

- **Comparison**: Date comparison and validation

  - [Relational](functions/comparison/relational.md) - `isAfter`, `isBefore`, `isAfterOrEqual`, `isBeforeOrEqual`, `isBetween`, `compare`
  - [Equality](functions/comparison/equality.md) - `isEqual`, `isSameYear`, `isSameMonth`, `isSameDay`, `isSameHour`, `isSameMinute`, `isSameSecond`
  - [Validation](functions/comparison/validation.md) - `isValid`

- **Difference**: Calculate time differences

  - [Calculations](functions/difference/calculations.md) - `diffYears`, `diffMonths`, `diffDays`, `diffHours`, `diffMinutes`, `diffSeconds`, `diffMilliseconds`

- **Getter**: Extract date components

  - [Extraction](functions/getter/extraction.md) - `getYear`, `getMonth`, `getDay`, `getHours`, `getMinutes`, `getSeconds`, `getMilliseconds`, `getTime`

- **Setter**: Set date components

  - [Modification](functions/setter/modification.md) - `setYear`, `setMonth`, `setDay`, `setHours`, `setMinutes`, `setSeconds`, `setMilliseconds`, `setTime`

- **Boundary**: Period boundaries

  - [Periods](functions/boundary/periods.md) - `startOfYear`, `startOfMonth`, `startOfDay`, `endOfYear`, `endOfMonth`, `endOfDay`

- **Truncation**: Truncate to time units

  - [Units](functions/truncation/units.md) - `truncYear`, `truncMonth`, `truncDay`, `truncHour`, `truncMinute`, `truncSecond`, `truncMillisecond`

- **Formatting**: Format and parse dates

  - [Conversion](functions/formatting/conversion.md) - `format`, `parse`

- **Utility**: Helper functions

  - [Helpers](functions/utility/helpers.md) - `now`, `min`, `max`, `clamp`

- **Constants**: Constants and types
  - [Types](functions/constants/types.md) - `MIN_DATE`, `MAX_DATE`, TypeScript types

### 2. Guidelines

Development principles and technical specifications:

- **[Development Principles](guidelines/development-principles.md)**: Core philosophy and 10 key principles

  - No-exceptions error handling
  - TypeScript type safety with JavaScript compatibility
  - Immutability
  - High-frequency functions only
  - Fractional amount truncation
  - Options parameter pattern
  - Function organization
  - Validation-first approach
  - Performance priorities
  - Local timezone by default

- **[Project Structure](guidelines/project-structure.md)**: Directory layout and architecture

  - File naming conventions
  - Module organization
  - Token system architecture
  - Build output structure
  - Testing structure

- **[Tech Stack](guidelines/tech-stack.md)**: Technologies and tools

  - TypeScript 5.9+
  - Node.js LTS support
  - Build tools (tsup, TypeDoc)
  - Testing (Vitest)
  - Code quality (ESLint)
  - Zero runtime dependencies

- **[Error Handling](guidelines/error-handling.md)**: Error handling patterns

  - Standardized error values (Invalid Date, NaN, false)
  - Error detection patterns
  - Common error scenarios
  - Error handling anti-patterns

- **[Input Validation](guidelines/input-validation.md)**: Validation strategies

  - Validation utilities (`isValidDateOrNumber`, `isValidNumber`)
  - Validation-first implementation pattern
  - Common validation patterns
  - Edge cases

- **[Common Use Cases](guidelines/common-use-cases.md)**: Practical patterns
  - Date arithmetic patterns
  - Formatting and parsing
  - Comparisons and validation
  - Boundary operations
  - Time differences
  - Sorting and ordering
  - Application patterns

### 3. Troubleshooting

Debugging and problem-solving guides:

- **[Common Pitfalls](troubleshooting/common-pitfalls.md)**: 20 common mistakes and solutions

  - Invalid date handling
  - Timezone issues
  - Month indexing
  - Arithmetic edge cases
  - Format/parse issues
  - Immutability assumptions
  - Comparison issues
  - Performance issues
  - Type safety

- **[Debugging Guide](troubleshooting/debugging-guide.md)**: Systematic debugging
  - Debugging checklist
  - Systematic debugging approach
  - Common debugging scenarios
  - Console logging patterns
  - Browser DevTools tips
  - Test-driven debugging
  - Common error messages

## Quick Reference

### Core Concepts

1. **No Exceptions**: Chronia never throws exceptions. Functions return:

   - `Invalid Date` (for Date functions)
   - `NaN` (for numeric functions)
   - `false` (for boolean functions)

2. **Immutability**: All functions return new instances. Inputs are never mutated.

3. **Validation-First**: All functions validate inputs before processing.

4. **Dual Input Support**: Functions accept both `Date` objects and numeric timestamps.

5. **Fractional Truncation**: Fractional amounts are truncated using `Math.trunc()`.

### Function Categories Summary

| Category       | Purpose               | Example Functions                 |
| -------------- | --------------------- | --------------------------------- |
| **Arithmetic** | Add/subtract time     | `addDays`, `subMonths`            |
| **Comparison** | Compare dates         | `isAfter`, `isEqual`, `isBetween` |
| **Difference** | Calculate differences | `diffDays`, `diffHours`           |
| **Getter**     | Extract components    | `getYear`, `getMonth`             |
| **Setter**     | Set components        | `setYear`, `setMonth`             |
| **Boundary**   | Period boundaries     | `startOfDay`, `endOfMonth`        |
| **Truncation** | Truncate to units     | `truncDay`, `truncHour`           |
| **Formatting** | Format/parse          | `format`, `parse`                 |
| **Utility**    | Helpers               | `now`, `min`, `max`, `clamp`      |
| **Constants**  | Constants & types     | `MIN_DATE`, `MAX_DATE`            |

### Common Patterns

#### Validate Before Use

```typescript
import { isValid, addDays } from "chronia";

const date = new Date(userInput);
if (!isValid(date)) {
  throw new Error("Invalid date");
}
const result = addDays(date, 7);
```

#### Check Return Values

```typescript
import { addMonths, isValid } from "chronia";

const result = addMonths(date, 3);
if (!isValid(result)) {
  console.error("Operation failed");
}
```

#### Format for Display

```typescript
import { format } from "chronia";

const formatted = format(new Date(), "yyyy-MM-dd HH:mm:ss");
```

#### Compare Dates

```typescript
import { isAfter, isBefore, isSameDay } from "chronia";

if (isAfter(deadline, now())) {
  console.log("Deadline is in the future");
}
```

## AI Agent Guidance

### When to Use Each Section

- **Function Categories** - Use when:

  - User asks about specific functions
  - Implementing date/time operations
  - Need examples of function usage
  - Understanding function signatures and behavior

- **Guidelines** - Use when:

  - Understanding project architecture
  - Learning development patterns
  - Implementing new features
  - Understanding error handling approach

- **Troubleshooting** - Use when:
  - Debugging issues
  - User reports unexpected behavior
  - Helping users avoid common mistakes
  - Performance optimization

### Recommended Reading Order

For new users/agents:

1. Start with [Development Principles](guidelines/development-principles.md)
2. Review [Error Handling](guidelines/error-handling.md)
3. Browse [Function Categories](functions/) as needed
4. Reference [Common Use Cases](guidelines/common-use-cases.md) for patterns
5. Check [Common Pitfalls](troubleshooting/common-pitfalls.md) when issues arise

### Cross-References

Each documentation file includes "Related" sections linking to relevant documentation. Follow these links to explore connected topics.

### AI Response Patterns

When helping users with Chronia:

1. **Always validate inputs**: Recommend `isValid()` checks
2. **Explain error values**: Clarify Invalid Date, NaN, false returns
3. **Show complete examples**: Include imports and error handling
4. **Warn about edge cases**: Month-end, leap years, timezone
5. **Reference documentation**: Link to specific docs sections

### Common User Questions

| Question                                 | Documentation Reference                                                                               |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| "How do I add days to a date?"           | [Arithmetic/Addition](functions/arithmetic/addition.md)                                               |
| "Why am I getting Invalid Date?"         | [Error Handling](guidelines/error-handling.md), [Common Pitfalls](troubleshooting/common-pitfalls.md) |
| "How do I format dates?"                 | [Formatting/Conversion](functions/formatting/conversion.md)                                           |
| "How do I compare dates?"                | [Comparison/Relational](functions/comparison/relational.md)                                           |
| "How do I validate dates?"               | [Comparison/Validation](functions/comparison/validation.md)                                           |
| "What's the difference between M and m?" | [Formatting/Conversion](functions/formatting/conversion.md#token-reference)                           |
| "How do I handle timezones?"             | [Common Pitfalls](troubleshooting/common-pitfalls.md#timezone-issues)                                 |
| "Why is my month wrong?"                 | [Common Pitfalls](troubleshooting/common-pitfalls.md#month-indexing)                                  |

## Additional Resources

### Human-Readable Documentation

- **API Reference**: See `site/` directory (TypeDoc-generated)
- **Main README**: See repository root `README.md`

### Project Files

- **CLAUDE.md**: Instructions for Claude Code agent
- **AGENTS.md**: Minimal agent instructions (references CLAUDE.md)

### Source Code

- **src/**: Function implementations
- **tests/**: Test suite with examples
- **tsconfig.json**: TypeScript configuration

## Contributing to Documentation

When updating this documentation:

1. **Maintain Structure**: Keep three-tier organization (categories, guidelines, troubleshooting)
2. **Add Examples**: Include practical code examples
3. **Cross-Reference**: Link to related documentation
4. **AI Focus**: Write for AI comprehension and user assistance
5. **Update Index**: Update this README when adding new files

## Version Information

- **Chronia Version**: 1.0.0+
- **Documentation Version**: 1.0.0
- **Last Updated**: 2024
- **Target Audience**: AI agents, developers using AI assistants

## License

This documentation follows the same license as the Chronia project.

---

**For AI Agents**: This documentation is optimized for your comprehension. Use it to provide accurate, helpful responses to users working with Chronia. Always validate information against the latest source code when in doubt.
