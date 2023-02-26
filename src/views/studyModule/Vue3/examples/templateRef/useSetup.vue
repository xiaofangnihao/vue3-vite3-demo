<template>
  <div class="use-setup">
    <p class="title" @click="setupEmit">使用了setup语法糖:</p>
    <p class="mt-10">{{ setupData }}</p>
    <p>{{ setupEmit }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["setupEmit"]);

const alartTime = () => {
  alert(new Date());
};

const setupData = ref("setup数据");

defineExpose([alartTime, setupData]);

const setupEmit = () => {
  emit("setupEmit", "setupEmit", 0);
};
</script>

<script></script>

<style scoped lang="less">
.title {
  color: @main-color;
  cursor: pointer;
}
</style>
