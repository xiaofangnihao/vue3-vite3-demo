import Layout from "../components/Layout/index.jsx";

export default [
  {
    path: "/chartDescription",
    component: Layout,
    icon: "Coin",
    meta: { title: "图表说明" },
    children: [
      {
        path: "/chartDescription",
        meta: { title: "全部数据" },
        component: () => import("../views/chartDescription/allData.vue"),
      },
      {
        path: "/test",
        meta: { title: "测试" },
        icon: "Coin",
        children: [
          {
            path: "/test1",
            meta: { title: "测试1" },
            children: [
              {
                path: "/test12",
                meta: { title: "测试12" },
                component: () => import("../views/home.vue"),
              },
            ],
          },
        ],
      },
    ],
  },
];
