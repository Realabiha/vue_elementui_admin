import Dep from "./Dep.js";

const arrayProto = Array.prototype;
const tempProto = Object.create(arrayProto);
const methods = ["push", "pop"];

export default class Observer {
  constructor(target) {
    this.target = target;
    target.__ob__ = this;
    this.dep = new Dep();
    if (Array.isArray(target)) {
      for (let i = 0; i < methods.length; i++) {
        const method = methods[i];
        const origin = arrayProto[method];
        const description = {
          configurable: true,
          enumerable: true,
          writeable: true,
          value(...args) {
            console.log(`修改了${method}`);
            return origin.apply(this, args);
          },
        };
        Object.defineProperty(tempProto, method, description);
      }
      target.__proto__ = tempProto;
      this.observeArray(target);
    } else {
      this.walk();
    }
  }
  walk() {
    const keys = Object.keys(this.target);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      key !== "__ob__" && defineRective(this.target, key);
    }
  }
  observeArray(target) {
    for (let i = 0; i < target.length; i++) {
      const item = target[i];
      observe(item);
    }
  }
}
function defineRective(target, key, value) {
  const dep = new Dep();
  if (arguments.length === 2) value = target[key];
  const childOb = value.__ob__;
  const description = {
    configurable: true,
    enumerable: true,
    get() {
      console.log(`访问了${key}`);
      if (childOb) {
        childOb.dep.add();
      }
      dep.add();
      if (typeof value === "object") {
        new Observer(value);
      }
      return value;
    },
    set(newValue) {
      console.log(`设置了${key}`);
      if (value === newValue) return;
      dep.notify();
      value = newValue;
    },
  };

  Object.defineProperty(target, key, description);
}
function observe(target) {
  if (typeof target !== "object") return;
  if (target.__ob__) return target.__ob__;
  new Observer(target);
}
