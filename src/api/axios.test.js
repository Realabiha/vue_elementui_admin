import {userLogin} from './index'
import {typeOf} from '../utils/tools'
describe('api', () => {
    // const fn = jest.fn()
    test('userLogin', async () => {
        // const fn = jest.fn();
        const res = await userLogin()
        expect(typeOf(res)).toBe('Object')
    })
})