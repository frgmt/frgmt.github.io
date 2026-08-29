/* 有限会社佐藤精機
   JS does three things only: the mobile nav, the header's scrolled state, and
   a reveal fallback for browsers without animation-timeline: view().
   Every word of content lives in index.html. */

(function () {
  'use strict';

  /* --- mobile nav (Vue, mounted on the header only — not the page) --- */
  var bar = document.getElementById('bar');
  if (bar && window.Vue) {
    Vue.createApp({
      data: function () { return { open: false }; },
      watch: {
        open: function (v) {
          if (!v) return;
          // close on outside click / escape / link tap
          var self = this;
          var off = function () { self.open = false; };
          bar.querySelectorAll('.nav__list a').forEach(function (a) {
            a.addEventListener('click', off, { once: true });
          });
        }
      },
      mounted: function () {
        var self = this;
        document.addEventListener('keydown', function (e) {
          if (e.key === 'Escape') self.open = false;
        });
      }
    }).mount(bar);
  }

  /* --- header scrolled state --- */
  var head = document.getElementById('masthead');
  if (head) {
    var ticking = false;
    var apply = function () {
      document.documentElement.classList.toggle('is-scrolled', window.scrollY > 24);
      ticking = false;
    };
    apply();
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    }, { passive: true });
  }

  /* --- reveal fallback: only where animation-timeline is unsupported --- */
  var hasTimeline = CSS.supports && CSS.supports('animation-timeline: view()');
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!hasTimeline && !reduced && 'IntersectionObserver' in window) {
    var targets = document.querySelectorAll('[data-reveal], .ladder__i');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('seen');
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    targets.forEach(function (t) { io.observe(t); });
  }

})();
