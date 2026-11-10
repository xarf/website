---
layout: docs
title: "XARF Libraries"
description: "Official and community XARF libraries for multiple programming languages"
permalink: /libraries/
---

# XARF Libraries

Official, published libraries for implementing XARF in your applications. All four official libraries implement **XARF spec v4.2.0** and support the seven categories: messaging, connection, content, infrastructure, copyright, vulnerability, and reputation.

---

## Official Libraries

### Python
<div class="library-card">
  <div class="library-header">
    <h3>xarf (Python)</h3>
    <span class="status-badge badge-success">Stable</span>
  </div>
  <p>Parse, validate, and generate XARF v4 reports with Pydantic v2 models and schema-driven validation.</p>
  <div class="library-meta">
    <span>📦 PyPI: <code>pip install xarf</code></span>
    <span>🏷️ v1.0.0 · MIT · Python 3 (Pydantic v2)</span>
    <span>📚 <a href="/libraries/python/">Documentation</a></span>
    <span>⭐ <a href="https://github.com/xarf/xarf-python">GitHub</a></span>
    <span>🔗 <a href="https://pypi.org/project/xarf/">PyPI</a></span>
  </div>
  <div class="library-features">
    <strong>Features:</strong>
    <ul>
      <li>Functional API: <code>parse</code>, <code>create_report</code>, <code>create_evidence</code></li>
      <li>Schema-driven validation against the official XARF v4.2.0 JSON schemas</li>
      <li>Pydantic v2 discriminated-union models for all 7 categories</li>
      <li>Structured errors, warnings, and missing-optional info (<code>ParseResult</code>)</li>
      <li>Automatic v3 detection and conversion to v4</li>
      <li>Evidence helper with base64 encoding, hashing, and size</li>
    </ul>
  </div>
</div>

### JavaScript / TypeScript
<div class="library-card">
  <div class="library-header">
    <h3>@xarf/xarf (JavaScript/TypeScript)</h3>
    <span class="status-badge badge-success">Stable</span>
  </div>
  <p>Parse, validate, and generate XARF v4 reports in Node.js with full TypeScript types.</p>
  <div class="library-meta">
    <span>📦 npm: <code>npm install @xarf/xarf</code></span>
    <span>🏷️ v1.1.0 · MIT · Node.js 18+</span>
    <span>📚 <a href="/libraries/javascript/">Documentation</a></span>
    <span>⭐ <a href="https://github.com/xarf/xarf-javascript">GitHub</a></span>
    <span>🔗 <a href="https://www.npmjs.com/package/@xarf/xarf">npm</a></span>
  </div>
  <div class="library-features">
    <strong>Features:</strong>
    <ul>
      <li>Functional API: <code>parse</code>, <code>createReport</code>, <code>createEvidence</code></li>
      <li>Schema-driven validation against the bundled XARF v4.2.0 JSON schemas</li>
      <li>Full TypeScript support with discriminated-union types for all 7 categories</li>
      <li>Structured results with <code>errors</code>, <code>warnings</code>, and <code>info</code></li>
      <li>Automatic v3 detection and conversion (plus <code>isXARFv3</code>/<code>convertV3toV4</code> helpers)</li>
      <li>Schemas bundled at build time — zero filesystem/network dependency</li>
    </ul>
  </div>
</div>

