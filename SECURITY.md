# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 4.0.x   | :white_check_mark: |
| < 4.0   | :x:                |

## Reporting a Vulnerability

The XARF project takes security vulnerabilities seriously. We appreciate your efforts to responsibly disclose your findings.

### How to Report

**Please DO NOT report security vulnerabilities through public GitHub issues.**

Instead, please report security vulnerabilities by emailing:

**contact@xarf.org**

### What to Include

Please include the following information in your report:

- Type of vulnerability (e.g., XSS, CSRF, injection, information disclosure)
- Affected page(s) or URL(s)
- Steps to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including potential attacker capabilities
- Browser and version used for testing (if applicable)

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity and complexity

### Security Update Process

1. **Triage**: We'll confirm the vulnerability and assess severity
2. **Fix Development**: We'll develop and test a fix
3. **Disclosure**: We'll coordinate disclosure timing with you
4. **Deployment**: We'll deploy the fix to production
5. **Announcement**: We'll publish a security advisory

## Website Security Measures

### 1. Static Site Architecture

The XARF website is a static site hosted on GitHub Pages, which provides inherent security benefits:

- No server-side code execution
- No database to compromise
- No user authentication system
- Minimal attack surface

### 2. Content Security

- All content is version-controlled in Git
- Changes require review via pull requests
- Automated checks on all commits
- Branch protection on main branch

### 3. HTTPS Enforcement

- All traffic is encrypted via TLS
- HTTP automatically redirects to HTTPS
- HSTS headers enabled
- Cloudflare SSL/TLS protection

### 4. Content Security Policy

The website implements Content Security Policy (CSP) headers to prevent:
- Cross-Site Scripting (XSS)
- Code injection attacks
- Data injection attacks

### 5. Subresource Integrity

All external resources (CSS, JavaScript) use Subresource Integrity (SRI) checks when possible.

## Security Considerations

### 1. User-Contributed Content

The website displays XARF examples and documentation. All examples are:
- Sanitized before publication
- Reviewed for malicious content
- Validated against XARF specification

### 2. External Links

External links are:
- Reviewed before publication
- Use `rel="noopener noreferrer"` where appropriate
- Regularly checked for validity

### 3. Client-Side JavaScript

We minimize JavaScript usage. When used:
- All scripts are reviewed for security
- No eval() or similar dangerous functions
- Input validation on any user interactions

### 4. Third-Party Services

The website may use:
- Google Analytics (optional)
- Cloudflare CDN and security
- GitHub Pages hosting

We regularly review third-party service security and privacy policies.

## Known Security Considerations

### 1. Static Site Limitations

As a static site, we cannot:
- Implement server-side rate limiting
- Block malicious traffic at origin
- Log security events server-side

**Mitigation**: We rely on Cloudflare for these protections.

### 2. GitHub Pages Constraints

GitHub Pages has specific limitations:
- Custom server headers limited
- No server-side authentication
- No server-side logging

**Mitigation**: We use client-side security measures and Cloudflare.

### 3. Documentation Examples

Code examples may contain:
- Sample abuse report data
- Example IP addresses
- Fictional email addresses

**Mitigation**: All examples use reserved IP ranges (RFC 5737) and example.com domains.

## Vulnerability Disclosure Policy

We follow a **coordinated disclosure** model:

1. **Private Disclosure**: Report sent to contact@xarf.org
2. **Acknowledgment**: We confirm receipt within 48 hours
3. **Investigation**: We investigate and develop a fix
4. **Fix Deployment**: We deploy the fix to production
5. **Public Disclosure**: We publish advisory 7 days after deployment

## Security Best Practices for Users

### For Website Visitors

1. **Use HTTPS**: Always access https://xarf.org (automatically enforced)
2. **Keep Browser Updated**: Use the latest browser version
3. **Verify URLs**: Ensure you're on the official xarf.org domain
4. **Report Issues**: Contact us if you notice suspicious activity

### For Contributors

1. **Review Changes**: Carefully review all changes in pull requests
2. **Sanitize Examples**: Don't include real abuse data in examples
3. **Secure Development**: Use secure development practices
4. **Update Dependencies**: Keep Jekyll and dependencies updated

## Security Hall of Fame

We recognize security researchers who responsibly disclose vulnerabilities:

<!-- Security researchers will be listed here -->

*No vulnerabilities reported yet.*

## Bug Bounty Program

Currently, we do not offer a bug bounty program. However, we deeply appreciate security research and will publicly acknowledge your contribution.

## Contact

- **Security Email**: contact@xarf.org
- **PGP Key**: Not yet available
- **GitHub Security Advisories**: https://github.com/xarf/xarf-website/security/advisories

## Additional Resources

- [XARF Specification Security](https://github.com/xarf/xarf-spec/blob/main/SECURITY.md)
- [XARF Python Parser Security](https://github.com/xarf/xarf-python/blob/main/SECURITY.md)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [GitHub Pages Security](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)

---

**Last Updated**: 2025-11-30
