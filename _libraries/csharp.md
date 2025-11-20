---
layout: library
title: "C#/.NET Library - xarf-csharp"
description: "Official C#/.NET library for creating, validating, and processing XARF reports"
permalink: /libraries/csharp/
---

# XARF C#/.NET Library

Official C#/.NET library for creating, validating, and processing XARF (eXtended Abuse Reporting Format) reports.

<div class="library-status">
  <span class="badge badge-success">Alpha</span>
  <span>Version 4.0.0-alpha.1</span>
  <span>.NET Standard 2.0+, .NET 6+</span>
</div>

---

## Installation

### .NET CLI
```bash
dotnet add package XARF
```

### Package Manager Console
```powershell
Install-Package XARF
```

### PackageReference
```xml
<PackageReference Include="XARF" Version="1.0.0" />
```

**Requirements**:
- .NET Standard 2.0+ (compatible with .NET Framework 4.6.1+, .NET Core 2.0+, .NET 5+)
- Supports both Newtonsoft.Json and System.Text.Json

**Note**: Alpha release available. Star the [GitHub repository](https://github.com/xarf/xarf-csharp) for updates.

---

## Quick Start

### Creating a Report

```csharp
using XARF;
using System;

// Create a new XARF report with fluent API
var report = new XARFReport
{
    XarfVersion = "4.0.0",
    ReportId = Guid.NewGuid().ToString(),
    Timestamp = DateTime.UtcNow.ToString("o"),
    Reporter = new Reporter
    {
        Org = "Security Operations",
        Contact = "abuse@example.com",
        Type = ReporterType.Automated
    },
    SourceIdentifier = "192.0.2.100",
    Category = "abuse",
    Type = "ddos",
    Description = "DDoS attack detected from source IP"
};

// Validate
if (report.Validate())
{
    Console.WriteLine("✓ Report is valid!");
}

// Export to JSON
string json = report.ToJson();
Console.WriteLine(json);
```

### Loading from JSON

```csharp
using XARF;
using System.IO;
using System.Threading.Tasks;

// Load from JSON string
string jsonData = "{\"xarf_version\": \"4.0.0\", ...}";
var report = XARFReport.FromJson(jsonData);

// Load from file
string fileContent = await File.ReadAllTextAsync("report.json");
var report = XARFReport.FromJson(fileContent);

// Load from stream
using var stream = File.OpenRead("report.json");
var report = await XARFReport.FromStreamAsync(stream);

// Validate
if (report.Validate())
{
    Console.WriteLine($"Loaded report: {report.ReportId}");
}
```

---

## Core Features

- **Fluent API** - Clean, intuitive object initialization
- **Async/Await Support** - Full async operations throughout
- **JSON Support** - Both Newtonsoft.Json and System.Text.Json
- **LINQ Integration** - Queryable reports
- **Evidence Handling** - Base64 encoding, hashing (SHA-256/SHA-512), and verification
- **Format Conversion** - JSON serialization with configurable options
- **Type Safety** - Strongly-typed C# classes with nullable reference types
- **ASP.NET Core** - Middleware, model binding, and validation
- **Entity Framework** - EF Core support for persistence

---

## API Reference

### XARFReport Class

Main class for creating and manipulating XARF reports.

#### Properties

```csharp
public class XARFReport
{
    public string XarfVersion { get; set; }
    public string ReportId { get; set; }
    public string Timestamp { get; set; }
    public Reporter Reporter { get; set; }
    public string SourceIdentifier { get; set; }
    public string Category { get; set; }
    public string Type { get; set; }
    public string? Description { get; set; }
    public Severity? Severity { get; set; }
    public List<Evidence>? Evidence { get; set; }
    public Dictionary<string, object>? TechnicalDetails { get; set; }
}
```

#### Methods

##### `Validate(): bool`

Validate the report against the JSON schema.

```csharp
if (!report.Validate())
{
    foreach (var error in report.ValidationErrors)
    {
        Console.Error.WriteLine($"{error.Field}: {error.Message}");
    }
}
```

**Returns**: `bool` - true if valid, false otherwise

##### `ToJson(bool pretty = false): string`

Export report to JSON string.

```csharp
string json = report.ToJson(pretty: true);
```

**Parameters**:
- `pretty` (bool): Pretty-print with indentation

**Returns**: `string` - JSON representation

##### `static FromJson(string json): XARFReport`

Create report from JSON string.

```csharp
var report = XARFReport.FromJson(jsonString);
```

**Parameters**:
- `json` (string): JSON string

**Returns**: `XARFReport` instance

**Throws**: `XARFParseException` if JSON is invalid

##### `static async Task<XARFReport> FromStreamAsync(Stream stream)`

Create report from stream asynchronously.

```csharp
using var stream = File.OpenRead("report.json");
var report = await XARFReport.FromStreamAsync(stream);
```

**Returns**: `Task<XARFReport>` - Report instance

##### `AddEvidence(Evidence evidence): void`

Add evidence to the report.

```csharp
report.AddEvidence(new Evidence
{
    ContentType = "text/plain",
    Description = "Server logs",
    Payload = "YmFzZTY0IGVuY29kZWQgZGF0YQ==",
    Hash = new Hash
    {
        Algorithm = HashAlgorithm.SHA256,
        Value = "abc123..."
    }
});
```

### Reporter Class

```csharp
public class Reporter
{
    public string Org { get; set; }
    public string Contact { get; set; }
    public ReporterType Type { get; set; }
    public string? Url { get; set; }
}

public enum ReporterType
{
    Automated,
    Manual,
    AI
}
```

### Evidence Class

```csharp
public class Evidence
{
    public string ContentType { get; set; }
    public string Description { get; set; }
    public string Payload { get; set; }
    public Hash? Hash { get; set; }
    public string? Timestamp { get; set; }
}

public class Hash
{
    public HashAlgorithm Algorithm { get; set; }
    public string Value { get; set; }
}

public enum HashAlgorithm
{
    SHA256,
    SHA512,
    MD5
}
```

### XARFValidator Class

```csharp
var validator = new XARFValidator();
var result = validator.Validate(report);

if (!result.IsValid)
{
    foreach (var error in result.Errors)
    {
        Console.Error.WriteLine($"{error.Field}: {error.Message}");
    }
}
```

### Exception Classes

```csharp
try
{
    var report = XARFReport.FromJson(jsonData);
    report.Validate();
}
catch (XARFParseException ex)
{
    // Handle JSON parsing error
}
catch (XARFValidationException ex)
{
    // Handle validation error
}
catch (XARFException ex)
{
    // Handle general XARF error
}
```

---

## Examples

### Creating a DDoS Report

```csharp
using XARF;
using System;
using System.Collections.Generic;

var ddosReport = new XARFReport
{
    XarfVersion = "4.0.0",
    ReportId = Guid.NewGuid().ToString(),
    Timestamp = DateTime.UtcNow.ToString("o"),
    Reporter = new Reporter
    {
        Org = "Network Security Team",
        Contact = "noc@example.com",
        Type = ReporterType.Automated
    },
    SourceIdentifier = "203.0.113.50",
    Category = "abuse",
    Type = "ddos",
    Severity = Severity.High,
    Description = "Volumetric DDoS attack detected",
    TechnicalDetails = new Dictionary<string, object>
    {
        ["protocol"] = "UDP",
        ["port"] = 53,
        ["packets_per_second"] = 150000,
        ["bandwidth_mbps"] = 1200,
        ["attack_duration_seconds"] = 300
    }
};

if (ddosReport.Validate())
{
    await SubmitReportAsync(ddosReport);
}
```

### Adding Evidence

```csharp
using XARF;
using System;
using System.IO;
using System.Security.Cryptography;

public static async Task<Evidence> CreateEvidenceFromFileAsync(string filePath)
{
    byte[] fileBytes = await File.ReadAllBytesAsync(filePath);

    // Calculate SHA-256 hash
    using var sha256 = SHA256.Create();
    byte[] hashBytes = sha256.ComputeHash(fileBytes);
    string hashValue = BitConverter.ToString(hashBytes)
        .Replace("-", "").ToLowerInvariant();

    // Encode to Base64
    string payload = Convert.ToBase64String(fileBytes);

    return new Evidence
    {
        ContentType = "application/octet-stream",
        Description = "Evidence from file",
        Payload = payload,
        Hash = new Hash
        {
            Algorithm = HashAlgorithm.SHA256,
            Value = hashValue
        },
        Timestamp = DateTime.UtcNow.ToString("o")
    };
}

// Usage
var evidence = await CreateEvidenceFromFileAsync("./evidence.pdf");
report.AddEvidence(evidence);
```

### Batch Validation

```csharp
using XARF;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class BatchValidator
{
    private readonly XARFValidator _validator = new();

    public async Task<ValidationResults> ValidateBatchAsync(
        IEnumerable<string> jsonReports)
    {
        var validReports = new List<XARFReport>();
        var errors = new List<ValidationError>();

        var tasks = jsonReports.Select(async json =>
        {
            try
            {
                var report = XARFReport.FromJson(json);
                var result = await Task.Run(() => _validator.Validate(report));

                if (result.IsValid)
                {
                    lock (validReports)
                    {
                        validReports.Add(report);
                    }
                }
                else
                {
                    lock (errors)
                    {
                        errors.AddRange(result.Errors);
                    }
                }
            }
            catch (XARFParseException ex)
            {
                lock (errors)
                {
                    errors.Add(new ValidationError
                    {
                        Field = "parse_error",
                        Message = ex.Message
                    });
                }
            }
        });

        await Task.WhenAll(tasks);

        return new ValidationResults(validReports, errors);
    }
}
```

### LINQ Queries

```csharp
using XARF;
using System.Collections.Generic;
using System.Linq;

var reports = new List<XARFReport> { /* ... */ };

// Query high-severity abuse reports
var highSeverityReports = reports
    .Where(r => r.Category == "abuse")
    .Where(r => r.Severity == Severity.High)
    .OrderByDescending(r => r.Timestamp)
    .ToList();

// Group by type
var reportsByType = reports
    .GroupBy(r => r.Type)
    .Select(g => new { Type = g.Key, Count = g.Count() })
    .ToList();

// Filter by date range
var recentReports = reports
    .Where(r => DateTime.Parse(r.Timestamp) > DateTime.UtcNow.AddDays(-7))
    .ToList();
```

### Custom Fields

```csharp
var report = new XARFReport
{
    XarfVersion = "4.0.0",
    ReportId = Guid.NewGuid().ToString(),
    Timestamp = DateTime.UtcNow.ToString("o"),
    Reporter = new Reporter
    {
        Org = "Security Team",
        Contact = "abuse@example.com",
        Type = ReporterType.Automated
    },
    SourceIdentifier = "192.0.2.100",
    Category = "abuse",
    Type = "spam",
    TechnicalDetails = new Dictionary<string, object>
    {
        ["custom_tracking_id"] = "TICKET-12345",
        ["internal_severity_score"] = 8.5,
        ["automated_response"] = true
    }
};
```

---

## Integration Examples

### ASP.NET Core REST API

```csharp
using Microsoft.AspNetCore.Mvc;
using XARF;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class XARFController : ControllerBase
{
    private readonly IXARFService _xarfService;

    public XARFController(IXARFService xarfService)
    {
        _xarfService = xarfService;
    }

    [HttpPost("submit")]
    public async Task<IActionResult> Submit([FromBody] XARFReport report)
    {
        if (!report.Validate())
        {
            return BadRequest(new
            {
                status = "invalid",
                errors = report.ValidationErrors
            });
        }

        await _xarfService.ProcessReportAsync(report);

        return Accepted(new
        {
            status = "accepted",
            reportId = report.ReportId
        });
    }

    [HttpPost("submit-json")]
    public async Task<IActionResult> SubmitJson([FromBody] string jsonData)
    {
        try
        {
            var report = XARFReport.FromJson(jsonData);

            if (!report.Validate())
            {
                return BadRequest(new { errors = report.ValidationErrors });
            }

            await _xarfService.ProcessReportAsync(report);

            return Accepted(new { reportId = report.ReportId });
        }
        catch (XARFParseException ex)
        {
            return BadRequest(new { error = "Invalid JSON", details = ex.Message });
        }
    }
}
```

### Entity Framework Core

```csharp
using Microsoft.EntityFrameworkCore;
using XARF;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("abuse_reports")]
public class AbuseReportEntity
{
    [Key]
    public Guid ReportId { get; set; }

    public DateTime Timestamp { get; set; }

    [Required]
    [MaxLength(50)]
    public string Category { get; set; }

    [Required]
    [MaxLength(50)]
    public string Type { get; set; }

    [Required]
    [MaxLength(255)]
    public string SourceIdentifier { get; set; }

    [Column(TypeName = "jsonb")]
    public string XarfData { get; set; }

    public bool Processed { get; set; }

    public static AbuseReportEntity FromXARF(XARFReport report)
    {
        return new AbuseReportEntity
        {
            ReportId = Guid.Parse(report.ReportId),
            Timestamp = DateTime.Parse(report.Timestamp),
            Category = report.Category,
            Type = report.Type,
            SourceIdentifier = report.SourceIdentifier,
            XarfData = report.ToJson(),
            Processed = false
        };
    }

    public XARFReport ToXARF()
    {
        return XARFReport.FromJson(XarfData);
    }
}

public class ApplicationDbContext : DbContext
{
    public DbSet<AbuseReportEntity> AbuseReports { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AbuseReportEntity>()
            .HasIndex(e => e.Timestamp);

        modelBuilder.Entity<AbuseReportEntity>()
            .HasIndex(e => e.Category);
    }
}
```

### Azure Function

```csharp
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using XARF;
using System.Net;
using System.Threading.Tasks;

public class XARFFunction
{
    private readonly ILogger _logger;
    private readonly IXARFService _xarfService;

    public XARFFunction(ILoggerFactory loggerFactory, IXARFService xarfService)
    {
        _logger = loggerFactory.CreateLogger<XARFFunction>();
        _xarfService = xarfService;
    }

    [Function("SubmitXARF")]
    public async Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Function, "post")]
        HttpRequestData req)
    {
        try
        {
            string requestBody = await req.ReadAsStringAsync();
            var report = XARFReport.FromJson(requestBody);

            if (!report.Validate())
            {
                var badResponse = req.CreateResponse(HttpStatusCode.BadRequest);
                await badResponse.WriteAsJsonAsync(new
                {
                    status = "invalid",
                    errors = report.ValidationErrors
                });
                return badResponse;
            }

            await _xarfService.ProcessReportAsync(report);
            _logger.LogInformation($"Processed report: {report.ReportId}");

            var response = req.CreateResponse(HttpStatusCode.Accepted);
            await response.WriteAsJsonAsync(new
            {
                status = "accepted",
                reportId = report.ReportId
            });
            return response;
        }
        catch (XARFParseException ex)
        {
            _logger.LogError(ex, "Parse error");
            var errorResponse = req.CreateResponse(HttpStatusCode.BadRequest);
            await errorResponse.WriteAsJsonAsync(new { error = "Invalid JSON" });
            return errorResponse;
        }
    }
}
```

### xUnit Tests

```csharp
using Xunit;
using XARF;
using System;
using System.Collections.Generic;

public class XARFReportTests
{
    [Fact]
    public void CreateValidReport_ShouldValidate()
    {
        // Arrange
        var report = new XARFReport
        {
            XarfVersion = "4.0.0",
            ReportId = Guid.NewGuid().ToString(),
            Timestamp = DateTime.UtcNow.ToString("o"),
            Reporter = new Reporter
            {
                Org = "Test Security",
                Contact = "test@example.com",
                Type = ReporterType.Automated
            },
            SourceIdentifier = "192.0.2.100",
            Category = "abuse",
            Type = "ddos"
        };

        // Act
        bool isValid = report.Validate();

        // Assert
        Assert.True(isValid, "Report should be valid");
    }

    [Fact]
    public void MissingMandatoryField_ShouldFailValidation()
    {
        // Arrange
        var report = new XARFReport
        {
            XarfVersion = "4.0.0",
            // Missing ReportId
            Timestamp = DateTime.UtcNow.ToString("o")
        };

        // Act
        bool isValid = report.Validate();

        // Assert
        Assert.False(isValid, "Report should be invalid");
        Assert.NotEmpty(report.ValidationErrors);
    }

    [Fact]
    public void JsonRoundtrip_ShouldPreserveData()
    {
        // Arrange
        var report1 = new XARFReport
        {
            XarfVersion = "4.0.0",
            ReportId = Guid.NewGuid().ToString(),
            Timestamp = DateTime.UtcNow.ToString("o"),
            Reporter = new Reporter
            {
                Org = "Test",
                Contact = "test@test.com",
                Type = ReporterType.Automated
            },
            SourceIdentifier = "192.0.2.100",
            Category = "abuse",
            Type = "spam"
        };

        // Act
        string json = report1.ToJson();
        var report2 = XARFReport.FromJson(json);

        // Assert
        Assert.Equal(report1.ReportId, report2.ReportId);
        Assert.Equal(report1.Category, report2.Category);
        Assert.Equal(report1.Type, report2.Type);
    }
}
```

---

## Best Practices

### 1. Always Validate

```csharp
// ✓ GOOD
var report = XARFReport.FromJson(jsonData);
if (report.Validate())
{
    await ProcessReportAsync(report);
}
else
{
    HandleValidationErrors(report.ValidationErrors);
}

// ✗ BAD
var report = XARFReport.FromJson(jsonData);
await ProcessReportAsync(report); // No validation!
```

### 2. Use Async/Await

```csharp
// ✓ GOOD
var report = await XARFReport.FromStreamAsync(stream);
await ProcessReportAsync(report);

// ✗ BAD
var report = XARFReport.FromStreamAsync(stream).Result; // Blocking!
```

### 3. Handle Exceptions Properly

```csharp
// ✓ GOOD
try
{
    var report = XARFReport.FromJson(jsonData);
    if (!report.Validate())
    {
        _logger.LogError("Validation failed: {Errors}", report.ValidationErrors);
        return BadRequest(report.ValidationErrors);
    }
}
catch (XARFParseException ex)
{
    _logger.LogError(ex, "Parse error");
    return BadRequest("Invalid JSON");
}

// ✗ BAD
var report = XARFReport.FromJson(jsonData);
report.Validate(); // Exceptions not handled
```

### 4. Use Dependency Injection

```csharp
// ✓ GOOD
public class XARFService : IXARFService
{
    private readonly IXARFValidator _validator;
    private readonly ILogger<XARFService> _logger;

    public XARFService(IXARFValidator validator, ILogger<XARFService> logger)
    {
        _validator = validator;
        _logger = logger;
    }
}

// ✗ BAD
public class XARFService
{
    private readonly XARFValidator _validator = new XARFValidator(); // Direct instantiation
}
```

---

## Resources

- **[GitHub Repository](https://github.com/xarf/xarf-csharp)** - Alpha Release
- **[NuGet Package](https://www.nuget.org/packages/XARF)** - Alpha Release
- **[API Documentation](https://docs.xarf.org/dotnet/)** - In Development
- **[Examples](https://github.com/xarf/xarf-csharp/tree/main/examples)** - Available
- **[Issue Tracker](https://github.com/xarf/xarf-spec/issues)** - Report bugs

---

## Support

- **[GitHub Discussions](https://github.com/xarf/xarf-spec/discussions)** - Ask questions
- **[Stack Overflow](https://stackoverflow.com/questions/tagged/xarf)** - Tag: `xarf`

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
