---
layout: tool
title: "Evidence Hash Calculator"
description: "Calculate SHA-256 hashes for evidence verification and integrity checking"
permalink: /tools/hash-calculator/
---

# Evidence Hash Calculator

<div class="alert alert-info">
  <strong>Coming Soon:</strong> This tool is currently under development. Check back soon for the full implementation.
</div>

Calculate cryptographic hashes for evidence data to ensure integrity and enable verification.

<div class="tool-container">
  <div class="tool-input">
    <h2>Input Evidence</h2>

    <div class="input-method">
      <label>
        <input type="radio" name="input-method" value="text" checked>
        Text Input
      </label>
      <label>
        <input type="radio" name="input-method" value="file">
        File Upload
      </label>
      <label>
        <input type="radio" name="input-method" value="base64">
        Base64 Data
      </label>
    </div>

    <div id="text-input-area">
      <textarea id="evidence-text" placeholder="Paste evidence text here..."></textarea>
    </div>

    <div id="file-input-area" style="display: none;">
      <input type="file" id="evidence-file">
      <div id="file-info"></div>
    </div>

    <div id="base64-input-area" style="display: none;">
      <textarea id="evidence-base64" placeholder="Paste base64-encoded data here..."></textarea>
    </div>

    <div class="hash-options">
      <h3>Hash Algorithms</h3>
      <label>
        <input type="checkbox" id="hash-sha256" checked disabled>
        SHA-256 (Required)
      </label>
      <label>
        <input type="checkbox" id="hash-sha1">
        SHA-1 (Legacy)
      </label>
      <label>
        <input type="checkbox" id="hash-md5">
        MD5 (Legacy)
      </label>
    </div>

    <div class="tool-actions">
      <button id="calculate-btn" class="btn btn-primary">Calculate Hashes</button>
      <button id="clear-btn" class="btn btn-secondary">Clear</button>
    </div>
  </div>

  <div class="tool-output">
    <h2>Hash Results</h2>
    <div id="hash-results" class="results-placeholder">
      Hash results will appear here...
    </div>
  </div>
</div>

## Why Hash Evidence?

### Integrity Verification

Hashes allow recipients to verify evidence hasn't been tampered with:

```json
{
  "evidence": [
    {
      "content_type": "application/pdf",
      "description": "Phishing email screenshot",
      "payload": "JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PC9UeXB...",
      "hash": {
        "algorithm": "sha256",
        "value": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
      }
    }
  ]
}
```

Recipients can:
1. Download the evidence
2. Calculate SHA-256 hash
3. Compare with hash in report
4. Verify integrity

### Chain of Custody

Document evidence handling:

```json
{
  "evidence": [
    {
      "description": "Original packet capture",
      "hash": {
        "algorithm": "sha256",
        "value": "original_hash_value"
      }
    }
  ],
  "metadata": {
    "evidence_chain": [
      {
        "timestamp": "2024-01-15T10:00:00Z",
        "actor": "Automated Collection System",
        "action": "captured",
        "hash": "original_hash_value"
      },
      {
        "timestamp": "2024-01-15T10:05:00Z",
        "actor": "Security Analyst",
        "action": "reviewed",
        "hash": "original_hash_value"
      }
    ]
  }
}
```

### Deduplication

Identify duplicate evidence across reports:

```python
from xarf import XARFReport

def deduplicate_evidence(reports):
    """Remove duplicate evidence across reports"""
    seen_hashes = set()
    unique_evidence = []

    for report in reports:
        for evidence in report.evidence:
            evidence_hash = evidence.hash.value
            if evidence_hash not in seen_hashes:
                seen_hashes.add(evidence_hash)
                unique_evidence.append(evidence)

    return unique_evidence
```

## Hash Algorithms

### SHA-256 (Recommended)

- **Status**: Required for XARF
- **Security**: Cryptographically secure
- **Output**: 64 hexadecimal characters
- **Use**: All evidence hashing

**Example**:
```
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

### SHA-1 (Legacy)

- **Status**: Deprecated for security
- **Security**: Collision vulnerabilities
- **Output**: 40 hexadecimal characters
- **Use**: Legacy system compatibility only

**Example**:
```
da39a3ee5e6b4b0d3255bfef95601890afd80709
```

### MD5 (Legacy)

- **Status**: Not recommended
- **Security**: Known vulnerabilities
- **Output**: 32 hexadecimal characters
- **Use**: Legacy compatibility only

**Example**:
```
d41d8cd98f00b204e9800998ecf8427e
```

## Common Use Cases

### 1. Hashing Evidence Before Inclusion

```python
import hashlib
import base64

def prepare_evidence(file_path):
    """Prepare evidence with hash for XARF report"""
    # Read file
    with open(file_path, 'rb') as f:
        data = f.read()

    # Calculate SHA-256
    sha256_hash = hashlib.sha256(data).hexdigest()

    # Encode to base64
    payload = base64.b64encode(data).decode('utf-8')

    return {
        'content_type': 'application/octet-stream',
        'description': f'Evidence from {file_path}',
        'payload': payload,
        'hash': {
            'algorithm': 'sha256',
            'value': sha256_hash
        }
    }
```

### 2. Verifying Received Evidence

```python
import hashlib
import base64

def verify_evidence(evidence):
    """Verify evidence integrity"""
    # Decode base64 payload
    data = base64.b64decode(evidence['payload'])

    # Calculate hash
    calculated_hash = hashlib.sha256(data).hexdigest()

    # Compare with provided hash
    provided_hash = evidence['hash']['value']

    if calculated_hash == provided_hash:
        print("✓ Evidence integrity verified")
        return True
    else:
        print("✗ Evidence has been modified!")
        return False
