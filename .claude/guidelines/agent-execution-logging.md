# Agent Execution Logging Template

This template defines the standard format for all agents to report their execution progress, failures, and alternatives.

## Purpose

Enable developers to:
1. Understand which operations failed during agent execution
2. Learn what alternatives were used successfully
3. Improve agent configurations and tool availability
4. Debug issues more effectively

## Logging Requirements

### ALL agents MUST include an "Execution Log" section in their final report

## Standard Format

### Option 1: Real-Time Progress Logging

Report failures as they occur during execution:

```markdown
### Progress Update

⚠️ **Failed Attempt #1**: `mcp__GitHub__create_pull_request`
- **Error**: "Resource not accessible by integration"
- **Reason**: GitHub MCP token lacks write permissions
- **Alternative**: Using `Bash` with `gh pr create` command
- **Alternative Result**: ✅ Success

✅ **Step Completed**: Created pull request #27
```

### Option 2: Summary Execution Log (Required)

Include this section in the final report:

```markdown
## Execution Log

### Summary
- Total operations: X
- Failed operations: Y
- Successful alternatives: Z
- Unresolved failures: N

### Failed Operations

#### 1. [Operation Name/Step]
- **Command/Tool**: `tool_name` or `command`
- **Error Message**: "[exact error message]"
- **Error Type**: API Error / Permission Denied / Not Found / Timeout / Rate Limit / Other
- **Context**: [What were you trying to accomplish]
- **Root Cause**: [If known: missing permissions, rate limit, tool unavailable, etc.]
- **Alternative Tried**: `alternative_tool` or `alternative_command`
- **Alternative Result**: ✅ Success / ❌ Failed
- **Final Resolution**: [How the issue was ultimately resolved]

#### 2. [Next Failed Operation]
...

### Successful Operations (Summary)
- ✅ All lint checks passed
- ✅ Test suite executed successfully
- ✅ Documentation generated
- ✅ Git operations completed

### Recommendations for Improvement
Based on failures encountered:
1. [Suggestion to improve agent configuration]
2. [Suggestion to add/fix tools]
3. [Suggestion to update documentation]
```

## Categorization of Failures

### Critical Failures (Block Progress)
- Report immediately if possible
- Must include alternative or escalation path
- Example: Cannot access required file, API completely unavailable

### Non-Critical Failures (Degraded Experience)
- Can be reported in summary
- Alternative successfully used
- Example: Preferred tool unavailable but fallback worked

### Informational (Unexpected but Handled)
- Report in summary only
- Useful for future optimization
- Example: Command slower than expected but completed

## Error Types to Track

1. **Permission Errors**
   - GitHub MCP: Insufficient permissions
   - File system: Access denied
   - API: Authentication failed

2. **Not Found Errors**
   - File/directory not found
   - Command not available
   - MCP server not responding

3. **Rate Limiting**
   - API rate limits exceeded
   - GitHub rate limits

4. **Timeouts**
   - Command timeout
   - Network timeout
   - MCP timeout

5. **Tool Unavailable**
   - MCP server not installed
   - Command not in PATH
   - Package not installed

6. **Logic Errors**
   - Unexpected output format
   - Invalid parameters
   - Breaking API changes

## Example: Complete Execution Log

```markdown
## Execution Log

### Summary
- Total operations: 15
- Failed operations: 3
- Successful alternatives: 3
- Unresolved failures: 0

### Failed Operations

#### 1. GitHub MCP: Create Pull Request
- **Command/Tool**: `mcp__GitHub__create_pull_request`
- **Error Message**: "Resource not accessible by integration"
- **Error Type**: Permission Denied
- **Context**: Attempting to create PR for branch refactor/number-validators
- **Root Cause**: GitHub MCP token lacks repository write permissions
- **Alternative Tried**: `gh pr create` via Bash tool
- **Alternative Result**: ✅ Success
- **Final Resolution**: PR #26 created successfully via gh CLI

#### 2. Property-Based Testing: File Not Found
- **Command/Tool**: `pnpm test:pbt`
- **Error Message**: "No test files found matching pattern '**/*.pbt.test.ts'"
- **Error Type**: Not Found
- **Context**: Running property-based tests for isNumber function
- **Root Cause**: PBT test file not yet created in .kiro/specs/number-validators/
- **Alternative Tried**: Used `Glob` to search for existing PBT files first
- **Alternative Result**: ✅ Success (confirmed no files exist)
- **Final Resolution**: Created isNumber.pbt.test.ts before running tests

#### 3. Documentation Linting: Configuration Issue
- **Command/Tool**: `pnpm lint:docs`
- **Error Message**: "markdownlint-cli2: command not found"
- **Error Type**: Tool Unavailable
- **Context**: Validating markdown documentation quality
- **Root Cause**: markdownlint-cli2 not installed in dependencies
- **Alternative Tried**: `pnpm install` to ensure dependencies, then retry
- **Alternative Result**: ✅ Success
- **Final Resolution**: All documentation linting passed after dependency install

### Successful Operations (Summary)
- ✅ Code implementation completed (5 functions)
- ✅ TDD tests written and passing (25 test cases)
- ✅ Code review passed with EXCELLENT grade
- ✅ Build compilation successful
- ✅ All quality checks passed

### Recommendations for Improvement
1. **GitHub MCP Permissions**: Verify GitHub MCP server has write permissions before attempting PR creation. Consider documenting fallback to `gh` CLI in agent prompts.
2. **PBT File Checking**: Add explicit check for PBT file existence before running `pnpm test:pbt` to provide clearer error messages.
3. **Dependency Verification**: Run `pnpm install` as a preliminary step in agents that depend on dev dependencies.
```

## Integration into Agent Prompts

### Add to ALL agent markdown files:

```markdown
## Execution Logging (MANDATORY)

You MUST track and report all execution attempts, failures, and alternatives.

### Logging Workflow

1. **Before executing any command/tool**:
   - Note what you're about to attempt

2. **If command/tool fails**:
   - Capture exact error message
   - Identify error type
   - Document what you tried instead
   - Report result of alternative

3. **In final report**:
   - Include complete "Execution Log" section
   - Use standard format from `.claude/guidelines/agent-execution-logging.md`
   - Provide recommendations for improvement

### Reporting Format

Follow the template in `.claude/guidelines/agent-execution-logging.md`:
- Summary statistics
- Detailed failed operations
- Successful operations summary
- Recommendations for improvement

Your execution log helps improve agent reliability and user experience.
```

## Benefits

1. **Debugging**: Quickly identify why an agent failed or behaved unexpectedly
2. **Optimization**: Learn which tools/commands are unreliable and need alternatives
3. **Configuration**: Identify missing permissions, tools, or dependencies
4. **Documentation**: Build knowledge base of failure patterns and solutions
5. **Agent Improvement**: Data-driven refinement of agent prompts and workflows

## Usage by Developers

After agent execution, check the "Execution Log" section to:
1. Understand any issues encountered
2. Verify alternatives worked correctly
3. Update agent configurations based on recommendations
4. Share failure patterns in project documentation
