# Data Model: getTime/setTime Implementation

## Function Signatures

### getTime Function
```typescript
/**
 * Extract timestamp value from a Date object.
 *
 * @param date - The Date object to extract timestamp from
 * @returns The number of milliseconds since Unix epoch, or NaN for invalid dates
 *
 * @example
 * getTime(new Date('2024-01-01')); // 1704067200000
 * getTime(new Date('invalid')); // NaN
 */
export function getTime(date: Date): number;
```

### setTime Function
```typescript
/**
 * Set the timestamp value of a Date object.
 *
 * @param date - The Date object to modify
 * @param time - The timestamp in milliseconds since Unix epoch
 * @returns The Date object (modified in place)
 *
 * @example
 * const date = new Date();
 * setTime(date, 1704067200000); // Sets date to 2024-01-01
 *
 * @example
 * const date = new Date();
 * setTime(date, NaN); // Creates invalid date
 */
export function setTime(date: Date, time: number): Date;
```

## Data Types and Ranges

### Timestamp Values
- **Type**: `number`
- **Valid Range**: ±8.64e15 milliseconds from Unix epoch
- **Special Values**:
  - `NaN`: Represents invalid date/time
  - `Infinity` / `-Infinity`: Out of valid range, creates invalid Date

### Date Objects
- **Input Type**: JavaScript `Date` objects
- **State**: Can be valid or invalid
- **Validation**: Determined by internal timestamp value
- **Mutability**: setTime modifies the original Date object

## Behavioral Model

### getTime Behavior
| Input Date State | Return Value | Description |
|-----------------|--------------|-------------|
| Valid Date | Timestamp number | Milliseconds since Unix epoch |
| Invalid Date | NaN | For dates created with invalid parameters |
| Date with NaN timestamp | NaN | Preserves invalid state |

### setTime Behavior
| Input Timestamp | Date State After | Return Value | Description |
|----------------|------------------|--------------|-------------|
| Valid number | Valid Date | Original Date object | Sets internal timestamp |
| NaN | Invalid Date | Original Date object | Creates invalid date |
| Infinity | Invalid Date | Original Date object | Out of range value |
| Very large number | Invalid Date | Original Date object | Beyond valid Date range |

## Error Handling

### Input Validation
- **getTime**: Accepts any Date object (no runtime validation needed)
- **setTime**: Accepts any Date object and any number value
- **Type Safety**: Provided by TypeScript at compile time

### Error Conditions
- **No Exceptions**: Functions never throw exceptions
- **Invalid Input Handling**:
  - getTime returns NaN for invalid dates
  - setTime creates invalid dates for invalid timestamps
- **Graceful Degradation**: Maintains compatibility with native Date behavior

## Compatibility Matrix

### JavaScript Date.prototype Compatibility
| Operation | Native Behavior | Our Implementation | Status |
|-----------|----------------|-------------------|---------|
| getTime() on valid Date | Returns timestamp | Returns timestamp | ✅ Compatible |
| getTime() on invalid Date | Returns NaN | Returns NaN | ✅ Compatible |
| setTime() with valid timestamp | Sets time, returns timestamp | Sets time, returns Date | ⚠️ Different return type |
| setTime() with NaN | Creates invalid Date | Creates invalid Date | ✅ Compatible |
| setTime() with Infinity | Creates invalid Date | Creates invalid Date | ✅ Compatible |

**Note**: setTime implementation returns the Date object (for chaining) rather than the timestamp value. This provides better integration with the utility library pattern while maintaining the same state changes as native setTime.

## Usage Patterns

### Basic Operations
```typescript
// Extract timestamp
const timestamp = getTime(new Date('2024-01-01'));

// Set timestamp
const date = new Date();
setTime(date, 1704067200000);
```

### Chaining Operations
```typescript
// Function chaining with setTime
const result = setTime(new Date(), Date.now())
  .toISOString();
```

### Error Handling
```typescript
// Handle invalid dates
const timestamp = getTime(new Date('invalid'));
if (isNaN(timestamp)) {
  // Handle invalid date case
}
```

## Performance Characteristics

### Time Complexity
- **getTime**: O(1) - Direct property access
- **setTime**: O(1) - Direct property modification

### Memory Usage
- **getTime**: No additional memory allocation
- **setTime**: No additional memory allocation (modifies in-place)

### Optimization Notes
- Direct delegation to native Date methods when possible
- No intermediate object creation
- Minimal function call overhead