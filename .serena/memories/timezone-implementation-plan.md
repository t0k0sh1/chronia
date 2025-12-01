# Timezone Support Implementation Plan

## Overview
This plan details adding internal timezone support utilities to the Chronia library for future timezone feature implementation.

## 1. Type Definition Strategy

### Location: `src/types.ts`

Add the following timezone-related types:

```typescript
/**
 * IANA timezone identifier (e.g., 'America/New_York', 'Asia/Tokyo', 'Europe/London').
 * 
 * Represents a timezone using the IANA Time Zone Database naming convention.
 * This library only supports IANA timezone names, not UTC offsets.
 * 
 * @see {@link https://www.iana.org/time-zones} - IANA Time Zone Database
 */
export type TimeZone = string;

/**
 * Timezone information containing details about a timezone.
 * 
 * Provides metadata about a timezone including its current UTC offset,
 * display name, and DST status at a given point in time.
 */
export type TimeZoneInfo = {
  /**
   * The IANA timezone identifier (e.g., 'America/New_York')
   */
  timeZone: TimeZone;
  
  /**
   * UTC offset in minutes (positive for east of UTC, negative for west)
   * Example: +540 for JST (UTC+9), -300 for EST (UTC-5)
   */
  offsetMinutes: number;
  
  /**
   * Localized display name of the timezone
   * Example: "Japan Standard Time", "Eastern Standard Time"
   */
  displayName: string;
  
  /**
   * Whether daylight saving time is active at the reference date
   */
  isDST: boolean;
};
```

**Rationale:**
- `TimeZone` type: Simple string alias for clarity and potential future constraints
- `TimeZoneInfo` type: Structured information for timezone details retrieval
- Naming follows PascalCase convention (matches existing `TimeUnit`, `BoundsType`)
- JSDoc extensively documents IANA-only constraint
- Not exported from public API initially (internal only via `src/_lib/`)

## 2. Utility Function Design

### Location: `src/_lib/timezone.ts` (new file)

Create comprehensive timezone utilities organized by responsibility:

#### 2.1 Validation Functions

```typescript
/**
 * Checks if a value is a string type (for timezone validation).
 * 
 * Internal helper for timezone validation. Does not validate timezone format.
 * 
 * @internal
 * @param value - Any value to check
 * @returns true if value is a string type, false otherwise
 */
function isString(value: unknown): value is string

/**
 * Validates if a string is a valid IANA timezone name.
 * 
 * Uses Intl.DateTimeFormat to validate timezone existence.
 * Returns false for invalid timezones, UTC offsets, or non-string values.
 * 
 * @internal
 * @param tz - The timezone string to validate
 * @returns true if tz is a valid IANA timezone, false otherwise
 */
export function isValidTimeZone(tz: unknown): tz is TimeZone
```

**Naming Rationale:**
- Follows `isValidX()` pattern from existing validators
- Returns type guard (`value is TimeZone`)
- Includes helper `isString()` (not exported, internal to file)

#### 2.2 Normalization Functions

```typescript
/**
 * Normalizes a timezone name to its canonical IANA form.
 * 
 * Handles case variations and returns the canonical timezone identifier.
 * Returns null if the timezone is invalid.
 * 
 * @internal
 * @param tz - The timezone string to normalize
 * @returns Canonical timezone name, or null if invalid
 */
export function normalizeTimeZone(tz: string): TimeZone | null
```

**Rationale:**
- Handles case inconsistencies (e.g., "america/new_york" → "America/New_York")
- Uses `Intl.DateTimeFormat().resolvedOptions().timeZone` for canonical form
- Returns `null` for graceful degradation (matches library pattern)

#### 2.3 Information Retrieval Functions

