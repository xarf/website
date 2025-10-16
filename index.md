---
layout: default
title: "XARF v4 - Stop Fighting Abuse Reports, Start Fighting Abuse"
description: "The modern standard for abuse reporting that saves hours, speeds response, and makes the internet safer for everyone"
---

<div class="problem-statement">
  <div class="container">
    <h2 class="problem-title">While You're Manually Processing Reports, Attackers Are Already Moving On</h2>
    <p class="problem-description">
      Every day, abuse teams waste precious hours copying data from emails, verifying evidence,
      and reformatting reports. Meanwhile, phishing sites stay up longer, spam campaigns reach more victims,
      and compromised servers keep attacking. <strong>There's a better way.</strong>
    </p>
  </div>
</div>

<div class="hero">
  <div class="hero-content">
    <h1 class="hero-title">XARF v4</h1>
    <p class="hero-subtitle">Stop Fighting Abuse Reports. Start Fighting Abuse.</p>
    <p class="hero-description">
      The modern standard that turns abuse reporting from a manual chore into automated protection.
      <strong>Reduce response time from hours to minutes.</strong> Give your team back their time.
      Make the internet safer for everyone.
    </p>
    <div class="hero-actions">
      <a href="{{ '/docs/introduction' | relative_url }}" class="btn btn-primary">See How It Works</a>
      <a href="{{ '/tools/validator' | relative_url }}" class="btn btn-secondary">Try It Free</a>
    </div>
  </div>

  <div class="hero-code">
    <div class="code-preview">
      <div class="code-header">
        <span class="code-title">phishing-report.json</span>
        <span class="code-badge">Machine-Readable</span>
      </div>
      <pre><code class="language-json">{
  "xarf_version": "4.0.0",
  "category": "content",
  "type": "phishing",
  "timestamp": "2025-01-16T14:30:00Z",
  "source_identifier": "203.0.113.45",
  "url": "http://fake-bank.example.com",
  "target_brand": "Example Bank",
  "geolocation": "US",
  "device": "mobile",
  "evidence": [{
    "content_type": "image/png",
    "description": "Screenshot of phishing page",
    "payload": "iVBORw0KGg...",
    "hashes": [
      "sha256:a1b2c3d4e5f6..."
    ]
  }],
  "tags": ["phishing:banking"]
}</code></pre>
    </div>
  </div>
</div>

