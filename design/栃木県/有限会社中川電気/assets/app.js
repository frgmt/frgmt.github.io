/**
 * 有限会社 中川電気 — 動く部分だけ。
 *
 * 原則: ページの内容はすべて index.html に実在する。
 * ここでやるのは「既に動いているものの上乗せ」だけで、
 * JSを切ってもコンテンツは全文読めて、全リンクが機能する。
 */
;(function () {
  'use strict'

  // scroll-reveal の初期状態(opacity:0)は .js が付いたときだけ効く。
  // これを付ける前にCSSが当たると、JS失敗時に本文が永久に不可視になる。
  document.documentElement.classList.add('js')

  var Vue = window.Vue
  if (!Vue) return // CDNが落ちてもページは壊れない

  var createApp = Vue.createApp
  var ref = Vue.ref

  /** 対象要素が無いページで mount() が例外を投げ、以降が止まるのを防ぐ */
  function mountIfPresent(selector, options) {
    var el = document.querySelector(selector)
    if (el) createApp(options).mount(el)
  }

  // ── モバイルナビ ───────────────────────────────────────
  // リンクはHTMLに実在する。Vueはクラスを1つ切り替えるだけ。
  mountIfPresent('#nav', {
    setup: function () {
      var open = ref(false)
      return {
        open: open,
        toggle: function () {
          open.value = !open.value
        },
      }
    },
  })

  // ── 施工実績の絞り込み ─────────────────────────────────
  // カードはHTMLに実在し、v-show で隠すだけ。生成はしない。
  mountIfPresent('#works', {
    setup: function () {
      var ALL = 'すべて'
      var active = ref(ALL)
      // これはUIコントロールであってコンテンツではないので配列で持ってよい
      var categories = [ALL, '電気設備', '防犯設備', '太陽光・蓄電池', '消防設備']
      return {
        active: active,
        categories: categories,
        matches: function (c) {
          return active.value === ALL || active.value === c
        },
      }
    },
  })

  // ── スクロール表示 ─────────────────────────────────────
  var targets = document.querySelectorAll('[data-reveal]')
  if (!targets.length) return

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) {
      el.classList.add('is-visible')
    })
    return
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return
        e.target.classList.add('is-visible')
        io.unobserve(e.target)
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  )
  targets.forEach(function (el) {
    io.observe(el)
  })
})()

