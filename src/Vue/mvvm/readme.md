## MVVM

# M

- 数据层
- data/props/computed/watch/methods

# VM

- 监听数据变化Object.defineProperty 通知视图更新Watcher
- 监听视图变化v-model/v-on:click 通知数据更新this.data

# V

- 视图层
- template 弱编程性
- JSX 更灵活

容器 + 模板
1.el outerHTML、template  el是容器 template是模板
2.$mount(el) 编译模板、可传递参数指定视图容器 el是容器 el.innerHTML是模板
3.template + el / $mount(el) 只负责描述模板  编译后需要指定视图容器 el是容器 template el.outerHTML是模板

vm.$el会会替换el

data 中只处理没被冻结的数组和对象 深度监听 可枚举的 非Symbol类型 私有属性
fn = _=>_
fn.myProperty = 'myProperty'

冻结的对象 其属性的描述符 configurable: false

所谓的指令其实是给标签添加的自定义属性
v-name:args.修饰符=值/状态

vm.$on(click, fn)
v-on:click.capture.stop=fn(arg1, arg2)
v-on:click.capture=fn1
v-on:click.capture=fn2(arg1, arg2, $event)
{
  name: v-on
  args: [click]
  <!-- 表达式的值 -->
  value: fn1,
  <!-- 表达式 -->
  expression: fn(arg1, arg2)
  modifiers: {
    capture,
    stop
  }
}
el.addEventlistener(click, function(e){
  e.stopPropagation()

  fn(arg1, arg2)
  fn1(e)
  fn(arg1, arg2, e)
}, {capture: true})
v-for @click 每个元素都会绑定点击事件 没有用到事件委托 可以绑定到容器元素上

initMethods methods里的函数Vue内部会用bind绑定this 当前组件实例

computed:{
  sum(){
    return this.a + this.b
  }
  this.sum = 100 报错 没有setter
  sum: {
    get(){
      return this.a + this.b
    }
    set(newValue){
      <!-- 可修改computed的值 -->
    }
  }
}

v-on:click=handler @click=handler
v-bind:click=handler :click=handler
v-slot:click=handler #click=handler

父 ---> 子
props slots 自定义事件 $children $attrs（props未声明）
子 ---> 父
refs $parent $root $listeners $emit

diff
原则 同层比较 深度优先
新节点和旧节点不相同 删除旧的 创建新的
新节点和旧节点相同 比较属性 比较子节点
新节点子节点没有children 删除旧节点子节点
新节点子节点有children 旧节点子节点没有children 创建新节点子节点
新节点子节点有children 旧节点子节点有children 比较新旧子节点
新旧子节点的children 首尾节点可比较四次查找相同子节点 没有找到则遍历新子节点和旧子节点查找
while(newStartIndex <= newEndIndex && oldStartIndex <= oldEndIndex)
旧首 新首 匹配 新旧指针++         不调整
旧尾 新尾 匹配 新指针-- 旧指针--  不调整
旧首 新尾 匹配 新指针-- 旧指针++  abc bcdefa  abc --> bca 调整a的位置 旧a插入到尾部
旧尾 新首 匹配 新指针++ 旧指针--  abc cabdef  abc --> cab 调整c的位置 旧c插入到头部
首尾查找未匹配 遍历旧子节点 生成key:index映射 新子节点的key查找
找到 旧节点对应子节点置为undefined

创建和删除
