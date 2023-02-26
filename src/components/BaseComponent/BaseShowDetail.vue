<template>
  <div class="detail">
    <el-dialog
      v-model="fieldConfig.show"
      :title="fieldConfig.title"
      :width="fieldConfig.width"
      :draggable="fieldConfig.draggable"
    >
      <div
        v-for="(item, index) of data"
        :key="index"
        class="detail-item"
        @click="handleClick($event)"
      >
        <el-row v-if="Array.isArray(item)" class="double-text">
          <el-col :span="12" class="ellipsis">
            <span
              class="label"
              :style="{
                width: fieldConfig.labelWidth ?? '100px',
                textAlign: fieldConfig.textAlign ?? 'right',
                display: 'inline-block',
              }"
              >{{ item[0].label }} :</span
            >
            <span class="value">{{ item[0].value }}</span>
          </el-col>
          <el-col :span="12" class="ellipsis">
            <span
              class="label"
              :style="{
                width: fieldConfig.labelWidth ?? '100px',
                textAlign: fieldConfig.textAlign ?? 'right',
                display: 'inline-block',
              }"
              >{{ item[1].label }} :</span
            >
            <span class="value">{{ item[1].value }}</span></el-col
          >
        </el-row>
        <el-row v-else>
          <el-col class="ellipsis">
            <span
              class="label"
              :style="{
                width: fieldConfig.labelWidth ?? '100px',
                textAlign: fieldConfig.textAlign ?? 'right',
                display: 'inline-block',
              }"
              >{{ item.label }} :</span
            >
            <span class="value">{{ item.value }}</span>
          </el-col>
        </el-row>
      </div>
      <template #footer>
        <el-button
          type="primary"
          class="dialog-btn"
          @click="fieldConfig.show = false"
        >
          返回
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
// 查看组件
import { useField } from "../../hooks/useField";
const props = defineProps({
  config: {
    type: Object,
    default: () => {},
  },

  data: {
    type: Array,
    default: () => [],
  },
});
const defaultConfig = {
  width: "40%",
  title: "查看",
  draggable: true,
};

const { fieldConfig } = useField(defaultConfig, props.config);

function handleClick(e) {
  if (e.target.className === "label") return;
  if (e.target.parentElement.className.includes("ellipsis")) {
    e.target.parentNode.classList.remove("ellipsis");
  } else {
    e.target.parentNode.classList.add("ellipsis");
  }
}
</script>

<style scoped lang="less">
:deep .el-dialog {
  overflow: hidden;

  .el-dialog__header {
    border-bottom: 1px solid #e8eaec;
  }

  .el-dialog__footer {
    border-top: 1px solid #e8eaec;
    text-align: center;
  }
}

.detail-item {
  font-size: 16px;
  margin-top: 10px;

  .value {
    margin-left: 10px;
  }
}

.detail-item:first-child {
  margin-top: 0;
}
</style>
