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
  "xarf_version": "4.0.0",
  "report_id": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2024-01-15T14:00:00Z",
  "reporter": {
    "org": "Botnet Tracking Service",
    "contact": "botnet@security.example",
    "type": "automated"
  },
  "source_identifier": "192.0.2.88",
  "class": "infrastructure",
  "type": "botnet",

  "source_port": 35412,
  "evidence_source": "honeypot",
  "evidence": [
    {
      "content_type": "application/json",
      "description": "Botnet command traffic capture",
      "payload": "eyJjMl9zZXJ2ZXIiOiIxOTIuMC4yLjEwMCIsInBvcnQiOjg4ODh9"
    }
  ],
  "confidence": 0.96,

  "tags": ["botnet:mirai", "device:iot"],
  "description": "IoT device infected with Mirai botnet variant"
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
  "xarf_version": "4.0.0",
  "report_id": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2024-01-15T16:30:00Z",
  "reporter": {
    "org": "Threat Intelligence Platform",
    "contact": "intel@threat.example",
    "type": "automated"
  },
  "source_identifier": "198.51.100.150",
  "class": "infrastructure",
  "type": "compromised_server",

  "source_port": 443,
  "evidence_source": "threat_intelligence",
  "evidence": [
    {
      "content_type": "text/plain",
      "description": "C2 server communication logs",
      "payload": "QzIgc2VydmVyIGNvbW11bmljYXRpb24gZGV0ZWN0ZWQ="
    }
  ],
  "confidence": 0.93,

  "tags": ["compromise:c2_server", "malware:emotet"],
  "description": "Compromised web server acting as Emotet C2"
}
```

<a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/infrastructure-compromised-server.json" style="display:none">Schema</a>

</details>

---

## Related Documentation

- [Common Fields Reference]({{ site.baseurl }}/docs/common-fields/) - Detailed documentation of core XARF fields
- [Schema Reference]({{ site.baseurl }}/docs/schemas/) - JSON Schema validation documentation
- [All Event Types]({{ site.baseurl }}/docs/types/) - Browse other categories
