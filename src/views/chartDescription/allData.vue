<template>
  <div id="progress" class="progress">0%</div>
  <el-button @click="showProgress">进度条</el-button>
  <base-chart
    ref="defaultChart"
    :options="state.options"
    :chart-config="state.chartConfig"
  ></base-chart>
  <el-button @click="handleClick">修改echarts属性</el-button>
  <RankChart :rank-data="data" />
  <!-- 相对于router中配置的地址 -->
  <iframe
    src="../cloud.html"
    frameborder="0"
    scrolling="no"
    style="width: 1000px; height: 1000px"
  ></iframe>
</template>

<script setup>
import { reactive, toRefs, watch } from "vue";
import RankChart from "@/components/ChartsComponent/RankChart.jsx";

const data = [
  {
    name: "王里红",
    hours: 392,
  },
  {
    name: "顾绍清",
    hours: 371,
  },
  {
    name: "池话波",
    hours: 361,
  },
  {
    name: "汪梅因",
    hours: 444,
    width: "444px",
  },
  {
    name: "李玉生",
    hours: 436,
  },
  {
    name: "和小红",
    hours: 361,
  },
  {
    name: "与爱武",
    hours: 358,
  },
  {
    name: "高育良",
    hours: 357,
  },
  {
    name: "王京东",
    hours: 354,
    width: "300px",
  },
  {
    name: "刘春原",
    hours: 349,
  },
];

function showProgress() {
  progress.style.width = "0";
  let timer;
  cancelAnimationFrame(timer);
  timer = requestAnimationFrame(function fn() {
    if (parseInt(progress.style.width) < 100) {
      progress.style.width = parseInt(progress.style.width) + 1 + "px";
      progress.innerHTML = parseInt(progress.style.width) / 1 + "%";
      timer = requestAnimationFrame(fn);
    } else {
      cancelAnimationFrame(timer);
    }
  });
}

const state = reactive({
  options: {
    backgroundColor: "#fff",
    title: {
      text: "各市社区概括图",
      textStyle: {
        color: "#000",
        fontSize: 14,
      },
    },
    tooltip: {
      show: true,
    },
    legend: {
      show: true,
      left: "78%",
    },
    xAxis: {
      axisTick: {
        lineStyle: {
          type: "dotted",
        },
      },
      data: ["宁波", "杭州", "丽水", "嘉兴"],
    },
    yAxis: {
      // 设置背景为虚线
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
        },
      },
    },
    series: [
      {
        type: "bar",
        name: "下级县个数",
        barWidth: 25,
        data: [1, 2, 3, 4],
      },
    ],
  },
  chartConfig: {
    width: 800,
    height: 300,
    chartName: "test",
  },
  test: 1,
});

const handleClick = () => {
  state.options.xAxis.data.push("11");
};

watch(state, (nv, ov) => {
  console.log(nv, ov);
});
</script>

<style scoped lang="less">
.progress {
  width: 0;
  height: 20px;
  line-height: 20px;
}
</style>
