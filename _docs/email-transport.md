---
layout: docs
title: "Email Transport (SMTP)"
description: "Using XARF v4 with email/SMTP transport via RFC5965 extension"
permalink: /docs/email-transport/
---

# Email Transport (SMTP)

XARF is transport-neutral by design—it's simply a JSON document that can be transmitted via email, RESTful APIs, message queues, webhooks, or any other transport mechanism. This guide explains how to send XARF v4 reports via email using an RFC5965 extension.

---

## Overview

For email-based abuse reporting, XARF extends **RFC5965** (An Extensible Format for Email Feedback Reports), which defines the ARF (Abuse Reporting Format). This design allows existing ARF parsers to be minimally modified to receive XARF reports while gracefully failing for systems that don't support XARF.

**Key Benefits:**
- **Backward compatibility** with ARF infrastructure
- **Standard MIME structure** familiar to email systems
- **Graceful degradation** for non-XARF receivers
- **Easy integration** with existing abuse handling systems

---

## Email Structure

Per **RFC6522**, XARF emails use a multipart MIME structure with three distinct parts:

### MIME Structure Overview

```
multipart/report; report-type=feedback-report
├── Part 1: Human-readable description (text/plain)
├── Part 2: Machine-readable feedback headers (message/feedback-report)
└── Part 3: XARF JSON payload (application/json, base64-encoded)
```

### Required Components

**1. Outer Content-Type**
```
Content-Type: multipart/report; report-type=feedback-report;
    boundary="--boundary-string"
```

**2. Three MIME Parts**
- **Human-readable section** - Text description for manual review
- **Machine-readable headers** - ARF feedback headers with XARF extension
- **JSON payload** - Base64-encoded XARF v4 report

---

## Part 1: Human-Readable Description

The first MIME part provides a human-readable description of the report for manual processing or preview.

```
Content-Type: text/plain
Content-Transfer-Encoding: 7bit

This is an automated abuse report from Example Security Team.

Report Details:
- Type: DDoS Attack
- Source IP: 192.0.2.100
- Timestamp: 2024-01-15T14:30:00Z
- Reference ID: DDOS-2024-001

Please review the attached XARF report for complete details and evidence.
For questions, contact abuse@example.com
```

**Best Practices:**
- Keep it concise and informative
- Include key report details (type, source, timestamp)
- Provide contact information
- Reference the attached XARF JSON for full details

---

## Part 2: Machine-Readable Feedback Headers

The second MIME part contains ARF-style feedback headers with an important XARF-specific extension.

```
Content-Type: message/feedback-report
Content-Disposition: inline

Feedback-Type: xarf
User-Agent: ExampleSecurity/2.0
Version: 1
```

### Required Headers

| Header | Value | Description |
|--------|-------|-------------|
| `Feedback-Type` | `xarf` | **Critical:** Signals XARF format (unofficial ARF extension) |
| `User-Agent` | String | Identifies the sending system/software |
| `Version` | `1` | ARF version (always `1` per RFC5965) |

### The `Feedback-Type: xarf` Extension

**Important:** The `xarf` feedback type is an **unofficial extension** to RFC5965. The standard only defines these feedback types:
- `abuse` - Generic abuse reports
- `fraud` - Fraud reports
- `virus` - Virus/malware reports
- `other` - Other types
- `not-spam` - False positive spam reports

**How it works:**
1. **XARF-compatible receivers** recognize `Feedback-Type: xarf` and parse the JSON payload
2. **Standard ARF receivers** reject the unknown feedback type and ignore the message
3. This creates a **graceful degradation** mechanism for backward compatibility

---

## Part 3: XARF JSON Payload

The third MIME part contains the actual XARF v4 report as a base64-encoded JSON document.

