const originArrayProto = Array.prototype
const createArrayProto = Object.create(originArrayProto)
const methodsToPatch = ['push', 'pop', 'splice']

methodsToPatch.forEach(method => {
  createArrayProto[method] = function (...args) {
    const ob = this.__ob__
    console.log(`调用了${method}值`)
    const result = originArrayProto[method].apply(this, args)
    let insert
    if (method === 'push') {
      insert = args
    }
    if (method === 'splice') {
      insert = args.slice(2)
    }
    console.log(`修改了${method}值为`, insert)
    ob.array(args)
    ob.dep.depend()
    return result
  }
})

export default createArrayProto