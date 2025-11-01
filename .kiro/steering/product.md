# Product Specification

## Product/Service Name

**Chronia**

*A modern, lightweight TypeScript date/time utility library with comprehensive formatting, parsing, and manipulation capabilities.*

### Vision

Chronia aims to become the de facto TypeScript-first date/time utility library by delivering type-safe, predictable, and developer-friendly date operations. The v1.0.0 stable release will establish a robust API foundation that empowers modern JavaScript developers to handle dates with confidence and clarity.

---

## Target Users (Personas, Customer Segments)

### Primary Personas

**1. The TypeScript-First Developer**
- Works primarily in TypeScript environments with strict typing enabled
- Values compile-time safety and autocomplete-driven development
- Frustrated by JavaScript's native Date object and its runtime surprises
- Prefers functional, immutable APIs over object-oriented patterns

**2. The Enterprise Team Lead**
- Manages teams building mission-critical applications (fintech, healthcare, SaaS)
- Requires reliable, well-tested libraries with stable APIs
- Needs comprehensive documentation for onboarding new developers
- Values predictable error handling over try-catch complexity

**3. The AI-Assisted Developer**
- Leverages AI coding assistants (Claude, Copilot, Cursor)
- Appreciates libraries with AI-optimized documentation
- Seeks modern tools that integrate seamlessly with AI workflows
- Values explicit, discoverable APIs

### Customer Segments

**Developer Teams:**
- Modern web application developers (React, Vue, Angular, Svelte)
- Backend Node.js/TypeScript API developers
- Full-stack TypeScript teams

**Industry Verticals:**
- **Fintech**: Financial calculations, transaction timestamps, fiscal periods
- **Healthcare**: Appointment scheduling, medical records, compliance tracking
- **SaaS**: Subscription management, session handling, usage analytics
- **E-commerce**: Order tracking, delivery scheduling, promotional periods
- **Productivity Tools**: Calendar applications, task management, time tracking

**Project Types:**
- Greenfield TypeScript projects seeking modern tooling
- Teams migrating from JavaScript to TypeScript
- Projects requiring internationalization (i18n) for date formatting
- Applications demanding high reliability and test coverage

---

## Core Features (Must-Have Functionality)

Chronia provides **70+ functions** organized into **10 categories**, ensuring comprehensive coverage of common date/time operations:

### 1. **Arithmetic Operations** (14 functions)
Core date manipulation capabilities for adding and subtracting time units.

**Key Functions:**
- `addDays`, `addMonths`, `addYears` - Add time periods
- `subDays`, `subMonths`, `subYears` - Subtract time periods
- `addHours`, `addMinutes`, `addSeconds`, `addMilliseconds` - Precision time adjustments

**Use Cases:** Scheduling, deadline calculation, recurring events

### 2. **Comparison Functions** (14 functions)
Rich comparison API for date relationship evaluation.

**Key Functions:**
- `isAfter`, `isBefore` - Temporal ordering
- `isAfterOrEqual`, `isBeforeOrEqual` - Inclusive comparisons
- `isBetween` - Range membership testing
- `isSameDay`, `isSameMonth`, `isSameYear` - Granular equality checks
- `compare` - Three-way comparison (-1, 0, 1)

**Use Cases:** Validation, filtering, timeline logic

### 3. **Difference Calculations** (7 functions)
Calculate precise time spans between dates.

**Key Functions:**
- `diffDays`, `diffMonths`, `diffYears` - Calendar differences
- `diffHours`, `diffMinutes`, `diffSeconds`, `diffMilliseconds` - Time differences

**Use Cases:** Age calculation, countdowns, duration tracking

### 4. **Date Getters** (8 functions)
Extract individual date/time components safely.

**Key Functions:**
- `getYear`, `getMonth`, `getDay` - Date components
- `getHours`, `getMinutes`, `getSeconds`, `getMilliseconds` - Time components
- `getTime` - Unix timestamp retrieval

### 5. **Date Setters** (8 functions)
Immutable date component updates (returns new instances).

**Key Functions:**
- `setYear`, `setMonth`, `setDay` - Date updates
- `setHours`, `setMinutes`, `setSeconds`, `setMilliseconds` - Time updates

### 6. **Period Boundaries** (6 functions)
Navigate to the start/end of time periods.

**Key Functions:**
- `startOfYear`, `endOfYear` - Annual boundaries
- `startOfMonth`, `endOfMonth` - Monthly boundaries
- `startOfDay`, `endOfDay` - Daily boundaries

**Use Cases:** Report generation, billing cycles, analytics aggregation

### 7. **Truncation** (7 functions)
Zero-out lower precision time components.

**Key Functions:**
- `truncYear`, `truncMonth`, `truncDay` - Date truncation
- `truncHour`, `truncMinute`, `truncSecond` - Time truncation

**Use Cases:** Time normalization, grouping, precision control

### 8. **Formatting & Parsing** (2 functions)
Convert between dates and human-readable strings.

**Key Functions:**
- `format` - Date-to-string with Unicode token patterns (yyyy-MM-dd, HH:mm:ss, etc.)
- `parse` - String-to-date with pattern matching

