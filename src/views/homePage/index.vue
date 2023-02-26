<template>
  <div class="home-page">
    <p class="title">Personal Essay</p>
    <div class="after-work">
      <div class="time">
        <span>现在是{{ now }}</span>
        <p class="time-up" v-if="isWork">
          距离下班还有<span class="time-item">{{ times.hour }}</span
          >小时<span class="time-item">{{ times.minutes }}</span
          >分钟<span class="time-item">{{ times.seconds }}</span
          >秒
        </p>
        <p class="time-after" v-else>正是下班时间,注意劳逸结合!</p>
      </div>
    </div>
    <ul class="content-list">
      <li class="content-list-item" v-for="item of list" :key="item.name">
        {{ item.name }}
      </li>
    </ul>
    <button
      class="button"
      ref="button"
      @click="$router.push('/study/originJs')"
    >
      立即进入
    </button>
    <a
      class="bottom"
      href="https://beian.miit.gov.cn/#/Integrated/index"
      target="_blank"
      >浙ICP备2023001894号</a
    >
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from "vue";
import { useHomePage } from "./useHomePage";

let { times, now, hour, setTime } = useHomePage();
let isWork = computed(() => {
  return hour.value >= 18 || hour.value < 9 ? false : true;
});

let timer = null;
let getTime = () => {
  timer && clearTimeout(timer);
  setTimeout(() => {
    setTime();
    getTime();
  }, 1000);
};

let list = reactive([
  {
    name: "JS",
  },
  {
    name: "Vue2",
  },
  {
    name: "Vue3",
  },
]);

onMounted(() => {
  getTime();
});

onBeforeUnmount(() => {
  clearTimeout(timer);
});
</script>

<style scoped lang="scss">
.home-page {
  background: url("../../assets/images/sun.jpeg") no-repeat;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  animation: maskMove 2s linear;

  @keyframes maskMove {
    @for $i from 0 through 100 {
      #{$i}% {
        // 线性渐变
        -webkit-mask: linear-gradient(
          90deg,
          #000 #{$i + "%"},
          transparent #{$i + 5 + "%"},
          transparent 1%
        );
      }
    }
  }

  .after-work {
    .time {
      position: fixed;
      right: 50px;
      top: 65px;
      font-size: 24px;

      &-item {
        font-size: 28px;
        color: var(--main-color);
      }

      &-up {
        margin-top: 10px;
      }

      &-after {
        margin-top: 10px;
        font-size: 24px;
        color: var(--main-color);
      }
    }
  }

  .img:hover {
    transform: rotate(360deg);
    transition: all 2s;
  }

  .title {
    margin: 0 auto;
    width: 300px;
    padding-top: 50px;
    color: var(--main-color);
    font-weight: bold;
    box-sizing: border-box;
    font-size: 32px;
    animation: title 2s;
    transition: all 0.2s;
  }

  .content-list {
    margin: 0 auto;
    margin-top: 50px;
    width: 200px;
    color: var(--text-color);
    font-size: 24px;

    &-item {
      margin-top: 10px;
      text-decoration: underline;
      cursor: pointer;
    }
  }

  .button {
    width: 150px;
    height: 50px;
    cursor: pointer;
    position: absolute;
    left: 45%;
    top: 45%;
    border: 1px solid var(--main-color);
    background-color: var(--main-color);
    border-radius: 8px;
    color: var(--text-color);
    font-size: 18px;
    animation: fall 3s;
    transition: all 0.5s;
  }

  @keyframes title {
    0% {
      color: transparent;
    }

    25% {
      color: rgba(113, 171, 76, 0.5);
    }

    50% {
      color: rgba(113, 171, 76, 0.8);
    }

    100% {
      color: rgba(113, 171, 76, 1);
    }
  }

  @keyframes fall {
    0% {
      top: -20%;
      left: 40%;
      transform: rotate(0deg);
    }

    25% {
      top: 45%;
      left: 42%;
      transform: rotate(180deg);
    }

    50% {
      top: 0%;
      left: 43%;
      transform: rotate(360deg);
    }

    100% {
      top: 45%;
      left: 45%;
      transform: rotate(360deg);
    }
  }

  .bottom {
    position: fixed;
    bottom: 50px;
    left: 45%;
    color: var(--text-color);
  }
}
</style>
