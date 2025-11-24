---
layout: docs
title: "Switching to XARF v4"
description: "Guide for migrating from any proprietary format to XARF v4"
permalink: /docs/migration/
---

# Switching to XARF v4

This guide helps you migrate from any proprietary or legacy abuse reporting format to XARF v4. Whether you're moving from email-based reporting, CSV files, custom JSON formats, or older XARF versions, this guide provides a practical roadmap for successful migration.

## ⚠️ Breaking Changes in v4.0.0

### Reporter/Sender Split

**IMPORTANT:** XARF v4.0.0 introduces a breaking change to the reporter structure.

**What Changed:** The optional `reporter.on_behalf_of` pattern has been replaced with explicit `reporter` and `sender` fields.

**Why:** Clearer semantics and no conditional logic required:
- `reporter` = the organization that identified/complained about the abuse (complainant)
- `sender` = the organization transmitting this report (infrastructure provider)

**Before (v3 or early v4 drafts with on_behalf_of):**
```json
{
  "reporter": {
    "org": "Abusix",
    "contact": "reports@abusix.com",
    "domain": "abusix.com",
    "on_behalf_of": {
      "org": "Swisscom",
      "contact": "abuse@swisscom.ch",
      "domain": "swisscom.ch"
    }
  }
}
```

**After (v4.0.0+):**
```json
{
  "reporter": {
    "org": "Swisscom Abuse Desk",
    "contact": "abuse@swisscom.ch",
    "domain": "swisscom.ch"
  },
  "sender": {
    "org": "Abusix",
    "contact": "reports@abusix.com",
    "domain": "abusix.com"
  }
}
```

**When reporter and sender are the same (most common):**
```json
{
  "reporter": {
    "org": "Example Security",
    "contact": "abuse@example.com",
    "domain": "example.com"
  },
  "sender": {
    "org": "Example Security",
    "contact": "abuse@example.com",
    "domain": "example.com"
  }
}
```

**Migration Impact:**
- ✅ All reports MUST include both `reporter` and `sender` objects
- ✅ Each object requires three fields: `org`, `contact`, and `domain` (all required)
- ✅ For same-organization reports, duplicate all three values in both objects
- ✅ For infrastructure providers, split the information clearly between reporter and sender
- ✅ Remove any `on_behalf_of` fields from your reports
- ✅ Update parsers and validators to require both fields with correct structure

---

## Why Migrate to XARF v4?

### The Cost of Proprietary Formats

If you're currently using a proprietary abuse reporting format, you're likely experiencing:

- **Manual Processing Overhead**: Human operators parsing unstructured emails or custom formats
- **Integration Friction**: Every partner requires custom integration work
- **Data Quality Issues**: Missing fields, inconsistent formatting, incomplete evidence
- **Scalability Limitations**: Can't process increasing report volumes efficiently
- **Lost Context**: Critical information missing because there's no standard structure

### The XARF v4 Advantage

Migrating to XARF v4 delivers immediate benefits:

**Automation**: Machine-readable JSON enables end-to-end automation from intake to resolution

**Standardization**: Single format works with all XARF-enabled partners and tools

**Validation**: Built-in JSON schema validation catches errors before processing

**Evidence Integrity**: Cryptographic hashes ensure evidence authenticity

**Comprehensive Coverage**: 58 content types cover virtually all abuse scenarios

**Future-Proof**: Extensible design accommodates new abuse types without breaking changes

### Return on Investment

Organizations migrating to XARF v4 typically see:

- **90%+ reduction** in manual report processing time
- **70%+ decrease** in integration development costs
- **50%+ improvement** in response times
- **Significant reduction** in false positives and incomplete reports

## Assessment: Analyze Your Current Format

Before migrating, understand what you're migrating from.

### Document Your Current Format

Create an inventory of your existing reporting format:

**Example Assessment Worksheet:**

