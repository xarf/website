/**
 * XARF Format Converter
 * Converts between XARF and other abuse reporting formats
 * Supports: XARF, ARF, CSV, IODEF (basic)
 */

(function() {
  'use strict';

  // Example data for each format
  const EXAMPLES = {
    xarf: {
      "report_id": "550e8400-e29b-41d4-a716-446655440000",
      "timestamp": "2024-01-15T10:00:00Z",
      "category": "abuse",
      "type": "ddos",
      "source_identifier": "192.0.2.100",
      "source_port": 52311,
      "description": "DDoS attack targeting example.com",
      "reporter": {
        "org": "Security Operations",
        "contact": "abuse@reporter.example"
      },
      "severity": "high",
      "evidence": {
        "type": "pcap",
        "hash": "sha256:abc123...",
        "url": "https://evidence.example/report.pcap"
      }
    },
    arf: `MIME-Version: 1.0
From: abuse@reporter.example
To: abuse@target.example
Subject: Abuse Report
Content-Type: multipart/report; report-type=feedback-report;
    boundary="----=_Part_123"

------=_Part_123
Content-Type: text/plain

This is an abuse report for DDoS activity from 192.0.2.100

------=_Part_123
Content-Type: message/feedback-report

Feedback-Type: abuse
User-Agent: XARF-Converter/1.0
Version: 1.0
Source-IP: 192.0.2.100
Incident-ID: 550e8400-e29b-41d4-a716-446655440000
Arrival-Date: 2024-01-15T10:00:00Z

------=_Part_123--`,
    csv: `report_id,timestamp,category,type,source_identifier,source_port,severity,reporter_org,reporter_contact,description
550e8400-e29b-41d4-a716-446655440000,2024-01-15T10:00:00Z,abuse,ddos,192.0.2.100,52311,high,Security Operations,abuse@reporter.example,"DDoS attack targeting example.com"`,
    iodef: `<?xml version="1.0" encoding="UTF-8"?>
<IODEF-Document version="2.0">
  <Incident purpose="reporting">
    <IncidentID name="reporter.example">550e8400-e29b-41d4-a716-446655440000</IncidentID>
    <StartTime>2024-01-15T10:00:00Z</StartTime>
    <Assessment>
      <Impact type="ddos" severity="high"/>
    </Assessment>
  </Incident>
</IODEF-Document>`
  };

  // CSV Configuration
  const CSV_HEADERS = [
    'report_id',
    'timestamp',
    'category',
    'type',
    'source_identifier',
    'source_port',
    'destination_identifier',
    'destination_port',
    'severity',
    'reporter_org',
    'reporter_contact',
    'description'
  ];

  // Converter Class
  class FormatConverter {
    constructor() {
      this.sourceFormat = 'xarf';
      this.targetFormat = 'csv';
      this.options = {
        preserveOriginal: true,
        includeMetadata: false,
        validateOutput: true
      };
    }

    /**
     * Main conversion dispatcher
     */
    convert(input, sourceFormat, targetFormat) {
      const conversionKey = `${sourceFormat}_to_${targetFormat}`;

      if (sourceFormat === targetFormat) {
        throw new Error('Source and target formats must be different');
      }

      switch (conversionKey) {
        // XARF conversions
        case 'xarf_to_csv':
          return this.xarfToCSV(input);
        case 'xarf_to_arf':
          return this.xarfToARF(input);
        case 'xarf_to_iodef':
          return this.xarfToIODEF(input);

        // CSV conversions
        case 'csv_to_xarf':
          return this.csvToXARF(input);

        // ARF conversions
        case 'arf_to_xarf':
          return this.arfToXARF(input);

        // IODEF conversions
        case 'iodef_to_xarf':
          return this.iodefToXARF(input);

        default:
          throw new Error(`Conversion from ${sourceFormat} to ${targetFormat} is not yet supported`);
      }
    }

    /**
     * XARF to CSV Conversion
     */
    xarfToCSV(xarfJSON) {
      const report = typeof xarfJSON === 'string' ? JSON.parse(xarfJSON) : xarfJSON;

      // Build CSV header
      const header = CSV_HEADERS.join(',');

      // Extract values (with safe navigation)
      const values = CSV_HEADERS.map(field => {
        let value = '';

        switch (field) {
          case 'report_id':
            value = report.report_id || '';
            break;
          case 'timestamp':
            value = report.timestamp || '';
            break;
          case 'category':
            value = report.category || '';
            break;
          case 'type':
            value = report.type || '';
            break;
          case 'source_identifier':
            value = report.source_identifier || '';
            break;
          case 'source_port':
            value = report.source_port || '';
            break;
          case 'destination_identifier':
            value = report.destination_identifier || '';
            break;
          case 'destination_port':
            value = report.destination_port || '';
            break;
          case 'severity':
            value = report.severity || '';
            break;
          case 'reporter_org':
            value = report.reporter?.org || '';
            break;
          case 'reporter_contact':
            value = report.reporter?.contact || '';
            break;
          case 'description':
            value = report.description || '';
            break;
          default:
            value = '';
        }

        // Escape and quote CSV values
        return this.escapeCSVValue(value);
      });

      return header + '\n' + values.join(',');
    }

    /**
     * CSV to XARF Conversion
     */
    csvToXARF(csvText) {
      const lines = csvText.trim().split('\n');

      if (lines.length < 2) {
        throw new Error('CSV must contain header and at least one data row');
      }

      const headers = this.parseCSVLine(lines[0]);
      const values = this.parseCSVLine(lines[1]);

      if (headers.length !== values.length) {
        throw new Error('CSV header and data row have different lengths');
      }

      // Build XARF object
      const xarfReport = {
        schema_version: "4.0.0",
        report_id: "",
        timestamp: "",
        category: "",
        type: "",
        source_identifier: "",
        reporter: {}
      };

      // Map CSV columns to XARF fields
      headers.forEach((header, index) => {
        const value = values[index];

        switch (header.trim().toLowerCase()) {
          case 'report_id':
            xarfReport.report_id = value;
            break;
          case 'timestamp':
            xarfReport.timestamp = value;
            break;
          case 'category':
            xarfReport.category = value;
            break;
          case 'type':
            xarfReport.type = value;
            break;
          case 'source_identifier':
          case 'source_ip':
            xarfReport.source_identifier = value;
            break;
          case 'source_port':
            if (value) xarfReport.source_port = parseInt(value, 10);
            break;
          case 'destination_identifier':
          case 'destination_ip':
            if (value) xarfReport.destination_identifier = value;
            break;
          case 'destination_port':
            if (value) xarfReport.destination_port = parseInt(value, 10);
            break;
          case 'severity':
            if (value) xarfReport.severity = value;
            break;
          case 'reporter_org':
            xarfReport.reporter.org = value;
            break;
          case 'reporter_contact':
            xarfReport.reporter.contact = value;
            break;
          case 'description':
            if (value) xarfReport.description = value;
            break;
        }
      });

      return JSON.stringify(xarfReport, null, 2);
    }

    /**
     * XARF to ARF Conversion
     */
    xarfToARF(xarfJSON) {
      const report = typeof xarfJSON === 'string' ? JSON.parse(xarfJSON) : xarfJSON;

      const boundary = "----=_Part_" + Math.random().toString(36).substr(2, 9);
      const timestamp = new Date().toUTCString();

      const arf = `MIME-Version: 1.0
From: ${report.reporter?.contact || 'abuse@reporter.example'}
To: abuse@target.example
Subject: Abuse Report - ${report.type || 'incident'}
Date: ${timestamp}
Content-Type: multipart/report; report-type=feedback-report;
    boundary="${boundary}"

--${boundary}
Content-Type: text/plain; charset="UTF-8"

This is an automated abuse report.

Classification: ${report.category || 'unknown'}
Type: ${report.type || 'unknown'}
Source: ${report.source_identifier || 'unknown'}
${report.description ? '\nDescription: ' + report.description : ''}

Reporter: ${report.reporter?.org || 'Unknown Organization'}

--${boundary}
Content-Type: message/feedback-report

Feedback-Type: ${this.mapXARFCategoryToARF(report.category)}
User-Agent: XARF-Converter/1.0
Version: 1.0
Incident-ID: ${report.report_id || 'unknown'}
Arrival-Date: ${report.timestamp || new Date().toISOString()}
Source-IP: ${report.source_identifier || 'unknown'}
${report.source_port ? 'Source-Port: ' + report.source_port : ''}
${report.destination_identifier ? 'Destination-IP: ' + report.destination_identifier : ''}
${report.destination_port ? 'Destination-Port: ' + report.destination_port : ''}
Reported-From: ${report.reporter?.contact || 'unknown'}

--${boundary}--`;

      return arf;
    }

    /**
     * ARF to XARF Conversion
     */
    arfToXARF(arfText) {
      const xarfReport = {
        schema_version: "4.0.0",
        report_id: "",
        timestamp: new Date().toISOString(),
        category: "abuse",
        type: "unknown",
        source_identifier: "",
        reporter: {}
      };

      // Parse ARF headers (simplified parsing)
      const lines = arfText.split('\n');
      let inFeedbackReport = false;

      for (const line of lines) {
        const trimmed = line.trim();

        // Detect feedback report section
        if (trimmed.includes('Content-Type: message/feedback-report')) {
          inFeedbackReport = true;
          continue;
        }

        // Skip boundary markers
        if (trimmed.startsWith('--')) {
          continue;
        }

        if (inFeedbackReport && trimmed.includes(':')) {
          const [key, ...valueParts] = trimmed.split(':');
          const value = valueParts.join(':').trim();

          switch (key.trim()) {
            case 'Feedback-Type':
              xarfReport.category = this.mapARFTypeToXARF(value);
              break;
            case 'Incident-ID':
              xarfReport.report_id = value;
              break;
            case 'Arrival-Date':
              xarfReport.timestamp = value;
              break;
            case 'Source-IP':
              xarfReport.source_identifier = value;
              break;
            case 'Source-Port':
              xarfReport.source_port = parseInt(value, 10);
              break;
            case 'Destination-IP':
              xarfReport.destination_identifier = value;
              break;
            case 'Destination-Port':
              xarfReport.destination_port = parseInt(value, 10);
              break;
            case 'Reported-From':
              xarfReport.reporter.contact = value;
              break;
          }
        }

        // Extract From header for reporter
        if (trimmed.startsWith('From:')) {
          const from = trimmed.substring(5).trim();
          xarfReport.reporter.contact = from;
        }
      }

      return JSON.stringify(xarfReport, null, 2);
    }

    /**
     * XARF to IODEF Conversion (Basic)
     */
    xarfToIODEF(xarfJSON) {
      const report = typeof xarfJSON === 'string' ? JSON.parse(xarfJSON) : xarfJSON;

      return `<?xml version="1.0" encoding="UTF-8"?>
<IODEF-Document version="2.0" xmlns="urn:ietf:params:xml:ns:iodef-2.0">
  <Incident purpose="reporting">
    <IncidentID name="${report.reporter?.org || 'reporter.example'}">${report.report_id || 'unknown'}</IncidentID>
    <StartTime>${report.timestamp || new Date().toISOString()}</StartTime>
    <Description>XARF Report: ${report.description || 'No description provided'}</Description>
    <Assessment>
      <Impact type="${report.type || 'unknown'}" severity="${report.severity || 'medium'}"/>
    </Assessment>
    <Contact type="reporter">
      <ContactName>${report.reporter?.org || 'Unknown Organization'}</ContactName>
      <Email>${report.reporter?.contact || 'unknown@example.com'}</Email>
    </Contact>
    <EventData>
      <Flow>
        <System category="source">
          <Node>
            <Address category="ipv4-addr">${report.source_identifier || 'unknown'}</Address>
            ${report.source_port ? `<Service><Port>${report.source_port}</Port></Service>` : ''}
          </Node>
        </System>
        ${report.destination_identifier ? `<System category="target">
          <Node>
            <Address category="ipv4-addr">${report.destination_identifier}</Address>
            ${report.destination_port ? `<Service><Port>${report.destination_port}</Port></Service>` : ''}
          </Node>
        </System>` : ''}
      </Flow>
    </EventData>
  </Incident>
</IODEF-Document>`;
    }

    /**
     * IODEF to XARF Conversion (Basic)
     */
    iodefToXARF(iodefXML) {
      const xarfReport = {
        schema_version: "4.0.0",
        report_id: "",
        timestamp: new Date().toISOString(),
        category: "incident",
        type: "unknown",
        source_identifier: "",
        reporter: {}
      };

      // Basic XML parsing (simplified)
      const incidentIdMatch = iodefXML.match(/<IncidentID[^>]*>([^<]+)<\/IncidentID>/);
      if (incidentIdMatch) {
        xarfReport.report_id = incidentIdMatch[1];
      }

      const startTimeMatch = iodefXML.match(/<StartTime>([^<]+)<\/StartTime>/);
      if (startTimeMatch) {
        xarfReport.timestamp = startTimeMatch[1];
      }

      const impactMatch = iodefXML.match(/<Impact type="([^"]+)" severity="([^"]+)"/);
      if (impactMatch) {
        xarfReport.type = impactMatch[1];
        xarfReport.severity = impactMatch[2];
      }

      const addressMatch = iodefXML.match(/<Address[^>]*>([^<]+)<\/Address>/);
      if (addressMatch) {
        xarfReport.source_identifier = addressMatch[1];
      }

      const contactNameMatch = iodefXML.match(/<ContactName>([^<]+)<\/ContactName>/);
      if (contactNameMatch) {
        xarfReport.reporter.org = contactNameMatch[1];
      }

      const emailMatch = iodefXML.match(/<Email>([^<]+)<\/Email>/);
      if (emailMatch) {
        xarfReport.reporter.contact = emailMatch[1];
      }

      return JSON.stringify(xarfReport, null, 2);
    }

    /**
     * Helper: Escape CSV values
     */
    escapeCSVValue(value) {
      const str = String(value);
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return '"' + str.replace(/"/g, '""') + '"';
      }
      return str;
    }

    /**
     * Helper: Parse CSV line
     */
    parseCSVLine(line) {
      const result = [];
      let current = '';
      let inQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
          if (inQuotes && line[i + 1] === '"') {
            current += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (char === ',' && !inQuotes) {
          result.push(current);
          current = '';
        } else {
          current += char;
        }
      }

      result.push(current);
      return result;
    }

    /**
     * Helper: Map XARF category to ARF feedback type
     */
    mapXARFCategoryToARF(xarfCategory) {
      const mapping = {
        'abuse': 'abuse',
        'fraud': 'fraud',
        'legal': 'other',
        'policy': 'abuse',
        'malware': 'virus',
        'security': 'abuse'
      };
      return mapping[xarfCategory] || 'other';
    }

    /**
     * Helper: Map ARF type to XARF category
     */
    mapARFTypeToXARF(arfType) {
      const mapping = {
        'abuse': 'abuse',
        'fraud': 'fraud',
        'virus': 'malware',
        'other': 'abuse'
      };
      return mapping[arfType] || 'abuse';
    }

    /**
     * Validate XARF JSON
     */
    validateXARF(xarfJSON) {
      const report = typeof xarfJSON === 'string' ? JSON.parse(xarfJSON) : xarfJSON;
      const errors = [];

      // Required fields
      if (!report.report_id) errors.push('Missing required field: report_id');
      if (!report.timestamp) errors.push('Missing required field: timestamp');
      if (!report.category) errors.push('Missing required field: category');
      if (!report.type) errors.push('Missing required field: type');
      if (!report.source_identifier) errors.push('Missing required field: source_identifier');

      return {
        valid: errors.length === 0,
        errors: errors
      };
    }
  }

  // UI Controller
  class ConverterUI {
    constructor() {
      this.converter = new FormatConverter();
      this.initializeElements();
      this.attachEventListeners();
    }

    initializeElements() {
      this.sourceFormatSelect = document.getElementById('source-format');
      this.targetFormatSelect = document.getElementById('target-format');
      this.inputTextarea = document.getElementById('input-data');
      this.outputPre = document.getElementById('output-data');
      this.convertBtn = document.getElementById('convert-btn');
      this.loadExampleBtn = document.getElementById('load-example-btn');
      this.clearBtn = document.getElementById('clear-btn');
      this.copyBtn = document.getElementById('copy-btn');
      this.downloadBtn = document.getElementById('download-btn');
      this.validateCheckbox = document.getElementById('validate-output');
    }

    attachEventListeners() {
      this.convertBtn.addEventListener('click', () => this.handleConvert());
      this.loadExampleBtn.addEventListener('click', () => this.handleLoadExample());
      this.clearBtn.addEventListener('click', () => this.handleClear());
      this.copyBtn.addEventListener('click', () => this.handleCopy());
      this.downloadBtn.addEventListener('click', () => this.handleDownload());

      // Prevent same format selection
      this.sourceFormatSelect.addEventListener('change', () => this.validateFormatSelection());
      this.targetFormatSelect.addEventListener('change', () => this.validateFormatSelection());
    }

    validateFormatSelection() {
      const source = this.sourceFormatSelect.value;
      const target = this.targetFormatSelect.value;

      if (source === target) {
        this.showError('Source and target formats must be different');
        this.convertBtn.disabled = true;
      } else {
        this.convertBtn.disabled = false;
      }
    }

    handleConvert() {
      try {
        const input = this.inputTextarea.value.trim();
        if (!input) {
          this.showError('Please enter data to convert');
          return;
        }

        const sourceFormat = this.sourceFormatSelect.value;
        const targetFormat = this.targetFormatSelect.value;

        const output = this.converter.convert(input, sourceFormat, targetFormat);

        // Validate if option is checked
        if (this.validateCheckbox.checked && targetFormat === 'xarf') {
          const validation = this.converter.validateXARF(output);
          if (!validation.valid) {
            this.showWarning('Output validation warnings:\n' + validation.errors.join('\n'));
          }
        }

        this.outputPre.textContent = output;
        this.outputPre.style.color = 'var(--color-text)';
        this.showSuccess('Conversion successful!');
      } catch (error) {
        this.showError('Conversion error: ' + error.message);
        this.outputPre.textContent = 'Error: ' + error.message;
        this.outputPre.style.color = '#dc3545';
      }
    }

    handleLoadExample() {
      const sourceFormat = this.sourceFormatSelect.value;
      const example = EXAMPLES[sourceFormat];

      if (typeof example === 'object') {
        this.inputTextarea.value = JSON.stringify(example, null, 2);
      } else {
        this.inputTextarea.value = example;
      }

      this.showSuccess('Example loaded');
    }

    handleClear() {
      this.inputTextarea.value = '';
      this.outputPre.textContent = 'Converted data will appear here...';
      this.outputPre.style.color = 'var(--color-text-light)';
    }

    handleCopy() {
      const output = this.outputPre.textContent;
      if (output === 'Converted data will appear here...' || output.startsWith('Error:')) {
        this.showError('No valid output to copy');
        return;
      }

      navigator.clipboard.writeText(output).then(() => {
        this.showSuccess('Copied to clipboard!');
      }).catch(err => {
        this.showError('Failed to copy: ' + err.message);
      });
    }

    handleDownload() {
      const output = this.outputPre.textContent;
      if (output === 'Converted data will appear here...' || output.startsWith('Error:')) {
        this.showError('No valid output to download');
        return;
      }

      const targetFormat = this.targetFormatSelect.value;
      const extensions = {
        'xarf': 'json',
        'csv': 'csv',
        'arf': 'eml',
        'iodef': 'xml'
      };

      const blob = new Blob([output], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `converted-report.${extensions[targetFormat] || 'txt'}`;
      a.click();
      URL.revokeObjectURL(url);

      this.showSuccess('File downloaded');
    }

    showError(message) {
      this.showMessage(message, 'error');
    }

    showWarning(message) {
      this.showMessage(message, 'warning');
    }

    showSuccess(message) {
      this.showMessage(message, 'success');
    }

    showMessage(message, type) {
      // Create temporary message element
      const messageDiv = document.createElement('div');
      messageDiv.textContent = message;
      messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 4px;
        background: ${type === 'error' ? '#dc3545' : type === 'warning' ? '#ffc107' : '#28a745'};
        color: white;
        z-index: 9999;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        max-width: 400px;
      `;

      document.body.appendChild(messageDiv);

      setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transition = 'opacity 0.3s';
        setTimeout(() => document.body.removeChild(messageDiv), 300);
      }, 3000);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ConverterUI());
  } else {
    new ConverterUI();
  }
})();