```
Content-Type: application/json; name=xarf.json
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename=xarf.json

ewogICJ4YXJmX3ZlcnNpb24iOiAiNC4wLjAiLAogICJyZXBvcnRfaWQiOiAiNTUwZTg0MDAtZTI5
Yi00MWQ0LWE3MTYtNDQ2NjU1NDQwMDAwIiwKICAidGltZXN0YW1wIjogIjIwMjQtMDEtMTVUMTQ6
MzA6MDBaIiwKICAiY2F0ZWdvcnkiOiAiY29ubmVjdGlvbiIsCiAgInR5cGUiOiAiZGRvcyIsCiAg
InJlcG9ydGVyIjogewogICAgIm9yZyI6ICJFeGFtcGxlIFNlY3VyaXR5IiwKICAgICJjb250YWN0
IjogImFidXNlQGV4YW1wbGUuY29tIiwKICAgICJ0eXBlIjogImF1dG9tYXRlZCIKICB9LAogICJz
ZW5kZXIiOiB7CiAgICAib3JnIjogIkV4YW1wbGUgU2VjdXJpdHkiLAogICAgImNvbnRhY3QiOiAi
YWJ1c2VAZXhhbXBsZS5jb20iCiAgfSwKICAic291cmNlX2lkZW50aWZpZXIiOiAiMTkyLjAuMi4x
MDAiLAogICJzb3VyY2VfcG9ydCI6IDU0MzIxLAogICJkZXN0aW5hdGlvbl9pcCI6ICIyMDMuMC4x
MTMuMTAwIiwKICAiZGVzdGluYXRpb25fcG9ydCI6IDgwLAogICJwcm90b2NvbCI6ICJ0Y3AiLAog
ICJwYWNrZXRfY291bnQiOiA1MDAwMCwKICAiYnl0ZV9jb3VudCI6IDc1MDAwMDAwLAogICJldmlk
ZW5jZV9zb3VyY2UiOiAiZmxvd19hbmFseXNpcyIsCiAgInRhZ3MiOiBbImF0dGFjazp2b2x1bWV0
cmljIiwgInNldmVyaXR5OmNyaXRpY2FsIl0sCiAgImNvbmZpZGVuY2UiOiAwLjk4Cn0=
```

**Key Points:**
- **Content-Type:** `application/json` (not `message/rfc822` like traditional ARF)
- **Encoding:** Base64 (RFC 4648) with no line breaks in production
- **Filename:** Conventionally `xarf.json`
- **Format:** Valid XARF v4 JSON document

---

## Complete Example

Here's a complete XARF email with all three parts:

```
Content-Type: multipart/report; report-type=feedback-report;
    boundary="----_NmP-f348b15e0b4a4931-Part_1"
From: Example Security <noreply@example.com>
To: Abuse Team <abuse@isp.example.net>
Subject: XARF Abuse Report - DDoS Attack from 192.0.2.100
Message-ID: <9a271f0f-8929-421b-5bfa-80e50dabf32d@example.com>
Date: Tue, 15 Jan 2024 14:30:47 +0000
MIME-Version: 1.0

------_NmP-f348b15e0b4a4931-Part_1
Content-Type: text/plain
Content-Transfer-Encoding: 7bit

This is an automated abuse report from Example Security Team.

Report Details:
- Type: DDoS Attack
- Source IP: 192.0.2.100
- Timestamp: 2024-01-15T14:30:00Z
- Reference ID: DDOS-2024-001

Please review the attached XARF report for complete details and evidence.
For questions, contact abuse@example.com

------_NmP-f348b15e0b4a4931-Part_1
Content-Type: message/feedback-report
Content-Disposition: inline

Feedback-Type: xarf
User-Agent: ExampleSecurity/2.0
Version: 1

------_NmP-f348b15e0b4a4931-Part_1
Content-Type: application/json; name=xarf.json
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename=xarf.json

ewogICJ4YXJmX3ZlcnNpb24iOiAiNC4wLjAiLAogICJyZXBvcnRfaWQiOiAiNTUwZTg0MDAtZTI5
Yi00MWQ0LWE3MTYtNDQ2NjU1NDQwMDAwIiwKICAidGltZXN0YW1wIjogIjIwMjQtMDEtMTVUMTQ6
MzA6MDBaIiwKICAiY2F0ZWdvcnkiOiAiY29ubmVjdGlvbiIsCiAgInR5cGUiOiAiZGRvcyIsCiAg
InJlcG9ydGVyIjogewogICAgIm9yZyI6ICJFeGFtcGxlIFNlY3VyaXR5IiwKICAgICJjb250YWN0
IjogImFidXNlQGV4YW1wbGUuY29tIiwKICAgICJ0eXBlIjogImF1dG9tYXRlZCIKICB9LAogICJz
ZW5kZXIiOiB7CiAgICAib3JnIjogIkV4YW1wbGUgU2VjdXJpdHkiLAogICAgImNvbnRhY3QiOiAi
YWJ1c2VAZXhhbXBsZS5jb20iCiAgfSwKICAic291cmNlX2lkZW50aWZpZXIiOiAiMTkyLjAuMi4x
MDAiLAogICJzb3VyY2VfcG9ydCI6IDU0MzIxLAogICJkZXN0aW5hdGlvbl9pcCI6ICIyMDMuMC4x
MTMuMTAwIiwKICAiZGVzdGluYXRpb25fcG9ydCI6IDgwLAogICJwcm90b2NvbCI6ICJ0Y3AiLAog
ICJwYWNrZXRfY291bnQiOiA1MDAwMCwKICAiYnl0ZV9jb3VudCI6IDc1MDAwMDAwLAogICJldmlk
ZW5jZV9zb3VyY2UiOiAiZmxvd19hbmFseXNpcyIsCiAgInRhZ3MiOiBbImF0dGFjazp2b2x1bWV0
cmljIiwgInNldmVyaXR5OmNyaXRpY2FsIl0sCiAgImNvbmZpZGVuY2UiOiAwLjk4Cn0=

------_NmP-f348b15e0b4a4931-Part_1--
```

