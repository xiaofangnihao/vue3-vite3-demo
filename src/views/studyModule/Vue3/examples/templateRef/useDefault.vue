<template>
  <div class="use-default">
    <p class="title" @click="childEmit">不使用setup语法糖:</p>
    <p class="mt-10">{{ childValue }}</p>
    <p>{{ childFunction }}</p>
    <p>{{ childEmit }}</p>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  // 子组件向上传递事件必须在emits数组中声明
  // TODO: 未定义也生效
  // emits: ["childEmit"],
  setup(props, { emit }) {
    const childValue = ref("childValue");
    const childFunction = () => {
      console.log("我是来自默认模板的子组件的方法");
    };
    const childEmit = () => {
      emit("childEmit", 1, "sjn");
    };

    return {
      childValue,
      childFunction,
      childEmit,
    };
  },
});
</script>

<style scoped lang="less">
.title {
  color: @main-color;
  cursor: pointer;
}
</style>
