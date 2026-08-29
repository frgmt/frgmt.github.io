/* 小曽根電機株式会社 — nav, header state, reveal fallback only. */
(function () {
  'use strict';
  var m = document.getElementById('mast');
  if (m && window.Vue) {
    Vue.createApp({
      data: function () { return { k: false }; },
      mounted: function () {
        var s = this;
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') s.k = false; });
        m.querySelectorAll('.menu a').forEach(function (a) {
          a.addEventListener('click', function () { s.k = false; });
        });
      }
    }).mount(m);
  }
  var q = false, f = function () {
    document.documentElement.classList.toggle('went', window.scrollY > 24); q = false;
  };
  f();
  window.addEventListener('scroll', function () { if (q) return; q = true; requestAnimationFrame(f); }, { passive: true });

  if (!(CSS.supports && CSS.supports('animation-timeline: view()'))
      && !matchMedia('(prefers-reduced-motion: reduce)').matches
      && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('up'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    document.querySelectorAll('[data-lift], .yr--mk').forEach(function (n) { io.observe(n); });
  }

})();