<div class="value-props">
  <div class="container">
    <h2 class="section-title">One Standard. Three Winners. Everyone Benefits.</h2>

    <div class="stakeholder-tabs">
      <div class="tab-buttons">
        <button class="tab-button active" data-tab="senders">For Report Senders</button>
        <button class="tab-button" data-tab="receivers">For Report Receivers</button>
        <button class="tab-button" data-tab="internet">For The Internet</button>
      </div>

      <div class="tab-content active" id="senders">
        <div class="tab-inner">
          <h3>Finally, Your Reports Get Taken Seriously</h3>
          <p class="tab-lead">Stop explaining the same information over and over. Send structured reports that receivers can process automatically.</p>

          <div class="benefits-grid">
            <div class="benefit">
              <div class="benefit-icon">✅</div>
              <div class="benefit-content">
                <h4>Get Processed, Not Ignored</h4>
                <p>Machine-readable reports go straight into automated systems. No more "lost in email."</p>
              </div>
            </div>
            <div class="benefit">
              <div class="benefit-icon">⏱️</div>
              <div class="benefit-content">
                <h4>Send Once, Reach Everyone</h4>
                <p>Standard format means you don't customize for each receiver. One format, universal acceptance.</p>
              </div>
            </div>
            <div class="benefit">
              <div class="benefit-icon">📈</div>
              <div class="benefit-content">
                <h4>Track Your Impact</h4>
                <p>Structured data means measurable results. See how your reports make the internet safer.</p>
              </div>
            </div>
            <div class="benefit">
              <div class="benefit-icon">🎯</div>
              <div class="benefit-content">
                <h4>Build Your Reputation</h4>
                <p>Consistent, high-quality reports establish you as a trusted source. Better feedback loops.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="tab-content" id="receivers">
        <div class="tab-inner">
          <h3>Turn Abuse Handling Into Your Competitive Advantage</h3>
          <p class="tab-lead">Stop burning money on manual processing. Automate abuse response and reinvest those hours into growing your business.</p>

          <div class="benefits-grid">
            <div class="benefit">
              <div class="benefit-icon">💰</div>
              <div class="benefit-content">
                <h4>Massive Time Savings</h4>
                <p>Process 1,000 reports with the same effort as 10 manual emails. 80% reduction in handling time.</p>
              </div>
            </div>
            <div class="benefit">
              <div class="benefit-icon">⚡</div>
              <div class="benefit-content">
                <h4>Respond in Minutes, Not Hours</h4>
                <p>Automated intake to automated response. Fix problems before customers notice them.</p>
              </div>
            </div>
            <div class="benefit">
              <div class="benefit-icon">🛡️</div>
              <div class="benefit-content">
                <h4>Legal Protection Built-In</h4>
                <p>Structured evidence with integrity hashes. Compliance documentation that holds up in court.</p>
              </div>
            </div>
            <div class="benefit">
              <div class="benefit-icon">😊</div>
              <div class="benefit-content">
                <h4>Happier Team, Better Retention</h4>
                <p>No more soul-crushing manual data entry. Your team handles real threats, not paperwork.</p>
              </div>
            </div>
          </div>

          <div class="roi-highlight">
            <div class="roi-stat">
              <div class="roi-number">80%</div>
              <div class="roi-label">Less Manual Work</div>
            </div>
            <div class="roi-stat">
              <div class="roi-number">10x</div>
              <div class="roi-label">Faster Response</div>
            </div>
            <div class="roi-stat">
              <div class="roi-number">$$$</div>
              <div class="roi-label">Cost Center → Advantage</div>
            </div>
          </div>
        </div>
      </div>

      <div class="tab-content" id="internet">
        <div class="tab-inner">
          <h3>A Safer Internet Through Network Effects</h3>
          <p class="tab-lead">Every organization that adopts XARF makes the internet safer for everyone. Here's how collective action creates exponential impact.</p>

          <div class="benefits-grid">
            <div class="benefit">
              <div class="benefit-icon">⚡</div>
              <div class="benefit-content">
                <h4>Shrink the Exploitation Window</h4>
                <p>Faster reporting + faster response = less time for attacks to succeed. Minutes instead of days.</p>
              </div>
            </div>
            <div class="benefit">
              <div class="benefit-icon">🌐</div>
              <div class="benefit-content">
                <h4>Universal Language for Safety</h4>
                <p>One sender can reach 1,000 receivers instantly. One receiver can accept reports from anywhere.</p>
              </div>
            </div>
            <div class="benefit">
              <div class="benefit-icon">📊</div>
              <div class="benefit-content">
                <h4>Measurable Progress</h4>
                <p>Structured data enables real metrics. Track abuse reduction across the entire internet.</p>
              </div>
            </div>
            <div class="benefit">
              <div class="benefit-icon">⚖️</div>
              <div class="benefit-content">
                <h4>Level the Playing Field</h4>
                <p>Small ISPs can match enterprise-grade response. Democratizes internet security.</p>
              </div>
            </div>
          </div>

          <div class="network-effect">
            <h4>The Power of Adoption</h4>
            <p><strong>More senders</strong> → More standardized reports → Better automated processing</p>
            <p><strong>More receivers</strong> → More acceptance → More motivation to send XARF reports</p>
            <p><strong>Result:</strong> Virtuous cycle that makes everyone safer, faster, stronger</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="before-after">
  <div class="container">
    <h2 class="section-title">Before XARF vs After XARF</h2>

    <div class="comparison-grid">
      <div class="comparison-column before">
        <div class="column-header">
          <h3>Without XARF</h3>
          <div class="header-icon">😫</div>
        </div>
        <ul class="comparison-list">
          <li>Copy-paste data from email</li>
          <li>Download attachments manually</li>
          <li>Verify evidence by hand</li>
          <li>Convert to internal ticket format</li>
          <li>Route to correct team</li>
          <li>Hope reporter used correct format</li>
          <li>Chase missing information</li>
          <li><strong>Result: Hours per report</strong></li>
        </ul>
      </div>

      <div class="comparison-arrow">→</div>

      <div class="comparison-column after">
        <div class="column-header">
          <h3>With XARF</h3>
          <div class="header-icon">🚀</div>
        </div>
        <ul class="comparison-list">
          <li>Automated parsing & validation</li>
          <li>Evidence extracted automatically</li>
          <li>Integrity verified via hashes</li>
          <li>Auto-routed to correct team</li>
          <li>Ticket created instantly</li>
          <li>All required fields guaranteed</li>
          <li>Customer notified automatically</li>
          <li><strong>Result: Minutes per report</strong></li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="features">
  <div class="container">
    <h2 class="section-title">Built for Modern Threats</h2>
    <div class="features-grid">
      <div class="feature">
        <div class="feature-icon">🚀</div>
        <h3>Real-Time First</h3>
        <p>One incident = one report, sent immediately. No batching delays. Respond while attacks are happening.</p>
      </div>
      <div class="feature">
        <div class="feature-icon">🔍</div>
        <h3>Evidence-Based</h3>
        <p>Screenshots, logs, malware samples with integrity hashes. Everything needed to act decisively.</p>
      </div>
      <div class="feature">
        <div class="feature-icon">⚡</div>
        <h3>Context-Aware</h3>
        <p>Geolocation, device type, user-agent, referrer. Catch market-specific and device-specific attacks.</p>
      </div>
      <div class="feature">
        <div class="feature-icon">🤖</div>
        <h3>Automation-First</h3>
        <p>JSON Schema validation, type-specific fields. Designed for immediate machine processing.</p>
      </div>
      <div class="feature">
        <div class="feature-icon">🔒</div>
        <h3>Source-Centric</h3>
        <p>IP, port, protocol details. Perfect for CGNAT environments. Focus on what matters.</p>
      </div>
      <div class="feature">
        <div class="feature-icon">🌍</div>
        <h3>49 Abuse Types</h3>
        <p>Phishing, malware, DDoS, spam, CSAM, disinformation, and more. Specialized schemas for each threat.</p>
      </div>
    </div>
  </div>
