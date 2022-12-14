class Dep{
    constructor(){
        this.callbacks = []
    }
    add(effect){
        this.callbacks.push(effect)
    }
    update(){
        this.callbacks.forEach(effect => effect())
    }
}
class Observer{
    constructor(data, selector = '#title'){
        this.wrapper = document.querySelector(selector)
        console.log(this.wrapper)

        this.touch(data)
    }
    touch(data){
        if(data.hasOwnProperty('_ob_')) return
        for(let key in data){
            if(data.hasOwnProperty(key)){
                this.observe(key, data)
            }
        }
    }
    observe(key, data){
        let value = data[key]
        const dep = new Dep()
        let that = this
        Object.defineProperty(data, key, {
            get(){
                console.log(`获取了${key}属性，值${value}`)
                const effect = () => {
                    console.log(`副作用：更新dom`)
                    that.wrapper.innerText = value
                } 
                dep.add(effect)
                return value
            },
            set(newValue){
                value = newValue
                console.log(`依赖收集：设置了${key}属性, 新值${value}`)
                dep.update()
            }
        })
        Object.defineProperty(data, '_ob_', {
            value: true,
            writable: false
        })
    }

}
const data = {a: 1}
const react = new Observer(data)
// data.a
setInterval(_ => data.a += 1, 1000)