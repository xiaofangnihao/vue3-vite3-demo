import Layout from "../components/Layout/index.jsx";

export default [
  {
    path: "/swiper",
    component: Layout,
    icon: "Coin",
    meta: { title: "首页配置" },
    children: [
      {
        path: "/swiper",
        meta: { title: "轮播图配置" },
        component: () => import("@/views/homeConfig/swiperConfig.vue"),
      },
    ],
  },
];
