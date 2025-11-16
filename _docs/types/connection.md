---
layout: docs
title: "Connection Category - Event Types"
description: "Complete reference for network-level attack types including DDoS, port scanning, and brute force"
permalink: /docs/types/connection/
---

# Connection Category

Network-level attacks and reconnaissance activities including DDoS, port scanning, brute force attacks, SQL injection, and automated bot activity.

**Event Types**: 10

---

## auth_failure

**Use Case**: Reports of repeated authentication failures from a single source, typically indicating credential stuffing, dictionary attacks, or brute force attempts against authentication systems. Used by system administrators and security teams to identify and block attack sources.

<details markdown="1">
<summary>📋 View Complete Sample</summary>

```json
{
  "xarf_version": "4.0.0",                          // 🟠 Mandatory
  "report_id": "550e8400-e29b-41d4-a716-446655440000", // 🟠 Mandatory
  "timestamp": "2024-01-15T10:00:00Z",              // 🟠 Mandatory
  "reporter": {                                     // 🟠 Mandatory
    "org": "Corporate Security",
    "contact": "security@example.com",
    "type": "automated"
  },
  "source_identifier": "192.0.2.45",               // 🟠 Mandatory
  "class": "connection",                            // 🟠 Mandatory
  "type": "auth_failure",                           // 🟠 Mandatory

  "protocol": "tcp",                                // 🟠 Mandatory (type-specific)
  "first_seen": "2024-01-15T09:45:00Z",             // 🟠 Mandatory (type-specific)
  "source_port": 54321,                             // 🟠 Mandatory (when source_identifier is IP)

  "evidence_source": "firewall_logs",               // 🟢 Recommended
  "evidence": [                                     // 🟢 Recommended
    {
      "content_type": "text/plain",
      "description": "Authentication failure log entries",
      "payload": "MjAyNC0wMS0xNSAwOTo0NTowMCBBVVRIIEZBSUxVUkU6IHVzZXI9YWRtaW4="
    }
  ],
  "confidence": 0.95,                               // 🟢 Recommended

  "destination_ip": "203.0.113.100",                // 🔵 Optional
  "destination_port": 22,                           // 🔵 Optional
  "last_seen": "2024-01-15T10:00:00Z",              // 🔵 Optional
  "tags": ["attack:ssh_brute", "severity:medium"],  // 🔵 Optional
  "description": "Repeated SSH authentication failures" // 🔵 Optional
}
```

**[View Schema on GitHub](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/connection-auth-failure.json)**

</details>

---

## bot

**Use Case**: Reports of compromised computers participating in botnets for malicious activities. These infected systems are remotely controlled to perform coordinated attacks like DDoS, spam distribution, click fraud, cryptocurrency mining, or credential stuffing. Used by network defenders, ISPs, and security teams to identify and remediate infected hosts.

<details markdown="1">
<summary>📋 View Complete Sample</summary>

