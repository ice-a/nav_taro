<template>
  <view class="category-nav">
    <scroll-view scroll-x class="nav-scroll">
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
  const element = document.querySelector(`[data-category="${category}"]`);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<style lang="scss">
.category-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 16px;
  
  .nav-scroll {
    width: 100%;
    white-space: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }
  
  .nav-items {
    display: inline-flex;
    padding: 12px 16px;
  }
  
  .nav-item {
    padding: 6px 16px;
    margin-right: 12px;
    border-radius: 16px;
    font-size: 14px;
    color: #666;
    background-color: #f5f7fa;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:last-child {
      margin-right: 0;
    }
    
    &:hover {
      background-color: #e8f3ff;
      color: #1989fa;
    }
    
    &.active {
      background-color: #1989fa;
      color: #fff;
    }
  }
}
</style>