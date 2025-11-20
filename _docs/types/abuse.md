---
layout: docs
title: "Abuse Category - Event Types"
description: "Complete reference for direct malicious activities including DDoS, malware, phishing, spam, and port scanning"
permalink: /docs/types/abuse/
---

# Abuse Category

Direct malicious activities and attacks targeting systems, users, and infrastructure. This conceptual category groups together abuse-related report types that appear across multiple XARF classes.

## Field Legend

- 🟠 **Mandatory** - MUST be present in all valid reports
- 🟢 **Recommended** - SHOULD be included when information is available
- 🔵 **Optional** - MAY be included for additional context

---

## ddos

**Use Case**: Reports of Distributed Denial of Service attacks targeting system availability. Includes volumetric attacks (SYN floods, UDP floods, HTTP floods) and amplification/reflection attacks (DNS, NTP, memcached, SSDP). Used by ISPs, CDNs, and DDoS mitigation services to coordinate response, track attack sources, and identify misconfigured servers being used as amplifiers.

**Note**: This type uses `class: "connection"` in XARF v4.

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
  🟠 "xarf_version": "4.0.0",
  🟠 "report_id": "x4y5z6a7-b8c9-0123-xy45-67890wx12345",
  🟠 "timestamp": "2025-01-11T09:21:23Z",
  🟠 "reporter": {
    "org": "DDoS Protection Service",
    "contact": "ddos@protectionservice.net",
    "type": "automated"
  },
  🟠 "source_identifier": "192.0.2.155",
  🟠 "class": "connection",
  🟠 "type": "ddos",

  🟠 "protocol": "tcp",
  🟠 "first_seen": "2025-01-11T09:00:00Z",
  🟠 "source_port": 0,

  🟢 "evidence_source": "flow_analysis",
  🟢 "evidence": [
    {
      "content_type": "text/plain",
      "description": "DDoS attack flow analysis and statistics",
      "payload": "RERvUyBhdHRhY2sgZGV0ZWN0ZWQ6IDI1MEsgcHBzLCAxLjJHYnBzLCA0NSBtaW51dGVz",
      "hash": "4586a6802ae021fbda3f5a8923109d6c4469a0c36d2f46e3face6c297b1f24e8"
    }
  ],
  🔵 "confidence": 0.98,

  🔵 "destination_ip": "203.0.113.100",
  🔵 "destination_port": 80,
  🔵 "attack_vector": "syn_flood",
  🔵 "peak_pps": 250000,
  🔵 "peak_bps": 1200000000,
  🔵 "duration_seconds": 2700,
  🔵 "total_packets": 11250000,
  🔵 "total_bytes": 3240000000,
  🔵 "botnet_participation": true,
  🔵 "mitigation_applied": true,
  🔵 "service_impact": "degraded",
  🔵 "last_seen": "2025-01-11T09:20:00Z",
  🔵 "tags": ["attack:syn_flood", "volume:high", "mitigation:applied"],
  🔵 "description": "Large-scale SYN flood DDoS attack against web services"
}
```

<a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/connection-ddos.json" style="display:none">Schema</a>

</details>

---

## malware

**Use Case**: Reports of malware distribution, hosting, and command & control (C2) servers. Covers trojans, ransomware, droppers, loaders, backdoors, rootkits, infostealers, banking trojans, cryptominers, and other malicious software. Used by security researchers, malware analysis platforms, and network defenders to identify distribution points, block C2 communications, and coordinate takedowns.

**Note**: This type uses `class: "content"` in XARF v4.

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
  🟠 "xarf_version": "4.0.0",
  🟠 "report_id": "h8i9j0k1-l2m3-4567-hi89-01234gh56789",
  🟠 "timestamp": "2025-01-11T09:07:21Z",
  🟠 "reporter": {
    "org": "Malware Research Lab",
    "contact": "malware@security-research.org",
    "type": "automated"
  },
  🟠 "source_identifier": "192.0.2.75",
  🟠 "class": "content",
  🟠 "type": "malware",

  🟢 "url": "http://download-center.example.com/setup.exe",
  🟢 "evidence_source": "automated_scan",
  🟢 "evidence": [
    {
      "content_type": "application/octet-stream",
      "description": "Malicious executable sample (truncated for safety)",
      "payload": "TVqQAAMAAAAEAAAA//8AALgAAAAAAAAAQAAAAAA=",
      "hash": "sha256:deadbeefcafebabe1234567890abcdef1234567890abcdef1234567890abcdef"
    }
  ],
  🔵 "confidence": 0.97,

  🔵 "file_hash": "sha256:deadbeefcafebabe1234567890abcdef1234567890abcdef1234567890abcdef",
  🔵 "file_size": 2048576,
  🔵 "malware_family": "Trojan.Win32.Generic",
  🔵 "malware_type": "trojan",
  🔵 "detection_names": [
    "Trojan:Win32/Wacatac.B!ml",
    "Gen:Heur.Trojan.Script.1"
  ],
  🔵 "distribution_method": "direct_download",
  🔵 "targeted_platforms": ["windows"],
  🔵 "tags": ["malware:trojan", "platform:windows", "delivery:direct_download"],
  🔵 "description": "Trojan malware distributed via fake download site"
}
```