```json
{
  "xarf_version": "4.0.0",                          // 🟠 Mandatory
  "report_id": "550e8400-e29b-41d4-a716-446655440000", // 🟠 Mandatory
  "timestamp": "2024-01-15T11:30:00Z",              // 🟠 Mandatory
  "reporter": {                                     // 🟠 Mandatory
    "org": "Botnet Tracking System",
    "contact": "abuse@bottracker.example",
    "type": "automated"
  },
  "source_identifier": "203.0.113.42",             // 🟠 Mandatory
  "class": "connection",                            // 🟠 Mandatory
  "type": "bot",                                    // 🟠 Mandatory

  "protocol": "tcp",                                // 🟠 Mandatory (type-specific)
  "bot_type": "ddos_bot",                           // 🟠 Mandatory (type-specific)
  "first_seen": "2024-01-15T10:00:00Z",             // 🟠 Mandatory (type-specific)

  "source_port": 48291,                             // 🟢 Recommended
  "evidence_source": "botnet_monitoring",           // 🟢 Recommended
  "evidence": [                                     // 🟢 Recommended
    {
      "content_type": "application/octet-stream",
      "description": "Botnet C2 communication packet capture",
      "payload": "Q29tbWFuZCBhbmQgQ29udHJvbCBjb21tdW5pY2F0aW9uIGRldGVjdGVk"
    }
  ],
  "confidence": 0.95,                               // 🟢 Recommended

  "destination_ip": "198.51.100.10",                // 🔵 Optional
  "destination_port": 8080,                         // 🔵 Optional
  "bot_name": "Mirai",                              // 🔵 Optional
  "botnet_name": "Mirai_variant_2024",              // 🔵 Optional
  "c2_server": "malicious-c2.example.com",          // 🔵 Optional
  "attack_vector": "iot_compromise",                // 🔵 Optional
  "malware_family": "Mirai",                        // 🔵 Optional
  "infection_method": "telnet_bruteforce",          // 🔵 Optional
  "last_seen": "2024-01-15T11:28:00Z",              // 🔵 Optional
  "tags": ["botnet:mirai", "device:iot", "severity:high"], // 🔵 Optional
  "description": "Compromised IoT device participating in Mirai botnet DDoS activities" // 🔵 Optional
}
```

**[View Schema on GitHub](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/connection-bot.json)**

</details>

---

## ddos

**Use Case**: Reports of Distributed Denial of Service attacks including SYN floods, UDP floods, HTTP floods, and other volumetric attacks. Used by ISPs, CDNs, and DDoS mitigation services to coordinate response and track attack sources.

<details markdown="1">
<summary>📋 View Complete Sample</summary>

```json
{
  "xarf_version": "4.0.0",                          // 🟠 Mandatory
  "report_id": "550e8400-e29b-41d4-a716-446655440000", // 🟠 Mandatory
  "timestamp": "2024-01-15T16:55:42Z",              // 🟠 Mandatory
  "reporter": {                                     // 🟠 Mandatory
    "org": "DDoS Protection Service",
    "contact": "ddos@protectionservice.net",
    "type": "automated"
  },
  "source_identifier": "192.0.2.155",              // 🟠 Mandatory
  "class": "connection",                            // 🟠 Mandatory
  "type": "ddos",                                   // 🟠 Mandatory

  "protocol": "tcp",                                // 🟠 Mandatory (type-specific)
  "first_seen": "2024-01-15T16:00:00Z",             // 🟠 Mandatory (type-specific)
  "source_port": 34567,                             // 🟠 Mandatory (when source_identifier is IP)

  "evidence_source": "flow_analysis",               // 🟢 Recommended
  "evidence": [                                     // 🟢 Recommended
    {
      "content_type": "application/json",
      "description": "NetFlow data showing attack traffic",
      "payload": "eyJmbG93cyI6W3sic3JjIjoiMTkyLjAuMi4xNTUiLCJkc3QiOiIyMDMuMC4xMTMuMTAwIn1dfQ=="
    }
  ],
  "confidence": 0.98,                               // 🟢 Recommended

  "destination_ip": "203.0.113.100",                // 🔵 Optional
  "destination_port": 80,                           // 🔵 Optional
  "attack_vector": "syn_flood",                     // 🔵 Optional
  "peak_pps": 250000,                               // 🔵 Optional
  "peak_bps": 1200000000,                           // 🔵 Optional
  "duration_seconds": 2700,                         // 🔵 Optional
  "service_impact": "degraded",                     // 🔵 Optional
  "mitigation_applied": true,                       // 🔵 Optional
  "last_seen": "2024-01-15T16:55:00Z",              // 🔵 Optional
  "tags": ["attack:syn_flood", "volume:high"],      // 🔵 Optional
  "description": "Large-scale SYN flood attack against web services" // 🔵 Optional
}
```

**[View Schema on GitHub](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/connection-ddos.json)**

</details>

---

