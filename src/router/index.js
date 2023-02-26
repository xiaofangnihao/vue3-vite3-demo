import { createRouter, createWebHistory } from "vue-router";
// 在router中使用时需要额外引入pinia, 并作为参数传递到use方法中
import pinia from "../store/index.js";
import Layout from "../components/Layout/index.jsx";

let routerList = [];
// ./name.js: 每一项(value)default里的内容为export default的内容
const routerComponents = import.meta.globEager("./*.js"); // 直接引入当前文件夹下的所有js文件
Object.values(routerComponents).forEach((item) => {
  routerList.push(...item.default);
});

// 开启历史模式
const routerHistory = createWebHistory();

export const routes = [
  // 导出路由用于sidebar
  ...routerList,
  {
    path: "/",
    component: () => import("../views/homePage/index.vue"),
  },
  {
    path: "/login",
    component: () => import("@/views/login.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/404",
  },
];

const router = createRouter({
  history: routerHistory,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

export default router;
