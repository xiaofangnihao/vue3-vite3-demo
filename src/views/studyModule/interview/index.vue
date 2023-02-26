<template>
  <div class="interview">
    <Tabs
      :current-index="currentIndex"
      title="问题类型"
      :type-list="typeList"
      @changeType="changeType"
    />
    <div class="question-list">
      <div
        class="mt-10 question-item"
        v-for="(item, index) of list"
        :key="item.id"
      >
        <p class="content">{{ index + 1 }}.{{ item.content }}</p>
        <div
          class="answer"
          v-for="(answer, index) of answerList.filter(
            (child) => child.id === item.id
          )"
          :key="index"
        >
          <p
            class="answer-content"
            v-if="answer.content"
            v-html="answer.content"
          ></p>
          <img
            v-if="answer.imgUrl"
            :src="answer.imgUrl"
            alt=""
            style="width: 500px; height: 200px; cursor: pointer"
            @click="showDialog"
          />
          <a
            class="link"
            v-if="answer.link"
            :href="answer.link"
            target="_blank"
            >{{ answer.linkText || "网络来源" }}</a
          >
        </div>
      </div>
    </div>
  </div>
  <el-dialog v-model="dialogShow" center draggable width="70%" top="5vh">
    <el-image style="width: 100%" :src="url"></el-image>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import questionList from "./question";
import answerList from "./answer";
import Tabs from "../../bussinessComponent/tabs.vue";

const typeList = reactive([
  {
    value: "js",
    style: {
      width: "100px",
    },
  },
  {
    value: "vue",
    style: {
      width: "100px",
    },
  },
  {
    value: "deploy",
    style: {
      width: "100px",
    },
  },
  {
    value: "npm",
    style: {
      width: "100px",
    },
  },
  {
    value: "app",
    style: {
      width: "100px",
    },
  },
  {
    value: "applet",
    style: {
      width: "100px",
    },
  },
  {
    value: "vite-plugin",
    style: {
      width: "120px",
    },
  },
]);

let currentIndex = ref(0);
let list = computed(() =>
  questionList.filter(
    (item) => item.type === typeList[currentIndex.value].value
  )
);
const changeType = (item, index) => {
  currentIndex.value = index;
};

let dialogShow = ref(false);
let url = ref(undefined);
const showDialog = (e) => {
  dialogShow.value = true;
  url.value = e.srcElement.currentSrc;
};
</script>

<style scoped lang="less">
.interview {
  height: 100%;
  width: 100%;
  overflow: auto;
  // background: url("../../../assets/images/snowMountain.jpg") no-repeat;
  background-size: 100% 100%;

  .question-list {
    padding-left: 80px;

    .question-item {
      .content {
        font-weight: bold;
        font-size: 18px;
      }

      .answer {
        margin-top: 5px;
      }
    }
  }
}
</style>
