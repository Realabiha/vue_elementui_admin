import Dep from "./Dep.js";
export default class Observer {
  constructor(target) {
    // 标记
    target.__ob__ = this;
    // 数组
    this.dep = new Dep();
    if (Array.isArray(target)) {
      const arrayProto = Object.create(Array.prototype);
      const methods = ["push", "pop"];
      methods.forEach((method) => {
        const origin = Array.prototype[method];
        Object.defineProperty(arrayProto, method, {
          configurable: true,
          enumerable: true,
          writable: true,
          value(...args) {
            console.log(`设置了${method}`);
            return origin.apply(this, args);
          },
        });
      });
      target.__proto__ = arrayProto;
      // 深度
      target.forEach((item) => {
        if (typeof item === "object") new Observer(item);
      });
    } else {
      this.walk(target);
    }
  }
  walk(target) {
    const keys = Object.keys(target);
    keys.forEach((key) => {
      // 防止死循环？
      if (key !== "__ob__") defineReactive(target, key);
    });
  }
}

function defineReactive(target, key, value) {
  const childOb = target.__ob__ || new Observer(target);
  if (arguments.length === 2) {
    value = target[key];
  }
  // 递归
  if (typeof value === "object") {
    new Observer(value);
  }
  // const dep = new Dep();
  Object.defineProperty(target, key, {
    configurable: true,
    enumerable: true,
    get() {
      console.log(`读取了${key}`);
      childOb.dep.add();
      return value;
    },
    set(newValue) {
      console.log(`设置了${key}`);
      value = newValue;
      childOb.dep.notify();
    },
  });
}
