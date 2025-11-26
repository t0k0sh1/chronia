# Markdown Style Guide

## Overview

This guide defines best practices for writing Markdown in the Chronia project. Following these guidelines ensures consistency, maintainability, and compatibility with GitHub Pages rendering.

---

## Core Principles

### Prohibition of HTML Tags

**Do NOT use HTML tags in Markdown documentation.**

GitHub Pages uses Jekyll for static site generation, which may not render HTML elements consistently across different themes and configurations. To ensure proper rendering and maintain consistency, all documentation must use standard Markdown syntax only.

**Bad Examples**:

```markdown
<!-- ❌ BAD: HTML table -->
<table>
<tr>
<td width="50%">
**Section 1**
- Item 1
- Item 2
</td>
<td width="50%">
**Section 2**
- Item 3
- Item 4
</td>
</tr>
</table>

<!-- ❌ BAD: HTML for styling -->
<div style="color: red;">Warning message</div>

<!-- ❌ BAD: HTML for layout -->
<center>Centered text</center>
```

**Recommended Alternatives**:

```markdown
<!-- ✅ GOOD: Standard Markdown -->
### Section 1
- Item 1
- Item 2

### Section 2
- Item 3
- Item 4

<!-- ✅ GOOD: Blockquote for emphasis -->
> **Warning**: Important message

<!-- ✅ GOOD: Standard Markdown for emphasis -->
**Centered concept** (Markdown doesn't support centering, and that's okay)
```

---

## Recommended Alternative Patterns

### Multi-column Layouts

Instead of using HTML tables for multi-column layouts, use heading levels and bulleted lists.

**❌ Patterns to Avoid**:

```markdown
<table>
<tr>
<td>Column 1 content</td>
<td>Column 2 content</td>
<td>Column 3 content</td>
</tr>
</table>
```

**✅ Recommended Pattern**:

```markdown
### Column 1 Title
Content for column 1

### Column 2 Title
Content for column 2

### Column 3 Title
Content for column 3
```

Or use a concise list format:

```markdown
- **Column 1**: Content for column 1
- **Column 2**: Content for column 2
- **Column 3**: Content for column 3
```

### Tables

For representing data structures, use standard Markdown table syntax.

**✅ Recommended Pattern**:

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |
```

### Emphasis and Styling

Use standard Markdown notation for emphasis and styling.

**✅ Recommended Pattern**:

```markdown
**Bold text**
*Italic text*
`Code`
> Blockquote for important notes
```

### Links and Images

Use standard Markdown notation for links and images.

**✅ Recommended Pattern**:

```markdown
[Link text](https://example.com)
![Alt text](image.png)
```

---

## Markdown Syntax Best Practices

### Headings

Use heading levels appropriately to create a clear hierarchical structure.

```markdown
# H1: Document Title (one per file)
## H2: Major Sections
### H3: Subsections
#### H4: Minor Subsections
```

**Rules**:

- H1 is reserved for document titles only (one per file)
- Don't skip heading levels (H2 follows H1, H3 follows H2, etc.)
- Add blank lines before and after headings

### Lists

Write lists with consistency.

```markdown
<!-- Unordered lists -->
- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2

<!-- Ordered lists -->
1. First item
2. Second item
   1. Nested item 2.1
   2. Nested item 2.2
```

**Rules**:

- Indent nested lists with 2 or 4 spaces
- Don't add blank lines between items at the same level
- Add blank lines between different list types
- **CRITICAL**: Add blank lines before and after lists

**Common Mistake** (Missing Blank Lines):

```markdown
<!-- ❌ BAD: No blank line before list -->
This is some text.
- Item 1
- Item 2

<!-- ❌ BAD: No blank line after list -->
- Item 1
- Item 2
This is some text.
```

**Correct Usage** (With Blank Lines):

```markdown
<!-- ✅ GOOD: Blank line before and after list -->
This is some text.

- Item 1
- Item 2

This is some text.
```

### Code Blocks

Always specify a language identifier for code blocks.

````markdown
```typescript
function example(): void {
  console.log('Hello, Chronia!');
}
```
````

**Rules**:

- Always specify a language identifier (`typescript`, `javascript`, `bash`, etc.)
- Use single backticks for inline code: `` `code` ``
- **CRITICAL**: Add blank lines before and after code blocks (MD031: blanks-around-fences)

**Common Mistake** (Missing Blank Lines):

````markdown
<!-- ❌ BAD: No blank line before code block -->
This is some text.
```typescript
const example = "code";
```

<!-- ❌ BAD: No blank line after code block -->
```typescript
const example = "code";
```
This is some text.
````

**Correct Usage** (With Blank Lines):

````markdown
<!-- ✅ GOOD: Blank line before and after code block -->
This is some text.

```typescript
const example = "code";
```

This is some text.
````

#### Nested Code Blocks

When you need to show code blocks **inside** a code block (e.g., documenting Markdown syntax or showing example output that contains code), use **4 backticks** for the outer block and **3 backticks** for the inner blocks.

**❌ Incorrect (will break rendering)**:

Using 3 backticks for both outer and inner blocks will cause parsing errors. The inner code block will prematurely close the outer block.

**✅ Correct (4 backticks for outer, 3 for inner)**:

`````markdown
````markdown
# Example Output

```bash
some command
```
````
`````

**Common Use Cases**:

1. **Documenting Markdown Syntax**:
   - Showing how to write code blocks in documentation
   - Example: Agent prompts that include code examples

2. **Example Output Templates**:
   - Showing what an agent or tool should output
   - Templates that contain code blocks

3. **Multi-level Code Examples**:
   - Tutorials showing nested code structures
   - Documentation generators output examples

**Example from Agent Documentation**:

`````markdown
````markdown
## Recommended Workflow

**Agent Prompt**:
```bash
pnpm test
pnpm build
```

**Expected Output**:
```
All tests passed!
```
````
`````

**Rules for Nested Blocks**:

- Outer block: Use 4 backticks (````)
- Inner blocks: Use 3 backticks (```)
- Always specify language for both outer and inner blocks when applicable
- Ensure proper closing of all blocks (match opening backtick count)

