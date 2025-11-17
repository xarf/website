---
layout: docs
title: "Infrastructure Category - Event Types"
description: "Complete reference for compromised infrastructure types including botnets and compromised servers"
permalink: /docs/types/infrastructure/
---

# Infrastructure Category

Compromised systems and malicious infrastructure including botnets, command & control servers, and compromised hosts being used for malicious activities.

## Field Legend

- 🟠 **Mandatory** - MUST be present in all valid reports
- 🟢 **Recommended** - SHOULD be included when information is available
- 🔵 **Optional** - MAY be included for additional context

---

## botnet

**Use Case**: Reports of systems participating in botnets (e.g., Mirai, Emotet, Conficker). Used by ISPs, security researchers, and botnet tracking organizations to identify infected devices and coordinate cleanup efforts.

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
  "xarf_version": "4.0.0",                                                       // 🟠 Mandatory
  "report_id": "550e8400-e29b-41d4-a716-446655440000",                           // 🟠 Mandatory
  "timestamp": "2024-01-15T14:00:00Z",                                           // 🟠 Mandatory
  "reporter": {                                                                 // 🟠 Mandatory
    "org": "Botnet Tracking Service",                                            // 🟠 Mandatory
    "contact": "botnet@security.example",                                        // 🟠 Mandatory
    "type": "automated"                                                         // 🟠 Mandatory
  },
  "source_identifier": "192.0.2.88",                                             // 🟠 Mandatory
  "class": "infrastructure",                                                     // 🟠 Mandatory
  "type": "botnet",                                                              // 🟠 Mandatory

  "source_port": 35412,                                                          // 🟢 Recommended
  "evidence_source": "honeypot",                                                 // 🟢 Recommended
  "evidence": [                                                                 // 🟢 Recommended
    {
      "content_type": "application/json",                                        // 🟠 Mandatory
      "description": "Botnet command traffic capture",                           // 🟢 Recommended
      "payload": "eyJjMl9zZXJ2ZXIiOiIxOTIuMC4yLjEwMCIsInBvcnQiOjg4ODh9"         // 🟠 Mandatory
    }
  ],
  "confidence": 0.96,                                                            // 🔵 Optional

  "tags": ["botnet:mirai", "device:iot"],                                        // 🔵 Optional
  "description": "IoT device infected with Mirai botnet variant"                // 🟢 Recommended
}
```

<a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/infrastructure-botnet.json" style="display:none">Schema</a>

</details>

---

## compromised_server

**Use Case**: Reports of compromised servers being used for malicious purposes including command & control, malware hosting, phishing, or spam relay. Used by hosting providers and system administrators to identify and remediate compromised infrastructure.

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
  "xarf_version": "4.0.0",                                                       // 🟠 Mandatory
  "report_id": "550e8400-e29b-41d4-a716-446655440000",                           // 🟠 Mandatory
  "timestamp": "2024-01-15T16:30:00Z",                                           // 🟠 Mandatory
  "reporter": {                                                                 // 🟠 Mandatory
    "org": "Threat Intelligence Platform",                                       // 🟠 Mandatory
    "contact": "intel@threat.example",                                           // 🟠 Mandatory
    "type": "automated"                                                         // 🟠 Mandatory
  },
  "source_identifier": "198.51.100.150",                                         // 🟠 Mandatory
  "class": "infrastructure",                                                     // 🟠 Mandatory
  "type": "compromised_server",                                                  // 🟠 Mandatory

  "source_port": 443,                                                            // 🟢 Recommended
  "evidence_source": "threat_intelligence",                                      // 🟢 Recommended
  "evidence": [                                                                 // 🟢 Recommended
    {
      "content_type": "text/plain",                                              // 🟠 Mandatory
      "description": "C2 server communication logs",                             // 🟢 Recommended
      "payload": "QzIgc2VydmVyIGNvbW11bmljYXRpb24gZGV0ZWN0ZWQ="                 // 🟠 Mandatory
    }
  ],
  "confidence": 0.93,                                                            // 🔵 Optional

  "tags": ["compromise:c2_server", "malware:emotet"],                            // 🔵 Optional
  "description": "Compromised web server acting as Emotet C2"                   // 🟢 Recommended
}
```

<a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/infrastructure-compromised-server.json" style="display:none">Schema</a>

</details>

---

## Related Documentation

- [Common Fields Reference]({{ site.baseurl }}/docs/common-fields/) - Detailed documentation of core XARF fields
- [Schema Reference]({{ site.baseurl }}/docs/schemas/) - JSON Schema validation documentation
- [All Event Types]({{ site.baseurl }}/docs/types/) - Browse other categories