### Decoded JSON Payload

The base64-encoded payload decodes to this XARF v4 report:

```json
{
  "xarf_version": "4.0.0",
  "report_id": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2024-01-15T14:30:00Z",
  "category": "connection",
  "type": "ddos",
  "reporter": {
    "org": "Example Security",
    "contact": "abuse@example.com",
    "domain": "example.com"
  },
  "sender": {
    "org": "Example Security",
    "contact": "abuse@example.com",
    "domain": "example.com"
  },
  "source_identifier": "192.0.2.100",
  "source_port": 54321,
  "destination_ip": "203.0.113.100",
  "destination_port": 80,
  "protocol": "tcp",
  "packet_count": 50000,
  "byte_count": 75000000,
  "evidence_source": "flow_analysis",
  "tags": ["attack:volumetric", "severity:critical"],
  "confidence": 0.98
}
```

---

## Implementation Guide

### Sending XARF via Email

<details class="code-example" markdown="1">
<summary>Python Example</summary>

```python
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import smtplib
import base64
import json

def send_xarf_via_email(xarf_report, recipient_email, sender_email):
    """Send XARF report via email using RFC5965 structure"""

    # Create multipart/report message
    msg = MIMEMultipart('report', report_type='feedback-report')
    msg['From'] = sender_email
    msg['To'] = recipient_email
    msg['Subject'] = f"XARF Abuse Report - {xarf_report['type']} from {xarf_report['source_identifier']}"

    # Part 1: Human-readable description
    human_readable = f"""This is an automated abuse report.

Report Details:
- Type: {xarf_report['type']}
- Source IP: {xarf_report['source_identifier']}
- Timestamp: {xarf_report['timestamp']}
- Reference ID: {xarf_report['report_id']}

Please review the attached XARF report for complete details.
For questions, contact {xarf_report['reporter']['contact']}
"""

    part1 = MIMEText(human_readable, 'plain')
    msg.attach(part1)

    # Part 2: Machine-readable feedback headers
    feedback_headers = """Feedback-Type: xarf
User-Agent: YourSystem/1.0
Version: 1
"""

    part2 = MIMEBase('message', 'feedback-report')
    part2.set_payload(feedback_headers)
    part2.add_header('Content-Disposition', 'inline')
    msg.attach(part2)

    # Part 3: XARF JSON payload (base64-encoded)
    json_payload = json.dumps(xarf_report, indent=2)
    encoded_payload = base64.b64encode(json_payload.encode('utf-8')).decode('ascii')

    part3 = MIMEBase('application', 'json', name='xarf.json')
    part3.set_payload(encoded_payload)
    part3.add_header('Content-Transfer-Encoding', 'base64')
    part3.add_header('Content-Disposition', 'attachment', filename='xarf.json')
    msg.attach(part3)

    # Send email
    with smtplib.SMTP('smtp.example.com', 587) as server:
        server.starttls()
        server.login(sender_email, 'password')
        server.send_message(msg)

    print(f"XARF report sent to {recipient_email}")

# Example usage
xarf_report = {
    "xarf_version": "4.0.0",
    "report_id": "550e8400-e29b-41d4-a716-446655440000",
    "timestamp": "2024-01-15T14:30:00Z",
    "category": "connection",
    "type": "ddos",
    "reporter": {
        "org": "Example Security",
        "contact": "abuse@example.com",
        "domain": "example.com"
    },
    "sender": {
        "org": "Example Security",
        "contact": "abuse@example.com",
        "domain": "example.com"
    },
    "source_identifier": "192.0.2.100"
}

send_xarf_via_email(xarf_report, "abuse@isp.example.net", "noreply@example.com")
```
</details>

