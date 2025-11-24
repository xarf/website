---
layout: tool
title: "Schema Validator"
description: "Validate XARF reports against JSON schemas to ensure compliance with the specification"
permalink: /tools/validator/
---

# XARF Schema Validator

Validate your XARF reports against the official JSON schemas to ensure they conform to the specification.

<div class="tool-container">
  <div class="tool-input">
    <h2>Paste Your XARF Report</h2>
    <textarea id="xarf-input" placeholder='Paste your XARF JSON report here...
Example:
{
  "xarf_version": "4.0.0",
  "report_id": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2024-01-15T10:00:00Z",
  ...
}'></textarea>

    <div class="tool-actions">
      <button id="validate-btn" class="btn btn-primary">Validate Report</button>
      <button id="clear-btn" class="btn btn-secondary">Clear</button>
      <button id="load-example-btn" class="btn btn-secondary">Load Example</button>
    </div>

    <div class="validation-options">
      <label>
        <input type="checkbox" id="strict-mode" checked>
        Strict Mode (validate all recommended fields)
      </label>
      <label>
        <input type="checkbox" id="show-warnings" checked>
        Show Warnings
      </label>
    </div>
  </div>

  <div class="tool-output">
    <h2>Validation Results</h2>
    <div id="validation-results" class="results-placeholder">
      Results will appear here after validation...
    </div>
  </div>
</div>

## Features

- **Real-time Validation** - Instant feedback on report structure
- **Detailed Error Messages** - Clear explanations of what needs fixing
- **Schema Version Detection** - Automatically validates against the correct schema version
- **Strict Mode** - Optional validation of recommended fields
- **Example Reports** - Load sample reports for each event type
- **Privacy Focused** - All validation happens in your browser, no data sent to servers

## How to Use

1. **Paste or Load** - Enter your XARF JSON report or load an example
2. **Validate** - Click "Validate Report" to check against the schema
3. **Review** - Check the results for errors, warnings, and suggestions
4. **Fix** - Address any issues highlighted in the validation report
5. **Re-validate** - Run validation again after making changes

## Validation Levels

### ✓ Valid
Your report meets all mandatory requirements and is ready to send.

### ⚠ Valid with Warnings
Your report is technically valid but missing recommended fields or using deprecated features.

### ✗ Invalid
Your report has errors that must be fixed before it can be used.

## Common Validation Errors

### Missing Mandatory Fields

**Error**: `Missing required field: 'reporter'`

**Solution**: Add all mandatory (🟠) fields for your report type. See [Sample Reports](/docs/types/) for requirements.

### Invalid Field Format

**Error**: `Invalid timestamp format`

**Solution**: Use ISO 8601 format: `YYYY-MM-DDTHH:mm:ssZ`

### Unknown Classification or Type

**Error**: `Unknown type 'unknown_type' for class 'abuse'`

**Solution**: Use only valid types for each classification. See [Event Types](/docs/types/).

### Invalid Evidence Encoding

**Error**: `Invalid base64 encoding in evidence.payload`

**Solution**: Ensure evidence payloads are properly base64-encoded.

## API Usage

You can also validate reports programmatically using our libraries:

<details class="code-example" markdown="1">
<summary>Python</summary>

```python
from xarf import XARFReport

report = XARFReport.from_json(json_string)
if report.validate():
    print("✓ Report is valid!")
else:
    for error in report.validation_errors:
        print(f"✗ {error}")
```
</details>

<details class="code-example" markdown="1">
<summary>JavaScript</summary>

```javascript
const { XARFReport } = require('xarf');

const report = XARFReport.fromJSON(jsonString);
if (report.validate()) {
  console.log('✓ Report is valid!');
} else {
  report.validationErrors.forEach(error => {
    console.log(`✗ ${error}`);
  });
}
```
</details>

## Need Help?

- **[Implementation Guide](/docs/implementation-guide/)** - Step-by-step integration guide
- **[Schema Reference](/docs/schemas/)** - Detailed schema documentation
- **[GitHub Issues](https://github.com/xarf/xarf-spec/issues)** - Report bugs or request features

<script src="{{ site.baseurl }}/assets/js/validator.js"></script>
<style>
.tool-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

@media (max-width: 768px) {
  .tool-container {
    grid-template-columns: 1fr;
  }
}

.tool-input, .tool-output {
  background: var(--color-background-alt);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1.5rem;
}

.tool-input h2, .tool-output h2 {
  margin-top: 0;
  font-size: 1.25rem;
  color: var(--color-text);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

#xarf-input {
  width: 100%;
  min-height: 400px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  background: var(--color-background);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 1rem;
  resize: vertical;
}

.tool-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.validation-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.validation-options label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--color-text-light);
  cursor: pointer;
}

.validation-options input[type="checkbox"] {
  cursor: pointer;
}

.results-placeholder {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-light);
  font-style: italic;
}

.validation-success {
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid #22c55e;
  border-radius: 4px;
  padding: 1rem;
  color: #22c55e;
}

.validation-warning {
  background: rgba(251, 146, 60, 0.1);
  border: 1px solid #fb923c;
  border-radius: 4px;
  padding: 1rem;
  color: #fb923c;
}

.validation-error {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid #ef4444;
  border-radius: 4px;
  padding: 1rem;
  color: #ef4444;
}

.error-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0 0;
}

.error-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid currentColor;
  opacity: 0.5;
}

.error-list li:last-child {
  border-bottom: none;
}
</style>
