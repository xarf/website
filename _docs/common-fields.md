---
layout: docs
title: "Common Fields Reference"
description: "Understanding the core XARF v4 fields used across all content types"
permalink: /docs/common-fields/
---

# Common Fields Reference

This reference documents all common fields that appear in XARF v4 reports across all content types. These fields form the foundation of every XARF report, regardless of the specific abuse category or type.

## Quick Reference Table

| Field | Type | Level | Description |
|-------|------|-------|-------------|
| `xarf_version` | string | 🟠 Mandatory | XARF schema version |
| `report_id` | string | 🟠 Mandatory | Unique report identifier (UUID v4) |
| `class` | string | 🟠 Mandatory | Primary abuse category |
| `type` | string | 🟠 Mandatory | Specific abuse type within class |
| `timestamp` | string | 🟠 Mandatory | When the abuse occurred (ISO 8601) |
| `source_identifier` | string | 🟠 Mandatory | IP address, domain, or identifier of abuse source |
| `reporter` | object | 🟠 Mandatory | Reporting organization information |
| `source_port` | integer | 🟢 Recommended | Source port (critical for CGNAT) |
| `evidence` | array | 🟢 Recommended | Structured evidence items |
| `evidence_source` | string | 🟢 Recommended | Evidence quality indicator |
| `confidence` | number | 🟢 Recommended | Confidence score (0.0-1.0) |
| `tags` | array | 🔵 Optional | Namespaced categorization tags |
| `description` | string | 🔵 Optional | Human-readable incident description |
| `legacy_version` | string | 🔵 Optional | Original XARF version if converted from v3 |
| `_internal` | object | 🔵 Optional | Internal metadata (never transmitted) |

**Legend:**
- 🟠 **Mandatory**: MUST be present in all valid XARF v4 reports
- 🟢 **Recommended**: SHOULD be included when information is available
- 🔵 **Optional**: MAY be included for additional context

---

## Mandatory Fields

These fields MUST be present in all valid XARF v4 reports.

### xarf_version

**Type:** `string`
**Level:** 🟠 Mandatory
**Format:** Semantic versioning pattern `^4\.[0-9]+\.[0-9]+$`

The XARF schema version using semantic versioning. This field identifies which version of the XARF specification the report conforms to.

**Example Values:**
```json
"xarf_version": "4.0.0"
"xarf_version": "4.1.2"
"xarf_version": "4.6.1"
```

**Validation Rules:**
- Must follow semantic versioning
- Major version must be `4`
- Minor and patch versions must be non-negative integers
- Must match pattern: `^4\.[0-9]+\.[0-9]+$`

---

### report_id

**Type:** `string`
**Level:** 🟠 Mandatory
**Format:** UUID v4

A globally unique identifier for this specific report. Use this for deduplication, tracking, and correlation across systems.

**Example Values:**
```json
"report_id": "550e8400-e29b-41d4-a716-446655440000"
"report_id": "123e4567-e89b-12d3-a456-426614174000"
```

**Validation Rules:**
- Must be a valid UUID version 4
- Must be globally unique
- Recommended to use cryptographically secure random generation
- Used for tracking and correlation

**Best Practices:**
- Generate a new UUID for each report
- Store report_id in your ticketing system for correlation
- Use report_id for deduplication
- Include in follow-up communications

---

### class

**Type:** `string`
**Level:** 🟠 Mandatory
**Allowed Values:** `messaging`, `content`, `copyright`, `connection`, `vulnerability`, `infrastructure`, `reputation`

The primary abuse classification category. This determines which category-specific fields are available and validated.

**Example Values:**
```json
"class": "messaging"
"class": "content"
"class": "connection"
```

**Category Descriptions:**

| Class | Purpose | Examples |
|-------|---------|----------|
| `messaging` | Communication abuse | Spam, bulk messaging |
| `content` | Malicious web content | Phishing, malware, fraud, CSAM |
| `copyright` | IP infringement | P2P sharing, cyberlockers |
| `connection` | Network attacks | DDoS, port scanning, brute force |
| `vulnerability` | Security disclosures | CVEs, open services |
| `infrastructure` | Compromised systems | Bots, compromised servers |
| `reputation` | Threat intelligence | Blocklists, threat feeds |

