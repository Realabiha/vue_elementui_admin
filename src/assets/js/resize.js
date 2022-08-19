/**
 * @description: 调整窗口时重置页面宽度
 * @param {*}
 * @return {*}
 */
(function(){
  if(window.onresize) return
  window.onresize = function(){
    const screenWidth = screen.width,
    documentElement = document.documentElement
    if(screenWidth > documentElement.clientWidth){
      // documentElement.style.width = screenWidth + 'px'
      // document.body.style.width = '100%'
    }
  }
}())