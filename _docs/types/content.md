---
layout: docs
title: "Content Category - Event Types"
description: "Complete reference for web-based abuse types including phishing, malware, fraud, and CSAM"
permalink: /docs/types/content/
---

# Content Category

Web-based abuse including phishing websites, malware distribution, fraud sites, illegal content, defacement, and other malicious content hosted on websites or accessible via URLs.

**Event Types**: 9

**Note**: All content types require a `url` field as defined in the content-base schema.

---

## brand_infringement

**Use Case**: Reports of unauthorized use of trademarks, logos, or brand identities on websites. Used by brand protection teams and legal departments to identify and take down sites impersonating legitimate businesses or misusing intellectual property.

<details markdown="1">
<summary>📋 View Complete Sample</summary>

```json
{
  "xarf_version": "4.0.0",                          // 🟠 Mandatory
  "report_id": "550e8400-e29b-41d4-a716-446655440000", // 🟠 Mandatory
  "timestamp": "2024-01-15T14:00:00Z",              // 🟠 Mandatory
  "reporter": {                                     // 🟠 Mandatory
    "org": "Brand Protection Service",
    "contact": "brandprotection@example.com",
    "type": "manual"
  },
  "source_identifier": "203.0.113.45",             // 🟠 Mandatory
  "class": "content",                               // 🟠 Mandatory
  "type": "brand_infringement",                     // 🟠 Mandatory

  "url": "https://fake-apple-store.example.com",    // 🟠 Mandatory (content-base)

  "source_port": 443,                               // 🟢 Recommended
  "evidence_source": "manual_analysis",             // 🟢 Recommended
  "evidence": [                                     // 🟢 Recommended
    {
      "content_type": "image/png",
      "description": "Screenshot showing unauthorized Apple logo use",
      "payload": "aVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFBQUE="
    }
  ],
  "confidence": 0.98,                               // 🟢 Recommended

  "target_brand": "Apple Inc.",                     // 🔵 Optional
  "domain": "fake-apple-store.example.com",         // 🔵 Optional
  "hosting_provider": "CloudFlare",                 // 🔵 Optional
  "tags": ["brand:apple", "infringement:logo"],     // 🔵 Optional
  "description": "Unauthorized use of Apple trademarks on counterfeit store" // 🔵 Optional
}
```

**[View Schema on GitHub](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/content-brand_infringement.json)**

</details>

---

## csam

**Use Case**: Reports of Child Sexual Abuse Material. Critical for law enforcement, NCMEC, INHOPE hotlines, and platform trust & safety teams. Follows strict reporting protocols and mandatory reporting requirements in many jurisdictions.

<details markdown="1">
<summary>📋 View Complete Sample</summary>

```json
{
  "xarf_version": "4.0.0",                          // 🟠 Mandatory
  "report_id": "550e8400-e29b-41d4-a716-446655440000", // 🟠 Mandatory
  "timestamp": "2024-01-15T10:00:00Z",              // 🟠 Mandatory
  "reporter": {                                     // 🟠 Mandatory
    "org": "NCMEC CyberTipline",
    "contact": "reports@cybertipline.org",
    "type": "manual"
  },
  "source_identifier": "198.51.100.88",            // 🟠 Mandatory
  "class": "content",                               // 🟠 Mandatory
  "type": "csam",                                   // 🟠 Mandatory

  "url": "https://illegal-content.example.com/[redacted]", // 🟠 Mandatory (content-base)

  "source_port": 443,                               // 🟢 Recommended
  "evidence_source": "user_report",                 // 🟢 Recommended
  "evidence": [                                     // 🟢 Recommended
    {
      "content_type": "text/plain",
      "description": "URL list and reporting metadata",
      "payload": "[REDACTED - LAW ENFORCEMENT USE ONLY]"
    }
  ],
  "confidence": 1.0,                                // 🟢 Recommended

  "domain": "illegal-content.example.com",          // 🔵 Optional
  "hosting_provider": "ISP NAME",                   // 🔵 Optional
  "country_code": "US",                             // 🔵 Optional
  "tags": ["priority:critical", "law_enforcement:notified"], // 🔵 Optional
  "description": "CSAM content requiring immediate removal and law enforcement notification" // 🔵 Optional
}
```

**[View Schema on GitHub](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/content-csam.json)**

</details>

---

## csem

**Use Case**: Reports of Child Sexual Exploitation Material (broader than CSAM, includes grooming, sextortion, etc.). Used by law enforcement, hotlines, and online safety organizations.

<details markdown="1">
<summary>📋 View Complete Sample</summary>

