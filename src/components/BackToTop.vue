<template>
  <view 
    class="back-to-top"
    :class="{ visible: isVisible }"
    @click="scrollToTop"
  >
    <text class="icon">↑</text>
  </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isVisible = ref(false);
let scrollHandler = null;

const checkScroll = () => {
  isVisible.value = window.pageYOffset > 300;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

onMounted(() => {
  scrollHandler = () => {
    requestAnimationFrame(checkScroll);
  };
  window.addEventListener('scroll', scrollHandler);
});

onUnmounted(() => {
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler);
  }
});
</script>

<style lang="scss">
.back-to-top {
  position: fixed;
  right: 20px;
  bottom: 40px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #1989fa;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(25, 137, 250, 0.3);
  z-index: 999;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  &:hover {
    background-color: #0d73e0;
    transform: translateY(-2px);
  }
  
  .icon {
    font-size: 20px;
    font-weight: bold;
  }
}
</style>