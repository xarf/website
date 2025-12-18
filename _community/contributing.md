---
layout: docs
title: "Contributing to XARF"
description: "How to contribute to the XARF specification and ecosystem"
permalink: /community/contributing/
---

# Contributing to XARF

Thank you for your interest in contributing to XARF! This guide will help you get started whether you want to propose specification changes, contribute code, or improve documentation.

---

## Ways to Contribute

### 1. Specification Development

Help evolve the XARF standard:

- **Propose new event types** for emerging abuse categories
- **Suggest field additions** to existing types
- **Improve schema definitions** for better validation
- **Enhance documentation** with clearer examples
- **Report ambiguities** in the specification

### 2. Library Development

Build or improve XARF libraries:

- **Implement missing language libraries** (Rust, Ruby, PHP, etc.)
- **Add features** to existing libraries
- **Improve performance** and reduce dependencies
- **Write tests** and increase code coverage
- **Fix bugs** and security issues

### 3. Tools and Utilities

Create useful tools for the ecosystem:

- **Validators** - Schema validation tools
- **Converters** - Format conversion utilities
- **Generators** - Test report generators
- **Analyzers** - Report analysis tools
- **Integrations** - Platform-specific plugins

### 4. Documentation

Improve the documentation:

- **Fix typos** and grammatical errors
- **Add examples** for complex use cases
- **Create tutorials** for common scenarios
- **Translate documentation** to other languages
- **Write blog posts** about XARF implementations

---

## Getting Started

### Step 1: Choose What to Contribute

Browse open issues and discussions:

- **[GitHub Issues](https://github.com/xarf/xarf-spec/issues)** - Known bugs and feature requests
- **[GitHub Discussions](https://github.com/xarf/xarf-spec/discussions)** - Ideas and questions
- **[Project Board](https://github.com/orgs/xarf/projects/1)** - Roadmap and planned work

Look for issues tagged with:
- `good first issue` - Great for newcomers
- `help wanted` - Community contributions welcome
- `documentation` - Documentation improvements
- `enhancement` - New features

### Step 2: Fork and Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR_USERNAME/xarf-spec.git
cd xarf-spec

# Add upstream remote
git remote add upstream https://github.com/xarf/xarf-spec.git
```

### Step 3: Create a Branch

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Or a bugfix branch
git checkout -b fix/issue-123
```

### Step 4: Make Your Changes

Follow our coding standards and guidelines (see below).

### Step 5: Test Your Changes

```bash
# For specification changes
npm run validate-schemas

# For library changes
npm test
npm run lint

# For documentation changes
bundle exec jekyll serve
```

### Step 6: Submit a Pull Request

```bash
# Commit your changes
git add .
git commit -m "feat: add support for new event type"

# Push to your fork
git push origin feature/your-feature-name
```

Then open a pull request on GitHub with:
- **Clear title** describing the change
- **Description** explaining what and why
- **Testing** details showing how you verified the changes
- **Screenshots** if UI changes are involved

---

## Contribution Guidelines

### Code Style

#### JSON Schemas

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "EventTypeName",
  "type": "object",
  "required": ["field1", "field2"],
  "properties": {
    "field1": {
      "type": "string",
      "description": "Clear description of the field"
    }
  }
}
```

**Guidelines**:
- Use descriptive titles
- Include detailed descriptions
- Define all required fields
- Use consistent naming conventions (snake_case)
- Add examples where helpful

#### Python Code

Follow PEP 8 style guide:

```python
"""Module docstring explaining purpose."""

from typing import Optional


class XARFReport:
    """XARF report class.

    Args:
        report_id: Unique identifier
        timestamp: ISO 8601 timestamp
    """

    def __init__(self, report_id: str, timestamp: str) -> None:
        self.report_id = report_id
        self.timestamp = timestamp

    def validate(self) -> bool:
        """Validate report against schema.

        Returns:
            True if valid, False otherwise
        """
        # Implementation
        pass
```

**Guidelines**:
- Type hints for all functions
- Docstrings for classes and public methods
- Maximum line length: 88 characters (Black formatter)
- Use descriptive variable names

#### JavaScript/TypeScript Code

```typescript
/**
 * XARF report interface
 */
export interface XARFReport {
  report_id: string;
  timestamp: string;
  category: string;
  type: string;
}

/**
 * Validate XARF report against schema
 * @param report - Report to validate
 * @returns True if valid
 */
export function validateReport(report: XARFReport): boolean {
  // Implementation
  return true;
}
```

**Guidelines**:
- TypeScript for type safety
- JSDoc comments for public APIs
- Use Prettier for formatting
- Avoid `any` types

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples**:
```
feat(schema): add SMS spam event type

Adds a new event type for reporting SMS spam with fields for
phone number, message content, and carrier information.

Closes #123
```

```
fix(python): handle missing evidence field gracefully

The parser would crash when evidence field was missing.
Now returns a validation error instead.

Fixes #456
```

```
docs(examples): add phishing report example

Added a complete example of a phishing report including
evidence and proper field usage.
```

### Testing Requirements

All contributions must include tests:

#### Schema Changes

```bash
# Validate schema syntax
npm run validate-schemas

# Test against example reports
npm run test-examples
```

#### Code Changes

```bash
# Unit tests
npm test

# Integration tests
npm run test:integration

# Coverage (aim for >80%)
npm run test:coverage
```

#### Documentation Changes

```bash
# Build and preview
bundle exec jekyll serve

# Check for broken links
npm run check-links
```

---

## Proposing Specification Changes

### Minor Changes

For small improvements (typos, clarifications, examples):

1. Open a pull request directly
2. Describe the improvement
3. Tag with `documentation` label

### Major Changes

For significant changes (new types, breaking changes):

1. **Open a Discussion** first
2. Describe the problem and proposed solution
3. Gather feedback from the community
4. Create a formal proposal (see template below)
5. Submit a pull request referencing the proposal

### Proposal Template

```markdown
# Proposal: [Title]

## Problem Statement
Describe the problem this change solves.

## Proposed Solution
Detail your proposed change.

## Alternatives Considered
What other approaches did you consider?

## Impact Analysis
- Breaking changes: Yes/No
- Affected components: [list]
- Migration path: [if breaking]

## Implementation Plan
1. Step 1
2. Step 2
3. Step 3

## Examples
Provide concrete examples of the change.
```

---

## Adding a New Event Type

Follow this process to add a new event type to XARF:

### 1. Research

- **Check existing types** - Might it fit an existing category?
- **Gather use cases** - Who needs this and why?
- **Identify required fields** - What data is essential?
- **Review similar types** - Look at comparable events for consistency

### 2. Create Schema

```bash
# Create new schema file
touch schemas/v4/types/CLASS-TYPE.json
```

Base your schema on existing types:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://xarf.org/schemas/v4/types/connection-ddos.json",
  "title": "XARF Connection - DDoS Attack",
  "description": "Reports of distributed denial of service attacks",
  "type": "object",
  "required": [
    "xarf_version",
    "report_id",
    "timestamp",
    "reporter",
    "source_identifier",
    "category",
    "type"
  ],
  "properties": {
    "xarf_version": { "$ref": "../common.json#/$defs/xarf_version" },
    "category": { "const": "connection" },
    "type": { "const": "ddos" },

    "attack_vector": {
      "type": "string",
      "description": "Type of DDoS attack (UDP flood, SYN flood, HTTP flood, etc.)",
      "examples": ["udp_flood", "syn_flood", "http_flood"]
    }
  }
}
```

### 3. Create Example Report

```bash
# Create example file
touch examples/CLASS/TYPE.json
```

Provide a complete, valid example:

```json
{
  "xarf_version": "4.0.0",
  "report_id": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2024-01-15T10:00:00Z",
  "reporter": {
    "org": "Example Security",
    "contact": "abuse@example.com",
    "domain": "example.com"
  },
  "sender": {
    "org": "Example Security",
    "contact": "abuse@example.com",
    "domain": "example.com"
  },
  "source_identifier": "192.0.2.100",
  "category": "connection",
  "type": "ddos",
  "attack_vector": "udp_flood"
}
```

### 4. Document the Type

Add documentation to the website:

```markdown
## ddos

**Use Case**: Reports of distributed denial of service attacks...

<details class="sample-report" markdown="1">
<summary>View Complete Sample</summary>

```json
{
  "xarf_version": "4.0.0",
  ...
}
```

</details>
```

### 5. Update Registry

Add to `docs/event-types.md`:

```markdown
| `ddos` | Distributed denial of service attack | connection |
```

### 6. Submit Pull Request

Include in your PR:
- [ ] Schema file
- [ ] Example report
- [ ] Documentation
- [ ] Registry update
- [ ] Tests that validate the example against schema

---

## Code Review Process

All contributions go through code review:

### What Reviewers Look For

1. **Correctness** - Does it work as intended?
2. **Style** - Does it follow our guidelines?
3. **Tests** - Are changes adequately tested?
4. **Documentation** - Are new features documented?
5. **Breaking Changes** - Are they necessary and documented?
6. **Security** - Are there any security implications?

### Review Timeline

- **Simple changes**: 1-3 days
- **Complex changes**: 1-2 weeks
- **Specification changes**: 2-4 weeks (requires community feedback)

### Getting Your PR Merged

Make it easy for reviewers:

- **Small, focused PRs** - One logical change per PR
- **Clear description** - Explain the what and why
- **Tests included** - Demonstrate it works
- **Documentation updated** - Keep docs in sync
- **Respond to feedback** - Address reviewer comments promptly

---

## Community Guidelines

### Code of Conduct

We are committed to providing a welcoming and inclusive environment. All participants must:

- **Be respectful** - Treat everyone with respect
- **Be constructive** - Focus on helping and improving
- **Be inclusive** - Welcome diverse perspectives
- **Be patient** - Help newcomers learn
- **Be professional** - Keep discussions focused and productive

### Communication Channels

- **[GitHub Discussions](https://github.com/xarf/xarf-spec/discussions)** - General questions, ideas, announcements
- **[GitHub Issues](https://github.com/xarf/xarf-spec/issues)** - Bug reports, feature requests

<!-- Additional channels launching as community grows -->
**Note**: Slack and mailing lists will be available as the community grows. For now, GitHub Discussions provides the best way to connect with maintainers and contributors.

---

## Recognition

Contributors are recognized in multiple ways:

- **Contributors File** - Listed in CONTRIBUTORS.md
- **Release Notes** - Credited in changelog
- **Website** - Featured on community page (optional)
- **Swag** - Stickers and t-shirts for significant contributions

---

## License

By contributing to XARF, you agree that your contributions will be licensed under:

- **Specification & Schemas**: MIT License
- **Documentation**: CC BY 4.0
- **Example Code**: CC0 1.0 (Public Domain)

---

## Questions?

- **General questions**: [GitHub Discussions](https://github.com/xarf/xarf-spec/discussions)
- **Contribution help**: Tag @maintainers in your issue/PR
- **Private concerns**: Email maintainers@xarf.org

**Thank you for contributing to XARF!** 🎉
