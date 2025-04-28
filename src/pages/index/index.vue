<template>
  <view><Title /></view>
  <view class="index">
    
    <view class="main-layout">
      <view class="nav-side">
        <category-nav :categories="categories" />
      </view>
      <view class="gap"></view>
      <view class="section-container">
        <category-section 
          v-for="category in categories" 
          :key="category" 
          :category="category" 
          :items="getItemsByCategory(category)" 
          :data-category="category"
        />
      </view>
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
import Title from '../../components/Title.vue';

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
  padding: 0 16px;
  // background-color: #f5f7fa;
  min-height: 200vh;
}
.header {
  position: fixed;
  top: 0;
  width: 100%;
  margin-bottom: 20px;
  padding: 16px 0;
  text-align: center;
  .title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
}
.main-layout {
  display: flex;
  top: 500px;
  flex-direction: row;
  height: 5%;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  // min-height: 100vh;
  margin-top: 5vh; // 增加顶部间距以避免与标题重叠
}
.nav-side {
  width: 20%;
  min-width: 180px;
  background: #f8f9fa;
  padding: 16px 8px 16px 0;
  box-sizing: border-box;
  border-radius: 8px;
  height: fit-content;
  position: sticky;
  top: 100px;
}
.gap {
  width: 5%;
}
.section-container {
  width: 60%;
  min-width: 300px;
  margin-top: 10%;
}
</style>
