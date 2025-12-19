---
layout: docs
title: "Downloads"
description: "Download XARF schemas, examples, documentation, and tools"
permalink: /downloads/
---

# Downloads

Download XARF resources including JSON schemas, example reports, documentation, and reference implementations.

---

## JSON Schemas

Official JSON Schema files for validating XARF reports.

<div class="download-section">
  <h3>XARF v4.0.0 Schemas</h3>

  <div class="download-grid">
    <div class="download-card">
      <h4>Complete Schema Package</h4>
      <p>All XARF schemas in a single archive</p>
      <div class="download-links">
        <a href="https://github.com/xarf/xarf-spec/releases/download/v4.0.0/xarf-schemas-v4.0.0.zip" class="btn btn-primary">
          Download ZIP
        </a>
        <span class="file-info">~50 KB</span>
      </div>
    </div>

    <div class="download-card">
      <h4>Core Schema</h4>
      <p>Base XARF report structure</p>
      <div class="download-links">
        <a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/xarf-core.json" class="btn btn-secondary">
          View on GitHub
        </a>
      </div>
    </div>
  </div>

  <details class="schema-list">
    <summary>Individual Schemas by Type</summary>

    <h4>Connection (8 types)</h4>
    <ul>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/connection-ddos.json">connection-ddos.json</a></li>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/connection-infected-host.json">connection-infected-host.json</a></li>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/connection-login-attack.json">connection-login-attack.json</a></li>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/connection-port-scan.json">connection-port-scan.json</a></li>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/connection-reconnaissance.json">connection-reconnaissance.json</a></li>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/connection-scraping.json">connection-scraping.json</a></li>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/connection-sql-injection.json">connection-sql-injection.json</a></li>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/connection-vulnerability-scan.json">connection-vulnerability-scan.json</a></li>
    </ul>

    <h4>Content (9 types)</h4>
    <ul>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/content-phishing.json">content-phishing.json</a></li>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/content-malware.json">content-malware.json</a></li>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/content-csam.json">content-csam.json</a></li>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/content-csem.json">content-csem.json</a></li>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/content-exposed-data.json">content-exposed-data.json</a></li>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/content-brand_infringement.json">content-brand_infringement.json</a></li>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/content-fraud.json">content-fraud.json</a></li>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/content-remote_compromise.json">content-remote_compromise.json</a></li>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/content-suspicious_registration.json">content-suspicious_registration.json</a></li>
    </ul>

    <h4>Copyright (6 types)</h4>
    <ul>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/copyright-copyright.json">copyright-copyright.json</a></li>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/copyright-p2p.json">copyright-p2p.json</a></li>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/copyright-cyberlocker.json">copyright-cyberlocker.json</a></li>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/copyright-ugc-platform.json">copyright-ugc-platform.json</a></li>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/copyright-link-site.json">copyright-link-site.json</a></li>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/copyright-usenet.json">copyright-usenet.json</a></li>
    </ul>

    <h4>Infrastructure (2 types)</h4>
    <ul>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/infrastructure-botnet.json">infrastructure-botnet.json</a></li>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/infrastructure-compromised-server.json">infrastructure-compromised-server.json</a></li>
    </ul>

    <h4>Messaging (2 types)</h4>
    <ul>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/messaging-spam.json">messaging-spam.json</a></li>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/messaging-bulk-messaging.json">messaging-bulk-messaging.json</a></li>
    </ul>

    <h4>Reputation (2 types)</h4>
    <ul>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/reputation-blocklist.json">reputation-blocklist.json</a></li>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/reputation-threat-intelligence.json">reputation-threat-intelligence.json</a></li>
    </ul>

    <h4>Vulnerability (3 types)</h4>
    <ul>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/vulnerability-cve.json">vulnerability-cve.json</a></li>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/vulnerability-misconfiguration.json">vulnerability-misconfiguration.json</a></li>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/vulnerability-open-service.json">vulnerability-open-service.json</a></li>
    </ul>
  </details>
