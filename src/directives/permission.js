import store from '../store'
export default function(){
    const admin = 'admin'
    return {
        bind(){
            console.log('bind')
        },
        inserted(el, binding){
            const {role} = store.state.user.userInfo
            const {value} = binding
            const hasPermission = role == admin || role == value
            if(!hasPermission){
                el.style.display = 'none'
            }
        },
        update(){
        },
        componentUpdated(){
        },
        unbind(){
        }
    }
}