```json
{
  "xarf_version": "4.0.0",                          // 🟠 Mandatory
  "report_id": "550e8400-e29b-41d4-a716-446655440000", // 🟠 Mandatory
  "timestamp": "2024-01-15T11:30:00Z",              // 🟠 Mandatory
  "reporter": {                                     // 🟠 Mandatory
    "org": "Internet Watch Foundation",
    "contact": "hotline@iwf.org.uk",
    "type": "manual"
  },
  "source_identifier": "192.0.2.77",               // 🟠 Mandatory
  "class": "content",                               // 🟠 Mandatory
  "type": "csem",                                   // 🟠 Mandatory

  "url": "https://exploitation-site.example.com/[redacted]", // 🟠 Mandatory (content-base)

  "source_port": 443,                               // 🟢 Recommended
  "evidence_source": "hotline",                     // 🟢 Recommended
  "evidence": [                                     // 🟢 Recommended
    {
      "content_type": "text/plain",
      "description": "Case file metadata",
      "payload": "[REDACTED - LAW ENFORCEMENT USE ONLY]"
    }
  ],
  "confidence": 1.0,                                // 🟢 Recommended

  "domain": "exploitation-site.example.com",        // 🔵 Optional
  "tags": ["priority:critical", "category:csem"],   // 🔵 Optional
  "description": "Child exploitation content requiring immediate action" // 🔵 Optional
}
```

**[View Schema on GitHub](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/content-csem.json)**

</details>

---

## exposed_data

**Use Case**: Reports of exposed sensitive data including databases, credentials, PII, or confidential documents accessible via web interfaces. Used by security researchers and affected organizations to identify and secure data leaks.

<details markdown="1">
<summary>📋 View Complete Sample</summary>

```json
{
  "xarf_version": "4.0.0",                          // 🟠 Mandatory
  "report_id": "550e8400-e29b-41d4-a716-446655440000", // 🟠 Mandatory
  "timestamp": "2024-01-15T16:00:00Z",              // 🟠 Mandatory
  "reporter": {                                     // 🟠 Mandatory
    "org": "Security Research Team",
    "contact": "disclosures@security.example",
    "type": "manual"
  },
  "source_identifier": "198.51.100.200",           // 🟠 Mandatory
  "class": "content",                               // 🟠 Mandatory
  "type": "exposed_data",                           // 🟠 Mandatory

  "url": "https://misconfigured-server.example.com/database-backup.sql", // 🟠 Mandatory (content-base)

  "source_port": 443,                               // 🟢 Recommended
  "evidence_source": "automated_scan",              // 🟢 Recommended
  "evidence": [                                     // 🟢 Recommended
    {
      "content_type": "text/plain",
      "description": "Directory listing showing exposed files",
      "payload": "SW5kZXggb2YgL2RhdGFiYXNlLWJhY2t1cHMK"
    }
  ],
  "confidence": 0.97,                               // 🟢 Recommended

  "domain": "misconfigured-server.example.com",     // 🔵 Optional
  "hosting_provider": "AWS",                        // 🔵 Optional
  "tags": ["data:pii", "severity:high"],            // 🔵 Optional
  "description": "Publicly accessible database backup containing PII" // 🔵 Optional
}
```

**[View Schema on GitHub](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/content-exposed-data.json)**

</details>

---

## fraud

**Use Case**: Reports of fraudulent websites including investment scams, romance fraud, tech support scams, and fake shopping sites. Used by consumer protection agencies, financial institutions, and anti-fraud organizations.

<details markdown="1">
<summary>📋 View Complete Sample</summary>

```json
{
  "xarf_version": "4.0.0",                          // 🟠 Mandatory
  "report_id": "550e8400-e29b-41d4-a716-446655440000", // 🟠 Mandatory
  "timestamp": "2025-01-15T10:30:00Z",              // 🟠 Mandatory
  "reporter": {                                     // 🟠 Mandatory
    "org": "Anti-Fraud Coalition",
    "contact": "reports@antifraud.example",
    "type": "automated"
  },
  "source_identifier": "198.51.100.45",            // 🟠 Mandatory
  "class": "content",                               // 🟠 Mandatory
  "type": "fraud",                                  // 🟠 Mandatory

  "url": "https://get-rich-quick.example.com",      // 🟠 Mandatory (content-base)
  "fraud_type": "investment",                       // 🟠 Mandatory (type-specific)

  "source_port": 443,                               // 🟢 Recommended
  "evidence_source": "user_report",                 // 🟢 Recommended
  "evidence": [                                     // 🟢 Recommended
    {
      "content_type": "image/png",
      "description": "Screenshot of fraudulent investment site",
      "payload": "aVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFBQUE="
    }
  ],
  "confidence": 0.95,                               // 🟢 Recommended

  "domain": "get-rich-quick.example.com",           // 🔵 Optional
  "payment_methods": ["cryptocurrency", "wire_transfer"], // 🔵 Optional
  "cryptocurrency_addresses": [                     // 🔵 Optional
    {
      "currency": "bitcoin",
      "address": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
    }
  ],
  "claimed_entity": "Investment Guru LLC",          // 🔵 Optional
  "loss_amount": {                                  // 🔵 Optional
    "currency": "USD",
    "amount": 50000
  },
  "tags": ["fraud:investment", "crypto:bitcoin"],   // 🔵 Optional
  "description": "Cryptocurrency investment scam promising guaranteed returns" // 🔵 Optional
}
```

