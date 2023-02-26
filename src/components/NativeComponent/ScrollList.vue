<template>
  <div class="infinite-scroll">
    <div
      class="scroll-list"
      @mouseenter="mEnter"
      @mouseleave="mLeave"
      :style="style"
    >
      <!-- 真正滚动的盒子 -->
      <div
        class="scroll-list-box"
        :style="{ transform: `translate(0px,-${scrollTop}px)` }"
      >
        <div class="scroll-item-box" ref="scrollItemBox">
          <div
            class="scroll-item"
            v-for="(item, index) of listData"
            :key="index"
          >
            {{ item.title }}
          </div>
        </div>
        <!-- 避免第一次全部循环结束时出现的短暂空白区域 -->
        <div v-html="copyHtml"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps({
  listData: {
    type: Array,
    default: () => [],
  },
  // 滚动盒子外层的样式
  style: {
    type: Object,
    default: () => {},
  },
});

let scrollTop = ref(0);
let copyHtml = ref("");
let scrollItemBox = ref(null);
let timer = null;

let initScroll = () => {
  copyHtml.value = scrollItemBox.value.innerHTML;
  startScroll();
};

function startScroll() {
  /**
   * requestAnimationFrame相比setTimeout、setInterval的优势主要有两点:
   * 会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，一般来说，这个频率为每秒60帧。
   * 在隐藏或不可见的元素中，requestAnimationFrame将不会进行重绘或回流,意味着更少的的cpu，gpu和内存使用量。
   */
  timer = requestAnimationFrame(scroll);
}

// 滚动处理方法
function scroll() {
  startScroll();
  scrollTop.value++;
  // requestAnimationFrame是一次性的,因此需要递归调用
  // 获取需要滚动的盒子的高度
  let height = scrollItemBox.value ? scrollItemBox.value.offsetHeight : 0;
  // 当判断滚动的高度大于等于盒子高度时，从头开始滚动
  if (scrollTop.value >= height) {
    scrollTop.value = 0;
  }
}

function mEnter() {
  cancelAnimationFrame(timer);
}

function mLeave() {
  startScroll();
}

onMounted(() => {
  initScroll();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(timer);
});
</script>

<style scoped lang="less">
.infinite-scroll {
  box-sizing: border-box;
  padding: 50px;

  .scroll-list {
    width: 300px;
    height: 400px;
    border: 1px solid #ebeef5;
    overflow: hidden;
    box-sizing: border-box;
    padding: 0 10px;

    .scroll-list-box {
      transition: all 0ms ease-in 0s;

      .scroll-item {
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
      }
    }
  }
}
</style>
