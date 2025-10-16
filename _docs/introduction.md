---
layout: docs
title: "Introduction to XARF"
description: "Learn about the eXtended Abuse Reporting Format (XARF) and why XARF v4 is the modern standard for structured abuse reporting"
permalink: /docs/introduction/
---

# Introduction to XARF

## What is XARF?

**XARF** (eXtended Abuse Reporting Format) is an open, structured format for reporting internet abuse. It provides a standardized, machine-readable way to communicate abuse incidents between networks, service providers, security teams, and abuse handling organizations.

Think of XARF as a universal language for abuse reporting. Instead of sending unstructured emails that require manual parsing, XARF reports contain all essential information in a consistent JSON format that can be automatically processed, validated, and acted upon.

### Real-World Scenario

**Without XARF:**
```
Subject: Abuse complaint - phishing site
Body: Hi, we found a phishing site at example.com/fake-bank
that's targeting our customers. Can you take it down?
Attached: screenshot.png
```
Manual parsing required. Time-consuming. Error-prone. No standardization.

**With XARF v4:**
```json
{
  "xarf_version": "4.0.0",
  "report_id": "550e8400-e29b-41d4-a716-446655440000",
  "content_type": "content-phishing",
  "timestamp": "2024-01-15T14:30:00Z",
  "reporter_info": {
    "organization": "Example Bank Security",
    "email": "abuse@examplebank.com"
  },
  "evidence": {
    "url": "https://example.com/fake-bank",
    "screenshot_hash": {
      "algorithm": "SHA256",
      "value": "abc123..."
    }
  }
}
```
Instant processing. Automated validation. Consistent structure. Actionable data.

## Why XARF v4?

XARF v4 represents a complete evolution of abuse reporting, designed for the challenges of the modern internet.

### Key Improvements Over Previous Formats

#### 🎯 **Comprehensive Coverage**
- **49 specialized content types** covering everything from phishing to CSAM to copyright infringement
- Detailed categorization ensures reports contain relevant, type-specific information
- Extensible design allows for future abuse types without breaking changes

#### 🔒 **Evidence-First Design**
- Built-in support for cryptographic hashes (SHA256, SHA512, MD5)
- Multiple hash values per evidence item for flexibility
- Evidence validation and integrity verification
- Support for various evidence types: URLs, IPs, files, screenshots, logs

#### 🚀 **Real-Time Processing**
- JSON format enables instant machine parsing
- Structured data eliminates manual interpretation
- Automated workflows from detection to resolution
- API-ready format for seamless integration

#### 📊 **Rich Context**
- Reporter reference IDs for tracking
- Timestamps with millisecond precision
- Priority levels for incident severity
- Custom metadata support via `reporter_custom_fields`

#### 🌍 **Global Standardization**
- Open specification with public schemas
- Language-agnostic format (JSON)
- International timestamp format (ISO 8601)
- Multi-language support for descriptions

#### 🔐 **Privacy by Design**
- Clear separation of evidence and PII
- Support for redacted information
- Configurable data retention guidance
- GDPR-friendly architecture

## Content Type Categories

XARF v4 organizes its 49 content types into 7 logical categories:

### 1. Connection-Based Abuse
Network-level attacks and suspicious connection patterns.

**Examples:** DDoS attacks, port scanning, brute force attempts, authentication failures

**Use when:** The abuse involves network connections, traffic patterns, or access attempts

**Content types:** `connection-ddos`, `connection-port-scan`, `connection-login-attack`, `connection-auth-failure`, `connection-brute-force`, `connection-ssh-attack`, `connection-rdp-attack`, `connection-ddos-amplification`

### 2. Content-Based Abuse
Malicious or harmful content hosted or distributed online.

**Examples:** Phishing sites, malware distribution, CSAM, NCII, fake shops, ransomware

**Use when:** The abuse involves hosted content, websites, or distributed files

**Content types:** `content-phishing`, `content-malware`, `content-csam`, `content-ncii`, `content-fake-shop`, `content-fraud`, `content-ransomware`, `content-cryptojacking`, `content-identity-theft`, `content-scam`, `content-impersonation`, `content-brand_infringement`, `content-data_leak`, `content-remote_compromise`, `content-suspicious_registration`

### 3. Copyright Violations
Intellectual property infringement and unauthorized distribution.