```
Current Format: Custom JSON via Email
Volume: ~5,000 reports/month
Sources: Web form, API, email intake
Destinations: Internal ticketing system, ISPs, hosting providers

Common Report Types:
- Phishing (60%)
- Malware (20%)
- Spam (15%)
- Other (5%)

Current Fields:
✓ Reporter name
✓ Reporter email
✓ Report date
✓ Abuse type
✓ Target URL/IP
✓ Description (free text)
✓ Screenshot attachment
✗ Evidence hashes
✗ Priority level
✗ Structured evidence
✗ Reporter reference ID

Integration Points:
- Jira (ticketing)
- Custom abuse portal
- Email notifications
- Manual ISP forwarding
```

### Identify Gaps and Pain Points

List specific problems with your current format:

1. **Missing Data**: What information do you wish reporters included?
2. **Inconsistent Fields**: What fields are formatted differently across sources?
3. **Integration Challenges**: Where do you spend manual effort adapting formats?
4. **Validation Issues**: How many reports are rejected or require clarification?
5. **Processing Bottlenecks**: Where do reports get stuck in your workflow?

### Catalog Your Data Sources

Map where reports come from:

- Web forms
- Email submissions
- API integrations
- Bulk feeds
- Partner exchanges
- Automated detection systems

Each source will require a migration strategy.

## Mapping Exercise: Your Fields to XARF v4

XARF v4 uses a consistent structure across all report types. Here's how to map your existing fields.

### Core Field Mapping

| Your Field | XARF v4 Field | Notes |
|------------|---------------|-------|
| Report ID / Case Number | `report_id` | Use UUID format |
| Report Date / Timestamp | `timestamp` | ISO 8601 format required |
| Abuse Type / Category | `category` + `type` | Map to category (e.g., content) and type (e.g., phishing) |
| Reporter Name | `reporter.org` | Organization name |
| Reporter Email | `reporter.contact` | Contact email |
| Reporter Domain | `reporter.domain` | Reporter's domain (required) |
| Reporter Reference | `reporter_reference_id` | Your internal tracking ID |
| Description | `description` | Free text, keep as-is |
| Target URL | `url` | Direct field (for content-based abuse) |
| Target IP | `destination_ip` | Direct field (for connection-based abuse) |
| Screenshot | `evidence` array | Add evidence items with hashes |

### Content Type Mapping

Map your abuse categories to XARF v4 content types:

**Example Mappings:**

```
Your Category              → XARF v4 Category + Type
─────────────────────────────────────────────────────
"Phishing"                → category: content, type: phishing
"Malware Site"            → category: content, type: malware
"Spam Email"              → category: messaging, type: spam
"DDoS Attack"             → category: connection, type: ddos
"Compromised Server"      → category: infrastructure, type: compromised-server
"Copyright Violation"     → category: copyright, type: p2p (or other type)
"Fake Shop"               → category: content, type: fake-shop
"Botnet Activity"         → category: infrastructure, type: botnet
"Port Scan"               → category: connection, type: port-scan
"Brute Force Attack"      → category: connection, type: brute-force
```

Review all [58 XARF v4 types across 7 categories](/docs/content-types/) to find the best match for your categories.

### Evidence Structure

XARF v4 uses an `evidence` object containing arrays of evidence items. Transform your evidence fields:

**Before (Your Format):**
```json
{
  "url": "https://evil.example.com/phishing",
  "ip_address": "203.0.113.42",
  "screenshot_url": "https://screenshots.example.com/abc123.png"
}
```

**After (XARF v4):**
```json
{
  "url": "https://evil.example.com/phishing",
  "destination_ip": "203.0.113.42",
  "evidence": [
    {
      "content_type": "image/png",
      "description": "Screenshot of phishing page",
      "payload": "base64_encoded_image_data...",
      "hashes": ["sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"]
    }
  ]
}
```

### Reporter Custom Fields

If you have fields that don't map to standard XARF fields, use `reporter_custom_fields`:

**Example:**
```json
{
  "custom_fields": {
    "internal_case_id": "CASE-2024-12345",
    "detection_system": "automated-scanner-v2",
    "customer_account": "ACC-789012",
    "risk_score": 85
  }
}
```

This preserves your internal data while maintaining XARF compliance.

## Migration Strategies

Choose the approach that fits your organization's needs and risk tolerance.

### Strategy 1: Big Bang Migration

**Approach**: Switch all report generation to XARF v4 at once.

