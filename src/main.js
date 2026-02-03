import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
//引入初始化样式文件
import '@/styles/common.scss'
import { useIntersectionObserver } from '@vueuse/core'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
//定义全局指令
app.directive('img-lazy', {
    mounted(el, binding) {
        // 创建一个观察对象，来观察当前使用懒加载的元素
        // <img v-img-lazy="item.picture" alt="">
        //el:指令绑定的元素img
        //binding:binding.value 指令等于号后面绑定的表达式的值，图片url
        useIntersectionObserver(
            el,
            ([isIntersecting]) => {
                if (isIntersecting) {
                    el.src = binding.value
                }
            },
        )


    }
})