Array.prototype._bind = function (context) {
  const fn = this
  const inner = function (...args) {
    // new 要不要修改inner的原型
    // if (this instanceof inner) {
    //   const result = this(...args)
    //   if (typeof result === 'object' || typeof result === 'function') {
    //     return result
    //   }
    //   return this
    // }

    // inner.prototype = fn
    if (this instanceof fn) {
      const result = fn.apply(this, ...args)
      if (typeof result === 'object' || typeof result === 'function') return result
      return this
    }


    return fn.apply(context, args)
  }
  inner.prototype = Object.create(fn.prototype)
  inner.prototype.constructor = inner
  return inner
}