</div>

---

## Example Reports

Sample XARF reports demonstrating each event type.

<div class="download-section">
  <h3>Example Report Collections</h3>

  <div class="download-grid">
    <div class="download-card">
      <h4>Complete Examples Package</h4>
      <p>All example reports for all event types</p>
      <div class="download-links">
        <a href="https://github.com/xarf/xarf-spec/releases/download/v4.0.0/xarf-examples-v4.0.0.zip" class="btn btn-primary">
          Download ZIP
        </a>
        <span class="file-info">~100 KB</span>
      </div>
    </div>

    <div class="download-card">
      <h4>Browse Examples Online</h4>
      <p>View all examples in the documentation</p>
      <div class="download-links">
        <a href="{{ site.baseurl }}/docs/types/" class="btn btn-secondary">
          View Online
        </a>
      </div>
    </div>
  </div>

  <details class="schema-list">
    <summary>Example Reports by Category</summary>

    <h4>Connection</h4>
    <ul>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/samples/v4/connection-ddos.json">DDoS Attack Example</a></li>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/samples/v4/connection-login-attack.json">Login Attack Example</a></li>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/samples/v4/connection-port-scan.json">Port Scan Example</a></li>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/samples/v4/connection-infected-host.json">Infected Host Example</a></li>
    </ul>

    <h4>Content</h4>
    <ul>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/samples/v4/content-phishing.json">Phishing Example</a></li>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/samples/v4/content-malware.json">Malware Example</a></li>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/samples/v4/content-fraud.json">Fraud Example</a></li>
    </ul>

    <h4>Messaging</h4>
    <ul>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/samples/v4/messaging-spam.json">Spam Example</a></li>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/samples/v4/messaging-bulk-messaging.json">Bulk Messaging Example</a></li>
    </ul>

    <h4>Vulnerability</h4>
    <ul>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/samples/v4/vulnerability-cve.json">CVE Example</a></li>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/samples/v4/vulnerability-misconfiguration.json">Misconfiguration Example</a></li>
      <li><a href="https://github.com/xarf/xarf-spec/blob/main/samples/v4/vulnerability-open.json">Open Service Example</a></li>
    </ul>
  </details>
</div>

---

## Documentation

Complete XARF documentation in various formats.

<div class="download-section">
  <div class="download-grid">
    <div class="download-card">
      <h4>Specification PDF</h4>
      <p>Complete XARF v4.0 specification</p>
      <div class="download-links">
        <a href="https://github.com/xarf/xarf-spec/releases/download/v4.0.0/XARF-Specification-v4.0.0.pdf" class="btn btn-primary">
          Download PDF
        </a>
        <span class="file-info">~2 MB</span>
      </div>
    </div>

    <div class="download-card">
      <h4>Quick Reference Card</h4>
      <p>One-page XARF quick reference</p>
      <div class="download-links">
        <a href="https://github.com/xarf/xarf-spec/releases/download/v4.0.0/XARF-QuickRef-v4.0.0.pdf" class="btn btn-primary">
          Download PDF
        </a>
        <span class="file-info">~500 KB</span>
      </div>
    </div>

    <div class="download-card">
      <h4>Implementation Guide PDF</h4>
      <p>Step-by-step implementation guide</p>
      <div class="download-links">
        <a href="https://github.com/xarf/xarf-spec/releases/download/v4.0.0/XARF-Implementation-Guide-v4.0.0.pdf" class="btn btn-primary">
          Download PDF
        </a>
        <span class="file-info">~1.5 MB</span>
      </div>
    </div>

    <div class="download-card">
      <h4>Online Documentation</h4>
      <p>Browse the complete documentation</p>
      <div class="download-links">
        <a href="{{ site.baseurl }}/docs/introduction/" class="btn btn-secondary">
          View Online
        </a>
      </div>
    </div>
  </div>
</div>

---

