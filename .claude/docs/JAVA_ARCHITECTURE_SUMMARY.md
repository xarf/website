# XARF Java Library - Architecture Summary

## Executive Summary

This document provides a high-level overview of the XARF Java library architecture based on the Python implementation analysis. The Java library will provide equivalent functionality with Java-idiomatic patterns and enterprise-grade quality tooling.

## Key Design Decisions

### 1. Technology Stack

| Component | Choice | Rationale |
|-----------|--------|-----------|
| Java Version | 17+ (LTS) | Modern language features, long-term support |
| Build Tool | Maven (primary) | Industry standard, Maven Central integration |
| JSON Library | Jackson 2.17+ | Performance, widespread adoption, Java 8+ time support |
| Testing | JUnit 5 + AssertJ | Modern testing framework, fluent assertions |
| Validation | Jakarta Validation API | Standard Java validation framework |
| Schema | networknt json-schema-validator | JSON Schema validation support |

### 2. Component Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Client Code                        │
└──────────┬────────────────────────┬─────────────────┘
           │                        │
           ▼                        ▼
┌──────────────────┐     ┌─────────────────────┐
│   XARFParser     │     │   XARFGenerator     │
│   - parse()      │     │   - generate()      │
│   - validate()   │     │   - addEvidence()   │
└────────┬─────────┘     └──────────┬──────────┘
         │                          │
         │    ┌──────────────────┐  │
         └────┤  XARFValidator   ├──┘
              │  - validateXXX() │
              └────────┬─────────┘
                       │
           ┌───────────┴───────────────┐
           │                           │
           ▼                           ▼
┌─────────────────────┐    ┌───────────────────────┐
│   Model Classes     │    │   Validation Rules    │
│ - XARFReport        │    │ - MessagingValidator  │
│ - MessagingReport   │    │ - ConnectionValidator │
│ - ConnectionReport  │    │ - ContentValidator    │
│ - ContentReport     │    └───────────────────────┘
└─────────────────────┘
```

### 3. Field Naming Convention

**CRITICAL**: The Java implementation uses the `category` field name (matching the XARF specification):

```java
public class XARFReport {
    @JsonProperty("category")
    private String category;

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}
```

This aligns with:
- XARF v4.0.0 specification
- Python implementation
- JSON serialization requirements
- JavaBean naming conventions

### 4. Core Components

#### 4.1 XARFParser
```java
// Parse with strict mode
XARFParser parser = new XARFParser(true);
XARFReport report = parser.parse(jsonString);

// Parse with lenient mode (collect errors)
XARFParser parser = new XARFParser(false);
boolean valid = parser.validate(jsonString);
List<String> errors = parser.getErrors();
```

**Features**:
- Strict and lenient modes
- Multiple input formats (String, InputStream, Reader)
- Category-specific model instantiation
- Detailed error collection

#### 4.2 XARFValidator
```java
XARFValidator validator = new XARFValidator();
boolean valid = validator.validateStructure(data);
if (!valid) {
    List<String> errors = validator.getErrors();
}
```

**Features**:
- Structure validation (required fields, types)
- Category-specific validation
- Evidence source validation
- Reporter type validation

#### 4.3 XARFGenerator
```java
XARFGenerator generator = new XARFGenerator();
XARFReport report = generator.generateReport(
    "connection",                    // category
    "ddos",                         // type
    "192.0.2.100",                  // source
    "abuse@example.com",            // contact
    options                         // additional options
);
```

**Features**:
- UUID generation (RFC 4122)
- ISO 8601 timestamp generation
- Hash calculation (SHA-256, SHA-512, etc.)
- Evidence creation with automatic hashing
- Sample report generation for testing

### 5. Quality Assurance Pipeline

#### 5.1 Quality Tools

| Tool | Purpose | Threshold |
|------|---------|-----------|
| **Checkstyle** | Code style compliance | 0 violations (Google Java Style) |
| **PMD** | Static code analysis | 0 critical issues |
| **SpotBugs** | Bug detection | 0 high/medium bugs |
| **JaCoCo** | Code coverage | 90%+ line, 85%+ branch |
| **JUnit 5** | Unit testing | All tests pass |

#### 5.2 Build Validation

```bash
# Full quality check
mvn clean verify

# Individual checks
mvn checkstyle:check    # Code style
mvn pmd:check           # Static analysis
mvn spotbugs:check      # Bug detection
mvn test jacoco:report  # Tests + coverage
```

#### 5.3 GitHub Actions CI/CD

```yaml
# Automated on every push/PR
- Checkstyle (Google Java Style)
- PMD (static analysis)
- SpotBugs (bug detection)
- JUnit 5 tests
- JaCoCo coverage report
- Coverage threshold enforcement (90%+)
```

### 6. Model Design

#### 6.1 Base Model (XARFReport)
```java
@JsonInclude(JsonInclude.Include.NON_NULL)
public class XARFReport {
    @JsonProperty("xarf_version")
    private String xarfVersion = "4.0.0";

