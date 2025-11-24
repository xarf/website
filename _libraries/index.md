---
layout: docs
title: "XARF Libraries"
description: "Official and community XARF libraries for multiple programming languages"
permalink: /libraries/
---

# XARF Libraries

Official and community-maintained libraries for implementing XARF in your applications.

---

## Official Libraries

### Python
<div class="library-card">
  <div class="library-header">
    <h3>xarf-python</h3>
    <span class="status-badge beta">Beta</span>
  </div>
  <p>Full-featured Python library with validation, conversion, and schema support.</p>
  <div class="library-meta">
    <span>📦 PyPI: <code>pip install xarf</code></span>
    <span>📚 <a href="/libraries/python/">Documentation</a></span>
    <span>⭐ <a href="https://github.com/xarf/xarf-python">GitHub</a></span>
  </div>
  <div class="library-features">
    <strong>Features:</strong>
    <ul>
      <li>Complete XARF 4.0 support</li>
      <li>JSON Schema validation</li>
      <li>Format conversion (ARF, IODEF, CSV)</li>
      <li>Evidence hashing and verification</li>
      <li>Type hints and dataclasses</li>
      <li>Async/await support</li>
    </ul>
  </div>
</div>

### JavaScript/Node.js
<div class="library-card">
  <div class="library-header">
    <h3>xarf-javascript</h3>
    <span class="status-badge alpha">Alpha</span>
  </div>
  <p>JavaScript/TypeScript library for browser and Node.js environments.</p>
  <div class="library-meta">
    <span>📦 npm: <code>npm install xarf</code></span>
    <span>📚 <a href="/libraries/javascript/">Documentation</a></span>
  </div>
  <div class="library-features">
    <strong>Features:</strong>
    <ul>
      <li>TypeScript definitions</li>
      <li>Browser and Node.js compatible</li>
      <li>Streaming validation</li>
      <li>Zero dependencies</li>
    </ul>
  </div>
</div>

### Go
<div class="library-card">
  <div class="library-header">
    <h3>xarf-go</h3>
    <span class="status-badge alpha">Alpha</span>
  </div>
  <p>High-performance Go library for enterprise applications.</p>
  <div class="library-meta">
    <span>📦 go get: <code>go get github.com/xarf/xarf-go</code></span>
    <span>📚 <a href="/libraries/go/">Documentation</a></span>
  </div>
  <div class="library-features">
    <strong>Features:</strong>
    <ul>
      <li>Native struct mapping</li>
      <li>Concurrent processing</li>
      <li>Minimal allocations</li>
      <li>Protocol buffer support</li>
    </ul>
  </div>
</div>

### Java
<div class="library-card">
  <div class="library-header">
    <h3>xarf-java</h3>
    <span class="status-badge alpha">Alpha</span>
  </div>
  <p>Enterprise-grade Java library with Spring Boot integration.</p>
  <div class="library-meta">
    <span>📦 Maven: <code>org.xarf:xarf-java</code></span>
    <span>📚 <a href="/libraries/java/">Documentation</a></span>
  </div>
  <div class="library-features">
    <strong>Features:</strong>
    <ul>
      <li>Jackson integration</li>
      <li>Spring Boot autoconfiguration</li>
      <li>Bean validation support</li>
      <li>JMS/Kafka integration</li>
    </ul>
  </div>
</div>

### C#/.NET
<div class="library-card">
  <div class="library-header">
    <h3>Xarf</h3>
    <span class="status-badge alpha">Alpha</span>
  </div>
  <p>.NET library for Windows and cross-platform applications.</p>
  <div class="library-meta">
    <span>📦 NuGet: <code>Install-Package XARF</code></span>
    <span>📚 <a href="/libraries/csharp/">Documentation</a></span>
  </div>
  <div class="library-features">
    <strong>Features:</strong>
    <ul>
      <li>.NET Standard 2.0+</li>
      <li>Newtonsoft.Json and System.Text.Json</li>
      <li>LINQ integration</li>
      <li>Async streams</li>
    </ul>
  </div>
</div>

---

## Quick Start

Choose your language and get started in minutes:

<div class="language-tabs">
  <button class="tab-button active" data-lang="python">Python</button>
  <button class="tab-button" data-lang="javascript">JavaScript</button>
  <button class="tab-button" data-lang="go">Go</button>
  <button class="tab-button" data-lang="java">Java</button>
  <button class="tab-button" data-lang="csharp">C#</button>
</div>

<div class="tab-content active" data-lang="python" markdown="1">

{% highlight python %}
# Install
pip install xarf

# Create a report
from xarf import XARFReport
from datetime import datetime

report = XARFReport(
    xarf_version="4.0.0",
    report_id="550e8400-e29b-41d4-a716-446655440000",
    timestamp=datetime.utcnow().isoformat() + "Z",
    reporter={
        "org": "Security Operations",
        "contact": "abuse@example.com",
        "type": "automated"
    },
    source_identifier="192.0.2.100",
    classification="abuse",
    type="ddos"
)

# Validate
if report.validate():
    print("✓ Report is valid!")
    print(report.to_json(indent=2))
{% endhighlight %}

**[→ Full Python Documentation](/libraries/python/)**

</div>

<div class="tab-content" data-lang="javascript" markdown="1">

{% highlight javascript %}
// Install
npm install xarf

