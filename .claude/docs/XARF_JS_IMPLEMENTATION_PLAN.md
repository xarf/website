# XARF JavaScript Implementation Plan

## Overview

Implementation plan for building the **xarf** npm package based on the Python reference implementation at `/Users/tknecht/Projects/xarf/xarf-python`.

---

## Quick Start Checklist

### Phase 0: Setup (Week 1)

- [ ] Create GitHub repository: `xarf-javascript`
- [ ] Initialize npm project: `npm init`
- [ ] Install dev dependencies:
  ```bash
  npm install -D typescript@^5.2.0 \
    @types/node@^20.0.0 \
    jest@^29.7.0 \
    ts-jest@^29.1.0 \
    @types/jest@^29.5.0 \
    eslint@^8.50.0 \
    @typescript-eslint/parser@^6.0.0 \
    @typescript-eslint/eslint-plugin@^6.0.0 \
    prettier@^3.0.0 \
    eslint-config-prettier@^9.0.0 \
    tsup@^8.0.0 \
    husky@^8.0.0
  ```
- [ ] Configure TypeScript: `tsconfig.json`
- [ ] Configure Jest: `jest.config.ts`
- [ ] Configure ESLint: `.eslintrc.js`
- [ ] Configure Prettier: `.prettierrc.js`
- [ ] Set up Git hooks: `npx husky install`
- [ ] Create directory structure (see below)

---

## Directory Structure to Create

```bash
mkdir -p src/{utils} test/{unit,integration,fixtures/{valid-reports,invalid-reports}} docs/examples .github/workflows .husky
```

---

## Phase 1: Core Types & Models (Week 2)

### Task 1.1: Create Type Definitions (`src/types.ts`)

**Reference**: Python `xarf/models.py` lines 1-149

```typescript
// Define core types based on Python Pydantic models:
// - XARFVersion = '4.0.0'
// - ReporterType = 'automated' | 'manual' | 'hybrid'
// - XARFCategory (8 categories)
// - EvidenceSource (8 sources)
// - XARFReporter interface
// - XARFEvidence interface
// - XARFReportBase interface
// - Category-specific report interfaces (Messaging, Connection, Content)
```

**Checklist**:
- [ ] Define all type literals (XARFVersion, ReporterType, etc.)
- [ ] Create `XARFReporter` interface
- [ ] Create `XARFEvidence` interface
- [ ] Create `XARFReportBase` interface
- [ ] Create `MessagingReport` interface
- [ ] Create `ConnectionReport` interface
- [ ] Create `ContentReport` interface
- [ ] Create union type `XARFReport`
- [ ] Add JSDoc comments for all types

### Task 1.2: Create Custom Exceptions (`src/exceptions.ts`)

**Reference**: Python `xarf/exceptions.py`

```typescript
// Create error classes:
// - XARFError (base)
// - XARFValidationError (with errors array)
// - XARFParseError
// - XARFSchemaError
```

**Checklist**:
- [ ] Create `XARFError` base class
- [ ] Create `XARFValidationError` with errors property
- [ ] Create `XARFParseError` class
- [ ] Create `XARFSchemaError` class
- [ ] Ensure proper prototype chain

### Task 1.3: Create Data Models (`src/models.ts`)

**Reference**: Python `xarf/models.py`

**Checklist**:
- [ ] Create `XARFReportModel` base class
- [ ] Add `toJSON()` method
- [ ] Add `toObject()` method
- [ ] Add `validate()` method
- [ ] Create `MessagingReportModel` extending base
- [ ] Create `ConnectionReportModel` extending base
- [ ] Create `ContentReportModel` extending base
- [ ] Create `createReportModel()` factory function
- [ ] Add comprehensive JSDoc comments

---

## Phase 2: Utility Functions (Week 3)

### Task 2.1: Date Utilities (`src/utils/date-utils.ts`)

**Reference**: Python `xarf/generator.py` lines 149-164

