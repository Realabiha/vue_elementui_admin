import PageNotFound from './index'
import {mount, shallow} from 'vue-test-utils'

describe('404', () => {
    test('404 1', () => {
        const wrapper = mount(PageNotFound)
        expect(wrapper.isVueInstance()).toBeTruthy()
        expect(wrapper.name()).toBe('PageNotFound')
        expect(wrapper.html()).toContain("<el-empty description=\""+ wrapper.props().des + "\"></el-empty>")
    })
    test('404 2', () => {
        const wrapper = mount(PageNotFound, {
            propsData: {
                des: '你好呀'
            }
        })
        expect(wrapper.attributes().description).toBe('你好呀')
    })
})
