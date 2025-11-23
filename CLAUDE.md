# AI-DLC and Spec-Driven Development

Kiro-style Spec Driven Development implementation on AI-DLC (AI Development Life Cycle)

## Project Context

### Paths
- Steering: `.kiro/steering/`
- Specs: `.kiro/specs/`

### Steering vs Specification

**Steering** (`.kiro/steering/`) - Guide AI with project-wide rules and context
**Specs** (`.kiro/specs/`) - Formalize development process for individual features

### Active Specifications
- Check `.kiro/specs/` for active specifications
- Use `/kiro:spec-status [feature-name]` to check progress

## Development Guidelines
- Think in English, generate responses in Japanese. All Markdown content written to project files (e.g., requirements.md, design.md, tasks.md, research.md, validation reports) MUST be written in the target language configured for this specification (see spec.json.language).
- **Package Manager**: This project uses `pnpm` exclusively. Always use `pnpm` commands instead of `npm`. Note: `pnpm` does not require the `run` keyword for scripts.

### Available Commands
- `pnpm build` - Build the project and verify TypeScript compilation
- `pnpm test` - Run all TDD tests in `tests/` directory
- `pnpm test:coverage` - Run TDD tests with coverage report
- `pnpm test:pbt` - Run property-based tests in `.kiro/spec/` (files matching `*.pbt.test.ts`)
- `pnpm lint` - Run code linting checks
- `pnpm lint:docs` - Run documentation (Markdown) linting checks

## Minimal Workflow
- Phase 0 (optional): `/kiro:steering`, `/kiro:steering-custom`
- Phase 1 (Specification):
  - `/kiro:spec-init "description"`
  - `/kiro:spec-requirements {feature}`
  - `/kiro:validate-gap {feature}` (optional: for existing codebase)
  - `/kiro:spec-design {feature} [-y]`
  - `/kiro:validate-design {feature}` (optional: design review)
  - `/kiro:spec-tasks {feature} [-y]`
- Phase 2 (Implementation): `/kiro:spec-impl {feature} [tasks]`
  - `/kiro:validate-impl {feature}` (optional: after implementation)
- Progress check: `/kiro:spec-status {feature}` (use anytime)

## Development Rules
- 3-phase approval workflow: Requirements → Design → Tasks → Implementation
- Human review required each phase; use `-y` only for intentional fast-track
- Keep steering current and verify alignment with `/kiro:spec-status`
- Follow the user's instructions precisely, and within that scope act autonomously: gather the necessary context and complete the requested work end-to-end in this run, asking questions only when essential information is missing or the instructions are critically ambiguous.

## Code Development Workflow

**MANDATORY**: All code changes MUST follow this workflow in order. Each phase uses specialized agents:

### Phase 1: Design (Interface Definition)
**Agent**: `function-interface-designer`

**When to use**:
- Starting a new feature that requires well-defined function signatures
- Refactoring existing code and need to redesign interfaces first
- Creating API contracts before implementation
- After completing requirements but before implementation

**Guidelines**: Follow `docs/guidelines/function-design.md`

**Output**: Function signatures with type annotations, JSDoc comments, and minimal implementation stubs

---

### Phase 2: Implementation & Testing
**Agent**: `function-implementer`

**When to use**:
- After Phase 1 (interface design) is complete
- When function stubs with type signatures need implementation
- Filling in actual logic for predefined interfaces

**Guidelines**: Follow `docs/guidelines/function-implementation.md` and `docs/guidelines/function-testing.md`

**Testing Approach**: Two-phase testing

1. **TDD (Required for all functions)**
   - Write tests in `tests/` directory
   - Use Vitest framework
   - Run `pnpm test` and `pnpm test:coverage`
   - Achieve comprehensive coverage

2. **Property-Based Testing (Required when spec exists)**
   - Write tests in `.kiro/spec/<spec-name>/` directory
   - Use fast-check framework
   - Run `pnpm test:pbt`
   - Verify implementation satisfies specification properties

**Requirements**:
- Implement function bodies according to interface contracts
- Write comprehensive TDD tests (Vitest)
- Ensure all TDD tests pass (`pnpm test`)
- Achieve comprehensive test coverage (`pnpm test:coverage`)
- If spec exists: Write PBT tests in `.kiro/spec/<spec-name>/<function-name>.pbt.test.ts`
- If spec exists: Ensure all PBT tests pass (`pnpm test:pbt`)

**Output**: Fully implemented functions with passing TDD tests and PBT tests (when applicable)

---

### Phase 3: Quality Check (Code Review)
**Agent**: `code-reviewer`

**When to use**:
- After Phase 2 (implementation & testing) is complete
- Before committing any code changes
- When significant code has been written or modified

**Checks performed**:
- Code quality and adherence to guidelines
- Security vulnerabilities
- Performance considerations
- Maintainability and readability
- Test coverage adequacy

**Guidelines**: Follow `docs/guidelines/function-check.md`

**Requirements**:
- All linting checks pass (`pnpm lint`, `pnpm lint:docs`)
- Build succeeds (`pnpm build`)
- All tests pass (`pnpm test`)

**Output**: Code review report with issues identified (if any)

---

### Phase 4: Documentation
**Agent**: `function-docs-writer`

