<template>
  <view class="index">
    <view class="header">
      <text class="title">导航站</text>
      <category-nav :categories="categories" />
    </view>
    
    <view class="content">
      <category-section 
        v-for="category in categories" 
        :key="category" 
        :category="category" 
        :items="getItemsByCategory(category)" 
        :data-category="category"
      />
    </view>
    
    <back-to-top />
    <nut-toast v-model:visible="show" :msg="toastMsg" />
  </view>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import CategorySection from '../../components/CategorySection.vue';
import CategoryNav from '../../components/CategoryNav.vue';
import BackToTop from '../../components/BackToTop.vue';
import navConfig from '../../tools.json';

const show = ref(false);
const toastMsg = ref('');
const navItems = ref([]);

// 加载导航数据
onMounted(() => {
  navItems.value = navConfig;
});

// 获取所有分类
const categories = computed(() => {
  const categorySet = new Set();
  navItems.value.forEach(item => {
    if (item.catelog) {
      categorySet.add(item.catelog);
    } else {
      categorySet.add('other');
    }
  });
  return Array.from(categorySet);
});

// 根据分类获取导航项
const getItemsByCategory = (category) => {
  return navItems.value.filter(item => {
    if (category === 'other') {
      return !item.catelog || item.catelog === 'other';
    }
    return item.catelog === category;
  });
};

const showToast = (msg) => {
  toastMsg.value = msg;
  show.value = true;
};
</script>

<style lang="scss">
.index {
  padding: 16px;
  background-color: #f5f7fa;
  min-height: 100vh;
  
  .header {
    margin-bottom: 20px;
    padding: 16px 0;
    text-align: center;
    
    .title {
      font-size: 24px;
      font-weight: bold;
      color: #333;
    }
  }
  
  .content {
    padding-bottom: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
}
</style>
