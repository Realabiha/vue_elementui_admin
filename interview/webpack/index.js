/**
 * webpack打包整体流程
 * 1.初始化 
 * 初始参数 读取配置 生成Compiler 注册指定的插件
 * 2.构建 
 * Compilation.make 读取入口模块 
 * 调用loaderrunner loader转换模块 
 * webpack acorn转换模块为AST 通过require/import找到依赖模块 递归依赖模块
 * 最终构建出有依赖关系、loader转换过的的module 模块依赖图
 * 3.生成 
 * 拆分合并模块得到chunk
 * Compilation.seal 开始转换module 构建ChunkGraph
 * 入口文件生成的模块
 * 动态加载的模块
 * splitChunks拆分的模块：runtime/公共依赖
 * 4.输出
 * 最后输出到文件系统的是包含
 * chunk文件和webpack运行时代码的bundle
 * 
 * 
 * 
 * webpack异步模块加载
 * JSONP+promise
 * 
 * 
 * 
 * webpack module chunk bundle 
 * 
 * 
 * 
 * 
 * 
 * 
 * webpack loader plugin
 * loader本质是一个模块转换器函数
 * loader大的执行有pitch阶段和正常阶段,执行顺序类似dom的捕获和冒泡阶段
 * pitch是loader函数上的一个属性，起到熔断的作用
 * loader函数的结果默认是有缓存功能的 ？？？怎么设计一个带有缓存功能的函数
 * loader函数的两个常用工具 loader-utils获取配置 scheme-utils验证配置
 * 
 * 
 * const loader = async function styleLoader(source, map, data){
 * 
 *  // return返回单个结果
 *  return source
 * 
 *  // callback返回多个结果
 *  this.callback(err, map, source) 
 * 
 *  // 异步返回结果(处理cpu密集型任务)
 *  const callback = this.async()
 *  await 123
 *  callback(err, map, source)
 * 
 *  // 禁用缓存
 *  this.cachable(false)
 * 
 *  // this上下文暴露出接口可以对编译产生副作用
 *  this.getOptions
 *  this.emitError
 *  this.emitWarn
 *  this.emitFile
 *  this.addDependence
 * }
 * 
 * [style-loader, css-loader, sass-loader]
 * styleLoader.pitch = function(remainingRequest, previousRequeest, data){
 *  // style-loader并不需要关心模块的内容,所以pitch很适合
 *  style-loader 的remainingRequest  'css-loader!sass-loader!./*.sass'
 *  css-loader 的previousLoader 'style-loader'
 *  
 *  var api = require('xxx/style-loader/lib/runtime/injectStylesIntoLinkTag.js')
 *  var content = require('!!css-loader!less-loader!./xxx.less');
 * 
 *  webpack loader-runner第一次执行在style-loader处中断，后面解析行内loader时直接跳过了style-loader
 *  
 * 
 *  module.exports = content
 * }
 * 
 * vue-loader 
 * 预处理阶段：vue-loader-plugin 重写module.rules规则
 * 处理阶段：pitch-loader noamal-loader 
 * vue-loader-plugin 
 * 遍历配置文件的module.rules, 使用resourceQuery转换js模块
 * import script from "./index.vue?vue&type=script&lang=js&"
 * 覆盖得到新的module.rules规则，复用用户配置的匹配规则
 * pitch-loader
 * noamal-loader
 * 
 * // 原始代码
  import xx from './index.vue';
  // 第一步，命中 vue-loader，转换为：
  import { render, staticRenderFns } from "./index.vue?vue&type=template&id=2964abc9&scoped=true&"
  import script from "./index.vue?vue&type=script&lang=js&"
  export * from "./index.vue?vue&type=script&lang=js&"
  import style0 from "./index.vue?vue&type=style&index=0&id=2964abc9&scoped=true&lang=css&"

  // 第二步，命中 pitcher，转换为：
  export * from "-!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./index.vue?vue&type=template&id=2964abc9&scoped=true&"
  import mod from "-!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./index.vue?vue&type=script&lang=js&";
  export default mod; export * from "-!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./index.vue?vue&type=script&lang=js&"
  export * from "-!../../node_modules/mini-css-extract-plugin/dist/loader.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./index.vue?vue&type=style&index=0&id=2964abc9&scoped=true&lang=css&"

  // 第三步，根据行内路径规则按序调用loader
 * 
 * 
 * webpack如何处理CMD和ESM的
 * 1.默认导出
 * module.exports = {} export default {}
 * 2.具名导出
 * export.exports = {a: 1} export const a = 1
 * 3.默认/具名导出
 * export.exports = {__esmodule:true, default: {}, a: 1}  export default {} export const a = 1
 * 
 * 
 * webpack HMR
 * 1.webpack-dev-server托管静态资源，同时hmr的客户端代码通过HotModuleReplacementPlugin插件注入到客户端
 * 2.浏览器加载js后，与webpack-dev-server建立websocket连接
 * 3.webpack监听文件变化，增量构建变更的模块，并通过websocket发送hash事件
 * 4.浏览器接收到hash后，请求manifest文件，确认增量更新范围
 * 5.浏览器加载增量更新模块
 * 6.webpack运行时触发变更模块的module.hot.accept回调，执行变更代码逻辑
 * 
 * 
 * webpck Tree Shaking
 * 1.esm
 * 2.babel module: false
 * 3.减少副作用
 * 4.compilation.hooks.build 得到ModuleGraph
 * 5.compilation.hooks.seal，遍历ModuleGraph标记未使用的变量，并在生成bundle时删除掉（Terser）
 *
 * 图的可达性算法
 * 
 * webpack 构建优化
 * 1.多进程
 * 2.缓存
 * 3.控制打包范围
 * 
 * 
 * */


const cacheFun = function (path) {
  const cache = new WeakMap()
  const inner = function (path) {
    const result = true
    cache.set(path, result)
    return result
  }
  return cache.get(path) || inner(path)

}