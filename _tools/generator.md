---
layout: tool
title: "Sample Generator"
description: "Generate example XARF reports for testing and development"
permalink: /tools/generator/
---

# XARF Sample Generator

<div class="alert alert-info">
  <strong>Coming Soon:</strong> This tool is currently under development. Check back soon for the full implementation.
</div>

Generate properly formatted XARF reports for testing, development, and documentation purposes.

<div class="tool-container">
  <div class="tool-input">
    <h2>Configure Report</h2>

    <div class="form-group">
      <label for="report-class">Classification</label>
      <select id="report-class">
        <option value="abuse">Abuse</option>
        <option value="vulnerability">Vulnerability</option>
        <option value="connection">Connection</option>
        <option value="content">Content</option>
        <option value="copyright">Copyright</option>
        <option value="messaging">Messaging</option>
        <option value="reputation">Reputation</option>
        <option value="infrastructure">Infrastructure</option>
      </select>
    </div>

    <div class="form-group">
      <label for="report-type">Type</label>
      <select id="report-type">
        <option value="ddos">DDoS Attack</option>
        <option value="malware">Malware</option>
        <option value="phishing">Phishing</option>
        <option value="spam">Spam</option>
        <option value="scanner">Scanner</option>
      </select>
    </div>

    <div class="form-group">
      <label for="source-ip">Source IP Address</label>
      <input type="text" id="source-ip" placeholder="192.0.2.100" value="192.0.2.100">
    </div>

    <div class="form-group">
      <label for="reporter-org">Reporter Organization</label>
      <input type="text" id="reporter-org" placeholder="Security Operations" value="Security Operations">
    </div>

    <div class="form-group">
      <label for="reporter-contact">Reporter Contact</label>
      <input type="email" id="reporter-contact" placeholder="abuse@example.com" value="abuse@example.com">
    </div>

    <div class="form-group">
      <label>
        <input type="checkbox" id="include-on-behalf-of">
        Report on behalf of another organization
      </label>
    </div>

    <div id="on-behalf-of-fields" style="display: none; margin-left: 1.5rem; padding-left: 1rem; border-left: 3px solid var(--color-primary-light);">
      <div class="form-group">
        <label for="on-behalf-org">On Behalf Of Organization</label>
        <input type="text" id="on-behalf-org" placeholder="Client Organization">
      </div>

      <div class="form-group">
        <label for="on-behalf-contact">On Behalf Of Contact</label>
        <input type="email" id="on-behalf-contact" placeholder="abuse@client.com">
      </div>
    </div>

    <div class="form-group">
      <label>
        <input type="checkbox" id="include-evidence" checked>
        Include Evidence
      </label>
    </div>

    <div class="form-group">
      <label>
        <input type="checkbox" id="include-optional">
        Include Optional Fields
      </label>
    </div>

    <div class="tool-actions">
      <button id="generate-btn" class="btn btn-primary">Generate Report</button>
      <button id="randomize-btn" class="btn btn-secondary">Randomize</button>
    </div>
  </div>

  <div class="tool-output">
    <h2>Generated Report</h2>
    <div class="output-actions">
      <button id="copy-btn" class="btn btn-small">Copy to Clipboard</button>
      <button id="download-btn" class="btn btn-small">Download JSON</button>
      <button id="validate-btn" class="btn btn-small">Validate</button>
    </div>
    <pre id="generated-output" class="code-output"><code>{
  "xarf_version": "4.0.0",
  "report_id": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2024-01-15T10:00:00Z",
  ...
}</code></pre>
  </div>
</div>

## Features

- **All Event Types** - Generate reports for all XARF classifications and types
- **Realistic Data** - Automatically populated with valid example data
- **Customizable** - Configure key fields or use random values
- **Valid Output** - Generated reports pass schema validation
- **Download & Share** - Export as JSON files for testing
- **Copy to Clipboard** - Quick copy for pasting into other tools

## Use Cases

### Testing

Generate test reports to validate your XARF parser implementation:

```bash
# Generate 100 random reports for testing
for i in {1..100}; do
  curl -X POST https://xarf.github.io/website/api/generate \
    -H "Content-Type: application/json" \
    -d '{"class": "abuse", "randomize": true}' \
    -o "test_report_${i}.json"
done
```

