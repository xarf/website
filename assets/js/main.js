/**
 * XARF Website - Main JavaScript
 */

// ============================================
// Theme Management
// ============================================
function initTheme() {
  // Check for saved theme preference or default to light mode
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
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

  // Event listeners
  window.addEventListener('resize', handleResize);
  document.addEventListener('keydown', handleEscape);

  // Log ready state
  console.log('🚀 XARF website loaded');
});

// ============================================
// Expose functions globally for inline handlers
// ============================================
window.toggleTheme = toggleTheme;
window.toggleMobileMenu = toggleMobileMenu;
