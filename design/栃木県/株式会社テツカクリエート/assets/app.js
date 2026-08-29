/* 株式会社テツカクリエート
   JS handles only: mobile nav, header scroll state, and a reveal fallback
   for browsers without animation-timeline: view().
   All content lives in index.html. */

(function () {
  'use strict';

  var top = document.getElementById('top');
  if (top && window.Vue) {
    Vue.createApp({
      data: function () { return { on: false }; },
      mounted: function () {
        var self = this;
        document.addEventListener('keydown', function (e) {
          if (e.key === 'Escape') self.on = false;
        });
        top.querySelectorAll('.menu a').forEach(function (a) {
          a.addEventListener('click', function () { self.on = false; });
        });
      }
    }).mount(top);
  }

  var ticking = false;
  var mark = function () {
    document.documentElement.classList.toggle('is-down', window.scrollY > 24);
    ticking = false;
  };
  mark();
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(mark);
  }, { passive: true });

  var hasTL = CSS.supports && CSS.supports('animation-timeline: view()');
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!hasTL && !reduced && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('shown');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    document.querySelectorAll('[data-rise], .ev--mark').forEach(function (t) { io.observe(t); });
  }

})();
