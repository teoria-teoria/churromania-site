// nav.js - sticky header state + mobile menu toggle. Shared across every page.

(function () {
  const header = document.getElementById('site-header');
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('mobile-menu');

  // Sticky header: transparent at the very top, solid + blur once scrolled.
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 8) {
      header.classList.add('bg-white/80', 'backdrop-blur-md', 'shadow-sm');
    } else {
      header.classList.remove('bg-white/80', 'backdrop-blur-md', 'shadow-sm');
    }
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu open/close.
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      const isOpen = !menu.classList.contains('hidden');
      menu.classList.toggle('hidden');
      toggle.setAttribute('aria-expanded', String(!isOpen));
    });
    // Close the menu when a link inside it is tapped.
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.add('hidden');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();
