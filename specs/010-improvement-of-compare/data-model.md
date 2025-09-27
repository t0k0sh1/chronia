# Data Model: Compare Function Enhancement

**Date**: 2025-09-27
**Feature**: Compare Function Enhancement
**Branch**: `010-improvement-of-compare`

## Overview

This data model defines the enhanced compare function signature, input validation, and result specifications for accepting both Date objects and numeric timestamps.

## Function Signature

### Current Function
```typescript
export function compare(
  date1: Date,
  date2: Date,
  order: "ASC" | "DESC" = "ASC"
): number
```

### Enhanced Function
```typescript
export function compare(
  date1: Date | number,
  date2: Date | number,
  order?: "ASC" | "DESC" | "asc" | "desc"
): number
```

## Input Types

### DateInput Union Type
```typescript
type DateInput = Date | number;
```

**Description**: Represents acceptable date input formats
- `Date`: Standard JavaScript Date object
- `number`: Unix timestamp in milliseconds

**Validation Rules**:
- Date objects must be valid (not Invalid Date)
- Numbers must represent valid timestamps within JavaScript Date range
- Uses existing `isValidDateOrNumber` validator for consistency

### OrderParameter Type
```typescript
type OrderParameter = "ASC" | "DESC" | "asc" | "desc" | undefined;
```

**Description**: Case-insensitive sort order specification
- `"ASC"` | `"asc"`: Ascending chronological order (default)
- `"DESC"` | `"desc"`: Descending chronological order
- `undefined`: Defaults to ascending order

**Normalization**: All inputs converted to uppercase internally for processing

## Function Behavior

### Input Processing Flow
```
1. Accept date1: Date | number, date2: Date | number, order?: OrderParameter
2. Convert numbers to Date objects if needed:
   - typeof date1 === "number" ? new Date(date1) : date1
   - typeof date2 === "number" ? new Date(date2) : date2
3. Validate converted Date objects using isValidDateOrNumber
4. Normalize order parameter: order?.toUpperCase() || "ASC"
5. Validate normalized order is "ASC" or "DESC"
6. Proceed with existing comparison logic
```

### Return Value
```typescript
type ComparisonResult = -1 | 0 | 1;
```

**Specification**:
- `-1`: First date is chronologically before second date
- `0`: Dates are chronologically equal
- `1`: First date is chronologically after second date

**Order adjustment**: Result inverted for descending order (`DESC`)

## Validation Rules

### Input Validation
1. **Type Validation**: Each input must be Date object or number
2. **Date Validity**: Date objects must not be Invalid Date
3. **Timestamp Validity**: Numbers must create valid Date when passed to Date constructor
4. **Order Validation**: Order parameter must normalize to "ASC" or "DESC"

### Error Conditions
```typescript
// Invalid date object
throw new RangeError("First date is invalid");
throw new RangeError("Second date is invalid");

// Invalid order parameter
throw new RangeError("Order must be 'ASC' or 'DESC' (case insensitive)");

// Type validation handled by isValidDateOrNumber
```

## Backward Compatibility

### Preserved Behaviors
- Function signature compatible: `Date` inputs work unchanged
- Error messages identical for equivalent scenarios
- Return value specification unchanged
- Default parameter behavior maintained

### Enhanced Capabilities
- Accepts numeric timestamps alongside Date objects
- Case-insensitive order parameters
- Graceful default when order parameter omitted

## Performance Characteristics

### Validation Overhead
- Input type checking: O(1) per input
- Date object creation: O(1) for numeric inputs
- Validation using existing infrastructure
- Target: <1ms overhead per comparison

### Memory Usage
- Temporary Date object creation for numeric inputs
- No additional memory allocation for Date inputs
- Minimal impact on Array.sort() memory patterns

### Sorting Performance
- Individual comparison: O(1)
- Array sorting: O(n log n) - unchanged from current
- Target: <100ms for 10,000 date array sorting

## Integration Points

### Existing Validators
```typescript
import { isValidDateOrNumber } from "../_lib/validators";
```

**Usage**: Consistent validation approach across codebase following feature 009 standardization

### Error Handling Pattern
- Follows existing compare function error handling
- Maintains RangeError types for consistency
- Error messages provide clear guidance for resolution

### Type System Integration
- Leverages TypeScript union types for input flexibility
- Maintains type safety with proper validation
- Compatible with existing function overloads in ecosystem

## Test Data Requirements

### Input Scenarios
1. **Date + Date**: Current functionality unchanged
2. **number + number**: Both timestamps
3. **Date + number**: Mixed input types
4. **number + Date**: Mixed input types (reversed)

### Order Parameter Scenarios
1. **"ASC"**: Current uppercase ascending
2. **"DESC"**: Current uppercase descending
3. **"asc"**: New lowercase ascending
4. **"desc"**: New lowercase descending
5. **undefined**: Default to ascending

### Edge Cases
1. **Invalid Date objects**: Both inputs
2. **Invalid timestamps**: Out of JavaScript Date range
3. **Invalid order**: Non-string, unrecognized string values
4. **Boundary dates**: MIN_DATE, MAX_DATE scenarios

## Documentation Requirements

### Function Documentation Updates
- JSDoc parameter types: `Date | number`
- Order parameter: Document case-insensitive behavior
- Examples: Show mixed input types and case variations
- Migration guide: Highlight backward compatibility

### Type Definition Updates
- Export enhanced function signature
- Document union types for broader ecosystem usage
- Maintain compatibility with existing type imports