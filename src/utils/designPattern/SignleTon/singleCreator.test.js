import { LoginForm } from "./LoginForm";
import { singleCreator } from "./singleCreator";
describe('singleCreator', () => {
    test('生成单例', () => {
        const _LoginForm = singleCreator(LoginForm)
        const _lf1 = new _LoginForm('abiha', '123456')
        const _lf2 = new _LoginForm('ahiba', '654321')
        expect(_lf1).toBe(_lf2)
        expect(_lf1.name).toBe('abiha')
        expect(_lf2.password).toBe('123456')
    })
})