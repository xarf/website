# XARF Go Library - C4 Architecture Diagrams

## C4 Model Overview

The C4 model provides a hierarchical set of software architecture diagrams:
1. **System Context**: How the library fits in the ecosystem
2. **Container**: High-level components and their interactions
3. **Component**: Detailed view of internal structure
4. **Code**: Class/type-level details

---

## Level 1: System Context Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     XARF Ecosystem                              │
│                                                                 │
│  ┌──────────────┐         ┌──────────────┐                    │
│  │  Abuse       │         │  Security    │                    │
│  │  Reporting   │◄────────┤  Operations  │                    │
│  │  Systems     │         │  Center      │                    │
│  └──────┬───────┘         └──────┬───────┘                    │
│         │                        │                             │
│         │  Report JSON           │  Generate Reports          │
│         │                        │                             │
│         ▼                        ▼                             │
│  ┌─────────────────────────────────────────────┐              │
│  │                                              │              │
│  │         xarf-go Library                      │              │
│  │      (XARF v4.0.0 Parser/Validator)         │              │
│  │                                              │              │
│  │  Components:                                 │              │
│  │  • Parser: Parse JSON to Go structs          │              │
│  │  • Validator: Validate against spec          │              │
│  │  • Generator: Build XARF reports             │              │
│  │                                              │              │
│  └─────────────────────────────────────────────┘              │
│         │                        │                             │
│         │  Validated Reports     │  Parse Results             │
│         │                        │                             │
│         ▼                        ▼                             │
│  ┌──────────────┐         ┌──────────────┐                    │
│  │  Network     │         │  Abuse       │                    │
│  │  Operators   │         │  Databases   │                    │
│  │  (ISPs)      │         │  (Storage)   │                    │
│  └──────────────┘         └──────────────┘                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Key Relationships:
• Security Teams generate abuse reports using xarf-go
• Reporting systems parse incoming reports for validation
• Network operators validate and process abuse notifications
• Databases store structured abuse data
```

---

## Level 2: Container Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                     xarf-go Library Package                         │
│                  (github.com/xarf/xarf-go)                          │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                      Parser Component                       │   │
│  │                      (parser.go)                            │   │
│  │                                                             │   │
│  │  • Parse JSON to Go structs                                │   │
│  │  • Category-specific parsing                               │   │
│  │  • io.Reader streaming support                             │   │
│  │  • Error accumulation (non-strict mode)                    │   │
│  └───────────────────┬────────────────────────────────────────┘   │
│                      │                                             │
│                      │ uses                                        │
│                      ▼                                             │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                      Types Component                        │   │
│  │                      (types.go)                             │   │
│  │                                                             │   │
│  │  • Report (base structure)                                 │   │
│  │  • MessagingReport, ConnectionReport, ContentReport        │   │
│  │  • Reporter, Evidence structs                              │   │
│  │  • JSON tags and validation annotations                    │   │
│  └───────────────────┬────────────────────────────────────────┘   │
│                      │                                             │
│                      │ validates                                   │
│                      ▼                                             │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                   Validator Component                       │   │
│  │                   (validator.go)                            │   │
│  │                                                             │   │
│  │  • Rule engine for XARF v4.0.0 spec                        │   │
│  │  • Category-specific validation                            │   │
│  │  • Pluggable custom rules                                  │   │
│  │  • IP, URL, email validators                               │   │
│  └───────────────────┬────────────────────────────────────────┘   │
│                      │                                             │
│                      │ uses                                        │
│                      ▼                                             │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                   Generator Component                       │   │
│  │                   (generator.go)                            │   │
│  │                                                             │   │
│  │  • Builder pattern for report creation                     │   │
│  │  • UUID and timestamp generation                           │   │
│  │  • Category-specific builders                              │   │
│  │  • Automatic validation before finalization                │   │
│  └───────────────────┬────────────────────────────────────────┘   │
│                      │                                             │
│                      │ creates                                     │
│                      ▼                                             │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                    Errors Component                         │   │
│  │                    (errors.go)                              │   │
│  │                                                             │   │
│  │  • ParseError, ValidationError, GeneratorError             │   │
│  │  • Error wrapping and context                              │   │
│  │  • Error predicates (IsParseError, etc.)                   │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

External Dependencies (Minimal):
┌────────────────────┐
│  Go Standard Lib   │
│  • encoding/json   │
│  • time            │
│  • net, net/url    │
│  • io              │
└────────────────────┘
```

