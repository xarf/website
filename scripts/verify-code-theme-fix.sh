#!/bin/bash
# Verification script for code block theme fix

echo "🔍 Code Block Theme Fix Verification"
echo "======================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PASSED=0
FAILED=0

# Function to check a condition
check() {
    local description=$1
    local command=$2

    if eval "$command" > /dev/null 2>&1; then
        echo -e "${GREEN}✓${NC} $description"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} $description"
        ((FAILED++))
    fi
}

echo "📁 File Existence Checks"
echo "------------------------"
check "Code component exists" "test -f _sass/components/_code.scss"
check "Syntax component exists" "test -f _sass/components/_syntax.scss"
check "Variables updated" "test -f _sass/base/_variables.scss"
check "Typography updated" "test -f _sass/base/_typography.scss"
check "Main SCSS exists" "test -f assets/css/main.scss"
echo ""

echo "🔧 Import Checks"
echo "----------------"
check "Syntax imported in main.scss" "grep -q 'components/syntax' assets/css/main.scss"
check "Code imported in main.scss" "grep -q 'components/code' assets/css/main.scss"
check "Variables imported in main.scss" "grep -q 'base/variables' assets/css/main.scss"
echo ""

echo "🎨 CSS Variable Checks"
echo "----------------------"
check "Light theme code-text defined" "grep -q 'color-code-text:' _sass/base/_variables.scss"
check "Light theme code-keyword defined" "grep -q 'color-code-keyword:' _sass/base/_variables.scss"
check "Light theme code-string defined" "grep -q 'color-code-string:' _sass/base/_variables.scss"
check "Dark theme section exists" "grep -q '\[data-theme=\"dark\"\]' _sass/base/_variables.scss"
check "Dark theme has code colors" "sed -n '/\[data-theme=\"dark\"\]/,/^}/p' _sass/base/_variables.scss | grep -q 'color-code-text'"
echo ""

echo "🔤 Syntax Token Checks"
echo "----------------------"
check "Keyword tokens styled (.k)" "grep -q '\.k,' _sass/components/_syntax.scss"
check "String tokens styled (.s)" "grep -q '\.s,' _sass/components/_syntax.scss"
check "Number tokens styled (.m)" "grep -q '\.m,' _sass/components/_syntax.scss"
check "Comment tokens styled (.c)" "grep -q '\.c,' _sass/components/_syntax.scss"
check "Function tokens styled (.nf)" "grep -q '\.nf,' _sass/components/_syntax.scss"
echo ""

echo "🚫 Anti-pattern Checks"
echo "----------------------"
check "No 'color: inherit' in code.scss" "! grep -q 'color: inherit' _sass/components/_code.scss"
check "No 'color: inherit' in syntax.scss" "! grep -q 'color: inherit' _sass/components/_syntax.scss"
check "No 'color: inherit' in typography.scss" "! grep -q 'color: inherit' _sass/base/_typography.scss"
check "No hardcoded #fff in code.scss" "! grep -q '#fff\|#ffffff' _sass/components/_code.scss"
check "No hardcoded #000 in syntax.scss" "! grep -q '#000\|#000000' _sass/components/_syntax.scss"
echo ""

echo "🌐 Language Support Checks"
echo "--------------------------"
check "JSON language support" "grep -q 'language-json' _sass/components/_syntax.scss"
check "Python language support" "grep -q 'language-python' _sass/components/_syntax.scss"
check "JavaScript language support" "grep -q 'language-javascript' _sass/components/_syntax.scss"
check "Bash language support" "grep -q 'language-bash' _sass/components/_syntax.scss"
check "HTML language support" "grep -q 'language-html' _sass/components/_syntax.scss"
echo ""

echo "📋 File Size Checks"
echo "-------------------"
CODE_SIZE=$(wc -l < _sass/components/_code.scss | tr -d ' ')
SYNTAX_SIZE=$(wc -l < _sass/components/_syntax.scss | tr -d ' ')

check "_code.scss has content (>50 lines)" "test $CODE_SIZE -gt 50"
check "_syntax.scss has content (>100 lines)" "test $SYNTAX_SIZE -gt 100"
echo ""

echo "📝 Documentation Checks"
echo "-----------------------"
check "Test page created" "test -f docs/code-theme-test.md"
check "Summary document created" "test -f docs/CODE_THEME_FIX_SUMMARY.md"
echo ""

# Summary
echo "======================================"
echo "Summary: ${GREEN}$PASSED passed${NC}, ${RED}$FAILED failed${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed! Code theme fix is complete.${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. bundle exec jekyll serve"
    echo "  2. Visit http://localhost:4000/website/docs/code-theme-test/"
    echo "  3. Toggle between light and dark themes"
    echo "  4. Verify all code blocks are readable in both modes"
    exit 0
else
    echo -e "${RED}✗ Some checks failed. Please review the errors above.${NC}"
    exit 1
fi
