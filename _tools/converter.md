---
layout: tool
title: "Format Converter"
description: "Convert between XARF and other abuse reporting formats (ARF, IODEF, CSV)"
permalink: /tools/converter/
---

# XARF Format Converter

<div class="alert alert-info">
  <strong>Coming Soon:</strong> This tool is currently under development. Check back soon for the full implementation.
</div>

Convert between XARF and other popular abuse reporting formats including ARF, IODEF, and CSV.

<div class="tool-container">
  <div class="tool-config">
    <h2>Conversion Settings</h2>

    <div class="conversion-direction">
      <div class="format-selector">
        <label for="source-format">From</label>
        <select id="source-format">
          <option value="xarf">XARF (JSON)</option>
          <option value="arf">ARF (RFC 5965)</option>
          <option value="iodef">IODEF (RFC 7970)</option>
          <option value="csv">CSV</option>
        </select>
      </div>

      <div class="arrow">→</div>

      <div class="format-selector">
        <label for="target-format">To</label>
        <select id="target-format">
          <option value="xarf">XARF (JSON)</option>
          <option value="arf">ARF (RFC 5965)</option>
          <option value="iodef">IODEF (RFC 7970)</option>
          <option value="csv">CSV</option>
        </select>
      </div>
    </div>

    <div class="conversion-options">
      <h3>Options</h3>
      <label>
        <input type="checkbox" id="preserve-original" checked>
        Preserve Original Data
      </label>
      <label>
        <input type="checkbox" id="include-metadata">
        Include Conversion Metadata
      </label>
      <label>
        <input type="checkbox" id="validate-output" checked>
        Validate Output
      </label>
    </div>
  </div>

  <div class="tool-input">
    <h2>Input</h2>
    <textarea id="input-data" placeholder="Paste your data here..."></textarea>
    <div class="tool-actions">
      <button id="convert-btn" class="btn btn-primary">Convert</button>
      <button id="load-example-btn" class="btn btn-secondary">Load Example</button>
      <button id="clear-btn" class="btn btn-secondary">Clear</button>
    </div>
  </div>

  <div class="tool-output">
    <h2>Output</h2>
    <div class="output-actions">
      <button id="copy-btn" class="btn btn-small">Copy</button>
      <button id="download-btn" class="btn btn-small">Download</button>
    </div>
    <pre id="output-data" class="code-output">Converted data will appear here...</pre>
  </div>
</div>

## Supported Formats

### XARF (eXtended Abuse Reporting Format)
- **Type**: JSON
- **Version**: 4.0.0
- **Specification**: Modern, extensible abuse reporting
- **Best For**: New implementations, API integration, automation

### ARF (Abuse Reporting Format)
- **Type**: MIME multipart/report
- **RFC**: 5965
- **Format**: Email-based reporting
- **Best For**: Email feedback loops, legacy systems

### IODEF (Incident Object Description Exchange Format)
- **Type**: XML
- **RFC**: 7970
- **Format**: Incident exchange
- **Best For**: CSIRT collaboration, enterprise systems

### CSV (Comma-Separated Values)
- **Type**: Plain text
- **Format**: Tabular data
- **Best For**: Bulk processing, spreadsheet import, analytics

## Conversion Features

### XARF → ARF

Converts XARF JSON to RFC 5965 ARF format:

```
From: abuse@reporter.example
To: abuse@target.example
Subject: Abuse Report
Content-Type: multipart/report; report-type=feedback-report;
  boundary="----=_Part_123"

------=_Part_123
Content-Type: text/plain

This is an abuse report for DDoS activity from 192.0.2.100

------=_Part_123
Content-Type: message/feedback-report

Feedback-Type: abuse
User-Agent: XARF-Converter/1.0
Version: 1.0
Source-IP: 192.0.2.100
...
```

**Features**:
- Preserves all XARF fields in ARF format
- Generates proper MIME structure
- Compatible with email systems

### XARF → IODEF

Converts XARF JSON to RFC 7970 IODEF XML:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<IODEF-Document version="2.0">
  <Incident purpose="reporting">
    <IncidentID name="reporter.example">550e8400-e29b-41d4-a716-446655440000</IncidentID>
    <StartTime>2024-01-15T10:00:00Z</StartTime>
    <Assessment>
      <Impact type="ddos" severity="high"/>
    </Assessment>
    <Contact type="reporter">
      <ContactName>Security Operations</ContactName>
      <Email>abuse@reporter.example</Email>
    </Contact>
  </Incident>
</IODEF-Document>
```

**Features**:
- Full IODEF v2.0 compliance
- Preserves classification and severity
- Maintains evidence references

### XARF → CSV

Converts XARF JSON to CSV for bulk analysis:

```csv
report_id,timestamp,classification,type,source_ip,source_port,severity,reporter_org
550e8400-e29b-41d4-a716-446655440000,2024-01-15T10:00:00Z,abuse,ddos,192.0.2.100,52311,high,Security Operations
```

**Features**:
- Flattens nested structures
- Configurable column selection
- UTF-8 encoding support
- Excel-compatible

### ARF → XARF

Converts RFC 5965 ARF to modern XARF format:

**Features**:
- Parses MIME multipart structure
- Maps ARF fields to XARF schema
- Preserves original email headers
- Validates output against XARF schema

### IODEF → XARF

Converts IODEF XML to XARF JSON:

**Features**:
- Parses IODEF v1.0 and v2.0
- Maps incidents to XARF classifications
- Preserves contact information
- Handles nested incident structures

### CSV → XARF

Converts CSV data to XARF reports:

**Features**:
- Column mapping configuration
- Batch conversion support
- Auto-detection of field types
- Generates valid XARF structure

## Use Cases

### Migrating to XARF

If you're currently using ARF or IODEF, convert existing reports:

1. **Export** existing reports from your system
2. **Convert** using this tool or API
3. **Validate** converted XARF reports
4. **Import** into your new XARF-based system

### Multi-Format Support

Support multiple formats in your application:

```python
from xarf.converters import ARFConverter, IODEFConverter

