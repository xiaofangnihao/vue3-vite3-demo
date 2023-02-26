<template>
  <div class="unknown-module">
    <p>开发环境下的获取全局属性的值: {{ development }}</p>
    <p>生产环境下的获取全局属性的值: {{ production }}</p>
    <el-button class="common-btn" @click="handleClick">调用$message</el-button>
    <TestA style="margin-top: 20px" />
    <TestB />
    <ImportImage />
  </div>
</template>

<script setup lang="jsx">
import { getCurrentInstance } from "vue";
import ImportImage from "../../importImage.vue";

const TestA = () => <div>.vue后缀的文件中包含jsx写法</div>;

const TestB = () => (
  <div>
    父组件包含一个子组件
    <TestA></TestA>
  </div>
);

// TODO: 待验证:生产环境下获取全局属性的途径?

const { appContext, proxy } = getCurrentInstance();
const development = Object.prototype.toString.call(
  appContext.config.globalProperties.$echarts
);
const production = Object.prototype.toString.call(
  proxy.config?.globalProperties?.$echarts
);

// 全局中的$message
const handleClick = () => {
  appContext.config.globalProperties.$message.error({
    message: "测试",
  });
};
</script>

<style></style>
