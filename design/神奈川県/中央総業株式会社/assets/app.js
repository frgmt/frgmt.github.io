/* 中央総業 — 本当に対話が要る箇所だけ。内容はすべて HTML 側にある。 */
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
  function sync() { shut(!mq.matches ? true : false); }
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

  /* 2. ヘッダーの影（スクロール状態） */
  var mast = document.getElementById('mast');
  if (mast) {
    var tick = false;
    window.addEventListener('scroll', function () {
      if (tick) return;
      tick = true;
      requestAnimationFrame(function () {
        mast.classList.toggle('is-cast', window.scrollY > 8);
        tick = false;
      });
    }, { passive: true });
  }

  /* 3. 段階的な立ち上がり。reduced-motion なら即座に可視化して終わり。 */
  var rise = document.querySelectorAll('[data-rise]');
  var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!rise.length) return;
  if (calm || !('IntersectionObserver' in window)) {
    rise.forEach(function (el) { el.classList.add('is-on'); });
    return;
  }
  /* threshold は 0。ビューポートより背の高い要素は交差比が閾値に届かないため、
     「少しでも入ったら出す」に統一する。rootMargin の下辺だけ少し詰める。 */
  var io = new IntersectionObserver(function (rows) {
    rows.forEach(function (r) {
      if (!r.isIntersecting) return;
      r.target.classList.add('is-on');
      io.unobserve(r.target);
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0 });
  rise.forEach(function (el) { io.observe(el); });

  /* 保険：観測が何らかの理由で走らなかった要素を一定時間後に必ず可視化する。
     隠したままにするくらいなら、動きを捨てて内容を出す。 */
  window.setTimeout(function () {
    rise.forEach(function (el) { el.classList.add('is-on'); });
  }, 2600);
})();
