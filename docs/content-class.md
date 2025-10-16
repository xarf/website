---
layout: docs
title: "Content Class - Web Abuse Reporting"
description: "XARF v4 Content class for reporting malicious web content including phishing, malware, fraud, and compromised sites"
---

# Content Class Documentation

The XARF v4 Content class provides comprehensive schemas for reporting web-based abuse including phishing sites, malware distribution, fraud, brand infringement, data leaks, compromised websites, and suspicious domain registrations.

## Overview

The Content class has been expanded from 2 to 7 specialized event types to cover the full spectrum of web-based threats that organizations encounter.

## Event Types

### 1. Phishing (`content-phishing`)
Reports of websites designed to steal credentials or personal information.

**Key Fields:**
- `credential_fields` - Form fields present on the phishing page
- `phishing_kit` - Known phishing kit identifier
- `redirect_chain` - URL redirect sequence
- `cloned_site` - Legitimate site being impersonated
- `lure_type` - Social engineering technique used

### 2. Malware (`content-malware`)
Sites hosting or distributing malicious software.

**Key Fields:**
- `malware_family` - Known malware family name
- `malware_type` - Classification (trojan, ransomware, etc.)
- `file_hashes` - MD5, SHA1, SHA256 hashes
- `c2_servers` - Command and control infrastructure
- `sandbox_analysis` - Automated analysis results

### 3. Fraud (`content-fraud`)
Scam and fraud websites targeting victims financially.

**Key Fields:**
- `fraud_type` - Type of fraud (investment, romance, tech support, etc.)
- `payment_methods` - Requested payment types
- `cryptocurrency_addresses` - Crypto wallets used
- `loss_amount` - Financial impact if known

### 4. Brand Infringement (`content-brand_infringement`)
Unauthorized use of trademarks and brand impersonation.

**Key Fields:**
- `infringement_type` - Type of violation (counterfeit, typosquatting, etc.)
- `legitimate_site` - Official brand website
- `similarity_score` - Visual/textual similarity measure
- `trademark_details` - Registration information
- `infringing_elements` - Specific brand elements misused

### 5. Data Leak (`content-data_leak`)
Exposed sensitive data and information breaches.

**Key Fields:**
- `data_types` - Types of exposed data (PII, credentials, etc.)
- `exposure_method` - How data was exposed
- `record_count` - Number of affected records
- `encryption_status` - Whether data was protected
- `accessibility` - Current access status

### 6. Remote Compromise (`content-remote_compromise`)
Compromised websites, webshells, and backdoors.

**Key Fields:**
- `compromise_type` - Type of compromise (webshell, defacement, etc.)
- `compromise_indicators` - Specific IOCs
- `affected_cms` - Content management system
- `vulnerability_exploited` - CVE if known
- `malicious_activities` - Observed abuse from site

### 7. Suspicious Registration (`content-suspicious_registration`)
Newly registered domains exhibiting suspicious characteristics.

**Key Fields:**
- `registration_date` - When domain was registered
- `suspicious_indicators` - Why registration is suspicious
- `risk_score` - Calculated risk level
- `targeted_brands` - Potential targets
- `predicted_usage` - Expected malicious use

## Shared Fields (content-base)

All content types inherit these common fields:

### DNS and Network Information
- `domain` - Fully qualified domain name
- `registrar` - Domain registrar
- `nameservers` - DNS nameservers
- `dns_records` - A, AAAA, MX, TXT records
- `asn` - Autonomous System Number
- `country_code` - ISO country code

### Evidence and Verification
- `screenshot_url` - Reference to screenshot evidence
- `verified_at` - Last verification timestamp
- `verification_method` - How content was verified
- `attack_vector` - Primary attack classification

### SSL Certificate Details
- `issuer` - Certificate issuer
- `subject` - Certificate subject
- `valid_from` / `valid_to` - Certificate validity period
- `fingerprint` - SHA256 fingerprint

### WHOIS Information
- `registrant` - Domain owner
- `created_date` - Registration date
- `expiry_date` - Expiration date
- `registrar_abuse_contact` - Abuse contact

## Evidence Requirements

### Mandatory Evidence
For visual abuse types (phishing, fraud, brand infringement), screenshot evidence is **mandatory**.

### Evidence Types
- `screenshot` - Visual proof of abuse
- `html_source` - Page source code
- `dns_lookup` - DNS query results
- `whois_record` - Domain registration data
- `ssl_certificate` - Certificate details
- `http_headers` - HTTP response headers
- `malware_sample` - Malicious file samples

## Example Report

```json
{
  "xarf_version": "4.0.0",
  "report_id": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2025-01-16T10:30:00Z",
  "reporter": {
    "org": "Brand Protection Service",
    "contact": "abuse@brandprotect.example",
    "type": "automated"
  },
  "source_identifier": "203.0.113.45",
  "class": "content",
  "type": "phishing",
  "url": "https://secure-bank-login.example.com/auth",
  "domain": "secure-bank-login.example.com",
  "target_brand": "Major Bank",
  "cloned_site": "https://www.majorbank.com",
  "credential_fields": ["username", "password", "pin"],
  "screenshot_url": "https://evidence.example.com/screenshot/12345.png",
  "verified_at": "2025-01-16T10:29:00Z",
  "verification_method": "automated_crawler",
  "ssl_certificate": {
    "issuer": "Let's Encrypt",
    "subject": "secure-bank-login.example.com",
    "valid_from": "2025-01-15T00:00:00Z",
    "valid_to": "2025-04-15T23:59:59Z"
  },
  "whois": {
    "created_date": "2025-01-15T08:00:00Z",
    "registrar": "Example Registrar Inc.",
    "privacy_protected": true
  },
  "evidence": [
    {
      "content_type": "image/png",
      "description": "Screenshot of phishing page",
      "payload": "base64_encoded_screenshot"
    }
  ],
  "tags": ["phishing:banking", "severity:critical"]
}
```

## Integration with Netcraft

The expanded Content class fully supports Netcraft's operational requirements:

- **Phishing** → `content-phishing`
- **Malware** → `content-malware`
- **Fraud** → `content-fraud`
- **Brand Infringement** → `content-brand_infringement`
- **Copyright Infringement** → Part of `content-brand_infringement`
- **Data Leak** → `content-data_leak`
- **Remote Compromise** → `content-remote_compromise`
- **Suspicious Registration** → `content-suspicious_registration`

## Validation

All content reports are validated against:
1. JSON Schema structure
2. Required field presence
3. Evidence requirements (mandatory screenshots for visual abuse)
4. Cross-field consistency
5. Format validation (URLs, domains, hashes, etc.)

## Best Practices

1. **Always include screenshots** for visual abuse types
2. **Provide complete DNS/WHOIS data** for domain-based abuse
3. **Include SSL certificate details** for HTTPS sites
4. **Use structured tags** for categorization and automation
5. **Verify content** before reporting to reduce false positives
6. **Include redirect chains** for obfuscated phishing campaigns
7. **Hash all evidence** for integrity verification

## Schema Files

- [content-base.json](/schemas/v4/types/content-base.json) - Shared fields
- [content-phishing.json](/schemas/v4/types/content-phishing.json)
- [content-malware.json](/schemas/v4/types/content-malware.json)
- [content-fraud.json](/schemas/v4/types/content-fraud.json)
- [content-brand_infringement.json](/schemas/v4/types/content-brand_infringement.json)
- [content-data_leak.json](/schemas/v4/types/content-data_leak.json)
- [content-remote_compromise.json](/schemas/v4/types/content-remote_compromise.json)
- [content-suspicious_registration.json](/schemas/v4/types/content-suspicious_registration.json)