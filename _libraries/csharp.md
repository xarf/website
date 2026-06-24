---
layout: docs
title: "C#/.NET Library - xarf-csharp"
description: "Official C#/.NET library for creating, validating, and processing XARF reports"
permalink: /libraries/csharp/
---

# XARF C#/.NET Library

Official C#/.NET library for parsing, validating, and generating XARF (eXtended Abuse Reporting Format) reports.

<div class="library-status">
  <span class="badge badge-success">Stable</span>
  <span>NuGet package Xarf 1.1.0</span>
  <span>XARF spec v4.2.0</span>
  <span>.NET 8/9/10, netstandard2.1</span>
</div>

The library version (`1.1.0`) follows independent semantic versioning, separate from the XARF specification version (`4.2.0`) it implements. The `XarfApi` surface is at behavioural parity with the official JavaScript and Go libraries.

---

## Installation

```bash
# Install from NuGet
dotnet add package Xarf

# Or using Package Manager
Install-Package Xarf
```

License: MIT.

---

## Supported .NET versions

The library targets `netstandard2.1` and `net8.0`. The test suite runs against it on .NET 8, 9, and 10 across Linux, macOS, and Windows in CI. Newer runtimes (.NET 9/10) consume the `net8.0` assets — no per-version build is required.

| Runtime | Supported |
| ------- | --------- |
| .NET 10 / 9 / 8 | ✅ verified in CI |
| .NET 6 / 7, .NET Core 3.x | ✅ via `netstandard2.1` |
| Mono 6.4+, Xamarin, Unity 2021+ | ✅ via `netstandard2.1` |
| .NET Framework 4.x | ❌ (no `netstandard2.1` support) |

---

## Supported Categories

All 7 XARF categories are supported:

- **messaging** — Email spam, phishing, social engineering
- **connection** — DDoS, port scans, login attacks, brute force
- **content** — Phishing sites, malware distribution, defacement, fraud
- **infrastructure** — Compromised systems, botnets
- **copyright** — DMCA, P2P, cyberlockers
- **vulnerability** — CVE reports, misconfigurations
- **reputation** — Threat intelligence, blocklists

---

## JavaScript-parity API (`XarfApi`)

