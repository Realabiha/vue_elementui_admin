export function singleCreator(constructor){
    let instance = null
    return function(...args){
        if(!instance) instance = new constructor(...args)
        return instance
    }
}