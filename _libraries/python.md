---
layout: docs
title: "Python Library - xarf-python"
description: "Official Python library for creating, validating, and processing XARF reports"
permalink: /libraries/python/
---

# XARF Python Library

Official Python library for creating, validating, and processing XARF (eXtended Abuse Reporting Format) reports.

<div class="library-status">
  <span class="badge badge-success">Stable</span>
  <span>Version 1.0.0</span>
  <span>Python 3.8+</span>
</div>

---

## Installation

```bash
pip install xarf
```

**Requirements**:
- Python 3.8 or higher
- Dependencies: `jsonschema`, `python-dateutil`

---

## Quick Start

### Creating a Report

```python
from xarf import XARFReport
from datetime import datetime

# Create a new XARF report
report = XARFReport(
    xarf_version="4.0.0",
    report_id="550e8400-e29b-41d4-a716-446655440000",
    timestamp=datetime.utcnow().isoformat() + "Z",
    reporter={
        "org": "Security Operations",
        "contact": "abuse@example.com",
        "domain": "example.com",
        "type": "automated"
    },
    sender={
        "org": "Security Operations",
        "contact": "abuse@example.com",
        "domain": "example.com"
    },
    source_identifier="192.0.2.100",
    classification="abuse",
    type="ddos"
)

# Validate
if report.validate():
    print("✓ Report is valid!")

# Export to JSON
json_output = report.to_json(indent=2)
print(json_output)
```

### Loading from JSON

```python
from xarf import XARFReport

# Load from JSON string
json_data = '{"xarf_version": "4.0.0", ...}'
report = XARFReport.from_json(json_data)

# Load from file
with open('report.json', 'r') as f:
    report = XARFReport.from_file(f)

# Validate
if report.validate():
    print(f"Loaded report: {report.report_id}")
```

---

## API Reference

### XARFReport Class

Main class for creating and manipulating XARF reports.

#### Constructor

```python
XARFReport(
    xarf_version: str,
    report_id: str,
    timestamp: str,
    reporter: dict,
    sender: dict,
    source_identifier: str,
    classification: str,
    type: str,
    **kwargs
)
```

**Parameters**:
- `xarf_version` (str): XARF specification version (e.g., "4.0.0")
- `report_id` (str): Unique report identifier (UUID recommended)
- `timestamp` (str): ISO 8601 timestamp
- `reporter` (dict): Reporter information
- `source_identifier` (str): Source IP/domain
- `classification` (str): Report classification
- `type` (str): Specific type within classification
- `**kwargs`: Additional optional fields

#### Methods

##### `validate(strict=False) -> bool`

Validate the report against the JSON schema.

```python
if report.validate():
    print("Valid!")
else:
    for error in report.validation_errors:
        print(f"Error: {error}")
```

**Parameters**:
- `strict` (bool): If True, raise `ValidationError` on failure

**Returns**: `bool` - True if valid, False otherwise

##### `to_json(indent=None) -> str`

Export report to JSON string.

```python
json_str = report.to_json(indent=2)
```

**Parameters**:
- `indent` (int, optional): JSON indentation

**Returns**: `str` - JSON representation

##### `to_dict() -> dict`

Convert report to dictionary.

```python
data = report.to_dict()
```

**Returns**: `dict` - Report as dictionary

##### `from_json(json_str: str) -> XARFReport`

Create report from JSON string (class method).

```python
report = XARFReport.from_json('{"xarf_version": "4.0.0", ...}')
```

**Parameters**:
- `json_str` (str): JSON string

**Returns**: `XARFReport` instance

##### `from_file(file) -> XARFReport`

Create report from file object (class method).

```python
with open('report.json', 'r') as f:
    report = XARFReport.from_file(f)
```

**Parameters**:
- `file`: File object

**Returns**: `XARFReport` instance

##### `add_evidence(content_type, description, payload, **kwargs)`

Add evidence to the report.

```python
report.add_evidence(
    content_type="text/plain",
    description="Server logs",
    payload="base64_encoded_data",
    hash={
        "algorithm": "sha256",
        "value": "abc123..."
    }
)
```

**Parameters**:
- `content_type` (str): MIME type
- `description` (str): Evidence description
- `payload` (str): Base64-encoded data
- `**kwargs`: Additional fields (e.g., `hash`)

---

## Advanced Usage

### Type Hints and Dataclasses

The library provides full type hint support:

```python
from xarf import XARFReport, Reporter, Evidence
from typing import List

def process_reports(reports: List[XARFReport]) -> None:
    for report in reports:
        reporter: Reporter = report.reporter
        print(f"From: {reporter.org}")

        evidence: List[Evidence] = report.evidence
        print(f"Evidence count: {len(evidence)}")
```

### Async Support

Process reports asynchronously:

