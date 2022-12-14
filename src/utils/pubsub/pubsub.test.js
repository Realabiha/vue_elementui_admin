// on once off emit 
import {pubsub} from '.'
describe('pubsub testing', () => {
    let callback
    beforeEach(() => {
        callback = jest.fn()
    })
    test('on回调执行', () => {
        pubsub.on('test', callback)
        pubsub.emit('test')
        expect(callback).toBeCalled()
    })
    test('once回调执行', () => {
        pubsub.once('test', callback)
        pubsub.emit('test')
        pubsub.emit('test')
        pubsub.emit('test')
        expect(callback.mock.calls.length).toBe(1)
    })
    test('emit回调执行多次', () => {
        pubsub.on('test', callback)
        pubsub.emit('test')
        pubsub.emit('test')
        pubsub.emit('test')
        expect(callback.mock.calls.length).toBe(3)
    })
    test('off取消回调', () => {
        pubsub.on('test', callback)
        pubsub.off('test')
        expect(callback.mock.calls.length).toBe(0)
    })
    test('on绑定多次回调', () => {
        pubsub.on('test', callback)
        pubsub.on('test', callback)
        pubsub.on('test', callback)
        pubsub.emit('test')
        pubsub.emit('test')
        pubsub.emit('test')
        expect(callback.mock.calls.length).toBe(3)
    })
})