**[View Schema on GitHub](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/content-fraud.json)**

</details>

---

## malware

**Use Case**: Reports of malware hosting and distribution sites including trojan droppers, ransomware, infostealers, and drive-by downloads. Used by malware research labs, antivirus vendors, and threat intelligence platforms.

<details markdown="1">
<summary>📋 View Complete Sample</summary>

```json
{
  "xarf_version": "4.0.0",                          // 🟠 Mandatory
  "report_id": "550e8400-e29b-41d4-a716-446655440000", // 🟠 Mandatory
  "timestamp": "2025-01-15T12:45:00Z",              // 🟠 Mandatory
  "reporter": {                                     // 🟠 Mandatory
    "org": "Malware Analysis Lab",
    "contact": "alerts@malwarelab.example",
    "type": "automated"
  },
  "source_identifier": "198.51.100.123",           // 🟠 Mandatory
  "class": "content",                               // 🟠 Mandatory
  "type": "malware",                                // 🟠 Mandatory

  "url": "https://malicious-downloads.example.com/invoice.exe", // 🟠 Mandatory (content-base)

  "source_port": 443,                               // 🟢 Recommended
  "evidence_source": "automated_scan",              // 🟢 Recommended
  "evidence": [                                     // 🟢 Recommended
    {
      "content_type": "application/octet-stream",
      "description": "Malware sample (sandboxed)",
      "payload": "UEsDBBQAAAAIAA==",
      "hash": "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    }
  ],
  "confidence": 0.99,                               // 🟢 Recommended

  "domain": "malicious-downloads.example.com",      // 🔵 Optional
  "malware_family": "Emotet",                       // 🔵 Optional
  "malware_type": "trojan",                         // 🔵 Optional
  "file_hashes": {                                  // 🔵 Optional
    "md5": "d41d8cd98f00b204e9800998ecf8427e",
    "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  },
  "file_metadata": {                                // 🔵 Optional
    "filename": "invoice.exe",
    "file_size": 245760,
    "file_type": "PE32 executable",
    "mime_type": "application/x-dosexec"
  },
  "distribution_method": "email_attachment",        // 🔵 Optional
  "c2_servers": [                                   // 🔵 Optional
    {
      "address": "192.0.2.50",
      "port": 8080,
      "protocol": "https"
    }
  ],
  "sandbox_analysis": {                             // 🔵 Optional
    "sandbox_name": "VirusTotal",
    "verdict": "malicious",
    "score": 95
  },
  "targeted_platforms": ["windows"],                // 🔵 Optional
  "tags": ["malware:emotet", "vector:email"],       // 🔵 Optional
  "description": "Emotet trojan distributed via phishing emails" // 🔵 Optional
}
```

**[View Schema on GitHub](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/content-malware.json)**

</details>

---

## phishing

**Use Case**: Reports of phishing websites designed to steal credentials, financial information, or personal data. Used by anti-phishing organizations, financial institutions, and email security providers to protect users from credential theft.

<details markdown="1">
<summary>📋 View Complete Sample</summary>

```json
{
  "xarf_version": "4.0.0",                          // 🟠 Mandatory
  "report_id": "550e8400-e29b-41d4-a716-446655440000", // 🟠 Mandatory
  "timestamp": "2025-01-15T15:15:24Z",              // 🟠 Mandatory
  "reporter": {                                     // 🟠 Mandatory
    "org": "Phishing Detection Service",
    "contact": "reports@antiphishing.example",
    "type": "automated"
  },
  "source_identifier": "203.0.113.45",             // 🟠 Mandatory
  "class": "content",                               // 🟠 Mandatory
  "type": "phishing",                               // 🟠 Mandatory

  "url": "https://secure-banking-login.example.com/auth", // 🟠 Mandatory (content-base)

  "source_port": 443,                               // 🟢 Recommended
  "evidence_source": "automated_crawler",           // 🟢 Recommended
  "evidence": [                                     // 🟢 Recommended
    {
      "content_type": "image/png",
      "description": "Screenshot of phishing page",
      "payload": "aVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFBQUE="
    }
  ],
  "confidence": 0.96,                               // 🟢 Recommended

  "domain": "secure-banking-login.example.com",     // 🔵 Optional
  "target_brand": "Major Bank Corp",                // 🔵 Optional
  "cloned_site": "https://www.majorbank.com",       // 🔵 Optional
  "credential_fields": ["username", "password", "pin"], // 🔵 Optional
  "submission_url": "https://attacker.example/collect", // 🔵 Optional
  "phishing_kit": "16Shop",                         // 🔵 Optional
  "lure_type": "security_alert",                    // 🔵 Optional
  "detection_evasion": ["geo_blocking", "user_agent_filtering"], // 🔵 Optional
  "redirect_chain": [                               // 🔵 Optional
    "https://shortener.example/abc123",
    "https://secure-banking-login.example.com/auth"
  ],
  "tags": ["phishing:banking", "brand:majorbank"], // 🔵 Optional
  "description": "Phishing site targeting Major Bank customers" // 🔵 Optional
}
```

