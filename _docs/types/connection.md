---
layout: docs
title: "Connection Category - Event Types"
description: "Complete reference for network-level attack types including DDoS, port scanning, and brute force"
permalink: /docs/types/connection/
---

# Connection Category

Network-level attacks and reconnaissance activities including DDoS, port scanning, brute force attacks, SQL injection, and automated bot activity.

## Field Legend

- 🟠 **Mandatory** - MUST be present in all valid reports
- 🟢 **Recommended** - SHOULD be included when information is available
- 🔵 **Optional** - MAY be included for additional context

---

## infected_host

**Use Case**: Reports of compromised systems participating in botnets or being remotely controlled for malicious activities. These infected hosts perform coordinated attacks like DDoS, spam distribution, click fraud, cryptocurrency mining, or credential stuffing. Used by network defenders, ISPs, and security teams to identify and remediate compromised systems.

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
  "timestamp": "2024-01-15T11:30:00Z",
  "reporter": {
    "org": "Botnet Tracking System",
    "contact": "abuse@bottracker.example",
    "type": "automated"
  },
  "source_identifier": "203.0.113.42",
  "class": "connection",
  "type": "infected_host",

  "protocol": "tcp",
  "bot_type": "ddos_bot",
  "first_seen": "2024-01-15T10:00:00Z",

  "source_port": 48291,
  "evidence_source": "botnet_monitoring",
  "evidence": [
    {
      "content_type": "application/octet-stream",
      "description": "Botnet C2 communication packet capture",
      "payload": "Q29tbWFuZCBhbmQgQ29udHJvbCBjb21tdW5pY2F0aW9uIGRldGVjdGVk"
    }
  ],
  "confidence": 0.95,

  "destination_ip": "198.51.100.10",
  "destination_port": 8080,
  "bot_name": "Mirai",
  "botnet_name": "Mirai_variant_2024",
  "c2_server": "malicious-c2.example.com",
  "attack_vector": "iot_compromise",
  "malware_family": "Mirai",
  "infection_method": "telnet_bruteforce",
  "last_seen": "2024-01-15T11:28:00Z",
  "tags": ["botnet:mirai", "device:iot", "severity:high"],
  "description": "Compromised IoT device participating in Mirai botnet DDoS activities"
}
```

<a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/connection-infected-host.json" style="display:none">Schema</a>

</details>

---

## ddos

**Use Case**: Reports of Distributed Denial of Service attacks including volumetric attacks (SYN floods, UDP floods, HTTP floods) and amplification/reflection attacks (DNS, NTP, memcached, SSDP). Used by ISPs, CDNs, and DDoS mitigation services to coordinate response, track attack sources, and identify misconfigured servers being used as amplifiers.

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
  "timestamp": "2024-01-15T16:55:42Z",
  "reporter": {
    "org": "DDoS Protection Service",
    "contact": "ddos@protectionservice.net",
    "type": "automated"
  },
  "source_identifier": "192.0.2.155",
  "class": "connection",
  "type": "ddos",

  "protocol": "tcp",
  "first_seen": "2024-01-15T16:00:00Z",
  "source_port": 34567,

  "evidence_source": "flow_analysis",
  "evidence": [
    {
      "content_type": "application/json",
      "description": "NetFlow data showing attack traffic",
      "payload": "eyJmbG93cyI6W3sic3JjIjoiMTkyLjAuMi4xNTUiLCJkc3QiOiIyMDMuMC4xMTMuMTAwIn1dfQ=="
    }
  ],
  "confidence": 0.98,

  "destination_ip": "203.0.113.100",
  "destination_port": 80,
  "attack_vector": "syn_flood",
  "peak_pps": 250000,
  "peak_bps": 1200000000,
  "duration_seconds": 2700,
  "service_impact": "degraded",
  "mitigation_applied": true,
  "last_seen": "2024-01-15T16:55:00Z",
  "tags": ["attack:syn_flood", "volume:high"],
  "description": "Large-scale SYN flood attack against web services"
}
```

<a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/connection-ddos.json" style="display:none">Schema</a>

</details>

---

## login_attack

