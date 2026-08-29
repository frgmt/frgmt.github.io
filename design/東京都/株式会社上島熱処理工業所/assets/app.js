/* 株式会社上島熱処理工業所 — 本当に対話が要る箇所だけ。内容はすべて HTML 側にある。 */
(function () {
  'use strict';

  /* 1. モバイルメニュー */
  var tog = document.getElementById('tog');
  var helm = document.getElementById('helm');
  var mq = window.matchMedia('(max-width: 860px)');
  function shut(on) {
    if (!tog || !helm) return;
    helm.hidden = !on;
    tog.setAttribute('aria-expanded', String(on));
    tog.setAttribute('aria-label', on ? 'メニューを閉じる' : 'メニューを開く');
  }
  function sync() { shut(!mq.matches); }
  if (tog && helm) {
    sync();
    mq.addEventListener('change', sync);
    tog.addEventListener('click', function () { shut(helm.hidden); });
    helm.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && mq.matches) shut(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mq.matches && !helm.hidden) { shut(false); tog.focus(); }
    });
  }

  /* 2. ヘッダーの影 */
  var cap = document.getElementById('cap');
  if (cap) {
    var tick = false;
    window.addEventListener('scroll', function () {
      if (tick) return;
      tick = true;
      requestAnimationFrame(function () {
        cap.classList.toggle('is-lift', window.scrollY > 8);
        tick = false;
      });
    }, { passive: true });
  }

  /* 3. 段階的な立ち上がり。
     threshold は 0 —— ビューポートより背の高い要素は交差比が閾値に届かないため。 */
  var up = document.querySelectorAll('[data-up]');
  var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!up.length) return;
  if (calm || !('IntersectionObserver' in window)) {
    up.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }
  var io = new IntersectionObserver(function (rows) {
    rows.forEach(function (r) {
      if (!r.isIntersecting) return;
      r.target.classList.add('is-in');
      io.unobserve(r.target);
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0 });
  up.forEach(function (el) { io.observe(el); });

  /* 保険：観測が走らなかった要素は一定時間後に必ず可視化する。
     隠したままにするくらいなら、動きを捨てて内容を出す。 */
  window.setTimeout(function () {
    up.forEach(function (el) { el.classList.add('is-in'); });
  }, 2600);
})();
