---
layout: docs
title: "Infrastructure Category - Event Types"
description: "Complete reference for compromised infrastructure types including botnets and compromised servers"
permalink: /docs/types/infrastructure/
---

# Infrastructure Category

Compromised systems and malicious infrastructure including botnets, command & control servers, and compromised hosts being used for malicious activities.

**Event Types**: 2

---

## botnet

**Use Case**: Reports of systems participating in botnets (e.g., Mirai, Emotet, Conficker). Used by ISPs, security researchers, and botnet tracking organizations to identify infected devices and coordinate cleanup efforts.

<details>
<summary>📋 View Complete Sample</summary>

```json
{
  "xarf_version": "4.0.0",                          // 🟠 Mandatory
  "report_id": "550e8400-e29b-41d4-a716-446655440000", // 🟠 Mandatory
  "timestamp": "2024-01-15T14:00:00Z",              // 🟠 Mandatory
  "reporter": {                                     // 🟠 Mandatory
    "org": "Botnet Tracking Service",
    "contact": "botnet@security.example",
    "type": "automated"
  },
  "source_identifier": "192.0.2.88",               // 🟠 Mandatory
  "class": "infrastructure",                        // 🟠 Mandatory
  "type": "botnet",                                 // 🟠 Mandatory

  "source_port": 35412,                             // 🟢 Recommended
  "evidence_source": "honeypot",                    // 🟢 Recommended
  "evidence": [                                     // 🟢 Recommended
    {
      "content_type": "application/json",
      "description": "Botnet command traffic capture",
      "payload": "eyJjMl9zZXJ2ZXIiOiIxOTIuMC4yLjEwMCIsInBvcnQiOjg4ODh9"
    }
  ],
  "confidence": 0.96,                               // 🟢 Recommended

  "tags": ["botnet:mirai", "device:iot"],           // 🔵 Optional
  "description": "IoT device infected with Mirai botnet variant" // 🔵 Optional
}
```

<button class="copy-btn" onclick="copyToClipboard(this)">📋 Copy to Clipboard</button>

**[View Schema on GitHub](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/infrastructure-botnet.json)**

</details>

---

## compromised_server

**Use Case**: Reports of compromised servers being used for malicious purposes including command & control, malware hosting, phishing, or spam relay. Used by hosting providers and system administrators to identify and remediate compromised infrastructure.

<details>
<summary>📋 View Complete Sample</summary>

```json
{
  "xarf_version": "4.0.0",                          // 🟠 Mandatory
  "report_id": "550e8400-e29b-41d4-a716-446655440000", // 🟠 Mandatory
  "timestamp": "2024-01-15T16:30:00Z",              // 🟠 Mandatory
  "reporter": {                                     // 🟠 Mandatory
    "org": "Threat Intelligence Platform",
    "contact": "intel@threat.example",
    "type": "automated"
  },
  "source_identifier": "198.51.100.150",           // 🟠 Mandatory
  "class": "infrastructure",                        // 🟠 Mandatory
  "type": "compromised_server",                     // 🟠 Mandatory

  "source_port": 443,                               // 🟢 Recommended
  "evidence_source": "threat_intelligence",         // 🟢 Recommended
  "evidence": [                                     // 🟢 Recommended
    {
      "content_type": "text/plain",
      "description": "C2 server communication logs",
      "payload": "QzIgc2VydmVyIGNvbW11bmljYXRpb24gZGV0ZWN0ZWQ="
    }
  ],
  "confidence": 0.93,                               // 🟢 Recommended

  "tags": ["compromise:c2_server", "malware:emotet"], // 🔵 Optional
  "description": "Compromised web server acting as Emotet C2" // 🔵 Optional
}
```

<button class="copy-btn" onclick="copyToClipboard(this)">📋 Copy to Clipboard</button>

**[View Schema on GitHub](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/infrastructure-compromised-server.json)**

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