</div>

<div class="stats">
  <div class="container">
    <div class="stats-grid">
      <div class="stat">
        <div class="stat-number">49</div>
        <div class="stat-label">Abuse Types</div>
      </div>
      <div class="stat">
        <div class="stat-number">7</div>
        <div class="stat-label">Abuse Categories</div>
      </div>
      <div class="stat">
        <div class="stat-number">100%</div>
        <div class="stat-label">v3 Compatible</div>
      </div>
      <div class="stat">
        <div class="stat-number">5MB</div>
        <div class="stat-label">Max Evidence Size</div>
      </div>
    </div>
  </div>
</div>

<div class="adoption">
  <div class="container">
    <h2 class="section-title">Join the Movement</h2>
    <p class="adoption-lead">
      XARF v4 is in active development with early adopters already seeing results.
      Be part of building a safer, more responsive internet.
    </p>

    <div class="adoption-stats">
      <div class="adoption-stat">
        <div class="adoption-icon">📦</div>
        <div class="adoption-text">
          <strong>Alpha parsers available</strong><br>
          Python library ready for testing
        </div>
      </div>
      <div class="adoption-stat">
        <div class="adoption-icon">✅</div>
        <div class="adoption-text">
          <strong>Full JSON Schema validation</strong><br>
          49 type-specific schemas
        </div>
      </div>
      <div class="adoption-stat">
        <div class="adoption-icon">🔄</div>
        <div class="adoption-text">
          <strong>Automatic v3 conversion</strong><br>
          Backward compatible
        </div>
      </div>
    </div>
  </div>
</div>

