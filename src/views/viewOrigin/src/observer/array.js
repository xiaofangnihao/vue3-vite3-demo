const arrayProto = Array.prototype;

// AOP: 面向切片编程思想 -> 不破坏封装的前提下,动态的扩展功能
export const arrayMethods = Object.create(arrayProto);
let methodsToPatch = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "reverse",
  "sort",
];

methodsToPatch.forEach((method) => {
  arrayMethods[method] = function (...args) {
    // 保留原型方法的执行结果
    const result = arrayProto[method].apply(this, args);
    /** this代表的就是数据本身,比如数据是{d:[1,2,3]} d.push(4),this就是d,ob就是d.__ob__,代表的是该数据已经被响应式观察过了,指向Observer实例 */
    const ob = this.__ob__;

    // 这里的标志就是代表数组有新增操作
    let inserted;
    switch (method) {
      // push和unshift走一样的代码
      case "push":
      case "unshift":
        inserted = args;
        break;
      // 若是用splice新增, (index, deleteNum, ...args),所以取slice(2)为新增的元素
      case "splice":
        inserted = args.slice(2);
      default:
        break;
    }
    //  如果有新增的元素 inserted是一个数组 调用Observer实例的observeArray对数组每一项进行观测
    if (inserted) ob.observeArray(inserted);
    // ob.dep.notify();
    return result;
  };
});