**Validation Rules:**
- Must be one of the seven defined categories
- Case-sensitive (use lowercase)
- Determines which type-specific validation applies

---

### type

**Type:** `string`
**Level:** 🟠 Mandatory

The specific abuse type within the class. Valid values depend on the `class` field value.

**Example Values:**
```json
"type": "spam"           // when class=messaging
"type": "phishing"       // when class=content
"type": "ddos"          // when class=connection
"type": "bot"           // when class=infrastructure
```

**Common Types by Class:**

**Messaging:** `spam`, `bulk_messaging`

**Content:** `phishing`, `malware`, `fraud`, `csam`, `csem`, `ncii`, `fake_shop`, `identity_theft`, `scam`, `impersonation`, `ransomware`, `cryptojacking`

**Copyright:** `copyright`, `p2p`, `cyberlocker`, `streaming`, `link_site`, `ugc_platform`, `usenet`, `counterfeit`

**Connection:** `login_attack`, `port_scan`, `ddos`, `ddos_amplification`, `auth_failure`, `brute_force`, `ssh_attack`, `rdp_attack`

**Infrastructure:** `bot`, `compromised_server`, `proxy`, `vpn_abuse`, `mining`, `c2`

**Vulnerability:** `open`, `cve`, `misconfiguration`

**Reputation:** `blocklist`, `threat_intelligence`, `abuse_score`

**Validation Rules:**
- Must be a valid type for the specified class
- Case-sensitive (use lowercase with underscores)
- Determines type-specific required fields

---

### timestamp

**Type:** `string`
**Level:** 🟠 Mandatory
**Format:** ISO 8601 date-time

When the abuse incident occurred. Use ISO 8601 format with timezone (UTC recommended).

**Example Values:**
```json
"timestamp": "2024-01-15T14:30:25Z"
"timestamp": "2024-01-15T14:30:25.123Z"
"timestamp": "2024-01-15T14:30:25+00:00"
```

**Validation Rules:**
- Must be valid ISO 8601 format
- Must include timezone information
- Millisecond precision supported but optional
- Should represent when abuse occurred, not when report was generated

**Best Practices:**
- Use UTC timezone (Z suffix) when possible
- Include milliseconds for high-precision event correlation
- For ongoing incidents, use the first detection time
- For historical incidents, use the actual incident time

---

### source_identifier

**Type:** `string`
**Level:** 🟠 Mandatory

The IP address, domain, or other identifier of the abuse source. This is the primary identifier for determining who is responsible for addressing the abuse.

**Example Values:**
```json
"source_identifier": "192.0.2.1"
"source_identifier": "2001:db8::1"
"source_identifier": "example.com"
"source_identifier": "abuse-source.example.org"
```

**Validation Rules:**
- Must be a valid IP address (IPv4 or IPv6) or domain name
- Should be the actual source, not a proxy or intermediary
- For content abuse, typically the hosting IP or domain

**Best Practices:**
- Use IP address when available
- For web content, include both IP and domain when known
- Include WHOIS/ASN information in evidence when helpful
- For CGNAT environments, always include `source_port`

---

### reporter

**Type:** `object`
**Level:** 🟠 Mandatory

Information about the organization reporting this abuse incident. This object contains sub-fields for contact information and report generation metadata.

**Required Sub-fields:**

#### reporter.org

**Type:** `string`
**Level:** 🟠 Mandatory
**Max Length:** 200 characters

Name of the reporting organization.

**Example Values:**
```json
"org": "SpamCop"
"org": "Abusix"
"org": "Security Research Lab"
"org": "Example Bank Security Team"
```

#### reporter.contact

**Type:** `string`
**Level:** 🟠 Mandatory
**Format:** email

Contact email address for follow-up communication.

**Example Values:**
```json
"contact": "abuse@example.com"
"contact": "reports@security-org.net"
"contact": "noreply@automated-system.com"
```