```python
import asyncio
from xarf import XARFReport
from xarf.async_client import AsyncXARFClient

async def send_report(report: XARFReport):
    async with AsyncXARFClient() as client:
        response = await client.submit(report)
        print(f"Submitted: {response.report_id}")

# Submit multiple reports
async def send_batch(reports: List[XARFReport]):
    tasks = [send_report(r) for r in reports]
    await asyncio.gather(*tasks)

asyncio.run(send_batch(reports))
```

### Evidence Handling

Hash and verify evidence:

```python
from xarf.evidence import EvidenceHandler
import hashlib

# Create evidence handler
handler = EvidenceHandler()

# Add evidence with automatic hashing
evidence = handler.add(
    content_type="application/pdf",
    description="Phishing email screenshot",
    file_path="/path/to/evidence.pdf"
)

print(f"SHA-256: {evidence.hash.value}")

# Verify evidence integrity
if handler.verify(evidence):
    print("✓ Evidence integrity verified")
```


### Batch Processing

Process multiple reports efficiently:

```python
from xarf import XARFBatch

# Create batch processor
batch = XARFBatch()

# Add reports
for json_file in glob.glob('reports/*.json'):
    with open(json_file, 'r') as f:
        batch.add_report(f.read())

# Validate all
results = batch.validate_all()

print(f"Valid: {len(results.valid)}")
print(f"Invalid: {len(results.invalid)}")

# Process valid reports
for report in results.valid:
    process_report(report)

# Log invalid reports
for error in results.invalid:
    log_error(error.report_id, error.errors)
```

---

## Integration Examples

### Flask REST API

```python
from flask import Flask, request, jsonify
from xarf import XARFReport, ValidationError

app = Flask(__name__)

@app.route('/xarf/submit', methods=['POST'])
def submit_report():
    try:
        # Parse request
        report = XARFReport.from_json(request.get_json())

        # Validate
        report.validate(strict=True)

        # Process
        process_abuse_report(report)

        return jsonify({
            'status': 'accepted',
            'report_id': report.report_id
        }), 202

    except ValidationError as e:
        return jsonify({
            'status': 'invalid',
            'errors': e.errors
        }), 400
```

### Django Model

```python
from django.db import models
from xarf import XARFReport
import json

class AbuseReport(models.Model):
    report_id = models.UUIDField(primary_key=True)
    timestamp = models.DateTimeField()
    classification = models.CharField(max_length=50)
    type = models.CharField(max_length=50)
    source_ip = models.GenericIPAddressField()
    xarf_data = models.JSONField()

    created_at = models.DateTimeField(auto_now_add=True)
    processed = models.BooleanField(default=False)

    @classmethod
    def from_xarf(cls, report: XARFReport):
        """Create model instance from XARF report"""
        return cls(
            report_id=report.report_id,
            timestamp=report.timestamp,
            classification=report.classification,
            type=report.type,
            source_ip=report.source_identifier,
            xarf_data=report.to_dict()
        )

    def to_xarf(self) -> XARFReport:
        """Convert to XARF report"""
        return XARFReport.from_dict(self.xarf_data)
```

### Celery Task

```python
from celery import Celery
from xarf import XARFReport

app = Celery('tasks')

@app.task
def process_xarf_report(json_data: str):
    """Process XARF report asynchronously"""
    report = XARFReport.from_json(json_data)

    if not report.validate():
        return {'status': 'invalid', 'errors': report.validation_errors}

    # Process based on classification
    if report.classification == 'abuse':
        handle_abuse(report)
    elif report.classification == 'vulnerability':
        handle_vulnerability(report)

    return {'status': 'processed', 'report_id': report.report_id}

# Submit report for processing
process_xarf_report.delay(json_data)
```

### Logging Integration

```python
import logging
from xarf import XARFReport

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Log report processing
report = XARFReport.from_json(data)

logger.info(
    "Processing XARF report",
    extra={
        'report_id': report.report_id,
        'classification': report.classification,
        'type': report.type,
        'source': report.source_identifier,
        'reporter': report.reporter.org
    }
)
```

---

## Configuration

### Custom Schema Path

```python
from xarf import XARFReport

# Use custom schema directory
XARFReport.set_schema_path('/path/to/schemas')

# Validate against custom schema
report.validate()
```

### Validation Options

```python
from xarf import ValidationOptions

# Configure validation
options = ValidationOptions(
    strict=True,              # Raise on errors
    check_recommended=True,   # Validate recommended fields
    allow_additional=False    # Disallow extra fields
)

report.validate(options=options)
```

---

## Testing

### Unit Tests

