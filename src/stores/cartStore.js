import { defineStore } from "pinia";
import { ref } from "vue";
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
    const delCart = (skuId) => {
        //方法一：找到删除下标值splice
        const idx = cartList.value.findIndex((item) => skuId == item.skuId)
        cartList.value.splice(idx, 1)
        //方法二：过滤方法filter
        // cartList.value = cartList.value.filter(item => skuId !== item.skuId)

    }
    return {
        cartList,
        addCart,
        delCart
    }
},
    {
        persist: true
    })
