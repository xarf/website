# XARF Java Library - Complete Architecture Design
## Version: 4.0.0-alpha1

## 1. PROJECT OVERVIEW
**Package**: org.xarf:xarf-java
**Target**: Maven Central Repository
**Java Version**: 17+ (LTS)
**Build Tool**: Maven (primary) with Gradle alternative
**License**: MIT

## 2. CORE COMPONENTS

### 2.1 Package Structure
```
org.xarf/
├── XARFParser.java           # Main parser class
├── XARFValidator.java         # Validation engine
├── XARFGenerator.java         # Report generator
├── model/                     # Data models
│   ├── XARFReport.java       # Base report model
│   ├── MessagingReport.java  # Messaging category
│   ├── ConnectionReport.java # Connection category
│   ├── ContentReport.java    # Content category
│   ├── XARFReporter.java     # Reporter information
│   └── XARFEvidence.java     # Evidence items
├── exception/                 # Custom exceptions
│   ├── XARFException.java    # Base exception
│   ├── XARFParseException.java
│   └── XARFValidationException.java
├── validation/                # Validation framework
│   ├── ValidationContext.java
│   ├── CategoryValidator.java
│   └── validators/           # Category-specific validators
│       ├── MessagingValidator.java
│       ├── ConnectionValidator.java
│       └── ContentValidator.java
└── util/                      # Utilities
    ├── HashUtil.java
    ├── TimestampUtil.java
    └── Constants.java
```

### 2.2 XARFParser Design
```java
public class XARFParser {
    private final boolean strict;
    private final List<String> errors;
    private final ObjectMapper objectMapper;
    private final XARFValidator validator;

    // Supported categories in alpha
    private static final Set<String> SUPPORTED_CATEGORIES =
        Set.of("messaging", "connection", "content");

    public XARFParser() { this(false); }
    public XARFParser(boolean strict) { ... }

    public XARFReport parse(String json) throws XARFParseException { ... }
    public XARFReport parse(InputStream stream) throws XARFParseException { ... }
    public XARFReport parse(Reader reader) throws XARFParseException { ... }

    public boolean validate(String json) { ... }
    public List<String> getErrors() { ... }
}
```

### 2.3 XARFReport Model (Using category field)
```java
@JsonInclude(JsonInclude.Include.NON_NULL)
public class XARFReport {
    // Required base fields
    @JsonProperty("xarf_version")
    private String xarfVersion = "4.0.0";

    @JsonProperty("report_id")
    private String reportId;

    @JsonProperty("timestamp")
    private Instant timestamp;

    @JsonProperty("reporter")
    private XARFReporter reporter;

    @JsonProperty("on_behalf_of")
    private XARFReporter onBehalfOf;

    @JsonProperty("source_identifier")
    private String sourceIdentifier;

    // IMPORTANT: Using 'category' field per requirements
    @JsonProperty("category")
    private String category;

    @JsonProperty("type")
    private String type;

    @JsonProperty("evidence_source")
    private String evidenceSource;

    // Optional fields
    @JsonProperty("evidence")
    private List<XARFEvidence> evidence;

    @JsonProperty("tags")
    private List<String> tags;

    @JsonProperty("_internal")
    private Map<String, Object> internal;

    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<>();

    // Getters and Setters (JavaBean pattern)
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    // ... other getters/setters
}
```

### 2.4 XARFValidator Design
```java
public class XARFValidator {
    private final List<String> errors;
    private static final Set<String> VALID_CATEGORIES =
        Set.of("messaging", "connection", "content", "infrastructure",
               "copyright", "vulnerability", "reputation", "other");

    private static final Set<String> VALID_EVIDENCE_SOURCES =
        Set.of("spamtrap", "honeypot", "user_report", "automated_scan",
               "manual_analysis", "vulnerability_scan", "researcher_analysis",
               "threat_intelligence");

    public boolean validateStructure(Map<String, Object> data) { ... }
    public boolean validateCategory(String category, String type,
                                   Map<String, Object> data) { ... }
    private boolean validateMessaging(String type, Map<String, Object> data) { ... }
    private boolean validateConnection(String type, Map<String, Object> data) { ... }
    private boolean validateContent(String type, Map<String, Object> data) { ... }

    public List<String> getErrors() { return new ArrayList<>(errors); }
}
```

