const sortSquare = function (array) {
  let [start, end, index, result] = [0, array.length - 1, array.length - 1, []]
  // 只小于的话可能会漏掉刚好等于的那一项
  while (start <= end) {
    let [left, right] = [Math.pow(array[start], 2), Math.pow(array[end], 2)]
    if (left > right) {
      result[index--] = left
      start++
    }
    if (left < right) {
      result[index--] = right
      end--
    }
    // 死循环
    if (left === right) {
      result[index--] = left
      start++
      end--
    }
  }
  return result
}

console.log(sortSquare([-4, -1, 0, 3, 10]))