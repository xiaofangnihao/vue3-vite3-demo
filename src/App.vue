<template>
  <!-- <Transition name="fade" mode="out-in">
    <KeepAlive></KeepAlive>
  </Transition> -->
  <router-view v-if="isRouteAlive"></router-view>
  <!-- <keep-alive>
      <component
        :is="Component"
        :key="route.meta.title"
        v-if="isRouteAlive"
      /> </keep-alive> -->
</template>

<script>
import {
  defineComponent,
  nextTick,
  onMounted,
  provide,
  readonly,
  ref,
} from "vue";
import { useRoute } from "vue-router";
import { uniqueKey } from "./keys";
import { useLogin } from "./store/login";
import { ElMessage } from "element-plus";
import { Updater } from "./utils/refresh";

export default defineComponent({
  setup() {
    const route = useRoute();
    // 祖先元素提供的值可供给所有子元素使用
    const dynamic = ref(0);
    function changeValue(value) {
      dynamic.value = value;
    }
    provide("fromApp", {
      dynamic,
      changeValue,
    });
    provide("unchangeValue", readonly(ref(999)));
    provide(uniqueKey, ref(1));

    const isRouteAlive = ref(true);

    const refreshComponent = () => {
      isRouteAlive.value = false;
      nextTick(() => {
        isRouteAlive.value = true;
      });
    };

    const login = useLogin();

    onMounted(() => {
      let nowDate = Date.parse(new Date());
      let lastDate = sessionStorage.getItem("currentTime");
      if (window.location.href.includes("47") && lastDate) {
        if ((nowDate - lastDate) / 1000 / 60 >= 30) {
          ElMessage.warning({
            message: "登录信息已过期!",
          });
          login.clearToken();
        }
      }
      let loading = document.getElementById("Loading");
      loading && loading.remove();
      // 检测页面是否有更新
      const up = new Updater({
        timer: 2000,
      });
      // console.log("------------------", up);

      up.on("no-update", () => {
        // console.log("未更新");
        // 未更新 some code
      });

      up.on("update", () => {
        ElMessage.warning({
          message: "内容已更新,请刷新浏览器重新进入",
        });
      });
    });

    // App的vue提供一个refreshComponent方法,全局组件可用
    provide("refreshComponent", refreshComponent);

    return {
      isRouteAlive,
      // route,
    };
  },
});
</script>

<style lang="less">
body,
html {
  height: 100%;
}

#app {
  height: 100%;
}
</style>
