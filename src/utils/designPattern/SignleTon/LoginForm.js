import { SingleTon } from ".";

export class LoginForm extends SingleTon {
    constructor(name, password){
        super()
        this.name = name
        this.password = password
    }
    login(){}
    render(){}
} 