---

## Level 3: Component Diagram - Parser

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Parser Component                             │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                    Parser Struct                            │   │
│  │                                                             │   │
│  │  Fields:                                                    │   │
│  │  • strict: bool                                             │   │
│  │  • errors: []error                                          │   │
│  │  • supportedCategories: map[string]bool                     │   │
│  └─────────────────────┬──────────────────────────────────────┘   │
│                        │                                            │
│                        │ methods                                    │
│                        ▼                                            │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                   Public API                                │   │
│  │                                                             │   │
│  │  • NewParser(opts ...ParseOption) *Parser                  │   │
│  │  • Parse(data []byte) (interface{}, error)                 │   │
│  │  • ParseFromReader(r io.Reader) (interface{}, error)       │   │
│  │  • ParseMessaging(data []byte) (*MessagingReport, error)   │   │
│  │  • ParseConnection(data []byte) (*ConnectionReport, error) │   │
│  │  • ParseContent(data []byte) (*ContentReport, error)       │   │
│  │  • Validate(data []byte) error                             │   │
│  │  • GetErrors() []error                                      │   │
│  └────────────────────┬───────────────────────────────────────┘   │
│                       │                                             │
│                       │ uses                                        │
│                       ▼                                             │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │               Option Functions                              │   │
│  │                                                             │   │
│  │  • WithStrictMode(strict bool) ParseOption                 │   │
│  │  • WithSupportedCategories(...string) ParseOption          │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  Processing Flow:                                                  │
│  ┌────┐   ┌────────┐   ┌─────────┐   ┌──────────┐   ┌────────┐  │
│  │JSON│──►│Unmarshal│──►│Validate │──►│Category  │──►│Typed   │  │
│  │Data│   │  JSON   │   │Structure│   │Detection │   │Report  │  │
│  └────┘   └────────┘   └─────────┘   └──────────┘   └────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Level 3: Component Diagram - Validator

