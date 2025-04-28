<template>
  <view class="nav-item" @click="handleClick">
    <view class="nav-icon" :style="gradientStyle"></view>
    <view class="nav-info">
      <text class="nav-name">{{ item.name }}</text>
      <text class="nav-desc">{{ item.desc }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';
import Taro from '@tarojs/taro';

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

// 根据item的name生成唯一的渐变色
const gradientStyle = computed(() => {
  const hash = props.item.name.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  const hue1 = Math.abs(hash % 360);
  const hue2 = (hue1 + 40) % 360;
  
  return {
    background: `linear-gradient(135deg, hsl(${hue1}, 70%, 60%) 0%, hsl(${hue2}, 70%, 50%) 100%)`
  };
});

const handleClick = () => {
  if (process.env.TARO_ENV === 'h5') {
    window.open(props.item.url, '_blank');
  } else {
    Taro.showToast({
      title: '即将访问: ' + props.item.name,
      icon: 'none'
    });
  }
};
</script>

<style lang="scss">
.nav-item {
  display: flex;
  flex-direction: column;
  padding: 12px;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  align-items: center;
  width: calc(25% - 12px);
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    
    .nav-desc {
      opacity: 1;
      height: auto;
      margin-top: 4px;
    }
  }
  
  .nav-icon {
    width: 48px;
    height: 48px;
    border-radius: 8px;
    margin-bottom: 8px;
    flex-shrink: 0;
    transition: all 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }
  
  .nav-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .nav-name {
      font-size: 14px;
      font-weight: bold;
      color: #333;
      margin-bottom: 4px;
      text-align: center;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .nav-desc {
      font-size: 12px;
      color: #999;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
      width: 100%;
      opacity: 0;
      height: 0;
      margin-top: 0;
      transition: all 0.3s ease;
    }
  }
}
</style>