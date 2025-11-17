---
layout: docs
title: "Content Category - Event Types"
description: "Complete reference for web-based abuse types including phishing, malware, fraud, and CSAM"
permalink: /docs/types/content/
---

# Content Category

Web-based abuse including phishing websites, malware distribution, fraud sites, illegal content, defacement, and other malicious content hosted on websites or accessible via URLs.

**Note**: All content types require a `url` field as defined in the content-base schema.

## Field Legend

- 🟠 **Mandatory** - MUST be present in all valid reports
- 🟢 **Recommended** - SHOULD be included when information is available
- 🔵 **Optional** - MAY be included for additional context

---

## brand_infringement

**Use Case**: Reports of unauthorized use of trademarks, logos, or brand identities on websites. Used by brand protection teams and legal departments to identify and take down sites impersonating legitimate businesses or misusing intellectual property.

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
    "org": "Brand Protection Service",
    "contact": "brandprotection@example.com",
    "type": "manual"
  },
  "source_identifier": "203.0.113.45",
  "class": "content",
  "type": "brand_infringement",

  "url": "https://fake-apple-store.example.com",

  "source_port": 443,
  "evidence_source": "manual_analysis",
  "evidence": [
    {
      "content_type": "image/png",
      "description": "Screenshot showing unauthorized Apple logo use",
      "payload": "aVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFBQUE="
    }
  ],
  "confidence": 0.98,

  "target_brand": "Apple Inc.",
  "domain": "fake-apple-store.example.com",
  "hosting_provider": "CloudFlare",
  "tags": ["brand:apple", "infringement:logo"],
  "description": "Unauthorized use of Apple trademarks on counterfeit store"
}
```

<a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/content-brand_infringement.json" style="display:none">Schema</a>

</details>

---

## csam

**Use Case**: Reports of Child Sexual Abuse Material. Critical for law enforcement, NCMEC, INHOPE hotlines, and platform trust & safety teams. Follows strict reporting protocols and mandatory reporting requirements in many jurisdictions.

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
    "org": "NCMEC CyberTipline",
    "contact": "reports@cybertipline.org",
    "type": "manual"
  },
  "source_identifier": "198.51.100.88",
  "class": "content",
  "type": "csam",

  "url": "https://illegal-content.example.com/[redacted]",

  "source_port": 443,
  "evidence_source": "user_report",
  "evidence": [
    {
      "content_type": "text/plain",
      "description": "URL list and reporting metadata",
      "payload": "[REDACTED - LAW ENFORCEMENT USE ONLY]"
    }
  ],
  "confidence": 1.0,

  "domain": "illegal-content.example.com",
  "hosting_provider": "ISP NAME",
  "country_code": "US",
  "tags": ["priority:critical", "law_enforcement:notified"],
  "description": "CSAM content requiring immediate removal and law enforcement notification"
}
```

<a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/content-csam.json" style="display:none">Schema</a>

</details>

---

## csem

**Use Case**: Reports of Child Sexual Exploitation Material (broader than CSAM, includes grooming, sextortion, etc.). Used by law enforcement, hotlines, and online safety organizations.

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
    "org": "Internet Watch Foundation",
    "contact": "hotline@iwf.org.uk",
    "type": "manual"
  },
  "source_identifier": "192.0.2.77",
  "class": "content",
  "type": "csem",

  "url": "https://exploitation-site.example.com/[redacted]",

  "source_port": 443,
  "evidence_source": "hotline",
  "evidence": [
    {
      "content_type": "text/plain",
      "description": "Case file metadata",
      "payload": "[REDACTED - LAW ENFORCEMENT USE ONLY]"
    }
  ],
  "confidence": 1.0,

  "domain": "exploitation-site.example.com",
  "tags": ["priority:critical", "category:csem"],
  "description": "Child exploitation content requiring immediate action"
}
```

<a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/content-csem.json" style="display:none">Schema</a>

</details>

---

## exposed_data

**Use Case**: Reports of exposed sensitive data including databases, credentials, PII, or confidential documents accessible via web interfaces. Used by security researchers and affected organizations to identify and secure data leaks.

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
  "timestamp": "2024-01-15T16:00:00Z",
  "reporter": {
    "org": "Security Research Team",
    "contact": "disclosures@security.example",
    "type": "manual"
  },
  "source_identifier": "198.51.100.200",
  "class": "content",
  "type": "exposed_data",

  "url": "https://misconfigured-server.example.com/database-backup.sql",

  "source_port": 443,
  "evidence_source": "automated_scan",
  "evidence": [
    {
      "content_type": "text/plain",
      "description": "Directory listing showing exposed files",
      "payload": "SW5kZXggb2YgL2RhdGFiYXNlLWJhY2t1cHMK"
    }
  ],
  "confidence": 0.97,

  "domain": "misconfigured-server.example.com",
  "hosting_provider": "AWS",
  "tags": ["data:pii", "severity:high"],
  "description": "Publicly accessible database backup containing PII"
}
```