<a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/content-malware.json" style="display:none">Schema</a>

</details>

---

## phishing

**Use Case**: Reports of credential theft and phishing attacks. Covers fake login pages, credential harvesting sites, brand impersonation, and social engineering attacks designed to steal usernames, passwords, payment information, or personal data. Used by brand protection services, anti-phishing organizations, and security teams to coordinate takedowns and protect users.

**Note**: This type uses `class: "content"` in XARF v4.

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
  🟠 "xarf_version": "4.0.0",
  🟠 "report_id": "b2c3d4e5-f6g7-8901-bcde-f2345678901a",
  🟠 "timestamp": "2025-01-11T15:15:24Z",
  🟠 "reporter": {
    "org": "YBrandProtection",
    "contact": "takedown@ybrandprotection.com",
    "type": "automated"
  },
  🟠 "source_identifier": "203.0.113.45",
  🟠 "class": "content",
  🟠 "type": "phishing",

  🟢 "url": "http://secure-banking-login.example.com/auth",
  🟢 "evidence_source": "automated_scan",
  🟢 "evidence": [
    {
      "content_type": "image/png",
      "description": "Screenshot of phishing page mimicking bank login",
      "payload": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
      "hash": "6b7fa434f92a8b80aab02d9bf1a12e49ffcae424e4013a1c4f68b67e3d2bbcd0"
    },
    {
      "content_type": "text/html",
      "description": "Source code of phishing page",
      "payload": "PGh0bWw+PGhlYWQ+PHRpdGxlPlNlY3VyZSBCYW5raW5nIExvZ2luPC90aXRsZT48L2hlYWQ+",
      "hash": "ae9d634a3f01a120303e5e6f83b5308f105bc2de86a97089b47ff11b9494f0f7"
    }
  ],
  🔵 "confidence": 0.95,

  🔵 "target_brand": "Major Bank Corp",
  🔵 "file_hash": "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  🔵 "cloned_site": "https://www.majorbank.com",
  🔵 "credential_fields": ["username", "password", "pin"],
  🔵 "lure_type": "security_alert",
  🔵 "tags": ["target:banking", "technique:credential_harvesting", "severity:high"],
  🔵 "description": "Phishing site impersonating major bank to harvest credentials"
}
```

<a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/content-phishing.json" style="display:none">Schema</a>

</details>

---

## spam

**Use Case**: Reports of unsolicited bulk email and messaging spam. Covers commercial spam, phishing spam, malware delivery spam, and other unwanted messages sent via SMTP, SMS, messaging platforms, or social media. Used by email providers, spam filtering services, and network administrators to identify spam sources, improve filtering, and coordinate blocking.

**Note**: This type uses `class: "messaging"` in XARF v4.

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
  🟠 "xarf_version": "4.0.0",
  🟠 "report_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  🟠 "timestamp": "2025-01-11T10:59:45Z",
  🟠 "reporter": {
    "org": "Example Anti-Spam Service",
    "contact": "reports@antispam-service.example",
    "type": "automated"
  },
  🟠 "source_identifier": "192.168.1.100",
  🟠 "class": "messaging",
  🟠 "type": "spam",

  🟠 "protocol": "smtp",
  🟠 "smtp_from": "marketing@example.com",
  🟠 "source_port": 25,

  🟢 "subject": "Urgent: Claim Your Prize Now!",
  🟢 "evidence_source": "spamtrap",
  🟢 "evidence": [
    {
      "content_type": "message/rfc822",
      "description": "Complete spam email with headers",
      "payload": "UmVjZWl2ZWQ6IGZyb20gZXhhbXBsZS5jb20gKGV4YW1wbGUuY29tIFsxOTIuMTY4LjEuMTAwXSkKCVN1YmplY3Q6IFVyZ2VudDogQ2xhaW0gWW91ciBQcml6ZSBOb3chCglGcm9tOiBtYXJrZXRpbmdAZXhhbXBsZS5jb20=",
      "hash": "cee5863cbfe009a2560168a939bbced8d16eebafa97eb34d7b3b9d90f7bf1a17"
    }
  ],
  🔵 "confidence": 0.92,

  🔵 "smtp_to": "spamtrap@security.example",
  🔵 "sender_name": "Prize Notification Center",
  🔵 "message_id": "<abc123@example.com>",
  🔵 "recipient_count": 10000,
  🔵 "language": "en",
  🔵 "spam_indicators": {
    "suspicious_links": ["http://claim-prize.example.com"],
    "commercial_content": true,
    "bulk_characteristics": true
  },
  🔵 "tags": ["spam:commercial", "detection:automated", "language:english"],
  🔵 "description": "Commercial spam with prize notification lure"
}
```