### 2.5 XARFGenerator Design
```java
public class XARFGenerator {
    private static final String XARF_VERSION = "4.0.0";

    // Valid categories and types
    private static final Map<String, List<String>> EVENT_TYPES = Map.of(
        "abuse", List.of("ddos", "malware", "phishing", "spam", "scanner"),
        "vulnerability", List.of("cve", "misconfiguration", "open_service"),
        "connection", List.of("compromised", "botnet", "malicious_traffic",
                              "ddos", "port_scan", "login_attack"),
        // ... other categories
    );

    public String generateUuid() { return UUID.randomUUID().toString(); }
    public String generateTimestamp() { return Instant.now().toString(); }
    public String generateHash(byte[] data, String algorithm) { ... }

    public XARFEvidence addEvidence(String contentType, String description,
                                    String payload, String hashAlgorithm) { ... }

    public XARFReport generateReport(String category, String reportType,
                                    String sourceIdentifier,
                                    String reporterContact,
                                    GeneratorOptions options)
            throws XARFException { ... }

    public XARFReport generateSampleReport(String category, String reportType,
                                          boolean includeEvidence,
                                          boolean includeOptional)
            throws XARFException { ... }
}
```

## 3. DEPENDENCIES (pom.xml)

### 3.1 Core Dependencies
```xml
<dependencies>
    <!-- JSON Processing -->
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>2.17.0</version>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.datatype</groupId>
        <artifactId>jackson-datatype-jsr310</artifactId>
        <version>2.17.0</version>
    </dependency>

    <!-- JSON Schema Validation -->
    <dependency>
        <groupId>com.networknt</groupId>
        <artifactId>json-schema-validator</artifactId>
        <version>1.4.0</version>
    </dependency>

    <!-- Validation -->
    <dependency>
        <groupId>jakarta.validation</groupId>
        <artifactId>jakarta.validation-api</artifactId>
        <version>3.0.2</version>
    </dependency>

    <!-- Logging (SLF4J API only, let users choose implementation) -->
    <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-api</artifactId>
        <version>2.0.12</version>
    </dependency>
</dependencies>
```

### 3.2 Testing Dependencies
```xml
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.10.2</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.assertj</groupId>
    <artifactId>assertj-core</artifactId>
    <version>3.25.3</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-junit-jupiter</artifactId>
    <version>5.11.0</version>
    <scope>test</scope>
</dependency>
```

## 4. QUALITY PIPELINE (Maven Plugins)

### 4.1 Code Quality Tools
```xml
<build>
    <plugins>
        <!-- Compiler -->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.13.0</version>
            <configuration>
                <release>17</release>
                <compilerArgs>
                    <arg>-Xlint:all</arg>
                    <arg>-Werror</arg>
                </compilerArgs>
            </configuration>
        </plugin>

        <!-- Checkstyle (Google Java Style) -->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-checkstyle-plugin</artifactId>
            <version>3.3.1</version>
            <configuration>
                <configLocation>google_checks.xml</configLocation>
                <consoleOutput>true</consoleOutput>
                <failsOnError>true</failsOnError>
                <violationSeverity>warning</violationSeverity>
            </configuration>
            <executions>
                <execution>
                    <goals><goal>check</goal></goals>
                </execution>
            </executions>
        </plugin>

        <!-- PMD (Static Analysis) -->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-pmd-plugin</artifactId>
            <version>3.21.2</version>
            <configuration>
                <rulesets>
                    <ruleset>/rulesets/java/quickstart.xml</ruleset>
                </rulesets>
                <failOnViolation>true</failOnViolation>
                <printFailingErrors>true</printFailingErrors>
            </configuration>
            <executions>
                <execution>
                    <goals>
                        <goal>check</goal>
                        <goal>cpd-check</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>

        <!-- SpotBugs (Bug Detection) -->
        <plugin>
            <groupId>com.github.spotbugs</groupId>
            <artifactId>spotbugs-maven-plugin</artifactId>
            <version>4.8.3.1</version>
            <configuration>
                <effort>Max</effort>
                <threshold>Low</threshold>
                <failOnError>true</failOnError>
            </configuration>
            <executions>
                <execution>
                    <goals><goal>check</goal></goals>
                </execution>
            </executions>
        </plugin>

        <!-- JUnit 5 -->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>3.2.5</version>
        </plugin>

        <!-- JaCoCo (Code Coverage) -->
        <plugin>
            <groupId>org.jacoco</groupId>
            <artifactId>jacoco-maven-plugin</artifactId>
            <version>0.8.11</version>
            <executions>
                <execution>
                    <id>prepare-agent</id>
                    <goals><goal>prepare-agent</goal></goals>
                </execution>
                <execution>
                    <id>report</id>
                    <phase>test</phase>
                    <goals><goal>report</goal></goals>
                </execution>
                <execution>
                    <id>check</id>
                    <goals><goal>check</goal></goals>
                    <configuration>
                        <rules>
                            <rule>
                                <element>PACKAGE</element>
                                <limits>
                                    <limit>
                                        <counter>LINE</counter>
                                        <value>COVEREDRATIO</value>
                                        <minimum>0.90</minimum>
                                    </limit>
                                    <limit>
                                        <counter>BRANCH</counter>
                                        <value>COVEREDRATIO</value>
                                        <minimum>0.85</minimum>
                                    </limit>
                                </limits>
                            </rule>
                        </rules>
                    </configuration>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```

