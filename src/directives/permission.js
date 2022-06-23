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
            const hasPermission = value == admin || value == role
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
