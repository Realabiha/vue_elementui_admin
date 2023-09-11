/*

*/
const deepClone = function (origin, map = new WeakMap()) {
  if (typeof origin !== 'object') return origin
  const clone = Array.isArray(origin) ? [] : {}
  // console.log(clone)
  if (map.has(origin)) return map.get(origin)
  map.set(origin, origin)
  for (let prop in origin) {
    if (origin.hasOwnProperty(prop)) {
      const value = origin[prop]
      if (typeof value !== 'object' || value === null) clone[prop] = value
      else clone[prop] = deepClone(value, map)
    }
  }
  return clone
}

const a = { name: 'abiha' }
const b = { age: 18 }
const c = [1, 2, 3]
a.b = b
b.a = a
// c.push(a)
a.c = c

const clone = deepClone(a)



const tree = { value: 1, children: [{ value: 2 }, { value: 3 }, { value: 4, children: [{ value: 5 }] }] }

const dfs = function (tree) {
  const queue = [tree]
  while (queue.length) {
    const node = queue.pop()
    const { value, children } = node
    console.log(value)
    if (!children) continue
    children.forEach(child => queue.push(child))
  }
}
dfs(tree)


const _new = function (constructor, ...args) {
  const instance = Object.create(constructor.prototype)
  const result = constructor.call(instance, ...args)
  if (typeof result === 'object' || typeof result === 'function') return result
  return instance
}

const _create = function (prototype) {
  const F = function () { }
  F.prototype = prototype
  return new F()
}

const _call = function (func, context, ...args) {
  const symbol = Symbol()
  context[symbol] = func
  context[symbol](...args)
}
const _bind = function (func, context, ...args) {
  const symbol = Symbol()
  context[symbol] = func
  const result = function (...innerArgs) {
    if (this instanceof func) {
      this[symbol] = func
      this[symbol](...args, ...innerArgs)
    } else {
      context[symbol](...args, ...innerArgs)
    }
  }
  result.prototype = Object.create(func.prototype)
  return result
}

const _inherit = function () {
  const Sup = function () { }
  const Sub = function () {
    Sup.call(this)
  }
  Sub.prototype = Object.create(Sup.prototype)
  Sub.prototype.constructor = Sub
  Sub['from'] = Sup
}