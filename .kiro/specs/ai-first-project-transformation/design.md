# Design Document

## Overview

This design document outlines the transformation of the Chronia TypeScript date/time utility library into an AI-first project. The transformation focuses on restructuring documentation to optimize AI comprehension while preserving existing human-readable resources. The design emphasizes clear separation of concerns between public API documentation and AI-specific guidance.

## Architecture

### Documentation Architecture

The project will maintain a dual documentation architecture:

1. **Public Documentation** (`site/` directory)
   - Generated TypeDoc documentation for end users
   - Comprehensive API reference with examples
   - Maintained through existing build processes

2. **AI Documentation** (`docs/` directory)
   - Structured markdown files for AI consumption
   - Function category guides with usage patterns
   - Troubleshooting and common pitfalls documentation

3. **AI Configuration Files**
   - Enhanced GitHub Copilot instructions
   - Consolidated AI agent guidance (AGENTS.md)
   - Cross-references to existing Claude-specific documentation

### Directory Structure

```
chronia/
├── site/                          # Renamed from 'docs' - TypeDoc generated content
│   ├── assets/
│   ├── functions/
│   ├── interfaces/
│   ├── types/
│   ├── variables/
│   └── index.html
├── docs/                          # New - AI-focused documentation
│   ├── README.md                  # AI documentation overview
│   ├── function-categories/
│   │   ├── arithmetic/
│   │   │   ├── addition.md        # Add operations (addDays, addHours, etc.)
│   │   │   └── subtraction.md     # Subtract operations (subDays, subHours, etc.)
│   │   ├── comparison/
│   │   │   ├── relational.md      # isAfter, isBefore, isBetween, etc.
│   │   │   ├── equality.md        # isEqual, isSame* functions
│   │   │   └── validation.md      # isValid function
│   │   ├── difference/
│   │   │   └── calculations.md    # diffDays, diffHours, etc.
│   │   ├── getter/
│   │   │   └── extraction.md      # getYear, getMonth, getDay, etc.
│   │   ├── setter/
│   │   │   └── modification.md    # setYear, setMonth, setDay, etc.
│   │   ├── boundary/
│   │   │   └── periods.md         # startOf*, endOf* functions
│   │   ├── truncation/
│   │   │   └── units.md           # truncYear, truncMonth, etc.
│   │   ├── formatting/
│   │   │   └── conversion.md      # format, parse functions
│   │   ├── utility/
│   │   │   └── helpers.md         # now, min, max, clamp functions
│   │   └── constants/
│   │       └── types.md           # Constants and TypeScript types
│   ├── guidelines/
│   │   ├── development-principles.md  # Core development principles and standards
│   │   ├── project-structure.md   # Project structure and organization
│   │   ├── tech-stack.md          # Technology stack and tooling explanation
│   │   ├── error-handling.md      # Error handling patterns
│   │   ├── input-validation.md    # Input validation approaches
│   │   └── common-use-cases.md    # Typical usage scenarios
│   └── troubleshooting/
│       ├── common-pitfalls.md     # Frequent mistakes and solutions
│       └── debugging-guide.md     # Debugging date/time issues
├── .github/
│   └── copilot-instructions.md    # Enhanced with project-specific guidance
├── AGENTS.md                      # New - AI agent entry point
├── CLAUDE.md                      # Existing - Claude-specific guidance
└── README.md                      # Enhanced with AI-friendly content
```

## Components and Interfaces

### 1. Directory Restructuring Component

#### Purpose
Rename existing documentation directory and create new AI-focused structure

#### Implementation
- Rename existing `docs/` directory to `site/`
- Create new `docs/` directory with AI-focused content structure
- Update TypeDoc configuration in `typedoc.json` to output to `site/` directory
- Update any references to `docs/` in build scripts, README links, and deployment configurations

### 2. AI Documentation Generator Component

#### Purpose
Create structured markdown documentation for AI consumption

#### Key Files
- Function category directories with specific markdown files for each subcategory
- Guidelines documentation including core development principles and common development scenarios
- Troubleshooting guides with specific solutions

#### Guidelines Content Details
- `development-principles.md`: Core development principles including directory structure for new functions, TypeScript type safety with JavaScript compatibility, no-exception error handling policy, focus on high-frequency functions only, performance and robustness priorities, options parameter patterns
- `project-structure.md`: Project structure and organization including directory layout, file naming conventions, module organization, and architectural patterns
- `tech-stack.md`: Technology stack explanation including TypeScript 5.9+, Node.js LTS support, Vitest for testing, tsup for building, ESLint for linting, TypeDoc for documentation generation
- `error-handling.md`: Error handling patterns including no-exception policy, standardized error values (Invalid Date, NaN, false), input validation approaches
- `input-validation.md`: Input validation approaches using _lib/validators.ts, isValidDateOrNumber and isValidNumber patterns
- `common-use-cases.md`: Typical usage scenarios including date arithmetic, formatting/parsing, comparisons, and boundary operations

