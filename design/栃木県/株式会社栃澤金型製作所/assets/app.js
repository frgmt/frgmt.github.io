/* 株式会社栃澤金型製作所
   JS: mobile nav, header scroll state, reveal fallback. Content is in HTML. */
(function () {
  'use strict';
  var mast = document.getElementById('mast');
  if (mast && window.Vue) {
    Vue.createApp({
      data: function () { return { show: false }; },
      mounted: function () {
        var self = this;
        document.addEventListener('keydown', function (e) {
          if (e.key === 'Escape') self.show = false;
        });
        mast.querySelectorAll('.nav a').forEach(function (a) {
          a.addEventListener('click', function () { self.show = false; });
        });
      }
    }).mount(mast);
  }

  var t = false;
  var f = function () {
    document.documentElement.classList.toggle('scrolled', window.scrollY > 24);
    t = false;
  };
  f();
  window.addEventListener('scroll', function () {
    if (t) return; t = true; requestAnimationFrame(f);
  }, { passive: true });

  var hasTL = CSS.supports && CSS.supports('animation-timeline: view()');
  if (!hasTL && !matchMedia('(prefers-reduced-motion: reduce)').matches
      && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('seen'); io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    document.querySelectorAll('[data-up], .cr--key').forEach(function (n) { io.observe(n); });
  }

})();
