/**
 * 株式会社増保鉄工 採用サイト — 動く部分だけ。
 *
 * 原則: 内容はすべて index.html に実在する。
 * JSを切ってもコンテンツは全文読めて、全リンクが機能する。
 *
 * Nuxt 版から静的HTMLへ書き換えた際、以下だけを Vue に残した:
 *   - モバイルメニューの開閉
 *   - 地図の遅延読み込み（クリックで iframe を差し込む facade）
 * スクロール時のヘッダー状態変化は素の JS。
 */
;(function () {
  'use strict'

  var Vue = window.Vue

  if (Vue) {
    // モバイルメニュー。リンクはHTMLに実在し、Vueはクラスを1つ切り替えるだけ。
    var header = document.querySelector('#site-header')
    if (header) {
      Vue.createApp({
        setup: function () {
          var open = Vue.ref(false)
          // メニューを開いている間は背面をスクロールさせない
          Vue.watch(open, function (v) {
            document.body.style.overflow = v ? 'hidden' : ''
          })
          return { open: open }
        },
      }).mount(header)
    }
  }

  // ヘッダーの状態変化。16px スクロールしたら罫を出す。
  var head = document.querySelector('#site-header')
  if (!head) return
  var onScroll = function () {
    head.classList.toggle('is-scrolled', window.scrollY > 16)
  }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})()
