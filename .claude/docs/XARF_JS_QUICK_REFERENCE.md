# XARF JavaScript - Quick Reference Card

**One-page reference for XARF JavaScript library implementation**

---

## 🚀 Quick Setup

```bash
# Create project
mkdir xarf-javascript && cd xarf-javascript
npm init -y

# Install dependencies
npm install -D typescript@^5.2.0 @types/node@^20.0.0 \
  jest@^29.7.0 ts-jest@^29.1.0 @types/jest@^29.5.0 \
  eslint@^8.50.0 @typescript-eslint/parser@^6.0.0 \
  @typescript-eslint/eslint-plugin@^6.0.0 \
  prettier@^3.0.0 eslint-config-prettier@^9.0.0 \
  tsup@^8.0.0 husky@^8.0.0

# Create directories
mkdir -p src/{utils} test/{unit,integration,fixtures} docs .github/workflows
```

---

## 📁 Project Structure

```
xarf/
├── src/
│   ├── index.ts          # Main exports
│   ├── types.ts          # Type definitions
│   ├── models.ts         # Data models
│   ├── parser.ts         # Parser
│   ├── generator.ts      # Generator
│   ├── exceptions.ts     # Errors
│   └── utils/
│       ├── date-utils.ts
│       ├── hash-utils.ts
│       └── validation-utils.ts
├── test/
│   ├── unit/
│   ├── integration/
│   └── fixtures/
└── .github/workflows/
```

---

## 📝 Core Type Definitions

```typescript
// types.ts
export type XARFVersion = '4.0.0';
export type XARFCategory = 'messaging' | 'connection' | 'content' | /* ... */;
export type ReporterType = 'automated' | 'manual' | 'hybrid';

export interface XARFReporter {
  org: string;
  contact: string;
  type: ReporterType;
}

export interface XARFReportBase {
  xarf_version: XARFVersion;
  report_id: string;
  timestamp: string;
  reporter: XARFReporter;
  on_behalf_of?: XARFReporter;
  source_identifier: string;
  category: XARFCategory;  // NOTE: 'category' not 'class'
  type: string;
  evidence_source: string;
  evidence?: XARFEvidence[];
  tags?: string[];
}
```

---

## 🔧 Parser Implementation

```typescript
// parser.ts
export class XARFParser {
  private readonly strict: boolean;
  private errors: ValidationError[] = [];

  constructor(options: ParserOptions = {}) {
    this.strict = options.strict ?? false;
  }

  parse(input: string | Record<string, unknown>): XARFReportModel {
    this.errors = [];

    // 1. Parse JSON
    const data = typeof input === 'string' ? JSON.parse(input) : input;

    // 2. Validate structure
    if (!this.validateStructure(data) && this.strict) {
      throw new XARFValidationError('Validation failed', this.errors);
    }

    // 3. Create model
    return createReportModel(data as XARFReport);
  }

  validate(input: string | Record<string, unknown>): boolean {
    // Validation without parsing
  }

  getErrors(): ValidationError[] {
    return [...this.errors];
  }
}
```

---

## 🏭 Generator Implementation

```typescript
// generator.ts
export class XARFGenerator {
  private static readonly XARF_VERSION = '4.0.0';

  generateReport(params: {
    category: XARFCategory;
    type: string;
    source_identifier: string;
    reporter_contact: string;
    reporter_org?: string;
    // ... other params
  }): XARFReport {
    // 1. Validate inputs
    // 2. Build base report
    // 3. Add optional fields
    // 4. Return report
  }

  addEvidence(
    content_type: string,
    description: string,
    payload: string | Buffer,
    hash_algorithm: 'sha256' | 'sha512' = 'sha256'
  ): XARFEvidence {
    // Generate hash and create evidence object
  }
}
```

---

## 🧪 Testing Template

```typescript
// test/unit/parser.test.ts
import { XARFParser } from '../../src/parser';

describe('XARFParser', () => {
  let parser: XARFParser;

  beforeEach(() => {
    parser = new XARFParser();
  });

  it('should parse valid messaging report', () => {
    const report = parser.parse({
      xarf_version: '4.0.0',
      report_id: 'test-id',
      timestamp: '2024-01-15T10:30:00Z',
      reporter: {
        org: 'Test',
        contact: 'test@example.com',
        type: 'automated'
      },
      source_identifier: '192.0.2.1',
      category: 'messaging',
      type: 'spam',
      evidence_source: 'spamtrap'
    });

    expect(report.category).toBe('messaging');
    expect(report.type).toBe('spam');
  });

  it('should collect validation errors in non-strict mode', () => {
    parser.validate({ invalid: 'data' });
    const errors = parser.getErrors();
    expect(errors.length).toBeGreaterThan(0);
  });
});
```

---

## ⚙️ Configuration Files

### `package.json` (scripts)

```json
{
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts --clean",
    "test": "jest",
    "test:coverage": "jest --coverage",
    "lint": "eslint src test --ext .ts",
    "lint:fix": "eslint src test --ext .ts --fix",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "format:check": "prettier --check \"src/**/*.ts\" \"test/**/*.ts\"",
    "typecheck": "tsc --noEmit",
    "quality": "npm run lint && npm run format:check && npm run typecheck"
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
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "esModuleInterop": true,
    "declaration": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "test"]
}
```

