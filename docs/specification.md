---
layout: docs
title: "XARF v4 Technical Specification"
description: "Complete technical reference for the eXtended Abuse Reporting Format version 4"
---

# XARF v4 Technical Specification

## Overview

The eXtended Abuse Reporting Format (XARF) version 4 is a JSON-based standard for reporting cyber abuse incidents. It provides a structured, machine-readable format that enables automated processing and immediate response to security threats.

## Format Structure

### Core Fields

Every XARF v4 report contains these required fields:

| Field | Type | Description |
|-------|------|-------------|
| `xarf_version` | string | Version identifier (e.g., "4.0.0") |
| `report_id` | UUID | Unique report identifier |
| `timestamp` | ISO 8601 | When the incident occurred |
| `reporter` | object | Organization reporting the abuse |
| `source_identifier` | string | IP, domain, or other identifier |
| `category` | enum | One of 7 abuse categories |
| `type` | string | Specific abuse type within category |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `source_port` | integer | Source port (1-65535) |
| `evidence_source` | string | How evidence was obtained |
| `evidence` | array | Supporting evidence items |
| `tags` | array | Namespaced categorization tags |
| `confidence` | float | Confidence score (0.0-1.0) |
| `description` | string | Human-readable description |

## Abuse Classes

XARF v4 organizes all abuse reports into seven main classes:

### 1. Messaging Class
Communication-based abuse including spam, phishing emails, and bulk messaging.

**Event Types:**
- `spam` - Unsolicited bulk email
- `phishing` - Credential harvesting emails
- `bulk_messaging` - SMS/chat spam

### 2. Connection Class
Network-level attacks and intrusions.

**Event Types:**
- `ddos` - Distributed denial of service
- `port_scan` - Network reconnaissance
- `login_attack` - Brute force attempts
- `auth_failure` - Failed authentication
- `ip_spoofing` - IP address spoofing

### 3. Content Class (Enhanced)
Malicious web content and compromised sites.

**Event Types:**
- `phishing` - Phishing websites
- `malware` - Malware distribution
- `fraud` - Scam and fraud sites
- `brand_infringement` - Trademark violations
- `data_leak` - Exposed sensitive data
- `remote_compromise` - Compromised websites
- `suspicious_registration` - Newly registered suspicious domains

### 4. Infrastructure Class
Compromised systems and botnet activity.

**Event Types:**
- `bot` - Botnet member
- `compromised_server` - Hacked server
- `c2_server` - Command & control

### 5. Copyright Class
Intellectual property violations.

**Event Types:**
- `dmca` - DMCA violations
- `trademark` - Trademark infringement
- `p2p` - Peer-to-peer sharing
- `cyberlocker` - File hosting abuse

### 6. Vulnerability Class
Security vulnerabilities and misconfigurations.

**Event Types:**
- `cve` - CVE vulnerability reports
- `open_service` - Exposed services
- `misconfiguration` - Security misconfigs

### 7. Reputation Class
Threat intelligence and blocklist data.

**Event Types:**
- `blocklist` - Blocklist entries
- `threat_intelligence` - IOC data

## Evidence Handling

### Evidence Structure

```json
{
  "content_type": "mime/type",
  "description": "Human-readable description",
  "payload": "base64_encoded_data",
  "hash": "sha256:hexvalue",
  "size": 1234
}
```

### Supported Content Types

- `message/rfc822` - Email messages
- `text/plain` - Log files, text evidence
- `image/png` - Screenshots
- `image/jpeg` - Photos
- `application/pdf` - Documents
- `application/json` - Structured data
- `text/csv` - Tabular data
- `application/octet-stream` - Binary files

### Evidence Requirements by Class

| Class | Required Evidence |
|-------|------------------|
| Content (visual abuse) | Screenshot mandatory |
| Messaging | Full message with headers |
| Connection | Log entries or packet captures |
| Malware | File hash minimum, sample preferred |

## Tagging System

Tags use namespaced format: `namespace:value`

### Standard Namespaces

- `severity:` - Impact level (critical/high/medium/low)
- `attack:` - Attack vector or technique
- `target:` - Targeted brand or service
- `campaign:` - Campaign identifier
- `malware:` - Malware family
- `technique:` - MITRE ATT&CK technique

### Examples

```json
"tags": [
  "severity:critical",
  "attack:phishing",
  "target:paypal",
  "campaign:winter2025"
]
```

## DNS and Network Extensions

### DNS Records Structure

```json
"dns_records": {
  "a": ["192.0.2.1"],
  "aaaa": ["2001:db8::1"],
  "mx": ["mail.example.com"],
  "txt": ["v=spf1 include:example.com ~all"]
}
```

