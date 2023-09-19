/**
 * 组件封装的原则
 * 通用性、扩展性
 * 
 * 
 * 
 * 考虑哪些
 * 1.这个组件怎么用 视图里 全局注册 Vue.component  js Vue.extend 
 * 内部复杂度和灵活度 template还是jsx  
 * 整体template局部jsx 
 * 支持的功能 props slots 自定义事件$refs 拿到组件实例 
 * 实例上挂在一些属性和方法 提高组件的？？？复用性
 * 
 * 
 * 表单组件： button防抖 大文件上传  双向绑定+校验
 * 业务组件： 长列表组件 搜索框组件搜索历史
 * 
 * 
 * 插槽
JSX
自定义事件
父子组件通讯
手动调用
props
$refs
通用性和灵活性

？？？

1.这个组件怎么用 视图里 全局注册 Vue.component  js Vue.extend
2.内部复杂度和灵活度 template还是jsx  整体template局部jsx
3.支持的功能 props slots 自定义事件
4.$refs 拿到组件实例 实例上挂在一些属性和方法 提高组件的？？？复用性

样式：低权重 预备调控类样式 bem
行为：基本行为和业务行为 放在父组件还是子组件 行为通知父组件 props传入还是定义在data

功能组件 UI组件的二次封装 button防重复 radio可取消
业务组件 虚拟列表 大文件上传

 * 
 * 
 * 
 * 
 * */ 