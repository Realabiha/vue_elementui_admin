/**
        * 大文件上传
        *
        * 什么格式上传
        * base64或者formdata
        * chunkId: hash_size_index
        * chunkSize: 12345,
        * chunkIndex: 0,
        * fileName: 哈哈,
        * fileSize: 12345678,
        * fileHash: ebawertyuc
        *
        *
        * 什么时候发送合并请求
        * 所有的分片都上传成功之后
        * 发送合并请求
        *
        *
        * 后端怎么合并文件
        * 后端新建文件夹把所有分片存储
        * 合并请求发送后，按照顺序进行合并
        * 合并完成后删除掉分片文件
        *
        *
        * 上传进度怎么计算
        * 监听每次上传进度，动态计算已经上传的文件大小
        *
        *
        *
        * 怎么做到上传失败重试
        * 上传分片失败之后，可以依据配置的失败重试次数
        * 再次上传重试
        *
        *
        * 怎么控制并发
        * 手写实现
        * 单例模式
        *
        *
        * 文件太大hash计算久怎么优化
        * 可以使用webworker线程来计算
        *
        *
        * 断点续传和秒传
        * 每次上传文件之前，先请求接口查询该文件的上传历史
        * 真正上传时筛选掉已经上传的
        *
        *
        * */


const request = function (data) {
  return new Promise((resolve, reject) => {
    const α = Math.random()
    setTimeout(_ => α > 0.5 ? resolve(α) : reject(α), α * 2000 + 1000)
  })
}


class Scheduler {
  constructor(max, retry = 0) {
    const { instance } = this
    if (instance) return instance
    this.queue = []
    this.max = max
    this.running = 0
    this.retry = retry
    this.instance = this
  }
  instance = null
  run(cb, data) {
    return new Promise((resolve, reject) => {
      this.queue.push({ cb, resolve, reject })
      this.next(data)
    })
  }
  next(data) {
    console.log(this.running)
    if (this.running < this.max && this.queue.length) {
      this.excute(data)
    }
  }
  excute(data) {
    const { cb, resolve, reject } = this.queue.shift()
    let retry = this.retry

    const func = _ => {
      const promise = cb(data)
      promise
        .then(resolve)
        .catch(err => retry <= 0 && reject(err))
        .finally(_ => {
          if (promise.state === 'resolved') {
            this.running--
            this.next(data)
            return
          }
          if (retry > 0) {
            func()
            retry--
            return
          }
          this.running--
          this.next(data)
        })
    }

    func()

    this.running++
  }
}

const schduler = new Scheduler(6)
const schduler2 = new Scheduler(6)

console.log(schduler === schduler2)

for (let i = 0; i < 10; i++) {
  schduler.run(request)
    .then()
    .catch()
}