**Checklist**:
- [ ] `generateTimestamp()`: Return ISO 8601 with UTC
- [ ] `isValidTimestamp()`: Validate ISO 8601 format
- [ ] `parseTimestamp()`: Parse to Date object
- [ ] Add unit tests for all functions
- [ ] Test edge cases (invalid dates, malformed strings)

### Task 2.2: Hash Utilities (`src/utils/hash-utils.ts`)

**Reference**: Python `xarf/generator.py` lines 166-198

**Checklist**:
- [ ] `generateHash()`: Support SHA-256, SHA-512, SHA-1, MD5
- [ ] `generateUUID()`: Use `crypto.randomUUID()`
- [ ] Handle both string and Buffer inputs
- [ ] Add unit tests for all algorithms
- [ ] Test hash consistency

### Task 2.3: Validation Utilities (`src/utils/validation-utils.ts`)

**Checklist**:
- [ ] `validateEmail()`: Email format validation
- [ ] `validateIP()`: IPv4/IPv6 validation
- [ ] `validateURL()`: URL format validation
- [ ] `sanitizeString()`: Remove dangerous characters
- [ ] Add unit tests for all validators

---

## Phase 3: Parser Implementation (Weeks 4-5)

### Task 3.1: Core Parser (`src/parser.ts`)

**Reference**: Python `xarf/parser.py`

**Implementation Order**:

1. **Constructor & Properties**
   ```typescript
   class XARFParser {
     private readonly strict: boolean;
     private errors: ValidationError[] = [];
     private readonly supportedCategories = new Set(['messaging', 'connection', 'content']);
   }
   ```

2. **Main Parse Method**
   ```typescript
   parse(input: string | Record<string, unknown>): XARFReportModel {
     // 1. Clear errors
     // 2. Parse JSON if string
     // 3. Validate structure
     // 4. Check category support
     // 5. Create report model
   }
   ```

3. **Validation Method**
   ```typescript
   validate(input: string | Record<string, unknown>): boolean {
     // 1. Parse JSON
     // 2. Validate structure
     // 3. Return boolean
   }
   ```

4. **Structure Validation**
   ```typescript
   private validateStructure(data: Record<string, unknown>): boolean {
     // Check required fields
     // Validate xarf_version
     // Validate reporter structure
     // Validate timestamp format
     // Category-specific validation
   }
   ```

5. **Category Validators**
   ```typescript
   private validateMessaging(data, type): boolean
   private validateConnection(data, type): boolean
   private validateContent(data, type): boolean
   ```

**Checklist**:
- [ ] Implement constructor with options
- [ ] Implement `parse()` method
- [ ] Implement `validate()` method
- [ ] Implement `getErrors()` method
- [ ] Implement `validateStructure()` private method
- [ ] Implement `validateCategorySpecific()` private method
- [ ] Implement `validateMessaging()` private method
- [ ] Implement `validateConnection()` private method
- [ ] Implement `validateContent()` private method
- [ ] Add error collection in non-strict mode
- [ ] Throw exceptions in strict mode
- [ ] Add comprehensive JSDoc comments

### Task 3.2: Parser Tests (`test/unit/parser.test.ts`)

**Reference**: Python `tests/test_parser.py`

**Test Cases**:
- [ ] Parse valid messaging report
- [ ] Parse valid connection report
- [ ] Parse valid content report
- [ ] Parse from JSON string
- [ ] Parse from object
- [ ] Validation errors (non-strict)
- [ ] Strict mode raises exceptions
- [ ] Invalid JSON handling
- [ ] Unsupported category (alpha)
- [ ] Missing required fields
- [ ] Invalid reporter type
- [ ] Invalid timestamp format
- [ ] Category-specific validation failures

---

## Phase 4: Generator Implementation (Weeks 6-7)

### Task 4.1: Core Generator (`src/generator.ts`)

**Reference**: Python `xarf/generator.py`

**Implementation Order**:

1. **Constants & Configuration**
   ```typescript
   class XARFGenerator {
     private static readonly XARF_VERSION = '4.0.0';
     private static readonly VALID_CATEGORIES = new Set([...]);
     private static readonly EVENT_TYPES: Record<string, string[]> = {...};
     private static readonly VALID_EVIDENCE_SOURCES = new Set([...]);
   }
   ```

