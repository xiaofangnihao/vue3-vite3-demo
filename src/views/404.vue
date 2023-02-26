<template>
  <div class="notFound">
    <p class="notFound-text">
      页面不存在,将在{{ time }}秒后返回
      <router-link to="/">首页</router-link>
    </p>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const time = ref(5);

var timer = 5000;

// 用于在用户提前点击跳转链接时清除计时器, 避免下次进入时时间错乱
var t;
var t1;

onMounted(() => {
  t = setTimeout(() => {
    router.push("/");
  }, timer);

  t1 = setInterval(() => {
    time.value--;
  }, 1000);
});

onUnmounted(() => {
  clearTimeout(t);
  clearInterval(t1);
});
</script>

<style lang="less" scoped>
.notFound {
  color: #fff;
  font-size: 24px;
  width: 100%;
  height: 100%;
  background: url("../assets/images/notFound.png") no-repeat center;

  &-text {
    text-align: center;
  }

  a {
    color: #000;
  }
}
</style>
