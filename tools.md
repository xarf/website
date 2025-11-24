---
layout: docs
title: "XARF Tools"
description: "Free tools and utilities for working with XARF reports"
permalink: /tools/
---

# XARF Tools

Free, open-source tools to help you create, validate, and process XARF reports.

---

## Online Tools

Use these browser-based tools without installing anything.

<div class="tools-grid">
  <div class="tool-card">
    <div class="tool-icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    </div>
    <h3>Schema Validator <span class="status-badge beta">Beta</span></h3>
    <p>Validate XARF reports against JSON schemas to ensure compliance with the specification.</p>
    <div class="tool-features">
      <span class="feature-tag">Real-time validation</span>
      <span class="feature-tag">Detailed error messages</span>
      <span class="feature-tag">All event types</span>
    </div>
    <a href="{{ site.baseurl }}/tools/validator/" class="btn btn-primary">Open Validator</a>
  </div>

</div>

---

## Command-Line Tools

For integration into automated workflows and scripts.

### XARF Validator CLI

<!-- Coming Soon -->
**Status**: <span class="coming-soon-badge">Coming Soon</span>

Validate XARF reports from the command line:

```bash
# Install (coming soon)
npm install -g xarf-validator

# Validate a report
xarf-validator report.json

# Validate multiple reports
xarf-validator reports/*.json

# Validate with strict mode
xarf-validator --strict report.json
```

**Planned Features**:
- Batch validation
- Custom schema paths
- JSON/text output formats
- Exit codes for CI/CD integration