### Go
<div class="library-card">
  <div class="library-header">
    <h3>xarf-go (Go)</h3>
    <span class="status-badge badge-success">Stable</span>
  </div>
  <p>Parse, validate, and generate XARF v4 reports with type-safe Go structs.</p>
  <div class="library-meta">
    <span>📦 <code>go get github.com/xarf/xarf-go</code></span>
    <span>🏷️ v1.1.0 · Apache-2.0 · Go 1.21+</span>
    <span>📚 <a href="/libraries/go/">Documentation</a></span>
    <span>⭐ <a href="https://github.com/xarf/xarf-go">GitHub</a></span>
    <span>🔗 <a href="https://pkg.go.dev/github.com/xarf/xarf-go">pkg.go.dev</a></span>
  </div>
  <div class="library-features">
    <strong>Features:</strong>
    <ul>
      <li>Package-level <code>Parse</code>, <code>CreateReport</code>, <code>CreateEvidence</code> mirroring the JS API</li>
      <li>Typed API: <code>NewParser(strict)</code>, <code>NewValidator()</code>, <code>NewGenerator()</code></li>
      <li>Schema-driven validation against the embedded XARF v4.2.0 schemas</li>
      <li>Type-safe structs for all 7 category reports</li>
      <li>Third-party reporting via separate <code>reporter</code>/<code>sender</code> fields</li>
      <li>Automatic v3 detection and conversion; zero runtime dependencies</li>
    </ul>
  </div>
</div>

### C# / .NET
<div class="library-card">
  <div class="library-header">
    <h3>Xarf (C#/.NET)</h3>
    <span class="status-badge badge-success">Stable</span>
  </div>
  <p>Parse, validate, and generate XARF v4 reports on .NET with schema-driven validation.</p>
  <div class="library-meta">
    <span>📦 NuGet: <code>dotnet add package Xarf</code></span>
    <span>🏷️ v1.1.0 · MIT · netstandard2.1 + net8.0 (.NET 8/9/10)</span>
    <span>📚 <a href="/libraries/csharp/">Documentation</a></span>
    <span>⭐ <a href="https://github.com/xarf/xarf-csharp">GitHub</a></span>
    <span>🔗 <a href="https://www.nuget.org/packages/Xarf">NuGet</a></span>
  </div>
  <div class="library-features">
    <strong>Features:</strong>
    <ul>
      <li>Static <code>XarfApi.Parse</code>, <code>XarfApi.CreateReport</code>, <code>XarfApi.CreateEvidence</code> mirroring the JS API</li>
      <li>Schema-driven validation against the embedded XARF v4.2.0 schemas</li>
      <li>Result objects with <code>Errors</code>, <code>Warnings</code>, and <code>Info</code> (no throw on validation failure)</li>
      <li>Legacy typed <code>Parser</code>/<code>Generator</code>/<code>Validator</code> retained for compatibility</li>
      <li>All 7 categories; automatic v3 detection and conversion</li>
      <li>Runs on .NET 8/9/10, and .NET 6/7, Core 3.x, Mono/Xamarin/Unity via <code>netstandard2.1</code> (not .NET Framework 4.x)</li>
    </ul>
  </div>
</div>

---

## Quick Start

Choose your language and get started in minutes. Each example uses the real, published API.

<div class="language-tabs">
  <button class="tab-button active" data-lang="python">Python</button>
  <button class="tab-button" data-lang="javascript">JavaScript</button>
  <button class="tab-button" data-lang="go">Go</button>
  <button class="tab-button" data-lang="csharp">C#</button>
</div>

<div class="tab-content active" data-lang="python" markdown="1">

{% highlight python %}
# Install
pip install xarf

# Parse and validate a report
from xarf import parse

result = parse({
    "xarf_version": "4.2.0",
    "report_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "timestamp": "2024-01-15T10:30:00Z",
    "reporter": {
        "org": "Security Team",
        "contact": "abuse@example.com",
        "domain": "example.com",
    },
    "sender": {
        "org": "Security Team",
        "contact": "abuse@example.com",
        "domain": "example.com",
    },
    "source_identifier": "192.0.2.100",
    "category": "connection",
    "type": "ddos",
    "evidence_source": "honeypot",
    "destination_ip": "203.0.113.10",
    "protocol": "tcp",
})

if not result.errors:
    print(result.report.category)  # 'connection'
else:
    for e in result.errors:
        print(f"{e.field}: {e.message}")
{% endhighlight %}

**[→ Full Python Documentation](/libraries/python/)**

</div>

<div class="tab-content" data-lang="javascript" markdown="1">

{% highlight javascript %}
// Install
npm install @xarf/xarf

// Parse and validate a report
import { parse } from '@xarf/xarf';

const { report, errors, warnings } = parse({
  xarf_version: '4.2.0',
  report_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  timestamp: '2024-01-15T10:30:00Z',
  reporter: {
    org: 'Security Team',
    contact: 'abuse@example.com',
    domain: 'example.com',
  },
  sender: {
    org: 'Security Team',
    contact: 'abuse@example.com',
    domain: 'example.com',
  },
  source_identifier: '192.0.2.100',
  category: 'connection',
  type: 'ddos',
  evidence_source: 'honeypot',
  destination_ip: '203.0.113.10',
  protocol: 'tcp',
});

if (errors.length === 0) {
  console.log(report.category); // 'connection'
} else {
  console.log('Validation errors:', errors);
}
{% endhighlight %}

**[→ Full JavaScript Documentation](/libraries/javascript/)**

</div>

<div class="tab-content" data-lang="go" markdown="1">

{% highlight go %}
// Install
//   go get github.com/xarf/xarf-go

package main

import (
    "fmt"
    "log"

    "github.com/xarf/xarf-go"
)

func main() {
    data := []byte(`{
        "xarf_version": "4.2.0",
        "report_id": "550e8400-e29b-41d4-a716-446655440000",
        "timestamp": "2024-01-15T10:30:00Z",
        "reporter": {
            "org": "Security Team",
            "contact": "abuse@example.com",
            "domain": "example.com"
        },
        "sender": {
            "org": "Security Team",
            "contact": "abuse@example.com",
            "domain": "example.com"
        },
        "source_identifier": "192.0.2.100",
        "category": "connection",
        "type": "ddos",
        "evidence_source": "honeypot",
        "destination_ip": "203.0.113.10",
        "protocol": "tcp"
    }`)

    // Parse returns a result with errors/warnings; an error is only
    // returned for malformed JSON or oversized input.
    result, err := xarf.Parse(data, nil)
    if err != nil {
        log.Fatal(err)
    }

    if len(result.Errors) == 0 {
        fmt.Println("Report is valid!")
    } else {
        fmt.Println("Validation errors:", result.Errors)
    }
}
{% endhighlight %}

**[→ Full Go Documentation](/libraries/go/)**

</div>

<div class="tab-content" data-lang="csharp" markdown="1">

{% highlight csharp %}
// Install
//   dotnet add package Xarf

using Xarf;

var json = @"{
  ""xarf_version"": ""4.2.0"",
  ""report_id"": ""550e8400-e29b-41d4-a716-446655440000"",
  ""timestamp"": ""2024-01-15T10:30:00Z"",
  ""reporter"": {
    ""org"": ""Security Team"",
    ""contact"": ""abuse@example.com"",
    ""domain"": ""example.com""
  },
  ""sender"": {
    ""org"": ""Security Team"",
    ""contact"": ""abuse@example.com"",
    ""domain"": ""example.com""
  },
  ""source_identifier"": ""192.0.2.100"",
  ""category"": ""connection"",
  ""type"": ""ddos"",
  ""evidence_source"": ""honeypot"",
  ""destination_ip"": ""203.0.113.10"",
  ""protocol"": ""tcp""
}";