<details class="code-example" markdown="1">
<summary>Node.js Example</summary>

```javascript
const nodemailer = require('nodemailer');

async function sendXARFViaEmail(xarfReport, recipientEmail, senderEmail) {
  // Create transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    secure: false,
    auth: {
      user: senderEmail,
      pass: 'password'
    }
  });

  // Human-readable part
  const humanReadable = `This is an automated abuse report.

Report Details:
- Type: ${xarfReport.type}
- Source IP: ${xarfReport.source_identifier}
- Timestamp: ${xarfReport.timestamp}
- Reference ID: ${xarfReport.report_id}

Please review the attached XARF report for complete details.
For questions, contact ${xarfReport.reporter.contact}
`;

  // Feedback headers part
  const feedbackHeaders = `Feedback-Type: xarf
User-Agent: YourSystem/1.0
Version: 1
`;

  // JSON payload (base64-encoded)
  const jsonPayload = JSON.stringify(xarfReport, null, 2);
  const encodedPayload = Buffer.from(jsonPayload).toString('base64');

  // Send email with attachments
  await transporter.sendMail({
    from: senderEmail,
    to: recipientEmail,
    subject: `XARF Abuse Report - ${xarfReport.type} from ${xarfReport.source_identifier}`,
    text: humanReadable,
    headers: {
      'Content-Type': 'multipart/report; report-type=feedback-report'
    },
    attachments: [
      {
        contentType: 'message/feedback-report',
        content: feedbackHeaders,
        contentDisposition: 'inline'
      },
      {
        filename: 'xarf.json',
        contentType: 'application/json',
        content: encodedPayload,
        encoding: 'base64'
      }
    ]
  });

  console.log(`XARF report sent to ${recipientEmail}`);
}
```
</details>

### Receiving XARF via Email

<details class="code-example" markdown="1">
<summary>Python Parser</summary>

```python
import email
import base64
import json
from email import policy

def parse_xarf_email(email_content):
    """Parse XARF report from email message"""

    # Parse email
    msg = email.message_from_string(email_content, policy=policy.default)

    # Check if it's a multipart/report
    if not msg.is_multipart() or msg.get_content_type() != 'multipart/report':
        raise ValueError("Not a valid XARF email")

    xarf_json = None
    feedback_type = None

    # Iterate through parts
    for part in msg.walk():
        # Check feedback headers
        if part.get_content_type() == 'message/feedback-report':
            content = part.get_payload(decode=True).decode('utf-8')
            for line in content.split('\n'):
                if line.startswith('Feedback-Type:'):
                    feedback_type = line.split(':', 1)[1].strip()

        # Extract JSON payload
        elif part.get_content_type() == 'application/json':
            encoded_content = part.get_payload()
            decoded_content = base64.b64decode(encoded_content)
            xarf_json = json.loads(decoded_content)

    # Validate it's a XARF report
    if feedback_type != 'xarf':
        raise ValueError(f"Not a XARF report (Feedback-Type: {feedback_type})")

    if not xarf_json:
        raise ValueError("No XARF JSON payload found")

    return xarf_json

# Example usage
with open('xarf_email.eml', 'r') as f:
    email_content = f.read()

xarf_report = parse_xarf_email(email_content)
print(json.dumps(xarf_report, indent=2))
```
</details>

