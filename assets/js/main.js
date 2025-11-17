/**
 * XARF Website - Main JavaScript
 */

// ============================================
// Theme Management
// ============================================
function initTheme() {
  // Check for saved theme preference, otherwise use system preference
  let theme = localStorage.getItem('theme');

  if (!theme) {
    // Detect system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    theme = prefersDark ? 'dark' : 'light';
  }

  document.documentElement.setAttribute('data-theme', theme);

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only update if user hasn't manually set a preference
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  });
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);

  // Add a little animation
  document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  setTimeout(() => {
    document.body.style.transition = '';
  }, 300);
}

// ============================================
// Mobile Menu Management
// ============================================
function toggleMobileMenu() {
  const nav = document.querySelector('.header-nav');
  const toggle = document.querySelector('.mobile-menu-toggle');

  if (nav && toggle) {
    nav.classList.toggle('active');
    toggle.classList.toggle('active');

    // Prevent body scroll when menu is open
    if (nav.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
}

// ============================================
// Mobile Dropdown Management
// ============================================
function initMobileDropdowns() {
  const dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');

  dropdownItems.forEach(item => {
    const link = item.querySelector('.nav-link');

    if (link) {
      link.addEventListener('click', (e) => {
        // Only handle click on mobile
        if (window.innerWidth <= 768) {
          e.preventDefault();

          // Close other dropdowns
          dropdownItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('active');
            }
          });

          // Toggle current dropdown
          item.classList.toggle('active');
        }
      });
    }
  });
}

// ============================================
// Header Scroll Effect
// ============================================
function initHeaderScroll() {
  const header = document.querySelector('.header');
  let lastScroll = 0;

  if (header) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    });
  }
}

// ============================================
// Close Mobile Menu on Resize
// ============================================
function handleResize() {
  const nav = document.querySelector('.header-nav');
  const toggle = document.querySelector('.mobile-menu-toggle');

  if (window.innerWidth > 768) {
    if (nav) nav.classList.remove('active');
    if (toggle) toggle.classList.remove('active');
    document.body.style.overflow = '';

    // Remove active class from mobile dropdowns
    document.querySelectorAll('.nav-item.has-dropdown').forEach(item => {
      item.classList.remove('active');
    });
  }
}

// ============================================
// Close Menu on Escape Key
// ============================================
function handleEscape(e) {
  if (e.key === 'Escape') {
    const nav = document.querySelector('.header-nav');
    const toggle = document.querySelector('.mobile-menu-toggle');

    if (nav && nav.classList.contains('active')) {
      nav.classList.remove('active');
      if (toggle) toggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
}

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Ignore empty hash or just #
      if (href === '#' || href === '#!') {
        e.preventDefault();
        return;
      }

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();

        // Close mobile menu if open
        const nav = document.querySelector('.header-nav');
        const toggle = document.querySelector('.mobile-menu-toggle');
        if (nav && nav.classList.contains('active')) {
          nav.classList.remove('active');
          if (toggle) toggle.classList.remove('active');
          document.body.style.overflow = '';
        }

        // Scroll to target
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ============================================
// External Link Indicator
// ============================================
function initExternalLinks() {
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    // Don't add to nav links or buttons
    if (!link.closest('.header-nav') && !link.classList.contains('btn')) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
}

// ============================================
// Initialize on DOM Ready
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme first (prevents flash)
  initTheme();

  // Initialize all features
  initMobileDropdowns();
  initHeaderScroll();
  initSmoothScroll();
  initExternalLinks();
  addCopyButtonsToCodeBlocks();

  // Event listeners
  window.addEventListener('resize', handleResize);
  document.addEventListener('keydown', handleEscape);

  // Log ready state
  console.log('🚀 XARF website loaded');
});

// ============================================
// Copy to Clipboard Functionality
// ============================================
function addCopyButtonsToCodeBlocks() {
  // Find all pre elements that contain code
  document.querySelectorAll('pre code').forEach(codeBlock => {
    const pre = codeBlock.parentElement;

    // Skip if already wrapped
    if (pre.parentElement.classList.contains('code-block-wrapper')) {
      return;
    }

    // Add colored indicators based on field names
    // Since we've removed all comment labels from the source markdown,
    // we identify requirement levels by the field names themselves
    // This is a visual-only enhancement - the legend explains the colors

    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';

    // Create actions container
    const actionsContainer = document.createElement('div');
    actionsContainer.className = 'code-actions';

    // Create copy button with SVG icon
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-code-btn';
    copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
    copyBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
      </svg>
    `;

    // Find GitHub schema link in the details element
    const details = pre.closest('details');
    let githubUrl = null;
    if (details) {
      const githubLink = details.querySelector('a[href*="github.com"]');
      if (githubLink) {
        githubUrl = githubLink.href;
      }
    }

    // Create GitHub button if URL found
    let githubBtn = null;
    if (githubUrl) {
      githubBtn = document.createElement('a');
      githubBtn.className = 'github-schema-btn';
      githubBtn.href = githubUrl;
      githubBtn.target = '_blank';
      githubBtn.rel = 'noopener noreferrer';
      githubBtn.setAttribute('aria-label', 'View schema on GitHub');
      githubBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      `;
    }

    // Add click handler for copy button
    copyBtn.addEventListener('click', () => {
      // Get the text content (already cleaned by line processing)
      let text = codeBlock.textContent;

      // Copy to clipboard
      navigator.clipboard.writeText(text).then(() => {
        // Show success feedback
        copyBtn.classList.add('copied');
        copyBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        `;

        // Reset after 2 seconds
        setTimeout(() => {
          copyBtn.classList.remove('copied');
          copyBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
            </svg>
          `;
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy:', err);
      });
    });

    // Wrap pre element and add buttons
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);
    actionsContainer.appendChild(copyBtn);
    if (githubBtn) {
      actionsContainer.appendChild(githubBtn);
    }
    wrapper.appendChild(actionsContainer);
  });
}

// Legacy function for old copy buttons (keep for backwards compatibility)
function copyToClipboard(button) {
  const details = button.closest('details');
  if (!details) {
    console.error('Could not find details element');
    return;
  }

  const codeBlock = details.querySelector('pre code, code');
  if (!codeBlock) {
    console.error('Could not find code block');
    return;
  }

  let text = codeBlock.textContent;
  text = text.replace(/\s*\/\/\s*[🟠🟢🔵].*$/gm, '');

  navigator.clipboard.writeText(text).then(() => {
    const originalText = button.innerHTML;
    button.innerHTML = '✅ Copied!';
    button.style.backgroundColor = '#22c55e';

    setTimeout(() => {
      button.innerHTML = originalText;
      button.style.backgroundColor = '';
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy:', err);
    button.innerHTML = '❌ Failed';
    button.style.backgroundColor = '#ef4444';

    setTimeout(() => {
      button.innerHTML = '📋 Copy to Clipboard';
      button.style.backgroundColor = '';
    }, 2000);
  });
}

// ============================================
// Expose functions globally for inline handlers
// ============================================
window.toggleTheme = toggleTheme;
window.toggleMobileMenu = toggleMobileMenu;
window.copyToClipboard = copyToClipboard;
