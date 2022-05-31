import {
  formatGetLocalStorage,
  formatSetLocalStorage,
  formatGetSessionStorage,
  formatSetSessionStorage,
  removeLocalStorage,
  removeSessionStorage
} from './storage'


describe('LocalStorage', () => {
  test('string', () => {
    const str = 'test'
    expect(formatSetLocalStorage(str, str)).toBe(undefined)
    expect(formatGetLocalStorage(str)).toBe(str)
    expect(removeLocalStorage(str)).toBe(undefined)
    expect(formatGetLocalStorage(str)).toBe(null)
  })
  test('object', () => {
    const str = 'test',
          obj = {str}
    expect(formatSetLocalStorage(str, obj)).toBe(undefined)
    expect(formatGetLocalStorage(str)).toEqual(obj)
    expect(removeLocalStorage(str)).toBe(undefined)
    expect(formatGetLocalStorage(str)).toBe(null)
  })
})



describe('sessionStorage', () => {
  test('string', () => {
    const str = 'test'
    expect(formatSetSessionStorage(str, str)).toBe(undefined)
    expect(formatGetSessionStorage(str)).toBe(str)
    expect(removeSessionStorage(str)).toBe(undefined)
    expect(formatGetSessionStorage(str)).toBe(null)
  })
  test('object', () => {
    const str = 'test'
    const obj = {str}
    expect(formatSetSessionStorage(str, obj)).toBe(undefined)
    expect(formatGetSessionStorage(str)).toEqual(obj)
    expect(removeSessionStorage(str)).toBe(undefined)
    expect(formatGetSessionStorage(str)).toBe(null)
  })
})
