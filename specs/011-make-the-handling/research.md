# Research: Argument Validation Patterns

## Current Implementation Analysis

### clamp Function (Current - Inconsistent)
**File**: `src/clamp/index.ts`

**Current Pattern** (Convert → Validate):
```
1. Convert arguments to Date objects (lines 48-51)
   - date → dateObj
   - minDate → minDateObj
   - maxDate → maxDateObj
2. Validate converted objects (line 55)
   - isValidDateOrNumber(dateObj)
   - isValidDateOrNumber(minDateObj)
   - isValidDateOrNumber(maxDateObj)
3. Process if valid
```

**Problem**: Validates AFTER conversion, using `isValidDateOrNumber()` on already-converted Date objects.

### addDays Function (Target Pattern - Consistent)
**File**: `src/addDays/index.ts`

**Correct Pattern** (Validate → Convert):
```
1. Validate arguments in original form (line 16)
   - isValidDateOrNumber(date) - checks Date | number
   - isValidNumber(amount) - checks number
2. Return Invalid Date if validation fails (line 17)
3. Convert to Date only after validation passes (line 19)
   - const dt = new Date(date)
4. Process validated data
```

**Advantage**: Validates arguments BEFORE any conversion or processing.

### max/min Functions (Hybrid Pattern)
**File**: `src/max/index.ts`, `src/min/index.ts`

**Pattern** (Convert + Validate Together):
```
1. Loop through arguments
2. For each argument:
   - Convert to Date (line 37)
   - Immediately validate with isNaN(dateObj.getTime()) (line 38)
   - Return Invalid Date if invalid (line 39)
3. Process valid dates
```

**Note**: Uses `isNaN(dateObj.getTime())` instead of `isValidDateOrNumber()`.

## Validation Helper Functions
**File**: `src/_lib/validators.ts`

### isValidDate(value)
- Checks `instanceof Date`
- Checks `!isNaN(value.getTime())`
- Returns `boolean`

### isValidNumber(value)
- Checks `typeof value === "number"`
- Checks `isFinite(value)` (excludes NaN, Infinity, -Infinity)
- Returns `boolean`

### isValidDateOrNumber(value)
- Returns `isValidDate(value) || isValidNumber(value)`
- Accepts either Date OR number in original form
- **Key**: Works on unconverted arguments

## Decision: Target Pattern

**Choice**: Follow addDays pattern (Validate → Convert)

**Rationale**:
1. **Consistency**: addDays is the established pattern for functions with Date|number arguments
2. **Correctness**: Validates arguments in their original form (Date or number)
3. **Standard Validator**: Uses `isValidDateOrNumber()` which is designed for this purpose
4. **Early Return**: Fails fast before any conversion or processing

**Implementation**:
```typescript
export function clamp(
  date: Date | number,
  minDate: Date | number,
  maxDate: Date | number
): Date {
  // Step 1: Validate FIRST (in original form)
  if (!isValidDateOrNumber(date) || !isValidDateOrNumber(minDate) || !isValidDateOrNumber(maxDate)) {
    return new Date(NaN);
  }

  // Step 2: Convert AFTER validation
  const dateObj = typeof date === "number" ? new Date(date) : date;
  const minDateObj = typeof minDate === "number" ? new Date(minDate) : minDate;
  const maxDateObj = typeof maxDate === "number" ? new Date(maxDate) : maxDate;

  // Step 3: Process validated data
  // ... (existing clamp logic)
}
```

## Alternative Considered: max/min Pattern

**Rejected Because**:
- Uses `isNaN(dateObj.getTime())` instead of standard validators
- Validates after conversion (same problem as current clamp)
- Less explicit about validation intent
- Would perpetuate inconsistency

## Testing Strategy

### Existing Tests
- `tests/clamp.test.ts` has comprehensive coverage
- Tests validate behavior with invalid inputs
- Current tests should continue to pass (behavior unchanged externally)

### Validation Order Tests (New)
While public behavior is unchanged, we can verify:
1. Invalid Date inputs return Invalid Date
2. Invalid number inputs (NaN, Infinity) return Invalid Date
3. Valid inputs produce correct clamp results
4. Boundary cases (min > max handled correctly)

### Regression Prevention
- Run full test suite: `npm test`
- Ensure all 75+ test files pass
- No changes to public API or return values

## Performance Impact

**Before**: Convert (3 operations) → Validate (3 checks)
**After**: Validate (3 checks) → Convert (3 operations)

**Impact**: None - same number of operations, just reordered
**Complexity**: O(1) maintained

## Backward Compatibility

**Public API**: No changes
- Function signature unchanged
- Return type unchanged (Date)
- Error behavior unchanged (Invalid Date for invalid inputs)

**Internal Change Only**: Validation order switched from convert-validate to validate-convert

**Compatibility**: 100% - existing code continues to work identically
