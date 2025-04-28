<template>
  <view class="category-section">
    <view class="category-title">{{ categoryName }}</view>
    <view class="category-items">
      <nav-item 
        v-for="item in items" 
        :key="item.name" 
        :item="item" 
      />
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue';
import NavItem from './NavItem.vue';

const props = defineProps({
  category: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true
  }
});

// 根据分类ID获取分类名称
import categoryMap from '../categoryConfig.json';

const categoryName = computed(() => {
  // 从categoryConfig.json中动态获取分类名称
  // 如果分类不存在于映射中，则直接使用分类ID作为名称
  return categoryMap[props.category] || props.category;
});
</script>

<style lang="scss">
.category-section {
  margin-bottom: 24px;
  width: 100%;
  margin-top: 15%;
  .category-title {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-bottom: 12px;
    padding-left: 8px;
    border-left: 4px solid #1989fa;
    margin-top: 10%;
  }
  .category-items {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 16px;
    max-width: 100%;
    margin: 0 auto;
  }
}
</style>