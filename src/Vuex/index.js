// new Vuex.Store({
//     state: {count: 1},
//     mutation: {
//         add(state, payload){
//             state.count++
//         }
//     },
//     action: {
//         add(context){
//             context.commit('add')
//         }
//     }
// })
let Vue
class Store {
    constructor(options){
        this.$options = options
    }
}
export default _Vue => {
    Vue = _Vue
    Vue.mixin({
        beforeCreate(){
            if(this.$options && this.$options.$store){
                this.$store = this.$options.$store
            }else if(this.$parent && this.$parent.$store){
                this.$store = this.$parent.$store
            }
        }
    })
}