// Parse returns a result; only malformed JSON / oversized input throws.
ParseResult result = XarfApi.Parse(json);

if (result.Errors.Count == 0)
{
    Console.WriteLine("Report is valid!");
}
else
{
    foreach (var error in result.Errors)
        Console.WriteLine($"  - {error}");
}
{% endhighlight %}

**[→ Full C# Documentation](/libraries/csharp/)**

</div>

---

## Library Features Comparison

All four official libraries implement XARF v4.2.0 with schema-driven validation and v3 backward compatibility.

| Feature | Python | JavaScript | Go | C# |
|---------|--------|------------|-----|-----|
| **Status** | Stable (1.0.0) | Stable (1.1.0) | Stable (1.1.0) | Stable (1.1.0) |
| **License** | MIT | MIT | Apache-2.0 | MIT |
| **Functional API** (`parse`/`createReport`/`createEvidence`) | ✓ | ✓ | ✓ | ✓ |
| **Typed API** | ✓ (Pydantic v2) | ✓ (TS types) | ✓ (`NewParser`/`NewValidator`/`NewGenerator`) | ✓ (`Parser`/`Generator`/`Validator`) |
| **Schema-driven validation (v4.2.0)** | ✓ | ✓ | ✓ | ✓ |
| **All 7 categories** | ✓ | ✓ | ✓ | ✓ |
| **v3 → v4 conversion** | ✓ | ✓ | ✓ | ✓ |
| **Evidence helper** (base64 + hash + size) | ✓ | ✓ | ✓ | ✓ |
| **Published registry** | PyPI | npm | pkg.go.dev | NuGet |

**Legend**: ✓ Available

---

## Community & Contributing

We welcome community libraries and contributions for additional languages and frameworks.

<div class="community-library">
  <h3>Looking to contribute?</h3>
  <p>A Perl implementation (<a href="https://github.com/xarf/xarf-perl">xarf-perl</a>) is in development and not yet published to CPAN — contributions are welcome. We'd also love help with other languages:</p>
  <ul>
    <li>Perl <em>(in development)</em></li>
    <li>Ruby</li>
    <li>PHP</li>
    <li>Rust</li>
    <li>Swift</li>
    <li>Kotlin</li>
  </ul>
  <p><a href="/community/contributing/" class="btn btn-primary">Contribution Guide</a></p>
</div>

---

## Need Help?

- **[Implementation Guide](/docs/implementation-guide/)** - Integration guide
- **[GitHub Discussions](https://github.com/xarf/xarf-spec/discussions)** - Ask questions
- **[GitHub Issues](https://github.com/xarf/xarf-spec/issues)** - Report bugs

<style>
.library-card {
  background: var(--color-background-alt);
  border: 1px solid var(--color-border);
  border-left: 4px solid var(--color-primary);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.library-card.alpha {
  border-left-color: #fb923c;
  opacity: 0.95;
}

.library-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.library-header h3 {
  margin: 0;
  color: var(--color-text);
}

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.badge-success {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.badge-warning {
  background: rgba(251, 146, 60, 0.2);
  color: #fb923c;
}

.library-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem 0;
  font-size: 0.875rem;
  color: var(--color-text-light);
}

.library-meta code {
  background: var(--color-background);
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  font-size: 0.8125rem;
}

.library-features {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.library-features strong {
  color: var(--color-text);
}

.library-features ul {
  margin: 0.5rem 0 0 0;
  padding-left: 1.5rem;
}

.library-features li {
  margin-bottom: 0.25rem;
  color: var(--color-text-light);
}

.language-tabs {
  display: flex;
  gap: 0.5rem;
  margin: 2rem 0 1rem 0;
  border-bottom: 2px solid var(--color-border);
}

.tab-button {
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--color-text-light);
  font-weight: 500;
  cursor: pointer;
  margin-bottom: -2px;
  transition: all var(--transition-fast);
}

.tab-button:hover {
  color: var(--color-text);
  background: var(--color-background-alt);
}

.tab-button.active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}

.tab-content {
  display: none;
}

.tab-content.active {
  display: block;
}

.community-library {
  background: var(--color-background-alt);
  border: 2px dashed var(--color-border);
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
}

.community-library h3 {
  margin-top: 0;
  color: var(--color-text);
}

.community-library ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin: 1.5rem 0;
}

.community-library li {
  background: var(--color-background);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid var(--color-border);
  color: var(--color-text-light);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
}

table th,
table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

table th {
  background: var(--color-background-alt);
  font-weight: 600;
  color: var(--color-text);
}

table td {
  color: var(--color-text-light);
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const lang = this.getAttribute('data-lang');

      // Update buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // Update content
      tabContents.forEach(content => {
        if (content.getAttribute('data-lang') === lang) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });
});
</script>
