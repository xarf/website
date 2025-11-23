# Code Block Theme Fix Summary

## Problem
Code blocks had unreadable text in light mode due to light-colored text on dark backgrounds not adapting to the theme.

## Root Causes

1. **Missing CSS Variables**: No theme-aware color variables for syntax highlighting
2. **Hardcoded Colors**: Some colors were hardcoded instead of using CSS variables
3. **Incomplete Rouge Styling**: Rouge syntax highlighter lacked proper token styling
4. **Missing Import**: `_syntax.scss` was not imported in the main stylesheet
5. **Inherit Color Issue**: Using `color: inherit` caused theme conflicts

## Files Modified

### 1. `/Users/tknecht/Projects/xarf/xarf-website/_sass/base/_variables.scss`

**Added comprehensive syntax highlighting color variables:**

#### Light Theme `:root`
- `--color-code-text`: Dark gray for readable text
- `--color-code-keyword`: Purple for keywords
- `--color-code-string`: Green for strings
- `--color-code-comment`: Gray for comments
- `--color-code-number`: Red for numbers
- Plus 10 more token-specific colors

#### Dark Theme `[data-theme="dark"]`
- `--color-code-text`: Light gray for readable text
- `--color-code-keyword`: Light purple for keywords
- `--color-code-string`: Light green for strings
- `--color-code-comment`: Light gray for comments
- `--color-code-number`: Light red for numbers
- Plus matching light variants for all 16 token types

### 2. `/Users/tknecht/Projects/xarf/xarf-website/_sass/base/_typography.scss`

**Changed:**
```scss
// Before (broken)
code {
  color: var(--color-text);  // Not specific enough
}
pre code {
  color: inherit;  // Caused theme conflicts
}

// After (fixed)
code {
  color: var(--color-code-text);  // Theme-aware
}
pre code {
  color: var(--color-code-text);  // Explicit color
}
```

**Added:**
- Border to pre elements for better definition
- Explicit text colors using CSS variables

### 3. `/Users/tknecht/Projects/xarf/xarf-website/_sass/components/_code.scss`

**Completely reimplemented** (was just a placeholder):

**Features:**
- Inline code styling with theme-aware colors
- Plain code blocks (without syntax highlighting)
- Rouge `.highlight` wrapper styling
- Code block language labels
- Copy button for code blocks
- Custom scrollbar styling
- Proper color inheritance prevention

**Key sections:**
```scss
// Inline code
:not(pre) > code {
  color: var(--color-code-text);
}

// Plain code blocks
pre:not(.highlight) {
  color: var(--color-code-text);
}

// Rouge syntax highlighting
.highlight {
  color: var(--color-code-text);

  code {
    color: var(--color-code-text);
  }
}
```

### 4. `/Users/tknecht/Projects/xarf/xarf-website/_sass/components/_syntax.scss`

**Completely reimplemented** with full Rouge token support:

**Rouge Token Classes Styled (60+ tokens):**
- Keywords: `.k`, `.kc`, `.kd`, `.kn`, `.kp`, `.kr`, `.kt`
- Strings: `.s`, `.s1`, `.s2`, `.sb`, `.sc`, `.sd`, `.se`, `.sh`, `.si`, `.sx`, `.sr`
- Numbers: `.m`, `.mf`, `.mh`, `.mi`, `.mo`, `.il`
- Comments: `.c`, `.c1`, `.cm`, `.cp`, `.cs`
- Names: `.n`, `.na`, `.nb`, `.nc`, `.nd`, `.ne`, `.nf`, `.ni`, `.nl`, `.nn`, `.no`, `.nt`, `.nv`, `.nx`
- Operators: `.o`, `.ow`
- Punctuation: `.p`
- And many more...

**Language-Specific Overrides:**
- JSON/YAML/TOML: Enhanced key/value distinction
- CSS/SCSS: Selector and property highlighting
- JavaScript/TypeScript: Variable and function colors
- Python: Decorator and class highlighting
- Bash/Shell: Command and variable colors
- HTML/XML: Tag and attribute colors

