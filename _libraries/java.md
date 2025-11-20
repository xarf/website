---
layout: library
title: "Java Library - xarf-java"
description: "Official Java library for creating, validating, and processing XARF reports"
permalink: /libraries/java/
---

# XARF Java Library

<span class="status-badge coming-soon">Planned Q3 2024</span>

Official Java library for creating, validating, and processing XARF (eXtended Abuse Reporting Format) reports.

<div class="alert alert-warning">
  <strong>Status:</strong> This library is planned for future release. The API design below is preliminary and subject to change. <strong>Star the <a href="https://github.com/xarf/xarf-java">GitHub repository</a> for updates.</strong>
</div>

<div class="library-status">
  <span class="badge badge-warning">Planned</span>
  <span>Target Version 1.0.0</span>
  <span>Java 11+</span>
</div>

---

## Installation

### Maven
```xml
<dependency>
    <groupId>org.xarf</groupId>
    <artifactId>xarf-java</artifactId>
    <version>1.0.0</version>
</dependency>
```

### Gradle
```groovy
implementation 'org.xarf:xarf-java:1.0.0'
```

### Gradle (Kotlin DSL)
```kotlin
implementation("org.xarf:xarf-java:1.0.0")
```

**Requirements**:
- Java 11 or higher
- Dependencies: Jackson for JSON processing, Jakarta Bean Validation

