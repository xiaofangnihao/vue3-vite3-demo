//
<CountDown #="time" time="232323286767">{{ time }}</CountDown>

<template>
  <div class="base-count-down">
    <div class="content">
      <!-- 选择要显示的内容 -->
      <slot
        v-bind="{
          d: times.days,
          h: times.hours,
          m: times.minutes,
          s: times.seconds,
        }"
      ></slot>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, reactive, watch } from "vue";

const props = defineProps({
  time: {
    type: String,
    default: "0",
    require: true,
    validator(value) {
      if (+value <= 0) {
        throw Error("请勿传递小于0的值!");
      }
      return +value > 0;
    },
  },
});

// +string => number
let duration = computed(() => Math.round(+props.time));

let timer = null;

let times = reactive({
  days: "",
  hours: "",
  minutes: "",
  seconds: "",
});

let curTime = ref(0);

const countDown = () => {
  /**
   * 出于节能的考虑,部分浏览器在进入后台时(或者失去焦点时),
   * 会将setTimeout等定时任务延迟,1s的任务延迟到2s,2s的延迟到5s,实际情况因浏览器而异;
   * 待用户回到浏览器时, 才会重新激活定时任务
   */
  curTime.value = Date.now();
  getTime(duration.value);
};

const getTime = (duration) => {
  timer && clearTimeout(timer);
  const { dd, hh, mm, ss } = durationFormatter(duration);
  times.days = `00${dd || ""}`.slice(-2);
  times.hours = `00${hh || ""}`.slice(-2);
  times.minutes = `00${mm || ""}`.slice(-2);
  times.seconds = `00${ss || ""}`.slice(-2);
  /**
   * 定时器指定的时间间隔，表示的是何时将定时器的代码添加到消息队列，而不是何时执行代码。
   * 所以真正何时执行代码的时间是不能保证的，取决于何时被主线程的事件循环取到，并执行。
   * 每个setTimeout产生的任务会直接push到任务队列中;
   * 而setInterval在每次把任务push到任务队列前,都要进行一下判断(看上次的任务是否仍在队列中)。
   */
  timer = setTimeout(() => {
    let now = Date.now();
    // Math.floor: 向下取整
    // 当前这个setTimeout的回调函数执行的时刻距离上 一个setTimeout的回调函数执行的时刻时间段
    let diffTime = Math.floor((now - curTime.value) / 1000);
    curTime.value = now;
    getTime(duration - diffTime);
  }, 1000);
};

const durationFormatter = (duration) => {
  if (!duration) {
    return { ss: 0 };
  }
  let time = duration;
  let ss = time % 60;
  time = (time - ss) / 60;
  if (time < 1) {
    return ss;
  }
  let mm = time % 60;
  time = (time - mm) / 60;
  if (time < 1) {
    return { mm, ss };
  }
  let hh = time % 24;
  time = (time - hh) / 24;
  if (time < 1) {
    return { hh, mm, ss };
  }
  let dd = time;
  return { dd, hh, mm, ss };
};

watch(
  () => duration,
  (nv, ov) => {
    countDown();
  },
  {
    immediate: true,
  }
);

onMounted(() => {
  countDown();
});
</script>

<style></style>
