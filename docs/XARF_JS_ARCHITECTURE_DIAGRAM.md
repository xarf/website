# XARF JavaScript Library - Architecture Diagrams

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         XARF JavaScript Library                      │
│                            (npm: xarf)                               │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                          Public API Layer                            │
├─────────────────────────────────────────────────────────────────────┤
│  • parseXARF()          • validateXARF()      • generateXARF()      │
│  • XARFParser           • XARFGenerator       • XARFReportModel     │
│  • XARFError            • XARFValidationError • XARFParseError      │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         Core Components                              │
├──────────────────┬──────────────────┬──────────────────────────────┤
│   Parser         │   Validator      │   Generator                  │
│   (parser.ts)    │   (validator.ts) │   (generator.ts)             │
│                  │                  │                              │
│  • parse()       │  • validate()    │  • generateReport()          │
│  • validate()    │  • validate*()   │  • addEvidence()             │
│  • getErrors()   │  • checkRules()  │  • generateSample()          │
└──────────────────┴──────────────────┴──────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         Data Models Layer                            │
├──────────────────┬──────────────────┬──────────────────────────────┤
│  XARFReportModel │ MessagingReport  │ ConnectionReport             │
│                  │ ContentReport    │ (Future: 4+ more)            │
└──────────────────┴──────────────────┴──────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       Type Definitions Layer                         │
├──────────────────┬──────────────────┬──────────────────────────────┤
│  XARFReport      │  XARFReporter    │  XARFEvidence                │
│  XARFCategory    │  ReporterType    │  EvidenceSource              │
│  ValidationError │  ParserOptions   │  GeneratorOptions            │
└──────────────────┴──────────────────┴──────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         Utility Functions                            │
├──────────────────┬──────────────────┬──────────────────────────────┤
│  Date Utils      │  Hash Utils      │  Validation Utils            │
│  • generateTime  │  • generateHash  │  • validateField()           │
│  • parseISO8601  │  • generateUUID  │  • sanitizeInput()           │
└──────────────────┴──────────────────┴──────────────────────────────┘
```

---

## Component Interaction Diagram

```
┌──────────────┐
│   Client     │
│  Application │
└──────┬───────┘
       │
       │ import { XARFParser, XARFGenerator }
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│                     XARF Library Entry Point                  │
│                         (src/index.ts)                        │
└──────────────────────────────────────────────────────────────┘
       │
       ├─────► Parse XARF Report
       │       ┌───────────────────────────────────────┐
       │       │  1. XARFParser.parse()                │
       │       │     ├─► Validate JSON syntax          │
       │       │     ├─► Validate structure            │
       │       │     ├─► Category-specific validation  │
       │       │     └─► Return XARFReportModel        │
       │       └───────────────────────────────────────┘
       │
       ├─────► Validate Report
       │       ┌───────────────────────────────────────┐
       │       │  2. XARFParser.validate()             │
       │       │     ├─► Check required fields         │
       │       │     ├─► Validate field types          │
       │       │     ├─► Category rules                │
       │       │     └─► Return boolean + errors       │
       │       └───────────────────────────────────────┘
       │
       └─────► Generate Report
               ┌───────────────────────────────────────┐
               │  3. XARFGenerator.generateReport()    │
               │     ├─► Validate input parameters     │
               │     ├─► Auto-generate ID & timestamp  │
               │     ├─► Build report structure        │
               │     ├─► Add category-specific fields  │
               │     └─► Return XARFReport object      │
               └───────────────────────────────────────┘
```

---

## Data Flow: Parsing a XARF Report

```
┌─────────────┐
│   JSON      │
│   String    │
└──────┬──────┘
       │
       │ Input
       ▼
┌─────────────────────────────────┐
│  XARFParser.parse()             │
│  ┌───────────────────────────┐  │
│  │ 1. Parse JSON             │  │
│  │    ├─► JSON.parse()       │  │
│  │    └─► Catch SyntaxError  │  │
│  └───────────────────────────┘  │
│                                  │
│  ┌───────────────────────────┐  │
│  │ 2. Validate Structure     │  │
│  │    ├─► Check xarf_version │  │
│  │    ├─► Check required     │  │
│  │    │    fields             │  │
│  │    ├─► Validate reporter  │  │
│  │    └─► Validate timestamp │  │
│  └───────────────────────────┘  │
│                                  │
│  ┌───────────────────────────┐  │
│  │ 3. Category Validation    │  │
│  │    ├─► Check category     │  │
│  │    ├─► Validate type      │  │
│  │    └─► Check required     │  │
│  │        category fields    │  │
│  └───────────────────────────┘  │
│                                  │
│  ┌───────────────────────────┐  │
│  │ 4. Create Model           │  │
│  │    ├─► createReportModel()│  │
│  │    └─► Return appropriate │  │
│  │        category model     │  │
│  └───────────────────────────┘  │
└──────────────┬──────────────────┘
               │
               ▼
       ┌───────────────────┐
       │  XARFReportModel  │
       │  ├─► toJSON()     │
       │  ├─► toObject()   │
       │  └─► validate()   │
       └───────────────────┘