---

## Best Practices

### Email Headers

**Use descriptive subject lines:**
```
Subject: XARF Abuse Report - DDoS Attack from 192.0.2.100
```

**Include proper From/To addresses:**
```
From: Security Team <abuse@example.com>
To: ISP Abuse <abuse@isp.example.net>
```

**Set appropriate Message-ID:**
```
Message-ID: <{report_id}@{sender_domain}>
```

### Human-Readable Section

- **Be concise** - Keep description under 10 lines
- **Include key details** - Type, source, timestamp, reference ID
- **Provide contact info** - Email or ticket system for questions
- **Reference attachment** - Mention the XARF JSON for full details

### JSON Payload

- **Validate before sending** - Ensure XARF v4 compliance
- **Use proper encoding** - Base64 (RFC 4648)
- **Include all mandatory fields** - Follow XARF v4 specification
- **Keep evidence reasonable** - Don't exceed 15MB total

### Error Handling

**Handle bounces gracefully:**
```python
def handle_bounce(bounce_message):
    """Process email bounces for XARF reports"""
    # Parse bounce to extract original report_id
    # Log failed delivery
    # Retry with alternative contact or transport
```

**Monitor delivery:**
- Track sent reports
- Monitor bounce rates
- Implement retry logic
- Have fallback transport methods

---

## Transport Alternatives

While email is common, XARF supports multiple transport mechanisms:

| Transport | Use Case | Advantages |
|-----------|----------|------------|
| **Email (SMTP)** | Traditional abuse reporting | Wide adoption, human-readable |
| **HTTPS POST** | API integration | Real-time, programmatic, reliable |
| **Message Queue** | High-volume processing | Scalable, asynchronous, durable |
| **Webhook** | Event-driven workflows | Real-time notifications |
| **FTP/SFTP** | Batch delivery | Large volumes, scheduled delivery |

See our [API Integration Guide](/docs/api-integration/) for non-email transport methods.

---

## FAQ

**Q: Can I use XARF v4 with existing ARF infrastructure?**

A: Yes, with minimal modifications. Existing ARF parsers need to:
1. Recognize `Feedback-Type: xarf`
2. Parse `application/json` payload instead of `message/rfc822`
3. Validate against XARF v4 schema

**Q: What happens if the receiver doesn't support XARF?**

A: Standard ARF receivers will reject the `Feedback-Type: xarf` and ignore the message, providing graceful degradation.

**Q: Should I use email or API transport?**

A: It depends:
- **Email:** Better for traditional abuse desks, human review, lower volumes
- **API:** Better for automated systems, high volumes, real-time processing

**Q: How do I handle large evidence files?**

A: For evidence >5MB:
1. Upload to secure storage
2. Include download URL in XARF report
3. Use `evidence` field with link instead of embedded payload

**Q: Is the email structure compatible with XARF v3?**

A: Yes, the MIME structure is identical. Only the JSON payload schema differs between v3 and v4.

---

## Related Documentation

- **[Technical Specification](/docs/specification/)** - Complete XARF v4 schema
- **[Implementation Guide](/docs/implementation-guide/)** - General integration patterns
- **[Best Practices](/docs/best-practices/)** - Advanced tips and recommendations
- **[API Integration](/docs/api-integration/)** - Using HTTPS/REST transport

---

**Questions?** Join the discussion on [GitHub](https://github.com/xarf/xarf-spec/discussions) or contact the XARF community.