**Best For**:
- Small to medium report volumes (<10K/month)
- Unified reporting infrastructure
- Flexible downstream systems
- Strong technical team

**Timeline**: 1-3 months

**Steps**:
1. Build XARF v4 generator for all report sources
2. Update all integrations simultaneously
3. Test thoroughly in staging
4. Deploy to production with rollback plan
5. Monitor for issues

**Pros**:
- Clean cut-over
- No dual-format maintenance
- Fast completion

**Cons**:
- Higher risk
- Requires coordination across all systems
- Potential for widespread issues

### Strategy 2: Phased Migration

**Approach**: Migrate report sources incrementally.

**Best For**:
- Large report volumes (>10K/month)
- Multiple independent report sources
- Complex downstream integrations
- Risk-averse organizations

**Timeline**: 3-6 months

**Steps**:
1. Prioritize report sources by volume/importance
2. Migrate one source at a time
3. Run parallel formats during transition
4. Validate each phase before proceeding
5. Deprecate old format after all sources migrated

**Example Phasing:**
```
Phase 1 (Month 1-2): Web form → XARF v4
Phase 2 (Month 2-3): API submissions → XARF v4
Phase 3 (Month 3-4): Email intake → XARF v4
Phase 4 (Month 4-5): Partner feeds → XARF v4
Phase 5 (Month 5-6): Automated detections → XARF v4
Phase 6 (Month 6): Deprecate legacy format
```

**Pros**:
- Lower risk per phase
- Learn and improve between phases
- Easier rollback if issues arise

**Cons**:
- Longer timeline
- Dual-format maintenance overhead
- More complex transition period

### Strategy 3: Proxy/Translation Layer

**Approach**: Build a translation layer that converts existing format to XARF v4.

**Best For**:
- Can't modify report sources
- Need immediate XARF v4 output
- Testing XARF v4 before full migration
- Third-party report sources

**Timeline**: 1-2 months

**Steps**:
1. Build translation service
2. Route existing reports through translator
3. Emit XARF v4 downstream
4. Optionally migrate sources later

**Example Architecture:**
```
Report Source → Translation Service → XARF v4 → Downstream Systems
   (Legacy)      (Field Mapping)      (Standard)   (Ticketing, etc.)
```

**Pros**:
- Doesn't require changing sources
- Fast deployment
- Can migrate sources incrementally later

**Cons**:
- Additional component to maintain
- Potential data loss in translation
- May mask underlying format issues

### Strategy 4: Parallel Run

**Approach**: Generate both formats simultaneously, validate equivalence.

**Best For**:
- High-risk migrations
- Critical reporting systems
- Regulatory compliance requirements
- Verification and validation

**Timeline**: 2-4 months

**Steps**:
1. Modify sources to generate both formats
2. Run in parallel for validation period
3. Compare outputs for equivalence
4. Switch downstream to XARF v4
5. Deprecate old format

**Pros**:
- Highest confidence in migration
- Easy rollback during parallel period
- Validates mapping thoroughly

**Cons**:
- Highest development effort
- Double storage/processing during parallel run
- Longest timeline

## Common Migration Challenges and Solutions

### Challenge 1: Missing Required Fields

**Problem**: Your current format doesn't capture required XARF v4 fields.

**Solution**:
- **For `report_id`**: Generate UUIDs at report creation
- **For `timestamp`**: Use report submission time if original timestamp unavailable
- **For `content_type`**: Create mapping table from your categories
- **For `reporter_info`**: Use service account defaults for automated reports

**Code Example** (Python):
```python
import uuid
from datetime import datetime

def generate_missing_fields(legacy_report):
    category_type = map_legacy_type(legacy_report["type"])
    return {
        "report_id": str(uuid.uuid4()),
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "category": category_type["category"],
        "type": category_type["type"],
        "reporter": {
            "org": "Automated Detection System",
            "contact": "abuse@example.com",
            "domain": "example.com"
        },
        "sender": {
            "org": "Automated Detection System",
            "contact": "abuse@example.com",
            "domain": "example.com"
        }
    }
```

### Challenge 2: Evidence Hash Generation

**Problem**: Existing evidence files don't have cryptographic hashes.

