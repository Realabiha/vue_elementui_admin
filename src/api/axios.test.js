import {userLogin} from './index'
test('userLogin', async () => {
  const res = await userLogin()
  expect(res).toEqual({code: '0'})
})