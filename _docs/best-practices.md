---
layout: docs
title: "Best Practices for Reporting"
description: "Guidelines for creating effective and actionable XARF reports"
permalink: /docs/best-practices/
---

# Best Practices for Reporting

Creating effective XARF reports requires attention to detail, proper evidence collection, and adherence to privacy standards. This guide provides practical recommendations for generating high-quality abuse reports that recipients can act upon quickly.

## Choosing the Right Content Type

Selecting the appropriate `Report-Type` is crucial for proper report routing and handling.

### Guidelines

**DO:**
- Use specific content types when available (e.g., `login-attack` instead of generic `abuse`)
- Review the full list of registered content types before defaulting to `fraud` or `abuse`
- Consider the primary abuse category, not secondary effects (e.g., phishing is `fraud`, even if it contains malware)

**DON'T:**
- Mix multiple abuse types in a single report (send separate reports instead)
- Use deprecated or non-standard content types
- Guess at content types—if uncertain, use the most general applicable type

### Common Scenarios

| Abuse Type | Correct Report-Type | Notes |
|------------|-------------------|-------|
| Brute force SSH attacks | `login-attack` | Not `abuse` or `security` |
| Email spam | `spam` or `email-spam` | Use `email-spam` if registered |
| Credit card phishing | `fraud` | Primary category is fraud |
| DDoS attacks | `dos-attack` | Not `network-abuse` |
| Malware distribution | `malware` | Even if via email |
| Port scanning | `scanning` | Not `security` or `abuse` |

## Evidence Collection and Hashing

Quality evidence makes reports actionable. Poor evidence wastes everyone's time.

### Evidence Guidelines

**DO:**
- Include complete, unmodified log entries with timestamps
- Provide full email headers for email-based abuse
- Include HTTP request/response pairs for web-based abuse
- Use UTC timestamps or clearly indicate timezone
- Hash large evidence files and provide retrieval methods
- Preserve original encoding and formatting

**DON'T:**
- Truncate or summarize log entries
- Remove headers you think are "irrelevant"
- Modify evidence to "clean it up"
- Include only partial data (e.g., just a URL without context)
- Mix evidence from multiple incidents in one report

### Hashing Best Practices

When evidence is too large to include directly:

```yaml
# Example of proper evidence hashing
Evidence:
  - Type: pcap
    Filename: ddos-capture-20250316-143022.pcap
    Size: 2847392
    Hash-Algorithm: SHA-256
    Hash: 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
    Available-At: https://evidence.example.com/reports/12345/ddos-capture.pcap
    Expires: 2025-04-15T14:30:22Z
```

**DO:**
- Use SHA-256 or stronger hash algorithms
- Provide secure, authenticated download URLs
- Set reasonable expiration times (7-30 days)
- Include file size for download planning
- Verify hashes before sending reports

**DON'T:**
- Use MD5 or SHA-1 for new reports
- Provide unauthenticated public URLs to sensitive evidence
- Set expiration times less than 48 hours
- Forget to test download URLs before sending

## Timing: When to Send Reports

Report timing affects both actionability and recipient processing capacity.

### Real-Time Reporting

**Best for:**
- Active attacks requiring immediate response (DDoS, ongoing intrusions)
- High-confidence automated detections (known malware hashes)
- Critical infrastructure targeting
- Active phishing sites or C2 servers

**Implementation:**
```python
# Send immediately when confidence is high
if threat_score > 0.95 and is_active:
    send_xarf_report(incident)
```

### Batch Reporting

**Best for:**
- Historical log analysis
- Low-to-medium severity issues
- Bulk spam complaints
- Scheduled security scans
- Rate-limited reporting systems

**Implementation:**
```python
# Aggregate and send daily
daily_reports = aggregate_incidents(last_24_hours)
if len(daily_reports) > 0:
    send_batch_xarf_reports(daily_reports)
```

### Timing Considerations

**DO:**
- Send real-time for actionable, ongoing threats
- Batch low-severity issues to avoid overwhelming recipients
- Include `Date` field showing when abuse occurred, not when report was sent
- Consider recipient time zones for batch scheduling
- Implement rate limiting to avoid being flagged as spam

**DON'T:**
- Send real-time reports for historical data
- Delay critical security issues for batching
- Send thousands of individual reports when one summary would suffice
- Report the same incident multiple times
- Send reports during recipient maintenance windows if known

## Providing Sufficient Context

Context helps recipients understand, prioritize, and act on reports.

### Essential Context Elements

1. **What happened**: Clear description of the abuse
2. **When it happened**: Precise timestamps
3. **Where it came from**: Source IP, domain, or identifier
4. **What was affected**: Target systems or users
5. **How you detected it**: Detection method and confidence level
6. **Why it matters**: Impact assessment

