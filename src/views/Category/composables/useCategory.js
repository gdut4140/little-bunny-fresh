//封装分类数据业务相关代码
import { getCategoryAPI } from '@/apis/category'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { watch } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
export function useCategory() {
    //法二：路由参数变化时，分类数据重新获取数据
    const categoryData = ref({})
    const route = useRoute()
    const getCategory = async (id = route.params.id) => {
        const res = await getCategoryAPI(id)
        categoryData.value = res.result
    }
    onMounted(() => {//一次注册，多次触发
        getCategory()
    })
    onBeforeRouteUpdate((to) => {//一次注册，多次触发
        getCategory(to.params.id)
    })
    //法三：路由参数变化时，分类数据重新获取数据
    // const categoryData = ref({})
    // const route = useRoute()
    // const getCategory = async () => {
    //     const res = await getCategoryAPI(route.params.id)
    //     categoryData.value = res.result
    // }
    // onMounted(() => {
    //     getCategory()
    // })
    // watch(() => route.params.id, () => {
    //     getCategory()
    // })
    return {
        categoryData
    }
}