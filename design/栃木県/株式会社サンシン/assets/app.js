/**
 * 株式会社サンシン — 動く部分だけ。
 *
 * 原則: 内容はすべて index.html に実在する。
 * JSを切ってもコンテンツは全文読めて、全リンクが機能する。
 *
 * 横スクロールレールは CSS の scroll-snap のみで動くため、
 * ここには入っていない（スライダーライブラリ不使用）。
 */
;(function () {
  'use strict'
  var Vue = window.Vue
  if (!Vue) return

  var bar = document.querySelector('#bar')
  if (!bar) return

  Vue.createApp({
    setup: function () {
      var shown = Vue.ref(false)
      return { shown: shown }
    },
  }).mount(bar)
})()

