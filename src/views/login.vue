<template>
  <div class="login">
    <div class="login-form">
      <BaseForm
        ref="form"
        :form-config="state.formConfig"
        :form-list="state.formList"
        :form-data="state.formData"
      />
      <ImageVerify ref="imageVerify" @success="success" />
    </div>
  </div>
</template>

<script setup>
import BaseForm from "@/components/BaseComponent/BaseForm.jsx";
import ImageVerify from "./bussinessComponent/imageVerify.vue";
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import { useLogin } from "@/store/login.js";
import { Updater } from "../utils/refresh";
import { ElMessage } from "element-plus";

const state = reactive({
  formConfig: { labelWidth: 90 },
  formList: [
    {
      label: "用户名",
      prop: "userName",
      type: "input",
      required: true,
    },
    {
      label: "密码",
      prop: "password",
      inputType: "password",
      type: "input",
      required: true,
    },
  ],
  formData: {
    userName: "",
    password: "",
  },
});
const imageVerify = ref(null);
const form = ref(null);
const { appContext } = getCurrentInstance();

onMounted(() => {
  const check = document.querySelector(".check-child");
  const picture = document.querySelector(".replace");
  picture && (picture.className = "check");
  check.style.display = "block";
});

function success() {
  form.value.elForm.validate((valid) => {
    if (valid) {
      const check = document.querySelector(".check-child");
      const origin = document.querySelector(".check");
      imageVerify.value[0](check, origin);
      appContext.config.globalProperties.$message({
        message: "登录成功!",
        type: "success",
      });
      const login = useLogin();
      login.setToken(state.formData.userName);
    } else {
      return false;
    }
  });
}
</script>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  background-image: url("../assets/images/login-bg.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;

  &-form {
    width: 500px;
    height: 500px;
    background-color: rgba(255, 255, 255, 0.2);
    padding-top: 50px;

    .baseForm {
      width: 85%;
    }
  }
}

// 图片验证码通过后的替换类
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
