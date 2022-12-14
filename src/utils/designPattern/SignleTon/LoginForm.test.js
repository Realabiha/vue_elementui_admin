import { LoginForm } from "./LoginForm";
describe('LoginForm', () => {
    test('登陆表单单例', () => {
        const lf1 = new LoginForm()
        const lf2 = new LoginForm()
        expect(lf1).toBe(lf2)
    })
    test('登陆表单属性', () => {
        const lf1 = new LoginForm('abiha', '123456')
        expect(lf1.name).toBe('abiha')
        expect(lf1.password).toBe('123456')
    })
})