**Solution**:
- Generate hashes for new evidence going forward
- Backfill hashes for stored evidence files
- Accept reports without hashes initially (optional field)

**Code Example** (Python):
```python
import hashlib

def generate_file_hash(file_path):
    sha256_hash = hashlib.sha256()
    with open(file_path, "rb") as f:
        for byte_block in iter(lambda: f.read(4096), b""):
            sha256_hash.update(byte_block)

    return {
        "algorithm": "SHA256",
        "value": sha256_hash.hexdigest()
    }

# For URLs/screenshots
def generate_url_hash(url):
    return {
        "algorithm": "SHA256",
        "value": hashlib.sha256(url.encode()).hexdigest()
    }
```

### Challenge 3: Category and Type Mapping

**Problem**: Your categories don't map cleanly to XARF v4 category and type structure.

**Solution**:
- Use the most specific type available within the appropriate category
- Document mapping decisions
- Use `custom_fields` to preserve original category
- Review [type categories](/docs/content-types/) for best fit

**Mapping Strategy**:
```python
def map_category_and_type(legacy_category, legacy_subcategory=None):
    """Map legacy categories to XARF v4 category and type."""

    # Exact matches
    exact_mappings = {
        "phishing": {"category": "content", "type": "phishing"},
        "malware": {"category": "content", "type": "malware"},
        "ddos": {"category": "connection", "type": "ddos"},
    }

    if legacy_category in exact_mappings:
        return exact_mappings[legacy_category]

    # Category + subcategory combinations
    if legacy_category == "copyright":
        if legacy_subcategory == "torrent":
            return {"category": "copyright", "type": "p2p"}
        elif legacy_subcategory == "streaming":
            return {"category": "copyright", "type": "streaming"}
        else:
            return {"category": "copyright", "type": "copyright"}

    # Default fallback
    return {"category": "content", "type": "fraud"}  # Most generic
```

### Challenge 4: Downstream System Compatibility

**Problem**: Existing systems expect your legacy format.

**Solution**:
- Build adapter layer for downstream systems
- Update downstream systems in parallel
- Maintain dual-format output temporarily
- Use feature flags for gradual rollout

**Example Adapter**:
```python
class LegacyAdapter:
    """Converts XARF v4 to legacy format for downstream systems."""

    def convert_to_legacy(self, xarf_report):
        return {
            "case_id": xarf_report["report_id"],
            "date": xarf_report["timestamp"],
            "type": f"{xarf_report['category']}-{xarf_report['type']}",
            "reporter": xarf_report["reporter"]["contact"],
            "url": xarf_report.get("url"),
            "description": xarf_report.get("description", ""),
        }
```

### Challenge 5: High Volume Data Migration

**Problem**: Millions of historical reports need conversion.

**Solution**:
- Migrate in batches with progress tracking
- Run migration during low-traffic periods
- Validate sample batches before full migration
- Keep legacy format archived for reference

**Batch Migration Pattern**:
```python
def migrate_historical_reports(batch_size=1000):
    """Migrate legacy reports to XARF v4 in batches."""

    offset = 0
    total_migrated = 0

    while True:
        batch = fetch_legacy_reports(limit=batch_size, offset=offset)
        if not batch:
            break

        xarf_reports = [convert_to_xarf(report) for report in batch]
        validate_batch(xarf_reports)
        store_xarf_reports(xarf_reports)

        total_migrated += len(batch)
        offset += batch_size

        print(f"Migrated {total_migrated} reports...")

    print(f"Migration complete: {total_migrated} total reports")
```

### Challenge 6: Multi-Source Report Aggregation

**Problem**: You aggregate reports from multiple sources with different formats.

**Solution**:
- Create source-specific converters
- Normalize to XARF v4 as common format
- Tag reports with source in `reporter_custom_fields`
- Build validation per source

**Architecture**:
```
Source A (CSV)  → Converter A →
Source B (JSON) → Converter B → XARF v4 Validator → Unified Storage
Source C (Email)→ Converter C →
```

## Before/After Examples

### Example 1: Phishing Report

