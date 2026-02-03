<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue'
//触发获取导航列表的actions
import { useCategoryStore } from '@/stores/category';
import { onMounted } from 'vue';

const categoryStore = useCategoryStore();
onMounted(() => {
    categoryStore.getCategory();
});

</script>

<template>
    <LayoutFixed />
    <LayoutNav />
    <LayoutHeader />
    <!-- 添加key 确保路由变化时RouterView重新渲染 -->
    <!-- <RouterView :key="$route.fullPath" /> -->
    <RouterView />
    <LayoutFooter />
</template>