**Validation Rules:**
- Must be valid email format (RFC 5322)
- Should be monitored inbox if follow-up expected
- Can be noreply address for automated reports

#### reporter.type

**Type:** `string`
**Level:** 🟠 Mandatory
**Allowed Values:** `automated`, `manual`, `unknown`

How this report was generated.

**Example Values:**
```json
"type": "automated"  // Generated by automated system
"type": "manual"     // Manually created by analyst
"type": "unknown"    // Generation method not specified
```

#### reporter.on_behalf_of

**Type:** `object`
**Level:** 🔵 Optional

Information about the organization on whose behalf this report is being sent. This is used when a reporting infrastructure provider (like Abusix) sends reports for another organization (like Swisscom).

**Use Case:** Infrastructure providers, MSSPs, and abuse reporting services that send reports on behalf of their clients.

**Sub-fields:**

##### reporter.on_behalf_of.org

**Type:** `string`
**Level:** 🟠 Mandatory (when on_behalf_of is present)
**Max Length:** 200 characters

Name of the organization being represented.

##### reporter.on_behalf_of.contact

**Type:** `string`
**Level:** 🟢 Recommended
**Format:** email

Contact email address for the represented organization.

**Complete Reporter Object Examples:**

**Standard Report:**
```json
"reporter": {
  "org": "Example Security",
  "contact": "abuse@example.com",
  "type": "automated"
}
```

**Report Sent On Behalf Of Another Organization:**
```json
"reporter": {
  "org": "Abusix",
  "contact": "reports@abusix.com",
  "type": "automated",
  "on_behalf_of": {
    "org": "Swisscom",
    "contact": "abuse@swisscom.ch"
  }
}
```

**Use Cases:**
- ISP abuse desks outsourcing report handling
- Managed Security Service Providers (MSSPs)
- Threat intelligence platforms reporting for customers
- National CERTs reporting for member organizations

---

## Recommended Fields

These fields SHOULD be included when the information is available to improve report utility.

### source_port

**Type:** `integer`
**Level:** 🟢 Recommended
**Range:** 1-65535

Source port number. Critical for identifying sources in CGNAT (Carrier-Grade NAT) environments where multiple customers share the same public IP address.

**Example Values:**
```json
"source_port": 25
"source_port": 80
"source_port": 443
"source_port": 3389
```

**Validation Rules:**
- Must be between 1 and 65535
- Integer only (no decimals)
- Required for accurate identification in CGNAT environments

**Best Practices:**
- **Always include for CGNAT environments** - Without port, ISP cannot identify customer
- Include for connection-based reports (DDoS, port scans, login attacks)
- Include for messaging reports (SMTP source port)
- Less critical for content-based reports but still valuable

**Why This Matters:**
In CGNAT environments, hundreds or thousands of customers may share a single public IP. The source port + timestamp is the ONLY way to identify which customer is responsible.

---

### evidence

**Type:** `array` of evidence objects
**Level:** 🟢 Recommended
**Max Items:** 50

Array of evidence items supporting this abuse report. Each evidence item contains proof of the abuse.

**Evidence Item Structure:**

Each evidence item is an object with the following fields:

#### content_type (mandatory in evidence)

**Type:** `string`
**Format:** MIME type

The MIME type of the evidence content.

**Common Values:**
- `text/plain` - Log entries, configuration files
- `text/csv` - Structured data exports
- `application/json` - JSON-formatted data
- `message/rfc822` - Complete email messages
- `image/png` - Screenshots (preferred for web content)
- `image/jpeg` - Photos, screenshots
- `text/html` - Webpage snapshots
- `application/pdf` - Reports, documentation
- `application/octet-stream` - Binary files, malware samples

#### payload (mandatory in evidence)

**Type:** `string`
**Format:** Base64-encoded

The actual evidence data, base64-encoded.

**Requirements:**
- Valid base64 encoding
- No line breaks or whitespace
- Maximum 5MB per evidence item
- Maximum 15MB total evidence per report

