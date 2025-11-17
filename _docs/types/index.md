---
layout: docs
title: "Sample Reports"
description: "Complete reference of all XARF v4 event types with samples and real-world use cases"
permalink: /docs/types/
---

# Sample Reports

XARF v4 organizes abuse reports into **7 main categories**, each containing specific event types. This reference provides complete samples with field-level annotations showing mandatory, recommended, and optional fields.

## Quick Navigation

| Category | Event Types | Description |
|----------|-------------|-------------|
| [**messaging**]({{ site.baseurl }}/docs/types/messaging/) | 2 types | Email spam, SMS, chat, and other communication abuse |
| [**connection**]({{ site.baseurl }}/docs/types/connection/) | 8 types | Network attacks including DDoS, port scans, and brute force |
| [**content**]({{ site.baseurl }}/docs/types/content/) | 10 types | Malicious web content including phishing, malware, and fraud |
| [**infrastructure**]({{ site.baseurl }}/docs/types/infrastructure/) | 2 types | Compromised systems, botnets, and C2 infrastructure |
| [**copyright**]({{ site.baseurl }}/docs/types/copyright/) | 6 types | Intellectual property infringement and piracy |
| [**vulnerability**]({{ site.baseurl }}/docs/types/vulnerability/) | 3 types | Security vulnerabilities and misconfigurations |
| [**reputation**]({{ site.baseurl }}/docs/types/reputation/) | 2 types | Threat intelligence and blocklist data |

## Field Level Legend

All samples use the following notation to indicate field requirements:

- 🟠 **Mandatory** - MUST be present in all valid reports
- 🟢 **Recommended** - SHOULD be included when information is available
- 🔵 **Optional** - MAY be included for additional context

## How to Use This Reference

1. **Select a category** from the table above
2. **Browse event types** within that category
3. **Expand samples** to see complete annotated JSON
4. **Copy samples** using the clipboard button
5. **View schemas** on GitHub for validation rules

## Core Fields (All Types)

Every XARF v4 report, regardless of type, includes these core fields:

### Mandatory Core Fields
- `xarf_version` - XARF schema version (e.g., "4.0.0")
- `report_id` - Unique UUID v4 identifier
- `timestamp` - ISO 8601 timestamp of the incident
- `reporter` - Reporting organization information
- `source_identifier` - IP address, domain, or identifier of abuse source
- `class` - Primary abuse category
- `type` - Specific event type within the category

### Recommended Core Fields
- `source_port` - Source port number (critical for CGNAT environments)
- `evidence` - Array of evidence items
- `evidence_source` - Quality indicator for evidence
- `confidence` - Confidence score (0.0-1.0)

### Optional Core Fields
- `tags` - Namespaced categorization tags
- `description` - Human-readable incident description
- `legacy_version` - Original XARF version if converted from v3
- `_internal` - Internal metadata (never transmitted between systems)

For detailed field documentation, see [Common Fields Reference]({{ site.baseurl }}/docs/common-fields/).

## Category Details

Click on any category below to explore all event types with complete samples:

### [Messaging Category →]({{ site.baseurl }}/docs/types/messaging/)
Communication abuse including spam, phishing emails, and bulk messaging across various protocols (SMTP, SMS, WhatsApp, etc.)

### [Connection Category →]({{ site.baseurl }}/docs/types/connection/)
Network-level attacks and reconnaissance activities including DDoS, port scanning, brute force attacks, and SQL injection attempts

### [Content Category →]({{ site.baseurl }}/docs/types/content/)
Web-based abuse including phishing websites, malware distribution, fraud sites, defacement, and other malicious content

### [Infrastructure Category →]({{ site.baseurl }}/docs/types/infrastructure/)
Compromised systems and malicious infrastructure including botnets, command & control servers, and compromised hosts

### [Copyright Category →]({{ site.baseurl }}/docs/types/copyright/)
Intellectual property violations including DMCA notices, trademark infringement, and various forms of digital piracy

### [Vulnerability Category →]({{ site.baseurl }}/docs/types/vulnerability/)
Security vulnerabilities, misconfigurations, and open services that pose security risks

### [Reputation Category →]({{ site.baseurl }}/docs/types/reputation/)
Threat intelligence data including blocklist entries and indicators of compromise (IOCs)

## Additional Resources

- **[Common Fields Reference]({{ site.baseurl }}/docs/common-fields/)** - Detailed documentation of core XARF fields
- **[Schema Reference]({{ site.baseurl }}/docs/schemas/)** - JSON Schema validation documentation
- **[Implementation Guide]({{ site.baseurl }}/docs/)** - Best practices and deployment guidance
- **[GitHub Repository](https://github.com/xarf/xarf-spec)** - Access all schemas and samples
