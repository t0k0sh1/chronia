# Category README Documentation Guidelines

## Purpose

This document defines the standard structure and style for creating README.md files in function category directories (e.g., `validations/`, `arithmetic/`, `boundaries/`). Category READMEs help users discover related functions and understand how they work together as a cohesive group.

## Document Structure

Category README.md files should follow this standardized structure:

1. **Title** (H1) - Category name
2. **Overview** (H2) - Purpose and scope of the category
3. **Available Functions** (H2) - Table of all functions in the category
4. **Common Features** (H2) - Shared characteristics across all functions
5. **Choosing the Right Function** (H2) - Guidance on function selection
6. **Use Case Guide** (H2) - Scenario-based recommendations
7. **Common Patterns** (H2) - Practical code examples
8. **Performance Considerations** (H2) - Performance notes
9. **Type Definitions** (H2) - Relevant TypeScript types
10. **Error Handling** (H2) - Error handling patterns
11. **See Also** (H2) - Links to related categories

## Section Guidelines

### 1. Title

**Format**: `# [Category Name] Functions`

**Purpose**: Clearly identify the category and its scope.

**Example**:

```markdown
# Date Validation and Comparison Functions
```

**Rules**:

- Use descriptive category name
- Add "Functions" suffix for clarity
- Use H1 heading (`#`)

---

### 2. Overview

**Format**: 1-2 paragraphs explaining the category's purpose.

**Purpose**: Give readers a high-level understanding of what this category of functions provides.

**Example**:

```markdown
## Overview

Chronia provides a comprehensive suite of date validation and comparison functions that allow you to validate dates, compare dates with precision and flexibility, and check if dates represent the same point in time at various granularities. All functions support both Date objects and numeric timestamps, and handle invalid inputs gracefully.
```

**Rules**:

- Explain what this category of functions does
- Highlight key benefits or features
- Mention common characteristics (e.g., Date | number support)
- Keep it concise but informative

---

### 3. Available Functions

**Format**: Markdown table(s) organizing all functions in the category.

**Purpose**: Provide a comprehensive list of all functions with brief descriptions.

**Example**:

```markdown
## Available Functions

### Date Validation

| Function | Description |
|----------|-------------|
| [`isValid`](./isValid.md) | Checks if a Date object or timestamp is valid |

### Date Comparison

| Function | Description | Equality Behavior |
|----------|-------------|-------------------|
| [`isBefore`](./isBefore.md) | Checks if the first date is strictly before the second date | Returns `false` for equal dates |
| [`isAfter`](./isAfter.md) | Checks if the first date is strictly after the second date | Returns `false` for equal dates |
```

**Rules**:

- Group related functions into subsections (H3) if there are multiple types
- Use tables with appropriate columns (Function, Description, and any relevant details)
- Link function names to their individual documentation files
- Add extra columns for important distinctions (e.g., "Equality Behavior", "Granularity", "Return Type")
- Order functions logically (by precision, alphabetically, or by common usage)

---

### 4. Common Features

**Format**: Subsections (H3) explaining shared characteristics.

**Purpose**: Document features that all functions in this category share.

**Example**:

```markdown
## Common Features

All validation and comparison functions in this category share the following characteristics:

### Type Flexibility

All functions accept both Date objects and numeric timestamps:

\`\`\`typescript
import { isBefore, isValid } from 'chronia';

// Date objects
isBefore(new Date(2025, 0, 1), new Date(2025, 0, 2));  // true

// Timestamps
isBefore(1704067200000, 1704153600000);  // true
\`\`\`

### Input Validation

All functions validate inputs and return `false` for invalid dates without throwing exceptions.
```

**Rules**:

- Use H3 headings for each common feature
- Include code examples demonstrating the feature
- Cover key features like:
  - Type flexibility (Date | number)
  - Error handling behavior
  - Immutability (for transformation functions)
  - Performance characteristics
  - Special behaviors (e.g., unit-based granularity)
- Keep examples concise and focused

---

### 5. Choosing the Right Function

**Format**: Guidance on selecting the appropriate function with comparison tables.

**Purpose**: Help users understand the differences between functions and choose the right one.

**Example**:

```markdown
## Choosing the Right Function

### Validation vs Comparison vs Same-Time

**Validation Functions** (`isValid`):
- Use to check if a date or timestamp is valid
- Ideal for: input validation, error checking, data sanitization

**Comparison Functions** (`isBefore`, `isAfter`, etc.):
- Use to compare the chronological order of two dates
- Support optional unit-based granularity
- Ideal for: sorting, range validation, timeline operations

### Use Case Guide

| Scenario | Recommended Function | Reason |
|----------|---------------------|--------|
| Validate user input | `isValid(date)` | Check if date is valid |
| Check if event has passed | `isBefore(event, now())` | Strict past check |
| Check if deadline has been met | `isBeforeOrEqual(submission, deadline)` | Includes deadline day |
```

**Rules**:

- Provide clear criteria for choosing between functions
- Use comparison tables when helpful
- Include a use case guide with scenario/function/reason columns
- Focus on practical decision-making criteria
- Explain trade-offs when applicable

---

### 6. Use Case Guide

**Format**: Table mapping scenarios to recommended functions.

**Purpose**: Provide quick reference for common use cases.

**Example**:

```markdown
## Use Case Guide

| Scenario | Recommended Function | Reason |
|----------|---------------------|--------|
| Validate user input | `isValid(date)` | Check if date is valid |
| Group events by day | `isSameDay(date1, date2)` | Same-day check |
| Sort chronologically | `isBefore(a, b)` or `isAfter(a, b)` | Strict ordering |
```

**Rules**:

- Use a 3-column table: Scenario, Recommended Function, Reason
- Cover 8-15 common scenarios
- Be specific about use cases
- Explain WHY the function is recommended
- Order scenarios by frequency or importance

---

### 7. Common Patterns

**Format**: H3 subsections with practical code examples.

**Purpose**: Demonstrate how to use functions in real-world scenarios.

**Example**:

````markdown
## Common Patterns

### Input Validation

\`\`\`typescript
import { isValid } from 'chronia';

function processDate(date: Date | number): void {
  if (!isValid(date)) {
    throw new Error('Invalid date provided');
  }
  // Process valid date
}
\`\`\`

### Range Validation

**Inclusive range** (both boundaries included):

\`\`\`typescript
import { isAfterOrEqual, isBeforeOrEqual } from 'chronia';

function isWithinRange(date: Date, start: Date, end: Date): boolean {
  return isAfterOrEqual(date, start) && isBeforeOrEqual(date, end);
}
\`\`\`
````

**Rules**:

- Use H3 headings for each pattern
- Provide complete, runnable code examples
- Include import statements
- Add explanatory comments
- Cover 5-10 common patterns
- Show realistic, practical examples
- Demonstrate function composition when relevant

---

### 8. Performance Considerations

**Format**: Bullet list of performance-related notes.

**Purpose**: Inform users about performance characteristics and best practices.

**Example**:

```markdown
## Performance Considerations

- **Millisecond comparison** is the fastest as it requires no unit truncation
- **Unit-based comparison** involves truncation overhead but is still highly efficient
- **isSame* functions** are optimized for their specific granularity
- All functions validate inputs early for fast-fail behavior
- Input validation has minimal overhead compared to the comparison operation
```

**Rules**:

- Use bullet points
- Focus on practical performance implications
- Compare relative performance between functions when relevant
- Highlight optimization opportunities
- Keep notes concise and actionable

---

### 9. Type Definitions

**Format**: TypeScript code block with relevant types.

**Purpose**: Document TypeScript types used by functions in this category.

**Example**:

````markdown
## Type Definitions

\`\`\`typescript
type TimeUnit = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond';

interface ComparisonOptions {
  unit?: TimeUnit;
}
\`\`\`
````

**Rules**:

- Include only types relevant to this category
- Use TypeScript syntax
- Document each type with comments if needed
- Keep it focused on public API types

---

### 10. Error Handling

**Format**: Description of error handling patterns with examples.

**Purpose**: Explain how functions in this category handle errors.

**Example**:

```markdown
## Error Handling

All validation and comparison functions follow a consistent error handling pattern:

- **No exceptions thrown**: Invalid inputs return `false` instead of throwing errors
- **Invalid Date**: Returns `false`
- **NaN**: Returns `false`
- **Infinity / -Infinity**: Returns `false`
- **Non-date, non-number inputs**: TypeScript prevents at compile time
```

**Rules**:

- Explain the category's error handling philosophy
- List all error conditions and behaviors
- Use bullet points for clarity
- Emphasize consistency across functions
- Mention TypeScript's role in preventing errors

---

### 11. See Also

**Format**: Bullet list with links to related documentation.

**Purpose**: Help users discover related functionality.

**Example**:

```markdown
## See Also

- [Date Comparisons](../comparisons/) - Comparison utility functions (max, min, compare, clamp)
- [Date Boundaries](../boundaries/) - Start and end of time periods
- [Chronia Types](../../types.md) - Type definitions used across the library
```

**Rules**:

- Link to related function categories
- Link to relevant guides or concepts
- Link to type definitions if applicable
- Use relative paths
- Provide brief descriptions in parentheses
- Order by relevance

---

## General Writing Guidelines

### Language and Style

- **Language**: Write in English
- **Tone**: Professional, clear, and concise
- **Voice**: Use active voice where possible
- **Tense**: Use present tense for function behavior

### Code Formatting

- Use inline code formatting (backticks) for:
  - Function names
  - Parameter names
  - Variable names
  - Type names
  - Values (e.g., `true`, `false`, `null`)
- Use code blocks for:
  - Function signatures
  - Code examples
  - Multi-line code snippets

### Markdown Conventions

- Use proper heading hierarchy (H1 → H2 → H3)
- Escape special characters in tables (e.g., `\|` for union types)
- Use bullet points for lists
- Use tables for structured data (parameters, return values)
- Add blank lines between sections for readability

### Consistency

- Follow this structure for all category README documentation
- Use the same terminology across all docs
- Maintain consistent formatting and style
- Reference other categories consistently

---

## Category README Template

Use this template as a starting point for category README documentation:

````markdown
# [Category Name] Functions

## Overview

[1-2 paragraphs explaining the category's purpose and key features]

## Available Functions

### [Subcategory 1] (if applicable)

| Function | Description |
|----------|-------------|
| [`functionName`](./functionName.md) | Brief description |

## Common Features

All functions in this category share the following characteristics:

### Type Flexibility

[Explanation with code example]

### [Other Common Feature]

[Explanation with code example]

## Choosing the Right Function

### [Comparison Title]

**[Function Type 1]**:
- Use to [purpose]
- Ideal for: [scenarios]

**[Function Type 2]**:
- Use to [purpose]
- Ideal for: [scenarios]

## Use Case Guide

| Scenario | Recommended Function | Reason |
|----------|---------------------|--------|
| [Scenario] | `functionName(...)` | [Reason] |

## Common Patterns

### [Pattern 1]

\`\`\`typescript
import { functionName } from 'chronia';

// Example code
\`\`\`

### [Pattern 2]

\`\`\`typescript
// Example code
\`\`\`

## Performance Considerations

- [Performance note 1]
- [Performance note 2]

## Type Definitions

\`\`\`typescript
type TypeName = ...;

interface InterfaceName {
  ...
}
\`\`\`

## Error Handling

[Category's error handling approach]

- **[Error condition]**: [Behavior]
- **[Error condition]**: [Behavior]

## See Also

- [Related Category](../category/) - Description
- [Type Definitions](../../types.md) - Description
````

---

## Maintenance

- Keep documentation in sync with code changes
- Update category READMEs when adding or removing functions from a category
- Review and update use cases as patterns evolve
- Ensure all functions in the category are listed
- Update cross-references when category structures change

---

## See Also

- [Markdown Style Guide](./markdown-style.md) - Markdown writing standards and HTML tag prohibition
- [Function Documentation Guidelines](./documentation-function.md) - Guidelines for writing individual function documentation
- [Function Design Guidelines](./function-design.md) - Guidelines for designing functions
- [Function Implementation Guidelines](./function-implementation.md) - Guidelines for implementing functions
- [Function Testing Guidelines](./function-testing.md) - Guidelines for testing functions
- [Function Check Guidelines](./function-check.md) - Guidelines for quality checks
