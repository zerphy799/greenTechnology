import { onMounted, onUnmounted } from 'vue'

export function useBackToTop() {
  let btn = null

  function debounce(fn, delay) {
    var timer
    return function () {
      var ctx = this, args = arguments
      clearTimeout(timer)
      timer = setTimeout(function () { fn.apply(ctx, args) }, delay)
    }
  }

  function onScroll() {
    if (!btn) return
    if (window.pageYOffset > 500) {
      btn.classList.add('visible')
    } else {
      btn.classList.remove('visible')
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  onMounted(function () {
    btn = document.querySelector('.back-to-top')
    if (!btn) return

    window.addEventListener('scroll', debounce(onScroll, 150))
    btn.addEventListener('click', scrollToTop)
  })

  onUnmounted(function () {
    if (btn) {
      btn.removeEventListener('click', scrollToTop)
    }
    window.removeEventListener('scroll', onScroll)
  })
}