```

---

## Class Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                      XARFReportModel                         │
│  (Base class for all report types)                          │
│                                                              │
│  Properties:                                                 │
│  • xarf_version: '4.0.0'                                    │
│  • report_id: string                                        │
│  • timestamp: string                                        │
│  • reporter: XARFReporter                                   │
│  • category: XARFCategory                                   │
│  • type: string                                             │
│  • evidence_source: EvidenceSource                          │
│                                                              │
│  Methods:                                                    │
│  • toJSON(): string                                         │
│  • toObject(): XARFReport                                   │
│  • validate(): boolean                                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ extends
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│  Messaging    │    │  Connection   │    │   Content     │
│  ReportModel  │    │  ReportModel  │    │  ReportModel  │
├───────────────┤    ├───────────────┤    ├───────────────┤
│ + protocol    │    │ + dest_ip     │    │ + url         │
│ + smtp_from   │    │ + protocol    │    │ + content_type│
│ + smtp_to     │    │ + dest_port   │    │ + attack_type │
│ + subject     │    │ + attack_type │    │ + affected_   │
│ + message_id  │    │ + packet_count│    │   pages       │
└───────────────┘    └───────────────┘    └───────────────┘
```

---

## Quality Pipeline Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Developer Workflow                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ git commit
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Pre-commit Hooks (Husky)                 │
├─────────────────────────────────────────────────────────────┤
│  1. Format Check (Prettier)                                 │
│     └─► prettier --check "src/**/*.ts"                      │
│  2. Lint (ESLint)                                           │
│     └─► eslint src test --ext .ts                           │
│  3. Type Check (TypeScript)                                 │
│     └─► tsc --noEmit                                        │
│  4. Run Tests (Jest)                                        │
│     └─► jest --coverage                                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ push to GitHub
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    GitHub Actions CI/CD                      │
├─────────────────────────────────────────────────────────────┤
│  Job 1: Test Matrix                                         │
│  ├─► Node 14, 16, 18, 20                                    │
│  ├─► Ubuntu, macOS, Windows                                 │
│  └─► Coverage Report (90%+ required)                        │
│                                                              │
│  Job 2: Quality Checks                                      │
│  ├─► ESLint (no errors)                                     │
│  ├─► Prettier (formatting)                                  │
│  ├─► TypeScript (strict mode)                               │
│  └─► Security Scan                                          │
│                                                              │
│  Job 3: Build & Publish (on release)                        │
│  ├─► npm run build                                          │
│  ├─► Generate type definitions                              │
│  └─► Publish to npm (alpha/beta/stable)                     │
└─────────────────────────────────────────────────────────────┘
```

---

## File Organization Chart

```
xarf/
│
├── src/                          # Source code
│   ├── index.ts                  # Main entry point
│   ├── types.ts                  # TypeScript type definitions
│   ├── models.ts                 # Data models
│   ├── parser.ts                 # Parser implementation
│   ├── validator.ts              # Validation logic
│   ├── generator.ts              # Report generator
│   ├── exceptions.ts             # Custom error classes
│   └── utils/                    # Utility functions
│       ├── date-utils.ts
│       ├── hash-utils.ts
│       └── validation-utils.ts
│
├── test/                         # Test suite
│   ├── unit/                     # Unit tests
│   │   ├── parser.test.ts
│   │   ├── validator.test.ts
│   │   ├── generator.test.ts
│   │   ├── models.test.ts
│   │   └── security.test.ts
│   ├── integration/              # Integration tests
│   │   ├── end-to-end.test.ts
│   │   └── real-world.test.ts
│   └── fixtures/                 # Test data
│       ├── valid-reports/
│       └── invalid-reports/
│
├── docs/                         # Documentation
│   ├── API.md
│   ├── MIGRATION.md
│   └── examples/
│
├── .github/                      # GitHub configuration
│   └── workflows/
│       ├── ci.yml                # CI pipeline
│       ├── quality.yml           # Quality checks
│       └── publish.yml           # NPM publish
│
├── .husky/                       # Git hooks
│   └── pre-commit
│
├── dist/                         # Build output (generated)
│   ├── index.js                  # CommonJS bundle
│   ├── index.mjs                 # ESM bundle
│   └── index.d.ts                # Type definitions
│
├── package.json                  # NPM package config
├── tsconfig.json                 # TypeScript config
├── jest.config.ts                # Jest config
├── .eslintrc.js                  # ESLint config
├── .prettierrc.js                # Prettier config
├── README.md                     # Documentation
└── CHANGELOG.md                  # Version history
```

---

## Technology Stack Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Production Stack                      │
├─────────────────────────────────────────────────────────────┤
│  Runtime:        Node.js 14+                                │
│  Language:       TypeScript 5.2+                            │
│  Module Format:  CommonJS + ESM                             │
│  Target:         ES2020                                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                       Development Stack                      │
├─────────────────────────────────────────────────────────────┤
│  Build:          tsup (esbuild-based)                       │
│  Testing:        Jest + ts-jest                             │
│  Linting:        ESLint + TypeScript plugin                 │
│  Formatting:     Prettier                                   │
│  Type Checking:  TypeScript Compiler (tsc)                  │
│  Git Hooks:      Husky                                      │
│  Coverage:       Jest --coverage                            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                          CI/CD Stack                         │
├─────────────────────────────────────────────────────────────┤
│  Platform:       GitHub Actions                             │
│  Testing:        Multi-OS, Multi-Node matrix                │
│  Security:       npm audit + ESLint security rules          │
│  Publishing:     npm registry (public)                      │
│  Monitoring:     Codecov (coverage tracking)                │
└─────────────────────────────────────────────────────────────┘
```

