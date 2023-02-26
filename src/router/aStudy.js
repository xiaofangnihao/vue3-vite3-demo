import Layout from "../components/Layout/index.jsx";

export default [
  {
    path: "/study",
    meta: { title: "学习模块" },
    icon: "Notebook",
    component: Layout,
    children: [
      {
        path: "/study/originJs",
        meta: { title: "原生JS部分" },
        component: () => import("../views/studyModule/originJs/index.vue"),
      },
      {
        path: "/study/cssModule",
        meta: { title: "CSS模块" },
        component: () => import("../views/studyModule/CSSModule/index.vue"),
      },
      {
        path: "/study/ES6",
        meta: { title: "ES6部分" },
        component: () => import("../views/studyModule/ES6/index.vue"),
      },
      {
        path: "/study/vue2",
        meta: { title: "vue2部分", keepAlive: true },
        component: () => import("../views/studyModule/Vue2/index.vue"),
      },
      {
        path: "/study/vue3",
        meta: { title: "vue3部分", keepAlive: true },
        component: () => import("../views/studyModule/Vue3/index.vue"),
      },
      {
        path: "/study/interview",
        meta: { title: "面试题集合", keepAlive: true },
        component: () => import("../views/studyModule/interview/index.vue"),
      },
    ],
  },
];
