# Data Model: Input Validation Standardization

**Feature**: 009-improvements-to-input | **Date**: 2025-09-27

## Core Entities

### ValidatorFunction
**Purpose**: Internal validation utilities for type and value checking

**Attributes**:
- `name: string` - Function name (isValidDate, isValidNumber, isValidDateOrNumber)
- `inputType: unknown` - Accepts any input type for validation
- `returnType: boolean` - Returns type guard boolean
- `typeGuard: string` - TypeScript type guard specification

**Relationships**:
- Used by → FunctionImplementation (many-to-many)
- Defined in → ValidatorModule (one-to-many)

**Validation Rules**:
- Must return boolean value
- Must provide type guard for TypeScript
- Must handle all input types gracefully

### FunctionImplementation
**Purpose**: Date utility functions requiring validation standardization

**Attributes**:
- `name: string` - Function name (clamp, compare, isAfter, diffDays, etc.)
- `category: FunctionCategory` - Function type classification
- `inputParameters: Parameter[]` - List of input parameters requiring validation
- `currentValidation: ValidationPattern` - Existing validation approach
- `targetValidation: ValidatorFunction[]` - Intended validator functions to use

**Relationships**:
- Belongs to → FunctionCategory (many-to-one)
- Contains → Parameter (one-to-many)
- Uses → ValidatorFunction (many-to-many)

**State Transitions**:
1. `current` → `analyzing` (assessment phase)
2. `analyzing` → `planned` (validation strategy determined)
3. `planned` → `implementing` (code changes in progress)
4. `implementing` → `testing` (validation of changes)
5. `testing` → `completed` (standardization complete)

### FunctionCategory
**Purpose**: Classification of functions by behavior and error handling patterns

**Attributes**:
- `name: string` - Category name
- `errorHandling: ErrorHandlingStrategy` - How invalid inputs are handled
- `returnBehavior: string` - What the function returns for invalid inputs

**Values**:
- `comparison` - Throws RangeError with descriptive messages (compare)
- `boolean` - Returns false for invalid inputs (is* functions)
- `calculation` - Returns NaN or 0 for invalid inputs (diff* functions)
- `range` - Returns Invalid Date for invalid inputs (clamp)

**Relationships**:
- Contains → FunctionImplementation (one-to-many)

### Parameter
**Purpose**: Function input parameter requiring validation

**Attributes**:
- `name: string` - Parameter name
- `type: string` - Expected TypeScript type (Date | number)
- `required: boolean` - Whether parameter is required
- `validatorNeeded: ValidatorFunction` - Which validator function to use

**Relationships**:
- Belongs to → FunctionImplementation (many-to-one)
- Validated by → ValidatorFunction (many-to-one)

### ValidationPattern
**Purpose**: Current validation approach used in existing code

**Attributes**:
- `type: string` - Pattern type (manual-isNaN, internal-validator, none, etc.)
- `implementation: string` - Current code pattern used
- `consistency: boolean` - Whether pattern is consistent with library standards

**Values**:
- `manual-isNaN` - Uses isNaN(date.getTime()) checks
- `internal-validator` - Uses isValidDate/isValidNumber functions
- `simple-conversion` - Relies on Date constructor behavior
- `comprehensive-error` - Includes type checking and descriptive errors

**Relationships**:
- Used by → FunctionImplementation (one-to-many)

## Data Relationships

```
ValidatorModule
├── ValidatorFunction (isValidDate)
├── ValidatorFunction (isValidNumber)
└── ValidatorFunction (isValidDateOrNumber)

FunctionCategory (comparison)
├── FunctionImplementation (compare)
│   ├── Parameter (date1: Date)
│   └── Parameter (date2: Date)

FunctionCategory (boolean)
├── FunctionImplementation (isAfter)
├── FunctionImplementation (isBefore)
├── FunctionImplementation (isEqual)
└── [... other is* functions]

FunctionCategory (calculation)
├── FunctionImplementation (diffDays)
├── FunctionImplementation (diffMinutes)
└── [... other diff* functions]

FunctionCategory (range)
└── FunctionImplementation (clamp)
    ├── Parameter (date: Date | number)
    ├── Parameter (minDate: Date | number)
    └── Parameter (maxDate: Date | number)
```

## Validation Matrix

| Function Category | Current Pattern | Target Validator | Error Handling |
|------------------|----------------|------------------|----------------|
| comparison | mixed (isValidDate + manual) | isValidDate | RangeError |
| boolean | manual isNaN | isValidDateOrNumber | return false |
| calculation | manual isNaN | isValidDateOrNumber | return NaN/0 |
| range | manual isNaN | isValidDateOrNumber | Invalid Date |

## State Management

### Validation State Flow
1. **Input Reception**: Function receives parameters
2. **Type Validation**: Check parameter types using internal validators
3. **Value Validation**: Verify values are valid (not Invalid Date, finite numbers)
4. **Error Handling**: Apply category-specific error response
5. **Processing**: Continue with main function logic if validation passes

### Data Invariants
- All validators must return boolean values
- ValidationPattern consistency must be maintained within categories
- Parameter validation must occur before any processing
- Error handling must match category specifications
- Performance impact must remain <5% of baseline

## Implementation Considerations

### Validation Sequencing
- Type validation before value validation
- Early return on validation failure
- Preserve exact current error messages where applicable

### Performance Constraints
- Validator functions must complete in <0.2μs per call
- Total validation overhead <5% of function execution time
- Memory allocation impact minimal

### Error Message Preservation
- compare function: Maintain exact RangeError messages
- Other functions: Preserve current return value patterns
- No new error types introduced

## Data Flow Examples

### Example 1: Boolean Function Validation
```
Input: isAfter(dateA, dateB)
├── Parameter validation
│   ├── isValidDateOrNumber(dateA) → boolean
│   └── isValidDateOrNumber(dateB) → boolean
├── Error handling: return false if either invalid
└── Processing: continue with comparison logic
```

### Example 2: Comparison Function Validation
```
Input: compare(date1, date2, order)
├── Parameter validation
│   ├── instanceof Date check for date1
│   ├── isValidDate(date1) → boolean
│   ├── instanceof Date check for date2
│   └── isValidDate(date2) → boolean
├── Error handling: throw RangeError with specific message
└── Processing: continue with comparison logic
```

This data model ensures consistent validation across all function categories while preserving existing behavior patterns and meeting performance requirements.