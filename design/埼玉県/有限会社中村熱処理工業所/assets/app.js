/* スクロール連動のフェードイン。prefers-reduced-motion 時は何もしない。 */
(function () {
  // JS が動く環境でだけ .js を付ける。
  // これが無い（JS無効）ときは CSS 側で要素を隠さないため、本文が必ず見える。
  document.documentElement.classList.add('js');

  var els = document.querySelectorAll('[data-up]');
  if (!els.length) return;

  if (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    for (var i = 0; i < els.length; i++) els[i].classList.add('is-in');
    return;
  }

  // threshold は 0 にする。ビューポートより背の高い要素（長い表・沿革など）は
  // 画面を覆い尽くすため「面積の8%が見えた」状態に決してならず、
  // threshold を上げると永久に表示されない要素が出る。
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -5% 0px', threshold: 0 });

  els.forEach(function (el) { io.observe(el); });

  // 保険。何らかの理由で監視が働かなかった要素を、
  // 読み込み完了から少し後に無条件で表示する（本文が消えたままにならないように）。
  window.addEventListener('load', function () {
    setTimeout(function () {
      els.forEach(function (el) { el.classList.add('is-in'); });
    }, 2500);
  });

  // 印刷時は全部見せる
  window.addEventListener('beforeprint', function () {
    els.forEach(function (el) { el.classList.add('is-in'); });
  });
})();