## Code Templates

Ready-to-use code snippets and templates.

<div class="download-section">
  <h3>Integration Templates</h3>

  <div class="template-card">
    <h4>Python Template</h4>
    <p>Basic XARF report creation and validation</p>
    <div class="code-wrapper">
{% highlight python %}
from xarf import XARFReport
from datetime import datetime

def create_abuse_report(source_ip, abuse_type):
    """Create a basic XARF abuse report"""
    report = XARFReport(
        xarf_version="4.0.0",
        report_id=str(uuid.uuid4()),
        timestamp=datetime.utcnow().isoformat() + "Z",
        reporter={
            "org": "Your Organization",
            "contact": "abuse@example.com",
            "domain": "example.com"
        },
        sender={
            "org": "Your Organization",
            "contact": "abuse@example.com",
            "domain": "example.com"
        },
        source_identifier=source_ip,
        category="connection",
        type=abuse_type
    )

    if report.validate():
        return report.to_json()
    else:
        raise ValueError(report.validation_errors)
{% endhighlight %}
    </div>
    <a href="{{ site.baseurl }}/libraries/python/" class="btn btn-small btn-secondary">View Python Library</a>
  </div>

  <div class="template-card">
    <h4>Flask API Template</h4>
    <p>REST API endpoint for receiving XARF reports</p>
    <div class="code-wrapper">
{% highlight python %}
from flask import Flask, request, jsonify
from xarf import XARFReport, ValidationError

app = Flask(__name__)

@app.route('/xarf/submit', methods=['POST'])
def submit_report():
    try:
        report = XARFReport.from_json(request.get_json())
        report.validate(strict=True)

        # Process report
        process_abuse_report(report)

        return jsonify({'status': 'accepted', 'report_id': report.report_id}), 202
    except ValidationError as e:
        return jsonify({'status': 'invalid', 'errors': e.errors}), 400
{% endhighlight %}
    </div>
    <a href="{{ site.baseurl }}/libraries/python/" class="btn btn-small btn-secondary">View Python Library</a>
  </div>

  <div class="template-card">
    <h4>Evidence Handler Template</h4>
    <p>Evidence collection and hashing</p>
    <div class="code-wrapper">
{% highlight python %}
import hashlib
import base64

def add_evidence_to_report(report, file_path, description):
    """Add evidence file to XARF report with SHA-256 hash"""
    with open(file_path, 'rb') as f:
        data = f.read()

    # Calculate hash
    sha256_hash = hashlib.sha256(data).hexdigest()

    # Encode to base64
    payload = base64.b64encode(data).decode('utf-8')

    report.add_evidence(
        content_type="application/octet-stream",
        description=description,
        payload=payload,
        hash={
            "algorithm": "sha256",
            "value": sha256_hash
        }
    )
{% endhighlight %}
    </div>
    <a href="{{ site.baseurl }}/libraries/python/" class="btn btn-small btn-secondary">View Python Library</a>
  </div>
</div>

---

## Tools and Utilities

Standalone tools for working with XARF.

<div class="download-section">
  <div class="download-grid">
    <div class="download-card">
      <h4>Web Validator</h4>
      <p>Browser-based validation tool</p>
      <div class="download-links">
        <a href="{{ site.baseurl }}/tools/validator/" class="btn btn-primary">
          Use Online
        </a>
      </div>
    </div>

    <div class="download-card">
      <h4>Python Library</h4>
      <p>Full-featured Python library with CLI tools</p>
      <div class="download-links">
        <a href="https://github.com/xarf/xarf-python" class="btn btn-primary">
          View on GitHub
        </a>
        <span class="file-info">pip install xarf</span>
      </div>
    </div>

    <div class="download-card">
      <h4>All Libraries</h4>
      <p>Python, JavaScript, Go</p>
      <div class="download-links">
        <a href="{{ site.baseurl }}/libraries/" class="btn btn-secondary">
          Browse Libraries
        </a>
      </div>
    </div>
  </div>
