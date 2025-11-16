---
layout: docs
title: "Reputation Category - Event Types"
description: "Complete reference for threat intelligence types including blocklists and IOCs"
permalink: /docs/types/reputation/
---

# Reputation Category

Threat intelligence data including blocklist entries and indicators of compromise (IOCs). Used by security vendors, threat intelligence platforms, and defensive security tools.

**Event Types**: 2

---

## blocklist

**Use Case**: Reports for adding sources to security blocklists. Used by threat intelligence feeds, firewall vendors, and security platforms to maintain lists of known malicious IPs, domains, or URLs for blocking.

<details markdown="1">
<summary>📋 View Complete Sample</summary>

```json
{
  "xarf_version": "4.0.0",                          // 🟠 Mandatory
  "report_id": "550e8400-e29b-41d4-a716-446655440000", // 🟠 Mandatory
  "timestamp": "2024-01-15T10:00:00Z",              // 🟠 Mandatory
  "reporter": {                                     // 🟠 Mandatory
    "org": "Threat Intelligence Platform",
    "contact": "intel@threatintel.example",
    "type": "automated"
  },
  "source_identifier": "192.0.2.150",              // 🟠 Mandatory
  "class": "reputation",                            // 🟠 Mandatory
  "type": "blocklist",                              // 🟠 Mandatory

  "source_port": 443,                               // 🟢 Recommended
  "evidence_source": "threat_intelligence",         // 🟢 Recommended
  "evidence": [                                     // 🟢 Recommended
    {
      "content_type": "application/json",
      "description": "Blocklist intelligence data",
      "payload": "eyJyZWFzb24iOiJtYWx3YXJlX2MyfQ=="
    }
  ],
  "confidence": 0.96,                               // 🟢 Recommended

  "tags": ["blocklist:malware_c2", "priority:high"], // 🔵 Optional
  "description": "Malware C2 server - add to blocklist immediately" // 🔵 Optional
}
```

**[View Schema on GitHub](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/reputation-blocklist.json)**

</details>

---

## threat_intelligence

**Use Case**: Sharing of threat intelligence indicators of compromise (IOCs) including file hashes, C2 domains, malware signatures, and attack patterns. Used by security researchers, SOCs, and threat intelligence sharing communities (ISACs, FIRST, etc.).

<details markdown="1">
<summary>📋 View Complete Sample</summary>

```json
{
  "xarf_version": "4.0.0",                          // 🟠 Mandatory
  "report_id": "550e8400-e29b-41d4-a716-446655440000", // 🟠 Mandatory
  "timestamp": "2024-01-15T14:00:00Z",              // 🟠 Mandatory
  "reporter": {                                     // 🟠 Mandatory
    "org": "Security Research Lab",
    "contact": "research@seclab.example",
    "type": "manual"
  },
  "source_identifier": "198.51.100.75",            // 🟠 Mandatory
  "class": "reputation",                            // 🟠 Mandatory
  "type": "threat_intelligence",                    // 🟠 Mandatory

  "source_port": 8080,                              // 🟢 Recommended
  "evidence_source": "researcher_analysis",         // 🟢 Recommended
  "evidence": [                                     // 🟢 Recommended
    {
      "content_type": "application/json",
      "description": "IOC data package",
      "payload": "eyJpb2NzIjp7ImZpbGVfaGFzaCI6InNoYTI1Ni4uLiJ9fQ=="
    }
  ],
  "confidence": 0.98,                               // 🟢 Recommended

  "tags": ["ioc:malware_hash", "campaign:apt29"],   // 🔵 Optional
  "description": "APT29 campaign IOCs - file hashes and C2 infrastructure" // 🔵 Optional
}
```

**[View Schema on GitHub](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/reputation-threat-intelligence.json)**

</details>

---

## Field Legend

- 🟠 **Mandatory** - MUST be present in all valid reports
- 🟢 **Recommended** - SHOULD be included when information is available
- 🔵 **Optional** - MAY be included for additional context

## Related Documentation

- [Common Fields Reference](/docs/common-fields/) - Detailed documentation of core XARF fields
- [Schema Reference](/docs/schemas/) - JSON Schema validation documentation
- [All Event Types](/docs/types/) - Browse other categories
