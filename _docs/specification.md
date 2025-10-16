---
layout: docs
title: "Technical Specification"
description: "Complete XARF v4 specification with all 49 content types and field definitions"
permalink: /docs/specification/
---

# Technical Specification

<div class="version-selector">
  <label for="xarf-version">XARF Version:</label>
  <select id="xarf-version" onchange="window.location.href=this.value">
    <option value="/docs/specification/" selected>v4.0.0 (Current)</option>
  </select>
</div>

## Overview

XARF v4 is a comprehensive, JSON-based format for structured abuse reporting. This specification defines the complete schema, validation rules, field requirements, and all 49 content types organized into 7 categories.

**Key Features:**
- **49 specialized content types** covering modern internet abuse scenarios
- **7 logical categories** for easy classification and routing
- **Evidence-first design** with cryptographic validation support
- **Real-time processing** optimized for automated workflows
- **Backwards compatible** with XARF v3 reports

---

## Report Structure

### Top-Level Fields

All XARF v4 reports share this common structure:

<div class="field-category mandatory">
<strong>Mandatory Fields</strong> (must be present in all reports)
</div>

| Field | Type | Format | Description |
|-------|------|--------|-------------|
| `xarf_version` | string | `^4\.[0-9]+\.[0-9]+$` | XARF schema version (semantic versioning) |
| `report_id` | string | UUID v4 | Unique report identifier for tracking and deduplication |
| `timestamp` | string | ISO 8601 | When the abuse incident occurred (UTC recommended) |
| `reporter` | object | - | Information about the reporting organization |
| `source_identifier` | string | IP/domain | IP address, domain, or identifier of the abuse source |
| `content_type` | string | enum | Specific abuse type (format: `category-type`) |

<div class="field-category recommended">
<strong>Recommended Fields</strong> (should be included when available)
</div>

| Field | Type | Format | Description |
|-------|------|--------|-------------|
| `source_port` | integer | 1-65535 | Source port number (critical for CGNAT networks) |
| `evidence` | array | - | Structured evidence items with cryptographic validation |
| `evidence_source` | string | varies | Quality indicator (e.g., `spamtrap`, `honeypot`, `automated_scan`) |
| `reporter_reference_id` | string | - | Reporter's internal ticket/case ID for correlation |

<div class="field-category optional">
<strong>Optional Fields</strong> (may be included for additional context)
</div>

| Field | Type | Format | Description |
|-------|------|--------|-------------|
| `tags` | array | `namespace:value` | Categorization tags (e.g., `malware:emotet`, `campaign:2024q1`) |
| `confidence` | number | 0.0-1.0 | Confidence score for automated reports |
| `severity` | string | enum | Impact assessment (low, medium, high, critical) |
| `custom_fields` | object | - | Organization-specific data for internal workflows |

### Reporter Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `organization` | string | <span class="field-mandatory">Yes</span> | Reporting organization name |
| `email` | string | <span class="field-mandatory">Yes</span> | Contact email for follow-up |
| `type` | string | <span class="field-mandatory">Yes</span> | How report was generated: `automated`, `manual`, `unknown` |
| `reporter_reference_id` | string | <span class="field-recommended">Recommended</span> | Internal ticket/case ID for correlation |

### Evidence Item Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `content_type` | string | <span class="field-mandatory">Yes</span> | MIME type (e.g., `image/png`, `message/rfc822`, `text/plain`) |
| `payload` | string | <span class="field-mandatory">Yes</span> | Base64-encoded evidence data |
| `description` | string | <span class="field-recommended">Recommended</span> | Human-readable description of evidence |
| `hashes` | array | <span class="field-recommended">Recommended</span> | Array of cryptographic hashes (e.g., `["sha256:abc123", "md5:def456"]`) |
| `size` | integer | <span class="field-optional">Optional</span> | Size in bytes (pre-encoding) |

---

## Common Fields by Category

Different abuse categories require different context. Here are the category-specific fields:

### Connection Category Fields
<span class="field-mandatory">Mandatory:</span> `destination_ip`, `protocol`
<span class="field-recommended">Recommended:</span> `destination_port`, `attempt_count`, `service`
<span class="field-optional">Optional:</span> `username`, `packet_count`, `byte_count`, `attack_vector`

### Content Category Fields
<span class="field-mandatory">Mandatory:</span> `url`
<span class="field-recommended">Recommended:</span> `target_brand`, `file_hash`, `malware_family` (when type=malware)
<span class="field-optional">Optional:</span> `file_size`, `redirect_chain`, `victim_count`, `takedown_urgency`, `geolocation`, `device`, `user_agent`

### Copyright Category Fields
<span class="field-mandatory">Mandatory:</span> `work_title`, `rights_holder`
<span class="field-recommended">Recommended:</span> `infringing_url`, `work_identifier`, `torrent_hash`
<span class="field-optional">Optional:</span> `file_list`, `swarm_size`, `tracker_urls`

### Infrastructure Category Fields
<span class="field-recommended">Recommended:</span> `malware_family`, `c2_server`, `first_seen`, `last_seen`
<span class="field-optional">Optional:</span> `infection_vector`, `bot_id`, `compromised_service`

### Messaging Category Fields
<span class="field-mandatory">Mandatory:</span> `protocol`, `smtp_from` (when protocol=smtp), `subject` (when protocol=smtp)
<span class="field-recommended">Recommended:</span> `message_id`, `recipient`
<span class="field-optional">Optional:</span> `headers`, `body_hash`

### Reputation Category Fields
<span class="field-mandatory">Mandatory:</span> `threat_type`
<span class="field-recommended">Recommended:</span> `confidence_score`, `first_reported`, `sources`
<span class="field-optional">Optional:</span> `asn`, `geographic_location`, `threat_indicators`

### Vulnerability Category Fields
<span class="field-mandatory">Mandatory:</span> `service`
<span class="field-recommended">Recommended:</span> `service_version`, `cve_id`, `cvss_score`
<span class="field-optional">Optional:</span> `service_port`, `exploit_available`, `patch_available`, `cvss_vector`

---

## Content Type Categories

XARF v4 organizes its 49 content types into 7 logical categories:

### 1. Connection-Based Abuse (8 types)

Network-level attacks and suspicious connection patterns.

| Content Type | Description |
|-------------|-------------|
| `connection-ddos` | Distributed Denial of Service attacks |
| `connection-port-scan` | Network port scanning activity |
| `connection-login-attack` | Brute force login attempts (generic) |
| `connection-auth-failure` | Authentication failure patterns |
| `connection-brute-force` | Credential stuffing and brute force attacks |
| `connection-ssh-attack` | SSH-specific brute force attacks |
| `connection-rdp-attack` | RDP-specific brute force attacks |
| `connection-ddos-amplification` | DDoS amplification attacks (DNS, NTP, etc.) |

**Evidence sources:** `honeypot`, `firewall_logs`, `ids_detection`, `flow_analysis`

**Typical response:** Immediate blocking, rate limiting, IP reputation update

---

### 2. Content-Based Abuse (15 types)

Malicious or harmful content hosted or distributed online.

| Content Type | Description |
|-------------|-------------|
| `content-phishing` | Phishing sites impersonating legitimate brands |
| `content-malware` | Malware distribution sites and downloads |
| `content-csam` | Child Sexual Abuse Material (requires immediate action) |
| `content-ncii` | Non-Consensual Intimate Images |
| `content-fake-shop` | Fraudulent e-commerce sites |
| `content-fraud` | Generic online fraud and scams |
| `content-ransomware` | Ransomware distribution or payment sites |
| `content-cryptojacking` | Unauthorized cryptocurrency mining scripts |
| `content-identity-theft` | Identity theft and credential harvesting |
| `content-scam` | Investment scams, advance-fee fraud, etc. |
| `content-impersonation` | Brand or individual impersonation |
| `content-brand_infringement` | Trademark and brand abuse |
| `content-data_leak` | Exposed sensitive data repositories |
| `content-remote_compromise` | Remote access trojans and backdoors |
| `content-suspicious_registration` | Suspicious domain registrations |

