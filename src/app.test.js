import App from './app.vue'
import VueRouter from 'vue-router'
import {mount, shallowMount, createLocalVue} from '@vue/test-utils'
import Home from './components/home/index.vue'
import About from './components/about/index.vue'

describe('vueRouter', () => {
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter({
        routes: [
            {
                path: '/home:id',
                component: Home
            },
            {
                path: '/about:id',
                component: About
            },
        ]
    })
    const wrapper = mount(App, {
        // localVue,
        // router,
        mocks: {
            $route: {
                path: '/home',
                params: {id: '1'}
            }
        },
        stubs: ['router-view', 'router-link']
    })
    // test('Home Component', () => {
    //     expect(wrapper.contains(App)).toBe(true)
    // })
    test('App h1 text', () => {
        expect(wrapper.find('h1').text()).toBe('1')
    })
    test('App h1 attribute', () => {
        expect(wrapper.find('h1').attributes('id')).toBe('title')
    })
})

