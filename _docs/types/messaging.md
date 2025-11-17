---
layout: docs
title: "Messaging Category - Event Types"
description: "Complete reference for messaging abuse types including spam and bulk messaging"
permalink: /docs/types/messaging/
---

# Messaging Category

Communication abuse including spam, phishing emails, and bulk messaging across various protocols (SMTP, SMS, WhatsApp, Telegram, etc.)

## Field Legend

- 🟠 **Mandatory** - MUST be present in all valid reports
- 🟢 **Recommended** - SHOULD be included when information is available
- 🔵 **Optional** - MAY be included for additional context

---

## bulk_messaging

**Use Case**: Reports of legitimate but unwanted bulk communications, typically commercial newsletters or marketing messages sent without proper consent or lacking unsubscribe mechanisms. Commonly used for CAN-SPAM and GDPR compliance enforcement.

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
  "timestamp": "2024-01-15T16:45:10Z",
  "reporter": {
    "org": "Email Service Provider",
    "contact": "abuse@esp-provider.com",
    "type": "automated"
  },
  "source_identifier": "192.0.2.200",
  "class": "messaging",
  "type": "bulk_messaging",

  "protocol": "smtp",
  "recipient_count": 50000,
  "smtp_from": "newsletter@company.example",

  "source_port": 25,
  "evidence_source": "user_complaint",
  "evidence": [
    {
      "content_type": "message/rfc822",
      "description": "Complete bulk email with headers",
      "payload": "UmVjZWl2ZWQ6IGZyb20gW2NvbXBhbnkuZXhhbXBsZV0..."
    }
  ],
  "confidence": 0.88,

  "subject": "Weekly Newsletter - January Edition",
  "sender_name": "Company Newsletter Team",
  "unsubscribe_provided": false,
  "opt_in_evidence": false,
  "bulk_indicators": {
    "high_volume": true,
    "template_based": true,
    "commercial_sender": true
  },
  "tags": [
    "bulk:commercial",
    "complaint:unsubscribe"
  ],
  "description": "Bulk commercial newsletter without opt-in evidence"
}
```

<a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/messaging-bulk-messaging.json" style="display:none">Schema</a>

</details>

---

## spam

**Use Case**: Unsolicited commercial email (UCE), phishing attempts via email, social engineering campaigns, and other unwanted messaging. Used by spam filtering services, email providers, and security researchers to report abuse from spamtraps, user complaints, and automated detection systems.

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
  "timestamp": "2024-01-15T14:30:25Z",
  "reporter": {
    "org": "SpamCop",
    "contact": "reports@spamcop.net",
    "type": "automated"
  },
  "source_identifier": "192.0.2.123",
  "class": "messaging",
  "type": "spam",

  "protocol": "smtp",
  "smtp_from": "fake@example.com",

  "source_port": 25,
  "evidence_source": "spamtrap",
  "evidence": [
    {
      "content_type": "message/rfc822",
      "description": "Complete spam email with headers",
      "payload": "UmVjZWl2ZWQ6IGZyb20gW3NwYW1tZXIuZXhhbXBsZS5jb21d...",
      "hash": "sha256:a3c5e8f2b1d4c9a7e6f8b2d1a3c5e8f2b1d4c9a7e6f8b2d1a3c5e8f2b1d4c9a7"
    }
  ],
  "confidence": 0.92,

  "smtp_to": "spamtrap@security-org.net",
  "subject": "Urgent: Verify Your Account",
  "sender_name": "Security Department",
  "message_id": "<abc123def456@spammer.example>",
  "user_agent": "bulk_mailer_v2.1",
  "recipient_count": 10000,
  "language": "en",
  "spam_indicators": {
    "suspicious_links": [
      "http://phishing-site.example.com/login"
    ],
    "commercial_content": true,
    "bulk_characteristics": true
  },
  "tags": [
    "spam:commercial",
    "campaign:fake_bank_2024"
  ],
  "description": "Phishing spam targeting bank customers"
}
```

<a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/messaging-spam.json" style="display:none">Schema</a>

</details>

---

## Related Documentation

- [Common Fields Reference]({{ site.baseurl }}/docs/common-fields/) - Detailed documentation of core XARF fields
- [Schema Reference]({{ site.baseurl }}/docs/schemas/) - JSON Schema validation documentation
- [All Event Types]({{ site.baseurl }}/docs/types/) - Browse other categories
