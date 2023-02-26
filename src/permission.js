// vue-router自带的addRoutes方法，该方法是会将新的路由规则在原路由表数组的尾部注入的
import { useLogin } from "./store/login.js";
import pinia from "./store/index.js";
import router from "./router/index.js";
import { ElMessage } from "element-plus";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; //这个样式必须引入

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const login = useLogin(pinia);
const whiteList = ["/login", "/"];
const userList = ["sjn"];

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
  return;
  // 先判断是否有token, 若有token, 直接next
  if (login.token || sessionStorage.getItem("token")) {
    if (to.path === "/study/interview") {
      let userAccount = sessionStorage.getItem("token");
      if (~userList.indexOf(userAccount)) {
        next();
      } else {
        ElMessage.error({
          message: "当前账号暂无查看该页面的权限!",
          duration: 3000,
        });
      }
    } else {
      next();
    }
    NProgress.done();
  } else {
    // 先判断是否在白名单中
    // ~等于-(x + 1), 这样的写法可以避免抽象渗漏
    if (~whiteList.indexOf(to.path)) next();
    else {
      ElMessage({
        type: "warning",
        message: "您暂无权限,请先登录!",
      });
      next("/login");
      NProgress(done);
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