**Before (Email-based):**
```
From: security@bank.example.com
Subject: Phishing Report
Date: 2024-01-15 14:30:00

Hi Abuse Team,

We detected a phishing site targeting our customers:

URL: https://fake-bank.badguy.com/login
Type: Phishing
Reported by: John Smith, Security Analyst
Severity: High

The site is impersonating our login page and stealing credentials.
Screenshot attached.

Please take action.

Thanks,
Security Team
```

**After (XARF v4):**
```json
{
  "xarf_version": "4.0.0",
  "report_id": "550e8400-e29b-41d4-a716-446655440000",
  "category": "content",
  "type": "phishing",
  "timestamp": "2024-01-15T14:30:00Z",
  "reporter": {
    "org": "Example Bank Security Team",
    "contact": "security@bank.example.com",
    "domain": "bank.example.com"
  },
  "sender": {
    "org": "Example Bank Security Team",
    "contact": "security@bank.example.com",
    "domain": "bank.example.com"
  },
  "source_identifier": "203.0.113.45",
  "url": "https://fake-bank.badguy.com/login",
  "description": "Phishing site impersonating our login page and stealing credentials",
  "severity": "high",
  "evidence": [
    {
      "content_type": "image/png",
      "description": "Screenshot of phishing page",
      "payload": "base64_encoded_screenshot...",
      "hashes": ["sha256:a3c5f2e8b1d4c6e9f7a2b5c8d1e4f7a9c3b6d9e2f5a8b1c4d7e0f3a6b9c2d5e8"]
    }
  ],
  "custom_fields": {
    "analyst": "John Smith",
    "impersonated_brand": "Example Bank"
  }
}
```

### Example 2: Malware Distribution

**Before (Custom JSON):**
```json
{
  "id": 12345,
  "type": "malware",
  "submitted": "2024-01-15T10:00:00Z",
  "source": "automated_scanner",
  "target": {
    "url": "http://malware.example.com/trojan.exe",
    "hash": "d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2"
  },
  "notes": "Trojan downloader detected"
}
```

**After (XARF v4):**
```json
{
  "xarf_version": "4.0.0",
  "report_id": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
  "category": "content",
  "type": "malware",
  "timestamp": "2024-01-15T10:00:00Z",
  "reporter": {
    "org": "Automated Security Scanner",
    "contact": "scanner@example.com",
    "domain": "example.com"
  },
  "sender": {
    "org": "Automated Security Scanner",
    "contact": "scanner@example.com",
    "domain": "example.com"
  },
  "source_identifier": "203.0.113.50",
  "url": "http://malware.example.com/trojan.exe",
  "description": "Trojan downloader detected",
  "file_hash": "d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2",
  "malware_family": "trojan_downloader",
  "custom_fields": {
    "detection_system": "automated_scanner",
    "internal_id": 12345
  }
}
```

### Example 3: DDoS Attack

**Before (CSV):**
```
timestamp,source_ip,target_ip,attack_type,packets,severity
2024-01-15 08:00:00,198.51.100.42,203.0.113.10,SYN_FLOOD,1500000,CRITICAL
```

**After (XARF v4):**
```json
{
  "xarf_version": "4.0.0",
  "report_id": "123e4567-e89b-12d3-a456-426614174000",
  "category": "connection",
  "type": "ddos",
  "timestamp": "2024-01-15T08:00:00Z",
  "reporter": {
    "org": "Network Operations Center",
    "contact": "noc@example.com",
    "domain": "example.com"
  },
  "sender": {
    "org": "Network Operations Center",
    "contact": "noc@example.com",
    "domain": "example.com"
  },
  "source_identifier": "198.51.100.42",
  "destination_ip": "203.0.113.10",
  "protocol": "tcp",
  "severity": "critical",
  "attack_vector": "SYN_FLOOD",
  "packet_count": 1500000,
  "duration_seconds": 3600
}
```

### Example 4: Spam Report

**Before (Web Form):**
```
Form Submission:
- Email Type: Spam
- Spam Source: 192.0.2.50
- Subject: "Buy cheap medications!!!"
- Received: Jan 15, 2024 09:15 AM
- Spamtrap: spam-trap-001@example.com
- Headers: [attached file]
```

