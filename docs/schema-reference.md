---
layout: docs
title: "Schema Reference"
description: "Complete JSON schema reference for all XARF v4 abuse types"
---

# XARF v4 Schema Reference

## Schema Organization

XARF v4 schemas are organized hierarchically:

```
schemas/v4/
├── xarf-core.json           # Core fields for all reports
├── types/
│   ├── content-base.json    # Base schema for content class
│   ├── content-phishing.json
│   ├── content-malware.json
│   ├── content-fraud.json
│   ├── content-brand_infringement.json
│   ├── content-data_leak.json
│   ├── content-remote_compromise.json
│   ├── content-suspicious_registration.json
│   ├── messaging-*.json     # Messaging class schemas
│   ├── connection-*.json    # Connection class schemas
│   ├── infrastructure-*.json
│   ├── copyright-*.json
│   ├── vulnerability-*.json
│   └── reputation-*.json
```

## Core Schema

**File:** [`xarf-core.json`](/schemas/v4/xarf-core.json)

The core schema defines fields common to all XARF reports:

### Required Fields
- `xarf_version` - Version string (e.g., "4.0.0")
- `report_id` - UUID v4 format
- `timestamp` - ISO 8601 date-time
- `reporter` - Reporter organization details
- `source_identifier` - IP, domain, or identifier
- `class` - One of 7 abuse classes
- `type` - Specific type within class

### Optional Core Fields
- `source_port` - Port number (1-65535)
- `evidence_source` - How evidence was obtained
- `evidence` - Array of evidence items
- `tags` - Namespaced tags
- `confidence` - Score 0.0-1.0
- `description` - Human-readable text
- `_internal` - Private metadata (not transmitted)

## Content Class Schemas

### Base Schema
**File:** [`content-base.json`](/schemas/v4/types/content-base.json)

Shared fields for all content abuse types:
- URL and domain information
- DNS records (A, AAAA, MX, TXT)
- WHOIS data
- SSL certificate details
- Hosting provider information
- Verification metadata

### Phishing
**File:** [`content-phishing.json`](/schemas/v4/types/content-phishing.json)

Additional fields:
- `credential_fields` - Form fields on page
- `phishing_kit` - Known kit identifier
- `redirect_chain` - URL redirect sequence
- `cloned_site` - Legitimate site URL
- `lure_type` - Social engineering technique

### Malware
**File:** [`content-malware.json`](/schemas/v4/types/content-malware.json)

Additional fields:
- `malware_family` - Family name
- `malware_type` - Classification
- `file_hashes` - MD5, SHA1, SHA256
- `c2_servers` - Command & control
- `sandbox_analysis` - Analysis results

### Fraud
**File:** [`content-fraud.json`](/schemas/v4/types/content-fraud.json)

Additional fields:
- `fraud_type` - Type of fraud
- `payment_methods` - Requested payments
- `cryptocurrency_addresses` - Crypto wallets
- `claimed_entity` - Who they claim to be
- `loss_amount` - Financial impact

### Brand Infringement
**File:** [`content-brand_infringement.json`](/schemas/v4/types/content-brand_infringement.json)

Additional fields:
- `infringement_type` - Type of violation
- `legitimate_site` - Official site
- `similarity_score` - 0.0-1.0
- `trademark_details` - Registration info
- `infringing_elements` - What was copied

### Data Leak
**File:** [`content-data_leak.json`](/schemas/v4/types/content-data_leak.json)

Additional fields:
- `data_types` - Types of exposed data
- `exposure_method` - How exposed
- `record_count` - Number of records
- `encryption_status` - Protection level
- `accessibility` - Current access status

### Remote Compromise
**File:** [`content-remote_compromise.json`](/schemas/v4/types/content-remote_compromise.json)

Additional fields:
- `compromise_type` - Type of compromise
- `compromise_indicators` - IOCs
- `affected_cms` - CMS if identified
- `webshell_details` - Webshell specifics
- `malicious_activities` - Observed abuse

### Suspicious Registration
**File:** [`content-suspicious_registration.json`](/schemas/v4/types/content-suspicious_registration.json)

