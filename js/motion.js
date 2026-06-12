// motion.js - scroll reveals, count-up stats, and a subtle hero parallax.
// All motion is gated on prefers-reduced-motion. Shared across pages; every
// hook is optional, so including this file on a page with none of them is a no-op.

(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- scroll reveal ----
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    if (reduce || !('IntersectionObserver' in window)) {
      reveals.forEach(function (el) { el.classList.add('reveal-in'); });
    } else {
      var io = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-in');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
      reveals.forEach(function (el) { io.observe(el); });
    }
  }

  // ---- count-up ----
  // <span data-count="584000" data-prefix="$" data-suffix="K"> ... </span>
  // data-count is the final number; format with prefix/suffix/plus as needed.
  function formatCount(el, value) {
    var prefix = el.dataset.prefix || '';
    var suffix = el.dataset.suffix || '';
    var plus = el.dataset.plus === 'true' ? '+' : '';
    return prefix + value.toLocaleString('en-US') + suffix + plus;
  }
  function countUp(el) {
    var target = Number(el.dataset.count);
    if (reduce) { el.textContent = formatCount(el, target); return; }
    var duration = Number(el.dataset.duration || 1400);
    var start = null;
    function step(now) {
      if (start === null) start = now;
      var p = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = formatCount(el, Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = formatCount(el, target);
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    if (reduce || !('IntersectionObserver' in window)) {
      counters.forEach(function (el) { el.textContent = formatCount(el, Number(el.dataset.count)); });
    } else {
      var cio = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { countUp(entry.target); obs.unobserve(entry.target); }
        });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { cio.observe(el); });
    }
  }

  // ---- subtle hero parallax ----
  var heroImg = document.querySelector('.hero-img');
  if (heroImg && !reduce) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        heroImg.style.transform = 'translateY(' + (window.scrollY * 0.12) + 'px)';
        ticking = false;
      });
    }, { passive: true });
  }
})();