**Evidence sources:** `crawler`, `user_report`, `automated_scan`, `spam_analysis`

**Typical response:** Content takedown, domain suspension, hosting provider notification

---

### 3. Copyright Violations (8 types)

Intellectual property infringement and unauthorized distribution.

| Content Type | Description |
|-------------|-------------|
| `copyright-p2p` | Peer-to-peer file sharing (BitTorrent, etc.) |
| `copyright-cyberlocker` | File hosting services with pirated content |
| `copyright-streaming` | Unauthorized streaming sites |
| `copyright-link-site` | Link aggregation sites for pirated content |
| `copyright-ugc-platform` | User-generated content platforms with infringement |
| `copyright-usenet` | Usenet newsgroup piracy |
| `copyright-copyright` | Generic copyright infringement (DMCA notices) |
| `copyright-counterfeit` | Counterfeit goods and trademark violations |

**Evidence sources:** `automated_scan`, `rights_holder_report`, `crawler`

**Typical response:** DMCA takedown, content removal, repeat infringer policy

---

### 4. Infrastructure Abuse (6 types)

Compromised or misused infrastructure and systems.

| Content Type | Description |
|-------------|-------------|
| `infrastructure-bot` | Botnet-infected systems |
| `infrastructure-compromised-server` | Compromised servers and web applications |
| `infrastructure-proxy` | Open proxies and anonymous proxy abuse |
| `infrastructure-vpn-abuse` | VPN service abuse |
| `infrastructure-mining` | Unauthorized cryptocurrency mining |
| `infrastructure-c2` | Command and Control (C2) servers |

**Evidence sources:** `traffic_analysis`, `researcher_analysis`, `automated_discovery`

**Typical response:** Client remediation, server hardening, service suspension

---

### 5. Messaging Abuse (6 types)

Spam and abuse via messaging platforms and channels.

| Content Type | Description |
|-------------|-------------|
| `messaging-spam` | Email spam (generic) |
| `messaging-bulk-messaging` | Bulk messaging campaigns |
| `messaging-sms-spam` | SMS/text message spam |
| `messaging-whatsapp-spam` | WhatsApp spam and abuse |
| `messaging-social-spam` | Social media spam (Facebook, Twitter, etc.) |
| `messaging-voip-spam` | VoIP spam calls (robocalls, vishing) |

**Evidence sources:** `spamtrap`, `user_complaint`, `automated_filter`, `honeypot`

**Typical response:** Email filtering, account suspension, reputation update

---

### 6. Reputation & Intelligence (3 types)

Threat intelligence, blocklists, and reputation data.

| Content Type | Description |
|-------------|-------------|
| `reputation-blocklist` | IP/domain blocklist entries |
| `reputation-threat-intelligence` | Threat intelligence indicators |
| `reputation-abuse-score` | Reputation scoring and assessment |

**Evidence sources:** `threat_intelligence`, `automated_analysis`, `researcher_analysis`

**Typical response:** Reputation update, threat feed integration, preventive blocking

---

### 7. Vulnerabilities (3 types)

Security vulnerabilities and misconfigurations.

| Content Type | Description |
|-------------|-------------|
| `vulnerability-cve` | CVE-identified vulnerabilities |
| `vulnerability-open` | Open services and ports |
| `vulnerability-misconfiguration` | Security misconfigurations |

**Evidence sources:** `vulnerability_scan`, `researcher_analysis`, `automated_discovery`

**Typical response:** Patch notification, security advisory, configuration review

---

## Sample JSON Reports

### Example 1: Phishing Report

```json
{
  "xarf_version": "4.0.0",
  "report_id": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2024-01-15T14:30:00Z",
  "content_type": "content-phishing",
  "reporter": {
    "organization": "Example Bank Security",
    "email": "abuse@examplebank.com",
    "type": "automated",
    "reporter_reference_id": "PHISH-2024-001"
  },
  "source_identifier": "192.0.2.100",
  "url": "https://fake-bank-login.example.com/login",
  "target_brand": "Example Bank",
  "evidence_source": "crawler",
  "evidence": [
    {
      "content_type": "image/png",
      "description": "Screenshot of phishing page",
      "payload": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB...",
      "hashes": [
        "sha256:abc123def456...",
        "md5:789ghi012jkl..."
      ]
    }
  ],
  "tags": ["phishing:banking", "severity:high"],
  "confidence": 0.95
}
```

