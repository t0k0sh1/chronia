# Data Model: isBetween with BetweenOption

## Type Definitions

### BoundsType
```typescript
/**
 * Mathematical interval notation for boundary inclusion/exclusion.
 * - "()" : Both boundaries excluded (open interval)
 * - "[]" : Both boundaries included (closed interval)
 * - "[)" : Start included, end excluded (left-closed, right-open)
 * - "(]" : Start excluded, end included (left-open, right-closed)
 */
type BoundsType = "()" | "[]" | "[)" | "(]";
```

### BetweenOption
```typescript
/**
 * Configuration options for the isBetween function.
 * Controls how boundary dates are treated in the comparison.
 */
type BetweenOption = {
  /**
   * Specifies boundary inclusion using mathematical interval notation.
   * Defaults to "()" for backward compatibility.
   *
   * @default "()"
   */
  bounds?: BoundsType;
};
```

## Updated Function Signature

```typescript
/**
 * Check if a date falls between two boundary dates with configurable inclusion.
 *
 * @param date - The date to check (Date object or timestamp)
 * @param interval - Interval object with start and end boundaries
 * @param opts - Optional configuration for boundary inclusion
 * @returns True if date is between the boundaries according to the bounds configuration
 *
 * @example
 * // Default behavior (exclusive boundaries)
 * isBetween(new Date('2024-06-15'), {
 *   start: new Date('2024-06-10'),
 *   end: new Date('2024-06-20')
 * }); // true
 *
 * @example
 * // Inclusive boundaries
 * isBetween(new Date('2024-06-10'), {
 *   start: new Date('2024-06-10'),
 *   end: new Date('2024-06-20')
 * }, { bounds: "[]" }); // true
 */
export function isBetween(
  date: Date | number,
  interval: Interval,
  opts?: BetweenOption
): boolean;
```

## Behavioral Model

### State Transitions

The function behavior changes based on the `bounds` option:

| Bounds | Start Comparison | End Comparison | Description |
|--------|-----------------|----------------|-------------|
| "()" | date > start | date < end | Both boundaries excluded (default) |
| "[]" | date >= start | date <= end | Both boundaries included |
| "[)" | date >= start | date < end | Start included, end excluded |
| "(]" | date > start | date <= end | Start excluded, end included |

### Validation Rules

1. **Date Validation**:
   - Must be a valid Date object or number (timestamp)
   - Invalid dates return `false`

2. **Interval Validation**:
   - Must be an object with `start` and `end` properties
   - `start` and `end` can be Date, number, or null
   - Invalid intervals return `false`

3. **Bounds Validation**:
   - Must be one of the four valid BoundsType values
   - Invalid bounds treated as "()" for backward compatibility
   - TypeScript ensures compile-time validation

### Edge Cases

1. **Null Boundaries**:
   - `start: null` → uses MIN_DATE
   - `end: null` → uses MAX_DATE
   - Bounds option still applies to effective boundaries

2. **Equal Boundaries**:
   - When start === end, only "[]" can return true (if date equals both)
   - Other bounds modes return false

3. **Inverted Boundaries**:
   - When start > end, always returns false regardless of bounds

## Relationships

### Existing Types
- **Interval**: No changes to the existing type
- **MIN_DATE/MAX_DATE**: Continue to be used for null boundary handling

### New Exports
```typescript
// In src/types.ts
export type BoundsType = "()" | "[]" | "[)" | "(]";
export type BetweenOption = {
  bounds?: BoundsType;
};

// In src/index.ts
export type { BetweenOption, BoundsType } from "./types";
```

## Implementation Notes

### Performance Characteristics
- O(1) time complexity maintained
- No additional memory allocation for default case
- Single switch statement for bounds handling

### Backward Compatibility
- Existing calls without `opts` parameter work unchanged
- Default bounds="()" matches current strict comparison behavior
- Type system prevents breaking changes at compile time

### Testing Requirements
Each bounds mode requires comprehensive test coverage:
- Normal cases within range
- Boundary equality cases
- Outside range cases
- Edge cases (null boundaries, invalid inputs)
- Backward compatibility verification