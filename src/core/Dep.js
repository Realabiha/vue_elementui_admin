export default class Dep {
  constructor() {
    this.subs = [];
  }
  add() {
    if (window.target) this.subs.push(window.target);
  }
  remove(watcher) {
    if (this.subs.length) {
      const index = this.subs.indexOf(watcher);
      if (index > -1) {
        this.subs.splice(index, 1);
      }
    }
  }
  notify() {
    this.subs.forEach((sub) => {
      sub.update();
    });
  }
}
