# Data Model: README.md Documentation Structure

## Core Entities

### FunctionDocumentation
Represents documentation for a single function.

**Fields:**
- `name`: string - Function name (e.g., "compare", "now")
- `category`: string - Section where function appears
- `signature`: string - TypeScript signature
- `description`: string - Purpose and behavior
- `parameters`: Parameter[] - Input parameters
- `returnType`: string - Return value type
- `examples`: Example[] - Usage examples
- `notes`: string[] - Edge cases or special behaviors

### Parameter
Function parameter documentation.

**Fields:**
- `name`: string - Parameter name
- `type`: string - TypeScript type
- `optional`: boolean - Whether parameter is optional
- `default`: string | null - Default value if any
- `description`: string - Parameter purpose

### Example
Code example for a function.

**Fields:**
- `title`: string - Example description
- `code`: string - Executable code
- `output`: string | null - Expected output
- `language`: string - Code language (typescript/javascript)

### DocumentSection
README section containing related functions.

**Fields:**
- `title`: string - Section heading
- `order`: number - Display order
- `functions`: FunctionDocumentation[] - Functions in section
- `introduction`: string | null - Section intro text

### TableOfContents
Navigation structure.

**Fields:**
- `sections`: TOCEntry[] - Section links
- `depth`: number - Maximum heading depth

### TOCEntry
Table of contents entry.

**Fields:**
- `title`: string - Link text
- `anchor`: string - Markdown anchor
- `level`: number - Heading level (1-6)
- `children`: TOCEntry[] - Subsections

## Relationships

1. **DocumentSection** → **FunctionDocumentation** (1:N)
   - Each section contains multiple functions
   - Functions are ordered within sections

2. **FunctionDocumentation** → **Example** (1:N)
   - Each function has multiple examples
   - Examples are ordered by complexity

3. **FunctionDocumentation** → **Parameter** (1:N)
   - Functions have zero or more parameters
   - Parameters maintain order

4. **TableOfContents** → **DocumentSection** (1:N)
   - TOC references all sections
   - Maintains document structure

## State Transitions

### Documentation Lifecycle
```
Draft → Review → Published → Updated
```

### Validation States
```
Unvalidated → Validating → Valid | Invalid
```

## Validation Rules

### FunctionDocumentation
- `name` must match exported function
- `signature` must match TypeScript definition
- At least one example required
- Description must be non-empty

### Example
- Code must be syntactically valid
- Imports must reference actual exports
- Output must match execution result

### DocumentSection
- Title must be unique
- Order must be sequential
- At least one function per section

## Data Constraints

### Size Limits
- Example code: Max 10 lines
- Description: Max 200 characters
- Notes: Max 100 characters each
- Total sections: Max 20

### Format Requirements
- Function names: camelCase
- Section titles: Title Case
- Code blocks: Fenced with language
- Anchors: Lowercase, hyphen-separated

## Sample Data

### New Function: compare
```json
{
  "name": "compare",
  "category": "Date Comparison",
  "signature": "compare(date1: Date | number, date2: Date | number, order?: 'ASC' | 'DESC'): number",
  "description": "Compare two dates for sorting. Returns -1, 0, or 1.",
  "parameters": [
    {
      "name": "date1",
      "type": "Date | number",
      "optional": false,
      "default": null,
      "description": "First date to compare"
    },
    {
      "name": "date2",
      "type": "Date | number",
      "optional": false,
      "default": null,
      "description": "Second date to compare"
    },
    {
      "name": "order",
      "type": "'ASC' | 'DESC'",
      "optional": true,
      "default": "'ASC'",
      "description": "Sort order direction"
    }
  ],
  "returnType": "number",
  "examples": [
    {
      "title": "Sort dates in ascending order",
      "code": "const dates = [date3, date1, date2];\ndates.sort(compare);",
      "output": "// dates are now in chronological order",
      "language": "typescript"
    }
  ],
  "notes": ["Compatible with Array.sort()", "Handles timestamps and Date objects"]
}
```