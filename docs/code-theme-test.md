---
layout: docs
title: Code Theme Test
description: Test page to verify code styling works in both light and dark modes
---

# Code Theme Test

This page demonstrates that code blocks render correctly in both light and dark themes.

## Inline Code

Here's some inline `code` that should be readable in both themes. Variables like `var_name`, functions like `functionName()`, and constants like `MAX_VALUE` should all be visible.

## Plain Code Block

```
This is a plain code block without syntax highlighting.
It should have proper text color in both light and dark modes.
No fancy colors, just readable text on appropriate background.
```

## JSON Code Block

```json
{
  "Report-Type": "login-attack",
  "Service-Type": "smtp",
  "Version": "2.0",
  "User-Agent": "XARF-Parser/1.0",
  "Date": "2024-01-15T10:30:00Z",
  "Source": "192.0.2.100",
  "Source-Type": "ip-address",
  "Attachment": "evidence-001",
  "Schema-URL": "https://xarf.org/schema/login-attack_2.0.json"
}
```

## Python Code Block

```python
import xarf
from datetime import datetime

class XARFReport:
    def __init__(self, report_type):
        self.report_type = report_type
        self.version = "2.0"
        self.date = datetime.now()

    def validate(self):
        """Validate the XARF report against schema"""
        return True

    def to_json(self):
        return {
            "Report-Type": self.report_type,
            "Version": self.version,
            "Date": self.date.isoformat()
        }

# Create and validate report
report = XARFReport("login-attack")
if report.validate():
    print("Report is valid")
```

## JavaScript Code Block

```javascript
const xarf = require('xarf-parser');

class XARFReport {
  constructor(reportType) {
    this.reportType = reportType;
    this.version = '2.0';
    this.date = new Date().toISOString();
  }

  validate() {
    // Validate against schema
    return true;
  }

  toJSON() {
    return {
      'Report-Type': this.reportType,
      'Version': this.version,
      'Date': this.date
    };
  }
}

// Create and validate report
const report = new XARFReport('login-attack');
if (report.validate()) {
  console.log('Report is valid');
}
```

## Bash Code Block

```bash
#!/bin/bash

# Install XARF tools
pip install xarf-parser

# Validate a report
xarf validate report.json

# Convert from YAML to JSON
xarf convert input.yaml -o output.json

# Generate sample report
xarf generate login-attack > sample.json
```

## HTML Code Block

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <title>XARF Report Viewer</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="report-container">
    <h1>XARF Report</h1>
    <pre class="highlight">
      <code class="language-json">
        { "Report-Type": "login-attack" }
      </code>
    </pre>
  </div>
  <script src="app.js"></script>
</body>
</html>
```

## CSS/SCSS Code Block

```scss
// XARF report styling
.xarf-report {
  --report-bg: #f9fafb;
  --report-border: #e5e7eb;

  background: var(--report-bg);
  border: 1px solid var(--report-border);
  padding: 1rem;
  border-radius: 0.5rem;

  .report-header {
    font-weight: 600;
    color: var(--color-primary);
  }

  .report-field {
    margin-bottom: 0.5rem;

    &.required::after {
      content: "*";
      color: red;
    }
  }
}

[data-theme="dark"] .xarf-report {
  --report-bg: #1f2937;
  --report-border: #374151;
}
```

## YAML Code Block

```yaml
# XARF Report Configuration
report:
  type: login-attack
  version: "2.0"
  schema_url: https://xarf.org/schema/login-attack_2.0.json

service:
  type: smtp
  port: 25

source:
  type: ip-address
  value: 192.0.2.100

evidence:
  - type: log-entry
    hash: sha256:abc123...
  - type: pcap
    hash: sha256:def456...

timestamps:
  detected: 2024-01-15T10:30:00Z
  reported: 2024-01-15T10:35:00Z
```

## Test Checklist

Test both themes (use theme toggle in header):

### Light Mode
- [ ] Inline code has dark text on light background
- [ ] Plain code blocks have dark text on light background
- [ ] Syntax highlighted keywords are purple/blue
- [ ] Strings are green
- [ ] Comments are gray and italic
- [ ] Numbers are red/orange
- [ ] All text is clearly readable

### Dark Mode
- [ ] Inline code has light text on dark background
- [ ] Plain code blocks have light text on dark background
- [ ] Syntax highlighted keywords are light purple
- [ ] Strings are light green
- [ ] Comments are light gray and italic
- [ ] Numbers are light red/orange
- [ ] All text is clearly readable
- [ ] No dark text on dark background issues
