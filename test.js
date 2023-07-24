const hailstone = function (n, result = [n]) {
  if (n <= 1) return result
  const _n = n % 2 === 0 ? n / 2 : 3 * n + 1
  result.push(_n)
  return hailstone(_n, result)
}

console.log(hailstone(42))

class Stack {
  constructor() {
    this.stack = []
  }
  push(item) {
    return this.stack.push(item)
  }
  pop() {
    return this.stack.pop()
  }
  peek() {
    return this.stack[this.size() - 1]
  }
  isEmpty() {
    return this.stack.length === 0
  }
  clear() {
    this.stack = []
  }
  size() {
    return this.stack.length
  }
}

// 十进制转二进制

const stack = new Stack()
const divBy2 = function (num) {
  const rest = num % 2
  stack.push(rest)
  const int = Math.floor(num / 2)
  if (int > 0) return divBy2(int)
  let result = ''
  while (!stack.isEmpty()) {
    result += stack.pop()
  }
  return result
}

console.log(divBy2(9))

class Queue {
  constructor() {
    this.queue = []
  }
  enqueue(item) {
    return this.queue.unshift(item)
  }
  dequeue() {
    return this.queue.pop()
  }
  front() {
    return this.queue(this.queue.length - 1)
  }
  isEmpty() {
    return this.queue.length === 0
  }
  size() {
    return this.queue.length
  }
}

// n个人玩游戏， 从第一个人开始，数到3则这个人淘汰，剩下最后一个人胜出
const names = ['a', 'b', 'c', 'd', 'e', 'f']
const rules = 3
const queue = new Queue()
const queueGames = function (names, rules) {
  for (let i = 0; i < names.length; i++) {
    queue.enqueue(names[i])
  }
  console.log(queue, 'queue')
  while (queue.size() > 1) {
    let i = 0
    while (i < rules) {
      if (i === rules - 1) {
        console.log(queue.dequeue(), i)
      } else {
        queue.enqueue(queue.dequeue())
      }
      i++
    }
    console.log(queue)
  }
  return queue.dequeue()
}

console.log(queueGames(names, rules))

class PriorityQueue {
  constructor() {
    this.queue = []
  }
  enqueue(item, priority = -Infinity) {
    const newQueueItem = { item, priority }
    const length = this.size()
    if (length === 0)
      return this.queue.unshift(newQueueItem)
    for (let i = length - 1; i >= 0; i--) {
      const queueItem = this.queue[i]
      // 从队首开始查找
      if (priority > queueItem.priority) {
        this.queue.splice(i + 1, 0, newQueueItem)
        return
      }
      // 当前优先级最低
      if (i === 0) {
        this.queue.unshift(newQueueItem)
        return
      }
    }
  }
  dequeue() {
    return this.queue.pop()
  }
  front() {
    return this.queue[this.size() - 1]
  }
  isEmpty() {
    return this.queue.length === 0
  }
  size() {
    return this.queue.length
  }
}

const priorityQueue = new PriorityQueue()
priorityQueue.enqueue('1', 10)
priorityQueue.enqueue('2', 1)
priorityQueue.enqueue('3', 100)
priorityQueue.enqueue('4', 80)
priorityQueue.enqueue('5', 90)
priorityQueue.enqueue('6', 9)
console.log(priorityQueue)

const genFunc = function* () {
  // yield 1
  // yield 2
  // yield 3
  // let i = 0
  // while (i <= 9) {
  //   yield i++
  // }
  // let account = 0
  // while (true) {
  //   account += yield account
  //   if (account < 0) {
  //     console.log('你说了', account)
  //     return
  //   }
  // }
}

const genObj = genFunc()
// console.log(genObj)
// for (let value of genFunc()) {
//   console.log(value)
// }
console.log([...genFunc()])
const genObj1 = genObj.next()
// console.log(genObj1)
const genObj2 = genObj.next(123)
// console.log(genObj2)
const genObj3 = genObj.next(-23)
// console.log(genObj3)
const genObj4 = genObj.next(-100)
// console.log(genObj4)
const genObj5 = genObj.next(-123)
// console.log(genObj5)