// Create a report
const { XARFReport } = require('xarf');

const report = new XARFReport({
  xarf_version: '4.0.0',
  report_id: '550e8400-e29b-41d4-a716-446655440000',
  timestamp: new Date().toISOString(),
  reporter: {
    org: 'Security Operations',
    contact: 'abuse@example.com',
    type: 'automated'
  },
  source_identifier: '192.0.2.100',
  class: 'abuse',
  type: 'ddos'
});

// Validate
if (report.validate()) {
  console.log('✓ Report is valid!');
  console.log(report.toJSON(null, 2));
}
{% endhighlight %}

**Coming Soon** - [Express interest on GitHub](https://github.com/xarf/xarf-spec/discussions)

</div>

<div class="tab-content" data-lang="go" markdown="1">

{% highlight go %}
// Install
go get github.com/xarf/xarf-go

// Create a report
package main

import (
    "fmt"
    "time"
    "github.com/xarf/xarf-go"
)

func main() {
    report := xarf.Report{
        XARFVersion: "4.0.0",
        ReportID: "550e8400-e29b-41d4-a716-446655440000",
        Timestamp: time.Now().Format(time.RFC3339),
        Reporter: xarf.Reporter{
            Org: "Security Operations",
            Contact: "abuse@example.com",
            Type: "automated",
        },
        SourceIdentifier: "192.0.2.100",
        Class: "abuse",
        Type: "ddos",
    }

    // Validate
    if err := report.Validate(); err == nil {
        fmt.Println("✓ Report is valid!")
        json, _ := report.MarshalJSON()
        fmt.Println(string(json))
    }
}
{% endhighlight %}

**Coming Soon** - [Express interest on GitHub](https://github.com/xarf/xarf-spec/discussions)

</div>

<div class="tab-content" data-lang="java" markdown="1">

{% highlight java %}
// Maven
<dependency>
    <groupId>org.xarf</groupId>
    <artifactId>xarf-java</artifactId>
    <version>1.0.0</version>
</dependency>

// Create a report
import org.xarf.XARFReport;
import org.xarf.Reporter;

XARFReport report = XARFReport.builder()
    .xarfVersion("4.0.0")
    .reportId("550e8400-e29b-41d4-a716-446655440000")
    .timestamp(Instant.now().toString())
    .reporter(Reporter.builder()
        .org("Security Operations")
        .contact("abuse@example.com")
        .type("automated")
        .build())
    .sourceIdentifier("192.0.2.100")
    .classification("abuse")
    .type("ddos")
    .build();

// Validate
if (report.validate()) {
    System.out.println("✓ Report is valid!");
    System.out.println(report.toJson());
}
{% endhighlight %}

**Coming Soon** - [Express interest on GitHub](https://github.com/xarf/xarf-spec/discussions)

</div>

<div class="tab-content" data-lang="csharp" markdown="1">

{% highlight csharp %}
// Install
Install-Package XARF

// Create a report
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

// Validate
if (report.Validate())
{
    Console.WriteLine("✓ Report is valid!");
    Console.WriteLine(report.ToJson());
}
{% endhighlight %}

**Coming Soon** - [Express interest on GitHub](https://github.com/xarf/xarf-spec/discussions)

</div>

---

## Community Libraries

Community-maintained libraries and integrations:

<div class="community-library">
  <h3>Looking to contribute?</h3>
  <p>We welcome community libraries for additional languages and frameworks!</p>
  <ul>
    <li>Ruby</li>
    <li>PHP</li>
    <li>Rust</li>
    <li>Perl</li>
    <li>Swift</li>
    <li>Kotlin</li>
  </ul>
  <p><a href="/community/contributing/" class="btn btn-primary">Contribution Guide</a></p>
</div>

---

## Integration Examples

### Web Frameworks

- **Flask/Django** (Python) - REST API integration
- **Express.js** (Node.js) - Middleware for abuse reporting
- **Gin/Echo** (Go) - High-performance handlers
- **Spring Boot** (Java) - Enterprise integration
- **ASP.NET Core** (C#) - MVC/API controllers

### Message Queues

- **RabbitMQ** - AMQP integration
- **Apache Kafka** - Streaming reports
- **AWS SQS** - Cloud-native processing
- **Redis** - Pub/sub patterns

### Databases

- **PostgreSQL** - JSONB storage
- **MongoDB** - Document storage
- **Elasticsearch** - Search and analytics
- **TimescaleDB** - Time-series analysis

---

## Library Features Comparison

| Feature | Python | JavaScript | Go | Java | C# |
|---------|--------|------------|-----|------|-----|
| **Schema Validation** | ✓ | 🚧 | 🚧 | 🚧 | 🚧 |
| **Type Safety** | ✓ | 🚧 | 🚧 | 🚧 | 🚧 |
| **Async/Await** | ✓ | 🚧 | N/A | 🚧 | 🚧 |
| **Format Conversion** | ✓ | 🚧 | 🚧 | 🚧 | 🚧 |
| **Evidence Hashing** | ✓ | 🚧 | 🚧 | 🚧 | 🚧 |
| **Streaming** | ✓ | 🚧 | 🚧 | 🚧 | 🚧 |

**Legend**: ✓ Available | 🚧 Coming Soon | N/A Not Applicable

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
