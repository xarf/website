# XARF JavaScript/TypeScript Library Architecture

## Executive Summary

Complete architecture for **xarf** npm package - a TypeScript implementation of the XARF v4 (Extended Abuse Reporting Format) parser, validator, and generator, based on the Python reference implementation at `/Users/tknecht/Projects/xarf/xarf-python`.

### Key Design Principles

1. **TypeScript-First**: Leverage TypeScript's type system for compile-time safety
2. **ES2020+ Target**: Modern JavaScript features with broad compatibility
3. **Zero Dependencies**: Core library has no runtime dependencies
4. **Field Alignment**: Use `category` field (not `class`) per v4 spec
5. **Quality Pipeline**: Match Python's quality standards with TypeScript equivalents
6. **NO Converter**: Parser, Validator, Generator only (no format conversion)

---

## 1. Project Structure

```
xarf/
├── src/
│   ├── index.ts                 # Main export barrel
│   ├── types.ts                 # TypeScript type definitions
│   ├── models.ts                # XARF data models & classes
│   ├── parser.ts                # JSON parser implementation
│   ├── validator.ts             # Validation logic
│   ├── generator.ts             # Report generator
│   ├── exceptions.ts            # Custom error classes
│   └── utils/
│       ├── date-utils.ts        # ISO 8601 date handling
│       ├── hash-utils.ts        # Evidence hashing (SHA-256/512)
│       └── validation-utils.ts  # Validation helpers
│
├── test/
│   ├── unit/
│   │   ├── parser.test.ts
│   │   ├── validator.test.ts
│   │   ├── generator.test.ts
│   │   ├── models.test.ts
│   │   └── security.test.ts
│   ├── integration/
│   │   ├── end-to-end.test.ts
│   │   └── real-world-reports.test.ts
│   └── fixtures/
│       ├── valid-reports/
│       └── invalid-reports/
│
├── docs/
│   ├── API.md
│   ├── MIGRATION.md
│   └── examples/
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── quality.yml
│       ├── security.yml
│       └── publish.yml
│
├── package.json
├── tsconfig.json
├── tsconfig.build.json
├── jest.config.ts
├── .eslintrc.js
├── .prettierrc.js
├── .husky/                      # Git hooks
│   ├── pre-commit
│   └── commit-msg
├── README.md
├── LICENSE
└── CHANGELOG.md
```

---

## 2. Core Type Definitions (`types.ts`)

```typescript
/**
 * XARF v4 Type Definitions
 * Based on xarf-spec v4.0.0
 */

export type XARFVersion = '4.0.0';

export type ReporterType = 'automated' | 'manual' | 'hybrid';

export type XARFCategory =
  | 'messaging'
  | 'connection'
  | 'content'
  | 'infrastructure'
  | 'copyright'
  | 'vulnerability'
  | 'reputation'
  | 'other';

export type EvidenceSource =
  | 'spamtrap'
  | 'honeypot'
  | 'user_report'
  | 'automated_scan'
  | 'manual_analysis'
  | 'vulnerability_scan'
  | 'researcher_analysis'
  | 'threat_intelligence';

export type Severity = 'low' | 'medium' | 'high' | 'critical';

// Category-specific types
export type MessagingType = 'spam' | 'phishing' | 'social_engineering';
export type ConnectionType = 'ddos' | 'port_scan' | 'login_attack' | 'ip_spoofing';
export type ContentType = 'phishing_site' | 'malware_distribution' | 'defacement' | 'spamvertised' | 'web_hack';

/**
 * Core XARF Report Interface
 */
export interface XARFReporter {
  org: string;
  contact: string;
  type: ReporterType;
}

export interface XARFEvidence {
  content_type: string;
  description: string;
  payload: string;
  hash?: string;
  size?: number;
}

export interface XARFReportBase {
  xarf_version: XARFVersion;
  report_id: string;
  timestamp: string; // ISO 8601
  reporter: XARFReporter;
  on_behalf_of?: XARFReporter;
  source_identifier: string;
  category: XARFCategory; // NOTE: 'category' not 'class'
  type: string;
  evidence_source: EvidenceSource;

  // Optional fields
  evidence?: XARFEvidence[];
  tags?: string[];
  _internal?: Record<string, unknown>;
}

/**
 * Category-specific report types
 */
export interface MessagingReport extends XARFReportBase {
  category: 'messaging';
  type: MessagingType;
  protocol?: string;
  smtp_from?: string;
  smtp_to?: string;
  subject?: string;
  message_id?: string;
  sender_display_name?: string;
  target_victim?: string;
  message_content?: string;
}

export interface ConnectionReport extends XARFReportBase {
  category: 'connection';
  type: ConnectionType;
  destination_ip: string;
  protocol: string;
  destination_port?: number;
  source_port?: number;
  attack_type?: string;
  duration_minutes?: number;
  packet_count?: number;
  byte_count?: number;
  attempt_count?: number;
  successful_logins?: number;
  usernames_attempted?: string[];
  attack_pattern?: string;
}

export interface ContentReport extends XARFReportBase {
  category: 'content';
  type: ContentType;
  url: string;
  content_type?: string;
  attack_type?: string;
  affected_pages?: string[];
  cms_platform?: string;
  vulnerability_exploited?: string;
  affected_parameters?: string[];
  payload_detected?: string;
  data_exposed?: string[];
  database_type?: string;
  records_potentially_affected?: number;
}

export type XARFReport = XARFReportBase | MessagingReport | ConnectionReport | ContentReport;

/**
 * Parser Options
 */
export interface ParserOptions {
  strict?: boolean; // Throw on validation errors vs collect
  allowUnsupportedCategories?: boolean;
}

/**
 * Validation Result
 */
export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings?: string[];
}

export interface ValidationError {
  field?: string;
  message: string;
  code?: string;
}

/**
 * Generator Options
 */
export interface GeneratorOptions {
  includeOptionalFields?: boolean;
  autoGenerateId?: boolean; // Default: true
  autoGenerateTimestamp?: boolean; // Default: true
}
```