**[View Schema on GitHub](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/content-phishing.json)**

</details>

---

## remote_compromise

**Use Case**: Reports of remotely compromised websites or applications being used for malicious purposes. Used by web hosting providers and security teams to identify and remediate compromised assets.

<details markdown="1">
<summary>📋 View Complete Sample</summary>

```json
{
  "xarf_version": "4.0.0",                          // 🟠 Mandatory
  "report_id": "550e8400-e29b-41d4-a716-446655440000", // 🟠 Mandatory
  "timestamp": "2024-01-15T18:00:00Z",              // 🟠 Mandatory
  "reporter": {                                     // 🟠 Mandatory
    "org": "Web Security Scanner",
    "contact": "security@scanner.example",
    "type": "automated"
  },
  "source_identifier": "192.0.2.150",              // 🟠 Mandatory
  "class": "content",                               // 🟠 Mandatory
  "type": "remote_compromise",                      // 🟠 Mandatory

  "url": "https://legitimate-website.example.com/wp-content/uploads/shell.php", // 🟠 Mandatory (content-base)

  "source_port": 443,                               // 🟢 Recommended
  "evidence_source": "automated_scan",              // 🟢 Recommended
  "evidence": [                                     // 🟢 Recommended
    {
      "content_type": "text/plain",
      "description": "Webshell detection signature",
      "payload": "PD9waHAgZXZhbCgkX1BPU1RbJ2NtZCddKTs/Pg=="
    }
  ],
  "confidence": 0.94,                               // 🟢 Recommended

  "domain": "legitimate-website.example.com",       // 🔵 Optional
  "hosting_provider": "DigitalOcean",               // 🔵 Optional
  "tags": ["compromise:webshell", "cms:wordpress"], // 🔵 Optional
  "description": "Compromised WordPress site hosting webshell" // 🔵 Optional
}
```

**[View Schema on GitHub](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/content-remote_compromise.json)**

</details>

---

## suspicious_registration

**Use Case**: Reports of suspicious domain registrations that match known abuse patterns (typosquatting, brand impersonation, etc.). Used by domain registrars, brand protection services, and threat intelligence platforms for proactive abuse prevention.

<details markdown="1">
<summary>📋 View Complete Sample</summary>

```json
{
  "xarf_version": "4.0.0",                          // 🟠 Mandatory
  "report_id": "550e8400-e29b-41d4-a716-446655440000", // 🟠 Mandatory
  "timestamp": "2024-01-15T09:00:00Z",              // 🟠 Mandatory
  "reporter": {                                     // 🟠 Mandatory
    "org": "Domain Monitoring Service",
    "contact": "monitoring@domainwatch.example",
    "type": "automated"
  },
  "source_identifier": "microsof7-login.example.com", // 🟠 Mandatory
  "class": "content",                               // 🟠 Mandatory
  "type": "suspicious_registration",                // 🟠 Mandatory

  "url": "https://microsof7-login.example.com",     // 🟠 Mandatory (content-base)

  "source_port": 443,                               // 🟢 Recommended
  "evidence_source": "automated_discovery",         // 🟢 Recommended
  "evidence": [                                     // 🟢 Recommended
    {
      "content_type": "application/json",
      "description": "WHOIS registration data",
      "payload": "eyJyZWdpc3RyYXIiOiJFeGFtcGxlIFJlZ2lzdHJhciJ9"
    }
  ],
  "confidence": 0.89,                               // 🟢 Recommended

  "domain": "microsof7-login.example.com",          // 🔵 Optional
  "target_brand": "Microsoft",                      // 🔵 Optional
  "registrar": "Example Registrar",                 // 🔵 Optional
  "whois": {                                        // 🔵 Optional
    "created_date": "2024-01-15T00:00:00Z",
    "registrant": "Privacy Protected"
  },
  "tags": ["suspicious:typosquatting", "brand:microsoft"], // 🔵 Optional
  "description": "Typosquatting domain targeting Microsoft users" // 🔵 Optional
}
```

**[View Schema on GitHub](https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/content-suspicious_registration.json)**

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
