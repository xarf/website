/**
 * XARF Evidence Hash Calculator
 * Calculates cryptographic hashes for evidence verification and integrity checking
 * Supports SHA-256, SHA-1, and provides XARF evidence structure generation
 */

(function() {
  'use strict';

  // State management
  const state = {
    currentInputMethod: 'text',
    currentFile: null,
    currentData: null,
    currentHashes: {}
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    setupEventListeners();
  }

  function setupEventListeners() {
    // Input method selection
    const inputMethodRadios = document.querySelectorAll('input[name="input-method"]');
    inputMethodRadios.forEach(radio => {
      radio.addEventListener('change', handleInputMethodChange);
    });

    // File upload
    const fileInput = document.getElementById('evidence-file');
    if (fileInput) {
      fileInput.addEventListener('change', handleFileSelect);
    }

    // Calculate button
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', calculateHashes);
    }

    // Clear button
    const clearBtn = document.getElementById('clear-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', clearAll);
    }
  }

  /**
   * Handle input method change (text, file, base64)
   */
  function handleInputMethodChange(event) {
    const method = event.target.value;
    state.currentInputMethod = method;

    // Hide all input areas
    document.getElementById('text-input-area').style.display = 'none';
    document.getElementById('file-input-area').style.display = 'none';
    document.getElementById('base64-input-area').style.display = 'none';

    // Show selected input area
    document.getElementById(`${method}-input-area`).style.display = 'block';

    // Clear results when switching methods
    clearResults();
  }

  /**
   * Handle file selection
   */
  function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) {
      state.currentFile = null;
      document.getElementById('file-info').innerHTML = '';
      return;
    }

    state.currentFile = file;

    // Display file information
    const fileInfo = document.getElementById('file-info');
    fileInfo.innerHTML = `
      <strong>File:</strong> ${escapeHtml(file.name)}<br>
      <strong>Size:</strong> ${formatFileSize(file.size)}<br>
      <strong>Type:</strong> ${escapeHtml(file.type || 'unknown')}
    `;
  }

  /**
   * Calculate hashes for the current input
   */
  async function calculateHashes() {
    const calculateBtn = document.getElementById('calculate-btn');
    const resultsDiv = document.getElementById('hash-results');

    // Disable button during calculation
    calculateBtn.disabled = true;
    calculateBtn.textContent = 'Calculating...';

    try {
      // Get input data
      const data = await getInputData();
      if (!data) {
        showError('Please provide input data');
        return;
      }

      state.currentData = data;

      // Calculate selected hashes
      const hashes = {};

      // SHA-256 is always calculated (required)
      hashes.sha256 = await calculateSHA256(data);

      // SHA-1 if selected
      if (document.getElementById('hash-sha1').checked) {
        hashes.sha1 = await calculateSHA1(data);
      }

      // MD5 if selected (note: not natively supported, will show warning)
      if (document.getElementById('hash-md5').checked) {
        hashes.md5 = 'MD5 not supported in browser (use Web Crypto API SHA-256 instead)';
      }

      state.currentHashes = hashes;

      // Display results
      displayResults(hashes);

    } catch (error) {
      showError(`Error calculating hashes: ${error.message}`);
      console.error('Hash calculation error:', error);
    } finally {
      calculateBtn.disabled = false;
      calculateBtn.textContent = 'Calculate Hashes';
    }
  }

  /**
   * Get input data based on current input method
   */
  async function getInputData() {
    switch (state.currentInputMethod) {
      case 'text':
        const textInput = document.getElementById('evidence-text');
        if (!textInput.value.trim()) {
          return null;
        }
        return new TextEncoder().encode(textInput.value);

      case 'file':
        if (!state.currentFile) {
          return null;
        }
        return await readFileAsArrayBuffer(state.currentFile);

      case 'base64':
        const base64Input = document.getElementById('evidence-base64');
        if (!base64Input.value.trim()) {
          return null;
        }
        try {
          return base64ToArrayBuffer(base64Input.value.trim());
        } catch (error) {
          throw new Error('Invalid base64 data');
        }

      default:
        return null;
    }
  }

  /**
   * Calculate SHA-256 hash using Web Crypto API
   */
  async function calculateSHA256(data) {
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return bufferToHex(hashBuffer);
  }

  /**
   * Calculate SHA-1 hash using Web Crypto API
   */
  async function calculateSHA1(data) {
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    return bufferToHex(hashBuffer);
  }

  /**
   * Convert ArrayBuffer to hex string
   */
  function bufferToHex(buffer) {
    const byteArray = new Uint8Array(buffer);
    return Array.from(byteArray)
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('');
  }

  /**
   * Read file as ArrayBuffer
   */
  function readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(new Uint8Array(e.target.result));
      reader.onerror = (e) => reject(new Error('Failed to read file'));
      reader.readAsArrayBuffer(file);
    });
  }

  /**
   * Convert base64 string to ArrayBuffer
   */
  function base64ToArrayBuffer(base64) {
    // Remove whitespace and newlines
    base64 = base64.replace(/\s/g, '');

    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  /**
   * Display hash results
   */
  function displayResults(hashes) {
    const resultsDiv = document.getElementById('hash-results');
    resultsDiv.innerHTML = '';

    // Display each hash
    Object.entries(hashes).forEach(([algorithm, value]) => {
      const resultDiv = document.createElement('div');
      resultDiv.className = 'hash-result';

      const heading = document.createElement('h3');
      heading.textContent = algorithm.toUpperCase();

      const valueDiv = document.createElement('div');
      valueDiv.className = 'hash-value';
      valueDiv.textContent = value;

      const copyBtn = document.createElement('button');
      copyBtn.className = 'btn btn-secondary copy-hash-btn';
      copyBtn.textContent = 'Copy Hash';
      copyBtn.onclick = () => copyToClipboard(value, copyBtn);

      resultDiv.appendChild(heading);
      resultDiv.appendChild(valueDiv);
      resultDiv.appendChild(copyBtn);
      resultsDiv.appendChild(resultDiv);
    });

    // Add XARF Evidence Structure section
    const xarfSection = document.createElement('div');
    xarfSection.className = 'hash-result';
    xarfSection.style.marginTop = '1.5rem';
    xarfSection.style.borderTop = '2px solid var(--color-border)';
    xarfSection.style.paddingTop = '1.5rem';

    const xarfHeading = document.createElement('h3');
    xarfHeading.textContent = 'XARF Evidence Structure';

    const xarfValue = document.createElement('div');
    xarfValue.className = 'hash-value';
    xarfValue.textContent = generateXARFEvidence(hashes);

    const copyXarfBtn = document.createElement('button');
    copyXarfBtn.className = 'btn btn-primary copy-hash-btn';
    copyXarfBtn.textContent = 'Copy XARF Evidence';
    copyXarfBtn.onclick = () => copyToClipboard(generateXARFEvidence(hashes), copyXarfBtn);

    xarfSection.appendChild(xarfHeading);
    xarfSection.appendChild(xarfValue);
    xarfSection.appendChild(copyXarfBtn);
    resultsDiv.appendChild(xarfSection);
  }

  /**
   * Generate XARF evidence structure
   */
  function generateXARFEvidence(hashes) {
    const evidence = {
      type: state.currentInputMethod === 'file' ? 'file' : 'data',
      description: getEvidenceDescription(),
      hash: hashes.sha256,
      hash_algorithm: 'sha256'
    };

    // Add file-specific fields
    if (state.currentInputMethod === 'file' && state.currentFile) {
      evidence.filename = state.currentFile.name;
      evidence.size = state.currentFile.size;
      if (state.currentFile.type) {
        evidence.content_type = state.currentFile.type;
      }
    }

    // Add size for other input methods
    if (state.currentInputMethod !== 'file' && state.currentData) {
      evidence.size = state.currentData.byteLength;
    }

    return JSON.stringify(evidence, null, 2);
  }

  /**
   * Get evidence description based on input method
   */
  function getEvidenceDescription() {
    switch (state.currentInputMethod) {
      case 'file':
        return state.currentFile ?
          `Uploaded file: ${state.currentFile.name}` :
          'Uploaded file evidence';
      case 'text':
        return 'Text evidence';
      case 'base64':
        return 'Base64-encoded evidence';
      default:
        return 'Evidence data';
    }
  }

  /**
   * Copy text to clipboard
   */
  async function copyToClipboard(text, button) {
    const originalText = button.textContent;

    try {
      await navigator.clipboard.writeText(text);
      button.textContent = 'Copied!';
      button.style.backgroundColor = 'var(--color-success, #28a745)';

      setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = '';
      }, 2000);
    } catch (error) {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();

      try {
        document.execCommand('copy');
        button.textContent = 'Copied!';
        setTimeout(() => {
          button.textContent = originalText;
        }, 2000);
      } catch (err) {
        showError('Failed to copy to clipboard');
      } finally {
        document.body.removeChild(textarea);
      }
    }
  }

  /**
   * Clear all inputs and results
   */
  function clearAll() {
    // Clear text inputs
    const textInput = document.getElementById('evidence-text');
    if (textInput) textInput.value = '';

    const base64Input = document.getElementById('evidence-base64');
    if (base64Input) base64Input.value = '';

    // Clear file input
    const fileInput = document.getElementById('evidence-file');
    if (fileInput) fileInput.value = '';

    // Clear file info
    const fileInfo = document.getElementById('file-info');
    if (fileInfo) fileInfo.innerHTML = '';

    // Clear state
    state.currentFile = null;
    state.currentData = null;
    state.currentHashes = {};

    // Clear results
    clearResults();
  }

  /**
   * Clear results display
   */
  function clearResults() {
    const resultsDiv = document.getElementById('hash-results');
    if (resultsDiv) {
      resultsDiv.innerHTML = '<div class="results-placeholder">Hash results will appear here...</div>';
    }
  }

  /**
   * Show error message
   */
  function showError(message) {
    const resultsDiv = document.getElementById('hash-results');
    if (resultsDiv) {
      resultsDiv.innerHTML = `
        <div style="color: var(--color-error, #dc3545); padding: 1rem; background: var(--color-background); border: 1px solid var(--color-error, #dc3545); border-radius: 4px;">
          <strong>Error:</strong> ${escapeHtml(message)}
        </div>
      `;
    }
  }

  /**
   * Format file size for display
   */
  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Escape HTML to prevent XSS
   */
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

})();
