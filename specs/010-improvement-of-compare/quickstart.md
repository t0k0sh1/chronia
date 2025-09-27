# Quickstart: Enhanced Compare Function

**Date**: 2025-09-27
**Feature**: Compare Function Enhancement
**Branch**: `010-improvement-of-compare`

## Overview

This quickstart guide validates the enhanced compare function implementation that accepts both Date objects and numeric timestamps with case-insensitive order parameters.

## Prerequisites

- Node.js 18+ installed
- Chronia project dependencies installed (`npm install`)
- Enhanced compare function implemented in `src/compare/index.ts`

## Quick Validation Steps

### 1. Basic Functionality Test

```bash
# Run enhanced compare function tests
npm test specs/010-improvement-of-compare/contracts/enhanced-compare.test.ts
```

**Expected Result**: All contract tests pass, confirming enhanced functionality works correctly.

### 2. Backward Compatibility Verification

```bash
# Run existing compare function tests (should remain unchanged)
npm test tests/compare.test.ts
```

**Expected Result**: All existing tests pass without modification, confirming backward compatibility.

### 3. Integration Test

Create a test file to verify real-world usage:

```typescript
// temp-test.ts
import { compare } from './src/compare/index.js';

// Test mixed input types
const date = new Date('2024-01-15');
const timestamp = new Date('2024-01-10').getTime();

console.log('Date vs Timestamp:', compare(date, timestamp)); // Should be 1
console.log('Case insensitive:', compare(date, timestamp, 'desc')); // Should be -1
console.log('Default order:', compare(timestamp, date)); // Should be -1

// Test with arrays
const mixed = [
  new Date('2024-01-03'),
  new Date('2024-01-01').getTime(),
  new Date('2024-01-02')
];

const sorted = mixed.sort((a, b) => compare(a, b));
console.log('Sorted mixed array:', sorted);
```

```bash
# Run integration test
npx tsx temp-test.ts
```

**Expected Output**:
```
Date vs Timestamp: 1
Case insensitive: -1
Default order: -1
Sorted mixed array: [1704067200000, 2024-01-02T00:00:00.000Z, 2024-01-03T00:00:00.000Z]
```

### 4. Performance Validation

```typescript
// performance-test.ts
import { compare } from './src/compare/index.js';

// Test with 10,000 mixed Date and number inputs
const testData = Array.from({ length: 10000 }, (_, i) =>
  i % 2 === 0
    ? new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)
    : Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
);

console.time('Enhanced Compare Sort');
const sorted = testData.sort((a, b) => compare(a, b));
console.timeEnd('Enhanced Compare Sort');

console.log(`Sorted ${testData.length} items`);
console.log('First item:', sorted[0]);
console.log('Last item:', sorted[sorted.length - 1]);
```

```bash
# Run performance test
npx tsx performance-test.ts
```

**Expected Result**: Sort completion under 100ms for 10,000 items.

## Feature Validation Checklist

### ✅ Core Functionality
- [ ] Function accepts Date objects (existing behavior)
- [ ] Function accepts numeric timestamps (new behavior)
- [ ] Function accepts mixed Date and number inputs (new behavior)
- [ ] Returns -1, 0, or 1 as expected for all input combinations

### ✅ Case-Insensitive Order Parameters
- [ ] Accepts "ASC" and "DESC" (existing behavior)
- [ ] Accepts "asc" and "desc" (new behavior)
- [ ] Defaults to ascending when order parameter omitted
- [ ] Throws appropriate error for invalid order parameters

### ✅ Backward Compatibility
- [ ] All existing function calls work unchanged
- [ ] All existing tests pass without modification
- [ ] Error messages remain consistent for equivalent scenarios
- [ ] Array.sort() integration works identically

### ✅ Error Handling
- [ ] Invalid Date objects throw RangeError
- [ ] Invalid timestamps throw RangeError
- [ ] Invalid order parameters throw RangeError with helpful message
- [ ] Error messages provide clear guidance

### ✅ Performance Requirements
- [ ] Individual comparisons complete efficiently
- [ ] Large array sorting (10,000 items) completes under 100ms
- [ ] Memory usage remains reasonable
- [ ] No significant performance regression vs current implementation

## Common Issues and Solutions

### Issue: "Cannot find module" errors
**Solution**: Ensure you're running tests from the project root and all dependencies are installed.

### Issue: Contract tests failing
**Solution**: Verify the enhanced compare function is properly implemented with correct type signatures.

### Issue: Performance tests timing out
**Solution**: Reduce test data size for development environments, ensure no debug logging in performance-critical paths.

### Issue: Existing tests breaking
**Solution**: This indicates a backward compatibility issue. Review implementation to ensure existing behavior is preserved.

## Success Criteria

The implementation is ready for production when:

1. ✅ All contract tests pass
2. ✅ All existing tests continue passing
3. ✅ Performance targets met (<100ms for 10k items)
4. ✅ No breaking changes in API surface
5. ✅ Documentation updated with new examples
6. ✅ Type definitions export enhanced signatures

## Next Steps

After quickstart validation succeeds:

1. **Update Documentation**: Update README.md with enhanced usage examples
2. **API Documentation**: Regenerate TypeDoc documentation
3. **Version Planning**: Plan version bump strategy (minor version for new features)
4. **Release Notes**: Document new capabilities and backward compatibility

## Rollback Plan

If issues are discovered:

1. **Immediate**: Revert to previous compare function implementation
2. **Analysis**: Review contract test failures and performance metrics
3. **Fix**: Address specific issues identified in testing
4. **Re-validate**: Run complete quickstart validation again

This quickstart ensures the enhanced compare function meets all requirements while maintaining the reliability and performance expected from the chronia library.