2. **Generate Report Method**
   ```typescript
   generateReport(params: {
     category: XARFCategory;
     type: string;
     source_identifier: string;
     reporter_contact: string;
     // ... other params
   }): XARFReport {
     // 1. Validate required parameters
     // 2. Validate category & type
     // 3. Build base report
     // 4. Add optional fields
     // 5. Add category-specific fields
     // 6. Return report
   }
   ```

3. **Add Evidence Method**
   ```typescript
   addEvidence(
     content_type: string,
     description: string,
     payload: string | Buffer,
     hash_algorithm: 'sha256' | 'sha512' = 'sha256'
   ): XARFEvidence {
     // 1. Convert payload to string/buffer
     // 2. Generate hash
     // 3. Return evidence object
   }
   ```

4. **Generate Sample Report**
   ```typescript
   generateSampleReport(
     category: XARFCategory,
     type: string,
     includeEvidence = true
   ): XARFReport {
     // Generate randomized test report
   }
   ```

**Checklist**:
- [ ] Define all constants (categories, types, sources)
- [ ] Implement `generateReport()` method
- [ ] Implement `addEvidence()` method with hashing
- [ ] Implement `generateSampleReport()` method
- [ ] Validate all input parameters
- [ ] Add UUID generation
- [ ] Add timestamp generation
- [ ] Support `on_behalf_of` field
- [ ] Add comprehensive JSDoc comments

### Task 4.2: Generator Tests (`test/unit/generator.test.ts`)

**Reference**: Python `tests/test_generator.py`

**Test Cases**:
- [ ] Generate messaging report
- [ ] Generate connection report
- [ ] Generate content report
- [ ] Add evidence with SHA-256
- [ ] Add evidence with SHA-512
- [ ] Generate sample report
- [ ] Validate generated report structure
- [ ] Invalid category throws error
- [ ] Invalid type for category throws error
- [ ] Missing required fields throws error
- [ ] on_behalf_of support
- [ ] Auto-generate UUID
- [ ] Auto-generate timestamp

---

## Phase 5: Testing & Quality (Week 8)

### Task 5.1: Security Tests (`test/unit/security.test.ts`)

**Reference**: Python `tests/test_security.py`

**Test Cases**:
- [ ] Input validation (SQL injection patterns)
- [ ] XSS pattern detection
- [ ] Path traversal attempts
- [ ] Evidence size limits
- [ ] Hash verification
- [ ] Invalid JSON handling
- [ ] Buffer overflow prevention
- [ ] Malformed timestamps
- [ ] Invalid email formats

### Task 5.2: Integration Tests (`test/integration/end-to-end.test.ts`)

**Test Cases**:
- [ ] Full workflow: generate → parse → validate
- [ ] Parse real-world reports
- [ ] Generate all supported categories
- [ ] Error handling scenarios
- [ ] Strict mode vs non-strict mode
- [ ] Evidence handling

### Task 5.3: Test Fixtures

**Checklist**:
- [ ] Create valid messaging reports
- [ ] Create valid connection reports
- [ ] Create valid content reports
- [ ] Create invalid reports (missing fields)
- [ ] Create invalid reports (wrong types)
- [ ] Create malformed JSON samples

### Task 5.4: Coverage Requirements

**Target**: 90%+ coverage across all metrics

**Run**:
```bash
npm run test:coverage
```

**Check**:
- [ ] Line coverage ≥ 90%
- [ ] Branch coverage ≥ 90%
- [ ] Function coverage ≥ 90%
- [ ] Statement coverage ≥ 90%

---

## Phase 6: Quality Pipeline (Week 9)

### Task 6.1: ESLint Configuration

**File**: `.eslintrc.js`

