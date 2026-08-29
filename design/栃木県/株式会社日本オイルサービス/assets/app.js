/**
 * 株式会社日本オイルサービス — 動く部分だけ。
 *
 * 原則: 内容はすべて index.html に実在する。
 * JSを切ってもコンテンツは全文読めて、全リンクが機能する。
 *
 * 出現アニメーションは CSS の animation-timeline で行っており、
 * ここには入っていない（JS不要）。
 */
;(function () {
  'use strict'

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // ── モバイルの目次 ────────────────────────────────────
  // リンクはHTMLに実在する。Vueはクラスを1つ切り替えるだけ。
  var Vue = window.Vue
  if (Vue) {
    var bar = document.querySelector('#topbar')
    if (bar) {
      Vue.createApp({
        setup: function () {
          var open = Vue.ref(false)
          return { open: open }
        },
      }).mount(bar)
    }
  }

  // ── 左レールの現在地表示 ──────────────────────────────
  // 読んでいる位置を示すだけ。無くても目次は機能する。
  var nav = document.querySelector('#railnav')
  if (nav && 'IntersectionObserver' in window) {
    var links = {}
    nav.querySelectorAll('a[href^="#"]').forEach(function (a) {
      links[a.getAttribute('href').slice(1)] = a
    })
    var ids = Object.keys(links)
    if (ids.length) {
      var seen = {}
      var spy = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) { seen[e.target.id] = e.isIntersecting })
          // 画面内にある最初のセクションを現在地とする
          var current = null
          for (var i = 0; i < ids.length; i++) {
            if (seen[ids[i]]) { current = ids[i]; break }
          }
          ids.forEach(function (id) {
            if (current === id) links[id].setAttribute('aria-current', 'true')
            else links[id].removeAttribute('aria-current')
          })
        },
        { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
      )
      ids.forEach(function (id) {
        var el = document.getElementById(id)
        if (el) spy.observe(el)
      })
    }
  }

  // ── 計測値のカウントアップ ────────────────────────────
  // 3つだけ。HTMLには最終値が書いてあるので、JSが動かなくても正しい数字が出る。
  var nums = document.querySelectorAll('[data-count]')
  if (!nums.length || reduce || !('IntersectionObserver' in window)) return

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return
        io.unobserve(e.target)
        countUp(e.target)
      })
    },
    { threshold: 0.6 }
  )
  nums.forEach(function (n) { io.observe(n) })

  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10)
    if (!isFinite(target)) return
    var dur = 900
    var start = null
    // 終端は必ず target。途中で止まっても最終フレームで正しい値になる。
    function frame(ts) {
      if (start === null) start = ts
      var p = Math.min(1, (ts - start) / dur)
      // ease-out。計器が落ち着くように終盤を緩める。
      var eased = 1 - Math.pow(1 - p, 3)
      el.textContent = String(Math.round(target * eased))
      if (p < 1) requestAnimationFrame(frame)
      else el.textContent = String(target)
    }
    requestAnimationFrame(frame)
  }
})()