**When to use**:
- After Phase 3 (quality check) passes
- Before Phase 5 (commit & PR)
- For new functions or modified function behavior

**Workflows**:
1. **Function Documentation Workflow**: Create/update individual function documentation
   - Guidelines: `docs/guidelines/documentation-function.md`
   - Output: `docs/functions/<category>/<function-name>.md`

2. **Category README Workflow**: Update category overview
   - Guidelines: `docs/guidelines/documentation-category.md`
   - Output: `docs/functions/<category>/README.md`

**Requirements**:
- Documentation must be complete and accurate
- All code examples must be runnable
- Documentation reflects current implementation

**Output**: Complete documentation for functions and categories

---

### Phase 5: Commit & PR (Validation & Submission)
**Agent**: `commit-pr-validator`

**When to use**:
- After all previous phases are complete
- When ready to submit code for review
- Before pushing changes to remote

**Validations performed**:
- Final quality checks (lint, test, build)
- Documentation completeness verification
- Git commit creation with proper message format
- Pull request creation with comprehensive description

**Requirements**:
- All quality checks must pass
- Documentation must be synchronized with code
- Commit message follows project conventions
- PR description includes summary and test plan

**Output**: Git commit and pull request created

---

### Workflow Summary

```
1. Design        → function-interface-designer  → Function signatures & contracts
2. Implementation → function-implementer        → Working code with tests
3. Quality Check → code-reviewer               → Code quality validation
4. Documentation → function-docs-writer         → Complete documentation
5. Commit & PR   → commit-pr-validator         → Git commit & pull request
```

### Workflow Enforcement

**CRITICAL RULES**:
- Never skip phases (always follow the order)
- Each phase must complete successfully before proceeding
- Use the specified agent for each phase
- Address all issues raised before moving to the next phase
- Documentation (Phase 4) is MANDATORY before committing (Phase 5)

**Exception**: For minor documentation-only changes or typo fixes, you may skip directly to Phase 5.

## Documentation Rules

### Guidelines Reference
- **Function Documentation**: Follow `docs/guidelines/documentation-function.md` for individual function documentation (8-section structure)
- **Category README**: Follow `docs/guidelines/documentation-category.md` for category overview documentation (11-section structure)

### When to Document

#### Function Documentation (Required)
Use the `function-docs-writer` agent with the **Function Documentation Workflow** in the following cases:

1. **New Function Created**: Immediately after creating a new function in `src/`, create its documentation file in `docs/functions/<category>/<function-name>.md`
2. **Function Modified**: When modifying a function's:
   - Signature (parameters, return type)
   - Behavior or logic
   - Error handling
   - Performance characteristics
   Update the corresponding documentation file
3. **Before Committing**: Always ensure function documentation is complete and up-to-date before creating a git commit

#### Category README Documentation (Required)
Use the `function-docs-writer` agent with the **Category README Workflow** in the following cases:

1. **New Function Added to Category**: When a new function is added to a category, update the category's `README.md` to:
   - Add the function to the "Available Functions" table
   - Update "Use Case Guide" if the function addresses new scenarios
   - Add relevant patterns to "Common Patterns" section if applicable
2. **Function Behavior Changed**: When a function's behavior or purpose changes significantly, update the category README to reflect:
   - Updated descriptions in function tables
   - Revised use case recommendations
   - Modified common patterns that use the function
3. **Before Committing**: Always ensure category README is up-to-date before creating a git commit

### Documentation Workflow Order

**CRITICAL**: Documentation must be completed BEFORE committing changes.

```
1. Implement/modify function(s) in src/
2. Write/update tests
3. Run tests and ensure they pass
4. Document individual function(s) using function-docs-writer (Function Documentation Workflow)
5. Update category README using function-docs-writer (Category README Workflow)
6. Verify all documentation is accurate and complete
7. Create git commit
```

### Responding to Feedback

When addressing user feedback or PR review comments that affect functionality:

1. **Make Code Changes**: Implement the requested changes
2. **Update Documentation**: Use `function-docs-writer` agent to update:
   - Individual function documentation (if behavior changed)
   - Category README (if functionality or use cases changed)
3. **Commit Together**: Commit code changes and documentation updates together

### Agent Usage

**Separate Workflows**: Use `function-docs-writer` agent with explicit workflow specification:

```typescript
// For individual function documentation
Task tool: function-docs-writer
Prompt: "Create documentation for the [functionName] function in src/[path].
         Use the Function Documentation Workflow and follow docs/guidelines/documentation-function.md."

// For category README
Task tool: function-docs-writer
Prompt: "Update the README.md for the [categoryName] category to include [changes].
         Use the Category README Workflow and follow docs/guidelines/documentation-category.md."
```

### Documentation Synchronization

- **Keep in Sync**: Documentation must always reflect the current state of the code
- **No Stale Docs**: Never commit code changes without updating corresponding documentation
- **Accuracy First**: Documentation accuracy is as important as code correctness
- **Examples Must Work**: All code examples in documentation must be syntactically correct and runnable

## Steering Configuration
- Load entire `.kiro/steering/` as project memory
- Default files: `product.md`, `tech.md`, `structure.md`
- Custom files are supported (managed via `/kiro:steering-custom`)