Additional fields:
- `registration_date` - When registered
- `suspicious_indicators` - Why suspicious
- `risk_score` - 0.0-1.0
- `targeted_brands` - Potential targets
- `predicted_usage` - Expected abuse

## Other Classes

### Messaging Class
- `messaging-spam.json` - Email spam
- `messaging-phishing.json` - Phishing emails
- `messaging-bulk.json` - Bulk messaging

### Connection Class
- `connection-ddos.json` - DDoS attacks
- `connection-port_scan.json` - Port scanning
- `connection-login_attack.json` - Brute force
- `connection-auth_failure.json` - Failed auth
- `connection-ip_spoofing.json` - IP spoofing

### Infrastructure Class
- `infrastructure-bot.json` - Botnet members
- `infrastructure-compromised.json` - Hacked servers
- `infrastructure-c2.json` - Command & control

### Copyright Class
- `copyright-dmca.json` - DMCA violations
- `copyright-trademark.json` - Trademark abuse
- `copyright-p2p.json` - Peer-to-peer
- `copyright-cyberlocker.json` - File hosting

### Vulnerability Class
- `vulnerability-cve.json` - CVE reports
- `vulnerability-open.json` - Open services
- `vulnerability-misconfiguration.json` - Misconfigs

### Reputation Class
- `reputation-blocklist.json` - Blocklist entries
- `reputation-threat_intel.json` - IOC data

## Validation

### Using JSON Schema

```javascript
// JavaScript validation example
const Ajv = require('ajv');
const ajv = new Ajv();

// Load schemas
const coreSchema = require('./schemas/v4/xarf-core.json');
const phishingSchema = require('./schemas/v4/types/content-phishing.json');

// Compile validator
const validate = ajv.compile(phishingSchema);

// Validate report
const valid = validate(report);
if (!valid) {
  console.log(validate.errors);
}
```

```python
# Python validation example
import jsonschema
import json

# Load schemas
with open('schemas/v4/types/content-phishing.json') as f:
    schema = json.load(f)

# Validate report
jsonschema.validate(report, schema)
```

### Schema Composition

Schemas use JSON Schema composition features:

1. **$ref** - Reference other schemas
2. **allOf** - Combine multiple schemas
3. **const** - Fixed values
4. **enum** - Allowed values
5. **pattern** - Regex patterns
6. **format** - Standard formats (email, uri, uuid, date-time)

### Custom Formats

XARF defines these custom patterns:

- **Hash format:** `^(md5|sha1|sha256|sha512):[a-fA-F0-9]+$`
- **Tag format:** `^[a-z0-9_]+:[a-z0-9_]+$`
- **CVE format:** `^CVE-\\d{4}-\\d{4,}$`
- **Domain pattern:** `^([a-z0-9]+(-[a-z0-9]+)*\\.)+[a-z]{2,}$`

## Schema Evolution

### Version Management

- Major version: Breaking changes
- Minor version: New optional fields
- Patch version: Bug fixes, clarifications

### Backward Compatibility

New schemas maintain compatibility by:
- Never removing required fields
- Making new fields optional
- Using default values
- Supporting legacy field names

### Migration Support

The `legacy_version` field indicates converted reports:
```json
{
  "xarf_version": "4.0.0",
  "legacy_version": "3",
  ...
}
```

## Implementation Notes

### Required vs Optional

- Core fields are always required
- Class-specific required fields vary
- Evidence requirements depend on abuse type
- Screenshots mandatory for visual abuse

### Size Limits

- Evidence items: 5MB each
- Total evidence: 25MB per report
- Description fields: 1000 characters
- Tag count: 20 maximum

### Performance Considerations

- Use streaming JSON parsers for large reports
- Validate schemas once, cache compiled validators
- Process evidence asynchronously
- Batch validation for bulk processing

## Tools and Resources

- [Online Validator](/tools/validator) - Test reports in browser
- [Schema Downloads](/schemas/) - Download all schemas
- [Example Reports](/examples/) - Sample reports for testing
- [Parser Libraries](/libraries/) - Implementation libraries