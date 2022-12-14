export class SingleTon{
    constructor(){
        if(SingleTon.instance) return SingleTon.instance
        SingleTon.instance = this
    }
}