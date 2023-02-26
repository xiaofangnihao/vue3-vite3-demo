<template>
  <div class="computed-component">
    <p style="font-weight: bold">computed计算属性实现传参:</p>
    <p class="pointer">return一个function: {{ computedValue(3) }}</p>
  </div>
</template>

<script setup>
import { computed } from "vue";

const computedValue = computed(() => {
  return (n) => n * 3;
});
</script>

<style scoped lang="less">
.pointer {
  color: @main-color;
}
</style>
