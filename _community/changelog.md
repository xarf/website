---
layout: docs
title: "Changelog"
description: "XARF specification version history and changes"
permalink: /community/changelog/
---

# Changelog

All notable changes to the XARF specification will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [4.0.0] - 2024-01-15

### Overview

XARF v4.0 is a major release representing a complete redesign of the abuse reporting format. This version introduces a modern JSON-based structure, comprehensive event type coverage, and extensive validation through JSON Schema.

### Added

#### Core Features
- **JSON-based format** - Modern, machine-readable structure replacing XML/email-based formats
- **JSON Schema validation** - Comprehensive validation for all report types
- **8 event classifications** - Organized taxonomy covering all abuse categories
- **58+ event types** - Specific types for granular abuse categorization
- **Evidence framework** - Structured evidence collection with hashing support
- **Reporter metadata** - Rich context about report sources
- **Confidence scoring** - Optional confidence levels for automated reports

#### Event Classifications

**Abuse** (5 types):
- `ddos` - Distributed denial of service attacks
- `malware` - Malware distribution and C&C
- `phishing` - Credential theft attempts
- `spam` - Unsolicited bulk email
- `scanner` - Port scanning and probing

**Vulnerability** (3 types):
- `cve` - Known CVE instances
- `misconfiguration` - Security misconfigurations
- `open_service` - Unintended public services

**Connection** (3 types):
- `compromised` - Compromised system indicators
- `botnet` - Botnet membership
- `malicious_traffic` - Suspicious network activity

**Content** (3 types):
- `illegal` - Illegal content hosting
- `malicious` - Malicious content distribution
- `policy_violation` - Terms of service violations

**Copyright** (3 types):
- `infringement` - Copyright violations
- `dmca` - DMCA takedown notices
- `trademark` - Trademark infringement

**Messaging** (2 types):
- `bulk_messaging` - Unsolicited bulk communications
- `spam` - Email/messaging spam

**Reputation** (2 types):
- `blocklist` - IP/domain blocklist entries
- `threat_intelligence` - IOC sharing

**Infrastructure** (2 types):
- `botnet` - Botnet participation
- `compromised_server` - Compromised servers

#### Features

- **Evidence hashing** - SHA-256 hash support for evidence integrity
- **Flexible timestamps** - ISO 8601 format with timezone support
- **Tag system** - Extensible tagging for categorization
- **Severity levels** - Optional severity classification (low/medium/high/critical)
- **Multi-protocol support** - HTTP, SMTP, DNS, and custom protocols
- **Geolocation data** - Optional geographic information
- **Reference linking** - Cross-reference related reports
- **Custom fields** - Extensibility without breaking validation

#### Libraries

- **Python library** - Full implementation with validation
- **Documentation** - Comprehensive guides and examples

#### Tools

- **Schema validator** - Online validation tool
- **Sample generator** - Test report generator
- **Format converter** - Convert from ARF, IODEF, CSV

#### Documentation

- **Complete specification** - Detailed technical documentation
- **Implementation guide** - Step-by-step integration instructions
- **Sample reports** - Examples for all event types
- **Best practices** - Guidelines for effective reporting
- **Migration guide** - Moving from legacy formats
- **API reference** - Library documentation

### Changed

#### Breaking Changes from v3.x

- **Format change**: XML → JSON
- **Content types**: New classification/type system replaces old Report-Type
- **Evidence structure**: New structured evidence array replaces text fields
- **Required fields**: Additional mandatory fields for better data quality
- **Naming conventions**: snake_case for all field names

#### Migration Path

For users migrating from v3.x:

1. Update tooling to support JSON format
2. Map old Report-Type values to new classification/type combinations
3. Restructure evidence into new array format
4. Update field names to snake_case
5. Validate against new JSON schemas

See [Migration Guide](/docs/migration/) for detailed instructions.

### Deprecated

- **XARF v3.x** - Deprecated, support ends 2024-12-31
- **XARF v2.x** - End of life, no longer supported
- **ARF format** - Use XARF v4 for new implementations

### Removed

- **XML format** - No longer supported
- **Email-based reporting** - Use JSON over HTTP/HTTPS
- **Legacy Report-Type values** - Use new classification/type system

### Fixed

N/A - Initial v4.0 release

### Security

- **Evidence hashing** - Cryptographic verification of evidence integrity
- **Schema validation** - Prevent malformed reports
- **TLS requirement** - HTTPS recommended for transport
- **PII handling** - Guidelines for privacy compliance

---

## [3.1.0] - 2023-06-20

### Added
- Support for cryptocurrency abuse reporting
- New `crypto-scam` Report-Type
- Enhanced evidence field with base64 encoding