**Examples:** P2P file sharing, cyberlockers, streaming sites, counterfeit goods

**Use when:** The abuse involves copyright infringement or trademark violations

**Content types:** `copyright-p2p`, `copyright-cyberlocker`, `copyright-streaming`, `copyright-link-site`, `copyright-ugc-platform`, `copyright-usenet`, `copyright-copyright`, `copyright-counterfeit`

### 4. Infrastructure Abuse
Compromised or misused infrastructure and systems.

**Examples:** Botnet nodes, compromised servers, open proxies, C2 servers

**Use when:** The abuse involves compromised infrastructure or misused systems

**Content types:** `infrastructure-bot`, `infrastructure-compromised-server`, `infrastructure-proxy`, `infrastructure-vpn-abuse`, `infrastructure-mining`, `infrastructure-c2`

### 5. Messaging Abuse
Spam and abuse via messaging platforms and channels.

**Examples:** Email spam, SMS spam, social media spam, VoIP spam

**Use when:** The abuse involves messaging platforms, email, or communication channels

**Content types:** `messaging-spam`, `messaging-bulk-messaging`, `messaging-sms-spam`, `messaging-whatsapp-spam`, `messaging-social-spam`, `messaging-voip-spam`

### 6. Reputation & Intelligence
Threat intelligence, blocklists, and reputation data.

**Examples:** Known bad actors, threat feeds, reputation scores, blocklists

**Use when:** Sharing threat intelligence or reputation information

**Content types:** `reputation-blocklist`, `reputation-threat-intelligence`, `reputation-abuse-score`

### 7. Vulnerabilities
Security vulnerabilities and misconfigurations.

**Examples:** CVE reports, open services, security misconfigurations

**Use when:** Reporting security vulnerabilities or dangerous configurations

**Content types:** `vulnerability-cve`, `vulnerability-open`, `vulnerability-misconfiguration`

## Use Cases

### For Abuse Teams
- Automate report intake and processing
- Reduce manual parsing time by 90%+
- Standardize internal workflows
- Integrate with ticketing systems
- Track report outcomes consistently

### For Network Operators
- Receive actionable abuse reports
- Validate evidence cryptographically
- Prioritize incidents automatically
- Respond faster with structured data
- Reduce false positives

### For Security Vendors
- Share threat intelligence in standard format
- Integrate with SIEM and SOAR platforms
- Provide value-added abuse reporting services
- Enable automated takedowns
- Build ecosystem integrations

### For Law Enforcement
- Collect evidence with integrity verification
- Track cases with unique identifiers
- Maintain chain of custody
- Collaborate across jurisdictions
- Preserve data for legal proceedings

## How XARF v4 Works

### 1. Detection
An abuse incident is detected (automated scan, user report, threat feed, etc.)

### 2. Report Creation
The incident is structured into a XARF v4 JSON report with the appropriate `content_type`

### 3. Submission
The report is sent via email, API, or bulk file transfer to the responsible party

### 4. Validation
The recipient validates the report against the XARF v4 JSON schema

### 5. Processing
Automated systems parse the structured data and create tickets, block IPs, take down content, etc.

### 6. Response
Actions are taken based on the report content and tracked using the `report_id`

### 7. Feedback
Optional: Outcomes can be reported back using the `reporter_reference_id`

## Getting Started

Ready to implement XARF v4? Here's where to go next:

- **[Technical Specification](/docs/specification/)** - Complete XARF v4 spec with all 49 content types
- **[Common Fields Reference](/docs/common-fields/)** - Understanding the core XARF fields
- **[Content Type Examples](/docs/content-types/)** - Sample reports for each abuse type
- **[Schema Reference](/docs/schemas/)** - JSON schemas for validation
- **[Best Practices](/docs/best-practices/)** - Guidelines for effective reporting

## Community & Support

XARF is an open standard maintained by the community:

- **GitHub**: [github.com/xarf/xarf-spec](https://github.com/xarf/xarf-spec)
- **Discussions**: [github.com/xarf/xarf-spec/discussions](https://github.com/xarf/xarf-spec/discussions)
- **Issues**: Report bugs or request features on [GitHub Issues](https://github.com/xarf/xarf-spec/issues)

---

**Next:** [Technical Specification →](/docs/specification/)