```python
import unittest
from xarf import XARFReport

class TestXARFReports(unittest.TestCase):

    def setUp(self):
        self.report_data = {
            "xarf_version": "4.0.0",
            "report_id": "test-001",
            "timestamp": "2024-01-15T10:00:00Z",
            "reporter": {
                "org": "Test Security",
                "contact": "test@example.com",
                "domain": "example.com",
                "type": "automated"
            },
            "source_identifier": "192.0.2.100",
            "classification": "abuse",
            "type": "ddos"
        }

    def test_create_valid_report(self):
        """Test creating a valid report"""
        report = XARFReport(**self.report_data)
        self.assertTrue(report.validate())

    def test_missing_mandatory_field(self):
        """Test validation fails without mandatory field"""
        data = self.report_data.copy()
        del data['report_id']

        with self.assertRaises(ValidationError):
            report = XARFReport(**data)
            report.validate(strict=True)

    def test_json_roundtrip(self):
        """Test JSON serialization/deserialization"""
        report1 = XARFReport(**self.report_data)
        json_str = report1.to_json()
        report2 = XARFReport.from_json(json_str)

        self.assertEqual(report1.report_id, report2.report_id)
        self.assertEqual(report1.to_dict(), report2.to_dict())
```

### Fixtures

```python
import pytest
from xarf import XARFReport

@pytest.fixture
def sample_report():
    """Create sample XARF report for testing"""
    return XARFReport(
        xarf_version="4.0.0",
        report_id="550e8400-e29b-41d4-a716-446655440000",
        timestamp="2024-01-15T10:00:00Z",
        reporter={
            "org": "Test Security",
            "contact": "test@example.com",
            "domain": "example.com",
            "type": "automated"
        },
        source_identifier="192.0.2.100",
        classification="abuse",
        "type": "ddos"
    )

def test_report_validation(sample_report):
    """Test report validates correctly"""
    assert sample_report.validate()
```

---

## Error Handling

### Common Errors

```python
from xarf import (
    XARFReport,
    ValidationError,
    SchemaError,
    ParseError
)

try:
    report = XARFReport.from_json(json_data)
    report.validate(strict=True)

except ParseError as e:
    print(f"Invalid JSON: {e}")

except SchemaError as e:
    print(f"Schema error: {e}")

except ValidationError as e:
    print("Validation failed:")
    for error in e.errors:
        print(f"  {error.path}: {error.message}")
```

### Custom Error Handling

```python
class ReportProcessor:
    def process(self, json_data: str) -> dict:
        """Process report with comprehensive error handling"""
        try:
            report = XARFReport.from_json(json_data)

            if not report.validate():
                return {
                    'status': 'invalid',
                    'errors': report.validation_errors
                }

            # Process report
            self.handle_report(report)

            return {
                'status': 'success',
                'report_id': report.report_id
            }

        except ParseError:
            return {'status': 'error', 'message': 'Invalid JSON'}

        except Exception as e:
            return {'status': 'error', 'message': str(e)}
```

---

## Best Practices

### 1. Always Validate

```python
# ✓ GOOD
report = XARFReport.from_json(data)
if report.validate():
    process(report)

# ✗ BAD
report = XARFReport.from_json(data)
process(report)  # No validation!
```

### 2. Use Type Hints

```python
# ✓ GOOD
def process_report(report: XARFReport) -> None:
    ...

# ✗ BAD
def process_report(report):
    ...
```

### 3. Handle Errors Gracefully

```python
# ✓ GOOD
try:
    report = XARFReport.from_json(data)
    report.validate(strict=True)
except ValidationError as e:
    log_error(e)
    return error_response(e.errors)

# ✗ BAD
report = XARFReport.from_json(data)
report.validate()  # Exceptions not handled
```

### 4. Use Context Managers

```python
# ✓ GOOD
with open('report.json', 'r') as f:
    report = XARFReport.from_file(f)

# ✗ BAD
f = open('report.json', 'r')
report = XARFReport.from_file(f)
f.close()
```

---

## Changelog

### Version 1.0.0 (2024-01-15)
- Initial stable release
- Full XARF 4.0 support
- Schema validation
- Evidence hashing
- Type hints
- Async support

---

## Resources

- **[GitHub Repository](https://github.com/xarf/xarf-python)** - Source code
- **[PyPI Package](https://pypi.org/project/xarf/)** - Package repository
- **[API Documentation](https://xarf-python.readthedocs.io/)** - Full API docs
- **[Examples](https://github.com/xarf/xarf-python/tree/main/examples)** - Code examples
- **[Issue Tracker](https://github.com/xarf/xarf-python/issues)** - Report bugs

---

## Support

- **[GitHub Discussions](https://github.com/xarf/xarf-spec/discussions)** - Ask questions
- **[GitHub Issues](https://github.com/xarf/xarf-python/issues)** - Report bugs
- **[Stack Overflow](https://stackoverflow.com/questions/tagged/xarf)** - Tag: `xarf`

<style>
.library-status {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--color-background-alt);
  border-radius: 8px;
  margin-bottom: 2rem;
}

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.badge-success {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}
</style>