**Checklist**:
- [ ] Configure TypeScript parser
- [ ] Enable recommended rules
- [ ] Enable type-aware rules
- [ ] Add custom rules for project
- [ ] Configure Jest environment
- [ ] Set up import ordering
- [ ] Run: `npm run lint`
- [ ] Fix all errors: `npm run lint:fix`

### Task 6.2: Prettier Configuration

**File**: `.prettierrc.js`

**Checklist**:
- [ ] Set line width (100)
- [ ] Configure tab width (2)
- [ ] Enable semicolons
- [ ] Set single quotes
- [ ] Run: `npm run format`
- [ ] Check: `npm run format:check`

### Task 6.3: TypeScript Strict Mode

**File**: `tsconfig.json`

**Checklist**:
- [ ] Enable `strict: true`
- [ ] Enable `noUnusedLocals`
- [ ] Enable `noUnusedParameters`
- [ ] Enable `noImplicitReturns`
- [ ] Enable `noFallthroughCasesInSwitch`
- [ ] Run: `npm run typecheck`
- [ ] Fix all type errors

### Task 6.4: Git Hooks (Husky)

**File**: `.husky/pre-commit`

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run quality
npm test
```

**Checklist**:
- [ ] Install husky: `npx husky install`
- [ ] Add pre-commit hook
- [ ] Test hook triggers on commit
- [ ] Ensure all checks pass

---

## Phase 7: CI/CD Setup (Week 10)

### Task 7.1: GitHub Actions - CI Workflow

**File**: `.github/workflows/ci.yml`

**Jobs**:
1. **Test Matrix**
   - Node versions: 14, 16, 18, 20
   - OS: Ubuntu, macOS, Windows
   - Steps: install, build, test

2. **Quality Checks**
   - ESLint
   - Prettier
   - TypeScript type checking

**Checklist**:
- [ ] Create CI workflow file
- [ ] Test on multiple Node versions
- [ ] Test on multiple OS platforms
- [ ] Upload coverage to Codecov
- [ ] Cache npm dependencies
- [ ] Set up status badges

### Task 7.2: GitHub Actions - Quality Workflow

**File**: `.github/workflows/quality.yml`

**Checklist**:
- [ ] Run ESLint with no errors
- [ ] Check Prettier formatting
- [ ] Run TypeScript compiler
- [ ] Check test coverage threshold
- [ ] Report results

### Task 7.3: GitHub Actions - Publish Workflow

**File**: `.github/workflows/publish.yml`

**Triggers**: On release tag

**Checklist**:
- [ ] Build project
- [ ] Run all tests
- [ ] Publish to npm (alpha/beta/stable)
- [ ] Create GitHub release notes

---

## Phase 8: Documentation (Week 11)

### Task 8.1: API Documentation (`docs/API.md`)

**Sections**:
- [ ] Installation instructions
- [ ] Quick start guide
- [ ] XARFParser API reference
- [ ] XARFGenerator API reference
- [ ] Type definitions reference
- [ ] Error handling guide
- [ ] Examples for each category

### Task 8.2: README.md

**Sections**:
- [ ] Project overview
- [ ] Features list
- [ ] Installation
- [ ] Quick start examples
- [ ] Supported categories
- [ ] Testing information
- [ ] Contributing guidelines
- [ ] License information

### Task 8.3: Migration Guide (`docs/MIGRATION.md`)

**Sections**:
- [ ] XARF v3 → v4 changes
- [ ] Python → JavaScript differences
- [ ] Breaking changes
- [ ] Code examples

### Task 8.4: Examples (`docs/examples/`)

**Create examples**:
- [ ] `parsing.md`: Parse examples
- [ ] `generating.md`: Generate examples
- [ ] `validation.md`: Validation examples
- [ ] `error-handling.md`: Error handling patterns

---

## Phase 9: Alpha Release (Week 12)

### Task 9.1: Pre-release Checklist

**Quality Gates**:
- [ ] All tests passing (100%)
- [ ] Coverage ≥ 90%
- [ ] ESLint: 0 errors
- [ ] Prettier: formatted
- [ ] TypeScript: no errors
- [ ] Security scan: clean
- [ ] Documentation complete

### Task 9.2: Package Preparation

**Checklist**:
- [ ] Update version to `4.0.0-alpha.1`
- [ ] Build: `npm run build`
- [ ] Test built package locally
- [ ] Verify exports (CJS + ESM)
- [ ] Check bundle size (<100KB)
- [ ] Update CHANGELOG.md

### Task 9.3: NPM Publishing

**Steps**:
```bash
npm login
npm run prepublishOnly
npm publish --tag alpha
```

**Verify**:
- [ ] Package visible on npmjs.com
- [ ] Can install: `npm install xarf@alpha`
- [ ] Types work in TypeScript projects
- [ ] All exports accessible

---

## Python-to-TypeScript Conversion Reference

### Type Conversions

| Python | TypeScript |
|--------|-----------|
| `str` | `string` |
| `int` | `number` |
| `float` | `number` |
| `bool` | `boolean` |
| `Dict[str, Any]` | `Record<string, unknown>` |
| `List[str]` | `string[]` |
| `Optional[str]` | `string \| undefined` |
| `Union[str, int]` | `string \| number` |
| `Literal["a", "b"]` | `'a' \| 'b'` |

### Class Conversions

| Python Pattern | TypeScript Pattern |
|---------------|-------------------|
| `class XARFParser:` | `class XARFParser {` |
| `def __init__(self, strict=False):` | `constructor(options: ParserOptions = {})` |
| `def parse(self, data):` | `parse(data: string): XARFReport` |
| `@validator` decorator | Custom validation in methods |
| `BaseModel` (Pydantic) | Custom class with validation |

---

## Success Metrics

### Functional
- [x] Parses all XARF v4 reports
- [x] Validates structure and fields
- [x] Generates compliant reports
- [x] Supports 3 categories (alpha)
- [x] Uses `category` field (not `class`)

### Quality
- [ ] 90%+ test coverage achieved
- [ ] TypeScript strict mode enabled
- [ ] Zero ESLint errors
- [ ] Prettier formatted
- [ ] All tests passing on CI

### Performance
- [ ] Bundle size <100KB
- [ ] Parse >10,000 reports/second
- [ ] Memory <50MB for 1,000 reports
- [ ] Cold start <50ms

---

## Common Pitfalls & Solutions

### 1. TypeScript Type Errors

**Problem**: Strict mode causes many type errors
**Solution**: Start with base types, add generics later

### 2. Test Coverage

**Problem**: Hard to reach 90% coverage
**Solution**: Focus on error paths, edge cases

### 3. Build Configuration

**Problem**: ESM vs CJS export issues
**Solution**: Use `tsup` with both formats

### 4. Git Hooks Failing

**Problem**: Pre-commit hook takes too long
**Solution**: Run only fast checks, full tests on CI

---

## Resources

### Documentation
- XARF v4 Spec: https://xarf.org/docs/specification/
- TypeScript Handbook: https://www.typescriptlang.org/docs/
- Jest Documentation: https://jestjs.io/docs/getting-started

### Reference Implementation
- Python XARF Parser: `/Users/tknecht/Projects/xarf/xarf-python`
- Study files: `parser.py`, `generator.py`, `models.py`

### Tools
- tsup: https://tsup.egoist.dev/
- ESLint: https://eslint.org/
- Prettier: https://prettier.io/
- Husky: https://typicode.github.io/husky/

---

## Next Steps

1. **Start Implementation**: Create repository and initialize project
2. **Follow Phases**: Work through phases 1-9 in order
3. **Test Continuously**: Write tests alongside implementation
4. **Document As You Go**: Add JSDoc comments to all public APIs
5. **Review Python Code**: Reference Python implementation for logic
6. **Alpha Release**: Publish to npm with `--tag alpha`

---

## Support & Contact

- **XARF Project**: contact@xarf.org
- **Repository Issues**: GitHub Issues
- **Documentation**: https://xarf.org

---

**Created**: 2025-11-20
**Version**: 1.0
**Status**: Ready for Implementation