### WHOIS Data

```json
"whois": {
  "registrant": "John Doe",
  "created_date": "2025-01-15T00:00:00Z",
  "expiry_date": "2026-01-15T00:00:00Z",
  "registrar": "Example Registrar Inc.",
  "registrar_abuse_contact": "abuse@registrar.example"
}
```

### SSL Certificate

```json
"ssl_certificate": {
  "issuer": "Let's Encrypt",
  "subject": "example.com",
  "valid_from": "2025-01-01T00:00:00Z",
  "valid_to": "2025-04-01T00:00:00Z",
  "fingerprint": "sha256:hexvalue"
}
```

## Validation

### JSON Schema Validation

All reports must validate against the appropriate JSON schema:
- Core schema: `xarf-core.json`
- Base class schemas: `{class}-base.json`
- Type-specific schemas: `{class}-{type}.json`

### Business Rules

1. `timestamp` must not be in the future
2. `source_port` must be 1-65535 if present
3. `confidence` must be 0.0-1.0 if present
4. Evidence `size` must not exceed 5MB per item
5. Total evidence must not exceed 25MB
6. Tags must follow namespace:value format

### Cross-Field Validation

- If `class` is "content" and visual abuse, screenshot evidence required
- If `ssl_certificate` present, URL should use HTTPS
- If `source_port` present, protocol context required

## Backward Compatibility

### XARF v3 Migration

XARF v4 maintains backward compatibility with v3:

| v3 Field | v4 Mapping |
|----------|-----------|
| `report_type` | `class` + `type` |
| `date` | `timestamp` |
| `source_ip` | `source_identifier` |
| `attachment` | `evidence` array |

### Version Indicator

Reports converted from v3 include:
```json
"legacy_version": "3"
```

## Implementation Requirements

### Parser Requirements

1. Support all 7 classes and 28 event types
2. Validate against JSON schemas
3. Handle evidence encoding/decoding
4. Support tag parsing
5. Implement v3 compatibility

### Reporter Requirements

1. Generate valid UUIDs for report_id
2. Use ISO 8601 timestamps with timezone
3. Base64 encode evidence payloads
4. Calculate evidence hashes
5. Include mandatory evidence by type

## Security Considerations

1. **Evidence Sanitization** - Remove sensitive data before sharing
2. **Hash Verification** - Verify evidence integrity via hashes
3. **Size Limits** - Enforce maximum evidence sizes
4. **Input Validation** - Validate all fields against schemas
5. **Privacy** - Use `_internal` field for private metadata

## Example Reports

### Phishing Website Report

```json
{
  "xarf_version": "4.0.0",
  "report_id": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2025-01-16T10:30:00Z",
  "reporter": {
    "org": "Anti-Phishing Service",
    "contact": "abuse@antiphishing.example",
    "type": "automated"
  },
  "source_identifier": "203.0.113.45",
  "category": "content",
  "type": "phishing",
  "url": "https://secure-bank.example.com",
  "domain": "secure-bank.example.com",
  "target_brand": "Major Bank",
  "cloned_site": "https://www.majorbank.com",
  "credential_fields": ["username", "password"],
  "evidence": [{
    "content_type": "image/png",
    "description": "Screenshot of phishing page",
    "payload": "iVBORw0KGgoAAAANS..."
  }],
  "tags": ["severity:critical", "attack:phishing"]
}
```

### DDoS Attack Report

```json
{
  "xarf_version": "4.0.0",
  "report_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "timestamp": "2025-01-16T14:00:00Z",
  "reporter": {
    "org": "Network Security Team",
    "contact": "noc@isp.example",
    "type": "automated"
  },
  "source_identifier": "198.51.100.0/24",
  "category": "connection",
  "type": "ddos",
  "attack_type": "syn_flood",
  "destination_ip": "192.0.2.1",
  "destination_port": 443,
  "protocol": "tcp",
  "duration_minutes": 30,
  "peak_bandwidth_mbps": 1500,
  "evidence": [{
    "content_type": "text/csv",
    "description": "Flow analysis data",
    "payload": "base64_encoded_csv"
  }]
}
```

## References

- [JSON Schema Draft 2020-12](https://json-schema.org/draft/2020-12/schema)
- [RFC 3339 - Date and Time on the Internet](https://tools.ietf.org/html/rfc3339)
- [RFC 4122 - UUID](https://tools.ietf.org/html/rfc4122)
- [MIME Types](https://www.iana.org/assignments/media-types/media-types.xhtml)