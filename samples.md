---
layout: docs
title: "XARF Sample Reports"
description: "Real-world example XARF v4 reports for every abuse type."
permalink: /samples/
---

# XARF Sample Reports

Example XARF v4 reports — one for every category and type in the specification. Use them to see the shape of a valid report, test your parser, or as a starting point for your own generator.

All examples are maintained in the [`xarf-spec`](https://github.com/xarf/xarf-spec/tree/main/samples/v4) repository and validate against the [current v4 schemas](https://github.com/xarf/xarf-spec/tree/main/schemas/v4).

---

## Anatomy of a report

Every report shares a small core — `xarf_version`, `report_id`, `timestamp`, `reporter`, `source_identifier`, and the `category`/`type` pair that selects the type-specific fields — plus an `evidence` array carrying a representative sample (an email, a screenshot, a log excerpt).

### Messaging — spam

```json
{
  "xarf_version": "4.2.0",
  "report_id": "02eb480f-8172-431a-9276-c28ba90f694a",
  "timestamp": "2025-01-11T10:59:45Z",
  "reporter": {
    "org": "Example Anti-Spam Service",
    "contact": "reports@antispam-service.example",
    "domain": "antispam-service.example"
  },
  "sender": {
    "org": "Example Anti-Spam Service",
    "contact": "reports@antispam-service.example",
    "domain": "antispam-service.example"
  },
  "source_identifier": "192.168.1.100",
  "source_port": 25,
  "category": "messaging",
  "type": "spam",
  "evidence_source": "spamtrap",
  "protocol": "smtp",
  "smtp_from": "marketing@example.com",
  "subject": "Urgent: Claim Your Prize Now!",
  "evidence": [
    {
      "content_type": "message/rfc822",
      "description": "Complete spam email with headers",
      "payload": "UmVjZWl2ZWQ6IGZyb20gZXhhbXBsZS5jb20gKGV4YW1wbGUuY29tIFsxOTIuMTY4LjEuMTAwXSkKCVN1YmplY3Q6IFVyZ2VudDogQ2xhaW0gWW91ciBQcml6ZSBOb3chCglGcm9tOiBtYXJrZXRpbmdAZXhhbXBsZS5jb20=",
      "hash": "sha256:cee5863cbfe009a2560168a939bbced8d16eebafa97eb34d7b3b9d90f7bf1a17"
    }
  ],
  "tags": [
    "spam:commercial",
    "detection:automated",
    "language:english"
  ]
}
```

### Connection — login attack

```json
{
  "xarf_version": "4.2.0",
  "report_id": "dbf79f17-f4f4-4c22-ae58-19991f52a1e8",
  "timestamp": "2025-01-11T12:17:20Z",
  "reporter": {
    "org": "SSH Honeypot Network",
    "contact": "honeypot@ssh-monitor.example",
    "domain": "ssh-monitor.example"
  },
  "sender": {
    "org": "SSH Honeypot Network",
    "contact": "honeypot@ssh-monitor.example",
    "domain": "ssh-monitor.example"
  },
  "source_identifier": "198.51.100.77",
  "source_port": 45621,
  "category": "connection",
  "type": "login_attack",
  "evidence_source": "honeypot",
  "destination_ip": "203.0.113.22",
  "destination_port": 22,
  "protocol": "tcp",
  "service": "ssh",
  "attempt_count": 2847,
  "successful_logins": 0,
  "duration_minutes": 180,
  "username_patterns": [
    "admin",
    "root",
    "user",
    "test",
    "guest"
  ],
  "password_patterns": [
    "dictionary_attack",
    "common_passwords",
    "numeric_sequences"
  ],
  "attack_pattern": "brute_force",
  "threshold_exceeded": "2025-01-11T08:09:14Z",
  "evidence": [
    {
      "content_type": "text/plain",
      "description": "SSH authentication failure logs showing brute force pattern",
      "payload": "U1NIIGJydXRlIGZvcmNlIGF0dGFjayBkZXRlY3RlZDogMjg0NyBhdHRlbXB0cyBpbiAzIGhvdXJz",
      "hash": "sha256:ef3c219beff759f9e6e1fe8c1d7983ffbad5adf477714d7ec88f7dfa577b3504"
    }
  ],
  "tags": [
    "attack:brute_force",
    "service:ssh",
    "pattern:dictionary"
  ],
  "first_seen": "2025-01-11T06:17:20Z"
}
```

### Content — phishing

```json
{
  "xarf_version": "4.2.0",
  "report_id": "1a5ec293-0849-40a4-9eba-d5926262ff05",
  "timestamp": "2025-01-11T15:15:24Z",
  "reporter": {
    "org": "Brand Protection Service",
    "contact": "takedown@brand-protect.example",
    "domain": "brand-protect.example"
  },
  "sender": {
    "org": "Brand Protection Service",
    "contact": "takedown@brand-protect.example",
    "domain": "brand-protect.example"
  },
  "source_identifier": "203.0.113.45",
  "category": "content",
  "type": "phishing",
  "evidence_source": "automated_scan",
  "url": "http://secure-banking-login.example.com/auth",
  "target_brand": "Major Bank Corp",
  "file_hash": "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "evidence": [
    {
      "content_type": "image/png",
      "description": "Screenshot of phishing page mimicking bank login",
      "payload": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
      "hash": "sha256:6b7fa434f92a8b80aab02d9bf1a12e49ffcae424e4013a1c4f68b67e3d2bbcd0"
    },
    {
      "content_type": "text/html",
      "description": "Source code of phishing page",
      "payload": "PGh0bWw+PGhlYWQ+PHRpdGxlPlNlY3VyZSBCYW5raW5nIExvZ2luPC90aXRsZT48L2hlYWQ+",
      "hash": "sha256:ae9d634a3f01a120303e5e6f83b5308f105bc2de86a97089b47ff11b9494f0f7"
    }
  ],
  "tags": [
    "target:banking",
    "technique:credential_harvesting",
    "severity:high"
  ]
}
```

---

## Browse all 32 examples

One sample per type, grouped by category. Each links to the source file in the specification repository.

**Connection**  
- [`ddos`](https://github.com/xarf/xarf-spec/blob/main/samples/v4/connection-ddos.json)
- [`infected_host`](https://github.com/xarf/xarf-spec/blob/main/samples/v4/connection-infected-host.json)
- [`login_attack`](https://github.com/xarf/xarf-spec/blob/main/samples/v4/connection-login-attack.json)
- [`port_scan`](https://github.com/xarf/xarf-spec/blob/main/samples/v4/connection-port-scan.json)
- [`reconnaissance`](https://github.com/xarf/xarf-spec/blob/main/samples/v4/connection-reconnaissance.json)
- [`scraping`](https://github.com/xarf/xarf-spec/blob/main/samples/v4/connection-scraping.json)
- [`sql_injection`](https://github.com/xarf/xarf-spec/blob/main/samples/v4/connection-sql-injection.json)
- [`vulnerability_scan`](https://github.com/xarf/xarf-spec/blob/main/samples/v4/connection-vulnerability-scan.json)

**Content**  
- [`brand_infringement`](https://github.com/xarf/xarf-spec/blob/main/samples/v4/content-brand-infringement.json)
- [`csam`](https://github.com/xarf/xarf-spec/blob/main/samples/v4/content-csam.json)
- [`csem`](https://github.com/xarf/xarf-spec/blob/main/samples/v4/content-csem.json)
- [`exposed_data`](https://github.com/xarf/xarf-spec/blob/main/samples/v4/content-exposed-data.json)
- [`fraud`](https://github.com/xarf/xarf-spec/blob/main/samples/v4/content-fraud.json)
- [`malware`](https://github.com/xarf/xarf-spec/blob/main/samples/v4/content-malware.json)
- [`phishing`](https://github.com/xarf/xarf-spec/blob/main/samples/v4/content-phishing.json)
- [`remote_compromise`](https://github.com/xarf/xarf-spec/blob/main/samples/v4/content-remote-compromise.json)
- [`suspicious_registration`](https://github.com/xarf/xarf-spec/blob/main/samples/v4/content-suspicious-registration.json)

**Copyright**  
- [`copyright`](https://github.com/xarf/xarf-spec/blob/main/samples/v4/copyright-copyright.json)
- [`cyberlocker`](https://github.com/xarf/xarf-spec/blob/main/samples/v4/copyright-cyberlocker.json)
- [`link_site`](https://github.com/xarf/xarf-spec/blob/main/samples/v4/copyright-link-site.json)
- [`p2p`](https://github.com/xarf/xarf-spec/blob/main/samples/v4/copyright-p2p.json)
- [`ugc_platform`](https://github.com/xarf/xarf-spec/blob/main/samples/v4/copyright-ugc-platform.json)
- [`usenet`](https://github.com/xarf/xarf-spec/blob/main/samples/v4/copyright-usenet.json)

**Infrastructure**  
- [`botnet`](https://github.com/xarf/xarf-spec/blob/main/samples/v4/infrastructure-botnet.json)
- [`compromised_server`](https://github.com/xarf/xarf-spec/blob/main/samples/v4/infrastructure-compromised-server.json)

**Messaging**  
- [`bulk_messaging`](https://github.com/xarf/xarf-spec/blob/main/samples/v4/messaging-bulk-messaging.json)
- [`spam`](https://github.com/xarf/xarf-spec/blob/main/samples/v4/messaging-spam.json)

**Reputation**  
- [`blocklist`](https://github.com/xarf/xarf-spec/blob/main/samples/v4/reputation-blocklist.json)
- [`threat_intelligence`](https://github.com/xarf/xarf-spec/blob/main/samples/v4/reputation-threat-intelligence.json)

**Vulnerability**  
- [`cve`](https://github.com/xarf/xarf-spec/blob/main/samples/v4/vulnerability-cve.json)
- [`misconfiguration`](https://github.com/xarf/xarf-spec/blob/main/samples/v4/vulnerability-misconfiguration.json)
- [`open_service`](https://github.com/xarf/xarf-spec/blob/main/samples/v4/vulnerability-open-service.json)

---

Looking for the machine-readable set? Clone [`xarf-spec/samples/v4`](https://github.com/xarf/xarf-spec/tree/main/samples/v4) — 32 JSON files, one per type, all schema-valid.
