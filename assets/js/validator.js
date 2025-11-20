/**
 * XARF Schema Validator
 * Client-side validation for XARF reports
 */

(function() {
  'use strict';

  // Sample XARF report for demonstration
  const EXAMPLE_REPORT = {
    "xarf_version": "4.0.0",
    "report_id": "550e8400-e29b-41d4-a716-446655440000",
    "timestamp": "2024-01-15T10:00:00Z",
    "reporter": {
      "org": "Example Security Team",
      "contact": "abuse@example.com",
      "type": "automated"
    },
    "source_identifier": "192.0.2.100",
    "category": "abuse",
    "type": "ddos",
    "severity": "high",
    "description": "DDoS attack detected from this IP address",
    "attack_vector": "udp_flood",
    "target": {
      "ip": "203.0.113.50",
      "port": 53
    },
    "evidence": [
      {
        "type": "pcap",
        "description": "Packet capture showing attack traffic",
        "hash": "a3f7b8c9d2e1f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9",
        "hash_algorithm": "sha256"
      }
    ],
    "confidence": 0.95,
    "tags": ["ddos", "udp-flood", "dns-amplification"]
  };

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    const xarfInput = document.getElementById('xarf-input');
    const validateBtn = document.getElementById('validate-btn');
    const clearBtn = document.getElementById('clear-btn');
    const loadExampleBtn = document.getElementById('load-example-btn');
    const validationResults = document.getElementById('validation-results');
    const strictMode = document.getElementById('strict-mode');
    const showWarnings = document.getElementById('show-warnings');

    // Load example report
    if (loadExampleBtn) {
      loadExampleBtn.addEventListener('click', function() {
        xarfInput.value = JSON.stringify(EXAMPLE_REPORT, null, 2);
        validationResults.innerHTML = '<div class="results-placeholder">Example loaded. Click "Validate Report" to validate.</div>';
      });
    }

    // Clear input
    if (clearBtn) {
      clearBtn.addEventListener('click', function() {
        xarfInput.value = '';
        validationResults.innerHTML = '<div class="results-placeholder">Results will appear here after validation...</div>';
      });
    }

    // Validate report
    if (validateBtn) {
      validateBtn.addEventListener('click', function() {
        try {
          const reportText = xarfInput.value.trim();

          if (!reportText) {
            validationResults.innerHTML = `
              <div class="validation-error">
                <strong>Error:</strong> Please paste a XARF report or load an example.
              </div>
            `;
            return;
          }

          // Parse JSON
          let report;
          try {
            report = JSON.parse(reportText);
          } catch (e) {
            validationResults.innerHTML = `
              <div class="validation-error">
                <strong>Invalid JSON:</strong> ${e.message}
                <p style="margin-top: 0.5rem; opacity: 0.8;">Make sure your JSON is properly formatted.</p>
              </div>
            `;
            return;
          }

          // Perform validation
          const result = validateXARF(report, {
            strict: strictMode.checked,
            warnings: showWarnings.checked
          });

          displayResults(result);
        } catch (error) {
          validationResults.innerHTML = `
            <div class="validation-error">
              <strong>Validation Error:</strong> ${error.message}
            </div>
          `;
        }
      });
    }

    /**
     * Validate XARF report
     */
    function validateXARF(report, options) {
      const errors = [];
      const warnings = [];

      // Check mandatory fields
      const mandatoryFields = [
        'xarf_version',
        'report_id',
        'timestamp',
        'reporter',
        'source_identifier',
        'category',
        'type'
      ];

      mandatoryFields.forEach(field => {
        if (!report[field]) {
          errors.push(`Missing mandatory field: "${field}"`);
        }
      });

      // Validate xarf_version
      if (report.xarf_version && !report.xarf_version.match(/^\d+\.\d+\.\d+$/)) {
        errors.push('Invalid xarf_version format. Expected: "X.Y.Z" (e.g., "4.0.0")');
      }

      // Validate report_id (UUID v4)
      if (report.report_id && !report.report_id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
        errors.push('Invalid report_id format. Expected: UUID v4');
      }

      // Validate timestamp (ISO 8601)
      if (report.timestamp) {
        const date = new Date(report.timestamp);
        if (isNaN(date.getTime())) {
          errors.push('Invalid timestamp format. Expected: ISO 8601 (e.g., "2024-01-15T10:00:00Z")');
        }
      }

      // Validate reporter
      if (report.reporter) {
        if (typeof report.reporter !== 'object') {
          errors.push('Field "reporter" must be an object');
        } else {
          if (!report.reporter.contact) {
            errors.push('Missing mandatory field: "reporter.contact"');
          }
        }
      }

      // Validate category
      const validCategories = ['abuse', 'vulnerability', 'connection', 'content', 'copyright', 'messaging', 'reputation', 'infrastructure'];
      if (report.category && !validCategories.includes(report.category)) {
        errors.push(`Invalid category "${report.category}". Must be one of: ${validCategories.join(', ')}`);
      }

      // Check recommended fields
      if (options.warnings) {
        const recommendedFields = ['description', 'evidence'];
        recommendedFields.forEach(field => {
          if (!report[field]) {
            warnings.push(`Missing recommended field: "${field}"`);
          }
        });

        // Check confidence score
        if (report.confidence !== undefined) {
          if (typeof report.confidence !== 'number' || report.confidence < 0 || report.confidence > 1) {
            warnings.push('Field "confidence" should be a number between 0 and 1');
          }
        }
      }

      return {
        valid: errors.length === 0,
        errors: errors,
        warnings: warnings
      };
    }

    /**
     * Display validation results
     */
    function displayResults(result) {
      if (result.valid && result.warnings.length === 0) {
        validationResults.innerHTML = `
          <div class="validation-success">
            <strong>✓ Valid Report</strong>
            <p style="margin-top: 0.5rem; opacity: 0.9;">
              Your XARF report is valid and meets all requirements.
            </p>
          </div>
        `;
      } else if (result.valid && result.warnings.length > 0) {
        validationResults.innerHTML = `
          <div class="validation-warning">
            <strong>⚠ Valid with Warnings</strong>
            <p style="margin-top: 0.5rem; opacity: 0.9;">
              Your report is technically valid but has some recommendations:
            </p>
            <ul class="error-list">
              ${result.warnings.map(w => `<li>${w}</li>`).join('')}
            </ul>
          </div>
        `;
      } else {
        validationResults.innerHTML = `
          <div class="validation-error">
            <strong>✗ Invalid Report</strong>
            <p style="margin-top: 0.5rem; opacity: 0.9;">
              Your report has the following errors that must be fixed:
            </p>
            <ul class="error-list">
              ${result.errors.map(e => `<li>${e}</li>`).join('')}
            </ul>
            ${result.warnings.length > 0 ? `
              <p style="margin-top: 1rem; opacity: 0.9;">Additional warnings:</p>
              <ul class="error-list">
                ${result.warnings.map(w => `<li>${w}</li>`).join('')}
              </ul>
            ` : ''}
          </div>
        `;
      }
    }
  });
})();