### Context Examples

**Poor Context:**
```
Subject: Abuse Report
Body: IP address 192.0.2.45 is bad.
```

**Good Context:**
```
Subject: SSH Brute Force Attack from 192.0.2.45
Body:
Source IP 192.0.2.45 conducted a brute force attack against our SSH
servers over a 4-hour period (2025-03-16 14:00-18:00 UTC), attempting
12,847 login attempts across 45 usernames. Attack was detected by our
IDS (Suricata) with high confidence (score: 0.98). No successful
authentications occurred. Full logs attached.
```

**DO:**
- Provide quantitative data (number of attempts, duration, volume)
- Explain detection methodology
- Include confidence scores when available
- Reference relevant standards or threat intelligence
- Specify impact (actual or potential)

**DON'T:**
- Use vague language ("suspicious activity")
- Omit timestamps or use relative times ("yesterday")
- Skip impact assessment
- Assume recipient has context you have
- Use jargon without explanation

## Privacy Considerations

XARF reports may contain sensitive data. Handle privacy responsibly.

### What to Include

**DO Include:**
- Source IP addresses and domains directly involved in abuse
- Relevant network metadata (ports, protocols, packet counts)
- Email headers and routing information
- URLs and command-and-control infrastructure
- Malware hashes and signatures
- Attack patterns and techniques

### What to Exclude or Redact

**DON'T Include:**
- Victim personally identifiable information (PII) unless absolutely necessary
- User passwords or credentials (even hashed)
- Full credit card numbers or financial account details
- Medical or health information
- Unnecessary surveillance data
- Information about uninvolved third parties

### Redaction Examples

