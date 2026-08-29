/**
 * 大古精機株式会社 — 動く部分だけ。
 *
 * 原則: 内容はすべて index.html に実在する。
 * JSを切ってもコンテンツは全文読めて、全リンクが機能する。
 *
 * 出現・能力軸の伸長は CSS の animation-timeline で処理しており、
 * ここには入っていない（JS不要）。
 */
;(function () {
  'use strict'
  var Vue = window.Vue
  if (!Vue) return

  var mast = document.querySelector('#mast')
  if (!mast) return

  Vue.createApp({
    setup: function () {
      var open = Vue.ref(false)
      return { open: open }
    },
  }).mount(mast)
})()