    @JsonProperty("report_id")
    private String reportId;

    @JsonProperty("timestamp")
    private Instant timestamp;

    @JsonProperty("reporter")
    private XARFReporter reporter;

    @JsonProperty("category")  // Using 'category' field
    private String category;

    @JsonProperty("type")
    private String type;

    // Getters and setters following JavaBean conventions
}
```

#### 6.2 Category-Specific Models
```java
// MessagingReport extends XARFReport
public class MessagingReport extends XARFReport {
    private String protocol;
    private String smtpFrom;
    private String smtpTo;
    private String subject;
    private String messageId;
}

// ConnectionReport extends XARFReport
public class ConnectionReport extends XARFReport {
    private String destinationIp;
    private String protocol;
    private Integer destinationPort;
    private String attackType;
}

// ContentReport extends XARFReport
public class ContentReport extends XARFReport {
    private String url;
    private String contentType;
    private String attackType;
}
```

### 7. Exception Hierarchy

```java
XARFException (base)
    ├─ XARFParseException      // JSON parsing errors
    └─ XARFValidationException // Validation failures
```

**Usage**:
```java
try {
    XARFReport report = parser.parse(json);
} catch (XARFParseException e) {
    // Handle JSON parsing errors
} catch (XARFValidationException e) {
    // Handle validation errors
    List<String> errors = e.getErrors();
}
```

### 8. Testing Strategy

#### 8.1 Test Coverage
- **Unit Tests**: Parser, Validator, Generator, Models
- **Integration Tests**: End-to-end workflows
- **Category Tests**: All 8 XARF categories
- **Validation Tests**: All mandatory and optional fields
- **Edge Cases**: Invalid data, missing fields, wrong types

#### 8.2 Test Example
```java
@Test
@DisplayName("Should parse valid messaging report")
void parseValidMessagingReport() {
    String json = """
        {
            "xarf_version": "4.0.0",
            "report_id": "test-id",
            "timestamp": "2024-01-15T10:30:00Z",
            "reporter": {
                "org": "Test Org",
                "contact": "test@example.com",
                "type": "automated"
            },
            "source_identifier": "192.0.2.100",
            "category": "messaging",
            "type": "spam",
            "evidence_source": "spamtrap"
        }
        """;

    XARFParser parser = new XARFParser();
    XARFReport report = parser.parse(json);

    assertThat(report)
        .isInstanceOf(MessagingReport.class)
        .hasFieldOrPropertyWithValue("category", "messaging")
        .hasFieldOrPropertyWithValue("type", "spam");
}
```

### 9. Dependencies

#### 9.1 Core Dependencies (Runtime)
```xml
<!-- Jackson for JSON processing -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.17.0</version>
</dependency>

<!-- JSON Schema validation -->
<dependency>
    <groupId>com.networknt</groupId>
    <artifactId>json-schema-validator</artifactId>
    <version>1.4.0</version>
</dependency>

<!-- SLF4J API (logging facade) -->
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
    <version>2.0.12</version>
</dependency>
```

#### 9.2 Test Dependencies
```xml
<!-- JUnit 5 -->
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.10.2</version>
    <scope>test</scope>
</dependency>

<!-- AssertJ -->
<dependency>
    <groupId>org.assertj</groupId>
    <artifactId>assertj-core</artifactId>
    <version>3.25.3</version>
    <scope>test</scope>
</dependency>
```

### 10. Maven Central Publication

#### 10.1 Artifact Coordinates
```xml
<groupId>org.xarf</groupId>
<artifactId>xarf-java</artifactId>
<version>4.0.0-alpha1</version>
```

#### 10.2 Required Artifacts
- `xarf-java-4.0.0-alpha1.jar` - Main library
- `xarf-java-4.0.0-alpha1-sources.jar` - Source code
- `xarf-java-4.0.0-alpha1-javadoc.jar` - JavaDoc
- `xarf-java-4.0.0-alpha1.pom` - POM with metadata
- `.asc` files - GPG signatures for all artifacts

#### 10.3 Publication Process
```bash
# 1. Run quality checks
mvn clean verify

# 2. Generate artifacts
mvn clean package

# 3. Deploy to OSSRH staging
mvn clean deploy -P release

# 4. Release from staging to Maven Central
# (via Sonatype Nexus UI or mvn nexus-staging:release)
```

### 11. Performance Characteristics

| Metric | Target | Notes |
|--------|--------|-------|
| Parse Speed | 10K reports/sec | Small reports without evidence |
| Parse Speed (Heavy) | 1K reports/sec | Large reports with evidence |
| Validation Speed | < 1ms per report | Structure validation only |
| Memory Usage | < 10MB per 1K reports | With proper object pooling |
| Thread Safety | Parser: Yes (immutable) | Validator: No (stateful errors) |

### 12. API Comparison: Python vs Java

#### Python
```python
from xarf import XARFParser