### Documentation

Create example reports for documentation and training materials:

1. Configure report with representative values
2. Include optional fields for complete examples
3. Add realistic evidence data
4. Download and include in your docs

### Development

Use generated reports during development:

```python
from xarf import XARFReport

# Load generated test report
with open('generated_report.json', 'r') as f:
    report = XARFReport.from_json(f.read())

# Use in your application
process_abuse_report(report)
```

## Report Types by Classification

### Abuse
- **DDoS** - Distributed Denial of Service attacks
- **Malware** - Malware distribution and C&C
- **Phishing** - Credential theft attempts
- **Spam** - Unsolicited bulk email
- **Scanner** - Port scanning and probing

### Vulnerability
- **CVE** - Known vulnerability instances
- **Misconfiguration** - Security misconfigurations
- **Open Service** - Unintended public services

### Connection
- **Compromised** - Compromised system indicators
- **Botnet** - Botnet membership
- **Malicious Traffic** - Suspicious network activity

### Content
- **Illegal** - Illegal content hosting
- **Malicious** - Malicious content distribution
- **Policy Violation** - Terms of service violations

### Copyright
- **Infringement** - Copyright violations
- **DMCA** - DMCA takedown notices
- **Trademark** - Trademark infringement

### Messaging
- **SMS Spam** - Unsolicited text messages
- **Robocall** - Automated phone calls

### Reputation
- **Blocklist** - IP/domain blocklist entries
- **Trust Score** - Reputation scoring

### Infrastructure
- **DNS** - DNS-related abuse
- **BGP** - BGP routing issues

## Customization Options

### Random Data Generation

Click "Randomize" to generate realistic random values:

- **IP Addresses** - Valid public IP ranges
- **Timestamps** - Recent dates/times
- **Report IDs** - Valid UUIDs
- **Evidence** - Base64-encoded sample data

### Field Inclusion

Control which fields are included:

- **Mandatory Only** - Just required fields
- **With Recommended** - Add recommended fields
- **With Optional** - Include optional context

### Evidence Types

Generate appropriate evidence for each report type:

- **Packet Captures** - Network traffic samples
- **Log Files** - System/application logs
- **Screenshots** - Visual evidence
- **Malware Samples** - Binary data (base64)

## API Access

Generate reports programmatically:

<details class="code-example" markdown="1">
<summary>Python</summary>

```python
import requests

response = requests.post(
    'https://xarf.github.io/website/api/generate',
    json={
        'class': 'abuse',
        'type': 'ddos',
        'source_identifier': '192.0.2.100',
        'include_evidence': True,
        'include_optional': True
    }
)

report_json = response.json()
```
</details>

<details class="code-example" markdown="1">
<summary>JavaScript</summary>

```javascript
const response = await fetch('https://xarf.github.io/website/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    class: 'abuse',
    type: 'ddos',
    source_identifier: '192.0.2.100',
    include_evidence: true,
    include_optional: true
  })
});

const reportJson = await response.json();
```
</details>

<details class="code-example" markdown="1">
<summary>cURL</summary>

```bash
curl -X POST https://xarf.github.io/website/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "class": "abuse",
    "type": "ddos",
    "source_identifier": "192.0.2.100",
    "include_evidence": true,
    "include_optional": true
  }'
```
</details>

## Related Tools

- **[Schema Validator](/tools/validator/)** - Validate generated reports
- **[Format Converter](/tools/converter/)** - Convert to other formats
- **[Evidence Hash Calculator](/tools/hash-calculator/)** - Generate evidence hashes

## Need Help?

- **[Sample Reports](/docs/types/)** - See examples for each type
- **[Implementation Guide](/docs/implementation-guide/)** - Integration guide
- **[GitHub Issues](https://github.com/xarf/xarf-spec/issues)** - Report bugs

<script src="{{ site.baseurl }}/assets/js/generator.js"></script>
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

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--color-text);
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group select {
  width: 100%;
  padding: 0.5rem;
  background: var(--color-background);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 4px;
}

.form-group input[type="checkbox"] {
  margin-right: 0.5rem;
}

.tool-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.output-actions {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.btn-small {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}

.code-output {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 1rem;
  overflow-x: auto;
  max-height: 500px;
}

.code-output code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  color: var(--color-text);
}
</style>