<!-- TODO: Add real links when available -->
**Development**: [Watch GitHub for releases](https://github.com/xarf/xarf-validator)

---


## IDE Extensions

Bring XARF support to your development environment.

### VS Code Extension

<!-- Coming Soon -->
**XARF Language Support** for Visual Studio Code <span class="coming-soon-badge">In Development</span>

**Planned Features**:
- Syntax highlighting for XARF JSON
- Schema validation as you type
- Autocomplete for field names
- Hover documentation
- Snippets for common reports

<!-- TODO: Add real marketplace link when published -->
**Development**: [Follow progress on GitHub](https://github.com/xarf/xarf-vscode)

### JetBrains Plugin

<!-- Coming Soon -->
**XARF Support** for IntelliJ IDEA, PyCharm, WebStorm <span class="coming-soon-badge">Planned</span>

**Planned Features**:
- JSON schema integration
- Code completion
- Quick documentation
- Live templates

<!-- TODO: Add real plugin repository link when published -->
**Development**: [Express interest on GitHub Discussions](https://github.com/xarf/xarf-spec/discussions)

---

## Libraries

Programmatic XARF support in your language of choice.

<div class="language-quick-links">
  <a href="{{ site.baseurl }}/libraries/python/" class="language-link">
    <strong>Python</strong>
    <span>pip install xarf</span>
  </a>
  <a href="{{ site.baseurl }}/libraries/javascript/" class="language-link">
    <strong>JavaScript</strong>
    <span>npm install xarf</span>
    <span class="alpha-badge">Alpha</span>
  </a>
  <a href="{{ site.baseurl }}/libraries/go/" class="language-link">
    <strong>Go</strong>
    <span>go get github.com/xarf/xarf-go</span>
    <span class="alpha-badge">Alpha</span>
  </a>
  <a href="{{ site.baseurl }}/libraries/java/" class="language-link">
    <strong>Java</strong>
    <span>Maven: org.xarf:xarf-java:4.0.0-alpha.1</span>
    <span class="alpha-badge">Alpha</span>
  </a>
  <a href="{{ site.baseurl }}/libraries/csharp/" class="language-link">
    <strong>C#</strong>
    <span>dotnet add package Xarf</span>
    <span class="alpha-badge">Alpha</span>
  </a>
  <a href="{{ site.baseurl }}/libraries/" class="language-link">
    <strong>View All Libraries →</strong>
  </a>
</div>

---

## API Services

Cloud-based XARF processing and validation.

### Validation API

<!-- Coming Soon -->
**Status**: <span class="coming-soon-badge">API Launching Soon</span>

Validate reports via REST API:

```bash
# API endpoint coming soon
curl -X POST https://api.xarf.org/v1/validate \
  -H "Content-Type: application/json" \
  -d @report.json
```

**Response**:
```json
{
  "valid": true,
  "version": "4.0.0",
  "category": "connection",
  "type": "ddos"
}
```

<!-- TODO: Add real API docs link when available -->
**Development**: API documentation will be available at launch

---

## GitHub Actions

Integrate XARF validation into your CI/CD pipelines.

### XARF Validation Action

<!-- Coming Soon -->
**Status**: <span class="coming-soon-badge">In Development</span>

```yaml
name: Validate XARF Reports
on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: xarf/validate-action@v1  # Coming soon
        with:
          reports: 'reports/**/*.json'
          strict: true
```

<!-- TODO: Add real GitHub Marketplace link when published -->
**Development**: [Follow progress on GitHub](https://github.com/xarf/validate-action)

---

## Docker Images

<!-- Coming Soon -->
**Status**: <span class="coming-soon-badge">Planned for Future Release</span>

Pre-configured containers for XARF processing.

### Validator Container

```bash
# Coming soon
docker run --rm -v $(pwd):/reports xarf/validator:latest /reports/*.json
```

<!-- TODO: Add real Docker Hub link when published -->
**Development**: Docker images will be published as tools are released

---

## Community Tools

Tools created by the XARF community:

<div class="community-tools">
  <div class="community-tool">
    <h4>XARF Dashboard</h4>
    <p>Web-based dashboard for visualizing XARF reports</p>
    <span class="tool-author">by @security-researcher</span>
    <a href="https://github.com/community/xarf-dashboard">GitHub</a>
  </div>

  <div class="community-tool">
    <h4>XARF Elasticsearch Integration</h4>
    <p>Import and analyze XARF reports in Elasticsearch</p>
    <span class="tool-author">by @data-analyst</span>
    <a href="https://github.com/community/xarf-elasticsearch">GitHub</a>
  </div>

  <div class="community-tool">
    <h4>XARF Slack Bot</h4>
    <p>Receive and validate XARF reports in Slack</p>
    <span class="tool-author">by @devops-engineer</span>
    <a href="https://github.com/community/xarf-slack-bot">GitHub</a>
  </div>
</div>

**Want to add your tool?** [Submit to the community tools list →](https://github.com/xarf/xarf-spec/discussions/new?category=tools)

---

## Need Help?

- **[Implementation Guide]({{ site.baseurl }}/docs/implementation-guide/)** - Integration guide
- **[GitHub Discussions](https://github.com/xarf/xarf-spec/discussions)** - Ask questions
- **[GitHub Issues](https://github.com/xarf/xarf-spec/issues)** - Report bugs

<style>
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

.tool-card {
  background: var(--color-background-alt);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all var(--transition-fast);
}

.tool-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}

.tool-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1.5rem;
  padding: 1rem;
  background: var(--color-primary-light);
  border-radius: 12px;
  color: var(--color-primary);
}

.tool-icon svg {
  width: 100%;
  height: 100%;
  stroke-width: 2;
}

.tool-card h3 {
  margin: 0 0 0.75rem 0;
  color: var(--color-text);
}

.tool-card p {
  color: var(--color-text-light);
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.tool-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.feature-tag {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  color: var(--color-text-light);
}

.language-quick-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.language-link {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background: var(--color-background-alt);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  text-decoration: none;
  transition: all var(--transition-fast);
  position: relative;
}

.language-link:hover {
  border-color: var(--color-primary);
  transform: translateY(-2px);
}

.language-link strong {
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.language-link span {
  font-size: 0.875rem;
  color: var(--color-text-light);
  font-family: var(--font-family-mono);
}

.coming-soon-badge {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.25rem 0.5rem;
  background: var(--color-warning);
  color: white;
  font-size: 0.625rem;
  font-weight: 600;
  border-radius: 4px;
  text-transform: uppercase;
  font-family: var(--font-family-sans);
}

.alpha-badge {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.25rem 0.5rem;
  background: var(--color-success);
  color: white;
  font-size: 0.625rem;
  font-weight: 600;
  border-radius: 4px;
  text-transform: uppercase;
  font-family: var(--font-family-sans);
}

.community-tools {
  display: grid;
  gap: 1.5rem;
  margin: 2rem 0;
}

.community-tool {
  padding: 1.5rem;
  background: var(--color-background-alt);
  border: 1px solid var(--color-border);
  border-radius: 8px;
}

.community-tool h4 {
  margin: 0 0 0.5rem 0;
  color: var(--color-text);
}

.community-tool p {
  color: var(--color-text-light);
  margin: 0.5rem 0;
}

.tool-author {
  font-size: 0.875rem;
  color: var(--color-text-lighter);
  font-style: italic;
}

.community-tool a {
  display: inline-block;
  margin-top: 0.75rem;
  color: var(--color-primary);
  text-decoration: none;
}

.community-tool a:hover {
  text-decoration: underline;
}
</style>