### Changed
- Updated XML schema for better validation
- Improved documentation clarity

### Fixed
- Schema validation errors with nested evidence
- Timezone handling in timestamps

---

## [3.0.0] - 2022-11-10

### Added
- Support for IoT device abuse
- New Report-Types for smart device attacks
- Enhanced geolocation fields

### Changed
- **Breaking**: Updated schema namespace
- **Breaking**: Changed evidence field structure
- Improved validation rules

### Deprecated
- Old evidence format (plain text only)

---

## [2.5.0] - 2021-08-15

### Added
- Cloud service abuse reporting
- Support for SaaS-specific abuse types
- API abuse reporting

### Changed
- Enhanced reporter identification
- Better handling of automated reports

---

## [2.0.0] - 2020-03-01

### Added
- Mobile app abuse reporting
- Social media abuse types
- Enhanced evidence collection

### Changed
- **Breaking**: New schema version
- Updated namespace URIs

---

## Version History Summary

| Version | Release Date | Status | Support Until |
|---------|--------------|--------|---------------|
| **4.0.0** | 2024-01-15 | Current | Active |
| 3.1.0 | 2023-06-20 | Deprecated | 2024-12-31 |
| 3.0.0 | 2022-11-10 | End of Life | 2023-12-31 |
| 2.5.0 | 2021-08-15 | End of Life | 2023-06-30 |
| 2.0.0 | 2020-03-01 | End of Life | 2022-12-31 |

---

## Support Policy

### Current Version (4.x)
- **Full support** - Active development and bug fixes
- **New features** - Regular updates and improvements
- **Long-term support** - Minimum 3 years

### Previous Version (3.x)
- **Maintenance mode** - Critical bug fixes only
- **Deprecation notice** - Support ends 2024-12-31
- **Migration recommended** - Upgrade to 4.0 before EOL

### Older Versions (2.x and earlier)
- **End of life** - No support or updates
- **Security issues** - No patches will be released
- **Migration required** - Upgrade immediately

---

## Upgrade Recommendations

### From 3.x to 4.0

**Priority: High**

Upgrade before 2024-12-31 when v3.x support ends.

**Steps**:
1. Read the [Migration Guide](/docs/migration/)
2. Test with the [Format Converter](/tools/converter/)
3. Update libraries to v4-compatible versions
4. Validate reports with new schemas
5. Deploy updated integration

**Estimated effort**: 2-4 weeks for typical implementation

### From 2.x to 4.0

**Priority: Critical**

Version 2.x is end-of-life with no security updates.

**Steps**:
1. Review all breaking changes from 2.x → 3.x → 4.x
2. Plan comprehensive migration
3. Consider consulting services for large deployments
4. Extensive testing required

**Estimated effort**: 1-3 months depending on integration complexity

---

## Future Roadmap

### v4.1 (Q2 2024)
- Additional AI/ML abuse types
- Enhanced validation rules
- Performance improvements

### v4.2 (Q4 2024)
- Blockchain abuse reporting
- Enhanced cryptocurrency support
- New evidence types

### v5.0 (2025)
- TBD based on community feedback
- Potential breaking changes will be announced 12 months in advance

---

## Contributing

Want to propose changes to XARF?

- **Read**: [Contributing Guide](/community/contributing/)
- **Discuss**: [GitHub Discussions](https://github.com/xarf/xarf-spec/discussions)
- **Propose**: [Submit a proposal](https://github.com/xarf/xarf-spec/issues/new?template=proposal.md)

---

## Semantic Versioning

XARF follows [Semantic Versioning 2.0.0](https://semver.org/):

- **MAJOR** (X.0.0): Breaking changes requiring code updates
- **MINOR** (4.X.0): New features, backward compatible
- **PATCH** (4.0.X): Bug fixes, backward compatible

---

## Notification of Changes

Stay updated on XARF releases:

- **[GitHub Releases](https://github.com/xarf/xarf-spec/releases)** - Official release announcements
- **[Mailing List](https://groups.google.com/g/xarf-announce)** - Email notifications
- **[RSS Feed](https://github.com/xarf/xarf-spec/releases.atom)** - Subscribe to updates
- **[Twitter](https://twitter.com/xarf_org)** - Social media announcements

---

[4.0.0]: https://github.com/xarf/xarf-spec/releases/tag/v4.0.0
[3.1.0]: https://github.com/xarf/xarf-spec/releases/tag/v3.1.0
[3.0.0]: https://github.com/xarf/xarf-spec/releases/tag/v3.0.0
[2.5.0]: https://github.com/xarf/xarf-spec/releases/tag/v2.5.0
[2.0.0]: https://github.com/xarf/xarf-spec/releases/tag/v2.0.0
