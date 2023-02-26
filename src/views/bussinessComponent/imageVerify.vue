<template>
  <div class="check">
    <div class="check-child"></div>
  </div>
  <div class="drag">
    <div class="drag-child"></div>
    <div class="drag-tips">
      <span>按住左边按钮向右拖动完成上方图像验证</span>
    </div>
  </div>
</template>

TODO: 鼠标中途不能超过滑动块范围
<script setup>
import { onMounted, ref } from "vue";
// setup语法糖下需要defineExpose传递
defineExpose([resetImage]);
const emits = defineEmits(["success"]);

let currentPageX = ref(0);
function resetImage(check, origin) {
  check.style.display = "none";
  origin.className = "replace";
}

onMounted(() => {
  const drag = document.querySelector(".drag-child");
  const check = document.querySelector(".check-child");
  const origin = document.querySelector(".check");

  const dragMouseDown = (event) => {
    currentPageX = event.pageX;
    drag.addEventListener("mousemove", dragMouseMove);
  };
  // 监听鼠标移动事件
  const dragMouseMove = (event) => {
    /**
     * offsetX: 相对于父盒子的x，y坐标（含padding不含border和margin);
     * pageX: 鼠标所在位置相对于文档左上角的距离;
     * screenX: 鼠标相对于屏幕左上角的距离;
     * clientX: 鼠标相对于浏览器左上角的位置;
     */
    const { pageX } = event;
    // 到达图片边界时重置
    if (pageX >= currentPageX + 350) {
      drag.style.transform = "translateX(0px)";
      check.style.transform = "translateX(0px)";
      drag.removeEventListener("mousemove", dragMouseMove);
      return;
    }
    drag.style.transform = `translateX(${pageX - currentPageX}px)`;
    check.style.transform = `translateX(${pageX - currentPageX}px)`;
  };
  // 结束鼠标监听事件
  const dragMouseUP = (event) => {
    drag.removeEventListener("mousemove", dragMouseMove);
    const { pageX } = event;
    drag.style.transform = "translateX(0px)";
    check.style.transform = "translateX(0px)";

    if (pageX > 276 + currentPageX && pageX < 284 + currentPageX) {
      emits("success");
    }
    drag.style.animation = "move 0.5s ease-in-out";
    check.style.animation = "move 0.5s ease-in-out";
    // 动画结束监听回调
    const animationEnd = () => {
      drag.style.transform = "translateX(0px)";
      check.style.transform = "translateX(0px)";
      // 清除动画属性
      drag.style.animation = "";
      check.style.animation = "";
      document.removeEventListener("animationend", animationEnd);
    };
    document.addEventListener("animationend", animationEnd);
  };
  drag.addEventListener("mousedown", dragMouseDown);
  drag.addEventListener("mouseup", dragMouseUP);
});
</script>

<style scoped lang="less">
.check {
  margin: 0 auto;
  width: 400px;
  height: 300px;
  background: url("https://img0.baidu.com/it/u=2028084904,3939052004&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500")
    no-repeat;
  background-size: 100% 100%;
  position: relative;

  &-child {
    content: "";
    width: 50px;
    height: 50px;
    background-image: inherit;
    background-repeat: inherit;
    border: 1px solid #fff;
    position: absolute;
    top: 100px;
    left: 0;
    background-size: 400px 300px;
    background-position: -280px -100px;
  }
}

.check::before {
  content: "";
  width: 50px;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid #fff;
  position: absolute;
  left: 280px;
  top: 100px;
}

.drag {
  margin: 0 auto;
  width: 400px;
  height: 50px;
  background-color: #e8e8e8;
  font-size: 14px;
  position: relative;
  margin-top: 10px;

  &-child {
    height: 50px;
    width: 50px;
    background-color: aquamarine;
    z-index: 10;
    position: absolute;
    left: 0;
    top: 0;
    cursor: pointer;
  }

  &-tips {
    display: flex;
    justify-content: end;
    align-items: center;
    width: 95%;
    height: 100%;
    user-select: none;
    position: absolute;
    top: 0;
    left: 0;
  }
}

@keyframes move {
  to {
    transform: translateX(0);
  }
}

.replace {
  margin: 0 auto;
  width: 400px;
  height: 300px;
  background: url("https://img0.baidu.com/it/u=2028084904,3939052004&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500")
    no-repeat;
  background-size: 100% 100%;
  position: relative;
}
</style>
