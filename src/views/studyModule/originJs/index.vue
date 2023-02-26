<template>
  <div class="origin-js">
    <Tabs
      :current-index="currentIndex"
      title="对应模块"
      :type-list="typeList"
      @changeType="changeType"
    />
    <component :is="dynamicComponent" style="margin: 20px 0 0 80px"></component>
  </div>
</template>

<script>
export default defineComponent({
  components: { Array, Study },
});
</script>

<script setup>
import { ref, reactive, computed, defineComponent } from "vue";
import Tabs from "../../bussinessComponent/tabs.vue";
import Array from "./array.vue";
import Study from "./study.vue";

let currentIndex = ref(0);
const typeList = reactive([
  {
    value: "Array",
    componentName: "Array",
  },
  {
    value: "Study",
    componentName: "Study",
  },
]);

let dynamicComponent = computed(
  () => typeList[currentIndex.value]["componentName"]
);
console.log(dynamicComponent);

const changeType = (item, index) => {
  currentIndex.value = index;
};
</script>

<style scoped lang="less"></style>
