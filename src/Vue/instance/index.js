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

/*
    策略模式合并，不同的属性采用不同的合并方式
    生命周期  callHook 转成数组 vm.$options.hook = [f,f,f]
    其他属性 Parent || Children Parent & Children
*/
export function mixin(data) {
    let origin = Vue.options
    const mergeOptions = data => Object.assign(origin, data)
    Vue.options = mergeOptions(data)
    return Vue
}
/*
    Vue插件可以是个函数
    也可以是个带instal方法的对象
    缓存已安装的插件
*/
export function use(plugin) {
    const plugins = Vue._installedPlugins || (Vue._installedPlugins = [])
    if (plugins.includes(plugin)) return
    typeof plugin === 'function' ? plugin(Vue) : plugin.apply(Vue)
    plugins.push(plugin)
    return Vue
}
/*
    根据是否传入配置对象
    没传返回指定name的构造函数
    传了注册指定name的构造函数
*/
export function component(name, options) {
    if (options) {
        const Constructor = Vue.extend(options)
        Vue.options.components[name] = Constructor
        return Constructor
    }
    return Vue.options.components[name]
}
export function filter(name, handler) {
    if (handler) {
        Vue.options.filter[name] = handler
        return
    }
    return Vue.options.filter[name]
}
export function directive(name, defination) {
    if (defination) {
        Vue.options.directive[name] = defination
        return
    }
    return Vue.options.directive[name]
}


/*
    异步api检测 微任务优先于宏任务
    pending标记 当前的异步任务有没有执行完毕，一次只能执行一个异步任务
    如果没有传入回调且支持promise则返回一个promise
*/
let pending = false
const callbacks = [watcher, watcher, callback]
let _resolve
function flushCallback() {
    pending = false
    const copies = callbacks.slice(0)
    copies.forEach(callback)
    callbacks.length = 0
}
export function nextTick(vm, callback) {
    if (pending) return
    pending = true
    callback
        ? callbacks.push(callback.bind(vm))
        : callbacks.push(_ => _resolve(vm))

    if (typeof Promise === 'function') {
        Promise.resolve().then(flushCallback)
    }
    setTimeout(flushCallback)
    if (!callback && typeof Promise === 'function') {
        return new Promise((resolve, reject) => {
            _resolve = resolve
        })
    }
}

initGlobalAPI(Vue)
export default Vue