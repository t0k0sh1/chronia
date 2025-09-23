# Research: isBetween with BetweenOption

## Interval Notation Conventions

**Decision**: Mathematical interval notation with brackets and parentheses
- "()" for open/exclusive boundaries (both excluded)
- "[]" for closed/inclusive boundaries (both included)
- "[)" for left-closed, right-open (start included, end excluded)
- "(]" for left-open, right-closed (start excluded, end included)

**Rationale**:
- Industry standard mathematical notation understood globally
- Used in mathematics, databases (PostgreSQL ranges), and many programming libraries
- Concise single-string representation
- Visual clarity: brackets "grab" the boundary, parentheses "push away"

**Alternatives Considered**:
1. Boolean flags (includeStart/includeEnd):
   - More verbose: `{ includeStart: true, includeEnd: false }`
   - Requires two properties instead of one
   - Less immediately recognizable pattern

2. Enum-based approach (INCLUSIVE/EXCLUSIVE):
   - Would require separate enums for start and end
   - More typing-heavy in TypeScript
   - Less flexible for future extensions

3. String literals ("inclusive"/"exclusive"):
   - Ambiguous for mixed boundaries
   - Would need compound strings like "start-inclusive-end-exclusive"

## TypeScript Type Definition Patterns

**Decision**: Literal union type for bounds property
```typescript
type BoundsType = "()" | "[]" | "[)" | "(]";
type BetweenOption = {
  bounds?: BoundsType;
};
```

**Rationale**:
- Type-safe with compile-time checking
- IntelliSense support in IDEs
- No runtime overhead (types are erased)
- Clear and concise

**Alternatives Considered**:
1. Enum:
   - More verbose, requires additional export
   - Runtime overhead (enums generate JavaScript)

2. Const assertion:
   - Would require runtime object
   - Less clear in type signatures

## Library Precedents

**Similar Implementations Found**:
1. **date-fns**: Uses separate functions (isWithinInterval with includeStart/includeEnd)
2. **Moment.js**: Uses isBetween with inclusivity parameter
3. **Luxon**: Uses Interval class with contains method
4. **PostgreSQL**: Uses interval notation directly in queries

**Key Insight**: Mathematical notation is well-established but underutilized in JavaScript date libraries, presenting an opportunity for a cleaner API.

## Backward Compatibility Strategy

**Decision**: Default to "()" (both boundaries exclusive)

**Rationale**:
- Current implementation uses strict comparison (< and >)
- Maintains exact current behavior when opts parameter omitted
- No breaking changes for existing users

**Migration Path**:
- Existing calls: `isBetween(date, interval)` → continues working unchanged
- New calls: `isBetween(date, interval, { bounds: "[]" })` → opt-in to new behavior

## Performance Considerations

**Decision**: Direct comparison without function lookup

**Rationale**:
- Simple if/else or switch statement for 4 cases
- No function indirection or object property access
- Maintains current performance characteristics
- Predictable branch prediction for JIT compilation

**Implementation Approach**:
```typescript
switch (opts?.bounds ?? "()") {
  case "[]": return dateTime >= startTime && dateTime <= endTime;
  case "[)": return dateTime >= startTime && dateTime < endTime;
  case "(]": return dateTime > startTime && dateTime <= endTime;
  case "()":
  default: return dateTime > startTime && dateTime < endTime;
}
```

## Validation Strategy

**Decision**: Validate bounds value at runtime with TypeScript compile-time safety

**Rationale**:
- TypeScript prevents invalid values at compile time
- Runtime validation catches any JavaScript callers
- Return false for invalid bounds (consistent with current invalid input handling)

## Documentation Requirements

**Key Points to Document**:
1. Mathematical notation explanation with examples
2. Visual diagram showing inclusion/exclusion
3. Migration guide from no options to bounds
4. Common use cases for each boundary type

## Summary

The research confirms that mathematical interval notation with a `bounds` property is the optimal approach for this enhancement. It provides a clean, industry-standard API that maintains backward compatibility while offering precise boundary control. The implementation will be performant and type-safe, fitting well within the existing codebase architecture.