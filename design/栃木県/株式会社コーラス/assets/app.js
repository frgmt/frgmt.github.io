/* 株式会社コーラス — nav, header state, reveal fallback only. */
(function () {
  'use strict';
  var t = document.getElementById('top');
  if (t && window.Vue) {
    Vue.createApp({
      data: function () { return { o: false }; },
      mounted: function () {
        var s = this;
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') s.o = false; });
        t.querySelectorAll('.nav a').forEach(function (a) {
          a.addEventListener('click', function () { s.o = false; });
        });
      }
    }).mount(t);
  }
  var q = false, f = function () {
    document.documentElement.classList.toggle('moved', window.scrollY > 24); q = false;
  };
  f();
  window.addEventListener('scroll', function () { if (q) return; q = true; requestAnimationFrame(f); }, { passive: true });

  if (!(CSS.supports && CSS.supports('animation-timeline: view()'))
      && !matchMedia('(prefers-reduced-motion: reduce)').matches
      && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('seen'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    document.querySelectorAll('[data-show]').forEach(function (n) { io.observe(n); });
  }

})();
