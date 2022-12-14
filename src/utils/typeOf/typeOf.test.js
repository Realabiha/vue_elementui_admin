import { typeOf } from ".";
describe('typeOf测试', () => {
    test('Object', () => {
        expect(typeOf(new Object())).toBe('Object')
    })
    test('Array', () => {
        expect(typeOf(new Array())).toBe('Array')
    })
    test('Function', () => {
        expect(typeOf(new Function())).toBe('Function')
    })
    test('Date', () => {
        expect(typeOf(new Date())).toBe('Date')
    })
    test('RegExp', () => {
        expect(typeOf(new RegExp())).toBe('RegExp')
    })
    test('Map', () => {
        expect(typeOf(new Map())).toBe('Map')
    })
    test('WeakMap', () => {
        expect(typeOf(new WeakMap())).toBe('WeakMap')
    })
    test('Set', () => {
        expect(typeOf(new Set())).toBe('Set')
    })
    test('WeakSet', () => {
        expect(typeOf(new WeakSet())).toBe('WeakSet')
    })
    test('Number', () => {
        expect(typeOf(new Number())).toBe('Number')
    })
    test('String', () => {
        expect(typeOf(new String())).toBe('String')
    })
    test('Undefined', () => {
        expect(typeOf(undefined)).toBe('Undefined')
    })
    test('Null', () => {
        expect(typeOf(null)).toBe('Null')
    })
    test('Symbol', () => {
        expect(typeOf(Symbol())).toBe('Symbol')
    })
})