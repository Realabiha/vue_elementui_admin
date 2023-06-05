import initGlobalAPI from "../init/initGlobalapi"
import initProps from "../observe/initState/initProps"
import initComputed from "../observe/initState/initComputed"
function Vue(options) {
    this._init(options)
}

Vue.options = {
    data() { },
    components: {},
    filter: {},
    directive: {}
}

// 原型链继承
export function extend(options = {}) {
    // Vue.extend
    const Sup = this
    const superCid = Sup.cid
    const cachedCtors = options._Ctor || (options._Ctor = {})
    if (cachedCtors[superCid]) return cachedCtors[superCid]




    const Sub = function VueComponent() {
        this._init(options)
    }
    Sub.prototype = Object.create(Sup.prototype)
    Sub.prototype.constructor = Sub
    Sub.cid = superCid++
    Sub['form'] = Sup



    /*
        mergeOptions如何合并
    */
    // mergeOptions
    Sub.options = Object.assign(options, Sup.options)

    /*
        组件实例化时的初始化 for(!(key in vm)) 会查找原型上的key 可能已经被初始化
        构造组件构造函数处理 提前处理一部分 + 构造函数缓存特性 减小组件实例化的性能消耗
        处理两次的原因？ Vue.mixin混入大量数据时
    */
    // 公共props代理到原型
    if (Sub.options.props) {
        initProps(Sub)
    }
    // 公共computed代理到原型
    if (Sub.options.computed) {
        initComputed(Sub)
    }

    // 共享静态方法
    Sub.extend = Sup.extend
    Sub.mixin = Sup.mixin
    Sub.use = Sup.use
    Sub.component = Sup.component
    Sub.directive = Sup.directive
    Sub.filter = Sup.filter


    const name = options.name || Sup.options.name
    Sub.options.components[name] = Sub

    // 缓存继承 标记为superCid父类 的子类
    cachedCtors[superCid] = Sub
    return Sub
}

export function mixin() {

}
export function use() {

}
export function component(name, options) {

}
export function filter() {

}
export function directive() {

}
export function nextTick() {

}

initGlobalAPI(Vue)
export default Vue