
/**
 * 双层for循环 O(n^2)
 * 快慢指针    O(n)
 * */
const splice = function (array, target) {
  let [fast, slow, result] = [0, 0, []]
  for (; fast < array.length; fast++) {
    if (array[fast] !== target) {
      result[slow] = array[fast]
      slow++
    }
  }
  return result
}

splice([1, 2, 3, 4, 3], 3)