**Supported Tokens:** y (year), M (month), d (day), H (hour), m (minute), s (second), S (millisecond), E (weekday), etc.

**Locale Support:** English (en-US), Japanese (ja) built-in; extensible locale system

**Use Cases:** UI display, API serialization, user input parsing

### 9. **Utility Functions** (4 functions)
Essential helpers for common scenarios.

**Key Functions:**
- `now` - Current timestamp
- `min` - Earliest date from multiple dates
- `max` - Latest date from multiple dates
- `clamp` - Constrain date within range

### 10. **Type Definitions & Constants**
Comprehensive TypeScript types for safe date operations.

**Exported Types:**
- `Interval` - Date range representation
- `Locale` - Internationalization configuration
- `TimeUnit` - Enumeration of time units
- `BoundsType`, `BetweenOption`, `CompareOptions` - Configuration objects

**Constants:**
- `MIN_DATE`, `MAX_DATE` - Valid date range boundaries

---

## Background & Value Proposition

### Why Chronia Exists

**The JavaScript Date Problem:**
JavaScript's native `Date` object is notoriously problematic:
- **Mutability**: `setMonth()` modifies objects in-place, causing bugs
- **Inconsistent API**: Month indexing starts at 0, but days start at 1
- **Poor Error Handling**: Silently produces invalid dates or throws unexpectedly
- **Type Weakness**: No compile-time safety for date operations

**Existing Library Gaps:**
While libraries like date-fns and dayjs addressed some issues, gaps remain:
- **Type Safety**: JavaScript-first design with TypeScript as an afterthought
- **Error Handling**: Exception-throwing creates try-catch overhead
- **AI Integration**: Documentation not optimized for AI-assisted development
- **Modern Standards**: Limited adoption of latest TypeScript features

### Unique Value Proposition

**1. No-Exceptions Error Handling**
- Returns standardized error values (`Invalid Date`, `NaN`, `false`) instead of throwing
- Eliminates try-catch boilerplate in application code
- Predictable, testable error paths

**2. TypeScript-First Architecture**
- Built on TypeScript 5.9+ with strict type checking
- First-class type inference and autocomplete support
- Compile-time safety for all date operations

**3. AI-Ready Documentation**
- Comprehensive documentation optimized for AI coding assistants
- Claude Code-specific guidance in CLAUDE.md
- Structured examples and clear API contracts

**4. Functional Immutability**
- Never mutates input parameters
- Always returns new Date instances
- Pure functions enable safe composition

**5. Lightweight & Tree-Shakable**
- ESM/CJS dual module support
- Full tree-shaking support - only bundle what you use
- Zero dependencies for minimal bundle impact

**6. High Reliability**
- 1700+ automated test cases
- Comprehensive CI/CD across Node.js 18.x, 20.x, 22.x, 24.x
- Contract tests ensure API stability

### Competitive Positioning

| Aspect | **Chronia** | date-fns | dayjs |
|--------|-------------|----------|-------|
| **Language** | TypeScript-first | JavaScript + types | JavaScript + types |
| **Error Handling** | No exceptions (returns Invalid Date/NaN) | Throws or returns invalid | Throws errors |
| **Type Safety** | Native TypeScript 5.9+ | @types package | @types package |
| **Mutability** | Fully immutable | Immutable | Immutable |
| **Bundle Size** | Lightweight, tree-shakable | Larger modules | Smallest (2KB) |
| **AI Documentation** | Optimized for AI assistants | Standard docs | Standard docs |
| **Locale Support** | 2 built-in (extensible) | 50+ locales | 130+ locations |
| **Philosophy** | TypeScript-first, no exceptions | Functional purity | Plugin ecosystem |
| **Node Support** | LTS only (18+) | Broader support | Broader support |

**Key Differentiators:**

1. **vs. date-fns**: Chronia offers superior TypeScript integration, no-exception error handling, and AI-optimized documentation
2. **vs. dayjs**: Chronia provides stronger type safety, more comprehensive API surface, and safer error handling
3. **vs. Native Date**: Chronia delivers immutability, type safety, consistent API, and predictable behavior

### Strategic Advantages

**For Developers:**
- Faster development with TypeScript autocomplete
- Fewer runtime errors through type safety
- Cleaner code without try-catch blocks
- AI-assisted development support

**For Teams:**
- Reduced onboarding time with clear documentation
- Higher code quality through immutability
- Fewer production bugs through comprehensive testing
- Stable API for long-term maintenance

**For Projects:**
- Smaller bundle sizes through tree-shaking
- Better internationalization support
- Future-proof TypeScript compatibility
- Active maintenance and community support

### Target Outcomes (v1.0.0)

1. **Adoption**: Become the preferred date library for new TypeScript projects
2. **Reliability**: Achieve 100% test coverage for all public APIs
3. **Performance**: Match or exceed date-fns performance benchmarks
4. **Ecosystem**: Build locale community contributions
5. **Recognition**: Establish thought leadership in TypeScript date handling

---

*Last Updated: 2025-11-01*
