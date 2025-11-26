# Agent Guidelines

This directory contains operational guidelines and templates for agents in the chronia project.

## Purpose

While `.claude/agents/` contains agent definitions (what agents do), this directory contains:
- **Configuration guides**: How to configure and update agents
- **Templates**: Standard formats for agent behaviors
- **Best practices**: Operational guidelines for agent development

## Available Guidelines

### [agent-configuration.md](./agent-configuration.md)
Complete guide for configuring and managing agents:
- Available agents and their purposes
- Standard agent structure
- Execution logging requirements
- Update checklist
- Priority for adding features
- Best practices

### [agent-execution-logging.md](./agent-execution-logging.md)
Template and requirements for agent execution logging:
- Why execution logging is important
- What to log (failures, alternatives, behaviors)
- Standard logging format
- Error categorization
- Complete implementation examples

## Quick Start

### For Agent Developers

1. Read [agent-configuration.md](./agent-configuration.md) for overview
2. Follow the agent update checklist when modifying agents
3. Use [agent-execution-logging.md](./agent-execution-logging.md) template when adding logging

### For Users

- Check [agent-configuration.md](./agent-configuration.md) to understand available agents
- Review execution logs in agent reports to understand what happened
- Refer to these guidelines when debugging agent issues

## Relationship to Other Directories

```
.claude/
├── agents/           # Agent definitions (WHAT agents do)
│   ├── code-reviewer.md
│   ├── pr-review-triager.md
│   └── ...
├── guidelines/       # Agent operational guidelines (HOW to manage agents)
│   ├── agent-configuration.md
│   └── agent-execution-logging.md
└── commands/         # Slash commands
```

## Contributing

When adding new agent features or behaviors:
1. Update relevant guidelines in this directory
2. Ensure all agents follow the standard structure
3. Add execution logging using the template
4. Document changes in [agent-configuration.md](./agent-configuration.md)
