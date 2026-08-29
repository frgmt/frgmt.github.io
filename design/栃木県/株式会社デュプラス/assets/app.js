/* 株式会社デュプラス — nav, header state, reveal fallback only. */
(function () {
  'use strict';
  var b = document.getElementById('bar');
  if (b && window.Vue) {
    Vue.createApp({
      data: function () { return { s: false }; },
      mounted: function () {
        var self = this;
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') self.s = false; });
        b.querySelectorAll('.mnu a').forEach(function (a) {
          a.addEventListener('click', function () { self.s = false; });
        });
      }
    }).mount(b);
  }
  var t = false, f = function () {
    document.documentElement.classList.toggle('slid', window.scrollY > 24); t = false;
  };
  f();
  window.addEventListener('scroll', function () { if (t) return; t = true; requestAnimationFrame(f); }, { passive: true });

  if (!(CSS.supports && CSS.supports('animation-timeline: view()'))
      && !matchMedia('(prefers-reduced-motion: reduce)').matches
      && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('here'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    document.querySelectorAll('[data-up]').forEach(function (n) { io.observe(n); });
  }

})();
