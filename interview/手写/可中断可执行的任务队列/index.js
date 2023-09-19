/**
 * start 执行任务
 * pause 当前任务执行完成，中止
 * 所有任务执行完毕 返回一个promise
 * */
class PauseQueue {
  constructor(tasks) {
    this.tasks = tasks
    this.running = false
    this.start = 0
    this.result = []
  }
  async start() {
    if (this.running) return
    this.running = true
    while (this.start < this.tasks.length) {
      const task = this.tasks[this.start]
      let res
      try {
        res = await task()
      } catch (error) {

      }
      this.result.push(res || error)
      this.start++
      if (!this.running) break
    }

  }
  pause() {
    this.running = false
  }
}