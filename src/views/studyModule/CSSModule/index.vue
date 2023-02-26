<template>
  <div class="css">
    <Tabs
      :current-index="currentIndex"
      title="对应模块"
      :type-list="typeList"
      @changeType="changeType"
    />
    <component
      v-for="item of componentList"
      :key="item"
      :is="item"
      style="margin-top: 20px; font-size: 18px"
    ></component>
  </div>
</template>

<script>
import CssCustomProperty from "./CssCustomProperty.vue";
import Mask from "./Mask.vue";

export default defineComponent({
  components: { CssCustomProperty, Mask },
});
</script>

<script setup>
import Tabs from "../../bussinessComponent/tabs.vue";
import { ref, defineComponent, reactive, computed } from "vue";

let currentIndex = ref(0);

const typeList = reactive([
  {
    value: "@property",
    style: {
      width: "120px",
    },
    componentName: ["CssCustomProperty"],
  },
  {
    value: "mask",
    componentName: ["Mask"],
  },
]);

let componentList = computed(() => [
  ...typeList[currentIndex.value]?.componentName,
]);

const changeType = (item, index) => {
  currentIndex.value = index;
};
</script>

<style></style>
