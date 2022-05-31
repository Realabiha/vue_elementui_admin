import {typeOf, deepClone} from './tools'

describe('tools', () => {
  test('typeOf', () => {
    expect(typeOf(null)).toBe('Null')
    expect(typeOf([])).toBe('Array')
  })

  const obj = {a: 1, b: {c: [function d(){}]}}
  test('deepClone', () => {
    expect(deepClone(obj)).toEqual(obj)
  })
})