### `jest.config.ts`

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

## 🎯 Implementation Checklist

### Phase 1: Foundation
- [ ] Create `src/types.ts` with all interfaces
- [ ] Create `src/exceptions.ts` with error classes
- [ ] Create `src/models.ts` with report models

### Phase 2: Utilities
- [ ] `utils/date-utils.ts`: timestamp generation/validation
- [ ] `utils/hash-utils.ts`: SHA-256/512, UUID
- [ ] `utils/validation-utils.ts`: field validators

### Phase 3: Parser
- [ ] Implement `XARFParser` class
- [ ] Add `parse()` method
- [ ] Add `validate()` method
- [ ] Add category-specific validation
- [ ] Write 27+ unit tests

### Phase 4: Generator
- [ ] Implement `XARFGenerator` class
- [ ] Add `generateReport()` method
- [ ] Add `addEvidence()` method
- [ ] Write 13+ unit tests

### Phase 5: Quality
- [ ] Configure ESLint
- [ ] Configure Prettier
- [ ] Set up Husky hooks
- [ ] Achieve 90%+ coverage

### Phase 6: CI/CD
- [ ] Create `.github/workflows/ci.yml`
- [ ] Create `.github/workflows/quality.yml`
- [ ] Test on Node 14, 16, 18, 20

---

## 🔍 Python → TypeScript Quick Reference

| Python | TypeScript |
|--------|-----------|
| `str` | `string` |
| `int`, `float` | `number` |
| `bool` | `boolean` |
| `Dict[str, Any]` | `Record<string, unknown>` |
| `List[str]` | `string[]` |
| `Optional[T]` | `T \| undefined` |
| `Union[A, B]` | `A \| B` |
| `class Foo:` | `class Foo {` |
| `def method(self):` | `method(): void {` |
| `__init__` | `constructor()` |
| `@property` | `get prop()` |

---

## 📊 Quality Metrics

| Metric | Target | Command |
|--------|--------|---------|
| Test Coverage | 90%+ | `npm run test:coverage` |
| Lint Errors | 0 | `npm run lint` |
| Type Errors | 0 | `npm run typecheck` |
| Format Check | Pass | `npm run format:check` |
| Bundle Size | <100KB | `ls -lh dist/` |

---

## 🚦 Pre-release Checklist

- [ ] All tests passing: `npm test`
- [ ] Coverage ≥ 90%: `npm run test:coverage`
- [ ] No lint errors: `npm run lint`
- [ ] Properly formatted: `npm run format:check`
- [ ] No type errors: `npm run typecheck`
- [ ] Build succeeds: `npm run build`
- [ ] Version updated in `package.json`
- [ ] CHANGELOG.md updated
- [ ] Documentation complete

---

## 📦 Publishing Steps

```bash
# 1. Ensure clean state
npm run quality
npm test
npm run build

# 2. Update version
npm version 4.0.0-alpha.1

# 3. Publish to npm
npm login
npm publish --tag alpha

# 4. Verify
npm view xarf@alpha
```

---

## 🔗 Useful Commands

```bash
# Development
npm run test:watch           # Watch mode for tests
npm run lint:fix            # Auto-fix lint issues
npm run format              # Format all files

# Quality checks
npm run quality             # Run all quality checks
npm run typecheck           # TypeScript type checking

# Build
npm run build               # Build for production
npm pack                    # Create tarball

# CI/CD
npm ci                      # Clean install (for CI)
npm audit                   # Security audit
```

---

## 📚 Key Files to Study (Python Reference)

1. **`/Users/tknecht/Projects/xarf/xarf-python/xarf/parser.py`**
   - Study `XARFParser` class structure
   - Review validation logic
   - Check error handling patterns

2. **`/Users/tknecht/Projects/xarf/xarf-python/xarf/generator.py`**
   - Study `XARFGenerator` class
   - Review evidence handling
   - Check hash generation

3. **`/Users/tknecht/Projects/xarf/xarf-python/xarf/models.py`**
   - Study Pydantic models
   - Review field validation
   - Check category-specific fields

4. **`/Users/tknecht/Projects/xarf/xarf-python/tests/`**
   - Study test patterns
   - Review test cases
   - Check coverage approach

---

## ⚠️ Common Pitfalls

1. **Forgetting to clear errors**: Reset `this.errors = []` at start of methods
2. **Type narrowing**: Use type guards for union types
3. **JSON parsing errors**: Always wrap `JSON.parse()` in try-catch
4. **Missing null checks**: Use optional chaining `?.` liberally
5. **Bundle size**: Import only what you need from libraries

---

## 🎓 Best Practices

1. **Use strict TypeScript**: Enable all strict flags
2. **Write tests first**: TDD approach recommended
3. **Document public APIs**: Add JSDoc to all exports
4. **Handle errors gracefully**: Provide clear error messages
5. **Keep functions small**: Max 50 lines per function
6. **Use meaningful names**: Descriptive variable/function names

---

## 📞 Support

- **Python Reference**: `/Users/tknecht/Projects/xarf/xarf-python`
- **XARF Spec**: https://xarf.org/docs/specification/
- **TypeScript Docs**: https://www.typescriptlang.org/docs/
- **Contact**: contact@xarf.org

---

**Version**: 1.0.0
**Last Updated**: 2025-11-20
**Status**: Ready for Implementation
