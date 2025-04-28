<template>
  <view class="category-nav">
    <scroll-view scroll-y class="nav-scroll">
      <view class="nav-items">
        <view 
          v-for="category in categories" 
          :key="category" 
          class="nav-item"
          :class="{ active: activeCategory === category }"
          @click="handleCategoryClick(category)"
        >
          {{ getCategoryName(category) }}
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import categoryMap from '../categoryConfig.json';
import SafetyCheck from './SafetyCheck.vue';

const props = defineProps({
  categories: {
    type: Array,
    required: true
  }
});

const activeCategory = ref('');

const getCategoryName = (category) => {
  return categoryMap[category] || category;
};

const handleCategoryClick = (category) => {
  activeCategory.value = category;
  const categoryElement = document.querySelector(`[data-category='${category}']`);
  if (categoryElement) {
    // 平滑滚动到目标元素并向下偏移 80px
    categoryElement.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<style lang="scss">
.category-nav {
  width: 100%;
  height: calc(100vh - 32px);
  background: #f8f9fa;
  border-radius: 8px;
  padding: 8px 0;
  box-sizing: border-box;
  .nav-scroll {
    height: 100%;
    overflow-y: auto;
  }
  .nav-items {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
  .nav-item {
    width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 12px 16px;
    border-radius: 8px;
    cursor: pointer;
    color: #333;
    font-size: 16px;
    transition: background 0.2s;
    &:hover {
      background: #e6f7ff;
    }
    &.active {
      background: #bae7ff;
      color: #1890ff;
      font-weight: bold;
    }
  }
}
</style>