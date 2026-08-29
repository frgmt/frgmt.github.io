/**
 * 林工業株式会社 — 動く部分だけ。
 *
 * 原則: 内容はすべて index.html に実在する。
 * JSを切ってもコンテンツは全文読めて、全リンクが機能する。
 *
 * 出現アニメーションは CSS の animation-timeline で処理（JS不要）。
 */
;(function () {
  'use strict'
  var Vue = window.Vue
  if (!Vue) return
  var head = document.querySelector('#head')
  if (!head) return
  Vue.createApp({
    setup: function () { return { on: Vue.ref(false) } },
  }).mount(head)
})()