<a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/content-exposed-data.json" style="display:none">Schema</a>

</details>

---

## fraud

**Use Case**: Reports of fraudulent websites including investment scams, romance fraud, tech support scams, and fake shopping sites. Used by consumer protection agencies, financial institutions, and anti-fraud organizations.

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
  "timestamp": "2025-01-15T10:30:00Z",
  "reporter": {
    "org": "Anti-Fraud Coalition",
    "contact": "reports@antifraud.example",
    "type": "automated"
  },
  "source_identifier": "198.51.100.45",
  "class": "content",
  "type": "fraud",

  "url": "https://get-rich-quick.example.com",
  "fraud_type": "investment",

  "source_port": 443,
  "evidence_source": "user_report",
  "evidence": [
    {
      "content_type": "image/png",
      "description": "Screenshot of fraudulent investment site",
      "payload": "aVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFBQUE="
    }
  ],
  "confidence": 0.95,

  "domain": "get-rich-quick.example.com",
  "payment_methods": ["cryptocurrency", "wire_transfer"],
  "cryptocurrency_addresses": [
    {
      "currency": "bitcoin",
      "address": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
    }
  ],
  "claimed_entity": "Investment Guru LLC",
  "loss_amount": {
    "currency": "USD",
    "amount": 50000
  },
  "tags": ["fraud:investment", "crypto:bitcoin"],
  "description": "Cryptocurrency investment scam promising guaranteed returns"
}
```

<a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/content-fraud.json" style="display:none">Schema</a>

</details>

---

## malware

**Use Case**: Reports of malware hosting and distribution sites including trojan droppers, ransomware, infostealers, and drive-by downloads. Used by malware research labs, antivirus vendors, and threat intelligence platforms.

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
  "timestamp": "2025-01-15T12:45:00Z",
  "reporter": {
    "org": "Malware Analysis Lab",
    "contact": "alerts@malwarelab.example",
    "type": "automated"
  },
  "source_identifier": "198.51.100.123",
  "class": "content",
  "type": "malware",

  "url": "https://malicious-downloads.example.com/invoice.exe",

  "source_port": 443,
  "evidence_source": "automated_scan",
  "evidence": [
    {
      "content_type": "application/octet-stream",
      "description": "Malware sample (sandboxed)",
      "payload": "UEsDBBQAAAAIAA==",
      "hash": "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    }
  ],
  "confidence": 0.99,

  "domain": "malicious-downloads.example.com",
  "malware_family": "Emotet",
  "malware_type": "trojan",
  "file_hashes": {
    "md5": "d41d8cd98f00b204e9800998ecf8427e",
    "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  },
  "file_metadata": {
    "filename": "invoice.exe",
    "file_size": 245760,
    "file_type": "PE32 executable",
    "mime_type": "application/x-dosexec"
  },
  "distribution_method": "email_attachment",
  "c2_servers": [
    {
      "address": "192.0.2.50",
      "port": 8080,
      "protocol": "https"
    }
  ],
  "sandbox_analysis": {
    "sandbox_name": "VirusTotal",
    "verdict": "malicious",
    "score": 95
  },
  "targeted_platforms": ["windows"],
  "tags": ["malware:emotet", "vector:email"],
  "description": "Emotet trojan distributed via phishing emails"
}
```

<a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/content-malware.json" style="display:none">Schema</a>

</details>

---

## phishing