**After (XARF v4):**
```json
{
  "xarf_version": "4.0.0",
  "report_id": "b47cc1e4-4c8d-4e8a-9b5c-8f7e6d5c4b3a",
  "category": "messaging",
  "type": "spam",
  "timestamp": "2024-01-15T09:15:00Z",
  "reporter": {
    "org": "Spamtrap Network",
    "contact": "abuse@example.com",
    "domain": "example.com"
  },
  "sender": {
    "org": "Spamtrap Network",
    "contact": "abuse@example.com",
    "domain": "example.com"
  },
  "source_identifier": "192.0.2.50",
  "source_port": 25,
  "protocol": "smtp",
  "smtp_from": "spammer@bad-domain.example",
  "subject": "Buy cheap medications!!!",
  "recipient": "spam-trap-001@example.com",
  "evidence_source": "spamtrap",
  "evidence": [
    {
      "content_type": "message/rfc822",
      "description": "Complete spam email with headers",
      "payload": "base64_encoded_email...",
      "hashes": ["sha256:..."]
    }
  ]
}
```

## Testing Your XARF Implementation

Thorough testing ensures your migration is successful.

### Unit Testing: Field Mapping

Test that all fields map correctly:

```python
def test_field_mapping():
    """Test legacy format converts to valid XARF v4."""

    legacy_report = {
        "id": 999,
        "type": "phishing",
        "date": "2024-01-15 10:00:00",
        "url": "https://evil.example.com"
    }

    xarf_report = convert_to_xarf(legacy_report)

    assert xarf_report["xarf_version"] == "4.0.0"
    assert xarf_report["category"] == "content"
    assert xarf_report["type"] == "phishing"
    assert "report_id" in xarf_report
    assert xarf_report["timestamp"].endswith("Z")
    assert xarf_report["url"] == "https://evil.example.com"
```

### Schema Validation Testing

Validate all generated reports against the XARF v4 schema:

```python
import jsonschema
import json

def test_schema_validation():
    """Test XARF reports validate against schema."""

    with open("xarf-v4-schema.json") as f:
        schema = json.load(f)

    test_reports = generate_test_reports()

    for report in test_reports:
        try:
            jsonschema.validate(instance=report, schema=schema)
        except jsonschema.exceptions.ValidationError as e:
            print(f"Validation failed: {e.message}")
            raise
```

### Content Type Coverage Testing

Ensure you can generate reports for all your abuse types:

```python
def test_category_type_coverage():
    """Test all legacy types map to valid XARF category and type combinations."""

    legacy_types = [
        "phishing", "malware", "spam", "ddos",
        "brute_force", "copyright", "botnet"
    ]

    valid_xarf_categories = load_valid_categories()

    for legacy_type in legacy_types:
        category_type = map_category_and_type(legacy_type)
        assert category_type["category"] in valid_xarf_categories, \
            f"No mapping for {legacy_type} → {category_type['category']}.{category_type['type']}"
```

### Integration Testing

Test end-to-end flow with downstream systems:

```python
def test_downstream_integration():
    """Test XARF reports process through downstream systems."""

    xarf_report = create_test_xarf_report()

    # Submit to ticketing system
    ticket_id = submit_to_ticketing(xarf_report)
    assert ticket_id is not None

    # Verify ticket created correctly
    ticket = fetch_ticket(ticket_id)
    assert ticket["severity"] == xarf_report.get("severity")
    assert ticket["category"] == xarf_report["category"]
    assert ticket["type"] == xarf_report["type"]
```

### Load Testing

Test migration performance with production-like volumes:

```python
import time

def test_migration_performance():
    """Test conversion performance at scale."""

    num_reports = 10000
    start_time = time.time()

    legacy_reports = generate_legacy_reports(num_reports)
    xarf_reports = [convert_to_xarf(r) for r in legacy_reports]

    duration = time.time() - start_time
    rate = num_reports / duration

    print(f"Converted {num_reports} reports in {duration:.2f}s")
    print(f"Rate: {rate:.2f} reports/second")

    assert rate > 100, "Conversion too slow for production volumes"
```

### Sample Data Testing

Test with real production samples (anonymized):