The static `XarfApi` class mirrors the official JavaScript library ([`@xarf/xarf`](https://www.npmjs.com/package/@xarf/xarf)): schema-driven validation against the embedded v4.2.0 schemas, v3 auto-conversion, and result objects that carry errors/warnings instead of throwing on validation failures. This is the recommended surface for v4.2.0.

```csharp
using Xarf;
using System.Text;
using System.Text.Json.Nodes;

// Parse returns a result; only malformed JSON / MaxInputBytes overflow throws.
// v3 reports are auto-detected and converted (deprecation warning in Warnings).
ParseResult result = XarfApi.Parse(json, new ParseOptions { ShowMissingOptional = true });
if (result.Errors.Count == 0)
{
    JsonObject report = result.Report; // the validated report object
}
// result.Warnings  -> unknown fields, v3 deprecation
// result.Info      -> missing optional/recommended fields (ShowMissingOptional)
// ParseOptions.Strict reports warnings and x-recommended fields as errors.

// CreateReport auto-fills xarf_version, report_id, and timestamp.
CreateReportResult created = XarfApi.CreateReport(input);

// CreateEvidence base64-encodes the payload and prefixes the hash with the algorithm.
Evidence ev = XarfApi.CreateEvidence(
    "message/rfc822", Encoding.UTF8.GetBytes(rawEmail),
    new EvidenceOptions { Description = "Original spam email", HashAlgorithm = "sha256" });
// ev.Payload (base64), ev.Hash ("sha256:<hex>"), ev.Size
```

### Version constants

| Constant | Value |
| -------- | ----- |
| `XarfApi.SpecVersion` | `"4.2.0"` |
| `XarfApi.BundledSpecVersion` | `"v4.2.0"` |
| `XarfApi.Version` | library version |

---

## Legacy typed API

The pre-existing typed `Parser`, `Generator`, and `Validator` classes remain for backward compatibility. `XarfApi` is the recommended v4.2.0 surface, but the typed API is fully supported.

### Parsing reports

```csharp
using Xarf;
using Xarf.Models;

// Initialize parser
var parser = new Parser();

// Parse a XARF report from JSON string
var reportJson = @"{
  ""xarf_version"": ""4.2.0"",
  ""report_id"": ""550e8400-e29b-41d4-a716-446655440000"",
  ""category"": ""content"",
  ""type"": ""phishing"",
  ""timestamp"": ""2024-01-15T14:30:00Z"",
  ""source_identifier"": ""203.0.113.45"",
  ""reporter"": {
    ""org"": ""Security Team"",
    ""contact"": ""abuse@example.com"",
    ""type"": ""automated""
  },
  ""evidence_source"": ""automated_scan"",
  ""url"": ""https://evil-site.example.com/phishing""
}";

var report = parser.Parse(reportJson);

// Access report data
Console.WriteLine($"Category: {report.Category}");
Console.WriteLine($"Type: {report.Type}");
Console.WriteLine($"Source: {report.SourceIdentifier}");

if (report is ContentReport contentReport)
{
    Console.WriteLine($"URL: {contentReport.Url}");
}

// Validate report structure
if (parser.Validate(reportJson))
{
    Console.WriteLine("Report is valid");
}
else
{
    foreach (var error in parser.GetErrors())
    {
        Console.WriteLine($"  - {error}");
    }
}
```

### Generating reports

```csharp
using Xarf;
using Xarf.Models;

// Initialize generator
var generator = new Generator();

// Generate a phishing report
var report = generator.CreateContentReport(
    reportType: "phishing_site",
    sourceIdentifier: "203.0.113.45",
    url: "https://evil-phishing.example.com/login",
    reporterContact: "abuse@security-lab.example",
    reporterOrg: "Security Research Lab",
    description: "Phishing site targeting banking customers"
);

// Add evidence
var evidence = new List<Evidence>
{
    generator.AddEvidence(
        contentType: "image/png",
        description: "Screenshot of phishing page",
        payload: "iVBORw0KGgoAAAANSUhEUg..." // base64 encoded
    )
};
report.Evidence = evidence;

// Serialize to JSON
var json = generator.ToJson(report);
Console.WriteLine(json);
```

---

## Validation

The typed parser performs multiple validation levels: JSON structure and required fields, data types, category-specific business rules, and evidence (content type, size, and hash).

```csharp
using Xarf;
using Xarf.Exceptions;

// Non-strict mode: collect errors without raising exception
var parser = new Parser(strict: false);
var isValid = parser.Validate(reportJson);

if (!isValid)
{
    foreach (var error in parser.GetErrors())
    {
        Console.WriteLine($"Error: {error}");
    }
}

// Strict mode: raise exception on first error
var strictParser = new Parser(strict: true);
try
{
    var report = strictParser.Parse(reportJson);
}
catch (XARFValidationException ex)
{
    Console.WriteLine($"Validation failed: {ex.Message}");
    foreach (var error in ex.Errors)
    {
        Console.WriteLine($"  - {error}");
    }
}
```

---

## Features (v1.1.0)

- **Schema-driven validation** against the embedded XARF v4.2.0 schemas, with strict mode, unknown-field warnings, and missing-optional info
- **Parsing** — result-object `XarfApi.Parse` (errors/warnings/info, no throw on validation failure), plus the legacy typed parser
- **Generation** — `CreateReport` (auto-filled metadata) and `CreateEvidence` (base64 payload, algorithm-prefixed hash, size)
- **XARF v3 backward compatibility** — automatic detection and conversion
- **All 7 XARF categories** — messaging, connection, content, infrastructure, copyright, vulnerability, reputation
- **Runtimes** — .NET 8, 9, 10 (verified in CI) plus `netstandard2.1` consumers

---

## Resources

- **[GitHub Repository](https://github.com/xarf/xarf-csharp)** — Source code
- **[NuGet Package](https://www.nuget.org/packages/Xarf)** — `Xarf` 1.1.0
- **[XARF v4 Specification](https://xarf.org/docs/specification/)** — Complete technical reference
- **[Issue Tracker](https://github.com/xarf/xarf-csharp/issues)** — Report bugs

---

## Support

- **[GitHub Discussions](https://github.com/xarf/xarf-spec/discussions)** — Ask questions
- **Email** — contact@xarf.org

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
</style>
