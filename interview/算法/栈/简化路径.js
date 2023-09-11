/**
 * /home/  /home
 * 
 * /home/foo//bar/ /home/foo/bar
 * 
 * /home/./../  /
 * 
 * */

const simplePath = function (path) {
  let result = '/'
  const pathArr = path.split('/').filter(item => item && item !== '.');
  const stack = pathArr.reduce((prev, item) => {
    if (item === '..') {
      prev.pop();
    } else {
      prev.push(item);
    }
    return prev;
  }, [])
  result += stack.length ? stack.join('/') : '';
  return result
}
console.log(simplePath('/home/foo/./../bar/'))