# Contributing to Chronia

Thank you for your interest in contributing to Chronia! We welcome contributions from the community and are grateful for helping improve this project.

Chronia is a modern, lightweight TypeScript date/time utility library designed to provide reliable, type-safe, and tree-shakable date manipulation functions for JavaScript and TypeScript developers.

## Ways to Contribute

There are many ways you can contribute to Chronia:

- **Report Bugs**: If you find a bug, please open a [GitHub Issue](https://github.com/t0k0sh1/chronia/issues) with a clear description and steps to reproduce.
- **Suggest Features**: Have an idea for a new feature or improvement? We'd love to hear it! Please start a discussion in [GitHub Discussions](https://github.com/t0k0sh1/chronia/discussions) before opening a pull request.
- **Improve Documentation**: Help us improve our documentation by fixing typos, clarifying explanations, or adding examples.
- **Submit Code**: Fix bugs, add new functions, or improve existing code. Please follow the guidelines below.

## Development Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18 or higher** (LTS recommended): [Download Node.js](https://nodejs.org/)
- **pnpm**: Chronia uses pnpm as its package manager

### Setup Steps

```bash
# 1. Enable Corepack (if you haven't already)
# Corepack is a tool bundled with Node.js to manage package managers.
corepack enable

# 2. Fork the repository
# Go to https://github.com/t0k0sh1/chronia and click "Fork"

# 3. Clone your fork
git clone https://github.com/YOUR_USERNAME/chronia.git
cd chronia

# 4. Install dependencies
pnpm install

# 5. Verify your setup
pnpm test    # Run tests
pnpm build   # Build the project
pnpm lint    # Run linter
```

If all commands complete successfully, you're ready to start contributing!

## Development Workflow

### Branching Strategy

- **`main`**: The production branch. **Do not commit directly to this branch.**
- **Feature branches**: Use descriptive branch names:
  - `feature/your-feature-name` for new features
  - `fix/issue-description` for bug fixes
  - `docs/what-you-update` for documentation changes

### Step-by-Step Workflow

1. **Create a branch** from `main`:

   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and add tests for any new functionality.

3. **Run local validation** (see [Code Standards](#code-standards) below).

4. **Commit your changes** following [Commit Message Guidelines](#commit-message-guidelines).

5. **Push your branch** to your fork:

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request** (PR) from your fork to the `main` branch of the original repository.

## Code Standards

### Required Checks Before PR Submission

Before creating a pull request, ensure the following commands complete successfully:

```bash
pnpm lint           # Code quality check (zero warnings required)
pnpm test           # All tests must pass
pnpm test:coverage  # Maintain test coverage
pnpm build          # TypeScript compilation must succeed
```

If you modified Markdown files (documentation):

```bash
pnpm lint:docs      # Markdown linting (required for docs changes)
```

### Coding Guidelines

- **TypeScript Strict Mode**: All code must pass TypeScript's strict type checking.
- **ESLint Compliance**: Zero ESLint warnings or errors are required.
- **Test Coverage**: Add tests for all new functionality. Maintain or improve existing test coverage.
- **Documentation**: When adding new functions, create documentation in `docs/functions/`.

## Commit Message Guidelines

Chronia follows the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages.

### Format

```text
<type>(<scope>): <subject>

<body>

<footer>
```

### Type

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes only
- `style`: Code formatting, missing semicolons, etc. (no functional changes)
- `refactor`: Code refactoring without adding features or fixing bugs
- `test`: Adding or updating tests
- `chore`: Changes to build process, dependencies, or tooling

### Scope

The scope is optional but recommended. It should indicate the area of the codebase affected (e.g., `comparisons`, `formatting`, `parsing`).

### Examples

```text
feat(comparisons): add isFuture and isPast functions

Add two new functions for comparing dates with current time.
- isFuture: checks if date is in the future
- isPast: checks if date is in the past

Closes #42
```

```text
fix(format): handle timezone offset correctly in formatISO

Previously, formatISO did not account for timezone offsets,
resulting in incorrect ISO 8601 strings for non-UTC dates.

Fixes #15
```

```text
docs(readme): update installation instructions

Add examples for yarn and bun package managers.
```

## Testing Guidelines

### Testing Strategy

- **TDD (Test-Driven Development)**: We encourage writing tests before or alongside your code.
- **Vitest Framework**: Chronia uses [Vitest](https://vitest.dev/) for unit testing.
- **Coverage Maintenance**: Ensure that your changes do not decrease the overall test coverage.

### Test File Locations

- **TDD Tests**: Place unit tests in the `tests/` directory.
- **Property-Based Tests**: If applicable, property-based tests go in `.kiro/specs/` (used for specification-driven development; advanced/optional—this directory is used by maintainers for structured feature development).

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests with coverage report
pnpm test:coverage

# Run property-based tests (if applicable)
pnpm test:pbt
```

## Documentation Requirements

If you add new functions or modify existing behavior, please update the documentation accordingly.

### When Adding New Functions

1. **Function Documentation**: Create a documentation file at `docs/functions/<category>/<function-name>.md` following the guidelines in `docs/guidelines/documentation-function.md`.

2. **Category README**: Update the category README at `docs/functions/<category>/README.md` to include the new function.

3. **Project README**: Add the new function to the function list in the main `README.md`.

### Documentation Guidelines

- Follow the structure defined in `docs/guidelines/documentation-function.md`.
- Include runnable code examples.
- Ensure all Markdown files pass linting: `pnpm lint:docs`.

## Pull Request Process

### Before Submitting a PR

Ensure you have completed the following checklist:

- [ ] `pnpm lint` passes with zero warnings
- [ ] `pnpm test` passes (all tests succeed)
- [ ] `pnpm build` succeeds without errors
- [ ] Tests added for new functionality
- [ ] Documentation updated (if applicable)
- [ ] `pnpm lint:docs` passes (if docs were modified)
- [ ] Commit messages follow Conventional Commits format

### PR Description Template

When creating your pull request, please include:

```markdown
## Summary

(Brief overview of what this PR does)

## Changes

- Change 1
- Change 2
- Change 3

## Test Plan

(How to verify that your changes work as expected)

## Related Issues

Closes #issue_number
```

### Review Process

1. **Automated CI/CD Checks**: GitHub Actions will automatically run tests, linting, and build checks on your PR.
2. **Maintainer Review**: A project maintainer will review your code and may request changes.
3. **Address Feedback**: Make any requested changes and push updates to your branch.
4. **Approval & Merge**: Once approved, your PR will be merged into `main`.

## Getting Help

### Questions and Discussions

- **GitHub Discussions**: For feature suggestions, design discussions, and general questions, please use [GitHub Discussions](https://github.com/t0k0sh1/chronia/discussions).
- **GitHub Issues**: For bug reports and specific technical problems, please open a [GitHub Issue](https://github.com/t0k0sh1/chronia/issues).

### Communication

- **PR Comments**: Use PR comments for code-review-related questions and discussions.
- **Issue Comments**: Use issue comments for discussions related to specific bugs or feature requests.

## License

By contributing to Chronia, you agree that your contributions will be licensed under the [MIT License](LICENSE), the same license that covers this project.

---

Thank you again for your interest in contributing to Chronia. We look forward to collaborating with you!