## ddos_amplification

**Use Case**: Reports of DDoS attacks using amplification techniques (DNS, NTP, memcached, SSDP) where attackers exploit publicly accessible services to amplify attack traffic. Critical for identifying misconfigured servers being used as amplifiers.

<details markdown="1">
<summary>📋 View Complete Sample</summary>

```json
{
  "xarf_version": "4.0.0",                          // 🟠 Mandatory
  "report_id": "550e8400-e29b-41d4-a716-446655440000", // 🟠 Mandatory
  "timestamp": "2024-01-15T14:00:00Z",              // 🟠 Mandatory
  "reporter": {                                     // 🟠 Mandatory
    "org": "ISP Security Team",
    "contact": "security@isp.example",
    "type": "automated"
  },
  "source_identifier": "192.0.2.88",               // 🟠 Mandatory
  "class": "connection",                            // 🟠 Mandatory
  "type": "ddos_amplification",                     // 🟠 Mandatory

  "protocol": "udp",                                // 🟠 Mandatory (type-specific)
  "first_seen": "2024-01-15T13:45:00Z",             // 🟠 Mandatory (type-specific)
  "source_port": 123,                               // 🟠 Mandatory (when source_identifier is IP)

  "evidence_source": "flow_analysis",               // 🟢 Recommended
  "evidence": [                                     // 🟢 Recommended
    {
      "content_type": "text/plain",
      "description": "NTP monlist request packets",
      "payload": "TlRQIG1vbmxpc3QgcmVxdWVzdCBkZXRlY3RlZCBmcm9tIDE5Mi4wLjIuODg="
    }
  ],
  "confidence": 0.94,                               // 🟢 Recommended

  "destination_ip": "203.0.113.200",                // 🔵 Optional
  "destination_port": 53,                           // 🔵 Optional
  "last_seen": "2024-01-15T14:00:00Z",              // 🔵 Optional
  "tags": ["attack:ntp_amplification", "open:ntp"], // 🔵 Optional
  "description": "NTP server being used as amplification vector" // 🔵 Optional
}
```

**[View Schema on GitHub](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/connection-ddos-amplification.json)**

</details>

---

## login_attack

**Use Case**: Reports of brute force login attempts, credential stuffing campaigns, and password spraying attacks against authentication systems (SSH, RDP, web logins, API authentication). Used to protect user accounts and identify compromised credentials.

<details markdown="1">
<summary>📋 View Complete Sample</summary>

```json
{
  "xarf_version": "4.0.0",                          // 🟠 Mandatory
  "report_id": "550e8400-e29b-41d4-a716-446655440000", // 🟠 Mandatory
  "timestamp": "2024-01-15T08:30:00Z",              // 🟠 Mandatory
  "reporter": {                                     // 🟠 Mandatory
    "org": "Web Security Service",
    "contact": "security@websec.example",
    "type": "automated"
  },
  "source_identifier": "192.0.2.67",               // 🟠 Mandatory
  "class": "connection",                            // 🟠 Mandatory
  "type": "login_attack",                           // 🟠 Mandatory

  "protocol": "tcp",                                // 🟠 Mandatory (type-specific)
  "first_seen": "2024-01-15T08:00:00Z",             // 🟠 Mandatory (type-specific)
  "source_port": 45678,                             // 🟠 Mandatory (when source_identifier is IP)

  "evidence_source": "firewall_logs",               // 🟢 Recommended
  "evidence": [                                     // 🟢 Recommended
    {
      "content_type": "text/csv",
      "description": "Failed login attempt logs",
      "payload": "dGltZXN0YW1wLHVzZXJuYW1lLGlwCjIwMjQtMDEtMTUgMDg6MDA6MDAK"
    }
  ],
  "confidence": 0.97,                               // 🟢 Recommended

  "destination_ip": "203.0.113.50",                 // 🔵 Optional
  "destination_port": 443,                          // 🔵 Optional
  "last_seen": "2024-01-15T08:30:00Z",              // 🔵 Optional
  "tags": ["attack:credential_stuffing", "service:web"], // 🔵 Optional
  "description": "Credential stuffing attack against web login" // 🔵 Optional
}
```

