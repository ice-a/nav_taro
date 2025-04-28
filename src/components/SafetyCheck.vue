<template>
  <view class="safety-check">
    <text>正在进行安全检测，请稍候...</text>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isSafe = ref(false);

onMounted(() => {
  // 模拟安全检测过程
  setTimeout(() => {
    isSafe.value = true;
    if (isSafe.value) {
      window.location.href = 'https://example.com'; // 安全后跳转到目标链接
    }
  }, 3000);
});
</script>

<style lang="scss">
.safety-check {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fff;
  color: #333;
  font-size: 18px;
}
</style>