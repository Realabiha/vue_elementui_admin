export default class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm;
    this.cb = cb;
    this.value = this.get(expOrFn);
  }
  get(expOrFn) {
    window.target = this;
    const value = this.vm[expOrFn] || expOrFn();
    window.target = null;
    return value;
  }
  update() {
    const oldValue = this.value;
    this.value = this.get();
    this.cb.call(this, this.value, oldValue);
  }
}