<div class="getting-started">
  <div class="container">
    <h2 class="section-title">Start Saving Time Today</h2>
    <div class="steps">
      <div class="step">
        <div class="step-number">1</div>
        <div class="step-content">
          <h3>See It In Action</h3>
          <p>Try our interactive validator with real examples. No signup required.</p>
          <a href="{{ '/tools/validator' | relative_url }}" class="step-link">Try Validator Now →</a>
        </div>
      </div>
      <div class="step">
        <div class="step-number">2</div>
        <div class="step-content">
          <h3>Understand the Format</h3>
          <p>Review comprehensive docs and sample reports for all 49 abuse types.</p>
          <a href="{{ '/docs/introduction' | relative_url }}" class="step-link">Read Documentation →</a>
        </div>
      </div>
      <div class="step">
        <div class="step-number">3</div>
        <div class="step-content">
          <h3>Integrate & Deploy</h3>
          <p>Download parser libraries and follow our implementation guide.</p>
          <a href="{{ '/docs/implementation-guide' | relative_url }}" class="step-link">Get Started →</a>
        </div>
      </div>
    </div>

    <div class="cta-footer">
      <p class="cta-text">Ready to stop fighting reports and start fighting abuse?</p>
      <a href="{{ '/docs/introduction' | relative_url }}" class="btn btn-primary btn-large">Get Started Free</a>
    </div>
  </div>
</div>

<style>
.problem-statement {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 0;
  text-align: center;
}

.problem-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.problem-description {
  font-size: 1.25rem;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  opacity: 0.95;
}

.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  padding: 4rem 0;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: #1f2937;
}

.hero-subtitle {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #667eea;
}

.hero-description {
  font-size: 1.125rem;
  line-height: 1.7;
  color: #6b7280;
  margin-bottom: 2rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.875rem 1.75rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  display: inline-block;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.btn:hover {
  text-decoration: none;
}

.btn-primary {
  background: #667eea;
  color: white;
  box-shadow: 0 2px 4px rgba(102, 126, 234, 0.2);
}

.btn-primary:hover {
  background: #5568d3;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
  color: white;
}

.btn-secondary {
  background: #10b981;
  color: white;
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);
}

.btn-secondary:hover {
  background: #059669;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
  color: white;
}

.hero-code {
  background: #1f2937;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.code-preview {
  background: #1f2937;
  color: #e5e7eb;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: #374151;
  border-bottom: 1px solid #4b5563;
}

.code-title {
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.875rem;
  color: #e5e7eb;
}

.code-badge {
  background: #10b981;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.code-preview pre {
  margin: 0;
  padding: 1.5rem;
  overflow-x: auto;
}

.code-preview code {
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
  color: #e5e7eb;
}

.stakeholder-tabs {
  margin-top: 2rem;
}

