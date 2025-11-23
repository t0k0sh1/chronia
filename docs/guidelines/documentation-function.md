# Function Documentation Guidelines

## Purpose

This document defines the standard structure and style for documenting individual functions in the Chronia library. Consistent documentation helps users understand and effectively use the library's API.

## Document Structure

All function documentation should follow this standardized structure:

1. **Title** (H1)
2. **Overview** (H2)
3. **Signature** (H2)
4. **Parameters** (H2)
5. **Return Value** (H2)
6. **Description** (H2)
7. **Use Cases** (H2)
8. **Usage Examples** (H2)

## Section Guidelines

### 1. Title

**Format**: `# functionName`

**Purpose**: Clearly identify the function being documented.

**Example**:

```markdown
# isValid
```

**Rules**:

- Use the exact function name as it appears in the code
- Use H1 heading (`#`)
- No additional text or punctuation

---

### 2. Overview

**Format**: Single paragraph providing a high-level summary.

**Purpose**: Give readers a quick understanding of what the function does and its role in the library.

**Example**:

```markdown
## Overview

The `isValid` function validates whether a given Date object or timestamp represents a valid date. It provides a reliable way to check date validity in Chronia's consistent API surface.
```

**Rules**:

- Keep it concise (1-2 sentences)
- Use inline code formatting for the function name (e.g., `` `isValid` ``)
- Focus on WHAT the function does, not HOW it works
- Mention the broader context or purpose within the library

---

### 3. Signature

**Format**: TypeScript code block showing the function signature.

**Purpose**: Display the function's type signature for TypeScript users.

**Example**:

````markdown
## Signature

```typescript
function isValid(date: Date | number): boolean
```
````

**Rules**:

- Use a TypeScript code block
- Show the complete function signature with types
- Do not include implementation details
- Use proper TypeScript syntax

---

### 4. Parameters

**Format**: Markdown table with columns: Parameter, Type, Description.

**Purpose**: Document each parameter the function accepts.

**Example**:

```markdown
## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `date` | `Date \| number` | A Date object or numeric timestamp to validate |
```

**Rules**:

- Use inline code formatting for parameter names and types
- Use `\|` to escape pipe characters in union types
- Provide clear, concise descriptions
- If the function has no parameters, state "This function takes no parameters."

---

### 5. Return Value

**Format**: Markdown table with columns: Type, Description.

**Purpose**: Document what the function returns.

**Example**:

```markdown
## Return Value

| Type | Description |
|------|-------------|
| `boolean` | Returns `true` if the date is valid, `false` otherwise |
```

**Rules**:

- Use inline code formatting for types and values
- Clearly describe the meaning of the return value
- Specify different return values if conditional
- For void functions, state "This function returns nothing (`void`)."

---

### 6. Description

**Format**: Detailed explanation with subsections as needed.

**Purpose**: Provide comprehensive information about the function's behavior, including specifications, edge cases, and implementation notes.

**Structure**:

- Introduction paragraph
- **Specification** subsection (H3)
- **Behavior Notes** subsection (H3)

**Example**:

```markdown
## Description

The `isValid` function determines whether the provided Date object or timestamp represents a valid date/time value. It leverages Chronia's internal validation utilities to ensure consistency across the library.

### Specification

#### Returns `true` when:
- The argument is a valid `Date` object (not Invalid Date)
- The argument is a finite numeric timestamp, including:
  - Positive timestamps (dates after Unix epoch)
  - Zero (`0`, representing January 1, 1970, 00:00:00 UTC)
  - Negative timestamps (dates before Unix epoch)

#### Returns `false` when:
- The argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The argument is `NaN`
- The argument is `Infinity`
- The argument is `-Infinity`

### Behavior Notes

- No exceptions are thrown; invalid values return `false`
- Uses the same validation logic as other Chronia functions for consistency
- Performance-optimized for high-frequency validation scenarios
- Type-safe with TypeScript, accepting only `Date | number`
```

**Rules**:

- Start with a clear introduction paragraph
- **Specification** should precisely define when the function returns what values
  - Use "Returns `X` when:" format for clarity
  - List all conditions comprehensively
  - Include edge cases