## 5. CI/CD PIPELINE (GitHub Actions)

### 5.1 quality-checks.yml
```yaml
name: Quality Checks

on:
  push:
    branches: [main, master, develop]
  pull_request:
    branches: [main, master, develop]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up JDK 17
        uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'
          cache: maven

      - name: Checkstyle
        run: mvn checkstyle:check

      - name: PMD
        run: mvn pmd:check pmd:cpd-check

      - name: SpotBugs
        run: mvn spotbugs:check

      - name: Tests with Coverage
        run: mvn test jacoco:report

      - name: Coverage Check (90%+)
        run: mvn jacoco:check

      - name: Upload Coverage
        uses: codecov/codecov-action@v4
        with:
          files: ./target/site/jacoco/jacoco.xml
```

### 5.2 Test Matrix
```yaml
test-matrix:
  strategy:
    matrix:
      java: [17, 21]
      os: [ubuntu-latest, windows-latest, macos-latest]
  runs-on: ${{ matrix.os }}
  steps:
    - uses: actions/checkout@v4
    - name: Set up JDK ${{ matrix.java }}
      uses: actions/setup-java@v4
      with:
        java-version: ${{ matrix.java }}
        distribution: 'temurin'
    - name: Test
      run: mvn test
```

## 6. TESTING STRATEGY

### 6.1 Test Structure
```
src/test/java/org/xarf/
├── XARFParserTest.java           # Main parser tests
├── XARFValidatorTest.java        # Validation tests
├── XARFGeneratorTest.java        # Generator tests
├── model/
│   ├── XARFReportTest.java      # Model serialization tests
│   └── CategoryReportTests.java # Category-specific tests
├── validation/
│   ├── MessagingValidatorTest.java
│   ├── ConnectionValidatorTest.java
│   └── ContentValidatorTest.java
└── integration/
    ├── EndToEndTest.java         # Full workflow tests
    └── CompatibilityTest.java    # Cross-implementation tests
```

### 6.2 Test Coverage Goals
- Line Coverage: 90%+
- Branch Coverage: 85%+
- Mutation Testing: 80%+ (using PIT)
- Integration Tests: All categories
- Edge Cases: All validation scenarios

### 6.3 Example Test Pattern
```java
@Test
@DisplayName("Should parse valid messaging report with category field")
void parseValidMessagingReport() throws XARFParseException {
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
        .extracting("category", "type")
        .containsExactly("messaging", "spam");

    assertThat(report.getCategory()).isEqualTo("messaging");
}
```

## 7. DOCUMENTATION STRUCTURE

### 7.1 JavaDoc Standards
- All public APIs must have JavaDoc
- Include @since tags for version tracking
- Provide code examples in class-level JavaDoc
- Document exceptions with @throws
- Link to XARF specification

### 7.2 README Structure
```
# XARF Java Parser

## Installation
Maven/Gradle snippets

## Quick Start
Basic usage examples

## Features
- Parser with strict/lenient modes
- Validator with detailed error reporting
- Generator for creating reports
- Support for all 8 categories

## Usage Examples
### Parsing
### Validating
### Generating

## Configuration
Thread-safety, performance tuning

## Testing
How to run tests

## Contributing
Development setup

## License
MIT
```

## 8. PUBLICATION REQUIREMENTS

### 8.1 Maven Central Requirements
- Group ID: org.xarf
- Artifact ID: xarf-java
- Version: 4.0.0-alpha1
- POM: Complete with SCM, developers, licenses
- Javadoc JAR: Required
- Sources JAR: Required
- GPG Signing: Required

### 8.2 pom.xml Metadata
```xml
<groupId>org.xarf</groupId>
<artifactId>xarf-java</artifactId>
<version>4.0.0-alpha1</version>
<packaging>jar</packaging>

<name>XARF Java Parser</name>
<description>Java library for parsing and validating XARF v4 abuse reports</description>
<url>https://xarf.org</url>

<licenses>
    <license>
        <name>MIT License</name>
        <url>https://opensource.org/licenses/MIT</url>
    </license>
</licenses>

<developers>
    <developer>
        <name>XARF Project</name>
        <email>contact@xarf.org</email>
        <organization>XARF</organization>
        <organizationUrl>https://xarf.org</organizationUrl>
    </developer>
</developers>

<scm>
    <connection>scm:git:git://github.com/xarf/xarf-java.git</connection>
    <developerConnection>scm:git:ssh://github.com:xarf/xarf-java.git</developerConnection>
    <url>https://github.com/xarf/xarf-java</url>
</scm>
```