// 配置了自定义迭代接口就可以使用for of循环和展开运算符
const cardDesk = {
  suits: ['♠', '♥', '♣', '♦'],
  courts: ['J', 'Q', 'K', 'A'],
  [Symbol.iterator]: function* () {
    for (let suit of this.suits) {
      for (let i = 2; i <= 10; i++) {
        yield suit + i
      }
      for (let court of this.courts) {
        yield suit + court
      }
    }
  }
}
// console.log([...cardDesk])

// 是否存在循环引用

const isCircle = function (obj) {
  if (typeof obj !== 'object' || obj === null) return false
  const store = new WeakSet()
  let circle = false

  // 递归
  const check = function (obj) {
    if (store.has(obj)) circle = true
    store.add(obj)
    const keys = Object.keys(obj)
    for (let key of keys) {
      const item = obj[key]
      // 没有循环引用的情况且是对象
      if (!circle && typeof item === 'object' && item !== null) {
        check(item)
      }
    }
    // 遍历完当前属性，删除当前属性 防止同级属性指向同一个对象时误判
    store.delete(obj)
  }
  check(obj)

  // 迭代 无法判断同级属性指向同一个引用
  // const values = Object.values(obj)
  // while (!circle && values.length) {
  //   const value = values.pop()
  //   if (store.has(value)) circle = true
  //   store.add(value)
  //   if (!circle && typeof value === 'object' && value !== null) {
  //     const _values = Object.values(value)
  //     values.unshift(..._values)
  //   }
  // }

  return circle
}

const obj1 = {
  name: 'abiha',
  age: 18
}
const obj2 = {
  name: '🐨',
  age: 18
}
obj1.test = obj2
obj1.obj2 = obj2
console.log(isCircle(obj1))
console.log(JSON.stringify(obj1), 'isCircle')
// 合并两个有序链表

const list1 = {
  value: 10,
  next: null
}

const list2 = {
  value: 2,
  next: {
    value: 4,
    next: {
      value: 6,
      next: null
    }
  }
}


// 获取链表尾节点
const getListTail = function (list) {
  let next = list
  while (next.next) {
    next = next.next
  }
  return next
}
const mergeTwoSortedList = function (list1, list2) {

  let list = null

  const check = function (list1, list2) {
    if (list1 && list2) {
      // 获取当前节点的值并保存后面节点
      let { value: value1, next: next1 } = list1
      let { value: value2, next: next2 } = list2
      // 当前节点值的比较
      if (value1 < value2) {
        list ? getListTail(list).next = list1 : list = list1
        list1.next = null
        next2 = list2
      } else {
        list ? getListTail(list).next = list2 : list = list2
        list2.next = null
        next1 = list1
      }
      // 节点1迭代完成
      if (next1 === null && next2) {
        getListTail(list).next = next2
        return list
      }
      // 节点2迭代完成
      if (next2 === null && next1) {
        getListTail(list).next = next1
        return list
      }
      check(next1, next2)
    }
  }
  check(list1, list2)

  return list || list1 || list2
}

console.log(mergeTwoSortedList(list1, list2))

// 两个字符串的最长共同子串
const str1 = 'asdfgh'
const str2 = 'asdfgh'

const maxStr = function () {
  let result = ''

  for (let i = 0; i < str2.length; i++) {
    let str = str2[i]
    for (let j = i + 1; j < str2.length; j++) {
      str += str2[j]
      if (str1.indexOf(str) > -1) {
        if (str.length > result.length)
          result = str
      }
    }
  }
  console.log(result, 'result')
}

maxStr()

// 反转二叉树
const binaryTree = {
  value: 1,
  left: {
    value: 3,
    left: { value: 5 },
    right: { value: 7 }
  },
  right: {
    value: 2,
    left: { value: 4 },
    right: { value: 6 }
  }
}

const reverseBinaryTree = function (node) {
  const { left, right, value } = node
  // [right, left] = [left, right]
  if (left && right) {
    node.left = right
    node.right = left
    reverseBinaryTree(left)
    reverseBinaryTree(right)
  }
}
reverseBinaryTree(binaryTree)
console.log(binaryTree)

/*
1.mini-qiankun
2.动态表单
componet + 事件代理
3.vue-router
4.vuex
5.vue
6.ci/cd
*/


const rate = 100 / 750
const rem = rate * 100

let drem = 0

50 / drem == 100 / 750 * 10
