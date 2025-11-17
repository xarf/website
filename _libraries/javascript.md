---
layout: library
title: "JavaScript/Node.js Library"
description: "JavaScript/TypeScript library for XARF - Coming Soon"
permalink: /libraries/javascript/
---

# XARF JavaScript/Node.js Library

<div class="coming-soon-banner">
  <h2>Coming Soon</h2>
  <p>The official JavaScript/TypeScript library for XARF is currently in development.</p>
</div>

---

## Planned Features

- **TypeScript First** - Full TypeScript definitions and type safety
- **Universal** - Works in browser and Node.js environments
- **Zero Dependencies** - Lightweight with no external dependencies
- **Streaming** - Support for streaming large reports
- **Modern APIs** - Promise-based async/await patterns
- **Tree-shakeable** - Import only what you need

---

## Expected API

```javascript
import { XARFReport } from 'xarf';

// Create a report
const report = new XARFReport({
  xarf_version: '4.0.0',
  report_id: '550e8400-e29b-41d4-a716-446655440000',
  timestamp: new Date().toISOString(),
  reporter: {
    org: 'Security Operations',
    contact: 'abuse@example.com',
    type: 'automated'
  },
  source_identifier: '192.0.2.100',
  class: 'abuse',
  type: 'ddos'
});

// Validate
if (await report.validate()) {
  console.log('✓ Valid!');
  console.log(report.toJSON());
}
```

---

## Express Interest

Want to be notified when this library is released?

- **[GitHub Discussions](https://github.com/xarf/xarf-spec/discussions)** - Join the conversation
- **[GitHub Watch](https://github.com/xarf/xarf-spec)** - Watch the repository for updates
- **[Twitter](https://twitter.com/xarf_org)** - Follow for announcements

---

## Alternative: Use Python Library

While waiting for the JavaScript library, you can use the [Python library](/libraries/python/) in Node.js via:

```javascript
const { spawn } = require('child_process');

function validateXARF(jsonData) {
  return new Promise((resolve, reject) => {
    const python = spawn('python', ['-m', 'xarf', 'validate']);

    let output = '';
    python.stdout.on('data', data => output += data);
    python.on('close', code => {
      resolve({ valid: code === 0, output });
    });

    python.stdin.write(jsonData);
    python.stdin.end();
  });
}
```

---

## Contribute

Interested in contributing to the JavaScript library development?

- Check out [Contributing Guidelines](/community/contributing/)
- Join the discussion on [GitHub](https://github.com/xarf/xarf-spec/discussions)

<style>
.coming-soon-banner {
  background: linear-gradient(135deg, rgba(251, 146, 60, 0.1), rgba(251, 146, 60, 0.05));
  border: 2px solid #fb923c;
  border-radius: 12px;
  padding: 3rem 2rem;
  text-align: center;
  margin: 2rem 0;
}

.coming-soon-banner h2 {
  color: #fb923c;
  margin: 0 0 1rem 0;
  font-size: 2rem;
}

.coming-soon-banner p {
  color: var(--color-text-light);
  font-size: 1.125rem;
  margin: 0;
}
</style>