</div>

---

## Previous Versions

Access older XARF specification versions.

<div class="download-section">
  <table class="version-table">
    <thead>
      <tr>
        <th>Version</th>
        <th>Release Date</th>
        <th>Status</th>
        <th>Downloads</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>v4.0.0</strong></td>
        <td>Q1 2026</td>
        <td><span class="badge badge-success">Current</span></td>
        <td>
          <a href="https://github.com/xarf/xarf-spec/releases/tag/v4.0.0">Schemas</a> |
          <a href="https://github.com/xarf/xarf-spec/releases/tag/v4.0.0">Examples</a> |
          <a href="https://github.com/xarf/xarf-spec/releases/tag/v4.0.0">Docs</a>
        </td>
      </tr>
      <tr>
        <td>v3.1.0</td>
        <td>Q2 2025</td>
        <td><span class="badge badge-warning">Deprecated</span></td>
        <td>
          <a href="https://github.com/xarf/xarf-spec/releases/tag/v3.1.0">Schemas</a> |
          <a href="https://github.com/xarf/xarf-spec/releases/tag/v3.1.0">Examples</a>
        </td>
      </tr>
      <tr>
        <td>v3.0.0</td>
        <td>Q4 2024</td>
        <td><span class="badge badge-warning">Deprecated</span></td>
        <td>
          <a href="https://github.com/xarf/xarf-spec/releases/tag/v3.0.0">Schemas</a> |
          <a href="https://github.com/xarf/xarf-spec/releases/tag/v3.0.0">Examples</a>
        </td>
      </tr>
    </tbody>
  </table>

  <p><a href="{{ site.baseurl }}/docs/migration/">Migration Guide →</a></p>
</div>

---

## License

All XARF resources are released under the MIT License.

- **Schemas**: [MIT License](https://github.com/xarf/xarf-spec/blob/main/LICENSE)
- **Examples**: [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/)
- **Documentation**: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

---

## Need Help?

- **[Implementation Guide]({{ site.baseurl }}/docs/implementation-guide/)** - Step-by-step integration
- **[GitHub Discussions](https://github.com/xarf/xarf-spec/discussions)** - Ask questions
- **[GitHub Issues](https://github.com/xarf/xarf-spec/issues)** - Report problems

<style>
.download-section {
  margin: 3rem 0;
}

.download-section h3 {
  margin-bottom: 1.5rem;
  color: var(--color-text);
}

.download-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.download-card {
  background: var(--color-background-alt);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1.5rem;
}

.download-card h4 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: var(--color-text);
}

.download-card p {
  color: var(--color-text-light);
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.download-links {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.file-info {
  font-size: 0.75rem;
  color: var(--color-text-light);
}

.schema-list {
  background: var(--color-background-alt);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1rem;
}

.schema-list summary {
  font-weight: 600;
  color: var(--color-text);
  cursor: pointer;
  user-select: none;
}

.schema-list h4 {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: var(--color-text);
  font-size: 1rem;
}

.schema-list h4:first-of-type {
  margin-top: 1rem;
}

.schema-list ul {
  margin: 0 0 1rem 0;
  padding-left: 1.5rem;
}

.schema-list li {
  margin-bottom: 0.5rem;
}

.template-card {
  background: var(--color-background-alt);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.template-card h4 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: var(--color-text);
}

.template-card p {
  color: var(--color-text-light);
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.template-card .code-wrapper {
  margin: 1rem 0;
  border-radius: 8px;
  overflow: hidden;
}

.template-card .code-wrapper .highlight {
  margin: 0;
}

.template-card pre {
  margin: 1rem 0;
}

.version-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

.version-table th,
.version-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

.version-table th {
  background: var(--color-background-alt);
  font-weight: 600;
  color: var(--color-text);
}

.version-table td {
  color: var(--color-text-light);
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

.btn-small {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}
</style>