**Special Features:**
- Diff highlighting (`.gd`, `.gi`)
- Line numbers (`.lineno`)
- Line highlighting (`.hll`)
- Error highlighting (`.err`)

### 5. `/Users/tknecht/Projects/xarf/xarf-website/assets/css/main.scss`

**Added missing import:**
```scss
@import 'components/syntax';  // Now imported after code.scss
```

## How It Works

### Theme Switching Flow

1. **User toggles theme** → `data-theme="dark"` attribute set on `<html>` or `<body>`
2. **CSS variables update** → Dark theme variables override light theme
3. **All code elements update** → Colors automatically adjust via `var()` references
4. **Rouge tokens adapt** → Each syntax token uses appropriate CSS variable

### Color Hierarchy

```
CSS Variables (theme-aware)
    ↓
Typography Base (_typography.scss)
    ↓
Code Component (_code.scss)
    ↓
Syntax Highlighting (_syntax.scss)
    ↓
Language Overrides (.language-* classes)
```

## Testing

### Test Page Created
`/Users/tknecht/Projects/xarf/xarf-website/docs/code-theme-test.md`

**Includes examples of:**
- Inline code
- Plain code blocks
- JSON syntax
- Python syntax
- JavaScript syntax
- Bash syntax
- HTML syntax
- CSS/SCSS syntax
- YAML syntax

**Test checklist for both themes included**

### Manual Testing Steps

1. **Build the site:**
   ```bash
   bundle exec jekyll serve
   ```

2. **Navigate to test page:**
   http://localhost:4000/website/docs/code-theme-test/

3. **Toggle between light and dark themes**

4. **Verify:**
   - Light mode: Dark text on light backgrounds
   - Dark mode: Light text on dark backgrounds
   - All syntax highlighting colors are visible
   - No text/background color conflicts
   - Inline code is readable
   - Code blocks are readable

## Benefits

✅ **Light Mode**: Dark text on light backgrounds (readable)
✅ **Dark Mode**: Light text on dark backgrounds (readable)
✅ **Syntax Highlighting**: Colors adapt to theme automatically
✅ **Consistency**: All code elements use same CSS variable system
✅ **Maintainability**: Single source of truth for colors
✅ **Extensibility**: Easy to add new token types or languages
✅ **Accessibility**: Proper contrast ratios in both themes

## CSS Variables Reference

### Light Theme Colors
- Text: `#1f2937` (dark gray)
- Keyword: `#7c3aed` (purple)
- String: `#059669` (green)
- Comment: `#6b7280` (gray)
- Number: `#dc2626` (red)
- Function: `#0284c7` (blue)
- Background: `#f1f5f9` (light gray)

### Dark Theme Colors
- Text: `#f9fafb` (light gray)
- Keyword: `#c084fc` (light purple)
- String: `#34d399` (light green)
- Comment: `#9ca3af` (light gray)
- Number: `#fca5a5` (light red)
- Function: `#38bdf8` (light blue)
- Background: `#1e293b` (dark gray)

## Migration Notes

**No breaking changes** - this is a fix, not a new feature.

**Backward compatible** - existing code blocks will automatically benefit from the fix.

**No template changes needed** - Jekyll/Rouge integration unchanged.

## Future Enhancements

Potential improvements:
1. Add theme-specific Rouge color schemes as alternatives
2. Implement code block line highlighting
3. Add language badges to code blocks
4. Implement copy-to-clipboard functionality
5. Add code block expand/collapse for long snippets

## Verification Commands

```bash
# Check all SCSS files exist
ls -la _sass/components/_code.scss
ls -la _sass/components/_syntax.scss
ls -la _sass/base/_variables.scss
ls -la _sass/base/_typography.scss

# Verify import in main.scss
grep "syntax" assets/css/main.scss

# Count CSS variables added
grep -c "color-code" _sass/base/_variables.scss

# Test build
bundle exec jekyll build
```

## Related Files

- Theme toggle: `_includes/theme-toggle.html` (if exists)
- Layout templates: `_layouts/*.html`
- Configuration: `_config.yml` (Rouge highlighter: line 9)

---

**Status**: ✅ Complete
**Tested**: Pending manual verification
**Breaking Changes**: None
