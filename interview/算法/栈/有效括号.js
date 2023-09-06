/**
 * 1.(
 * 2.(}
 * 3.))
 * */

const close = function (str) {
  if (str.length % 2 !== 0) return false
  const stack = []
  for (let i = 0; i < str.length; i++) {
    const s = str[i]
    if (s === '(') {
      stack.push(')')
    } else if (s === '{') {
      stack.push('}')
    } else if (s === '[') {
      stack.push(']')
    }
    // 栈空了，但是还没遍历完 
    else if (stack.length === 0) {
      return false
    }
    // 栈顶元素不匹配
    else if (stack.pop() !== s) {
      return false
    }
    // 栈顶元素匹配
    else {
      stack.pop()
    }
    console.log(stack)
  }
  return stack.length === 0
}

console.log(close('()'))