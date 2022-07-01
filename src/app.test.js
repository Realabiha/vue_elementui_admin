import App from './app.vue'
import {mount} from 'vue-test-utils'
import { testEnvironment } from '../jest.config'

// 模拟挂在App组件
const wrapper = mount(App)

test('App', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
})