## 9. BUILD COMMANDS

### 9.1 Maven Goals
```bash
# Clean build
mvn clean install

# Run all quality checks
mvn clean verify

# Individual checks
mvn checkstyle:check
mvn pmd:check
mvn spotbugs:check
mvn test jacoco:report

# Generate site with reports
mvn site

# Deploy to Maven Central (requires credentials)
mvn clean deploy -P release
```

### 9.2 Alternative: Gradle Configuration
```gradle
plugins {
    id 'java-library'
    id 'checkstyle'
    id 'pmd'
    id 'com.github.spotbugs' version '6.0.7'
    id 'jacoco'
}

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(17)
    }
}

checkstyle {
    toolVersion = '10.14.0'
    configFile = file('config/checkstyle/google_checks.xml')
}

pmd {
    consoleOutput = true
    toolVersion = '7.0.0'
    ruleSets = []
    ruleSetFiles = files('config/pmd/ruleset.xml')
}

spotbugs {
    effort = 'max'
    reportLevel = 'low'
}

jacoco {
    toolVersion = '0.8.11'
}

jacocoTestCoverageVerification {
    violationRules {
        rule {
            limit {
                minimum = 0.90
            }
        }
    }
}
```

## 10. ARCHITECTURE DECISION RECORDS

### ADR-001: Use Jackson for JSON Processing
**Decision**: Use Jackson instead of Gson or JSON-B
**Rationale**:
- Industry standard with 50M+ downloads/month
- Best performance for large reports
- Excellent Java 8+ time API support
- Flexible annotation system

### ADR-002: Separate Validation Layer
**Decision**: Create dedicated XARFValidator class
**Rationale**:
- Allows validation without full parsing
- Enables custom validation rules
- Better error reporting
- Follows Single Responsibility Principle

### ADR-003: Category-Specific Model Classes
**Decision**: Extend base XARFReport for each category
**Rationale**:
- Type-safe access to category fields
- Better IDE support and autocomplete
- Compile-time validation
- Matches Python implementation pattern

### ADR-004: Use category Field with Proper Getters/Setters
**Decision**: Model uses 'category' field with getCategory()/setCategory()
**Rationale**:
- Aligns with XARF specification
- Matches Python implementation
- Follows JavaBean conventions
- Compatible with JSON serialization frameworks

### ADR-005: Maven as Primary Build Tool
**Decision**: Use Maven with optional Gradle support
**Rationale**:
- Standard for enterprise Java
- Better Maven Central integration
- Familiar to most Java developers
- Provide Gradle as alternative

### ADR-006: 90%+ Code Coverage Requirement
**Decision**: Enforce minimum 90% line coverage
**Rationale**:
- Security-critical application (abuse reporting)
- Matches Python implementation quality bar
- Prevents regression
- Forces thorough testing

### ADR-007: Java 17 Minimum Version
**Decision**: Target Java 17 (LTS) as minimum
**Rationale**:
- Current LTS with long support window
- Modern language features (records, sealed classes)
- Text blocks for test data
- Pattern matching improvements

## 11. PERFORMANCE CONSIDERATIONS

### 11.1 Thread Safety
- XARFParser: Thread-safe when not reused
- XARFValidator: Stateful (errors list), not thread-safe
- XARFGenerator: Stateless, fully thread-safe
- Models: Immutable after construction (use builder pattern)

### 11.2 Memory Optimization
- Stream-based parsing for large reports
- Lazy loading of evidence payloads
- Weak references for cached validators
- Pool ObjectMapper instances

### 11.3 Performance Targets
- Parse 10K reports/second (small reports)
- Parse 1K reports/second (with evidence)
- Validation: < 1ms per report
- Memory: < 10MB heap per 1000 reports

## 12. MIGRATION FROM PYTHON

### 12.1 API Equivalence
```python
# Python
parser = XARFParser(strict=True)
report = parser.parse(json_data)

# Java
XARFParser parser = new XARFParser(true);
XARFReport report = parser.parse(jsonData);
```

### 12.2 Key Differences
- Python: Duck typing → Java: Strong typing
- Python: Pydantic models → Java: Jackson annotations
- Python: Dict errors → Java: List<String> errors
- Python: Properties → Java: Getters/setters