**Use Case**: Reports of brute force login attempts, credential stuffing campaigns, password spraying attacks, and repeated authentication failures against authentication systems (SSH, RDP, web logins, API authentication). Used by system administrators and security teams to identify attack sources, protect user accounts, and identify compromised credentials.

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
  "timestamp": "2024-01-15T08:30:00Z",
  "reporter": {
    "org": "Web Security Service",
    "contact": "security@websec.example",
    "type": "automated"
  },
  "source_identifier": "192.0.2.67",
  "class": "connection",
  "type": "login_attack",

  "protocol": "tcp",
  "first_seen": "2024-01-15T08:00:00Z",
  "source_port": 45678,

  "evidence_source": "firewall_logs",
  "evidence": [
    {
      "content_type": "text/csv",
      "description": "Failed login attempt logs",
      "payload": "dGltZXN0YW1wLHVzZXJuYW1lLGlwCjIwMjQtMDEtMTUgMDg6MDA6MDAK"
    }
  ],
  "confidence": 0.97,

  "destination_ip": "203.0.113.50",
  "destination_port": 443,
  "last_seen": "2024-01-15T08:30:00Z",
  "tags": ["attack:credential_stuffing", "service:web"],
  "description": "Credential stuffing attack against web login"
}
```

<a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/connection-login-attack.json" style="display:none">Schema</a>

</details>

---

## port_scan

**Use Case**: Reports of network reconnaissance via port scanning (nmap, masscan, etc.). Indicates potential preparation for attacks, vulnerability assessment, or unauthorized network mapping. Used by network security teams to identify and block scanning sources.

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
  "timestamp": "2024-01-15T12:00:00Z",
  "reporter": {
    "org": "Network Security Monitoring",
    "contact": "noc@example.com",
    "type": "automated"
  },
  "source_identifier": "192.0.2.99",
  "class": "connection",
  "type": "port_scan",

  "protocol": "tcp",
  "first_seen": "2024-01-15T11:55:00Z",
  "source_port": 52341,

  "evidence_source": "ids_detection",
  "evidence": [
    {
      "content_type": "application/json",
      "description": "IDS port scan detection log",
      "payload": "eyJzY2FuX3R5cGUiOiJTWU4iLCJwb3J0c19zY2FubmVkIjoxMDI0fQ=="
    }
  ],
  "confidence": 0.96,

  "destination_ip": "203.0.113.75",
  "destination_port": 22,
  "last_seen": "2024-01-15T12:00:00Z",
  "tags": ["scan:tcp_syn", "tool:nmap"],
  "description": "TCP SYN scan of common service ports"
}
```

<a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/connection-port-scan.json" style="display:none">Schema</a>

</details>

---

## reconnaissance

**Use Case**: Reports of network reconnaissance activities beyond simple port scanning, including OS fingerprinting, service enumeration, and vulnerability probing. Indicates advanced threat actor activity and preparation for targeted attacks.

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
  "timestamp": "2024-01-15T15:00:00Z",
  "reporter": {
    "org": "Threat Intelligence Platform",
    "contact": "threats@example.com",
    "type": "automated"
  },
  "source_identifier": "192.0.2.111",
  "class": "connection",
  "type": "reconnaissance",

  "protocol": "tcp",
  "first_seen": "2024-01-15T14:30:00Z",
  "source_port": 41234,

  "evidence_source": "honeypot",
  "evidence": [
    {
      "content_type": "text/plain",
      "description": "Service enumeration attempts",
      "payload": "U2VydmljZSBiYW5uZXIgZ3JhYmJpbmcgZGV0ZWN0ZWQ="
    }
  ],
  "confidence": 0.93,

  "destination_ip": "203.0.113.90",
  "destination_port": 445,
  "last_seen": "2024-01-15T15:00:00Z",
  "tags": ["recon:os_fingerprint", "phase:pre_attack"],
  "description": "OS fingerprinting and service enumeration"
}
```

<a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/connection-reconnaissance.json" style="display:none">Schema</a>

</details>

---

## scraping

**Use Case**: Reports of excessive content scraping, data harvesting, and unauthorized automated data extraction from websites or APIs. Used to protect intellectual property, prevent data theft, and enforce terms of service.

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
  "timestamp": "2024-01-15T13:00:00Z",
  "reporter": {
    "org": "E-commerce Platform",
    "contact": "abuse@ecommerce.example",
    "type": "manual"
  },
  "source_identifier": "192.0.2.133",
  "class": "connection",
  "type": "scraping",

  "protocol": "tcp",
  "first_seen": "2024-01-15T12:00:00Z",
  "source_port": 50123,

  "evidence_source": "traffic_analysis",
  "evidence": [
    {
      "content_type": "application/json",
      "description": "Access logs showing scraping pattern",
      "payload": "eyJyZXF1ZXN0X2NvdW50IjoyNTAwMCwiaW50ZXJ2YWwiOiIxaG91ciJ9"
    }
  ],
  "confidence": 0.91,

  "destination_ip": "203.0.113.120",
  "destination_port": 443,
  "last_seen": "2024-01-15T13:00:00Z",
  "tags": ["scraping:product_data", "impact:high"],
  "description": "Automated scraping of product pricing data"
}
```