```
┌─────────────────────────────────────────────────────────────────────┐
│                      Validator Component                            │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                   Validator Struct                          │   │
│  │                                                             │   │
│  │  Fields:                                                    │   │
│  │  • strict: bool                                             │   │
│  │  • errors: []ValidationError                                │   │
│  │  • rules: map[string]RuleSet                                │   │
│  │  • categoryRules: map[string]CategoryRuleSet                │   │
│  └─────────────────────┬──────────────────────────────────────┘   │
│                        │                                            │
│                        │ uses                                       │
│                        ▼                                            │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                  Validation Rules                           │   │
│  │                                                             │   │
│  │  Base Rules:                                                │   │
│  │  • ValidateXARFVersion(version string) error               │   │
│  │  • ValidateTimestamp(timestamp time.Time) error            │   │
│  │  • ValidateReporter(reporter Reporter) error               │   │
│  │  • ValidateCategory(category string) error                 │   │
│  │  • ValidateEvidenceSource(source string) error             │   │
│  │                                                             │   │
│  │  Field Validators:                                          │   │
│  │  • ValidateIP(ip string) error                             │   │
│  │  • ValidateURL(url string) error                           │   │
│  │  • ValidateEmail(email string) error                       │   │
│  │  • ValidateUUID(uuid string) error                         │   │
│  └────────────────────┬───────────────────────────────────────┘   │
│                       │                                             │
│                       │ executes                                    │
│                       ▼                                             │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │             Category-Specific Validators                    │   │
│  │                                                             │   │
│  │  • ValidateMessaging(report *MessagingReport) error        │   │
│  │    - Check protocol requirements                           │   │
│  │    - Validate email fields if protocol=smtp                │   │
│  │    - Check subject for spam/phishing                       │   │
│  │                                                             │   │
│  │  • ValidateConnection(report *ConnectionReport) error      │   │
│  │    - Validate destination IP                               │   │
│  │    - Check protocol field                                  │   │
│  │    - Validate port numbers                                 │   │
│  │                                                             │   │
│  │  • ValidateContent(report *ContentReport) error            │   │
│  │    - Validate URL field                                    │   │
│  │    - Check content type                                    │   │
│  │    - Validate affected pages                               │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  Validation Flow:                                                  │
│  ┌──────┐   ┌─────┐   ┌────────┐   ┌─────────┐   ┌────────┐     │
│  │Report│──►│Base │──►│Category│──►│Custom   │──►│Result  │     │
│  │      │   │Rules│   │Rules   │   │Rules    │   │        │     │
│  └──────┘   └─────┘   └────────┘   └─────────┘   └────────┘     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Level 3: Component Diagram - Generator

```
┌─────────────────────────────────────────────────────────────────────┐
│                      Generator Component                            │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                   Generator Struct                          │   │
│  │                                                             │   │
│  │  Fields:                                                    │   │
│  │  • validator: *Validator                                    │   │
│  │                                                             │   │
│  │  Methods:                                                   │   │
│  │  • NewReport() *ReportBuilder                              │   │
│  │  • NewMessagingReport() *MessagingReportBuilder            │   │
│  │  • NewConnectionReport() *ConnectionReportBuilder          │   │
│  │  • NewContentReport() *ContentReportBuilder                │   │
│  │  • GenerateSample(category, type string) (interface{}, error)│   │
│  └─────────────────────┬──────────────────────────────────────┘   │
│                        │                                            │
│                        │ creates                                    │
│                        ▼                                            │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                  ReportBuilder                              │   │
│  │                                                             │   │
│  │  Fields:                                                    │   │
│  │  • report: Report                                           │   │
│  │  • category: string                                         │   │
│  │  • reportType: string                                       │   │
│  │  • errors: []error                                          │   │
│  │                                                             │   │
│  │  Fluent API Methods:                                        │   │
│  │  • WithCategory(category string) *ReportBuilder            │   │
│  │  • WithType(reportType string) *ReportBuilder              │   │
│  │  • WithReporter(org, contact, type string) *ReportBuilder  │   │
│  │  • WithSourceIdentifier(source string) *ReportBuilder      │   │
│  │  • WithEvidenceSource(source string) *ReportBuilder        │   │
│  │  • WithEvidence(evidence Evidence) *ReportBuilder          │   │
│  │  • WithTags(tags ...string) *ReportBuilder                 │   │
│  │  • WithOnBehalfOf(org, contact string) *ReportBuilder      │   │
│  │  • Build() (interface{}, error)                            │   │
│  └────────────────────┬───────────────────────────────────────┘   │
│                       │                                             │
│                       │ uses                                        │
│                       ▼                                             │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                 Utility Functions                           │   │
│  │                                                             │   │
│  │  • GenerateUUID() string                                    │   │
│  │    - UUID v4 generation using crypto/rand                   │   │
│  │                                                             │   │
│  │  • GenerateTimestamp() time.Time                           │   │
│  │    - ISO 8601 UTC timestamp                                │   │
│  │                                                             │   │
│  │  • GenerateHash(data []byte, algorithm string) (string, error)│   │
│  │    - SHA-256, SHA-512, SHA-1, MD5 support                  │   │
│  │                                                             │   │
│  │  • AddEvidence(contentType, desc, payload string) Evidence │   │
│  │    - Automatic hash generation                             │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  Builder Pattern Flow:                                             │
│  ┌─────┐   ┌──────┐   ┌──────┐   ┌────────┐   ┌────────┐        │
│  │New  │──►│With* │──►│With* │──►│Validate│──►│Typed   │        │
│  │     │   │Methods│   │Methods│   │        │   │Report  │        │
│  └─────┘   └──────┘   └──────┘   └────────┘   └────────┘        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Level 4: Code Level - Types Structure

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Type Hierarchy                              │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                       Report (Base)                         │   │
│  │                                                             │   │
│  │  • XARFVersion: string                                      │   │
│  │  • ReportID: string                                         │   │
│  │  • Timestamp: time.Time                                     │   │
│  │  • Reporter: Reporter                                       │   │
│  │  • OnBehalfOf: *Reporter                                    │   │
│  │  • SourceIdentifier: string                                 │   │
│  │  • Category: string                                         │   │
│  │  • Type: string                                             │   │
│  │  • EvidenceSource: string                                   │   │
│  │  • Evidence: []Evidence                                     │   │
│  │  • Tags: []string                                           │   │
│  │  • Internal: map[string]any                                 │   │
│  │  • Additional: map[string]any                               │   │
│  └───────────┬────────────────────┬───────────────────────────┘   │
│              │                    │                                │
│              │ embedded in        │ embedded in                    │
│              ▼                    ▼                                │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐    │
│  │MessagingReport   │  │ConnectionReport  │  │ContentReport │    │
│  │                  │  │                  │  │              │    │
│  │• Protocol        │  │• DestinationIP   │  │• URL         │    │
│  │• SMTPFrom        │  │• Protocol        │  │• ContentType │    │
│  │• SMTPTo          │  │• DestinationPort │  │• AttackType  │    │
│  │• Subject         │  │• SourcePort      │  │• AffectedPages│   │
│  │• MessageID       │  │• AttackType      │  │• CMSPlatform │    │
│  │• SenderDisplay   │  │• DurationMinutes │  │• Vulnerability│   │
│  │• TargetVictim    │  │• PacketCount     │  │• Payload     │    │
│  │• MessageContent  │  │• ByteCount       │  │• DataExposed │    │
│  │                  │  │• AttemptCount    │  │• DatabaseType│    │
│  │                  │  │• SuccessfulLogins│  │• RecordsAffected│  │
│  │                  │  │• UsernamesAttempted│ │              │    │
│  │                  │  │• AttackPattern   │  │              │    │
│  └──────────────────┘  └──────────────────┘  └──────────────┘    │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                     Reporter                                │   │
│  │                                                             │   │
│  │  • Org: string                                              │   │
│  │  • Contact: string                                          │   │
│  │  • Type: string                                             │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                     Evidence                                │   │
│  │                                                             │   │
│  │  • ContentType: string                                      │   │
│  │  • Description: string                                      │   │
│  │  • Payload: string                                          │   │
│  │  • Hash: string                                             │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram - Parse and Validate