**Before (Don't do this):**
```
User john.smith@victim.com (SSN: 123-45-6789) had his account
compromised. The attacker used password 'MyP@ssw0rd123' to access
credit card ending in 4532-1234-5678-9012.
```

**After (Proper redaction):**
```
User account at victim.com was compromised via credential stuffing.
Attacker accessed account and attempted unauthorized transactions.
User has been notified and credentials reset.
```

### Privacy Best Practices

**DO:**
- Minimize data to what's necessary for response
- Redact PII from log files
- Use placeholders for sensitive data ([REDACTED], [USER_ID])
- Encrypt reports containing sensitive evidence
- Document your privacy policy in report metadata
- Comply with GDPR, CCPA, and other relevant regulations

**DON'T:**
- Include full database dumps
- Share victim communications verbatim
- Expose internal network architecture unnecessarily
- Include personal details unrelated to the abuse
- Forget that recipients may be required to disclose reports

## Report Quality Guidelines

High-quality reports get acted upon. Low-quality reports get ignored.

### Quality Checklist

- [ ] All required XARF fields populated
- [ ] Evidence is complete and unmodified
- [ ] Timestamps are in UTC or clearly labeled
- [ ] Source attribution is accurate
- [ ] Report-Type matches abuse category
- [ ] Contact information is current
- [ ] Evidence is accessible and valid
- [ ] Schema validation passes
- [ ] No false positives (verified manually if automated)
- [ ] Privacy considerations addressed

### Quality Metrics to Track

Monitor your reporting effectiveness:

```yaml
Quality Indicators:
  - False positive rate: < 1%
  - Reports with responses: > 60%
  - Average response time: < 48 hours
  - Reports requiring clarification: < 10%
  - Schema validation failures: 0%
  - Evidence retrieval failures: < 2%
```

### Continuous Improvement

**DO:**
- Track which report types get the best response rates
- Solicit feedback from recipients
- Review and improve automated detection rules
- Document lessons learned from false positives
- Update templates based on recipient feedback
- Perform regular quality audits

**DON'T:**
- Keep sending reports that never get responses (investigate why)
- Ignore recipient requests for specific evidence formats
- Let automated systems run without human review
- Assume your process is perfect
- Stop learning from mistakes

## Common Mistakes to Avoid

### Mistake 1: Over-Reporting

**Problem:**
Sending hundreds of individual reports for a single attack campaign.

**Solution:**
Aggregate related incidents and send summary reports with representative samples.

```yaml
# Instead of 1000 individual reports, send one aggregated report
Summary: SSH brute force campaign from botnet
Incident-Count: 1247
Sample-Incidents: [included below]
Full-Data: https://evidence.example.com/campaign-12345/
```

### Mistake 2: Under-Reporting

**Problem:**
Omitting critical details to save time or space.

**Solution:**
Include all relevant evidence. If size is an issue, use hashing and external storage.

### Mistake 3: Stale Data

**Problem:**
Reporting abuse days or weeks after it occurred.

**Solution:**
Implement real-time or daily reporting. If historical reporting is necessary, clearly indicate the time lag and explain why.

### Mistake 4: Wrong Recipients

**Problem:**
Sending reports to abuse contacts who can't act on them.

**Solution:**
Use WHOIS, abuse.net, or other authoritative sources to identify correct abuse contacts. Verify before sending.

### Mistake 5: Malformed Reports

**Problem:**
Invalid YAML, missing required fields, or schema violations.

**Solution:**
Validate all reports against the XARF schema before sending. Use a parser library.

```python
import xarf_parser

# Validate before sending
try:
    report = xarf_parser.parse(report_yaml)
    if report.validate():
        send_report(report)
except xarf_parser.ValidationError as e:
    log_error(f"Invalid report: {e}")
```

### Mistake 6: No Follow-Up Process

**Problem:**
Sending reports into the void with no tracking or follow-up.

**Solution:**
Implement a tracking system with report IDs, response monitoring, and escalation procedures.

### Mistake 7: Ignoring Feedback

**Problem:**
Recipients request changes or clarifications, but reporter continues using old format.

**Solution:**
Maintain recipient profiles with preferences. Update templates based on feedback.

## Testing and Validation

Never send production reports without testing your process.

### Pre-Deployment Testing

**DO:**
- Test against XARF schema validation tools
- Send test reports to yourself first
- Verify evidence URLs are accessible from external networks
- Test with multiple parsers to ensure compatibility
- Validate timestamp formats and timezones
- Check encryption/signing if used

**DON'T:**
- Test with production abuse contacts
- Skip validation steps
- Assume your YAML is valid without checking
- Send test reports to real recipients
- Use production credentials in tests

### Validation Tools

```bash
# Example validation workflow
xarf-validator report.yaml
xarf-parser --validate report.yaml
yamllint report.yaml
```

### Test Report Template

```yaml
%YAML 1.2
---
Report-ID: test-12345-67890
Report-Type: test
Date: 2025-03-16T15:30:00Z
Source: 192.0.2.1
Source-Type: ip-address
Attachment: ABUSE
Reported-From: security@example.com
Category: abuse
User-Agent: XARF-Reporter/1.0 (Test Mode)
Schema-URL: http://www.x-arf.org/schema/abuse_test_0.1.2.json
```

## Handling Responses and Feedback

Professional response handling builds trust and improves future reports.

### Response Expectations

**Typical Response Times:**
- Acknowledgment: 24-48 hours
- Investigation update: 3-5 days
- Resolution: 7-14 days (varies by severity)

**DO:**
- Acknowledge receipt of responses
- Provide additional evidence if requested
- Update internal tracking systems
- Share relevant updates with affected parties
- Thank recipients for action taken

**DON'T:**
- Expect instant resolution
- Resend the same report if no immediate response
- Argue with recipients about their findings
- Share confidential response details publicly
- Stop reporting if one report is rejected

### Handling Common Responses

#### "Cannot Reproduce"

**Response:**
Provide additional evidence, detailed steps, or time-specific data.

#### "Not Our Customer"

**Response:**
Verify your source attribution. If correct, ask for correct contact or escalation path.

#### "Insufficient Evidence"

**Response:**
Ask what specific evidence is needed. Update your reporting template for future reports.

#### "Resolved"

**Response:**
Verify resolution if possible. Update tracking. Thank recipient.

#### "False Positive"

**Response:**
Investigate your detection logic. Apologize. Update rules to prevent recurrence.

### Building Recipient Relationships

**DO:**
- Maintain a contacts database with recipient preferences
- Note preferred evidence formats and detail levels
- Track response patterns and adjust accordingly
- Participate in abuse reporting communities
- Share feedback on what works well

**DON'T:**
- Treat all recipients identically
- Ignore requests for format changes
- Send reports to deprecated addresses
- Spam recipients with low-quality reports
- Burn bridges over disagreements

## Summary

Effective XARF reporting requires:

1. **Accuracy**: Correct content types, complete evidence, verified data
2. **Timeliness**: Real-time for critical issues, batched for bulk
3. **Context**: Sufficient detail for recipients to understand and act
4. **Privacy**: Minimal data, proper redaction, responsible handling
5. **Quality**: Validated, complete, actionable reports
6. **Testing**: Thorough pre-deployment validation
7. **Professionalism**: Responsive to feedback, continuous improvement

By following these best practices, you'll create reports that recipients can trust, act upon quickly, and that contribute to a safer internet ecosystem.

## Additional Resources

- [XARF Specification](/docs/specification/)
- [Schema Reference](/docs/schema/)
- [Example Reports](/docs/examples/)
- [Implementation Guide](/docs/implementation/)