**[View Schema on GitHub](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/connection-login-attack.json)**

</details>

---

## port_scan

**Use Case**: Reports of network reconnaissance via port scanning (nmap, masscan, etc.). Indicates potential preparation for attacks, vulnerability assessment, or unauthorized network mapping. Used by network security teams to identify and block scanning sources.

<details markdown="1">
<summary>📋 View Complete Sample</summary>

```json
{
  "xarf_version": "4.0.0",                          // 🟠 Mandatory
  "report_id": "550e8400-e29b-41d4-a716-446655440000", // 🟠 Mandatory
  "timestamp": "2024-01-15T12:00:00Z",              // 🟠 Mandatory
  "reporter": {                                     // 🟠 Mandatory
    "org": "Network Security Monitoring",
    "contact": "noc@example.com",
    "type": "automated"
  },
  "source_identifier": "192.0.2.99",               // 🟠 Mandatory
  "class": "connection",                            // 🟠 Mandatory
  "type": "port_scan",                              // 🟠 Mandatory

  "protocol": "tcp",                                // 🟠 Mandatory (type-specific)
  "first_seen": "2024-01-15T11:55:00Z",             // 🟠 Mandatory (type-specific)
  "source_port": 52341,                             // 🟠 Mandatory (when source_identifier is IP)

  "evidence_source": "ids_detection",               // 🟢 Recommended
  "evidence": [                                     // 🟢 Recommended
    {
      "content_type": "application/json",
      "description": "IDS port scan detection log",
      "payload": "eyJzY2FuX3R5cGUiOiJTWU4iLCJwb3J0c19zY2FubmVkIjoxMDI0fQ=="
    }
  ],
  "confidence": 0.96,                               // 🟢 Recommended

  "destination_ip": "203.0.113.75",                 // 🔵 Optional
  "destination_port": 22,                           // 🔵 Optional
  "last_seen": "2024-01-15T12:00:00Z",              // 🔵 Optional
  "tags": ["scan:tcp_syn", "tool:nmap"],            // 🔵 Optional
  "description": "TCP SYN scan of common service ports" // 🔵 Optional
}
```

**[View Schema on GitHub](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/connection-port-scan.json)**

</details>

---

## reconnaissance

**Use Case**: Reports of network reconnaissance activities beyond simple port scanning, including OS fingerprinting, service enumeration, and vulnerability probing. Indicates advanced threat actor activity and preparation for targeted attacks.

<details markdown="1">
<summary>📋 View Complete Sample</summary>

```json
{
  "xarf_version": "4.0.0",                          // 🟠 Mandatory
  "report_id": "550e8400-e29b-41d4-a716-446655440000", // 🟠 Mandatory
  "timestamp": "2024-01-15T15:00:00Z",              // 🟠 Mandatory
  "reporter": {                                     // 🟠 Mandatory
    "org": "Threat Intelligence Platform",
    "contact": "threats@example.com",
    "type": "automated"
  },
  "source_identifier": "192.0.2.111",              // 🟠 Mandatory
  "class": "connection",                            // 🟠 Mandatory
  "type": "reconnaissance",                         // 🟠 Mandatory

  "protocol": "tcp",                                // 🟠 Mandatory (type-specific)
  "first_seen": "2024-01-15T14:30:00Z",             // 🟠 Mandatory (type-specific)
  "source_port": 41234,                             // 🟠 Mandatory (when source_identifier is IP)

  "evidence_source": "honeypot",                    // 🟢 Recommended
  "evidence": [                                     // 🟢 Recommended
    {
      "content_type": "text/plain",
      "description": "Service enumeration attempts",
      "payload": "U2VydmljZSBiYW5uZXIgZ3JhYmJpbmcgZGV0ZWN0ZWQ="
    }
  ],
  "confidence": 0.93,                               // 🟢 Recommended

  "destination_ip": "203.0.113.90",                 // 🔵 Optional
  "destination_port": 445,                          // 🔵 Optional
  "last_seen": "2024-01-15T15:00:00Z",              // 🔵 Optional
  "tags": ["recon:os_fingerprint", "phase:pre_attack"], // 🔵 Optional
  "description": "OS fingerprinting and service enumeration" // 🔵 Optional
}
```

