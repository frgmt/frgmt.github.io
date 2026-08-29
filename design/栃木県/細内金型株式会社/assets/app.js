/* 細内金型株式会社 — nav + header state only. The gate animation is CSS. */
(function () {
  'use strict';
  var h = document.getElementById('hd');
  if (h && window.Vue) {
    Vue.createApp({
      data: function () { return { z: false }; },
      mounted: function () {
        var s = this;
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') s.z = false; });
        h.querySelectorAll('.nv a').forEach(function (a) {
          a.addEventListener('click', function () { s.z = false; });
        });
      }
    }).mount(h);
  }
  var t = false, f = function () {
    document.documentElement.classList.toggle('slipped', window.scrollY > 24); t = false;
  };
  f();
  window.addEventListener('scroll', function () { if (t) return; t = true; requestAnimationFrame(f); }, { passive: true });

})();
