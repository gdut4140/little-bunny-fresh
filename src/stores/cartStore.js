import { defineStore } from "pinia";
import { computed, ref } from "vue";
export const useCartStore = defineStore('cart', () => {
    const cartList = ref([])
    const addCart = (goods) => {
        //添加购物车
        //已经添加过count加1
        //没有添加过直接push
        //思路：通过匹配传过来的商品对象中的skuId能不能在cartList中找到，找到就是添加过
        const item = cartList.value.find((cartItem) => goods.skuId === cartItem.skuId)
        if (item) {
            // 已经添加过，数量加1
            item.count += goods.count
        } else {
            // 没有添加过，直接push
            cartList.value.push(goods)
        }
    }
    //单选功能
    const singleCheck = (skuId, selected) => {
        //通过skuId找到要修改那一项
        const item = cartList.value.find((item) => item.skuId === skuId)
        item.selected = selected
    }
    const delCart = (skuId) => {
        //方法一：找到删除下标值splice
        const idx = cartList.value.findIndex((item) => skuId == item.skuId)
        cartList.value.splice(idx, 1)
        //方法二：过滤方法filter
        // cartList.value = cartList.value.filter(item => skuId !== item.skuId)

    }
    //计算属性
    //1.总的数量：所有项count之和
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
    //2.总价：所有项的count*price之和
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
    return {
        cartList,
        allCount,
        allPrice,
        addCart,
        delCart,
        singleCheck
    }
},
    {
        persist: true
    })
