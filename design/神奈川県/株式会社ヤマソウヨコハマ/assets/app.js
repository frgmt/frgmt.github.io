(function () {
  // JS が動く環境でだけ .js を付ける。JS 無効時は本文がそのまま見える。
  document.documentElement.classList.add('js');
  var els = document.querySelectorAll('[data-up]');
  if (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    for (var i = 0; i < els.length; i++) els[i].classList.add('is-in');
    return;
  }
  // threshold は 0 にする。ビューポートより背の高い要素は
  // 「面積の8%が見えた」状態に決してならない。
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -5% 0px', threshold: 0 });
  els.forEach(function (el) { io.observe(el); });
  window.addEventListener('load', function () {
    setTimeout(function () { els.forEach(function (el) { el.classList.add('is-in'); }); }, 2500);
  });
  window.addEventListener('beforeprint', function () {
    els.forEach(function (el) { el.classList.add('is-in'); });
  });
})();