#### Troubleshooting Content Details
- `common-pitfalls.md`: Frequent mistakes including timezone handling, month indexing (0-11), leap year edge cases, invalid date propagation, and their solutions
- `debugging-guide.md`: Debugging date/time issues including how to identify invalid dates, understanding error return values, testing with edge cases, and validation strategies

#### Content Structure
```markdown
# [Subcategory Name] Functions

## Overview
Brief description of the subcategory and its purpose

## Functions
List of functions with signatures and brief descriptions

## Usage Patterns
Common usage scenarios with code examples

## AI Guidance
Specific guidance for AI systems when suggesting these functions

## Common Pitfalls
Frequent mistakes and how to avoid them
```

### 3. README Enhancement Component

#### Purpose
Enhance existing README.md with AI-friendly content while maintaining human readability

#### Enhancements
- Add AI-specific sections without disrupting existing flow
- Include links from each of the 10 function category sections to corresponding docs/ files
- Add metadata for AI comprehension (library purpose, function count, categories)
- Maintain existing structure and content while adding cross-references
- Update existing TypeDoc documentation links to point to site/ directory

### 4. GitHub Copilot Instructions Component

#### Purpose
Provide comprehensive project context for GitHub Copilot

#### Content Areas
- Document overview and prerequisites
- Library overview with main features (referencing docs/guidelines/development-principles.md)
- Technology stack overview (referencing docs/guidelines/tech-stack.md)
- Project structure (referencing docs/guidelines/project-structure.md)
- Architecture guidelines and design principles
- Directory and file naming conventions
- Implementation guide with coding best practices
- Anti-patterns and common mistakes to avoid
- Code review guidelines (security, performance, readability, maintainability focus areas)
- Cross-references to relevant docs/ files for detailed information

### 5. AGENTS.md Consolidation Component

#### Purpose
Create single entry point for all AI-related documentation

#### Structure
- Overview of AI documentation resources and their purposes
- Links to category-specific documentation in docs/function-categories/
- References to existing CLAUDE.md for Claude-specific guidance
- Links to enhanced .github/copilot-instructions.md for GitHub Copilot
- Guidelines for different AI systems (Claude, GitHub Copilot, ChatGPT, etc.)
- Quick reference for common development tasks and patterns

## Data Models

### Documentation Metadata

```typescript
interface DocumentationMetadata {
  category: FunctionCategory;
  functions: string[];
  usagePatterns: UsagePattern[];
  commonPitfalls: Pitfall[];
  aiGuidance: string[];
}

interface UsagePattern {
  name: string;
  description: string;
  codeExample: string;
  context: string;
}

interface Pitfall {
  issue: string;
  solution: string;
  prevention: string;
}
```

### Function Categories

```typescript
enum FunctionCategory {
  ARITHMETIC = 'arithmetic',
  COMPARISON = 'comparison', 
  DIFFERENCE = 'difference',
  GETTER = 'getter',
  SETTER = 'setter',
  BOUNDARY = 'boundary',
  TRUNCATION = 'truncation',
  FORMATTING = 'formatting',
  UTILITY = 'utility',
  CONSTANTS = 'constants'
}
```

## Error Handling

### Documentation Consistency

- All AI documentation must maintain consistency with existing CLAUDE.md guidance
- Error handling patterns must align with library's no-exception policy
- Examples must demonstrate proper error value handling (`Invalid Date`, `NaN`, `false`)

### Build Process Integration

- Update `typedoc.json` configuration to output generated documentation to `site/` directory instead of `docs/`
- Ensure site/ directory generation continues to work with existing TypeDoc configuration
- Update any GitHub Pages or deployment configurations to serve from `site/` directory
- Validate that all internal links in docs/ directory resolve correctly
- Maintain backward compatibility for existing documentation consumers by preserving all generated content

### Content Validation

- Verify all function references in AI documentation match actual library exports
- Ensure code examples compile and execute correctly
- Validate that usage patterns align with library design principles

## Testing Strategy

### Documentation Testing

1. **Link Validation**
   - Verify all internal links resolve correctly
   - Check external references remain valid
   - Validate cross-references between AI documentation files

2. **Content Accuracy**
   - Ensure function signatures match actual implementations
   - Verify code examples execute without errors
   - Validate usage patterns against library behavior

3. **AI Comprehension Testing**
   - Test documentation with AI systems to ensure clarity
   - Validate that AI agents can understand and apply guidance
   - Verify cross-references work as intended

### Build Process Testing

1. **Site Generation**
   - Ensure TypeDoc continues to generate site/ content correctly
   - Verify no broken links in generated documentation
   - Validate styling and navigation remain functional

2. **Configuration Updates**
   - Test that build scripts work with new directory structure
   - Verify deployment processes handle site/ directory correctly
   - Ensure CI/CD pipelines adapt to changes

### Integration Testing

1. **AI Agent Testing**
   - Test GitHub Copilot with enhanced instructions
   - Verify Claude can access and utilize AGENTS.md effectively
   - Validate cross-references between documentation files

2. **Developer Experience**
   - Ensure human developers can still access comprehensive documentation
   - Verify README enhancements don't disrupt existing workflows
   - Test that new structure improves rather than hinders development