#### description (optional in evidence)

**Type:** `string`
**Max Length:** 500 characters

Human-readable description of this evidence item.

**Example Values:**
```json
"description": "Original spam email with headers"
"description": "Screenshot of phishing page"
"description": "Network flow analysis logs"
```

#### hash (optional in evidence)

**Type:** `string`
**Format:** `algorithm:hexvalue`

Hash of evidence for integrity verification.

**Supported Algorithms:** `md5`, `sha1`, `sha256`, `sha512`

**Example Values:**
```json
"hash": "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
"hash": "md5:d41d8cd98f00b204e9800998ecf8427e"
```

#### size (optional in evidence)

**Type:** `integer`
**Range:** 0 to 5,242,880 (5MB)

Size of evidence in bytes.

**Complete Evidence Array Example:**
```json
"evidence": [
  {
    "content_type": "image/png",
    "description": "Screenshot of phishing page",
    "payload": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJ...",
    "hash": "sha256:a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3",
    "size": 1024
  },
  {
    "content_type": "text/html",
    "description": "HTML source of phishing page",
    "payload": "PGh0bWw+PGhlYWQ+PHRpdGxlPkV4YW1wbGU8L3RpdGxlPjwvaGVhZD4..."
  }
]
```

**Best Practices:**
- Always include evidence when available
- For phishing: screenshot + HTML source
- For spam: complete RFC822 message with headers
- For malware: file hash at minimum, sample if safe to transmit
- For DDoS: flow analysis or packet capture samples
- Use SHA256 hashes for integrity
- Compress large text evidence before encoding

---

### evidence_source

**Type:** `string`
**Level:** 🟢 Recommended

Quality and reliability indicator for the evidence provided. Helps recipients assess trustworthiness.

**Common Values by Category:**

**Messaging:**
- `spamtrap` - Dedicated spam collection address
- `user_complaint` - Report from end user
- `automated_filter` - Spam filter detection
- `honeypot` - Honeypot collection system

**Content:**
- `crawler` - Web crawler detection
- `user_report` - User-submitted report
- `automated_scan` - Automated security scan
- `spam_analysis` - Analysis of spam URLs

**Connection:**
- `honeypot` - Honeypot/honeynet
- `firewall_logs` - Firewall activity logs
- `ids_detection` - Intrusion detection system
- `flow_analysis` - Network flow analysis

**Infrastructure/Vulnerability:**
- `vulnerability_scan` - Security scanner
- `researcher_analysis` - Security researcher
- `automated_discovery` - Automated discovery
- `traffic_analysis` - Traffic pattern analysis

**Reputation:**
- `threat_intelligence` - Threat intel feed
- `automated_analysis` - Automated analysis
- `researcher_analysis` - Expert analysis

**Example Values:**
```json
"evidence_source": "spamtrap"
"evidence_source": "honeypot"
"evidence_source": "automated_scan"
"evidence_source": "researcher_analysis"
```

**Best Practices:**
- Choose the most specific applicable value
- Higher quality sources = higher confidence
- Spamtraps and honeypots are high-confidence sources
- User complaints require more validation

---

### confidence

**Type:** `number`
**Level:** 🟢 Recommended
**Range:** 0.0 to 1.0

Confidence score for this report. Indicates how certain the reporter is that this is genuine abuse.

**Example Values:**
```json
"confidence": 0.85  // 85% confident
"confidence": 0.95  // 95% confident
"confidence": 1.0   // 100% confident
```

**Validation Rules:**
- Must be between 0.0 and 1.0 (inclusive)
- Decimal precision supported
- 0.0 = no confidence, 1.0 = complete confidence

**Confidence Guidelines:**

| Range | Meaning | Example |
|-------|---------|---------|
| 0.9 - 1.0 | Very High | Spamtrap hits, confirmed malware |
| 0.7 - 0.9 | High | Honeypot detection, automated scans |
| 0.5 - 0.7 | Medium | Heuristic detection, pattern matching |
| 0.3 - 0.5 | Low | User reports, uncertain detection |
| 0.0 - 0.3 | Very Low | Experimental detection, false positive likely |

