/* 株式会社雀宮産業 — nav, header state, reveal fallback only. */
(function () {
  'use strict';
  var c = document.getElementById('cap');
  if (c && window.Vue) {
    Vue.createApp({
      data: function () { return { v: false }; },
      mounted: function () {
        var s = this;
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') s.v = false; });
        c.querySelectorAll('.nv a').forEach(function (a) {
          a.addEventListener('click', function () { s.v = false; });
        });
      }
    }).mount(c);
  }
  var q = false, r = function () {
    document.documentElement.classList.toggle('rolled', window.scrollY > 24); q = false;
  };
  r();
  window.addEventListener('scroll', function () { if (q) return; q = true; requestAnimationFrame(r); }, { passive: true });

  if (!(CSS.supports && CSS.supports('animation-timeline: view()'))
      && !matchMedia('(prefers-reduced-motion: reduce)').matches
      && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    document.querySelectorAll('[data-rise], .ln--key').forEach(function (n) { io.observe(n); });
  }

})();
