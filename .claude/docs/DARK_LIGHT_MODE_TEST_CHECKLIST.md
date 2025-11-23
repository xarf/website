# Dark/Light Mode Test Checklist - XARF Website

## Testing Instructions

1. **Access Theme Toggle**: Click the theme toggle button in the header (sun/moon icon)
2. **Verify Theme Persistence**: Refresh the page and verify theme preference is maintained
3. **Test All Pages**: Navigate through all pages listed below
4. **Check Both Modes**: Test each item in both light mode AND dark mode
5. **Visual Inspection**: Ensure proper contrast and readability in both modes

---

## 🏠 Home Page (/)

### Background & Layout
- [ ] Light: Body background is white (#ffffff)
- [ ] Dark: Body background is dark gray (#111827)
- [ ] Light: Container/section backgrounds are light gray (#f9fafb)
- [ ] Dark: Container/section backgrounds are darker gray (#1f2937)

### Text Colors
- [ ] Light: Heading text is dark (#1f2937)
- [ ] Dark: Heading text is light (#f9fafb)
- [ ] Light: Paragraph text is medium gray (#6b7280)
- [ ] Dark: Paragraph text is light gray (#d1d5db)
- [ ] Light: Link text is primary blue (#667eea)
- [ ] Dark: Link text is primary blue (#667eea)
- [ ] Link hover states work in both modes

### Buttons
- [ ] Light: Primary button background is blue (#667eea), text is white
- [ ] Dark: Primary button background is blue (#667eea), text is white
- [ ] Light: Outline button has blue border, transparent background
- [ ] Dark: Outline button has blue border, transparent background
- [ ] Button hover states work correctly in both modes
- [ ] Button hover transform (translateY) works

### Code Blocks
- [ ] Light: Inline code has light gray background (#f1f5f9)
- [ ] Dark: Inline code has dark gray background (#1e293b)
- [ ] Light: Inline code text is red (#ef4444)
- [ ] Dark: Inline code text is red (#ef4444)
- [ ] Fenced code blocks maintain syntax highlighting in both modes

---

## 📚 Documentation Pages (/docs/*)

### Page Layout
- [ ] Light: Page background is light gray (#f9fafb)
- [ ] Dark: Page background is dark gray (#111827)
- [ ] Light: Content card background is white
- [ ] Dark: Content card background is dark gray (#1f2937)
- [ ] Card shadows are visible in both modes

### Sidebar
- [ ] Light: Sidebar background is white
- [ ] Dark: Sidebar background is dark gray (#1f2937)
- [ ] Light: Sidebar links are gray (#6b7280)
- [ ] Dark: Sidebar links are light gray (#d1d5db)
- [ ] Active link has blue background in both modes
- [ ] Hover state shows alternative background in both modes

### Breadcrumbs
- [ ] Light: Breadcrumb text is gray (#6b7280)
- [ ] Dark: Breadcrumb text is light gray (#d1d5db)
- [ ] Breadcrumb links are blue in both modes
- [ ] Border separator is visible in both modes

### Article Content
- [ ] All heading levels (H1-H6) have correct text color
- [ ] Paragraph text is readable with good contrast
- [ ] Strong/bold text has proper emphasis
- [ ] Light: H2 border-bottom is visible (#e5e7eb)
- [ ] Dark: H2 border-bottom is visible (#374151)

### Code in Documentation
- [ ] Light: Inline code background is light gray (#f1f5f9)
- [ ] Dark: Inline code background is dark gray (#1e293b)
- [ ] Light: Code blocks have dark background (#1e293b)
- [ ] Dark: Code blocks have dark background (#1e293b)
- [ ] Code text maintains readability in both modes
- [ ] Copy code button is visible and functional in both modes

### Tables
- [ ] Light: Table header background is light gray (#f9fafb)
- [ ] Dark: Table header background is dark gray (#1f2937)
- [ ] Light: Table cell borders are visible (#e5e7eb)
- [ ] Dark: Table cell borders are visible (#374151)
- [ ] Light: Row hover shows light background
- [ ] Dark: Row hover shows darker background
- [ ] Table text is readable in both modes

### Blockquotes
- [ ] Light: Left border is blue (#667eea)
- [ ] Dark: Left border is blue (#667eea)
- [ ] Light: Blockquote text is gray (#6b7280)
- [ ] Dark: Blockquote text is light gray (#d1d5db)

### Lists (ul/ol)
- [ ] List text has correct color in both modes
- [ ] Nested lists maintain proper styling

### Links
- [ ] Light: Links are blue (#667eea)
- [ ] Dark: Links are blue (#667eea)
- [ ] Light: Link hover is darker blue (#5568d3)
- [ ] Dark: Link hover is darker blue (#5568d3)
- [ ] Underline on hover works in both modes

### Field Category Boxes
- [ ] Mandatory fields: Orange border (#fb923c) visible in both modes
- [ ] Recommended fields: Green border (#22c55e) visible in both modes
- [ ] Optional fields: Blue border (#3b82f6) visible in both modes
- [ ] Background tints are visible in both modes

### Field Badges
- [ ] Mandatory badge: Orange background/border/text visible
- [ ] Recommended badge: Green background/border/text visible
- [ ] Optional badge: Blue background/border/text visible

### Sample Report Collapsible
- [ ] Light: Summary background is light gray
- [ ] Dark: Summary background is dark gray
- [ ] Light: Border color is gray (#e5e7eb)
- [ ] Dark: Border color is dark gray (#374151)
- [ ] Open state border changes to blue in both modes
- [ ] Expand icon rotates correctly
- [ ] Sample icon gradient is visible in both modes

### Pagination
- [ ] Light: Pagination background is light gray
- [ ] Dark: Pagination background is dark gray
- [ ] Light: Border is gray (#e5e7eb)
- [ ] Dark: Border is dark gray (#374151)
- [ ] Hover effect works in both modes
- [ ] Pagination titles are blue in both modes

---

## 📖 Type Reference Pages (/docs/types/*)

Test the following type pages:
- /docs/types/connection
- /docs/types/content
- /docs/types/messaging
- /docs/types/vulnerability
- /docs/types/reputation
- /docs/types/copyright
- /docs/types/infrastructure

For each type page, verify:
- [ ] All documentation page elements (see above)
- [ ] JSON schema examples have proper code block styling
- [ ] Field requirement indicators are visible
- [ ] Version selector (if present) works in both modes

---

## 🛠️ Tools Pages (/tools/*)

Test these tool pages:
- /tools/validator
- /tools/generator
- /tools/converter
- /tools/hash-calculator (if exists)

### Tool Layout
- [ ] Light: Tool header background is appropriate
- [ ] Dark: Tool header background is appropriate
- [ ] Breadcrumb styling matches docs pages

### Forms and Inputs
- [ ] Light: Form control background is white
- [ ] Dark: Form control background is dark gray (#1f2937)
- [ ] Light: Form control border is gray (#e5e7eb)
- [ ] Dark: Form control border is dark gray (#374151)
- [ ] Light: Form control text is dark
- [ ] Dark: Form control text is light
- [ ] Light: Placeholder text is light gray (#64748b)
- [ ] Dark: Placeholder text is medium gray (#94a3b8)
- [ ] Focus state shows blue border in both modes
- [ ] Focus shadow (blue ring) is visible in both modes

### Select Dropdowns
- [ ] Light: Dropdown arrow icon is dark (#666)
- [ ] Dark: Dropdown arrow icon is light (#d1d5db)
- [ ] Dropdown opens and closes correctly in both modes
- [ ] Selected options are visible in both modes

### Textareas
- [ ] Textarea resize handle is visible in both modes
- [ ] Textarea maintains min-height in both modes
- [ ] All form control styles apply to textareas

### Form Labels
- [ ] Light: Label text is dark
- [ ] Dark: Label text is light
- [ ] Font weight (medium/500) is consistent

### Form Help Text
- [ ] Light: Help text is gray (#6b7280)
- [ ] Dark: Help text is light gray (#d1d5db)

### Error States
- [ ] Error text is red in both modes
- [ ] Error styling is visible and clear

### Tool Output Areas
- [ ] Output displays with proper styling in both modes
- [ ] JSON output has syntax highlighting
- [ ] Success/error messages are clearly visible

---

## 📚 Libraries Pages (/libraries/*)

Test these library pages:
- /libraries/ (index)
- /libraries/python
- /libraries/javascript
- /libraries/go
- /libraries/java
- /libraries/csharp

### Library Cards (if present)
- [ ] Light: Card background is white
- [ ] Dark: Card background is dark gray
- [ ] Card borders are visible in both modes
- [ ] Card shadows are appropriate
- [ ] Card hover effects work in both modes

### Library Documentation
- [ ] Code examples have proper syntax highlighting
- [ ] Installation commands have code block styling
- [ ] All documentation elements follow docs page patterns

---

## 💾 Downloads Page (/downloads/)

### Download Sections
- [ ] Section backgrounds work in both modes
- [ ] Download buttons are styled correctly
- [ ] Links to downloads are clearly visible

### File Listings (if present)
- [ ] File names are readable
- [ ] File sizes/dates have appropriate color
- [ ] Download icons are visible

---

## 🧭 Navigation (Header)

### Header Container
- [ ] Light: Header background is semi-transparent white (rgba(255, 255, 255, 0.95))
- [ ] Dark: Header background is semi-transparent dark (rgba(17, 24, 39, 0.95))
- [ ] Light: Header border is light gray
- [ ] Dark: Header border is dark gray
- [ ] Backdrop blur effect is visible
- [ ] Scrolled state adds shadow in both modes

### Logo/Brand
- [ ] Light: Logo text is dark
- [ ] Dark: Logo text is light
- [ ] Version badge has blue background in both modes
- [ ] Version badge text is white in both modes

### Navigation Links
- [ ] Light: Nav links are gray (#6b7280)
- [ ] Dark: Nav links are light gray (#d1d5db)
- [ ] Light: Nav link hover shows dark text
- [ ] Dark: Nav link hover shows light text
- [ ] Active nav links are blue in both modes
- [ ] Light: Nav link hover background is light gray
- [ ] Dark: Nav link hover background is dark gray

### Dropdown Menus
- [ ] Light: Dropdown background is white
- [ ] Dark: Dropdown background is dark gray
- [ ] Light: Dropdown border is gray
- [ ] Dark: Dropdown border is dark gray
- [ ] Dropdown shadow is visible in both modes
- [ ] Light: Dropdown links are gray
- [ ] Dark: Dropdown links are light gray
- [ ] Dropdown hover states work correctly

### Dropdown Icon
- [ ] Dropdown arrow icon is visible in both modes
- [ ] Arrow rotates 180° on hover

### GitHub Button
- [ ] Light: Outline button with blue border
- [ ] Dark: Outline button with blue border
- [ ] Button text is blue in both modes
- [ ] Hover state fills with blue background
- [ ] SVG icon is visible in both modes

### Theme Toggle Button
- [ ] Light: Button background is light gray (#f9fafb)
- [ ] Dark: Button background is dark gray (#1f2937)
- [ ] Light: Button border is gray
- [ ] Dark: Button border is dark gray
- [ ] Light: Shows moon icon (theme-icon-dark)
- [ ] Dark: Shows sun icon (theme-icon-light)
- [ ] Hover state works correctly
- [ ] Active state (scale down) works
- [ ] Icon color matches text color

### Mobile Menu Toggle
- [ ] Light: Hamburger bars are dark
- [ ] Dark: Hamburger bars are light
- [ ] Animated state (X) works in both modes
- [ ] Only visible on mobile screens (<768px)

### Mobile Navigation
- [ ] Light: Mobile menu background is white
- [ ] Dark: Mobile menu background is dark gray
- [ ] Mobile menu slides in/out correctly
- [ ] All nav items are visible and clickable
- [ ] Dropdowns work in mobile view

---

## 🦶 Footer

### Footer Container
- [ ] Light: Footer background is appropriate
- [ ] Dark: Footer background is appropriate
- [ ] Footer sections are clearly defined

### Footer Logo/Brand
- [ ] Light: Logo text is dark
- [ ] Dark: Logo text is light
- [ ] Version badge styling is consistent
- [ ] Description text is readable

### Footer Links
- [ ] Light: Footer links are gray
- [ ] Dark: Footer links are light gray
- [ ] Footer link hover works in both modes
- [ ] Section headings (h4) are properly styled

### Footer Bottom
- [ ] Copyright text is visible in both modes
- [ ] License link is visible and clickable
- [ ] Light: Text/links have appropriate contrast
- [ ] Dark: Text/links have appropriate contrast

---

## 🔄 Global Elements

### Body/Document
- [ ] Light: Default background is white
- [ ] Dark: Default background is dark gray (#111827)
- [ ] Light: Default text color is dark
- [ ] Dark: Default text color is light
- [ ] Font family (Inter) loads correctly
- [ ] Monospace font (JetBrains Mono) loads for code

### Transitions
- [ ] Theme switch transition is smooth (250ms)
- [ ] Color changes animate properly
- [ ] No jarring flashes during theme change

### Focus States
- [ ] Focus rings are visible in both modes
- [ ] Focus color is blue in both modes
- [ ] Tab navigation works correctly

### Shadows
- [ ] Light: Shadows are subtle (rgba(0, 0, 0, 0.05-0.1))
- [ ] Dark: Shadows are stronger (rgba(0, 0, 0, 0.3-0.5))
- [ ] Cards have appropriate shadows
- [ ] Dropdowns have appropriate shadows

### Border Colors
- [ ] Light: Borders are light gray (#e5e7eb)
- [ ] Dark: Borders are dark gray (#374151)
- [ ] Light: Light borders are very light (#f3f4f6)
- [ ] Dark: Light borders are medium gray (#4b5563)

---

## 📱 Responsive Testing

For each breakpoint, verify theme works correctly:

### Mobile (<768px)
- [ ] Light mode works on mobile
- [ ] Dark mode works on mobile
- [ ] Mobile menu theme is correct
- [ ] Touch interactions work in both modes

### Tablet (768px-1024px)
- [ ] Light mode layout is correct
- [ ] Dark mode layout is correct
- [ ] Sidebar behavior is appropriate

### Desktop (>1024px)
- [ ] Full layout works in light mode
- [ ] Full layout works in dark mode
- [ ] Dropdowns work correctly
- [ ] Sticky elements work in both modes

---

## 🎨 Semantic Colors

### Success States
- [ ] Success color (#10b981) is visible in both modes
- [ ] Success messages are clear

### Warning States
- [ ] Warning color (#f59e0b) is visible in both modes
- [ ] Warning messages are clear

### Error States
- [ ] Error color (#ef4444) is visible in both modes
- [ ] Error messages are clear

### Info States
- [ ] Info color (#0ea5e9) is visible in both modes
- [ ] Info messages are clear

---

## 🐛 Known Issues / Edge Cases

Document any issues found:

### Visual Issues
- [ ] Any text with poor contrast
- [ ] Any invisible borders
- [ ] Any unreadable code blocks
- [ ] Any broken hover states

### Functional Issues
- [ ] Theme toggle not working
- [ ] Theme preference not persisting
- [ ] Inconsistent styling between pages
- [ ] Missing dark mode variants

### Browser-Specific Issues
- [ ] Chrome:
- [ ] Firefox:
- [ ] Safari:
- [ ] Edge:

---

## ✅ Final Checks

- [ ] All pages tested in light mode
- [ ] All pages tested in dark mode
- [ ] Theme preference persists across page loads
- [ ] Theme preference persists across sessions (localStorage)
- [ ] No console errors when switching themes
- [ ] All images/icons are visible in both modes
- [ ] All SVGs use currentColor where appropriate
- [ ] Accessibility: WCAG contrast requirements met
- [ ] Print styles (if any) work correctly

---

## 📝 Testing Notes

**Date Tested**: _________________

**Tested By**: _________________

**Browser/Version**: _________________

**Screen Resolution**: _________________

**Additional Observations**:
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

---

## 🚀 Sign-Off

- [ ] Light mode: All critical issues resolved
- [ ] Dark mode: All critical issues resolved
- [ ] Both modes: Production ready

**Approved By**: _________________

**Date**: _________________