**[View Schema on GitHub](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/connection-reconnaissance.json)**

</details>

---

## scraping

**Use Case**: Reports of excessive content scraping, data harvesting, and unauthorized automated data extraction from websites or APIs. Used to protect intellectual property, prevent data theft, and enforce terms of service.

<details markdown="1">
<summary>📋 View Complete Sample</summary>

```json
{
  "xarf_version": "4.0.0",                          // 🟠 Mandatory
  "report_id": "550e8400-e29b-41d4-a716-446655440000", // 🟠 Mandatory
  "timestamp": "2024-01-15T13:00:00Z",              // 🟠 Mandatory
  "reporter": {                                     // 🟠 Mandatory
    "org": "E-commerce Platform",
    "contact": "abuse@ecommerce.example",
    "type": "manual"
  },
  "source_identifier": "192.0.2.133",              // 🟠 Mandatory
  "class": "connection",                            // 🟠 Mandatory
  "type": "scraping",                               // 🟠 Mandatory

  "protocol": "tcp",                                // 🟠 Mandatory (type-specific)
  "first_seen": "2024-01-15T12:00:00Z",             // 🟠 Mandatory (type-specific)
  "source_port": 50123,                             // 🟠 Mandatory (when source_identifier is IP)

  "evidence_source": "traffic_analysis",            // 🟢 Recommended
  "evidence": [                                     // 🟢 Recommended
    {
      "content_type": "application/json",
      "description": "Access logs showing scraping pattern",
      "payload": "eyJyZXF1ZXN0X2NvdW50IjoyNTAwMCwiaW50ZXJ2YWwiOiIxaG91ciJ9"
    }
  ],
  "confidence": 0.91,                               // 🟢 Recommended

  "destination_ip": "203.0.113.120",                // 🔵 Optional
  "destination_port": 443,                          // 🔵 Optional
  "last_seen": "2024-01-15T13:00:00Z",              // 🔵 Optional
  "tags": ["scraping:product_data", "impact:high"], // 🔵 Optional
  "description": "Automated scraping of product pricing data" // 🔵 Optional
}
```

**[View Schema on GitHub](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/connection-scraping.json)**

</details>

---

## sql_injection

**Use Case**: Reports of SQL injection attempts against web applications and APIs. Critical for identifying attack sources, protecting databases, and coordinating defensive responses across security teams.

<details markdown="1">
<summary>📋 View Complete Sample</summary>