```
┌─────────────────────────────────────────────────────────────────────┐
│                       Parse and Validate Flow                       │
│                                                                     │
│  Input: JSON Data                                                  │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │ {                                                         │     │
│  │   "xarf_version": "4.0.0",                                │     │
│  │   "report_id": "uuid...",                                 │     │
│  │   "category": "connection",                               │     │
│  │   "type": "ddos",                                         │     │
│  │   ...                                                     │     │
│  │ }                                                         │     │
│  └──────────────────┬───────────────────────────────────────┘     │
│                     │                                              │
│                     │ 1. Parse                                     │
│                     ▼                                              │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │              Parser.Parse(data)                           │     │
│  │                                                           │     │
│  │  Step 1: Unmarshal JSON to map[string]interface{}        │     │
│  │  Step 2: Extract category field                          │     │
│  │  Step 3: Unmarshal to category-specific struct           │     │
│  │  Step 4: Populate fields with type safety                │     │
│  └──────────────────┬───────────────────────────────────────┘     │
│                     │                                              │
│                     │ 2. Validate Structure                        │
│                     ▼                                              │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │           Validator.Validate(report)                      │     │
│  │                                                           │     │
│  │  Check 1: Base fields (xarf_version, report_id, etc.)    │     │
│  │  Check 2: Reporter structure                             │     │
│  │  Check 3: Category-specific required fields              │     │
│  │  Check 4: Field format validations (IP, URL, email)      │     │
│  │  Check 5: Custom validation rules                        │     │
│  └──────────────────┬───────────────────────────────────────┘     │
│                     │                                              │
│                     │ 3. Return Result                             │
│                     ▼                                              │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │              Typed Report or Error                        │     │
│  │                                                           │     │
│  │  Success: *ConnectionReport with all fields              │     │
│  │  Error: ValidationError with detailed context            │     │
│  └──────────────────────────────────────────────────────────┘     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram - Generate Report

```
┌─────────────────────────────────────────────────────────────────────┐
│                       Report Generation Flow                        │
│                                                                     │
│  User Code:                                                        │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │ generator.NewConnectionReport().                          │     │
│  │   WithType("ddos").                                       │     │
│  │   WithReporter("SOC", "abuse@example.com", "automated").  │     │
│  │   WithSourceIdentifier("192.0.2.100").                    │     │
│  │   WithDestinationIP("203.0.113.1").                       │     │
│  │   WithProtocol("tcp").                                    │     │
│  │   Build()                                                 │     │
│  └──────────────────┬───────────────────────────────────────┘     │
│                     │                                              │
│                     │ 1. Create Builder                            │
│                     ▼                                              │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │         ConnectionReportBuilder                           │     │
│  │                                                           │     │
│  │  Internal State:                                          │     │
│  │  • Partial ConnectionReport struct                        │     │
│  │  • Validation errors list                                 │     │
│  │  • Category and type set                                  │     │
│  └──────────────────┬───────────────────────────────────────┘     │
│                     │                                              │
│                     │ 2. Apply Builder Methods                     │
│                     ▼                                              │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │           Method Chaining                                 │     │
│  │                                                           │     │
│  │  Each With*() method:                                     │     │
│  │  • Sets field on internal report                          │     │
│  │  • Validates input if needed                              │     │
│  │  • Returns *Builder for chaining                          │     │
│  └──────────────────┬───────────────────────────────────────┘     │
│                     │                                              │
│                     │ 3. Build() Called                            │
│                     ▼                                              │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │               Build Process                               │     │
│  │                                                           │     │
│  │  Step 1: Auto-generate UUID (report_id)                  │     │
│  │  Step 2: Auto-generate timestamp                         │     │
│  │  Step 3: Set xarf_version = "4.0.0"                      │     │
│  │  Step 4: Validate all required fields present            │     │
│  │  Step 5: Run validator on complete report                │     │
│  │  Step 6: Return typed report or error                    │     │
│  └──────────────────┬───────────────────────────────────────┘     │
│                     │                                              │
│                     │ 4. Return Result                             │
│                     ▼                                              │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │         *ConnectionReport + error                         │     │
│  │                                                           │     │
│  │  Success: Fully populated, validated ConnectionReport    │     │
│  │  Error: GeneratorError with missing/invalid fields       │     │
│  └──────────────────────────────────────────────────────────┘     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Deployment Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Deployment View                              │
│                                                                     │
│  Developer Environment:                                            │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                   Local Development                         │   │
│  │                                                             │   │
│  │  ┌──────────────────────────────────────────────────┐      │   │
│  │  │  IDE / Editor                                     │      │   │
│  │  │  • VSCode with Go extension                       │      │   │
│  │  │  • GoLand                                         │      │   │
│  │  └──────────────────────────────────────────────────┘      │   │
│  │                      │                                      │   │
│  │                      │ uses                                 │   │
│  │                      ▼                                      │   │
│  │  ┌──────────────────────────────────────────────────┐      │   │
│  │  │  xarf-go Library Source                           │      │   │
│  │  │  • types.go, parser.go, validator.go, etc.        │      │   │
│  │  │  • Test files with testdata/                      │      │   │
│  │  └──────────────────────────────────────────────────┘      │   │
│  │                      │                                      │   │
│  │                      │ builds                               │   │
│  │                      ▼                                      │   │
│  │  ┌──────────────────────────────────────────────────┐      │   │
│  │  │  Local Tools                                      │      │   │
│  │  │  • golangci-lint                                  │      │   │
│  │  │  • go test                                        │      │   │
│  │  │  • pre-commit hooks                               │      │   │
│  │  └──────────────────────────────────────────────────┘      │   │
│  └────────────────────────────────────────────────────────────┘   │
│                      │                                             │
│                      │ push                                        │
│                      ▼                                             │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                   GitHub Repository                         │   │
│  │          github.com/xarf/xarf-go                            │   │
│  │                                                             │   │
│  │  ┌──────────────────────────────────────────────────┐      │   │
│  │  │  Source Code                                      │      │   │
│  │  │  • Main branch (stable)                           │      │   │
│  │  │  • Develop branch (active development)            │      │   │
│  │  │  • Feature branches                               │      │   │
│  │  └──────────────────────────────────────────────────┘      │   │
│  │                      │                                      │   │
│  │                      │ triggers                             │   │
│  │                      ▼                                      │   │
│  │  ┌──────────────────────────────────────────────────┐      │   │
│  │  │  GitHub Actions CI/CD                             │      │   │
│  │  │  • Lint workflow (golangci-lint)                  │      │   │
│  │  │  • Test workflow (Go 1.21, 1.22)                  │      │   │
│  │  │  • Security workflow (gosec)                      │      │   │
│  │  │  • Build workflow                                 │      │   │
│  │  │  • Coverage reporting (Codecov)                   │      │   │
│  │  └──────────────────────────────────────────────────┘      │   │
│  └────────────────────────────────────────────────────────────┘   │
│                      │                                             │
│                      │ publishes                                   │
│                      ▼                                             │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                   Distribution                              │   │
│  │                                                             │   │
│  │  ┌──────────────────────────────────────────────────┐      │   │
│  │  │  pkg.go.dev                                       │      │   │
│  │  │  • API documentation                              │      │   │
│  │  │  • Example code                                   │      │   │
│  │  │  • Version history                                │      │   │
│  │  └──────────────────────────────────────────────────┘      │   │
│  │                                                             │   │
│  │  ┌──────────────────────────────────────────────────┐      │   │
│  │  │  Go Module Proxy                                  │      │   │
│  │  │  • Binary distribution                            │      │   │
│  │  │  • Checksum database                              │      │   │
│  │  └──────────────────────────────────────────────────┘      │   │
│  └────────────────────────────────────────────────────────────┘   │
│                      │                                             │
│                      │ imported by                                 │
│                      ▼                                             │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                   Consumer Applications                     │   │
│  │                                                             │   │
│  │  • Abuse reporting systems                                 │   │
│  │  • Security operation centers                              │   │
│  │  • Network monitoring tools                                │   │
│  │  • Threat intelligence platforms                           │   │
│  │                                                             │   │
│  │  Import: import "github.com/xarf/xarf-go"                  │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Summary

These C4 diagrams provide a comprehensive view of the xarf-go library architecture:

1. **System Context**: Shows how xarf-go fits in the XARF ecosystem
2. **Container**: Details the main components and their relationships
3. **Component**: Deep dive into Parser, Validator, and Generator internals
4. **Code**: Type hierarchy and structure definitions
5. **Data Flow**: Parse/Validate and Generate workflows
6. **Deployment**: Development to production distribution pipeline

The architecture emphasizes:
- **Clean separation of concerns** between parsing, validation, and generation
- **Type safety** through Go's compile-time type system
- **Composability** via struct embedding for category-specific reports
- **Testability** through clear component boundaries
- **Quality** through automated CI/CD with comprehensive linting and testing

For the full detailed specification, see: `xarf-go-architecture.md`
