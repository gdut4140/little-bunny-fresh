import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "./userStore";
import { insertCartAPI, findNewCartListAPI, delCartAPI } from "@/apis/cart";
export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore()
    const cartList = ref([])
    const isLogin = computed(() => userStore.userInfo.token)
    //获取最新购物车列表action
    const updateNewList = async () => {
        const res = await findNewCartListAPI()
        cartList.value = res.result
    }
    const addCart = async (goods) => {
        const { skuId, count } = goods
        if (isLogin.value) {
            //登录之后的加入购物车逻辑
            await insertCartAPI({ skuId, count })
            updateNewList()
        }
        else {
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

    }
    //删除购物车
    const delCart = async (skuId) => {
        if (isLogin.value) {
            //调用接口实现接口购物车删除
            await delCartAPI([skuId])
            updateNewList()
        }
        else {
            //方法一：找到删除下标值splice
            const idx = cartList.value.findIndex((item) => skuId == item.skuId)
            cartList.value.splice(idx, 1)
            //方法二：过滤方法filter
            // cartList.value = cartList.value.filter(item => skuId !== item.skuId)
        }
    }
    //清除购物车
    const clearCart = () => {
        cartList.value = []
    }
    //单选功能
    const singleCheck = (skuId, selected) => {
        //通过skuId找到要修改那一项
        const item = cartList.value.find((item) => item.skuId === skuId)
        item.selected = selected
    }
    //全选功能
    const allCheck = (selected) => {
        //把cartList中的每一项的selected设置为当前的全选框状态
        cartList.value.forEach(item => item.selected = selected)
    }
    //计算属性
    //1.总的数量：所有项count之和
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
    //2.总价：所有项的count*price之和
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
    const isAll = computed(() => cartList.value.length > 0 && cartList.value.every((item) => item.selected))
    //3.已选择数量
    const selectedCount = computed(() => cartList.value.filter(item => item.selected === true).reduce((a, c) => a + c.count, 0))
    //4.已选择商品价钱合计
    const selectedPrice = computed(() => cartList.value.filter(item => item.selected === true).reduce((a, c) => a + c.count * c.price, 0))
    //是否全选
    return {
        cartList,
        allCount,
        allPrice,
        isAll,
        selectedCount,
        selectedPrice,
        clearCart,
        addCart,
        delCart,
        singleCheck,
        allCheck,
        updateNewList
    }
},
    {
        persist: true
    })
