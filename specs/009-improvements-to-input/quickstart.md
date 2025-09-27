# Quickstart: Input Validation Standardization

**Feature**: 009-improvements-to-input | **Date**: 2025-09-27

## Overview

This quickstart guide validates the successful standardization of input validation across all clamp, compare, is*, and diff* functions in the chronia library. The goal is to replace manual validation with internal validator functions while maintaining exact current behavior.

## Prerequisites

- Node.js 18+ installed
- Chronia library source code
- Vitest testing framework
- Performance monitoring tools

## Validation Steps

### Step 1: Verify Current State
```bash
# Navigate to project directory
cd /path/to/chronia

# Run existing tests to establish baseline
npm test

# Verify current validation patterns
grep -r "isNaN.*getTime" src/
grep -r "isValidDate" src/
```

**Expected Result**:
- All tests pass (baseline: 2100+ tests)
- Manual isNaN patterns found in multiple functions
- Limited use of internal validators

### Step 2: Run Contract Tests (Pre-Implementation)
```bash
# Run the new contract tests - these should FAIL initially
npm test -- specs/009-improvements-to-input/contracts/
```

**Expected Result**:
- ❌ Validation standardization tests should FAIL (functions don't use internal validators yet)
- ❌ Validator usage tests should FAIL (import statements not updated)
- ✅ Behavior tests may PASS (current behavior working correctly)

### Step 3: Performance Baseline Measurement
```bash
# Create performance baseline
npm test -- --reporter=verbose | grep -E "(ms|μs)"

# Run specific performance tests
npm test -- tests/performance/ || echo "Performance tests will be added during implementation"
```

**Expected Result**:
- Document current execution times for key functions
- Establish <5% regression threshold

### Step 4: Execute Validation Standardization
*This step will be performed during implementation*

**For Boolean Functions (is*)**:
```bash
# Example implementation verification
grep -A 5 -B 5 "isValidDateOrNumber" src/isAfter/index.ts
grep -A 5 -B 5 "isValidDateOrNumber" src/isBefore/index.ts
```

**For Calculation Functions (diff*)**:
```bash
# Example implementation verification
grep -A 5 -B 5 "isValidDateOrNumber" src/diffDays/index.ts
grep -A 5 -B 5 "isValidDateOrNumber" src/diffMinutes/index.ts
```

**For Range Functions (clamp)**:
```bash
# Example implementation verification
grep -A 5 -B 5 "isValidDateOrNumber" src/clamp/index.ts
```

**For Comparison Functions (compare)**:
```bash
# Example implementation verification
grep -A 5 -B 5 "isValidDate" src/compare/index.ts
```

### Step 5: Verify Implementation
```bash
# Verify all manual validation is replaced
! grep -r "isNaN.*getTime" src/ || echo "Manual validation still found"

# Verify internal validators are used
grep -r "isValidDate\|isValidNumber\|isValidDateOrNumber" src/ | wc -l

# Run updated tests
npm test

# Run contract tests to ensure they now pass
npm test -- specs/009-improvements-to-input/contracts/
```

**Expected Result**:
- ✅ No manual isNaN patterns remaining in target functions
- ✅ Internal validators used in 25+ function files
- ✅ All existing tests continue to pass
- ✅ Contract tests now pass

### Step 6: Performance Verification
```bash
# Compare performance to baseline
npm test -- --reporter=verbose | grep -E "(ms|μs)"

# Run performance contract tests
npm test -- specs/009-improvements-to-input/contracts/validation-standardization.test.ts -t "performance"
```

**Expected Result**:
- ✅ Performance regression <5% of baseline
- ✅ Validation overhead <0.2μs per function call
- ✅ Memory usage unchanged

### Step 7: Behavioral Validation
```bash
# Test specific behavioral preservation
npm test -- tests/compare.test.ts
npm test -- tests/clamp.test.ts
npm test -- tests/isAfter.test.ts
npm test -- tests/diffDays.test.ts

# Verify error message preservation
npm test -- -t "error message"
npm test -- -t "RangeError"
```

**Expected Result**:
- ✅ All function behaviors identical to before
- ✅ Error messages exactly preserved
- ✅ Edge cases handled consistently

## Verification Checklist

### Code Quality
- [ ] All target functions import appropriate validators
- [ ] No manual isNaN(date.getTime()) patterns in target functions
- [ ] Import paths consistent across all functions
- [ ] No new external dependencies introduced
- [ ] TypeScript compilation succeeds without warnings

### Functional Validation
- [ ] All existing tests pass without modification
- [ ] Comparison functions still throw RangeError with exact messages
- [ ] Boolean functions still return false for invalid inputs
- [ ] Calculation functions still handle invalid inputs gracefully
- [ ] Range functions still return Invalid Date for invalid inputs

### Performance Validation
- [ ] Performance regression <5% of baseline execution time
- [ ] Individual function calls complete in <0.2μs additional overhead
- [ ] Memory allocation patterns unchanged
- [ ] No observable performance degradation in real-world usage

### Contract Validation
- [ ] All contract tests pass after implementation
- [ ] Validator usage verified in all target functions
- [ ] Import statements consistent and correct
- [ ] Function signatures unchanged

## Success Criteria

The validation standardization is successful when:

1. **Code Consistency**: All 25+ target functions use internal validators
2. **Behavioral Preservation**: Zero functional changes to any public API
3. **Performance**: <5% regression in execution time
4. **Quality**: All tests pass, ESLint/TypeScript validation succeeds
5. **Contract Compliance**: All contract tests pass

## Rollback Plan

If issues are discovered:

1. **Revert function changes**:
   ```bash
   git checkout HEAD~1 -- src/
   ```

2. **Verify rollback success**:
   ```bash
   npm test
   npm run lint
   ```

3. **Re-analyze issues**:
   ```bash
   # Check specific failing test patterns
   npm test -- --reporter=verbose
   ```

## Next Steps

After successful validation:

1. Update performance benchmarks with new baselines
2. Consider applying similar standardization to other function categories
3. Document the validation approach for future reference
4. Monitor production usage for any behavioral changes

## Common Issues and Solutions

### Import Resolution Errors
- **Issue**: Module not found errors
- **Solution**: Verify relative path calculation to `_lib/validators`

### Test Failures
- **Issue**: Existing tests fail after changes
- **Solution**: Ensure exact behavioral preservation, check edge cases

### Performance Regression
- **Issue**: Functions slower than baseline
- **Solution**: Optimize validator calls, check for unnecessary operations

### Type Checking Issues
- **Issue**: TypeScript compilation errors
- **Solution**: Verify type guard usage and parameter types match

This quickstart ensures comprehensive validation of the input validation standardization while maintaining all current functionality and performance characteristics.