const store = Object.create(null);
const exist = function (key) {
  return store[key] || [];
};
export const pubsub = {
  on(type, cb) {
    const callbacks = exist(type);
    callbacks.unshift(cb);
  },
  emit(type, data) {
    const callbacks = exist(type);
    let i = callbacks.length,
      cb;
    while (i--) {
      cb = callbacks[i];
      cb(data);
    }
  },
  off(type, fn) {
    if (!fn) {
      delete store[type];
      return;
    }
    const callbacks = exist[type];
    let i = callbacks.length,
      cb;
    while (i--) {
      cb = callbacks[i];
      //回调不触发用户主动取消
      if (cb === fn || cb.$fn === fn) {
        callbacks.splice(i, 1);
      }
    }
  },
  once(type, cb) {
    const fn = function (...args) {
      this.off(type, fn);
      cb(...args);
    };
    // 标记$fn用于用户不触发时主动取消该回调
    // 回调触发后先解除绑定后执行回调
    fn.$fn = cb;
    this.on(type, fn);
  },
};
