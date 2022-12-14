import { TestEnvironment } from "jest-environment-jsdom";
import { SingleTon } from ".";
describe('SingleTon', () => {
    test('单例', () => {
        const s1 = new SingleTon()
        const s2 = new SingleTon()
        expect(s1).toBe(s2)
    })
})