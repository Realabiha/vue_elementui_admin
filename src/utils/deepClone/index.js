import { typeOf } from "../typeOf"
export const deepClone = function(target, hash = new WeakMap()){
    if(!(typeOf(target) === 'Object' || typeOf(target) === 'Array')) return target
    if(hash.has(target)) return hash.get(target)
    const clone = typeOf(target) === 'Array' ? [] : {}
    hash.set(target, clone)
    for(let key in target){
        if(target.hasOwnProperty(key)){
            if(!(typeOf(target[key]) === 'Object' || typeOf(target[key]) === 'Array')){
                clone[key] = target[key]
            }else{
                clone[key] = deepClone(target[key], hash)
            }
        }
    }
    return clone
}