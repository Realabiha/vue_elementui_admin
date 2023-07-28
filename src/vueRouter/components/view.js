export default {
  name: 'RouterView',
  functional: true,
  render(h, context) {
    let depth = 0
    let { parent, data } = context
    data.routerView = true
    let { matched } = parent.$route
    while (parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) depth++
      parent = parent.$parent
    }
    const component = matched[depth]
    return component ? h(component, data) : h('')
  }
}