- **Behavior Notes** should highlight:
  - Error handling approach
  - Performance characteristics
  - Type safety features
  - Implementation details relevant to users
- Use bullet points for readability
- Use inline code formatting for values, types, and function names

---

### 7. Use Cases

**Format**: Bullet list with bold titles and descriptions.

**Purpose**: Describe practical scenarios where the function is useful.

**Example**:

```markdown
## Use Cases

- **Input Validation**: Validate user input or parsed dates before performing operations. Particularly useful when parsing date strings or receiving dates from external sources where validity cannot be guaranteed.
- **Defensive Programming**: Guard against Invalid Date objects in functions that expect valid dates. Prevents propagation of invalid values through your application's date logic.
- **Data Filtering**: Filter collections of dates to exclude invalid entries. Useful when processing arrays of dates from various sources where some entries may be corrupted or malformed.
- **Error Recovery**: Determine whether date parsing or calculation resulted in a valid date, allowing graceful error handling and user feedback instead of silent failures.
```

**Rules**:

- Use bullet points with bold titles followed by descriptions
- Format: `- **Title**: Description.`
- Provide 3-5 common use cases
- Focus on practical, real-world scenarios
- Explain WHY someone would use the function in this context
- Keep descriptions concise but informative

---

### 8. Usage Examples

**Format**: Code examples organized by use case.

**Purpose**: Demonstrate how to use the function in practice.

**Structure**: One H3 subsection per use case with relevant code examples.

**Example**:

````markdown
## Usage Examples

### Input Validation

```typescript
import { isValid, parse } from 'chronia';

// Validate parsed date
function processUserDate(input: string): Date | null {
  const parsed = parse(input, 'yyyy-MM-dd');
  return isValid(parsed) ? parsed : null;
}

// Valid Date object
isValid(new Date(2025, 0, 1));  // Returns: true

// Invalid Date object
isValid(new Date('invalid'));  // Returns: false
```

### Defensive Programming

```typescript
import { isValid, format } from 'chronia';

function formatDate(date: Date | number): string {
  if (!isValid(date)) {
    return 'Invalid date';
  }
  return format(date, 'yyyy-MM-dd');
}

// Safe date formatting
formatDate(new Date(2025, 0, 1));  // Returns: '2025-01-01'
formatDate(new Date('invalid'));   // Returns: 'Invalid date'
```
````

**Rules**:

- Use H3 headings that match the Use Cases section
- Provide complete, runnable code examples
- Include import statements
- Add inline comments to explain what's happening
- Show expected output with `// Returns:` comments
- Cover both typical usage and edge cases
- Group related examples within the same subsection
- Keep examples concise but realistic

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

- Follow this structure for all function documentation
- Use the same terminology across all docs
- Maintain consistent formatting and style
- Reference other functions consistently

---

## Example Template

Use this template as a starting point for new function documentation:

````markdown
# functionName

## Overview

Brief description of what the function does and its purpose.

## Signature

```typescript
function functionName(param: Type): ReturnType
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `param` | `Type` | Description of parameter |

## Return Value

| Type | Description |
|------|-------------|
| `ReturnType` | Description of return value |

## Description

Detailed explanation of the function's behavior.

### Specification

#### Returns `value` when:
- Condition 1
- Condition 2

### Behavior Notes

- Note 1
- Note 2

## Use Cases

- **Use Case 1**: Description
- **Use Case 2**: Description

## Usage Examples

### Use Case 1

```typescript
// Code example
```

### Use Case 2

```typescript
// Code example
```
````

---

## Maintenance

- Keep documentation in sync with code changes
- Update examples when function signatures change
- Review and update use cases as patterns evolve
- Ensure all edge cases are documented

---

## See Also

- [Markdown Style Guide](./markdown-style.md) - Markdown writing standards and HTML tag prohibition
- [Category README Documentation Guidelines](./documentation-category.md) - Guidelines for writing category README files
- [Function Design Guidelines](./function-design.md) - Guidelines for designing functions
- [Function Implementation Guidelines](./function-implementation.md) - Guidelines for implementing functions
- [Function Testing Guidelines](./function-testing.md) - Guidelines for testing functions
- [Function Check Guidelines](./function-check.md) - Guidelines for quality checks