**Use Case**: Reports of phishing websites designed to steal credentials, financial information, or personal data. Used by anti-phishing organizations, financial institutions, and email security providers to protect users from credential theft.

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
  "timestamp": "2025-01-15T15:15:24Z",
  "reporter": {
    "org": "Phishing Detection Service",
    "contact": "reports@antiphishing.example",
    "type": "automated"
  },
  "source_identifier": "203.0.113.45",
  "class": "content",
  "type": "phishing",

  "url": "https://secure-banking-login.example.com/auth",

  "source_port": 443,
  "evidence_source": "automated_crawler",
  "evidence": [
    {
      "content_type": "image/png",
      "description": "Screenshot of phishing page",
      "payload": "aVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFBQUE="
    }
  ],
  "confidence": 0.96,

  "domain": "secure-banking-login.example.com",
  "target_brand": "Major Bank Corp",
  "cloned_site": "https://www.majorbank.com",
  "credential_fields": ["username", "password", "pin"],
  "submission_url": "https://attacker.example/collect",
  "phishing_kit": "16Shop",
  "lure_type": "security_alert",
  "detection_evasion": ["geo_blocking", "user_agent_filtering"],
  "redirect_chain": [
    "https://shortener.example/abc123",
    "https://secure-banking-login.example.com/auth"
  ],
  "tags": ["phishing:banking", "brand:majorbank"],
  "description": "Phishing site targeting Major Bank customers"
}
```

<a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/content-phishing.json" style="display:none">Schema</a>

</details>

---

## remote_compromise

**Use Case**: Reports of remotely compromised websites or applications being used for malicious purposes. Used by web hosting providers and security teams to identify and remediate compromised assets.

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
  "timestamp": "2024-01-15T18:00:00Z",
  "reporter": {
    "org": "Web Security Scanner",
    "contact": "security@scanner.example",
    "type": "automated"
  },
  "source_identifier": "192.0.2.150",
  "class": "content",
  "type": "remote_compromise",

  "url": "https://legitimate-website.example.com/wp-content/uploads/shell.php",

  "source_port": 443,
  "evidence_source": "automated_scan",
  "evidence": [
    {
      "content_type": "text/plain",
      "description": "Webshell detection signature",
      "payload": "PD9waHAgZXZhbCgkX1BPU1RbJ2NtZCddKTs/Pg=="
    }
  ],
  "confidence": 0.94,

  "domain": "legitimate-website.example.com",
  "hosting_provider": "DigitalOcean",
  "tags": ["compromise:webshell", "cms:wordpress"],
  "description": "Compromised WordPress site hosting webshell"
}
```

<a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/content-remote_compromise.json" style="display:none">Schema</a>

</details>

---

## suspicious_registration

**Use Case**: Reports of suspicious domain registrations that match known abuse patterns (typosquatting, brand impersonation, etc.). Used by domain registrars, brand protection services, and threat intelligence platforms for proactive abuse prevention.

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
  "timestamp": "2024-01-15T09:00:00Z",
  "reporter": {
    "org": "Domain Monitoring Service",
    "contact": "monitoring@domainwatch.example",
    "type": "automated"
  },
  "source_identifier": "microsof7-login.example.com",
  "class": "content",
  "type": "suspicious_registration",

  "url": "https://microsof7-login.example.com",

  "source_port": 443,
  "evidence_source": "automated_discovery",
  "evidence": [
    {
      "content_type": "application/json",
      "description": "WHOIS registration data",
      "payload": "eyJyZWdpc3RyYXIiOiJFeGFtcGxlIFJlZ2lzdHJhciJ9"
    }
  ],
  "confidence": 0.89,

  "domain": "microsof7-login.example.com",
  "target_brand": "Microsoft",
  "registrar": "Example Registrar",
  "whois": {
    "created_date": "2024-01-15T00:00:00Z",
    "registrant": "Privacy Protected"
  },
  "tags": ["suspicious:typosquatting", "brand:microsoft"],
  "description": "Typosquatting domain targeting Microsoft users"
}
```

<a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/content-suspicious_registration.json" style="display:none">Schema</a>

</details>

---

## Related Documentation

- [Common Fields Reference]({{ site.baseurl }}/docs/common-fields/) - Detailed documentation of core XARF fields
- [Schema Reference]({{ site.baseurl }}/docs/schemas/) - JSON Schema validation documentation
- [All Event Types]({{ site.baseurl }}/docs/types/) - Browse other categories