### Example 2: DDoS Attack Report

```json
{
  "xarf_version": "4.0.0",
  "report_id": "123e4567-e89b-12d3-a456-426614174000",
  "timestamp": "2024-01-15T10:20:30Z",
  "content_type": "connection-ddos",
  "reporter": {
    "organization": "DDoS Protection Service",
    "email": "security@ddosprotect.com",
    "type": "automated",
    "reporter_reference_id": "DDOS-2024-789"
  },
  "source_identifier": "198.51.100.50",
  "source_port": 12345,
  "destination_ip": "203.0.113.100",
  "destination_port": 80,
  "protocol": "tcp",
  "packet_count": 50000,
  "byte_count": 75000000,
  "evidence_source": "flow_analysis",
  "evidence": [
    {
      "content_type": "text/plain",
      "description": "Network flow data showing attack pattern",
      "payload": "VGltZXN0YW1wLCBTcmNJUCwgRHN0SUAs...",
      "hashes": ["sha256:def789ghi012..."]
    }
  ],
  "tags": ["attack:volumetric", "severity:critical"],
  "confidence": 0.98
}
```

### Example 3: Email Spam Report

```json
{
  "xarf_version": "4.0.0",
  "report_id": "987fcdeb-51a2-43d1-9f12-345678901234",
  "timestamp": "2024-01-15T08:45:15Z",
  "content_type": "messaging-spam",
  "reporter": {
    "organization": "SpamCop",
    "email": "reports@spamcop.net",
    "type": "automated",
    "reporter_reference_id": "SC-2024-456"
  },
  "source_identifier": "192.0.2.75",
  "source_port": 25,
  "protocol": "smtp",
  "smtp_from": "spammer@bad-domain.example",
  "subject": "Buy cheap meds online!",
  "recipient": "spamtrap@example.org",
  "evidence_source": "spamtrap",
  "evidence": [
    {
      "content_type": "message/rfc822",
      "description": "Complete spam email with headers",
      "payload": "UmVjZWl2ZWQ6IGZyb20gWzE5Mi4wLjIu...",
      "hashes": ["sha256:ghi345jkl678..."]
    }
  ],
  "tags": ["spam:pharma", "severity:medium"],
  "confidence": 0.92
}
```

### Example 4: Malware Distribution Report

```json
{
  "xarf_version": "4.0.0",
  "report_id": "456789ab-cdef-1234-5678-90abcdef1234",
  "timestamp": "2024-01-15T16:00:00Z",
  "content_type": "content-malware",
  "reporter": {
    "organization": "Malware Analysis Lab",
    "email": "samples@malware-lab.org",
    "type": "automated",
    "reporter_reference_id": "MAL-2024-123"
  },
  "source_identifier": "203.0.113.200",
  "url": "http://malicious-site.example/download/trojan.exe",
  "malware_family": "emotet",
  "file_hash": "sha256:5d41402abc4b2a76b9719d911017c592",
  "file_size": 245760,
  "evidence_source": "automated_scan",
  "evidence": [
    {
      "content_type": "application/octet-stream",
      "description": "Password-protected malware sample (password: infected)",
      "payload": "UEsDBBQACQAIAA...",
      "hashes": [
        "md5:5d41402abc4b2a76b9719d911017c592",
        "sha1:2fd4e1c67a2d28fced849ee1bb76e7391b93eb12",
        "sha256:d7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592"
      ],
      "size": 245760
    }
  ],
  "tags": ["malware:emotet", "severity:critical"],
  "confidence": 0.99
}
```

### Example 5: Copyright Infringement Report

