# Research: Type Validation Functions

## Executive Summary
Analysis of the chronia library codebase reveals two distinct validation strategies currently in use. This research informs the design of three new internal validation utilities that will standardize type checking across the library.

## Key Findings

### 1. Current Validation Patterns

**Decision**: Adopt the "Silent Fail" pattern returning false for validation functions
**Rationale**:
- Validation functions should be predicates that return boolean values
- This aligns with the requirement that validators return true/false only
- Existing functions can then decide whether to throw errors or return Invalid Date based on their needs

**Alternatives Considered**:
- Exception-based validation: Rejected as it would force error handling in every usage
- Multiple validation versions: Rejected as it adds unnecessary complexity

### 2. Existing Validation Code

**Decision**: Create new dedicated validation utilities in `src/_lib/validators.ts`
**Rationale**:
- No existing validation utilities in `_lib` directory
- Keeps internal utilities organized and discoverable
- Follows the pattern of other internal utilities (formatters, parsers)

**Alternatives Considered**:
- Adding to existing `isValid/index.ts`: Rejected as that's a public API function
- Creating separate files for each validator: Rejected as they're closely related

### 3. Type Checking Approach

**Decision**: Use strict `instanceof Date` checks combined with `isNaN` validation
**Rationale**:
- Consistent with existing strict validation in `compare` function
- Prevents Date-like objects from passing validation
- Clear and predictable behavior

**Alternatives Considered**:
- Duck typing (checking for getTime method): Rejected for lack of type safety
- Accepting Date-like objects: Rejected as spec requires actual Date instances only

### 4. Number Validation Strategy

**Decision**: Use `typeof === 'number'` with `isFinite()` check
**Rationale**:
- `isFinite()` eliminates NaN, Infinity, and -Infinity in one check
- More efficient than multiple separate checks
- Aligns with requirement FR-002 and FR-005

**Alternatives Considered**:
- `Number.isFinite()`: Functionally equivalent, chose for consistency
- Separate NaN/Infinity checks: Rejected as less efficient

### 5. Invalid Date Detection

**Decision**: Use `isNaN(date.getTime())` pattern
**Rationale**:
- Already used consistently throughout the codebase
- Reliable method to detect Invalid Date
- Works across all JavaScript environments

**Alternatives Considered**:
- String conversion check: Rejected as less reliable
- valueOf() check: Rejected as getTime() is more explicit

## Implementation Guidelines

### Function Signatures
```typescript
// All return boolean values as per FR-007
function isValidDate(value: unknown): boolean
function isValidNumber(value: unknown): boolean
function isValidDateOrNumber(value: unknown): boolean
```

### Validation Rules Matrix

| Input Type | isValidDate | isValidNumber | isValidDateOrNumber |
|------------|-------------|---------------|---------------------|
| Valid Date | true | false | true |
| Invalid Date | false | false | false |
| Finite Number | false | true | true |
| NaN | false | false | false |
| Infinity | false | false | false |
| -Infinity | false | false | false |
| null | false | false | false |
| undefined | false | false | false |
| Other | false | false | false |

### Usage Pattern
Functions will be imported and used at the beginning of public functions:
```typescript
import { isValidDate, isValidNumber, isValidDateOrNumber } from './_lib/validators';

export function publicFunction(date: Date | number) {
  if (!isValidDateOrNumber(date)) {
    return new Date(NaN);
  }
  // ... rest of implementation
}
```

## Technical Decisions

1. **No External Dependencies**: Pure TypeScript implementation
2. **Single File Organization**: All three functions in one module for cohesion
3. **Type Guards**: Functions will act as TypeScript type guards where applicable
4. **Performance**: Direct type checks without try-catch for optimal performance
5. **Testing**: Comprehensive test coverage including all edge cases from spec

## Risk Mitigation

- **Risk**: Inconsistent usage across codebase
- **Mitigation**: Will be enforced through code review and linting

- **Risk**: Performance impact from additional checks
- **Mitigation**: Optimized implementation with early returns, benchmark tests

## Conclusion

The research confirms that implementing these three validation functions will:
1. Standardize validation across the library
2. Reduce code duplication
3. Improve maintainability
4. Ensure consistent error handling

All technical uncertainties have been resolved, and the implementation can proceed with Phase 1.