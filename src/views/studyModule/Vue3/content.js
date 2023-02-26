export default [
  {
    type: "template-ref",
    content: [
      "声明一个同名ref来存放对元素的引用: const name = ref(null)",
      "若是for循环的组件需要获取ref,给ref绑定setRef方法,const refList = ref([]), const setRef = (el) => { el && refList.value.push(el) }",
      "当父组件引用子组件时,若没有使用setup语法糖,被引用的组件实例等于子组件的this;使用了setup语法糖的组件是默认私有的,父组件无法访问子组件的任何数据.子组件需通过defineExpose显式暴露.",
    ],
  },
  {
    type: "component-register",
    content: [
      "注册组件: 推荐采用PascalCase命名法,以区分组件和原生HTML元素",
      "tree-shaking: 消除无用的js代码",
    ],
  },
  {
    type: "provide-inject",
    content: [
      "provide的值若是响应式的,父组件的更新会同步影响到子组件.子组件可以直接修改父组件的值,但最好将这种修改保持在供给方,在供给方提供一个修改状态的方法.",
      "若要使注入方禁止修改供给方的数据,使用readonly包裹供给值.",
      "若在构建大型应用,使用Symbol()来作为供给值避免命名重复.",
    ],
  },
  {
    type: "methods",
    content: [
      "使用setup语法糖时,所有要向上触发的事件应显式地通过defineEmits()宏来声明在顶级作用域下,该方法会返回一个emit函数用于在子函数中向父级emit事件.父组件想要调用的子组件的事件和属性也应通过defineEmits()声明.",
      "使用setup函数时,所有要触发的事件通过emits选项来定义,从ctx中解构出emit用于子函数向上传递事件.",
    ],
  },
  {
    type: "composition-api",
    content: ["以use为开头命名的js文件和js函数,统一保存在hooks文件夹中"],
  },
  {
    type: "props-$attrs",
    content: [
      'props传递一个object的所有属性: v-bind="obj"',
      " 子组件修改props:子组件接收的值类型是基本类型,修改会报警告;若是Object类型,则修改生效.但应尽量避免在子组件中直接修改父组件传递的值(这会影响父组件的状态),在大多数场景下,应该抛出一个事件来让父组件改变,这会自动将新的状态流转给子组件.",
      "props校验失败不会影响传值和显示,只是会在控制台报警告(开发模式下)",
      "传递给一个组件,却没有被该组件声明为props或emits的attribute或者v-on事件监听器.最常见的例子就是class,style和id. class和style为透传attributes:",
    ],
  },
];
