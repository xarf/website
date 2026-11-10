---
layout: docs
title: "Implementation Guide"
description: "Comprehensive guide to implementing XARF in your systems for abuse reporting and handling"
permalink: /docs/implementation-guide/
---

# Implementation Guide

This guide walks you through implementing XARF (eXtended Abuse Reporting Format) in your applications, from basic report generation to advanced integration patterns.

---

## Quick Start

### 1. Choose Your Language

XARF provides stable libraries for multiple programming languages, all implementing XARF spec v4.2.0:

- **[Python](/libraries/python/)** (Stable) - Full-featured library with validation and schema support
- **[JavaScript/TypeScript](/libraries/javascript/)** (Stable) - Browser and Node.js compatible
- **[Go](/libraries/go/)** (Stable) - High-performance implementation
- **[C#/.NET](/libraries/csharp/)** (Stable) - Schema-driven parsing, validation, and generation

### 2. Install the Library

<details class="code-example" markdown="1">
<summary>Python</summary>

```bash
pip install xarf
```
</details>

<details class="code-example" markdown="1">
<summary>JavaScript/Node.js</summary>

```bash
npm install @xarf/xarf
```
</details>

<details class="code-example" markdown="1">
<summary>Go</summary>

```bash
go get github.com/xarf/xarf-go
```
</details>

<details class="code-example" markdown="1">
<summary>C#/.NET</summary>

```bash
dotnet add package Xarf
```
</details>

### 3. Create Your First Report

<details class="code-example" markdown="1">
<summary>Python Example</summary>

```python
from xarf import create_report
import json

# create_report auto-generates xarf_version, report_id, and timestamp
result = create_report(
    category="connection",
    type="ddos",
    source_identifier="192.0.2.100",
    reporter={
        "org": "Security Operations",
        "contact": "abuse@example.com",
        "domain": "example.com"
    },
    sender={
        "org": "Security Operations",
        "contact": "abuse@example.com",
        "domain": "example.com"
    },
    evidence_source="honeypot",
)

# Inspect validation results
if not result.errors:
    print("✓ Report is valid!")

    # Export to JSON
    print(json.dumps(result.report.model_dump(by_alias=True, exclude_none=True), indent=2))
else:
    print("✗ Validation errors:")
    for error in result.errors:
        print(f"  - {error.field}: {error.message}")
```
</details>

<details class="code-example" markdown="1">
<summary>JavaScript Example</summary>

```javascript
import { createReport } from '@xarf/xarf';

// createReport auto-generates xarf_version, report_id, and timestamp
const { report, errors } = createReport({
  category: 'connection',
  type: 'ddos',
  source_identifier: '192.0.2.100',
  reporter: {
    org: 'Security Operations',
    contact: 'abuse@example.com',
    domain: 'example.com'
  },
  sender: {
    org: 'Security Operations',
    contact: 'abuse@example.com',
    domain: 'example.com'
  },
  evidence_source: 'honeypot',
});

// Inspect validation results
if (errors.length === 0) {
  console.log('✓ Report is valid!');
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log('✗ Validation errors:');
  errors.forEach(error => console.log(`  - ${error.field}: ${error.message}`));
}
```
</details>

---

## Validation

### Schema Validation

All XARF reports must conform to the JSON Schema for their specific type. The library handles validation automatically when you `parse()` a report — validation results are returned on the result object rather than raised as exceptions:

```python
from xarf import parse

# parse() validates against the official v4.2.0 schemas and returns
# structured errors/warnings instead of raising on validation failure.
result = parse(json_string)

if result.errors:
    print("Validation failed:")
    for error in result.errors:
        print(f"  {error.field}: {error.message}")
else:
    print("✓ Report is valid!")
    report = result.report

# Pass strict=True to also treat warnings and x-recommended fields as errors.
strict_result = parse(json_string, strict=True)
```

### Field Requirements

Each XARF type has different field requirements. Use the emoji indicators to identify:

- 🟠 **Mandatory** - MUST be present in all valid reports
- 🟢 **Recommended** - SHOULD be included when information is available
- 🔵 **Optional** - MAY be included for additional context

See [Sample Reports](/docs/types/) for complete field reference for each type.

### Online Validator

Use our [Schema Validator](/tools/validator/) to validate reports in your browser without installing anything.

---

## Integration Patterns

### 1. Automated Abuse Detection

**Use Case**: Your system detects malicious activity and automatically generates XARF reports.

```python
from xarf import create_report

class AbuseDetector:
    def __init__(self, reporter, sender):
        self.reporter = reporter
        self.sender = sender

    def on_ddos_detected(self, attack_data):
        """Called when DDoS attack is detected"""
        result = create_report(
            category="connection",
            type="ddos",
            source_identifier=attack_data['source_ip'],
            reporter=self.reporter,
            sender=self.sender,
            evidence_source="honeypot",
            # category-specific fields are passed as keyword arguments
            source_port=attack_data['source_port'],
            protocol=attack_data['protocol'],
            evidence=self._collect_evidence(attack_data),
        )

        if result.errors:
            log_invalid_report(result.errors)
            return

        # Send to abuse contact
        self.send_report(result.report, attack_data['source_asn'])
```

### 2. Receiving and Processing Reports

**Use Case**: Your abuse handling system receives XARF reports from external sources.

```python
from xarf import parse

def process_abuse_report(json_data):
    """Process incoming XARF report"""
    # Parse and validate (does not raise on validation failure)
    result = parse(json_data)

    if result.errors:
        log_invalid_report(json_data, result.errors)
        return

    report = result.report

    # Route based on category and type
    if report.category == "connection" and report.type == "ddos":
        handle_ddos_report(report)
    elif report.category == "vulnerability":
        handle_vulnerability_report(report)

    # Log receipt
    log_report_received(report.report_id, report.reporter.org)
```

### 3. Batch Processing

**Use Case**: Process multiple reports efficiently by parsing each one and routing on the result.

```python
from xarf import parse

def process_daily_reports(report_files):
    """Process all reports from the past 24 hours"""
    for file_path in report_files:
        with open(file_path, 'r') as f:
            result = parse(f.read())

        if result.errors:
            # Log invalid reports
            log_validation_failure(file_path, result.errors)
            continue

        # Process valid reports
        take_action(result.report)
```

### 4. Legacy v3 Conversion

**Use Case**: Accept legacy XARF v3 reports and convert them to v4 transparently.

`parse()` automatically detects XARF v3 reports (by the `Version` field) and converts
them to v4, attaching `legacy_version: '3'` and a deprecation warning:

```python
from xarf import parse

result = parse(v3_report)

print(result.report.xarf_version)    # '4.2.0'
print(result.report.category)        # mapped category (e.g., 'messaging')
print(result.report.legacy_version)  # '3'
# result.warnings includes the deprecation notice + conversion details
```

You can also use the low-level conversion utilities directly:

```python
from xarf import is_v3_report, convert_v3_to_v4, get_v3_deprecation_warning

if is_v3_report(json_data):
    v4_data = convert_v3_to_v4(json_data)
    print(get_v3_deprecation_warning())
```

---

## Error Handling

### Common Errors

#### Missing Mandatory Fields

```json
{
  "error": "ValidationError",
  "message": "Missing required field: 'reporter'",
  "path": "$",
  "expected": "object with 'org', 'contact', 'domain'"
}
```

**Solution**: Ensure all mandatory fields (🟠) are present.

#### Invalid Field Format

```json
{
  "error": "ValidationError",
  "message": "Invalid timestamp format",
  "path": "$.timestamp",
  "expected": "ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)"
}
```

**Solution**: Use proper ISO 8601 format for timestamps.

#### Unknown Classification or Type

```json
{
  "error": "ValidationError",
  "message": "Unknown type 'unknown_type' for category 'connection'",
  "path": "$.type",
  "expected": "One of: ddos, port-scan, login-attack, brute-force, etc."
}
```

**Solution**: Use only valid types for each category. See [Content Types](/docs/types/).

### Best Practices

1. **Always validate before sending** - Check the `errors` returned by `parse()` / `create_report()` to catch problems early
2. **Log validation failures** - Keep track of invalid reports for debugging
3. **Graceful degradation** - Handle missing recommended (🟢) fields gracefully
4. **Version compatibility** - Check `xarf_version` field when parsing reports

---

## Security & Privacy

### Handling Sensitive Data

XARF reports may contain sensitive information. Follow these guidelines:

#### 1. Evidence Protection

`create_evidence()` handles base64 encoding, hashing, and size calculation for you. Encrypt
sensitive payloads with your own crypto before attaching them, and pass the ciphertext in:

```python
from xarf import create_report, create_evidence

# Encrypt the raw capture with your own key management before attaching it.
encrypted_capture = encrypt(raw_evidence, key=get_encryption_key())  # e.g. AES-256-GCM

evidence = create_evidence(
    "application/octet-stream",
    encrypted_capture,
    description="Encrypted packet capture",
)

result = create_report(
    category="connection",
    type="ddos",
    source_identifier="192.0.2.100",
    reporter=reporter,
    sender=sender,
    evidence_source="honeypot",
    evidence=[evidence],
)
```

#### 2. PII Redaction

Redact personally identifiable information from evidence payloads before attaching them
to a report. Run your redaction step first, then pass the cleaned text to `create_evidence()`:

```python
from xarf import create_evidence

# Redact PII (email addresses, phone numbers, credit card numbers, personal
# identifiers) from evidence text using your own redaction step before attaching it.
clean_evidence_text = redact_pii(evidence_text)

evidence = create_evidence(
    "text/plain",
    clean_evidence_text,
    description="Redacted log excerpt",
)
```

#### 3. Access Control

XARF does not define an access-control field. Enforce who can read reports at your
storage and transport layers (e.g., authenticated endpoints, object-store ACLs, or
encryption keyed to authorized recipients) rather than embedding access policy in the
report itself.

### Transport Security

Always use TLS/HTTPS when transmitting XARF reports:

```python
import requests

response = requests.post(
    'https://abuse.example.com/xarf',
    json=result.report.model_dump(by_alias=True, exclude_none=True),
    headers={'Content-Type': 'application/json'},
    verify=True  # Always verify SSL certificates
)
```

---

## Testing

### Unit Tests

```python
import unittest
from xarf import create_report, parse

class TestXARFReports(unittest.TestCase):

    def test_valid_ddos_report(self):
        """Test creating a valid DDoS report"""
        result = create_report(
            category="connection",
            type="ddos",
            source_identifier="192.0.2.100",
            reporter={
                "org": "Test Security",
                "contact": "test@example.com",
                "domain": "example.com"
            },
            sender={
                "org": "Test Security",
                "contact": "test@example.com",
                "domain": "example.com"
            },
            evidence_source="honeypot",
        )

        self.assertEqual(result.errors, [])
        self.assertEqual(result.report.category, "connection")

    def test_missing_mandatory_field(self):
        """Test that an invalid report surfaces validation errors"""
        # A report missing required fields (e.g. reporter/source_identifier)
        # is returned with a populated errors list rather than raising.
        result = parse({
            "xarf_version": "4.2.0",
            "timestamp": "2024-01-15T10:00:00Z",
            "category": "connection",
            "type": "ddos",
        })

        self.assertTrue(result.errors)
```

### Integration Tests

```python
def test_end_to_end_workflow():
    """Test complete report generation and submission"""
    # 1. Detect abuse
    attack_data = detect_attack()

    # 2. Generate report (returns a result with report + errors)
    result = generate_xarf_report(attack_data)

    # 3. Validate
    assert result.errors == []

    # 4. Submit
    response = submit_report(result.report)
    assert response.status_code == 200

    # 5. Verify acknowledgment
    ack = parse_acknowledgment(response.json())
    assert ack.report_id == result.report.report_id
```

### Test Data

Create test reports using the sample files in the specification or use the libraries to generate valid XARF reports programmatically.

---

## Production Checklist

Before deploying XARF in production:

### Infrastructure

- [ ] **TLS/HTTPS configured** for all report transmission
- [ ] **Authentication** implemented for report endpoints
- [ ] **Rate limiting** configured to prevent abuse
- [ ] **Monitoring** set up for report volume and errors
- [ ] **Logging** configured for audit trail
- [ ] **Backup** system for reports and evidence

### Security

- [ ] **Encryption** enabled for sensitive evidence
- [ ] **PII redaction** implemented where required
- [ ] **Access control** policies defined
- [ ] **Data retention** policy configured
- [ ] **Security review** completed
- [ ] **Penetration testing** performed

### Compliance

- [ ] **GDPR compliance** verified (if applicable)
- [ ] **Data protection** regulations reviewed
- [ ] **Legal review** completed
- [ ] **Privacy policy** updated
- [ ] **Terms of service** include XARF handling

### Operational

- [ ] **Documentation** completed for operations team
- [ ] **Runbooks** created for common scenarios
- [ ] **On-call procedures** defined
- [ ] **Escalation paths** documented
- [ ] **Performance testing** completed
- [ ] **Disaster recovery** plan in place

### Validation

- [ ] **Schema validation** enabled in production
- [ ] **Error handling** tested thoroughly
- [ ] **Logging** captures all validation failures
- [ ] **Monitoring** alerts on validation errors
- [ ] **Fallback procedures** defined

---

## Next Steps

- **[Sample Reports](/docs/types/)** - Explore all event types with examples
- **[Schema Reference](/docs/schemas/)** - Detailed schema documentation
- **[Best Practices](/docs/best-practices/)** - Advanced tips and patterns
- **[Python Library](/libraries/python/)** - Full API documentation
- **[Tools](/tools/)** - Validators, generators, and converters

---

## Need Help?

- **[GitHub Discussions](https://github.com/xarf/xarf-spec/discussions)** - Ask questions and share experiences
- **[GitHub Issues](https://github.com/xarf/xarf-spec/issues)** - Report bugs or request features
- **[Contributing](/community/contributing/)** - Help improve XARF

---

**Ready to implement?** Start with our [Python Library](/libraries/python/) or explore [Sample Reports](/docs/types/) for your specific use case.