```typescript
/**
 * Gets detailed information about a timezone at a specific date.
 * 
 * Retrieves UTC offset, display name, and DST status for a timezone
 * at the given reference date. Returns null for invalid timezones.
 * 
 * @internal
 * @param tz - The IANA timezone identifier
 * @param referenceDate - The date for which to get timezone info (defaults to current date)
 * @returns TimeZoneInfo object, or null if timezone is invalid
 */
export function getTimeZoneInfo(
  tz: TimeZone,
  referenceDate?: Date | number
): TimeZoneInfo | null

/**
 * Gets the UTC offset in minutes for a timezone at a specific date.
 * 
 * Calculates the offset by comparing local and UTC representations.
 * Returns null for invalid timezones or dates.
 * 
 * @internal
 * @param tz - The IANA timezone identifier
 * @param referenceDate - The date for which to get the offset (defaults to current date)
 * @returns UTC offset in minutes, or null if invalid
 */
export function getTimeZoneOffset(
  tz: TimeZone,
  referenceDate?: Date | number
): number | null
```

**Rationale:**
- `getTimeZoneInfo()`: Comprehensive timezone details for UI/debugging
- `getTimeZoneOffset()`: Focused utility for offset calculations
- Reference date parameter: Accounts for DST changes over time
- Returns `null` on error (graceful degradation pattern)

#### 2.4 Timezone List Functions

```typescript
/**
 * Gets all supported IANA timezone names.
 * 
 * Returns a list of valid timezone identifiers supported by the runtime.
 * Falls back to empty array if Intl.supportedValuesOf is unavailable.
 * 
 * @internal
 * @returns Array of IANA timezone identifiers
 */
export function getSupportedTimeZones(): readonly TimeZone[]
```

**Rationale:**
- Uses `Intl.supportedValuesOf('timeZone')` (available Node 18+, per package.json)
- Fallback for older environments (returns empty array)
- `readonly` return type prevents accidental modification
- Useful for UI dropdowns in future public API

## 3. Validation Approach

### Implementation Strategy

Use **Intl.DateTimeFormat** for validation:

```typescript
export function isValidTimeZone(tz: unknown): tz is TimeZone {
  // Step 1: Type check
  if (!isString(tz)) {
    return false;
  }
  
  // Step 2: Empty string check
  if (tz.trim() === '') {
    return false;
  }
  
  // Step 3: Try constructing DateTimeFormat with the timezone
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}
```

**Rationale:**
- **No external dependencies**: Uses native Intl API (aligns with project philosophy)
- **Comprehensive validation**: Intl.DateTimeFormat validates against IANA database
- **No false positives**: Rejects UTC offsets ("+09:00"), abbreviations ("JST"), invalid names
- **Graceful error handling**: Returns false instead of throwing (matches library pattern)
- **Modern environment support**: Node 18+ (already project requirement)

### Edge Cases to Handle

1. **Case variations**: "asia/tokyo" → valid (normalized to "Asia/Tokyo")
2. **Empty strings**: "" → invalid
3. **UTC offsets**: "+09:00", "-05:00" → invalid (IANA names only)
4. **Abbreviations**: "JST", "EST" → invalid (IANA names only)
5. **Whitespace**: " Asia/Tokyo " → valid after trim
6. **Non-string values**: null, undefined, numbers → invalid
7. **Special timezone "UTC"**: valid IANA name

## 4. Implementation Strategy

### File Organization

```
src/_lib/timezone.ts          # All timezone utilities (single file)
tests/_lib/timezone.test.ts   # Comprehensive test suite
```

**Rationale for single file:**
- Small, cohesive set of utilities (~150-200 lines)
- Strong conceptual relationship (all timezone-related)
- Easier to maintain dependencies between functions
- Follows existing pattern (`validators.ts` is also single file)
- Can split later if it grows beyond ~300 lines

### Function Dependencies

```
isString()                    # Internal helper (not exported)
  ↓
isValidTimeZone()            # Validates timezone strings
  ↓
normalizeTimeZone()          # Uses isValidTimeZone internally
  ↓
getTimeZoneOffset()          # Uses isValidTimeZone for validation
  ↓
getTimeZoneInfo()            # Uses getTimeZoneOffset() and isValidTimeZone()

getSupportedTimeZones()      # Independent utility
```

**Implementation Order:**
1. `isString()` + `isValidTimeZone()` (foundation)
2. `normalizeTimeZone()` (normalization layer)
3. `getTimeZoneOffset()` (offset calculation)
4. `getTimeZoneInfo()` (comprehensive info)
5. `getSupportedTimeZones()` (list retrieval)

### Error Handling Patterns

