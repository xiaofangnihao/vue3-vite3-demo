import Layout from "../components/Layout/index.jsx";

export default [
  {
    path: "/moduleManagement",
    meta: { title: "测试页面" },
    icon: "Cpu",
    component: Layout,
    children: [
      {
        path: "/moduleManagement/classic",
        meta: { title: "测试页面" },
        component: () => import("../views/home.vue"),
      },
    ],
  },
];
