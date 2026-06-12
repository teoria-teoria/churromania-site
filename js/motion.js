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

  // ---- scroll-pinned steps ----
  var stepsSection = document.querySelector('[data-steps]');
  if (stepsSection) {
    var steps = stepsSection.querySelectorAll('.step');
    var progress = document.getElementById('steps-progress');
    var counter = document.getElementById('steps-counter');
    function isLg() { return window.matchMedia('(min-width: 1024px)').matches; }
    function setActive(idx) {
      for (var i = 0; i < steps.length; i++) steps[i].classList.toggle('is-active', i === idx);
      if (progress) progress.style.width = ((idx + 1) / steps.length * 100) + '%';
      if (counter) counter.textContent = ('0' + (idx + 1)).slice(-2);
    }
    function updateSteps() {
      if (reduce || !isLg()) {
        for (var i = 0; i < steps.length; i++) steps[i].classList.add('is-active');
        return;
      }
      var total = stepsSection.offsetHeight - window.innerHeight;
      var scrolled = Math.min(Math.max(-stepsSection.getBoundingClientRect().top, 0), total);
      var p = total > 0 ? scrolled / total : 0;
      setActive(Math.min(steps.length - 1, Math.floor(p * steps.length)));
    }
    updateSteps();
    window.addEventListener('scroll', updateSteps, { passive: true });
    window.addEventListener('resize', updateSteps);
  }

  // ---- inject US map + highlight target states ----
  var mapEl = document.getElementById('us-map');
  if (mapEl) {
    fetch('images/us-map.svg').then(function (r) { return r.text(); }).then(function (svg) {
      mapEl.innerHTML = svg;
      var node = mapEl.querySelector('svg');
      if (node) {
        if (!node.getAttribute('viewBox')) {
          var w = node.getAttribute('width'), h = node.getAttribute('height');
          if (w && h) node.setAttribute('viewBox', '0 0 ' + parseFloat(w) + ' ' + parseFloat(h));
        }
        node.removeAttribute('width'); node.removeAttribute('height');
        node.setAttribute('role', 'img');
        node.setAttribute('aria-label', 'Map of the United States with Florida, Texas, California, and Arizona highlighted as expansion markets.');
      }
      var targets = (mapEl.dataset.targets || '').split(',');
      targets.forEach(function (id) {
        var p = mapEl.querySelector('#' + id.trim());
        if (p) p.classList.add('is-target');
      });
    }).catch(function () {});
  }
})();
