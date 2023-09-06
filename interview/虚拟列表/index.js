/**
 * 本质上是一种懒加载的思想
 * 模拟滚动的行为，根据滚动的距离动态计算出视口渲染的内容
 * 防止一次性渲染出大量数据造成性能问题
 * 可能首次加载时间太长，滚动不流畅
 * 
 * 
 * 滚动节流
 * 高度缓存
 * 二分查找起始索引
 * 
 * 
 * 问题：滑动太快出现白边，节流时长越长越容易出现
 * 解决：上下缓存各一页
 * */


// [1,1] left <= right [1,1) left < right
const binarySearch = (arr, target) => {
  // 左闭右开
  // let [left, right] = [0, arr.length]
  // while (left < right) {
  //   const mid = Math.floor((left + right) / 2)
  //   if (arr[mid] === target) {
  //     return mid
  //   } else if (arr[mid] > target) {
  //     right = mid
  //   } else {
  //     left = mid + 1
  //   }
  // }

  // 左闭右闭
  let [left, right] = [0, arr.length - 1]
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (arr[mid] === target) {
      return mid
    } else if (arr[mid] > target) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }

  return -1
}

console.log(binarySearch([1, 2, 3], 3))