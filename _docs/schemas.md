---
layout: docs
title: "Schema Reference"
description: "JSON Schema documentation with examples for all XARF v4 content types"
permalink: /docs/schemas/
---

# Schema Reference

## Introduction to JSON Schema Validation

XARF v4 uses **JSON Schema (Draft 2020-12)** to define and validate the structure of abuse reports. JSON Schema provides a powerful, standardized way to ensure that XARF reports are properly formatted and contain all required fields before processing.

### Why JSON Schema?

- **Automated Validation**: Validate reports programmatically before accepting them
- **Clear Documentation**: Schema files serve as precise technical specifications
- **Type Safety**: Enforce correct data types for all fields
- **Extensibility**: Add custom fields while maintaining core compliance
- **Interoperability**: Standard format supported by many programming languages

### Schema Validation Flow

```
1. Receive XARF report (JSON)
   ↓
2. Load appropriate schema file
   ↓
3. Validate report against schema
   ↓
4. If valid: Process report
   If invalid: Return validation errors
```

## How to Validate XARF Reports

### Using Python

```python
import json
import jsonschema
from jsonschema import validate

# Load your XARF report
with open('report.json', 'r') as f:
    report = json.load(f)

# Load the master schema
with open('xarf-v4-master.json', 'r') as f:
    schema = json.load(f)

# Validate
try:
    validate(instance=report, schema=schema)
    print("Report is valid!")
except jsonschema.exceptions.ValidationError as e:
    print(f"Validation failed: {e.message}")
```

### Using JavaScript/Node.js

```javascript
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// Load schema and report
const schema = require('./xarf-v4-master.json');
const report = require('./report.json');

// Validate
const validate = ajv.compile(schema);
const valid = validate(report);

if (valid) {
  console.log('Report is valid!');
} else {
  console.log('Validation errors:', validate.errors);
}
```

### Using Online Validator

Try the **[XARF Online Validator Tool](/validator/)** - paste your JSON report and get instant validation feedback with detailed error messages.

## Schema Files on GitHub

All XARF v4 schemas are open source and available on GitHub:

**Repository**: [https://github.com/xarf/xarf-spec/tree/main/schemas/v4](https://github.com/xarf/xarf-spec/tree/main/schemas/v4)

### Core Schema Files

| File | Purpose | URL |
|------|---------|-----|
| **xarf-v4-master.json** | Master schema with type-specific validation | [View on GitHub](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/xarf-v4-master.json) |
| **xarf-core.json** | Base schema with common fields for all reports | [View on GitHub](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/xarf-core.json) |
| **types/content-base.json** | Base schema for all content-class types | [View on GitHub](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/content-base.json) |

**Schema ID Base**: `https://xarf.org/schemas/v4/`

## Base Schema Structure

### Core Fields (xarf-core.json)

All XARF v4 reports must include these base fields:

#### Required Fields

```json
{
  "xarf_version": "4.0.0",
  "report_id": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2024-01-15T14:30:25Z",
  "reporter": {
    "org": "Example Security Org",
    "contact": "abuse@example.com",
    "domain": "example.com"
  },
  "sender": {
    "org": "Example Security Org",
    "contact": "abuse@example.com",
    "domain": "example.com"
  },
  "source_identifier": "192.0.2.1",
  "category": "connection",
  "type": "ddos"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `xarf_version` | string | XARF version (pattern: `^4\.[0-9]+\.[0-9]+$`) |
| `report_id` | string (UUID) | Unique report identifier (UUID v4 format) |
| `timestamp` | string (ISO 8601) | When the abuse incident occurred |
| `reporter` | object | Organization reporting the incident |
| `reporter.org` | string | Organization name (max 200 chars) |
| `reporter.contact` | string (email) | Contact email for follow-up |
| `reporter.domain` | string | Reporter's domain name |
| `source_identifier` | string | IP address, domain, or identifier of abuse source |
| `category` | enum | Abuse category: `connection`, `content`, `copyright`, `infrastructure`, `messaging`, `reputation`, `vulnerability` |
| `type` | string | Specific abuse type within the category |

#### Optional Common Fields

| Field | Type | Description |
|-------|------|-------------|
| `source_port` | integer | Source port (1-65535), critical for CGNAT environments |
| `evidence_source` | string | Quality indicator (e.g., `spamtrap`, `honeypot`, `user_report`) |
| `evidence` | array | Array of evidence items with base64-encoded payloads |
| `tags` | array | Namespaced tags (format: `namespace:value`) |
| `confidence` | number | Confidence score (0.0-1.0) |
| `description` | string | Human-readable description (max 1000 chars) |
| `legacy_version` | string | Original XARF version if converted from v3 |
| `_internal` | object | Internal metadata - NEVER transmitted between systems |

### Evidence Item Structure

```json
{
  "content_type": "message/rfc822",
  "description": "Original spam email with headers",
  "payload": "UmVjZWl2ZWQ6IGZyb20g...",
  "hash": "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "size": 1024
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `content_type` | string | Yes | MIME type of evidence |
| `payload` | string | Yes | Base64-encoded evidence data |
| `description` | string | No | Human-readable description (max 500 chars) |
| `hash` | string | No | Integrity hash (format: `algorithm:hexvalue`) |
| `size` | integer | No | Evidence size in bytes (max 5MB per item) |

## Content Types by Category

XARF v4 includes **58 specialized content types** organized into 7 categories.

### 1. Connection-Based Abuse (8 types)

Network-level attacks and suspicious connection patterns.

| Content Type | Schema File | Required Fields | Description |
|--------------|-------------|-----------------|-------------|
| `connection-ddos` | [connection-ddos.json](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/connection-ddos.json) | `protocol`, `first_seen` | Distributed Denial of Service attacks |
| `connection-port-scan` | [connection-port-scan.json](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/connection-port-scan.json) | `protocol` | Port scanning activity |
| `connection-login-attack` | [connection-login-attack.json](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/connection-login-attack.json) | `protocol`, `target_service` | Login attacks and credential stuffing |
| `connection-auth-failure` | [connection-auth-failure.json](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/connection-auth-failure.json) | `protocol` | Authentication failures |
| `connection-brute-force` | connection-brute-force.json | `protocol`, `attempts` | Brute force attacks |
| `connection-ssh-attack` | connection-ssh-attack.json | `protocol` | SSH-specific attacks |
| `connection-rdp-attack` | connection-rdp-attack.json | `protocol` | RDP-specific attacks |
| `connection-ddos-amplification` | [connection-ddos-amplification.json](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/connection-ddos-amplification.json) | `protocol`, `amplification_protocol` | DDoS amplification attacks |

#### Example: Minimal Valid DDoS Report

```json
{
  "xarf_version": "4.0.0",
  "report_id": "ddos-789a0123-b456-78c9-d012-345678901234",
  "timestamp": "2024-01-15T16:55:42Z",
  "reporter": {
    "org": "DDoS Protection Service",
    "contact": "ddos@protection.net",
    "domain": "protection.net"
  },
  "sender": {
    "org": "DDoS Protection Service",
    "contact": "ddos@protection.net",
    "domain": "protection.net"
  },
  "source_identifier": "192.0.2.155",
  "source_port": 12345,
  "category": "connection",
  "type": "ddos",
  "protocol": "tcp",
  "first_seen": "2024-01-15T16:45:00Z"
}
```

**Type-specific fields**:
- `protocol` (required): `tcp`, `udp`, `icmp`, `sctp`
- `first_seen` (required): When attack was first observed
- `destination_ip` (optional): Target IP address
- `destination_port` (optional): Target port
- `attack_vector` (optional): e.g., `syn_flood`, `udp_flood`
- `peak_pps` (optional): Peak packets per second
- `peak_bps` (optional): Peak bits per second
- `duration_seconds` (optional): Attack duration

### 2. Content-Based Abuse (15 types)

Malicious or harmful content hosted or distributed online.

| Content Type | Schema File | Required Fields | Description |
|--------------|-------------|-----------------|-------------|
| `content-phishing` | [content-phishing.json](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/content-phishing.json) | `url` | Phishing websites and credential harvesting |
| `content-malware` | [content-malware.json](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/content-malware.json) | `url` | Malware distribution sites |
| `content-csam` | content-csam.json | `url` | Child Sexual Abuse Material |
| `content-csem` | content-csem.json | `url` | Child Sexual Exploitation Material |
| `content-ncii` | content-ncii.json | `url` | Non-Consensual Intimate Images |
| `content-fake-shop` | content-fake-shop.json | `url` | Fraudulent e-commerce sites |
| `content-fraud` | [content-fraud.json](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/content-fraud.json) | `url` | General fraud content |
| `content-ransomware` | content-ransomware.json | `url` | Ransomware distribution |
| `content-cryptojacking` | content-cryptojacking.json | `url` | Cryptocurrency mining scripts |
| `content-identity-theft` | content-identity-theft.json | `url` | Identity theft schemes |
| `content-scam` | content-scam.json | `url` | Various scam content |
| `content-impersonation` | content-impersonation.json | `url` | Brand/entity impersonation |
| `content-brand_infringement` | [content-brand_infringement.json](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/content-brand_infringement.json) | `url` | Brand/trademark infringement |
| `content-exposed-data` | [content-exposed-data.json](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/content-exposed-data.json) | `url` | Exposed sensitive data |
| `content-remote_compromise` | [content-remote_compromise.json](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/content-remote_compromise.json) | `url` | Remote system compromise |
| `content-suspicious_registration` | [content-suspicious_registration.json](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/content-suspicious_registration.json) | `url` | Suspicious domain registrations |

#### Content-Base Schema

All content types inherit from [content-base.json](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/content-base.json), which provides:

**Required**: `url` (string, URI format)

**Optional Common Fields**:
- `domain`: Fully qualified domain name
- `registrar`: Domain registrar
- `nameservers`: DNS nameservers
- `dns_records`: DNS evidence (A, AAAA, MX, TXT)
- `screenshot_url`: Screenshot evidence URL
- `verified_at`: When content was verified active
- `verification_method`: `manual`, `automated_crawler`, `user_report`, `honeypot`, `threat_intelligence`
- `target_brand`: Impersonated brand
- `hosting_provider`: Hosting provider name
- `asn`: Autonomous System Number
- `country_code`: ISO 3166-1 alpha-2 code
- `ssl_certificate`: SSL certificate details
- `whois`: WHOIS data

#### Example: Minimal Valid Phishing Report

```json
{
  "xarf_version": "4.0.0",
  "report_id": "b2c3d4e5-f6g7-8901-bcde-f2345678901a",
  "timestamp": "2025-01-15T15:15:24Z",
  "reporter": {
    "org": "Phishing Detection Service",
    "contact": "reports@antiphishing.example",
    "domain": "antiphishing.example"
  },
  "sender": {
    "org": "Phishing Detection Service",
    "contact": "reports@antiphishing.example",
    "domain": "antiphishing.example"
  },
  "source_identifier": "203.0.113.45",
  "category": "content",
  "type": "phishing",
  "url": "https://secure-banking-login.example.com/auth"
}
```

**Phishing-specific optional fields**:
- `credential_fields`: Form fields on the page (e.g., `["username", "password"]`)
- `phishing_kit`: Known phishing kit identifier
- `redirect_chain`: URL redirect sequence
- `submission_url`: Where credentials are submitted
- `cloned_site`: Legitimate site being impersonated
- `detection_evasion`: Evasion techniques used
- `lure_type`: Social engineering lure (e.g., `account_suspension`, `security_alert`)

### 3. Copyright Violations (8 types)

Intellectual property infringement and unauthorized distribution.

| Content Type | Schema File | Required Fields | Description |
|--------------|-------------|-----------------|-------------|
| `copyright-p2p` | [copyright-p2p.json](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/copyright-p2p.json) | `p2p_protocol`, `swarm_info` | Peer-to-peer file sharing |
| `copyright-cyberlocker` | [copyright-cyberlocker.json](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/copyright-cyberlocker.json) | `url` | File hosting services |
| `copyright-streaming` | copyright-streaming.json | `url` | Illegal streaming sites |
| `copyright-link-site` | [copyright-link-site.json](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/copyright-link-site.json) | `url` | Link aggregation sites |
| `copyright-ugc-platform` | [copyright-ugc-platform.json](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/copyright-ugc-platform.json) | `platform_name`, `content_id` | User-generated content platforms |
| `copyright-usenet` | [copyright-usenet.json](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/copyright-usenet.json) | `newsgroup`, `message_id` | Usenet infringement |
| `copyright-copyright` | [copyright-copyright.json](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/copyright-copyright.json) | - | General copyright infringement |
| `copyright-counterfeit` | copyright-counterfeit.json | `url` | Counterfeit goods |

#### Example: Minimal Valid P2P Report

```json
{
  "xarf_version": "4.0.0",
  "report_id": "p2p-789a1234-b567-89c0-d123-456789abcdef",
  "timestamp": "2024-01-15T18:30:45Z",
  "reporter": {
    "org": "Content Protection Agency",
    "contact": "reports@cpa.org",
    "domain": "cpa.org"
  },
  "sender": {
    "org": "Content Protection Agency",
    "contact": "reports@cpa.org",
    "domain": "cpa.org"
  },
  "source_identifier": "203.0.113.150",
  "source_port": 6881,
  "category": "copyright",
  "type": "p2p",
  "p2p_protocol": "bittorrent",
  "swarm_info": {
    "info_hash": "da39a3ee5e6b4b0d3255bfef95601890afd80709"
  }
}
```

**P2P-specific fields**:
- `p2p_protocol` (required): `bittorrent`, `edonkey`, `gnutella`, `kademlia`, `other`
- `swarm_info` (required): Must include `info_hash` or `magnet_uri`
- `peer_info` (optional): Peer ID, client version, upload/download amounts
- `work_title` (optional): Copyrighted work title
- `rights_holder` (optional): Copyright holder
- `work_category` (optional): `movie`, `tv_show`, `music`, `software`, `ebook`, `game`, etc.

### 4. Infrastructure Abuse (6 types)

Compromised or misused infrastructure and systems.

| Content Type | Schema File | Required Fields | Description |
|--------------|-------------|-----------------|-------------|
| `infrastructure-botnet` | [infrastructure-botnet.json](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/infrastructure-botnet.json) | `compromise_evidence` | Botnet infections |
| `infrastructure-compromised-server` | [infrastructure-compromised-server.json](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/infrastructure-compromised-server.json) | `compromise_evidence` | Compromised servers |
| `infrastructure-proxy` | infrastructure-proxy.json | `proxy_type` | Open proxies |
| `infrastructure-vpn-abuse` | infrastructure-vpn-abuse.json | - | VPN abuse |
| `infrastructure-mining` | infrastructure-mining.json | `cryptocurrency` | Cryptocurrency mining |
| `infrastructure-c2` | infrastructure-c2.json | `malware_family` | Command & control servers |

#### Example: Minimal Valid Bot Report

```json
{
  "xarf_version": "4.0.0",
  "report_id": "bot-123e4567-e89b-12d3-a456-426614174000",
  "timestamp": "2024-01-15T12:00:00Z",
  "reporter": {
    "org": "Botnet Tracking Service",
    "contact": "reports@bottracker.net",
    "domain": "bottracker.net"
  },
  "sender": {
    "org": "Botnet Tracking Service",
    "contact": "reports@bottracker.net",
    "domain": "bottracker.net"
  },
  "source_identifier": "192.0.2.50",
  "category": "infrastructure",
  "type": "bot",
  "compromise_evidence": "C2 communication observed to known Mirai C2 server"
}
```

**Bot-specific fields**:
- `compromise_evidence` (required): Evidence of compromise
- `malware_family` (optional): e.g., `conficker`, `mirai`, `emotet`
- `c2_server` (optional): C2 server domain or IP
- `c2_protocol` (optional): `http`, `https`, `tcp`, `udp`, `dns`, `irc`, `p2p`, `custom`
- `bot_capabilities` (optional): Array of capabilities (e.g., `ddos`, `spam`, `proxy`)

### 5. Messaging Abuse (6 types)

Spam and abuse via messaging platforms.

| Content Type | Schema File | Required Fields | Description |
|--------------|-------------|-----------------|-------------|
| `messaging-spam` | [messaging-spam.json](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/messaging-spam.json) | `protocol` | Email spam (unsolicited commercial) |
| `messaging-bulk-messaging` | [messaging-bulk-messaging.json](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/messaging-bulk-messaging.json) | `protocol` | Bulk messaging abuse |
| `messaging-sms-spam` | messaging-sms-spam.json | `protocol` | SMS spam |
| `messaging-whatsapp-spam` | messaging-whatsapp-spam.json | `protocol` | WhatsApp spam |
| `messaging-social-spam` | messaging-social-spam.json | `protocol`, `platform` | Social media spam |
| `messaging-voip-spam` | messaging-voip-spam.json | `protocol` | VoIP spam (SPIT) |

#### Example: Minimal Valid Spam Report

```json
{
  "xarf_version": "4.0.0",
  "report_id": "spam-123e4567-e89b-12d3-a456-426614174000",
  "timestamp": "2024-01-15T14:30:25Z",
  "reporter": {
    "org": "SpamCop",
    "contact": "reports@spamcop.net",
    "domain": "spamcop.net"
  },
  "sender": {
    "org": "SpamCop",
    "contact": "reports@spamcop.net",
    "domain": "spamcop.net"
  },
  "source_identifier": "192.0.2.123",
  "source_port": 25,
  "category": "messaging",
  "type": "spam",
  "protocol": "smtp",
  "smtp_from": "spam@example.com"
}
```

**Messaging-spam specific fields**:
- `protocol` (required): `smtp`, `sms`, `whatsapp`, `telegram`, etc.
- `smtp_from` (required if protocol=smtp): SMTP envelope sender
- `smtp_to` (optional): SMTP recipient
- `subject` (optional): Message subject
- `message_id` (optional): Message ID from headers
- `spam_indicators` (optional): Object with detection indicators

### 6. Reputation & Intelligence (3 types)

Threat intelligence, blocklists, and reputation data.

| Content Type | Schema File | Required Fields | Description |
|--------------|-------------|-----------------|-------------|
| `reputation-blocklist` | [reputation-blocklist.json](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/reputation-blocklist.json) | `blocklist_name` | Blocklist entries |
| `reputation-threat-intelligence` | [reputation-threat-intelligence.json](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/reputation-threat-intelligence.json) | `threat_category` | Threat intelligence feeds |
| `reputation-abuse-score` | reputation-abuse-score.json | `score` | Abuse reputation scores |

#### Example: Minimal Valid Blocklist Report

```json
{
  "xarf_version": "4.0.0",
  "report_id": "bl-123e4567-e89b-12d3-a456-426614174000",
  "timestamp": "2024-01-15T10:00:00Z",
  "reporter": {
    "org": "Blocklist Service",
    "contact": "reports@blocklist.org",
    "domain": "blocklist.org"
  },
  "sender": {
    "org": "Blocklist Service",
    "contact": "reports@blocklist.org",
    "domain": "blocklist.org"
  },
  "source_identifier": "192.0.2.200",
  "category": "reputation",
  "type": "blocklist",
  "blocklist_name": "SpamhausSBL"
}
```

**Blocklist-specific fields**:
- `blocklist_name` (required): Name of the blocklist
- `listing_reason` (optional): Why IP/domain was listed
- `listing_date` (optional): When it was listed
- `removal_info` (optional): Delisting instructions

### 7. Vulnerabilities (3 types)

Security vulnerabilities and misconfigurations.

| Content Type | Schema File | Required Fields | Description |
|--------------|-------------|-----------------|-------------|
| `vulnerability-cve` | [vulnerability-cve.json](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/vulnerability-cve.json) | `cve_id` | CVE-identified vulnerabilities |
| `vulnerability-open` | [vulnerability-open.json](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/vulnerability-open.json) | `service`, `port` | Open/exposed services |
| `vulnerability-misconfiguration` | [vulnerability-misconfiguration.json](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/vulnerability-misconfiguration.json) | `misconfiguration_type` | Security misconfigurations |

#### Example: Minimal Valid CVE Report

```json
{
  "xarf_version": "4.0.0",
  "report_id": "vuln-123e4567-e89b-12d3-a456-426614174000",
  "timestamp": "2024-01-15T09:00:00Z",
  "reporter": {
    "org": "Vulnerability Scan Service",
    "contact": "vulns@scanner.org",
    "domain": "scanner.org"
  },
  "sender": {
    "org": "Vulnerability Scan Service",
    "contact": "vulns@scanner.org",
    "domain": "scanner.org"
  },
  "source_identifier": "192.0.2.75",
  "category": "vulnerability",
  "type": "cve",
  "cve_id": "CVE-2021-41773"
}
```

**CVE-specific fields**:
- `cve_id` (required): CVE identifier (e.g., `CVE-2021-41773`)
- `cvss_score` (optional): CVSS score (0.0-10.0)
- `affected_product` (optional): Vulnerable product/version
- `exploit_available` (optional): Whether exploit exists
- `patch_available` (optional): Whether patch is available

## Schema Validation Tools

### Command-Line Tools

**Python - jsonschema**
```bash
pip install jsonschema
python -m jsonschema -i report.json schema.json
```

**Node.js - ajv-cli**
```bash
npm install -g ajv-cli
ajv validate -s xarf-v4-master.json -d report.json --spec=draft2020
```

**Go - gojsonschema**
```bash
go get github.com/xeipuuv/gojsonschema
```

### Libraries by Language

| Language | Library | Link |
|----------|---------|------|
| Python | jsonschema | [https://python-jsonschema.readthedocs.io/](https://python-jsonschema.readthedocs.io/) |
| JavaScript/Node.js | ajv | [https://ajv.js.org/](https://ajv.js.org/) |
| Java | everit-org/json-schema | [https://github.com/everit-org/json-schema](https://github.com/everit-org/json-schema) |
| Go | gojsonschema | [https://github.com/xeipuuv/gojsonschema](https://github.com/xeipuuv/gojsonschema) |
| PHP | justinrainbow/json-schema | [https://github.com/justinrainbow/json-schema](https://github.com/justinrainbow/json-schema) |
| Ruby | json-schema | [https://github.com/voxpupuli/json-schema](https://github.com/voxpupuli/json-schema) |
| C# | Newtonsoft.Json.Schema | [https://www.newtonsoft.com/jsonschema](https://www.newtonsoft.com/jsonschema) |

### Online Validation

**XARF Online Validator**: [https://xarf.org/validator/](/validator/)

Features:
- Paste JSON reports for instant validation
- Detailed error messages with field locations
- Example reports for each content type
- Schema version selection
- Export validation results

## Advanced Topics

### Custom Fields

XARF v4 allows custom fields via `additionalProperties: true`. Add organization-specific fields while maintaining schema compliance:

```json
{
  "xarf_version": "4.0.0",
  "report_id": "...",
  "category": "messaging",
  "type": "spam",
  "my_org_ticket_id": "ABUSE-12345",
  "my_org_priority": "high",
  "my_org_analyst": "john.doe"
}
```

**Best Practice**: Prefix custom fields with your organization name to avoid conflicts.

### Internal Metadata

Use the `_internal` field for operational metadata that should NEVER be transmitted:

```json
{
  "xarf_version": "4.0.0",
  "report_id": "...",
  "category": "content",
  "type": "phishing",
  "_internal": {
    "ticket": "ABUSE-1234",
    "analyst": "jane.smith",
    "priority": "critical",
    "sla_deadline": "2024-01-16T14:30:00Z",
    "ml_confidence": 0.94
  }
}
```

### Schema Versioning

XARF uses semantic versioning. The `xarf_version` field indicates which schema version to validate against:

- `4.0.0` - Initial XARF v4 release
- `4.1.0` - Minor enhancements, backward compatible
- `4.0.1` - Patch fixes, fully compatible

**Migration**: When XARF schemas are updated, existing reports remain valid if they comply with the base version's requirements.

## Validation Best Practices

1. **Validate Early**: Check reports immediately upon receipt before processing
2. **Provide Clear Errors**: Return specific validation errors to senders
3. **Log Validation Failures**: Track validation failures for debugging
4. **Use Strict Mode**: Enable all validation checks in your schema validator
5. **Cache Schemas**: Load schema files once and reuse the validator
6. **Test Edge Cases**: Validate against minimal and maximal valid reports
7. **Version Check**: Always verify `xarf_version` matches your supported versions

## Common Validation Errors

| Error | Cause | Fix |
|-------|-------|-----|
| Missing required property 'xarf_version' | Core field omitted | Add `xarf_version: "4.0.0"` |
| Invalid UUID format for report_id | Wrong UUID format | Use UUID v4 (e.g., `550e8400-e29b-41d4-a716-446655440000`) |
| Invalid date-time format | Timestamp not ISO 8601 | Use format: `2024-01-15T14:30:25Z` |
| Category 'content' requires 'url' field | Type-specific field missing | Add required field based on content type |
| Invalid enum value for 'category' | Typo or wrong category | Use valid category: `messaging`, `content`, `copyright`, etc. |
| source_port required when protocol=smtp | Conditional requirement not met | Add `source_port` field for SMTP reports |

## Next Steps

- **[Technical Specification](/docs/specification/)** - Complete XARF v4 technical details
- **[Common Fields Reference](/docs/common-fields/)** - Deep dive into core fields
- **[Content Type Examples](/docs/content-types/)** - Real-world example reports
- **[Best Practices](/docs/best-practices/)** - Guidelines for effective XARF implementation

## Questions?

- **GitHub Discussions**: [https://github.com/xarf/xarf-spec/discussions](https://github.com/xarf/xarf-spec/discussions)
- **Schema Issues**: [https://github.com/xarf/xarf-spec/issues](https://github.com/xarf/xarf-spec/issues)
- **Specification**: [https://github.com/xarf/xarf-spec](https://github.com/xarf/xarf-spec)

---

**Need Help?** Join the community on GitHub to ask questions, share implementations, and contribute to the XARF specification.