### 12.3 Compatibility Testing
- Share test fixtures between implementations
- JSON schema validation tests
- Cross-implementation report exchange tests
- Interoperability CI pipeline

## 13. FUTURE ENHANCEMENTS (Post-Alpha)

### 13.1 Alpha Release Scope
- Core categories: messaging, connection, content
- Basic parser, validator, generator
- 90%+ test coverage
- Maven Central publication

### 13.2 Beta Release (Future)
- All 8 categories supported
- Advanced validation rules
- Performance optimizations
- Extended documentation

### 13.3 Version 1.0 (Future)
- Production-ready
- Benchmarked performance
- Security audit completed
- Full specification compliance

## 14. QUALITY METRICS SUMMARY

| Metric | Target | Tool |
|--------|--------|------|
| Line Coverage | 90%+ | JaCoCo |
| Branch Coverage | 85%+ | JaCoCo |
| Code Style | 0 violations | Checkstyle |
| Code Quality | 0 critical issues | PMD |
| Bug Detection | 0 high/medium bugs | SpotBugs |
| Build Time | < 2 minutes | Maven |
| Test Execution | < 30 seconds | JUnit 5 |

---

## 15. COMPONENT INTERACTION DIAGRAM

```
┌─────────────────┐
│  Client Code    │
└────────┬────────┘
         │
         ├─────────────────┬──────────────────┐
         │                 │                  │
         ▼                 ▼                  ▼
┌─────────────────┐ ┌──────────────┐ ┌──────────────────┐
│   XARFParser    │ │ XARFValidator│ │  XARFGenerator   │
│  - parse()      │ │ - validate() │ │ - generate()     │
│  - validate()   │ │ - getErrors()│ │ - addEvidence()  │
└────────┬────────┘ └──────┬───────┘ └────────┬─────────┘
         │                 │                  │
         │     ┌───────────┴──────────┐       │
         │     │                      │       │
         ▼     ▼                      ▼       ▼
┌────────────────────────────────────────────────────┐
│              Model Layer (POJO)                    │
│  XARFReport, MessagingReport, ConnectionReport,    │
│  ContentReport, XARFReporter, XARFEvidence         │
└────────────────────────────────────────────────────┘
                       │
                       │ serialization/deserialization
                       ▼
┌────────────────────────────────────────────────────┐
│              Jackson ObjectMapper                  │
│         (JSON ↔ Java Object conversion)            │
└────────────────────────────────────────────────────┘
```

## 16. VALIDATION FLOW DIAGRAM

```
parse() called
     │
     ▼
Parse JSON → ObjectMapper
     │
     ▼
Basic Structure Validation
     │
     ├─ Check required fields
     ├─ Validate xarf_version
     ├─ Validate reporter structure
     └─ Validate timestamp format
     │
     ▼
Category-Specific Validation
     │
     ├─ messaging → MessagingValidator
     │   ├─ Check protocol
     │   ├─ Validate smtp_from
     │   └─ Validate subject (if spam/phishing)
     │
     ├─ connection → ConnectionValidator
     │   ├─ Check destination_ip
     │   ├─ Validate protocol
     │   └─ Check port ranges
     │
     └─ content → ContentValidator
         ├─ Validate URL format
         └─ Check content_type
     │
     ▼
Return Report or Throw Exception
```

## 17. CLASS HIERARCHY DIAGRAM

```
XARFReport (base)
    │
    ├─ MessagingReport
    │   └─ protocol, smtp_from, smtp_to, subject, message_id
    │
    ├─ ConnectionReport
    │   └─ destination_ip, protocol, destination_port, attack_type
    │
    └─ ContentReport
        └─ url, content_type, attack_type, affected_pages

XARFException (base)
    │
    ├─ XARFParseException
    └─ XARFValidationException
```

## 18. DEPLOYMENT CHECKLIST

### Pre-Release
- [ ] All tests passing (90%+ coverage)
- [ ] Checkstyle: 0 violations
- [ ] PMD: 0 critical issues
- [ ] SpotBugs: 0 high/medium bugs
- [ ] JavaDoc: 100% public API documented
- [ ] README.md complete with examples
- [ ] CHANGELOG.md updated
- [ ] License file present (MIT)

### Maven Central Publication
- [ ] POM complete with metadata
- [ ] Sources JAR generated
- [ ] JavaDoc JAR generated
- [ ] GPG signatures created
- [ ] OSSRH account configured
- [ ] Release profile activated
- [ ] Artifacts deployed and released

### Post-Release
- [ ] GitHub release created with notes
- [ ] Documentation website updated
- [ ] Announcement on xarf.org
- [ ] Maven Central badge in README
- [ ] Version bumped for next development cycle
