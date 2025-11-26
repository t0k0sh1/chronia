# Agent Configuration Guide

This guide documents the configuration and best practices for specialized agents in the chronia project. Each agent has specific responsibilities and follows standardized patterns.

Agent definitions are located in `.claude/agents/`. This guide is in `.claude/guidelines/`.

## Available Agents

1. **code-reviewer** - Proactive code review before committing
2. **commit-pr-validator** - Validate, commit, and create pull requests
3. **function-implementer** - Implement function bodies from interfaces
4. **function-interface-designer** - Design function signatures and contracts
5. **function-docs-writer** - Create and update function documentation
6. **pbt-spec-validator** - Validate implementations with property-based testing
7. **pr-review-triager** - Read and triage pull request review feedback

## Standard Agent Structure

All agents should follow this structure:

```markdown
---
name: agent-name
description: When to use this agent with examples
tools: List of available tools
model: haiku/sonnet/opus
color: color-name
---

[Agent-specific prompt and instructions]

## Execution Logging (MANDATORY)

[See agent-execution-logging.md for complete requirements]

You MUST track and report:
1. Failed operations with error messages
2. Alternative approaches used
3. Success/failure of alternatives
4. Recommendations for improvement

Include "Execution Log" section in final report with:
- Summary statistics
- Failed operations (detailed)
- Successful operations (summary)
- Recommendations for improvement
```

## Execution Logging Requirements

**ALL agents MUST include execution logging** as defined in `agent-execution-logging.md`.

### Why Execution Logging?

1. **Debugging**: Understand why agents fail or behave unexpectedly
2. **Optimization**: Identify unreliable tools and improve alternatives
3. **Configuration**: Discover missing permissions or dependencies
4. **Improvement**: Data-driven agent refinement

### What to Log

- **Failed Commands/MCP Calls**: Exact error messages and context
- **Alternatives Used**: What was tried instead and whether it worked
- **Unexpected Behaviors**: Anything that didn't work as expected
- **Root Causes**: Why failures occurred (if determinable)

### Logging Format

```markdown
## Execution Log

### Summary
- Total operations: X
- Failed operations: Y
- Successful alternatives: Z

### Failed Operations
1. **Operation**: `command_or_mcp_call`
   - **Error**: "[exact error message]"
   - **Context**: [What were you trying to do]
   - **Alternative**: `alternative_command`
   - **Result**: ✅ Success / ❌ Failed

### Successful Operations
- ✅ [List of successful operations]

### Recommendations for Improvement
- [Suggestions based on failures]
```

## Agent Update Checklist

To add execution logging to an existing agent:

1. [ ] Read `agent-execution-logging.md`
2. [ ] Add "Execution Logging (MANDATORY)" section to agent prompt
3. [ ] Specify what operations should be logged (MCP calls, file operations, etc.)
4. [ ] Define logging format specific to agent's tools
5. [ ] Add self-verification checklist for logging
6. [ ] Update "Output Guidelines" to mention execution log
7. [ ] Test agent and verify execution log is included

## Example: Adding Logging to function-implementer

```markdown
## Execution Logging (MANDATORY)

You MUST track and report all execution attempts, failures, and alternatives.

### What to Log

1. **Build/Test Failures**:
   - If `pnpm build` fails → Document error and what was fixed
   - If `pnpm test` fails → Document failing tests and fixes
   - If `pnpm lint` fails → Document lint errors and corrections

2. **Code Reading Failures**:
   - If `Read` fails on source files → Document and explain alternative
   - If `Grep` fails to find expected patterns → Document search attempts

3. **Implementation Issues**:
   - If type errors encountered → Document and how they were resolved
   - If tests fail after implementation → Document test failures and fixes

### Logging Format

Include in final report:

\`\`\`markdown
## Execution Log

### Summary
- Build attempts: X successful, Y failed
- Test runs: X successful, Y failed
- Lint checks: X successful, Y failed

### Failed Operations

1. **Operation**: `pnpm build`
   - **Error**: "TS2345: Argument of type 'string' is not assignable to parameter of type 'number'"
   - **Context**: Building after implementing isNumber function
   - **Fix Applied**: Updated type signature in validators.ts:96
   - **Result**: ✅ Success on retry

### Successful Operations
- ✅ Implemented 5 functions
- ✅ All tests passing (25 test cases)
- ✅ Lint checks passed
- ✅ Build succeeded

### Recommendations for Improvement
- Consider adding type checking before running full build
\`\`\`
```

## Priority for Adding Logging

**High Priority** (user-facing agents that often encounter failures):
1. ✅ pr-review-triager (already updated)
2. commit-pr-validator (GitHub MCP failures common)
3. function-implementer (build/test failures common)
4. pbt-spec-validator (test setup failures common)

**Medium Priority**:
5. code-reviewer (CLI tool failures possible)
6. function-docs-writer (file access issues possible)

**Low Priority**:
7. function-interface-designer (rarely fails)

## Best Practices

1. **Be Specific**: Include exact error messages, file paths, line numbers
2. **Be Concise**: Don't log successful operations in detail (just summary)
3. **Be Helpful**: Provide actionable recommendations for improvement
4. **Be Consistent**: Use the standard format from agent-execution-logging.md
5. **Be Honest**: Report all failures, even if you found workarounds

## Continuous Improvement

After each agent execution:
1. Review the execution log
2. Identify patterns in failures
3. Update agent configurations to prevent recurring issues
4. Share learnings in project documentation
5. Refine agent prompts based on common failure modes

## Questions?

See `agent-execution-logging.md` for comprehensive documentation and examples.
