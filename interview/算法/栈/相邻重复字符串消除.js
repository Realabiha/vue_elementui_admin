/**
 * abbacd
 * [ab]
 * */

const remove = function (str) {
  let result = ''
  for (let i = 0; i < str.length; i++) {
    const s = str[i]
    if (result.length === 0 || result[result.length - 1] !== s) {
      result = result + s
    } else if (result[result.length - 1] === s) {
      result = result.slice(0, -1)
    }
  }
  return result
}

console.log(remove('abbacd'))