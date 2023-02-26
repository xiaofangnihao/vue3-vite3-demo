1. less
   less 必须安装在 devDependencies 中 否则会报错
   npm i less-loader less --save-dev(-D)

2. ElementPlus
   import ElementPlus from 'element-plus'
   elementPlus 样式文件
   import '../node_modules/element-plus/theme-chalk/index.css'

3. vite-plugin-vue-images
自动导入图片功能
plugins: [
ViteImages({
dirs: ['src/assets/images'] // 指明图片存放的目录
})
]
使用:
  <!-- <image :src="图片name"> -->

4. vue3 中自动注册全局组件
   import { defineAsyncComponent } from 'vue'
   const components = import.meta.glob('./BaseComponent/\*.vue') // 异步方式
   export default function install (app) {
   for(const[key, value] of Object.entries(components)) {
   // 用于获取 name 值, ex: BaseInput lastIndexOf: 获取/最后出现的位置
   const name = key.slice(key.lastIndexOf('/') + 1, key.lastIndexOf('.'));
   app.component(name, defineAsyncComponent(value))
   }
   }
   在 main.js 中引入, app.use(components)

5. vue3 中自动引入 router 下的 js 文件,配置路由
   let routerList = []
   // ./name.js: 每一项(value)default 里的内容为 export default 的内容
   const routerComponents = import.meta.globEager("./\*.js"); // 直接引入当前文件夹下的所有 js 文件
   Object.values(routerComponents).forEach(item => {
   routerList.push(...item.default)
   })

6. vue3 中的全局属性注册
   app.config.globalProperties.

组件中使用:
const { appContext } = getCurrentInstance()
appContext.config.globalProperties[]

7.  vue3 中的 hooks:
    通常以 use + 功能名 命名
    将可重用的逻辑抽离出来以复用

8.  <script setup>
    语法糖写法, 引入的组件、方法, 定义的变量和方法均不用return


9.  vue3 项目中使用 pinia
    若在 router 的 index.js 中使用 pinia, 需要额外引入 pinia, 并作为参数传递到 use 方法中
    import pinia from '../store/index.js'
    const login = useLogin(pinia)
    const { test } = storeToRefs(store):用于仅使用 store 中的状态但不调用任何操作时
    store.$reset():将状态重置为初始值

10. vue3 中使用 jsx 语法及直接创建.jsx 文件
    import vueJsx from "@vitejs/plugin-vue-jsx";
    此插件需要将 vite 升级到 3.0

11. 在 jsx 下使用 vue 内置的组件需要额外导入组件，并且名称不能变

12. vue 中更改响应式数据时, 数据非同步生效,这是为了确保每个 vue 组件只执行一次更新.
    nextTick: 可以在状态改变后立即使用，以等待 DOM 更新完成。可以传递一个回调函数作为参数,或者 await 返回的 Promise.(await nextTick())

13. vue3 中的 ref: ref="form" const form = ref(null) ref.value....即可调用组件实例方法
