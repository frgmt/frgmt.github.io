/* 栃木エーエルシー株式会社 — nav, header state, reveal fallback only. */
(function () {
  'use strict';
  var h = document.getElementById('hdr');
  if (h && window.Vue) {
    Vue.createApp({
      data: function () { return { open: false }; },
      mounted: function () {
        var s = this;
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') s.open = false; });
        h.querySelectorAll('.mn a').forEach(function (a) {
          a.addEventListener('click', function () { s.open = false; });
        });
      }
    }).mount(h);
  }
  var t = false, f = function () {
    document.documentElement.classList.toggle('down', window.scrollY > 24); t = false;
  };
  f();
  window.addEventListener('scroll', function () { if (t) return; t = true; requestAnimationFrame(f); }, { passive: true });

  if (!(CSS.supports && CSS.supports('animation-timeline: view()'))
      && !matchMedia('(prefers-reduced-motion: reduce)').matches
      && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    document.querySelectorAll('[data-in]').forEach(function (n) { io.observe(n); });
  }

})();
