# Data Model: clamp Function Refactoring

## Entity: clamp Function

### Function Signature (Unchanged)
```typescript
function clamp(
  date: Date | number,
  minDate: Date | number,
  maxDate: Date | number
): Date
```

### Input Parameters

#### date: Date | number
- **Type**: Date object OR numeric timestamp
- **Validation**: Must be valid Date or finite number
- **Invalid Cases**:
  - Invalid Date (new Date('invalid'))
  - NaN, Infinity, -Infinity
  - null, undefined, non-Date objects
- **Validated By**: `isValidDateOrNumber(date)`

#### minDate: Date | number
- **Type**: Date object OR numeric timestamp
- **Validation**: Must be valid Date or finite number
- **Invalid Cases**: Same as date parameter
- **Validated By**: `isValidDateOrNumber(minDate)`

#### maxDate: Date | number
- **Type**: Date object OR numeric timestamp
- **Validation**: Must be valid Date or finite number
- **Invalid Cases**: Same as date parameter
- **Validated By**: `isValidDateOrNumber(maxDate)`

### Return Value

#### Success Case: Date
- **Type**: New Date object (never mutates input)
- **Value**:
  - If date < min: returns new Date(minTime)
  - If date > max: returns new Date(maxTime)
  - If min <= date <= max: returns new Date(dateTime)
- **Note**: Always returns a new Date instance, never the input reference

#### Error Case: Invalid Date
- **Type**: Date object with NaN time value
- **Construction**: `new Date(NaN)`
- **Triggered By**: Any invalid input parameter
- **Test**: `isNaN(result.getTime())` returns true

### Processing Flow (Refactored)

```
┌─────────────────────────────────────────┐
│ Input: date, minDate, maxDate           │
│ (Date | number, Date | number, ...)    │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│ Step 1: Validate (BEFORE conversion)    │
│ - isValidDateOrNumber(date)             │
│ - isValidDateOrNumber(minDate)          │
│ - isValidDateOrNumber(maxDate)          │
└────────────────┬────────────────────────┘
                 │
          ┌──────┴──────┐
          │             │
          ▼             ▼
    [All Valid]    [Any Invalid]
          │             │
          │             ▼
          │      return new Date(NaN)
          │
          ▼
┌─────────────────────────────────────────┐
│ Step 2: Convert (AFTER validation)      │
│ - date → dateObj (new Date or as-is)    │
│ - minDate → minDateObj                  │
│ - maxDate → maxDateObj                  │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│ Step 3: Normalize range                 │
│ - Swap min/max if min > max             │
│ - actualMin = smaller value             │
│ - actualMax = larger value              │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│ Step 4: Clamp logic                     │
│ if (dateTime < minTime)                 │
│   return new Date(minTime)              │
│ else if (dateTime > maxTime)            │
│   return new Date(maxTime)              │
│ else                                    │
│   return new Date(dateTime)             │
└─────────────────────────────────────────┘
```

### State Transitions

The function is stateless, but inputs transition through validation states:

1. **Unvalidated State**: Raw inputs (Date | number)
2. **Validated State**: Confirmed valid via `isValidDateOrNumber()`
3. **Converted State**: Transformed to Date objects
4. **Processed State**: Clamped within range, returned as new Date

**Critical Change**: Validation now occurs in State 1→2 (before conversion), not in State 3 (after conversion).

## Validation Rules (from _lib/validators.ts)

### isValidDate(value: unknown): value is Date
- ✅ Passes: `value instanceof Date && !isNaN(value.getTime())`
- ❌ Fails: Not a Date, or Invalid Date

### isValidNumber(value: unknown): value is number
- ✅ Passes: `typeof value === "number" && isFinite(value)`
- ❌ Fails: Not a number, NaN, Infinity, -Infinity

### isValidDateOrNumber(value: unknown): value is Date | number
- ✅ Passes: `isValidDate(value) || isValidNumber(value)`
- ❌ Fails: Invalid Date, non-finite number, or other types

## Relationship to Other Functions

### Consistency Pattern (Target)
```
addDays:  Validate → Convert → Process ✅
max:      Convert → Validate → Process ⚠️ (uses isNaN check)
min:      Convert → Validate → Process ⚠️ (uses isNaN check)
clamp:    Validate → Convert → Process ✅ (after refactoring)
```

**Goal**: Align clamp with addDays pattern (Validate → Convert → Process)

### Shared Dependencies
- `isValidDateOrNumber` from `_lib/validators.ts`
- Date constructor for conversion
- Date.getTime() for comparisons

## Edge Cases & Boundary Conditions

### Validation Edge Cases
1. **null/undefined**: Rejected by `isValidDateOrNumber`
2. **Invalid Date object**: Rejected by `isValidDate` (checks `isNaN(getTime())`)
3. **NaN as number**: Rejected by `isValidNumber` (checks `isFinite()`)
4. **Infinity/-Infinity**: Rejected by `isValidNumber`
5. **String numbers**: Rejected (not number type)
6. **Objects**: Rejected (not Date instance)

### Range Edge Cases (Existing Logic, Unchanged)
1. **min > max**: Swapped internally (actualMin/actualMax)
2. **date === min**: Returns new Date(minTime)
3. **date === max**: Returns new Date(maxTime)
4. **All values equal**: Returns new Date(value)

### Output Edge Cases
- **Always new instance**: `result !== input` (even if same value)
- **Preserves timestamp precision**: Millisecond accuracy maintained
- **Invalid input → Invalid Date**: Consistent error handling

## Performance Characteristics

- **Time Complexity**: O(1) - constant time validation and processing
- **Space Complexity**: O(1) - fixed number of Date objects created
- **No Allocations**: Before validation (early return if invalid)
- **Memory Impact**: None - same object count as before refactoring

## Testing Implications

### Behavior Unchanged
- External behavior identical (same inputs → same outputs)
- Existing tests should pass without modification
- Public API contract maintained

### Internal Validation Order
- Validation happens earlier in execution flow
- Invalid inputs fail faster (before conversion)
- Error path more efficient (no unnecessary conversions)

### Test Coverage Areas
1. Valid Date inputs → correct clamp behavior
2. Valid number (timestamp) inputs → correct clamp behavior
3. Invalid Date inputs → Invalid Date returned
4. Invalid number inputs (NaN, Infinity) → Invalid Date returned
5. Mixed valid/invalid → Invalid Date returned
6. Range edge cases (min > max, equality) → correct handling
