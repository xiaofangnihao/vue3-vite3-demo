<template>
  <div class="dialog">
    <el-dialog
      v-model="dialogConfig.show"
      :title="dialogConfig.title"
      draggable
      :center="dialogConfig.center ?? true"
    >
      <BaseForm
        :form-config="formConfig"
        :form-list="formList"
        :form-data="formData"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="submit" class="dialog-btn"
            >保存</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import BaseForm from "./BaseForm.jsx";

const props = defineProps({
  test: {
    type: Number,
  },
  dialogConfig: {
    type: Object,
    default: () => {
      return {
        show: true,
        title: "测试",
      };
    },
  },
  formConfig: {
    type: Object,
    default: () => {},
  },
  formList: {
    type: Array,
    default: () => [],
  },
  formData: {
    type: Object,
    default: () => {},
  },
});

const emit = defineEmits(["submit"]);
const dialog = computed(() => props.dialogConfig);

function cancel() {
  // dialog.value.show = false;
  props.dialogConfig.title = "测试";
  props.test++;
}

function submit() {
  console.log(props.formData);
  emit("submit");
}
</script>

<style scoped lang="less">
:deep .el-dialog {
  .el-dialog__header {
    padding: 10px;
    // background: linear-gradient(
    //   90deg,
    //   #009688 0%,
    //   #009688 20%,
    //   #009688 60%,
    //   #009688 100%
    // );
    background-color: @main-color;
    color: #fff;
    margin: 0;
    // animation: hue 6s linear infinite;

    .el-dialog__headerbtn {
      top: 0;
    }

    span {
      color: #fff;
    }

    i {
      color: #fff;
    }
  }
}

@keyframes hue {
  from {
    filter: hue-rotate(0deg);
  }
  to {
    filter: hue-rotate(360deg);
  }
}
</style>
