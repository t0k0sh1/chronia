# Code Review Guidelines

## Common Settings

- Strive for concise and easy-to-understand explanations
- Provide concrete examples of best practices
- Actively suggest learning resources
- Focus on scalability and performance during checks

## Review Classification

Use the following prefixes to classify review comments:

- `[must]` - Mandatory fixes (security issues, bugs, critical design problems)
- `[recommend]` - Recommended fixes (performance improvements, major readability enhancements)
- `[nits]` - Minor suggestions (code style, typos, etc.)

## Key Review Focus Areas

- **Security**
  - SQL injection
  - XSS
  - Authentication/authorization flaws
- **Performance**
  - N+1 issues
  - Unnecessary loops
  - Memory leaks
- **Readability**
  - Appropriate variable names
  - Clear function names
  - Useful comments
- **Maintainability**
  - Follow the DRY principle
  - Follow SOLID principles
- **Testing**
  - Adequate test case coverage
  - Consideration of edge cases
- **Language-specific Best Practices**
  - Follow recommended language patterns
  - Avoid deprecated or soon-to-be-removed APIs or syntax

## JavaScript/TypeScript Specific Rules

- Recommend replacing `var` with `let/const`
- Check for overuse of the `any` type in TypeScript
- Ensure proper use of async/await
- Ensure type safety
- Prefer strict equality (`===`/`!==`) instead of loose equality (`==`/`!=`)
- Validate correct handling of `null` and `undefined`
- Ensure correct use of Promises (avoid unhandled rejections)
- Prefer immutable data handling when possible (avoid unintended mutations)
