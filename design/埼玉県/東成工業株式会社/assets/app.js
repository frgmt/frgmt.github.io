/* モバイルナビの開閉だけ。ほかは CSS と HTML で完結させる。 */
(function () {
  var btn = document.querySelector('.tg');
  var nav = document.getElementById('nav');
  if (!btn || !nav) return;

  function setOpen(open) {
    nav.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  }

  btn.addEventListener('click', function () {
    setOpen(btn.getAttribute('aria-expanded') !== 'true');
  });

  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') setOpen(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setOpen(false);
      btn.focus();
    }
  });

  // 画面が広がったら開閉状態をリセットしておく
  var mq = window.matchMedia('(min-width: 70rem)');
  (mq.addEventListener ? mq.addEventListener.bind(mq, 'change') : mq.addListener.bind(mq))(function () {
    if (mq.matches) setOpen(false);
  });
})();