def process_report(data, format):
    if format == 'arf':
        xarf_report = ARFConverter.to_xarf(data)
    elif format == 'iodef':
        xarf_report = IODEFConverter.to_xarf(data)
    elif format == 'xarf':
        xarf_report = XARFReport.from_json(data)

    # Process in unified XARF format
    handle_abuse_report(xarf_report)
```

### Legacy System Integration

Bridge old and new systems:

```python
# Receive ARF via email
arf_message = receive_email()

# Convert to XARF
xarf_report = ARFConverter.to_xarf(arf_message)

# Process with modern tools
analyze_abuse(xarf_report)

# Send to IODEF-based CSIRT
iodef_xml = IODEFConverter.from_xarf(xarf_report)
send_to_csirt(iodef_xml)
```

### Bulk Analysis

Convert reports to CSV for analysis:

```python
from xarf.converters import CSVConverter

# Convert all XARF reports to CSV
reports = load_xarf_reports()
csv_data = CSVConverter.from_xarf_batch(
    reports,
    columns=['timestamp', 'classification', 'type', 'source_ip', 'severity']
)

# Import to pandas for analysis
import pandas as pd
df = pd.read_csv(csv_data)
print(df.groupby('classification').size())
```

## API Usage

Convert formats programmatically:

<details class="code-example" markdown="1">
<summary>Python</summary>

```python
from xarf.converters import ARFConverter, IODEFConverter, CSVConverter

# ARF to XARF
arf_message = load_arf_report()
xarf_report = ARFConverter.to_xarf(arf_message)

# XARF to IODEF
iodef_xml = IODEFConverter.from_xarf(xarf_report)

# XARF to CSV
csv_data = CSVConverter.from_xarf(xarf_report)
```
</details>

<details class="code-example" markdown="1">
<summary>JavaScript</summary>

```javascript
const { ARFConverter, IODEFConverter } = require('xarf');

// ARF to XARF
const arfMessage = loadARFReport();
const xarfReport = ARFConverter.toXARF(arfMessage);

// XARF to IODEF
const iodefXML = IODEFConverter.fromXARF(xarfReport);
```
</details>

## Conversion Mapping

### Field Mappings

| XARF Field | ARF Field | IODEF Element |
|------------|-----------|---------------|
| `report_id` | `Incident-ID` | `IncidentID` |
| `timestamp` | `Arrival-Date` | `StartTime` |
| `source_identifier` | `Source-IP` | `Address` |
| `classification` | `Feedback-Type` | `Impact/@type` |
| `reporter.org` | `Source` | `Contact/ContactName` |
| `reporter.contact` | `Source-Email` | `Contact/Email` |
| `evidence` | `Original-Mail-From` | `RecordData` |

### Data Loss Warnings

Some conversions may lose data:

- **XARF → CSV**: Nested structures flattened
- **XARF → ARF**: Some XARF-specific fields may not map
- **ARF → XARF**: Limited evidence preservation
- **CSV → XARF**: Requires proper column mapping

## Related Tools

- **[Schema Validator](/tools/validator/)** - Validate converted reports
- **[Sample Generator](/tools/generator/)** - Generate test data
- **[Evidence Hash Calculator](/tools/hash-calculator/)** - Verify evidence integrity

## Need Help?

- **[Implementation Guide](/docs/implementation-guide/)** - Integration guide
- **[Migration Guide](/docs/migration/)** - Migrating from other formats
- **[GitHub Issues](https://github.com/xarf/xarf-spec/issues)** - Report bugs

<script src="{{ site.baseurl }}/assets/js/converter.js"></script>
<style>
.tool-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.tool-config, .tool-input, .tool-output {
  background: var(--color-background-alt);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1.5rem;
}

.tool-config h2, .tool-input h2, .tool-output h2 {
  margin-top: 0;
  font-size: 1.25rem;
  color: var(--color-text);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.conversion-direction {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.format-selector {
  flex: 1;
}

.format-selector label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--color-text);
}

.format-selector select {
  width: 100%;
  padding: 0.5rem;
  background: var(--color-background);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 4px;
}

.arrow {
  font-size: 2rem;
  color: var(--color-primary);
}

.conversion-options {
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.conversion-options h3 {
  margin-top: 0;
  margin-bottom: 0.75rem;
  font-size: 1rem;
  color: var(--color-text);
}

.conversion-options label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-text-light);
  cursor: pointer;
}

.conversion-options input[type="checkbox"] {
  margin-right: 0.5rem;
}

#input-data {
  width: 100%;
  min-height: 300px;
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
  min-height: 300px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  color: var(--color-text-light);
  white-space: pre-wrap;
}
</style>