### Blockquotes

Use blockquotes for important information and notes.

```markdown
> **Note**: This is an important note.

> **Warning**: This is a warning message.
```

### Horizontal Rules

Use horizontal rules as section dividers.

```markdown
---
```

**Rules**:

- Use three or more hyphens, asterisks, or underscores
- Add blank lines before and after
- Use consistent symbols throughout the project (Chronia recommends `---`)

---

## GitHub Flavored Markdown (GFM) Features

### Table Syntax

Use GFM table syntax.

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

**Rules**:

- Add a separator row (`|---|---|---|`) between header and data rows
- Cell widths are auto-adjusted; no need to align manually
- Escape pipe characters with `\|` when needed

### Task Lists

Task lists are supported in GFM.

```markdown
- [ ] Incomplete task
- [x] Completed task
```

### Strikethrough

Use tildes for strikethrough text.

```markdown
~~Strikethrough text~~
```

---

## Document Structure Guidelines

### File Organization

- Each Markdown file should focus on one clear topic
- Use kebab-case for file names (e.g., `markdown-style.md`)
- README files should provide directory overviews

### Internal Links

Use relative paths for internal links.

```markdown
[Function Documentation Guidelines](./documentation-function.md)
[Validation Functions](../functions/validations/)
```

### External Links

Use absolute URLs for external links.

```markdown
[GitHub Repository](https://github.com/t0k0sh1/chronia)
```

---

## Quality Checks

### Linting

All Markdown files must pass linting.

```bash
pnpm lint:docs
```

This command runs Markdownlint to check for syntax errors and style violations.

### Common Lint Errors to Avoid

- Use of HTML tags
- Improper heading hierarchy
- Trailing whitespace at end of lines
- Multiple consecutive blank lines
- Missing language identifiers in code blocks

---

## Exceptions

HTML usage may be permitted only in the following cases:

1. **Absolutely necessary**: Special requirements that cannot be expressed with standard Markdown
2. **Approval required**: Explicit approval from project maintainers is required
3. **Documentation required**: Document why HTML is necessary

**Note**: Currently, no exceptions are permitted in the Chronia project. All documentation must be written using standard Markdown notation.

---

## See Also

- [Function Documentation Guidelines](./documentation-function.md) - Individual function documentation structure
- [Category Documentation Guidelines](./documentation-category.md) - Category README structure
- [GitHub Flavored Markdown Spec](https://github.github.com/gfm/) - Official GFM specification
- [Markdownlint Rules](https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md) - Linting rules reference

---

## Maintenance

- Review this guide periodically as Markdown standards evolve
- Update examples when new patterns emerge
- Ensure all contributors are familiar with these guidelines
- Keep linting rules in sync with this guide
