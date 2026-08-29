/* ゼビオプラスト株式会社 — nav, header state, reveal fallback only. */
(function () {
  'use strict';
  var c = document.getElementById('cap');
  if (c && window.Vue) {
    Vue.createApp({
      data: function () { return { w: false }; },
      mounted: function () {
        var s = this;
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') s.w = false; });
        c.querySelectorAll('.nav a').forEach(function (a) {
          a.addEventListener('click', function () { s.w = false; });
        });
      }
    }).mount(c);
  }
  var t = false, f = function () {
    document.documentElement.classList.toggle('ran', window.scrollY > 24); t = false;
  };
  f();
  window.addEventListener('scroll', function () { if (t) return; t = true; requestAnimationFrame(f); }, { passive: true });

  if (!(CSS.supports && CSS.supports('animation-timeline: view()'))
      && !matchMedia('(prefers-reduced-motion: reduce)').matches
      && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    document.querySelectorAll('[data-slide]').forEach(function (n) { io.observe(n); });
  }

})();