**Note**: Package coming Q3 2024. Star the [GitHub repository](https://github.com/xarf/xarf-java) for updates.

---

## Quick Start

### Creating a Report

```java
import org.xarf.XARFReport;
import org.xarf.Reporter;
import java.time.Instant;
import java.util.UUID;

// Create a new XARF report using builder pattern
XARFReport report = XARFReport.builder()
    .xarfVersion("4.0.0")
    .reportId(UUID.randomUUID().toString())
    .timestamp(Instant.now().toString())
    .reporter(Reporter.builder()
        .org("Security Operations")
        .contact("abuse@example.com")
        .type("automated")
        .build())
    .sourceIdentifier("192.0.2.100")
    .classification("abuse")
    .type("ddos")
    .description("DDoS attack detected from source IP")
    .build();

// Validate
if (report.validate()) {
    System.out.println("✓ Report is valid!");
}

// Export to JSON
String json = report.toJson();
System.out.println(json);
```

### Loading from JSON

```java
import org.xarf.XARFReport;
import java.nio.file.Files;
import java.nio.file.Paths;

// Load from JSON string
String jsonData = "{\"xarf_version\": \"4.0.0\", ...}";
XARFReport report = XARFReport.fromJson(jsonData);

// Load from file
String fileContent = Files.readString(Paths.get("report.json"));
XARFReport report = XARFReport.fromJson(fileContent);

// Validate
if (report.validate()) {
    System.out.println("Loaded report: " + report.getReportId());
}
```

---

## Core Features

- **Builder Pattern** - Fluent API for creating reports
- **Bean Validation** - JSR-380 validation annotations
- **Jackson Integration** - Native Jackson JSON support
- **Evidence Handling** - Base64 encoding, hashing (SHA-256/SHA-512), and verification
- **Format Conversion** - JSON serialization/deserialization
- **Type Safety** - Strongly-typed Java classes
- **Spring Boot Support** - Autoconfiguration and starters (planned)
- **Enterprise Ready** - Thread-safe, production-grade features

---

## API Reference

### XARFReport Class

Main class for creating and manipulating XARF reports.

#### Builder Pattern

```java
XARFReport report = XARFReport.builder()
    .xarfVersion("4.0.0")
    .reportId(UUID.randomUUID().toString())
    .timestamp(Instant.now().toString())
    .reporter(Reporter.builder()
        .org("Security Operations")
        .contact("abuse@example.com")
        .type("automated")
        .build())
    .sourceIdentifier("192.0.2.100")
    .classification("abuse")
    .type("ddos")
    .severity("high")
    .description("Attack description")
    .build();
```

#### Methods

##### `validate(): boolean`

Validate the report against the JSON schema.

```java
if (!report.validate()) {
    List<String> errors = report.getValidationErrors();
    errors.forEach(System.err::println);
}
```

**Returns**: `boolean` - true if valid, false otherwise

##### `toJson(): String`

Export report to JSON string.

```java
String json = report.toJson();
```

**Returns**: `String` - JSON representation

##### `toJsonPretty(): String`

Export report to pretty-printed JSON.

```java
String json = report.toJsonPretty();
```

**Returns**: `String` - Pretty-printed JSON

##### `static fromJson(String json): XARFReport`

Create report from JSON string.

```java
XARFReport report = XARFReport.fromJson(jsonString);
```

**Parameters**:
- `json` (String): JSON string

**Returns**: `XARFReport` instance

**Throws**: `XARFParseException` if JSON is invalid

##### `addEvidence(Evidence evidence): void`

Add evidence to the report.

```java
Evidence evidence = Evidence.builder()
    .contentType("text/plain")
    .description("Server logs")
    .payload("YmFzZTY0IGVuY29kZWQgZGF0YQ==")
    .hash(Hash.builder()
        .algorithm("sha256")
        .value("abc123...")
        .build())
    .build();

report.addEvidence(evidence);
```

### Reporter Class

```java
Reporter reporter = Reporter.builder()
    .org("Security Team")
    .contact("abuse@example.com")
    .type("automated")
    .url("https://security.example.com")
    .build();
```

### Evidence Class

```java
Evidence evidence = Evidence.builder()
    .contentType("application/pdf")
    .description("Screenshot of phishing email")
    .payload(base64EncodedData)
    .hash(Hash.builder()
        .algorithm("sha256")
        .value(hashValue)
        .build())
    .timestamp(Instant.now().toString())
    .build();
```

### XARFValidator Class

```java
XARFValidator validator = new XARFValidator();
ValidationResult result = validator.validate(report);

if (!result.isValid()) {
    result.getErrors().forEach(error ->
        System.err.println(error.getField() + ": " + error.getMessage())
    );
}
```

### XARFException Classes

```java
try {
    XARFReport report = XARFReport.fromJson(jsonData);
    report.validate();
} catch (XARFParseException e) {
    // Handle JSON parsing error
} catch (XARFValidationException e) {
    // Handle validation error
} catch (XARFException e) {
    // Handle general XARF error
}
```

---

## Examples

### Creating a DDoS Report

```java
import org.xarf.*;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class DDoSReportExample {
    public static XARFReport createReport() {
        Map<String, Object> technicalDetails = new HashMap<>();
        technicalDetails.put("protocol", "UDP");
        technicalDetails.put("port", 53);
        technicalDetails.put("packets_per_second", 150000);
        technicalDetails.put("bandwidth_mbps", 1200);
        technicalDetails.put("attack_duration_seconds", 300);

        return XARFReport.builder()
            .xarfVersion("4.0.0")
            .reportId(UUID.randomUUID().toString())
            .timestamp(Instant.now().toString())
            .reporter(Reporter.builder()
                .org("Network Security Team")
                .contact("noc@example.com")
                .type("automated")
                .build())
            .sourceIdentifier("203.0.113.50")
            .classification("abuse")
            .type("ddos")
            .severity("high")
            .description("Volumetric DDoS attack detected")
            .technicalDetails(technicalDetails)
            .build();
    }
}
```

### Adding Evidence

```java
import org.xarf.*;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.util.Base64;

public class EvidenceExample {
    public static Evidence createEvidenceFromFile(String filePath)
            throws IOException {
        byte[] fileBytes = Files.readAllBytes(Paths.get(filePath));

        // Calculate SHA-256 hash
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hashBytes = digest.digest(fileBytes);
        String hashValue = bytesToHex(hashBytes);

        // Encode to Base64
        String payload = Base64.getEncoder().encodeToString(fileBytes);

        return Evidence.builder()
            .contentType("application/octet-stream")
            .description("Evidence from file")
            .payload(payload)
            .hash(Hash.builder()
                .algorithm("sha256")
                .value(hashValue)
                .build())
            .timestamp(Instant.now().toString())
            .build();
    }

    private static String bytesToHex(byte[] bytes) {
        StringBuilder result = new StringBuilder();
        for (byte b : bytes) {
            result.append(String.format("%02x", b));
        }
        return result.toString();
    }
}
```

### Batch Validation

```java
import org.xarf.*;
import java.util.List;
import java.util.ArrayList;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

public class BatchValidator {
    private final XARFValidator validator = new XARFValidator();

    public ValidationResults validateBatch(List<String> jsonReports) {
        List<XARFReport> validReports = new ArrayList<>();
        List<ValidationError> errors = new ArrayList<>();

        for (String json : jsonReports) {
            try {
                XARFReport report = XARFReport.fromJson(json);
                ValidationResult result = validator.validate(report);

                if (result.isValid()) {
                    validReports.add(report);
                } else {
                    errors.addAll(result.getErrors());
                }
            } catch (XARFParseException e) {
                errors.add(new ValidationError("parse_error", e.getMessage()));
            }
        }

        return new ValidationResults(validReports, errors);
    }

    // Async batch validation
    public CompletableFuture<ValidationResults> validateBatchAsync(
            List<String> jsonReports) {
        return CompletableFuture.supplyAsync(() -> validateBatch(jsonReports));
    }
}
```

### Custom Fields

```java
Map<String, Object> customFields = new HashMap<>();
customFields.put("custom_tracking_id", "TICKET-12345");
customFields.put("internal_severity_score", 8.5);
customFields.put("automated_response", true);

XARFReport report = XARFReport.builder()
    .xarfVersion("4.0.0")
    .reportId(UUID.randomUUID().toString())
    .timestamp(Instant.now().toString())
    .reporter(Reporter.builder()
        .org("Security Team")
        .contact("abuse@example.com")
        .type("automated")
        .build())
    .sourceIdentifier("192.0.2.100")
    .classification("abuse")
    .type("spam")
    .technicalDetails(customFields)
    .build();
```

---

## Integration Examples

### Spring Boot REST API

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.xarf.*;

@SpringBootApplication
public class XARFApplication {
    public static void main(String[] args) {
        SpringApplication.run(XARFApplication.class, args);
    }
}

@RestController
@RequestMapping("/api/xarf")
public class XARFController {

    private final XARFService xarfService;

    public XARFController(XARFService xarfService) {
        this.xarfService = xarfService;
    }

    @PostMapping("/submit")
    public ResponseEntity<?> submitReport(@RequestBody String reportJson) {
        try {
            XARFReport report = XARFReport.fromJson(reportJson);

            if (!report.validate()) {
                return ResponseEntity
                    .badRequest()
                    .body(Map.of(
                        "status", "invalid",
                        "errors", report.getValidationErrors()
                    ));
            }

            xarfService.processReport(report);

            return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(Map.of(
                    "status", "accepted",
                    "report_id", report.getReportId()
                ));

        } catch (XARFParseException e) {
            return ResponseEntity
                .badRequest()
                .body(Map.of("error", "Invalid JSON"));
        }
    }
}
```

### JPA Entity

```java
import javax.persistence.*;
import org.xarf.XARFReport;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "abuse_reports")
public class AbuseReportEntity {

