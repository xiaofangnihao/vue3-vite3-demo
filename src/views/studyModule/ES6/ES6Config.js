export const oTitle = [
  "运算符的扩展",
  "Set",
  "WeakSet",
  "Map",
  "WeakMap",
  "Proxy",
  "Reflect",
  "Promise",
  "Class",
  "解构赋值",
  "find",
  "flat",
];

export const oContent = [
  {
    key: "Set",
    content: [
      "Object,成员的值是唯一的,本身就是一个构造函数,用于生成Set数据结构.",
      "Set的成员总数用size获取.",
      "数组去重的方法: ①[...new Set(Array)];②Array.from可以将Set转换为Array,且可以接收第二个参数对成员的每一项做处理.Array.from(new Set[Array]).",
      "操作方法: add(返回数据结构本身), delete, has, clear.<br />遍历方法: keys,values, entries, forEach.",
      "new Set().add()方法添加元素,不会发生类型转换,5和'5'不同.和===的区别在于,add方法可以识别NaN等于自身.",
    ],
  },
  {
    key: "WeakSet",
    content: [
      "成员只能是对象,都是弱引用.即若其他对象都不再引用该对象,垃圾回收机制会自动回收该对象所占用的内存,无视其仍在WeakSet中.其内部size值取决于垃圾回收机制是否运行,且其何时运行无法预测,因此WeakSet没有size属性,且不可遍历.",
      "操作方法: add, delete, has",
      "一个用处: 储存DOM节点,不用担心这些节点从文档移除时,会引发内存泄漏.",
    ],
  },
  {
    key: "Map",
    content: [
      "传统的object只能以string作为键值,Map可以以任何值作为键值,实现了值-值,是一种更完善的Hash结构.",
      "只有对同一个对象的引用,Map结构才将其视为同一个键,Map的键是跟内存地址绑定的.",
      "set方法: 返回该Map对象,因此可以采用链式写法.<br />get方法:读取对应的键值.<br />has, delete, clear",
    ],
  },
  {
    key: "Proxy",
    content: [
      "get(目标对象,属性名,操作行为所针对的对象);<br />实现链式调用函数的效果;<br />实现一个生成各种DOM节点的Proxy实例dom,div下有a,ul,ul下有li",
      "className=parent-proxy",
      "set(目标对象,属性名,属性值,操作行为所针对的对象)",
      "apply(目标对象,目标对象的上下文ctx(this),目标对象的参数数组):拦截函数的调用、call和apply;",
      "has(目标对象,属性名):拦截hasProperty操作,判断对象是否具有某个属性时生效.如in操作符",
      "deleteProperty(目标对象,属性名):拦截delete操作",
    ],
  },
  {
    key: "find",
    content: ["find精确搜索后不会再继续遍历数组,性能优化"],
  },
  {
    key: "flat",
    content: ["flat(Infinity), Infinity会展开所有嵌套数组; flat() === flat(1)"],
  },
  {
    key: "Promise",
    content: [
      "Promise新建后就会立即执行,是同步任务",
      "Promise实例有一个then方法,可以对收到的result做处理.then方法指定的脚本将在所有同步任务完成之后才执行.",
      "Promise.all: 并发, 同时执行, 1s后打印出fn1的结果, 再1s后打印出fn2的结果,但可以同时处理它俩的resolve值array",
    ],
  },
  {
    key: "Class",
    content: ["类,作为对象的模板."],
  },
  {
    key: "运算符的扩展",
    content: [
      "链判断运算符(?.): 存在短路机制,链判断运算符一旦为真,右侧表达式将不再求值. let a = 1; let obj = {}; obj?.test?.[++a]->此时a = 1;若obj中存在test属性,则a = 2.",
      "null判断运算符(??): 多个逻辑运算符(&&, ||)一起使用时必须用括号表明优先级.",
      "逻辑赋值运算符: &&=, ||=, ??=",
    ],
  },
];
