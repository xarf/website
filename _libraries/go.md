---
layout: library
title: "Go Library - xarf-go"
description: "Official Go library for creating, validating, and processing XARF reports"
permalink: /libraries/go/
---

# XARF Go Library

<span class="status-badge coming-soon">Planned Q2 2024</span>

Official Go library for creating, validating, and processing XARF (eXtended Abuse Reporting Format) reports.

<div class="alert alert-warning">
  <strong>Status:</strong> This library is planned for future release. The API design below is preliminary and subject to change. <strong>Star the <a href="https://github.com/xarf/xarf-go">GitHub repository</a> for updates.</strong>
</div>

<div class="library-status">
  <span class="badge badge-warning">Planned</span>
  <span>Target Version 1.0.0</span>
  <span>Go 1.19+</span>
</div>

---

## Installation

```bash
go get github.com/xarf/xarf-go
```

**Requirements**:
- Go 1.19 or higher
- No external dependencies (uses Go standard library only)

**Note**: Package coming Q2 2024. Star the [GitHub repository](https://github.com/xarf/xarf-go) for updates.

---

## Quick Start

### Creating a Report

```go
package main

import (
    "fmt"
    "time"

    "github.com/xarf/xarf-go"
)

func main() {
    // Create a new XARF report
    report := xarf.NewReport(xarf.ReportConfig{
        XARFVersion:      "4.0.0",
        ReportID:         "550e8400-e29b-41d4-a716-446655440000",
        Timestamp:        time.Now().UTC().Format(time.RFC3339),
        Reporter: xarf.Reporter{
            Org:     "Security Operations",
            Contact: "abuse@example.com",
            Type:    "automated",
        },
        SourceIdentifier: "192.0.2.100",
        Classification:   "abuse",
        Type:            "ddos",
        Description:     "DDoS attack detected from source IP",
    })

    // Validate
    if err := report.Validate(); err != nil {
        fmt.Printf("Validation error: %v\n", err)
        return
    }

    fmt.Println("✓ Report is valid!")

    // Export to JSON
    jsonData, err := report.MarshalJSON()
    if err != nil {
        fmt.Printf("Marshal error: %v\n", err)
        return
    }

    fmt.Printf("%s\n", jsonData)
}
```

### Loading from JSON

```go
package main

import (
    "fmt"
    "os"

    "github.com/xarf/xarf-go"
)

func main() {
    // Load from JSON string
    jsonData := `{"xarf_version": "4.0.0", ...}`
    report, err := xarf.UnmarshalJSON([]byte(jsonData))
    if err != nil {
        fmt.Printf("Parse error: %v\n", err)
        return
    }

    // Load from file
    data, err := os.ReadFile("report.json")
    if err != nil {
        fmt.Printf("Read error: %v\n", err)
        return
    }

    report, err = xarf.UnmarshalJSON(data)
    if err != nil {
        fmt.Printf("Parse error: %v\n", err)
        return
    }

    // Validate
    if err := report.Validate(); err == nil {
        fmt.Printf("Loaded report: %s\n", report.ReportID)
    }
}
```

---

## Core Features

- **Report Creation and Validation** - Struct-based API with full validation
- **Schema Validation** - Validates against XARF 4.0 JSON schema
- **Evidence Handling** - Base64 encoding, hashing (SHA-256/SHA-512), and verification
- **Format Conversion** - JSON marshaling/unmarshaling with proper error handling
- **Type Safety** - Strongly-typed Go structs
- **Zero Dependencies** - Uses only Go standard library
- **Concurrent Processing** - Goroutine-safe operations
- **Context Support** - Context-aware processing for cancellation and timeouts

---

## API Reference

### Report Type

Main struct for creating and manipulating XARF reports.

```go
type Report struct {
    XARFVersion      string                 `json:"xarf_version"`
    ReportID         string                 `json:"report_id"`
    Timestamp        string                 `json:"timestamp"`
    Reporter         Reporter               `json:"reporter"`
    SourceIdentifier string                 `json:"source_identifier"`
    Classification   string                 `json:"classification"`
    Type             string                 `json:"type"`
    Description      string                 `json:"description,omitempty"`
    Severity         string                 `json:"severity,omitempty"`
    Evidence         []Evidence             `json:"evidence,omitempty"`
    TechnicalDetails map[string]interface{} `json:"technical_details,omitempty"`
}

type Reporter struct {
    Org     string `json:"org"`
    Contact string `json:"contact"`
    Type    string `json:"type"`
    URL     string `json:"url,omitempty"`
}

type Evidence struct {
    ContentType string                 `json:"content_type"`
    Description string                 `json:"description"`
    Payload     string                 `json:"payload"`
    Hash        *Hash                  `json:"hash,omitempty"`
    Timestamp   string                 `json:"timestamp,omitempty"`
}

type Hash struct {
    Algorithm string `json:"algorithm"`
    Value     string `json:"value"`
}
```

### Functions

#### `NewReport(config ReportConfig) *Report`

Create a new XARF report.

```go
report := xarf.NewReport(xarf.ReportConfig{
    XARFVersion:      "4.0.0",
    ReportID:         "550e8400-e29b-41d4-a716-446655440000",
    Timestamp:        time.Now().UTC().Format(time.RFC3339),
    Reporter: xarf.Reporter{
        Org:     "Security Ops",
        Contact: "abuse@example.com",
        Type:    "automated",
    },
    SourceIdentifier: "192.0.2.100",
    Classification:   "abuse",
    Type:            "ddos",
})
```

#### `(*Report) Validate() error`

Validate the report against the JSON schema.

```go
if err := report.Validate(); err != nil {
    log.Printf("Validation failed: %v", err)
    return err
}
```

**Returns**: `error` - nil if valid, error describing validation failures

#### `(*Report) MarshalJSON() ([]byte, error)`

Export report to JSON bytes.

```go
jsonData, err := report.MarshalJSON()
if err != nil {
    return err
}
fmt.Printf("%s\n", jsonData)
```

**Returns**: `([]byte, error)` - JSON bytes and error

#### `(*Report) MarshalIndent() ([]byte, error)`

Export report to pretty-printed JSON.

```go
jsonData, err := report.MarshalIndent()
if err != nil {
    return err
}
```

**Returns**: `([]byte, error)` - Pretty-printed JSON bytes

#### `UnmarshalJSON(data []byte) (*Report, error)`

Create report from JSON bytes.

```go
report, err := xarf.UnmarshalJSON(jsonData)
if err != nil {
    return nil, err
}
```

**Returns**: `(*Report, error)` - Report and error

#### `(*Report) AddEvidence(evidence Evidence)`

Add evidence to the report.

```go
report.AddEvidence(xarf.Evidence{
    ContentType: "text/plain",
    Description: "Server logs",
    Payload:     "YmFzZTY0IGVuY29kZWQgZGF0YQ==",
    Hash: &xarf.Hash{
        Algorithm: "sha256",
        Value:     "abc123...",
    },
})
```

### Validator Type

Validates XARF reports.

```go
validator := xarf.NewValidator()
if err := validator.Validate(report); err != nil {
    log.Printf("Invalid: %v", err)
}
```

### EvidenceHelper Type

Handles evidence creation and verification.

```go
evidence, err := xarf.CreateEvidenceFromFile("./evidence.pdf")
if err != nil {
    log.Fatal(err)
}
```

### Error Types

```go
var (
    ErrInvalidJSON   = errors.New("invalid JSON")
    ErrValidation    = errors.New("validation failed")
    ErrMissingField  = errors.New("missing required field")
)
```

---

## Examples

### Creating a DDoS Report

```go
import (
    "time"
    "github.com/xarf/xarf-go"
)

func createDDoSReport() (*xarf.Report, error) {
    report := xarf.NewReport(xarf.ReportConfig{
        XARFVersion:      "4.0.0",
        ReportID:         generateUUID(),
        Timestamp:        time.Now().UTC().Format(time.RFC3339),
        Reporter: xarf.Reporter{
            Org:     "Network Security Team",
            Contact: "noc@example.com",
            Type:    "automated",
        },
        SourceIdentifier: "203.0.113.50",
        Classification:   "abuse",
        Type:            "ddos",
        Severity:        "high",
        Description:     "Volumetric DDoS attack detected",
    })

    // Add technical details
    report.TechnicalDetails = map[string]interface{}{
        "protocol":              "UDP",
        "port":                  53,
        "packets_per_second":    150000,
        "bandwidth_mbps":        1200,
        "attack_duration_seconds": 300,
    }

    if err := report.Validate(); err != nil {
        return nil, err
    }

    return report, nil
}
```

### Adding Evidence

```go
import (
    "crypto/sha256"
    "encoding/base64"
    "io"
    "os"
)

func createEvidenceFromFile(filename string) (*xarf.Evidence, error) {
    // Read file
    file, err := os.Open(filename)
    if err != nil {
        return nil, err
    }
    defer file.Close()

    // Calculate hash and read data
    hash := sha256.New()
    data, err := io.ReadAll(io.TeeReader(file, hash))
    if err != nil {
        return nil, err
    }

    // Encode to base64
    payload := base64.StdEncoding.EncodeToString(data)

    return &xarf.Evidence{
        ContentType: "application/octet-stream",
        Description: "Evidence from file",
        Payload:     payload,
        Hash: &xarf.Hash{
            Algorithm: "sha256",
            Value:     fmt.Sprintf("%x", hash.Sum(nil)),
        },
        Timestamp: time.Now().UTC().Format(time.RFC3339),
    }, nil
}
```

### Batch Validation

```go
type BatchProcessor struct {
    reports []*xarf.Report
    mu      sync.RWMutex
}

func NewBatchProcessor() *BatchProcessor {
    return &BatchProcessor{
        reports: make([]*xarf.Report, 0),
    }
}

func (bp *BatchProcessor) AddReport(jsonData []byte) error {
    report, err := xarf.UnmarshalJSON(jsonData)
    if err != nil {
        return err
    }

    bp.mu.Lock()
    bp.reports = append(bp.reports, report)
    bp.mu.Unlock()

    return nil
}

func (bp *BatchProcessor) ValidateAll() (valid, invalid []*xarf.Report) {
    bp.mu.RLock()
    defer bp.mu.RUnlock()

    for _, report := range bp.reports {
        if err := report.Validate(); err == nil {
            valid = append(valid, report)
        } else {
            invalid = append(invalid, report)
        }
    }

    return valid, invalid
}
```

### Custom Fields

```go
report := xarf.NewReport(xarf.ReportConfig{
    XARFVersion:      "4.0.0",
    ReportID:         generateUUID(),
    Timestamp:        time.Now().UTC().Format(time.RFC3339),
    Reporter: xarf.Reporter{
        Org:     "Security Team",
        Contact: "abuse@example.com",
        Type:    "automated",
    },
    SourceIdentifier: "192.0.2.100",
    Classification:   "abuse",
    Type:            "spam",
})

// Add custom fields via TechnicalDetails
report.TechnicalDetails = map[string]interface{}{
    "custom_tracking_id":       "TICKET-12345",
    "internal_severity_score":  8.5,
    "automated_response":       true,
}
```

---

## Advanced Usage

### Concurrent Processing

Process reports concurrently using goroutines:

```go
func processReports(files []string) error {
    var wg sync.WaitGroup
    errors := make(chan error, len(files))

    for _, file := range files {
        wg.Add(1)
        go func(filename string) {
            defer wg.Done()

            data, err := os.ReadFile(filename)
            if err != nil {
                errors <- fmt.Errorf("%s: %w", filename, err)
                return
            }

            report, err := xarf.UnmarshalJSON(data)
            if err != nil {
                errors <- fmt.Errorf("%s: %w", filename, err)
                return
            }

            if err := report.Validate(); err != nil {
                errors <- fmt.Errorf("%s: %w", filename, err)
                return
            }

            if err := handleReport(report); err != nil {
                errors <- err
            }
        }(file)
    }

    wg.Wait()
    close(errors)

    for err := range errors {
        log.Printf("Error: %v", err)
    }

    return nil
}
```

### Context-Aware Processing

Use context for cancellation and timeouts:

```go
func processReportWithContext(ctx context.Context, report *xarf.Report) error {
    // Create a channel for the result
    done := make(chan error, 1)

    go func() {
        if err := report.Validate(); err != nil {
            done <- err
            return
        }

        if err := submitReport(report); err != nil {
            done <- err
            return
        }

        done <- nil
    }()

    select {
    case <-ctx.Done():
        return ctx.Err()
    case err := <-done:
        return err
    }
}

// Usage
ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
defer cancel()

if err := processReportWithContext(ctx, report); err != nil {
    log.Printf("Processing failed: %v", err)
}
```

---

## Integration Examples

### HTTP Server

```go
package main

import (
    "encoding/json"
    "io"
    "log"
    "net/http"

    "github.com/xarf/xarf-go"
)

func main() {
    http.HandleFunc("/xarf/submit", submitHandler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}

func submitHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodPost {
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
        return
    }

    // Read body
    body, err := io.ReadAll(r.Body)
    if err != nil {
        http.Error(w, "Failed to read body", http.StatusBadRequest)
        return
    }
    defer r.Body.Close()

    // Parse report
    report, err := xarf.UnmarshalJSON(body)
    if err != nil {
        http.Error(w, "Invalid JSON", http.StatusBadRequest)
        return
    }

    // Validate
    if err := report.Validate(); err != nil {
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(http.StatusBadRequest)
        json.NewEncoder(w).Encode(map[string]string{
            "status": "invalid",
            "error":  err.Error(),
        })
        return
    }

    // Process
    if err := processAbuseReport(report); err != nil {
        http.Error(w, "Processing failed", http.StatusInternalServerError)
        return
    }

    // Response
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusAccepted)
    json.NewEncoder(w).Encode(map[string]string{
        "status":    "accepted",
        "report_id": report.ReportID,
    })
}

func processAbuseReport(report *xarf.Report) error {
    // Implementation
    return nil
}
```

### CLI Application

```go
package main

import (
    "flag"
    "fmt"
    "os"

    "github.com/xarf/xarf-go"
)

func main() {
    validateCmd := flag.NewFlagSet("validate", flag.ExitOnError)
    createCmd := flag.NewFlagSet("create", flag.ExitOnError)

    if len(os.Args) < 2 {
        fmt.Println("Usage: xarf-cli <command> [arguments]")
        os.Exit(1)
    }

    switch os.Args[1] {
    case "validate":
        validateCmd.Parse(os.Args[2:])
        if validateCmd.NArg() < 1 {
            fmt.Println("Usage: xarf-cli validate <file>")
            os.Exit(1)
        }
        validateFile(validateCmd.Arg(0))

    case "create":
        createCmd.Parse(os.Args[2:])
        createReport()

    default:
        fmt.Println("Unknown command:", os.Args[1])
        os.Exit(1)
    }
}

func validateFile(filename string) {
    data, err := os.ReadFile(filename)
    if err != nil {
        fmt.Printf("Error reading file: %v\n", err)
        os.Exit(1)
    }

    report, err := xarf.UnmarshalJSON(data)
    if err != nil {
        fmt.Printf("Error parsing JSON: %v\n", err)
        os.Exit(1)
    }

    if err := report.Validate(); err != nil {
        fmt.Printf("✗ Validation failed: %v\n", err)
        os.Exit(1)
    }

    fmt.Println("✓ Report is valid!")
}
```

---

## Best Practices

### 1. Always Check Errors

```go
// ✓ GOOD
report, err := xarf.UnmarshalJSON(data)
if err != nil {
    return fmt.Errorf("parse failed: %w", err)
}

if err := report.Validate(); err != nil {
    return fmt.Errorf("validation failed: %w", err)
}

// ✗ BAD
report, _ := xarf.UnmarshalJSON(data) // Ignoring errors!
report.Validate() // Not checking result
```

### 2. Use Defer for Cleanup

```go
// ✓ GOOD
file, err := os.Open("report.json")
if err != nil {
    return err
}
defer file.Close()

// ✗ BAD
file, _ := os.Open("report.json")
// No defer - might leak resources
```

### 3. Use Context for Cancellation

```go
// ✓ GOOD
func process(ctx context.Context, report *xarf.Report) error {
    select {
    case <-ctx.Done():
        return ctx.Err()
    default:
        return handleReport(report)
    }
}

// ✗ BAD
func process(report *xarf.Report) error {
    // No way to cancel
    return handleReport(report)
}
```

### 4. Handle Concurrency Safely

```go
// ✓ GOOD
type SafeProcessor struct {
    reports []*xarf.Report
    mu      sync.RWMutex
}

func (sp *SafeProcessor) Add(r *xarf.Report) {
    sp.mu.Lock()
    defer sp.mu.Unlock()
    sp.reports = append(sp.reports, r)
}

// ✗ BAD
type UnsafeProcessor struct {
    reports []*xarf.Report // Race condition!
}
```

---

## Resources

- **[GitHub Repository](https://github.com/xarf/xarf-go)** - Coming Soon
- **[pkg.go.dev](https://pkg.go.dev/github.com/xarf/xarf-go)** - Planned
- **[Examples](https://github.com/xarf/xarf-go/tree/main/examples)** - Coming Soon
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
