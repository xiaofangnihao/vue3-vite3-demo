<template>
  <div class="provide-inject">
    <p>我是祖先元素provide的值:{{ fromApp.dynamic }}</p>
    <p>我是祖先元素provide的不可修改的值: {{ unchangeValue }}</p>
    <el-button class="common-btn" @click="changeApp">修改父组件的值</el-button>
    <el-button class="common-btn" @click="refresh"
      >App.vue provide的刷新组件方法</el-button
    >
  </div>
</template>

<script>
import { defineComponent, inject } from "vue";
import { uniqueKey } from "../../../../../keys";

export default defineComponent({
  setup(props, {}) {
    let fromApp = inject("fromApp", "我是默认值");
    let unique = inject(uniqueKey);
    let unchangeValue = inject("unchangeValue");
    const changeApp = () => {
      fromApp.dynamic.value++;
    };
    let refresh = inject("refreshComponent");

    return {
      fromApp,
      unique,
      unchangeValue,
      changeApp,
      refresh,
    };
  },
});
</script>

<style scoped lang="less"></style>