```json
{
  "xarf_version": "4.0.0",
  "report_id": "fedcba98-7654-3210-fedc-ba9876543210",
  "timestamp": "2024-01-15T12:30:00Z",
  "content_type": "copyright-p2p",
  "reporter": {
    "organization": "Copyright Protection Agency",
    "email": "dmca@copyright-protect.org",
    "type": "automated",
    "reporter_reference_id": "DMCA-2024-567"
  },
  "source_identifier": "198.51.100.150",
  "source_port": 6881,
  "work_title": "Popular Movie Title (2024)",
  "rights_holder": "Major Film Studio",
  "work_identifier": "IMDB:tt1234567",
  "torrent_hash": "info_hash:abcd1234ef567890",
  "swarm_size": 1250,
  "evidence_source": "automated_scan",
  "evidence": [
    {
      "content_type": "text/plain",
      "description": "BitTorrent peer list and metadata",
      "payload": "SW5mb0hhc2g6IGFiY2QxMjM0ZWY1Njc4...",
      "hashes": ["sha256:jkl901mno234..."]
    }
  ],
  "tags": ["copyright:film", "severity:medium"],
  "confidence": 0.94
}
```

### Example 6: Botnet Infection Report

```json
{
  "xarf_version": "4.0.0",
  "report_id": "321fedcb-9876-5432-10fe-dcba98765432",
  "timestamp": "2024-01-15T09:15:30Z",
  "content_type": "infrastructure-bot",
  "reporter": {
    "organization": "Botnet Research Group",
    "email": "research@botnet-watch.org",
    "type": "automated",
    "reporter_reference_id": "BOT-2024-890"
  },
  "source_identifier": "192.0.2.250",
  "malware_family": "mirai",
  "c2_server": "evil-c2.example.com",
  "first_seen": "2024-01-10T14:20:00Z",
  "last_seen": "2024-01-15T09:00:00Z",
  "evidence_source": "traffic_analysis",
  "evidence": [
    {
      "content_type": "text/plain",
      "description": "C2 communication logs",
      "payload": "Q29ubmVjdGlvbiB0byBldmlsLWMyLmV4...",
      "hashes": ["sha256:mno567pqr890..."]
    }
  ],
  "tags": ["botnet:mirai", "severity:high"],
  "confidence": 0.88
}
```

### Example 7: Vulnerability Report (CVE)

```json
{
  "xarf_version": "4.0.0",
  "report_id": "789abcde-f012-3456-7890-abcdef123456",
  "timestamp": "2024-01-15T11:00:00Z",
  "content_type": "vulnerability-cve",
  "reporter": {
    "organization": "Security Scanner Service",
    "email": "vulns@scanner-service.com",
    "type": "automated",
    "reporter_reference_id": "VULN-2024-345"
  },
  "source_identifier": "203.0.113.50",
  "service": "OpenSSL",
  "service_version": "1.0.1",
  "service_port": 443,
  "cve_id": "CVE-2014-0160",
  "cvss_score": 7.5,
  "cvss_vector": "CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N",
  "exploit_available": true,
  "patch_available": true,
  "evidence_source": "vulnerability_scan",
  "evidence": [
    {
      "content_type": "text/plain",
      "description": "Vulnerability scan results",
      "payload": "VnVsbmVyYWJpbGl0eSBEZXRhaWxzOiBIZWFy...",
      "hashes": ["sha256:pqr123stu456..."]
    }
  ],
  "tags": ["cve:CVE-2014-0160", "severity:high"],
  "confidence": 1.0
}
```

---

## Evidence Handling

### Supported Evidence Types

**Text Evidence:**
- `text/plain` - Log files, configuration dumps, command output
- `text/csv` - Structured data exports
- `application/json` - JSON-formatted data

**Message Evidence:**
- `message/rfc822` - Complete email messages with headers
- `text/email` - Email fragments

**Image Evidence:**
- `image/png` - Screenshots (preferred for web content)
- `image/jpeg` - Photos and screenshots
- `image/gif` - Animated content

**Document Evidence:**
- `application/pdf` - Reports and documentation
- `text/html` - Webpage snapshots

