---
layout: docs
title: "Reputation Category - Event Types"
description: "Complete reference for threat intelligence types including blocklists and IOCs"
permalink: /docs/types/reputation/
---

# Reputation Category

Threat intelligence data including blocklist entries and indicators of compromise (IOCs). Used by security vendors, threat intelligence platforms, and defensive security tools.

## Field Legend

- 🟠 **Mandatory** - MUST be present in all valid reports
- 🟢 **Recommended** - SHOULD be included when information is available
- 🔵 **Optional** - MAY be included for additional context

---

## blocklist

**Use Case**: Reports for adding sources to security blocklists. Used by threat intelligence feeds, firewall vendors, and security platforms to maintain lists of known malicious IPs, domains, or URLs for blocking.

<details class="sample-report" markdown="1">
<summary>
  <span class="sample-icon">{ }</span>
  <span class="sample-title">View Complete Sample</span>
  <svg class="expand-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M7 10l5 5 5-5z"/>
  </svg>
</summary>

```json
{
  "xarf_version": "4.0.0",
  "report_id": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2024-01-15T10:00:00Z",
  "reporter": {
    "org": "Threat Intelligence Platform",
    "contact": "intel@threatintel.example",
    "type": "automated"
  },
  "source_identifier": "192.0.2.150",
  "class": "reputation",
  "type": "blocklist",

  "source_port": 443,
  "evidence_source": "threat_intelligence",
  "evidence": [
    {
      "content_type": "application/json",
      "description": "Blocklist intelligence data",
      "payload": "eyJyZWFzb24iOiJtYWx3YXJlX2MyfQ=="
    }
  ],
  "confidence": 0.96,

  "tags": ["blocklist:malware_c2", "priority:high"],
  "description": "Malware C2 server - add to blocklist immediately"
}
```

<a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/reputation-blocklist.json" style="display:none">Schema</a>

</details>

---

## threat_intelligence

**Use Case**: Sharing of threat intelligence indicators of compromise (IOCs) including file hashes, C2 domains, malware signatures, and attack patterns. Used by security researchers, SOCs, and threat intelligence sharing communities (ISACs, FIRST, etc.).

<details class="sample-report" markdown="1">
<summary>
  <span class="sample-icon">{ }</span>
  <span class="sample-title">View Complete Sample</span>
  <svg class="expand-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M7 10l5 5 5-5z"/>
  </svg>
</summary>

```json
{
  "xarf_version": "4.0.0",
  "report_id": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2024-01-15T14:00:00Z",
  "reporter": {
    "org": "Security Research Lab",
    "contact": "research@seclab.example",
    "type": "manual"
  },
  "source_identifier": "198.51.100.75",
  "class": "reputation",
  "type": "threat_intelligence",

  "source_port": 8080,
  "evidence_source": "researcher_analysis",
  "evidence": [
    {
      "content_type": "application/json",
      "description": "IOC data package",
      "payload": "eyJpb2NzIjp7ImZpbGVfaGFzaCI6InNoYTI1Ni4uLiJ9fQ=="
    }
  ],
  "confidence": 0.98,

  "tags": ["ioc:malware_hash", "campaign:apt29"],
  "description": "APT29 campaign IOCs - file hashes and C2 infrastructure"
}
```

<a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/reputation-threat-intelligence.json" style="display:none">Schema</a>

</details>

---

## Related Documentation

- [Common Fields Reference]({{ site.baseurl }}/docs/common-fields/) - Detailed documentation of core XARF fields
- [Schema Reference]({{ site.baseurl }}/docs/schemas/) - JSON Schema validation documentation
- [All Event Types]({{ site.baseurl }}/docs/types/) - Browse other categories
