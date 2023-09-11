export const debounce = function (callback = _ => _, delay = 17, immediate = false) {
  let timer = null;
  return function (...args) {
    // later也可以是一个箭头函数，这样就不用绑定this了
    const later = function () {
      callback.apply(this, args)
      clearTimeout(timer)
      timer = null
    }

    const callNow = immediate && !timer;
    if (callNow) later.apply(context, args)

    // if (timer) {
    //   clearTimeout(timer)
    //   timer = null
    // }

    timer = setTimeout(later, delay)
  }
}
export const rafDebounce = function (callback) {
  let lock = false
  return function (...args) {
    requestAnimationFrame(() => {
      if (lock) return
      callback.apply(this, args)
      lock = false
    })
  }
}