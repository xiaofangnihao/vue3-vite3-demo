<template>
  <div class="props">
    <ChildVue3
      style="border: 1px solid #000; border-radius: 20px"
      class="child"
      v-bind="obj"
      :obj-val="objVal"
      @test-fun="testFun"
      @handle-click="(e, n) => handleClick(e, n, obj)"
      ><a href="#">这是插入到子元素中的slot</a></ChildVue3
    >
  </div>
</template>

<script setup>
import { reactive } from "vue";
import ChildVue3 from "./ChildVue3.vue";

const obj = reactive({
  id: 2,
  name: "测试",
});

// Object.freeze: 冻结属性,使其不再是响应式
const objVal = reactive({
  test: 1,
  show: true,
});
//attrs不是响应式的,不能通过侦听器去监听它的变化。如果需要响应性,可以使用 onUpdated()使得在每次更新时结合最新的 attrs 执行副作用。
function handleClick(e, n, obj) {
  console.log("子");
  console.log(e.target);
  console.log(n, obj);
}
</script>

<style></style>