---

## Python to TypeScript Mapping

```
┌─────────────────────────────────────────────────────────────┐
│              Python (xarf-python)                            │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Architecture Translation
                              ▼
┌─────────────────────────────────────────────────────────────┐
│             TypeScript (xarf)                                │
└─────────────────────────────────────────────────────────────┘

Python                          TypeScript
──────────────────────────────────────────────────────────────
xarf/__init__.py        →       src/index.ts
xarf/models.py          →       src/models.ts
xarf/parser.py          →       src/parser.ts
xarf/generator.py       →       src/generator.ts
xarf/exceptions.py      →       src/exceptions.ts

Pydantic BaseModel      →       TypeScript Classes
Python Type Hints       →       TypeScript Types/Interfaces
Union[str, Dict]        →       string | Record<string, unknown>

pytest                  →       Jest
black                   →       Prettier
flake8/pylint          →       ESLint
mypy                    →       TypeScript Compiler (tsc)
pre-commit              →       Husky

pyproject.toml          →       package.json
setup.py                →       tsconfig.json + tsup config
```

---

## Release Timeline

```
┌─────────────────────────────────────────────────────────────┐
│                      Release Roadmap                         │
└─────────────────────────────────────────────────────────────┘

Phase 1: Alpha Development (Weeks 1-10)
├─► v4.0.0-alpha.1  │ Core parser, validator, generator
├─► v4.0.0-alpha.2  │ messaging, connection, content categories
└─► v4.0.0-alpha.3  │ Evidence handling, performance improvements

Phase 2: Beta Development (Weeks 11-16)
├─► v4.0.0-beta.1   │ All 7 categories support
├─► v4.0.0-beta.2   │ Advanced validation rules
└─► v4.0.0-beta.3   │ Full documentation + examples

Phase 3: Stable Release (Week 17+)
└─► v4.0.0          │ Production-ready, 90%+ coverage
    └─► v4.0.x      │ Bug fixes and minor improvements
        └─► v4.1.0  │ New features (CLI, browser support)
```

---

## Performance Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Performance Targets                      │
├─────────────────────────────────────────────────────────────┤
│  Parse Speed:      >10,000 reports/second                   │
│  Memory Usage:     <50MB for 1,000 reports                  │
│  Bundle Size:      <100KB (minified ESM)                    │
│  Cold Start:       <50ms initialization                     │
│  Type Coverage:    100%                                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   Optimization Strategies                    │
├─────────────────────────────────────────────────────────────┤
│  1. Zero Dependencies    │ Minimize bundle size             │
│  2. Tree Shaking         │ Remove unused code               │
│  3. Type Guards          │ Optimize validation checks       │
│  4. Object Pooling       │ Reuse model instances            │
│  5. Lazy Loading         │ Load category models on demand   │
└─────────────────────────────────────────────────────────────┘
```

---

## Security Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Security Layers                         │
├─────────────────────────────────────────────────────────────┤
│  Layer 1: Input Validation                                  │
│  ├─► JSON syntax validation                                 │
│  ├─► Schema validation                                      │
│  ├─► Type checking                                          │
│  └─► Size limits (evidence, payload)                        │
│                                                              │
│  Layer 2: Sanitization                                      │
│  ├─► Escape special characters                              │
│  ├─► Remove malicious patterns                              │
│  └─► Normalize inputs                                       │
│                                                              │
│  Layer 3: Evidence Verification                             │
│  ├─► Hash verification (SHA-256/512)                        │
│  ├─► Size validation                                        │
│  └─► Content-type validation                                │
│                                                              │
│  Layer 4: Dependency Security                               │
│  ├─► Zero runtime dependencies                              │
│  ├─► npm audit in CI                                        │
│  └─► Dependabot alerts                                      │
└─────────────────────────────────────────────────────────────┘
```

---

## Summary

This architecture provides:

✅ **Complete TypeScript implementation** of XARF v4 parser
✅ **Matches Python structure** for consistency
✅ **Type-safe design** with strict mode enabled
✅ **Comprehensive quality pipeline** (ESLint, Prettier, Jest)
✅ **90%+ test coverage** requirement
✅ **Zero runtime dependencies** for security
✅ **Multi-platform support** (Node 14+)
✅ **CI/CD automation** with GitHub Actions
✅ **Clear upgrade path** (alpha → beta → stable)

**Reference**: Python implementation at `/Users/tknecht/Projects/xarf/xarf-python`