<a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/messaging-spam.json" style="display:none">Schema</a>

</details>

---

## scanner

**Use Case**: Reports of port scanning and network probing activities. Covers reconnaissance via port scanning tools (nmap, masscan, zmap) and network enumeration. Indicates potential preparation for attacks, vulnerability assessment, or unauthorized network mapping. Used by network security teams to identify and block scanning sources before actual attacks occur.

**Note**: In XARF v4, port scanning uses `class: "connection"` with `type: "port_scan"`. For vulnerability scanning specifically, use `type: "vulnerability_scan"`.

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
  🟠 "xarf_version": "4.0.0",
  🟠 "report_id": "p1q2r3s4-t5u6-7890-pqrs-tu1234567890",
  🟠 "timestamp": "2025-01-11T12:00:00Z",
  🟠 "reporter": {
    "org": "Network Security Monitoring",
    "contact": "noc@example.com",
    "type": "automated"
  },
  🟠 "source_identifier": "192.0.2.99",
  🟠 "class": "connection",
  🟠 "type": "port_scan",

  🟠 "protocol": "tcp",
  🟠 "first_seen": "2025-01-11T11:55:00Z",
  🟠 "source_port": 52341,

  🟢 "evidence_source": "ids_detection",
  🟢 "evidence": [
    {
      "content_type": "application/json",
      "description": "IDS port scan detection log",
      "payload": "eyJzY2FuX3R5cGUiOiJTWU4iLCJwb3J0c19zY2FubmVkIjoxMDI0LCJkdXJhdGlvbl9zZWNvbmRzIjozMDB9"
    }
  ],
  🔵 "confidence": 0.96,

  🔵 "destination_ip": "203.0.113.75",
  🔵 "destination_port": 22,
  🔵 "scan_type": "tcp_syn",
  🔵 "ports_scanned": 1024,
  🔵 "scan_rate": 100,
  🔵 "duration_seconds": 300,
  🔵 "last_seen": "2025-01-11T12:00:00Z",
  🔵 "tags": ["scan:tcp_syn", "tool:nmap", "ports:common"],
  🔵 "description": "TCP SYN scan of common service ports"
}
```

<a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/connection-port-scan.json" style="display:none">Schema</a>

</details>

---

## Related Documentation

- [Connection Category]({{ site.baseurl }}/docs/types/connection/) - Network-level attacks including DDoS and port scanning
- [Content Category]({{ site.baseurl }}/docs/types/content/) - Content-based threats including malware and phishing
- [Messaging Category]({{ site.baseurl }}/docs/types/messaging/) - Message-based abuse including spam
- [Common Fields Reference]({{ site.baseurl }}/docs/common-fields/) - Detailed documentation of core XARF fields
- [Schema Reference]({{ site.baseurl }}/docs/schemas/) - JSON Schema validation documentation
- [All Event Types]({{ site.baseurl }}/docs/types/) - Browse all categories
