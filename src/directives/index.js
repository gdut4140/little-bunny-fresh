//定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'
export const lazyPlugin = {
    install(app) {
        app.directive('img-lazy', {
            mounted(el, binding) {
                // 创建一个观察对象，来观察当前使用懒加载的元素
                // <img v-img-lazy="item.picture" alt="">
                //el:指令绑定的元素img
                //binding:binding.value 指令等于号后面绑定的表达式的值，图片url
                const { stop } = useIntersectionObserver(
                    el,
                    ([isIntersecting]) => {
                        if (isIntersecting) {
                            el.src = binding.value
                            stop()
                        }
                    },
                )


            }
        })
    }
}