---

## 3. Parser Implementation (`parser.ts`)

Based on Python's `xarf/parser.py`, the TypeScript parser follows the same structure:

```typescript
import { XARFReport, ParserOptions, ValidationError } from './types';
import { createReportModel, XARFReportModel } from './models';
import { XARFParseError, XARFValidationError } from './exceptions';

/**
 * XARF v4 Report Parser
 * Equivalent to Python's XARFParser class
 */
export class XARFParser {
  private readonly strict: boolean;
  private errors: ValidationError[] = [];
  private readonly supportedCategories = new Set(['messaging', 'connection', 'content']);

  constructor(options: ParserOptions = {}) {
    this.strict = options.strict ?? false;
  }

  /**
   * Parse XARF report from JSON string or object
   * Python equivalent: def parse(self, json_data: Union[str, Dict[str, Any]]) -> XARFReport
   */
  parse(input: string | Record<string, unknown>): XARFReportModel {
    this.errors = [];

    // Parse JSON if string
    let data: Record<string, unknown>;
    try {
      data = typeof input === 'string' ? JSON.parse(input) : input;
    } catch (error) {
      throw new XARFParseError(`Invalid JSON: ${error.message}`);
    }

    // Validate structure
    const structureValid = this.validateStructure(data);
    if (!structureValid && this.strict) {
      throw new XARFValidationError('Validation failed', this.errors);
    }

    // Check category support (alpha version)
    const category = data.category as string;
    if (!this.supportedCategories.has(category)) {
      const error = `Unsupported category '${category}' in alpha version`;
      if (this.strict) {
        throw new XARFValidationError(error, this.errors);
      }
      this.errors.push({ message: error, field: 'category' });
    }

    // Create appropriate model
    return createReportModel(data as XARFReport);
  }

  /**
   * Validate report without parsing
   * Python equivalent: def validate(self, json_data: Union[str, Dict[str, Any]]) -> bool
   */
  validate(input: string | Record<string, unknown>): boolean {
    this.errors = [];

    let data: Record<string, unknown>;
    try {
      data = typeof input === 'string' ? JSON.parse(input) : input;
    } catch (error) {
      this.errors.push({ message: `Invalid JSON: ${error.message}` });
      return false;
    }

    return this.validateStructure(data);
  }

  /**
   * Get validation errors from last operation
   * Python equivalent: def get_errors(self) -> List[str]
   */
  getErrors(): ValidationError[] {
    return [...this.errors];
  }

  /**
   * Validate basic XARF structure
   * Python equivalent: def validate_structure(self, data: Dict[str, Any]) -> bool
   */
  private validateStructure(data: Record<string, unknown>): boolean {
    // Implementation follows Python's validation logic
    // See Python parser.py lines 105-161
    // ... (validation code)
    return true;
  }
}
```

---

## 4. Generator Implementation (`generator.ts`)

