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
    <h3>Schema Validator</h3>
    <p>Validate XARF reports against JSON schemas to ensure compliance with the specification.</p>
    <div class="tool-features">
      <span class="feature-tag">Real-time validation</span>
      <span class="feature-tag">Detailed error messages</span>
      <span class="feature-tag">All event types</span>
    </div>
    <a href="{{ site.baseurl }}/tools/validator/" class="btn btn-primary">Open Validator</a>
  </div>

  <div class="tool-card">
    <div class="tool-icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M12 4v16m8-8H4"/>
      </svg>
    </div>
    <h3>Sample Generator</h3>
    <p>Generate example XARF reports for testing and development purposes.</p>
    <div class="tool-features">
      <span class="feature-tag">All event types</span>
      <span class="feature-tag">Customizable fields</span>
      <span class="feature-tag">Download JSON</span>
    </div>
    <a href="{{ site.baseurl }}/tools/generator/" class="btn btn-primary">Open Generator</a>
  </div>

  <div class="tool-card">
    <div class="tool-icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M8 7h12M8 12h12M8 17h12M3 7h.01M3 12h.01M3 17h.01"/>
      </svg>
    </div>
    <h3>Format Converter</h3>
    <p>Convert between XARF and other abuse reporting formats (ARF, IODEF, CSV).</p>
    <div class="tool-features">
      <span class="feature-tag">Multiple formats</span>
      <span class="feature-tag">Bidirectional</span>
      <span class="feature-tag">Batch processing</span>
    </div>
    <a href="{{ site.baseurl }}/tools/converter/" class="btn btn-primary">Open Converter</a>
  </div>

  <div class="tool-card">
    <div class="tool-icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
      </svg>
    </div>
    <h3>Hash Calculator</h3>
    <p>Calculate SHA-256 hashes for evidence verification and integrity checking.</p>
    <div class="tool-features">
      <span class="feature-tag">SHA-256</span>
      <span class="feature-tag">File upload</span>
      <span class="feature-tag">Verification</span>
    </div>
    <a href="{{ site.baseurl }}/tools/hash-calculator/" class="btn btn-primary">Open Calculator</a>
  </div>
</div>

---

## Command-Line Tools

For integration into automated workflows and scripts.

### XARF Validator CLI

Validate XARF reports from the command line:

```bash
# Install
npm install -g xarf-validator

# Validate a report
xarf-validator report.json

# Validate multiple reports
xarf-validator reports/*.json

# Validate with strict mode
xarf-validator --strict report.json
```

**Features**:
- Batch validation
- Custom schema paths
- JSON/text output formats
- Exit codes for CI/CD integration

**[Download](https://github.com/xarf/xarf-validator)** | **[Documentation](https://github.com/xarf/xarf-validator#readme)**

---

### XARF Converter CLI

Convert between formats:

```bash
# Install
pip install xarf-converter

# ARF to XARF
xarf-convert --from arf --to xarf input.xml output.json

# XARF to IODEF
xarf-convert --from xarf --to iodef report.json report.xml

# Batch conversion
xarf-convert --from arf --to xarf reports/*.xml --output-dir converted/
```

**Features**:
- Multiple format support
- Batch processing
- Configurable field mapping
- Validation on output

**[Download](https://github.com/xarf/xarf-converter)** | **[Documentation](https://github.com/xarf/xarf-converter#readme)**

---

## IDE Extensions

Bring XARF support to your development environment.

### VS Code Extension

**XARF Language Support** for Visual Studio Code:

- Syntax highlighting for XARF JSON
- Schema validation as you type
- Autocomplete for field names
- Hover documentation
- Snippets for common reports

**[Install from Marketplace](https://marketplace.visualstudio.com/items?itemName=xarf.xarf-vscode)**

### JetBrains Plugin

**XARF Support** for IntelliJ IDEA, PyCharm, WebStorm:

- JSON schema integration
- Code completion
- Quick documentation
- Live templates

**[Install from Plugin Repository](https://plugins.jetbrains.com/plugin/xarf-support)**

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
    <span class="coming-soon-badge">Coming Soon</span>
  </a>
  <a href="{{ site.baseurl }}/libraries/go/" class="language-link">
    <strong>Go</strong>
    <span>go get github.com/xarf/xarf-go</span>
    <span class="coming-soon-badge">Coming Soon</span>
  </a>
  <a href="{{ site.baseurl }}/libraries/" class="language-link">
    <strong>View All Libraries →</strong>
  </a>
</div>

---

## API Services

Cloud-based XARF processing and validation.

### Validation API

Validate reports via REST API:

```bash
curl -X POST https://api.xarf.org/v1/validate \
  -H "Content-Type: application/json" \
  -d @report.json
```

**Response**:
```json
{
  "valid": true,
  "version": "4.0.0",
  "classification": "abuse",
  "type": "ddos"
}
```

**[API Documentation](https://api.xarf.org/docs)**

### Conversion API

Convert formats via API:

```bash
curl -X POST https://api.xarf.org/v1/convert \
  -H "Content-Type: application/json" \
  -d '{"from": "arf", "to": "xarf", "data": "..."}'
```

**[API Documentation](https://api.xarf.org/docs)**

---

## GitHub Actions

Integrate XARF validation into your CI/CD pipelines.

### XARF Validation Action

```yaml
name: Validate XARF Reports
on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: xarf/validate-action@v1
        with:
          reports: 'reports/**/*.json'
          strict: true
```

**[GitHub Marketplace](https://github.com/marketplace/actions/xarf-validator)**

---

## Docker Images

Pre-configured containers for XARF processing.

### Validator Container

```bash
docker run --rm -v $(pwd):/reports xarf/validator:latest /reports/*.json
```

### Converter Container

```bash
docker run --rm -v $(pwd):/data xarf/converter:latest \
  --from arf --to xarf /data/input.xml /data/output.json
```

**[Docker Hub](https://hub.docker.com/u/xarf)**

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