parser = XARFParser(strict=True)
report = parser.parse(json_data)
print(f"Category: {report.category}")
```

#### Java
```java
import org.xarf.XARFParser;
import org.xarf.model.XARFReport;

XARFParser parser = new XARFParser(true);
XARFReport report = parser.parse(jsonData);
System.out.println("Category: " + report.getCategory());
```

### 13. Validation Categories (Alpha Release)

**Supported in Alpha**:
- `messaging` - Email spam, phishing, social engineering
- `connection` - DDoS, port scans, login attacks
- `content` - Phishing sites, malware distribution, defacement

**Future Releases**:
- `infrastructure` - DNS issues, open resolvers
- `copyright` - DMCA, file sharing violations
- `vulnerability` - CVEs, misconfigurations
- `reputation` - Blocklists, threat intelligence
- `other` - Miscellaneous reports

### 14. Integration Examples

#### 14.1 Parsing
```java
XARFParser parser = new XARFParser();
try {
    XARFReport report = parser.parse(jsonString);
    System.out.println("Parsed: " + report.getCategory());
} catch (XARFParseException e) {
    System.err.println("Parse error: " + e.getMessage());
}
```

#### 14.2 Validation
```java
XARFParser parser = new XARFParser(false); // lenient mode
if (parser.validate(jsonString)) {
    System.out.println("Valid XARF report");
} else {
    parser.getErrors().forEach(System.err::println);
}
```

#### 14.3 Generation
```java
XARFGenerator generator = new XARFGenerator();
XARFReport report = generator.generateReport(
    "connection",
    "ddos",
    "192.0.2.100",
    "abuse@example.com",
    GeneratorOptions.builder()
        .reporterOrg("Security Team")
        .severity("high")
        .includeEvidence(true)
        .build()
);
```

### 15. Architecture Principles

1. **Clean Architecture**: Separation of concerns (parser, validator, generator)
2. **SOLID Principles**: Single responsibility, dependency inversion
3. **Type Safety**: Strong typing with category-specific models
4. **Immutability**: Thread-safe models with builder pattern
5. **Fail Fast**: Strict mode throws exceptions immediately
6. **Detailed Errors**: Lenient mode collects all validation errors
7. **Performance**: Efficient JSON parsing with Jackson
8. **Testability**: High test coverage (90%+) with comprehensive test suite

### 16. Documentation Requirements

#### 16.1 JavaDoc Coverage
- 100% public API documentation
- Code examples in class-level JavaDoc
- @since tags for version tracking
- @throws documentation for exceptions
- Links to XARF specification

#### 16.2 User Documentation
- README.md with quick start guide
- Installation instructions (Maven/Gradle)
- Usage examples for common scenarios
- Configuration options
- FAQ section
- Contributing guidelines

### 17. Release Checklist

#### Pre-Release
- [ ] All tests passing (90%+ coverage)
- [ ] Zero Checkstyle violations
- [ ] Zero PMD critical issues
- [ ] Zero SpotBugs high/medium bugs
- [ ] JavaDoc 100% complete
- [ ] README.md reviewed
- [ ] CHANGELOG.md updated
- [ ] License file verified

#### Publication
- [ ] Maven Central artifacts generated
- [ ] GPG signatures created
- [ ] OSSRH staging successful
- [ ] GitHub release created
- [ ] Documentation updated

#### Post-Release
- [ ] Announcement on xarf.org
- [ ] Maven Central badge added
- [ ] Version bumped for next cycle

### 18. Future Roadmap

#### Alpha (4.0.0-alpha1)
- Core categories: messaging, connection, content
- Basic parser, validator, generator
- 90%+ test coverage
- Maven Central publication

#### Beta (4.0.0-beta1)
- All 8 categories supported
- Enhanced validation rules
- Performance optimizations
- Extended documentation

#### Release Candidate (4.0.0-rc1)
- Production hardening
- Security audit
- Performance benchmarking
- Final specification alignment

#### Release (4.0.0)
- Production-ready
- Full specification compliance
- Comprehensive documentation
- Long-term support commitment

---

## Quick Reference

### Maven Dependency
```xml
<dependency>
    <groupId>org.xarf</groupId>
    <artifactId>xarf-java</artifactId>
    <version>4.0.0-alpha1</version>
</dependency>
```

### Gradle Dependency
```gradle
implementation 'org.xarf:xarf-java:4.0.0-alpha1'
```

### Key Classes
- `org.xarf.XARFParser` - Parse and validate XARF reports
- `org.xarf.XARFValidator` - Standalone validation
- `org.xarf.XARFGenerator` - Generate XARF reports
- `org.xarf.model.XARFReport` - Base report model
- `org.xarf.exception.XARFException` - Base exception

### Resources
- GitHub: https://github.com/xarf/xarf-java
- Documentation: https://xarf.org/docs/java
- Specification: https://github.com/xarf/xarf-spec
- Maven Central: https://central.sonatype.com/artifact/org.xarf/xarf-java
