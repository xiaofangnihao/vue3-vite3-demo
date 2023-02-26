<template>
  <div class="header flex">
    <div class="header-left flex">
      <el-icon @click="foldOrExpand" style="cursor: pointer">
        <component :is="isFold"></component>
      </el-icon>
      <el-breadcrumb :separator-icon="rightIcon" class="breadcrumb">
        <el-breadcrumb-item v-for="item of routerList" :key="item">{{
          item
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="header-right flex">
      <p class="userName">{{ userName }}</p>
      <el-image :src="avatar" class="elImage" />
      <el-dropdown>
        <el-icon class="elIcon"><ArrowDown /></el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleClick('0')"
              >修改密码</el-dropdown-item
            >
            <el-dropdown-item @click="handleClick('1')"
              >退出登录</el-dropdown-item
            >
            <el-dropdown-item @click="handleClick('2')"
              >切换主题色</el-dropdown-item
            >
            <el-dropdown-item @click="handleClick('3')"
              >切换中英文</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <el-dialog v-model="dialogShow" title="颜色选择" center>
      <div class="color-list">
        <p
          v-for="item of colorList"
          :key="item"
          class="color-list-item"
          :style="{
            background: item,
          }"
          @click="changeColor(item)"
        ></p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, toRefs, ref, onMounted, computed } from "vue";
import { useLayout } from "@/store/layout.js";
import { ArrowRight } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import { useLogin } from "@/store/login.js";
export default {
  name: "Header",
  setup() {
    let rightIcon = ArrowRight;

    const state = reactive({
      isFold: "Fold",
      userName: "沈嘉宁",
      routerList: [],
      // 主题色弹窗
      dialogShow: false,
      colorList: [
        "#fff",
        "#000",
        "linear-gradient(to top, #77add7, #74b8da, #71c2dc)",
        "linear-gradient(to top, #52946b, #5ca579, #63b386)",
        "linear-gradient(to top, #40a3e5, #5ed0d3, #6aeac8)",
      ],
    });

    const router = useRoute();
    state.routerList = computed(() =>
      router.matched.map((it) => it.meta?.title)
    );

    const layout = useLayout();

    const foldOrExpand = () => {
      layout.isCollapse = !layout.isCollapse;
      layout.isFold = !layout.isCollapse ? "Fold" : "Expand";
    };

    const login = useLogin();

    const changeColor = (item) => {
      let theme = "";
      switch (item) {
        case "#fff":
          theme = null;
          break;
        case "linear-gradient(to top, #77add7, #74b8da, #71c2dc)":
          theme = "blue";
          break;
        case "linear-gradient(to top, #52946b, #5ca579, #63b386)":
          theme = "green";
          break;
        case "linear-gradient(to top, #40a3e5, #5ed0d3, #6aeac8)":
          theme = "greenAndBlue";
          break;
        case "#000":
          theme = "dark";
          break;
        default:
          theme = item;
          break;
      }
      state.dialogShow = false;
      document.documentElement.setAttribute("theme", theme);
    };

    function handleClick(index) {
      if (index === "1") {
        login.clearToken();
      }
      if (index === "2") {
        state.dialogShow = true;
      }
    }

    return {
      rightIcon,
      ...toRefs(state),
      foldOrExpand,
      handleClick,
      changeColor,
    };
  },
};
</script>

<style scoped lang="less">
.header {
  margin-top: 10px;
  justify-content: space-between;

  &-left {
    .breadcrumb {
      margin-left: 30px;
    }
  }

  &-right {
    font-size: 12px;

    .userName {
      height: 30px;
      line-height: 30px;
    }

    .elImage {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin: 0 10px;
    }

    .el-dropdown {
      align-items: center;
    }

    .elIcon {
      :hover {
        cursor: pointer;
      }
    }
  }
}

:deep .el-dialog {
  .el-dialog__header {
    padding: 10px;
    background-color: @main-color;
    color: #fff;
    margin: 0;

    .el-dialog__headerbtn {
      top: 0;
    }
    span,
    i {
      color: #fff;
    }
  }
}

.color-list {
  display: flex;

  &-item {
    width: 50px;
    height: 50px;
    cursor: pointer;
    margin-left: 50px;
  }
}
</style>
