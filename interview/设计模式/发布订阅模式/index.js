/**
 * 发布订阅模式
 * 有单独事件池
 * 发布者和订阅者没有直接引用
 * */


class Pubsub {
  constructor() {
    this.subs = new Map()
  }
  emit(type, data) {
    const subs = this.subs.get(type)
    if (!subs) return
    subs.forEach(cb => cb(data))
  }
  on(type, cb) {
    const has = this.subs.has(type)
    !has && this.subs.set(type, new Set())
    const subs = this.subs.get(type)
    subs.add(cb)
  }
  once(type, cb) {
    const wrap = function (...args) {
      cb(...args)
      this.off(type, wrap)
    }
    wrap.fn = cb
    this.on(type, wrap)
  }
  off(type, cb) {
    if (cb) {
      const subs = this.subs.get(type)
      subs.delete(cb)
      return
    }
    this.subs.delete(type)
  }
}