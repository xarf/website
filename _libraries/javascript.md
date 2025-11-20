---
layout: library
title: "JavaScript Library - xarf-javascript"
description: "Official JavaScript/TypeScript library for creating, validating, and processing XARF reports"
permalink: /libraries/javascript/
---

# XARF JavaScript/TypeScript Library

Official JavaScript/TypeScript library for creating, validating, and processing XARF (eXtended Abuse Reporting Format) reports.

<div class="library-status">
  <span class="badge badge-success">Alpha</span>
  <span>Version 4.0.0-alpha.1</span>
  <span>Node.js 16+, Modern Browsers</span>
</div>

---

## Installation

### npm
```bash
npm install xarf
```

### yarn
```bash
yarn add xarf
```

### pnpm
```bash
pnpm add xarf
```

**Requirements**:
- Node.js 16+ or modern browser (ES2020+)
- TypeScript 4.5+ (optional, for type definitions)

**Note**: Alpha release available. Star the [GitHub repository](https://github.com/xarf/xarf-javascript) for updates.

---

## Quick Start

### Creating a Report

```typescript
import { XARFReport, XARFValidator } from 'xarf';

// Create a new XARF report
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
  category: 'abuse',
  type: 'ddos',
  description: 'DDoS attack detected from source IP'
});

// Validate
const validator = new XARFValidator();
if (await validator.validate(report)) {
  console.log('✓ Report is valid!');
}

// Export to JSON
const json = report.toJSON();
console.log(JSON.stringify(json, null, 2));
```

### Loading from JSON

```typescript
import { XARFReport } from 'xarf';

// Load from JSON string
const jsonData = '{"xarf_version": "4.0.0", ...}';
const report = XARFReport.fromJSON(jsonData);

// Load from file (Node.js)
import { readFile } from 'fs/promises';
const fileContent = await readFile('report.json', 'utf-8');
const report = XARFReport.fromJSON(fileContent);

// Validate
if (await report.validate()) {
  console.log(`Loaded report: ${report.report_id}`);
}
```

---

## Core Features

- **Report Creation and Validation** - Type-safe report creation with automatic validation
- **Schema Validation** - Full JSON schema validation against XARF 4.0 specification
- **Evidence Handling** - Base64 encoding, hashing (SHA-256/SHA-512), and integrity verification
- **Format Conversion** - JSON serialization with pretty-printing support
- **Type Safety** - Complete TypeScript definitions included
- **Promise-based API** - Modern async/await support throughout
- **Browser & Node.js** - Works in both environments
- **Stream Processing** - Handle large datasets with Node.js streams

---

## API Reference

### XARFReport Class

Main class for creating and manipulating XARF reports.

#### Constructor

```typescript
constructor(data: XARFReportData)
```

**Parameters**:
- `data` (XARFReportData): Report data object

**Example**:
```typescript
const report = new XARFReport({
  xarf_version: '4.0.0',
  report_id: '550e8400-e29b-41d4-a716-446655440000',
  timestamp: new Date().toISOString(),
  reporter: {
    org: 'Security Ops',
    contact: 'abuse@example.com',
    type: 'automated'
  },
  source_identifier: '192.0.2.100',
  category: 'abuse',
  type: 'ddos'
});
```

#### Methods

##### `validate(options?: ValidationOptions): Promise<boolean>`

Validate the report against the JSON schema.

```typescript
const isValid = await report.validate();
if (!isValid) {
  console.error('Validation errors:', report.validationErrors);
}
```

**Parameters**:
- `options` (ValidationOptions, optional): Validation configuration

**Returns**: `Promise<boolean>` - True if valid, false otherwise

##### `toJSON(pretty?: boolean): string`

Export report to JSON string.

```typescript
const jsonString = report.toJSON(true); // Pretty-printed
```

**Parameters**:
- `pretty` (boolean, optional): Pretty-print with 2-space indentation

**Returns**: `string` - JSON representation

##### `toObject(): XARFReportData`

Convert report to plain JavaScript object.

```typescript
const data = report.toObject();
```

**Returns**: `XARFReportData` - Report as plain object

##### `static fromJSON(json: string): XARFReport`

Create report from JSON string (static method).

```typescript
const report = XARFReport.fromJSON('{"xarf_version": "4.0.0", ...}');
```

**Parameters**:
- `json` (string): JSON string

**Returns**: `XARFReport` instance

##### `static fromObject(data: XARFReportData): XARFReport`

Create report from plain object (static method).

```typescript
const report = XARFReport.fromObject({
  xarf_version: '4.0.0',
  // ...
});
```

**Parameters**:
- `data` (XARFReportData): Plain object

**Returns**: `XARFReport` instance

##### `addEvidence(evidence: Evidence): void`

Add evidence to the report.

```typescript
report.addEvidence({
  content_type: 'text/plain',
  description: 'Server logs',
  payload: 'YmFzZTY0IGVuY29kZWQgZGF0YQ==',
  hash: {
    algorithm: 'sha256',
    value: 'abc123...'
  }
});
```

**Parameters**:
- `evidence` (Evidence): Evidence object

### XARFValidator Class

Validator for XARF reports.

```typescript
const validator = new XARFValidator();
const isValid = await validator.validate(report);
```

### Evidence Class

Handles evidence attachment and verification.

```typescript
import { EvidenceHelper } from 'xarf';

const evidence = await EvidenceHelper.createFromFile(
  'application/pdf',
  'Phishing email screenshot',
  './evidence.pdf'
);
```

### Error Classes

```typescript
import {
  ValidationError,
  ParseError,
  SchemaError
} from 'xarf';
```

---

## Type Definitions

The library includes full TypeScript definitions:

```typescript
interface XARFReportData {
  xarf_version: string;
  report_id: string;
  timestamp: string;
  reporter: Reporter;
  source_identifier: string;
  category: string;
  type: string;
  description?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  evidence?: Evidence[];
  technical_details?: Record<string, any>;
  [key: string]: any;
}

interface Reporter {
  org: string;
  contact: string;
  type: 'automated' | 'manual' | 'ai';
  url?: string;
}

interface Evidence {
  content_type: string;
  description: string;
  payload: string;
  hash?: Hash;
  timestamp?: string;
}

interface Hash {
  algorithm: 'sha256' | 'sha512' | 'md5';
  value: string;
}

interface ValidationOptions {
  strict?: boolean;
  checkRecommended?: boolean;
  allowAdditional?: boolean;
}
```

---

## Examples

### Creating a DDoS Report

```typescript
import { XARFReport } from 'xarf';

const ddosReport = new XARFReport({
  xarf_version: '4.0.0',
  report_id: crypto.randomUUID(),
  timestamp: new Date().toISOString(),
  reporter: {
    org: 'Network Security Team',
    contact: 'noc@example.com',
    type: 'automated'
  },
  source_identifier: '203.0.113.50',
  category: 'abuse',
  type: 'ddos',
  severity: 'high',
  description: 'Volumetric DDoS attack detected',
  technical_details: {
    protocol: 'UDP',
    port: 53,
    packets_per_second: 150000,
    bandwidth_mbps: 1200,
    attack_duration_seconds: 300
  }
});

if (await ddosReport.validate()) {
  await submitReport(ddosReport);
}
```

### Adding Evidence

```typescript
import { EvidenceHelper } from 'xarf';

// Create evidence with automatic hashing
const evidence = await EvidenceHelper.createFromFile(
  'application/pdf',
  'Phishing email screenshot',
  './evidence.pdf'
);

console.log(`SHA-256: ${evidence.hash.value}`);

// Add to report
report.addEvidence(evidence);

// Verify evidence integrity
const isValid = await EvidenceHelper.verify(evidence);
console.log(`Evidence integrity: ${isValid ? '✓' : '✗'}`);
```

### Batch Validation

```typescript
import { XARFBatch } from 'xarf';

const batch = new XARFBatch();

// Add reports
const jsonFiles = await glob('reports/*.json');
for (const file of jsonFiles) {
  const content = await readFile(file, 'utf-8');
  batch.addReport(content);
}

// Validate all
const results = await batch.validateAll();

console.log(`Valid: ${results.valid.length}`);
console.log(`Invalid: ${results.invalid.length}`);

// Process valid reports
for (const report of results.valid) {
  await processReport(report);
}

// Log invalid reports
for (const error of results.invalid) {
  console.error(`${error.reportId}: ${error.errors.join(', ')}`);
}
```

### Custom Fields

```typescript
const report = new XARFReport({
  xarf_version: '4.0.0',
  report_id: crypto.randomUUID(),
  timestamp: new Date().toISOString(),
  reporter: {
    org: 'Security Team',
    contact: 'abuse@example.com',
    type: 'automated'
  },
  source_identifier: '192.0.2.100',
  category: 'abuse',
  type: 'spam',
  // Custom fields
  custom_tracking_id: 'TICKET-12345',
  internal_severity_score: 8.5,
  automated_response: true
});
```

---

## Advanced Usage

### Async/Await Pattern

Process reports asynchronously:

```typescript
import { XARFReport } from 'xarf';

async function processReport(jsonData: string): Promise<void> {
  try {
    const report = XARFReport.fromJSON(jsonData);

    if (await report.validate()) {
      await submitToAPI(report);
      console.log(`Processed report: ${report.report_id}`);
    } else {
      console.error('Invalid report:', report.validationErrors);
    }
  } catch (error) {
    console.error('Failed to process report:', error);
  }
}
```

### Stream Processing

Handle large datasets with streams:

```typescript
import { XARFStream } from 'xarf';
import { createReadStream } from 'fs';

const stream = new XARFStream();

createReadStream('large-reports.jsonl')
  .pipe(stream)
  .on('report', async (report) => {
    if (await report.validate()) {
      await processReport(report);
    }
  })
  .on('error', (error) => {
    console.error('Stream error:', error);
  })
  .on('end', () => {
    console.log('Processing complete');
  });
```

---

## Integration Examples

### Express.js REST API

```typescript
import express from 'express';
import { XARFReport, ValidationError } from 'xarf';

const app = express();
app.use(express.json());

app.post('/xarf/submit', async (req, res) => {
  try {
    // Parse request
    const report = XARFReport.fromObject(req.body);

    // Validate
    if (!await report.validate()) {
      return res.status(400).json({
        status: 'invalid',
        errors: report.validationErrors
      });
    }

    // Process
    await processAbuseReport(report);

    res.status(202).json({
      status: 'accepted',
      report_id: report.report_id
    });

  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

app.listen(3000);
```

### Next.js API Route

```typescript
// pages/api/xarf/submit.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { XARFReport } from 'xarf';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const report = XARFReport.fromObject(req.body);

    if (!await report.validate()) {
      return res.status(400).json({
        error: 'Invalid report',
        details: report.validationErrors
      });
    }

    await processReport(report);

    res.status(202).json({
      status: 'accepted',
      reportId: report.report_id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

### React Hook

```typescript
import { useState, useCallback } from 'react';
import { XARFReport } from 'xarf';

export function useXARFReport() {
  const [report, setReport] = useState<XARFReport | null>(null);
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const validateReport = useCallback(async (data: any) => {
    try {
      const newReport = XARFReport.fromObject(data);
      const valid = await newReport.validate();

      setReport(newReport);
      setIsValid(valid);
      setErrors(valid ? [] : newReport.validationErrors);

      return valid;
    } catch (error) {
      setErrors([error.message]);
      return false;
    }
  }, []);

  return { report, isValid, errors, validateReport };
}
```

### Browser Usage

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module">
    import { XARFReport } from 'https://cdn.jsdelivr.net/npm/xarf/dist/xarf.esm.js';

    async function submitReport() {
      const report = new XARFReport({
        xarf_version: '4.0.0',
        report_id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        reporter: {
          org: 'Security Team',
          contact: 'abuse@example.com',
          type: 'manual'
        },
        source_identifier: '192.0.2.100',
        category: 'abuse',
        type: 'spam'
      });

      if (await report.validate()) {
        const response = await fetch('/api/xarf/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: report.toJSON()
        });

        console.log('Submitted:', await response.json());
      }
    }
  </script>
</head>
<body>
  <button onclick="submitReport()">Submit Report</button>
</body>
</html>
```

---

## Best Practices

### 1. Always Validate

```typescript
// ✓ GOOD
const report = XARFReport.fromJSON(data);
if (await report.validate()) {
  await processReport(report);
}

// ✗ BAD
const report = XARFReport.fromJSON(data);
await processReport(report); // No validation!
```

### 2. Use TypeScript

```typescript
// ✓ GOOD
async function processReport(report: XARFReport): Promise<void> {
  // Type-safe operations
}

// ✗ BAD
async function processReport(report: any) {
  // No type safety
}
```

### 3. Handle Errors Gracefully

```typescript
// ✓ GOOD
try {
  const report = XARFReport.fromJSON(data);
  if (!await report.validate()) {
    logger.error('Validation failed', report.validationErrors);
    return errorResponse(report.validationErrors);
  }
} catch (error) {
  logger.error('Parse error', error);
  return errorResponse([error.message]);
}

// ✗ BAD
const report = XARFReport.fromJSON(data);
await report.validate(); // Unhandled errors
```

### 4. Use Async/Await

```typescript
// ✓ GOOD
const isValid = await report.validate();
if (isValid) {
  await submitReport(report);
}

// ✗ BAD
report.validate().then(isValid => {
  if (isValid) {
    submitReport(report); // Callback hell
  }
});
```

---

## Resources

- **[GitHub Repository](https://github.com/xarf/xarf-javascript)** - Alpha Release
- **[npm Package](https://www.npmjs.com/package/xarf)** - Alpha Release
- **[API Documentation](https://xarf-js.dev/)** - In Development
- **[Examples](https://github.com/xarf/xarf-javascript/tree/main/examples)** - Available
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
