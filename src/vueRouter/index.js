// import Vue from 'vue'
// 1.Vue共享
import RouterView from '../components/routerView/index.vue'
import RouterLink from '../components/routerLink/index.vue'
let Vue
export default class VueRouter{
    static install(_Vue){
        Vue = _Vue
    }
    constructor(options){
        this.$options = options
        this.map = this.$options.routes.reduce((prev, item) => {
            prev[item.path] = item.component
            return prev
        }, {})
        this.init()
    }
    init(){
        let that = this
        Vue.mixin({created(){
            this.$options.routes = that.$options 
        }})
        this.initEvent()
        this.initComponent()
    }
    initEvent(){
        window.addEventListener('popstate', _ => {
            console.log(location.pathname, 'popstate')
            this.$options.path.current = location.pathname
            console.log(this.$options.router)
        })
    }
    initComponent(){
        let that = this
        this.$options.path = Vue.observable({current: '/home'})
        Vue.component('router-link', {
            props: {
                to: '/home'
            },
            render(h){
                let self = this
                return h('a', {attrs: {href: this.to}, on: {click: function(e){
                    e.preventDefault()
                    history.pushState(null, '', self.to)
                    console.log(history.length)
                    that.$options.path.current = self.to
                }}}, this.$slots.default)
            }
        })
        Vue.component('router-view', {
            render(h){
                return h(that.map[that.$options.path.current])
            }
        })
    }
}