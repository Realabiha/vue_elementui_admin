import store from '../store'
export const permission = {
    bind(el, binding, vnode) {


    },
    inserted(el, binding, vnode) {
        console.log(vnode, 'vnode')
        // 传入的 操作当前按钮所需权限
        const permission = binding.value
        if (permission) {
            if (vnode.componentInstance) {
                // 当前用户的按钮权限
                const btnPermission = vnode?.context.$route.meta.btn
                if (btnPermission) {
                    const hasPermission = btnPermission.includes(permission)
                    if (!hasPermission) {
                        console.log(el.parentNode, '没有此按钮权限')
                        el.parentNode.removeChild(el)
                    }
                }
            }
        }
    },
    update() {
    },
    componentUpdated() {
    },
    unbind() {
    }
}
