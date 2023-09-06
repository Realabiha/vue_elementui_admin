/**
 * 搜索结果与输入的关键字不同
 * 
 * 每次发送新请求前删除旧的请求
 * 
 * 展示最近五条搜索记录 LRU缓存
 * 
 * 代码实现
 * 
 * */

class LRU {
  constructor(max) {
    this.max = max
    this.cache = new Map()
  }
  get(key) {
    if (this.cache.has(key)) {
      const value = this.cache.get(key)
      this.cache.delete(key)
      this.put(key, value)
      return value
    }
  }
  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key)
      this.cache.set(key, value)
      return
    }
    if (this.cache.size === this.max) {
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
      this.cache.set(key, value)
      return
    }
    this.cache.set(key, value)
  }
}

const lru = new LRU(5)
lru.put('a', 1)
lru.put('b', 2)
lru.put('c', 3)
lru.put('d', 4)
lru.put('e', 5)
lru.put('f', 6)
console.log(lru.get('f'))
lru.get('b')
console.log(lru.cache.keys().next().value)
