# Quick Fix Checklist - XARF Website Launch

🚨 **STOP! Do not launch until all items checked** ✅

---

## Critical Fixes (MUST DO)

### ❌ Fix #1: validator.js Field Names
**File:** `assets/js/validator.js`

- [ ] Line 20: Change `"classification": "abuse"` → `"class": "connection"`
- [ ] Line 127: Change `'classification'` → `'class'`
- [ ] Line 166-169: Change `report.classification` → `report.class`
- [ ] Run: `node -c assets/js/validator.js` (should pass)
- [ ] Test: Load validator page, no console errors

**Time:** 30 minutes

---

### ❌ Fix #2: generator.js Field Names
**File:** `assets/js/generator.js`

- [ ] Line 417: Change `classification: options.classification` → `class: options.class`
- [ ] Line 132: Update variable name `reportClass.value`
- [ ] Lines 254, 282-286: Update function parameters
- [ ] Lines 432, 449: Update logic references
- [ ] Run: `node -c assets/js/generator.js` (should pass)
- [ ] Test: Generate report, verify has `"class":` not `"classification":`

**Time:** 1 hour

---

### ❌ Fix #3: Remove "Coming Soon" Notices
**Files:** `_tools/*.md` and `tools.md`

- [ ] `_tools/generator.md`: Remove "Coming Soon" alert
- [ ] `_tools/converter.md`: Remove "Coming Soon" alert
- [ ] `_tools/hash-calculator.md`: Remove "Coming Soon" alert
- [ ] `tools.md`: Change badges from "Coming Soon" → "Available"
- [ ] Test: Open each tool page, verify shows "Available"

**Time:** 30 minutes

---

## Integration Testing (MUST PASS)

### Test Scenario 1: Generate & Validate
- [ ] Open `/tools/generator/`
- [ ] Fill form: Connection category, DDoS type
- [ ] Click "Generate Report"
- [ ] Verify output contains `"class": "connection"`
- [ ] Verify output contains `"type": "ddos"`
- [ ] Copy generated JSON
- [ ] Open `/tools/validator/`
- [ ] Paste JSON
- [ ] Click "Validate"
- [ ] Should show ✅ SUCCESS

### Test Scenario 2: All Categories
For each category, generate and validate:
- [ ] Connection (ddos, port_scan, login_attack)
- [ ] Content (malware, phishing, fraud)
- [ ] Messaging (spam, bulk_messaging)
- [ ] Copyright (dmca, infringement)
- [ ] Infrastructure (botnet, compromised_server)
- [ ] Vulnerability (cve, misconfiguration)
- [ ] Reputation (blocklist)
- [ ] Abuse (conceptual - maps to other classes)

### Test Scenario 3: on_behalf_of
- [ ] Generate report
- [ ] Check "On Behalf Of" checkbox
- [ ] Fill in organization details
- [ ] Generate
- [ ] Verify output contains `reporter.on_behalf_of` object
- [ ] Validate successfully

---

## Cross-Browser Testing

### Desktop Browsers
- [ ] Chrome/Edge: All tools work
- [ ] Firefox: All tools work
- [ ] Safari: All tools work

### Mobile Browsers
- [ ] iOS Safari: Tools are responsive
- [ ] Android Chrome: Tools are responsive

### JavaScript Console
- [ ] No errors in any browser
- [ ] No warnings in console

---

## Documentation Verification

### Spot Check Examples
- [ ] Open `_docs/specification.md`
- [ ] Verify examples use `"class":` field
- [ ] Open `_docs/types/connection.md`
- [ ] Verify ddos example has `"class": "connection"`
- [ ] Open `_docs/types/content.md`
- [ ] Verify malware example has `"class": "content"`

### Navigation Check
- [ ] Click through all main nav links
- [ ] Test all sidebar links in docs
- [ ] Verify all "View Complete Sample" sections expand
- [ ] Test all copy-to-clipboard buttons

---

## Security Check

- [ ] No exposed API keys or credentials
- [ ] Test domains use example.com or RFC 5737 ranges
- [ ] No actual email addresses except examples
- [ ] HTTPS links for external resources

---

## Performance Check

- [ ] Homepage loads in < 2 seconds
- [ ] Tools respond immediately to input
- [ ] No lag when generating reports
- [ ] No memory leaks (check DevTools)

---

## Final Validation

### Automated Checks
```bash
# Run these commands:
node -c assets/js/validator.js && echo "✅ validator.js OK"
node -c assets/js/generator.js && echo "✅ generator.js OK"
node -c assets/js/converter.js && echo "✅ converter.js OK"
node -c assets/js/hash-calculator.js && echo "✅ hash-calculator.js OK"

# Check for v3 field names (should be 0):
grep -r '"classification":' assets/js/*.js | wc -l

# Check for v4 field names (should be > 0):
grep -r '"class":' assets/js/*.js | wc -l
```

### Manual Verification
- [ ] Generate 3 different report types
- [ ] Validate all 3 successfully
- [ ] Download JSON files
- [ ] Verify JSON is valid (use jsonlint.com)
- [ ] Check field names in downloaded files

---

## Launch Approval

### Before Clicking Deploy:
- [ ] All critical fixes applied
- [ ] All integration tests pass
- [ ] Cross-browser testing complete
- [ ] No console errors
- [ ] Documentation spot-checked
- [ ] Security review passed

### Sign-Off Required:
- [ ] Technical reviewer approved fixes
- [ ] QA tested all scenarios
- [ ] Product owner approved launch
- [ ] Deployment checklist complete

---

## Post-Launch Monitoring

### First Hour:
- [ ] Test live site immediately after deploy
- [ ] Check all tools work on production
- [ ] Monitor error logs
- [ ] Test from different locations/IPs

### First Day:
- [ ] Check analytics for errors
- [ ] Monitor user feedback channels
- [ ] Test major browsers again
- [ ] Verify CDN/caching working

### First Week:
- [ ] Review usage patterns
- [ ] Collect user feedback
- [ ] Fix any minor issues found
- [ ] Plan improvements for v4.0.1

---

## Rollback Procedure

### If Critical Issues Found:

1. **Immediate:**
   ```bash
   cp assets/js/*.backup assets/js/
   git revert <commit-hash>
   ```

2. **Add Maintenance Notice:**
   ```html
   <div class="alert alert-danger">
     Tools temporarily unavailable. Check back soon.
   </div>
   ```

3. **Fix & Re-Deploy:**
   - Fix issues in development
   - Re-test completely
   - Re-deploy when stable

---

## Success Criteria

✅ **Launch Approved When:**
- All checkboxes above are ✅
- No critical issues remain
- Tools generate valid v4 reports
- Integration testing passes
- Cross-browser compatibility confirmed

---

## Quick Reference

| Issue | File | Fix Time | Priority |
|-------|------|----------|----------|
| validator.js fields | assets/js/validator.js | 30 min | CRITICAL |
| generator.js fields | assets/js/generator.js | 1 hour | CRITICAL |
| "Coming Soon" notices | _tools/*.md, tools.md | 30 min | HIGH |
| Integration testing | All tools | 1 hour | CRITICAL |

**Total Fix Time:** 3-4 hours
**Launch Risk After Fix:** LOW
**Confidence Level:** HIGH

---

**Print this checklist and check items off as you go!**

🎯 When all boxes are checked, you're ready to launch! 🚀
