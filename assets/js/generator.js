/**
 * XARF Sample Report Generator
 * Client-side generator for XARF reports
 */

(function() {
  'use strict';

  // Event type definitions by category
  const EVENT_TYPES = {
    abuse: ['ddos', 'malware', 'phishing', 'spam', 'scanner'],
    vulnerability: ['cve', 'misconfiguration', 'open_service'],
    connection: ['compromised', 'botnet', 'malicious_traffic', 'ddos', 'port_scan', 'login_attack'],
    content: ['illegal', 'malicious', 'policy_violation', 'phishing', 'malware', 'fraud'],
    copyright: ['infringement', 'dmca', 'trademark', 'p2p', 'cyberlocker'],
    messaging: ['bulk_messaging', 'spam'],
    reputation: ['blocklist', 'threat_intelligence'],
    infrastructure: ['botnet', 'compromised_server']
  };

  // Type descriptions for different categories
  const TYPE_DESCRIPTIONS = {
    abuse: {
      ddos: 'DDoS attack detected from this IP address',
      malware: 'Malware distribution or command and control activity detected',
      phishing: 'Phishing site or credential theft attempt identified',
      spam: 'Unsolicited bulk email originating from this source',
      scanner: 'Port scanning or network reconnaissance activity detected'
    },
    vulnerability: {
      cve: 'Known CVE vulnerability detected on this system',
      misconfiguration: 'Security misconfiguration identified',
      open_service: 'Unintended publicly accessible service detected'
    },
    connection: {
      compromised: 'Indicators of compromised system detected',
      botnet: 'Botnet membership or C&C communication identified',
      malicious_traffic: 'Suspicious or malicious network traffic observed',
      ddos: 'Participation in distributed denial of service attack',
      port_scan: 'Systematic port scanning activity detected',
      login_attack: 'Brute force or credential stuffing attack detected'
    },
    content: {
      illegal: 'Illegal content hosted or distributed',
      malicious: 'Malicious content distribution detected',
      policy_violation: 'Content violates acceptable use policy',
      phishing: 'Phishing content or credential theft page',
      malware: 'Malware hosting or distribution',
      fraud: 'Fraudulent content or scam activity'
    },
    copyright: {
      infringement: 'Copyright infringement detected',
      dmca: 'DMCA takedown notice issued',
      trademark: 'Trademark infringement identified',
      p2p: 'Peer-to-peer copyright infringement',
      cyberlocker: 'Unauthorized file sharing or hosting'
    },
    messaging: {
      bulk_messaging: 'Unsolicited bulk messaging activity',
      spam: 'Spam messaging or robocall activity'
    },
    reputation: {
      blocklist: 'Added to security blocklist',
      threat_intelligence: 'Identified as threat source by intelligence feeds'
    },
    infrastructure: {
      botnet: 'Botnet infrastructure component identified',
      compromised_server: 'Compromised server or infrastructure detected'
    }
  };

  // Severity levels
  const SEVERITY_LEVELS = ['low', 'medium', 'high', 'critical'];

  // Evidence types based on category
  const EVIDENCE_TYPES = {
    abuse: ['pcap', 'log', 'screenshot'],
    vulnerability: ['scan_result', 'log', 'screenshot'],
    connection: ['pcap', 'log', 'netflow'],
    content: ['screenshot', 'url', 'sample'],
    copyright: ['url', 'screenshot', 'document'],
    messaging: ['message', 'log', 'sample'],
    reputation: ['threat_feed', 'log', 'report'],
    infrastructure: ['pcap', 'log', 'dns_record']
  };

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    const reportClass = document.getElementById('report-class');
    const reportType = document.getElementById('report-type');
    const sourceIp = document.getElementById('source-ip');
    const reporterOrg = document.getElementById('reporter-org');
    const reporterContact = document.getElementById('reporter-contact');
    const includeOnBehalfOf = document.getElementById('include-on-behalf-of');
    const onBehalfOfFields = document.getElementById('on-behalf-of-fields');
    const onBehalfOrg = document.getElementById('on-behalf-org');
    const onBehalfContact = document.getElementById('on-behalf-contact');
    const includeEvidence = document.getElementById('include-evidence');
    const includeOptional = document.getElementById('include-optional');
    const generateBtn = document.getElementById('generate-btn');
    const randomizeBtn = document.getElementById('randomize-btn');
    const copyBtn = document.getElementById('copy-btn');
    const downloadBtn = document.getElementById('download-btn');
    const validateBtn = document.getElementById('validate-btn');
    const outputElement = document.getElementById('generated-output');

    // Store the current generated report
    let currentReport = null;

    // Toggle on_behalf_of fields visibility
    if (includeOnBehalfOf && onBehalfOfFields) {
      includeOnBehalfOf.addEventListener('change', function() {
        onBehalfOfFields.style.display = this.checked ? 'block' : 'none';
      });
    }

    // Update type dropdown when category changes
    if (reportClass && reportType) {
      reportClass.addEventListener('change', function() {
        updateTypeDropdown(reportClass.value);
      });

      // Initialize type dropdown
      updateTypeDropdown(reportClass.value);
    }

    // Generate report button
    if (generateBtn) {
      generateBtn.addEventListener('click', function() {
        try {
          const reportOptions = {
            category: reportClass.value,
            type: reportType.value,
            source_identifier: sourceIp.value.trim(),
            reporter_org: reporterOrg.value.trim(),
            reporter_contact: reporterContact.value.trim(),
            include_evidence: includeEvidence.checked,
            include_optional: includeOptional.checked
          };

          // Add on_behalf_of if checkbox is checked
          if (includeOnBehalfOf && includeOnBehalfOf.checked) {
            const org = onBehalfOrg.value.trim();
            const contact = onBehalfContact.value.trim();
            if (org) {
              reportOptions.on_behalf_of = { org };
              if (contact) {
                reportOptions.on_behalf_of.contact = contact;
              }
            }
          }

          const report = generateReport(reportOptions);

          currentReport = report;
          displayReport(report);
        } catch (error) {
          displayError('Generation Error: ' + error.message);
        }
      });
    }

    // Randomize button
    if (randomizeBtn) {
      randomizeBtn.addEventListener('click', function() {
        randomizeFields();
        // Auto-generate after randomizing
        if (generateBtn) {
          generateBtn.click();
        }
      });
    }

    // Copy to clipboard button
    if (copyBtn) {
      copyBtn.addEventListener('click', function() {
        if (!currentReport) {
          alert('Please generate a report first');
          return;
        }

        const reportText = JSON.stringify(currentReport, null, 2);

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(reportText).then(function() {
            copyBtn.textContent = 'Copied!';
            setTimeout(function() {
              copyBtn.textContent = 'Copy to Clipboard';
            }, 2000);
          }).catch(function(err) {
            alert('Failed to copy: ' + err.message);
          });
        } else {
          // Fallback for older browsers
          const textarea = document.createElement('textarea');
          textarea.value = reportText;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          try {
            document.execCommand('copy');
            copyBtn.textContent = 'Copied!';
            setTimeout(function() {
              copyBtn.textContent = 'Copy to Clipboard';
            }, 2000);
          } catch (err) {
            alert('Failed to copy: ' + err.message);
          }
          document.body.removeChild(textarea);
        }
      });
    }

    // Download JSON button
    if (downloadBtn) {
      downloadBtn.addEventListener('click', function() {
        if (!currentReport) {
          alert('Please generate a report first');
          return;
        }

        const reportText = JSON.stringify(currentReport, null, 2);
        const blob = new Blob([reportText], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'xarf-report-' + currentReport.report_id + '.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    }

    // Validate button
    if (validateBtn) {
      validateBtn.addEventListener('click', function() {
        if (!currentReport) {
          alert('Please generate a report first');
          return;
        }

        // Redirect to validator page with report data
        const reportText = JSON.stringify(currentReport, null, 2);
        sessionStorage.setItem('xarf-report-to-validate', reportText);
        window.location.href = '/tools/validator/';
      });
    }

    /**
     * Update type dropdown based on selected category
     */
    function updateTypeDropdown(category) {
      const types = EVENT_TYPES[category] || [];
      reportType.innerHTML = '';

      types.forEach(function(type) {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = formatTypeName(type);
        reportType.appendChild(option);
      });
    }

    /**
     * Format type name for display
     */
    function formatTypeName(type) {
      return type
        .split('_')
        .map(function(word) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
    }

    /**
     * Randomize all form fields
     */
    function randomizeFields() {
      // Random category
      const categories = Object.keys(EVENT_TYPES);
      const randomClass = categories[Math.floor(Math.random() * categories.length)];
      reportClass.value = randomClass;
      updateTypeDropdown(randomClass);

      // Random type from selected category
      const types = EVENT_TYPES[randomClass];
      reportType.value = types[Math.floor(Math.random() * types.length)];

      // Random IP in test range (192.0.2.0/24)
      sourceIp.value = '192.0.2.' + Math.floor(Math.random() * 256);

      // Random organization name
      const orgs = ['Security Operations', 'Abuse Team', 'Network Security', 'Threat Intelligence', 'SOC Team'];
      reporterOrg.value = orgs[Math.floor(Math.random() * orgs.length)];

      // Random contact email
      const domains = ['example.com', 'security.net', 'abuse.org', 'soc.io'];
      reporterContact.value = 'abuse@' + domains[Math.floor(Math.random() * domains.length)];

      // Random checkboxes
      includeEvidence.checked = Math.random() > 0.3;
      includeOptional.checked = Math.random() > 0.5;
    }

    /**
     * Generate UUID v4
     */
    function generateUUID() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

    /**
     * Generate current timestamp in ISO 8601 format
     */
    function generateTimestamp() {
      return new Date().toISOString();
    }

    /**
     * Generate random confidence score
     */
    function generateConfidence() {
      return Math.round((0.7 + Math.random() * 0.29) * 100) / 100;
    }

    /**
     * Generate random base64 evidence
     */
    function generateEvidenceData() {
      const samples = [
        'VGhpcyBpcyBhIHNhbXBsZSBldmlkZW5jZSBwYXlsb2Fk',
        'U2FtcGxlIG5ldHdvcmsgdHJhZmZpYyBjYXB0dXJl',
        'TG9nIGZpbGUgZXh0cmFjdCB3aXRoIHN1c3BpY2lvdXMgYWN0aXZpdHk=',
        'QmluYXJ5IGRhdGEgZnJvbSBtYWx3YXJlIHNhbXBsZQ=='
      ];
      return samples[Math.floor(Math.random() * samples.length)];
    }

    /**
     * Generate evidence array
     */
    function generateEvidence(category, type) {
      const evidenceTypes = EVIDENCE_TYPES[category] || ['log'];
      const evidenceType = evidenceTypes[Math.floor(Math.random() * evidenceTypes.length)];

      return [{
        type: evidenceType,
        description: 'Evidence showing ' + formatTypeName(type) + ' activity',
        data: generateEvidenceData(),
        hash: generateHash(),
        hash_algorithm: 'sha256'
      }];
    }

    /**
     * Generate random SHA-256 hash
     */
    function generateHash() {
      const chars = '0123456789abcdef';
      let hash = '';
      for (let i = 0; i < 64; i++) {
        hash += chars[Math.floor(Math.random() * chars.length)];
      }
      return hash;
    }

    /**
     * Generate tags based on category and type
     */
    function generateTags(category, type) {
      const baseTags = [category, type];

      // Add additional relevant tags
      const additionalTags = {
        abuse: ['security', 'incident'],
        vulnerability: ['security', 'disclosure'],
        connection: ['network', 'suspicious'],
        content: ['abuse', 'violation'],
        copyright: ['legal', 'dmca'],
        messaging: ['spam', 'abuse'],
        reputation: ['threat-intel', 'blocklist'],
        infrastructure: ['network', 'infrastructure']
      };

      return baseTags.concat(additionalTags[category] || []);
    }

    /**
     * Generate a complete XARF report
     */
    function generateReport(options) {
      if (!options.source_identifier) {
        throw new Error('Source identifier is required');
      }

      if (!options.reporter_contact) {
        throw new Error('Reporter contact is required');
      }

      // Base report structure
      const report = {
        xarf_version: '4.0.0',
        report_id: generateUUID(),
        timestamp: generateTimestamp(),
        reporter: {
          contact: options.reporter_contact,
          type: 'automated'
        },
        source_identifier: options.source_identifier,
        category: options.category,
        type: options.type
      };

      // Add reporter org if provided
      if (options.reporter_org) {
        report.reporter.org = options.reporter_org;
      }

      // Add on_behalf_of if provided
      if (options.on_behalf_of) {
        report.reporter.on_behalf_of = options.on_behalf_of;
      }

      // Add description based on type
      const descriptions = TYPE_DESCRIPTIONS[options.category];
      if (descriptions && descriptions[options.type]) {
        report.description = descriptions[options.type];
      }

      // Add evidence if requested
      if (options.include_evidence) {
        report.evidence = generateEvidence(options.category, options.type);
      }

      // Add optional fields if requested
      if (options.include_optional) {
        report.severity = SEVERITY_LEVELS[Math.floor(Math.random() * SEVERITY_LEVELS.length)];
        report.confidence = generateConfidence();
        report.tags = generateTags(options.category, options.type);

        // Add attack vector for abuse category
        if (options.category === 'abuse' && options.type === 'ddos') {
          report.attack_vector = 'udp_flood';
        }

        // Add target information
        report.target = {
          ip: '203.0.113.' + Math.floor(Math.random() * 256),
          port: [53, 80, 443, 8080][Math.floor(Math.random() * 4)]
        };

        // Add occurrence time range
        const now = new Date();
        const oneHourAgo = new Date(now.getTime() - 3600000);
        report.occurrence = {
          start: oneHourAgo.toISOString(),
          end: now.toISOString()
        };
      }

      return report;
    }

    /**
     * Display generated report
     */
    function displayReport(report) {
      const reportText = JSON.stringify(report, null, 2);
      const codeElement = outputElement.querySelector('code');

      if (codeElement) {
        codeElement.textContent = reportText;
      } else {
        outputElement.innerHTML = '<code>' + escapeHtml(reportText) + '</code>';
      }

      // Scroll output into view
      outputElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    /**
     * Display error message
     */
    function displayError(message) {
      const codeElement = outputElement.querySelector('code');
      const errorText = '// ERROR: ' + message + '\n// Please check your inputs and try again.';

      if (codeElement) {
        codeElement.textContent = errorText;
      } else {
        outputElement.innerHTML = '<code>' + escapeHtml(errorText) + '</code>';
      }
    }

    /**
     * Escape HTML special characters
     */
    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    // Auto-generate initial report on page load
    if (generateBtn) {
      generateBtn.click();
    }
  });
})();