```json
{
  "xarf_version": "4.0.0",                          // 🟠 Mandatory
  "report_id": "550e8400-e29b-41d4-a716-446655440000", // 🟠 Mandatory
  "timestamp": "2025-01-15T12:00:00Z",              // 🟠 Mandatory
  "reporter": {                                     // 🟠 Mandatory
    "org": "Web Application Firewall",
    "contact": "security@waf.example",
    "type": "automated"
  },
  "source_identifier": "192.0.2.45",               // 🟠 Mandatory
  "class": "connection",                            // 🟠 Mandatory
  "type": "sql_injection",                          // 🟠 Mandatory

  "protocol": "tcp",                                // 🟠 Mandatory (type-specific)
  "first_seen": "2025-01-15T11:45:00Z",             // 🟠 Mandatory (type-specific)

  "source_port": 54789,                             // 🟢 Recommended
  "evidence_source": "firewall_logs",               // 🟢 Recommended
  "evidence": [                                     // 🟢 Recommended
    {
      "content_type": "text/plain",
      "description": "WAF blocked SQL injection attempts",
      "payload": "U1FMIGluamVjdGlvbiBkZXRlY3RlZDogJyBPUiAnMSc9JzE="
    }
  ],
  "confidence": 0.99,                               // 🟢 Recommended

  "destination_ip": "198.51.100.10",                // 🔵 Optional
  "destination_port": 443,                          // 🔵 Optional
  "http_method": "GET",                             // 🔵 Optional
  "target_url": "https://example.com/products.php?id=1", // 🔵 Optional
  "injection_point": "query_parameter",             // 🔵 Optional
  "attack_technique": "union_based",                // 🔵 Optional
  "payload_sample": "' UNION SELECT username,password FROM users--", // 🔵 Optional
  "attempts_count": 15,                             // 🔵 Optional
  "last_seen": "2025-01-15T12:00:00Z",              // 🔵 Optional
  "tags": ["attack:sqli", "technique:union"],       // 🔵 Optional
  "description": "UNION-based SQL injection targeting user database" // 🔵 Optional
}
```

**[View Schema on GitHub](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/connection-sql-injection.json)**

</details>

---

## vuln_scanning

**Use Case**: Reports of vulnerability scanning activities using tools like Nessus, OpenVAS, or custom scanners. Indicates unauthorized security assessment or preparation for exploitation. Used to distinguish between authorized and unauthorized scanning.

<details markdown="1">
<summary>📋 View Complete Sample</summary>

```json
{
  "xarf_version": "4.0.0",                          // 🟠 Mandatory
  "report_id": "550e8400-e29b-41d4-a716-446655440000", // 🟠 Mandatory
  "timestamp": "2024-01-15T17:00:00Z",              // 🟠 Mandatory
  "reporter": {                                     // 🟠 Mandatory
    "org": "Security Operations Center",
    "contact": "soc@example.com",
    "type": "automated"
  },
  "source_identifier": "192.0.2.178",              // 🟠 Mandatory
  "class": "connection",                            // 🟠 Mandatory
  "type": "vuln_scanning",                          // 🟠 Mandatory

  "protocol": "tcp",                                // 🟠 Mandatory (type-specific)
  "first_seen": "2024-01-15T16:30:00Z",             // 🟠 Mandatory (type-specific)
  "source_port": 35678,                             // 🟠 Mandatory (when source_identifier is IP)

  "evidence_source": "ids_detection",               // 🟢 Recommended
  "evidence": [                                     // 🟢 Recommended
    {
      "content_type": "application/json",
      "description": "Vulnerability scan detection signatures",
      "payload": "eyJzY2FubmVyIjoibmVzc3VzIiwidGFyZ2V0cyI6WyIqIl19"
    }
  ],
  "confidence": 0.94,                               // 🟢 Recommended

  "destination_ip": "203.0.113.150",                // 🔵 Optional
  "destination_port": 80,                           // 🔵 Optional
  "last_seen": "2024-01-15T17:00:00Z",              // 🔵 Optional
  "tags": ["scan:vulnerability", "tool:nessus"],    // 🔵 Optional
  "description": "Unauthorized vulnerability scanning with Nessus" // 🔵 Optional
}
```

**[View Schema on GitHub](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/connection-vuln-scanning.json)**

</details>

---

## Field Legend

- 🟠 **Mandatory** - MUST be present in all valid reports
- 🟢 **Recommended** - SHOULD be included when information is available
- 🔵 **Optional** - MAY be included for additional context

## Related Documentation

- [Common Fields Reference]({{ site.baseurl }}/docs/common-fields/) - Detailed documentation of core XARF fields
- [Schema Reference]({{ site.baseurl }}/docs/schemas/) - JSON Schema validation documentation
- [All Event Types]({{ site.baseurl }}/docs/types/) - Browse other categories