Based on Python's `xarf/generator.py`:

```typescript
import { XARFReport, GeneratorOptions } from './types';
import { XARFError } from './exceptions';
import { generateUUID, generateTimestamp, generateHash } from './utils';

/**
 * XARF Report Generator
 * Equivalent to Python's XARFGenerator class
 */
export class XARFGenerator {
  private static readonly XARF_VERSION = '4.0.0';

  private static readonly VALID_CATEGORIES = new Set([
    'messaging', 'connection', 'content', 'infrastructure',
    'copyright', 'vulnerability', 'reputation', 'other'
  ]);

  private static readonly EVENT_TYPES: Record<string, string[]> = {
    messaging: ['spam', 'phishing', 'social_engineering'],
    connection: ['ddos', 'port_scan', 'login_attack', 'ip_spoofing'],
    content: ['phishing_site', 'malware_distribution', 'defacement', 'spamvertised', 'web_hack']
  };

  /**
   * Generate complete XARF report
   * Python equivalent: def generate_report(...) -> Dict[str, Any]
   */
  generateReport(params: {
    category: string;
    type: string;
    source_identifier: string;
    reporter_contact: string;
    reporter_org?: string;
    // ... other params
  }): XARFReport {
    // Implementation follows Python's generate_report logic
    // See Python generator.py lines 244-401
    // ...
  }

  /**
   * Add evidence with automatic hashing
   * Python equivalent: def add_evidence(...) -> Dict[str, str]
   */
  addEvidence(
    content_type: string,
    description: string,
    payload: string | Buffer,
    hash_algorithm: 'sha256' | 'sha512' = 'sha256'
  ): XARFEvidence {
    // Implementation follows Python's add_evidence logic
    // See Python generator.py lines 200-242
    // ...
  }
}
```

---

## 5. Package Configuration

### `package.json`

```json
{
  "name": "xarf",
  "version": "4.0.0-alpha.1",
  "description": "XARF v4 JavaScript/TypeScript Parser - Parse, validate, and generate XARF v4 abuse reports",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "require": "./dist/index.js",
      "import": "./dist/index.mjs",
      "types": "./dist/index.d.ts"
    }
  },
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts --clean",
    "test": "jest",
    "test:coverage": "jest --coverage",
    "lint": "eslint src test --ext .ts",
    "lint:fix": "eslint src test --ext .ts --fix",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "format:check": "prettier --check \"src/**/*.ts\" \"test/**/*.ts\"",
    "typecheck": "tsc --noEmit",
    "quality": "npm run lint && npm run format:check && npm run typecheck",
    "prepublishOnly": "npm run quality && npm run test && npm run build"
  },
  "keywords": ["xarf", "abuse", "security", "parser", "validation"],
  "author": "XARF Project",
  "license": "MIT",
  "engines": {
    "node": ">=14.0.0"
  },
  "devDependencies": {
    "@types/jest": "^29.5.0",
    "@types/node": "^20.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.50.0",
    "eslint-config-prettier": "^9.0.0",
    "husky": "^8.0.0",
    "jest": "^29.7.0",
    "prettier": "^3.0.0",
    "ts-jest": "^29.1.0",
    "tsup": "^8.0.0",
    "typescript": "^5.2.0"
  }
}
```

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "test"]
}
```

---

## 6. Quality Pipeline Comparison

| Python (xarf-python) | TypeScript (xarf) | Purpose |
|---------------------|-------------------|---------|
| **Black** | **Prettier** | Code formatting |
| **Flake8** | **ESLint** | Linting |
| **mypy** | **TypeScript strict** | Type checking |
| **pytest** | **Jest** | Testing |
| **pytest-cov** | **Jest --coverage** | Coverage (90%+ target) |
| **isort** | **ESLint import rules** | Import sorting |
| **bandit** | **ESLint security** | Security scanning |
| **pydocstyle** | **ESLint JSDoc** | Documentation |
| **radon** | **ESLint complexity** | Complexity metrics |
| **pre-commit** | **Husky** | Git hooks |

---

## 7. GitHub Actions CI/CD

### `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    name: Test on Node ${{ matrix.node }}
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node: ['14', '16', '18', '20']

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node }}
          cache: 'npm'

      - run: npm ci
      - run: npm run build
      - run: npm test

      - name: Upload coverage
        if: matrix.node == '20'
        uses: codecov/codecov-action@v3

  quality:
    name: Code Quality Checks
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - run: npm ci
      - run: npm run lint
      - run: npm run format:check
      - run: npm run typecheck
