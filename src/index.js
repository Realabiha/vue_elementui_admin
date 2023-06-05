import Vue from './Vue/instance'
const vm = new Vue({ data: { a: 1, b: [2, { c: 3 }] } })
vm.b.push({ d: [5, { e: 6 }] })
vm.a = []
vm.$set(vm.b[1], 'f', [])
vm.b[1].f.push(4)

vm.$set(vm.b[1].f, '2', 7)

console.dir(vm)
console.dir(Vue)