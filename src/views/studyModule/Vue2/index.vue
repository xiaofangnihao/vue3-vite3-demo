<template>
  <Tabs
    :current-index="currentIndex"
    title="对应模块"
    :type-list="typeList"
    @changeType="changeType"
  />
  <component v-for="item of componentList" :key="item" :is="item"></component>
</template>

<script>
import { defineComponent, ref, reactive, computed, onMounted } from "vue";
import Tabs from "../../bussinessComponent/tabs.vue";
import contentList from "../Vue3/content";

export default defineComponent({
  components: { Tabs },
  setup() {
    let currentIndex = ref(0);
    const typeList = reactive([
      {
        value: "template-ref",
        style: {
          width: "100px",
        },
        componentName: ["UseDefault", "UseSetup"],
      },
      {
        value: "computed",
        style: {
          width: "100px",
        },
      },
      {
        value: "component-register",
        style: {
          width: "200px",
        },
      },
      {
        value: "props",
        style: {
          width: "100px",
        },
      },
      {
        value: "methods",
        style: {
          width: "100px",
        },
      },
      {
        value: "provide-inject",
        style: {
          width: "130px",
        },
      },
      {
        value: "composition-api",
        style: {
          width: "140px",
        },
      },
    ]);

    let componentList = computed(() => [
      ...typeList[currentIndex.value]?.componentName,
    ]);

    let list = computed(() =>
      contentList.filter(
        (item) => item.type === typeList[currentIndex.value].value
      )
    );

    onMounted(() => {});

    const changeType = (item, index) => {
      console.log(item, index);
      console.log(currentIndex.value);
      currentIndex.value = index;
    };

    return {
      currentIndex,
      typeList,
      changeType,
      componentList,
      list,
    };
  },
});
</script>

<style></style>
