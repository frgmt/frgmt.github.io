/**
 * 有限会社 大栗工業所 — 動く部分だけ。
 *
 * 原則: 内容はすべて index.html に実在する。
 * JSを切ってもコンテンツは全文読めて、全リンクが機能する。
 *
 * 出現アニメーションと進捗バーは CSS の animation-timeline で処理しており、
 * ここには入っていない（JS不要）。
 */
;(function () {
  'use strict'
  var Vue = window.Vue
  if (!Vue) return // CDNが落ちてもページは壊れない

  var el = document.querySelector('#top')
  if (!el) return

  // モバイルメニュー。リンクはHTMLに実在し、Vueはクラスを1つ切り替えるだけ。
  Vue.createApp({
    setup: function () {
      var on = Vue.ref(false)
      return { on: on }
    },
  }).mount(el)
})()