**Best Practices:**
- Include confidence whenever possible
- Recipients can use for prioritization
- Automated systems: base on detection method reliability
- Manual reports: analyst assessment
- Factor in evidence quality and quantity

---

## Optional Fields

These fields MAY be included for additional context or specific use cases.

### tags

**Type:** `array` of strings
**Level:** 🔵 Optional
**Format:** Namespaced tags in format `namespace:value`
**Max Items:** 20

Namespaced tags for categorization, correlation, and automation. Tags enable flexible classification and filtering.

**Format:** `^[a-z0-9_]+:[a-z0-9_]+$` (lowercase alphanumeric and underscores only)

**Standard Namespaces:**

| Namespace | Purpose | Examples |
|-----------|---------|----------|
| `malware:` | Malware family | `malware:conficker`, `malware:emotet` |
| `campaign:` | Campaign tracking | `campaign:winter2024`, `campaign:fake_bank` |
| `cve:` | CVE references | `cve:CVE-2024-1234` |
| `botnet:` | Botnet identification | `botnet:mirai`, `botnet:necurs` |
| `severity:` | Severity level | `severity:critical`, `severity:high` |
| `confidence:` | Confidence level | `confidence:high`, `confidence:verified` |
| `tool:` | Reporting tool | `tool:spamassassin`, `tool:virustotal` |
| `target:` | Target identification | `target:financial`, `target:healthcare` |
| `attack:` | Attack type | `attack:syn_flood`, `attack:sql_injection` |
| `custom:` | Organization-specific | `custom:priority_1`, `custom:escalate` |

**Example Values:**
```json
"tags": ["malware:conficker", "campaign:winter2024"]
"tags": ["phishing:banking", "target:example_bank", "severity:high"]
"tags": ["attack:volumetric", "severity:critical"]
```

**Validation Rules:**
- Must follow pattern `namespace:value`
- Lowercase only
- Alphanumeric and underscores only
- Maximum 20 tags per report
- No spaces allowed

**Best Practices:**
- Use standard namespaces when applicable
- Create consistent custom namespaces for your organization
- Tags enable powerful filtering and automation
- Include severity and campaign tags for trending analysis
- Use for routing reports to appropriate teams

---

### description

**Type:** `string`
**Level:** 🔵 Optional
**Max Length:** 1000 characters

Human-readable description of the abuse incident. Provides context beyond structured fields.

**Example Values:**
```json
"description": "Spam email campaign targeting financial institutions"
"description": "DDoS attack against web services using SYN flood technique"
"description": "Phishing site impersonating Major Bank Corp login page"
```

**Best Practices:**
- Keep concise (under 1000 characters)
- Include context not captured in structured fields
- Useful for manual review
- Not required for automated processing
- Can include analyst notes or observations

---

### legacy_version

**Type:** `string`
**Level:** 🔵 Optional
**Allowed Values:** `"3"`

Indicates this report was converted from an older XARF version (currently only v3 supported).

**Example Values:**
```json
"legacy_version": "3"
```

**Usage:**
- Automatically added when v3 reports are converted to v4
- Helps track legacy report sources
- Recipients can adjust handling for converted reports
- Only appears on converted reports

---

### _internal

**Type:** `object`
**Level:** 🔵 Optional
**Structure:** Completely flexible, organization-defined

Internal operational metadata. This field is **NEVER transmitted** between systems - it's stripped before transmission.

**Key Principles:**
- Never transmitted between organizations
- Completely flexible structure
- No standardization required
- Use for operational workflows

**Example Use Cases:**

**Security Research Organization:**
```json
"_internal": {
  "threat_id": "THR-2024-001234",
  "honeypot_source": "trap_bank_001",
  "campaign_cluster": "fake_bank_wave_2024",
  "ml_confidence": 0.94,
  "analyst_reviewed": false
}
```

