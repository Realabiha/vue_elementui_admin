class Dep {
  constructor() {
    this.watchers = []
  }
  add(watcher) {
    this.watchers.push(watcher)
  }
  depend() {
    const topWatcher = Dep.target
    if (topWatcher) {
      topWatcher.addDep(this)
    }
  }
  remove(watcher) {
    const index = this.watchers.findIndex(watcher)
    if (index >= 0) this.watchers.splice(index, 1)
  }
  notify() {
    let i = this.watchers.length
    while (i--) {
      this.watchers[i].update()
    }
  }
}

const targetStack = []
Dep.target = null

export function pushTarget(watcher) {
  targetStack.push(watcher)
  Dep.target = watcher
}
export function popTarget() {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}

export default Dep