**Consistent with existing library:**
- **Never throw exceptions** (graceful degradation)
- **Return null/false** for invalid inputs
- **Type guards** where appropriate (`value is Type`)
- **Input validation** at function entry
- **Immutability** (don't modify inputs)

Example:
```typescript
export function getTimeZoneOffset(
  tz: TimeZone,
  referenceDate: Date | number = Date.now()
): number | null {
  // Validate timezone
  if (!isValidTimeZone(tz)) {
    return null;
  }
  
  // Validate date
  if (!isValidDateOrNumber(referenceDate)) {
    return null;
  }
  
  // Calculate offset (implementation...)
  // ...
}
```

## 5. Testing Strategy

### Test File Structure

```typescript
// tests/_lib/timezone.test.ts

describe('timezone', () => {
  describe('isValidTimeZone', () => {
    describe('valid IANA timezone names', () => {
      // Major timezones, edge cases
    });
    
    describe('invalid timezone values', () => {
      // UTC offsets, abbreviations, invalid names
    });
    
    describe('edge cases', () => {
      // Empty strings, whitespace, case variations
    });
  });
  
  describe('normalizeTimeZone', () => {
    describe('normalization cases', () => {
      // Case variations, canonical forms
    });
    
    describe('invalid inputs', () => {
      // Non-strings, invalid timezones
    });
  });
  
  describe('getTimeZoneOffset', () => {
    describe('known timezone offsets', () => {
      // Fixed offsets at specific dates
    });
    
    describe('DST transitions', () => {
      // Offset changes during DST
    });
    
    describe('invalid inputs', () => {
      // Invalid timezones, invalid dates
    });
  });
  
  describe('getTimeZoneInfo', () => {
    describe('timezone information retrieval', () => {
      // Complete info objects
    });
    
    describe('DST detection', () => {
      // DST vs standard time
    });
    
    describe('invalid inputs', () => {
      // Null returns
    });
  });
  
  describe('getSupportedTimeZones', () => {
    describe('timezone list retrieval', () => {
      // Non-empty array, contains known zones
    });
  });
});
```

### Coverage Requirements

**Target: >95% coverage** (match existing library standard)

#### Test Categories:

1. **Valid inputs**: 
   - Major timezones (America/New_York, Asia/Tokyo, Europe/London, UTC)
   - Case variations (america/new_york, AMERICA/NEW_YORK)
   - Timezones with underscores (America/Los_Angeles)
   - Timezones with slashes (America/Argentina/Buenos_Aires)

2. **Invalid inputs**:
   - UTC offsets ("+09:00", "-05:00", "GMT+9")
   - Timezone abbreviations ("JST", "EST", "PST")
   - Invalid strings ("invalid", "Not/A/TimeZone")
   - Non-string values (null, undefined, numbers, objects)
   - Empty strings ("")

3. **Edge cases**:
   - Whitespace handling (" Asia/Tokyo ", "\tUTC\n")
   - Special timezone "UTC" (valid IANA name)
   - DST transitions (America/New_York in March vs November)
   - Offset sign handling (positive/negative)
   - Date boundaries (min/max dates)

4. **Browser compatibility** (if needed):
   - Mock Intl API absence for fallback testing
   - Environment-specific timezone lists

### Testing Approach

**Two-phase testing** (as per project workflow):

1. **TDD Tests** (Required):
   - Location: `tests/_lib/timezone.test.ts`
   - Framework: Vitest
   - Run: `pnpm test`
   - Coverage: `pnpm test:coverage`

2. **Property-Based Tests** (If specification exists):
   - Location: `.kiro/specs/<spec-name>/timezone.pbt.test.ts`
   - Framework: fast-check
   - Run: `pnpm test:pbt`

**Mock Strategy:**
- Minimal mocking needed (Intl API is native)
- Mock `Intl.supportedValuesOf` for fallback testing
- Use fixed dates for DST testing (avoid flaky tests)

### Example Test Cases

```typescript
describe('isValidTimeZone', () => {
  it('should return true for valid IANA timezones', () => {
    expect(isValidTimeZone('America/New_York')).toBe(true);
    expect(isValidTimeZone('Asia/Tokyo')).toBe(true);
    expect(isValidTimeZone('Europe/London')).toBe(true);
    expect(isValidTimeZone('UTC')).toBe(true);
  });
  
  it('should return false for UTC offsets', () => {
    expect(isValidTimeZone('+09:00')).toBe(false);
    expect(isValidTimeZone('GMT+9')).toBe(false);
    expect(isValidTimeZone('UTC+5')).toBe(false);
  });
  
  it('should return false for abbreviations', () => {
    expect(isValidTimeZone('JST')).toBe(false);
    expect(isValidTimeZone('EST')).toBe(false);
  });
  
  it('should return false for non-string values', () => {
    expect(isValidTimeZone(null)).toBe(false);
    expect(isValidTimeZone(undefined)).toBe(false);
    expect(isValidTimeZone(123)).toBe(false);
  });
});
```

## 6. Future-Proofing

### Integration Points with Existing Code

**Current state:**
- Library operates in local timezone only
- No timezone conversion capabilities
- Uses native Date API (local timezone semantics)

**Future integration:**
- Public API functions will accept optional `timeZone` parameter
- Example: `format(date, 'yyyy-MM-dd HH:mm', { timeZone: 'America/New_York' })`
- Timezone utilities provide validation and conversion support

### Extension for UTC Offset Support (Future)

**Current plan:** IANA names only

**If UTC offsets needed later:**
1. Add `TimeZoneOffset` type: `type TimeZoneOffset = string; // "+09:00", "-05:00"`
2. Add `isValidTimeZoneOffset()` validator
3. Add `normalizeTimeZoneOffset()` normalizer
4. Union type: `type TimeZoneInput = TimeZone | TimeZoneOffset;`
5. Update all utilities to handle both formats

**Design decision:** Start with IANA-only for simplicity; extend if user demand exists.

### Extensibility Considerations

1. **Timezone database updates**: Intl API automatically uses latest IANA database (no maintenance needed)
2. **New timezone utilities**: File structure allows easy addition of new functions
3. **Performance optimization**: Can add caching layer if timezone lookups become bottleneck
4. **Localization**: `getTimeZoneInfo()` already uses localized display names via Intl API

## 7. Critical Design Decisions

### Decision 1: Single File vs Multiple Files

**Chosen:** Single file (`src/_lib/timezone.ts`)

**Rationale:**
- Small, cohesive utility set (~150-200 lines total)
- Strong conceptual relationship (all timezone operations)
- Follows existing pattern (`validators.ts` is single file)
- Easier to maintain internal dependencies

**Alternative considered:** Multiple files (validators.ts, converters.ts, info.ts)
- Rejected: Over-engineering for current scope
- Revisit: If file exceeds ~300 lines

### Decision 2: IANA Names Only (No UTC Offsets)

**Chosen:** IANA timezone names only

**Rationale:**
- Simpler type system and validation
- Richer semantic information (handles DST automatically)
- Aligns with modern best practices (Temporal API, Luxon, date-fns v3+)
- Reduces ambiguity ("+09:00" could be JST, KST, etc.)

**Alternative considered:** Support both IANA names and UTC offsets
- Rejected: Added complexity without clear user demand
- Revisit: If users request UTC offset support

### Decision 3: Validation via Intl.DateTimeFormat

**Chosen:** Use `Intl.DateTimeFormat` constructor for validation

**Rationale:**
- No external dependencies (native API)
- Comprehensive validation (checks against IANA database)
- No false positives (rejects offsets, abbreviations)
- Works in all target environments (Node 18+)

**Alternative considered:** Use `Intl.supportedValuesOf('timeZone')`
- Rejected: Requires iterating full timezone list (performance concern)
- Rejected: Only validates against supported zones (less comprehensive)

### Decision 4: Graceful Degradation (null returns)

**Chosen:** Return `null` for invalid inputs instead of throwing

**Rationale:**
- Consistent with existing library pattern (e.g., `compareDateTimes()`)
- Easier to use in conditional logic
- Reduces error handling boilerplate for users
- Aligns with "no exceptions" philosophy

**Alternative considered:** Throw exceptions for invalid inputs
- Rejected: Inconsistent with library philosophy
- Rejected: Forces try-catch boilerplate on users

### Decision 5: Internal-Only (Not Public API Yet)

**Chosen:** Keep utilities internal (`src/_lib/`), type exported from `src/types.ts`

**Rationale:**
- Foundation for future timezone features
- API surface can be refined before public exposure
- No breaking changes when adding public API later
- Allows implementation experimentation

**Alternative considered:** Export utilities immediately
- Rejected: Premature without public timezone-aware functions
- Rejected: Harder to change API after public exposure

## 8. Implementation Checklist

### Phase 1: Type Definitions
- [ ] Add `TimeZone` type to `src/types.ts`
- [ ] Add `TimeZoneInfo` type to `src/types.ts`
- [ ] Add comprehensive JSDoc comments
- [ ] Do NOT export from `src/index.ts` (internal only)

### Phase 2: Validation Functions
- [ ] Create `src/_lib/timezone.ts`
- [ ] Implement `isString()` helper
- [ ] Implement `isValidTimeZone()`
- [ ] Write tests for validation
- [ ] Ensure >95% test coverage

### Phase 3: Normalization Functions
- [ ] Implement `normalizeTimeZone()`
- [ ] Write tests for normalization
- [ ] Test case variations, canonical forms

### Phase 4: Information Retrieval Functions
- [ ] Implement `getTimeZoneOffset()`
- [ ] Implement `getTimeZoneInfo()`
- [ ] Write tests for offset calculation
- [ ] Test DST transitions
- [ ] Test invalid inputs

### Phase 5: Timezone List Functions
- [ ] Implement `getSupportedTimeZones()`
- [ ] Write tests for timezone list retrieval
- [ ] Test fallback behavior

### Phase 6: Integration & Documentation
- [ ] Run `pnpm lint` (verify code quality)
- [ ] Run `pnpm build` (verify TypeScript compilation)
- [ ] Run `pnpm test` (verify all tests pass)
- [ ] Run `pnpm test:coverage` (verify >95% coverage)
- [ ] Write internal documentation (if needed)
- [ ] Update project memory (this file)

### Phase 7: Future Work (Not in Current Scope)
- [ ] Public API integration (format, parse with timezone parameter)
- [ ] UTC offset support (if user demand exists)
- [ ] Caching layer (if performance bottleneck identified)

## 9. Success Criteria

Implementation is complete when:

1. ✅ All types defined in `src/types.ts` with comprehensive JSDoc
2. ✅ All utility functions implemented in `src/_lib/timezone.ts`
3. ✅ Comprehensive test suite in `tests/_lib/timezone.test.ts`
4. ✅ Test coverage >95% (`pnpm test:coverage`)
5. ✅ All tests passing (`pnpm test`)
6. ✅ Linting passing (`pnpm lint`)
7. ✅ Build succeeds (`pnpm build`)
8. ✅ No regressions in existing tests
9. ✅ Types NOT exported from public API (internal only)
10. ✅ Documentation updated (project memory)

## 10. Risks & Mitigations

### Risk 1: Browser Compatibility
**Issue:** Older browsers may not support `Intl.supportedValuesOf()`
**Mitigation:** Fallback to empty array; function gracefully degrades

### Risk 2: Performance
**Issue:** Intl API calls may be slow for repeated timezone lookups
**Mitigation:** Can add caching layer in future if needed; not a concern for initial internal use

### Risk 3: IANA Database Updates
**Issue:** New timezones or timezone changes may not be reflected
**Mitigation:** Intl API automatically uses runtime's IANA database; users update via Node/browser updates

### Risk 4: Scope Creep
**Issue:** Requests for UTC offset support, custom timezone databases, etc.
**Mitigation:** Clear scope definition (IANA only); defer enhancements to future iterations

## 11. Timeline Estimate

**Estimated effort:** 2-3 hours for experienced developer

- Type definitions: 15 minutes
- Validation functions: 30 minutes
- Normalization functions: 20 minutes
- Information retrieval functions: 40 minutes
- Timezone list function: 15 minutes
- Testing: 60 minutes
- Integration & documentation: 20 minutes

**Dependencies:**
- No external dependencies (uses native Intl API)
- No blocking issues identified