**Binary Evidence:**
- `application/octet-stream` - Malware samples, unknown binaries
- `application/zip` - Archive files (must be password-protected for malware)

### Evidence Size Limits

- **Per item:** Maximum 5MB
- **Total per report:** Maximum 15MB
- **Recommendation:** Compress large text evidence before encoding

### Evidence Best Practices

1. **Use cryptographic hashes** - Include SHA256 hashes for all evidence
2. **Provide descriptions** - Help recipients understand what they're looking at
3. **Screenshots for web content** - PNG format preferred over HTML
4. **Password-protect malware** - Use password "infected" for malware archives
5. **Include full headers** - For email spam, include complete RFC822 headers
6. **Base64 encode properly** - No line breaks, proper padding

---

## Validation Rules

### Format Validation

1. **report_id**: Must be valid UUID v4 format
2. **timestamp**: Must be ISO 8601 date-time with timezone
3. **email addresses**: Must be RFC 5322 compliant
4. **URLs**: Must be RFC 3986 compliant
5. **IP addresses**: Must be valid IPv4 or IPv6

### Field Requirements

1. **All reports**: Must include all mandatory fields
2. **Category-specific**: Must include category-specific mandatory fields
3. **Content types**: Must match pattern `category-type`
4. **Tags**: Must follow `namespace:value` pattern (lowercase alphanumeric and underscore)

### Evidence Validation

1. **Base64 encoding**: Must be valid base64 (RFC 4648)
2. **Size limits**: Individual items ≤ 5MB, total ≤ 15MB
3. **MIME types**: Must be valid and match actual content
4. **Hash format**: Must match `algorithm:hexvalue` pattern (e.g., `sha256:abc123`)

### Validation Modes

**Strict Mode:**
- Fail on unknown fields
- Require all mandatory + recommended fields
- Enforce strict format validation

**Standard Mode (Default):**
- Require all mandatory fields
- Warn on missing recommended fields
- Allow unknown fields for forward compatibility

**Permissive Mode:**
- Require only mandatory fields
- No warnings for missing recommended fields
- Suitable for gradual adoption

---

## Version Compatibility

XARF v4 parsers should support automatic conversion of XARF v3 reports for backwards compatibility. Key differences:

| XARF v3 | XARF v4 | Notes |
|---------|---------|-------|
| `Version` | `xarf_version` | Format: `4.0.0` |
| `ReporterInfo` | `reporter` | Restructured object |
| `Report.ReportType` | `content_type` | Changed to `category-type` format |
| `Report.SourceIp` | `source_identifier` | Supports IPs and domains |
| `Samples` | `evidence` | Enhanced structure with hashes |

---

## Additional Resources

- **[Common Fields Reference](/docs/common-fields/)** - Detailed field definitions
- **[Content Type Examples](/docs/content-types/)** - Sample reports for each type
- **[Schema Reference](/docs/schemas/)** - JSON schemas for validation
- **[Best Practices](/docs/best-practices/)** - Implementation guidelines

---

**Previous:** [← Introduction](/docs/introduction/)
**Next:** [Common Fields Reference →](/docs/common-fields/)

<style>
.version-selector {
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px;
  margin: 20px 0;
}

.version-selector label {
  font-weight: 600;
  margin-right: 10px;
}

.version-selector select {
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 14px;
}

.field-category {
  padding: 8px 12px;
  border-radius: 4px;
  margin: 15px 0 10px 0;
  font-size: 14px;
}

.field-category.mandatory {
  background-color: #fff3e0;
  border-left: 4px solid #ff9800;
}

.field-category.recommended {
  background-color: #e8f5e9;
  border-left: 4px solid #4caf50;
}

.field-category.optional {
  background-color: #e3f2fd;
  border-left: 4px solid #2196f3;
}

.field-mandatory {
  color: #ff9800;
  font-weight: 600;
}

.field-recommended {
  color: #4caf50;
  font-weight: 600;
}

.field-optional {
  color: #2196f3;
  font-weight: 600;
}
</style>