.tab-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.tab-button {
  padding: 1rem 2rem;
  background: #f3f4f6;
  border: 2px solid transparent;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.tab-button:hover {
  background: #e5e7eb;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.tab-button.active {
  background: white;
  border-color: #667eea;
  color: #667eea;
  box-shadow: 0 4px 6px rgba(102, 126, 234, 0.15);
  transform: translateY(-2px);
}

.tab-content {
  display: none;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.tab-content.active {
  display: block;
}

.tab-lead {
  font-size: 1.25rem;
  color: #6b7280;
  margin-bottom: 2rem;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.benefit {
  display: flex;
  gap: 1rem;
}

.benefit-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.benefit-content h4 {
  margin-bottom: 0.5rem;
  color: #1f2937;
}

.benefit-content p {
  color: #6b7280;
  font-size: 0.95rem;
}

.roi-highlight {
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
}

.roi-stat {
  text-align: center;
}

.roi-number {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.roi-label {
  font-size: 1rem;
  opacity: 0.9;
}

.network-effect {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f9fafb;
  border-left: 4px solid #667eea;
  border-radius: 8px;
}

.network-effect h4 {
  margin-bottom: 1rem;
  color: #1f2937;
}

.network-effect p {
  margin-bottom: 0.5rem;
  color: #6b7280;
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 2rem;
  align-items: center;
  margin-top: 2rem;
}

.comparison-column {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.column-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e5e7eb;
}

.column-header h3 {
  font-size: 1.5rem;
  margin: 0;
}

.header-icon {
  font-size: 2rem;
}

.before .column-header {
  border-bottom-color: #ef4444;
}

.after .column-header {
  border-bottom-color: #10b981;
}

.comparison-list {
  list-style: none;
  padding: 0;
}

.comparison-list li {
  padding: 0.75rem 0;
  padding-left: 2rem;
  position: relative;
  line-height: 1.6;
}

.comparison-list li::before {
  content: "•";
  position: absolute;
  left: 0.5rem;
  top: 0.75rem;
  font-size: 1.25rem;
  line-height: 1;
  font-weight: 600;
}

.before .comparison-list li::before {
  color: #ef4444;
}

.after .comparison-list li::before {
  color: #10b981;
}

.comparison-arrow {
  font-size: 3rem;
  color: #667eea;
  font-weight: 700;
}

.adoption-lead {
  font-size: 1.25rem;
  text-align: center;
  max-width: 700px;
  margin: 0 auto 2rem;
  color: #6b7280;
}

.adoption-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.adoption-stat {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.adoption-icon {
  font-size: 2.5rem;
}

.adoption-text {
  flex: 1;
}

.adoption-text strong {
  display: block;
  margin-bottom: 0.25rem;
  color: #1f2937;
}

.cta-footer {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid #e5e7eb;
}

.cta-text {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1f2937;
}

.btn-large {
  font-size: 1.25rem;
  padding: 1rem 2.5rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: #1f2937;
}

.value-props {
  padding: 4rem 0;
  background: #fafbfc;
}

.before-after {
  padding: 4rem 0;
  background: linear-gradient(180deg, #ffffff 0%, #f9fafb 100%);
}

.features {
  padding: 4rem 0;
}

.stats {
  padding: 4rem 0;
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
}

.adoption {
  padding: 4rem 0;
}

.getting-started {
  padding: 4rem 0;
  background: linear-gradient(135deg, #f0f4ff 0%, #e6f0ff 100%);
  border-top: 1px solid #d0e0ff;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.feature {
  text-align: center;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.2s;
}

.feature:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.15);
  border-color: #667eea;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  transition: transform 0.2s;
}

.feature:hover .feature-icon {
  transform: scale(1.1);
}

.feature h3 {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: #1f2937;
}

.feature p {
  color: #6b7280;
  line-height: 1.6;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.stat {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: all 0.2s;
}

.stat:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}

.stat-number {
  font-size: 3rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.step {
  display: flex;
  gap: 1.5rem;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.step-number {
  width: 3rem;
  height: 3rem;
  background: #667eea;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  flex-shrink: 0;
  box-shadow: 0 4px 6px rgba(102, 126, 234, 0.3);
  transition: all 0.2s;
}

.step:hover .step-number {
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(102, 126, 234, 0.4);
}

.step-content h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #1f2937;
}

.step-content p {
  color: #6b7280;
  margin-bottom: 1rem;
}

.step-link {
  color: #667eea;
  font-weight: 600;
  text-decoration: none;
}

.step-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
    padding: 2rem 0;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1.25rem;
  }

  .code-preview pre {
    font-size: 0.75rem;
  }

  .comparison-grid {
    grid-template-columns: 1fr;
  }

  .comparison-arrow {
    transform: rotate(90deg);
  }

  .tab-buttons {
    flex-direction: column;
  }

  .roi-highlight {
    flex-direction: column;
    gap: 1rem;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .step {
    flex-direction: column;
  }
}
</style>

<script>
function copyCode(button) {
  const codeBlock = button.closest('.code-preview').querySelector('code');
  const text = codeBlock.textContent;

  navigator.clipboard.writeText(text).then(() => {
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.classList.add('copied');

    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('copied');
    }, 2000);
  });
}

// Tab switching
document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.dataset.tab;

      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      document.getElementById(targetTab).classList.add('active');
    });
  });
});
</script>