```

---

## 8. Testing Strategy

### Coverage Requirements (Match Python)
- **Line coverage**: 90%+
- **Branch coverage**: 90%+
- **Function coverage**: 90%+
- **Statement coverage**: 90%+

### Test Structure

```
test/
├── unit/
│   ├── parser.test.ts          # Parser unit tests
│   ├── validator.test.ts       # Validation logic
│   ├── generator.test.ts       # Generator tests
│   ├── models.test.ts          # Model tests
│   └── security.test.ts        # Security tests
├── integration/
│   ├── end-to-end.test.ts      # Full workflow
│   └── real-world.test.ts      # Real report examples
└── fixtures/
    ├── valid-reports/
    └── invalid-reports/
```

### Jest Configuration (`jest.config.ts`)

```typescript
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  }
};
```

---

## 9. API Surface (Main Exports)

### `src/index.ts`

```typescript
// Classes
export { XARFParser } from './parser';
export { XARFGenerator } from './generator';
export {
  XARFReportModel,
  MessagingReportModel,
  ConnectionReportModel,
  ContentReportModel
} from './models';

// Exceptions
export {
  XARFError,
  XARFValidationError,
  XARFParseError,
  XARFSchemaError
} from './exceptions';

// Types
export type {
  XARFReport,
  XARFReporter,
  XARFEvidence,
  MessagingReport,
  ConnectionReport,
  ContentReport,
  ParserOptions,
  GeneratorOptions,
  ValidationResult,
  ValidationError
} from './types';