```

### 3. Bulk Evidence Processing

```python
def hash_directory(directory_path):
    """Calculate hashes for all files in directory"""
    import os

    hashes = {}
    for filename in os.listdir(directory_path):
        file_path = os.path.join(directory_path, filename)
        if os.path.isfile(file_path):
            with open(file_path, 'rb') as f:
                file_hash = hashlib.sha256(f.read()).hexdigest()
                hashes[filename] = file_hash

    return hashes
```

### 4. Hash-Based Evidence Storage

```python
class EvidenceStore:
    """Store evidence indexed by hash"""

    def __init__(self, storage_path):
        self.storage_path = storage_path

    def store(self, data):
        """Store evidence using hash as filename"""
        # Calculate hash
        evidence_hash = hashlib.sha256(data).hexdigest()

        # Store with hash as filename
        file_path = os.path.join(self.storage_path, evidence_hash)
        with open(file_path, 'wb') as f:
            f.write(data)

        return evidence_hash

    def retrieve(self, evidence_hash):
        """Retrieve evidence by hash"""
        file_path = os.path.join(self.storage_path, evidence_hash)
        with open(file_path, 'rb') as f:
            return f.read()
```

## Security Best Practices

### 1. Always Use SHA-256

Use SHA-256 for all new implementations:

```python
# ✓ GOOD
evidence_hash = hashlib.sha256(data).hexdigest()

# ✗ BAD - MD5 is insecure
evidence_hash = hashlib.md5(data).hexdigest()
```

### 2. Hash Original Data

Hash the raw data, not base64-encoded:

```python
# ✓ GOOD - Hash raw data
raw_data = read_evidence_file()
evidence_hash = hashlib.sha256(raw_data).hexdigest()
payload = base64.b64encode(raw_data).decode()

# ✗ BAD - Hashing base64 string
payload = base64.b64encode(raw_data).decode()
evidence_hash = hashlib.sha256(payload.encode()).hexdigest()
```

### 3. Include Hash Algorithm

Always specify the algorithm:

```json
{
  "hash": {
    "algorithm": "sha256",
    "value": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  }
}
```

### 4. Verify Before Use

Always verify hashes before trusting evidence:

```python
def process_evidence(evidence):
    # Verify first
    if not verify_evidence(evidence):
        raise SecurityError("Evidence failed integrity check")

    # Then use
    analyze_evidence(evidence)
```

## API Usage

Calculate hashes programmatically:

<details class="code-example" markdown="1">
<summary>Python</summary>

```python
import hashlib

def calculate_sha256(data):
    """Calculate SHA-256 hash"""
    if isinstance(data, str):
        data = data.encode('utf-8')
    return hashlib.sha256(data).hexdigest()

# From text
text_hash = calculate_sha256("evidence text")

# From file
with open('evidence.pdf', 'rb') as f:
    file_hash = calculate_sha256(f.read())
```
</details>

<details class="code-example" markdown="1">
<summary>JavaScript</summary>

```javascript
const crypto = require('crypto');

function calculateSHA256(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

// From text
const textHash = calculateSHA256('evidence text');

// From file
const fs = require('fs');
const fileData = fs.readFileSync('evidence.pdf');
const fileHash = calculateSHA256(fileData);
```
</details>

<details class="code-example" markdown="1">
<summary>Bash</summary>

```bash
# From text
echo -n "evidence text" | sha256sum

# From file
sha256sum evidence.pdf
```
</details>

## Related Tools

- **[Schema Validator](/tools/validator/)** - Validate reports with evidence hashes
- **[Sample Generator](/tools/generator/)** - Generate reports with hashed evidence
- **[Format Converter](/tools/converter/)** - Preserve hashes during conversion

## Need Help?

- **[Implementation Guide](/docs/implementation-guide/)** - Security best practices
- **[GitHub Issues](https://github.com/xarf/xarf-spec/issues)** - Report bugs

<script src="{{ site.baseurl }}/assets/js/hash-calculator.js"></script>
<style>
.tool-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

@media (max-width: 768px) {
  .tool-container {
    grid-template-columns: 1fr;
  }
}

.tool-input, .tool-output {
  background: var(--color-background-alt);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1.5rem;
}

.tool-input h2, .tool-output h2 {
  margin-top: 0;
  font-size: 1.25rem;
  color: var(--color-text);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.input-method {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.input-method label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: var(--color-text-light);
}

.input-method input[type="radio"] {
  cursor: pointer;
}

#evidence-text,
#evidence-base64 {
  width: 100%;
  min-height: 200px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  background: var(--color-background);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 1rem;
  resize: vertical;
}

#evidence-file {
  width: 100%;
  padding: 0.5rem;
  background: var(--color-background);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 4px;
}

#file-info {
  margin-top: 1rem;
  padding: 0.75rem;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 0.875rem;
  color: var(--color-text-light);
}

.hash-options {
  margin: 1.5rem 0;
  padding: 1rem;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 4px;
}

.hash-options h3 {
  margin-top: 0;
  margin-bottom: 0.75rem;
  font-size: 1rem;
  color: var(--color-text);
}

.hash-options label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-text-light);
  cursor: pointer;
}

.hash-options input[type="checkbox"] {
  margin-right: 0.5rem;
}

.hash-options input[type="checkbox"]:disabled {
  cursor: not-allowed;
}

.tool-actions {
  display: flex;
  gap: 0.5rem;
}

.results-placeholder {
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-light);
  font-style: italic;
}

.hash-result {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 4px;
}

.hash-result h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: var(--color-text);
  text-transform: uppercase;
}

.hash-value {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  color: var(--color-primary);
  word-break: break-all;
  padding: 0.75rem;
  background: var(--color-background-alt);
  border-radius: 4px;
}

.copy-hash-btn {
  margin-top: 0.5rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}
</style>