    @Id
    private UUID reportId;

    private Instant timestamp;

    private String classification;

    private String type;

    private String sourceIdentifier;

    @Column(columnDefinition = "jsonb")
    private String xarfData;

    private boolean processed = false;

    public static AbuseReportEntity fromXARF(XARFReport report) {
        AbuseReportEntity entity = new AbuseReportEntity();
        entity.setReportId(UUID.fromString(report.getReportId()));
        entity.setTimestamp(Instant.parse(report.getTimestamp()));
        entity.setClassification(report.getClassification());
        entity.setType(report.getType());
        entity.setSourceIdentifier(report.getSourceIdentifier());
        entity.setXarfData(report.toJson());
        return entity;
    }

    public XARFReport toXARF() {
        return XARFReport.fromJson(xarfData);
    }

    // Getters and setters omitted
}
```

### Kafka Consumer

```java
import org.apache.kafka.clients.consumer.*;
import org.xarf.XARFReport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class XARFKafkaConsumer {
    private static final Logger logger =
        LoggerFactory.getLogger(XARFKafkaConsumer.class);

    private final Consumer<String, String> consumer;
    private final XARFService xarfService;

    public XARFKafkaConsumer(Consumer<String, String> consumer,
                             XARFService xarfService) {
        this.consumer = consumer;
        this.xarfService = xarfService;
    }

    public void consumeReports() {
        consumer.subscribe(Collections.singletonList("xarf-reports"));

        while (true) {
            ConsumerRecords<String, String> records =
                consumer.poll(Duration.ofMillis(100));

            for (ConsumerRecord<String, String> record : records) {
                try {
                    XARFReport report = XARFReport.fromJson(record.value());

                    if (report.validate()) {
                        xarfService.processReport(report);
                        logger.info("Processed report: {}", report.getReportId());
                    } else {
                        logger.error("Invalid report: {}",
                            report.getValidationErrors());
                    }
                } catch (Exception e) {
                    logger.error("Error processing record", e);
                }
            }
        }
    }
}
```

### JUnit Test

```java
import org.junit.jupiter.api.Test;
import org.xarf.*;
import java.time.Instant;
import java.util.UUID;
import static org.junit.jupiter.api.Assertions.*;