// Convenience functions
export { parseXARF, validateXARF } from './parser';
export { generateXARF } from './generator';
```

---

## 10. Architecture Decision Records (ADRs)

### ADR-001: TypeScript-First Design
**Decision**: Build with TypeScript as primary language
**Rationale**: Type safety, better tooling, easier maintenance
**Status**: Accepted

### ADR-002: Zero Runtime Dependencies
**Decision**: Core library has no runtime dependencies
**Rationale**: Smaller bundle, fewer security risks, easier maintenance
**Status**: Accepted

### ADR-003: Field Naming - `category` vs `class`
**Decision**: Use `category` field (XARF v4 spec)
**Rationale**: Aligns with spec, avoids JS reserved keyword
**Status**: Accepted

### ADR-004: No Converter Component
**Decision**: Parser, Validator, Generator only (no conversion)
**Rationale**: Focused scope, conversion can be separate package
**Status**: Accepted

### ADR-005: Match Python Quality Standards
**Decision**: Achieve 90%+ test coverage, strict linting, type checking
**Rationale**: Maintain consistency across implementations
**Status**: Accepted

---

## 11. File Mapping: Python → TypeScript

| Python File | TypeScript File | Notes |
|------------|----------------|-------|
| `xarf/__init__.py` | `src/index.ts` | Main exports |
| `xarf/models.py` | `src/models.ts` | Data models (Pydantic → Classes) |
| `xarf/parser.py` | `src/parser.ts` | Parser implementation |
| `xarf/generator.py` | `src/generator.ts` | Generator implementation |
| `xarf/exceptions.py` | `src/exceptions.ts` | Error classes |
| `tests/test_parser.py` | `test/unit/parser.test.ts` | Parser tests |
| `tests/test_generator.py` | `test/unit/generator.test.ts` | Generator tests |
| `tests/test_validation.py` | `test/unit/validator.test.ts` | Validation tests |
| `tests/test_security.py` | `test/unit/security.test.ts` | Security tests |
| `.pre-commit-config.yaml` | `.husky/pre-commit` | Git hooks |
| `pyproject.toml` | `package.json` | Project config |

---

## 12. Implementation Phases

### Phase 1: Core Foundation (Week 1-2)
- [x] Define TypeScript types (`types.ts`)
- [x] Implement data models (`models.ts`)
- [x] Create custom exceptions (`exceptions.ts`)
- [x] Set up build tooling (tsup, TypeScript)

### Phase 2: Parser & Validator (Week 3-4)
- [ ] Implement `XARFParser` class
- [ ] Category-specific validation
- [ ] Unit tests for parser
- [ ] Error handling and strict mode

### Phase 3: Generator (Week 5-6)
- [ ] Implement `XARFGenerator` class
- [ ] Evidence handling with hashing
- [ ] Sample report generation
- [ ] Unit tests for generator

### Phase 4: Quality & Testing (Week 7-8)
- [ ] Achieve 90%+ test coverage
- [ ] Set up ESLint, Prettier
- [ ] Configure GitHub Actions CI/CD
- [ ] Security scanning

### Phase 5: Documentation & Release (Week 9-10)
- [ ] Complete API documentation
- [ ] Usage examples
- [ ] Migration guide
- [ ] Alpha release to npm

---

## 13. Success Criteria

### Functional Requirements
- ✅ Parse XARF v4 JSON reports
- ✅ Validate report structure and fields
- ✅ Generate compliant XARF reports
- ✅ Support messaging, connection, content categories (alpha)
- ✅ Handle evidence with hashing
- ✅ Use `category` field (not `class`)

### Non-Functional Requirements
- ✅ 90%+ test coverage
- ✅ TypeScript strict mode
- ✅ Zero runtime dependencies
- ✅ ES2020+ target
- ✅ Node 14+ compatibility
- ✅ <100KB bundle size (minified)

### Quality Requirements
- ✅ ESLint passes with no errors
- ✅ Prettier formatting enforced
- ✅ Type checking passes
- ✅ All tests pass on CI
- ✅ Security scan clean

---

## 14. Risk Analysis

| Risk | Impact | Mitigation |
|------|--------|-----------|
| **Breaking changes from Python** | Medium | Regular sync with Python repo |
| **TypeScript overhead** | Low | Use strict mode from start |
| **Bundle size** | Low | Zero dependencies, tree-shaking |
| **Browser compatibility** | Medium | Focus on Node first, browsers later |
| **Type definition complexity** | Medium | Leverage Python models as reference |

---

## 15. Future Enhancements (Post-Alpha)

### Beta Features
- [ ] All 7 XARF categories
- [ ] XARF v3 compatibility layer
- [ ] CLI tool for validation/generation
- [ ] Advanced validation rules

### v1.0 Features
- [ ] Browser support (UMD build)
- [ ] Evidence compression
- [ ] Bulk processing utilities
- [ ] Performance optimizations

### Future Considerations
- [ ] Deno support
- [ ] Report signing/encryption
- [ ] SIEM integration adapters
- [ ] Multi-format export (XML, CSV)

---

## 16. Performance Targets

- **Parse Speed**: >10,000 reports/second (small reports)
- **Memory**: <50MB for 1,000 cached reports
- **Bundle Size**: <100KB minified (ESM)
- **Type Safety**: 100% type coverage
- **Cold Start**: <50ms initialization

---

## 17. Monitoring & Metrics

### CI/CD Metrics
- Build time
- Test execution time
- Coverage percentage
- Bundle size over time

### Runtime Metrics (Future)
- Parse success/failure rates
- Validation error types
- Performance metrics (p50, p95, p99)
- Memory usage patterns

---

## Summary

This architecture provides a complete, production-ready TypeScript implementation of XARF v4 that:

1. ✅ **Matches Python structure**: Direct mapping from `xarf-python` implementation
2. ✅ **TypeScript strict mode**: Full type safety and compile-time checking
3. ✅ **ES2020+ target**: Modern JavaScript features with broad Node compatibility
4. ✅ **Quality pipeline**: ESLint, Prettier, Jest matching Python's Black, Flake8, pytest
5. ✅ **90%+ coverage**: Matching Python's test coverage requirements
6. ✅ **Field alignment**: Uses `category` field per XARF v4 spec
7. ✅ **Focused scope**: Parser, Validator, Generator only (NO converter)
8. ✅ **Zero dependencies**: Minimal attack surface, smaller bundle
9. ✅ **Semantic versioning**: Alpha → Beta → Stable release path
10. ✅ **Node 14+ support**: LTS compatibility

### Key Differentiators from Python

| Aspect | Python | TypeScript |
|--------|--------|-----------|
| Type System | Runtime (Pydantic) | Compile-time (TypeScript) |
| Dependencies | jsonschema, pydantic, etc. | Zero runtime dependencies |
| Testing | pytest | Jest |
| Formatting | Black | Prettier |
| Linting | Flake8, pylint | ESLint |
| Type Checking | mypy | tsc (built-in) |

---

**Next Steps**:
1. Create GitHub repository
2. Initialize TypeScript project
3. Implement core types and models
4. Set up quality pipeline
5. Begin parser implementation

**Reference Python Implementation**: `/Users/tknecht/Projects/xarf/xarf-python`
