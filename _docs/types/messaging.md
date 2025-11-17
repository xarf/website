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
  "xarf_version": "4.0.0",                                                       // 🟠 Mandatory
  "report_id": "550e8400-e29b-41d4-a716-446655440000",                           // 🟠 Mandatory
  "timestamp": "2024-01-15T16:45:10Z",                                           // 🟠 Mandatory
  "reporter": {                                                                 // 🟠 Mandatory
    "org": "Email Service Provider",                                             // 🟠 Mandatory
    "contact": "abuse@esp-provider.com",                                         // 🟠 Mandatory
    "type": "automated"                                                         // 🟠 Mandatory
  },
  "source_identifier": "192.0.2.200",                                            // 🟠 Mandatory
  "class": "messaging",                                                          // 🟠 Mandatory
  "type": "bulk_messaging",                                                      // 🟠 Mandatory

  "protocol": "smtp",                                                            // 🟠 Mandatory
  "recipient_count": 50000,                                                      // 🟠 Mandatory
  "smtp_from": "newsletter@company.example",                                     // 🟠 Mandatory

  "source_port": 25,                                                             // 🟢 Recommended
  "evidence_source": "user_complaint",                                           // 🟢 Recommended
  "evidence": [                                                                 // 🟢 Recommended
    {
      "content_type": "message/rfc822",                                          // 🟠 Mandatory
      "description": "Complete bulk email with headers",                         // 🟢 Recommended
      "payload": "UmVjZWl2ZWQ6IGZyb20gW2NvbXBhbnkuZXhhbXBsZV0..."               // 🟠 Mandatory
    }
  ],
  "confidence": 0.88,                                                            // 🔵 Optional

  "subject": "Weekly Newsletter - January Edition",                              // 🔵 Optional
  "sender_name": "Company Newsletter Team",                                      // 🔵 Optional
  "unsubscribe_provided": false,                                                 // 🔵 Optional
  "opt_in_evidence": false,                                                      // 🔵 Optional
  "bulk_indicators": {                                                          // 🔵 Optional
    "high_volume": true,                                                         // 🔵 Optional
    "template_based": true,                                                      // 🔵 Optional
    "commercial_sender": true                                                   // 🔵 Optional
  },
  "tags": [                                                                     // 🔵 Optional
    "bulk:commercial",                                                           // 🔵 Optional
    "complaint:unsubscribe"                                                     // 🔵 Optional
  ],
  "description": "Bulk commercial newsletter without opt-in evidence"           // 🟢 Recommended
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
  "xarf_version": "4.0.0",                                                       // 🟠 Mandatory
  "report_id": "550e8400-e29b-41d4-a716-446655440000",                           // 🟠 Mandatory
  "timestamp": "2024-01-15T14:30:25Z",                                           // 🟠 Mandatory
  "reporter": {                                                                 // 🟠 Mandatory
    "org": "SpamCop",                                                            // 🟠 Mandatory
    "contact": "reports@spamcop.net",                                            // 🟠 Mandatory
    "type": "automated"                                                         // 🟠 Mandatory
  },
  "source_identifier": "192.0.2.123",                                            // 🟠 Mandatory
  "class": "messaging",                                                          // 🟠 Mandatory
  "type": "spam",                                                                // 🟠 Mandatory

  "protocol": "smtp",                                                            // 🟠 Mandatory
  "smtp_from": "fake@example.com",                                               // 🟠 Mandatory

  "source_port": 25,                                                             // 🟢 Recommended
  "evidence_source": "spamtrap",                                                 // 🟢 Recommended
  "evidence": [                                                                 // 🟢 Recommended
    {
      "content_type": "message/rfc822",                                          // 🟠 Mandatory
      "description": "Complete spam email with headers",                         // 🟢 Recommended
      "payload": "UmVjZWl2ZWQ6IGZyb20gW3NwYW1tZXIuZXhhbXBsZS5jb21d...",          // 🟠 Mandatory
      "hash": "sha256:a3c5e8f2b1d4c9a7e6f8b2d1a3c5e8f2b1d4c9a7e6f8b2d1a3c5e8f2b1d4c9a7"  // 🔵 Optional
    }
  ],
  "confidence": 0.92,                                                            // 🔵 Optional

  "smtp_to": "spamtrap@security-org.net",                                        // 🔵 Optional
  "subject": "Urgent: Verify Your Account",                                      // 🔵 Optional
  "sender_name": "Security Department",                                          // 🔵 Optional
  "message_id": "<abc123def456@spammer.example>",                                // 🔵 Optional
  "user_agent": "bulk_mailer_v2.1",                                              // 🔵 Optional
  "recipient_count": 10000,                                                      // 🔵 Optional
  "language": "en",                                                              // 🔵 Optional
  "spam_indicators": {                                                          // 🔵 Optional
    "suspicious_links": [                                                       // 🔵 Optional
      "http://phishing-site.example.com/login"
    ],
    "commercial_content": true,                                                  // 🔵 Optional
    "bulk_characteristics": true                                                // 🔵 Optional
  },
  "tags": [                                                                     // 🔵 Optional
    "spam:commercial",
    "campaign:fake_bank_2024"
  ],
  "description": "Phishing spam targeting bank customers"                       // 🟢 Recommended
}
```

<a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/messaging-spam.json" style="display:none">Schema</a>

</details>

---

## Related Documentation

- [Common Fields Reference]({{ site.baseurl }}/docs/common-fields/) - Detailed documentation of core XARF fields
- [Schema Reference]({{ site.baseurl }}/docs/schemas/) - JSON Schema validation documentation
- [All Event Types]({{ site.baseurl }}/docs/types/) - Browse other categories