class XARFReportTest {

    @Test
    void testCreateValidReport() {
        XARFReport report = XARFReport.builder()
            .xarfVersion("4.0.0")
            .reportId(UUID.randomUUID().toString())
            .timestamp(Instant.now().toString())
            .reporter(Reporter.builder()
                .org("Test Security")
                .contact("test@example.com")
                .type("automated")
                .build())
            .sourceIdentifier("192.0.2.100")
            .classification("abuse")
            .type("ddos")
            .build();

        assertTrue(report.validate(), "Report should be valid");
    }

    @Test
    void testMissingMandatoryField() {
        XARFReport report = XARFReport.builder()
            .xarfVersion("4.0.0")
            // Missing reportId
            .timestamp(Instant.now().toString())
            .build();

        assertFalse(report.validate(), "Report should be invalid");
        assertTrue(report.getValidationErrors().size() > 0);
    }

    @Test
    void testJsonRoundtrip() {
        XARFReport report1 = XARFReport.builder()
            .xarfVersion("4.0.0")
            .reportId(UUID.randomUUID().toString())
            .timestamp(Instant.now().toString())
            .reporter(Reporter.builder()
                .org("Test")
                .contact("test@test.com")
                .type("automated")
                .build())
            .sourceIdentifier("192.0.2.100")
            .classification("abuse")
            .type("spam")
            .build();

        String json = report1.toJson();
        XARFReport report2 = XARFReport.fromJson(json);

        assertEquals(report1.getReportId(), report2.getReportId());
        assertEquals(report1.getClassification(), report2.getClassification());
    }
}
```

---

## Best Practices

### 1. Always Validate

```java
// ✓ GOOD
XARFReport report = XARFReport.fromJson(jsonData);
if (report.validate()) {
    processReport(report);
} else {
    handleValidationErrors(report.getValidationErrors());
}

// ✗ BAD
XARFReport report = XARFReport.fromJson(jsonData);
processReport(report); // No validation!
```

### 2. Use Builder Pattern

```java
// ✓ GOOD
XARFReport report = XARFReport.builder()
    .xarfVersion("4.0.0")
    .reportId(UUID.randomUUID().toString())
    // ...
    .build();

// ✗ BAD
XARFReport report = new XARFReport();
report.setXarfVersion("4.0.0");
report.setReportId(UUID.randomUUID().toString());
// Verbose and error-prone
```

### 3. Handle Exceptions Properly

```java
// ✓ GOOD
try {
    XARFReport report = XARFReport.fromJson(jsonData);
    if (!report.validate()) {
        logger.error("Validation failed: {}", report.getValidationErrors());
        return ResponseEntity.badRequest().body(report.getValidationErrors());
    }
} catch (XARFParseException e) {
    logger.error("Parse error", e);
    return ResponseEntity.badRequest().body("Invalid JSON");
}

// ✗ BAD
XARFReport report = XARFReport.fromJson(jsonData);
report.validate(); // Exceptions not handled
```

### 4. Use Try-With-Resources

```java
// ✓ GOOD
try (InputStream is = Files.newInputStream(Paths.get("report.json"))) {
    String json = new String(is.readAllBytes());
    XARFReport report = XARFReport.fromJson(json);
}

// ✗ BAD
InputStream is = Files.newInputStream(Paths.get("report.json"));
String json = new String(is.readAllBytes());
is.close(); // Manual close - might leak
```

---

## Resources

- **[GitHub Repository](https://github.com/xarf/xarf-java)** - Coming Soon
- **[Maven Central](https://central.sonatype.com/artifact/org.xarf/xarf-java)** - Planned
- **[Javadoc](https://javadoc.io/doc/org.xarf/xarf-java)** - In Development
- **[Examples](https://github.com/xarf/xarf-java/tree/main/examples)** - Coming Soon
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