1. Export sample of production reports
2. Anonymize sensitive data
3. Run through converter
4. Manually review sample outputs
5. Validate with stakeholders

## Validation and Tooling

### JSON Schema Validation

Use the official XARF v4 JSON schema for validation:

```python
import jsonschema
import json
import requests

# Download official schema
schema_url = "https://xarf.org/schemas/v4/xarf-v4.schema.json"
schema = requests.get(schema_url).json()

# Validate report
def validate_xarf_report(report):
    try:
        jsonschema.validate(instance=report, schema=schema)
        return True, "Valid XARF v4 report"
    except jsonschema.exceptions.ValidationError as e:
        return False, f"Validation error: {e.message}"

# Example usage
xarf_report = {...}  # Your XARF report
valid, message = validate_xarf_report(xarf_report)
print(message)
```

### Parser Libraries

Use existing XARF parsers to validate your reports:

**Python:**
```bash
pip install xarf
```

```python
from xarf import XARFParser

parser = XARFParser()
result = parser.parse(xarf_report)

if result.is_valid:
    print("Valid XARF report!")
    print(f"Content type: {result.content_type}")
    print(f"Evidence URLs: {result.evidence.urls}")
else:
    print(f"Validation errors: {result.errors}")
```

### Validation Checklist

Before deploying to production, verify:

- [ ] All reports pass JSON schema validation
- [ ] All `category` values are valid (connection, content, copyright, infrastructure, messaging, reputation, vulnerability)
- [ ] All `type` values are valid for their category
- [ ] `report_id` values are valid UUIDs
- [ ] `timestamp` values are valid ISO 8601 format
- [ ] Evidence hashes use supported algorithms (SHA256, SHA512, MD5)
- [ ] Email addresses in `reporter.contact` are valid
- [ ] Severity values are one of: low, medium, high, critical (if present)
- [ ] Required fields present for each type
- [ ] `xarf_version` is "4.0.0"
- [ ] Reports are valid UTF-8 JSON

### Testing Tools

**Online Validator**: (Planned) https://xarf.org/validator

**Command-Line Tool**:
```bash
# Validate a XARF report file
xarf-validate report.json

# Validate all reports in a directory
xarf-validate reports/*.json

# Validate and output detailed errors
xarf-validate --verbose report.json
```

**API Validation**:
```bash
curl -X POST https://api.xarf.org/v1/validate \
  -H "Content-Type: application/json" \
  -d @report.json
```

## Best Practices During Migration

### 1. Start with a Pilot

Don't migrate everything at once. Start small:

- Choose low-risk report source (e.g., internal testing)
- Migrate 5-10% of production traffic
- Monitor for issues
- Gather feedback
- Iterate and improve
- Scale up gradually

### 2. Maintain Audit Trail

Track every step of the migration:

```python
def convert_with_audit(legacy_report):
    """Convert with full audit logging."""

    audit_entry = {
        "timestamp": datetime.utcnow().isoformat(),
        "legacy_id": legacy_report.get("id"),
        "legacy_format_version": legacy_report.get("version"),
        "conversion_started": datetime.utcnow().isoformat()
    }

    try:
        xarf_report = convert_to_xarf(legacy_report)
        audit_entry["xarf_report_id"] = xarf_report["report_id"]
        audit_entry["status"] = "success"
        audit_entry["conversion_completed"] = datetime.utcnow().isoformat()
    except Exception as e:
        audit_entry["status"] = "failed"
        audit_entry["error"] = str(e)
        raise
    finally:
        log_audit(audit_entry)

    return xarf_report
```

### 3. Version Your Converter

Use semantic versioning for your conversion logic:

```python
CONVERTER_VERSION = "1.2.0"

def convert_to_xarf(legacy_report):
    xarf_report = {
        "xarf_version": "4.0.0",
        # ... conversion logic ...
    }

    # Track converter version for debugging
    if "custom_fields" not in xarf_report:
        xarf_report["custom_fields"] = {}
    xarf_report["custom_fields"]["converter_version"] = CONVERTER_VERSION

    return xarf_report
```

### 4. Build Feedback Loops

Monitor migration quality:

- Track validation failure rates
- Monitor downstream processing errors
- Collect user feedback
- Measure processing time improvements
- Compare pre/post migration metrics

### 5. Document Everything

Create migration documentation:

- Field mapping decisions
- Content type mappings
- Known limitations
- Troubleshooting guide
- Rollback procedures
- Contact points for issues

### 6. Plan for Rollback

Always have a rollback strategy:

```python
class DualFormatGenerator:
    """Generate both legacy and XARF formats during transition."""

    def __init__(self, use_xarf=False):
        self.use_xarf = use_xarf

    def generate_report(self, data):
        legacy_report = self.generate_legacy(data)
        xarf_report = self.convert_to_xarf(legacy_report)

        # Store both during transition
        self.store_legacy(legacy_report)
        self.store_xarf(xarf_report)

        # Return active format
        return xarf_report if self.use_xarf else legacy_report
```

### 7. Train Your Team

Ensure everyone understands XARF v4:

- Run training sessions on XARF structure
- Create quick reference guides
- Provide example reports for each content type
- Document common issues and solutions
- Establish support channels

### 8. Communicate with Partners

If you exchange reports with partners:

- Notify partners of migration timeline
- Provide sample XARF v4 reports
- Offer dual-format period if possible
- Share validation tools
- Coordinate go-live dates

## Migration Readiness Checklist

Use this checklist to ensure you're ready for migration.

### Planning Phase
- [ ] Current format documented completely
- [ ] Pain points and gaps identified
- [ ] Migration strategy selected
- [ ] Timeline and milestones defined
- [ ] Stakeholders identified and informed
- [ ] Risk assessment completed
- [ ] Rollback plan documented

### Mapping Phase
- [ ] All fields mapped to XARF v4
- [ ] Content type mappings finalized
- [ ] Evidence structure designed
- [ ] Custom fields identified
- [ ] Required field generation planned
- [ ] Edge cases documented

### Development Phase
- [ ] Converter implemented
- [ ] Unit tests written and passing
- [ ] Schema validation integrated
- [ ] Error handling implemented
- [ ] Logging and monitoring added
- [ ] Performance benchmarks met

### Testing Phase
- [ ] Sample data converted successfully
- [ ] All reports pass schema validation
- [ ] Integration tests passing
- [ ] Load testing completed
- [ ] User acceptance testing done
- [ ] Edge cases tested

### Deployment Phase
- [ ] Staging environment tested
- [ ] Pilot group identified
- [ ] Monitoring dashboards ready
- [ ] Rollback procedure tested
- [ ] Documentation completed
- [ ] Training materials prepared
- [ ] Support team briefed

### Post-Migration Phase
- [ ] All report sources migrated
- [ ] Legacy format deprecated
- [ ] Documentation updated
- [ ] Metrics and KPIs tracked
- [ ] Feedback collected and addressed
- [ ] Lessons learned documented

## Getting Help

If you need assistance during migration:

- **GitHub Discussions**: [github.com/xarf/xarf-spec/discussions](https://github.com/xarf/xarf-spec/discussions) - Ask questions and share experiences
- **GitHub Issues**: [github.com/xarf/xarf-spec/issues](https://github.com/xarf/xarf-spec/issues) - Report problems with the specification
- **Community**: Join other organizations migrating to XARF v4
- **Professional Support**: Contact XARF implementation partners for consulting

## Next Steps

Now that you understand migration to XARF v4:

1. **Complete your assessment** - Use the worksheets in this guide
2. **Choose your strategy** - Pick the migration approach that fits your needs
3. **Review the spec** - Read the [Technical Specification](/docs/specification/)
4. **Study examples** - Examine [Content Type Examples](/docs/content-types/)
5. **Build your converter** - Start with a pilot implementation
6. **Test thoroughly** - Validate before production deployment
7. **Deploy gradually** - Roll out in phases if possible
8. **Monitor and iterate** - Continuously improve based on feedback

---

**Related Documentation:**
- [Introduction to XARF](/docs/introduction/)
- [Technical Specification](/docs/specification/)
- [Content Type Examples](/docs/content-types/)
- [Common Fields Reference](/docs/common-fields/)
- [Best Practices](/docs/best-practices/)
