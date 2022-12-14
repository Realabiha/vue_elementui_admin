import { deepClone } from ".";
describe('deepClone测试', () => {
    let target
    beforeEach(() => {
        target = {a: 1, b: {c: [2, [{d: 3}]]}}
    })
    test('null测试', () => {
        expect(deepClone(null)).toBe(null)
    })
    test('对象深克隆', () => {
        expect(deepClone(target)).toEqual(target)
    })
    test('循环引用对象深克隆', () => {
        target.a = target.b.e = target
        expect(deepClone(target)).toEqual(target)
    })
})