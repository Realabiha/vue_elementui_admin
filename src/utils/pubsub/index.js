const store = Object.create(null);
const exist = function (key) {
  if(!store[key]) store[key] = []
  return store[key]
};
export const pubsub = {
  on(type, cb) {
    const callbacks = exist(type);
    // if(!callbacks.includes(cb)) callbacks.unshift(cb);
    const i = callbacks.indexOf(cb)
    if(i >= 0){
      callbacks.splice(i, 1)
    } 
    callbacks.unshift(cb)
  },
  emit(type, data) {
    const callbacks = store[type];
    let i = callbacks.length,
      cb;
    while (i--) {
      cb = callbacks[i];
      cb(data);
    }
  },
  off(type, cb) {
    if (!cb) return delete store[type];
    const callbacks = store[type];
    let i = callbacks.length, fn;
    while (i--) {
      fn = callbacks[i];
      //回调不触发用户主动取消
      if (fn === cb || fn.$fn === cb) {
        callbacks.splice(i, 1);
      }
    }
  },
  once(type, cb) {
    const fn = (...args) => {
      this.off(type, cb);
      cb(...args);
    };
    // 标记$fn用于用户不触发时主动取消该回调
    // 回调触发后先解除绑定后执行回调
    fn.$fn = cb;
    this.on(type, fn);
  },
};
