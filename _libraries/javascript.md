---
layout: docs
title: "JavaScript Library - xarf-javascript"
description: "Official JavaScript/TypeScript library for creating, validating, and processing XARF reports"
permalink: /libraries/javascript/
---

# XARF JavaScript/TypeScript Library

Official JavaScript/TypeScript library for parsing, validating, and generating XARF (eXtended Abuse Reporting Format) reports. Implements XARF spec v4.2.0 and supports all 7 categories: messaging, connection, content, infrastructure, copyright, vulnerability, and reputation.

<div class="library-status">
  <span class="badge badge-success">Stable</span>
  <span>Version 1.1.0</span>
  <span>Node.js 18+</span>
</div>

---

## Installation

```bash
npm install @xarf/xarf
```

**Requirements**:
- Node.js 18+
- License: MIT

The official JSON schemas from [xarf-spec](https://github.com/xarf/xarf-spec) are bundled into the package at build time, so installation requires no network access and the library works in any environment (Node, bundlers, serverless, edge) with zero filesystem dependency.

---

## Quick Start

### Parsing a Report

`parse()` validates a report and returns a result object. It does not throw on validation failures — inspect the returned `errors` array instead.

```typescript
import { parse } from '@xarf/xarf';

// Missing first_seen and source_port produce validation errors.
const { report, errors, warnings } = parse({
  xarf_version: '4.2.0',
  report_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  timestamp: '2024-01-15T10:30:00Z',
  // first_seen: '2024-01-15T10:00:00Z',
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
  // source_port: 1234,
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
```

### Creating a Report

`createReport()` auto-generates `xarf_version`, `report_id` (UUID), and `timestamp` (ISO 8601) if they are not provided.

```typescript
import { createReport, createEvidence } from '@xarf/xarf';

// Returns { content_type, payload (base64), hash, size, description }
const evidence = createEvidence('message/rfc822', rawEmailContent, {
  description: 'Original spam email',
  hashAlgorithm: 'sha256',
});

// xarf_version, report_id, and timestamp are auto-generated
const { report, errors, warnings } = createReport({
  category: 'messaging',
  type: 'spam',
  source_identifier: '192.0.2.100',
  reporter: {
    org: 'Example Security',
    contact: 'abuse@example.com',
    domain: 'example.com',
  },
  sender: {
    org: 'Example Security',
    contact: 'abuse@example.com',
    domain: 'example.com',
  },
  evidence_source: 'spamtrap',
  description: 'Spam email detected from source',
  protocol: 'smtp',
  smtp_from: 'spammer@evil.example.com',
  evidence: [evidence],
});

console.log(JSON.stringify(report, null, 2));
```

---

## Core Features

- **Parse** XARF reports from JSON with validation and typed results
- **Generate** XARF-compliant reports with auto-generated metadata (UUIDs, timestamps)
- **Validate** reports against the official JSON schemas with detailed errors and warnings
- **Full TypeScript support** with discriminated union types for all 7 categories
- **v3 backward compatibility** with automatic detection and conversion
- **Schema-driven** — validation rules derived from the official [xarf-spec](https://github.com/xarf/xarf-spec) schemas, not hardcoded

---

## API Reference

The library exposes a **functional API**. There are no classes to instantiate.

### `parse(jsonData, options?)`

Parse and validate a XARF report from JSON. Supports both v4 and v3 (legacy) formats — v3 reports are automatically converted to v4 with deprecation warnings.

```typescript
import { parse } from '@xarf/xarf';

const { report, errors, warnings, info } = parse(jsonData, options?);
```

**Parameters**:
- `jsonData: string | Record<string, unknown>` — JSON string or object containing a XARF report
- `options.strict?: boolean` — Treat warnings (e.g. unknown fields) and `x-recommended` fields as errors (default: `false`)
- `options.showMissingOptional?: boolean` — Include info about missing optional fields (default: `false`)

> `parse()` does not throw on validation failures — inspect the returned `errors` array. It only throws `XARFParseError` when `jsonData` is a malformed JSON string.

**Returns `ParseResult`**:
- `report: XARFReport` — The parsed report, typed by category
- `errors: string[]` — Validation errors (empty if valid)
- `warnings: string[]` — Validation warnings
- `info?: ValidationInfo[]` — Missing optional field info (only when `showMissingOptional` is `true`)

### `createReport(input, options?)`

Create a validated XARF report with auto-generated metadata. Automatically fills `xarf_version`, `report_id` (UUID), and `timestamp` (ISO 8601) if not provided.

```typescript
import { createReport } from '@xarf/xarf';

const { report, errors, warnings } = createReport(input, options?);
```

**Parameters**:
- `input: ReportInput` — Report data. A discriminated union on `category` that narrows type-safe fields per category (e.g., `MessagingReportInput`, `ConnectionReportInput`, etc.)
- `options.strict?: boolean` — Treat warnings and `x-recommended` fields as errors (default: `false`)
- `options.showMissingOptional?: boolean` — Include info about missing optional fields (default: `false`)

> Like `parse()`, `createReport()` does not throw on validation failures — the report is always returned alongside any `errors`.

**Returns `CreateReportResult`**:
- `report: XARFReport` — The generated report
- `errors: ValidationError[]` — Structured validation errors (`{ field, message, value? }`)
- `warnings: ValidationWarning[]` — Structured validation warnings (`{ field, message, value? }`)
- `info?: ValidationInfo[]` — Missing optional field info (only when `showMissingOptional` is `true`)

### `createEvidence(contentType, payload, options?)`

Create an evidence object with automatic base64 encoding, hashing, and size calculation.

```typescript
import { createEvidence } from '@xarf/xarf';

const evidence = createEvidence(contentType, payload, options?);
```

**Parameters**:
- `contentType: string` — MIME type of the evidence (e.g., `'message/rfc822'`)
- `payload: string | Buffer` — The evidence data
- `options.description?: string` — Human-readable description
- `options.hashAlgorithm?: 'sha256' | 'sha512' | 'sha1' | 'md5'` — Hash algorithm (default: `'sha256'`)

**Returns `XARFEvidence`** with computed `hash`, `size`, and base64-encoded `payload`.

### `schemaRegistry`

Access schema-derived validation rules and metadata programmatically.

```typescript
import { schemaRegistry } from '@xarf/xarf';

// Get all valid categories
schemaRegistry.getCategories();
// Set { 'messaging', 'connection', 'content', 'infrastructure', 'copyright', 'vulnerability', 'reputation' }

// Get valid types for a category
schemaRegistry.getTypesForCategory('connection');
// Set { 'ddos', 'port_scan', 'login_attack', ... }

// Check if a category/type combination is valid
schemaRegistry.isValidType('connection', 'ddos'); // true

// Get field metadata including descriptions
schemaRegistry.getFieldMetadata('confidence');
// { description: '...', required: false, recommended: true, ... }
```

---

## Validation Details

Both `parse()` and `createReport()` run validation internally. Additional behaviors:

- **Unknown fields** trigger warnings (or errors in strict mode)
- **Missing optional fields** can be discovered with `showMissingOptional: true`:

```typescript
const { info } = parse(report, { showMissingOptional: true });

if (info) {
  info.forEach(({ field, message }) => {
    console.log(`${field}: ${message}`);
    // e.g., "description: OPTIONAL - Human-readable description of the abuse"
    // e.g., "confidence: RECOMMENDED - Confidence score between 0.0 and 1.0"
  });
}
```

---

## v3 Backward Compatibility

The library automatically detects XARF v3 reports (by the `Version` field) and converts them to v4 during parsing. Converted reports include `legacy_version: '3'` and deprecation warnings.

```typescript
import { parse } from '@xarf/xarf';

const { report, warnings } = parse(v3Report);

console.log(report.xarf_version); // '4.2.0'
console.log(report.category); // mapped category (e.g., 'messaging')
console.log(report.legacy_version); // '3'
// warnings includes deprecation notice + conversion details
```

You can also use the low-level utilities directly:

```typescript
import { isXARFv3, convertV3toV4, getV3DeprecationWarning } from '@xarf/xarf';

if (isXARFv3(jsonData)) {
  const warnings: string[] = [];
  const v4Report = convertV3toV4(v3Report, warnings);
  console.log(getV3DeprecationWarning());
}
```

Unknown v3 report types cause a parse error listing the supported types. See the [migration guide](https://github.com/xarf/xarf-javascript/blob/main/docs/MIGRATION_V3_TO_V4.md) for the full type mapping and migration strategies.

---

## Resources

- **[GitHub Repository](https://github.com/xarf/xarf-javascript)**
- **[npm Package](https://www.npmjs.com/package/@xarf/xarf)**
- **[Issue Tracker](https://github.com/xarf/xarf-javascript/issues)**
- **[XARF Specification](https://xarf.org)**
- **[License (MIT)](https://github.com/xarf/xarf-javascript/blob/main/LICENSE)**

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