<a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/connection-scraping.json" style="display:none">Schema</a>

</details>

---

## sql_injection

**Use Case**: Reports of SQL injection attempts against web applications and APIs. Critical for identifying attack sources, protecting databases, and coordinating defensive responses across security teams.

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
  "timestamp": "2025-01-15T12:00:00Z",
  "reporter": {
    "org": "Web Application Firewall",
    "contact": "security@waf.example",
    "type": "automated"
  },
  "source_identifier": "192.0.2.45",
  "class": "connection",
  "type": "sql_injection",

  "protocol": "tcp",
  "first_seen": "2025-01-15T11:45:00Z",

  "source_port": 54789,
  "evidence_source": "firewall_logs",
  "evidence": [
    {
      "content_type": "text/plain",
      "description": "WAF blocked SQL injection attempts",
      "payload": "U1FMIGluamVjdGlvbiBkZXRlY3RlZDogJyBPUiAnMSc9JzE="
    }
  ],
  "confidence": 0.99,

  "destination_ip": "198.51.100.10",
  "destination_port": 443,
  "http_method": "GET",
  "target_url": "https://example.com/products.php?id=1",
  "injection_point": "query_parameter",
  "attack_technique": "union_based",
  "payload_sample": "' UNION SELECT username,password FROM users--",
  "attempts_count": 15,
  "last_seen": "2025-01-15T12:00:00Z",
  "tags": ["attack:sqli", "technique:union"],
  "description": "UNION-based SQL injection targeting user database"
}
```

<a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/connection-sql-injection.json" style="display:none">Schema</a>

</details>

---

## vulnerability_scan

**Use Case**: Reports of vulnerability scanning and automated exploit attempt activities using tools like Nmap, Masscan, Nikto, OpenVAS, Nessus, or web vulnerability scanners. Indicates unauthorized security assessment or preparation for exploitation. Used to distinguish between authorized and unauthorized scanning.

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
  "timestamp": "2024-01-15T17:00:00Z",
  "reporter": {
    "org": "Security Operations Center",
    "contact": "soc@example.com",
    "type": "automated"
  },
  "source_identifier": "192.0.2.178",
  "class": "connection",
  "type": "vulnerability_scan",

  "protocol": "tcp",
  "first_seen": "2024-01-15T16:30:00Z",
  "source_port": 35678,

  "evidence_source": "ids_detection",
  "evidence": [
    {
      "content_type": "application/json",
      "description": "Vulnerability scan detection signatures",
      "payload": "eyJzY2FubmVyIjoibmVzc3VzIiwidGFyZ2V0cyI6WyIqIl19"
    }
  ],
  "confidence": 0.94,

  "destination_ip": "203.0.113.150",
  "destination_port": 80,
  "last_seen": "2024-01-15T17:00:00Z",
  "tags": ["scan:vulnerability", "tool:nessus"],
  "description": "Unauthorized vulnerability scanning with Nessus"
}
```

<a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/connection-vulnerability-scan.json" style="display:none">Schema</a>

</details>

---

## Related Documentation

- [Common Fields Reference]({{ site.baseurl }}/docs/common-fields/) - Detailed documentation of core XARF fields
- [Schema Reference]({{ site.baseurl }}/docs/schemas/) - JSON Schema validation documentation
- [All Event Types]({{ site.baseurl }}/docs/types/) - Browse other categories
