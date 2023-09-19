/**
 * 双指针 滑动窗口
 * 暴力双层for循环
 * */
const minLengthSum = function (array, target) {
  let [start, end, sum, result] = [0, 0, 0, Infinity]
  for (; end < array.length; end++) {
    sum += array[end]
    while (sum >= target) {
      result = Math.min(result, end - start + 1)
      sum -= array[start++]
    }
  }
  return result === Infinity ? -1 : result
}

console.log(minLengthSum([1, 2, 3, 4, 499], 500))