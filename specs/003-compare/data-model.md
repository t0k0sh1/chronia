# Data Model: Compare Function Implementation

**Phase 1 Output** | **Date**: 2024-09-23

## Function Signature

```typescript
/**
 * Compare two Date objects chronologically.
 *
 * @param date1 - The first Date object to compare
 * @param date2 - The second Date object to compare
 * @param order - Optional sort order: "ASC" for ascending (default) or "DESC" for descending
 * @returns -1 if date1 < date2, 1 if date1 > date2, 0 if equal (adjusted for order)
 *
 * @throws {RangeError} When arguments are not valid Date objects or order is invalid
 *
 * @example
 * compare(new Date('2024-01-01'), new Date('2024-01-02')); // -1 (ascending)
 * compare(new Date('2024-01-01'), new Date('2024-01-02'), 'DESC'); // 1 (descending)
 * compare(new Date('2024-01-01'), new Date('2024-01-01')); // 0 (equal)
 */
export function compare(
  date1: Date,
  date2: Date,
  order?: 'ASC' | 'DESC'
): number;
```

## Data Types and Validation

### Input Parameters

| Parameter | Type | Required | Validation Rules |
|-----------|------|----------|------------------|
| `date1` | `Date` | ✅ | Must be Date instance with valid timestamp (no NaN) |
| `date2` | `Date` | ✅ | Must be Date instance with valid timestamp (no NaN) |
| `order` | `'ASC' \| 'DESC'` | ❌ | If provided, must be exactly "ASC" or "DESC" |

### Return Value

| Type | Range | Description |
|------|-------|-------------|
| `number` | `-1, 0, 1` | Standard comparison function contract |

### Error Conditions

| Condition | Error Type | Message |
|-----------|------------|---------|
| `date1` not Date instance | `RangeError` | "First argument must be a Date object" |
| `date2` not Date instance | `RangeError` | "Second argument must be a Date object" |
| `date1` has NaN timestamp | `RangeError` | "First date is invalid" |
| `date2` has NaN timestamp | `RangeError` | "Second date is invalid" |
| Invalid order parameter | `RangeError` | "Order must be 'ASC' or 'DESC'" |

## Behavioral Model

### Comparison Logic (ASC order)

| date1 vs date2 | Return Value | Description |
|----------------|--------------|-------------|
| Earlier | -1 | date1 comes before date2 chronologically |
| Later | 1 | date1 comes after date2 chronologically |
| Same | 0 | date1 and date2 represent same moment |

### Comparison Logic (DESC order)

| date1 vs date2 | Return Value | Description |
|----------------|--------------|-------------|
| Earlier | 1 | For descending sort, earlier date should sort after |
| Later | -1 | For descending sort, later date should sort before |
| Same | 0 | Equal dates remain equal regardless of order |

### Array.sort() Integration

```typescript
// Ascending chronological order
dates.sort(compare);
// or explicitly
dates.sort((a, b) => compare(a, b, 'ASC'));

// Descending chronological order
dates.sort((a, b) => compare(a, b, 'DESC'));
```

## Implementation Algorithm

```typescript
1. Validate date1 instanceof Date, throw RangeError if not
2. Validate date2 instanceof Date, throw RangeError if not
3. Validate date1.getTime() is not NaN, throw RangeError if invalid
4. Validate date2.getTime() is not NaN, throw RangeError if invalid
5. Validate order parameter if provided, throw RangeError if invalid
6. Extract timestamps: t1 = date1.getTime(), t2 = date2.getTime()
7. Calculate base comparison: result = (t1 < t2) ? -1 : (t1 > t2) ? 1 : 0
8. Apply order adjustment: if order === 'DESC' then result *= -1
9. Return result
```

## Edge Cases and Boundaries

### Date Range Boundaries
- Maximum valid Date: `new Date(8640000000000000)`
- Minimum valid Date: `new Date(-8640000000000000)`
- Both boundaries should be compared correctly

### Precision Considerations
- JavaScript Date precision: milliseconds
- Identical timestamps (same millisecond) return 0
- Microsecond differences are not distinguished

### Timezone Handling
- Date objects store UTC timestamps internally
- Comparison unaffected by timezone display
- getTime() returns UTC milliseconds consistently

## Performance Characteristics

### Time Complexity
- **Input validation**: O(1) - constant time checks
- **Timestamp extraction**: O(1) - native Date.getTime() call
- **Comparison**: O(1) - simple arithmetic comparison
- **Overall**: O(1) - constant time operation

### Memory Usage
- No additional object allocation
- No intermediate data structures
- Minimal stack frame overhead

### Benchmark Expectations
- Should perform within 10x of native Date comparison
- Target: < 10ns per comparison on modern hardware
- No performance degradation with order parameter