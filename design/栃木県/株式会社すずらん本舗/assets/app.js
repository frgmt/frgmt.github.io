/* 株式会社すずらん本舗
   JS: mobile nav, header state, reveal fallback, and click-to-load maps.
   All content — including every address — is in the HTML. */
(function () {
  'use strict';

  var h = document.getElementById('head');
  if (h && window.Vue) {
    Vue.createApp({
      data: function () { return { m: false }; },
      mounted: function () {
        var s = this;
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') s.m = false; });
        h.querySelectorAll('.nav a').forEach(function (a) {
          a.addEventListener('click', function () { s.m = false; });
        });
      }
    }).mount(h);
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
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    document.querySelectorAll('[data-lift], .ln--k').forEach(function (n) { io.observe(n); });
  }
})();
