---
layout: library
title: "C#/.NET Library"
description: "C#/.NET library for XARF - Coming Soon"
permalink: /libraries/csharp/
---

# XARF C#/.NET Library

<div class="coming-soon-banner">
  <h2>Coming Soon</h2>
  <p>The official C#/.NET library for XARF is currently in development.</p>
</div>

---

## Planned Features

- **.NET Standard 2.0+** - Compatible with .NET Framework, .NET Core, and .NET 5+
- **Newtonsoft.Json & System.Text.Json** - Support for both JSON libraries
- **LINQ Integration** - Queryable reports
- **Async Streams** - IAsyncEnumerable support
- **ASP.NET Core** - Middleware and model binding
- **NuGet Package** - Easy installation

---

## Expected API

```csharp
using XARF;

var report = new XARFReport
{
    XarfVersion = "4.0.0",
    ReportId = "550e8400-e29b-41d4-a716-446655440000",
    Timestamp = DateTime.UtcNow.ToString("o"),
    Reporter = new Reporter
    {
        Org = "Security Operations",
        Contact = "abuse@example.com",
        Type = "automated"
    },
    SourceIdentifier = "192.0.2.100",
    Class = "abuse",
    Type = "ddos"
};

if (report.Validate())
{
    Console.WriteLine("✓ Valid!");
    Console.WriteLine(report.ToJson());
}
```

---

## ASP.NET Core Integration

```csharp
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
            return BadRequest(report.ValidationErrors);

        await _xarfService.ProcessAsync(report);
        return Accepted(new { report.ReportId });
    }
}
```

---

## LINQ Queries

```csharp
var highSeverityReports = reports
    .Where(r => r.Class == "abuse")
    .Where(r => r.Severity == "high")
    .OrderByDescending(r => r.Timestamp)
    .ToList();
```

---

## Express Interest

Want to be notified when this library is released?

- **[GitHub Discussions](https://github.com/xarf/xarf-spec/discussions)** - Join the conversation
- **[GitHub Watch](https://github.com/xarf/xarf-spec)** - Watch the repository for updates
- **[Twitter](https://twitter.com/xarf_org)** - Follow for announcements

---

## Contribute

Interested in contributing to the C#/.NET library development?

- Check out [Contributing Guidelines](/community/contributing/)
- Join the discussion on [GitHub](https://github.com/xarf/xarf-spec/discussions)

<style>
.coming-soon-banner {
  background: linear-gradient(135deg, rgba(251, 146, 60, 0.1), rgba(251, 146, 60, 0.05));
  border: 2px solid #fb923c;
  border-radius: 12px;
  padding: 3rem 2rem;
  text-align: center;
  margin: 2rem 0;
}

.coming-soon-banner h2 {
  color: #fb923c;
  margin: 0 0 1rem 0;
  font-size: 2rem;
}

.coming-soon-banner p {
  color: var(--color-text-light);
  font-size: 1.125rem;
  margin: 0;
}
</style>
