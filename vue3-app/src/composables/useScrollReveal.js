import { onMounted, onUnmounted } from 'vue'

/**
 * 滚动揭示动效系统
 * 使用 Intersection Observer 检测元素进入视口后添加 reveal-visible 类
 * 带安全兜底：500ms 后仍未揭示的元素自动显示
 */
export function useScrollReveal() {
  let observer = null
  let safetyTimer = null

  function revealElement(el) {
    el.classList.add('reveal-visible')
    // 处理序贯子元素
    var stagger = el.querySelectorAll('[data-reveal-stagger]')
    stagger.forEach(function (child, i) {
      setTimeout(function () {
        child.classList.add('reveal-visible')
      }, i * 100)
    })
  }

  function init() {
    // 清除旧的安全定时器
    if (safetyTimer) clearTimeout(safetyTimer)

    // 不支持 IntersectionObserver 时直接显示所有元素
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-reveal]').forEach(revealElement)
      document.querySelectorAll('[data-reveal-stagger]').forEach(function (el) {
        el.classList.add('reveal-visible')
      })
      return
    }

    if (observer) observer.disconnect()

    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          revealElement(entry.target)
          observer.unobserve(entry.target)
        }
      })
    }, {
      threshold: 0,
      rootMargin: '0px'
    })

    var elements = document.querySelectorAll('[data-reveal]')
    elements.forEach(function (el) {
      observer.observe(el)
    })

    // 安全兜底：500ms 后强制显示所有仍未揭示的元素
    safetyTimer = setTimeout(function () {
      document.querySelectorAll('[data-reveal]:not(.reveal-visible)').forEach(revealElement)
      document.querySelectorAll('[data-reveal-stagger]:not(.reveal-visible)').forEach(function (el) {
        el.classList.add('reveal-visible')
      })
    }, 500)
  }

  function refresh() {
    if (observer) observer.disconnect()
    init()
  }

  onMounted(function () {
    // 使用 nextTick 等效延迟，确保 Vue 渲染完毕
    setTimeout(init, 50)
  })

  onUnmounted(function () {
    if (observer) observer.disconnect()
    if (safetyTimer) clearTimeout(safetyTimer)
  })

  return { refresh }
}

/**
 * 数字滚动计数动效
 */
export function animateCount(el) {
  var text = el.textContent || ''
  var match = text.match(/([\d,.]+)/)
  if (!match) return

  var prefix = text.substring(0, match.index)
  var suffix = text.substring(match.index + match[0].length)
  var raw = match[1].replace(/,/g, '')
  var target = parseFloat(raw)
  if (isNaN(target)) return

  var duration = 1600
  var startTime = null

  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
  }

  function step(timestamp) {
    if (!startTime) startTime = timestamp
    var progress = Math.min((timestamp - startTime) / duration, 1)
    var current = target * easeOutExpo(progress)

    if (raw.includes('.')) {
      el.textContent = prefix + current.toFixed(raw.split('.')[1].length) + suffix
    } else {
      el.textContent = prefix + Math.floor(current).toLocaleString() + suffix
    }

    if (progress < 1) {
      requestAnimationFrame(step)
    } else {
      el.textContent = text
    }
  }

  requestAnimationFrame(step)
}

/**
 * 监听元素进入视口后触发计数动画
 */
export function useCountUp() {
  var countObserver = null
  var countSafetyTimer = null

  function init() {
    if (countSafetyTimer) clearTimeout(countSafetyTimer)

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-count-up]').forEach(animateCount)
      return
    }

    if (countObserver) countObserver.disconnect()

    countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target)
          countObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.3 })

    document.querySelectorAll('[data-count-up]').forEach(function (el) {
      countObserver.observe(el)
    })

    // 安全兜底
    countSafetyTimer = setTimeout(function () {
      document.querySelectorAll('[data-count-up]').forEach(function (el) {
        if (el.textContent && el.textContent.match(/[\d,.]+/)) {
          var digits = el.textContent.match(/[\d,.]+/)[0]
          if (parseFloat(digits.replace(/,/g, '')) > 0) {
            animateCount(el)
          }
        }
      })
    }, 800)
  }

  function refresh() {
    if (countObserver) countObserver.disconnect()
    init()
  }

  onMounted(function () {
    setTimeout(init, 80)
  })

  onUnmounted(function () {
    if (countObserver) countObserver.disconnect()
    if (countSafetyTimer) clearTimeout(countSafetyTimer)
  })

  return { refresh }
}
