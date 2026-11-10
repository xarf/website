---
layout: docs
title: "Go Library - xarf-go"
description: "Official Go library for creating, validating, and processing XARF reports"
permalink: /libraries/go/
---

# XARF Go Library

Official Go library for parsing, validating, and generating XARF (eXtended Abuse Reporting Format) v4 reports.

<div class="library-status">
  <span class="badge badge-success">Stable</span>
  <span>v1.1.0 · Apache-2.0</span>
  <span>Go 1.21+</span>
</div>

<div class="alert alert-success" markdown="1">
**Published on [pkg.go.dev](https://pkg.go.dev/github.com/xarf/xarf-go).** Implements XARF specification **v4.2.0** with support for all 7 categories: messaging, connection, content, infrastructure, copyright, vulnerability, and reputation.
</div>

---

## Installation

```bash
go get github.com/xarf/xarf-go
```

**Requirements**:
- Go 1.21 or higher
- Zero runtime dependencies (testing only)

---

## Two APIs

The library offers two complementary surfaces:

- **Package-level functions** (`Parse`, `CreateReport`, `CreateEvidence`) mirror the official [JavaScript library](https://www.npmjs.com/package/@xarf/xarf): the same schema-driven validation against the embedded v4.2.0 schemas, v3 auto-detection and conversion, strict mode, and identical evidence encoding.
- **Typed constructors** (`NewParser`, `NewValidator`, `NewGenerator`) provide strongly-typed Go structs (`MessagingReport`, `ConnectionReport`, etc.) for category-specific field access.

---

## Package-level API (JavaScript parity)

```go
import "github.com/xarf/xarf-go"

// Parse returns a result with errors/warnings rather than failing; an error is
// returned only for malformed JSON or input exceeding MaxInputBytes. v3 reports
// are auto-detected and converted (with a deprecation warning in Warnings).
result, err := xarf.Parse(data, &xarf.ParseOptions{ShowMissingOptional: true})
if err != nil { /* malformed JSON */ }
if len(result.Errors) == 0 {
    // result.Report is the validated report object (map[string]interface{})
}
// result.Warnings — unknown fields, v3 deprecation
// result.Info     — missing optional/recommended fields (ShowMissingOptional)

// CreateReport auto-fills xarf_version, report_id (UUID), and timestamp.
created := xarf.CreateReport(map[string]any{
    "category": "messaging", "type": "spam",
    "source_identifier": "192.0.2.100", "source_port": 25,
    "protocol": "smtp", "smtp_from": "spammer@example.com",
    "evidence_source": "spamtrap",
    "reporter": map[string]any{"org": "Acme", "contact": "abuse@acme.example", "domain": "acme.example"},
    "sender":   map[string]any{"org": "Acme", "contact": "abuse@acme.example", "domain": "acme.example"},
}, nil)

// CreateEvidence base64-encodes the payload and prefixes the hash with the algorithm.
ev := xarf.CreateEvidence("message/rfc822", rawEmail, &xarf.EvidenceOptions{
    Description: "Original spam email", HashAlgorithm: "sha256",
})
// ev.Payload (base64), ev.Hash ("sha256:<hex>"), ev.Size
```

`ParseOptions.Strict` reports warnings and `x-recommended` fields as errors.

**Version constants**: `xarf.SpecVersion` (`"4.2.0"`), `xarf.BundledSpecVersion` (`"v4.2.0"`), `xarf.Version` (library version).

---

## Typed API

### Parsing a XARF Report

```go
package main

import (
    "fmt"
    "log"

    "github.com/xarf/xarf-go"
)

func main() {
    jsonData := []byte(`{
        "xarf_version": "4.2.0",
        "report_id": "550e8400-e29b-41d4-a716-446655440000",
        "timestamp": "2024-01-15T10:30:00Z",
        "reporter": {
            "org": "Security Team",
            "contact": "abuse@example.com",
            "type": "automated"
        },
        "source_identifier": "192.0.2.100",
        "category": "connection",
        "type": "ddos",
        "evidence_source": "honeypot",
        "destination_ip": "203.0.113.10",
        "protocol": "tcp"
    }`)

    parser := xarf.NewParser(false)
    report, err := parser.Parse(jsonData)
    if err != nil {
        log.Fatal(err)
    }

    // Type assertion to access category-specific fields
    if connReport, ok := report.(*xarf.ConnectionReport); ok {
        fmt.Printf("DDoS attack from %s to %s\n",
            connReport.SourceIdentifier,
            connReport.DestinationIP)
    }
}
```

### Generating a XARF Report

```go
package main

import (
    "encoding/json"
    "fmt"
    "log"

    "github.com/xarf/xarf-go"
)

func main() {
    gen := xarf.NewGenerator()

    opts := xarf.ReportOptions{
        Category:         xarf.CategoryConnection,
        Type:             "ddos",
        SourceIdentifier: "192.0.2.100",
        ReporterContact:  "abuse@example.com",
        ReporterOrg:      "Example Security Team",
        Description:      "Sustained DDoS attack detected",
        Severity:         xarf.SeverityHigh,
    }

    report, err := gen.GenerateReport(opts)
    if err != nil {
        log.Fatal(err)
    }

    jsonData, _ := json.MarshalIndent(report, "", "  ")
    fmt.Println(string(jsonData))
}
```

### Validating a Report

```go
package main

import (
    "fmt"
    "log"

    "github.com/xarf/xarf-go"
)

func main() {
    parser := xarf.NewParser(false)
    report, err := parser.Parse(jsonData)
    if err != nil {
        log.Fatal(err)
    }

    validator := xarf.NewValidator()
    valid, errors := validator.ValidateReport(report)

    if !valid {
        fmt.Println("Validation errors:")
        for _, err := range errors {
            fmt.Printf("  - %s\n", err)
        }
    } else {
        fmt.Println("Report is valid!")
    }
}
```

---

## XARF v3 Backwards Compatibility

The library automatically detects legacy XARF v3 reports and converts them to v4 transparently. With the package-level `Parse`, a v3 deprecation notice is surfaced in `result.Warnings`. With the typed parser, conversion happens in place:

```go
package main

import (
    "fmt"
    "log"

    "github.com/xarf/xarf-go"
)

func main() {
    // V3 format report
    v3Data := []byte(`{
        "Version": "3.0.0",
        "ReporterInfo": {
            "ReporterOrg": "Security Team",
            "ReporterOrgEmail": "abuse@example.com"
        },
        "Report": {
            "ReportClass": "Messaging",
            "ReportType": "spam",
            "SourceIP": "192.0.2.100"
        }
    }`)

    // Parser automatically detects and converts v3
    parser := xarf.NewParser(false)
    report, err := parser.Parse(v3Data)
    if err != nil {
        log.Fatal(err)
    }

    // Now in v4 format
    fmt.Printf("Category: %s\n", report.GetCategory())
}
```

---

## Third-Party Reporting (Reporter vs Sender)

XARF v4 supports third-party reporting through separate `reporter` and `sender` fields:

- **reporter**: The original entity that detected/reported the abuse.
- **sender**: The entity transmitting the report (may be different).

### Direct Reporting (Reporter = Sender)

When you're reporting abuse you directly detected:

```go
package main

import (
    "encoding/json"
    "fmt"
    "time"

    "github.com/xarf/xarf-go"
)

func main() {
    // Direct reporting: you are both reporter and sender
    contactInfo := xarf.ContactInfo{
        Org:     "Example Security Team",
        Contact: "abuse@example.com",
        Domain:  "example.com",
    }

    report := xarf.MessagingReport{
        Report: xarf.Report{
            XARFVersion:      "4.2.0",
            ReportID:         "550e8400-e29b-41d4-a716-446655440000",
            Timestamp:        time.Now(),
            Reporter:         contactInfo, // You detected it
            Sender:           contactInfo, // You're sending it
            SourceIdentifier: "192.0.2.100",
            Category:         xarf.CategoryMessaging,
            Type:             "spam",
            EvidenceSource:   xarf.EvidenceSourceSpamtrap,
        },
        Protocol: "smtp",
    }

    jsonData, _ := json.MarshalIndent(report, "", "  ")
    fmt.Println(string(jsonData))
}
```

### Third-Party Reporting (Reporter ≠ Sender)

When forwarding abuse reports on behalf of others (e.g., an ISP forwarding customer reports):

```go
package main

import (
    "encoding/json"
    "fmt"
    "time"

    "github.com/xarf/xarf-go"
)

func main() {
    // Original reporter (your customer)
    reporter := xarf.ContactInfo{
        Org:     "Customer Organization",
        Contact: "security@customer.com",
        Domain:  "customer.com",
    }

    // Sender (you, forwarding on their behalf)
    sender := xarf.ContactInfo{
        Org:     "Internet Service Provider",
        Contact: "abuse@isp.com",
        Domain:  "isp.com",
    }

    report := xarf.MessagingReport{
        Report: xarf.Report{
            XARFVersion:      "4.2.0",
            ReportID:         "550e8400-e29b-41d4-a716-446655440001",
            Timestamp:        time.Now(),
            Reporter:         reporter, // Customer who detected abuse
            Sender:           sender,   // ISP forwarding the report
            SourceIdentifier: "192.0.2.100",
            Category:         xarf.CategoryMessaging,
            Type:             "spam",
            EvidenceSource:   xarf.EvidenceSourceUserReport,
        },
        Protocol: "smtp",
    }

    jsonData, _ := json.MarshalIndent(report, "", "  ")
    fmt.Println(string(jsonData))
}
```

---

## Supported Categories

All 7 XARF v4.2.0 categories are supported, each with a dedicated typed report struct:

| Category | Report Type | Coverage |
|----------|-------------|----------|
| Messaging | `MessagingReport` | Email and messaging abuse (spam, phishing, social engineering, bulk messaging) |
| Connection | `ConnectionReport` | Network connection abuse (DDoS, port scans, login attacks, SQL injection) |
| Content | `ContentReport` | Web content abuse (phishing sites, malware distribution, defacement) |
| Infrastructure | `InfrastructureReport` | Infrastructure compromise (botnets, compromised servers) |
| Copyright | `CopyrightReport` | Copyright infringement (DMCA, trademark, P2P, cyberlocker) |
| Vulnerability | `VulnerabilityReport` | Security vulnerabilities (CVE, misconfigurations, open services) |
| Reputation | `ReputationReport` | Reputation and threat intelligence (blocklists, threat feeds) |

---

## Key Types & Functions

**Types**

- `Report` — Base XARF report structure (embedded by all category reports)
- `MessagingReport`, `ConnectionReport`, `ContentReport`, `InfrastructureReport`, `CopyrightReport`, `VulnerabilityReport`, `ReputationReport`

**Constructors**

- `NewParser(strict bool)` — Create a new parser
- `NewValidator()` — Create a new validator
- `NewGenerator()` — Create a new generator

**Package-level functions**

- `Parse(data, *ParseOptions)` — Schema-driven parse returning a result with errors/warnings/info
- `CreateReport(map[string]any, *ReportOptions)` — Build a report with auto-filled `xarf_version`, `report_id`, and `timestamp`
- `CreateEvidence(contentType, payload, *EvidenceOptions)` — Base64-encode a payload and compute its hash

---

## Specification Compliance

This library strictly implements the **XARF v4.2.0** specification, requiring the `category` field for all reports. Reports using the deprecated `class` field will fail validation.

- ✅ Only the `category` field is accepted (XARF v4 spec requirement)
- ✅ Always outputs `category` when generating
- ❌ The `class` field is not supported

The library uses independent versioning starting from v1.0.0, allowing the library version to evolve independently of the XARF specification version.

---

## Resources

- **[GitHub Repository](https://github.com/xarf/xarf-go)** — Source, issues, and examples
- **[pkg.go.dev](https://pkg.go.dev/github.com/xarf/xarf-go)** — Full API documentation
- **[XARF Specification](https://github.com/xarf/xarf-spec)** — v4.2.0
- **[GitHub Issues](https://github.com/xarf/xarf-go/issues)** — Report a bug or request a feature

---

## Support

- **[GitHub Discussions](https://github.com/xarf/xarf-spec/discussions)** — Ask questions
- **[Issue Tracker](https://github.com/xarf/xarf-go/issues)** — Library issues

<style>
.library-status {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--color-background-alt);
  border-radius: 8px;
  margin-bottom: 2rem;
}

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.badge-warning {
  background: rgba(251, 146, 60, 0.2);
  color: #fb923c;
}

.badge-success {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-block;
  margin-left: 1rem;
}

.coming-soon {
  background: rgba(251, 146, 60, 0.2);
  color: #fb923c;
}

.alert {
  padding: 1rem 1.5rem;
  border-radius: 8px;
  margin: 2rem 0;
  border-left: 4px solid;
}

.alert-warning {
  background: rgba(251, 146, 60, 0.1);
  border-color: #fb923c;
  color: var(--color-text);
}

.alert-success {
  background: rgba(34, 197, 94, 0.1);
  border-color: #22c55e;
  color: var(--color-text);
}
</style>
