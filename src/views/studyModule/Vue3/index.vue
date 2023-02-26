<template>
  <div class="vue3">
    <Tabs
      :current-index="currentIndex"
      title="对应模块"
      :type-list="typeList"
      @changeType="changeType"
    />
    <div class="content">
      <div class="content-slot"></div>
      <div class="dynamic-component">
        <component
          v-for="item of componentList"
          :key="item"
          :ref="setRef"
          :is="item"
          @childEmit="childEmit"
          @setupEmit="setupEmit"
        ></component>
      </div>
    </div>
  </div>
</template>

<script lang="jsx">
import {
  defineComponent,
  onMounted,
  reactive,
  getCurrentInstance,
  computed,
  ref,
} from "vue";
import Tabs from "../../bussinessComponent/tabs.vue";
import contentList from "./content";
import useComponent from "./useComponent";
import { useCreateEle } from "@/hooks/useCreateEle";
import { createFragment } from "@/utils/dom";
import { templateRef } from "./examples/templateRef/templateRef.js";

export default defineComponent({
  // 子组件向父组件传递事件需定义在emits数组中
  emits: [],
  components: { Tabs, ...useComponent.components },
  setup(props, { emit, attrs }) {
    // common start
    let currentIndex = ref(0);
    const typeList = reactive([
      {
        value: "template-ref",
        style: {
          width: "120px",
        },
        componentName: ["UseDefault", "UseSetup"],
      },
      {
        value: "computed",
        style: {
          width: "100px",
        },
        componentName: ["ComputedComponent"],
      },
      {
        value: "component-register",
        style: {
          width: "180px",
        },
        componentName: [],
      },
      {
        value: "props-$attrs",
        style: {
          width: "120px",
        },
        componentName: ["Props"],
      },
      {
        value: "methods",
        style: {
          width: "100px",
        },
        componentName: [],
      },
      {
        value: "provide-inject",
        style: {
          width: "130px",
        },
        componentName: ["ProvideInject"],
      },
      {
        value: "composition-api",
        style: {
          width: "160px",
        },
        componentName: ["CompositionApi"],
      },
      {
        value: "unknown-module",
        style: {
          width: "160px",
        },
        componentName: ["UnknownModule"],
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

    const changeType = (item, index) => {
      currentIndex.value = index;
      insertNode();
    };

    const insertNode = () => {
      let oFather = document.getElementsByClassName("content-slot")[0];
      if (oFather.childNodes.length !== 0) {
        [...new Set(oFather.childNodes)].forEach((item) => {
          oFather.removeChild(item);
        });
      }
      let oFrag = createFragment();
      list.value.length &&
        list.value[0].content.forEach((item, index) => {
          let newNode = useCreateEle("h2", "mt-10", index + 1 + "." + item);
          oFrag.appendChild(newNode);
        });
      oFather.appendChild(oFrag);
    };

    // common end

    let { refList, setRef } = templateRef();

    const childEmit = (number, string) => {
      alert(`${number}${string}我是子组件传递的方法`);
    };

    const setupEmit = (string, number) => {
      alert(`${number}${string}我是setup语法糖子组件传递的方法`);
    };

    onMounted(() => {
      insertNode();
      refList.value[0].childFunction();
    });

    const { ctx } = getCurrentInstance();
    // console.log(ctx);
    if (ctx.testFun) {
      ctx.testFun();
    }

    function testFun() {
      console.log("true");
    }

    return {
      currentIndex,
      typeList,
      changeType,
      componentList,
      list,
      insertNode,
      setRef,
      refList,
      childEmit,
      setupEmit,
      testFun,
    };
  },
});
</script>

<style lang="less" scoped>
.vue3 {
  height: 100%;
  overflow: auto;
  color: @text-color;

  .content {
    padding-left: 80px;

    .dynamic-component {
      width: 80%;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