**ISP Abuse Department:**
```json
"_internal": {
  "ticket": "ABUSE-5678",
  "customer": "cust_premium_12345",
  "assigned_analyst": "john.doe",
  "sla_hours": 4,
  "auto_actions": ["temp_block", "customer_email"]
}
```

**Minimalist Approach:**
```json
"_internal": {
  "id": "internal_12345",
  "processed": "2024-01-15T14:30:25Z"
}
```

**Common Usage:**
- Workflow tracking (status, assignments)
- Integration data (ticket IDs, case references)
- Quality metrics (validation flags, review requirements)
- Business data (customer info, SLA tracking)
- Analysis data (campaign correlation, ML scores)

**Security Considerations:**
- May contain sensitive operational data
- Never log to external systems
- Access controls should apply
- Follow privacy regulations for customer data

---

## Complete Example Report

Here's a complete example showing all common fields together:

```json
{
  "xarf_version": "4.0.0",
  "report_id": "550e8400-e29b-41d4-a716-446655440000",
  "class": "content",
  "type": "phishing",
  "timestamp": "2024-01-15T14:30:25Z",
  "source_identifier": "203.0.113.45",
  "reporter": {
    "org": "Example Security",
    "contact": "abuse@example.com",
    "type": "automated"
  },
  "source_port": 443,
  "evidence_source": "crawler",
  "confidence": 0.95,
  "evidence": [
    {
      "content_type": "image/png",
      "description": "Screenshot of phishing page",
      "payload": "iVBORw0KGgoAAAANSUhEUg...",
      "hash": "sha256:a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3",
      "size": 2048
    }
  ],
  "tags": ["phishing:banking", "severity:high", "campaign:winter2024"],
  "description": "Phishing site targeting banking credentials",
  "_internal": {
    "ticket": "PHISH-2024-001",
    "analyst": "jane.smith"
  }
}
```

---

## Field Validation Summary

### Required Field Checklist

Before submitting a XARF v4 report, verify these mandatory fields are present:

- ✅ `xarf_version` - Schema version (e.g., "4.0.0")
- ✅ `report_id` - UUID v4 identifier
- ✅ `class` - Abuse category (messaging, content, etc.)
- ✅ `type` - Specific type within class
- ✅ `timestamp` - ISO 8601 timestamp with timezone
- ✅ `source_identifier` - IP, domain, or abuse source
- ✅ `reporter.org` - Organization name
- ✅ `reporter.contact` - Contact email
- ✅ `reporter.type` - Generation method (automated/manual/unknown)

### Recommended Field Checklist

Include these when information is available:

- ☑️ `source_port` - Critical for CGNAT environments
- ☑️ `evidence` - Proof of abuse
- ☑️ `evidence_source` - Evidence quality indicator
- ☑️ `confidence` - Confidence score (0.0-1.0)

### Common Validation Errors

**Invalid UUID:**
```json
// ❌ Wrong
"report_id": "not-a-valid-uuid"

// ✅ Correct
"report_id": "550e8400-e29b-41d4-a716-446655440000"
```

**Missing Timezone:**
```json
// ❌ Wrong
"timestamp": "2024-01-15T14:30:25"

// ✅ Correct
"timestamp": "2024-01-15T14:30:25Z"
```

**Invalid Tag Format:**
```json
// ❌ Wrong
"tags": ["Malware-Emotet", "severity HIGH"]

// ✅ Correct
"tags": ["malware:emotet", "severity:high"]
```

**Invalid Confidence Range:**
```json
// ❌ Wrong
"confidence": 95

// ✅ Correct
"confidence": 0.95
```

---

## Next Steps

- **[Content Type Examples](/docs/content-types/)** - See complete examples for each abuse type
- **[Technical Specification](/docs/specification/)** - Deep dive into XARF v4 spec
- **[Schema Reference](/docs/schemas/)** - JSON schemas for validation
- **[Best Practices](/docs/best-practices/)** - Guidelines for effective reporting

---

**Questions?** Join the discussion on [GitHub](https://github.com/xarf/xarf-spec/discussions) or review the [complete specification](/docs/specification/).
